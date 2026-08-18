import { Service } from '@volcengine/openapi';
import type { VefaasFunctionConfig, VefaasFunctionInfo } from './types';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { pollUntil, PollingTimeoutError } from '../polling';
import { SCF_STATUS_POLL_INTERVAL_MS, SCF_STATUS_POLL_MAX_ATTEMPTS } from '../constants';
import * as fs from 'node:fs';

type VefaasSdkClient = Service;

const MAX_ZIP_SIZE_MB = 50;
const MAX_ZIP_SIZE_BYTES = MAX_ZIP_SIZE_MB * 1024 * 1024;
const MAX_TOS_SIZE_MB = 500;
const MAX_TOS_SIZE_BYTES = MAX_TOS_SIZE_MB * 1024 * 1024;

const RELEASE_POLL_INTERVAL_MS = 2000;
const RELEASE_POLL_MAX_ATTEMPTS = 60;

const buildEnvVariables = (envs?: Record<string, string>) => {
  if (!envs) return undefined;
  return Object.entries(envs).map(([key, value]) => ({ key, value }));
};

const parseEnvVariables = (envs?: Array<{ key: string; value: string }>) => {
  if (!envs || envs.length === 0) return undefined;
  return envs.reduce(
    (acc, { key, value }) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
};

const validateCodePackage = async (codePath: string): Promise<{ size: number; sizeMB: string }> => {
  const stats = await fs.promises.stat(codePath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  if (stats.size > MAX_TOS_SIZE_BYTES) {
    throw new Error(
      lang.__('CODE_PACKAGE_TOO_LARGE', {
        size: sizeMB,
        maxZip: MAX_ZIP_SIZE_MB.toString(),
        maxTos: MAX_TOS_SIZE_MB.toString(),
      }),
    );
  }

  if (stats.size > MAX_ZIP_SIZE_BYTES) {
    logger.info(
      lang.__('CODE_PACKAGE_EXCEEDS_ZIP_LIMIT', {
        size: sizeMB,
        limit: MAX_ZIP_SIZE_MB.toString(),
        strategy: 'TOS',
      }),
    );
  }

  try {
    const zipContent = await fs.promises.readFile(codePath);
    await import('jszip').then(async (JSZip) => {
      const zip = await JSZip.loadAsync(zipContent);
      const fileCount = Object.keys(zip.files).length;

      if (fileCount === 0) {
        throw new Error(lang.__('CODE_PACKAGE_EMPTY'));
      }

      const hasHandler = Object.keys(zip.files).some(
        (f) => f.endsWith('.js') || f.endsWith('.py') || f.endsWith('.go') || f.endsWith('handler'),
      );

      if (!hasHandler) {
        logger.warn(lang.__('CODE_PACKAGE_MAY_MISS_HANDLER'));
      }
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Empty')) {
      throw error;
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line preserve-caught-error
    throw new Error(
      `${lang.__('CODE_PACKAGE_INVALID_ZIP', { error: errorMessage })} (Original: ${errorMessage})`,
    );
  }

  return { size: stats.size, sizeMB };
};

const uploadCodeToTos = async (
  tosClient: Service,
  bucketName: string,
  codePath: string,
  functionName: string,
): Promise<{ bucket: string; key: string }> => {
  const codeContent = await fs.promises.readFile(codePath);
  const timestamp = Date.now();
  const key = `function-codes/${functionName}/${timestamp}/code.zip`;

  logger.info(lang.__('UPLOADING_CODE_TO_TOS', { bucket: bucketName, key }));

  await tosClient.fetchOpenAPI({
    Action: 'PutObject',
    Version: '2018-08-01',
    method: 'PUT',
    headers: {
      'content-type': 'application/zip',
      'content-length': codeContent.length.toString(),
    },
    data: codeContent,
    query: {
      bucket: bucketName,
      key: key,
    },
  });

  logger.info(
    lang.__('CODE_UPLOADED_TO_TOS', {
      bucket: bucketName,
      key,
      size: (codeContent.length / 1024 / 1024).toFixed(2),
    }),
  );

  return { bucket: bucketName, key };
};

export const createVefaasOperations = (client: VefaasSdkClient) => {
  const tosClient = new Service({
    serviceName: 'tos',
    defaultVersion: '2018-08-01',
    host: `tos-${(client as unknown as { region: string }).region}.volces.com`,
    accessKeyId: (client as unknown as { accessKeyId: string }).accessKeyId,
    secretKey: (client as unknown as { secretKey: string }).secretKey,
    region: (client as unknown as { region: string }).region,
  });

  // veFaaS identifies functions by their generated Id (not Name) for
  // GetFunction/Update/Delete; callers probe by name, so list + match on Name.
  const listAllFunctions = async (): Promise<Array<Record<string, unknown>>> => {
    const items: Array<Record<string, unknown>> = [];
    let pageNumber = 1;
    const pageSize = 100;
    for (;;) {
      const response = await client.fetchOpenAPI({
        Action: 'ListFunctions',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { PageSize: pageSize, PageNumber: pageNumber },
      });
      const result = (response.Result || {}) as Record<string, unknown>;
      const page = (result.Items || []) as Array<Record<string, unknown>>;
      items.push(...page);
      if (page.length < pageSize) break;
      pageNumber += 1;
    }
    return items;
  };

  const resolveFunctionIdByName = async (functionName: string): Promise<string | null> => {
    const functions = await listAllFunctions();
    const match = functions.find((fn) => fn.Name === functionName);
    return (match?.Id as string) ?? null;
  };

  const operations = {
    // veFaaS 函数代码/配置更新后需发布（Release）才生效；API 网关上游
    // 引用函数时要求函数已发布（OperationDenied.FunctionNotPublished）。
    // RevisionNumber=0 表示发布 Latest 代码并创建新版本（官方 SDK 语义）。
    // Release 是异步的：返回的 Status 可能仍是 inprogress，调用方（如
    // CreateUpstream）必须等发布真正 done 才能引用函数，否则会拿到
    // FunctionNotPublished。这里轮询 GetReleaseStatus 直到 done/failed。
    releaseFunction: async (functionId: string): Promise<string | undefined> => {
      const response = await client.fetchOpenAPI({
        Action: 'Release',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          FunctionId: functionId,
          RevisionNumber: 0,
        },
      });
      const result = (response.Result || {}) as Record<string, unknown>;
      logger.info(lang.__('FUNCTION_RELEASED', { functionId }));
      const releaseRecordId = (result.ReleaseRecordId as string | undefined) ?? undefined;

      const releaseStatus = await pollUntil({
        description: `veFaaS function ${functionId} release to finish`,
        fetch: async () => {
          const statusResponse = await client.fetchOpenAPI({
            Action: 'GetReleaseStatus',
            Version: '2024-06-06',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: { FunctionId: functionId },
          });
          const statusResult = (statusResponse.Result || {}) as Record<string, unknown>;
          return statusResult.Status as string | undefined;
        },
        isDone: (status) => status === 'done' || status === 'failed',
        intervalMs: RELEASE_POLL_INTERVAL_MS,
        maxAttempts: RELEASE_POLL_MAX_ATTEMPTS,
        onProgress: (status, attempt, maxAttempts) => {
          logger.info(
            lang.__('WAITING_FOR_FUNCTION_RELEASE', {
              functionId,
              status: status ?? 'unknown',
              attempt: String(attempt),
              maxAttempts: String(maxAttempts),
            }),
          );
        },
      });

      if (releaseStatus === 'failed') {
        throw new Error(`veFaaS function ${functionId} release failed`);
      }

      return releaseRecordId;
    },

    waitForFunctionDeleted: async (functionId: string): Promise<void> => {
      try {
        await pollUntil({
          description: `veFaaS function ${functionId} to be deleted`,
          fetch: () => operations.getFunctionById(functionId),
          isDone: (info) => info === null,
          intervalMs: SCF_STATUS_POLL_INTERVAL_MS,
          maxAttempts: SCF_STATUS_POLL_MAX_ATTEMPTS,
        });
      } catch (e) {
        if (e instanceof PollingTimeoutError) {
          throw new Error(`Timed out waiting for veFaaS function ${functionId} to be deleted`, {
            cause: e,
          });
        }
        throw e;
      }
    },

    createFunction: async (
      config: VefaasFunctionConfig,
      codePath: string,
    ): Promise<{ functionId: string; releaseRecordId?: string }> => {
      const { size, sizeMB } = await validateCodePackage(codePath);

      let codeSource:
        | { SourceType: 'zip'; Source: string }
        | { SourceType: 'tos'; TosBucket: string; TosKey: string };

      if (size <= MAX_ZIP_SIZE_BYTES) {
        const codeContent = await fs.promises.readFile(codePath);
        const codeBase64 = codeContent.toString('base64');

        logger.info(
          lang.__('DEPLOYING_FUNCTION_WITH_ZIP', {
            functionName: config.functionName,
            size: sizeMB,
          }),
        );

        codeSource = {
          SourceType: 'zip',
          Source: codeBase64,
        };
      } else {
        const tosBucket = `vefaas-codes-${(client as unknown as { region: string }).region || 'cn-beijing'}`;
        const { bucket, key } = await uploadCodeToTos(
          tosClient,
          tosBucket,
          codePath,
          config.functionName,
        );

        logger.info(
          lang.__('DEPLOYING_FUNCTION_WITH_TOS', {
            functionName: config.functionName,
            size: sizeMB,
            bucket,
            key,
          }),
        );

        codeSource = {
          SourceType: 'tos',
          TosBucket: bucket,
          TosKey: key,
        };
      }

      const params = {
        Name: config.functionName,
        Runtime: config.runtime,
        Handler: config.handler,
        MemoryMB: config.memoryMb,
        RequestTimeout: config.requestTimeout,
        ...(config.description && { Description: config.description }),
        ...(config.environmentVariables && {
          Envs: buildEnvVariables(config.environmentVariables),
        }),
        ...(config.role && { Role: config.role }),
        ...(config.Tags && { Tags: config.Tags }),
        ...codeSource,
        ...(config.vpcConfig && {
          VpcConfig: {
            EnableVpc: true,
            VpcId: config.vpcConfig.vpcId,
            SubnetIds: config.vpcConfig.subnetIds,
            SecurityGroupIds: config.vpcConfig.securityGroupIds,
          },
        }),
        ...(config.tosMountConfig && {
          TosMountConfig: {
            EnableTos: true,
            MountPoints: [
              {
                BucketName: config.tosMountConfig.bucketName,
                LocalMountPath: config.tosMountConfig.mountPath,
              },
            ],
          },
        }),
        ...(config.logConfig && {
          TlsConfig: {
            EnableLog: true,
            TlsProjectId: config.logConfig.project,
            TlsTopicId: config.logConfig.topic,
          },
        }),
      };

      const response = await client.fetchOpenAPI({
        Action: 'CreateFunction',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: params,
      });

      const result = (response.Result || {}) as Record<string, unknown>;
      const functionId = (result.Id as string) ?? (result.FunctionId as string | undefined);
      if (!functionId) {
        throw new Error(`CreateFunction did not return a function Id for ${config.functionName}`);
      }

      const releaseRecordId = await operations.releaseFunction(functionId);

      logger.info(lang.__('FUNCTION_CREATED', { functionName: config.functionName }));
      return { functionId, releaseRecordId };
    },

    getFunction: async (functionName: string): Promise<VefaasFunctionInfo | null> => {
      try {
        const functionId = await resolveFunctionIdByName(functionName);
        if (!functionId) {
          return null;
        }
        return operations.getFunctionById(functionId);
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ResourceNotFound' || error.code === 'FunctionNotFound') {
            return null;
          }
        }
        throw error;
      }
    },

    getFunctionById: async (functionId: string): Promise<VefaasFunctionInfo | null> => {
      let response: Awaited<ReturnType<typeof client.fetchOpenAPI>>;
      try {
        response = await client.fetchOpenAPI({
          Action: 'GetFunction',
          Version: '2024-06-06',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { Id: functionId },
        });

        const data = (response.Result || {}) as Record<string, unknown>;

        return {
          functionId: (data.Id as string) ?? (data.FunctionId as string | undefined),
          functionName: (data.Name as string) ?? (data.FunctionName as string | undefined),
          runtime: data.Runtime as string | undefined,
          handler: data.Handler as string | undefined,
          memoryMb: (data.MemoryMB as number | undefined) ?? (data.MemoryMb as number | undefined),
          requestTimeout: data.RequestTimeout as number | undefined,
          description: data.Description as string | undefined,
          environmentVariables: parseEnvVariables(
            data.Envs as Array<{ key: string; value: string }> | undefined,
          ),
          status: data.Status as string | undefined,
          createdTime: data.CreationTime as string | undefined,
          lastModifiedTime: data.LastUpdateTime as string | undefined,
          role: data.Role as string | undefined,
          vpcConfig: (() => {
            const raw = data.VpcConfig as Record<string, unknown> | undefined;
            if (!raw || Object.keys(raw).length === 0) return undefined;
            return {
              vpcId: raw.VpcId as string | undefined,
              subnetIds: raw.SubnetIds as string[] | undefined,
              securityGroupIds: raw.SecurityGroupIds as string[] | undefined,
              enableVpc: raw.EnableVpc as boolean | undefined,
              enableSharedInternetAccess: raw.EnableSharedInternetAccess as boolean | undefined,
            };
          })(),
          logConfig: (() => {
            const raw =
              (data.TlsConfig as Record<string, unknown> | undefined) ??
              (data.LogConfig as Record<string, unknown> | undefined);
            if (!raw || Object.keys(raw).length === 0) return undefined;
            return {
              project: raw.TlsProjectId as string | undefined,
              topic: raw.TlsTopicId as string | undefined,
              enableLog: raw.EnableLog as boolean | undefined,
            };
          })(),
          Tags: (data.Tags as Array<{ Key?: string; Value?: string }> | undefined)?.map((t) => ({
            Key: t.Key,
            Value: t.Value,
          })),
          // Maximum-detail fields — retain everything GetFunction returns so
          // state keeps full resource detail (CPU strategy, concurrency,
          // network/storage/log toggles, async tasks, triggers count, tags).
          exclusiveMode: data.ExclusiveMode as boolean | undefined,
          maxConcurrency: data.MaxConcurrency as number | undefined,
          codeSize: data.CodeSize as number | undefined,
          codeSizeLimit: data.CodeSizeLimit as number | undefined,
          sourceLocation: data.SourceLocation as string | undefined,
          sourceType: data.SourceType as string | undefined,
          owner: data.Owner as string | undefined,
          triggersCount: data.TriggersCount as number | undefined,
          instanceType: data.InstanceType as string | undefined,
          initializerSec: data.InitializerSec as number | undefined,
          command: data.Command as string | undefined,
          port: data.Port as number | undefined,
          cpuStrategy: data.CpuStrategy as string | undefined,
          projectName: data.ProjectName as string | undefined,
          functionType: data.FunctionType as string | undefined,
          cell: data.Cell as string | undefined,
          enableApmplus: data.EnableApmplus as boolean | undefined,
          nasStorage: (() => {
            const raw = data.NasStorage as Record<string, unknown> | undefined;
            if (!raw || Object.keys(raw).length === 0) return undefined;
            return {
              enableNas: raw.EnableNas as boolean | undefined,
              nasConfigs: (raw.NasConfigs as Array<Record<string, unknown>> | undefined)?.map(
                (c) => ({
                  gid: c.Gid as number | undefined,
                  uid: c.Uid as number | undefined,
                  remotePath: c.RemotePath as string | undefined,
                  fileSystemId: c.FileSystemId as string | undefined,
                  mountPointId: c.MountPointId as string | undefined,
                  localMountPath: c.LocalMountPath as string | undefined,
                }),
              ),
            };
          })(),
          tosMountConfig: (() => {
            const raw = data.TosMountConfig as Record<string, unknown> | undefined;
            if (!raw || Object.keys(raw).length === 0) return undefined;
            return {
              enableTos: raw.EnableTos as boolean | undefined,
              mountPoints: (raw.MountPoints as Array<Record<string, unknown>> | undefined)?.map(
                (m) => ({
                  endpoint: m.Endpoint as string | undefined,
                  readOnly: m.ReadOnly as boolean | undefined,
                  bucketName: m.BucketName as string | undefined,
                  bucketPath: m.BucketPath as string | undefined,
                  localMountPath: m.LocalMountPath as string | undefined,
                }),
              ),
            };
          })(),
          asyncTaskConfig: (() => {
            const raw = data.AsyncTaskConfig as Record<string, unknown> | undefined;
            if (!raw || Object.keys(raw).length === 0) return undefined;
            const destination = raw.DestinationConfig as Record<string, unknown> | undefined;
            const mapDestination = (d: unknown) => {
              const obj = d as Record<string, unknown> | undefined;
              if (!obj) return undefined;
              return { destination: obj.Destination as string | undefined };
            };
            return {
              enableAsyncTask: raw.EnableAsyncTask as boolean | undefined,
              maxRetry: raw.MaxRetry as number | undefined,
              destinationConfig: destination
                ? {
                    onSuccess: mapDestination(destination.OnSuccess),
                    onFailure: mapDestination(destination.OnFailure),
                  }
                : undefined,
            };
          })(),
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ResourceNotFound' || error.code === 'FunctionNotFound') {
            return null;
          }
        }
        throw error;
      }
    },

    updateFunctionConfiguration: async (
      functionId: string,
      config: VefaasFunctionConfig,
    ): Promise<string | undefined> => {
      const params = {
        Id: functionId,
        Handler: config.handler,
        Runtime: config.runtime,
        MemoryMB: config.memoryMb,
        RequestTimeout: config.requestTimeout,
        ...(config.description !== undefined && { Description: config.description }),
        ...(config.environmentVariables && {
          Envs: buildEnvVariables(config.environmentVariables),
        }),
        ...(config.role && { Role: config.role }),
        ...(config.vpcConfig && {
          VpcConfig: {
            EnableVpc: true,
            VpcId: config.vpcConfig.vpcId,
            SubnetIds: config.vpcConfig.subnetIds,
            SecurityGroupIds: config.vpcConfig.securityGroupIds,
          },
        }),
        ...(config.tosMountConfig && {
          TosMountConfig: {
            EnableTos: true,
            MountPoints: [
              {
                BucketName: config.tosMountConfig.bucketName,
                LocalMountPath: config.tosMountConfig.mountPath,
              },
            ],
          },
        }),
        ...(config.logConfig && {
          TlsConfig: {
            EnableLog: true,
            TlsProjectId: config.logConfig.project,
            TlsTopicId: config.logConfig.topic,
          },
        }),
      };

      await client.fetchOpenAPI({
        Action: 'UpdateFunction',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: params,
      });

      // UpdateFunction only edits the draft config — veFaaS serves the last
      // published revision until Release is called. Without it the function
      // stays in an unpublished intermediate state and API Gateway invocations
      // fail. Mirror the create/code-update paths and release after config
      // changes too.
      const releaseRecordId = await operations.releaseFunction(functionId);

      logger.info(lang.__('FUNCTION_CONFIGURATION_UPDATED', { functionName: config.functionName }));
      return releaseRecordId;
    },

    updateFunctionCode: async (
      functionId: string,
      codePath: string,
    ): Promise<{ releaseRecordId?: string }> => {
      const { size, sizeMB } = await validateCodePackage(codePath);

      let codeSource:
        | { SourceType: 'zip'; Source: string }
        | { SourceType: 'tos'; TosBucket: string; TosKey: string };

      if (size <= MAX_ZIP_SIZE_BYTES) {
        const codeContent = await fs.promises.readFile(codePath);
        const codeBase64 = codeContent.toString('base64');

        logger.info(
          lang.__('UPDATING_FUNCTION_CODE_WITH_ZIP', {
            functionName: functionId,
            size: sizeMB,
          }),
        );

        codeSource = {
          SourceType: 'zip',
          Source: codeBase64,
        };
      } else {
        const tosBucket = `vefaas-codes-${(client as unknown as { region: string }).region || 'cn-beijing'}`;
        const { bucket, key } = await uploadCodeToTos(tosClient, tosBucket, codePath, functionId);

        logger.info(
          lang.__('UPDATING_FUNCTION_CODE_WITH_TOS', {
            functionName: functionId,
            size: sizeMB,
            bucket,
            key,
          }),
        );

        codeSource = {
          SourceType: 'tos',
          TosBucket: bucket,
          TosKey: key,
        };
      }

      await client.fetchOpenAPI({
        Action: 'UpdateFunction',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          Id: functionId,
          ...codeSource,
        },
      });

      const releaseRecordId = await operations.releaseFunction(functionId);

      logger.info(lang.__('FUNCTION_CODE_UPDATED', { functionName: functionId }));
      return { releaseRecordId };
    },

    deleteFunction: async (functionId: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'DeleteFunction',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { Id: functionId },
      });

      // DeleteFunction returns immediately — wait for the function to be gone so
      // a subsequent create (retry) does not collide with a still-deleting function.
      await operations.waitForFunctionDeleted(functionId);

      logger.info(lang.__('FUNCTION_DELETED', { functionName: functionId }));
    },

    listFunctions: async (): Promise<VefaasFunctionInfo[]> => {
      const functions = await listAllFunctions();

      return functions.map((fn: Record<string, unknown>) => ({
        functionId: (fn.Id as string) ?? (fn.FunctionId as string | undefined),
        functionName: (fn.Name as string) ?? (fn.FunctionName as string | undefined),
        runtime: fn.Runtime as string | undefined,
        handler: fn.Handler as string | undefined,
        memoryMb: (fn.MemoryMB as number | undefined) ?? (fn.MemoryMb as number | undefined),
        requestTimeout: fn.RequestTimeout as number | undefined,
        description: fn.Description as string | undefined,
        status: fn.Status as string | undefined,
        createdTime: fn.CreationTime as string | undefined,
        lastModifiedTime: fn.LastUpdateTime as string | undefined,
      }));
    },
  };

  return operations;
};

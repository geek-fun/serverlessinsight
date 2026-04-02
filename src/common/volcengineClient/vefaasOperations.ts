import { Service } from '@volcengine/openapi';
import type { VefaasFunctionConfig, VefaasFunctionInfo } from './types';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import * as fs from 'node:fs';

type VefaasSdkClient = Service;

const MAX_ZIP_SIZE_MB = 50;
const MAX_ZIP_SIZE_BYTES = MAX_ZIP_SIZE_MB * 1024 * 1024;
const MAX_TOS_SIZE_MB = 500;
const MAX_TOS_SIZE_BYTES = MAX_TOS_SIZE_MB * 1024 * 1024;

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
    protocol: 'https',
    host: 'tos-cn-beijing.volces.com',
    accessKeyId: (client as unknown as { accessKeyId: string }).accessKeyId,
    secretKey: (client as unknown as { secretKey: string }).secretKey,
    region: (client as unknown as { region: string }).region,
  });

  return {
    createFunction: async (config: VefaasFunctionConfig, codePath: string): Promise<void> => {
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
        FunctionName: config.functionName,
        Runtime: config.runtime,
        Handler: config.handler,
        MemoryMb: config.memoryMb,
        RequestTimeout: config.requestTimeout,
        ...(config.description && { Description: config.description }),
        ...(config.environmentVariables && {
          Envs: buildEnvVariables(config.environmentVariables),
        }),
        ...(config.role && { Role: config.role }),
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
          LogConfig: {
            EnableLog: true,
            ProjectName: config.logConfig.project,
            TopicName: config.logConfig.topic,
          },
        }),
      };

      await client.fetchOpenAPI({
        Action: 'CreateFunction',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: params,
      });

      logger.info(lang.__('FUNCTION_CREATED', { functionName: config.functionName }));
    },

    getFunction: async (functionName: string): Promise<VefaasFunctionInfo | null> => {
      try {
        const response = await client.fetchOpenAPI({
          Action: 'GetFunction',
          Version: '2024-06-06',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { FunctionName: functionName },
        });

        const data = (response.Result || {}) as Record<string, unknown>;

        return {
          functionId: data.FunctionId as string | undefined,
          functionName: data.FunctionName as string | undefined,
          runtime: data.Runtime as string | undefined,
          handler: data.Handler as string | undefined,
          memoryMb: data.MemoryMb as number | undefined,
          requestTimeout: data.RequestTimeout as number | undefined,
          description: data.Description as string | undefined,
          environmentVariables: parseEnvVariables(
            data.Envs as Array<{ key: string; value: string }> | undefined,
          ),
          status: data.Status as string | undefined,
          createdTime: data.CreationTime as string | undefined,
          lastModifiedTime: data.LastUpdateTime as string | undefined,
          role: data.Role as string | undefined,
          vpcConfig: data.VpcConfig
            ? {
                vpcId: (data.VpcConfig as Record<string, unknown>).VpcId as string | undefined,
                subnetIds: (data.VpcConfig as Record<string, unknown>).SubnetIds as
                  | string[]
                  | undefined,
                securityGroupIds: (data.VpcConfig as Record<string, unknown>).SecurityGroupIds as
                  | string[]
                  | undefined,
              }
            : undefined,
          logConfig: data.LogConfig
            ? {
                project: (data.LogConfig as Record<string, unknown>).ProjectName as
                  | string
                  | undefined,
                topic: (data.LogConfig as Record<string, unknown>).TopicName as string | undefined,
              }
            : undefined,
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

    updateFunctionConfiguration: async (config: VefaasFunctionConfig): Promise<void> => {
      const params = {
        FunctionName: config.functionName,
        Handler: config.handler,
        Runtime: config.runtime,
        MemoryMb: config.memoryMb,
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
          LogConfig: {
            EnableLog: true,
            ProjectName: config.logConfig.project,
            TopicName: config.logConfig.topic,
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

      logger.info(lang.__('FUNCTION_CONFIGURATION_UPDATED', { functionName: config.functionName }));
    },

    updateFunctionCode: async (functionName: string, codePath: string): Promise<void> => {
      const { size, sizeMB } = await validateCodePackage(codePath);

      let codeSource:
        | { SourceType: 'zip'; Source: string }
        | { SourceType: 'tos'; TosBucket: string; TosKey: string };

      if (size <= MAX_ZIP_SIZE_BYTES) {
        const codeContent = await fs.promises.readFile(codePath);
        const codeBase64 = codeContent.toString('base64');

        logger.info(
          lang.__('UPDATING_FUNCTION_CODE_WITH_ZIP', {
            functionName,
            size: sizeMB,
          }),
        );

        codeSource = {
          SourceType: 'zip',
          Source: codeBase64,
        };
      } else {
        const tosBucket = `vefaas-codes-${(client as unknown as { region: string }).region || 'cn-beijing'}`;
        const { bucket, key } = await uploadCodeToTos(tosClient, tosBucket, codePath, functionName);

        logger.info(
          lang.__('UPDATING_FUNCTION_CODE_WITH_TOS', {
            functionName,
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
          FunctionName: functionName,
          ...codeSource,
        },
      });

      logger.info(lang.__('FUNCTION_CODE_UPDATED', { functionName }));
    },

    deleteFunction: async (functionName: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'DeleteFunction',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { FunctionName: functionName },
      });

      logger.info(lang.__('FUNCTION_DELETED', { functionName }));
    },

    listFunctions: async (): Promise<VefaasFunctionInfo[]> => {
      const response = await client.fetchOpenAPI({
        Action: 'ListFunctions',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {},
      });

      const result = (response.Result || {}) as Record<string, unknown>;
      const functions = (result.Functions || []) as Array<Record<string, unknown>>;

      return functions.map((fn: Record<string, unknown>) => ({
        functionId: fn.FunctionId as string | undefined,
        functionName: fn.FunctionName as string | undefined,
        runtime: fn.Runtime as string | undefined,
        handler: fn.Handler as string | undefined,
        memoryMb: fn.MemoryMb as number | undefined,
        requestTimeout: fn.RequestTimeout as number | undefined,
        description: fn.Description as string | undefined,
        status: fn.Status as string | undefined,
        createdTime: fn.CreationTime as string | undefined,
        lastModifiedTime: fn.LastUpdateTime as string | undefined,
      }));
    },
  };
};

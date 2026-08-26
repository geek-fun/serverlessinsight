import * as tencentcloud from 'tencentcloud-sdk-nodejs-scf';
import * as tagTencentcloud from 'tencentcloud-sdk-nodejs-tag';
import * as camTencentcloud from 'tencentcloud-sdk-nodejs-cam';
import { ScfFunctionConfig, ScfFunctionInfo } from './types';
import { pollUntil } from '../polling';
import { SCF_STATUS_POLL_INTERVAL_MS, SCF_STATUS_POLL_MAX_ATTEMPTS } from '../constants';

type ScfSdkClient = InstanceType<typeof tencentcloud.scf.v20180416.Client>;
type TagSdkClient = InstanceType<typeof tagTencentcloud.tag.v20180813.Client>;
type CamSdkClient = InstanceType<typeof camTencentcloud.cam.v20190116.Client>;

export interface ScfOperationsDeps {
  tag: TagSdkClient;
  cam: CamSdkClient;
  region: string;
  namespace: string;
}

export const createScfOperations = (scfClient: ScfSdkClient, deps: ScfOperationsDeps) => {
  const { tag: tagClient, cam: camClient, region, namespace } = deps;

  const getAccountUin = async (): Promise<string> => {
    // Tag-service ARNs address the resource by its owning account. For
    // sub-account (CAM key) callers, Uin is the sub-account while OwnerUin is
    // the main account that actually owns the resources — the tag service
    // validates against OwnerUin (verified empirically).
    const res = await camClient.GetUserAppId(null);
    const uin = res?.OwnerUin || res?.Uin;
    if (!uin) {
      throw new Error('Failed to resolve Tencent Cloud account Uin for resource tagging');
    }
    return uin;
  };

  const tagFunction = async (functionName: string, tags: Array<{ Key: string; Value: string }>) => {
    if (tags.length === 0) return;
    const uin = await getAccountUin();
    const resource = `qcs::scf:${region}:uin/${uin}:namespace/${namespace}/function/${functionName}`;
    await tagClient.TagResources({
      ResourceList: [resource],
      Tags: tags.map((t) => ({ TagKey: t.Key, TagValue: t.Value })),
    });
  };

  const operations = {
    waitForFunctionActive: async (functionName: string): Promise<ScfFunctionInfo | null> =>
      pollUntil({
        description: `SCF function ${functionName} to become Active`,
        fetch: () => operations.getFunction(functionName),
        isDone: (info) => info?.Status === 'Active',
        intervalMs: SCF_STATUS_POLL_INTERVAL_MS,
        maxAttempts: SCF_STATUS_POLL_MAX_ATTEMPTS,
      }),

    waitForFunctionDeleted: async (functionName: string): Promise<void> => {
      await pollUntil({
        description: `SCF function ${functionName} to be deleted`,
        fetch: () => operations.getFunction(functionName),
        isDone: (info) => info === null,
        intervalMs: SCF_STATUS_POLL_INTERVAL_MS,
        maxAttempts: SCF_STATUS_POLL_MAX_ATTEMPTS,
      });
    },

    createFunction: async (config: ScfFunctionConfig, codeBase64: string): Promise<void> => {
      const params = {
        FunctionName: config.FunctionName,
        Code: {
          ZipFile: codeBase64,
        },
        Handler: config.Handler,
        Runtime: config.Runtime,
        MemorySize: config.MemorySize,
        Timeout: config.Timeout,
        ...(config.Role && { Role: config.Role }),
        ...(config.ClsLogsetId && { ClsLogsetId: config.ClsLogsetId }),
        ...(config.ClsTopicId && { ClsTopicId: config.ClsTopicId }),
        ...(config.Environment && { Environment: config.Environment }),
      };

      await scfClient.CreateFunction(params);

      // CreateFunction is async on Tencent SCF — the function stays in 'Creating'
      // until the platform finishes provisioning. Follow-up calls (e.g.
      // CreateTrigger) fail with "Status is Creating, unsupport operate" if issued
      // too early, so poll until Active before returning.
      await operations.waitForFunctionActive(params.FunctionName);

      // CreateFunction's Tags param is silently dropped by the API (verified
      // empirically — GetFunction returns [] even when Tags was sent). Ownership
      // tags must be attached via the tag service's TagResources with the
      // namespace-qualified ARN, otherwise adoption can never verify ownership.
      if (config.Tags && config.Tags.length > 0) {
        await tagFunction(params.FunctionName, config.Tags);
      }
    },

    getFunction: async (functionName: string): Promise<ScfFunctionInfo | null> => {
      try {
        const params = {
          FunctionName: functionName,
        };

        const response = await scfClient.GetFunction(params);

        if (!response || !response.FunctionName) {
          return null;
        }

        const environment = response.Environment?.Variables
          ? {
              Variables: response.Environment.Variables.map(
                (v: { Key?: string; Value?: string }) => ({
                  Key: v.Key || '',
                  Value: v.Value || '',
                }),
              ),
            }
          : undefined;

        const triggers = response.Triggers?.map(
          (t: {
            ModTime?: string;
            Type?: string;
            TriggerDesc?: string;
            TriggerName?: string;
            AddTime?: string;
            Enable?: number;
            CustomArgument?: string;
            AvailableStatus?: string;
            ResourceId?: string;
            BindStatus?: string;
            TriggerAttribute?: string;
            Qualifier?: string;
            Description?: string;
          }) => ({
            ModTime: t.ModTime || '',
            Type: t.Type || '',
            TriggerDesc: t.TriggerDesc || '',
            TriggerName: t.TriggerName || '',
            AddTime: t.AddTime || '',
            Enable: t.Enable || 0,
            CustomArgument: t.CustomArgument,
            AvailableStatus: t.AvailableStatus,
            ResourceId: t.ResourceId,
            BindStatus: t.BindStatus,
            TriggerAttribute: t.TriggerAttribute,
            Qualifier: t.Qualifier,
            Description: t.Description,
          }),
        );

        const tags = response.Tags?.map((t: { Key?: string; Value?: string }) => ({
          Key: t.Key || '',
          Value: t.Value || '',
        }));

        return {
          FunctionName: response.FunctionName || '',
          Runtime: response.Runtime || '',
          Handler: response.Handler || '',
          MemorySize: response.MemorySize || 128,
          Timeout: response.Timeout || 3,
          Environment: environment,
          ModTime: response.ModTime,
          CodeSha256: undefined,
          CodeInfo: response.CodeInfo,
          Description: response.Description,
          Triggers: triggers,
          CodeSize: response.CodeSize,
          FunctionVersion: response.FunctionVersion,
          VpcConfig: response.VpcConfig,
          UseGpu: response.UseGpu,
          CodeResult: response.CodeResult,
          CodeError: response.CodeError,
          ErrNo: response.ErrNo,
          Namespace: response.Namespace,
          Role: response.Role,
          InstallDependency: response.InstallDependency,
          Status: response.Status,
          StatusDesc: response.StatusDesc,
          ClsLogsetId: response.ClsLogsetId,
          ClsTopicId: response.ClsTopicId,
          FunctionId: response.FunctionId,
          Tags: tags,
          EipConfig: response.EipConfig,
          AccessInfo: response.AccessInfo,
          Type: response.Type,
          L5Enable: response.L5Enable,
          Layers: response.Layers,
          DeadLetterConfig: response.DeadLetterConfig,
          AddTime: response.AddTime,
          PublicNetConfig: response.PublicNetConfig,
          OnsEnable: response.OnsEnable,
          CfsConfig: response.CfsConfig,
          AvailableStatus: response.AvailableStatus,
          Qualifier: response.Qualifier,
          InitTimeout: response.InitTimeout,
          StatusReasons: response.StatusReasons,
          AsyncRunEnable: response.AsyncRunEnable,
          TraceEnable: response.TraceEnable,
          ImageConfig: response.ImageConfig,
          ProtocolType: response.ProtocolType,
          ProtocolParams: response.ProtocolParams,
          InstanceConcurrencyConfig: response.InstanceConcurrencyConfig,
          DnsCache: response.DnsCache,
          IntranetConfig: response.IntranetConfig,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'ResourceNotFound.FunctionName' ||
            error.code === 'ResourceNotFound.Function')
        ) {
          return null;
        }
        throw error;
      }
    },

    updateFunctionConfiguration: async (config: ScfFunctionConfig): Promise<void> => {
      // Handler and Runtime are set at creation time and CANNOT be changed via
      // UpdateFunctionConfiguration (Tencent rejects them with
      // InvalidParameterValue.Handler / .Runtime) — omit them here.
      //
      // Tencent requires Role whenever the Cls* destination changes, else
      // UpdateFunctionConfiguration fails with InvalidParameterValue.ClsRole —
      // so Role is forwarded here whenever an si-managed role is present.
      const params = {
        FunctionName: config.FunctionName,
        MemorySize: config.MemorySize,
        Timeout: config.Timeout,
        ...(config.Role && { Role: config.Role }),
        ...(config.ClsLogsetId && { ClsLogsetId: config.ClsLogsetId }),
        ...(config.ClsTopicId && { ClsTopicId: config.ClsTopicId }),
        ...(config.Environment && { Environment: config.Environment }),
      };

      await operations.waitForFunctionActive(config.FunctionName);
      await scfClient.UpdateFunctionConfiguration(params);
    },

    updateFunctionCode: async (functionName: string, codeBase64: string): Promise<void> => {
      const params = {
        FunctionName: functionName,
        ZipFile: codeBase64,
      };

      await operations.waitForFunctionActive(functionName);
      await scfClient.UpdateFunctionCode(params);
    },

    createTrigger: async (params: {
      FunctionName: string;
      TriggerName: string;
      Type: string;
      TriggerDesc?: string;
      Qualifier?: string;
      Enable?: string;
    }): Promise<void> => {
      await scfClient.CreateTrigger({
        FunctionName: params.FunctionName,
        TriggerName: params.TriggerName,
        Type: params.Type,
        ...(params.TriggerDesc ? { TriggerDesc: params.TriggerDesc } : {}),
        ...(params.Qualifier ? { Qualifier: params.Qualifier } : {}),
        ...(params.Enable ? { Enable: params.Enable } : {}),
      });
    },

    deleteTrigger: async (params: {
      FunctionName: string;
      TriggerName: string;
      Type: string;
    }): Promise<void> => {
      await scfClient.DeleteTrigger({
        FunctionName: params.FunctionName,
        TriggerName: params.TriggerName,
        Type: params.Type,
      });
    },

    createCustomDomain: async (params: {
      Domain: string;
      Protocol: string;
      EndpointsConfig: Array<{
        Namespace: string;
        FunctionName: string;
        Qualifier: string;
        PathMatch: string;
      }>;
      CertConfig?: { CertificateId?: string };
    }): Promise<void> => {
      await scfClient.CreateCustomDomain({
        Domain: params.Domain,
        Protocol: params.Protocol,
        EndpointsConfig: params.EndpointsConfig.map((ep) => ({
          Namespace: ep.Namespace,
          FunctionName: ep.FunctionName,
          Qualifier: ep.Qualifier,
          PathMatch: ep.PathMatch,
        })),
        ...(params.CertConfig ? { CertConfig: params.CertConfig } : {}),
      });
    },

    getCustomDomain: async (
      domain: string,
    ): Promise<{
      Domain?: string;
      Protocol?: string;
      EndpointsConfig?: Array<{
        FunctionName?: string;
        Qualifier?: string;
        PathMatch?: string;
      }>;
    } | null> => {
      try {
        const response = await scfClient.GetCustomDomain({ Domain: domain });
        if (!response) return null;
        return {
          Domain: response.Domain,
          Protocol: response.Protocol,
          EndpointsConfig: response.EndpointsConfig?.map((ep) => ({
            FunctionName: ep.FunctionName,
            Qualifier: ep.Qualifier,
            PathMatch: ep.PathMatch,
          })),
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'ResourceNotFound'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteCustomDomain: async (domain: string): Promise<void> => {
      await scfClient.DeleteCustomDomain({ Domain: domain });
    },

    deleteFunction: async (functionName: string): Promise<void> => {
      const params = {
        FunctionName: functionName,
      };

      await scfClient.DeleteFunction(params);

      // DeleteFunction returns immediately — wait for the function to be gone so
      // a subsequent create (retry) does not collide with a still-deleting function.
      await operations.waitForFunctionDeleted(functionName);
    },
  };

  return operations;
};

import * as tencentcloud from 'tencentcloud-sdk-nodejs-scf';
import { Context } from '../../types';
import { ScfFunctionConfig, ScfFunctionInfo } from './scfTypes';
import fs from 'node:fs';

const ScfClient = tencentcloud.scf.v20180416.Client;

type TencentCloudClient = InstanceType<typeof ScfClient>;

export class ScfProvider {
  private client: TencentCloudClient;

  constructor(private readonly context: Context) {
    const clientConfig = {
      credential: {
        secretId: context.accessKeyId,
        secretKey: context.accessKeySecret,
      },
      region: context.region,
      profile: {
        httpProfile: {
          endpoint: 'scf.tencentcloudapi.com',
        },
      },
    };
    this.client = new ScfClient(clientConfig);
  }

  async createFunction(config: ScfFunctionConfig, codePath: string): Promise<void> {
    const codeBuffer = fs.readFileSync(codePath);
    const codeBase64 = codeBuffer.toString('base64');

    const params = {
      FunctionName: config.FunctionName,
      Code: {
        ZipFile: codeBase64,
      },
      Handler: config.Handler,
      Runtime: config.Runtime,
      MemorySize: config.MemorySize,
      Timeout: config.Timeout,
      Environment: config.Environment,
    };

    await this.client.CreateFunction(params);
  }

  async getFunction(functionName: string): Promise<ScfFunctionInfo | null> {
    try {
      const params = {
        FunctionName: functionName,
      };

      const response = await this.client.GetFunction(params);

      if (!response || !response.FunctionName) {
        return null;
      }

      const environment = response.Environment?.Variables
        ? {
            Variables: response.Environment.Variables.map((v) => ({
              Key: v.Key || '',
              Value: v.Value || '',
            })),
          }
        : undefined;

      return {
        FunctionName: response.FunctionName || '',
        Runtime: response.Runtime || '',
        Handler: response.Handler || '',
        MemorySize: response.MemorySize || 128,
        Timeout: response.Timeout || 3,
        Environment: environment,
        ModTime: response.ModTime,
      };
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'ResourceNotFound.FunctionName'
      ) {
        return null;
      }
      throw error;
    }
  }

  async updateFunctionConfiguration(config: ScfFunctionConfig): Promise<void> {
    const params = {
      FunctionName: config.FunctionName,
      Handler: config.Handler,
      Runtime: config.Runtime,
      MemorySize: config.MemorySize,
      Timeout: config.Timeout,
      Environment: config.Environment,
    };

    await this.client.UpdateFunctionConfiguration(params);
  }

  async updateFunctionCode(functionName: string, codePath: string): Promise<void> {
    const codeBuffer = fs.readFileSync(codePath);
    const codeBase64 = codeBuffer.toString('base64');

    const params = {
      FunctionName: functionName,
      ZipFile: codeBase64,
    };

    await this.client.UpdateFunctionCode(params);
  }

  async deleteFunction(functionName: string): Promise<void> {
    const params = {
      FunctionName: functionName,
    };

    await this.client.DeleteFunction(params);
  }
}

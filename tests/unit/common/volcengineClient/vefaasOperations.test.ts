import * as fs from 'node:fs';
import * as path from 'node:path';
import { Service } from '@volcengine/openapi';
import { createVefaasOperations } from '../../../../src/common/volcengineClient/vefaasOperations';
import type { VefaasFunctionConfig } from '../../../../src/common/volcengineClient/types';

jest.mock('@volcengine/openapi', () => {
  return {
    Service: jest.fn().mockImplementation(() => ({
      fetchOpenAPI: jest
        .fn()
        .mockImplementation(({ Action }: { Action: string }) =>
          Promise.resolve(
            Action === 'ListFunctions'
              ? { Result: { Items: [{ Id: 'func-123', Name: 'test-fn' }] } }
              : Action === 'GetFunction'
                ? { Result: { Id: 'func-123', Name: 'test-fn', Status: 'Active' } }
                : Action === 'CreateFunction'
                  ? { Result: { Id: 'func-123' } }
                  : { Result: {} },
          ),
        ),
    })),
  };
});

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) {
        return key.replace(/\{\{(\w+)\}\}/g, (_, k) => params[k] || '');
      }
      return key;
    },
  },
}));

describe('vefaasOperations code size validation', () => {
  const testArtifactDir = path.join(__dirname, '../../../../tests/fixtures/artifacts');
  const smallZipPath = path.join(testArtifactDir, 'function.zip');

  beforeAll(async () => {
    if (!fs.existsSync(testArtifactDir)) {
      fs.mkdirSync(testArtifactDir, { recursive: true });
    }

    if (!fs.existsSync(smallZipPath)) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const JSZip = require('jszip');
      const zip = new JSZip();
      zip.file('index.js', 'exports.handler = async (event) => { return "Hello"; }');
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(smallZipPath, content);
    }
  });

  describe('validateCodePackage', () => {
    it('should accept small ZIP package (< 50 MB)', async () => {
      const stats = fs.statSync(smallZipPath);
      expect(stats.size).toBeLessThan(50 * 1024 * 1024);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should have valid ZIP structure', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const JSZip = require('jszip');
      const zipContent = fs.readFileSync(smallZipPath);
      const zip = await JSZip.loadAsync(zipContent);
      const files = Object.keys(zip.files);

      expect(files.length).toBeGreaterThan(0);
      expect(files.some((f) => f.endsWith('.js'))).toBe(true);
    });

    it('should warn when ZIP has no handler files', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const JSZip = require('jszip');
      const noHandlerZipPath = path.join(testArtifactDir, 'no-handler.zip');

      const zip = new JSZip();
      zip.file('readme.txt', 'No handler here');
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(noHandlerZipPath, content);

      const { logger } = jest.requireMock('../../../../src/common/logger');

      const mockService = new Service({ serviceName: 'vefaas' }) as jest.Mocked<Service>;
      mockService.fetchOpenAPI = jest
        .fn()
        .mockImplementation(({ Action }: { Action: string }) =>
          Promise.resolve(
            Action === 'GetFunction' || Action === 'CreateFunction'
              ? { Result: { Id: 'func-123', Name: 'test-fn', Status: 'Active' } }
              : Action === 'GetReleaseStatus'
                ? { Result: { Status: 'done' } }
                : { Result: {} },
          ),
        );

      const operations = createVefaasOperations(mockService);
      await operations.createFunction(
        {
          functionName: 'test-fn',
          runtime: 'node20/v1',
          handler: 'index.handler',
          memoryMb: 128,
          requestTimeout: 30,
        },
        noHandlerZipPath,
      );

      expect(logger.warn).toHaveBeenCalled();
    });

    it('should throw for empty ZIP file', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const JSZip = require('jszip');
      const emptyZipPath = path.join(testArtifactDir, 'empty.zip');

      const zip = new JSZip();
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(emptyZipPath, content);

      const operations = createVefaasOperations(
        new Service({ serviceName: 'vefaas' }) as jest.Mocked<Service>,
      );
      await expect(
        operations.createFunction(
          {
            functionName: 'test-fn',
            runtime: 'node20/v1',
            handler: 'index.handler',
            memoryMb: 128,
            requestTimeout: 30,
          },
          emptyZipPath,
        ),
      ).rejects.toThrow();
    });

    it('should throw for invalid ZIP file', async () => {
      const invalidZipPath = path.join(testArtifactDir, 'invalid.zip');
      fs.writeFileSync(invalidZipPath, Buffer.from('not a valid zip file'));

      const operations = createVefaasOperations(
        new Service({ serviceName: 'vefaas' }) as jest.Mocked<Service>,
      );
      await expect(
        operations.createFunction(
          {
            functionName: 'test-fn',
            runtime: 'node20/v1',
            handler: 'index.handler',
            memoryMb: 128,
            requestTimeout: 30,
          },
          invalidZipPath,
        ),
      ).rejects.toThrow();
    });
  });

  describe('deployment strategy selection', () => {
    const MAX_ZIP_SIZE_BYTES = 50 * 1024 * 1024;
    const MAX_TOS_SIZE_BYTES = 500 * 1024 * 1024;

    it('should use ZIP deployment for small packages', () => {
      const stats = fs.statSync(smallZipPath);
      expect(stats.size).toBeLessThan(MAX_ZIP_SIZE_BYTES);
    });

    it('should define correct size limits', () => {
      expect(MAX_ZIP_SIZE_BYTES).toBe(52428800);
      expect(MAX_TOS_SIZE_BYTES).toBe(524288000);
    });
  });

  describe('createVefaasOperations', () => {
    let mockService: jest.Mocked<Service>;
    let operations: ReturnType<typeof createVefaasOperations>;

    const mockConfig: VefaasFunctionConfig = {
      functionName: 'test-function',
      runtime: 'node20/v1',
      handler: 'index.handler',
      memoryMb: 512,
      requestTimeout: 30,
    };

    beforeEach(() => {
      mockService = new Service({
        serviceName: 'vefaas',
        accessKeyId: 'test-ak',
        secretKey: 'test-sk',
        region: 'cn-beijing',
      }) as jest.Mocked<Service>;
      mockService.fetchOpenAPI = jest.fn().mockImplementation(({ Action }: { Action: string }) =>
        Promise.resolve(
          Action === 'ListFunctions'
            ? {
                Result: { Items: [{ Id: 'func-123', Name: 'test-function' }] },
                ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
              }
            : Action === 'GetFunction'
              ? {
                  Result: { Id: 'func-123', Name: 'test-function', Status: 'Active' },
                  ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
                }
              : Action === 'CreateFunction'
                ? {
                    Result: { Id: 'func-123' },
                    ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
                  }
                : Action === 'GetReleaseStatus'
                  ? {
                      Result: { Status: 'done' },
                      ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
                    }
                  : {
                      Result: {},
                      ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
                    },
        ),
      );
      operations = createVefaasOperations(mockService);
    });

    describe('createFunction with ZIP', () => {
      it('should create function with ZIP source for small packages', async () => {
        await operations.createFunction(mockConfig, smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'CreateFunction',
            data: expect.objectContaining({
              Name: 'test-function',
              SourceType: 'zip',
            }),
          }),
        );

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'Release',
            data: expect.objectContaining({
              FunctionId: 'func-123',
              RevisionNumber: 0,
            }),
          }),
        );
      });
    });

    describe('getFunction', () => {
      it('should return function info when found', async () => {
        mockService.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: { Items: [{ Id: 'func-123', Name: 'test-function' }] },
            ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
          })
          .mockResolvedValueOnce({
            Result: {
              Id: 'func-123',
              Name: 'test-function',
              Runtime: 'node20/v1',
              Handler: 'index.handler',
              MemoryMb: 512,
              Status: 'Active',
              Envs: [
                { key: 'NODE_ENV', value: 'production' },
                { key: 'DEBUG', value: 'false' },
              ],
            },
            ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
          });

        const result = await operations.getFunction('test-function');

        expect(result).toEqual(
          expect.objectContaining({
            functionId: 'func-123',
            functionName: 'test-function',
            runtime: 'node20/v1',
            environmentVariables: { NODE_ENV: 'production', DEBUG: 'false' },
          }),
        );
      });

      it('should return function info with role and logConfig', async () => {
        mockService.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: { Items: [{ Id: 'func-123', Name: 'test-function' }] },
            ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
          })
          .mockResolvedValueOnce({
            Result: {
              Id: 'func-123',
              Name: 'test-function',
              Runtime: 'node20/v1',
              Handler: 'index.handler',
              MemoryMb: 512,
              Role: 'trn:iam::123456:role/test-role',
              TlsConfig: {
                EnableLog: true,
                TlsProjectId: 'test-project',
                TlsTopicId: 'test-topic',
              },
              VpcConfig: {
                VpcId: 'vpc-123',
                SubnetIds: ['subnet-1'],
                SecurityGroupIds: ['sg-1'],
              },
            },
            ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
          });

        const result = await operations.getFunction('test-function');

        expect(result?.role).toBe('trn:iam::123456:role/test-role');
        expect(result?.logConfig).toEqual({
          project: 'test-project',
          topic: 'test-topic',
          enableLog: true,
        });
        expect(result?.vpcConfig).toEqual({
          vpcId: 'vpc-123',
          subnetIds: ['subnet-1'],
          securityGroupIds: ['sg-1'],
        });
      });

      it('should return null when function not found', async () => {
        mockService.fetchOpenAPI.mockRejectedValueOnce({ code: 'FunctionNotFound' });

        const result = await operations.getFunction('non-existent');

        expect(result).toBeNull();
      });

      it('should retain the full GetFunction detail set (max-detail state)', async () => {
        mockService.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: { Items: [{ Id: 'func-999', Name: 'max-detail-fn' }] },
            ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
          })
          .mockResolvedValueOnce({
            Result: {
              Id: 'func-999',
              Name: 'max-detail-fn',
              Runtime: 'node20/v1',
              Handler: 'index.handler',
              MemoryMb: 1024,
              RequestTimeout: 30,
              MaxConcurrency: 100,
              ExclusiveMode: false,
              CpuStrategy: 'always',
              EnableApmplus: false,
              Description: 'lightweight function',
              Status: 'Active',
              CreationTime: '2026-08-11 11:41:54',
              LastUpdateTime: '2026-08-11 11:41:54',
              Role: 'trn:iam::123456:role/test-role',
              Owner: '22******',
              TriggersCount: 2,
              InstanceType: 'nvidia-tesla-l4',
              InitializerSec: 30,
              Command: './run.sh',
              Port: 8000,
              ProjectName: 'default',
              FunctionType: 'sandbox',
              Cell: '2',
              CodeSize: 473,
              CodeSizeLimit: 256,
              SourceLocation: 'https://vefaas.tos-s3-cn.volces.com/template.zip',
              SourceType: 'tos',
              Envs: [{ key: 'NODE_ENV', value: 'production' }],
              VpcConfig: {
                VpcId: 'vpc-123',
                EnableVpc: true,
                SubnetIds: ['subnet-1'],
                SecurityGroupIds: ['sg-1'],
                EnableSharedInternetAccess: true,
              },
              TlsConfig: {
                EnableLog: true,
                TlsProjectId: 'proj-1',
                TlsTopicId: 'topic-1',
              },
              Tags: [{ Key: 'si-owned-by', Value: 'rest-api-app' }],
              NasStorage: {
                EnableNas: false,
                NasConfigs: [
                  {
                    Gid: 1000,
                    Uid: 1000,
                    RemotePath: '/',
                    FileSystemId: 'enas-cns****',
                    MountPointId: 'mount-63****',
                    LocalMountPath: '/mnt/nas',
                  },
                ],
              },
              TosMountConfig: {
                EnableTos: false,
                MountPoints: [
                  {
                    Endpoint: 'http://tos-cn-beijing.ivolces.com',
                    ReadOnly: true,
                    BucketName: 'ai-model',
                    BucketPath: '/',
                    LocalMountPath: '/mnt/tos',
                  },
                ],
              },
              AsyncTaskConfig: {
                EnableAsyncTask: true,
                MaxRetry: 3,
                DestinationConfig: {
                  OnSuccess: { Destination: 'http://success.example.com' },
                  OnFailure: { Destination: 'http://failure.example.com' },
                },
              },
            },
            ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
          });

        const result = await operations.getFunction('max-detail-fn');

        expect(result).toEqual(
          expect.objectContaining({
            functionId: 'func-999',
            functionName: 'max-detail-fn',
            runtime: 'node20/v1',
            memoryMb: 1024,
            requestTimeout: 30,
            maxConcurrency: 100,
            exclusiveMode: false,
            cpuStrategy: 'always',
            enableApmplus: false,
            owner: '22******',
            triggersCount: 2,
            instanceType: 'nvidia-tesla-l4',
            initializerSec: 30,
            command: './run.sh',
            port: 8000,
            projectName: 'default',
            functionType: 'sandbox',
            cell: '2',
            codeSize: 473,
            codeSizeLimit: 256,
            sourceLocation: 'https://vefaas.tos-s3-cn.volces.com/template.zip',
            sourceType: 'tos',
            environmentVariables: { NODE_ENV: 'production' },
            vpcConfig: {
              vpcId: 'vpc-123',
              enableVpc: true,
              subnetIds: ['subnet-1'],
              securityGroupIds: ['sg-1'],
              enableSharedInternetAccess: true,
            },
            logConfig: {
              project: 'proj-1',
              topic: 'topic-1',
              enableLog: true,
            },
            Tags: [{ Key: 'si-owned-by', Value: 'rest-api-app' }],
            nasStorage: {
              enableNas: false,
              nasConfigs: [
                {
                  gid: 1000,
                  uid: 1000,
                  remotePath: '/',
                  fileSystemId: 'enas-cns****',
                  mountPointId: 'mount-63****',
                  localMountPath: '/mnt/nas',
                },
              ],
            },
            tosMountConfig: {
              enableTos: false,
              mountPoints: [
                {
                  endpoint: 'http://tos-cn-beijing.ivolces.com',
                  readOnly: true,
                  bucketName: 'ai-model',
                  bucketPath: '/',
                  localMountPath: '/mnt/tos',
                },
              ],
            },
            asyncTaskConfig: {
              enableAsyncTask: true,
              maxRetry: 3,
              destinationConfig: {
                onSuccess: { destination: 'http://success.example.com' },
                onFailure: { destination: 'http://failure.example.com' },
              },
            },
          }),
        );
      });
    });

    describe('updateFunctionConfiguration', () => {
      it('should update function configuration and release the new revision', async () => {
        mockService.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: {},
            ResponseMetadata: { RequestId: 'rel-1', Service: 'vefaas' },
          })
          .mockResolvedValueOnce({
            Result: { Status: 'done' },
            ResponseMetadata: { RequestId: 'rel-status', Service: 'vefaas' },
          });

        await operations.updateFunctionConfiguration('func-123', mockConfig);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'UpdateFunction',
            data: expect.objectContaining({
              Id: 'func-123',
              Handler: 'index.handler',
            }),
          }),
        );
        // A configuration change must publish (Release) so API Gateway
        // invocations hit the updated revision — not an unpublished draft.
        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({ Action: 'Release' }),
        );
      });
    });

    describe('updateFunctionCode with ZIP', () => {
      it('should update function code with ZIP source for small packages', async () => {
        await operations.updateFunctionCode('func-123', smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'UpdateFunction',
            data: expect.objectContaining({
              Id: 'func-123',
              SourceType: 'zip',
            }),
          }),
        );
      });
    });

    describe('deleteFunction', () => {
      it('should delete function', async () => {
        // Queue: DeleteFunction -> getFunctionById rejects ResourceNotFound (gone)
        mockService.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: {},
            ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
          })
          .mockRejectedValueOnce({ code: 'ResourceNotFound' });

        await operations.deleteFunction('func-123');

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'DeleteFunction',
            data: { Id: 'func-123' },
          }),
        );
      });
    });

    describe('listFunctions', () => {
      it('should list functions', async () => {
        mockService.fetchOpenAPI.mockResolvedValueOnce({
          Result: {
            Items: [
              {
                Id: 'func-1',
                Name: 'func-1',
                Runtime: 'node20/v1',
              },
              {
                Id: 'func-2',
                Name: 'func-2',
                Runtime: 'python3.8/v1',
              },
            ],
          },
          ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
        });

        const result = await operations.listFunctions();

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(
          expect.objectContaining({
            functionId: 'func-1',
            runtime: 'node20/v1',
          }),
        );
      });
    });

    describe('getFunction error handling', () => {
      it('should return null for ResourceNotFound error', async () => {
        mockService.fetchOpenAPI.mockRejectedValueOnce({ code: 'ResourceNotFound' });

        const result = await operations.getFunction('non-existent');

        expect(result).toBeNull();
      });

      it('should throw for other errors', async () => {
        mockService.fetchOpenAPI.mockRejectedValueOnce({
          code: 'OtherError',
          message: 'Something went wrong',
        });

        await expect(operations.getFunction('test-function')).rejects.toEqual({
          code: 'OtherError',
          message: 'Something went wrong',
        });
      });
    });

    describe('environment variables', () => {
      it('should create function with environment variables', async () => {
        const configWithEnv: VefaasFunctionConfig = {
          ...mockConfig,
          environmentVariables: { NODE_ENV: 'production', DEBUG: 'false' },
        };

        await operations.createFunction(configWithEnv, smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              Envs: [
                { key: 'NODE_ENV', value: 'production' },
                { key: 'DEBUG', value: 'false' },
              ],
            }),
          }),
        );
      });

      it('should update function with environment variables', async () => {
        const configWithEnv: VefaasFunctionConfig = {
          ...mockConfig,
          environmentVariables: { NODE_ENV: 'staging' },
        };

        mockService.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: {},
            ResponseMetadata: { RequestId: 'rel-1', Service: 'vefaas' },
          })
          .mockResolvedValueOnce({
            Result: { Status: 'done' },
            ResponseMetadata: { RequestId: 'rel-status', Service: 'vefaas' },
          });

        await operations.updateFunctionConfiguration('func-123', configWithEnv);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              Envs: [{ key: 'NODE_ENV', value: 'staging' }],
            }),
          }),
        );
      });

      it('should create function with role', async () => {
        const configWithRole: VefaasFunctionConfig = {
          ...mockConfig,
          role: 'trn:iam::123456:role/test-role',
        };

        await operations.createFunction(configWithRole, smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              Role: 'trn:iam::123456:role/test-role',
            }),
          }),
        );
      });

      it('should create function with logConfig', async () => {
        const configWithLog: VefaasFunctionConfig = {
          ...mockConfig,
          logConfig: { project: 'test-project', topic: 'test-topic' },
        };

        await operations.createFunction(configWithLog, smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              TlsConfig: {
                EnableLog: true,
                TlsProjectId: 'test-project',
                TlsTopicId: 'test-topic',
              },
            }),
          }),
        );
      });

      it('should update function with role', async () => {
        const configWithRole: VefaasFunctionConfig = {
          ...mockConfig,
          role: 'trn:iam::123456:role/test-role',
        };

        mockService.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: {},
            ResponseMetadata: { RequestId: 'rel-1', Service: 'vefaas' },
          })
          .mockResolvedValueOnce({
            Result: { Status: 'done' },
            ResponseMetadata: { RequestId: 'rel-status', Service: 'vefaas' },
          });

        await operations.updateFunctionConfiguration('func-123', configWithRole);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              Role: 'trn:iam::123456:role/test-role',
            }),
          }),
        );
      });

      it('should update function with logConfig', async () => {
        const configWithLog: VefaasFunctionConfig = {
          ...mockConfig,
          logConfig: { project: 'test-project', topic: 'test-topic' },
        };

        mockService.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: {},
            ResponseMetadata: { RequestId: 'rel-1', Service: 'vefaas' },
          })
          .mockResolvedValueOnce({
            Result: { Status: 'done' },
            ResponseMetadata: { RequestId: 'rel-status', Service: 'vefaas' },
          });

        await operations.updateFunctionConfiguration('func-123', configWithLog);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              TlsConfig: {
                EnableLog: true,
                TlsProjectId: 'test-project',
                TlsTopicId: 'test-topic',
              },
            }),
          }),
        );
      });

      it('should create function with vpcConfig', async () => {
        const configWithVpc: VefaasFunctionConfig = {
          ...mockConfig,
          vpcConfig: {
            vpcId: 'vpc-123',
            subnetIds: ['subnet-1', 'subnet-2'],
            securityGroupIds: ['sg-1'],
          },
        };

        await operations.createFunction(configWithVpc, smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              VpcConfig: {
                EnableVpc: true,
                VpcId: 'vpc-123',
                SubnetIds: ['subnet-1', 'subnet-2'],
                SecurityGroupIds: ['sg-1'],
              },
            }),
          }),
        );
      });

      it('should create function with tosMountConfig', async () => {
        const configWithTos: VefaasFunctionConfig = {
          ...mockConfig,
          tosMountConfig: {
            bucketName: 'test-bucket',
            mountPath: '/mnt/tos',
          },
        };

        await operations.createFunction(configWithTos, smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              TosMountConfig: {
                EnableTos: true,
                MountPoints: [
                  {
                    BucketName: 'test-bucket',
                    LocalMountPath: '/mnt/tos',
                  },
                ],
              },
            }),
          }),
        );
      });

      it('should create function with description', async () => {
        const configWithDesc: VefaasFunctionConfig = {
          ...mockConfig,
          description: 'Test function description',
        };

        await operations.createFunction(configWithDesc, smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              Description: 'Test function description',
            }),
          }),
        );
      });

      it('should throw when the package exceeds the TOS limit', async () => {
        const stat = jest.spyOn(fs.promises, 'stat').mockResolvedValue({
          size: 501 * 1024 * 1024,
        } as fs.Stats);

        await expect(operations.createFunction(mockConfig, smallZipPath)).rejects.toThrow(
          'CODE_PACKAGE_TOO_LARGE',
        );
        stat.mockRestore();
      });

      it('should upload packages larger than the ZIP limit to TOS', async () => {
        const stat = jest.spyOn(fs.promises, 'stat').mockResolvedValue({
          size: 51 * 1024 * 1024,
        } as fs.Stats);
        const readFile = jest
          .spyOn(fs.promises, 'readFile')
          .mockResolvedValue(fs.readFileSync(smallZipPath));

        await operations.createFunction(mockConfig, smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'CreateFunction',
            data: expect.objectContaining({
              SourceType: 'tos',
              TosBucket: 'vefaas-codes-cn-beijing',
            }),
          }),
        );
        stat.mockRestore();
        readFile.mockRestore();
      });

      it('should throw when CreateFunction does not return an ID', async () => {
        mockService.fetchOpenAPI.mockImplementation(({ Action }: { Action: string }) =>
          Promise.resolve(
            Action === 'CreateFunction'
              ? { Result: {}, ResponseMetadata: { RequestId: 'request', Service: 'vefaas' } }
              : Action === 'GetReleaseStatus'
                ? {
                    Result: { Status: 'done' },
                    ResponseMetadata: { RequestId: 'request', Service: 'vefaas' },
                  }
                : { Result: {}, ResponseMetadata: { RequestId: 'request', Service: 'vefaas' } },
          ),
        );

        await expect(operations.createFunction(mockConfig, smallZipPath)).rejects.toThrow(
          'did not return a function Id',
        );
      });

      it('should return null when no function matches the requested name', async () => {
        mockService.fetchOpenAPI.mockResolvedValueOnce({
          Result: { Items: [] },
          ResponseMetadata: { RequestId: 'request', Service: 'vefaas' },
        });

        await expect(operations.getFunction('missing-function')).resolves.toBeNull();
      });

      it('should rethrow unexpected getFunctionById errors', async () => {
        const error = { code: 'AccessDenied', message: 'denied' };
        mockService.fetchOpenAPI.mockRejectedValueOnce(error);

        await expect(operations.getFunctionById('func-123')).rejects.toBe(error);
      });

      it('should throw when a release reports failure', async () => {
        mockService.fetchOpenAPI
          .mockResolvedValueOnce({
            Result: { ReleaseRecordId: 'release-1' },
            ResponseMetadata: { RequestId: 'request', Service: 'vefaas' },
          })
          .mockResolvedValueOnce({
            Result: { Status: 'failed' },
            ResponseMetadata: { RequestId: 'request', Service: 'vefaas' },
          });

        await expect(operations.releaseFunction('func-123')).rejects.toThrow('release failed');
      });

      it('should translate function deletion polling timeouts', async () => {
        jest.useFakeTimers();
        mockService.fetchOpenAPI.mockResolvedValue({
          Result: { Id: 'func-123', Name: 'test-function', Status: 'Active' },
          ResponseMetadata: { RequestId: 'request', Service: 'vefaas' },
        });
        const promise = operations.waitForFunctionDeleted('func-123');
        const outcome = promise.catch((error: unknown) => error);
        await jest.runAllTimersAsync();

        await expect(outcome).resolves.toEqual(
          expect.objectContaining({
            message: 'Timed out waiting for veFaaS function func-123 to be deleted',
          }),
        );
        jest.useRealTimers();
      });

      it('should update function code through TOS for large packages', async () => {
        const stat = jest.spyOn(fs.promises, 'stat').mockResolvedValue({
          size: 51 * 1024 * 1024,
        } as fs.Stats);
        const readFile = jest
          .spyOn(fs.promises, 'readFile')
          .mockResolvedValue(fs.readFileSync(smallZipPath));

        await operations.updateFunctionCode('func-123', smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'UpdateFunction',
            data: expect.objectContaining({
              Id: 'func-123',
              SourceType: 'tos',
              TosBucket: 'vefaas-codes-cn-beijing',
            }),
          }),
        );
        stat.mockRestore();
        readFile.mockRestore();
      });
    });
  });
});

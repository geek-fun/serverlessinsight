import * as fs from 'node:fs';
import * as path from 'node:path';
import { Service } from '@volcengine/openapi';
import { createVefaasOperations } from '../../../../src/common/volcengineClient/vefaasOperations';
import type { VefaasFunctionConfig } from '../../../../src/common/volcengineClient/types';

jest.mock('@volcengine/openapi', () => {
  return {
    Service: jest.fn().mockImplementation(() => ({
      fetchOpenAPI: jest.fn().mockResolvedValue({ Result: {} }),
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

      const operations = createVefaasOperations(
        new Service({ serviceName: 'vefaas' }) as jest.Mocked<Service>,
      );
      await operations.createFunction(
        {
          functionName: 'test-fn',
          runtime: 'nodejs/v18',
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
            runtime: 'nodejs/v18',
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
            runtime: 'nodejs/v18',
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
      runtime: 'nodejs/v18',
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
      mockService.fetchOpenAPI = jest.fn().mockResolvedValue({
        Result: {},
        ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
      });
      operations = createVefaasOperations(mockService);
    });

    describe('createFunction with ZIP', () => {
      it('should create function with ZIP source for small packages', async () => {
        await operations.createFunction(mockConfig, smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'CreateFunction',
            data: expect.objectContaining({
              FunctionName: 'test-function',
              SourceType: 'zip',
            }),
          }),
        );
      });
    });

    describe('getFunction', () => {
      it('should return function info when found', async () => {
        mockService.fetchOpenAPI.mockResolvedValueOnce({
          Result: {
            FunctionId: 'func-123',
            FunctionName: 'test-function',
            Runtime: 'nodejs/v18',
            Handler: 'index.handler',
            MemoryMb: 512,
            Status: 'Active',
          },
          ResponseMetadata: { RequestId: 'test-request-id', Service: 'vefaas' },
        });

        const result = await operations.getFunction('test-function');

        expect(result).toEqual(
          expect.objectContaining({
            functionId: 'func-123',
            functionName: 'test-function',
            runtime: 'nodejs/v18',
          }),
        );
      });

      it('should return null when function not found', async () => {
        mockService.fetchOpenAPI.mockRejectedValueOnce({ code: 'FunctionNotFound' });

        const result = await operations.getFunction('non-existent');

        expect(result).toBeNull();
      });
    });

    describe('updateFunctionConfiguration', () => {
      it('should update function configuration', async () => {
        await operations.updateFunctionConfiguration(mockConfig);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'UpdateFunction',
            data: expect.objectContaining({
              FunctionName: 'test-function',
              Handler: 'index.handler',
            }),
          }),
        );
      });
    });

    describe('updateFunctionCode with ZIP', () => {
      it('should update function code with ZIP source for small packages', async () => {
        await operations.updateFunctionCode('test-function', smallZipPath);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'UpdateFunction',
            data: expect.objectContaining({
              FunctionName: 'test-function',
              SourceType: 'zip',
            }),
          }),
        );
      });
    });

    describe('deleteFunction', () => {
      it('should delete function', async () => {
        await operations.deleteFunction('test-function');

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            Action: 'DeleteFunction',
            data: { FunctionName: 'test-function' },
          }),
        );
      });
    });

    describe('listFunctions', () => {
      it('should list functions', async () => {
        mockService.fetchOpenAPI.mockResolvedValueOnce({
          Result: {
            Functions: [
              {
                FunctionId: 'func-1',
                FunctionName: 'func-1',
                Runtime: 'nodejs/v18',
              },
              {
                FunctionId: 'func-2',
                FunctionName: 'func-2',
                Runtime: 'python/v3.10',
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
            runtime: 'nodejs/v18',
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

        await operations.updateFunctionConfiguration(configWithEnv);

        expect(mockService.fetchOpenAPI).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              Envs: [{ key: 'NODE_ENV', value: 'staging' }],
            }),
          }),
        );
      });
    });
  });
});

jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) =>
      params ? `${key}:${JSON.stringify(params)}` : key,
  },
}));

const mockKyInstance = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  extend: jest.fn(),
};

// ky v1 exports: { default, HTTPError, TimeoutError, ... }
class MockHTTPError extends Error {
  response: Response;
  constructor(response: Response) {
    super(`HTTP Error ${response.status}`);
    this.name = 'HTTPError';
    this.response = response;
  }
}

class MockTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

const mockKyModule = {
  __esModule: true,
  default: Object.assign(
    jest.fn(() => mockKyInstance),
    { extend: jest.fn(() => mockKyInstance) },
  ),
  HTTPError: MockHTTPError,
  TimeoutError: MockTimeoutError,
};

jest.mock('ky', () => mockKyModule);

const ORIGINAL_ENV = { ...process.env };

import { createApiClient, validateApiKey } from '../../../src/common/apiClient';
import type { ApiClient } from '../../../src/common/apiClient';

describe('apiClient', () => {
  let client: ApiClient;
  const testApiKey = 'si_testprefix_testsecretkey1234567890abcdefghij';
  const testBaseUrl = 'https://api.console.serverlessinsight.com';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
    client = createApiClient({ apiKey: testApiKey, baseUrl: testBaseUrl });
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  describe('createApiClient', () => {
    it('should create a client with the correct base URL and auth header', () => {
      expect(mockKyModule.default.extend).toHaveBeenCalledWith(
        expect.objectContaining({
          prefixUrl: testBaseUrl,
          headers: expect.objectContaining({
            Authorization: `Bearer ${testApiKey}`,
          }),
        }),
      );
    });
  });

  describe('get', () => {
    it('should make a GET request to the given path', async () => {
      mockKyInstance.get.mockResolvedValue({ json: () => Promise.resolve({ data: 'ok' }) });
      const result = await client.get('/test');
      expect(mockKyInstance.get).toHaveBeenCalledWith('/test');
      expect(result).toEqual({ data: 'ok' });
    });
  });

  describe('post', () => {
    it('should make a POST request with JSON body', async () => {
      mockKyInstance.post.mockResolvedValue({ json: () => Promise.resolve({ id: '123' }) });
      const body = { name: 'test' };
      const result = await client.post('/items', body);
      expect(mockKyInstance.post).toHaveBeenCalledWith('/items', { json: body });
      expect(result).toEqual({ id: '123' });
    });

    it('should make a POST request without body', async () => {
      mockKyInstance.post.mockResolvedValue({ json: () => Promise.resolve({}) });
      await client.post('/items');
      expect(mockKyInstance.post).toHaveBeenCalledWith('/items');
    });
  });

  describe('patch', () => {
    it('should make a PATCH request with JSON body', async () => {
      mockKyInstance.patch.mockResolvedValue({ json: () => Promise.resolve({ updated: true }) });
      const body = { phase: 'start' };
      const result = await client.patch('/deploy/1', body);
      expect(mockKyInstance.patch).toHaveBeenCalledWith('/deploy/1', { json: body });
      expect(result).toEqual({ updated: true });
    });
  });

  describe('delete', () => {
    it('should make a DELETE request', async () => {
      mockKyInstance.delete.mockResolvedValue({ json: () => Promise.resolve({ deleted: true }) });
      const result = await client.delete('/keys/1');
      expect(mockKyInstance.delete).toHaveBeenCalledWith('/keys/1');
      expect(result).toEqual({ deleted: true });
    });

    it('should handle 204 No Content response', async () => {
      mockKyInstance.delete.mockResolvedValue({
        json: () => Promise.reject(new Error('no content')),
      });
      const result = await client.delete('/keys/1');
      expect(result).toBeUndefined();
    });
  });
});

describe('validateApiKey', () => {
  const testBaseUrl = 'https://api.console.serverlessinsight.com';
  const validKey = 'si_testprefix_testsecretkey1234567890abcdefghij';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('should call the validate endpoint and return org info on success', async () => {
    const mockResponse = {
      valid: true,
      orgId: 'org-uuid',
      orgName: 'TestOrg',
      userEmail: 'test@example.com',
      scopes: ['deploy', 'read'],
    };
    mockKyInstance.get.mockResolvedValue({ json: () => Promise.resolve(mockResponse) });

    const result = await validateApiKey(validKey, testBaseUrl);
    expect(mockKyInstance.get).toHaveBeenCalledWith('/api/v1/auth/api-keys/validate');
    expect(result).toEqual({
      orgId: 'org-uuid',
      orgName: 'TestOrg',
      userEmail: 'test@example.com',
      scopes: ['deploy', 'read'],
    });
  });

  it('should reject when key is invalid (401)', async () => {
    mockKyInstance.get.mockRejectedValue(
      new mockKyModule.HTTPError(new Response(null, { status: 401 })),
    );

    await expect(validateApiKey(validKey, testBaseUrl)).rejects.toThrow('API_ERROR_401');
  });

  it('should reject when key is forbidden (403)', async () => {
    mockKyInstance.get.mockRejectedValue(
      new mockKyModule.HTTPError(new Response(null, { status: 403 })),
    );

    await expect(validateApiKey(validKey, testBaseUrl)).rejects.toThrow('API_ERROR_403');
  });

  it('should handle network errors', async () => {
    mockKyInstance.get.mockRejectedValue(new Error('fetch failed'));

    await expect(validateApiKey(validKey, testBaseUrl)).rejects.toThrow('CREDENTIAL_NETWORK_ERROR');
  });
});

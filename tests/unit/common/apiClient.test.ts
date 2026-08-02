jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) =>
      params ? `${key}:${JSON.stringify(params)}` : key,
  },
}));

const mockFetch = jest.fn();

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
    global.fetch = mockFetch as unknown as typeof fetch;
    client = createApiClient({ apiKey: testApiKey, baseUrl: testBaseUrl });
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  describe('createApiClient', () => {
    it('should send the auth header and content type on every request', async () => {
      mockFetch.mockResolvedValue(new Response(JSON.stringify({ data: 'ok' }), { status: 200 }));

      await client.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        `${testBaseUrl}/test`,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${testApiKey}`,
            'Content-Type': 'application/json',
          }),
        }),
      );
    });
  });

  describe('get', () => {
    it('should make a GET request to the given path', async () => {
      mockFetch.mockResolvedValue(new Response(JSON.stringify({ data: 'ok' }), { status: 200 }));

      const result = await client.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        `${testBaseUrl}/test`,
        expect.objectContaining({ method: 'GET' }),
      );
      expect(result).toEqual({ data: 'ok' });
    });
  });

  describe('post', () => {
    it('should make a POST request with JSON body', async () => {
      mockFetch.mockResolvedValue(new Response(JSON.stringify({ id: '123' }), { status: 200 }));
      const body = { name: 'test' };

      const result = await client.post('/items', body);

      expect(mockFetch).toHaveBeenCalledWith(
        `${testBaseUrl}/items`,
        expect.objectContaining({ method: 'POST', body: JSON.stringify(body) }),
      );
      expect(result).toEqual({ id: '123' });
    });

    it('should make a POST request without body', async () => {
      mockFetch.mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));

      await client.post('/items');

      expect(mockFetch).toHaveBeenCalledWith(
        `${testBaseUrl}/items`,
        expect.objectContaining({
          method: 'POST',
          headers: expect.anything(),
        }),
      );
      expect(mockFetch.mock.calls[0][1]).not.toHaveProperty('body');
    });
  });

  describe('patch', () => {
    it('should make a PATCH request with JSON body', async () => {
      mockFetch.mockResolvedValue(new Response(JSON.stringify({ updated: true }), { status: 200 }));
      const body = { phase: 'start' };

      const result = await client.patch('/deploy/1', body);

      expect(mockFetch).toHaveBeenCalledWith(
        `${testBaseUrl}/deploy/1`,
        expect.objectContaining({ method: 'PATCH', body: JSON.stringify(body) }),
      );
      expect(result).toEqual({ updated: true });
    });
  });

  describe('delete', () => {
    it('should make a DELETE request', async () => {
      mockFetch.mockResolvedValue(new Response(JSON.stringify({ deleted: true }), { status: 200 }));

      const result = await client.delete('/keys/1');

      expect(mockFetch).toHaveBeenCalledWith(
        `${testBaseUrl}/keys/1`,
        expect.objectContaining({ method: 'DELETE' }),
      );
      expect(result).toEqual({ deleted: true });
    });

    it('should handle 204 No Content response', async () => {
      mockFetch.mockResolvedValue(new Response(null, { status: 204 }));

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
    global.fetch = mockFetch as unknown as typeof fetch;
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
    mockFetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));

    const result = await validateApiKey(validKey, testBaseUrl);

    expect(mockFetch).toHaveBeenCalledWith(
      `${testBaseUrl}/api/v1/auth/api-keys/validate`,
      expect.objectContaining({ method: 'GET' }),
    );
    expect(result).toEqual({
      orgId: 'org-uuid',
      orgName: 'TestOrg',
      userEmail: 'test@example.com',
      scopes: ['deploy', 'read'],
    });
  });

  it('should reject when key is invalid (401)', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 401 }));

    await expect(validateApiKey(validKey, testBaseUrl)).rejects.toThrow('API_ERROR_401');
  });

  it('should reject when key is forbidden (403)', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 403 }));

    await expect(validateApiKey(validKey, testBaseUrl)).rejects.toThrow('API_ERROR_403');
  });

  it('should reject on conflict (409)', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 409 }));

    await expect(validateApiKey(validKey, testBaseUrl)).rejects.toThrow('API_ERROR_409');
  });

  it('should reject with unknown error on other status codes', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 500 }));

    await expect(validateApiKey(validKey, testBaseUrl)).rejects.toThrow('API_ERROR_UNKNOWN');
  });

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValue(new TypeError('fetch failed'));

    await expect(validateApiKey(validKey, testBaseUrl)).rejects.toThrow('CREDENTIAL_NETWORK_ERROR');
  });
});

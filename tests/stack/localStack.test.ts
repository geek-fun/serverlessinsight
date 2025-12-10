import path from 'node:path';
import { setContext, SI_LOCALSTACK_SERVER_PORT } from '../../src/common';
import http from 'node:http';
import { startLocalStack, stopLocal } from '../../src/stack/localStack';

describe('localStack API Gateway handler', () => {
  const iacLocation = path.resolve(__dirname, '../fixtures/serverless-insight.yml');
  const port = SI_LOCALSTACK_SERVER_PORT;

  // Helper function to make HTTP requests
  const makeRequest = (
    requestPath: string,
    method = 'GET',
  ): Promise<{
    statusCode: number | undefined;
    data: string;
  }> => {
    return new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: 'localhost',
          port: port,
          path: requestPath,
          method: method,
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve({ statusCode: res.statusCode, data });
          });
        },
      );
      req.on('error', reject);
      req.end();
    });
  };

  beforeAll(async () => {
    await setContext({
      stage: 'default',
      location: iacLocation,
    });
    await startLocalStack();
  });

  afterAll(async () => {
    await stopLocal();
  });

  it('should handle API Gateway request for valid trigger', async () => {
    const response = await makeRequest('/si_events/1-insight-poc-gateway-cn-hangzhou/api/hello');

    expect(response.statusCode).toBe(200);
    const json = JSON.parse(response.data);
    expect(json.message).toBe('API Gateway trigger matched');
    expect(json.event).toBe('insight-poc-gateway');
    expect(json.method).toBe('GET');
    expect(json.path).toBe('/api/hello');
  });

  it('should return 404 for non-matching path', async () => {
    const response = await makeRequest('/si_events/1-insight-poc-gateway-cn-hangzhou/api/invalid');

    expect(response.statusCode).toBe(404);
    const json = JSON.parse(response.data);
    expect(json.error).toBe('No matching trigger found');
  });

  it('should return 404 for non-existing event', async () => {
    const response = await makeRequest('/si_events/1-non-existing-gateway-cn-hangzhou/api/hello');

    expect(response.statusCode).toBe(404);
    const json = JSON.parse(response.data);
    expect(json.error).toBe('API Gateway event not found');
  });

  it('should not match events with similar but different names', async () => {
    // This tests that 'insight-poc' doesn't match 'insight-poc-gateway'
    const response = await makeRequest('/si_events/1-insight-poc-cn-hangzhou/api/hello');

    expect(response.statusCode).toBe(404);
    const json = JSON.parse(response.data);
    expect(json.error).toBe('API Gateway event not found');
    expect(json.eventName).toBe('insight-poc-cn');
  });
});

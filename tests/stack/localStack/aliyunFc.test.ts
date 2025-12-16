import { startLocalStack, stopLocal } from '../../../src/stack/localStack';
import { ServerlessIac, EventTypes } from '../../../src/types';
import { ProviderEnum } from '../../../src/common';
import http from 'node:http';
import { SI_LOCALSTACK_SERVER_PORT } from '../../../src/common';

describe('Aliyun FC LocalStack', () => {
  const iac: ServerlessIac = {
    version: '0.0.1',
    service: 'aliyun-fc-test',
    provider: {
      name: ProviderEnum.ALIYUN,
      region: 'cn-hangzhou',
    },
    functions: [
      {
        key: 'aliyun_fc_fn',
        name: 'aliyun-fc-function',
        code: {
          runtime: 'nodejs18',
          handler: 'index.handler',
          path: 'tests/fixtures/aliyun-fc-handler',
        },
        memory: 512,
        timeout: 10,
        environment: {
          NODE_ENV: 'test',
        },
        storage: {},
      },
    ],
    events: [
      {
        key: 'aliyun_gateway',
        name: 'aliyun-api-gateway',
        type: EventTypes.API_GATEWAY,
        triggers: [
          {
            method: 'GET',
            path: '/api/v1/hello',
            backend: 'aliyun_fc_fn',
          },
          {
            method: 'POST',
            path: '/api/v1/hello',
            backend: 'aliyun_fc_fn',
          },
        ],
      },
    ],
  };

  beforeAll(async () => {
    await startLocalStack(iac);
  });

  afterAll(async () => {
    await stopLocal();
  });

  const makeRequest = (
    path: string,
    method = 'GET',
    body?: string,
  ): Promise<{
    statusCode: number | undefined;
    headers: http.IncomingHttpHeaders;
    data: string;
  }> => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: SI_LOCALSTACK_SERVER_PORT,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, headers: res.headers, data });
        });
      });

      req.on('error', reject);

      if (body) {
        req.write(body);
      }

      req.end();
    });
  };

  it('should handle GET request with Aliyun FC event format', async () => {
    const res = await makeRequest('/si_events/aliyun_gateway/api/v1/hello?name=test&id=123');

    expect(res.statusCode).toBe(200);
    expect(res.headers['x-custom-header']).toBe('header value');
    expect(res.headers['content-type']).toBe('application/json');

    const body = JSON.parse(res.data);
    expect(body.path).toBe('/api/v1/hello');
    expect(body.method).toBe('GET');
    expect(body.queryParameters).toEqual({ name: 'test', id: '123' });
    expect(body.message).toBe('Hello from Aliyun FC');
  });

  it('should handle POST request with body', async () => {
    const requestBody = JSON.stringify({ username: 'john', age: 30 });
    const res = await makeRequest('/si_events/aliyun_gateway/api/v1/hello', 'POST', requestBody);

    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.data);
    expect(body.path).toBe('/api/v1/hello');
    expect(body.method).toBe('POST');
    expect(body.body).toBe(requestBody);
    expect(body.message).toBe('Hello from Aliyun FC');
  });

  it('should pass headers to FC function', async () => {
    const res = await makeRequest('/si_events/aliyun_gateway/api/v1/hello');

    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.data);
    expect(body.headers).toBeDefined();
    expect(body.headers['content-type']).toBe('application/json');
  });

  it('should handle direct function invocation with Aliyun format', async () => {
    const res = await makeRequest('/si_functions/aliyun_fc_fn/test-path?param=value', 'GET');

    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.data);
    expect(body.path).toBe('/test-path');
    expect(body.method).toBe('GET');
    expect(body.queryParameters).toEqual({ param: 'value' });
  });
});

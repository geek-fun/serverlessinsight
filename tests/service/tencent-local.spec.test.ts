import { spawn, ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { runLocal } from '../../src/commands/local';
import { getContext, ProviderEnum, SI_LOCALSTACK_SERVER_PORT } from '../../src/common';
import { stopLocal } from '../../src/stack/localStack';

const repoRoot = path.resolve(__dirname, '../..');
const fixture = path.join(repoRoot, 'tests/fixtures/tencent-local/serverlessinsight.yml');
const cli = path.join(repoRoot, 'dist/src/commands/index.js');

type Response = { status: number; headers: http.IncomingHttpHeaders; body: string };
const request = (
  port: number,
  url: string,
  method = 'GET',
  body?: string | Buffer,
): Promise<Response> =>
  new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path: url,
        method,
        agent: false,
        headers: { 'x-synthetic-input': 'local-test', 'content-type': 'application/octet-stream' },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () =>
          resolve({
            status: res.statusCode!,
            headers: res.headers,
            body: Buffer.concat(chunks).toString(),
          }),
        );
        res.on('error', reject);
      },
    );
    req.on('error', reject);
    req.setTimeout(5000, () => req.destroy(new Error('Local smoke request timed out')));
    req.end(body);
  });

const freePort = async (): Promise<number> => {
  const server = net.createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const port = (server.address() as net.AddressInfo).port;
  await new Promise<void>((resolve) => server.close(() => resolve()));
  return port;
};

const expectContract = (response: Response, method: string, body: string) => {
  expect(response.status).toBe(207);
  expect(response.headers['x-local-contract']).toBe('scf');
  const received = JSON.parse(response.body);
  expect(Object.keys(received.event)).toEqual([
    'body',
    'headers',
    'httpMethod',
    'path',
    'queryString',
  ]);
  expect(received.event).toMatchObject({
    httpMethod: method,
    path: '/echo',
    queryString: { q: 'snow 雪', tag: 'last' },
    body,
    headers: expect.objectContaining({
      'x-synthetic-input': 'local-test',
      'x-scf-remote-addr': '127.0.0.1',
    }),
  });
  expect(Object.keys(received.context)).toEqual([
    'memory_limit_in_mb',
    'time_limit_in_ms',
    'request_id',
    'environment',
    'environ',
    'function_version',
    'function_name',
    'namespace',
    'tencentcloud_region',
    'tencentcloud_appid',
    'tencentcloud_uin',
  ]);
  expect(received.context).toMatchObject({
    memory_limit_in_mb: 128,
    time_limit_in_ms: 3000,
    function_version: '$LATEST',
    function_name: 'local-scf-echo',
    namespace: 'default',
    tencentcloud_region: 'ap-shanghai',
    tencentcloud_appid: '1250000000',
    tencentcloud_uin: '100000000000',
  });
  expect(received.context.request_id).toMatch(/^[\da-f-]{36}$/);
  expect(received.stage).toBe('preview');
  expect(received.greeting).toBe('hello-preview');
};

const functionUrl = '/si_functions/echo/echo?q=snow%20%E9%9B%AA&tag=first&tag=last';

describe('local command initialization and live SCF HTTP contract', () => {
  beforeAll(async () => {
    await runLocal({
      location: fixture,
      stage: 'preview',
      debug: false,
      watch: false,
      region: 'ap-shanghai',
    });
  });
  afterAll(async () => {
    await stopLocal();
  });

  it('keeps provider, region overrides and stage variables through real initialization', () => {
    const ctx = getContext();
    expect(ctx.provider).toBe(ProviderEnum.TENCENT);
    expect(ctx.region).toBe('ap-shanghai');
    expect(ctx.stage).toBe('preview');
    expect(ctx.stages?.preview).toEqual([{ key: 'greeting', value: 'hello-preview' }]);
    expect(ctx.iac?.provider).toEqual({ name: ProviderEnum.TENCENT, region: 'ap-shanghai' });
  });

  it.each([
    ['GET', ''],
    ['POST', '{"hello":1}'],
    ['POST', 'plain text 雪'],
  ])('delivers %s HTTP input through the worker', async (method, body) => {
    expectContract(
      await request(SI_LOCALSTACK_SERVER_PORT, functionUrl, method, body),
      method,
      body,
    );
  });

  it('serves the function URL root for a bare function path', async () => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/echo');
    expect(response.status).toBe(207);
    expect(JSON.parse(response.body).event.path).toBe('/');
  });

  it('preserves the request path verbatim', async () => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/echo/exact//path/');
    expect(response.status).toBe(207);
    expect(JSON.parse(response.body).event.path).toBe('/exact//path/');
  });

  it('returns 404 for an unknown function key', async () => {
    expect((await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/nonexistent')).status).toBe(
      404,
    );
  });

  it('returns 501 for an API Gateway event instead of simulating a gateway', async () => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, '/si_events/api/echo');
    expect(response.status).toBe(501);
    expect(JSON.parse(response.body).error).toContain('function URL');
  });

  it('returns 415 for invalid UTF-8 binary input', async () => {
    const response = await request(
      SI_LOCALSTACK_SERVER_PORT,
      functionUrl,
      'POST',
      Buffer.from([0xff, 0x00, 0x80]),
    );
    expect(response.status).toBe(415);
    expect(JSON.parse(response.body).message).toContain('UTF-8');
  });

  it('returns 501 for an unsupported runtime and for container functions', async () => {
    expect((await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/golang')).status).toBe(501);
    expect((await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/container')).status).toBe(501);
  });

  it.each([
    ['missing', 'Handler "missing"'],
    ['fail', 'synthetic handler failure'],
    ['timeout', 'timed out after 1000ms'],
    ['block', 'timed out after 1000ms'],
  ])('returns 500 for the %s handler and keeps serving', async (key, message) => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, `/si_functions/${key}`);
    expect(response.status).toBe(500);
    expect(JSON.parse(response.body).message).toContain(message);
    expect((await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/echo')).status).toBe(207);
  });

  it('sends an empty response when the handler omits its return value', async () => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/empty');
    expect(response).toMatchObject({ status: 200, body: '' });
    expect(response.headers['content-type']).toBe('application/json');
  });

  it('infers a 200 JSON response for a string and a bare object', async () => {
    const text = await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/text');
    expect(text).toMatchObject({ status: 200, body: 'plain string response' });
    expect(text.headers['content-type']).toBe('application/json');

    const json = await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/json');
    expect(json).toMatchObject({ status: 200, body: '{"message":"inferred json"}' });
    expect(json.headers['content-type']).toBe('application/json');
  });

  it('reports malformed response envelopes as 502', async () => {
    expect((await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/invalid')).status).toBe(502);
  });

  it('refuses a binary response envelope as 501', async () => {
    expect((await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/binary')).status).toBe(501);
  });
});

describe('offline si local CLI smoke test', () => {
  let child: ChildProcess | undefined;
  let port: number;
  let output = '';

  beforeAll(async () => {
    port = await freePort();
    child = spawn(
      process.execPath,
      [cli, 'local', '-f', fixture, '-s', 'preview', '-v', 'tencent', '-r', 'ap-shanghai'],
      {
        cwd: repoRoot,
        env: {
          PATH: process.env.PATH,
          LANG: 'en_US.UTF-8',
          NO_COLOR: '1',
          SI_LOCALSTACK_SERVER_PORT: String(port),
        },
      },
    );
    child.stdout?.on('data', (chunk) => {
      output += chunk;
    });
    child.stderr?.on('data', (chunk) => {
      output += chunk;
    });
    const deadline = Date.now() + 20000;
    const waitUntilReady = async (): Promise<void> => {
      if (child?.exitCode !== null || Date.now() > deadline)
        throw new Error(`CLI did not start: ${output}`);
      try {
        await request(port, '/si_functions/empty');
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return waitUntilReady();
      }
    };
    await waitUntilReady();
  }, 30000);
  afterAll(async () => {
    if (child && child.exitCode === null) {
      const closed = once(child, 'close');
      child.kill();
      await closed;
    }
  });

  it.each([
    ['GET', ''],
    ['POST', '{"value":42}'],
    ['POST', 'non-JSON CLI body 雪'],
  ])(
    'runs the actual CLI and verifies %s input and HTTP output without credentials',
    async (method, body) => {
      expectContract(await request(port, functionUrl, method, body), method, body);
    },
  );
});

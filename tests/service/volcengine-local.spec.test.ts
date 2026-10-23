import { spawn, ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { runLocal } from '../../src/commands/local';
import { getContext, ProviderEnum, SI_LOCALSTACK_SERVER_PORT } from '../../src/common';
import { stopLocal } from '../../src/stack/localStack';

const repoRoot = path.resolve(__dirname, '../..');
const fixture = path.join(repoRoot, 'tests/fixtures/volcengine-local/serverlessinsight.yml');
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
  expect(response.headers['x-local-contract']).toBe('vefaas');
  const received = JSON.parse(response.body);
  expect(received.event).toEqual({
    httpMethod: method,
    path: '/echo',
    pathParameters: {},
    queryStringParameters: { q: 'snow 雪', tag: 'last' },
    headers: expect.objectContaining({
      'x-synthetic-input': 'local-test',
      'x-faas-request-id': received.context.requestId,
    }),
    body,
  });
  expect(Object.keys(received.context)).toEqual(['requestId']);
  expect(received.context.requestId).toMatch(/^[\da-f-]{36}$/);
  expect(received.stage).toBe('preview');
  expect(received.greeting).toBe('hello-preview');
};

const eventPath = '/si_events/api/echo?q=snow%20%E9%9B%AA&tag=first&tag=last';

describe('local command initialization and live veFaaS HTTP contract', () => {
  beforeAll(async () => {
    await runLocal({
      location: fixture,
      stage: 'preview',
      debug: false,
      watch: false,
      region: 'cn-shanghai',
    });
  });
  afterAll(async () => {
    await stopLocal();
  });

  it('keeps provider, region overrides and stage variables through real initialization', () => {
    const ctx = getContext();
    expect(ctx.provider).toBe(ProviderEnum.VOLCENGINE);
    expect(ctx.region).toBe('cn-shanghai');
    expect(ctx.stage).toBe('preview');
    expect(ctx.stages?.preview).toEqual([{ key: 'greeting', value: 'hello-preview' }]);
    expect(ctx.iac?.provider).toEqual({ name: ProviderEnum.VOLCENGINE, region: 'cn-shanghai' });
  });

  it.each([
    ['GET', ''],
    ['POST', '{"hello":1}'],
    ['POST', 'plain text 雪'],
  ])('delivers %s HTTP input through the worker', async (method, body) => {
    expectContract(await request(SI_LOCALSTACK_SERVER_PORT, eventPath, method, body), method, body);
  });

  it('preserves repeated and trailing slashes in exact configured paths', async () => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, '/si_events/api/exact//path/');
    expect(response.status).toBe(207);
    expect(JSON.parse(response.body).event.path).toBe('/exact//path/');
  });

  it.each([
    '/si_events/api/echo/extra',
    '/si_events/missing/echo',
    '/si_functions/nonexistent',
    '/si_events/api/echo/',
  ])('returns 404 for %s', async (url) => {
    expect((await request(SI_LOCALSTACK_SERVER_PORT, url)).status).toBe(404);
  });

  it('returns 415 for invalid UTF-8 binary input', async () => {
    const response = await request(
      SI_LOCALSTACK_SERVER_PORT,
      eventPath,
      'POST',
      Buffer.from([0xff, 0x00, 0x80]),
    );
    expect(response.status).toBe(415);
    expect(JSON.parse(response.body).message).toContain('UTF-8');
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
  });

  it('reports malformed response envelopes as 502', async () => {
    expect((await request(SI_LOCALSTACK_SERVER_PORT, '/si_functions/invalid')).status).toBe(502);
  });
});

/**
 * This suite spawns the built CLI (dist/) — CI builds before testing; skipped
 * when dist is absent so a raw `npm test` without a build still passes (same
 * convention as cli-agent-surface.spec.test.ts).
 */
(existsSync(cli) ? describe : describe.skip)('offline si local CLI smoke test', () => {
  let child: ChildProcess | undefined;
  let port: number;
  let output = '';

  beforeAll(async () => {
    port = await freePort();
    child = spawn(
      process.execPath,
      [cli, 'local', '-f', fixture, '-s', 'preview', '-v', 'volcengine', '-r', 'cn-shanghai'],
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
      expectContract(await request(port, eventPath, method, body), method, body);
    },
  );
});

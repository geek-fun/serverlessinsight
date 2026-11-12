import { spawn, ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { runLocal } from '../../src/commands/local';
import { getContext, ProviderEnum, SI_LOCALSTACK_SERVER_PORT } from '../../src/common';
import { stopLocal } from '../../src/stack/localStack';

const repoRoot = path.resolve(__dirname, '../..');
const fixture = path.join(repoRoot, 'tests/fixtures/aliyun-local/serverlessinsight.yml');
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
        headers: { 'x-synthetic-input': 'local-test', 'x-ca-client-header': 'must-be-filtered' },
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

describe('local command initialization and live aliyun FC gateway contract (issue #298)', () => {
  beforeAll(async () => {
    await runLocal({
      location: fixture,
      stage: 'preview',
      debug: false,
      watch: false,
      region: 'cn-hangzhou',
    });
  });

  afterAll(async () => {
    await stopLocal();
  });

  it('keeps provider, region and stage through real initialization', () => {
    const ctx = getContext();
    expect(ctx.provider).toBe(ProviderEnum.ALIYUN);
    expect(ctx.region).toBe('cn-hangzhou');
    expect(ctx.stage).toBe('preview');
  });

  it('dispatches a production-shaped URL directly with the passthrough FCEvent contract', async () => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, '/echo?trace=1');

    expect(response.status).toBe(200);
    const received = JSON.parse(response.body);
    const fcEvent = received.event as {
      path: string;
      httpMethod: string;
      headers: Record<string, string>;
      queryParameters: Record<string, string>;
      pathParameters: Record<string, string>;
      body: string | undefined;
      isBase64Encoded: boolean;
      requestContext: { stage: string; requestId: string; apiId?: string };
    };

    expect(fcEvent).toMatchObject({
      path: '/echo',
      httpMethod: 'GET',
      queryParameters: { trace: '1' },
      pathParameters: {},
      isBase64Encoded: false,
      requestContext: { stage: 'preview' },
    });
    expect(fcEvent.requestContext.requestId).toMatch(/^[\da-f]{32}$/);
    expect(fcEvent.requestContext.apiId).toBeUndefined();

    expect(fcEvent.headers).toMatchObject({
      host: 'local-fc-preview.si-local.gateway',
      'x-synthetic-input': 'local-test',
      'x-forwarded-for': '127.0.0.1',
      'x-forwarded-proto': 'http',
      via: '1.1 si-local-api-gateway',
      'x-ca-request-id': fcEvent.requestContext.requestId,
      'x-ca-stage': 'preview',
    });
    expect(fcEvent.headers['x-ca-client-header']).toBeUndefined();
    expect(fcEvent.headers['connection']).toBeUndefined();
    expect(fcEvent.headers['host']).not.toContain('127.0.0.1');
    expect(received.requestId).toMatch(/^[\da-f]{32}$/);
  });

  it('populates pathParameters from [param] segments on a prefixed URL', async () => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, '/si_events/api/users/42');

    expect(response.status).toBe(200);
    const received = JSON.parse(response.body);
    expect(received.from).toBe('echo');
    expect(received.event).toMatchObject({
      path: '/users/42',
      pathParameters: { id: '42' },
      requestContext: { stage: 'preview' },
    });
  });

  it('keeps ambiguous triggers prefix-disambiguated with a startup warning', async () => {
    const unprefixed = await request(SI_LOCALSTACK_SERVER_PORT, '/users/42');
    expect(unprefixed.status).toBe(404);
    const body = JSON.parse(unprefixed.body);
    expect(body.error).toBe('Route not found');
    expect(body.hint).toContain('/users/42');
    expect(body.hint).toContain('api');
    expect(body.hint).toContain('other');

    const viaApi = await request(SI_LOCALSTACK_SERVER_PORT, '/si_events/api/users/42');
    const viaOther = await request(SI_LOCALSTACK_SERVER_PORT, '/si_events/other/users/42');
    expect(JSON.parse(viaApi.body).from).toBe('echo');
    expect(JSON.parse(viaOther.body).from).toBe('clash');
  });

  it('returns 404 when no gateway trigger matches the unprefixed URL', async () => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, '/api/unknown');
    expect(response.status).toBe(404);
    expect(JSON.parse(response.body).error).toBe('Route not found');
  });

  it('serves the website index document for the bucket root (S3)', async () => {
    const response = await request(SI_LOCALSTACK_SERVER_PORT, '/si_buckets/site/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toBe('text/html');
    expect(response.body).toContain('Local SPA index');
  });

  it('falls back to the index for SPA routes and serves assets', async () => {
    const spa = await request(SI_LOCALSTACK_SERVER_PORT, '/si_buckets/site/admin/dashboard');
    expect(spa.status).toBe(200);
    expect(spa.headers['content-type']).toBe('text/html');
    expect(spa.body).toContain('Local SPA index');

    const asset = await request(SI_LOCALSTACK_SERVER_PORT, '/si_buckets/site/app.js');
    expect(asset.status).toBe(200);
    expect(asset.headers['content-type']).toBe('application/javascript');

    const missingAsset = await request(SI_LOCALSTACK_SERVER_PORT, '/si_buckets/site/missing.png');
    expect(missingAsset.status).toBe(404);
  });
});

describe('offline si local CLI smoke test with --strict-prefix', () => {
  let child: ChildProcess | undefined;
  let port: number;
  let output = '';

  beforeAll(async () => {
    port = await freePort();
    child = spawn(
      process.execPath,
      [
        cli,
        'local',
        '-f',
        fixture,
        '-s',
        'preview',
        '-v',
        'aliyun',
        '-r',
        'cn-hangzhou',
        '--strict-prefix',
      ],
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
      output += String(chunk);
    });
    child.stderr?.on('data', (chunk) => {
      output += String(chunk);
    });

    for (let attempt = 0; attempt < 50; attempt += 1) {
      if (output.includes('Local Server listening')) break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  });

  afterAll(async () => {
    child?.kill();
    await new Promise<void>((resolve) => {
      if (!child || child.exitCode !== null) return resolve();
      child.once('exit', () => resolve());
      setTimeout(resolve, 2000);
    });
  });

  it('routes only via /SI_* prefixes when --strict-prefix is set', async () => {
    const unprefixed = await request(port, '/echo');
    expect(unprefixed.status).toBe(404);
    expect(JSON.parse(unprefixed.body).error).toBe('Route not found');

    const prefixed = await request(port, '/si_events/api/echo');
    expect(prefixed.status).toBe(200);
    expect(JSON.parse(prefixed.body).from).toBe('echo');
  });
});

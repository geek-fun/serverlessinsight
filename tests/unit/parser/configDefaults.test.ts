import { parseFunction } from '../../../src/parser/functionParser';
import { parseBucket } from '../../../src/parser/bucketParser';
import { parseEvent } from '../../../src/parser/eventParser';
import { functionToFc3Config } from '../../../src/stack/aliyunStack/fc3Types';
import { functionToScfConfig } from '../../../src/stack/scfStack/scfTypes';
import { functionToVefaasConfig } from '../../../src/stack/volcengineStack/vefaasTypes';
import {
  bucketToOssBucketConfig,
  extractOssBucketDefinition,
} from '../../../src/stack/aliyunStack/ossTypes';
import type { FunctionRaw } from '../../../src/types';

describe('framework configuration defaults', () => {
  const raw = {
    name: 'handler',
    code: { runtime: 'nodejs18', handler: 'index.handler', path: 'code.zip' },
  };
  const parse = (fields: Partial<FunctionRaw> = {}) =>
    parseFunction({ handler: { ...raw, ...fields } })![0];
  it('resets logging and timer enablement when their values are omitted', () => {
    expect(parse({ log: true }).log).toBe(true);
    expect(parse().log).toBe(false);
    expect(parse({ log: false }).log).toBe(parse().log);
    const timer = { name: 'job', cron: '0 0 * * *' };
    expect(
      parse({ triggers: { timer: [{ ...timer, enable: false }] } }).triggers!.timer![0].enable,
    ).toBe(false);
    expect(parse({ triggers: { timer: [timer] } }).triggers!.timer![0].enable).toBe(true);
  });
  it('uses provider defaults for omitted memory and timeout on every build', () => {
    const custom = parse({ memory: 256, timeout: 30 });
    expect(functionToFc3Config(custom)).toMatchObject({ memorySize: 256, timeout: 30 });
    expect(functionToFc3Config(parse())).toMatchObject({ memorySize: 128, timeout: 60 });
    expect(functionToScfConfig(parse())).toMatchObject({ MemorySize: 128, Timeout: 3 });
    expect(functionToVefaasConfig(parse())).toMatchObject({ memoryMb: 512, requestTimeout: 60 });
  });
  it('restores website index and enabled CDN type/scope defaults', () => {
    const custom = parseBucket({
      assets: {
        name: 'assets',
        website: { code: 'dist', index: 'home.html' },
        domain: {
          domain_name: 'example.com',
          cdn: { enabled: true, cdn_type: 'download', scope: 'overseas' },
        },
      },
    })![0];
    const reset = parseBucket({
      assets: {
        name: 'assets',
        website: { code: 'dist' },
        domain: { domain_name: 'example.com', cdn: true },
      },
    })![0];
    expect(custom.website!.index).toBe('home.html');
    expect(reset.website!.index).toBe('index.html');
    expect(extractOssBucketDefinition(bucketToOssBucketConfig(reset))).toMatchObject({
      cdnType: 'web',
      cdnScope: 'global',
      wwwBindApex: false,
    });
  });
  it('uses HTTP and no www binding for omitted event domain settings', () => {
    const event = parseEvent({
      gateway: {
        name: 'gateway',
        type: 'API_GATEWAY',
        triggers: [],
        domain: { domain_name: 'example.com' },
      },
    })![0];
    expect(event.domain).toMatchObject({ protocol: 'HTTP', www_bind_apex: false });
    expect(event.log).toBe(false);
  });
});

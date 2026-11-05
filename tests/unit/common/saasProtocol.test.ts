import {
  hashSaasState,
  isRegionalSaasSnapshot,
  supportsRegionalSaas,
} from '../../../src/common/saasProtocol';

const scope = {
  provider: 'aliyun',
  app: 'app',
  service: 'svc',
  stage: 'prod',
  region: 'cn-hangzhou',
};

describe('regional SaaS wire contract', () => {
  it('requires an explicitly compatible protocol and state format', () => {
    expect(
      supportsRegionalSaas({
        regionalScope: true,
        providerScope: true,
        scopeProtocol: 3,
        stateFormat: '4.0',
      }),
    ).toBe(true);
    [
      null,
      {},
      { regionalScope: true },
      { regionalScope: true, scopeProtocol: 1, stateFormat: '4.0' },
      { regionalScope: true, scopeProtocol: 3, stateFormat: '4.0' },
      { regionalScope: true, scopeProtocol: 2, stateFormat: '5.0' },
    ].forEach((caps) => expect(supportsRegionalSaas(caps)).toBe(false));
  });

  it('recognizes server-authorized binding without requiring history to be rewritten', () => {
    const snapshot = {
      id: 'state',
      serviceId: 'svc-id',
      stageId: 'lifecycle',
      stage: 'prod',
      region: 'cn-hangzhou',
      scopeProtocol: 3,
      provider: 'aliyun',
      contentHash: 'original-legacy-hash',
      versionNumber: 1,
    };
    expect(isRegionalSaasSnapshot(snapshot, scope)).toBe(true);
    [
      undefined,
      {},
      { ...snapshot, stageId: '' },
      { ...snapshot, stage: 'dev' },
      { ...snapshot, provider: 'tencent' },
      { ...snapshot, scopeProtocol: 2 },
      { ...snapshot, region: 'cn-beijing' },
      { ...snapshot, id: '' },
      { ...snapshot, contentHash: '' },
      { ...snapshot, versionNumber: 0 },
      { ...snapshot, versionNumber: 1.5 },
    ].forEach((value) => expect(isRegionalSaasSnapshot(value, scope)).toBe(false));
  });

  it('hashes equivalent JSON identically across reordered keys and JSONB round trips', () => {
    const first = {
      z: { beta: 2, alpha: 1 },
      a: [null, { right: true, left: false }],
      omitted: undefined,
    };
    const reordered = { a: [null, { left: false, right: true }], z: { alpha: 1, beta: 2 } };
    expect(hashSaasState(first)).toBe(hashSaasState(reordered));
    expect(hashSaasState(first)).toBe(hashSaasState(JSON.parse(JSON.stringify(first))));
    expect(hashSaasState([1, 2])).not.toBe(hashSaasState([2, 1]));
    expect(hashSaasState({ at: new Date('2026-01-01') })).toBe(
      hashSaasState({ at: '2026-01-01T00:00:00.000Z' }),
    );
  });
});

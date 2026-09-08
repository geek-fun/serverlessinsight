import { remoteDiffersFromDesired, jsonDocumentDiffers } from '../../../src/common/planCompare';

describe('remoteDiffersFromDesired', () => {
  it('returns false when every declared desired value matches the remote', () => {
    const remote = { memorySize: 256, timeout: 30, logConfig: { enableRequestMetrics: true } };
    const desired = { memorySize: 256, timeout: 30, logConfig: { enableRequestMetrics: true } };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(false);
  });

  it('returns true when a declared desired value differs from the remote', () => {
    const remote = { memorySize: 256, timeout: 30 };
    const desired = { memorySize: 128, timeout: 30 };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(true);
  });

  it('returns false for remote keys the desired definition does not declare', () => {
    const remote = { description: 'console note', codeChecksum: 'abc' };
    const desired = { memorySize: 256 };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(false);
  });

  it('returns false for remote keys the desired definition declares as null/undefined', () => {
    const remote = { vpcConfig: { vpcId: 'vpc-1' }, logConfig: { project: 'p' } };
    const desired = { vpcConfig: null, logConfig: undefined };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(false);
  });

  it('returns true when the remote is missing a value the desired declares', () => {
    const remote = { memorySize: null };
    const desired = { memorySize: 256 };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(true);
  });

  it('treats null and undefined as equal within nested objects', () => {
    const remote = { logConfig: { enableRequestMetrics: true, enableInstanceMetrics: null } };
    const desired = { logConfig: { enableRequestMetrics: true } };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(false);
  });

  it('returns true on nested object mismatches inside declared keys', () => {
    const remote = { vpcConfig: { vpcId: 'vpc-other' } };
    const desired = { vpcConfig: { vpcId: 'vpc-1' } };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(true);
  });

  it('ignores remote values behind a desired empty plain object (executor omits the field)', () => {
    const remote = {
      environment: { CONSOLE_ADDED: '1' },
      websiteConfiguration: { indexDocument: 'index.html' },
    };
    const desired = { environment: {}, websiteConfiguration: {} };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(false);
  });

  it('still flags drift when the desired empty object is replaced by a declared one', () => {
    const remote = { environment: {} };
    const desired = { environment: { NODE_ENV: 'production' } };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(true);
  });

  it('does not treat empty arrays or empty strings as undeclared', () => {
    const remote = { mountPoints: [{ serverAddr: 'addr' }], handler: '' };
    const desired = { mountPoints: [], handler: '' };

    expect(remoteDiffersFromDesired(remote, desired)).toBe(true);
  });
});

describe('jsonDocumentDiffers', () => {
  it('ignores key order and formatting between parsed objects and strings', () => {
    expect(jsonDocumentDiffers('{"b":2,"a":1}', '{"a":1, "b": 2}')).toBe(false);
    expect(jsonDocumentDiffers('{"a":1}', { a: 1 })).toBe(false);
  });

  it('flags real content differences', () => {
    expect(jsonDocumentDiffers('{"a":1}', { a: 2 })).toBe(true);
  });

  it('treats undeclared desired or unreadable cloud values as not drift', () => {
    expect(jsonDocumentDiffers(null, { a: 1 })).toBe(false);
    expect(jsonDocumentDiffers('{"a":1}', undefined)).toBe(false);
    expect(jsonDocumentDiffers('{"a":1}', null)).toBe(false);
  });

  it('returns false on unparseable input instead of fabricating drift', () => {
    expect(jsonDocumentDiffers('not-json', { a: 1 })).toBe(false);
  });
});

import { remoteDiffersFromDesired } from '../../../src/common/planCompare';

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
});

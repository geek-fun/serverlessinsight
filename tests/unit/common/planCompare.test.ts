import { mergeManagedIntent } from '../../../src/common/planCompare';
import {
  remoteDiffersFromDesired,
  jsonDocumentDiffers,
  mergeLiveBefore,
  computeRevertKeys,
  managedDefinition,
  definitionsDiffer,
} from '../../../src/common/planCompare';

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
    expect(jsonDocumentDiffers('{"a":1}', null)).toBe(true);
  });

  it('returns false on unparseable input instead of fabricating drift', () => {
    expect(jsonDocumentDiffers('not-json', { a: 1 })).toBe(false);
  });
});

describe('mergeLiveBefore (issue #246)', () => {
  it('lets live values win over stored ones', () => {
    expect(mergeLiveBefore({ memory: 128, codeHash: 'old' }, { memory: 64 })).toEqual({
      memory: 64,
      codeHash: 'old',
    });
  });

  it('keeps a live null so the diff shows the cloud cleared the field', () => {
    expect(mergeLiveBefore({ logConfig: { a: 1 } }, { logConfig: null })).toEqual({
      logConfig: null,
    });
  });
});

describe('computeRevertKeys (issue #246)', () => {
  it('marks keys where stored matches desired but live diverged', () => {
    const stored = { memory: 256, timeout: 30 };
    const live = { memory: 128, timeout: 30 };
    const desired = { memory: 256, timeout: 30 };

    expect(computeRevertKeys(stored, live, desired)).toEqual(['memory']);
  });

  it('does not mark keys the config itself changed', () => {
    const stored = { memory: 256 };
    const live = { memory: 128 };
    const desired = { memory: 512 };

    expect(computeRevertKeys(stored, live, desired)).toEqual([]);
  });

  it('treats null and undefined as equal representations of unset', () => {
    const stored = { vpcConfig: null };
    const live = { vpcConfig: { vpcId: 'vpc-1' } };
    const desired = { vpcConfig: undefined };

    expect(computeRevertKeys(stored, live, desired)).toEqual([]);
  });
});

describe('managed comparison contract (issue #264)', () => {
  it('projects structural cloud defaults out of a declared object', () => {
    const desired = { container: { image: 'app:v1', port: 8080 } };
    const live = { container: { image: 'app:v1', port: 8080, command: ['/default'] } };
    expect(remoteDiffersFromDesired(live, desired)).toBe(false);
    expect(mergeLiveBefore({}, live, desired)).toEqual(desired);
  });

  it('keeps full environment-map replacement semantics', () => {
    const desired = { environment: { DECLARED: '1' } };
    const live = { environment: { DECLARED: '1', MANUAL: '2' } };
    expect(remoteDiffersFromDesired(live, desired)).toBe(true);
    expect(mergeLiveBefore({}, live, desired)).toEqual(live);
  });

  it('does not display unmanaged fields as removals alongside a real change', () => {
    const desired = { codeHash: 'new', nasConfig: null, environment: {} };
    const stored = { codeHash: 'old', nasConfig: null };
    const live = { nasConfig: { userId: 0, mountPoints: [] }, environment: { MANUAL: '1' } };
    expect(mergeLiveBefore(stored, live, desired)).toEqual({ codeHash: 'old' });
    expect(managedDefinition(desired)).toEqual({ codeHash: 'new' });
    expect(computeRevertKeys(stored, live, desired)).toEqual([]);
  });

  it('normalizes membership order and duplicate members but preserves commands', () => {
    const desired = { vpcConfig: { vSwitchIds: ['a', 'b'] } };
    const live = { vpcConfig: { vSwitchIds: ['b', 'a', 'a'] } };
    expect(remoteDiffersFromDesired(live, desired)).toBe(false);
    expect(definitionsDiffer(live, desired)).toBe(false);
    expect(definitionsDiffer({ command: ['b', 'a'] }, { command: ['a', 'b'] })).toBe(true);
  });

  it('normalizes nested membership fields inside arrays without reordering sequences', () => {
    const desired = { network: [{ ips: ['a', 'b'] }, { ips: ['c'] }] };
    expect(definitionsDiffer({ network: [{ ips: ['b', 'a'] }, { ips: ['c'] }] }, desired)).toBe(
      false,
    );
    expect(definitionsDiffer({ network: [{ ips: ['c'] }, { ips: ['b', 'a'] }] }, desired)).toBe(
      true,
    );
  });

  it('ignores null and empty structural members while preserving false, zero and empty arrays', () => {
    const desired = {
      config: { ignored: null, alsoIgnored: {}, zero: 0, enabled: false, names: [] },
    };
    expect(managedDefinition(desired)).toEqual({ config: { zero: 0, enabled: false, names: [] } });
    expect(remoteDiffersFromDesired({ config: null }, desired)).toBe(true);
    expect(definitionsDiffer({}, desired)).toBe(true);
  });

  it('reports individual cloud reverts next to independent YAML edits', () => {
    const stored = { environment: { A: 'old', B: 'keep' } };
    const live = { environment: { A: 'old', B: 'manual', EXTRA: 'manual' } };
    const desired = { environment: { A: 'new', B: 'keep' } };
    expect(computeRevertKeys(stored, live, desired)).toEqual([
      'environment.B',
      'environment.EXTRA',
    ]);
  });

  it('uses the parent path when a declared object is absent in the cloud', () => {
    const desired = { config: { enabled: true } };
    expect(computeRevertKeys(desired, { config: null }, desired)).toEqual(['config']);
  });

  it('does not claim cloud edits on unreadable dimensions', () => {
    expect(computeRevertKeys({ codeHash: 'same' }, {}, { codeHash: 'same' })).toEqual([]);
  });

  it('preserves known absence and uses stored values only for unreadable fields', () => {
    expect(
      mergeLiveBefore(
        { memory: 128, codeHash: 'old' },
        { memory: null },
        { memory: 256, codeHash: 'new' },
      ),
    ).toEqual({ memory: null, codeHash: 'old' });
  });
});

describe('persisted managed intent', () => {
  it('retains omitted and nested unmanaged settings while applying declared replacements', () => {
    const old = {
      iam: {
        role: { name: 'role', managed_policies: ['policy'], statements: [{ action: ['read'] }] },
      },
      environment: { OLD: 'value' },
      vpcConfig: { id: 'vpc', defaults: true },
      obsolete: 1,
    };
    const next = mergeManagedIntent(old, {
      iam: { role: { name: 'role', managed_policies: [] } },
      environment: { NEW: 'value' },
      vpcConfig: null,
      metadata: undefined,
    });
    expect(next).toEqual({
      ...old,
      iam: { role: { name: 'role', managed_policies: [], statements: [{ action: ['read'] }] } },
      environment: { NEW: 'value' },
      metadata: undefined,
    });
    expect(old.iam.role.managed_policies).toEqual(['policy']);
  });
  it('preserves raw new intent and whole ordered arrays', () => {
    expect(
      mergeManagedIntent(
        {},
        {
          flag: false,
          count: 0,
          text: '',
          config: {},
          value: null,
          policy: 'null',
          command: ['b', 'a'],
        },
      ),
    ).toEqual({
      flag: false,
      count: 0,
      text: '',
      config: {},
      value: null,
      policy: 'null',
      command: ['b', 'a'],
    });
  });
  it('treats undefined live values as unreadable rather than absent', () => {
    expect(remoteDiffersFromDesired({ runtime: undefined }, { runtime: 'node20' })).toBe(false);
    expect(mergeLiveBefore({ runtime: 'node20' }, { runtime: undefined })).toEqual({
      runtime: 'node20',
    });
  });
});

describe('schema-declared membership collections', () => {
  it('compares effective policy collections without relying on provider ordering', () => {
    const desired = {
      policy: JSON.stringify({
        Version: '1',
        Statement: [
          {
            Effect: 'Allow',
            Action: ['read', 'write'],
            Principal: { AWS: ['one', 'two'] },
            Resource: ['a', 'b'],
          },
          { Effect: 'Deny', Action: ['delete'], Resource: ['*'] },
        ],
      }),
    };
    const live = {
      policy: JSON.stringify({
        Statement: [
          { Resource: ['*'], Action: ['delete'], Effect: 'Deny' },
          {
            Resource: ['b', 'a'],
            Principal: { AWS: ['two', 'one'] },
            Action: ['write', 'read'],
            Effect: 'Allow',
          },
        ],
        Version: '1',
      }),
    };
    expect(remoteDiffersFromDesired(live, desired)).toBe(false);
    expect(
      remoteDiffersFromDesired({ policy: JSON.parse(live.policy) }, managedDefinition(desired)),
    ).toBe(false);

    expect(
      definitionsDiffer(
        { domainProtocol: ['HTTPS', 'HTTP'] },
        { domainProtocol: ['HTTP', 'HTTPS'] },
      ),
    ).toBe(false);
    expect(
      definitionsDiffer(
        { customContainerConfig: { command: ['run', 'task'] } },
        { customContainerConfig: { command: ['task', 'run'] } },
      ),
    ).toBe(true);
  });
});

it('does not label unavailable live fields as cloud reverts during another update', () => {
  expect(
    computeRevertKeys(
      { policy: '{"Version":"1"}', codeHash: 'old' },
      { policy: undefined },
      { policy: '{"Version":"1"}', codeHash: 'new' },
    ),
  ).toEqual([]);
});

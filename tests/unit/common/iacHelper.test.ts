import { getIacDefinition } from '../../../src/common/iacHelper';
import { ServerlessIac } from '../../../src/types';

describe('getIacDefinition', () => {
  const buildIac = (functions: Array<{ key: string; name: string }>): ServerlessIac =>
    ({
      functions: functions.map((fn) => ({ ...fn })),
    }) as unknown as ServerlessIac;

  const iac = buildIac([
    { key: 'console_fn', name: 'console-fn-deployed' },
    { key: 'api_fn', name: 'api-fn-deployed' },
  ]);

  it('resolves the template reference form by function key', () => {
    expect(getIacDefinition(iac, '${functions.console_fn}')).toMatchObject({
      key: 'console_fn',
      name: 'console-fn-deployed',
    });
  });

  it('resolves a bare value by the function deployed name (issue #227)', () => {
    expect(getIacDefinition(iac, 'console-fn-deployed')).toMatchObject({
      key: 'console_fn',
      name: 'console-fn-deployed',
    });
  });

  it('does not resolve a bare value that equals a function key (fallback removed, issue #227)', () => {
    expect(getIacDefinition(iac, 'console_fn')).toBeUndefined();
  });

  it('returns undefined for unknown values', () => {
    expect(getIacDefinition(iac, 'totally-unknown-fn')).toBeUndefined();
  });

  it('resolves template references against an empty function list as undefined', () => {
    expect(getIacDefinition(buildIac([]), '${functions.console_fn}')).toBeUndefined();
  });
});

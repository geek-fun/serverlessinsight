import {
  withFunctionLifecycle,
  withStoredFunctionIam,
  withLifecycleIntent,
} from '../../../src/common/functionDefinition';
import type { FunctionDomain } from '../../../src/types';

describe('function lifecycle intent', () => {
  it('does not declare omitted lifecycle dimensions', () => {
    expect(withFunctionLifecycle({ codeHash: 'same' })).toEqual({ codeHash: 'same' });
    expect(
      withFunctionLifecycle({}, {
        key: 'fn',
        name: 'fn',
        storage: {},
        triggers: { timer: [] },
      } as FunctionDomain),
    ).toEqual({ timers: [] });
  });
  it('persists HTTP, canonicalized domains and timers for both planner and executor comparison', () => {
    const fn = {
      key: 'fn',
      name: 'fn',
      storage: {},
      triggers: {
        http: { auth_type: 'iam' as const },
        timer: [{ name: 'daily', cron: '0 0 * * *', enable: true, description: 'daily job' }],
      },
      domains: [{ domain_name: 'API.Example.com', path: '/*', protocol: ['HTTPS' as const] }],
    };
    expect(withFunctionLifecycle({ memory: 128 }, fn)).toEqual({
      memory: 128,
      http: fn.triggers.http,
      timers: fn.triggers.timer,
      domains: [
        {
          domain_name: 'API.Example.com',
          path: '/*',
          certificate_id: null,
          certificate_body: null,
          certificate_private_key: null,
          certificate_hash: null,
          protocol: ['HTTPS'],
        },
      ],
    });
  });
  it('skips HTTP and domains intent for providers that do not apply them', () => {
    const fn = {
      key: 'fn',
      name: 'fn',
      storage: {},
      triggers: { http: { auth_type: 'iam' as const }, timer: [] },
      domains: [{ domain_name: 'api.example.com', path: '/*', protocol: ['HTTPS' as const] }],
    } as FunctionDomain;
    expect(withFunctionLifecycle({}, fn, { http: false, domains: false })).toEqual({ timers: [] });
  });
  it('retains saved IAM only when IAM is omitted', () => {
    const fn = { key: 'fn', name: 'fn', storage: {} } as FunctionDomain;
    const iam = { role: 'external-role' };
    expect(withStoredFunctionIam(fn, { iam }).iam).toEqual(iam);
    expect(withStoredFunctionIam(fn)).toBe(fn);
    const declared = { ...fn, iam: { role: 'new-role' } };
    expect(withStoredFunctionIam(declared, { iam })).toEqual(declared);
    expect(withStoredFunctionIam({ ...fn, log: false }, { iam }).log).toBe(false);
  });
  it('replaces lifecycle keys on write instead of merging stored intent back', () => {
    const merged = {
      memory: 512,
      http: { auth_type: 'iam' },
      domains: [{ domain_name: 'old.com' }],
    };
    const desired = { memory: 512 };
    expect(withLifecycleIntent(merged, desired, ['http', 'domains'])).toEqual({ memory: 512 });
    expect(
      withLifecycleIntent(merged, { memory: 1, http: { auth_type: 'anonymous' } }, [
        'http',
        'domains',
      ]),
    ).toEqual({
      memory: 512,
      http: { auth_type: 'anonymous' },
    });
    expect(withLifecycleIntent(merged, desired, [])).toEqual(merged);
  });
});

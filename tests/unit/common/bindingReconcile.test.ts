import {
  bindingToDefinitionEntry,
  buildStoredBindings,
  cdnDeliveryChanged,
  desiredBindingMode,
  getBindingCdnOptions,
  groupBindingInstances,
  isBindingCdnEnabled,
  shouldDeployBindingCertificate,
  type BindingInstanceGroup,
} from '../../../src/common/bindingReconcile';
import type { ResourceInstance, ResourceState } from '../../../src/types';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

const instance = (overrides: Partial<ResourceInstance>): ResourceInstance =>
  ({ sid: 'sid', id: 'id', type: 'X', ...overrides }) as ResourceInstance;

describe('bindingReconcile (issue #283 shared core)', () => {
  describe('cdn option accessors', () => {
    it('resolves the boolean shorthand and absence', () => {
      expect(getBindingCdnOptions({ cdn: true })).toEqual({ enabled: true });
      expect(getBindingCdnOptions({ cdn: false })).toBeUndefined();
      expect(getBindingCdnOptions({})).toBeUndefined();
      expect(getBindingCdnOptions({ cdn: { enabled: false } })).toEqual({ enabled: false });
    });

    it('detects cdn enablement across both shapes', () => {
      expect(isBindingCdnEnabled({ cdn: true })).toBe(true);
      expect(isBindingCdnEnabled({ cdn: { enabled: true } })).toBe(true);
      expect(isBindingCdnEnabled({ cdn: false })).toBe(false);
      expect(isBindingCdnEnabled({ cdn: { enabled: false } })).toBe(false);
      expect(isBindingCdnEnabled({})).toBe(false);
    });
  });

  describe('groupBindingInstances', () => {
    it('groups instances by hostname across the provider role map', () => {
      const roleByType: Record<string, keyof BindingInstanceGroup> = {
        TENCENT_CDN_DOMAIN: 'cdn',
        TENCENT_CDN_DNS_CNAME: 'cdnDns',
        TENCENT_COS_DNS_CNAME: 'dns',
      };
      const groups = groupBindingInstances(
        [
          instance({ type: 'TENCENT_CDN_DOMAIN', domainName: 'WWW.Example.com' }),
          instance({ type: 'TENCENT_CDN_DNS_CNAME', domain: 'www.example.com' }),
          instance({ type: 'TENCENT_COS_DNS_CNAME', domain: 'other.example.com' }),
          instance({ type: 'COS_BUCKET', bucket: 'unrelated' }),
        ],
        roleByType,
      );

      expect(groups.size).toBe(2);
      expect(groups.get('www.example.com')?.cdn).toBeDefined();
      expect(groups.get('www.example.com')?.cdnDns).toBeDefined();
      expect(groups.get('other.example.com')?.dns).toBeDefined();
      expect(groups.get('other.example.com')?.cdn).toBeUndefined();
    });
  });

  describe('buildStoredBindings', () => {
    const roleByType: Record<string, keyof BindingInstanceGroup> = {
      TENCENT_CDN_DOMAIN: 'cdn',
      TENCENT_COS_DNS_CNAME: 'dns',
    };
    const baseOptions = { accelerateEnabled: false };

    it('reads canonicalized domains entries and adopts instance-only bindings', () => {
      const state = {
        definition: {
          domains: [
            {
              domain_name: 'cdn.example.com',
              cdn: { enabled: true, cdn_type: 'web', scope: 'global' },
              certificate_id: 'cert-1',
              certificate_hash: 'hash-1',
            },
          ],
        },
        instances: [instance({ type: 'TENCENT_COS_DNS_CNAME', domain: 'orphan.example.com' })],
      } as unknown as ResourceState;

      const groups = groupBindingInstances(state.instances, roleByType);
      const stored = buildStoredBindings(state, groups, { ...baseOptions });

      expect(stored.get('cdn.example.com')).toMatchObject({
        mode: 'cdn',
        certId: 'cert-1',
        certHash: 'hash-1',
      });
      expect(stored.get('orphan.example.com')).toEqual({
        hostname: 'orphan.example.com',
        mode: 'direct',
      });
    });

    it('migrates legacy single-domain state through the provider hook', () => {
      const state = {
        definition: { domain: 'Legacy.Example.com', cdnEnabled: true },
        instances: [],
      } as unknown as ResourceState;
      const legacyBinding = (definition: Record<string, unknown>) => {
        if (typeof definition.domain !== 'string') return undefined;
        return {
          hostname: definition.domain.toLowerCase(),
          mode: definition.cdnEnabled ? ('cdn' as const) : ('direct' as const),
        };
      };

      const stored = buildStoredBindings(state, new Map(), {
        ...baseOptions,
        legacyBinding,
      });

      expect(stored.get('legacy.example.com')?.mode).toBe('cdn');
    });

    it('marks accelerate-only mode when bucket acceleration is enabled', () => {
      const state = {
        definition: { domains: [{ domain_name: 'a.example.com' }] },
        instances: [],
      } as unknown as ResourceState;

      const stored = buildStoredBindings(state, new Map(), { accelerateEnabled: true });

      expect(stored.get('a.example.com')?.mode).toBe('accelerate-only');
    });
  });

  describe('cdnDeliveryChanged / desiredBindingMode', () => {
    it('compares delivery shape with provider defaults applied', () => {
      expect(cdnDeliveryChanged(undefined, { enabled: true })).toBe(false);
      expect(cdnDeliveryChanged(undefined, { enabled: true, cdn_type: 'media' })).toBe(true);
      expect(cdnDeliveryChanged(undefined, { enabled: true, scope: 'overseas' })).toBe(true);
      expect(
        cdnDeliveryChanged({ enabled: true, cdn_type: 'web', scope: 'global' }, { enabled: true }),
      ).toBe(false);
    });

    it('resolves the desired mode', () => {
      expect(desiredBindingMode(true, false)).toBe('cdn');
      expect(desiredBindingMode(false, true)).toBe('accelerate-only');
      expect(desiredBindingMode(false, false)).toBe('direct');
    });
  });

  describe('shouldDeployBindingCertificate', () => {
    it('deploys when pending, on reference change, or on hash change', () => {
      expect(shouldDeployBindingCertificate({ pending: true, stored: undefined })).toBe(true);
      expect(
        shouldDeployBindingCertificate({
          pending: false,
          certificateId: 'cert-2',
          stored: { hostname: 'x', mode: 'cdn', certId: 'cert-1' },
        }),
      ).toBe(true);
      expect(
        shouldDeployBindingCertificate({
          pending: false,
          certificateId: 'cert-1',
          stored: { hostname: 'x', mode: 'cdn', certId: 'cert-1' },
        }),
      ).toBe(false);
      expect(
        shouldDeployBindingCertificate({
          pending: false,
          certificateHash: 'hash-new',
          stored: { hostname: 'x', mode: 'cdn', certHash: 'hash-old' },
        }),
      ).toBe(true);
      expect(
        shouldDeployBindingCertificate({
          pending: false,
          certificateHash: 'hash-same',
          stored: { hostname: 'x', mode: 'cdn', certHash: 'hash-same' },
        }),
      ).toBe(false);
    });
  });

  describe('bindingToDefinitionEntry', () => {
    it('canonicalizes the cdn object with defaults and records the certificate hash', () => {
      const entry = bindingToDefinitionEntry({
        domainName: 'example.com',
        certificateBody: '-----BEGIN CERTIFICATE-----body',
        certificatePrivateKey: '-----BEGIN PRIVATE KEY-----key',
        cdn: true,
      });

      expect(entry.domain_name).toBe('example.com');
      expect(entry.certificate_private_key).toBe('(managed)');
      expect(typeof entry.certificate_hash).toBe('string');
      expect(entry.cdn).toEqual({ enabled: true, cdn_type: 'web', scope: 'global' });
      expect(entry).not.toHaveProperty('protocol');
    });

    it('stores null hash and an explicit disabled cdn for a plain binding', () => {
      const entry = bindingToDefinitionEntry({ domainName: 'plain.example.com' });
      expect(entry.certificate_hash).toBeNull();
      expect(entry.cdn).toEqual({ enabled: false });
    });

    it('omits cdn_type/scope for a disabled cdn object without them', () => {
      const entry = bindingToDefinitionEntry({
        domainName: 'x.c',
        cdn: { enabled: false },
      });
      expect(entry.cdn).toEqual({ enabled: false });
    });
  });
});

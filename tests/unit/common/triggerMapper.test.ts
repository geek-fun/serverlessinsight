import { mapAuthType, mapAccess, mapAliyunAccess } from '../../../src/common/triggerMapper';
import { ProviderEnum } from '../../../src/common/providerEnum';

describe('triggerMapper', () => {
  describe('mapAuthType', () => {
    it('should map Tencent public -> NONE', () => {
      expect(mapAuthType(ProviderEnum.TENCENT, 'public')).toBe('NONE');
    });

    it('should map Tencent iam -> CAM', () => {
      expect(mapAuthType(ProviderEnum.TENCENT, 'iam')).toBe('CAM');
    });

    it('should map Aliyun public -> anonymous', () => {
      expect(mapAuthType(ProviderEnum.ALIYUN, 'public')).toBe('anonymous');
    });

    it('should map Aliyun iam -> function', () => {
      expect(mapAuthType(ProviderEnum.ALIYUN, 'iam')).toBe('function');
    });

    it('should map AWS public -> NONE', () => {
      expect(mapAuthType(ProviderEnum.AWS, 'public')).toBe('NONE');
    });

    it('should map AWS iam -> AWS_IAM', () => {
      expect(mapAuthType(ProviderEnum.AWS, 'iam')).toBe('AWS_IAM');
    });

    it('should default unknown provider to NONE for public', () => {
      expect(mapAuthType('UNKNOWN' as ProviderEnum, 'public')).toBe('NONE');
    });

    it('should default unknown provider to CAM for iam', () => {
      expect(mapAuthType('UNKNOWN' as ProviderEnum, 'iam')).toBe('CAM');
    });
  });

  describe('mapAccess', () => {
    it('should return empty when access is undefined', () => {
      expect(mapAccess(undefined)).toEqual({});
    });

    it('should return empty when access is empty array', () => {
      expect(mapAccess([])).toEqual({});
    });

    it('should map [public] -> extranet only', () => {
      expect(mapAccess(['public'])).toEqual({ enableExtranet: true, enableIntranet: false });
    });

    it('should map [internal] -> intranet only', () => {
      expect(mapAccess(['internal'])).toEqual({ enableExtranet: false, enableIntranet: true });
    });

    it('should map [public, internal] -> both', () => {
      expect(mapAccess(['public', 'internal'])).toEqual({
        enableExtranet: true,
        enableIntranet: true,
      });
    });
  });

  describe('mapAliyunAccess', () => {
    it('should return empty when access is undefined', () => {
      expect(mapAliyunAccess(undefined)).toEqual({});
    });

    it('should not disable URL internet when public access is allowed', () => {
      expect(mapAliyunAccess(['public'])).toEqual({ disableURLInternet: false });
    });

    it('should disable URL internet when only internal access', () => {
      expect(mapAliyunAccess(['internal'])).toEqual({ disableURLInternet: true });
    });

    it('should not disable URL internet when both public and internal', () => {
      expect(mapAliyunAccess(['public', 'internal'])).toEqual({ disableURLInternet: false });
    });
  });
});

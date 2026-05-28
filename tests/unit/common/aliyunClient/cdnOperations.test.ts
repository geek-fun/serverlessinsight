import { createCdnOperations } from '../../../../src/common/aliyunClient/cdnOperations';
import CdnClient from '@alicloud/cdn20180510';

const mockAddCdnDomain = jest.fn();
const mockDescribeCdnDomainDetail = jest.fn();
const mockDeleteCdnDomain = jest.fn();
const mockModifyCdnDomain = jest.fn();
const mockSetCdnDomainSSLCertificate = jest.fn();

const mockCdnClient = {
  addCdnDomain: mockAddCdnDomain,
  describeCdnDomainDetail: mockDescribeCdnDomainDetail,
  deleteCdnDomain: mockDeleteCdnDomain,
  modifyCdnDomain: mockModifyCdnDomain,
  setCdnDomainSSLCertificate: mockSetCdnDomainSSLCertificate,
} as unknown as InstanceType<typeof CdnClient>;

describe('CdnOperations', () => {
  let operations: ReturnType<typeof createCdnOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createCdnOperations(mockCdnClient);
  });

  describe('addCdnDomain', () => {
    it('should add CDN domain with OSS origin', async () => {
      mockAddCdnDomain.mockResolvedValue({});

      await operations.addCdnDomain({
        domainName: 'cdn.example.com',
        cdnType: 'web',
        sources: [{ type: 'oss', content: 'my-bucket.oss-cn-hangzhou.aliyuncs.com' }],
        scope: 'global',
      });

      expect(mockAddCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'cdn.example.com',
          cdnType: 'web',
          scope: 'global',
        }),
      );
    });

    it('should add CDN domain with download type', async () => {
      mockAddCdnDomain.mockResolvedValue({});

      await operations.addCdnDomain({
        domainName: 'downloads.example.com',
        cdnType: 'download',
        sources: [{ type: 'oss', content: 'releases.oss-accelerate.aliyuncs.com', port: 443 }],
      });

      expect(mockAddCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'downloads.example.com', cdnType: 'download' }),
      );
    });
  });

  describe('describeCdnDomainDetail', () => {
    it('should return domain info when domain exists', async () => {
      mockDescribeCdnDomainDetail.mockResolvedValue({
        body: {
          getDomainDetailModel: {
            domainName: 'cdn.example.com',
            cname: 'cdn.example.com.cdn.aliyuncs.com',
            domainStatus: 'online',
            scope: 'global',
            cdnType: 'web',
          },
        },
      });

      const result = await operations.describeCdnDomainDetail('cdn.example.com');

      expect(result).toEqual({
        domainName: 'cdn.example.com',
        cname: 'cdn.example.com.cdn.aliyuncs.com',
        status: 'online',
        scope: 'global',
        cdnType: 'web',
      });
    });

    it('should return null when domain not found', async () => {
      mockDescribeCdnDomainDetail.mockRejectedValue(new Error('Domain not found'));

      const result = await operations.describeCdnDomainDetail('nonexistent.example.com');

      expect(result).toBeNull();
    });
  });

  describe('deleteCdnDomain', () => {
    it('should delete CDN domain', async () => {
      mockDeleteCdnDomain.mockResolvedValue({});

      await operations.deleteCdnDomain('cdn.example.com');

      expect(mockDeleteCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'cdn.example.com' }),
      );
    });
  });

  describe('setDomainServerCertificate', () => {
    it('should deploy SSL certificate to CDN domain', async () => {
      mockSetCdnDomainSSLCertificate.mockResolvedValue({});

      await operations.setDomainServerCertificate('cdn.example.com', {
        serverCertificate: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
        privateKey: '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----',
        serverCertificateStatus: 'on',
      });

      expect(mockSetCdnDomainSSLCertificate).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'cdn.example.com',
          SSLProtocol: 'on',
        }),
      );
    });
  });

  describe('modifyCdnDomain', () => {
    it('should modify CDN domain sources', async () => {
      mockModifyCdnDomain.mockResolvedValue({});

      await operations.modifyCdnDomain({
        domainName: 'cdn.example.com',
        sources: [{ type: 'oss', content: 'new-bucket.oss-cn-hangzhou.aliyuncs.com' }],
      });

      expect(mockModifyCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'cdn.example.com' }),
      );
    });
  });

  describe('edge cases', () => {
    it('should handle delete API error gracefully', async () => {
      mockDeleteCdnDomain.mockRejectedValue(new Error('Not found'));
      await expect(operations.deleteCdnDomain('unknown.example.com')).rejects.toThrow('Not found');
    });

    it('should call addCdnDomain with correct params for download type', async () => {
      mockAddCdnDomain.mockResolvedValue({});
      await operations.addCdnDomain({
        domainName: 'dl.example.com',
        cdnType: 'download',
        sources: [{ type: 'oss', content: 'bucket.oss-cn-hangzhou.aliyuncs.com', port: 443 }],
        scope: 'overseas',
      });
      expect(mockAddCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'dl.example.com',
          cdnType: 'download',
          scope: 'overseas',
        }),
      );
    });

    it('should call modifyCdnDomain with sources', async () => {
      mockModifyCdnDomain.mockResolvedValue({});
      await operations.modifyCdnDomain({
        domainName: 'cdn.example.com',
        sources: [{ type: 'oss', content: 'new-bucket.oss-cn-hangzhou.aliyuncs.com' }],
      });
      expect(mockModifyCdnDomain).toHaveBeenCalled();
    });
  });
  describe('error handling', () => {
    it('should return null when describeCdnDomainDetail throws', async () => {
      mockDescribeCdnDomainDetail.mockRejectedValue(new Error('API error'));
      const result = await operations.describeCdnDomainDetail('unknown.example.com');
      expect(result).toBeNull();
    });

    it('should return null when describeCdnDomainDetail returns no detail', async () => {
      mockDescribeCdnDomainDetail.mockResolvedValue({ body: {} });
      const result = await operations.describeCdnDomainDetail('empty.example.com');
      expect(result).toBeNull();
    });
  });
  describe('extra coverage', () => {
    it('modify with scope', async () => {
      mockModifyCdnDomain.mockResolvedValue({});
      await operations.modifyCdnDomain({ domainName: 'x.c', scope: 'domestic' });
      expect(mockModifyCdnDomain).toHaveBeenCalled();
    });
    it('set cert with all params', async () => {
      mockSetCdnDomainSSLCertificate.mockResolvedValue({});
      await operations.setDomainServerCertificate('x.c', {
        certName: 'my-cert',
        certType: 'cas',
        certId: 12345,
        serverCertificate: 'cert-body',
        privateKey: 'key',
        serverCertificateStatus: 'on',
        certRegion: 'cn-hangzhou',
      });
      expect(mockSetCdnDomainSSLCertificate).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'x.c', certType: 'cas', certName: 'my-cert' }),
      );
    });
  });
});

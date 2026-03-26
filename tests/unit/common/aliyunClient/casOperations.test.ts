import { createCasOperations } from '../../../../src/common/aliyunClient/casOperations';

const mockGetUserCertificateDetail = jest.fn();
const mockUploadUserCertificate = jest.fn();
const mockDeleteUserCertificate = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockCasClient: any = {
  getUserCertificateDetail: mockGetUserCertificateDetail,
  uploadUserCertificate: mockUploadUserCertificate,
  deleteUserCertificate: mockDeleteUserCertificate,
};

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

describe('casOperations', () => {
  let operations: ReturnType<typeof createCasOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createCasOperations(mockCasClient);
  });

  describe('getCertificate', () => {
    it('should throw when given a subscription instance ID with cas_ prefix', async () => {
      await expect(operations.getCertificate('cas_123456')).rejects.toThrow(
        'CERT_USING_SUBSCRIPTION_ID',
      );
    });

    it('should throw when given a subscription instance ID with cas- prefix', async () => {
      await expect(operations.getCertificate('cas-dv-abc123')).rejects.toThrow(
        'CERT_USING_SUBSCRIPTION_ID',
      );
    });

    it('should throw when given a non-numeric, non-subscription certificate ID', async () => {
      await expect(operations.getCertificate('not-a-number')).rejects.toThrow(
        'CERT_INVALID_CONFIGURATION',
      );
    });

    it('should accept a numeric certificate ID (YAML parses unquoted integers as numbers)', async () => {
      mockGetUserCertificateDetail.mockResolvedValue({
        body: { id: 24019487, name: 'my-cert', cert: 'CERT', key: 'KEY' },
      });

      const result = await operations.getCertificate(24019487 as unknown as string);

      expect(result).not.toBeNull();
      expect(mockGetUserCertificateDetail).toHaveBeenCalledWith(
        expect.objectContaining({ certId: 24019487 }),
      );
    });

    it('should return certificate info for a valid numeric certificate ID', async () => {
      mockGetUserCertificateDetail.mockResolvedValue({
        body: {
          id: 24019487,
          name: 'my-cert',
          cert: 'CERT-BODY',
          key: 'CERT-KEY',
          endDate: '2026-01-01',
          expired: false,
        },
      });

      const result = await operations.getCertificate('24019487');

      expect(mockGetUserCertificateDetail).toHaveBeenCalledWith(
        expect.objectContaining({ certId: 24019487 }),
      );
      expect(result).toEqual({
        certificateId: 24019487,
        name: 'my-cert',
        cert: 'CERT-BODY',
        key: 'CERT-KEY',
        endDate: '2026-01-01',
        expired: false,
      });
    });

    it('should return null when certificate does not exist (CertNotExist)', async () => {
      const error = Object.assign(new Error('Not found'), { code: 'CertNotExist' });
      mockGetUserCertificateDetail.mockRejectedValue(error);

      const result = await operations.getCertificate('99999999');

      expect(result).toBeNull();
    });

    it('should return null when certificate does not exist (NotFound)', async () => {
      const error = Object.assign(new Error('Not found'), { code: 'NotFound' });
      mockGetUserCertificateDetail.mockRejectedValue(error);

      const result = await operations.getCertificate('88888888');

      expect(result).toBeNull();
    });

    it('should rethrow unexpected errors from the SDK', async () => {
      mockGetUserCertificateDetail.mockRejectedValue(new Error('Network error'));

      await expect(operations.getCertificate('12345678')).rejects.toThrow('Network error');
    });

    it('should return null when response body is empty', async () => {
      mockGetUserCertificateDetail.mockResolvedValue({ body: null });

      const result = await operations.getCertificate('12345678');

      expect(result).toBeNull();
    });
  });

  describe('uploadCertificate', () => {
    it('should upload certificate with chain', async () => {
      mockUploadUserCertificate.mockResolvedValue({
        body: { certId: 12345678 },
      });

      const result = await operations.uploadCertificate(
        'my-cert',
        'CERT-BODY',
        'CERT-KEY',
        'CHAIN-BODY',
      );

      expect(mockUploadUserCertificate).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'my-cert',
          cert: 'CERT-BODY\nCHAIN-BODY',
          key: 'CERT-KEY',
        }),
      );
      expect(result).toEqual({
        certificateId: 12345678,
        name: 'my-cert',
      });
    });

    it('should upload certificate without chain', async () => {
      mockUploadUserCertificate.mockResolvedValue({
        body: { certId: 87654321 },
      });

      const result = await operations.uploadCertificate('test-cert', 'CERT', 'KEY');

      expect(mockUploadUserCertificate).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'test-cert',
          cert: 'CERT',
          key: 'KEY',
        }),
      );
      expect(result).toEqual({
        certificateId: 87654321,
        name: 'test-cert',
      });
    });

    it('should throw when certId is null in response', async () => {
      mockUploadUserCertificate.mockResolvedValue({
        body: { certId: null },
      });

      await expect(operations.uploadCertificate('cert-no-id', 'CERT', 'KEY')).rejects.toThrow(
        'CAS_UPLOAD_NO_CERT_ID',
      );
    });

    it('should throw when certId is undefined in response', async () => {
      mockUploadUserCertificate.mockResolvedValue({
        body: {},
      });

      await expect(operations.uploadCertificate('cert-no-id', 'CERT', 'KEY')).rejects.toThrow(
        'CAS_UPLOAD_NO_CERT_ID',
      );
    });

    it('should throw when body is null', async () => {
      mockUploadUserCertificate.mockResolvedValue({
        body: null,
      });

      await expect(operations.uploadCertificate('cert-no-body', 'CERT', 'KEY')).rejects.toThrow(
        'CAS_UPLOAD_NO_CERT_ID',
      );
    });
  });

  describe('deleteCertificate', () => {
    it('should delete certificate successfully', async () => {
      mockDeleteUserCertificate.mockResolvedValue({});

      await operations.deleteCertificate(12345678);

      expect(mockDeleteUserCertificate).toHaveBeenCalledWith(
        expect.objectContaining({
          certId: 12345678,
        }),
      );
    });

    it('should handle CertNotExist gracefully with warning', async () => {
      const error = Object.assign(new Error('Not found'), { code: 'CertNotExist' });
      mockDeleteUserCertificate.mockRejectedValue(error);

      await expect(operations.deleteCertificate(99999999)).resolves.toBeUndefined();
    });

    it('should handle NotFound gracefully with warning', async () => {
      const error = Object.assign(new Error('Not found'), { code: 'NotFound' });
      mockDeleteUserCertificate.mockRejectedValue(error);

      await expect(operations.deleteCertificate(88888888)).resolves.toBeUndefined();
    });

    it('should rethrow unexpected errors', async () => {
      mockDeleteUserCertificate.mockRejectedValue(new Error('Network timeout'));

      await expect(operations.deleteCertificate(12345678)).rejects.toThrow('Network timeout');
    });
  });
});

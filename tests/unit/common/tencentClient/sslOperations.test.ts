import { createSslOperations } from '../../../../src/common/tencentClient/sslOperations';

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
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

const mockSslClient = {
  UploadCertificate: jest.fn(),
  DescribeCertificateDetail: jest.fn(),
  DeleteCertificate: jest.fn(),
  DeployCertificateInstance: jest.fn(),
};

describe('sslOperations', () => {
  let operations: ReturnType<typeof createSslOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operations = createSslOperations(mockSslClient as any);
  });

  describe('uploadCertificate', () => {
    it('should upload certificate and return info', async () => {
      mockSslClient.UploadCertificate.mockResolvedValue({
        CertificateId: 'cert-123',
      });

      const result = await operations.uploadCertificate('my-cert', 'PEM-BODY', 'PEM-KEY');

      expect(mockSslClient.UploadCertificate).toHaveBeenCalledWith({
        CertificatePublicKey: 'PEM-BODY',
        CertificatePrivateKey: 'PEM-KEY',
        CertificateType: 'SVR',
        Alias: 'my-cert',
        Repeatable: false,
      });
      expect(result).toEqual({ certificateId: 'cert-123', alias: 'my-cert' });
    });

    it('should concatenate chain with cert body when chain is provided', async () => {
      mockSslClient.UploadCertificate.mockResolvedValue({
        CertificateId: 'cert-456',
      });

      await operations.uploadCertificate('my-cert', 'PEM-BODY', 'PEM-KEY', 'CHAIN');

      expect(mockSslClient.UploadCertificate).toHaveBeenCalledWith(
        expect.objectContaining({
          CertificatePublicKey: 'PEM-BODY\nCHAIN',
        }),
      );
    });

    it('should use RepeatCertId when CertificateId is not returned', async () => {
      mockSslClient.UploadCertificate.mockResolvedValue({
        RepeatCertId: 'repeat-cert-789',
      });

      const result = await operations.uploadCertificate('my-cert', 'PEM-BODY', 'PEM-KEY');

      expect(result.certificateId).toBe('repeat-cert-789');
    });

    it('should prioritize RepeatCertId over CertificateId when both are returned', async () => {
      mockSslClient.UploadCertificate.mockResolvedValue({
        CertificateId: 'cert-new-100',
        RepeatCertId: 'cert-existing-200',
      });

      const result = await operations.uploadCertificate('my-cert', 'PEM-BODY', 'PEM-KEY');

      expect(result.certificateId).toBe('cert-existing-200');
    });

    it('should throw when no certificate ID is returned', async () => {
      mockSslClient.UploadCertificate.mockResolvedValue({});

      await expect(operations.uploadCertificate('my-cert', 'PEM-BODY', 'PEM-KEY')).rejects.toThrow(
        'SSL_UPLOAD_NO_CERT_ID',
      );
    });
  });

  describe('getCertificate', () => {
    it('should return certificate info on success', async () => {
      mockSslClient.DescribeCertificateDetail.mockResolvedValue({
        CertificateId: 'cert-123',
        Alias: 'my-cert',
        Domain: 'example.com',
        Status: 1,
        CertBeginTime: '2024-01-01',
        CertEndTime: '2025-01-01',
      });

      const result = await operations.getCertificate('cert-123');

      expect(mockSslClient.DescribeCertificateDetail).toHaveBeenCalledWith({
        CertificateId: 'cert-123',
      });
      expect(result).toEqual({
        certificateId: 'cert-123',
        alias: 'my-cert',
        domain: 'example.com',
        status: 1,
        certBeginTime: '2024-01-01',
        certEndTime: '2025-01-01',
      });
    });

    it('should return null when certificate is not found (CertificateNotFound)', async () => {
      const error = Object.assign(new Error('not found'), {
        code: 'FailedOperation.CertificateNotFound',
      });
      mockSslClient.DescribeCertificateDetail.mockRejectedValue(error);

      const result = await operations.getCertificate('cert-nonexistent');

      expect(result).toBeNull();
    });

    it('should return null when certificate is not found (ResourceNotFound)', async () => {
      const error = Object.assign(new Error('not found'), {
        code: 'ResourceNotFound',
      });
      mockSslClient.DescribeCertificateDetail.mockRejectedValue(error);

      const result = await operations.getCertificate('cert-nonexistent');

      expect(result).toBeNull();
    });

    it('should rethrow unexpected errors', async () => {
      const error = new Error('network timeout');
      mockSslClient.DescribeCertificateDetail.mockRejectedValue(error);

      await expect(operations.getCertificate('cert-123')).rejects.toThrow('network timeout');
    });

    it('should handle missing optional fields', async () => {
      mockSslClient.DescribeCertificateDetail.mockResolvedValue({
        CertificateId: 'cert-123',
      });

      const result = await operations.getCertificate('cert-123');

      expect(result).toEqual({
        certificateId: 'cert-123',
        alias: undefined,
        domain: undefined,
        status: undefined,
        certBeginTime: undefined,
        certEndTime: undefined,
      });
    });
  });

  describe('deleteCertificate', () => {
    it('should delete certificate successfully', async () => {
      mockSslClient.DeleteCertificate.mockResolvedValue({
        DeleteResult: true,
      });

      await operations.deleteCertificate('cert-123');

      expect(mockSslClient.DeleteCertificate).toHaveBeenCalledWith({
        CertificateId: 'cert-123',
      });
    });

    it('should throw when DeleteResult is false', async () => {
      mockSslClient.DeleteCertificate.mockResolvedValue({
        DeleteResult: false,
      });

      await expect(operations.deleteCertificate('cert-123')).rejects.toThrow('SSL_DELETE_FAILED');
    });

    it('should silently succeed when certificate is not found (CertificateNotFound)', async () => {
      const error = Object.assign(new Error('not found'), {
        code: 'FailedOperation.CertificateNotFound',
      });
      mockSslClient.DeleteCertificate.mockRejectedValue(error);

      await expect(operations.deleteCertificate('cert-nonexistent')).resolves.toBeUndefined();
    });

    it('should silently succeed when certificate is not found (ResourceNotFound)', async () => {
      const error = Object.assign(new Error('not found'), {
        code: 'ResourceNotFound',
      });
      mockSslClient.DeleteCertificate.mockRejectedValue(error);

      await expect(operations.deleteCertificate('cert-nonexistent')).resolves.toBeUndefined();
    });

    it('should rethrow unexpected errors', async () => {
      const error = new Error('permission denied');
      mockSslClient.DeleteCertificate.mockRejectedValue(error);

      await expect(operations.deleteCertificate('cert-123')).rejects.toThrow('permission denied');
    });
  });

  describe('deployCertificateInstance', () => {
    it('should deploy certificate to instance and return result', async () => {
      mockSslClient.DeployCertificateInstance.mockResolvedValue({
        DeployRecordId: 12345,
        DeployStatus: 1,
      });

      const result = await operations.deployCertificateInstance('cert-123', 'cos', [
        'ap-guangzhou|my-bucket|cdn.example.com',
      ]);

      expect(mockSslClient.DeployCertificateInstance).toHaveBeenCalledWith({
        CertificateId: 'cert-123',
        ResourceType: 'cos',
        InstanceIdList: ['ap-guangzhou|my-bucket|cdn.example.com'],
      });
      expect(result).toEqual({
        deployRecordId: 12345,
        deployStatus: 1,
      });
    });

    it('should handle missing optional response fields', async () => {
      mockSslClient.DeployCertificateInstance.mockResolvedValue({});

      const result = await operations.deployCertificateInstance('cert-123', 'cos', [
        'ap-guangzhou|my-bucket|cdn.example.com',
      ]);

      expect(result).toEqual({
        deployRecordId: undefined,
        deployStatus: undefined,
      });
    });

    it('should log existing task message when deployStatus is 0', async () => {
      const { logger: mockedLogger } = jest.requireMock('../../../../src/common/logger') as {
        logger: { info: jest.Mock; warn: jest.Mock };
      };

      mockSslClient.DeployCertificateInstance.mockResolvedValue({
        DeployRecordId: 555,
        DeployStatus: 0,
      });

      const result = await operations.deployCertificateInstance('cert-123', 'cos', [
        'ap-guangzhou|my-bucket|cdn.example.com',
      ]);

      expect(result).toEqual({
        deployRecordId: 555,
        deployStatus: 0,
      });
      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('SSL_CERT_DEPLOY_EXISTING_TASK'),
      );
    });

    it('should wrap SDK errors with SSL_CERT_DEPLOY_FAILED', async () => {
      mockSslClient.DeployCertificateInstance.mockRejectedValue(
        new Error('AuthFailure.SecretIdNotFound'),
      );

      await expect(
        operations.deployCertificateInstance('cert-123', 'cos', [
          'ap-guangzhou|my-bucket|cdn.example.com',
        ]),
      ).rejects.toThrow('SSL_CERT_DEPLOY_FAILED');
    });

    it('should wrap non-Error SDK failures with SSL_CERT_DEPLOY_FAILED', async () => {
      mockSslClient.DeployCertificateInstance.mockRejectedValue('string-error');

      await expect(
        operations.deployCertificateInstance('cert-123', 'cos', [
          'ap-guangzhou|my-bucket|cdn.example.com',
        ]),
      ).rejects.toThrow('SSL_CERT_DEPLOY_FAILED');
    });

    it('should support multiple instance IDs', async () => {
      mockSslClient.DeployCertificateInstance.mockResolvedValue({
        DeployRecordId: 999,
      });

      await operations.deployCertificateInstance('cert-123', 'cos', [
        'ap-guangzhou|bucket-1|a.example.com',
        'ap-guangzhou|bucket-2|b.example.com',
      ]);

      expect(mockSslClient.DeployCertificateInstance).toHaveBeenCalledWith(
        expect.objectContaining({
          InstanceIdList: [
            'ap-guangzhou|bucket-1|a.example.com',
            'ap-guangzhou|bucket-2|b.example.com',
          ],
        }),
      );
    });
  });
});

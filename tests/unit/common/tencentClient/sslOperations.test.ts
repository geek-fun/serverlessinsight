import { createSslOperations } from '../../../../src/common/tencentClient/sslOperations';

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
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
  DescribeHostDeployRecordDetail: jest.fn(),
};

describe('sslOperations', () => {
  let operations: ReturnType<typeof createSslOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operations = createSslOperations(mockSslClient as any);
    // Default: the deployment record reports immediate full success.
    mockSslClient.DescribeHostDeployRecordDetail.mockResolvedValue({
      TotalCount: 1,
      SuccessTotalCount: 1,
      FailedTotalCount: 0,
      DeployRecordDetailList: [],
    });
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

    it('should poll the deploy record until success before returning', async () => {
      mockSslClient.DeployCertificateInstance.mockResolvedValue({
        DeployRecordId: 777,
        DeployStatus: 1,
      });
      mockSslClient.DescribeHostDeployRecordDetail.mockResolvedValueOnce({
        TotalCount: 1,
        SuccessTotalCount: 0,
        FailedTotalCount: 0,
      }).mockResolvedValueOnce({ TotalCount: 1, SuccessTotalCount: 1, FailedTotalCount: 0 });

      const pollOperations = createSslOperations(mockSslClient as unknown as never, {
        pollIntervalMs: 1,
        pollTimeoutMs: 5000,
      });

      const result = await pollOperations.deployCertificateInstance('cert-123', 'cdn', [
        'static.example.com',
      ]);

      expect(mockSslClient.DescribeHostDeployRecordDetail).toHaveBeenCalledWith({
        DeployRecordId: '777',
        Limit: 200,
      });
      expect(mockSslClient.DescribeHostDeployRecordDetail).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ deployRecordId: 777, deployStatus: 1 });
    });

    it('should keep polling when a status check fails transiently', async () => {
      mockSslClient.DeployCertificateInstance.mockResolvedValue({
        DeployRecordId: 778,
        DeployStatus: 1,
      });
      mockSslClient.DescribeHostDeployRecordDetail.mockRejectedValueOnce(
        new Error('rate limited'),
      ).mockResolvedValueOnce({ TotalCount: 1, SuccessTotalCount: 1, FailedTotalCount: 0 });

      const pollOperations = createSslOperations(mockSslClient as unknown as never, {
        pollIntervalMs: 1,
        pollTimeoutMs: 5000,
      });

      await expect(
        pollOperations.deployCertificateInstance('cert-123', 'cdn', ['static.example.com']),
      ).resolves.toBeDefined();
      expect(mockSslClient.DescribeHostDeployRecordDetail).toHaveBeenCalledTimes(2);
    });

    it('should throw SSL_CERT_DEPLOY_FAILED_RESULT when the deployment record reports failures', async () => {
      mockSslClient.DeployCertificateInstance.mockResolvedValue({
        DeployRecordId: 779,
        DeployStatus: 1,
      });
      mockSslClient.DescribeHostDeployRecordDetail.mockResolvedValue({
        TotalCount: 1,
        SuccessTotalCount: 0,
        FailedTotalCount: 1,
        DeployRecordDetailList: [{ Status: 2, ErrorMsg: 'domain not found' }],
      });

      const pollOperations = createSslOperations(mockSslClient as unknown as never, {
        pollIntervalMs: 1,
        pollTimeoutMs: 5000,
      });

      await expect(
        pollOperations.deployCertificateInstance('cert-123', 'cdn', ['static.example.com']),
      ).rejects.toThrow('SSL_CERT_DEPLOY_FAILED_RESULT');
    });

    it('should throw SSL_CERT_DEPLOY_POLL_TIMEOUT when the task does not finish in time', async () => {
      mockSslClient.DeployCertificateInstance.mockResolvedValue({
        DeployRecordId: 780,
        DeployStatus: 1,
      });
      mockSslClient.DescribeHostDeployRecordDetail.mockResolvedValue({
        TotalCount: 1,
        SuccessTotalCount: 0,
        FailedTotalCount: 0,
      });

      const pollOperations = createSslOperations(mockSslClient as unknown as never, {
        pollIntervalMs: 1,
        pollTimeoutMs: 20,
      });

      await expect(
        pollOperations.deployCertificateInstance('cert-123', 'cdn', ['static.example.com']),
      ).rejects.toThrow('SSL_CERT_DEPLOY_POLL_TIMEOUT');
    });

    it('should skip polling when the response carries no deploy record id', async () => {
      const { logger: mockedLogger } = jest.requireMock('../../../../src/common/logger') as {
        logger: { info: jest.Mock; warn: jest.Mock; debug: jest.Mock };
      };

      mockSslClient.DeployCertificateInstance.mockResolvedValue({});

      const result = await operations.deployCertificateInstance('cert-123', 'cos', [
        'ap-guangzhou|my-bucket|cdn.example.com',
      ]);

      expect(mockSslClient.DescribeHostDeployRecordDetail).not.toHaveBeenCalled();
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('SSL_DEPLOY_RECORD_ID_MISSING'),
      );
      expect(result).toEqual({ deployRecordId: undefined, deployStatus: undefined });
    });
  });
});

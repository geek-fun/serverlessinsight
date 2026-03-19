import * as ssl from 'tencentcloud-sdk-nodejs-ssl';
import { lang } from '../../lang';
import { logger } from '../logger';
import { SslCertificateInfo, SslDeployResult } from './types';

type SslSdkClient = InstanceType<typeof ssl.ssl.v20191205.Client>;

export const createSslOperations = (sslClient: SslSdkClient) => ({
  uploadCertificate: async (
    alias: string,
    cert: string,
    key: string,
    chain?: string,
  ): Promise<SslCertificateInfo> => {
    logger.info(lang.__('SSL_UPLOADING_CERT', { alias }));

    const response = await sslClient.UploadCertificate({
      CertificatePublicKey: chain ? `${cert}\n${chain}` : cert,
      CertificatePrivateKey: key,
      CertificateType: 'SVR',
      Alias: alias,
      Repeatable: false,
    });

    const certificateId = response.RepeatCertId ?? response.CertificateId;
    if (!certificateId) {
      throw new Error(lang.__('SSL_UPLOAD_NO_CERT_ID', { alias }));
    }

    logger.info(lang.__('SSL_CERT_UPLOADED', { alias, certificateId }));

    return { certificateId, alias };
  },

  getCertificate: async (certificateId: string): Promise<SslCertificateInfo | null> => {
    try {
      const response = await sslClient.DescribeCertificateDetail({ CertificateId: certificateId });

      return {
        certificateId: response.CertificateId ?? certificateId,
        alias: response.Alias ?? undefined,
        domain: response.Domain ?? undefined,
        status: response.Status ?? undefined,
        certBeginTime: response.CertBeginTime ?? undefined,
        certEndTime: response.CertEndTime ?? undefined,
      };
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error.code === 'FailedOperation.CertificateNotFound' || error.code === 'ResourceNotFound')
      ) {
        return null;
      }
      throw error;
    }
  },

  deleteCertificate: async (certificateId: string): Promise<void> => {
    logger.info(lang.__('SSL_DELETING_CERT', { certificateId }));

    try {
      const response = await sslClient.DeleteCertificate({ CertificateId: certificateId });

      if (response.DeleteResult === false) {
        throw new Error(lang.__('SSL_DELETE_FAILED', { certificateId }));
      }

      logger.info(lang.__('SSL_CERT_DELETED', { certificateId }));
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error.code === 'FailedOperation.CertificateNotFound' || error.code === 'ResourceNotFound')
      ) {
        logger.warn(lang.__('SSL_CERT_NOT_FOUND', { certificateId }));
        return;
      }
      throw error;
    }
  },

  deployCertificateInstance: async (
    certificateId: string,
    resourceType: string,
    instanceIdList: string[],
  ): Promise<SslDeployResult> => {
    logger.info(
      lang.__('SSL_DEPLOYING_CERT', {
        certificateId,
        resourceType,
        instances: instanceIdList.join(', '),
      }),
    );

    try {
      const response = await sslClient.DeployCertificateInstance({
        CertificateId: certificateId,
        ResourceType: resourceType,
        InstanceIdList: instanceIdList,
      });

      const deployStatus = response.DeployStatus ?? undefined;

      if (deployStatus === 0) {
        logger.info(
          lang.__('SSL_CERT_DEPLOY_EXISTING_TASK', {
            certificateId,
            resourceType,
          }),
        );
      } else {
        logger.info(
          lang.__('SSL_CERT_DEPLOY_SUBMITTED', {
            certificateId,
            resourceType,
            deployRecordId: String(response.DeployRecordId ?? ''),
          }),
        );
      }

      return {
        deployRecordId: response.DeployRecordId ?? undefined,
        deployStatus,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      // eslint-disable-next-line preserve-caught-error
      throw new Error(
        lang.__('SSL_CERT_DEPLOY_FAILED', {
          resourceType,
          certificateId,
          error: message,
        }),
      );
    }
  },
});

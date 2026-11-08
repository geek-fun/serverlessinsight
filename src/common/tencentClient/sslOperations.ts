import * as ssl from 'tencentcloud-sdk-nodejs-ssl';
import { lang } from '../../lang';
import { logger } from '../logger';
import { SslCertificateInfo, SslDeployResult } from './types';

type SslSdkClient = InstanceType<typeof ssl.ssl.v20191205.Client>;

const SSL_DEPLOY_POLL_INTERVAL_MS = 2000;
const SSL_DEPLOY_POLL_TIMEOUT_MS = 120000;

type SslPollOptions = {
  pollIntervalMs?: number;
  pollTimeoutMs?: number;
};

const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const createSslOperations = (sslClient: SslSdkClient, options?: SslPollOptions) => {
  const pollIntervalMs = options?.pollIntervalMs ?? SSL_DEPLOY_POLL_INTERVAL_MS;
  const pollTimeoutMs = options?.pollTimeoutMs ?? SSL_DEPLOY_POLL_TIMEOUT_MS;

  // DeployCertificateInstance only creates the deployment task; completion is
  // tracked through DescribeHostDeployRecordDetail using the aggregate counters
  // (success/failed/running/pending totals) so no per-resource status enum has
  // to be interpreted here. Transient describe failures keep polling until the
  // deadline instead of failing the deploy outright.
  const pollDeployRecord = async (deployRecordId: string, resourceType: string): Promise<void> => {
    const deadline = Date.now() + pollTimeoutMs;
    let first = true;
    while (Date.now() < deadline) {
      if (!first) await delay(pollIntervalMs);
      first = false;
      let detail;
      try {
        detail = await sslClient.DescribeHostDeployRecordDetail({
          DeployRecordId: deployRecordId,
          Limit: 200,
        });
      } catch (error: unknown) {
        logger.debug(lang.__('SSL_DEPLOY_POLL_ERROR', { error: String(error) }));
        continue;
      }
      const totalCount = detail?.TotalCount ?? 0;
      const failedCount = detail?.FailedTotalCount ?? 0;
      const successCount = detail?.SuccessTotalCount ?? 0;
      if (failedCount > 0) {
        const errorMessages = (detail?.DeployRecordDetailList ?? [])
          .map((record) => record.ErrorMsg)
          .filter((message): message is string => typeof message === 'string' && message !== '');
        throw new Error(
          lang.__('SSL_CERT_DEPLOY_FAILED_RESULT', {
            deployRecordId,
            resourceType,
            error: errorMessages.join('; ') || 'unknown error',
          }),
        );
      }
      if (totalCount > 0 && successCount >= totalCount) {
        logger.info(lang.__('SSL_CERT_DEPLOY_COMPLETED', { deployRecordId, resourceType }));
        return;
      }
    }
    throw new Error(
      lang.__('SSL_CERT_DEPLOY_POLL_TIMEOUT', {
        deployRecordId,
        resourceType,
        timeoutSeconds: String(Math.round(pollTimeoutMs / 1000)),
      }),
    );
  };

  return {
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
        const response = await sslClient.DescribeCertificateDetail({
          CertificateId: certificateId,
        });

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
          (error.code === 'FailedOperation.CertificateNotFound' ||
            error.code === 'ResourceNotFound')
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
          (error.code === 'FailedOperation.CertificateNotFound' ||
            error.code === 'ResourceNotFound')
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

      let response;
      try {
        response = await sslClient.DeployCertificateInstance({
          CertificateId: certificateId,
          ResourceType: resourceType,
          InstanceIdList: instanceIdList,
        });
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

      const deployStatus = response.DeployStatus ?? undefined;
      const deployRecordId = response.DeployRecordId ?? undefined;

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
            deployRecordId: String(deployRecordId ?? ''),
          }),
        );
      }

      // The task runs asynchronously — wait for it so callers only record state
      // once the certificate is actually live on the instances.
      if (deployRecordId != null) {
        await pollDeployRecord(String(deployRecordId), resourceType);
      } else {
        logger.warn(lang.__('SSL_DEPLOY_RECORD_ID_MISSING', { resourceType }));
      }

      return {
        deployRecordId,
        deployStatus,
      };
    },
  };
};

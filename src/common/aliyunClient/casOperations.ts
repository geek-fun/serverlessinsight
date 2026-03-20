import CasClient from '@alicloud/cas20200407';
import * as cas from '@alicloud/cas20200407';
import { lang } from '../../lang';
import { logger } from '../logger';
import { CasCertificateInfo } from './types';

type CasSdkClient = CasClient;

export const createCasOperations = (casClient: CasSdkClient) => {
  return {
    uploadCertificate: async (
      name: string,
      cert: string,
      key: string,
      chain?: string,
    ): Promise<CasCertificateInfo> => {
      logger.info(lang.__('CAS_UPLOADING_CERT', { name }));

      const request = new cas.UploadUserCertificateRequest({
        name,
        cert: chain ? `${cert}\n${chain}` : cert,
        key,
      });

      const response = await casClient.uploadUserCertificate(request);

      const certId = response.body?.certId;
      if (certId == null) {
        throw new Error(lang.__('CAS_UPLOAD_NO_CERT_ID', { name }));
      }

      logger.info(lang.__('CAS_CERT_UPLOADED', { name, certId: String(certId) }));

      return {
        certificateId: certId,
        name,
      };
    },

    getCertificate: async (certificateId: string | number): Promise<CasCertificateInfo | null> => {
      const certIdStr = String(certificateId);
      if (certIdStr.startsWith('cas_') || certIdStr.startsWith('cas-')) {
        throw new Error(lang.__('CERT_USING_SUBSCRIPTION_ID', { provided: certIdStr }));
      }

      const numericId = Number(certIdStr);
      if (Number.isNaN(numericId)) {
        throw new Error(lang.__('CERT_INVALID_CONFIGURATION', { name: certIdStr }));
      }

      try {
        const request = new cas.GetUserCertificateDetailRequest({
          certId: numericId,
          certFilter: false,
        });

        const response = await casClient.getUserCertificateDetail(request);
        const body = response.body;

        if (!body) {
          return null;
        }

        return {
          certificateId: body.id ?? numericId,
          name: body.name ?? undefined,
          cert: body.cert ?? undefined,
          key: body.key ?? undefined,
          endDate: body.endDate ?? undefined,
          expired: body.expired ?? undefined,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'CertNotExist' || error.code === 'NotFound')
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteCertificate: async (certificateId: number): Promise<void> => {
      logger.info(lang.__('CAS_DELETING_CERT', { certId: String(certificateId) }));

      const request = new cas.DeleteUserCertificateRequest({
        certId: certificateId,
      });

      try {
        await casClient.deleteUserCertificate(request);
        logger.info(lang.__('CAS_CERT_DELETED', { certId: String(certificateId) }));
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'CertNotExist' || error.code === 'NotFound')
        ) {
          logger.warn(lang.__('CAS_CERT_NOT_FOUND', { certId: String(certificateId) }));
          return;
        }
        throw error;
      }
    },
  };
};

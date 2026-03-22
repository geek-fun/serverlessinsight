import OSS from 'ali-oss';
import fs from 'node:fs';
import path from 'node:path';
import {
  BucketACL,
  CommonBucketInfo,
  BucketWebsiteConfig,
  BucketLoggingConfig,
  BucketCorsRule,
  BucketLifecycleRule,
  BucketOwner,
} from '../../stack/bucketTypes';
import { DnsOperations } from './dnsOperations';
import { logger } from '../logger';
import { lang } from '../../lang';
import { extractMainDomain, extractHostRecord, normalizeDomain } from '../domainUtils';
import { sleep } from '../retryUtils';
import {
  DOMAIN_BIND_MAX_RETRIES,
  DOMAIN_BIND_RETRY_DELAY_MS,
  DNS_PROPAGATION_MAX_ATTEMPTS,
  DNS_PROPAGATION_DELAY_MS,
} from '../constants';

export type OssBucketConfig = {
  bucketName: string;
  acl?: BucketACL;
  websiteConfig?: BucketWebsiteConfig;
  storageClass?: string;
  domain?: string;
};

const ossRequest = (ossClient: OSS, params: unknown): Promise<unknown> => {
  return (ossClient as unknown as { request: (p: unknown) => Promise<unknown> }).request(params);
};

export type OssBucketInfo = CommonBucketInfo;

export type OssCnameInfo = {
  domain: string;
  cname: string;
  dnsRecordId?: string;
  txtRecordId?: string;
  bucketCnameBound?: boolean;
};

export type OssCnameTokenInfo = {
  bucket: string;
  cname: string;
  token: string;
  expireTime: string;
};

type PutCnameResult = {
  success: boolean;
  needVerification: boolean;
};

type VerificationResult = PutCnameResult & {
  txtRecordId?: string;
};

type TxtRecordResult = {
  success: boolean;
  recordId?: string;
};

export type OssCnameCertificateConfig = {
  certificateBody: string;
  certificatePrivateKey: string;
};

type OssSdkClient = OSS;

const escapeXmlText = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const toCamelCase = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1);

const parseXmlResponse = <T>(xml: string, tagName: string): T | null => {
  try {
    const containerRegex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`);
    const containerMatch = containerRegex.exec(xml);
    if (!containerMatch) return null;

    const innerXml = containerMatch[1];
    const result: Record<string, string> = {};
    const childRegex = /<(\w+)>([^<]*)<\/\1>/g;
    let match: RegExpExecArray | null;
    while ((match = childRegex.exec(innerXml)) !== null) {
      result[toCamelCase(match[1])] = match[2].trim();
    }
    return Object.keys(result).length > 0 ? (result as T) : null;
  } catch {
    return null;
  }
};

export const createOssOperations = (
  ossClient: OssSdkClient,
  region: string,
  dnsOps?: DnsOperations,
) => {
  const useBucket = (bucketName: string) => {
    ossClient.useBucket(bucketName);
  };

  const getBucketCnameEndpoint = async (bucketName: string): Promise<string> => {
    const infoResult = await ossClient.getBucketInfo(bucketName);
    const bucket = infoResult.bucket as { Name?: string; Location?: string };
    const actualBucketName = bucket.Name || bucketName;
    const location = bucket.Location;
    if (!location) {
      throw new Error(lang.__('OSS_BUCKET_LOCATION_NOT_FOUND', { bucketName }));
    }
    const derivedRegion = location.replace(/^oss-/, '');
    const isChinaRegion = derivedRegion.startsWith('cn-');
    return isChinaRegion
      ? `${actualBucketName}.${derivedRegion}.taihangcda.cn`
      : `${actualBucketName}.oss-${derivedRegion}.aliyuncs.com`;
  };

  const buildCertificateXml = (cert?: OssCnameCertificateConfig): string => {
    if (!cert) return '';
    return `
    <CertificateConfiguration>
      <Certificate>${escapeXmlText(cert.certificateBody)}</Certificate>
      <PrivateKey>${escapeXmlText(cert.certificatePrivateKey)}</PrivateKey>
      <Force>true</Force>
    </CertificateConfiguration>`;
  };

  const createCnameToken = async (
    bucketName: string,
    domain: string,
  ): Promise<OssCnameTokenInfo> => {
    useBucket(bucketName);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<BucketCnameConfiguration>
  <Cname>
    <Domain>${escapeXmlText(domain)}</Domain>
  </Cname>
</BucketCnameConfiguration>`;

    const params = {
      method: 'POST',
      bucket: bucketName,
      subres: { cname: '', comp: 'token' },
      headers: {
        'Content-Type': 'application/xml',
      },
      content: xml,
      successStatuses: [200],
    };

    const response = await ossRequest(ossClient, params);
    const responseXml = (response as { data?: string }).data || '';
    const parsed = parseXmlResponse<OssCnameTokenInfo>(responseXml, 'CnameToken');

    if (!parsed || !parsed.token) {
      throw new Error(lang.__('OSS_CNAME_TOKEN_CREATE_FAILED', { domain }));
    }

    return {
      bucket: bucketName,
      cname: domain,
      token: parsed.token,
      expireTime: parsed.expireTime || '',
    };
  };

  const putBucketCname = async (
    bucketName: string,
    domain: string,
    certificate?: OssCnameCertificateConfig,
  ): Promise<PutCnameResult> => {
    useBucket(bucketName);
    const certXml = buildCertificateXml(certificate);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<BucketCnameConfiguration>
  <Cname>
    <Domain>${escapeXmlText(domain)}</Domain>${certXml}
  </Cname>
</BucketCnameConfiguration>`;

    try {
      const params = {
        method: 'POST',
        bucket: bucketName,
        subres: { cname: '', comp: 'add' },
        headers: {
          'Content-Type': 'application/xml',
          'Content-MD5': '',
        },
        content: xml,
        successStatuses: [200],
      };
      await (ossClient as unknown as { request: (p: unknown) => Promise<unknown> }).request(params);
      logger.info(lang.__('OSS_BUCKET_CNAME_BOUND', { domain }));
      return { success: true, needVerification: false };
    } catch (error) {
      const err = error as { code?: string; message?: string; status?: number };
      if (err.code === 'CnameAlreadyExists' || err.status === 409) {
        logger.info(lang.__('OSS_BUCKET_CNAME_EXISTS', { domain }));
        return { success: true, needVerification: false };
      }
      if (err.code === 'NeedVerifyDomainOwnership') {
        logger.warn(lang.__('OSS_BUCKET_CNAME_NEED_VERIFY', { domain }));
        return { success: false, needVerification: true };
      }
      if (certificate) {
        // eslint-disable-next-line preserve-caught-error
        throw new Error(lang.__('OSS_BUCKET_CNAME_BIND_FAILED', { error: String(error) }));
      }
      logger.warn(lang.__('OSS_BUCKET_CNAME_BIND_FAILED', { error: String(error) }));
      return { success: false, needVerification: false };
    }
  };

  const deleteBucketCname = async (bucketName: string, domain: string): Promise<boolean> => {
    useBucket(bucketName);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<BucketCnameConfiguration>
  <Cname>
    <Domain>${domain}</Domain>
  </Cname>
</BucketCnameConfiguration>`;

    try {
      const params = {
        method: 'POST',
        bucket: bucketName,
        subres: { cname: '', comp: 'delete' },
        headers: {
          'Content-Type': 'application/xml',
        },
        content: xml,
        successStatuses: [200, 204],
      };
      await (ossClient as unknown as { request: (p: unknown) => Promise<unknown> }).request(params);
      logger.info(lang.__('OSS_BUCKET_CNAME_UNBOUND', { domain }));
      return true;
    } catch (error) {
      logger.warn(lang.__('OSS_BUCKET_CNAME_UNBIND_FAILED', { error: String(error) }));
      return false;
    }
  };

  type OssCorsRule = {
    allowedOrigin: string | string[];
    allowedMethod: string | string[];
    allowedHeader?: string | string[];
    exposeHeader?: string | string[];
    maxAgeSeconds?: string | number;
  };

  const buildCorsRuleForDomain = (domain: string): OssCorsRule => ({
    allowedOrigin: [`https://${domain}`, `http://${domain}`],
    allowedMethod: ['GET', 'HEAD'],
    allowedHeader: ['*'],
    exposeHeader: ['ETag', 'Content-Length'],
    maxAgeSeconds: '3600',
  });

  const isDomainCorsRule = (rule: OssCorsRule, domain: string): boolean => {
    const origins = Array.isArray(rule.allowedOrigin) ? rule.allowedOrigin : [rule.allowedOrigin];
    const expected = new Set([`https://${domain}`, `http://${domain}`]);
    return origins.length === expected.size && origins.every((o) => expected.has(o));
  };

  const addCorsRuleForDomain = async (bucketName: string, domain: string): Promise<void> => {
    try {
      useBucket(bucketName);
      let existingRules: OssCorsRule[] = [];
      try {
        const corsResult = await ossClient.getBucketCORS(bucketName);
        if (corsResult.rules && corsResult.rules.length > 0) {
          existingRules = corsResult.rules as unknown as OssCorsRule[];
        }
      } catch {
        // no existing CORS config
      }

      if (existingRules.some((rule) => isDomainCorsRule(rule, domain))) {
        logger.info(lang.__('OSS_CORS_RULE_EXISTS', { domain }));
        return;
      }

      const allRules = [...existingRules, buildCorsRuleForDomain(domain)];
      await ossClient.putBucketCORS(bucketName, allRules as unknown as OSS.CORSRule[]);
      logger.info(lang.__('OSS_CORS_RULE_ADDED', { domain }));
    } catch (error) {
      logger.warn(lang.__('OSS_CORS_RULE_ADD_FAILED', { domain, error: String(error) }));
    }
  };

  const removeCorsRuleForDomain = async (bucketName: string, domain: string): Promise<void> => {
    try {
      useBucket(bucketName);
      let existingRules: OssCorsRule[] = [];
      try {
        const corsResult = await ossClient.getBucketCORS(bucketName);
        if (corsResult.rules && corsResult.rules.length > 0) {
          existingRules = corsResult.rules as unknown as OssCorsRule[];
        }
      } catch {
        return;
      }

      const remainingRules = existingRules.filter((rule) => !isDomainCorsRule(rule, domain));

      if (remainingRules.length === existingRules.length) {
        return;
      }

      if (remainingRules.length > 0) {
        await ossClient.putBucketCORS(bucketName, remainingRules as unknown as OSS.CORSRule[]);
      } else {
        await ossClient.deleteBucketCORS(bucketName);
      }
      logger.info(lang.__('OSS_CORS_RULE_REMOVED', { domain }));
    } catch (error) {
      logger.warn(lang.__('OSS_CORS_RULE_REMOVE_FAILED', { domain, error: String(error) }));
    }
  };

  const bindCustomDomain = async (
    bucketName: string,
    domain: string,
    certificate?: OssCnameCertificateConfig,
  ): Promise<OssCnameInfo> => {
    const normalizedDomain = normalizeDomain(domain);
    const mainDomain = extractMainDomain(normalizedDomain);
    const hostRecord = extractHostRecord(normalizedDomain, mainDomain);
    const ossEndpoint = await getBucketCnameEndpoint(bucketName);

    let cnameResult: PutCnameResult | VerificationResult = await putBucketCname(
      bucketName,
      normalizedDomain,
      certificate,
    );
    let txtRecordId: string | undefined;

    if (cnameResult.needVerification) {
      const verificationResult = await handleDomainOwnershipVerification(
        bucketName,
        normalizedDomain,
        certificate,
      );
      cnameResult = verificationResult;
      txtRecordId = verificationResult.txtRecordId;
    }

    const bucketCnameBound = cnameResult.success;
    if (certificate && bucketCnameBound) {
      logger.info(lang.__('OSS_BUCKET_CERT_BOUND', { domain: normalizedDomain }));
    }
    await addCorsRuleForDomain(bucketName, normalizedDomain);

    if (!dnsOps) {
      logger.warn(
        lang.__('OSS_DNS_MANUAL_CONFIG_REQUIRED', { domain: normalizedDomain, cname: ossEndpoint }),
      );
      return { domain: normalizedDomain, cname: ossEndpoint, bucketCnameBound, txtRecordId };
    }

    const result = await createOrFindDnsCnameRecord(
      normalizedDomain,
      mainDomain,
      hostRecord,
      ossEndpoint,
      bucketCnameBound,
    );
    return { ...result, txtRecordId };
  };

  const logOssVerificationInstructions = (
    domain: string,
    fullTxtRecord: string,
    token: string,
  ): void => {
    const mainDomain = extractMainDomain(domain);
    const separator = '='.repeat(80);
    logger.error(
      `\n${separator}\n${lang.__('OSS_VERIFICATION_HEADER')}\n${separator}\n${lang.__('OSS_VERIFICATION_DOMAIN', { domain })}\n\n${lang.__('OSS_VERIFICATION_INSTRUCTIONS')}\n\n${lang.__('OSS_VERIFICATION_RECORD_NAME', { name: `${fullTxtRecord}.${mainDomain}` })}\n${lang.__('OSS_VERIFICATION_RECORD_TYPE')}\n${lang.__('OSS_VERIFICATION_RECORD_VALUE', { value: token })}`,
    );
    logger.error(
      `\n${separator}\n${lang.__('OSS_VERIFICATION_NEXT_STEPS')}\n${lang.__('OSS_VERIFICATION_STEP1')}\n${lang.__('OSS_VERIFICATION_STEP2')}\n${separator}\n`,
    );
  };

  const handleDomainOwnershipVerification = async (
    bucketName: string,
    domain: string,
    certificate?: OssCnameCertificateConfig,
  ): Promise<VerificationResult> => {
    logger.info(lang.__('OSS_CNAME_CREATING_VERIFICATION_TOKEN', { domain }));

    const tokenInfo = await createCnameToken(bucketName, domain);
    const txtRecordName = '_dnsauth';
    const hostRecord = extractHostRecord(domain, extractMainDomain(domain));
    const fullTxtRecord =
      hostRecord && hostRecord !== '@' ? `${txtRecordName}.${hostRecord}` : txtRecordName;

    logger.info(
      lang.__('OSS_CNAME_VERIFICATION_TOKEN_CREATED', {
        domain,
        txtRecord: fullTxtRecord,
        token: tokenInfo.token,
      }),
    );

    const txtResult = await addVerificationTxtRecord(
      extractMainDomain(domain),
      fullTxtRecord,
      tokenInfo.token,
    );

    if (txtResult.success) {
      await pollTxtDnsPropagation(extractMainDomain(domain), fullTxtRecord, tokenInfo.token);
      const retryResult = await retryCnameBindingAfterVerification(bucketName, domain, certificate);
      return { ...retryResult, txtRecordId: txtResult.recordId };
    }

    logOssVerificationInstructions(domain, fullTxtRecord, tokenInfo.token);
    throw new Error(
      lang.__('OSS_CNAME_MANUAL_VERIFICATION_REQUIRED', {
        domain,
        txtRecord: `${fullTxtRecord}.${extractMainDomain(domain)}`,
        token: tokenInfo.token,
      }),
    );
  };

  const addVerificationTxtRecord = async (
    mainDomain: string,
    fullTxtRecord: string,
    token: string,
  ): Promise<TxtRecordResult> => {
    if (!dnsOps) return { success: false };

    try {
      const existingRecords = await dnsOps.describeDomainRecords(mainDomain, fullTxtRecord);
      const existingRecord = existingRecords.find(
        (record) => record.rr === fullTxtRecord && record.type === 'TXT' && record.value === token,
      );

      if (existingRecord) {
        logger.info(
          lang.__('OSS_CNAME_TXT_RECORD_ALREADY_EXISTS', {
            txtRecord: `${fullTxtRecord}.${mainDomain}`,
          }),
        );
        return { success: true, recordId: existingRecord.recordId };
      }

      const recordId = await dnsOps.addDomainRecord({
        domainName: mainDomain,
        rr: fullTxtRecord,
        type: 'TXT',
        value: token,
        ttl: 600,
      });
      logger.info(
        lang.__('OSS_CNAME_TXT_RECORD_CREATED', {
          txtRecord: `${fullTxtRecord}.${mainDomain}`,
        }),
      );
      return { success: true, recordId };
    } catch (error) {
      logger.warn(
        lang.__('OSS_CNAME_TXT_RECORD_CREATE_FAILED', {
          txtRecord: `${fullTxtRecord}.${mainDomain}`,
          error: String(error),
        }),
      );
      return { success: false };
    }
  };

  const pollTxtDnsPropagation = async (
    mainDomain: string,
    fullTxtRecord: string,
    token: string,
  ): Promise<boolean> => {
    if (!dnsOps) return false;

    const checkPropagation = async (): Promise<boolean> => {
      try {
        const currentRecords = await dnsOps!.describeDomainRecords(mainDomain, fullTxtRecord);
        return currentRecords.some(
          (record) =>
            record.rr === fullTxtRecord &&
            record.type === 'TXT' &&
            record.value === token &&
            record.status === 'ENABLE',
        );
      } catch (checkError) {
        logger.warn(lang.__('OSS_CNAME_DNS_CHECK_FAILED', { error: String(checkError) }));
        return false;
      }
    };

    logger.info(lang.__('OSS_CNAME_DNS_PROPAGATION_WAITING', { domain: mainDomain }));

    for (let attempt = 1; attempt <= DNS_PROPAGATION_MAX_ATTEMPTS; attempt++) {
      logger.info(
        lang.__('OSS_CNAME_DNS_PROPAGATION_CHECK', {
          attempt: String(attempt),
          max: String(DNS_PROPAGATION_MAX_ATTEMPTS),
        }),
      );
      await sleep(DNS_PROPAGATION_DELAY_MS);

      const propagated = await checkPropagation();
      if (propagated) {
        logger.info(
          lang.__('OSS_CNAME_DNS_PROPAGATION_VERIFIED', {
            domain: mainDomain,
            minutes: String(attempt),
          }),
        );
        return true;
      }
    }

    logger.warn(
      lang.__('OSS_CNAME_DNS_PROPAGATION_TIMEOUT', {
        max: String(DNS_PROPAGATION_MAX_ATTEMPTS),
      }),
    );
    return false;
  };

  const retryCnameBindingAfterVerification = async (
    bucketName: string,
    domain: string,
    certificate?: OssCnameCertificateConfig,
  ): Promise<PutCnameResult> => {
    logger.info(lang.__('OSS_CNAME_WAITING_FOR_VERIFICATION', { domain }));

    for (let attempt = 1; attempt <= DOMAIN_BIND_MAX_RETRIES; attempt++) {
      if (attempt > 1) {
        logger.info(
          lang.__('RETRY_ATTEMPT', {
            operation: 'domain binding',
            attempt: String(attempt),
            max: String(DOMAIN_BIND_MAX_RETRIES),
          }),
        );
      }

      await sleep(DOMAIN_BIND_RETRY_DELAY_MS);

      try {
        const cnameResult = await putBucketCname(bucketName, domain, certificate);

        if (cnameResult.success) {
          return cnameResult;
        }

        if (!cnameResult.needVerification) {
          return cnameResult;
        }
      } catch (error) {
        if (attempt === DOMAIN_BIND_MAX_RETRIES) {
          throw error;
        }
        logger.warn(
          lang.__('RETRY_ATTEMPT_FAILED', {
            operation: 'domain binding',
            attempt: String(attempt),
            max: String(DOMAIN_BIND_MAX_RETRIES),
            error: String(error),
          }),
        );
      }
    }

    const hostRecord = extractHostRecord(domain, extractMainDomain(domain));
    const txtRecordName = '_dnsauth';
    const fullTxtRecord =
      hostRecord && hostRecord !== '@' ? `${txtRecordName}.${hostRecord}` : txtRecordName;

    logger.warn(
      lang.__('OSS_CNAME_VERIFICATION_RETRY_FAILED', {
        domain,
        txtRecord: `${fullTxtRecord}.${extractMainDomain(domain)}`,
      }),
    );

    return { success: false, needVerification: true };
  };

  const createOrFindDnsCnameRecord = async (
    domain: string,
    mainDomain: string,
    hostRecord: string,
    ossEndpoint: string,
    bucketCnameBound: boolean,
  ): Promise<OssCnameInfo> => {
    try {
      const existingRecords = await dnsOps!.describeDomainRecords(mainDomain, hostRecord);
      const existingRecord = existingRecords.find(
        (record) =>
          record.rr === hostRecord && record.type === 'CNAME' && record.value === ossEndpoint,
      );

      if (existingRecord) {
        logger.info(lang.__('OSS_DNS_CNAME_EXISTS', { domain, cname: ossEndpoint }));
        return {
          domain,
          cname: ossEndpoint,
          dnsRecordId: existingRecord.recordId,
          bucketCnameBound,
        };
      }

      const recordId = await dnsOps!.addDomainRecord({
        domainName: mainDomain,
        rr: hostRecord,
        type: 'CNAME',
        value: ossEndpoint,
        ttl: 600,
      });

      logger.info(lang.__('OSS_DNS_CNAME_CREATED', { domain, cname: ossEndpoint }));
      return { domain, cname: ossEndpoint, dnsRecordId: recordId, bucketCnameBound };
    } catch (error) {
      logger.warn(lang.__('OSS_DNS_DOMAIN_NOT_MANAGED', { domain, cname: ossEndpoint }));
      logger.debug(`DNS error: ${error}`);
      return { domain, cname: ossEndpoint, bucketCnameBound };
    }
  };

  const isPublicAcl = (acl: BucketACL): boolean =>
    acl === BucketACL.PUBLIC_READ || acl === BucketACL.PUBLIC_READ_WRITE;

  const disableBucketPublicAccessBlock = async (bucketName: string): Promise<void> => {
    useBucket(bucketName);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<PublicAccessBlockConfiguration>
  <BlockPublicAccess>false</BlockPublicAccess>
</PublicAccessBlockConfiguration>`;

    try {
      const params = {
        method: 'PUT',
        bucket: bucketName,
        subres: { publicAccessBlock: '' },
        headers: {
          'Content-Type': 'application/xml',
        },
        content: xml,
        successStatuses: [200],
      };
      await ossRequest(ossClient, params);
      logger.info(lang.__('OSS_BUCKET_PUBLIC_ACCESS_BLOCK_DISABLED', { bucketName }));
    } catch (error) {
      logger.warn(
        lang.__('OSS_BUCKET_PUBLIC_ACCESS_BLOCK_DISABLE_FAILED', {
          bucketName,
          error: String(error),
        }),
      );
    }
  };

  const unbindCustomDomain = async (
    bucketName: string,
    domain: string,
    dnsRecordId?: string,
    txtRecordId?: string,
  ): Promise<void> => {
    await removeCorsRuleForDomain(bucketName, domain);
    await deleteBucketCname(bucketName, domain);

    if (dnsOps) {
      if (dnsRecordId && dnsRecordId !== 'existing') {
        try {
          await dnsOps.deleteDomainRecord(dnsRecordId);
          logger.info(lang.__('OSS_DNS_CNAME_DELETED', { domain }));
        } catch (error) {
          logger.warn(lang.__('OSS_DNS_CNAME_DELETE_FAILED', { domain, error: String(error) }));
        }
      }

      if (txtRecordId) {
        try {
          await dnsOps.deleteDomainRecord(txtRecordId);
          logger.info(lang.__('OSS_DNS_TXT_RECORD_DELETED', { domain }));
        } catch (error) {
          logger.warn(
            lang.__('OSS_DNS_TXT_RECORD_DELETE_FAILED', { domain, error: String(error) }),
          );
        }
      }
    }
  };

  return {
    createBucket: async (config: OssBucketConfig): Promise<OssBucketInfo> => {
      if (config.storageClass) {
        await ossClient.putBucket(config.bucketName, {
          storageClass: config.storageClass as OSS.StorageType,
        } as OSS.PutBucketOptions);
      } else {
        await ossClient.putBucket(config.bucketName);
      }

      // Set ACL if specified
      if (config.acl) {
        if (isPublicAcl(config.acl)) {
          await disableBucketPublicAccessBlock(config.bucketName);
        }
        useBucket(config.bucketName);
        await ossClient.putBucketACL(config.bucketName, config.acl);
      }

      // Set website configuration if specified
      if (config.websiteConfig) {
        useBucket(config.bucketName);
        await ossClient.putBucketWebsite(config.bucketName, {
          index: config.websiteConfig.indexDocument,
          error: config.websiteConfig.errorDocument,
        });
      }

      return {
        name: config.bucketName,
        location: `oss-${region}`,
        acl: config.acl,
        websiteConfig: config.websiteConfig,
        storageClass: config.storageClass,
      };
    },

    getBucket: async (bucketName: string): Promise<OssBucketInfo | null> => {
      try {
        useBucket(bucketName);

        // Get bucket info
        const infoResult = await ossClient.getBucketInfo(bucketName);
        const bucket = infoResult.bucket;

        // Get ACL
        let acl: string | undefined;
        try {
          const aclResult = await ossClient.getBucketACL(bucketName);
          acl = aclResult.acl;
        } catch {
          // ACL might not be accessible
        }

        // Get website config
        let websiteConfig: BucketWebsiteConfig | undefined;
        try {
          const websiteResult = await ossClient.getBucketWebsite(bucketName);
          if (websiteResult.index) {
            websiteConfig = {
              indexDocument: websiteResult.index,
              errorDocument: websiteResult.error,
            };
          }
        } catch {
          // Website config might not exist
        }

        // Get logging config
        let loggingConfig: BucketLoggingConfig | undefined;
        try {
          const loggingResult = await ossClient.getBucketLogging(bucketName);
          if (loggingResult.enable && loggingResult.prefix) {
            loggingConfig = {
              targetPrefix: loggingResult.prefix,
            };
          }
        } catch {
          // Logging config might not exist
        }

        // Get CORS rules
        let corsRules: BucketCorsRule[] | undefined;
        try {
          const corsResult = await ossClient.getBucketCORS(bucketName);
          if (corsResult.rules && corsResult.rules.length > 0) {
            corsRules = corsResult.rules.map((rule) => ({
              allowedOrigins: Array.isArray(rule.allowedOrigin)
                ? rule.allowedOrigin
                : [rule.allowedOrigin],
              allowedMethods: Array.isArray(rule.allowedMethod)
                ? rule.allowedMethod
                : [rule.allowedMethod],
              allowedHeaders: rule.allowedHeader
                ? Array.isArray(rule.allowedHeader)
                  ? rule.allowedHeader
                  : [rule.allowedHeader]
                : undefined,
              exposeHeaders: rule.exposeHeader
                ? Array.isArray(rule.exposeHeader)
                  ? rule.exposeHeader
                  : [rule.exposeHeader]
                : undefined,
              maxAgeSeconds:
                typeof rule.maxAgeSeconds === 'number' ? rule.maxAgeSeconds : undefined,
            }));
          }
        } catch {
          // CORS config might not exist
        }

        // Get lifecycle rules
        let lifecycleRules: BucketLifecycleRule[] | undefined;
        try {
          const lifecycleResult = await ossClient.getBucketLifecycle(bucketName);
          if (lifecycleResult.rules && lifecycleResult.rules.length > 0) {
            lifecycleRules = lifecycleResult.rules.map((rule) => ({
              id: rule.id,
              status: rule.status,
              prefix: rule.prefix,
              expiration: rule.days
                ? {
                    days: typeof rule.days === 'number' ? rule.days : parseInt(rule.days, 10),
                  }
                : rule.date
                  ? {
                      date: rule.date,
                    }
                  : undefined,
            }));
          }
        } catch {
          // Lifecycle config might not exist
        }

        // Build owner info
        const owner: BucketOwner | undefined = bucket?.Owner
          ? {
              id: bucket.Owner.ID,
              displayName: bucket.Owner.DisplayName,
            }
          : undefined;

        return {
          name: bucketName,
          location: bucket?.Location,
          creationDate: bucket?.CreationDate,
          storageClass: bucket?.StorageClass,
          dataRedundancyType: bucket?.DataRedundancyType as 'LRS' | 'ZRS' | undefined,
          resourceGroupId: bucket?.ResourceGroupId,
          comment: bucket?.Comment,
          owner,
          blockPublicAccess: bucket?.BlockPublicAccess,
          accessMonitorStatus: bucket?.AccessMonitor as 'Enabled' | 'Disabled' | undefined,
          acl,
          websiteConfig,
          loggingConfig,
          corsRules,
          lifecycleRules,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'NoSuchBucket' || error.code === 'AccessDenied')
        ) {
          return null;
        }
        throw error;
      }
    },

    updateBucketAcl: async (bucketName: string, acl: BucketACL): Promise<void> => {
      if (isPublicAcl(acl)) {
        await disableBucketPublicAccessBlock(bucketName);
      }
      useBucket(bucketName);
      await ossClient.putBucketACL(bucketName, acl);
    },

    updateBucketWebsite: async (
      bucketName: string,
      websiteConfig: BucketWebsiteConfig,
    ): Promise<void> => {
      useBucket(bucketName);
      await ossClient.putBucketWebsite(bucketName, {
        index: websiteConfig.indexDocument,
        error: websiteConfig.errorDocument,
      });
    },

    deleteBucketWebsite: async (bucketName: string): Promise<void> => {
      useBucket(bucketName);
      await ossClient.deleteBucketWebsite(bucketName);
    },

    deleteBucket: async (bucketName: string): Promise<void> => {
      useBucket(bucketName);

      // List and delete all objects first
      try {
        let marker: string | undefined;
        do {
          const listResult = await ossClient.list(
            {
              'max-keys': 1000,
              marker,
            },
            {},
          );

          if (listResult.objects && listResult.objects.length > 0) {
            const keys = listResult.objects.map((obj) => obj.name);
            await ossClient.deleteMulti(keys, { quiet: true });
          }

          marker = listResult.isTruncated ? listResult.nextMarker : undefined;
        } while (marker);
      } catch {
        // Ignore errors when listing/deleting objects
      }

      await ossClient.deleteBucket(bucketName);
    },

    uploadFiles: async (bucketName: string, sourcePath: string): Promise<void> => {
      useBucket(bucketName);

      const uploadDirectory = async (dirPath: string, prefix: string = '') => {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dirPath, entry.name);
          const ossKey = prefix ? `${prefix}/${entry.name}` : entry.name;

          if (entry.isDirectory()) {
            await uploadDirectory(fullPath, ossKey);
          } else if (entry.isFile()) {
            await ossClient.put(ossKey, fullPath);
          }
        }
      };

      const stats = fs.statSync(sourcePath);
      if (stats.isDirectory()) {
        await uploadDirectory(sourcePath);
      } else {
        const fileName = path.basename(sourcePath);
        await ossClient.put(fileName, sourcePath);
      }
    },

    putFile: async (bucketName: string, objectKey: string, filePath: string): Promise<void> => {
      useBucket(bucketName);
      await ossClient.put(objectKey, filePath);
    },

    bindCustomDomain,

    unbindCustomDomain,

    createCnameToken,
  };
};

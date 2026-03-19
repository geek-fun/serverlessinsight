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
import { extractMainDomain, extractHostRecord } from '../domainUtils';

export type OssBucketConfig = {
  bucketName: string;
  acl?: BucketACL;
  websiteConfig?: BucketWebsiteConfig;
  storageClass?: string;
  domain?: string;
};

export type OssBucketInfo = CommonBucketInfo;

export type OssCnameInfo = {
  domain: string;
  cname: string;
  dnsRecordId?: string;
  bucketCnameBound?: boolean;
};

type OssSdkClient = OSS;

export const createOssOperations = (
  ossClient: OssSdkClient,
  region: string,
  dnsOps?: DnsOperations,
) => {
  const useBucket = (bucketName: string) => {
    ossClient.useBucket(bucketName);
  };

  const getOssEndpoint = (bucketName: string): string => {
    return `${bucketName}.oss-${region}.aliyuncs.com`;
  };

  const putBucketCname = async (bucketName: string, domain: string): Promise<boolean> => {
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
      return true;
    } catch (error) {
      const err = error as { code?: string; message?: string; status?: number };
      if (err.code === 'CnameAlreadyExists' || err.status === 409) {
        logger.info(lang.__('OSS_BUCKET_CNAME_EXISTS', { domain }));
        return true;
      }
      if (err.code === 'NeedVerifyDomainOwnership') {
        logger.warn(lang.__('OSS_BUCKET_CNAME_NEED_VERIFY', { domain }));
        return false;
      }
      logger.warn(lang.__('OSS_BUCKET_CNAME_BIND_FAILED', { error: String(error) }));
      return false;
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

  const bindCustomDomain = async (bucketName: string, domain: string): Promise<OssCnameInfo> => {
    const mainDomain = extractMainDomain(domain);
    const hostRecord = extractHostRecord(domain, mainDomain);
    const ossEndpoint = getOssEndpoint(bucketName);

    const bucketCnameBound = await putBucketCname(bucketName, domain);
    await addCorsRuleForDomain(bucketName, domain);

    if (!dnsOps) {
      logger.warn(lang.__('OSS_DNS_MANUAL_CONFIG_REQUIRED', { domain, cname: ossEndpoint }));
      return { domain, cname: ossEndpoint, bucketCnameBound };
    }

    try {
      const existingRecords = await dnsOps.describeDomainRecords(mainDomain, hostRecord);
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

      const recordId = await dnsOps.addDomainRecord({
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
      await (ossClient as unknown as { request: (p: unknown) => Promise<unknown> }).request(params);
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
  ): Promise<void> => {
    await removeCorsRuleForDomain(bucketName, domain);
    await deleteBucketCname(bucketName, domain);

    if (!dnsOps || !dnsRecordId || dnsRecordId === 'existing') {
      return;
    }

    try {
      await dnsOps.deleteDomainRecord(dnsRecordId);
      logger.info(lang.__('OSS_DNS_CNAME_DELETED', { domain }));
    } catch (error) {
      logger.warn(lang.__('OSS_DNS_CNAME_DELETE_FAILED', { domain, error: String(error) }));
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

    getOssEndpoint,
  };
};

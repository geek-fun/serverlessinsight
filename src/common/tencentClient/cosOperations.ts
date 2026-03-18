import COS from 'cos-nodejs-sdk-v5';
import type {
  HeadBucketResult,
  GetBucketAclResult,
  GetBucketCorsResult,
  GetBucketWebsiteResult,
  GetBucketVersioningResult,
  GetBucketTaggingResult,
} from 'cos-nodejs-sdk-v5';
import { CosBucketConfig, CosBucketInfo } from './types';
import { DnsOperations } from './dnspodOperations';
import { logger } from '../logger';
import { lang } from '../../lang';
import { extractMainDomain, extractHostRecord } from '../domainUtils';

type CosSdkClient = COS;

export type CosCnameInfo = {
  domain: string;
  cname: string;
  dnsRecordId?: string;
  bucketDomainBound?: boolean;
};

export // COS operations
const createCosOperations = (cosClient: CosSdkClient, region: string, dnsOps?: DnsOperations) => {
  const getCosEndpoint = (bucketName: string): string => {
    return `${bucketName}.cos.${region}.myqcloud.com`;
  };

  const bindCustomDomain = async (bucketName: string, domain: string): Promise<CosCnameInfo> => {
    const mainDomain = extractMainDomain(domain);
    const hostRecord = extractHostRecord(domain, mainDomain);
    const cosEndpoint = getCosEndpoint(bucketName);

    let bucketDomainBound = false;
    try {
      await new Promise<void>((resolve, reject) => {
        cosClient.putBucketDomain(
          {
            Bucket: bucketName,
            Region: region,
            DomainRule: [
              {
                Status: 'ENABLED',
                Name: domain,
                Type: 'REST',
              },
            ],
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          },
        );
      });
      logger.info(lang.__('COS_BUCKET_DOMAIN_BOUND', { domain }));
      bucketDomainBound = true;
    } catch (error) {
      logger.warn(lang.__('COS_BUCKET_DOMAIN_BIND_FAILED', { error: String(error) }));
    }

    if (!dnsOps) {
      logger.warn(lang.__('COS_DNS_MANUAL_CONFIG_REQUIRED', { domain, cname: cosEndpoint }));
      return { domain, cname: cosEndpoint, bucketDomainBound };
    }

    try {
      const existingRecords = await dnsOps.describeDomainRecords(mainDomain, hostRecord);
      const existingRecord = existingRecords.find(
        (record) =>
          record.rr === hostRecord && record.type === 'CNAME' && record.value === cosEndpoint,
      );

      if (existingRecord) {
        logger.info(lang.__('COS_DNS_CNAME_EXISTS', { domain, cname: cosEndpoint }));
        return {
          domain,
          cname: cosEndpoint,
          dnsRecordId: existingRecord.recordId,
          bucketDomainBound,
        };
      }

      const recordId = await dnsOps.addDomainRecord({
        domainName: mainDomain,
        rr: hostRecord,
        type: 'CNAME',
        value: cosEndpoint,
        ttl: 600,
      });

      logger.info(lang.__('COS_DNS_CNAME_CREATED', { domain, cname: cosEndpoint }));
      return { domain, cname: cosEndpoint, dnsRecordId: recordId, bucketDomainBound };
    } catch (error) {
      logger.warn(lang.__('COS_DNS_DOMAIN_NOT_MANAGED', { domain, cname: cosEndpoint }));
      logger.debug(`DNS error: ${error}`);
      return { domain, cname: cosEndpoint, bucketDomainBound };
    }
  };

  const unbindCustomDomain = async (
    bucketName: string,
    domain: string,
    dnsRecordId?: string,
  ): Promise<void> => {
    try {
      type DomainRule = { Name: string; Status: string; Type: string };

      const existingRules = await new Promise<Array<DomainRule>>((resolve, reject) => {
        cosClient.getBucketDomain(
          {
            Bucket: bucketName,
            Region: region,
          },
          (err: { statusCode?: number } | null, data: { DomainRule?: Array<DomainRule> }) => {
            if (err) {
              if (err.statusCode === 404) {
                resolve([]);
              } else {
                reject(err);
              }
            } else {
              resolve(data?.DomainRule ?? []);
            }
          },
        );
      });

      const remainingRules = existingRules.filter((rule) => rule.Name !== domain);

      if (remainingRules.length < existingRules.length) {
        if (remainingRules.length > 0) {
          await new Promise<void>((resolve, reject) => {
            cosClient.putBucketDomain(
              {
                Bucket: bucketName,
                Region: region,
                DomainRule: remainingRules.map((rule) => ({
                  Status: rule.Status as 'ENABLED' | 'DISABLED',
                  Name: rule.Name,
                  Type: rule.Type as 'REST' | 'WEBSITE' | 'ACCELERATE',
                })),
              },
              (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              },
            );
          });
        } else {
          await new Promise<void>((resolve, reject) => {
            cosClient.deleteBucketDomain(
              {
                Bucket: bucketName,
                Region: region,
              },
              (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              },
            );
          });
        }
        logger.info(lang.__('COS_BUCKET_DOMAIN_UNBOUND', { domain }));
      }
    } catch (error) {
      logger.warn(lang.__('COS_BUCKET_DOMAIN_UNBIND_FAILED', { error: String(error) }));
    }

    if (!dnsOps || !dnsRecordId || dnsRecordId === 'existing') {
      return;
    }

    const mainDomain = extractMainDomain(domain);

    try {
      await dnsOps.deleteDomainRecord(mainDomain, dnsRecordId);
      logger.info(lang.__('COS_DNS_CNAME_DELETED', { domain }));
    } catch (error) {
      logger.warn(lang.__('COS_DNS_CNAME_DELETE_FAILED', { domain, error: String(error) }));
    }
  };

  return {
    createBucket: async (config: CosBucketConfig): Promise<void> => {
      // Create bucket
      await new Promise<void>((resolve, reject) => {
        cosClient.putBucket(
          {
            Bucket: config.Bucket,
            Region: config.Region,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          },
        );
      });

      // Set ACL if specified
      if (config.ACL) {
        await new Promise<void>((resolve, reject) => {
          cosClient.putBucketAcl(
            {
              Bucket: config.Bucket,
              Region: config.Region,
              ACL: config.ACL,
            },
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            },
          );
        });
      }

      // Set website configuration if specified
      if (config.WebsiteConfiguration) {
        const websiteConfig = config.WebsiteConfiguration;
        await new Promise<void>((resolve, reject) => {
          cosClient.putBucketWebsite(
            {
              Bucket: config.Bucket,
              Region: config.Region,
              WebsiteConfiguration: websiteConfig,
            },
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            },
          );
        });
      }
    },

    getBucket: async (bucketName: string, region: string): Promise<CosBucketInfo | null> => {
      try {
        // Check if bucket exists
        await new Promise<HeadBucketResult>((resolve, reject) => {
          cosClient.headBucket(
            {
              Bucket: bucketName,
              Region: region,
            },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            },
          );
        });

        // Get ACL
        let acl: string | undefined;
        let accessControlPolicy: CosBucketInfo['AccessControlPolicy'];
        try {
          const aclResult = await new Promise<GetBucketAclResult>((resolve, reject) => {
            cosClient.getBucketAcl(
              {
                Bucket: bucketName,
                Region: region,
              },
              (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(data);
                }
              },
            );
          });
          acl = aclResult.ACL;
          accessControlPolicy = {
            owner: aclResult.Owner
              ? {
                  id: aclResult.Owner.ID,
                  displayName: undefined,
                }
              : undefined,
            grants: aclResult.Grants?.map((g) => ({
              grantee: g.Grantee
                ? {
                    type: 'ID' in g.Grantee ? 'CanonicalUser' : 'Group',
                    uri: 'URI' in g.Grantee ? g.Grantee.URI : undefined,
                    id: 'ID' in g.Grantee ? g.Grantee.ID : undefined,
                    displayName: undefined,
                  }
                : undefined,
              permission: g.Permission,
            })),
          };
        } catch {
          // ACL might not be accessible due to insufficient permissions
        }

        // Get CORS configuration
        let corsConfiguration: CosBucketInfo['CorsConfiguration'];
        try {
          const corsResult = await new Promise<GetBucketCorsResult>((resolve, reject) => {
            cosClient.getBucketCors(
              {
                Bucket: bucketName,
                Region: region,
              },
              (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(data);
                }
              },
            );
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          corsConfiguration = corsResult.CORSRules?.map((r: any) => ({
            id: r.ID,
            allowedOrigins: r.AllowedOrigin,
            allowedMethods: r.AllowedMethod,
            allowedHeaders: r.AllowedHeader,
            exposeHeaders: r.ExposeHeader,
            maxAgeSeconds: r.MaxAgeSeconds,
          }));
        } catch {
          // CORS might not be configured
        }

        // Get website configuration
        let websiteConfig: CosBucketInfo['WebsiteConfiguration'];
        try {
          const websiteResult = await new Promise<GetBucketWebsiteResult>((resolve, reject) => {
            cosClient.getBucketWebsite(
              {
                Bucket: bucketName,
                Region: region,
              },
              (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(data);
                }
              },
            );
          });

          if (
            websiteResult.WebsiteConfiguration?.IndexDocument ||
            websiteResult.WebsiteConfiguration?.ErrorDocument
          ) {
            websiteConfig = {
              IndexDocument: websiteResult.WebsiteConfiguration.IndexDocument,
              ErrorDocument: websiteResult.WebsiteConfiguration.ErrorDocument,
            };
          }
        } catch {
          // Website configuration might not be set
        }

        // Get versioning configuration
        let versioningConfig: CosBucketInfo['VersioningConfiguration'];
        try {
          const versioningResult = await new Promise<GetBucketVersioningResult>(
            (resolve, reject) => {
              cosClient.getBucketVersioning(
                {
                  Bucket: bucketName,
                  Region: region,
                },
                (err, data) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(data);
                  }
                },
              );
            },
          );
          versioningConfig = {
            status: versioningResult.VersioningConfiguration?.Status,
          };
        } catch {
          // Versioning might not be accessible
        }

        // Get tagging configuration
        let taggingConfig: CosBucketInfo['TaggingConfiguration'];
        try {
          const taggingResult = await new Promise<GetBucketTaggingResult>((resolve, reject) => {
            cosClient.getBucketTagging(
              {
                Bucket: bucketName,
                Region: region,
              },
              (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(data);
                }
              },
            );
          });
          taggingConfig = {
            tags: taggingResult.Tags?.map((t) => ({
              key: t.Key,
              value: t.Value,
            })),
          };
        } catch {
          // Tagging might not be configured
        }

        return {
          Name: bucketName,
          Location: region,
          ACL: acl,
          WebsiteConfiguration: websiteConfig,
          AccessControlPolicy: accessControlPolicy,
          CorsConfiguration: corsConfiguration,
          VersioningConfiguration: versioningConfig,
          TaggingConfiguration: taggingConfig,
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'statusCode' in error) {
          const statusCode = (error as { statusCode: number }).statusCode;
          if (statusCode === 404) {
            return null;
          }
        }
        throw error;
      }
    },

    updateBucketAcl: async (
      bucketName: string,
      region: string,
      acl: 'private' | 'public-read' | 'public-read-write',
    ): Promise<void> => {
      await new Promise<void>((resolve, reject) => {
        cosClient.putBucketAcl(
          {
            Bucket: bucketName,
            Region: region,
            ACL: acl,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          },
        );
      });
    },

    updateBucketWebsite: async (
      bucketName: string,
      region: string,
      websiteConfig: {
        IndexDocument: {
          Suffix: string;
        };
        ErrorDocument?: {
          Key: string;
        };
      },
    ): Promise<void> => {
      await new Promise<void>((resolve, reject) => {
        cosClient.putBucketWebsite(
          {
            Bucket: bucketName,
            Region: region,
            WebsiteConfiguration: websiteConfig,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          },
        );
      });
    },

    deleteBucket: async (bucketName: string, region: string): Promise<void> => {
      await new Promise<void>((resolve, reject) => {
        cosClient.deleteBucket(
          {
            Bucket: bucketName,
            Region: region,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          },
        );
      });
    },

    bindCustomDomain,

    unbindCustomDomain,

    getCosEndpoint,
  };
};

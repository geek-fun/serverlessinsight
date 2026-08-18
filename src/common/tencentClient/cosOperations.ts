import COS from 'cos-nodejs-sdk-v5';
import type {
  HeadBucketResult,
  GetBucketAclResult,
  GetBucketCorsResult,
  GetBucketWebsiteResult,
  GetBucketVersioningResult,
  GetBucketTaggingResult,
  GetBucketLifecycleResult,
  GetBucketLoggingResult,
  GetBucketReplicationResult,
  GetBucketEncryptionResult,
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

  type CosCorsRule = {
    AllowedOrigin: string[];
    AllowedMethod: string[];
    AllowedHeader?: string[];
    ExposeHeader?: string[];
    MaxAgeSeconds?: number;
    ID?: string;
  };

  const buildCorsRuleForDomain = (domain: string): CosCorsRule => ({
    AllowedOrigin: [`https://${domain}`, `http://${domain}`],
    AllowedMethod: ['GET', 'HEAD'],
    AllowedHeader: ['*'],
    ExposeHeader: ['ETag', 'Content-Length'],
    MaxAgeSeconds: 3600,
  });

  const isDomainCorsRule = (rule: CosCorsRule, domain: string): boolean => {
    const origins = rule.AllowedOrigin || [];
    const expected = new Set([`https://${domain}`, `http://${domain}`]);
    return origins.length === expected.size && origins.every((o) => expected.has(o));
  };

  const addCorsRuleForDomain = async (bucketName: string, domain: string): Promise<void> => {
    try {
      let existingRules: CosCorsRule[] = [];
      try {
        const corsResult = await new Promise<GetBucketCorsResult>((resolve, reject) => {
          cosClient.getBucketCors({ Bucket: bucketName, Region: region }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
        if (corsResult.CORSRules && corsResult.CORSRules.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          existingRules = corsResult.CORSRules as any as CosCorsRule[];
        }
      } catch {
        // no existing CORS config
      }

      if (existingRules.some((rule) => isDomainCorsRule(rule, domain))) {
        logger.info(lang.__('COS_CORS_RULE_EXISTS', { domain }));
        return;
      }

      const allRules = [...existingRules, buildCorsRuleForDomain(domain)];
      await new Promise<void>((resolve, reject) => {
        cosClient.putBucketCors(
          {
            Bucket: bucketName,
            Region: region,
            CORSRules: allRules.map((r) => ({
              AllowedOrigin: r.AllowedOrigin,
              AllowedMethod: r.AllowedMethod,
              AllowedHeader: r.AllowedHeader || [],
              ExposeHeader: r.ExposeHeader || [],
              MaxAgeSeconds: r.MaxAgeSeconds || 0,
            })),
          },
          (err) => {
            if (err) reject(err);
            else resolve();
          },
        );
      });
      logger.info(lang.__('COS_CORS_RULE_ADDED', { domain }));
    } catch (error) {
      logger.warn(lang.__('COS_CORS_RULE_ADD_FAILED', { domain, error: String(error) }));
    }
  };

  const removeCorsRuleForDomain = async (bucketName: string, domain: string): Promise<void> => {
    try {
      let existingRules: CosCorsRule[] = [];
      try {
        const corsResult = await new Promise<GetBucketCorsResult>((resolve, reject) => {
          cosClient.getBucketCors({ Bucket: bucketName, Region: region }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
        if (corsResult.CORSRules && corsResult.CORSRules.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          existingRules = corsResult.CORSRules as any as CosCorsRule[];
        }
      } catch {
        return;
      }

      const remainingRules = existingRules.filter((rule) => !isDomainCorsRule(rule, domain));

      if (remainingRules.length === existingRules.length) {
        return;
      }

      if (remainingRules.length > 0) {
        await new Promise<void>((resolve, reject) => {
          cosClient.putBucketCors(
            {
              Bucket: bucketName,
              Region: region,
              CORSRules: remainingRules.map((r) => ({
                AllowedOrigin: r.AllowedOrigin,
                AllowedMethod: r.AllowedMethod,
                AllowedHeader: r.AllowedHeader || [],
                ExposeHeader: r.ExposeHeader || [],
                MaxAgeSeconds: r.MaxAgeSeconds || 0,
              })),
            },
            (err) => {
              if (err) reject(err);
              else resolve();
            },
          );
        });
      } else {
        await new Promise<void>((resolve, reject) => {
          cosClient.deleteBucketCors({ Bucket: bucketName, Region: region }, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
      logger.info(lang.__('COS_CORS_RULE_REMOVED', { domain }));
    } catch (error) {
      logger.warn(lang.__('COS_CORS_RULE_REMOVE_FAILED', { domain, error: String(error) }));
    }
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

    await addCorsRuleForDomain(bucketName, domain);

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
    await removeCorsRuleForDomain(bucketName, domain);

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
      // COS PutBucket accepts tags via the x-cos-tagging HTTP header, formatted
      // as URL-encoded key=value pairs joined by '&'.
      const headers: Record<string, string> = {};
      if (config.Tags && config.Tags.length > 0) {
        headers['x-cos-tagging'] = config.Tags.map(
          (t) => `${encodeURIComponent(t.Key)}=${encodeURIComponent(t.Value)}`,
        ).join('&');
      }

      // Create bucket
      await new Promise<void>((resolve, reject) => {
        cosClient.putBucket(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            ...(Object.keys(headers).length > 0 ? { Headers: headers } : {}),
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
        // Check if bucket exists. The HeadBucket response carries the bucket
        // creation date in the x-cos-creation-date header — preserved so the
        // state instance no longer reports creationDate: null.
        const headBucketData = await new Promise<HeadBucketResult>((resolve, reject) => {
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
        const creationDate = headBucketData.headers?.['x-cos-creation-date'] as string | undefined;

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
        } catch (error: unknown) {
          // A 404 or NoSuchTagSet means the bucket has no tagging config — not
          // an error. Any other failure (auth, network) must surface loudly so
          // it is not misread as "bucket not owned".
          const err = error as { code?: string; statusCode?: number; message?: string };
          const isNoTags =
            err.statusCode === 404 ||
            err.code === 'NoSuchTagSet' ||
            String(err.message ?? '').includes('NoSuchTagSet');
          if (!isNoTags) {
            throw error;
          }
        }

        // Get lifecycle configuration
        let lifecycleConfiguration: CosBucketInfo['LifecycleConfiguration'];
        try {
          const lifecycleResult = await new Promise<GetBucketLifecycleResult>((resolve, reject) => {
            cosClient.getBucketLifecycle(
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
          lifecycleConfiguration = {
            rules: lifecycleResult.Rules?.map((r) => ({
              id: r.ID,
              status: r.Status,
              prefix: typeof r.Filter?.Prefix === 'string' ? r.Filter.Prefix : undefined,
              expiration: {
                days: r.Expiration?.Days,
                date: r.Expiration?.Date,
                expiredObjectDeleteMarker: r.Expiration?.ExpiredObjectDeleteMarker,
              },
              transition: {
                days: r.Transition?.Days,
                date: r.Transition?.Date,
                storageClass: r.Transition?.StorageClass,
              },
            })),
          };
        } catch {
          // Lifecycle might not be configured
        }

        // Get logging configuration
        let loggingConfiguration: CosBucketInfo['LoggingConfiguration'];
        try {
          const loggingResult = await new Promise<GetBucketLoggingResult>((resolve, reject) => {
            cosClient.getBucketLogging(
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
          loggingConfiguration = {
            targetBucket: loggingResult.BucketLoggingStatus?.LoggingEnabled?.TargetBucket,
            targetPrefix: loggingResult.BucketLoggingStatus?.LoggingEnabled?.TargetPrefix,
          };
        } catch {
          // Logging might not be configured
        }

        // Get replication configuration
        let replicationConfiguration: CosBucketInfo['ReplicationConfiguration'];
        try {
          const replicationResult = await new Promise<GetBucketReplicationResult>(
            (resolve, reject) => {
              cosClient.getBucketReplication(
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
          replicationConfiguration = {
            role: replicationResult.ReplicationConfiguration?.Role,
            rules: replicationResult.ReplicationConfiguration?.Rules?.map((r) => ({
              id: r.ID,
              status: r.Status,
              prefix: r.Prefix,
              destination: {
                bucket: r.Destination?.Bucket,
                storageClass: r.Destination?.StorageClass,
              },
            })),
          };
        } catch {
          // Replication might not be configured
        }

        // Get server-side encryption configuration
        let sseConfiguration: CosBucketInfo['SseConfiguration'];
        try {
          const encryptionResult = await new Promise<GetBucketEncryptionResult>(
            (resolve, reject) => {
              cosClient.getBucketEncryption(
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
          const rule = encryptionResult.ServerSideEncryptionConfiguration?.Rule?.[0];
          // SDK quirk: the type declares ApplySideEncryptionConfiguration, but the
          // raw COS API returns ApplyServerSideEncryptionByDefault — read both.
          const apply =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (rule as any)?.ApplyServerSideEncryptionByDefault ??
            rule?.ApplySideEncryptionConfiguration;
          sseConfiguration = {
            sseAlgorithm: apply?.SSEAlgorithm,
            sseKmsMasterKeyId: apply?.KMSMasterKeyID,
          };
        } catch {
          // Encryption might not be configured
        }

        // Get bucket policy (cloud-effective, may differ from the definition)
        let policy: CosBucketInfo['Policy'] = null;
        try {
          const policyResult = await new Promise<{ Policy?: string }>((resolve, reject) => {
            cosClient.getBucketPolicy(
              {
                Bucket: bucketName,
                Region: region,
              },
              (err: unknown, data: unknown) => {
                if (err) reject(err);
                else resolve(data as { Policy?: string });
              },
            );
          });
          if (policyResult.Policy) {
            policy =
              typeof policyResult.Policy === 'string'
                ? JSON.parse(policyResult.Policy)
                : policyResult.Policy;
          }
        } catch (err: unknown) {
          const e = err as { statusCode?: number; code?: string };
          if (e.statusCode !== 404 && e.statusCode !== 403 && e.code !== 'NoSuchBucketPolicy') {
            throw err;
          }
        }

        return {
          Name: bucketName,
          Location: region,
          CreationDate: creationDate,
          ACL: acl,
          WebsiteConfiguration: websiteConfig,
          AccessControlPolicy: accessControlPolicy,
          CorsConfiguration: corsConfiguration,
          VersioningConfiguration: versioningConfig,
          TaggingConfiguration: taggingConfig,
          Tags: taggingConfig?.tags?.map((t) => ({ Key: t.key ?? '', Value: t.value ?? '' })),
          LifecycleConfiguration: lifecycleConfiguration,
          LoggingConfiguration: loggingConfiguration,
          ReplicationConfiguration: replicationConfiguration,
          SseConfiguration: sseConfiguration,
          Policy: policy,
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

    putBucketPolicy: async (
      bucketName: string,
      region: string,
      policy: Record<string, unknown>,
    ): Promise<void> => {
      await new Promise<void>((resolve, reject) => {
        cosClient.putBucketPolicy(
          {
            Bucket: bucketName,
            Region: region,
            Policy: policy,
          },
          (err: unknown) => {
            if (err) reject(err);
            else resolve();
          },
        );
      });
      logger.info(lang.__('COS_BUCKET_POLICY_SET', { bucketName }));
    },

    getBucketPolicy: async (
      bucketName: string,
      region: string,
    ): Promise<Record<string, unknown> | null> => {
      try {
        const result = await new Promise<{ Policy?: string }>((resolve, reject) => {
          cosClient.getBucketPolicy(
            {
              Bucket: bucketName,
              Region: region,
            },
            (err: unknown, data: unknown) => {
              if (err) reject(err);
              else resolve(data as { Policy?: string });
            },
          );
        });
        if (result.Policy) {
          return typeof result.Policy === 'string' ? JSON.parse(result.Policy) : result.Policy;
        }
        return null;
      } catch (err: unknown) {
        const e = err as { statusCode?: number; code?: string };
        if (e.statusCode === 404 || e.statusCode === 403 || e.code === 'NoSuchBucketPolicy') {
          return null;
        }
        throw err;
      }
    },

    deleteBucketPolicy: async (bucketName: string, region: string): Promise<void> => {
      try {
        // COS SDK doesn't have a direct deleteBucketPolicy method.
        // We delete by setting an empty policy.
        const emptyPolicy = {
          version: '2.0',
          statement: [],
        };
        await new Promise<void>((resolve, reject) => {
          cosClient.putBucketPolicy(
            {
              Bucket: bucketName,
              Region: region,
              Policy: emptyPolicy,
            },
            (err: unknown) => {
              if (err) reject(err);
              else resolve();
            },
          );
        });
        logger.info(lang.__('COS_BUCKET_POLICY_DELETED', { bucketName }));
      } catch {
        // Best effort cleanup
      }
    },
  };
};

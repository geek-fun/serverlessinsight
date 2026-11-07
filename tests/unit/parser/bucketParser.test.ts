import { parseBucket } from '../../../src/parser/bucketParser';
import { BucketAccessEnum, BucketRaw } from '../../../src/types';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('bucketParser', () => {
  describe('parseBucket', () => {
    it('should return undefined when buckets is falsy', () => {
      // @ts-expect-error - Testing null input
      expect(parseBucket(null)).toBeUndefined();
      // @ts-expect-error - Testing undefined input
      expect(parseBucket(undefined)).toBeUndefined();
      expect(parseBucket({})).toEqual([]);
    });

    it('should parse minimal bucket configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result).toHaveLength(1);
      expect(result?.[0]).toEqual({
        key: 'my_bucket',
        name: 'test-bucket',
        storage: undefined,
        versioning: undefined,
        security: undefined,
        accelerate: false,
        domains: undefined,
        iam: undefined,
        website: undefined,
      });
    });

    it('should parse bucket with storage configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          storage: {
            class: 'Standard',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].storage).toEqual({
        class: 'Standard',
      });
    });

    it('should parse bucket without storage configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].storage).toBeUndefined();
    });

    it('should parse bucket with versioning configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          versioning: {
            status: 'Enabled',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].versioning).toEqual({
        status: 'Enabled',
      });
    });

    it('should parse bucket without versioning configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].versioning).toBeUndefined();
    });

    it('should parse bucket with minimal security configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          security: {},
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security).toEqual({
        acl: BucketAccessEnum.PRIVATE,
        force_delete: false,
        sse_algorithm: undefined,
        sse_kms_master_key_id: undefined,
      });
    });

    it('should parse bucket with full security configuration including acl', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          security: {
            acl: 'PUBLIC_READ',
            force_delete: true,
            sse_algorithm: 'AES256',
            sse_kms_master_key_id: 'key-123',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security).toEqual({
        acl: BucketAccessEnum.PUBLIC_READ,
        force_delete: true,
        sse_algorithm: 'AES256',
        sse_kms_master_key_id: 'key-123',
      });
    });

    it('should parse bucket without acl in security', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          security: {
            force_delete: true,
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security?.acl).toBe(BucketAccessEnum.PRIVATE);
    });

    it('should parse bucket with sse_algorithm but without sse_kms_master_key_id', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          security: {
            sse_algorithm: 'AES256',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security?.sse_algorithm).toBe('AES256');
      expect(result?.[0].security?.sse_kms_master_key_id).toBeUndefined();
    });

    it('should parse bucket without security configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].security).toBeUndefined();
    });

    it('should parse bucket with website configuration (v1: no domain fields)', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website).toEqual({
        code: './dist',
        index: 'index.html',
      });
    });

    it('should parse domains list with minimal binding fields', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          domains: [{ domain_name: 'example.com' }],
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].domains).toEqual([
        {
          domain_name: 'example.com',
          certificate_id: undefined,
          certificate_body: undefined,
          certificate_private_key: undefined,
          protocol: undefined,
          cdn: undefined,
        },
      ]);
      expect(result?.[0].accelerate).toBe(false);
    });

    it('should normalize binding hostnames to lowercase (binding identity)', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          domains: [{ domain_name: '  WWW.Example.COM  ' }, { domain_name: '*.Sub.Example.com' }],
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].domains?.map((binding) => binding.domain_name)).toEqual([
        'www.example.com',
        '*.sub.example.com',
      ]);
    });

    it('should preserve template-ref binding hostnames verbatim (resolved later)', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          domains: [{ domain_name: '${vars.domain}' }],
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].domains?.[0].domain_name).toBe('${vars.domain}');
    });

    it('should parse binding with certificate_id', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          domains: [{ domain_name: 'example.com', certificate_id: 'cert-123' }],
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].domains?.[0].certificate_id).toBe('cert-123');
      expect(result?.[0].domains?.[0].certificate_body).toBeUndefined();
      expect(result?.[0].domains?.[0].certificate_private_key).toBeUndefined();
    });

    it('should parse binding with certificate_body and certificate_private_key', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          domains: [
            {
              domain_name: 'example.com',
              certificate_body: '-----BEGIN CERTIFICATE-----',
              certificate_private_key: '-----BEGIN PRIVATE KEY-----',
            },
          ],
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].domains?.[0].certificate_body).toBe('-----BEGIN CERTIFICATE-----');
      expect(result?.[0].domains?.[0].certificate_private_key).toBe('-----BEGIN PRIVATE KEY-----');
      expect(result?.[0].domains?.[0].certificate_id).toBeUndefined();
    });

    it('should not emit a protocol field on parsed bindings (removed in v1, issue #283)', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          domains: [{ domain_name: 'a.example.com', cdn: true }, { domain_name: 'b.example.com' }],
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].domains?.[0]).not.toHaveProperty('protocol');
      expect(result?.[0].domains?.[1]).not.toHaveProperty('protocol');
      expect(result?.[0].domains?.[0].cdn).toBe(true);
    });

    it('should parse bucket-level accelerate (omission restores the false default)', () => {
      const buckets: { [key: string]: BucketRaw } = {
        without_accelerate: { name: 'bucket-a', domains: [{ domain_name: 'a.example.com' }] },
        with_accelerate: {
          name: 'bucket-b',
          accelerate: true,
          domains: [{ domain_name: 'b.example.com' }],
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].accelerate).toBe(false);
      expect(result?.[1].accelerate).toBe(true);
    });

    it('should parse bucket with website configuration and custom index/error pages', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          website: {
            code: './dist',
            index: 'home.html',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website?.index).toBe('home.html');
    });

    it('should parse bucket without website configuration', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
        },
      };

      const result = parseBucket(buckets);

      expect(result?.[0].website).toBeUndefined();
    });

    it('should parse multiple buckets with different configurations', () => {
      const buckets: { [key: string]: BucketRaw } = {
        bucket1: {
          name: 'bucket-one',
          storage: { class: 'Standard' },
        },
        bucket2: {
          name: 'bucket-two',
          versioning: { status: 'Enabled' },
        },
        bucket3: {
          name: 'bucket-three',
          security: { acl: 'PUBLIC_READ' },
        },
      };

      const result = parseBucket(buckets);

      expect(result).toHaveLength(3);
      expect(result?.[0].key).toBe('bucket1');
      expect(result?.[1].key).toBe('bucket2');
      expect(result?.[2].key).toBe('bucket3');
    });

    it('should parse bucket with full configuration including all optional fields', () => {
      const buckets: { [key: string]: BucketRaw } = {
        my_bucket: {
          name: 'test-bucket',
          storage: { class: 'Standard' },
          versioning: { status: 'Enabled' },
          security: {
            acl: 'PUBLIC_READ',
            force_delete: true,
            sse_algorithm: 'AES256',
            sse_kms_master_key_id: 'key-123',
          },
          accelerate: true,
          domains: [
            {
              domain_name: 'example.com',
              certificate_id: 'cert-123',
              certificate_body: '-----BEGIN CERTIFICATE-----',
              certificate_private_key: '-----BEGIN PRIVATE KEY-----',
            },
            { domain_name: 'legacy.example.com', cdn: true },
          ],
          website: {
            code: './dist',
            index: 'index.html',
          },
        },
      };

      const result = parseBucket(buckets);

      expect(result).toHaveLength(1);
      expect(result?.[0]).toMatchObject({
        key: 'my_bucket',
        name: 'test-bucket',
        storage: { class: 'Standard' },
        versioning: { status: 'Enabled' },
        security: {
          acl: BucketAccessEnum.PUBLIC_READ,
          force_delete: true,
          sse_algorithm: 'AES256',
          sse_kms_master_key_id: 'key-123',
        },
        accelerate: true,
        domains: [
          {
            domain_name: 'example.com',
            certificate_id: 'cert-123',
            certificate_body: '-----BEGIN CERTIFICATE-----',
            certificate_private_key: '-----BEGIN PRIVATE KEY-----',
          },
          { domain_name: 'legacy.example.com', cdn: true },
        ],
        website: {
          code: './dist',
          index: 'index.html',
        },
      });
    });
  });

  describe('parseBucket with binding CDN options', () => {
    it('should parse binding with cdn: true', () => {
      const input = {
        my_bucket: {
          name: 'my-bucket',
          domains: [{ domain_name: 'cdn.example.com', cdn: true }],
        },
      };
      const result = parseBucket(input)!;
      expect(result).toHaveLength(1);
      expect(result[0].domains?.[0].domain_name).toBe('cdn.example.com');
      expect(result[0].domains?.[0].cdn).toBe(true);
    });

    it('should parse binding with cdn object config', () => {
      const input = {
        my_bucket: {
          name: 'my-bucket',
          domains: [
            {
              domain_name: 'cdn.example.com',
              cdn: {
                enabled: true,
                cdn_type: 'download',
                scope: 'global',
              },
            },
          ],
        },
      };
      const result = parseBucket(input)!;
      expect(result).toHaveLength(1);
      expect(result[0].domains?.[0].cdn).toEqual({
        enabled: true,
        cdn_type: 'download',
        scope: 'global',
      });
    });

    describe('IAM policy statements', () => {
      it('should parse iam with single statement', () => {
        const input = {
          my_bucket: {
            name: 'test-bucket',
            iam: {
              resource: {
                statements: [
                  {
                    effect: 'Allow' as const,
                    principal: { RAM: 'acs:ram::123:role/my-role' },
                    action: ['oss:PutObject', 'oss:GetObject'],
                    resource: ['acs:oss:*:*:my-bucket/*'],
                  },
                ],
              },
            },
          },
        } as never;

        const result = parseBucket(input)!;
        expect(result[0].iam).toEqual({
          resource: {
            statements: [
              {
                effect: 'Allow',
                principal: { RAM: 'acs:ram::123:role/my-role' },
                action: ['oss:PutObject', 'oss:GetObject'],
                resource: ['acs:oss:*:*:my-bucket/*'],
              },
            ],
          },
        });
      });

      it('should parse iam with condition', () => {
        const input = {
          my_bucket: {
            name: 'test-bucket',
            iam: {
              resource: {
                statements: [
                  {
                    effect: 'Deny' as const,
                    principal: { qcs: 'qcs::cam::uin/456:role/my-role' },
                    action: ['name/cos:DeleteObject'],
                    resource: ['qcs::cos:ap-beijing:uid/456:my-bucket/*'],
                    condition: {
                      ip_address: {
                        'qcs:ip': ['10.0.0.0/8'],
                      },
                    },
                  },
                ],
              },
            },
          },
        } as never;

        const result = parseBucket(input)!;
        expect(result[0].iam?.resource.statements[0].condition).toEqual({
          ip_address: {
            'qcs:ip': ['10.0.0.0/8'],
          },
        });
        expect(result[0].iam?.resource.statements[0].effect).toBe('Deny');
      });

      it('should parse iam with single string action/resource', () => {
        const input = {
          my_bucket: {
            name: 'test-bucket',
            iam: {
              resource: {
                statements: [
                  {
                    effect: 'Allow' as const,
                    principal: { RAM: 'acs:ram::123:role/my-role' },
                    action: 'oss:PutObject',
                    resource: 'acs:oss:*:*:my-bucket/*',
                  },
                ],
              },
            },
          },
        } as never;

        const result = parseBucket(input)!;
        expect(result[0].iam?.resource.statements[0].action).toEqual(['oss:PutObject']);
        expect(result[0].iam?.resource.statements[0].resource).toEqual(['acs:oss:*:*:my-bucket/*']);
      });

      it('should handle trn: principal for volcengine', () => {
        const input = {
          my_bucket: {
            name: 'test-bucket',
            iam: {
              resource: {
                statements: [
                  {
                    effect: 'Allow' as const,
                    principal: { trn: 'trn:iam:::role/my-role' },
                    action: ['tos:PutObject'],
                    resource: ['trn:tos:::my-bucket/*'],
                  },
                ],
              },
            },
          },
        } as never;

        const result = parseBucket(input)!;
        expect(result[0].iam?.resource.statements[0].principal).toEqual({
          trn: 'trn:iam:::role/my-role',
        });
      });

      it('should return undefined iam when not specified', () => {
        const input = {
          my_bucket: {
            name: 'test-bucket',
          },
        };

        const result = parseBucket(input)!;
        expect(result[0].iam).toBeUndefined();
      });

      it('should return undefined iam when iam block is present but empty', () => {
        const input = {
          my_bucket: {
            name: 'test-bucket',
            iam: {} as never,
          },
        };

        const result = parseBucket(input)!;
        expect(result[0].iam).toBeUndefined();
      });
    });
  });
});

describe('parseBucket with IAM', () => {
  it('should parse bucket with IAM policy statements', () => {
    const buckets: { [key: string]: BucketRaw } = {
      my_bucket: {
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow' as const,
                principal: { AWS: '*', Service: 'oss.aliyuncs.com' },
                action: 'oss:GetObject',
                resource: 'acs:oss:*:*:my-bucket/*',
              },
            ],
          },
        },
      },
    };

    const result = parseBucket(buckets);
    expect(result?.[0].iam).toEqual({
      resource: {
        statements: [
          {
            effect: 'Allow' as const,
            principal: { AWS: '*', Service: 'oss.aliyuncs.com' },
            action: ['oss:GetObject'],
            resource: ['acs:oss:*:*:my-bucket/*'],
          },
        ],
      },
    });
  });

  it('should parse bucket with Deny effect', () => {
    const buckets: { [key: string]: BucketRaw } = {
      my_bucket: {
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Deny' as const,
                principal: { AWS: '*' },
                action: 'oss:DeleteObject',
                resource: 'acs:oss:*:*:my-bucket/secret/*',
              },
            ],
          },
        },
      },
    };

    const result = parseBucket(buckets);
    expect(result?.[0]?.iam?.resource?.statements[0]?.effect).toBe('Deny');
  });

  it('should parse bucket with multiple actions and resources', () => {
    const buckets: { [key: string]: BucketRaw } = {
      my_bucket: {
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow' as const,
                principal: { Service: 'oss.aliyuncs.com' },
                action: ['oss:GetObject', 'oss:PutObject', 'oss:ListObjects'],
                resource: ['acs:oss:*:*:my-bucket/*', 'acs:oss:*:*:my-bucket'],
              },
            ],
          },
        },
      },
    };

    const result = parseBucket(buckets);
    expect(result?.[0]?.iam?.resource?.statements[0]?.action).toEqual([
      'oss:GetObject',
      'oss:PutObject',
      'oss:ListObjects',
    ]);
    expect(result?.[0]?.iam?.resource?.statements[0]?.resource).toEqual([
      'acs:oss:*:*:my-bucket/*',
      'acs:oss:*:*:my-bucket',
    ]);
  });

  it('should parse bucket with condition', () => {
    const buckets: { [key: string]: BucketRaw } = {
      my_bucket: {
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow' as const,
                principal: { AWS: '*' },
                action: 'oss:GetObject',
                resource: 'acs:oss:*:*:my-bucket/*',
                condition: {
                  StringEquals: {
                    'acs:SourceVpc': 'vpc-bp1hv9eam4z3b3j3z3z3z',
                  },
                },
              },
            ],
          },
        },
      },
    };

    const result = parseBucket(buckets);
    expect(result?.[0]?.iam?.resource?.statements[0]?.condition).toEqual({
      StringEquals: {
        'acs:SourceVpc': 'vpc-bp1hv9eam4z3b3j3z3z3z',
      },
    });
  });

  it('should parse bucket with multiple statements', () => {
    const buckets: { [key: string]: BucketRaw } = {
      my_bucket: {
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [
              {
                effect: 'Allow' as const,
                principal: { AWS: '*' },
                action: 'oss:GetObject',
                resource: 'acs:oss:*:*:public-bucket/*',
              },
              {
                effect: 'Deny' as const,
                principal: { AWS: '*' },
                action: 'oss:DeleteObject',
                resource: 'acs:oss:*:*:public-bucket/secret/*',
              },
            ],
          },
        },
      },
    };

    const result = parseBucket(buckets);
    expect(result?.[0]?.iam?.resource?.statements).toHaveLength(2);
    expect(result?.[0]?.iam?.resource?.statements[0]?.effect).toBe('Allow');
    expect(result?.[0]?.iam?.resource?.statements[1]?.effect).toBe('Deny');
  });

  it('should return undefined iam when not configured', () => {
    const buckets: { [key: string]: BucketRaw } = {
      my_bucket: {
        name: 'test-bucket',
      },
    };

    const result = parseBucket(buckets);
    expect(result?.[0]?.iam).toBeUndefined();
  });

  it('should return iam with empty statements array when specified', () => {
    const buckets: { [key: string]: BucketRaw } = {
      my_bucket: {
        name: 'test-bucket',
        iam: {
          resource: {
            statements: [],
          },
        },
      },
    };

    const result = parseBucket(buckets);
    expect(result?.[0]?.iam).toEqual({ resource: { statements: [] } });
  });
});

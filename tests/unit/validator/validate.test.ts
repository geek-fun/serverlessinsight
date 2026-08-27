import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { parse } from 'yaml';
import { ServerlessIacRaw } from '../../../src/types';
import { validateYaml } from '../../../src/validator';
import { ProviderEnum } from '../../../src/common';

const jsonIac = parse(
  readFileSync(path.resolve(__dirname, '../../fixtures/serverless-insight.yml'), 'utf8'),
) as ServerlessIacRaw;

describe('unit test for validate', () => {
  it('should pass the yaml validation when given yaml config is valid', () => {
    expect(validateYaml(jsonIac)).toBe(true);
  });
  it('should throw error when given version in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      version: '1.0.0',
    };
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when backend.region is passed', () => {
    const invalidYaml = {
      ...jsonIac,
      backend: {
        state_manager: {
          type: 'BUCKET_STORE',
          bucket: 'my-bucket',
          key: 'state.json',
          region: 'cn-hangzhou',
        },
      },
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });
  it('should pass validation when backend is configured without region', () => {
    const validYaml = {
      ...jsonIac,
      backend: {
        state_manager: {
          type: 'BUCKET_STORE',
          bucket: 'my-bucket',
          key: 'state.json',
        },
      },
    } as unknown as ServerlessIacRaw;
    expect(validateYaml(validYaml)).toBe(true);
  });

  it('should throw error when given provider in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      provider: {
        name: 'aws',
        region: 'us-west-2',
      },
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when provider region is missing', () => {
    const invalidYaml = {
      ...jsonIac,
      provider: {
        name: 'aliyun',
      },
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when aliyun region is not a valid region id', () => {
    const invalidYaml = {
      ...jsonIac,
      provider: {
        name: 'aliyun',
        region: 'singapore',
      },
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should pass validation for huawei with a valid-looking region id', () => {
    const huaweiYaml = {
      version: '0.0.1',
      app: 'demo-app',
      provider: {
        name: 'huawei',
        region: 'cn-north-4',
      },
      service: 'demo',
    } as unknown as ServerlessIacRaw;
    expect(validateYaml(huaweiYaml)).toBe(true);
  });

  it('should throw error when given service in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      service: null,
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when given vars in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      vars: {
        stage: null,
      },
    };
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when given stages in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      stages: {
        dev: {
          memory: 128,
          timeout: 30,
          environment: {
            NODE_ENV: 'dev',
          },
        },
      },
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when given tags in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      tags: {
        stage: null,
      },
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when given functions in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      functions: {
        hello: {
          fc_name: 'hello',
          runtime: 'nodejs14',
          handler: 'index.handler',
          code: 'src',
          memory: 128,
          timeout: 30,
          environment: {
            NODE_ENV: 'dev',
          },
        },
      },
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when security group rule uses protocol:port:cidr format', () => {
    const invalidYaml = {
      ...jsonIac,
      functions: {
        insight_poc_fn: jsonIac.functions.insight_poc_fn,
        test_fn: {
          name: 'test-fn',
          code: {
            runtime: 'nodejs18',
            handler: 'index.handler',
            path: 'tests/fixtures/artifacts/artifact.zip',
          },
          network: {
            vpc_id: 'vpc-123',
            subnet_ids: ['vsw-123'],
            security_group: {
              name: 'test-sg',
              ingress: ['TCP:5432/5432:10.0.0.0/8'],
              egress: ['TCP:443:0.0.0.0/0'],
            },
          },
        },
      },
    } as unknown as ServerlessIacRaw;

    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should pass when security group rules use protocol:cidr:port format', () => {
    const validYaml = {
      ...jsonIac,
      functions: {
        insight_poc_fn: jsonIac.functions.insight_poc_fn,
        test_fn: {
          name: 'test-fn',
          code: {
            runtime: 'nodejs18',
            handler: 'index.handler',
            path: 'tests/fixtures/artifacts/artifact.zip',
          },
          network: {
            vpc_id: 'vpc-123',
            subnet_ids: ['vsw-123'],
            security_group: {
              name: 'test-sg',
              ingress: ['TCP:10.0.0.0/8:5432/5432'],
              egress: ['TCP:0.0.0.0/0:443'],
            },
          },
        },
      },
    } as unknown as ServerlessIacRaw;

    expect(validateYaml(validYaml)).toBe(true);
  });

  it('should pass for ingress rules using TCP and ICMP with ALL', () => {
    const validYaml = {
      ...jsonIac,
      functions: {
        insight_poc_fn: jsonIac.functions.insight_poc_fn,
        test_fn: {
          name: 'test-fn',
          code: {
            runtime: 'nodejs18',
            handler: 'index.handler',
            path: 'tests/fixtures/artifacts/artifact.zip',
          },
          network: {
            vpc_id: 'vpc-123',
            subnet_ids: ['vsw-123'],
            security_group: {
              name: 'test-sg',
              ingress: [
                'TCP:0.0.0.0/0:80',
                'TCP:0.0.0.0/0:443',
                'TCP:0.0.0.0/0:22/22',
                'ICMP:0.0.0.0/0:ALL',
              ],
              egress: ['ALL:0.0.0.0/0:ALL'],
            },
          },
        },
      },
    } as unknown as ServerlessIacRaw;

    expect(validateYaml(validYaml)).toBe(true);
  });

  it('should throw error when given events in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      events: {
        hello: {
          type: 'http',
          source: 'gateway',
          function: 'hello',
          target: 'hello',
        },
      },
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when functions are not specified', () => {
    const invalidYaml = {
      ...jsonIac,
      functions: null,
    } as unknown as ServerlessIacRaw;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  describe('template references validation', () => {
    it('should pass validation when memory is a template reference', () => {
      const yamlWithTemplateRef = {
        ...jsonIac,
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs18',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
            memory: '${stages.memory}',
            timeout: 10,
          },
        },
      };
      expect(validateYaml(yamlWithTemplateRef)).toBe(true);
    });

    it('should pass validation when timeout is a template reference', () => {
      const yamlWithTemplateRef = {
        ...jsonIac,
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs18',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
            memory: 128,
            timeout: '${vars.timeout}',
          },
        },
      };
      expect(validateYaml(yamlWithTemplateRef)).toBe(true);
    });

    it('should pass validation when log is a template reference', () => {
      const yamlWithTemplateRef = {
        ...jsonIac,
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs18',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
            log: '${vars.enable_log}',
          },
        },
      };
      expect(validateYaml(yamlWithTemplateRef)).toBe(true);
    });

    it('should pass validation when gpu is a template reference', () => {
      const yamlWithTemplateRef = {
        ...jsonIac,
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs18',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
            gpu: '${stages.gpu_type}',
          },
        },
      };
      expect(validateYaml(yamlWithTemplateRef)).toBe(true);
    });

    it('should pass validation when runtime is a template reference', () => {
      const yamlWithTemplateRef = {
        ...jsonIac,
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: '${vars.runtime}',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      };
      expect(validateYaml(yamlWithTemplateRef)).toBe(true);
    });

    it('should reject invalid template reference patterns', () => {
      const yamlWithInvalidRef = {
        ...jsonIac,
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs18',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
            memory: '${invalid.memory}', // invalid prefix
          },
        },
      };
      expect(() => validateYaml(yamlWithInvalidRef)).toThrow('Invalid yaml');
    });

    it('should reject non-template-ref strings for numeric fields', () => {
      const yamlWithInvalidRef = {
        ...jsonIac,
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs18',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
            memory: 'not-a-ref-or-number',
          },
        },
      };
      expect(() => validateYaml(yamlWithInvalidRef)).toThrow('Invalid yaml');
    });
  });

  describe('provider-based runtime validation', () => {
    it('should pass validation when runtime is supported by provider', () => {
      const validYaml = {
        ...jsonIac,
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs18',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      };
      expect(validateYaml(validYaml)).toBe(true);
    });

    it('should throw error when runtime is not supported by Aliyun provider', () => {
      const invalidYaml = {
        ...jsonIac,
        provider: {
          name: ProviderEnum.ALIYUN,
          region: 'cn-hangzhou',
        },
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs24',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      };
      expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
      expect(() => validateYaml(invalidYaml)).toThrow(
        "runtime 'nodejs24' is not supported by provider 'aliyun'",
      );
    });

    it('should throw error when runtime is not supported by Tencent provider', () => {
      const invalidYaml = {
        ...jsonIac,
        provider: {
          name: ProviderEnum.TENCENT,
          region: 'ap-guangzhou',
        },
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs20',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      };
      expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
      expect(() => validateYaml(invalidYaml)).toThrow(
        "runtime 'nodejs20' is not supported by provider 'tencent'",
      );
    });

    it('should throw error when runtime is not supported by AWS provider', () => {
      const invalidYaml = {
        ...jsonIac,
        provider: {
          name: ProviderEnum.AWS,
          region: 'us-east-1',
        },
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'nodejs18',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      };
      expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
      expect(() => validateYaml(invalidYaml)).toThrow(
        "runtime 'nodejs18' is not supported by provider 'aws'",
      );
    });

    it('should pass validation when runtime is template reference', () => {
      const validYaml = {
        ...jsonIac,
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: '${vars.runtime}',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      };
      expect(validateYaml(validYaml)).toBe(true);
    });

    it('should validate all functions when multiple functions defined', () => {
      const invalidYaml = {
        ...jsonIac,
        provider: {
          name: ProviderEnum.ALIYUN,
          region: 'cn-hangzhou',
        },
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn1: {
            name: 'test-fn1',
            code: {
              runtime: 'nodejs18',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
          test_fn2: {
            name: 'test-fn2',
            code: {
              runtime: 'nodejs24',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      };
      expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
      expect(() => validateYaml(invalidYaml)).toThrow(
        "runtime 'nodejs24' is not supported by provider 'aliyun'",
      );
    });

    it('should pass validation when provider supports Python 3.10', () => {
      const validYaml = {
        ...jsonIac,
        provider: {
          name: ProviderEnum.ALIYUN,
          region: 'cn-hangzhou',
        },
        functions: {
          insight_poc_fn: jsonIac.functions.insight_poc_fn,
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'python3.10',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      };
      expect(validateYaml(validYaml)).toBe(true);
    });

    it('should validate cross-provider runtime compatibility', () => {
      const aliyunYaml = {
        ...jsonIac,
        provider: {
          name: ProviderEnum.ALIYUN,
          region: 'cn-hangzhou',
        },
        functions: {
          // insight_poc_fn carried over for resolvable backend refs; runtime kept AWS/Tencent-compatible.
          insight_poc_fn: {
            ...jsonIac.functions.insight_poc_fn,
            code: { ...jsonIac.functions.insight_poc_fn.code, runtime: '${vars.function_runtime}' },
          },
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'java8',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(aliyunYaml)).toBe(true);

      const tencentYaml = {
        ...aliyunYaml,
        provider: {
          name: ProviderEnum.TENCENT,
          region: 'ap-guangzhou',
        },
      };
      expect(validateYaml(tencentYaml)).toBe(true);

      const awsYaml = {
        ...aliyunYaml,
        provider: {
          name: ProviderEnum.AWS,
          region: 'us-east-1',
        },
      };
      expect(validateYaml(awsYaml)).toBe(true);
    });
  });

  describe('certificate validation', () => {
    it('should pass validation for event domain with certificate_body and certificate_private_key', () => {
      const validYaml = {
        ...jsonIac,
        events: {
          gateway_event: {
            type: 'API_GATEWAY',
            name: 'test-gateway',
            triggers: [
              { method: 'GET', path: '/api/hello', backend: '${functions.insight_poc_fn}' },
            ],
            domain: {
              domain_name: 'example.com',
              certificate_body: '-----BEGIN CERTIFICATE-----\nMIIB...',
              certificate_private_key: '-----BEGIN PRIVATE KEY-----\nMIIE...',
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(validYaml)).toBe(true);
    });

    it('should pass validation for event domain with certificate_id', () => {
      const validYaml = {
        ...jsonIac,
        events: {
          gateway_event: {
            type: 'API_GATEWAY',
            name: 'test-gateway',
            triggers: [
              { method: 'GET', path: '/api/hello', backend: '${functions.insight_poc_fn}' },
            ],
            domain: {
              domain_name: 'example.com',
              certificate_id: 'cas-abc123',
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(validYaml)).toBe(true);
    });

    it('should fail when both certificate_body and certificate_id are provided in event domain', () => {
      const invalidYaml = {
        ...jsonIac,
        events: {
          gateway_event: {
            type: 'API_GATEWAY',
            name: 'test-gateway',
            triggers: [
              { method: 'GET', path: '/api/hello', backend: '${functions.insight_poc_fn}' },
            ],
            domain: {
              domain_name: 'example.com',
              certificate_body: '-----BEGIN CERTIFICATE-----\nMIIB...',
              certificate_private_key: '-----BEGIN PRIVATE KEY-----\nMIIE...',
              certificate_id: 'cas-abc123',
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
    });

    it('should fail when certificate_body is provided without certificate_private_key in event domain', () => {
      const invalidYaml = {
        ...jsonIac,
        events: {
          gateway_event: {
            type: 'API_GATEWAY',
            name: 'test-gateway',
            triggers: [
              { method: 'GET', path: '/api/hello', backend: '${functions.insight_poc_fn}' },
            ],
            domain: {
              domain_name: 'example.com',
              certificate_body: '-----BEGIN CERTIFICATE-----\nMIIB...',
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
    });

    it('should fail when certificate_private_key is provided without certificate_body in event domain', () => {
      const invalidYaml = {
        ...jsonIac,
        events: {
          gateway_event: {
            type: 'API_GATEWAY',
            name: 'test-gateway',
            triggers: [
              { method: 'GET', path: '/api/hello', backend: '${functions.insight_poc_fn}' },
            ],
            domain: {
              domain_name: 'example.com',
              certificate_private_key: '-----BEGIN PRIVATE KEY-----\nMIIE...',
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
    });

    it('should fail when top-level certificates block is provided', () => {
      const invalidYaml = {
        ...jsonIac,
        certificates: {
          my_cert: {
            certificate_id: 'cas-abc123',
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
    });

    it('should pass validation with template references in event domain cert fields', () => {
      const validYaml = {
        ...jsonIac,
        events: {
          gateway_event: {
            type: 'API_GATEWAY',
            name: 'test-gateway',
            triggers: [
              { method: 'GET', path: '/api/hello', backend: '${functions.insight_poc_fn}' },
            ],
            domain: {
              domain_name: 'example.com',
              certificate_id: '${vars.cert_id}',
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(validYaml)).toBe(true);
    });

    it('should pass validation with protocol array in event domain', () => {
      const validYaml = {
        ...jsonIac,
        events: {
          gateway_event: {
            type: 'API_GATEWAY',
            name: 'test-gateway',
            triggers: [
              { method: 'GET', path: '/api/hello', backend: '${functions.insight_poc_fn}' },
            ],
            domain: {
              domain_name: 'example.com',
              protocol: ['HTTP', 'HTTPS'],
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(validYaml)).toBe(true);
    });

    it('should pass validation with structured domain and cert fields in bucket website', () => {
      const validYaml = {
        ...jsonIac,
        buckets: {
          my_bucket: {
            name: 'test-bucket',
            website: {
              code: './dist',
              domain: {
                domain_name: 'static.example.com',
                certificate_body: './certs/server.crt',
                certificate_private_key: './certs/server.key',
                protocol: 'HTTPS',
              },
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(validYaml)).toBe(true);
    });

    it('should pass validation with plain string domain in bucket website', () => {
      const validYaml = {
        ...jsonIac,
        buckets: {
          my_bucket: {
            name: 'test-bucket',
            website: {
              code: './dist',
              domain: 'static.example.com',
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(validYaml)).toBe(true);
    });

    describe('iam validation', () => {
      it('accepts iam with role as string', () => {
        const validYaml = {
          ...jsonIac,
          functions: {
            insight_poc_fn: jsonIac.functions.insight_poc_fn,
            test_fn: {
              name: 'test-fn',
              code: {
                runtime: 'nodejs18',
                handler: 'index.handler',
                path: 'tests/fixtures/artifacts/artifact.zip',
              },
              iam: {
                role: 'acs:ram::123456789:role/my-role',
              },
            },
          },
        } as unknown as ServerlessIacRaw;
        expect(validateYaml(validYaml)).toBe(true);
      });

      it('accepts iam with role as object with name', () => {
        const validYaml = {
          ...jsonIac,
          functions: {
            insight_poc_fn: jsonIac.functions.insight_poc_fn,
            test_fn: {
              name: 'test-fn',
              code: {
                runtime: 'nodejs18',
                handler: 'index.handler',
                path: 'tests/fixtures/artifacts/artifact.zip',
              },
              iam: {
                role: {
                  name: 'my-custom-role',
                },
              },
            },
          },
        } as unknown as ServerlessIacRaw;
        expect(validateYaml(validYaml)).toBe(true);
      });

      it('accepts iam with role object with managed_policies', () => {
        const validYaml = {
          ...jsonIac,
          functions: {
            insight_poc_fn: jsonIac.functions.insight_poc_fn,
            test_fn: {
              name: 'test-fn',
              code: {
                runtime: 'nodejs18',
                handler: 'index.handler',
                path: 'tests/fixtures/artifacts/artifact.zip',
              },
              iam: {
                role: {
                  managed_policies: ['AliyunOSSFullAccess', 'AliyunLogFullAccess'],
                },
              },
            },
          },
        } as unknown as ServerlessIacRaw;
        expect(validateYaml(validYaml)).toBe(true);
      });

      it('accepts iam with role object with statements', () => {
        const validYaml = {
          ...jsonIac,
          functions: {
            insight_poc_fn: jsonIac.functions.insight_poc_fn,
            test_fn: {
              name: 'test-fn',
              code: {
                runtime: 'nodejs18',
                handler: 'index.handler',
                path: 'tests/fixtures/artifacts/artifact.zip',
              },
              iam: {
                role: {
                  statements: [
                    {
                      effect: 'Allow',
                      action: ['log:PostLogStoreLogs'],
                      resource: ['acs:log:*:*:project/*/logstore/*'],
                    },
                  ],
                },
              },
            },
          },
        } as unknown as ServerlessIacRaw;
        expect(validateYaml(validYaml)).toBe(true);
      });

      it('accepts iam with role object with all fields', () => {
        const validYaml = {
          ...jsonIac,
          functions: {
            insight_poc_fn: jsonIac.functions.insight_poc_fn,
            test_fn: {
              name: 'test-fn',
              code: {
                runtime: 'nodejs18',
                handler: 'index.handler',
                path: 'tests/fixtures/artifacts/artifact.zip',
              },
              iam: {
                role: {
                  name: 'my-custom-role',
                  managed_policies: ['AliyunOSSFullAccess'],
                  statements: [
                    {
                      sid: 'AllowLog',
                      effect: 'Allow',
                      action: ['log:PostLogStoreLogs'],
                      resource: ['*'],
                    },
                    {
                      effect: 'Deny',
                      action: ['oss:DeleteBucket'],
                      resource: ['acs:oss:*:*:my-bucket'],
                    },
                  ],
                },
              },
            },
          },
        } as unknown as ServerlessIacRaw;
        expect(validateYaml(validYaml)).toBe(true);
      });

      it('omitting iam is valid (regression)', () => {
        const validYaml = {
          ...jsonIac,
          functions: {
            insight_poc_fn: jsonIac.functions.insight_poc_fn,
            test_fn: {
              name: 'test-fn',
              code: {
                runtime: 'nodejs18',
                handler: 'index.handler',
                path: 'tests/fixtures/artifacts/artifact.zip',
              },
            },
          },
        } as unknown as ServerlessIacRaw;
        expect(validateYaml(validYaml)).toBe(true);
      });

      it('rejects old top-level iam.statements format', () => {
        const invalidYaml = {
          ...jsonIac,
          functions: {
            insight_poc_fn: jsonIac.functions.insight_poc_fn,
            test_fn: {
              name: 'test-fn',
              code: {
                runtime: 'nodejs18',
                handler: 'index.handler',
                path: 'tests/fixtures/artifacts/artifact.zip',
              },
              iam: {
                statements: [
                  {
                    effect: 'Allow',
                    actions: ['log:PostLogStoreLogs'],
                    resources: ['*'],
                  },
                ],
              },
            },
          },
        } as unknown as ServerlessIacRaw;
        expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
      });

      it('rejects invalid effect in statements', () => {
        const invalidYaml = {
          ...jsonIac,
          functions: {
            insight_poc_fn: jsonIac.functions.insight_poc_fn,
            test_fn: {
              name: 'test-fn',
              code: {
                runtime: 'nodejs18',
                handler: 'index.handler',
                path: 'tests/fixtures/artifacts/artifact.zip',
              },
              iam: {
                role: {
                  statements: [
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    { effect: 'Grant', action: ['log:PostLogStoreLogs'], resource: ['*'] } as any,
                  ],
                },
              },
            },
          },
        } as unknown as ServerlessIacRaw;
        expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
      });

      it('rejects unknown property in role object', () => {
        const invalidYaml = {
          ...jsonIac,
          functions: {
            insight_poc_fn: jsonIac.functions.insight_poc_fn,
            test_fn: {
              name: 'test-fn',
              code: {
                runtime: 'nodejs18',
                handler: 'index.handler',
                path: 'tests/fixtures/artifacts/artifact.zip',
              },
              iam: {
                role: {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  unknown_field: 'value' as any,
                },
              },
            },
          },
        } as unknown as ServerlessIacRaw;
        expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
      });
    });

    it('should fail when both certificate_id and certificate_body are provided in bucket domain', () => {
      const invalidYaml = {
        ...jsonIac,
        buckets: {
          my_bucket: {
            name: 'test-bucket',
            website: {
              code: './dist',
              domain: {
                domain_name: 'static.example.com',
                certificate_id: 'cas-abc123',
                certificate_body: './certs/server.crt',
                certificate_private_key: './certs/server.key',
              },
            },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
    });
  });

  describe('identifier constraints (issue #222)', () => {
    const overrideTrigger = (trigger: Record<string, unknown>) =>
      ({
        ...jsonIac,
        events: {
          gateway_event: {
            ...jsonIac.events.gateway_event,
            triggers: [trigger],
          },
        },
      }) as unknown as ServerlessIacRaw;

    it('accepts trigger paths starting with a slash including wildcards', () => {
      expect(validateYaml(overrideTrigger({ method: 'ANY', path: '/api/*', backend: 'fn' }))).toBe(
        true,
      );
    });

    it('rejects trigger paths without a leading slash', () => {
      expect(() =>
        validateYaml(overrideTrigger({ method: 'GET', path: 'api/hello', backend: 'fn' })),
      ).toThrow('Invalid yaml');
    });

    it('accepts whole template references in constrained string fields', () => {
      expect(
        validateYaml(overrideTrigger({ method: 'GET', path: '${vars.base_path}', backend: 'fn' })),
      ).toBe(true);
    });

    it('rejects invalid hostnames in event domain', () => {
      const invalidYaml = {
        ...jsonIac,
        events: {
          gateway_event: {
            ...jsonIac.events.gateway_event,
            triggers: [{ method: 'GET', path: '/api/hello', backend: 'fn' }],
            domain: { domain_name: '-bad-host-.example.com' },
          },
        },
      } as unknown as ServerlessIacRaw;
      expect(() => validateYaml(invalidYaml)).toThrow(/must match the pattern|Invalid yaml/);
    });

    it('accepts dotted bucket names within the provider length limit', () => {
      const config = {
        ...jsonIac,
        buckets: { my_bucket: { name: 'my.bucket.name' } },
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(config)).toBe(true);
    });

    it('accepts whole template references as bucket names (resolved post-validation)', () => {
      const config = {
        ...jsonIac,
        buckets: { my_bucket: { name: '${vars.bucket_name}' } },
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(config)).toBe(true);
    });

    it('rejects dotted bucket names exceeding 63 chars', () => {
      const overLong = `${'a'.repeat(55)}.example.com`;
      const config = {
        ...jsonIac,
        buckets: { my_bucket: { name: overLong } },
      } as unknown as ServerlessIacRaw;
      expect(() => validateYaml(config)).toThrow('Invalid yaml');
    });

    it('rejects hyphen-terminated labels in dotted bucket names', () => {
      const config = {
        ...jsonIac,
        buckets: { my_bucket: { name: 'foo-.example.com' } },
      } as unknown as ServerlessIacRaw;
      expect(() => validateYaml(config)).toThrow('Invalid yaml');
    });

    it('enforces provider-specific function name lengths via if/then (aliyun 64)', () => {
      const overLong = 'a'.repeat(65);
      const config = {
        ...jsonIac,
        provider: { name: 'aliyun', region: 'cn-hangzhou' },
        functions: {
          insight_poc_fn: { ...jsonIac.functions.insight_poc_fn, name: overLong },
        },
        events: {},
      } as unknown as ServerlessIacRaw;

      let thrownError: unknown;
      try {
        validateYaml(config);
      } catch (error) {
        thrownError = error;
      }
      expect((thrownError as Error).message).toContain('must NOT have more than 64 characters');
    });

    it('does not enforce function name limits for providers without a defined limit', () => {
      const longName = 'a'.repeat(100);
      const config = {
        ...jsonIac,
        provider: { name: 'aws', region: 'us-east-1' },
        functions: {
          insight_poc_fn: {
            ...jsonIac.functions.insight_poc_fn,
            name: longName,
            code: { ...jsonIac.functions.insight_poc_fn.code, runtime: '${vars.function_runtime}' },
          },
        },
        events: {},
      } as unknown as ServerlessIacRaw;
      expect(validateYaml(config)).toBe(true);
    });

    it('accumulates multiple constraint violations into one error set', () => {
      const config = {
        ...jsonIac,
        events: {
          gateway_event: {
            ...jsonIac.events.gateway_event,
            triggers: [
              { method: 'GET', path: 'no-leading-slash', backend: 'fn' },
              {
                method: 'GET',
                path: '/dup',
                backend: 'fn',
              },
              { method: 'GET', path: '/dup', backend: 'fn' },
              { method: 'GET', path: '/dup/', backend: 'fn' },
            ],
          },
        },
      } as unknown as ServerlessIacRaw;

      let thrownError: unknown;
      try {
        validateYaml(config);
      } catch (error) {
        thrownError = error;
      }

      const keywords = JSON.stringify(
        (thrownError as { errors?: Array<{ keyword?: string }> }).errors ?? [],
      );
      expect(keywords).toContain('pattern');
      expect(keywords).toContain('duplicateTrigger');
      expect(keywords).toContain('duplicateGeneratedApiName');
    });
  });
});

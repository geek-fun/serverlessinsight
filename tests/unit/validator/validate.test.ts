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
          test_fn: {
            name: 'test-fn',
            code: {
              runtime: 'java8',
              handler: 'index.handler',
              path: 'tests/fixtures/artifacts/artifact.zip',
            },
          },
        },
      };
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
});

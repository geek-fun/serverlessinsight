import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { parse } from 'yaml';
import { ServerlessIacRaw } from '../../src/types';
import { validateYaml } from '../../src/validator';
import { ProviderEnum } from '../../src/common';

const jsonIac = parse(
  readFileSync(path.resolve(__dirname, '../fixtures/serverless-insight.yml'), 'utf8'),
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
});

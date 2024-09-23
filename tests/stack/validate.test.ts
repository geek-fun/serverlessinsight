import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { parse } from 'yaml';
import { validateYaml } from '../../src/stack';
import { RawServerlessIac } from '../../src/types';

const jsonIac = parse(
  readFileSync(path.resolve(__dirname, '../fixtures/serverless-insignt.yml'), 'utf8'),
) as RawServerlessIac;

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
    } as unknown as RawServerlessIac;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when given service in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      service: null,
    } as unknown as RawServerlessIac;
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
    } as unknown as RawServerlessIac;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when given tags in yaml config is invalid', () => {
    const invalidYaml = {
      ...jsonIac,
      tags: {
        stage: null,
      },
    } as unknown as RawServerlessIac;
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
    } as unknown as RawServerlessIac;
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
    } as unknown as RawServerlessIac;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });

  it('should throw error when functions are not specified', () => {
    const invalidYaml = {
      ...jsonIac,
      functions: null,
    } as unknown as RawServerlessIac;
    expect(() => validateYaml(invalidYaml)).toThrow('Invalid yaml');
  });
});

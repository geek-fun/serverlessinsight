import {
  mergePolicyStatements,
  parseBuiltInStatements,
  buildPolicyDocument,
} from '../../../src/common/iamStatements';
import type { IamStatement } from '../../../src/common/iamStatements';

type NativeStatement = { Effect: string; Action: string[]; Resource: string; Sid?: string };

const toNative = (stmt: IamStatement): NativeStatement => {
  const native: NativeStatement = {
    Effect: stmt.effect,
    Action: stmt.actions,
    Resource: stmt.resources.join(','),
  };
  if (stmt.sid) {
    native.Sid = stmt.sid;
  }
  return native;
};

describe('iamStatements', () => {
  describe('mergePolicyStatements', () => {
    it('merges built-in + custom preserving order', () => {
      const builtIn: NativeStatement[] = [
        { Effect: 'Allow', Action: ['fc:InvokeFunction'], Resource: '*' },
        { Effect: 'Allow', Action: ['log:PostLogStoreLogs'], Resource: '*' },
      ];
      const custom: IamStatement[] = [
        { effect: 'Allow', actions: ['ecs:DescribeInstances'], resources: ['*'] },
        { effect: 'Deny', actions: ['oss:DeleteBucket'], resources: ['*'] },
      ];

      const result = mergePolicyStatements(builtIn, custom, toNative);

      expect(result).toHaveLength(4);
      expect(result[0]).toEqual(builtIn[0]);
      expect(result[1]).toEqual(builtIn[1]);
      expect(result[2]).toEqual({
        Effect: 'Allow',
        Action: ['ecs:DescribeInstances'],
        Resource: '*',
      });
      expect(result[3]).toEqual({
        Effect: 'Deny',
        Action: ['oss:DeleteBucket'],
        Resource: '*',
      });
    });

    it('returns only built-in when custom undefined', () => {
      const builtIn: NativeStatement[] = [
        { Effect: 'Allow', Action: ['fc:InvokeFunction'], Resource: '*' },
      ];

      const result = mergePolicyStatements(builtIn, undefined, toNative);

      expect(result).toHaveLength(1);
      expect(result).toEqual(builtIn);
    });

    it('returns only built-in when custom empty array', () => {
      const builtIn: NativeStatement[] = [
        { Effect: 'Allow', Action: ['fc:InvokeFunction'], Resource: '*' },
      ];

      const result = mergePolicyStatements(builtIn, [], toNative);

      expect(result).toHaveLength(1);
      expect(result).toEqual(builtIn);
    });

    it('maps Sid to native statement when present', () => {
      const builtIn: NativeStatement[] = [];
      const custom: IamStatement[] = [
        { sid: 'CustomS3Access', effect: 'Allow', actions: ['s3:GetObject'], resources: ['*'] },
      ];

      const result = mergePolicyStatements(builtIn, custom, toNative);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        Effect: 'Allow',
        Action: ['s3:GetObject'],
        Resource: '*',
        Sid: 'CustomS3Access',
      });
    });

    it('omits Sid field when undefined', () => {
      const builtIn: NativeStatement[] = [];
      const custom: IamStatement[] = [
        { effect: 'Allow', actions: ['s3:GetObject'], resources: ['*'] },
      ];

      const result = mergePolicyStatements(builtIn, custom, toNative);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        Effect: 'Allow',
        Action: ['s3:GetObject'],
        Resource: '*',
      });
      expect((result[0] as NativeStatement).Sid).toBeUndefined();
    });
  });

  describe('parseBuiltInStatements', () => {
    it('extracts Statement array from policy JSON', () => {
      const policyJson = JSON.stringify({
        Version: '1',
        Statement: [{ Effect: 'Allow', Action: ['fc:InvokeFunction'], Resource: '*' }],
      });

      const result = parseBuiltInStatements(policyJson);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        Effect: 'Allow',
        Action: ['fc:InvokeFunction'],
        Resource: '*',
      });
    });
  });

  describe('buildPolicyDocument', () => {
    it('includes Version when provided', () => {
      const statements = [{ Effect: 'Allow', Action: ['fc:InvokeFunction'], Resource: '*' }];

      const result = buildPolicyDocument(statements, { version: '1' });

      expect(JSON.parse(result)).toEqual({
        Version: '1',
        Statement: [{ Effect: 'Allow', Action: ['fc:InvokeFunction'], Resource: '*' }],
      });
    });

    it('omits Version when not provided', () => {
      const statements = [{ Effect: 'Allow', Action: ['vefaas:*'], Resource: '*' }];

      const result = buildPolicyDocument(statements);

      expect(result).toBe(
        JSON.stringify({
          Statement: statements,
        }),
      );
    });
  });
});

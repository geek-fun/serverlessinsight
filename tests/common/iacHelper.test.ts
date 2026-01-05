import * as ros from '@alicloud/ros-cdk-core';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import { getFileSource, calcRefs, calcValue, formatRosId, logger } from '../../src/common';
import { lang } from '../../src/lang';
import fs from 'node:fs';
import path from 'node:path';
import { context } from '../fixtures/contextFixture';

jest.mock('@alicloud/ros-cdk-ossdeployment');
jest.mock('@alicloud/ros-cdk-core');
const fcName = 'testFunction';
const location = 'tests/fixtures/artifacts/artifact.zip';

describe('Unit test for iacHelper', () => {
  beforeAll(() => {
    // Set locale to English for consistent test messages
    lang.setLocale('en');
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('Unit test for getFileSource', () => {
    it('should return the correct ossDeployment source', () => {
      getFileSource(fcName, location);
      expect(ossDeployment.Source.asset).toHaveBeenCalledWith(
        path.resolve(process.cwd(), location),
        { deployTime: true },
        `${fcName}/db8b704aa697d0cbab4671e99d750f25-`,
      );
    });

    it('should throw an error if the path is a directory', () => {
      jest.spyOn(fs, 'lstatSync').mockReturnValue({ isDirectory: () => true } as fs.Stats);

      expect(() => getFileSource(fcName, location)).toThrow(
        'The provided path is a directory, not a file.',
      );
    });
  });

  describe('Unit test for calcRefers', () => {
    it('should return the value if it does not contain any reference', () => {
      const value = 'testValue';
      expect(calcRefs(value, context)).toEqual(value);
      expect(ros.Fn.ref).not.toHaveBeenCalled();
    });

    it('should return the value if it contains a stage reference', () => {
      const value = 'testValue-${ctx.stage}';
      expect(calcRefs(value, context)).toEqual('testValue-test');

      expect(ros.Fn.ref).not.toHaveBeenCalled();
    });

    it('should return the value if it match a vars reference', () => {
      calcRefs('${vars.testVar}', context);

      expect(ros.Fn.ref).toHaveBeenCalledWith('testVar');
    });

    it('should return the value if it match a stages reference', () => {
      calcRefs('${stages.testStage}', context);
      expect(ros.Fn.findInMap).toHaveBeenCalledWith('stages', 'test', 'testStage');
    });

    it('should return the value if it contains a stages reference', () => {
      calcRefs('abcd-${stages.testVar}-efg', context);

      expect(ros.Fn.sub).toHaveBeenCalledWith('abcd-${testVar}-efg');
    });

    it('should return the value if it contains both stages reference and vars references', () => {
      calcRefs('abcd-${stages.testVar}-efg-${vars.newTestVar}-hij', context);

      expect(ros.Fn.sub).toHaveBeenCalledWith('abcd-${testVar}-efg-${newTestVar}-hij');
    });

    it('should return the value if it contains a functions reference', () => {
      calcRefs('${functions.testFunction}', context);

      expect(ros.Fn.getAtt).toHaveBeenCalledWith('testFunction', 'FunctionName');
    });
  });

  describe('Unit test for calcValue', () => {
    it('should return the value when raw string match vars', () => {
      const value = calcValue('${vars.handler}', context);

      expect(value).toEqual('index.handler');
    });

    it('should return the value when raw string contains vars', () => {
      const value = calcValue('test-${vars.testVar}-value', context);

      expect(value).toEqual('test-testVarValue-value');
    });

    it('should return the value when raw string match stage', () => {
      const value = calcValue('${ctx.stage}', context);

      expect(value).toEqual('test');
    });

    it('should return the value when raw string contains stage', () => {
      const value = calcValue('test${ctx.stage}-value', context);

      expect(value).toEqual('testtest-value');
    });

    it('should return the value when raw string match stages', () => {
      const value = calcValue('${stages.testStage}', context);

      expect(value).toEqual('testStageValue');
    });

    it('should return the value when raw string contains stages', () => {
      const value = calcValue('test-${stages.testStage}-value', context);

      expect(value).toEqual('test-testStageValue-value');
    });

    it('should return the value when raw string contains stage, vars and stages', () => {
      const value = calcValue(
        `wearedongyiIASJ#test$\{stages.testStage}SUPERE$\{ctx.stage}ROR-AHID_#YOUD$\{vars.testVar}-value`,
        context,
      );

      expect(value).toEqual(
        'wearedongyiIASJ#testtestStageValueSUPEREtestROR-AHID_#YOUDtestVarValue-value',
      );
    });

    it('should accept optional iacVars parameter to avoid re-parsing', () => {
      const iacVars = { customVar: 'customValue', handler: 'custom.handler' };
      const value = calcValue('${vars.customVar}', context, iacVars);

      expect(value).toEqual('customValue');
    });

    it('should use provided iacVars instead of parsing from file', () => {
      const contextWithoutHandler = {
        ...context,
        parameters: [], // Empty parameters to test iacVars priority
      };
      const iacVars = { handler: 'override.handler' };
      const value = calcValue('${vars.handler}', contextWithoutHandler, iacVars);

      // Should use the provided iacVars value, not parse from file
      expect(value).toEqual('override.handler');
    });

    it('should log warning when variable is not found', () => {
      const warnSpy = jest.spyOn(logger, 'warn').mockImplementation();
      const value = calcValue('${vars.nonExistentVar}', context, { someVar: 'value' });

      expect(value).toEqual('');
      expect(warnSpy).toHaveBeenCalledWith(
        "Variable 'nonExistentVar' not found in vars or parameters, using empty string",
      );
      warnSpy.mockRestore();
    });

    it('should log warning when stage variable is not found', () => {
      const warnSpy = jest.spyOn(logger, 'warn').mockImplementation();
      const value = calcValue('${stages.nonExistentStage}', context);

      expect(value).toEqual('');
      expect(warnSpy).toHaveBeenCalledWith(
        "Stage variable 'nonExistentStage' not found in stage 'test', using empty string",
      );
      warnSpy.mockRestore();
    });

    it('should handle multiple missing variables and log warnings for each', () => {
      const warnSpy = jest.spyOn(logger, 'warn').mockImplementation();
      const contextWithoutParams = {
        ...context,
        parameters: [{ key: 'testVar', value: 'exists' }],
      };
      const value = calcValue(
        '${vars.missing1}-${vars.missing2}-${vars.testVar}',
        contextWithoutParams,
        {},
      );

      expect(value).toEqual('--exists');
      expect(warnSpy).toHaveBeenCalledTimes(2);
      expect(warnSpy).toHaveBeenCalledWith(
        "Variable 'missing1' not found in vars or parameters, using empty string",
      );
      expect(warnSpy).toHaveBeenCalledWith(
        "Variable 'missing2' not found in vars or parameters, using empty string",
      );
      warnSpy.mockRestore();
    });
  });

  describe('Unit test for formatRosId', () => {
    it('should convert camelCase to snake_case', () => {
      const result = formatRosId('helloWorld');
      expect(result).toEqual('hello_world');
    });

    it('should remove leading underscore when first letter is capitalized', () => {
      const result = formatRosId('HElloWORld');
      expect(result).toEqual('hello_world');
    });

    it('should replace special characters with underscores', () => {
      const result = formatRosId('hello/world#test,example-case');
      expect(result).toEqual('hello_world_test_example_case');
    });

    it('should convert camelCase and replace special characters', () => {
      const result = formatRosId('helloWorld/withSpecial#Chars*And');
      expect(result).toEqual('hello_world_with_special_chars_and');
    });

    it('should not modify already snake_case strings without special chars', () => {
      const result = formatRosId('hello_world');
      expect(result).toEqual('hello_world');
    });
  });
});

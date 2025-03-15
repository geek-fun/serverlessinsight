import * as ros from '@alicloud/ros-cdk-core';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import { getFileSource, calcRefers, realValue } from '../../src/common';
import fs from 'node:fs';
import { context } from '../fixtures/contextFixture';

jest.mock('@alicloud/ros-cdk-ossdeployment');
jest.mock('@alicloud/ros-cdk-core');
const fcName = 'testFunction';
const location = 'tests/fixtures/artifacts/artifact.zip';

describe('Unit test for iacHelper', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('Unit test for getFileSource', () => {
    it('should return the correct ossDeployment source', () => {
      getFileSource(fcName, location);
      expect(ossDeployment.Source.asset).toHaveBeenCalledWith(
        `${process.cwd()}/${location}`,
        { deployTime: true },
        `${fcName}/50861cd99a3a678356030f5f189300af-`,
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
      expect(calcRefers(value, context)).toEqual(value);
      expect(ros.Fn.ref).not.toHaveBeenCalled();
    });

    it('should return the value if it contains a stage reference', () => {
      const value = 'testValue-${ctx.stage}';
      expect(calcRefers(value, context)).toEqual('testValue-test');

      expect(ros.Fn.ref).not.toHaveBeenCalled();
    });

    it('should return the value if it match a vars reference', () => {
      calcRefers('${vars.testVar}', context);

      expect(ros.Fn.ref).toHaveBeenCalledWith('testVar');
    });

    it('should return the value if it match a stages reference', () => {
      calcRefers('${stages.testStage}', context);
      expect(ros.Fn.findInMap).toHaveBeenCalledWith('stages', 'test', 'testStage');
    });

    it('should return the value if it contains a stages reference', () => {
      calcRefers('abcd-${stages.testVar}-efg', context);

      expect(ros.Fn.sub).toHaveBeenCalledWith('abcd-${testVar}-efg');
    });

    it('should return the value if it contains both stages reference and vars references', () => {
      calcRefers('abcd-${stages.testVar}-efg-${vars.newTestVar}-hij', context);

      expect(ros.Fn.sub).toHaveBeenCalledWith('abcd-${testVar}-efg-${newTestVar}-hij');
    });

    it('should return the value if it contains a functions reference', () => {
      calcRefers('${functions.testFunction}', context);

      expect(ros.Fn.getAtt).toHaveBeenCalledWith('testFunction', 'FunctionName');
    });
  });

  describe('Unit test for calcValue', () => {
    it('should return the value when raw string match vars', () => {
      const value = realValue('${vars.handler}', context);

      expect(value).toEqual('index.handler');
    });

    it('should return the value when raw string contains vars', () => {
      const value = realValue('test-${vars.testVar}-value', context);

      expect(value).toEqual('test-testVarValue-value');
    });

    it('should return the value when raw string match stage', () => {
      const value = realValue('${ctx.stage}', context);

      expect(value).toEqual('test');
    });

    it('should return the value when raw string contains stage', () => {
      const value = realValue('test${ctx.stage}-value', context);

      expect(value).toEqual('testtest-value');
    });

    it('should return the value when raw string match stages', () => {
      const value = realValue('${stages.testStage}', context);

      expect(value).toEqual('testStageValue');
    });

    it('should return the value when raw string contains stages', () => {
      const value = realValue('test-${stages.testStage}-value', context);

      expect(value).toEqual('test-testStageValue-value');
    });

    it('should return the value when raw string contains stage, vars and stages', () => {
      const value = realValue(
        `wearedongyiIASJ#test$\{stages.testStage}SUPERE$\{ctx.stage}ROR-AHID_#YOUD$\{vars.testVar}-value`,
        context,
      );

      expect(value).toEqual(
        'wearedongyiIASJ#testtestStageValueSUPEREtestROR-AHID_#YOUDtestVarValue-value',
      );
    });
  });
});

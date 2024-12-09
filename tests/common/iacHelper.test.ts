import * as ros from '@alicloud/ros-cdk-core';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import { getFileSource, replaceReference } from '../../src/common';
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
        {},
        `${fcName}/50861cd99a3a678356030f5f189300af.zip`,
      );
    });

    it('should throw an error if the path is a directory', () => {
      jest.spyOn(fs, 'lstatSync').mockReturnValue({ isDirectory: () => true } as fs.Stats);

      expect(() => getFileSource(fcName, location)).toThrow(
        'The provided path is a directory, not a file.',
      );
    });
  });

  describe('Unit test for replaceReference', () => {
    it('should return the value if it does not contain any reference', () => {
      const value = 'testValue';
      expect(replaceReference(value, context)).toEqual(value);
      expect(ros.Fn.ref).not.toHaveBeenCalled();
    });

    it('should return the value if it contains a stage reference', () => {
      const value = 'testValue-${ctx.stage}';
      expect(replaceReference(value, context)).toEqual('testValue-test');

      expect(ros.Fn.ref).not.toHaveBeenCalled();
    });

    it('should return the value if it match a vars reference', () => {
      replaceReference('${vars.testVar}', context);

      expect(ros.Fn.ref).toHaveBeenCalledWith('testVar');
    });

    it('should return the value if it match a stages reference', () => {
      replaceReference('${stages.testStage}', context);
      expect(ros.Fn.findInMap).toHaveBeenCalledWith('stages', 'test', 'testStage');
    });

    it('should return the value if it contains a stages reference', () => {
      replaceReference('abcd-${stages.testVar}-efg', context);

      expect(ros.Fn.sub).toHaveBeenCalledWith('abcd-${testVar}-efg');
    });

    it('should return the value if it contains both stages reference and vars references', () => {
      replaceReference('abcd-${stages.testVar}-efg-${vars.newTestVar}-hij', context);

      expect(ros.Fn.sub).toHaveBeenCalledWith('abcd-${testVar}-efg-${newTestVar}-hij');
    });

    it('should return the value if it contains a functions reference', () => {
      replaceReference('${functions.testFunction}', context);

      expect(ros.Fn.getAtt).toHaveBeenCalledWith('testFunction', 'FunctionName');
    });
  });
});

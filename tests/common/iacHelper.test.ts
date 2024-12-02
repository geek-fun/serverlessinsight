import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import { getFileSource } from '../../src/common';
import fs from 'node:fs';

jest.mock('@alicloud/ros-cdk-ossdeployment');

const fcName = 'testFunction';
const location = 'tests/fixtures/artifacts/artifact.zip';

describe('getFileSource', () => {
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

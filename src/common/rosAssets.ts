import { ISource } from '@alicloud/ros-cdk-ossdeployment/lib/source.cdk';
import fs from 'node:fs';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import path from 'node:path';

const buildAssets = (rootPath: string, relativePath: string): Array<ISource> => {
  const location = path.resolve(rootPath, relativePath);
  if (fs.lstatSync(location).isFile()) {
    return [
      ossDeployment.Source.asset(
        location,
        {},
        relativePath.substring(0, relativePath.lastIndexOf('/') + 1),
      ),
    ];
  }
  return fs
    .readdirSync(location)
    .map((file) => buildAssets(rootPath, `${relativePath}/${file}`.replace(/^\//, '')))
    .flat();
};

export const getAssets = (location: string): Array<ISource> => {
  return buildAssets(location, '');
};

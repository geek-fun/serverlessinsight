import { ISource } from '@alicloud/ros-cdk-ossdeployment/lib/source.cdk';
import fs from 'node:fs';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import path from 'node:path';
import JSZip from 'jszip';
import { logger } from './logger';
import { ActionContext, CdkAssets } from '../types';
import { get, isEmpty } from 'lodash';
import OSS from 'ali-oss';

const buildAssets = (rootPath: string, relativePath: string): Array<ISource> => {
  const location = path.resolve(rootPath, relativePath);
  if (!fs.existsSync(location)) {
    throw new Error(`Location: ${location} is not exists!`);
  }
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

const assembleFiles = (folder: string, zip: JSZip) => {
  const files = fs.readdirSync(folder);
  files.forEach((file) => {
    const filePath = path.join(folder, file);
    if (fs.lstatSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath);
      zip.file(file, content);
    } else {
      const subZip = zip.folder(file);
      if (subZip) {
        assembleFiles(filePath, subZip);
      }
    }
  });
};

const zipAssets = async (assetsPath: string) => {
  const zip = new JSZip();
  assembleFiles(assetsPath, zip);
  const zipPath = `${assetsPath.replace(/\/$/, '').trim()}.zip`;
  await zip
    .generateAsync({ type: 'nodebuffer' })
    .then((content) => {
      fs.writeFileSync(zipPath, content);
      logger.info(`Folder compressed to: ${zipPath}`);
    })
    .catch((e) => {
      logger.error(`Failed to compress folder: ${e}`);
      throw e;
    });
  return zipPath;
};

type ConstructedAsset = {
  bucketName: string;
  source: string;
  objectKey: string;
};

export const constructAssets = async (
  { files, rootPath }: CdkAssets,
  region: string,
): Promise<Array<ConstructedAsset> | undefined> => {
  const assets = await Promise.all(
    Object.entries(files)
      .filter(([, fileItem]) => !fileItem.source.path.endsWith('.template.json'))
      .map(async ([, fileItem]) => {
        let sourcePath = `${rootPath}/${fileItem.source.path}`;
        if (fileItem.source.packaging === 'zip') {
          sourcePath = await zipAssets(`${rootPath}/${fileItem.source.path}`);
        }
        return {
          bucketName: get(
            fileItem,
            'destinations.current_account-current_region.bucketName',
            '',
          ).replace('${ALIYUN::Region}', region),
          source: sourcePath,
          objectKey: get(fileItem, 'destinations.current_account-current_region.objectKey'),
        };
      }),
  );

  return !isEmpty(assets) ? assets : undefined;
};

const ensureBucketExits = async (bucketName: string, ossClient: OSS) =>
  await ossClient.getBucketInfo(bucketName).catch((err) => {
    if (err.code === 'NoSuchBucket') {
      logger.info(`Bucket: ${bucketName} not exists, creating...`);
      return ossClient.putBucket(bucketName, {
        storageClass: 'Standard',
        acl: 'private',
        dataRedundancyType: 'LRS',
      } as OSS.PutBucketOptions);
    } else {
      throw err;
    }
  });

export const publishAssets = async (
  assets: Array<ConstructedAsset> | undefined,
  context: ActionContext,
) => {
  if (!assets?.length) {
    logger.info('No assets to publish, skipped!');
    return;
  }

  const bucketName = assets[0].bucketName;

  const client = new OSS({
    region: `oss-${context.region}`,
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    bucket: bucketName,
  });

  await ensureBucketExits(bucketName, client);

  const headers = {
    'x-oss-storage-class': 'Standard',
    'x-oss-object-acl': 'default',
    'x-oss-forbid-overwrite': 'false',
  } as OSS.PutObjectOptions;

  await Promise.all(
    assets.map(async ({ source, objectKey }) => {
      await client.put(objectKey, path.normalize(source), { headers });
      logger.debug(`Upload file: ${source} to bucket: ${bucketName} successfully!`);
    }),
  );

  return bucketName;
};

export const cleanupAssets = async (
  assets: Array<ConstructedAsset> | undefined,
  context: ActionContext,
) => {
  if (!assets?.length) {
    logger.info('No assets to cleanup, skipped!');
    return;
  }

  const bucketName = assets[0].bucketName;

  const client = new OSS({
    region: `oss-${context.region}`,
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    bucket: bucketName,
  });

  await Promise.all(
    assets.map(async ({ objectKey }) => {
      await client.delete(objectKey);
      logger.debug(`Cleanup file: ${objectKey} from bucket: ${bucketName} successfully!`);
    }),
  );
  // delete the bucket
  await client.deleteBucket(bucketName);
  logger.debug(`Cleanup bucket: ${bucketName} successfully!`);
};

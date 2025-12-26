import { ISource } from '@alicloud/ros-cdk-ossdeployment/lib/source.cdk';
import fs from 'node:fs';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import path from 'node:path';
import JSZip from 'jszip';
import { logger } from './logger';
import { CdkAssets } from '../types';
import { get, isEmpty } from 'lodash';
import OSS from 'ali-oss';
import { getContext } from './context';
import { lang } from '../lang';

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
      logger.info(lang.__('FOLDER_COMPRESSED_TO', { zipPath }));
    })
    .catch((e) => {
      logger.error(lang.__('FAILED_TO_COMPRESS_FOLDER', { error: e }));
      throw e;
    });
  return zipPath;
};

type ConstructedAsset = {
  bucketName: string;
  source: string;
  objectKey: string;
};

export const constructAssets = async ({
  files,
  rootPath,
}: CdkAssets): Promise<Array<ConstructedAsset> | undefined> => {
  const { region } = getContext();
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
      logger.info(lang.__('BUCKET_NOT_EXISTS_CREATING', { bucketName }));
      return ossClient.putBucket(bucketName, {
        storageClass: 'Standard',
        acl: 'private',
        dataRedundancyType: 'LRS',
      } as OSS.PutBucketOptions);
    } else {
      throw err;
    }
  });

export const publishAssets = async (assets: Array<ConstructedAsset> | undefined) => {
  if (!assets?.length) {
    logger.info(lang.__('NO_ASSETS_TO_PUBLISH'));
    return;
  }

  const context = getContext();
  const bucketName = assets[0].bucketName;

  const client = new OSS({
    region: `oss-${context.region}`,
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
    bucket: bucketName,
    timeout: 600000, // 10 minutes
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
      logger.debug(lang.__('UPLOAD_FILE_SUCCESS', { source, bucketName }));
    }),
  );

  return bucketName;
};

export const cleanupAssets = async (assets: Array<ConstructedAsset> | undefined) => {
  if (!assets?.length) {
    logger.info(lang.__('NO_ASSETS_TO_CLEANUP'));
    return;
  }
  const context = getContext();
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
      logger.debug(lang.__('CLEANUP_FILE_SUCCESS', { objectKey, bucketName }));
    }),
  );
  // delete the bucket
  await client.deleteBucket(bucketName);
  logger.debug(lang.__('CLEANUP_BUCKET_SUCCESS', { bucketName }));
};

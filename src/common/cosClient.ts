import * as COS from 'cos-nodejs-sdk-v5';
import { Context } from '../types';

export type TencentCosClient = COS;

export const createCosClient = (context: Context): TencentCosClient => {
  const cosClient = new COS({
    SecretId: context.accessKeyId,
    SecretKey: context.accessKeySecret,
  });

  return cosClient;
};

// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import * as ots from '@alicloud/tablestore20201209';
import * as teaUtil from '@alicloud/tea-util';
import { tableStoreClient } from '../clients';

export const createOts = async () => {
  const tags0 = new ots.CreateInstanceRequestTags({
    key: 'taga',
    value: 'tagavalue',
  });
  const createInstanceRequest = new ots.CreateInstanceRequest({
    instanceName: 'testInstance',
    clusterType: 'SSD',
    instanceDescription: 'Instance description',
    networkTypeACL: ['VPC', 'INTERNET'],
    networkSourceACL: ['TRUST_PROXY', '0.0.0.0/24'],
    policy: '',
    tags: [tags0],
  });

  const runtime = new teaUtil.RuntimeOptions({});
  const headers: { [key: string]: string } = {};

  try {
    return tableStoreClient.createInstanceWithOptions(createInstanceRequest, headers, runtime);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

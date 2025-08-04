// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import Tablestore20201209 from '@alicloud/tablestore20201209';
import * as openApi from '@alicloud/openapi-client';
import Credential from '@alicloud/credentials';

const loadTableStoreClient = (): Tablestore20201209 => {
  // 工程代码建议使用更安全的无AK方式，凭据配置方式请参见：https://help.aliyun.com/document_detail/378664.html。
  const credential = new Credential();
  const config = new openApi.Config({ credential });
  config.endpoint = `tablestore.cn-hangzhou.aliyuncs.com`;

  return new Tablestore20201209(config);
};

export const tableStoreClient = loadTableStoreClient();

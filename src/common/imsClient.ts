import Ims20190815, * as ims20190815 from '@alicloud/ims20190815';
import * as openApi from '@alicloud/openapi-client';
import { Context } from '../types';
import { ProviderEnum } from './providerEnum';
import { ALIYUN_FC3_CONNECT_TIMEOUT_MS, ALIYUN_FC3_READ_TIMEOUT_MS } from './constants';

export const getIamInfo = async (context: Context) => {
  if (context.provider !== ProviderEnum.ALIYUN) {
    return undefined;
  }

  const imsConfig = new openApi.Config({
    accessKeyId: context.accessKeyId,
    accessKeySecret: context.accessKeySecret,
  });
  imsConfig.connectTimeout = ALIYUN_FC3_CONNECT_TIMEOUT_MS;
  imsConfig.readTimeout = ALIYUN_FC3_READ_TIMEOUT_MS;
  const imsClient = new Ims20190815(imsConfig);
  const { body } = await imsClient.getUser(
    new ims20190815.GetUserRequest({ userAccessKeyId: context.accessKeyId }),
  );

  return body?.user
    ? {
        ...body.user,
        accountId: body.user.userPrincipalName?.match(/@(\d+)\.onaliyun\.com/)?.pop(),
      }
    : undefined;
};

import Ims20190815, * as ims20190815 from '@alicloud/ims20190815';
import * as openApi from '@alicloud/openapi-client';
import { Context } from '../types';

export const getIamInfo = async (context: Context) => {
  const imsClient = new Ims20190815(
    new openApi.Config({
      accessKeyId: context.accessKeyId,
      accessKeySecret: context.accessKeySecret,
    }),
  );
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

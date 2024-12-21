import * as ros from '@alicloud/ros-cdk-core';
import { ActionContext, EventDomain, EventTypes, ServerlessIac } from '../../types';
import * as ram from '@alicloud/ros-cdk-ram';
import { encodeBase64, replaceReference } from '../../common';
import * as agw from '@alicloud/ros-cdk-apigateway';
import { isEmpty } from 'lodash';

export const resolveEvents = (
  scope: ros.Construct,
  events: Array<EventDomain> | undefined,
  tags: ServerlessIac['tags'] | undefined,
  context: ActionContext,
  service: string,
) => {
  if (isEmpty(events)) {
    return undefined;
  }
  const apiGateway = events!.filter((event) => event.type === EventTypes.API_GATEWAY);
  if (apiGateway?.length) {
    const gatewayAccessRole = new ram.RosRole(
      scope,
      replaceReference(`${service}_role`, context),
      {
        roleName: replaceReference(`${service}-gateway-access-role`, context),
        description: replaceReference(`${service} role`, context),
        assumeRolePolicyDocument: {
          version: '1',
          statement: [
            {
              action: 'sts:AssumeRole',
              effect: 'Allow',
              principal: {
                service: ['apigateway.aliyuncs.com'],
              },
            },
          ],
        },
        policies: [
          {
            policyName: replaceReference(`${service}-policy`, context),
            policyDocument: {
              version: '1',
              statement: [
                {
                  action: ['fc:InvokeFunction'],
                  effect: 'Allow',
                  // @TODO implement at least permission granting
                  resource: ['*'],
                },
              ],
            },
          },
        ],
      },
      true,
    );

    const apiGatewayGroup = new agw.RosGroup(
      scope,
      replaceReference(`${service}_apigroup`, context),
      {
        groupName: replaceReference(`${service}_apigroup`, context),
        tags: replaceReference(tags, context),
      },
      true,
    );

    // new agw.RosCustomDomain(
    //   this,
    //   'customDomain',
    //   {
    //     domainName: 'example.com',
    //     certificateName: 'example.com',
    //     certificateBody: 'example.com',
    //     certificatePrivateKey: 'example.com',
    //     groupId: apiGatewayGroup.attrGroupId,
    //   },
    //   true,
    // );

    apiGateway.forEach((event) => {
      event.triggers.forEach((trigger) => {
        const key = encodeBase64(
          replaceReference(`${trigger.method}_${trigger.path}`, context),
        ).replace(/=+$/, '');

        const api = new agw.RosApi(
          scope,
          `${event.key}_api_${key}`,
          {
            apiName: replaceReference(`${event.name}_api_${key}`, context),
            groupId: apiGatewayGroup.attrGroupId,
            visibility: 'PRIVATE',
            authType: 'ANONYMOUS',
            requestConfig: {
              requestProtocol: 'HTTP',
              requestHttpMethod: replaceReference(trigger.method, context),
              requestPath: replaceReference(trigger.path, context),
              requestMode: 'PASSTHROUGH',
            },
            serviceConfig: {
              serviceProtocol: 'FunctionCompute',
              functionComputeConfig: {
                fcRegionId: context.region,
                functionName: replaceReference(trigger.backend, context),
                roleArn: gatewayAccessRole.attrArn,
                fcVersion: '3.0',
              },
            },
            resultSample: 'ServerlessInsight resultSample',
            resultType: 'JSON',
            tags: replaceReference(tags, context),
          },
          true,
        );
        api.addDependsOn(apiGatewayGroup);

        new agw.Deployment(scope, `${service}_deployment`, {
          apiId: api.attrApiId,
          groupId: apiGatewayGroup.attrGroupId,
          stageName: 'RELEASE',
          description: `${service} Api Gateway deployment`,
        });
      });
    });
  }
};

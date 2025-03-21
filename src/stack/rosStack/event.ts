import * as ros from '@alicloud/ros-cdk-core';
import { Context, EventDomain, EventTypes, ServerlessIac } from '../../types';
import * as ram from '@alicloud/ros-cdk-ram';
import { encodeBase64ForRosId, calcRefs, splitDomain } from '../../common';
import * as agw from '@alicloud/ros-cdk-apigateway';
import { isEmpty } from 'lodash';
import * as dns from '@alicloud/ros-cdk-dns';

export const resolveEvents = (
  scope: ros.Construct,
  events: Array<EventDomain> | undefined,
  tags: ServerlessIac['tags'] | undefined,
  context: Context,
  service: string,
) => {
  if (isEmpty(events)) {
    return undefined;
  }
  const apiGateway = events!.filter((event) => event.type === EventTypes.API_GATEWAY);
  if (!apiGateway?.length) return;

  apiGateway.forEach((event) => {
    const gatewayAccessRole = new ram.RosRole(
      scope,
      calcRefs(`${event.key}_role`, context),
      {
        roleName: calcRefs(`${service}-${event.name}-agw-access-role`, context),
        description: calcRefs(`${service} role`, context),
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
            policyName: calcRefs(`${service}-${event.name}-policy`, context),
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
      calcRefs(`${service}_apigroup`, context),
      {
        groupName: calcRefs(`${service}_apigroup`, context),
        tags: calcRefs(tags, context),
        passthroughHeaders: 'host',
      },
      true,
    );

    if (event.domain) {
      const dnsRecordRosId = `${event.key}_custom_domain_record_${encodeBase64ForRosId(event.domain.domain_name)}`;
      const { domainName, rr } = splitDomain(event.domain?.domain_name);

      new dns.DomainRecord(scope, dnsRecordRosId, {
        domainName,
        rr,
        type: 'CNAME',
        value: apiGatewayGroup.attrSubDomain,
      });

      const agwCustomDomain = new agw.RosCustomDomain(
        scope,
        `${event.key}_custom_domain_${encodeBase64ForRosId(event.domain.domain_name)}`,
        {
          groupId: apiGatewayGroup.attrGroupId,
          domainName: event.domain.domain_name,
          certificateName: event.domain.certificate_name,
          certificateBody: event.domain.certificate_body,
          certificatePrivateKey: event.domain.certificate_private_key,
        },
        true,
      );
      agwCustomDomain.addRosDependency(dnsRecordRosId);
    }

    event.triggers.forEach((trigger) => {
      const key = encodeBase64ForRosId(calcRefs(`${trigger.method}_${trigger.path}`, context));

      const api = new agw.RosApi(
        scope,
        `${event.key}_api_${key}`,
        {
          apiName: calcRefs(`${event.name}_api_${key}`, context),
          groupId: apiGatewayGroup.attrGroupId,
          visibility: 'PRIVATE',
          authType: 'ANONYMOUS',
          requestConfig: {
            requestProtocol: 'HTTP',
            requestHttpMethod: calcRefs(trigger.method, context),
            requestPath: calcRefs(trigger.path, context),
            requestMode: 'PASSTHROUGH',
          },
          serviceConfig: {
            serviceProtocol: 'FunctionCompute',
            functionComputeConfig: {
              fcRegionId: context.region,
              functionName: calcRefs(trigger.backend, context),
              roleArn: gatewayAccessRole.attrArn,
              fcVersion: '3.0',
              method: calcRefs(trigger.method, context),
            },
          },
          resultSample: 'ServerlessInsight resultSample',
          resultType: 'PASSTHROUGH',
          tags: calcRefs(tags, context),
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
};

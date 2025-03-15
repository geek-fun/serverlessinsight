import * as ros from '@alicloud/ros-cdk-core';
import { Context, EventDomain, EventTypes, ServerlessIac } from '../../types';
import * as ram from '@alicloud/ros-cdk-ram';
import { encodeBase64ForRosId, calcRefers, splitDomain } from '../../common';
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
      calcRefers(`${event.key}_role`, context),
      {
        roleName: calcRefers(`${service}-${event.name}-agw-access-role`, context),
        description: calcRefers(`${service} role`, context),
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
            policyName: calcRefers(`${service}-${event.name}-policy`, context),
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
      calcRefers(`${service}_apigroup`, context),
      {
        groupName: calcRefers(`${service}_apigroup`, context),
        tags: calcRefers(tags, context),
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
      const key = encodeBase64ForRosId(calcRefers(`${trigger.method}_${trigger.path}`, context));

      const api = new agw.RosApi(
        scope,
        `${event.key}_api_${key}`,
        {
          apiName: calcRefers(`${event.name}_api_${key}`, context),
          groupId: apiGatewayGroup.attrGroupId,
          visibility: 'PRIVATE',
          authType: 'ANONYMOUS',
          requestConfig: {
            requestProtocol: 'HTTP',
            requestHttpMethod: calcRefers(trigger.method, context),
            requestPath: calcRefers(trigger.path, context),
            requestMode: 'PASSTHROUGH',
          },
          serviceConfig: {
            serviceProtocol: 'FunctionCompute',
            functionComputeConfig: {
              fcRegionId: context.region,
              functionName: calcRefers(trigger.backend, context),
              roleArn: gatewayAccessRole.attrArn,
              fcVersion: '3.0',
              method: calcRefers(trigger.method, context),
            },
          },
          resultSample: 'ServerlessInsight resultSample',
          resultType: 'PASSTHROUGH',
          tags: calcRefers(tags, context),
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

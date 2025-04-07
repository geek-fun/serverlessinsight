import * as ros from '@alicloud/ros-cdk-core';
import { Context, EventDomain, EventTypes, ServerlessIac } from '../../types';
import * as ram from '@alicloud/ros-cdk-ram';
import { calcRefs, calcValue, formatRosId, splitDomain } from '../../common';
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
      formatRosId(`${event.key}_agw_role`),
      {
        roleName: calcRefs(`${context}-${event.name}-agw-access-role`, context),
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
      formatRosId(`${event.key}_agw_group`),
      {
        groupName: calcRefs(`${service}-agw-group`, context),
        tags: calcRefs(tags, context),
        passthroughHeaders: 'host',
      },
      true,
    );

    if (event.domain) {
      const dnsRecordId = formatRosId(`${event.key}_agw_custom_domain_record`);
      const { domainName, rr } = splitDomain(event.domain?.domain_name);

      new dns.DomainRecord(scope, dnsRecordId, {
        domainName,
        rr,
        type: 'CNAME',
        value: apiGatewayGroup.attrSubDomain,
      });

      const agwCustomDomain = new agw.RosCustomDomain(
        scope,
        formatRosId(`${event.key}_agw_custom_domain`),
        {
          groupId: apiGatewayGroup.attrGroupId,
          domainName: event.domain.domain_name,
          certificateName: event.domain.certificate_name,
          certificateBody: event.domain.certificate_body,
          certificatePrivateKey: event.domain.certificate_private_key,
        },
        true,
      );
      agwCustomDomain.addRosDependency(dnsRecordId);
    }

    event.triggers.forEach((trigger) => {
      const key = formatRosId(calcValue(`${trigger.method}_${trigger.path}`, context));
      const api = new agw.RosApi(
        scope,
        formatRosId(`${event.key}_agw_api_${key}`),
        {
          apiName: calcRefs(`${event.name}-agw-api-${key.replace('_', '-')}`, context),
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

      new agw.Deployment(scope, formatRosId(`${event.key}_agw_api_deployment_${key}`), {
        apiId: api.attrApiId,
        groupId: apiGatewayGroup.attrGroupId,
        stageName: 'RELEASE',
        description: `${service} Api Gateway deployment for ${key}`,
      });
    });
  });
};

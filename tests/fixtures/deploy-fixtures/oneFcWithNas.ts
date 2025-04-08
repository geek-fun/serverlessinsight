import { ServerlessIac } from '../../../src/types';
import { oneFcIac, oneFcRos } from './oneFc';

export const oneFcIacWithNas = {
  ...oneFcIac,
  functions: [
    {
      ...((oneFcIac.functions && oneFcIac.functions[0]) ?? {}),
      network: {
        vpc_id: 'vpc-123456',
        subnet_ids: ['subnet-123456', 'subnet-67890', 'subnet-98765'],
        security_group: {
          name: 'my-security-group',
          ingress: [
            'TCP:0.0.0.0/0:80',
            'TCP:0.0.0.0/0:443',
            'TCP:0.0.0.0/0:22/22',
            'ICMP:0.0.0.0/0:ALL',
          ],
          egress: ['ALL:0.0.0.0/0:ALL'],
        },
      },
      storage: {
        nas: [
          {
            mount_path: '/mnt/nas',
            storage_class: 'STANDARD_CAPACITY',
          },
        ],
      },
    },
  ],
} as ServerlessIac;

export const oneFcIacWithNasRos = {
  ...oneFcRos,
  Resources: {
    ...oneFcRos.Resources,
    hello_fn: {
      Type: 'ALIYUN::FC3::Function',
      Properties: {
        ...oneFcRos.Resources.hello_fn.Properties,
        NasConfig: {
          MountPoints: [
            {
              MountDir: '/mnt/nas',
              ServerAddr: {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': ['hello_fn_nas_mount_mnt_nas', 'MountTargetDomain'],
                    },
                    ':/',
                  ],
                ],
              },
            },
          ],
        },
        VpcConfig: {
          SecurityGroupId: {
            'Fn::GetAtt': ['hello_fn_security_group', 'SecurityGroupId'],
          },
          VSwitchIds: ['subnet-123456', 'subnet-67890', 'subnet-98765'],
          VpcId: 'vpc-123456',
        },
      },
      DependsOn: ['sls_project', 'sls_logstore', 'sls_index', 'hello_fn_nas_mount_mnt_nas'],
    },
    hello_fn_datasource_subnet_subnet_123456: {
      Properties: {
        RefreshOptions: 'Always',
        VSwitchId: 'subnet-123456',
      },
      Type: 'DATASOURCE::VPC::VSwitch',
    },
    hello_fn_datasource_subnet_subnet_67890: {
      Properties: {
        RefreshOptions: 'Always',
        VSwitchId: 'subnet-67890',
      },
      Type: 'DATASOURCE::VPC::VSwitch',
    },
    hello_fn_datasource_subnet_subnet_98765: {
      Properties: {
        RefreshOptions: 'Always',
        VSwitchId: 'subnet-98765',
      },
      Type: 'DATASOURCE::VPC::VSwitch',
    },

    hello_fn_nas_mnt_nas: {
      Properties: {
        DeletionForce: false,
        FileSystemType: 'standard',
        ProtocolType: 'NFS',
        StorageType: 'Capacity',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
          {
            Key: 'function-name',
            Value: 'hello-fn',
          },
        ],
      },
      Type: 'ALIYUN::NAS::FileSystem',
    },
    hello_fn_nas_access_mnt_nas: {
      Properties: {
        AccessGroupName: 'hello-fn-nas-access-mnt-nas',
        AccessGroupType: 'Vpc',
        FileSystemType: 'standard',
      },
      Type: 'ALIYUN::NAS::AccessGroup',
    },
    hello_fn_nas_mount_mnt_nas: {
      Properties: {
        AccessGroupName: {
          'Fn::GetAtt': ['hello_fn_nas_access_mnt_nas', 'AccessGroupName'],
        },
        FileSystemId: {
          'Fn::GetAtt': ['hello_fn_nas_mnt_nas', 'FileSystemId'],
        },
        NetworkType: 'Vpc',
        VSwitchId: 'subnet-123456',
        VpcId: 'vpc-123456',
      },
      Type: 'ALIYUN::NAS::MountTarget',
    },
    hello_fn_nas_rule_subnet_123456: {
      Properties: {
        AccessGroupName: {
          'Fn::GetAtt': ['hello_fn_nas_access_mnt_nas', 'AccessGroupName'],
        },
        FileSystemType: 'standard',
        Priority: 1,
        RWAccessType: 'RDWR',
        SourceCidrIp: {
          'Fn::GetAtt': ['hello_fn_datasource_subnet_subnet_123456', 'CidrBlock'],
        },
        UserAccessType: 'no_squash',
      },
      Type: 'ALIYUN::NAS::AccessRule',
    },
    hello_fn_nas_rule_subnet_67890: {
      Properties: {
        AccessGroupName: {
          'Fn::GetAtt': ['hello_fn_nas_access_mnt_nas', 'AccessGroupName'],
        },
        FileSystemType: 'standard',
        Priority: 1,
        RWAccessType: 'RDWR',
        SourceCidrIp: {
          'Fn::GetAtt': ['hello_fn_datasource_subnet_subnet_67890', 'CidrBlock'],
        },
        UserAccessType: 'no_squash',
      },
      Type: 'ALIYUN::NAS::AccessRule',
    },
    hello_fn_nas_rule_subnet_98765: {
      Properties: {
        AccessGroupName: {
          'Fn::GetAtt': ['hello_fn_nas_access_mnt_nas', 'AccessGroupName'],
        },
        FileSystemType: 'standard',
        Priority: 1,
        RWAccessType: 'RDWR',
        SourceCidrIp: {
          'Fn::GetAtt': ['hello_fn_datasource_subnet_subnet_98765', 'CidrBlock'],
        },
        UserAccessType: 'no_squash',
      },
      Type: 'ALIYUN::NAS::AccessRule',
    },
    hello_fn_security_group: {
      Properties: {
        SecurityGroupEgress: [
          {
            DestCidrIp: '0.0.0.0/0',
            IpProtocol: 'all',
            PortRange: '-1/-1',
          },
        ],
        SecurityGroupIngress: [
          {
            IpProtocol: 'tcp',
            PortRange: '80/80',
            SourceCidrIp: '0.0.0.0/0',
          },
          {
            IpProtocol: 'tcp',
            PortRange: '443/443',
            SourceCidrIp: '0.0.0.0/0',
          },
          {
            IpProtocol: 'tcp',
            PortRange: '22/22',
            SourceCidrIp: '0.0.0.0/0',
          },
          {
            IpProtocol: 'icmp',
            PortRange: '-1/-1',
            SourceCidrIp: '0.0.0.0/0',
          },
        ],
        SecurityGroupName: 'my-security-group',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
        VpcId: 'vpc-123456',
      },
      Type: 'ALIYUN::ECS::SecurityGroup',
    },
  },
};

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDmsRocketmqInstancesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies whether to search for the instance that precisely matches a specified
  * instance name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances#exact_match_name DataHuaweicloudDmsRocketmqInstances#exact_match_name}
  */
  readonly exactMatchName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances#id DataHuaweicloudDmsRocketmqInstances#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the rocketMQ instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances#instance_id DataHuaweicloudDmsRocketmqInstances#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Specifies the name of the DMS RocketMQ instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances#name DataHuaweicloudDmsRocketmqInstances#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances#region DataHuaweicloudDmsRocketmqInstances#region}
  */
  readonly region?: string;
  /**
  * Specifies the status of the DMS RocketMQ instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances#status DataHuaweicloudDmsRocketmqInstances#status}
  */
  readonly status?: string;
}
export interface DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccesses {
}

export function dataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccessesToTerraform(struct?: DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccesses): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccessesToHclTerraform(struct?: DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccesses): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccessesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccesses | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccesses | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // advertised_ip - computed: true, optional: false, required: false
  public get advertisedIp() {
    return this.getStringAttribute('advertised_ip');
  }

  // lisenter_ip - computed: true, optional: false, required: false
  public get lisenterIp() {
    return this.getStringAttribute('lisenter_ip');
  }

  // listener_ip - computed: true, optional: false, required: false
  public get listenerIp() {
    return this.getStringAttribute('listener_ip');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }

  // port_id - computed: true, optional: false, required: false
  public get portId() {
    return this.getStringAttribute('port_id');
  }
}

export class DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccessesList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccessesOutputReference {
    return new DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccessesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsRocketmqInstancesInstances {
}

export function dataHuaweicloudDmsRocketmqInstancesInstancesToTerraform(struct?: DataHuaweicloudDmsRocketmqInstancesInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRocketmqInstancesInstancesToHclTerraform(struct?: DataHuaweicloudDmsRocketmqInstancesInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRocketmqInstancesInstancesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudDmsRocketmqInstancesInstances | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRocketmqInstancesInstances | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // availability_zones - computed: true, optional: false, required: false
  public get availabilityZones() {
    return this.getListAttribute('availability_zones');
  }

  // broker_address - computed: true, optional: false, required: false
  public get brokerAddress() {
    return this.getStringAttribute('broker_address');
  }

  // broker_num - computed: true, optional: false, required: false
  public get brokerNum() {
    return this.getNumberAttribute('broker_num');
  }

  // cross_vpc_accesses - computed: true, optional: false, required: false
  private _crossVpcAccesses = new DataHuaweicloudDmsRocketmqInstancesInstancesCrossVpcAccessesList(this, "cross_vpc_accesses", false);
  public get crossVpcAccesses() {
    return this._crossVpcAccesses;
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enable_acl - computed: true, optional: false, required: false
  public get enableAcl() {
    return this.getBooleanAttribute('enable_acl');
  }

  // enable_publicip - computed: true, optional: false, required: false
  public get enablePublicip() {
    return this.getBooleanAttribute('enable_publicip');
  }

  // engine_version - computed: true, optional: false, required: false
  public get engineVersion() {
    return this.getStringAttribute('engine_version');
  }

  // flavor_id - computed: true, optional: false, required: false
  public get flavorId() {
    return this.getStringAttribute('flavor_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // ipv6_enable - computed: true, optional: false, required: false
  public get ipv6Enable() {
    return this.getBooleanAttribute('ipv6_enable');
  }

  // maintain_begin - computed: true, optional: false, required: false
  public get maintainBegin() {
    return this.getStringAttribute('maintain_begin');
  }

  // maintain_end - computed: true, optional: false, required: false
  public get maintainEnd() {
    return this.getStringAttribute('maintain_end');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // namesrv_address - computed: true, optional: false, required: false
  public get namesrvAddress() {
    return this.getStringAttribute('namesrv_address');
  }

  // new_spec_billing_enable - computed: true, optional: false, required: false
  public get newSpecBillingEnable() {
    return this.getBooleanAttribute('new_spec_billing_enable');
  }

  // node_num - computed: true, optional: false, required: false
  public get nodeNum() {
    return this.getNumberAttribute('node_num');
  }

  // public_broker_address - computed: true, optional: false, required: false
  public get publicBrokerAddress() {
    return this.getStringAttribute('public_broker_address');
  }

  // public_namesrv_address - computed: true, optional: false, required: false
  public get publicNamesrvAddress() {
    return this.getStringAttribute('public_namesrv_address');
  }

  // publicip_address - computed: true, optional: false, required: false
  public get publicipAddress() {
    return this.getStringAttribute('publicip_address');
  }

  // publicip_id - computed: true, optional: false, required: false
  public get publicipId() {
    return this.getStringAttribute('publicip_id');
  }

  // resource_spec_code - computed: true, optional: false, required: false
  public get resourceSpecCode() {
    return this.getStringAttribute('resource_spec_code');
  }

  // security_group_id - computed: true, optional: false, required: false
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }

  // specification - computed: true, optional: false, required: false
  public get specification() {
    return this.getStringAttribute('specification');
  }

  // ssl_enable - computed: true, optional: false, required: false
  public get sslEnable() {
    return this.getBooleanAttribute('ssl_enable');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // storage_space - computed: true, optional: false, required: false
  public get storageSpace() {
    return this.getNumberAttribute('storage_space');
  }

  // storage_spec_code - computed: true, optional: false, required: false
  public get storageSpecCode() {
    return this.getStringAttribute('storage_spec_code');
  }

  // subnet_id - computed: true, optional: false, required: false
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // used_storage_space - computed: true, optional: false, required: false
  public get usedStorageSpace() {
    return this.getNumberAttribute('used_storage_space');
  }

  // vpc_id - computed: true, optional: false, required: false
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
}

export class DataHuaweicloudDmsRocketmqInstancesInstancesList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DataHuaweicloudDmsRocketmqInstancesInstancesOutputReference {
    return new DataHuaweicloudDmsRocketmqInstancesInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances huaweicloud_dms_rocketmq_instances}
*/
export class DataHuaweicloudDmsRocketmqInstances extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_rocketmq_instances";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDmsRocketmqInstances resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDmsRocketmqInstances to import
  * @param importFromId The id of the existing DataHuaweicloudDmsRocketmqInstances that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDmsRocketmqInstances to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_rocketmq_instances", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_instances huaweicloud_dms_rocketmq_instances} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDmsRocketmqInstancesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDmsRocketmqInstancesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_rocketmq_instances',
      terraformGeneratorMetadata: {
        providerName: 'huaweicloud',
        providerVersion: '1.71.1',
        providerVersionConstraint: '~> 1.71'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._exactMatchName = config.exactMatchName;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._region = config.region;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // exact_match_name - computed: false, optional: true, required: false
  private _exactMatchName?: string; 
  public get exactMatchName() {
    return this.getStringAttribute('exact_match_name');
  }
  public set exactMatchName(value: string) {
    this._exactMatchName = value;
  }
  public resetExactMatchName() {
    this._exactMatchName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get exactMatchNameInput() {
    return this._exactMatchName;
  }

  // id - computed: true, optional: true, required: false
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  public resetId() {
    this._id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // instances - computed: true, optional: false, required: false
  private _instances = new DataHuaweicloudDmsRocketmqInstancesInstancesList(this, "instances", false);
  public get instances() {
    return this._instances;
  }

  // name - computed: false, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // region - computed: true, optional: true, required: false
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  public resetRegion() {
    this._region = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }

  // status - computed: false, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      exact_match_name: cdktf.stringToTerraform(this._exactMatchName),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      exact_match_name: {
        value: cdktf.stringToHclTerraform(this._exactMatchName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

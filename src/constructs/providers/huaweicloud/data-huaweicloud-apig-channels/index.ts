// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudApigChannelsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the VPC channel ID of the to be queried.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels#channel_id DataHuaweicloudApigChannels#channel_id}
  */
  readonly channelId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels#id DataHuaweicloudApigChannels#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the dedicated instance to which the channels belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels#instance_id DataHuaweicloudApigChannels#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the ID of the member group to be queried.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels#member_group_id DataHuaweicloudApigChannels#member_group_id}
  */
  readonly memberGroupId?: string;
  /**
  * Specifies the name of the member group to be queried.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels#member_group_name DataHuaweicloudApigChannels#member_group_name}
  */
  readonly memberGroupName?: string;
  /**
  * Specifies the name of the channel to be queried.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels#name DataHuaweicloudApigChannels#name}
  */
  readonly name?: string;
  /**
  * Specifies the parameter name for exact matching to be queried.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels#precise_search DataHuaweicloudApigChannels#precise_search}
  */
  readonly preciseSearch?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels#region DataHuaweicloudApigChannels#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabels {
}

export function dataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabelsToTerraform(struct?: DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabels): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabelsToHclTerraform(struct?: DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabels): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabelsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabels | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabels | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // value - computed: true, optional: false, required: false
  public get value() {
    return this.getStringAttribute('value');
  }
}

export class DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabelsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabelsOutputReference {
    return new DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabelsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudApigChannelsVpcChannelsMemberGroup {
}

export function dataHuaweicloudApigChannelsVpcChannelsMemberGroupToTerraform(struct?: DataHuaweicloudApigChannelsVpcChannelsMemberGroup): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudApigChannelsVpcChannelsMemberGroupToHclTerraform(struct?: DataHuaweicloudApigChannelsVpcChannelsMemberGroup): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudApigChannelsVpcChannelsMemberGroupOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudApigChannelsVpcChannelsMemberGroup | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudApigChannelsVpcChannelsMemberGroup | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // microservice_labels - computed: true, optional: false, required: false
  private _microserviceLabels = new DataHuaweicloudApigChannelsVpcChannelsMemberGroupMicroserviceLabelsList(this, "microservice_labels", false);
  public get microserviceLabels() {
    return this._microserviceLabels;
  }

  // microservice_port - computed: true, optional: false, required: false
  public get microservicePort() {
    return this.getNumberAttribute('microservice_port');
  }

  // microservice_version - computed: true, optional: false, required: false
  public get microserviceVersion() {
    return this.getStringAttribute('microservice_version');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // weight - computed: true, optional: false, required: false
  public get weight() {
    return this.getNumberAttribute('weight');
  }
}

export class DataHuaweicloudApigChannelsVpcChannelsMemberGroupList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudApigChannelsVpcChannelsMemberGroupOutputReference {
    return new DataHuaweicloudApigChannelsVpcChannelsMemberGroupOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudApigChannelsVpcChannels {
}

export function dataHuaweicloudApigChannelsVpcChannelsToTerraform(struct?: DataHuaweicloudApigChannelsVpcChannels): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudApigChannelsVpcChannelsToHclTerraform(struct?: DataHuaweicloudApigChannelsVpcChannels): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudApigChannelsVpcChannelsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudApigChannelsVpcChannels | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudApigChannelsVpcChannels | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // balance_strategy - computed: true, optional: false, required: false
  public get balanceStrategy() {
    return this.getNumberAttribute('balance_strategy');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // member_group - computed: true, optional: false, required: false
  private _memberGroup = new DataHuaweicloudApigChannelsVpcChannelsMemberGroupList(this, "member_group", false);
  public get memberGroup() {
    return this._memberGroup;
  }

  // member_type - computed: true, optional: false, required: false
  public get memberType() {
    return this.getStringAttribute('member_type');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getNumberAttribute('type');
  }
}

export class DataHuaweicloudApigChannelsVpcChannelsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudApigChannelsVpcChannelsOutputReference {
    return new DataHuaweicloudApigChannelsVpcChannelsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels huaweicloud_apig_channels}
*/
export class DataHuaweicloudApigChannels extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_apig_channels";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudApigChannels resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudApigChannels to import
  * @param importFromId The id of the existing DataHuaweicloudApigChannels that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudApigChannels to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_apig_channels", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_channels huaweicloud_apig_channels} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudApigChannelsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudApigChannelsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_apig_channels',
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
    this._channelId = config.channelId;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._memberGroupId = config.memberGroupId;
    this._memberGroupName = config.memberGroupName;
    this._name = config.name;
    this._preciseSearch = config.preciseSearch;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // channel_id - computed: false, optional: true, required: false
  private _channelId?: string; 
  public get channelId() {
    return this.getStringAttribute('channel_id');
  }
  public set channelId(value: string) {
    this._channelId = value;
  }
  public resetChannelId() {
    this._channelId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get channelIdInput() {
    return this._channelId;
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // member_group_id - computed: false, optional: true, required: false
  private _memberGroupId?: string; 
  public get memberGroupId() {
    return this.getStringAttribute('member_group_id');
  }
  public set memberGroupId(value: string) {
    this._memberGroupId = value;
  }
  public resetMemberGroupId() {
    this._memberGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get memberGroupIdInput() {
    return this._memberGroupId;
  }

  // member_group_name - computed: false, optional: true, required: false
  private _memberGroupName?: string; 
  public get memberGroupName() {
    return this.getStringAttribute('member_group_name');
  }
  public set memberGroupName(value: string) {
    this._memberGroupName = value;
  }
  public resetMemberGroupName() {
    this._memberGroupName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get memberGroupNameInput() {
    return this._memberGroupName;
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

  // precise_search - computed: false, optional: true, required: false
  private _preciseSearch?: string; 
  public get preciseSearch() {
    return this.getStringAttribute('precise_search');
  }
  public set preciseSearch(value: string) {
    this._preciseSearch = value;
  }
  public resetPreciseSearch() {
    this._preciseSearch = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preciseSearchInput() {
    return this._preciseSearch;
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

  // vpc_channels - computed: true, optional: false, required: false
  private _vpcChannels = new DataHuaweicloudApigChannelsVpcChannelsList(this, "vpc_channels", false);
  public get vpcChannels() {
    return this._vpcChannels;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      channel_id: cdktf.stringToTerraform(this._channelId),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      member_group_id: cdktf.stringToTerraform(this._memberGroupId),
      member_group_name: cdktf.stringToTerraform(this._memberGroupName),
      name: cdktf.stringToTerraform(this._name),
      precise_search: cdktf.stringToTerraform(this._preciseSearch),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      channel_id: {
        value: cdktf.stringToHclTerraform(this._channelId),
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
      member_group_id: {
        value: cdktf.stringToHclTerraform(this._memberGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      member_group_name: {
        value: cdktf.stringToHclTerraform(this._memberGroupName),
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
      precise_search: {
        value: cdktf.stringToHclTerraform(this._preciseSearch),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDmsRocketmqUsersConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users#access_key DataHuaweicloudDmsRocketmqUsers#access_key}
  */
  readonly accessKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users#admin DataHuaweicloudDmsRocketmqUsers#admin}
  */
  readonly admin?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users#default_group_perm DataHuaweicloudDmsRocketmqUsers#default_group_perm}
  */
  readonly defaultGroupPerm?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users#default_topic_perm DataHuaweicloudDmsRocketmqUsers#default_topic_perm}
  */
  readonly defaultTopicPerm?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users#id DataHuaweicloudDmsRocketmqUsers#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users#instance_id DataHuaweicloudDmsRocketmqUsers#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users#region DataHuaweicloudDmsRocketmqUsers#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users#white_remote_address DataHuaweicloudDmsRocketmqUsers#white_remote_address}
  */
  readonly whiteRemoteAddress?: string;
}
export interface DataHuaweicloudDmsRocketmqUsersUsersGroupPerms {
}

export function dataHuaweicloudDmsRocketmqUsersUsersGroupPermsToTerraform(struct?: DataHuaweicloudDmsRocketmqUsersUsersGroupPerms): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRocketmqUsersUsersGroupPermsToHclTerraform(struct?: DataHuaweicloudDmsRocketmqUsersUsersGroupPerms): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRocketmqUsersUsersGroupPermsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsRocketmqUsersUsersGroupPerms | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRocketmqUsersUsersGroupPerms | undefined) {
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

  // perm - computed: true, optional: false, required: false
  public get perm() {
    return this.getStringAttribute('perm');
  }
}

export class DataHuaweicloudDmsRocketmqUsersUsersGroupPermsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsRocketmqUsersUsersGroupPermsOutputReference {
    return new DataHuaweicloudDmsRocketmqUsersUsersGroupPermsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsRocketmqUsersUsersTopicPerms {
}

export function dataHuaweicloudDmsRocketmqUsersUsersTopicPermsToTerraform(struct?: DataHuaweicloudDmsRocketmqUsersUsersTopicPerms): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRocketmqUsersUsersTopicPermsToHclTerraform(struct?: DataHuaweicloudDmsRocketmqUsersUsersTopicPerms): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRocketmqUsersUsersTopicPermsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsRocketmqUsersUsersTopicPerms | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRocketmqUsersUsersTopicPerms | undefined) {
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

  // perm - computed: true, optional: false, required: false
  public get perm() {
    return this.getStringAttribute('perm');
  }
}

export class DataHuaweicloudDmsRocketmqUsersUsersTopicPermsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsRocketmqUsersUsersTopicPermsOutputReference {
    return new DataHuaweicloudDmsRocketmqUsersUsersTopicPermsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsRocketmqUsersUsers {
}

export function dataHuaweicloudDmsRocketmqUsersUsersToTerraform(struct?: DataHuaweicloudDmsRocketmqUsersUsers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRocketmqUsersUsersToHclTerraform(struct?: DataHuaweicloudDmsRocketmqUsersUsers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRocketmqUsersUsersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsRocketmqUsersUsers | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRocketmqUsersUsers | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // access_key - computed: true, optional: false, required: false
  public get accessKey() {
    return this.getStringAttribute('access_key');
  }

  // admin - computed: true, optional: false, required: false
  public get admin() {
    return this.getBooleanAttribute('admin');
  }

  // default_group_perm - computed: true, optional: false, required: false
  public get defaultGroupPerm() {
    return this.getStringAttribute('default_group_perm');
  }

  // default_topic_perm - computed: true, optional: false, required: false
  public get defaultTopicPerm() {
    return this.getStringAttribute('default_topic_perm');
  }

  // group_perms - computed: true, optional: false, required: false
  private _groupPerms = new DataHuaweicloudDmsRocketmqUsersUsersGroupPermsList(this, "group_perms", false);
  public get groupPerms() {
    return this._groupPerms;
  }

  // topic_perms - computed: true, optional: false, required: false
  private _topicPerms = new DataHuaweicloudDmsRocketmqUsersUsersTopicPermsList(this, "topic_perms", false);
  public get topicPerms() {
    return this._topicPerms;
  }

  // white_remote_address - computed: true, optional: false, required: false
  public get whiteRemoteAddress() {
    return this.getStringAttribute('white_remote_address');
  }
}

export class DataHuaweicloudDmsRocketmqUsersUsersList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsRocketmqUsersUsersOutputReference {
    return new DataHuaweicloudDmsRocketmqUsersUsersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users huaweicloud_dms_rocketmq_users}
*/
export class DataHuaweicloudDmsRocketmqUsers extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_rocketmq_users";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDmsRocketmqUsers resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDmsRocketmqUsers to import
  * @param importFromId The id of the existing DataHuaweicloudDmsRocketmqUsers that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDmsRocketmqUsers to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_rocketmq_users", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_users huaweicloud_dms_rocketmq_users} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDmsRocketmqUsersConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDmsRocketmqUsersConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_rocketmq_users',
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
    this._accessKey = config.accessKey;
    this._admin = config.admin;
    this._defaultGroupPerm = config.defaultGroupPerm;
    this._defaultTopicPerm = config.defaultTopicPerm;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._region = config.region;
    this._whiteRemoteAddress = config.whiteRemoteAddress;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_key - computed: false, optional: true, required: false
  private _accessKey?: string; 
  public get accessKey() {
    return this.getStringAttribute('access_key');
  }
  public set accessKey(value: string) {
    this._accessKey = value;
  }
  public resetAccessKey() {
    this._accessKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessKeyInput() {
    return this._accessKey;
  }

  // admin - computed: false, optional: true, required: false
  private _admin?: boolean | cdktf.IResolvable; 
  public get admin() {
    return this.getBooleanAttribute('admin');
  }
  public set admin(value: boolean | cdktf.IResolvable) {
    this._admin = value;
  }
  public resetAdmin() {
    this._admin = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get adminInput() {
    return this._admin;
  }

  // default_group_perm - computed: false, optional: true, required: false
  private _defaultGroupPerm?: string; 
  public get defaultGroupPerm() {
    return this.getStringAttribute('default_group_perm');
  }
  public set defaultGroupPerm(value: string) {
    this._defaultGroupPerm = value;
  }
  public resetDefaultGroupPerm() {
    this._defaultGroupPerm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultGroupPermInput() {
    return this._defaultGroupPerm;
  }

  // default_topic_perm - computed: false, optional: true, required: false
  private _defaultTopicPerm?: string; 
  public get defaultTopicPerm() {
    return this.getStringAttribute('default_topic_perm');
  }
  public set defaultTopicPerm(value: string) {
    this._defaultTopicPerm = value;
  }
  public resetDefaultTopicPerm() {
    this._defaultTopicPerm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultTopicPermInput() {
    return this._defaultTopicPerm;
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

  // users - computed: true, optional: false, required: false
  private _users = new DataHuaweicloudDmsRocketmqUsersUsersList(this, "users", false);
  public get users() {
    return this._users;
  }

  // white_remote_address - computed: false, optional: true, required: false
  private _whiteRemoteAddress?: string; 
  public get whiteRemoteAddress() {
    return this.getStringAttribute('white_remote_address');
  }
  public set whiteRemoteAddress(value: string) {
    this._whiteRemoteAddress = value;
  }
  public resetWhiteRemoteAddress() {
    this._whiteRemoteAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get whiteRemoteAddressInput() {
    return this._whiteRemoteAddress;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      access_key: cdktf.stringToTerraform(this._accessKey),
      admin: cdktf.booleanToTerraform(this._admin),
      default_group_perm: cdktf.stringToTerraform(this._defaultGroupPerm),
      default_topic_perm: cdktf.stringToTerraform(this._defaultTopicPerm),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      region: cdktf.stringToTerraform(this._region),
      white_remote_address: cdktf.stringToTerraform(this._whiteRemoteAddress),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_key: {
        value: cdktf.stringToHclTerraform(this._accessKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      admin: {
        value: cdktf.booleanToHclTerraform(this._admin),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      default_group_perm: {
        value: cdktf.stringToHclTerraform(this._defaultGroupPerm),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      default_topic_perm: {
        value: cdktf.stringToHclTerraform(this._defaultTopicPerm),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      white_remote_address: {
        value: cdktf.stringToHclTerraform(this._whiteRemoteAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsRocketmqUserConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the access key of the user.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#access_key DmsRocketmqUser#access_key}
  */
  readonly accessKey: string;
  /**
  * Specifies whether the user is an administrator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#admin DmsRocketmqUser#admin}
  */
  readonly admin?: boolean | cdktf.IResolvable;
  /**
  * Specifies the default consumer group permissions.
  * Value options: **PUB|SUB**, **PUB**, **SUB**, **DENY**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#default_group_perm DmsRocketmqUser#default_group_perm}
  */
  readonly defaultGroupPerm?: string;
  /**
  * Specifies the default topic permissions.
  * Value options: **PUB|SUB**, **PUB**, **SUB**, **DENY**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#default_topic_perm DmsRocketmqUser#default_topic_perm}
  */
  readonly defaultTopicPerm?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#id DmsRocketmqUser#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the rocketMQ instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#instance_id DmsRocketmqUser#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#region DmsRocketmqUser#region}
  */
  readonly region?: string;
  /**
  * Specifies the secret key of the user.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#secret_key DmsRocketmqUser#secret_key}
  */
  readonly secretKey: string;
  /**
  * Specifies the IP address whitelist.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#white_remote_address DmsRocketmqUser#white_remote_address}
  */
  readonly whiteRemoteAddress?: string;
  /**
  * group_perms block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#group_perms DmsRocketmqUser#group_perms}
  */
  readonly groupPerms?: DmsRocketmqUserGroupPerms[] | cdktf.IResolvable;
  /**
  * topic_perms block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#topic_perms DmsRocketmqUser#topic_perms}
  */
  readonly topicPerms?: DmsRocketmqUserTopicPerms[] | cdktf.IResolvable;
}
export interface DmsRocketmqUserGroupPerms {
  /**
  * Indicates the name of a topic or consumer group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#name DmsRocketmqUser#name}
  */
  readonly name?: string;
  /**
  * Indicates the permissions of the topic or consumer group.
  * Value options: **PUB|SUB**, **PUB**, **SUB**, **DENY**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#perm DmsRocketmqUser#perm}
  */
  readonly perm?: string;
}

export function dmsRocketmqUserGroupPermsToTerraform(struct?: DmsRocketmqUserGroupPerms | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    perm: cdktf.stringToTerraform(struct!.perm),
  }
}


export function dmsRocketmqUserGroupPermsToHclTerraform(struct?: DmsRocketmqUserGroupPerms | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    perm: {
      value: cdktf.stringToHclTerraform(struct!.perm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsRocketmqUserGroupPermsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DmsRocketmqUserGroupPerms | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._perm !== undefined) {
      hasAnyValues = true;
      internalValueResult.perm = this._perm;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRocketmqUserGroupPerms | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._perm = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._perm = value.perm;
    }
  }

  // name - computed: true, optional: true, required: false
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

  // perm - computed: true, optional: true, required: false
  private _perm?: string; 
  public get perm() {
    return this.getStringAttribute('perm');
  }
  public set perm(value: string) {
    this._perm = value;
  }
  public resetPerm() {
    this._perm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get permInput() {
    return this._perm;
  }
}

export class DmsRocketmqUserGroupPermsList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqUserGroupPerms[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqUserGroupPermsOutputReference {
    return new DmsRocketmqUserGroupPermsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsRocketmqUserTopicPerms {
  /**
  * Indicates the name of a topic or consumer group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#name DmsRocketmqUser#name}
  */
  readonly name?: string;
  /**
  * Indicates the permissions of the topic or consumer group.
  * Value options: **PUB|SUB**, **PUB**, **SUB**, **DENY**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#perm DmsRocketmqUser#perm}
  */
  readonly perm?: string;
}

export function dmsRocketmqUserTopicPermsToTerraform(struct?: DmsRocketmqUserTopicPerms | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    perm: cdktf.stringToTerraform(struct!.perm),
  }
}


export function dmsRocketmqUserTopicPermsToHclTerraform(struct?: DmsRocketmqUserTopicPerms | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    perm: {
      value: cdktf.stringToHclTerraform(struct!.perm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsRocketmqUserTopicPermsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DmsRocketmqUserTopicPerms | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._perm !== undefined) {
      hasAnyValues = true;
      internalValueResult.perm = this._perm;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRocketmqUserTopicPerms | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._perm = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._perm = value.perm;
    }
  }

  // name - computed: true, optional: true, required: false
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

  // perm - computed: true, optional: true, required: false
  private _perm?: string; 
  public get perm() {
    return this.getStringAttribute('perm');
  }
  public set perm(value: string) {
    this._perm = value;
  }
  public resetPerm() {
    this._perm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get permInput() {
    return this._perm;
  }
}

export class DmsRocketmqUserTopicPermsList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqUserTopicPerms[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqUserTopicPermsOutputReference {
    return new DmsRocketmqUserTopicPermsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user huaweicloud_dms_rocketmq_user}
*/
export class DmsRocketmqUser extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_rocketmq_user";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsRocketmqUser resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsRocketmqUser to import
  * @param importFromId The id of the existing DmsRocketmqUser that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsRocketmqUser to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_rocketmq_user", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_user huaweicloud_dms_rocketmq_user} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsRocketmqUserConfig
  */
  public constructor(scope: Construct, id: string, config: DmsRocketmqUserConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_rocketmq_user',
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
    this._secretKey = config.secretKey;
    this._whiteRemoteAddress = config.whiteRemoteAddress;
    this._groupPerms.internalValue = config.groupPerms;
    this._topicPerms.internalValue = config.topicPerms;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_key - computed: false, optional: false, required: true
  private _accessKey?: string; 
  public get accessKey() {
    return this.getStringAttribute('access_key');
  }
  public set accessKey(value: string) {
    this._accessKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accessKeyInput() {
    return this._accessKey;
  }

  // admin - computed: true, optional: true, required: false
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

  // default_group_perm - computed: true, optional: true, required: false
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

  // default_topic_perm - computed: true, optional: true, required: false
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

  // secret_key - computed: false, optional: false, required: true
  private _secretKey?: string; 
  public get secretKey() {
    return this.getStringAttribute('secret_key');
  }
  public set secretKey(value: string) {
    this._secretKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get secretKeyInput() {
    return this._secretKey;
  }

  // white_remote_address - computed: true, optional: true, required: false
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

  // group_perms - computed: false, optional: true, required: false
  private _groupPerms = new DmsRocketmqUserGroupPermsList(this, "group_perms", false);
  public get groupPerms() {
    return this._groupPerms;
  }
  public putGroupPerms(value: DmsRocketmqUserGroupPerms[] | cdktf.IResolvable) {
    this._groupPerms.internalValue = value;
  }
  public resetGroupPerms() {
    this._groupPerms.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get groupPermsInput() {
    return this._groupPerms.internalValue;
  }

  // topic_perms - computed: false, optional: true, required: false
  private _topicPerms = new DmsRocketmqUserTopicPermsList(this, "topic_perms", false);
  public get topicPerms() {
    return this._topicPerms;
  }
  public putTopicPerms(value: DmsRocketmqUserTopicPerms[] | cdktf.IResolvable) {
    this._topicPerms.internalValue = value;
  }
  public resetTopicPerms() {
    this._topicPerms.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicPermsInput() {
    return this._topicPerms.internalValue;
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
      secret_key: cdktf.stringToTerraform(this._secretKey),
      white_remote_address: cdktf.stringToTerraform(this._whiteRemoteAddress),
      group_perms: cdktf.listMapper(dmsRocketmqUserGroupPermsToTerraform, true)(this._groupPerms.internalValue),
      topic_perms: cdktf.listMapper(dmsRocketmqUserTopicPermsToTerraform, true)(this._topicPerms.internalValue),
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
      secret_key: {
        value: cdktf.stringToHclTerraform(this._secretKey),
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
      group_perms: {
        value: cdktf.listMapperHcl(dmsRocketmqUserGroupPermsToHclTerraform, true)(this._groupPerms.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqUserGroupPermsList",
      },
      topic_perms: {
        value: cdktf.listMapperHcl(dmsRocketmqUserTopicPermsToHclTerraform, true)(this._topicPerms.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqUserTopicPermsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

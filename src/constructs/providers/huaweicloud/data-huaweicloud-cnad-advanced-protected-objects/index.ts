// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCnadAdvancedProtectedObjectsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects#id DataHuaweicloudCnadAdvancedProtectedObjects#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the CNAD advanced instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects#instance_id DataHuaweicloudCnadAdvancedProtectedObjects#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Specifies the CNAD advanced protected object IP.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects#ip_address DataHuaweicloudCnadAdvancedProtectedObjects#ip_address}
  */
  readonly ipAddress?: string;
  /**
  * Specifies whether query protected objects which policies unbound.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects#is_unbound DataHuaweicloudCnadAdvancedProtectedObjects#is_unbound}
  */
  readonly isUnbound?: boolean | cdktf.IResolvable;
  /**
  * Specifies the CNAD advanced policy ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects#policy_id DataHuaweicloudCnadAdvancedProtectedObjects#policy_id}
  */
  readonly policyId?: string;
  /**
  * Specifies the protected object ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects#protected_object_id DataHuaweicloudCnadAdvancedProtectedObjects#protected_object_id}
  */
  readonly protectedObjectId?: string;
  /**
  * Specifies the type of the protected object. Valid values are **VPN**, **NAT**, **VIP**,
  * **CCI**, **EIP**, **ELB**, **REROUTING_IP**, **SubEni** and **NetInterFace**
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects#type DataHuaweicloudCnadAdvancedProtectedObjects#type}
  */
  readonly type?: string;
}
export interface DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjects {
}

export function dataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjectsToTerraform(struct?: DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjects): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjectsToHclTerraform(struct?: DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjects): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjectsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjects | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjects | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // block_threshold - computed: true, optional: false, required: false
  public get blockThreshold() {
    return this.getStringAttribute('block_threshold');
  }

  // clean_threshold - computed: true, optional: false, required: false
  public get cleanThreshold() {
    return this.getNumberAttribute('clean_threshold');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // instance_id - computed: true, optional: false, required: false
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }

  // instance_name - computed: true, optional: false, required: false
  public get instanceName() {
    return this.getStringAttribute('instance_name');
  }

  // instance_version - computed: true, optional: false, required: false
  public get instanceVersion() {
    return this.getStringAttribute('instance_version');
  }

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // policy_name - computed: true, optional: false, required: false
  public get policyName() {
    return this.getStringAttribute('policy_name');
  }

  // region - computed: true, optional: false, required: false
  public get region() {
    return this.getStringAttribute('region');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjectsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjectsOutputReference {
    return new DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjectsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects huaweicloud_cnad_advanced_protected_objects}
*/
export class DataHuaweicloudCnadAdvancedProtectedObjects extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cnad_advanced_protected_objects";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCnadAdvancedProtectedObjects resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCnadAdvancedProtectedObjects to import
  * @param importFromId The id of the existing DataHuaweicloudCnadAdvancedProtectedObjects that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCnadAdvancedProtectedObjects to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cnad_advanced_protected_objects", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cnad_advanced_protected_objects huaweicloud_cnad_advanced_protected_objects} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCnadAdvancedProtectedObjectsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCnadAdvancedProtectedObjectsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cnad_advanced_protected_objects',
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
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._ipAddress = config.ipAddress;
    this._isUnbound = config.isUnbound;
    this._policyId = config.policyId;
    this._protectedObjectId = config.protectedObjectId;
    this._type = config.type;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // ip_address - computed: false, optional: true, required: false
  private _ipAddress?: string; 
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }
  public set ipAddress(value: string) {
    this._ipAddress = value;
  }
  public resetIpAddress() {
    this._ipAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipAddressInput() {
    return this._ipAddress;
  }

  // is_unbound - computed: false, optional: true, required: false
  private _isUnbound?: boolean | cdktf.IResolvable; 
  public get isUnbound() {
    return this.getBooleanAttribute('is_unbound');
  }
  public set isUnbound(value: boolean | cdktf.IResolvable) {
    this._isUnbound = value;
  }
  public resetIsUnbound() {
    this._isUnbound = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isUnboundInput() {
    return this._isUnbound;
  }

  // policy_id - computed: false, optional: true, required: false
  private _policyId?: string; 
  public get policyId() {
    return this.getStringAttribute('policy_id');
  }
  public set policyId(value: string) {
    this._policyId = value;
  }
  public resetPolicyId() {
    this._policyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyIdInput() {
    return this._policyId;
  }

  // protected_object_id - computed: false, optional: true, required: false
  private _protectedObjectId?: string; 
  public get protectedObjectId() {
    return this.getStringAttribute('protected_object_id');
  }
  public set protectedObjectId(value: string) {
    this._protectedObjectId = value;
  }
  public resetProtectedObjectId() {
    this._protectedObjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protectedObjectIdInput() {
    return this._protectedObjectId;
  }

  // protected_objects - computed: true, optional: false, required: false
  private _protectedObjects = new DataHuaweicloudCnadAdvancedProtectedObjectsProtectedObjectsList(this, "protected_objects", false);
  public get protectedObjects() {
    return this._protectedObjects;
  }

  // type - computed: false, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      ip_address: cdktf.stringToTerraform(this._ipAddress),
      is_unbound: cdktf.booleanToTerraform(this._isUnbound),
      policy_id: cdktf.stringToTerraform(this._policyId),
      protected_object_id: cdktf.stringToTerraform(this._protectedObjectId),
      type: cdktf.stringToTerraform(this._type),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
      ip_address: {
        value: cdktf.stringToHclTerraform(this._ipAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_unbound: {
        value: cdktf.booleanToHclTerraform(this._isUnbound),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      policy_id: {
        value: cdktf.stringToHclTerraform(this._policyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protected_object_id: {
        value: cdktf.stringToHclTerraform(this._protectedObjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

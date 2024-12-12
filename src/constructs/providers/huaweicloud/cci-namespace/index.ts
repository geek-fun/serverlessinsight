// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CciNamespaceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#auto_expend_enabled CciNamespace#auto_expend_enabled}
  */
  readonly autoExpendEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#container_network_enabled CciNamespace#container_network_enabled}
  */
  readonly containerNetworkEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#enterprise_project_id CciNamespace#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#id CciNamespace#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#name CciNamespace#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#rbac_enabled CciNamespace#rbac_enabled}
  */
  readonly rbacEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#recycling_interval CciNamespace#recycling_interval}
  */
  readonly recyclingInterval?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#region CciNamespace#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#type CciNamespace#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#warmup_pool_size CciNamespace#warmup_pool_size}
  */
  readonly warmupPoolSize?: number;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#timeouts CciNamespace#timeouts}
  */
  readonly timeouts?: CciNamespaceTimeouts;
}
export interface CciNamespaceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#create CciNamespace#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#delete CciNamespace#delete}
  */
  readonly delete?: string;
}

export function cciNamespaceTimeoutsToTerraform(struct?: CciNamespaceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function cciNamespaceTimeoutsToHclTerraform(struct?: CciNamespaceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CciNamespaceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CciNamespaceTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CciNamespaceTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace huaweicloud_cci_namespace}
*/
export class CciNamespace extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cci_namespace";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CciNamespace resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CciNamespace to import
  * @param importFromId The id of the existing CciNamespace that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CciNamespace to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cci_namespace", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cci_namespace huaweicloud_cci_namespace} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CciNamespaceConfig
  */
  public constructor(scope: Construct, id: string, config: CciNamespaceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cci_namespace',
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
    this._autoExpendEnabled = config.autoExpendEnabled;
    this._containerNetworkEnabled = config.containerNetworkEnabled;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._name = config.name;
    this._rbacEnabled = config.rbacEnabled;
    this._recyclingInterval = config.recyclingInterval;
    this._region = config.region;
    this._type = config.type;
    this._warmupPoolSize = config.warmupPoolSize;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auto_expend_enabled - computed: true, optional: true, required: false
  private _autoExpendEnabled?: boolean | cdktf.IResolvable; 
  public get autoExpendEnabled() {
    return this.getBooleanAttribute('auto_expend_enabled');
  }
  public set autoExpendEnabled(value: boolean | cdktf.IResolvable) {
    this._autoExpendEnabled = value;
  }
  public resetAutoExpendEnabled() {
    this._autoExpendEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoExpendEnabledInput() {
    return this._autoExpendEnabled;
  }

  // container_network_enabled - computed: true, optional: true, required: false
  private _containerNetworkEnabled?: boolean | cdktf.IResolvable; 
  public get containerNetworkEnabled() {
    return this.getBooleanAttribute('container_network_enabled');
  }
  public set containerNetworkEnabled(value: boolean | cdktf.IResolvable) {
    this._containerNetworkEnabled = value;
  }
  public resetContainerNetworkEnabled() {
    this._containerNetworkEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get containerNetworkEnabledInput() {
    return this._containerNetworkEnabled;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // enterprise_project_id - computed: true, optional: true, required: false
  private _enterpriseProjectId?: string; 
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }
  public set enterpriseProjectId(value: string) {
    this._enterpriseProjectId = value;
  }
  public resetEnterpriseProjectId() {
    this._enterpriseProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseProjectIdInput() {
    return this._enterpriseProjectId;
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

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // rbac_enabled - computed: false, optional: true, required: false
  private _rbacEnabled?: boolean | cdktf.IResolvable; 
  public get rbacEnabled() {
    return this.getBooleanAttribute('rbac_enabled');
  }
  public set rbacEnabled(value: boolean | cdktf.IResolvable) {
    this._rbacEnabled = value;
  }
  public resetRbacEnabled() {
    this._rbacEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rbacEnabledInput() {
    return this._rbacEnabled;
  }

  // recycling_interval - computed: true, optional: true, required: false
  private _recyclingInterval?: number; 
  public get recyclingInterval() {
    return this.getNumberAttribute('recycling_interval');
  }
  public set recyclingInterval(value: number) {
    this._recyclingInterval = value;
  }
  public resetRecyclingInterval() {
    this._recyclingInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recyclingIntervalInput() {
    return this._recyclingInterval;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // warmup_pool_size - computed: true, optional: true, required: false
  private _warmupPoolSize?: number; 
  public get warmupPoolSize() {
    return this.getNumberAttribute('warmup_pool_size');
  }
  public set warmupPoolSize(value: number) {
    this._warmupPoolSize = value;
  }
  public resetWarmupPoolSize() {
    this._warmupPoolSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get warmupPoolSizeInput() {
    return this._warmupPoolSize;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CciNamespaceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CciNamespaceTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auto_expend_enabled: cdktf.booleanToTerraform(this._autoExpendEnabled),
      container_network_enabled: cdktf.booleanToTerraform(this._containerNetworkEnabled),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      rbac_enabled: cdktf.booleanToTerraform(this._rbacEnabled),
      recycling_interval: cdktf.numberToTerraform(this._recyclingInterval),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.stringToTerraform(this._type),
      warmup_pool_size: cdktf.numberToTerraform(this._warmupPoolSize),
      timeouts: cciNamespaceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_expend_enabled: {
        value: cdktf.booleanToHclTerraform(this._autoExpendEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      container_network_enabled: {
        value: cdktf.booleanToHclTerraform(this._containerNetworkEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      rbac_enabled: {
        value: cdktf.booleanToHclTerraform(this._rbacEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      recycling_interval: {
        value: cdktf.numberToHclTerraform(this._recyclingInterval),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
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
      warmup_pool_size: {
        value: cdktf.numberToHclTerraform(this._warmupPoolSize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      timeouts: {
        value: cciNamespaceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CciNamespaceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

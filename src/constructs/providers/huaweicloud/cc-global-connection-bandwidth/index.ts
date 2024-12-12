// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CcGlobalConnectionBandwidthConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#binding_service CcGlobalConnectionBandwidth#binding_service}
  */
  readonly bindingService?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#bordercross CcGlobalConnectionBandwidth#bordercross}
  */
  readonly bordercross: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#charge_mode CcGlobalConnectionBandwidth#charge_mode}
  */
  readonly chargeMode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#description CcGlobalConnectionBandwidth#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#enterprise_project_id CcGlobalConnectionBandwidth#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#id CcGlobalConnectionBandwidth#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#local_area CcGlobalConnectionBandwidth#local_area}
  */
  readonly localArea?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#name CcGlobalConnectionBandwidth#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#remote_area CcGlobalConnectionBandwidth#remote_area}
  */
  readonly remoteArea?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#size CcGlobalConnectionBandwidth#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#sla_level CcGlobalConnectionBandwidth#sla_level}
  */
  readonly slaLevel?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#spec_code_id CcGlobalConnectionBandwidth#spec_code_id}
  */
  readonly specCodeId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#tags CcGlobalConnectionBandwidth#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#type CcGlobalConnectionBandwidth#type}
  */
  readonly type: string;
}
export interface CcGlobalConnectionBandwidthInstances {
}

export function ccGlobalConnectionBandwidthInstancesToTerraform(struct?: CcGlobalConnectionBandwidthInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function ccGlobalConnectionBandwidthInstancesToHclTerraform(struct?: CcGlobalConnectionBandwidthInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CcGlobalConnectionBandwidthInstancesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CcGlobalConnectionBandwidthInstances | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CcGlobalConnectionBandwidthInstances | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // region - computed: true, optional: false, required: false
  public get region() {
    return this.getStringAttribute('region');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class CcGlobalConnectionBandwidthInstancesList extends cdktf.ComplexList {

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
  public get(index: number): CcGlobalConnectionBandwidthInstancesOutputReference {
    return new CcGlobalConnectionBandwidthInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth huaweicloud_cc_global_connection_bandwidth}
*/
export class CcGlobalConnectionBandwidth extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_global_connection_bandwidth";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CcGlobalConnectionBandwidth resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CcGlobalConnectionBandwidth to import
  * @param importFromId The id of the existing CcGlobalConnectionBandwidth that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CcGlobalConnectionBandwidth to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_global_connection_bandwidth", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth huaweicloud_cc_global_connection_bandwidth} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CcGlobalConnectionBandwidthConfig
  */
  public constructor(scope: Construct, id: string, config: CcGlobalConnectionBandwidthConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_global_connection_bandwidth',
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
    this._bindingService = config.bindingService;
    this._bordercross = config.bordercross;
    this._chargeMode = config.chargeMode;
    this._description = config.description;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._localArea = config.localArea;
    this._name = config.name;
    this._remoteArea = config.remoteArea;
    this._size = config.size;
    this._slaLevel = config.slaLevel;
    this._specCodeId = config.specCodeId;
    this._tags = config.tags;
    this._type = config.type;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // binding_service - computed: true, optional: true, required: false
  private _bindingService?: string; 
  public get bindingService() {
    return this.getStringAttribute('binding_service');
  }
  public set bindingService(value: string) {
    this._bindingService = value;
  }
  public resetBindingService() {
    this._bindingService = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bindingServiceInput() {
    return this._bindingService;
  }

  // bordercross - computed: false, optional: false, required: true
  private _bordercross?: boolean | cdktf.IResolvable; 
  public get bordercross() {
    return this.getBooleanAttribute('bordercross');
  }
  public set bordercross(value: boolean | cdktf.IResolvable) {
    this._bordercross = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bordercrossInput() {
    return this._bordercross;
  }

  // charge_mode - computed: false, optional: false, required: true
  private _chargeMode?: string; 
  public get chargeMode() {
    return this.getStringAttribute('charge_mode');
  }
  public set chargeMode(value: string) {
    this._chargeMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get chargeModeInput() {
    return this._chargeMode;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: false, optional: true, required: false
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  public resetDescription() {
    this._description = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
  }

  // enable_share - computed: true, optional: false, required: false
  public get enableShare() {
    return this.getBooleanAttribute('enable_share');
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

  // frozen - computed: true, optional: false, required: false
  public get frozen() {
    return this.getBooleanAttribute('frozen');
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

  // instances - computed: true, optional: false, required: false
  private _instances = new CcGlobalConnectionBandwidthInstancesList(this, "instances", false);
  public get instances() {
    return this._instances;
  }

  // local_area - computed: true, optional: true, required: false
  private _localArea?: string; 
  public get localArea() {
    return this.getStringAttribute('local_area');
  }
  public set localArea(value: string) {
    this._localArea = value;
  }
  public resetLocalArea() {
    this._localArea = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get localAreaInput() {
    return this._localArea;
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

  // remote_area - computed: true, optional: true, required: false
  private _remoteArea?: string; 
  public get remoteArea() {
    return this.getStringAttribute('remote_area');
  }
  public set remoteArea(value: string) {
    this._remoteArea = value;
  }
  public resetRemoteArea() {
    this._remoteArea = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get remoteAreaInput() {
    return this._remoteArea;
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // sla_level - computed: true, optional: true, required: false
  private _slaLevel?: string; 
  public get slaLevel() {
    return this.getStringAttribute('sla_level');
  }
  public set slaLevel(value: string) {
    this._slaLevel = value;
  }
  public resetSlaLevel() {
    this._slaLevel = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get slaLevelInput() {
    return this._slaLevel;
  }

  // spec_code_id - computed: false, optional: true, required: false
  private _specCodeId?: string; 
  public get specCodeId() {
    return this.getStringAttribute('spec_code_id');
  }
  public set specCodeId(value: string) {
    this._specCodeId = value;
  }
  public resetSpecCodeId() {
    this._specCodeId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get specCodeIdInput() {
    return this._specCodeId;
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      binding_service: cdktf.stringToTerraform(this._bindingService),
      bordercross: cdktf.booleanToTerraform(this._bordercross),
      charge_mode: cdktf.stringToTerraform(this._chargeMode),
      description: cdktf.stringToTerraform(this._description),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      local_area: cdktf.stringToTerraform(this._localArea),
      name: cdktf.stringToTerraform(this._name),
      remote_area: cdktf.stringToTerraform(this._remoteArea),
      size: cdktf.numberToTerraform(this._size),
      sla_level: cdktf.stringToTerraform(this._slaLevel),
      spec_code_id: cdktf.stringToTerraform(this._specCodeId),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      type: cdktf.stringToTerraform(this._type),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      binding_service: {
        value: cdktf.stringToHclTerraform(this._bindingService),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      bordercross: {
        value: cdktf.booleanToHclTerraform(this._bordercross),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      charge_mode: {
        value: cdktf.stringToHclTerraform(this._chargeMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      local_area: {
        value: cdktf.stringToHclTerraform(this._localArea),
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
      remote_area: {
        value: cdktf.stringToHclTerraform(this._remoteArea),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      size: {
        value: cdktf.numberToHclTerraform(this._size),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      sla_level: {
        value: cdktf.stringToHclTerraform(this._slaLevel),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      spec_code_id: {
        value: cdktf.stringToHclTerraform(this._specCodeId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
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

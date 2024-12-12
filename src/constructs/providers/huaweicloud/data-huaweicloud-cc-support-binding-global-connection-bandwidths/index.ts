// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the global connection bandwidth status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#admin_state DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#admin_state}
  */
  readonly adminState?: string;
  /**
  * Specifies the binding service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#binding_service DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#binding_service}
  */
  readonly bindingService: string;
  /**
  * Specifies the billing option.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#charge_mode DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#charge_mode}
  */
  readonly chargeMode?: string;
  /**
  * Specifies the enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#enterprise_project_id DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Specifies the global connection bandwidth ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#gcb_id DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#gcb_id}
  */
  readonly gcbId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#id DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the local access point.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#local_area DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#local_area}
  */
  readonly localArea?: string;
  /**
  * Specifies the global connection bandwidth name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#name DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#name}
  */
  readonly name?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#region DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#region}
  */
  readonly region?: string;
  /**
  * Specifies the remote access point.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#remote_area DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#remote_area}
  */
  readonly remoteArea?: string;
  /**
  * Specifies the global connection bandwidth size.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#size DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#size}
  */
  readonly size?: number;
  /**
  * Specifies the class of a global connection bandwidth.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#sla_level DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#sla_level}
  */
  readonly slaLevel?: string;
  /**
  * Specifies the global connection bandwidth type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#type DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths#type}
  */
  readonly type?: string;
}
export interface DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidths {
}

export function dataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidthsToTerraform(struct?: DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidths): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidthsToHclTerraform(struct?: DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidths): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidthsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidths | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidths | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // admin_state - computed: true, optional: false, required: false
  public get adminState() {
    return this.getStringAttribute('admin_state');
  }

  // binding_service - computed: true, optional: false, required: false
  public get bindingService() {
    return this.getStringAttribute('binding_service');
  }

  // bordercross - computed: true, optional: false, required: false
  public get bordercross() {
    return this.getBooleanAttribute('bordercross');
  }

  // charge_mode - computed: true, optional: false, required: false
  public get chargeMode() {
    return this.getStringAttribute('charge_mode');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // domain_id - computed: true, optional: false, required: false
  public get domainId() {
    return this.getStringAttribute('domain_id');
  }

  // enable_share - computed: true, optional: false, required: false
  public get enableShare() {
    return this.getBooleanAttribute('enable_share');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // frozen - computed: true, optional: false, required: false
  public get frozen() {
    return this.getBooleanAttribute('frozen');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // local_area - computed: true, optional: false, required: false
  public get localArea() {
    return this.getStringAttribute('local_area');
  }

  // local_site_code - computed: true, optional: false, required: false
  public get localSiteCode() {
    return this.getStringAttribute('local_site_code');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // remote_area - computed: true, optional: false, required: false
  public get remoteArea() {
    return this.getStringAttribute('remote_area');
  }

  // remote_site_code - computed: true, optional: false, required: false
  public get remoteSiteCode() {
    return this.getStringAttribute('remote_site_code');
  }

  // size - computed: true, optional: false, required: false
  public get size() {
    return this.getNumberAttribute('size');
  }

  // sla_level - computed: true, optional: false, required: false
  public get slaLevel() {
    return this.getStringAttribute('sla_level');
  }

  // spec_code_id - computed: true, optional: false, required: false
  public get specCodeId() {
    return this.getStringAttribute('spec_code_id');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidthsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidthsOutputReference {
    return new DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidthsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths huaweicloud_cc_support_binding_global_connection_bandwidths}
*/
export class DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_support_binding_global_connection_bandwidths";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths to import
  * @param importFromId The id of the existing DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCcSupportBindingGlobalConnectionBandwidths to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_support_binding_global_connection_bandwidths", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_support_binding_global_connection_bandwidths huaweicloud_cc_support_binding_global_connection_bandwidths} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_support_binding_global_connection_bandwidths',
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
    this._adminState = config.adminState;
    this._bindingService = config.bindingService;
    this._chargeMode = config.chargeMode;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._gcbId = config.gcbId;
    this._id = config.id;
    this._localArea = config.localArea;
    this._name = config.name;
    this._region = config.region;
    this._remoteArea = config.remoteArea;
    this._size = config.size;
    this._slaLevel = config.slaLevel;
    this._type = config.type;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // admin_state - computed: false, optional: true, required: false
  private _adminState?: string; 
  public get adminState() {
    return this.getStringAttribute('admin_state');
  }
  public set adminState(value: string) {
    this._adminState = value;
  }
  public resetAdminState() {
    this._adminState = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get adminStateInput() {
    return this._adminState;
  }

  // binding_service - computed: false, optional: false, required: true
  private _bindingService?: string; 
  public get bindingService() {
    return this.getStringAttribute('binding_service');
  }
  public set bindingService(value: string) {
    this._bindingService = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bindingServiceInput() {
    return this._bindingService;
  }

  // charge_mode - computed: false, optional: true, required: false
  private _chargeMode?: string; 
  public get chargeMode() {
    return this.getStringAttribute('charge_mode');
  }
  public set chargeMode(value: string) {
    this._chargeMode = value;
  }
  public resetChargeMode() {
    this._chargeMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chargeModeInput() {
    return this._chargeMode;
  }

  // enterprise_project_id - computed: false, optional: true, required: false
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

  // gcb_id - computed: false, optional: true, required: false
  private _gcbId?: string; 
  public get gcbId() {
    return this.getStringAttribute('gcb_id');
  }
  public set gcbId(value: string) {
    this._gcbId = value;
  }
  public resetGcbId() {
    this._gcbId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gcbIdInput() {
    return this._gcbId;
  }

  // globalconnection_bandwidths - computed: true, optional: false, required: false
  private _globalconnectionBandwidths = new DataHuaweicloudCcSupportBindingGlobalConnectionBandwidthsGlobalconnectionBandwidthsList(this, "globalconnection_bandwidths", false);
  public get globalconnectionBandwidths() {
    return this._globalconnectionBandwidths;
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

  // local_area - computed: false, optional: true, required: false
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

  // remote_area - computed: false, optional: true, required: false
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

  // size - computed: false, optional: true, required: false
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  public resetSize() {
    this._size = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // sla_level - computed: false, optional: true, required: false
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
      admin_state: cdktf.stringToTerraform(this._adminState),
      binding_service: cdktf.stringToTerraform(this._bindingService),
      charge_mode: cdktf.stringToTerraform(this._chargeMode),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      gcb_id: cdktf.stringToTerraform(this._gcbId),
      id: cdktf.stringToTerraform(this._id),
      local_area: cdktf.stringToTerraform(this._localArea),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      remote_area: cdktf.stringToTerraform(this._remoteArea),
      size: cdktf.numberToTerraform(this._size),
      sla_level: cdktf.stringToTerraform(this._slaLevel),
      type: cdktf.stringToTerraform(this._type),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      admin_state: {
        value: cdktf.stringToHclTerraform(this._adminState),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      binding_service: {
        value: cdktf.stringToHclTerraform(this._bindingService),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      charge_mode: {
        value: cdktf.stringToHclTerraform(this._chargeMode),
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
      gcb_id: {
        value: cdktf.stringToHclTerraform(this._gcbId),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
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

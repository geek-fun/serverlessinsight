// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCcGlobalConnectionBandwidthsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Status of the global connection bandwidth.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#admin_state DataHuaweicloudCcGlobalConnectionBandwidths#admin_state}
  */
  readonly adminState?: string;
  /**
  * Binding service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#binding_service DataHuaweicloudCcGlobalConnectionBandwidths#binding_service}
  */
  readonly bindingService?: string;
  /**
  * Billing option.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#charge_mode DataHuaweicloudCcGlobalConnectionBandwidths#charge_mode}
  */
  readonly chargeMode?: string;
  /**
  * Enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#enterprise_project_id DataHuaweicloudCcGlobalConnectionBandwidths#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Resource ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#gcb_id DataHuaweicloudCcGlobalConnectionBandwidths#gcb_id}
  */
  readonly gcbId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#id DataHuaweicloudCcGlobalConnectionBandwidths#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Bound instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#instance_id DataHuaweicloudCcGlobalConnectionBandwidths#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Instance type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#instance_type DataHuaweicloudCcGlobalConnectionBandwidths#instance_type}
  */
  readonly instanceType?: string;
  /**
  * Resource name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#name DataHuaweicloudCcGlobalConnectionBandwidths#name}
  */
  readonly name?: string;
  /**
  * Specifies the region in which to query the resource.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#region DataHuaweicloudCcGlobalConnectionBandwidths#region}
  */
  readonly region?: string;
  /**
  * Range of a global connection bandwidth, in Mbit/s.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#size DataHuaweicloudCcGlobalConnectionBandwidths#size}
  */
  readonly size?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#tags DataHuaweicloudCcGlobalConnectionBandwidths#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Type of a global connection bandwidth.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#type DataHuaweicloudCcGlobalConnectionBandwidths#type}
  */
  readonly type?: string;
}
export interface DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstances {
}

export function dataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstancesToTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstancesToHclTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstancesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstances | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstances | undefined) {
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

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // region_id - computed: true, optional: false, required: false
  public get regionId() {
    return this.getStringAttribute('region_id');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstancesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstancesOutputReference {
    return new DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidths {
}

export function dataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsToTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidths): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsToHclTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidths): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidths | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidths | undefined) {
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

  // instances - computed: true, optional: false, required: false
  private _instances = new DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsInstancesList(this, "instances", false);
  public get instances() {
    return this._instances;
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

  // tags - computed: true, optional: false, required: false
  private _tags = new cdktf.StringMap(this, "tags");
  public get tags() {
    return this._tags;
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

export class DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsOutputReference {
    return new DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths huaweicloud_cc_global_connection_bandwidths}
*/
export class DataHuaweicloudCcGlobalConnectionBandwidths extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_global_connection_bandwidths";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCcGlobalConnectionBandwidths resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCcGlobalConnectionBandwidths to import
  * @param importFromId The id of the existing DataHuaweicloudCcGlobalConnectionBandwidths that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCcGlobalConnectionBandwidths to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_global_connection_bandwidths", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidths huaweicloud_cc_global_connection_bandwidths} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCcGlobalConnectionBandwidthsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCcGlobalConnectionBandwidthsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_global_connection_bandwidths',
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
    this._instanceId = config.instanceId;
    this._instanceType = config.instanceType;
    this._name = config.name;
    this._region = config.region;
    this._size = config.size;
    this._tags = config.tags;
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

  // binding_service - computed: false, optional: true, required: false
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
  private _globalconnectionBandwidths = new DataHuaweicloudCcGlobalConnectionBandwidthsGlobalconnectionBandwidthsList(this, "globalconnection_bandwidths", false);
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

  // instance_type - computed: false, optional: true, required: false
  private _instanceType?: string; 
  public get instanceType() {
    return this.getStringAttribute('instance_type');
  }
  public set instanceType(value: string) {
    this._instanceType = value;
  }
  public resetInstanceType() {
    this._instanceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceTypeInput() {
    return this._instanceType;
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
      instance_id: cdktf.stringToTerraform(this._instanceId),
      instance_type: cdktf.stringToTerraform(this._instanceType),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      size: cdktf.numberToTerraform(this._size),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      instance_type: {
        value: cdktf.stringToHclTerraform(this._instanceType),
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
      size: {
        value: cdktf.numberToHclTerraform(this._size),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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

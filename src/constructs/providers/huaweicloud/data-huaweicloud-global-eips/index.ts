// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudGlobalEipsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#associate_instance_id DataHuaweicloudGlobalEips#associate_instance_id}
  */
  readonly associateInstanceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#associate_instance_type DataHuaweicloudGlobalEips#associate_instance_type}
  */
  readonly associateInstanceType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#enterprise_project_id DataHuaweicloudGlobalEips#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#geip_id DataHuaweicloudGlobalEips#geip_id}
  */
  readonly geipId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#id DataHuaweicloudGlobalEips#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#internet_bandwidth_id DataHuaweicloudGlobalEips#internet_bandwidth_id}
  */
  readonly internetBandwidthId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#ip_address DataHuaweicloudGlobalEips#ip_address}
  */
  readonly ipAddress?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#name DataHuaweicloudGlobalEips#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#status DataHuaweicloudGlobalEips#status}
  */
  readonly status?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#tags DataHuaweicloudGlobalEips#tags}
  */
  readonly tags?: { [key: string]: string };
}
export interface DataHuaweicloudGlobalEipsGlobalEips {
}

export function dataHuaweicloudGlobalEipsGlobalEipsToTerraform(struct?: DataHuaweicloudGlobalEipsGlobalEips): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudGlobalEipsGlobalEipsToHclTerraform(struct?: DataHuaweicloudGlobalEipsGlobalEips): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudGlobalEipsGlobalEipsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudGlobalEipsGlobalEips | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudGlobalEipsGlobalEips | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // access_site - computed: true, optional: false, required: false
  public get accessSite() {
    return this.getStringAttribute('access_site');
  }

  // associate_instance_id - computed: true, optional: false, required: false
  public get associateInstanceId() {
    return this.getStringAttribute('associate_instance_id');
  }

  // associate_instance_region - computed: true, optional: false, required: false
  public get associateInstanceRegion() {
    return this.getStringAttribute('associate_instance_region');
  }

  // associate_instance_type - computed: true, optional: false, required: false
  public get associateInstanceType() {
    return this.getStringAttribute('associate_instance_type');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // frozen - computed: true, optional: false, required: false
  public get frozen() {
    return this.getBooleanAttribute('frozen');
  }

  // frozen_info - computed: true, optional: false, required: false
  public get frozenInfo() {
    return this.getStringAttribute('frozen_info');
  }

  // geip_pool_name - computed: true, optional: false, required: false
  public get geipPoolName() {
    return this.getStringAttribute('geip_pool_name');
  }

  // global_connection_bandwidth_id - computed: true, optional: false, required: false
  public get globalConnectionBandwidthId() {
    return this.getStringAttribute('global_connection_bandwidth_id');
  }

  // global_connection_bandwidth_type - computed: true, optional: false, required: false
  public get globalConnectionBandwidthType() {
    return this.getStringAttribute('global_connection_bandwidth_type');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // internet_bandwidth_id - computed: true, optional: false, required: false
  public get internetBandwidthId() {
    return this.getStringAttribute('internet_bandwidth_id');
  }

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // ip_version - computed: true, optional: false, required: false
  public get ipVersion() {
    return this.getNumberAttribute('ip_version');
  }

  // isp - computed: true, optional: false, required: false
  public get isp() {
    return this.getStringAttribute('isp');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // polluted - computed: true, optional: false, required: false
  public get polluted() {
    return this.getBooleanAttribute('polluted');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tags - computed: true, optional: false, required: false
  private _tags = new cdktf.StringMap(this, "tags");
  public get tags() {
    return this._tags;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudGlobalEipsGlobalEipsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudGlobalEipsGlobalEipsOutputReference {
    return new DataHuaweicloudGlobalEipsGlobalEipsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips huaweicloud_global_eips}
*/
export class DataHuaweicloudGlobalEips extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_global_eips";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudGlobalEips resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudGlobalEips to import
  * @param importFromId The id of the existing DataHuaweicloudGlobalEips that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudGlobalEips to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_global_eips", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/global_eips huaweicloud_global_eips} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudGlobalEipsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudGlobalEipsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_global_eips',
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
    this._associateInstanceId = config.associateInstanceId;
    this._associateInstanceType = config.associateInstanceType;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._geipId = config.geipId;
    this._id = config.id;
    this._internetBandwidthId = config.internetBandwidthId;
    this._ipAddress = config.ipAddress;
    this._name = config.name;
    this._status = config.status;
    this._tags = config.tags;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // associate_instance_id - computed: false, optional: true, required: false
  private _associateInstanceId?: string; 
  public get associateInstanceId() {
    return this.getStringAttribute('associate_instance_id');
  }
  public set associateInstanceId(value: string) {
    this._associateInstanceId = value;
  }
  public resetAssociateInstanceId() {
    this._associateInstanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get associateInstanceIdInput() {
    return this._associateInstanceId;
  }

  // associate_instance_type - computed: false, optional: true, required: false
  private _associateInstanceType?: string; 
  public get associateInstanceType() {
    return this.getStringAttribute('associate_instance_type');
  }
  public set associateInstanceType(value: string) {
    this._associateInstanceType = value;
  }
  public resetAssociateInstanceType() {
    this._associateInstanceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get associateInstanceTypeInput() {
    return this._associateInstanceType;
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

  // geip_id - computed: false, optional: true, required: false
  private _geipId?: string; 
  public get geipId() {
    return this.getStringAttribute('geip_id');
  }
  public set geipId(value: string) {
    this._geipId = value;
  }
  public resetGeipId() {
    this._geipId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get geipIdInput() {
    return this._geipId;
  }

  // global_eips - computed: true, optional: false, required: false
  private _globalEips = new DataHuaweicloudGlobalEipsGlobalEipsList(this, "global_eips", false);
  public get globalEips() {
    return this._globalEips;
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

  // internet_bandwidth_id - computed: false, optional: true, required: false
  private _internetBandwidthId?: string; 
  public get internetBandwidthId() {
    return this.getStringAttribute('internet_bandwidth_id');
  }
  public set internetBandwidthId(value: string) {
    this._internetBandwidthId = value;
  }
  public resetInternetBandwidthId() {
    this._internetBandwidthId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get internetBandwidthIdInput() {
    return this._internetBandwidthId;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      associate_instance_id: cdktf.stringToTerraform(this._associateInstanceId),
      associate_instance_type: cdktf.stringToTerraform(this._associateInstanceType),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      geip_id: cdktf.stringToTerraform(this._geipId),
      id: cdktf.stringToTerraform(this._id),
      internet_bandwidth_id: cdktf.stringToTerraform(this._internetBandwidthId),
      ip_address: cdktf.stringToTerraform(this._ipAddress),
      name: cdktf.stringToTerraform(this._name),
      status: cdktf.stringToTerraform(this._status),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      associate_instance_id: {
        value: cdktf.stringToHclTerraform(this._associateInstanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      associate_instance_type: {
        value: cdktf.stringToHclTerraform(this._associateInstanceType),
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
      geip_id: {
        value: cdktf.stringToHclTerraform(this._geipId),
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
      internet_bandwidth_id: {
        value: cdktf.stringToHclTerraform(this._internetBandwidthId),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

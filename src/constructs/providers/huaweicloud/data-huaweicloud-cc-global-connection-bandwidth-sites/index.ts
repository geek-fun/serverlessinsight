// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCcGlobalConnectionBandwidthSitesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites#id DataHuaweicloudCcGlobalConnectionBandwidthSites#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the site name in Chinese.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites#name_cn DataHuaweicloudCcGlobalConnectionBandwidthSites#name_cn}
  */
  readonly nameCn?: string;
  /**
  * Specifies the site name in English.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites#name_en DataHuaweicloudCcGlobalConnectionBandwidthSites#name_en}
  */
  readonly nameEn?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites#region DataHuaweicloudCcGlobalConnectionBandwidthSites#region}
  */
  readonly region?: string;
  /**
  * Specifies site code.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites#site_code DataHuaweicloudCcGlobalConnectionBandwidthSites#site_code}
  */
  readonly siteCode?: string;
  /**
  * Specifies site ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites#site_id DataHuaweicloudCcGlobalConnectionBandwidthSites#site_id}
  */
  readonly siteId?: string;
  /**
  * Specifies site type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites#site_type DataHuaweicloudCcGlobalConnectionBandwidthSites#site_type}
  */
  readonly siteType?: string;
}
export interface DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStruct {
}

export function dataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStructToTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStructToHclTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStruct | undefined) {
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

  // name_cn - computed: true, optional: false, required: false
  public get nameCn() {
    return this.getStringAttribute('name_cn');
  }

  // name_en - computed: true, optional: false, required: false
  public get nameEn() {
    return this.getStringAttribute('name_en');
  }
}

export class DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStructList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStructOutputReference {
    return new DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfos {
}

export function dataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosToTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfos): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosToHclTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfos): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfos | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfos | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // group_list - computed: true, optional: false, required: false
  private _groupList = new DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosGroupListStructList(this, "group_list", false);
  public get groupList() {
    return this._groupList;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name_cn - computed: true, optional: false, required: false
  public get nameCn() {
    return this.getStringAttribute('name_cn');
  }

  // name_en - computed: true, optional: false, required: false
  public get nameEn() {
    return this.getStringAttribute('name_en');
  }

  // public_border_group - computed: true, optional: false, required: false
  public get publicBorderGroup() {
    return this.getStringAttribute('public_border_group');
  }

  // region_id - computed: true, optional: false, required: false
  public get regionId() {
    return this.getStringAttribute('region_id');
  }

  // service_list - computed: true, optional: false, required: false
  public get serviceList() {
    return this.getStringAttribute('service_list');
  }

  // site_code - computed: true, optional: false, required: false
  public get siteCode() {
    return this.getStringAttribute('site_code');
  }

  // site_type - computed: true, optional: false, required: false
  public get siteType() {
    return this.getStringAttribute('site_type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosOutputReference {
    return new DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites huaweicloud_cc_global_connection_bandwidth_sites}
*/
export class DataHuaweicloudCcGlobalConnectionBandwidthSites extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_global_connection_bandwidth_sites";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCcGlobalConnectionBandwidthSites resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCcGlobalConnectionBandwidthSites to import
  * @param importFromId The id of the existing DataHuaweicloudCcGlobalConnectionBandwidthSites that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCcGlobalConnectionBandwidthSites to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_global_connection_bandwidth_sites", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_sites huaweicloud_cc_global_connection_bandwidth_sites} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCcGlobalConnectionBandwidthSitesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCcGlobalConnectionBandwidthSitesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_global_connection_bandwidth_sites',
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
    this._nameCn = config.nameCn;
    this._nameEn = config.nameEn;
    this._region = config.region;
    this._siteCode = config.siteCode;
    this._siteId = config.siteId;
    this._siteType = config.siteType;
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

  // name_cn - computed: false, optional: true, required: false
  private _nameCn?: string; 
  public get nameCn() {
    return this.getStringAttribute('name_cn');
  }
  public set nameCn(value: string) {
    this._nameCn = value;
  }
  public resetNameCn() {
    this._nameCn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameCnInput() {
    return this._nameCn;
  }

  // name_en - computed: false, optional: true, required: false
  private _nameEn?: string; 
  public get nameEn() {
    return this.getStringAttribute('name_en');
  }
  public set nameEn(value: string) {
    this._nameEn = value;
  }
  public resetNameEn() {
    this._nameEn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameEnInput() {
    return this._nameEn;
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

  // site_code - computed: false, optional: true, required: false
  private _siteCode?: string; 
  public get siteCode() {
    return this.getStringAttribute('site_code');
  }
  public set siteCode(value: string) {
    this._siteCode = value;
  }
  public resetSiteCode() {
    this._siteCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get siteCodeInput() {
    return this._siteCode;
  }

  // site_id - computed: false, optional: true, required: false
  private _siteId?: string; 
  public get siteId() {
    return this.getStringAttribute('site_id');
  }
  public set siteId(value: string) {
    this._siteId = value;
  }
  public resetSiteId() {
    this._siteId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get siteIdInput() {
    return this._siteId;
  }

  // site_infos - computed: true, optional: false, required: false
  private _siteInfos = new DataHuaweicloudCcGlobalConnectionBandwidthSitesSiteInfosList(this, "site_infos", false);
  public get siteInfos() {
    return this._siteInfos;
  }

  // site_type - computed: false, optional: true, required: false
  private _siteType?: string; 
  public get siteType() {
    return this.getStringAttribute('site_type');
  }
  public set siteType(value: string) {
    this._siteType = value;
  }
  public resetSiteType() {
    this._siteType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get siteTypeInput() {
    return this._siteType;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name_cn: cdktf.stringToTerraform(this._nameCn),
      name_en: cdktf.stringToTerraform(this._nameEn),
      region: cdktf.stringToTerraform(this._region),
      site_code: cdktf.stringToTerraform(this._siteCode),
      site_id: cdktf.stringToTerraform(this._siteId),
      site_type: cdktf.stringToTerraform(this._siteType),
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
      name_cn: {
        value: cdktf.stringToHclTerraform(this._nameCn),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name_en: {
        value: cdktf.stringToHclTerraform(this._nameEn),
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
      site_code: {
        value: cdktf.stringToHclTerraform(this._siteCode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      site_id: {
        value: cdktf.stringToHclTerraform(this._siteId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      site_type: {
        value: cdktf.stringToHclTerraform(this._siteType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

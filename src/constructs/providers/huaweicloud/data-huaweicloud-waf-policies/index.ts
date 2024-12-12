// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_policies
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudWafPoliciesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_policies#enterprise_project_id DataHuaweicloudWafPolicies#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_policies#id DataHuaweicloudWafPolicies#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_policies#name DataHuaweicloudWafPolicies#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_policies#region DataHuaweicloudWafPolicies#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudWafPoliciesPoliciesBindHosts {
}

export function dataHuaweicloudWafPoliciesPoliciesBindHostsToTerraform(struct?: DataHuaweicloudWafPoliciesPoliciesBindHosts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudWafPoliciesPoliciesBindHostsToHclTerraform(struct?: DataHuaweicloudWafPoliciesPoliciesBindHosts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudWafPoliciesPoliciesBindHostsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudWafPoliciesPoliciesBindHosts | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudWafPoliciesPoliciesBindHosts | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // hostname - computed: true, optional: false, required: false
  public get hostname() {
    return this.getStringAttribute('hostname');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // waf_type - computed: true, optional: false, required: false
  public get wafType() {
    return this.getStringAttribute('waf_type');
  }
}

export class DataHuaweicloudWafPoliciesPoliciesBindHostsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudWafPoliciesPoliciesBindHostsOutputReference {
    return new DataHuaweicloudWafPoliciesPoliciesBindHostsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudWafPoliciesPoliciesOptions {
}

export function dataHuaweicloudWafPoliciesPoliciesOptionsToTerraform(struct?: DataHuaweicloudWafPoliciesPoliciesOptions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudWafPoliciesPoliciesOptionsToHclTerraform(struct?: DataHuaweicloudWafPoliciesPoliciesOptions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudWafPoliciesPoliciesOptionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudWafPoliciesPoliciesOptions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudWafPoliciesPoliciesOptions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // anti_crawler - computed: true, optional: false, required: false
  public get antiCrawler() {
    return this.getBooleanAttribute('anti_crawler');
  }

  // basic_web_protection - computed: true, optional: false, required: false
  public get basicWebProtection() {
    return this.getBooleanAttribute('basic_web_protection');
  }

  // blacklist - computed: true, optional: false, required: false
  public get blacklist() {
    return this.getBooleanAttribute('blacklist');
  }

  // bot_enable - computed: true, optional: false, required: false
  public get botEnable() {
    return this.getBooleanAttribute('bot_enable');
  }

  // cc_attack_protection - computed: true, optional: false, required: false
  public get ccAttackProtection() {
    return this.getBooleanAttribute('cc_attack_protection');
  }

  // crawler - computed: true, optional: false, required: false
  public get crawler() {
    return this.getBooleanAttribute('crawler');
  }

  // crawler_engine - computed: true, optional: false, required: false
  public get crawlerEngine() {
    return this.getBooleanAttribute('crawler_engine');
  }

  // crawler_other - computed: true, optional: false, required: false
  public get crawlerOther() {
    return this.getBooleanAttribute('crawler_other');
  }

  // crawler_scanner - computed: true, optional: false, required: false
  public get crawlerScanner() {
    return this.getBooleanAttribute('crawler_scanner');
  }

  // crawler_script - computed: true, optional: false, required: false
  public get crawlerScript() {
    return this.getBooleanAttribute('crawler_script');
  }

  // data_masking - computed: true, optional: false, required: false
  public get dataMasking() {
    return this.getBooleanAttribute('data_masking');
  }

  // false_alarm_masking - computed: true, optional: false, required: false
  public get falseAlarmMasking() {
    return this.getBooleanAttribute('false_alarm_masking');
  }

  // general_check - computed: true, optional: false, required: false
  public get generalCheck() {
    return this.getBooleanAttribute('general_check');
  }

  // geolocation_access_control - computed: true, optional: false, required: false
  public get geolocationAccessControl() {
    return this.getBooleanAttribute('geolocation_access_control');
  }

  // information_leakage_prevention - computed: true, optional: false, required: false
  public get informationLeakagePrevention() {
    return this.getBooleanAttribute('information_leakage_prevention');
  }

  // known_attack_source - computed: true, optional: false, required: false
  public get knownAttackSource() {
    return this.getBooleanAttribute('known_attack_source');
  }

  // precise_protection - computed: true, optional: false, required: false
  public get preciseProtection() {
    return this.getBooleanAttribute('precise_protection');
  }

  // web_tamper_protection - computed: true, optional: false, required: false
  public get webTamperProtection() {
    return this.getBooleanAttribute('web_tamper_protection');
  }

  // webshell - computed: true, optional: false, required: false
  public get webshell() {
    return this.getBooleanAttribute('webshell');
  }
}

export class DataHuaweicloudWafPoliciesPoliciesOptionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudWafPoliciesPoliciesOptionsOutputReference {
    return new DataHuaweicloudWafPoliciesPoliciesOptionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudWafPoliciesPolicies {
}

export function dataHuaweicloudWafPoliciesPoliciesToTerraform(struct?: DataHuaweicloudWafPoliciesPolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudWafPoliciesPoliciesToHclTerraform(struct?: DataHuaweicloudWafPoliciesPolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudWafPoliciesPoliciesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudWafPoliciesPolicies | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudWafPoliciesPolicies | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // bind_hosts - computed: true, optional: false, required: false
  private _bindHosts = new DataHuaweicloudWafPoliciesPoliciesBindHostsList(this, "bind_hosts", false);
  public get bindHosts() {
    return this._bindHosts;
  }

  // deep_inspection - computed: true, optional: false, required: false
  public get deepInspection() {
    return this.getBooleanAttribute('deep_inspection');
  }

  // full_detection - computed: true, optional: false, required: false
  public get fullDetection() {
    return this.getBooleanAttribute('full_detection');
  }

  // header_inspection - computed: true, optional: false, required: false
  public get headerInspection() {
    return this.getBooleanAttribute('header_inspection');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getNumberAttribute('level');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // options - computed: true, optional: false, required: false
  private _options = new DataHuaweicloudWafPoliciesPoliciesOptionsList(this, "options", false);
  public get options() {
    return this._options;
  }

  // protection_mode - computed: true, optional: false, required: false
  public get protectionMode() {
    return this.getStringAttribute('protection_mode');
  }

  // robot_action - computed: true, optional: false, required: false
  public get robotAction() {
    return this.getStringAttribute('robot_action');
  }

  // shiro_decryption_check - computed: true, optional: false, required: false
  public get shiroDecryptionCheck() {
    return this.getBooleanAttribute('shiro_decryption_check');
  }
}

export class DataHuaweicloudWafPoliciesPoliciesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudWafPoliciesPoliciesOutputReference {
    return new DataHuaweicloudWafPoliciesPoliciesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_policies huaweicloud_waf_policies}
*/
export class DataHuaweicloudWafPolicies extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_waf_policies";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudWafPolicies resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudWafPolicies to import
  * @param importFromId The id of the existing DataHuaweicloudWafPolicies that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_policies#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudWafPolicies to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_waf_policies", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_policies huaweicloud_waf_policies} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudWafPoliciesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudWafPoliciesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_waf_policies',
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
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // policies - computed: true, optional: false, required: false
  private _policies = new DataHuaweicloudWafPoliciesPoliciesList(this, "policies", false);
  public get policies() {
    return this._policies;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudWafDedicatedDomainsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains#domain DataHuaweicloudWafDedicatedDomains#domain}
  */
  readonly domain?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains#enterprise_project_id DataHuaweicloudWafDedicatedDomains#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains#id DataHuaweicloudWafDedicatedDomains#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains#policy_name DataHuaweicloudWafDedicatedDomains#policy_name}
  */
  readonly policyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains#protect_status DataHuaweicloudWafDedicatedDomains#protect_status}
  */
  readonly protectStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains#region DataHuaweicloudWafDedicatedDomains#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudWafDedicatedDomainsDomains {
}

export function dataHuaweicloudWafDedicatedDomainsDomainsToTerraform(struct?: DataHuaweicloudWafDedicatedDomainsDomains): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudWafDedicatedDomainsDomainsToHclTerraform(struct?: DataHuaweicloudWafDedicatedDomainsDomains): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudWafDedicatedDomainsDomainsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudWafDedicatedDomainsDomains | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudWafDedicatedDomainsDomains | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // access_status - computed: true, optional: false, required: false
  public get accessStatus() {
    return this.getNumberAttribute('access_status');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // domain - computed: true, optional: false, required: false
  public get domain() {
    return this.getStringAttribute('domain');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // ipv6_enable - computed: true, optional: false, required: false
  public get ipv6Enable() {
    return this.getBooleanAttribute('ipv6_enable');
  }

  // is_dual_az - computed: true, optional: false, required: false
  public get isDualAz() {
    return this.getBooleanAttribute('is_dual_az');
  }

  // pci_3ds - computed: true, optional: false, required: false
  public get pci3Ds() {
    return this.getBooleanAttribute('pci_3ds');
  }

  // pci_dds - computed: true, optional: false, required: false
  public get pciDds() {
    return this.getBooleanAttribute('pci_dds');
  }

  // policy_id - computed: true, optional: false, required: false
  public get policyId() {
    return this.getStringAttribute('policy_id');
  }

  // protect_status - computed: true, optional: false, required: false
  public get protectStatus() {
    return this.getNumberAttribute('protect_status');
  }

  // website_name - computed: true, optional: false, required: false
  public get websiteName() {
    return this.getStringAttribute('website_name');
  }
}

export class DataHuaweicloudWafDedicatedDomainsDomainsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudWafDedicatedDomainsDomainsOutputReference {
    return new DataHuaweicloudWafDedicatedDomainsDomainsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains huaweicloud_waf_dedicated_domains}
*/
export class DataHuaweicloudWafDedicatedDomains extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_waf_dedicated_domains";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudWafDedicatedDomains resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudWafDedicatedDomains to import
  * @param importFromId The id of the existing DataHuaweicloudWafDedicatedDomains that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudWafDedicatedDomains to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_waf_dedicated_domains", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/waf_dedicated_domains huaweicloud_waf_dedicated_domains} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudWafDedicatedDomainsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudWafDedicatedDomainsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_waf_dedicated_domains',
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
    this._domain = config.domain;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._policyName = config.policyName;
    this._protectStatus = config.protectStatus;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // domain - computed: false, optional: true, required: false
  private _domain?: string; 
  public get domain() {
    return this.getStringAttribute('domain');
  }
  public set domain(value: string) {
    this._domain = value;
  }
  public resetDomain() {
    this._domain = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainInput() {
    return this._domain;
  }

  // domains - computed: true, optional: false, required: false
  private _domains = new DataHuaweicloudWafDedicatedDomainsDomainsList(this, "domains", false);
  public get domains() {
    return this._domains;
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

  // policy_name - computed: false, optional: true, required: false
  private _policyName?: string; 
  public get policyName() {
    return this.getStringAttribute('policy_name');
  }
  public set policyName(value: string) {
    this._policyName = value;
  }
  public resetPolicyName() {
    this._policyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyNameInput() {
    return this._policyName;
  }

  // protect_status - computed: false, optional: true, required: false
  private _protectStatus?: string; 
  public get protectStatus() {
    return this.getStringAttribute('protect_status');
  }
  public set protectStatus(value: string) {
    this._protectStatus = value;
  }
  public resetProtectStatus() {
    this._protectStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protectStatusInput() {
    return this._protectStatus;
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
      domain: cdktf.stringToTerraform(this._domain),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      policy_name: cdktf.stringToTerraform(this._policyName),
      protect_status: cdktf.stringToTerraform(this._protectStatus),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      domain: {
        value: cdktf.stringToHclTerraform(this._domain),
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
      policy_name: {
        value: cdktf.stringToHclTerraform(this._policyName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protect_status: {
        value: cdktf.stringToHclTerraform(this._protectStatus),
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

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SmnSubscriptionFilterPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy#enable_force_new SmnSubscriptionFilterPolicy#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy#id SmnSubscriptionFilterPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy#region SmnSubscriptionFilterPolicy#region}
  */
  readonly region?: string;
  /**
  * Specifies the resource identifier of the subscriber.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy#subscription_urn SmnSubscriptionFilterPolicy#subscription_urn}
  */
  readonly subscriptionUrn: string;
  /**
  * filter_policies block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy#filter_policies SmnSubscriptionFilterPolicy#filter_policies}
  */
  readonly filterPolicies: SmnSubscriptionFilterPolicyFilterPolicies[] | cdktf.IResolvable;
}
export interface SmnSubscriptionFilterPolicyFilterPolicies {
  /**
  * Specifies the filter policy name. The policy name must be unique.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy#name SmnSubscriptionFilterPolicy#name}
  */
  readonly name: string;
  /**
  * Specifies the string array for exact match.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy#string_equals SmnSubscriptionFilterPolicy#string_equals}
  */
  readonly stringEquals: string[];
}

export function smnSubscriptionFilterPolicyFilterPoliciesToTerraform(struct?: SmnSubscriptionFilterPolicyFilterPolicies | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    string_equals: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.stringEquals),
  }
}


export function smnSubscriptionFilterPolicyFilterPoliciesToHclTerraform(struct?: SmnSubscriptionFilterPolicyFilterPolicies | cdktf.IResolvable): any {
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
    string_equals: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.stringEquals),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SmnSubscriptionFilterPolicyFilterPoliciesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): SmnSubscriptionFilterPolicyFilterPolicies | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._stringEquals !== undefined) {
      hasAnyValues = true;
      internalValueResult.stringEquals = this._stringEquals;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SmnSubscriptionFilterPolicyFilterPolicies | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._stringEquals = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._stringEquals = value.stringEquals;
    }
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

  // string_equals - computed: false, optional: false, required: true
  private _stringEquals?: string[]; 
  public get stringEquals() {
    return cdktf.Fn.tolist(this.getListAttribute('string_equals'));
  }
  public set stringEquals(value: string[]) {
    this._stringEquals = value;
  }
  // Temporarily expose input value. Use with caution.
  public get stringEqualsInput() {
    return this._stringEquals;
  }
}

export class SmnSubscriptionFilterPolicyFilterPoliciesList extends cdktf.ComplexList {
  public internalValue? : SmnSubscriptionFilterPolicyFilterPolicies[] | cdktf.IResolvable

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
  public get(index: number): SmnSubscriptionFilterPolicyFilterPoliciesOutputReference {
    return new SmnSubscriptionFilterPolicyFilterPoliciesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy huaweicloud_smn_subscription_filter_policy}
*/
export class SmnSubscriptionFilterPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_smn_subscription_filter_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SmnSubscriptionFilterPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SmnSubscriptionFilterPolicy to import
  * @param importFromId The id of the existing SmnSubscriptionFilterPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SmnSubscriptionFilterPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_smn_subscription_filter_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription_filter_policy huaweicloud_smn_subscription_filter_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SmnSubscriptionFilterPolicyConfig
  */
  public constructor(scope: Construct, id: string, config: SmnSubscriptionFilterPolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_smn_subscription_filter_policy',
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
    this._enableForceNew = config.enableForceNew;
    this._id = config.id;
    this._region = config.region;
    this._subscriptionUrn = config.subscriptionUrn;
    this._filterPolicies.internalValue = config.filterPolicies;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // enable_force_new - computed: false, optional: true, required: false
  private _enableForceNew?: string; 
  public get enableForceNew() {
    return this.getStringAttribute('enable_force_new');
  }
  public set enableForceNew(value: string) {
    this._enableForceNew = value;
  }
  public resetEnableForceNew() {
    this._enableForceNew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableForceNewInput() {
    return this._enableForceNew;
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

  // subscription_urn - computed: false, optional: false, required: true
  private _subscriptionUrn?: string; 
  public get subscriptionUrn() {
    return this.getStringAttribute('subscription_urn');
  }
  public set subscriptionUrn(value: string) {
    this._subscriptionUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subscriptionUrnInput() {
    return this._subscriptionUrn;
  }

  // filter_policies - computed: false, optional: false, required: true
  private _filterPolicies = new SmnSubscriptionFilterPolicyFilterPoliciesList(this, "filter_policies", true);
  public get filterPolicies() {
    return this._filterPolicies;
  }
  public putFilterPolicies(value: SmnSubscriptionFilterPolicyFilterPolicies[] | cdktf.IResolvable) {
    this._filterPolicies.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get filterPoliciesInput() {
    return this._filterPolicies.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      enable_force_new: cdktf.stringToTerraform(this._enableForceNew),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      subscription_urn: cdktf.stringToTerraform(this._subscriptionUrn),
      filter_policies: cdktf.listMapper(smnSubscriptionFilterPolicyFilterPoliciesToTerraform, true)(this._filterPolicies.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      enable_force_new: {
        value: cdktf.stringToHclTerraform(this._enableForceNew),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      subscription_urn: {
        value: cdktf.stringToHclTerraform(this._subscriptionUrn),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      filter_policies: {
        value: cdktf.listMapperHcl(smnSubscriptionFilterPolicyFilterPoliciesToHclTerraform, true)(this._filterPolicies.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "SmnSubscriptionFilterPolicyFilterPoliciesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

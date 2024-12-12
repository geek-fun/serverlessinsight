// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SmnSubscriptionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#endpoint SmnSubscription#endpoint}
  */
  readonly endpoint: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#id SmnSubscription#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#protocol SmnSubscription#protocol}
  */
  readonly protocol: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#region SmnSubscription#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#remark SmnSubscription#remark}
  */
  readonly remark?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#topic_urn SmnSubscription#topic_urn}
  */
  readonly topicUrn: string;
  /**
  * extension block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#extension SmnSubscription#extension}
  */
  readonly extension?: SmnSubscriptionExtension;
}
export interface SmnSubscriptionFilterPolicies {
}

export function smnSubscriptionFilterPoliciesToTerraform(struct?: SmnSubscriptionFilterPolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function smnSubscriptionFilterPoliciesToHclTerraform(struct?: SmnSubscriptionFilterPolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class SmnSubscriptionFilterPoliciesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): SmnSubscriptionFilterPolicies | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SmnSubscriptionFilterPolicies | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // string_equals - computed: true, optional: false, required: false
  public get stringEquals() {
    return this.getListAttribute('string_equals');
  }
}

export class SmnSubscriptionFilterPoliciesList extends cdktf.ComplexList {

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
  public get(index: number): SmnSubscriptionFilterPoliciesOutputReference {
    return new SmnSubscriptionFilterPoliciesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface SmnSubscriptionExtension {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#client_id SmnSubscription#client_id}
  */
  readonly clientId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#client_secret SmnSubscription#client_secret}
  */
  readonly clientSecret?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#keyword SmnSubscription#keyword}
  */
  readonly keyword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#sign_secret SmnSubscription#sign_secret}
  */
  readonly signSecret?: string;
}

export function smnSubscriptionExtensionToTerraform(struct?: SmnSubscriptionExtensionOutputReference | SmnSubscriptionExtension): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    client_id: cdktf.stringToTerraform(struct!.clientId),
    client_secret: cdktf.stringToTerraform(struct!.clientSecret),
    keyword: cdktf.stringToTerraform(struct!.keyword),
    sign_secret: cdktf.stringToTerraform(struct!.signSecret),
  }
}


export function smnSubscriptionExtensionToHclTerraform(struct?: SmnSubscriptionExtensionOutputReference | SmnSubscriptionExtension): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    client_id: {
      value: cdktf.stringToHclTerraform(struct!.clientId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    client_secret: {
      value: cdktf.stringToHclTerraform(struct!.clientSecret),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    keyword: {
      value: cdktf.stringToHclTerraform(struct!.keyword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sign_secret: {
      value: cdktf.stringToHclTerraform(struct!.signSecret),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SmnSubscriptionExtensionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): SmnSubscriptionExtension | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._clientId !== undefined) {
      hasAnyValues = true;
      internalValueResult.clientId = this._clientId;
    }
    if (this._clientSecret !== undefined) {
      hasAnyValues = true;
      internalValueResult.clientSecret = this._clientSecret;
    }
    if (this._keyword !== undefined) {
      hasAnyValues = true;
      internalValueResult.keyword = this._keyword;
    }
    if (this._signSecret !== undefined) {
      hasAnyValues = true;
      internalValueResult.signSecret = this._signSecret;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SmnSubscriptionExtension | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._clientId = undefined;
      this._clientSecret = undefined;
      this._keyword = undefined;
      this._signSecret = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._clientId = value.clientId;
      this._clientSecret = value.clientSecret;
      this._keyword = value.keyword;
      this._signSecret = value.signSecret;
    }
  }

  // client_id - computed: false, optional: true, required: false
  private _clientId?: string; 
  public get clientId() {
    return this.getStringAttribute('client_id');
  }
  public set clientId(value: string) {
    this._clientId = value;
  }
  public resetClientId() {
    this._clientId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clientIdInput() {
    return this._clientId;
  }

  // client_secret - computed: false, optional: true, required: false
  private _clientSecret?: string; 
  public get clientSecret() {
    return this.getStringAttribute('client_secret');
  }
  public set clientSecret(value: string) {
    this._clientSecret = value;
  }
  public resetClientSecret() {
    this._clientSecret = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clientSecretInput() {
    return this._clientSecret;
  }

  // keyword - computed: false, optional: true, required: false
  private _keyword?: string; 
  public get keyword() {
    return this.getStringAttribute('keyword');
  }
  public set keyword(value: string) {
    this._keyword = value;
  }
  public resetKeyword() {
    this._keyword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keywordInput() {
    return this._keyword;
  }

  // sign_secret - computed: false, optional: true, required: false
  private _signSecret?: string; 
  public get signSecret() {
    return this.getStringAttribute('sign_secret');
  }
  public set signSecret(value: string) {
    this._signSecret = value;
  }
  public resetSignSecret() {
    this._signSecret = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get signSecretInput() {
    return this._signSecret;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription huaweicloud_smn_subscription}
*/
export class SmnSubscription extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_smn_subscription";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SmnSubscription resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SmnSubscription to import
  * @param importFromId The id of the existing SmnSubscription that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SmnSubscription to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_smn_subscription", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_subscription huaweicloud_smn_subscription} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SmnSubscriptionConfig
  */
  public constructor(scope: Construct, id: string, config: SmnSubscriptionConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_smn_subscription',
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
    this._endpoint = config.endpoint;
    this._id = config.id;
    this._protocol = config.protocol;
    this._region = config.region;
    this._remark = config.remark;
    this._topicUrn = config.topicUrn;
    this._extension.internalValue = config.extension;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // endpoint - computed: false, optional: false, required: true
  private _endpoint?: string; 
  public get endpoint() {
    return this.getStringAttribute('endpoint');
  }
  public set endpoint(value: string) {
    this._endpoint = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointInput() {
    return this._endpoint;
  }

  // filter_policies - computed: true, optional: false, required: false
  private _filterPolicies = new SmnSubscriptionFilterPoliciesList(this, "filter_policies", false);
  public get filterPolicies() {
    return this._filterPolicies;
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

  // owner - computed: true, optional: false, required: false
  public get owner() {
    return this.getStringAttribute('owner');
  }

  // protocol - computed: false, optional: false, required: true
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
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

  // remark - computed: false, optional: true, required: false
  private _remark?: string; 
  public get remark() {
    return this.getStringAttribute('remark');
  }
  public set remark(value: string) {
    this._remark = value;
  }
  public resetRemark() {
    this._remark = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get remarkInput() {
    return this._remark;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
  }

  // subscription_urn - computed: true, optional: false, required: false
  public get subscriptionUrn() {
    return this.getStringAttribute('subscription_urn');
  }

  // topic_urn - computed: false, optional: false, required: true
  private _topicUrn?: string; 
  public get topicUrn() {
    return this.getStringAttribute('topic_urn');
  }
  public set topicUrn(value: string) {
    this._topicUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicUrnInput() {
    return this._topicUrn;
  }

  // extension - computed: false, optional: true, required: false
  private _extension = new SmnSubscriptionExtensionOutputReference(this, "extension");
  public get extension() {
    return this._extension;
  }
  public putExtension(value: SmnSubscriptionExtension) {
    this._extension.internalValue = value;
  }
  public resetExtension() {
    this._extension.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extensionInput() {
    return this._extension.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      endpoint: cdktf.stringToTerraform(this._endpoint),
      id: cdktf.stringToTerraform(this._id),
      protocol: cdktf.stringToTerraform(this._protocol),
      region: cdktf.stringToTerraform(this._region),
      remark: cdktf.stringToTerraform(this._remark),
      topic_urn: cdktf.stringToTerraform(this._topicUrn),
      extension: smnSubscriptionExtensionToTerraform(this._extension.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      endpoint: {
        value: cdktf.stringToHclTerraform(this._endpoint),
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
      protocol: {
        value: cdktf.stringToHclTerraform(this._protocol),
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
      remark: {
        value: cdktf.stringToHclTerraform(this._remark),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      topic_urn: {
        value: cdktf.stringToHclTerraform(this._topicUrn),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      extension: {
        value: smnSubscriptionExtensionToHclTerraform(this._extension.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SmnSubscriptionExtensionList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

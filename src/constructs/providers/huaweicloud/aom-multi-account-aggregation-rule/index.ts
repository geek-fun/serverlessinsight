// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomMultiAccountAggregationRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#id AomMultiAccountAggregationRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#instance_id AomMultiAccountAggregationRule#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#region AomMultiAccountAggregationRule#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#send_to_source_account AomMultiAccountAggregationRule#send_to_source_account}
  */
  readonly sendToSourceAccount?: boolean | cdktf.IResolvable;
  /**
  * accounts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#accounts AomMultiAccountAggregationRule#accounts}
  */
  readonly accounts: AomMultiAccountAggregationRuleAccounts[] | cdktf.IResolvable;
  /**
  * services block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#services AomMultiAccountAggregationRule#services}
  */
  readonly services?: AomMultiAccountAggregationRuleServices[] | cdktf.IResolvable;
}
export interface AomMultiAccountAggregationRuleAccounts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#id AomMultiAccountAggregationRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#join_method AomMultiAccountAggregationRule#join_method}
  */
  readonly joinMethod?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#joined_at AomMultiAccountAggregationRule#joined_at}
  */
  readonly joinedAt?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#name AomMultiAccountAggregationRule#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#urn AomMultiAccountAggregationRule#urn}
  */
  readonly urn?: string;
}

export function aomMultiAccountAggregationRuleAccountsToTerraform(struct?: AomMultiAccountAggregationRuleAccounts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    id: cdktf.stringToTerraform(struct!.id),
    join_method: cdktf.stringToTerraform(struct!.joinMethod),
    joined_at: cdktf.stringToTerraform(struct!.joinedAt),
    name: cdktf.stringToTerraform(struct!.name),
    urn: cdktf.stringToTerraform(struct!.urn),
  }
}


export function aomMultiAccountAggregationRuleAccountsToHclTerraform(struct?: AomMultiAccountAggregationRuleAccounts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    join_method: {
      value: cdktf.stringToHclTerraform(struct!.joinMethod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    joined_at: {
      value: cdktf.stringToHclTerraform(struct!.joinedAt),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    urn: {
      value: cdktf.stringToHclTerraform(struct!.urn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomMultiAccountAggregationRuleAccountsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomMultiAccountAggregationRuleAccounts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._joinMethod !== undefined) {
      hasAnyValues = true;
      internalValueResult.joinMethod = this._joinMethod;
    }
    if (this._joinedAt !== undefined) {
      hasAnyValues = true;
      internalValueResult.joinedAt = this._joinedAt;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._urn !== undefined) {
      hasAnyValues = true;
      internalValueResult.urn = this._urn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomMultiAccountAggregationRuleAccounts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._id = undefined;
      this._joinMethod = undefined;
      this._joinedAt = undefined;
      this._name = undefined;
      this._urn = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._id = value.id;
      this._joinMethod = value.joinMethod;
      this._joinedAt = value.joinedAt;
      this._name = value.name;
      this._urn = value.urn;
    }
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // join_method - computed: false, optional: true, required: false
  private _joinMethod?: string; 
  public get joinMethod() {
    return this.getStringAttribute('join_method');
  }
  public set joinMethod(value: string) {
    this._joinMethod = value;
  }
  public resetJoinMethod() {
    this._joinMethod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get joinMethodInput() {
    return this._joinMethod;
  }

  // joined_at - computed: false, optional: true, required: false
  private _joinedAt?: string; 
  public get joinedAt() {
    return this.getStringAttribute('joined_at');
  }
  public set joinedAt(value: string) {
    this._joinedAt = value;
  }
  public resetJoinedAt() {
    this._joinedAt = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get joinedAtInput() {
    return this._joinedAt;
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

  // urn - computed: false, optional: true, required: false
  private _urn?: string; 
  public get urn() {
    return this.getStringAttribute('urn');
  }
  public set urn(value: string) {
    this._urn = value;
  }
  public resetUrn() {
    this._urn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get urnInput() {
    return this._urn;
  }
}

export class AomMultiAccountAggregationRuleAccountsList extends cdktf.ComplexList {
  public internalValue? : AomMultiAccountAggregationRuleAccounts[] | cdktf.IResolvable

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
  public get(index: number): AomMultiAccountAggregationRuleAccountsOutputReference {
    return new AomMultiAccountAggregationRuleAccountsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomMultiAccountAggregationRuleServices {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#metrics AomMultiAccountAggregationRule#metrics}
  */
  readonly metrics: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#service AomMultiAccountAggregationRule#service}
  */
  readonly service: string;
}

export function aomMultiAccountAggregationRuleServicesToTerraform(struct?: AomMultiAccountAggregationRuleServices | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    metrics: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.metrics),
    service: cdktf.stringToTerraform(struct!.service),
  }
}


export function aomMultiAccountAggregationRuleServicesToHclTerraform(struct?: AomMultiAccountAggregationRuleServices | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    metrics: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.metrics),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    service: {
      value: cdktf.stringToHclTerraform(struct!.service),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomMultiAccountAggregationRuleServicesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomMultiAccountAggregationRuleServices | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._metrics !== undefined) {
      hasAnyValues = true;
      internalValueResult.metrics = this._metrics;
    }
    if (this._service !== undefined) {
      hasAnyValues = true;
      internalValueResult.service = this._service;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomMultiAccountAggregationRuleServices | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._metrics = undefined;
      this._service = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._metrics = value.metrics;
      this._service = value.service;
    }
  }

  // metrics - computed: false, optional: false, required: true
  private _metrics?: string[]; 
  public get metrics() {
    return cdktf.Fn.tolist(this.getListAttribute('metrics'));
  }
  public set metrics(value: string[]) {
    this._metrics = value;
  }
  // Temporarily expose input value. Use with caution.
  public get metricsInput() {
    return this._metrics;
  }

  // service - computed: false, optional: false, required: true
  private _service?: string; 
  public get service() {
    return this.getStringAttribute('service');
  }
  public set service(value: string) {
    this._service = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceInput() {
    return this._service;
  }
}

export class AomMultiAccountAggregationRuleServicesList extends cdktf.ComplexList {
  public internalValue? : AomMultiAccountAggregationRuleServices[] | cdktf.IResolvable

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
  public get(index: number): AomMultiAccountAggregationRuleServicesOutputReference {
    return new AomMultiAccountAggregationRuleServicesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule huaweicloud_aom_multi_account_aggregation_rule}
*/
export class AomMultiAccountAggregationRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_multi_account_aggregation_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomMultiAccountAggregationRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomMultiAccountAggregationRule to import
  * @param importFromId The id of the existing AomMultiAccountAggregationRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomMultiAccountAggregationRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_multi_account_aggregation_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_multi_account_aggregation_rule huaweicloud_aom_multi_account_aggregation_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomMultiAccountAggregationRuleConfig
  */
  public constructor(scope: Construct, id: string, config: AomMultiAccountAggregationRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_multi_account_aggregation_rule',
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
    this._instanceId = config.instanceId;
    this._region = config.region;
    this._sendToSourceAccount = config.sendToSourceAccount;
    this._accounts.internalValue = config.accounts;
    this._services.internalValue = config.services;
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
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

  // send_to_source_account - computed: true, optional: true, required: false
  private _sendToSourceAccount?: boolean | cdktf.IResolvable; 
  public get sendToSourceAccount() {
    return this.getBooleanAttribute('send_to_source_account');
  }
  public set sendToSourceAccount(value: boolean | cdktf.IResolvable) {
    this._sendToSourceAccount = value;
  }
  public resetSendToSourceAccount() {
    this._sendToSourceAccount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sendToSourceAccountInput() {
    return this._sendToSourceAccount;
  }

  // accounts - computed: false, optional: false, required: true
  private _accounts = new AomMultiAccountAggregationRuleAccountsList(this, "accounts", true);
  public get accounts() {
    return this._accounts;
  }
  public putAccounts(value: AomMultiAccountAggregationRuleAccounts[] | cdktf.IResolvable) {
    this._accounts.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accountsInput() {
    return this._accounts.internalValue;
  }

  // services - computed: false, optional: true, required: false
  private _services = new AomMultiAccountAggregationRuleServicesList(this, "services", true);
  public get services() {
    return this._services;
  }
  public putServices(value: AomMultiAccountAggregationRuleServices[] | cdktf.IResolvable) {
    this._services.internalValue = value;
  }
  public resetServices() {
    this._services.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get servicesInput() {
    return this._services.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      region: cdktf.stringToTerraform(this._region),
      send_to_source_account: cdktf.booleanToTerraform(this._sendToSourceAccount),
      accounts: cdktf.listMapper(aomMultiAccountAggregationRuleAccountsToTerraform, true)(this._accounts.internalValue),
      services: cdktf.listMapper(aomMultiAccountAggregationRuleServicesToTerraform, true)(this._services.internalValue),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
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
      send_to_source_account: {
        value: cdktf.booleanToHclTerraform(this._sendToSourceAccount),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      accounts: {
        value: cdktf.listMapperHcl(aomMultiAccountAggregationRuleAccountsToHclTerraform, true)(this._accounts.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "AomMultiAccountAggregationRuleAccountsList",
      },
      services: {
        value: cdktf.listMapperHcl(aomMultiAccountAggregationRuleServicesToHclTerraform, true)(this._services.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "AomMultiAccountAggregationRuleServicesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

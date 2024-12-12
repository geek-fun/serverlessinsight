// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WafCloudInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#auto_renew WafCloudInstance#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * Specifies the charging mode of the cloud WAF.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#charging_mode WafCloudInstance#charging_mode}
  */
  readonly chargingMode: string;
  /**
  * Specifies the ID of the enterprise project to which the cloud WAF belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#enterprise_project_id WafCloudInstance#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#id WafCloudInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#period WafCloudInstance#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#period_unit WafCloudInstance#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * Specifies the region where the cloud WAF is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#region WafCloudInstance#region}
  */
  readonly region?: string;
  /**
  * Specifies the specification of the cloud WAF.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#resource_spec_code WafCloudInstance#resource_spec_code}
  */
  readonly resourceSpecCode?: string;
  /**
  * Specifies the website to which the account belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#website WafCloudInstance#website}
  */
  readonly website?: string;
  /**
  * bandwidth_expack_product block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#bandwidth_expack_product WafCloudInstance#bandwidth_expack_product}
  */
  readonly bandwidthExpackProduct?: WafCloudInstanceBandwidthExpackProduct;
  /**
  * domain_expack_product block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#domain_expack_product WafCloudInstance#domain_expack_product}
  */
  readonly domainExpackProduct?: WafCloudInstanceDomainExpackProduct;
  /**
  * rule_expack_product block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#rule_expack_product WafCloudInstance#rule_expack_product}
  */
  readonly ruleExpackProduct?: WafCloudInstanceRuleExpackProduct;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#timeouts WafCloudInstance#timeouts}
  */
  readonly timeouts?: WafCloudInstanceTimeouts;
}
export interface WafCloudInstanceBandwidthExpackProduct {
  /**
  * Specifies the number of extended packages.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#resource_size WafCloudInstance#resource_size}
  */
  readonly resourceSize?: number;
}

export function wafCloudInstanceBandwidthExpackProductToTerraform(struct?: WafCloudInstanceBandwidthExpackProductOutputReference | WafCloudInstanceBandwidthExpackProduct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    resource_size: cdktf.numberToTerraform(struct!.resourceSize),
  }
}


export function wafCloudInstanceBandwidthExpackProductToHclTerraform(struct?: WafCloudInstanceBandwidthExpackProductOutputReference | WafCloudInstanceBandwidthExpackProduct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    resource_size: {
      value: cdktf.numberToHclTerraform(struct!.resourceSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafCloudInstanceBandwidthExpackProductOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafCloudInstanceBandwidthExpackProduct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._resourceSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceSize = this._resourceSize;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafCloudInstanceBandwidthExpackProduct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._resourceSize = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._resourceSize = value.resourceSize;
    }
  }

  // resource_size - computed: true, optional: true, required: false
  private _resourceSize?: number; 
  public get resourceSize() {
    return this.getNumberAttribute('resource_size');
  }
  public set resourceSize(value: number) {
    this._resourceSize = value;
  }
  public resetResourceSize() {
    this._resourceSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceSizeInput() {
    return this._resourceSize;
  }
}
export interface WafCloudInstanceDomainExpackProduct {
  /**
  * Specifies the number of extended packages.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#resource_size WafCloudInstance#resource_size}
  */
  readonly resourceSize?: number;
}

export function wafCloudInstanceDomainExpackProductToTerraform(struct?: WafCloudInstanceDomainExpackProductOutputReference | WafCloudInstanceDomainExpackProduct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    resource_size: cdktf.numberToTerraform(struct!.resourceSize),
  }
}


export function wafCloudInstanceDomainExpackProductToHclTerraform(struct?: WafCloudInstanceDomainExpackProductOutputReference | WafCloudInstanceDomainExpackProduct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    resource_size: {
      value: cdktf.numberToHclTerraform(struct!.resourceSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafCloudInstanceDomainExpackProductOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafCloudInstanceDomainExpackProduct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._resourceSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceSize = this._resourceSize;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafCloudInstanceDomainExpackProduct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._resourceSize = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._resourceSize = value.resourceSize;
    }
  }

  // resource_size - computed: true, optional: true, required: false
  private _resourceSize?: number; 
  public get resourceSize() {
    return this.getNumberAttribute('resource_size');
  }
  public set resourceSize(value: number) {
    this._resourceSize = value;
  }
  public resetResourceSize() {
    this._resourceSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceSizeInput() {
    return this._resourceSize;
  }
}
export interface WafCloudInstanceRuleExpackProduct {
  /**
  * Specifies the number of extended packages.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#resource_size WafCloudInstance#resource_size}
  */
  readonly resourceSize?: number;
}

export function wafCloudInstanceRuleExpackProductToTerraform(struct?: WafCloudInstanceRuleExpackProductOutputReference | WafCloudInstanceRuleExpackProduct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    resource_size: cdktf.numberToTerraform(struct!.resourceSize),
  }
}


export function wafCloudInstanceRuleExpackProductToHclTerraform(struct?: WafCloudInstanceRuleExpackProductOutputReference | WafCloudInstanceRuleExpackProduct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    resource_size: {
      value: cdktf.numberToHclTerraform(struct!.resourceSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafCloudInstanceRuleExpackProductOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafCloudInstanceRuleExpackProduct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._resourceSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceSize = this._resourceSize;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafCloudInstanceRuleExpackProduct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._resourceSize = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._resourceSize = value.resourceSize;
    }
  }

  // resource_size - computed: true, optional: true, required: false
  private _resourceSize?: number; 
  public get resourceSize() {
    return this.getNumberAttribute('resource_size');
  }
  public set resourceSize(value: number) {
    this._resourceSize = value;
  }
  public resetResourceSize() {
    this._resourceSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceSizeInput() {
    return this._resourceSize;
  }
}
export interface WafCloudInstanceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#create WafCloudInstance#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#delete WafCloudInstance#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#update WafCloudInstance#update}
  */
  readonly update?: string;
}

export function wafCloudInstanceTimeoutsToTerraform(struct?: WafCloudInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function wafCloudInstanceTimeoutsToHclTerraform(struct?: WafCloudInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafCloudInstanceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): WafCloudInstanceTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafCloudInstanceTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance huaweicloud_waf_cloud_instance}
*/
export class WafCloudInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_waf_cloud_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WafCloudInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WafCloudInstance to import
  * @param importFromId The id of the existing WafCloudInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WafCloudInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_waf_cloud_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_cloud_instance huaweicloud_waf_cloud_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WafCloudInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: WafCloudInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_waf_cloud_instance',
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
    this._autoRenew = config.autoRenew;
    this._chargingMode = config.chargingMode;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._region = config.region;
    this._resourceSpecCode = config.resourceSpecCode;
    this._website = config.website;
    this._bandwidthExpackProduct.internalValue = config.bandwidthExpackProduct;
    this._domainExpackProduct.internalValue = config.domainExpackProduct;
    this._ruleExpackProduct.internalValue = config.ruleExpackProduct;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auto_renew - computed: false, optional: true, required: false
  private _autoRenew?: string; 
  public get autoRenew() {
    return this.getStringAttribute('auto_renew');
  }
  public set autoRenew(value: string) {
    this._autoRenew = value;
  }
  public resetAutoRenew() {
    this._autoRenew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoRenewInput() {
    return this._autoRenew;
  }

  // charging_mode - computed: false, optional: false, required: true
  private _chargingMode?: string; 
  public get chargingMode() {
    return this.getStringAttribute('charging_mode');
  }
  public set chargingMode(value: string) {
    this._chargingMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get chargingModeInput() {
    return this._chargingMode;
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

  // period - computed: false, optional: true, required: false
  private _period?: number; 
  public get period() {
    return this.getNumberAttribute('period');
  }
  public set period(value: number) {
    this._period = value;
  }
  public resetPeriod() {
    this._period = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodInput() {
    return this._period;
  }

  // period_unit - computed: false, optional: true, required: false
  private _periodUnit?: string; 
  public get periodUnit() {
    return this.getStringAttribute('period_unit');
  }
  public set periodUnit(value: string) {
    this._periodUnit = value;
  }
  public resetPeriodUnit() {
    this._periodUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodUnitInput() {
    return this._periodUnit;
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

  // resource_spec_code - computed: false, optional: true, required: false
  private _resourceSpecCode?: string; 
  public get resourceSpecCode() {
    return this.getStringAttribute('resource_spec_code');
  }
  public set resourceSpecCode(value: string) {
    this._resourceSpecCode = value;
  }
  public resetResourceSpecCode() {
    this._resourceSpecCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceSpecCodeInput() {
    return this._resourceSpecCode;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
  }

  // website - computed: false, optional: true, required: false
  private _website?: string; 
  public get website() {
    return this.getStringAttribute('website');
  }
  public set website(value: string) {
    this._website = value;
  }
  public resetWebsite() {
    this._website = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get websiteInput() {
    return this._website;
  }

  // bandwidth_expack_product - computed: false, optional: true, required: false
  private _bandwidthExpackProduct = new WafCloudInstanceBandwidthExpackProductOutputReference(this, "bandwidth_expack_product");
  public get bandwidthExpackProduct() {
    return this._bandwidthExpackProduct;
  }
  public putBandwidthExpackProduct(value: WafCloudInstanceBandwidthExpackProduct) {
    this._bandwidthExpackProduct.internalValue = value;
  }
  public resetBandwidthExpackProduct() {
    this._bandwidthExpackProduct.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthExpackProductInput() {
    return this._bandwidthExpackProduct.internalValue;
  }

  // domain_expack_product - computed: false, optional: true, required: false
  private _domainExpackProduct = new WafCloudInstanceDomainExpackProductOutputReference(this, "domain_expack_product");
  public get domainExpackProduct() {
    return this._domainExpackProduct;
  }
  public putDomainExpackProduct(value: WafCloudInstanceDomainExpackProduct) {
    this._domainExpackProduct.internalValue = value;
  }
  public resetDomainExpackProduct() {
    this._domainExpackProduct.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainExpackProductInput() {
    return this._domainExpackProduct.internalValue;
  }

  // rule_expack_product - computed: false, optional: true, required: false
  private _ruleExpackProduct = new WafCloudInstanceRuleExpackProductOutputReference(this, "rule_expack_product");
  public get ruleExpackProduct() {
    return this._ruleExpackProduct;
  }
  public putRuleExpackProduct(value: WafCloudInstanceRuleExpackProduct) {
    this._ruleExpackProduct.internalValue = value;
  }
  public resetRuleExpackProduct() {
    this._ruleExpackProduct.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleExpackProductInput() {
    return this._ruleExpackProduct.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new WafCloudInstanceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: WafCloudInstanceTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      region: cdktf.stringToTerraform(this._region),
      resource_spec_code: cdktf.stringToTerraform(this._resourceSpecCode),
      website: cdktf.stringToTerraform(this._website),
      bandwidth_expack_product: wafCloudInstanceBandwidthExpackProductToTerraform(this._bandwidthExpackProduct.internalValue),
      domain_expack_product: wafCloudInstanceDomainExpackProductToTerraform(this._domainExpackProduct.internalValue),
      rule_expack_product: wafCloudInstanceRuleExpackProductToTerraform(this._ruleExpackProduct.internalValue),
      timeouts: wafCloudInstanceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_renew: {
        value: cdktf.stringToHclTerraform(this._autoRenew),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
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
      period: {
        value: cdktf.numberToHclTerraform(this._period),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      period_unit: {
        value: cdktf.stringToHclTerraform(this._periodUnit),
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
      resource_spec_code: {
        value: cdktf.stringToHclTerraform(this._resourceSpecCode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      website: {
        value: cdktf.stringToHclTerraform(this._website),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      bandwidth_expack_product: {
        value: wafCloudInstanceBandwidthExpackProductToHclTerraform(this._bandwidthExpackProduct.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafCloudInstanceBandwidthExpackProductList",
      },
      domain_expack_product: {
        value: wafCloudInstanceDomainExpackProductToHclTerraform(this._domainExpackProduct.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafCloudInstanceDomainExpackProductList",
      },
      rule_expack_product: {
        value: wafCloudInstanceRuleExpackProductToHclTerraform(this._ruleExpackProduct.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafCloudInstanceRuleExpackProductList",
      },
      timeouts: {
        value: wafCloudInstanceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "WafCloudInstanceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

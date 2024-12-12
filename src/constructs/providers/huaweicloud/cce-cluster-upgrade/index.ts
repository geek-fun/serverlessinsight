// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CceClusterUpgradeConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#cluster_id CceClusterUpgrade#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#enable_force_new CceClusterUpgrade#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#id CceClusterUpgrade#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#node_order CceClusterUpgrade#node_order}
  */
  readonly nodeOrder?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#nodepool_order CceClusterUpgrade#nodepool_order}
  */
  readonly nodepoolOrder?: { [key: string]: number };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#region CceClusterUpgrade#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#target_version CceClusterUpgrade#target_version}
  */
  readonly targetVersion: string;
  /**
  * addons block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#addons CceClusterUpgrade#addons}
  */
  readonly addons?: CceClusterUpgradeAddons[] | cdktf.IResolvable;
  /**
  * strategy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#strategy CceClusterUpgrade#strategy}
  */
  readonly strategy: CceClusterUpgradeStrategy;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#timeouts CceClusterUpgrade#timeouts}
  */
  readonly timeouts?: CceClusterUpgradeTimeouts;
}
export interface CceClusterUpgradeAddonsValues {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#basic_json CceClusterUpgrade#basic_json}
  */
  readonly basicJson?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#custom_json CceClusterUpgrade#custom_json}
  */
  readonly customJson?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#flavor_json CceClusterUpgrade#flavor_json}
  */
  readonly flavorJson?: string;
}

export function cceClusterUpgradeAddonsValuesToTerraform(struct?: CceClusterUpgradeAddonsValuesOutputReference | CceClusterUpgradeAddonsValues): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    basic_json: cdktf.stringToTerraform(struct!.basicJson),
    custom_json: cdktf.stringToTerraform(struct!.customJson),
    flavor_json: cdktf.stringToTerraform(struct!.flavorJson),
  }
}


export function cceClusterUpgradeAddonsValuesToHclTerraform(struct?: CceClusterUpgradeAddonsValuesOutputReference | CceClusterUpgradeAddonsValues): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    basic_json: {
      value: cdktf.stringToHclTerraform(struct!.basicJson),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    custom_json: {
      value: cdktf.stringToHclTerraform(struct!.customJson),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor_json: {
      value: cdktf.stringToHclTerraform(struct!.flavorJson),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceClusterUpgradeAddonsValuesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceClusterUpgradeAddonsValues | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._basicJson !== undefined) {
      hasAnyValues = true;
      internalValueResult.basicJson = this._basicJson;
    }
    if (this._customJson !== undefined) {
      hasAnyValues = true;
      internalValueResult.customJson = this._customJson;
    }
    if (this._flavorJson !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavorJson = this._flavorJson;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterUpgradeAddonsValues | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._basicJson = undefined;
      this._customJson = undefined;
      this._flavorJson = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._basicJson = value.basicJson;
      this._customJson = value.customJson;
      this._flavorJson = value.flavorJson;
    }
  }

  // basic_json - computed: false, optional: true, required: false
  private _basicJson?: string; 
  public get basicJson() {
    return this.getStringAttribute('basic_json');
  }
  public set basicJson(value: string) {
    this._basicJson = value;
  }
  public resetBasicJson() {
    this._basicJson = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get basicJsonInput() {
    return this._basicJson;
  }

  // custom_json - computed: false, optional: true, required: false
  private _customJson?: string; 
  public get customJson() {
    return this.getStringAttribute('custom_json');
  }
  public set customJson(value: string) {
    this._customJson = value;
  }
  public resetCustomJson() {
    this._customJson = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customJsonInput() {
    return this._customJson;
  }

  // flavor_json - computed: false, optional: true, required: false
  private _flavorJson?: string; 
  public get flavorJson() {
    return this.getStringAttribute('flavor_json');
  }
  public set flavorJson(value: string) {
    this._flavorJson = value;
  }
  public resetFlavorJson() {
    this._flavorJson = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorJsonInput() {
    return this._flavorJson;
  }
}
export interface CceClusterUpgradeAddons {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#addon_template_name CceClusterUpgrade#addon_template_name}
  */
  readonly addonTemplateName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#operation CceClusterUpgrade#operation}
  */
  readonly operation: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#version CceClusterUpgrade#version}
  */
  readonly version: string;
  /**
  * values block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#values CceClusterUpgrade#values}
  */
  readonly values?: CceClusterUpgradeAddonsValues;
}

export function cceClusterUpgradeAddonsToTerraform(struct?: CceClusterUpgradeAddons | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    addon_template_name: cdktf.stringToTerraform(struct!.addonTemplateName),
    operation: cdktf.stringToTerraform(struct!.operation),
    version: cdktf.stringToTerraform(struct!.version),
    values: cceClusterUpgradeAddonsValuesToTerraform(struct!.values),
  }
}


export function cceClusterUpgradeAddonsToHclTerraform(struct?: CceClusterUpgradeAddons | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    addon_template_name: {
      value: cdktf.stringToHclTerraform(struct!.addonTemplateName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    operation: {
      value: cdktf.stringToHclTerraform(struct!.operation),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    version: {
      value: cdktf.stringToHclTerraform(struct!.version),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    values: {
      value: cceClusterUpgradeAddonsValuesToHclTerraform(struct!.values),
      isBlock: true,
      type: "list",
      storageClassType: "CceClusterUpgradeAddonsValuesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceClusterUpgradeAddonsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceClusterUpgradeAddons | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._addonTemplateName !== undefined) {
      hasAnyValues = true;
      internalValueResult.addonTemplateName = this._addonTemplateName;
    }
    if (this._operation !== undefined) {
      hasAnyValues = true;
      internalValueResult.operation = this._operation;
    }
    if (this._version !== undefined) {
      hasAnyValues = true;
      internalValueResult.version = this._version;
    }
    if (this._values?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.values = this._values?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterUpgradeAddons | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._addonTemplateName = undefined;
      this._operation = undefined;
      this._version = undefined;
      this._values.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._addonTemplateName = value.addonTemplateName;
      this._operation = value.operation;
      this._version = value.version;
      this._values.internalValue = value.values;
    }
  }

  // addon_template_name - computed: false, optional: false, required: true
  private _addonTemplateName?: string; 
  public get addonTemplateName() {
    return this.getStringAttribute('addon_template_name');
  }
  public set addonTemplateName(value: string) {
    this._addonTemplateName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get addonTemplateNameInput() {
    return this._addonTemplateName;
  }

  // operation - computed: false, optional: false, required: true
  private _operation?: string; 
  public get operation() {
    return this.getStringAttribute('operation');
  }
  public set operation(value: string) {
    this._operation = value;
  }
  // Temporarily expose input value. Use with caution.
  public get operationInput() {
    return this._operation;
  }

  // version - computed: false, optional: false, required: true
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // values - computed: false, optional: true, required: false
  private _values = new CceClusterUpgradeAddonsValuesOutputReference(this, "values");
  public get values() {
    return this._values;
  }
  public putValues(value: CceClusterUpgradeAddonsValues) {
    this._values.internalValue = value;
  }
  public resetValues() {
    this._values.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get valuesInput() {
    return this._values.internalValue;
  }
}

export class CceClusterUpgradeAddonsList extends cdktf.ComplexList {
  public internalValue? : CceClusterUpgradeAddons[] | cdktf.IResolvable

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
  public get(index: number): CceClusterUpgradeAddonsOutputReference {
    return new CceClusterUpgradeAddonsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceClusterUpgradeStrategyInPlaceRollingUpdate {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#user_defined_step CceClusterUpgrade#user_defined_step}
  */
  readonly userDefinedStep?: number;
}

export function cceClusterUpgradeStrategyInPlaceRollingUpdateToTerraform(struct?: CceClusterUpgradeStrategyInPlaceRollingUpdateOutputReference | CceClusterUpgradeStrategyInPlaceRollingUpdate): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    user_defined_step: cdktf.numberToTerraform(struct!.userDefinedStep),
  }
}


export function cceClusterUpgradeStrategyInPlaceRollingUpdateToHclTerraform(struct?: CceClusterUpgradeStrategyInPlaceRollingUpdateOutputReference | CceClusterUpgradeStrategyInPlaceRollingUpdate): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    user_defined_step: {
      value: cdktf.numberToHclTerraform(struct!.userDefinedStep),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceClusterUpgradeStrategyInPlaceRollingUpdateOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceClusterUpgradeStrategyInPlaceRollingUpdate | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._userDefinedStep !== undefined) {
      hasAnyValues = true;
      internalValueResult.userDefinedStep = this._userDefinedStep;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterUpgradeStrategyInPlaceRollingUpdate | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._userDefinedStep = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._userDefinedStep = value.userDefinedStep;
    }
  }

  // user_defined_step - computed: false, optional: true, required: false
  private _userDefinedStep?: number; 
  public get userDefinedStep() {
    return this.getNumberAttribute('user_defined_step');
  }
  public set userDefinedStep(value: number) {
    this._userDefinedStep = value;
  }
  public resetUserDefinedStep() {
    this._userDefinedStep = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userDefinedStepInput() {
    return this._userDefinedStep;
  }
}
export interface CceClusterUpgradeStrategy {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#type CceClusterUpgrade#type}
  */
  readonly type: string;
  /**
  * in_place_rolling_update block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#in_place_rolling_update CceClusterUpgrade#in_place_rolling_update}
  */
  readonly inPlaceRollingUpdate?: CceClusterUpgradeStrategyInPlaceRollingUpdate;
}

export function cceClusterUpgradeStrategyToTerraform(struct?: CceClusterUpgradeStrategyOutputReference | CceClusterUpgradeStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    in_place_rolling_update: cceClusterUpgradeStrategyInPlaceRollingUpdateToTerraform(struct!.inPlaceRollingUpdate),
  }
}


export function cceClusterUpgradeStrategyToHclTerraform(struct?: CceClusterUpgradeStrategyOutputReference | CceClusterUpgradeStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    in_place_rolling_update: {
      value: cceClusterUpgradeStrategyInPlaceRollingUpdateToHclTerraform(struct!.inPlaceRollingUpdate),
      isBlock: true,
      type: "list",
      storageClassType: "CceClusterUpgradeStrategyInPlaceRollingUpdateList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceClusterUpgradeStrategyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceClusterUpgradeStrategy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._inPlaceRollingUpdate?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.inPlaceRollingUpdate = this._inPlaceRollingUpdate?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterUpgradeStrategy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._type = undefined;
      this._inPlaceRollingUpdate.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._type = value.type;
      this._inPlaceRollingUpdate.internalValue = value.inPlaceRollingUpdate;
    }
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // in_place_rolling_update - computed: false, optional: true, required: false
  private _inPlaceRollingUpdate = new CceClusterUpgradeStrategyInPlaceRollingUpdateOutputReference(this, "in_place_rolling_update");
  public get inPlaceRollingUpdate() {
    return this._inPlaceRollingUpdate;
  }
  public putInPlaceRollingUpdate(value: CceClusterUpgradeStrategyInPlaceRollingUpdate) {
    this._inPlaceRollingUpdate.internalValue = value;
  }
  public resetInPlaceRollingUpdate() {
    this._inPlaceRollingUpdate.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inPlaceRollingUpdateInput() {
    return this._inPlaceRollingUpdate.internalValue;
  }
}
export interface CceClusterUpgradeTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#create CceClusterUpgrade#create}
  */
  readonly create?: string;
}

export function cceClusterUpgradeTimeoutsToTerraform(struct?: CceClusterUpgradeTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function cceClusterUpgradeTimeoutsToHclTerraform(struct?: CceClusterUpgradeTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceClusterUpgradeTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CceClusterUpgradeTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterUpgradeTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade huaweicloud_cce_cluster_upgrade}
*/
export class CceClusterUpgrade extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cce_cluster_upgrade";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CceClusterUpgrade resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CceClusterUpgrade to import
  * @param importFromId The id of the existing CceClusterUpgrade that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CceClusterUpgrade to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cce_cluster_upgrade", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_upgrade huaweicloud_cce_cluster_upgrade} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CceClusterUpgradeConfig
  */
  public constructor(scope: Construct, id: string, config: CceClusterUpgradeConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cce_cluster_upgrade',
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
    this._clusterId = config.clusterId;
    this._enableForceNew = config.enableForceNew;
    this._id = config.id;
    this._nodeOrder = config.nodeOrder;
    this._nodepoolOrder = config.nodepoolOrder;
    this._region = config.region;
    this._targetVersion = config.targetVersion;
    this._addons.internalValue = config.addons;
    this._strategy.internalValue = config.strategy;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cluster_id - computed: false, optional: false, required: true
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
  }

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

  // node_order - computed: false, optional: true, required: false
  private _nodeOrder?: { [key: string]: string }; 
  public get nodeOrder() {
    return this.getStringMapAttribute('node_order');
  }
  public set nodeOrder(value: { [key: string]: string }) {
    this._nodeOrder = value;
  }
  public resetNodeOrder() {
    this._nodeOrder = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeOrderInput() {
    return this._nodeOrder;
  }

  // nodepool_order - computed: false, optional: true, required: false
  private _nodepoolOrder?: { [key: string]: number }; 
  public get nodepoolOrder() {
    return this.getNumberMapAttribute('nodepool_order');
  }
  public set nodepoolOrder(value: { [key: string]: number }) {
    this._nodepoolOrder = value;
  }
  public resetNodepoolOrder() {
    this._nodepoolOrder = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodepoolOrderInput() {
    return this._nodepoolOrder;
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

  // target_version - computed: false, optional: false, required: true
  private _targetVersion?: string; 
  public get targetVersion() {
    return this.getStringAttribute('target_version');
  }
  public set targetVersion(value: string) {
    this._targetVersion = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetVersionInput() {
    return this._targetVersion;
  }

  // addons - computed: false, optional: true, required: false
  private _addons = new CceClusterUpgradeAddonsList(this, "addons", false);
  public get addons() {
    return this._addons;
  }
  public putAddons(value: CceClusterUpgradeAddons[] | cdktf.IResolvable) {
    this._addons.internalValue = value;
  }
  public resetAddons() {
    this._addons.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addonsInput() {
    return this._addons.internalValue;
  }

  // strategy - computed: false, optional: false, required: true
  private _strategy = new CceClusterUpgradeStrategyOutputReference(this, "strategy");
  public get strategy() {
    return this._strategy;
  }
  public putStrategy(value: CceClusterUpgradeStrategy) {
    this._strategy.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get strategyInput() {
    return this._strategy.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CceClusterUpgradeTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CceClusterUpgradeTimeouts) {
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
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      enable_force_new: cdktf.stringToTerraform(this._enableForceNew),
      id: cdktf.stringToTerraform(this._id),
      node_order: cdktf.hashMapper(cdktf.stringToTerraform)(this._nodeOrder),
      nodepool_order: cdktf.hashMapper(cdktf.numberToTerraform)(this._nodepoolOrder),
      region: cdktf.stringToTerraform(this._region),
      target_version: cdktf.stringToTerraform(this._targetVersion),
      addons: cdktf.listMapper(cceClusterUpgradeAddonsToTerraform, true)(this._addons.internalValue),
      strategy: cceClusterUpgradeStrategyToTerraform(this._strategy.internalValue),
      timeouts: cceClusterUpgradeTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
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
      node_order: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._nodeOrder),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      nodepool_order: {
        value: cdktf.hashMapperHcl(cdktf.numberToHclTerraform)(this._nodepoolOrder),
        isBlock: false,
        type: "map",
        storageClassType: "numberMap",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      target_version: {
        value: cdktf.stringToHclTerraform(this._targetVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      addons: {
        value: cdktf.listMapperHcl(cceClusterUpgradeAddonsToHclTerraform, true)(this._addons.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceClusterUpgradeAddonsList",
      },
      strategy: {
        value: cceClusterUpgradeStrategyToHclTerraform(this._strategy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceClusterUpgradeStrategyList",
      },
      timeouts: {
        value: cceClusterUpgradeTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CceClusterUpgradeTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

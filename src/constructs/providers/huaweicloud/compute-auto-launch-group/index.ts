// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ComputeAutoLaunchGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#allocation_strategy ComputeAutoLaunchGroup#allocation_strategy}
  */
  readonly allocationStrategy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#delete_instances ComputeAutoLaunchGroup#delete_instances}
  */
  readonly deleteInstances?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#excess_fulfilled_capacity_behavior ComputeAutoLaunchGroup#excess_fulfilled_capacity_behavior}
  */
  readonly excessFulfilledCapacityBehavior?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#id ComputeAutoLaunchGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#instances_behavior_with_expiration ComputeAutoLaunchGroup#instances_behavior_with_expiration}
  */
  readonly instancesBehaviorWithExpiration?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#launch_template_id ComputeAutoLaunchGroup#launch_template_id}
  */
  readonly launchTemplateId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#launch_template_version ComputeAutoLaunchGroup#launch_template_version}
  */
  readonly launchTemplateVersion: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#name ComputeAutoLaunchGroup#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#region ComputeAutoLaunchGroup#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#spot_price ComputeAutoLaunchGroup#spot_price}
  */
  readonly spotPrice?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#stable_capacity ComputeAutoLaunchGroup#stable_capacity}
  */
  readonly stableCapacity?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#supply_option ComputeAutoLaunchGroup#supply_option}
  */
  readonly supplyOption?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#target_capacity ComputeAutoLaunchGroup#target_capacity}
  */
  readonly targetCapacity: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#type ComputeAutoLaunchGroup#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#valid_since ComputeAutoLaunchGroup#valid_since}
  */
  readonly validSince?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#valid_until ComputeAutoLaunchGroup#valid_until}
  */
  readonly validUntil?: string;
  /**
  * overrides block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#overrides ComputeAutoLaunchGroup#overrides}
  */
  readonly overrides: ComputeAutoLaunchGroupOverrides[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#timeouts ComputeAutoLaunchGroup#timeouts}
  */
  readonly timeouts?: ComputeAutoLaunchGroupTimeouts;
}
export interface ComputeAutoLaunchGroupOverrides {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#availability_zone ComputeAutoLaunchGroup#availability_zone}
  */
  readonly availabilityZone: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#flavor_id ComputeAutoLaunchGroup#flavor_id}
  */
  readonly flavorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#priority ComputeAutoLaunchGroup#priority}
  */
  readonly priority?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#spot_price ComputeAutoLaunchGroup#spot_price}
  */
  readonly spotPrice?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#weighted_capacity ComputeAutoLaunchGroup#weighted_capacity}
  */
  readonly weightedCapacity?: number;
}

export function computeAutoLaunchGroupOverridesToTerraform(struct?: ComputeAutoLaunchGroupOverrides | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    availability_zone: cdktf.stringToTerraform(struct!.availabilityZone),
    flavor_id: cdktf.stringToTerraform(struct!.flavorId),
    priority: cdktf.numberToTerraform(struct!.priority),
    spot_price: cdktf.numberToTerraform(struct!.spotPrice),
    weighted_capacity: cdktf.numberToTerraform(struct!.weightedCapacity),
  }
}


export function computeAutoLaunchGroupOverridesToHclTerraform(struct?: ComputeAutoLaunchGroupOverrides | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    availability_zone: {
      value: cdktf.stringToHclTerraform(struct!.availabilityZone),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor_id: {
      value: cdktf.stringToHclTerraform(struct!.flavorId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    priority: {
      value: cdktf.numberToHclTerraform(struct!.priority),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    spot_price: {
      value: cdktf.numberToHclTerraform(struct!.spotPrice),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    weighted_capacity: {
      value: cdktf.numberToHclTerraform(struct!.weightedCapacity),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ComputeAutoLaunchGroupOverridesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ComputeAutoLaunchGroupOverrides | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._availabilityZone !== undefined) {
      hasAnyValues = true;
      internalValueResult.availabilityZone = this._availabilityZone;
    }
    if (this._flavorId !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavorId = this._flavorId;
    }
    if (this._priority !== undefined) {
      hasAnyValues = true;
      internalValueResult.priority = this._priority;
    }
    if (this._spotPrice !== undefined) {
      hasAnyValues = true;
      internalValueResult.spotPrice = this._spotPrice;
    }
    if (this._weightedCapacity !== undefined) {
      hasAnyValues = true;
      internalValueResult.weightedCapacity = this._weightedCapacity;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ComputeAutoLaunchGroupOverrides | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._availabilityZone = undefined;
      this._flavorId = undefined;
      this._priority = undefined;
      this._spotPrice = undefined;
      this._weightedCapacity = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._availabilityZone = value.availabilityZone;
      this._flavorId = value.flavorId;
      this._priority = value.priority;
      this._spotPrice = value.spotPrice;
      this._weightedCapacity = value.weightedCapacity;
    }
  }

  // availability_zone - computed: false, optional: false, required: true
  private _availabilityZone?: string; 
  public get availabilityZone() {
    return this.getStringAttribute('availability_zone');
  }
  public set availabilityZone(value: string) {
    this._availabilityZone = value;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneInput() {
    return this._availabilityZone;
  }

  // flavor_id - computed: false, optional: false, required: true
  private _flavorId?: string; 
  public get flavorId() {
    return this.getStringAttribute('flavor_id');
  }
  public set flavorId(value: string) {
    this._flavorId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorIdInput() {
    return this._flavorId;
  }

  // priority - computed: true, optional: true, required: false
  private _priority?: number; 
  public get priority() {
    return this.getNumberAttribute('priority');
  }
  public set priority(value: number) {
    this._priority = value;
  }
  public resetPriority() {
    this._priority = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get priorityInput() {
    return this._priority;
  }

  // spot_price - computed: true, optional: true, required: false
  private _spotPrice?: number; 
  public get spotPrice() {
    return this.getNumberAttribute('spot_price');
  }
  public set spotPrice(value: number) {
    this._spotPrice = value;
  }
  public resetSpotPrice() {
    this._spotPrice = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get spotPriceInput() {
    return this._spotPrice;
  }

  // weighted_capacity - computed: true, optional: true, required: false
  private _weightedCapacity?: number; 
  public get weightedCapacity() {
    return this.getNumberAttribute('weighted_capacity');
  }
  public set weightedCapacity(value: number) {
    this._weightedCapacity = value;
  }
  public resetWeightedCapacity() {
    this._weightedCapacity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get weightedCapacityInput() {
    return this._weightedCapacity;
  }
}

export class ComputeAutoLaunchGroupOverridesList extends cdktf.ComplexList {
  public internalValue? : ComputeAutoLaunchGroupOverrides[] | cdktf.IResolvable

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
  public get(index: number): ComputeAutoLaunchGroupOverridesOutputReference {
    return new ComputeAutoLaunchGroupOverridesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ComputeAutoLaunchGroupTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#delete ComputeAutoLaunchGroup#delete}
  */
  readonly delete?: string;
}

export function computeAutoLaunchGroupTimeoutsToTerraform(struct?: ComputeAutoLaunchGroupTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function computeAutoLaunchGroupTimeoutsToHclTerraform(struct?: ComputeAutoLaunchGroupTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ComputeAutoLaunchGroupTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): ComputeAutoLaunchGroupTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ComputeAutoLaunchGroupTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._delete = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._delete = value.delete;
    }
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group huaweicloud_compute_auto_launch_group}
*/
export class ComputeAutoLaunchGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_compute_auto_launch_group";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ComputeAutoLaunchGroup resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ComputeAutoLaunchGroup to import
  * @param importFromId The id of the existing ComputeAutoLaunchGroup that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ComputeAutoLaunchGroup to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_compute_auto_launch_group", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/compute_auto_launch_group huaweicloud_compute_auto_launch_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ComputeAutoLaunchGroupConfig
  */
  public constructor(scope: Construct, id: string, config: ComputeAutoLaunchGroupConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_compute_auto_launch_group',
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
    this._allocationStrategy = config.allocationStrategy;
    this._deleteInstances = config.deleteInstances;
    this._excessFulfilledCapacityBehavior = config.excessFulfilledCapacityBehavior;
    this._id = config.id;
    this._instancesBehaviorWithExpiration = config.instancesBehaviorWithExpiration;
    this._launchTemplateId = config.launchTemplateId;
    this._launchTemplateVersion = config.launchTemplateVersion;
    this._name = config.name;
    this._region = config.region;
    this._spotPrice = config.spotPrice;
    this._stableCapacity = config.stableCapacity;
    this._supplyOption = config.supplyOption;
    this._targetCapacity = config.targetCapacity;
    this._type = config.type;
    this._validSince = config.validSince;
    this._validUntil = config.validUntil;
    this._overrides.internalValue = config.overrides;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // allocation_strategy - computed: true, optional: true, required: false
  private _allocationStrategy?: string; 
  public get allocationStrategy() {
    return this.getStringAttribute('allocation_strategy');
  }
  public set allocationStrategy(value: string) {
    this._allocationStrategy = value;
  }
  public resetAllocationStrategy() {
    this._allocationStrategy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get allocationStrategyInput() {
    return this._allocationStrategy;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // current_capacity - computed: true, optional: false, required: false
  public get currentCapacity() {
    return this.getNumberAttribute('current_capacity');
  }

  // current_stable_capacity - computed: true, optional: false, required: false
  public get currentStableCapacity() {
    return this.getNumberAttribute('current_stable_capacity');
  }

  // delete_instances - computed: false, optional: true, required: false
  private _deleteInstances?: string; 
  public get deleteInstances() {
    return this.getStringAttribute('delete_instances');
  }
  public set deleteInstances(value: string) {
    this._deleteInstances = value;
  }
  public resetDeleteInstances() {
    this._deleteInstances = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInstancesInput() {
    return this._deleteInstances;
  }

  // excess_fulfilled_capacity_behavior - computed: true, optional: true, required: false
  private _excessFulfilledCapacityBehavior?: string; 
  public get excessFulfilledCapacityBehavior() {
    return this.getStringAttribute('excess_fulfilled_capacity_behavior');
  }
  public set excessFulfilledCapacityBehavior(value: string) {
    this._excessFulfilledCapacityBehavior = value;
  }
  public resetExcessFulfilledCapacityBehavior() {
    this._excessFulfilledCapacityBehavior = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get excessFulfilledCapacityBehaviorInput() {
    return this._excessFulfilledCapacityBehavior;
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

  // instances_behavior_with_expiration - computed: true, optional: true, required: false
  private _instancesBehaviorWithExpiration?: string; 
  public get instancesBehaviorWithExpiration() {
    return this.getStringAttribute('instances_behavior_with_expiration');
  }
  public set instancesBehaviorWithExpiration(value: string) {
    this._instancesBehaviorWithExpiration = value;
  }
  public resetInstancesBehaviorWithExpiration() {
    this._instancesBehaviorWithExpiration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instancesBehaviorWithExpirationInput() {
    return this._instancesBehaviorWithExpiration;
  }

  // launch_template_id - computed: false, optional: false, required: true
  private _launchTemplateId?: string; 
  public get launchTemplateId() {
    return this.getStringAttribute('launch_template_id');
  }
  public set launchTemplateId(value: string) {
    this._launchTemplateId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get launchTemplateIdInput() {
    return this._launchTemplateId;
  }

  // launch_template_version - computed: false, optional: false, required: true
  private _launchTemplateVersion?: string; 
  public get launchTemplateVersion() {
    return this.getStringAttribute('launch_template_version');
  }
  public set launchTemplateVersion(value: string) {
    this._launchTemplateVersion = value;
  }
  // Temporarily expose input value. Use with caution.
  public get launchTemplateVersionInput() {
    return this._launchTemplateVersion;
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

  // spot_price - computed: true, optional: true, required: false
  private _spotPrice?: number; 
  public get spotPrice() {
    return this.getNumberAttribute('spot_price');
  }
  public set spotPrice(value: number) {
    this._spotPrice = value;
  }
  public resetSpotPrice() {
    this._spotPrice = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get spotPriceInput() {
    return this._spotPrice;
  }

  // stable_capacity - computed: true, optional: true, required: false
  private _stableCapacity?: number; 
  public get stableCapacity() {
    return this.getNumberAttribute('stable_capacity');
  }
  public set stableCapacity(value: number) {
    this._stableCapacity = value;
  }
  public resetStableCapacity() {
    this._stableCapacity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get stableCapacityInput() {
    return this._stableCapacity;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // supply_option - computed: true, optional: true, required: false
  private _supplyOption?: string; 
  public get supplyOption() {
    return this.getStringAttribute('supply_option');
  }
  public set supplyOption(value: string) {
    this._supplyOption = value;
  }
  public resetSupplyOption() {
    this._supplyOption = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get supplyOptionInput() {
    return this._supplyOption;
  }

  // target_capacity - computed: false, optional: false, required: true
  private _targetCapacity?: number; 
  public get targetCapacity() {
    return this.getNumberAttribute('target_capacity');
  }
  public set targetCapacity(value: number) {
    this._targetCapacity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetCapacityInput() {
    return this._targetCapacity;
  }

  // task_state - computed: true, optional: false, required: false
  public get taskState() {
    return this.getStringAttribute('task_state');
  }

  // type - computed: true, optional: true, required: false
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

  // valid_since - computed: true, optional: true, required: false
  private _validSince?: string; 
  public get validSince() {
    return this.getStringAttribute('valid_since');
  }
  public set validSince(value: string) {
    this._validSince = value;
  }
  public resetValidSince() {
    this._validSince = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get validSinceInput() {
    return this._validSince;
  }

  // valid_until - computed: true, optional: true, required: false
  private _validUntil?: string; 
  public get validUntil() {
    return this.getStringAttribute('valid_until');
  }
  public set validUntil(value: string) {
    this._validUntil = value;
  }
  public resetValidUntil() {
    this._validUntil = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get validUntilInput() {
    return this._validUntil;
  }

  // overrides - computed: false, optional: false, required: true
  private _overrides = new ComputeAutoLaunchGroupOverridesList(this, "overrides", true);
  public get overrides() {
    return this._overrides;
  }
  public putOverrides(value: ComputeAutoLaunchGroupOverrides[] | cdktf.IResolvable) {
    this._overrides.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get overridesInput() {
    return this._overrides.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new ComputeAutoLaunchGroupTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: ComputeAutoLaunchGroupTimeouts) {
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
      allocation_strategy: cdktf.stringToTerraform(this._allocationStrategy),
      delete_instances: cdktf.stringToTerraform(this._deleteInstances),
      excess_fulfilled_capacity_behavior: cdktf.stringToTerraform(this._excessFulfilledCapacityBehavior),
      id: cdktf.stringToTerraform(this._id),
      instances_behavior_with_expiration: cdktf.stringToTerraform(this._instancesBehaviorWithExpiration),
      launch_template_id: cdktf.stringToTerraform(this._launchTemplateId),
      launch_template_version: cdktf.stringToTerraform(this._launchTemplateVersion),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      spot_price: cdktf.numberToTerraform(this._spotPrice),
      stable_capacity: cdktf.numberToTerraform(this._stableCapacity),
      supply_option: cdktf.stringToTerraform(this._supplyOption),
      target_capacity: cdktf.numberToTerraform(this._targetCapacity),
      type: cdktf.stringToTerraform(this._type),
      valid_since: cdktf.stringToTerraform(this._validSince),
      valid_until: cdktf.stringToTerraform(this._validUntil),
      overrides: cdktf.listMapper(computeAutoLaunchGroupOverridesToTerraform, true)(this._overrides.internalValue),
      timeouts: computeAutoLaunchGroupTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      allocation_strategy: {
        value: cdktf.stringToHclTerraform(this._allocationStrategy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      delete_instances: {
        value: cdktf.stringToHclTerraform(this._deleteInstances),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      excess_fulfilled_capacity_behavior: {
        value: cdktf.stringToHclTerraform(this._excessFulfilledCapacityBehavior),
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
      instances_behavior_with_expiration: {
        value: cdktf.stringToHclTerraform(this._instancesBehaviorWithExpiration),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      launch_template_id: {
        value: cdktf.stringToHclTerraform(this._launchTemplateId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      launch_template_version: {
        value: cdktf.stringToHclTerraform(this._launchTemplateVersion),
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
      spot_price: {
        value: cdktf.numberToHclTerraform(this._spotPrice),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      stable_capacity: {
        value: cdktf.numberToHclTerraform(this._stableCapacity),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      supply_option: {
        value: cdktf.stringToHclTerraform(this._supplyOption),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      target_capacity: {
        value: cdktf.numberToHclTerraform(this._targetCapacity),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      valid_since: {
        value: cdktf.stringToHclTerraform(this._validSince),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      valid_until: {
        value: cdktf.stringToHclTerraform(this._validUntil),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      overrides: {
        value: cdktf.listMapperHcl(computeAutoLaunchGroupOverridesToHclTerraform, true)(this._overrides.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ComputeAutoLaunchGroupOverridesList",
      },
      timeouts: {
        value: computeAutoLaunchGroupTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "ComputeAutoLaunchGroupTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

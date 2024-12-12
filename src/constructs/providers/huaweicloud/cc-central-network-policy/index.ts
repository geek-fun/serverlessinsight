// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CcCentralNetworkPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Central network ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#central_network_id CcCentralNetworkPolicy#central_network_id}
  */
  readonly centralNetworkId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#id CcCentralNetworkPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#region CcCentralNetworkPolicy#region}
  */
  readonly region?: string;
  /**
  * er_instances block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#er_instances CcCentralNetworkPolicy#er_instances}
  */
  readonly erInstances: CcCentralNetworkPolicyErInstances[] | cdktf.IResolvable;
  /**
  * planes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#planes CcCentralNetworkPolicy#planes}
  */
  readonly planes?: CcCentralNetworkPolicyPlanes;
}
export interface CcCentralNetworkPolicyErInstances {
  /**
  * Enterprise router ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#enterprise_router_id CcCentralNetworkPolicy#enterprise_router_id}
  */
  readonly enterpriseRouterId: string;
  /**
  * Project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#project_id CcCentralNetworkPolicy#project_id}
  */
  readonly projectId: string;
  /**
  * Region ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#region_id CcCentralNetworkPolicy#region_id}
  */
  readonly regionId: string;
}

export function ccCentralNetworkPolicyErInstancesToTerraform(struct?: CcCentralNetworkPolicyErInstances | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enterprise_router_id: cdktf.stringToTerraform(struct!.enterpriseRouterId),
    project_id: cdktf.stringToTerraform(struct!.projectId),
    region_id: cdktf.stringToTerraform(struct!.regionId),
  }
}


export function ccCentralNetworkPolicyErInstancesToHclTerraform(struct?: CcCentralNetworkPolicyErInstances | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enterprise_router_id: {
      value: cdktf.stringToHclTerraform(struct!.enterpriseRouterId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    project_id: {
      value: cdktf.stringToHclTerraform(struct!.projectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region_id: {
      value: cdktf.stringToHclTerraform(struct!.regionId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CcCentralNetworkPolicyErInstancesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CcCentralNetworkPolicyErInstances | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enterpriseRouterId !== undefined) {
      hasAnyValues = true;
      internalValueResult.enterpriseRouterId = this._enterpriseRouterId;
    }
    if (this._projectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.projectId = this._projectId;
    }
    if (this._regionId !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionId = this._regionId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CcCentralNetworkPolicyErInstances | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._enterpriseRouterId = undefined;
      this._projectId = undefined;
      this._regionId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._enterpriseRouterId = value.enterpriseRouterId;
      this._projectId = value.projectId;
      this._regionId = value.regionId;
    }
  }

  // enterprise_router_id - computed: false, optional: false, required: true
  private _enterpriseRouterId?: string; 
  public get enterpriseRouterId() {
    return this.getStringAttribute('enterprise_router_id');
  }
  public set enterpriseRouterId(value: string) {
    this._enterpriseRouterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseRouterIdInput() {
    return this._enterpriseRouterId;
  }

  // project_id - computed: false, optional: false, required: true
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
  }

  // region_id - computed: false, optional: false, required: true
  private _regionId?: string; 
  public get regionId() {
    return this.getStringAttribute('region_id');
  }
  public set regionId(value: string) {
    this._regionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionIdInput() {
    return this._regionId;
  }
}

export class CcCentralNetworkPolicyErInstancesList extends cdktf.ComplexList {
  public internalValue? : CcCentralNetworkPolicyErInstances[] | cdktf.IResolvable

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
  public get(index: number): CcCentralNetworkPolicyErInstancesOutputReference {
    return new CcCentralNetworkPolicyErInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CcCentralNetworkPolicyPlanesAssociateErTables {
  /**
  * Enterprise router ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#enterprise_router_id CcCentralNetworkPolicy#enterprise_router_id}
  */
  readonly enterpriseRouterId: string;
  /**
  * Enterprise router table ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#enterprise_router_table_id CcCentralNetworkPolicy#enterprise_router_table_id}
  */
  readonly enterpriseRouterTableId: string;
  /**
  * Project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#project_id CcCentralNetworkPolicy#project_id}
  */
  readonly projectId: string;
  /**
  * Region ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#region_id CcCentralNetworkPolicy#region_id}
  */
  readonly regionId: string;
}

export function ccCentralNetworkPolicyPlanesAssociateErTablesToTerraform(struct?: CcCentralNetworkPolicyPlanesAssociateErTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enterprise_router_id: cdktf.stringToTerraform(struct!.enterpriseRouterId),
    enterprise_router_table_id: cdktf.stringToTerraform(struct!.enterpriseRouterTableId),
    project_id: cdktf.stringToTerraform(struct!.projectId),
    region_id: cdktf.stringToTerraform(struct!.regionId),
  }
}


export function ccCentralNetworkPolicyPlanesAssociateErTablesToHclTerraform(struct?: CcCentralNetworkPolicyPlanesAssociateErTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enterprise_router_id: {
      value: cdktf.stringToHclTerraform(struct!.enterpriseRouterId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    enterprise_router_table_id: {
      value: cdktf.stringToHclTerraform(struct!.enterpriseRouterTableId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    project_id: {
      value: cdktf.stringToHclTerraform(struct!.projectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region_id: {
      value: cdktf.stringToHclTerraform(struct!.regionId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CcCentralNetworkPolicyPlanesAssociateErTablesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CcCentralNetworkPolicyPlanesAssociateErTables | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enterpriseRouterId !== undefined) {
      hasAnyValues = true;
      internalValueResult.enterpriseRouterId = this._enterpriseRouterId;
    }
    if (this._enterpriseRouterTableId !== undefined) {
      hasAnyValues = true;
      internalValueResult.enterpriseRouterTableId = this._enterpriseRouterTableId;
    }
    if (this._projectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.projectId = this._projectId;
    }
    if (this._regionId !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionId = this._regionId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CcCentralNetworkPolicyPlanesAssociateErTables | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._enterpriseRouterId = undefined;
      this._enterpriseRouterTableId = undefined;
      this._projectId = undefined;
      this._regionId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._enterpriseRouterId = value.enterpriseRouterId;
      this._enterpriseRouterTableId = value.enterpriseRouterTableId;
      this._projectId = value.projectId;
      this._regionId = value.regionId;
    }
  }

  // enterprise_router_id - computed: false, optional: false, required: true
  private _enterpriseRouterId?: string; 
  public get enterpriseRouterId() {
    return this.getStringAttribute('enterprise_router_id');
  }
  public set enterpriseRouterId(value: string) {
    this._enterpriseRouterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseRouterIdInput() {
    return this._enterpriseRouterId;
  }

  // enterprise_router_table_id - computed: false, optional: false, required: true
  private _enterpriseRouterTableId?: string; 
  public get enterpriseRouterTableId() {
    return this.getStringAttribute('enterprise_router_table_id');
  }
  public set enterpriseRouterTableId(value: string) {
    this._enterpriseRouterTableId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseRouterTableIdInput() {
    return this._enterpriseRouterTableId;
  }

  // project_id - computed: false, optional: false, required: true
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
  }

  // region_id - computed: false, optional: false, required: true
  private _regionId?: string; 
  public get regionId() {
    return this.getStringAttribute('region_id');
  }
  public set regionId(value: string) {
    this._regionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionIdInput() {
    return this._regionId;
  }
}

export class CcCentralNetworkPolicyPlanesAssociateErTablesList extends cdktf.ComplexList {
  public internalValue? : CcCentralNetworkPolicyPlanesAssociateErTables[] | cdktf.IResolvable

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
  public get(index: number): CcCentralNetworkPolicyPlanesAssociateErTablesOutputReference {
    return new CcCentralNetworkPolicyPlanesAssociateErTablesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstances {
  /**
  * Enterprise router ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#enterprise_router_id CcCentralNetworkPolicy#enterprise_router_id}
  */
  readonly enterpriseRouterId: string;
  /**
  * Project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#project_id CcCentralNetworkPolicy#project_id}
  */
  readonly projectId: string;
  /**
  * Region ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#region_id CcCentralNetworkPolicy#region_id}
  */
  readonly regionId: string;
}

export function ccCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesToTerraform(struct?: CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstances | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enterprise_router_id: cdktf.stringToTerraform(struct!.enterpriseRouterId),
    project_id: cdktf.stringToTerraform(struct!.projectId),
    region_id: cdktf.stringToTerraform(struct!.regionId),
  }
}


export function ccCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesToHclTerraform(struct?: CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstances | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enterprise_router_id: {
      value: cdktf.stringToHclTerraform(struct!.enterpriseRouterId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    project_id: {
      value: cdktf.stringToHclTerraform(struct!.projectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region_id: {
      value: cdktf.stringToHclTerraform(struct!.regionId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstances | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enterpriseRouterId !== undefined) {
      hasAnyValues = true;
      internalValueResult.enterpriseRouterId = this._enterpriseRouterId;
    }
    if (this._projectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.projectId = this._projectId;
    }
    if (this._regionId !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionId = this._regionId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstances | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._enterpriseRouterId = undefined;
      this._projectId = undefined;
      this._regionId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._enterpriseRouterId = value.enterpriseRouterId;
      this._projectId = value.projectId;
      this._regionId = value.regionId;
    }
  }

  // enterprise_router_id - computed: false, optional: false, required: true
  private _enterpriseRouterId?: string; 
  public get enterpriseRouterId() {
    return this.getStringAttribute('enterprise_router_id');
  }
  public set enterpriseRouterId(value: string) {
    this._enterpriseRouterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseRouterIdInput() {
    return this._enterpriseRouterId;
  }

  // project_id - computed: false, optional: false, required: true
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
  }

  // region_id - computed: false, optional: false, required: true
  private _regionId?: string; 
  public get regionId() {
    return this.getStringAttribute('region_id');
  }
  public set regionId(value: string) {
    this._regionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionIdInput() {
    return this._regionId;
  }
}

export class CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesList extends cdktf.ComplexList {
  public internalValue? : CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstances[] | cdktf.IResolvable

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
  public get(index: number): CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesOutputReference {
    return new CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CcCentralNetworkPolicyPlanesExcludeErConnections {
  /**
  * exclude_er_instances block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#exclude_er_instances CcCentralNetworkPolicy#exclude_er_instances}
  */
  readonly excludeErInstances: CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstances[] | cdktf.IResolvable;
}

export function ccCentralNetworkPolicyPlanesExcludeErConnectionsToTerraform(struct?: CcCentralNetworkPolicyPlanesExcludeErConnections | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    exclude_er_instances: cdktf.listMapper(ccCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesToTerraform, true)(struct!.excludeErInstances),
  }
}


export function ccCentralNetworkPolicyPlanesExcludeErConnectionsToHclTerraform(struct?: CcCentralNetworkPolicyPlanesExcludeErConnections | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    exclude_er_instances: {
      value: cdktf.listMapperHcl(ccCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesToHclTerraform, true)(struct!.excludeErInstances),
      isBlock: true,
      type: "list",
      storageClassType: "CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CcCentralNetworkPolicyPlanesExcludeErConnectionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CcCentralNetworkPolicyPlanesExcludeErConnections | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._excludeErInstances?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.excludeErInstances = this._excludeErInstances?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CcCentralNetworkPolicyPlanesExcludeErConnections | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._excludeErInstances.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._excludeErInstances.internalValue = value.excludeErInstances;
    }
  }

  // exclude_er_instances - computed: false, optional: false, required: true
  private _excludeErInstances = new CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstancesList(this, "exclude_er_instances", false);
  public get excludeErInstances() {
    return this._excludeErInstances;
  }
  public putExcludeErInstances(value: CcCentralNetworkPolicyPlanesExcludeErConnectionsExcludeErInstances[] | cdktf.IResolvable) {
    this._excludeErInstances.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get excludeErInstancesInput() {
    return this._excludeErInstances.internalValue;
  }
}

export class CcCentralNetworkPolicyPlanesExcludeErConnectionsList extends cdktf.ComplexList {
  public internalValue? : CcCentralNetworkPolicyPlanesExcludeErConnections[] | cdktf.IResolvable

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
  public get(index: number): CcCentralNetworkPolicyPlanesExcludeErConnectionsOutputReference {
    return new CcCentralNetworkPolicyPlanesExcludeErConnectionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CcCentralNetworkPolicyPlanes {
  /**
  * associate_er_tables block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#associate_er_tables CcCentralNetworkPolicy#associate_er_tables}
  */
  readonly associateErTables: CcCentralNetworkPolicyPlanesAssociateErTables[] | cdktf.IResolvable;
  /**
  * exclude_er_connections block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#exclude_er_connections CcCentralNetworkPolicy#exclude_er_connections}
  */
  readonly excludeErConnections?: CcCentralNetworkPolicyPlanesExcludeErConnections[] | cdktf.IResolvable;
}

export function ccCentralNetworkPolicyPlanesToTerraform(struct?: CcCentralNetworkPolicyPlanesOutputReference | CcCentralNetworkPolicyPlanes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    associate_er_tables: cdktf.listMapper(ccCentralNetworkPolicyPlanesAssociateErTablesToTerraform, true)(struct!.associateErTables),
    exclude_er_connections: cdktf.listMapper(ccCentralNetworkPolicyPlanesExcludeErConnectionsToTerraform, true)(struct!.excludeErConnections),
  }
}


export function ccCentralNetworkPolicyPlanesToHclTerraform(struct?: CcCentralNetworkPolicyPlanesOutputReference | CcCentralNetworkPolicyPlanes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    associate_er_tables: {
      value: cdktf.listMapperHcl(ccCentralNetworkPolicyPlanesAssociateErTablesToHclTerraform, true)(struct!.associateErTables),
      isBlock: true,
      type: "list",
      storageClassType: "CcCentralNetworkPolicyPlanesAssociateErTablesList",
    },
    exclude_er_connections: {
      value: cdktf.listMapperHcl(ccCentralNetworkPolicyPlanesExcludeErConnectionsToHclTerraform, true)(struct!.excludeErConnections),
      isBlock: true,
      type: "list",
      storageClassType: "CcCentralNetworkPolicyPlanesExcludeErConnectionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CcCentralNetworkPolicyPlanesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CcCentralNetworkPolicyPlanes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._associateErTables?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.associateErTables = this._associateErTables?.internalValue;
    }
    if (this._excludeErConnections?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.excludeErConnections = this._excludeErConnections?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CcCentralNetworkPolicyPlanes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._associateErTables.internalValue = undefined;
      this._excludeErConnections.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._associateErTables.internalValue = value.associateErTables;
      this._excludeErConnections.internalValue = value.excludeErConnections;
    }
  }

  // associate_er_tables - computed: false, optional: false, required: true
  private _associateErTables = new CcCentralNetworkPolicyPlanesAssociateErTablesList(this, "associate_er_tables", false);
  public get associateErTables() {
    return this._associateErTables;
  }
  public putAssociateErTables(value: CcCentralNetworkPolicyPlanesAssociateErTables[] | cdktf.IResolvable) {
    this._associateErTables.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get associateErTablesInput() {
    return this._associateErTables.internalValue;
  }

  // exclude_er_connections - computed: false, optional: true, required: false
  private _excludeErConnections = new CcCentralNetworkPolicyPlanesExcludeErConnectionsList(this, "exclude_er_connections", false);
  public get excludeErConnections() {
    return this._excludeErConnections;
  }
  public putExcludeErConnections(value: CcCentralNetworkPolicyPlanesExcludeErConnections[] | cdktf.IResolvable) {
    this._excludeErConnections.internalValue = value;
  }
  public resetExcludeErConnections() {
    this._excludeErConnections.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get excludeErConnectionsInput() {
    return this._excludeErConnections.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy huaweicloud_cc_central_network_policy}
*/
export class CcCentralNetworkPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_central_network_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CcCentralNetworkPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CcCentralNetworkPolicy to import
  * @param importFromId The id of the existing CcCentralNetworkPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CcCentralNetworkPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_central_network_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_policy huaweicloud_cc_central_network_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CcCentralNetworkPolicyConfig
  */
  public constructor(scope: Construct, id: string, config: CcCentralNetworkPolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_central_network_policy',
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
    this._centralNetworkId = config.centralNetworkId;
    this._id = config.id;
    this._region = config.region;
    this._erInstances.internalValue = config.erInstances;
    this._planes.internalValue = config.planes;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // central_network_id - computed: false, optional: false, required: true
  private _centralNetworkId?: string; 
  public get centralNetworkId() {
    return this.getStringAttribute('central_network_id');
  }
  public set centralNetworkId(value: string) {
    this._centralNetworkId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get centralNetworkIdInput() {
    return this._centralNetworkId;
  }

  // document_template_version - computed: true, optional: false, required: false
  public get documentTemplateVersion() {
    return this.getStringAttribute('document_template_version');
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

  // is_applied - computed: true, optional: false, required: false
  public get isApplied() {
    return this.getBooleanAttribute('is_applied');
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

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getNumberAttribute('version');
  }

  // er_instances - computed: false, optional: false, required: true
  private _erInstances = new CcCentralNetworkPolicyErInstancesList(this, "er_instances", false);
  public get erInstances() {
    return this._erInstances;
  }
  public putErInstances(value: CcCentralNetworkPolicyErInstances[] | cdktf.IResolvable) {
    this._erInstances.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get erInstancesInput() {
    return this._erInstances.internalValue;
  }

  // planes - computed: false, optional: true, required: false
  private _planes = new CcCentralNetworkPolicyPlanesOutputReference(this, "planes");
  public get planes() {
    return this._planes;
  }
  public putPlanes(value: CcCentralNetworkPolicyPlanes) {
    this._planes.internalValue = value;
  }
  public resetPlanes() {
    this._planes.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get planesInput() {
    return this._planes.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      central_network_id: cdktf.stringToTerraform(this._centralNetworkId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      er_instances: cdktf.listMapper(ccCentralNetworkPolicyErInstancesToTerraform, true)(this._erInstances.internalValue),
      planes: ccCentralNetworkPolicyPlanesToTerraform(this._planes.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      central_network_id: {
        value: cdktf.stringToHclTerraform(this._centralNetworkId),
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
      er_instances: {
        value: cdktf.listMapperHcl(ccCentralNetworkPolicyErInstancesToHclTerraform, true)(this._erInstances.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CcCentralNetworkPolicyErInstancesList",
      },
      planes: {
        value: ccCentralNetworkPolicyPlanesToHclTerraform(this._planes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CcCentralNetworkPolicyPlanesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

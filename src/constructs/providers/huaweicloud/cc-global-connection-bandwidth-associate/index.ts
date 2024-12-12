// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CcGlobalConnectionBandwidthAssociateConfig extends cdktf.TerraformMetaArguments {
  /**
  * The global connection bandwidth ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate#gcb_id CcGlobalConnectionBandwidthAssociate#gcb_id}
  */
  readonly gcbId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate#id CcGlobalConnectionBandwidthAssociate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate#region CcGlobalConnectionBandwidthAssociate#region}
  */
  readonly region?: string;
  /**
  * gcb_binding_resources block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate#gcb_binding_resources CcGlobalConnectionBandwidthAssociate#gcb_binding_resources}
  */
  readonly gcbBindingResources: CcGlobalConnectionBandwidthAssociateGcbBindingResources[] | cdktf.IResolvable;
}
export interface CcGlobalConnectionBandwidthAssociateGcbBindingResources {
  /**
  * The project ID of the resource to associate with the global connection bandwidth.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate#project_id CcGlobalConnectionBandwidthAssociate#project_id}
  */
  readonly projectId?: string;
  /**
  * The region ID of the resource to associate with the global connection bandwidth.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate#region_id CcGlobalConnectionBandwidthAssociate#region_id}
  */
  readonly regionId?: string;
  /**
  * The ID of the resource to associate with the global connection bandwidth.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate#resource_id CcGlobalConnectionBandwidthAssociate#resource_id}
  */
  readonly resourceId: string;
  /**
  * The type of the resource to associate with the global connection bandwidth.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate#resource_type CcGlobalConnectionBandwidthAssociate#resource_type}
  */
  readonly resourceType: string;
}

export function ccGlobalConnectionBandwidthAssociateGcbBindingResourcesToTerraform(struct?: CcGlobalConnectionBandwidthAssociateGcbBindingResources | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    project_id: cdktf.stringToTerraform(struct!.projectId),
    region_id: cdktf.stringToTerraform(struct!.regionId),
    resource_id: cdktf.stringToTerraform(struct!.resourceId),
    resource_type: cdktf.stringToTerraform(struct!.resourceType),
  }
}


export function ccGlobalConnectionBandwidthAssociateGcbBindingResourcesToHclTerraform(struct?: CcGlobalConnectionBandwidthAssociateGcbBindingResources | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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
    resource_id: {
      value: cdktf.stringToHclTerraform(struct!.resourceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    resource_type: {
      value: cdktf.stringToHclTerraform(struct!.resourceType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CcGlobalConnectionBandwidthAssociateGcbBindingResourcesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CcGlobalConnectionBandwidthAssociateGcbBindingResources | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._projectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.projectId = this._projectId;
    }
    if (this._regionId !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionId = this._regionId;
    }
    if (this._resourceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceId = this._resourceId;
    }
    if (this._resourceType !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceType = this._resourceType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CcGlobalConnectionBandwidthAssociateGcbBindingResources | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._projectId = undefined;
      this._regionId = undefined;
      this._resourceId = undefined;
      this._resourceType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._projectId = value.projectId;
      this._regionId = value.regionId;
      this._resourceId = value.resourceId;
      this._resourceType = value.resourceType;
    }
  }

  // project_id - computed: false, optional: true, required: false
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  public resetProjectId() {
    this._projectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
  }

  // region_id - computed: false, optional: true, required: false
  private _regionId?: string; 
  public get regionId() {
    return this.getStringAttribute('region_id');
  }
  public set regionId(value: string) {
    this._regionId = value;
  }
  public resetRegionId() {
    this._regionId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regionIdInput() {
    return this._regionId;
  }

  // resource_id - computed: false, optional: false, required: true
  private _resourceId?: string; 
  public get resourceId() {
    return this.getStringAttribute('resource_id');
  }
  public set resourceId(value: string) {
    this._resourceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceIdInput() {
    return this._resourceId;
  }

  // resource_type - computed: false, optional: false, required: true
  private _resourceType?: string; 
  public get resourceType() {
    return this.getStringAttribute('resource_type');
  }
  public set resourceType(value: string) {
    this._resourceType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceTypeInput() {
    return this._resourceType;
  }
}

export class CcGlobalConnectionBandwidthAssociateGcbBindingResourcesList extends cdktf.ComplexList {
  public internalValue? : CcGlobalConnectionBandwidthAssociateGcbBindingResources[] | cdktf.IResolvable

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
  public get(index: number): CcGlobalConnectionBandwidthAssociateGcbBindingResourcesOutputReference {
    return new CcGlobalConnectionBandwidthAssociateGcbBindingResourcesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate huaweicloud_cc_global_connection_bandwidth_associate}
*/
export class CcGlobalConnectionBandwidthAssociate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_global_connection_bandwidth_associate";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CcGlobalConnectionBandwidthAssociate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CcGlobalConnectionBandwidthAssociate to import
  * @param importFromId The id of the existing CcGlobalConnectionBandwidthAssociate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CcGlobalConnectionBandwidthAssociate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_global_connection_bandwidth_associate", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_global_connection_bandwidth_associate huaweicloud_cc_global_connection_bandwidth_associate} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CcGlobalConnectionBandwidthAssociateConfig
  */
  public constructor(scope: Construct, id: string, config: CcGlobalConnectionBandwidthAssociateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_global_connection_bandwidth_associate',
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
    this._gcbId = config.gcbId;
    this._id = config.id;
    this._region = config.region;
    this._gcbBindingResources.internalValue = config.gcbBindingResources;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // gcb_id - computed: false, optional: false, required: true
  private _gcbId?: string; 
  public get gcbId() {
    return this.getStringAttribute('gcb_id');
  }
  public set gcbId(value: string) {
    this._gcbId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get gcbIdInput() {
    return this._gcbId;
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

  // gcb_binding_resources - computed: false, optional: false, required: true
  private _gcbBindingResources = new CcGlobalConnectionBandwidthAssociateGcbBindingResourcesList(this, "gcb_binding_resources", true);
  public get gcbBindingResources() {
    return this._gcbBindingResources;
  }
  public putGcbBindingResources(value: CcGlobalConnectionBandwidthAssociateGcbBindingResources[] | cdktf.IResolvable) {
    this._gcbBindingResources.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get gcbBindingResourcesInput() {
    return this._gcbBindingResources.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      gcb_id: cdktf.stringToTerraform(this._gcbId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      gcb_binding_resources: cdktf.listMapper(ccGlobalConnectionBandwidthAssociateGcbBindingResourcesToTerraform, true)(this._gcbBindingResources.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      gcb_id: {
        value: cdktf.stringToHclTerraform(this._gcbId),
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
      gcb_binding_resources: {
        value: cdktf.listMapperHcl(ccGlobalConnectionBandwidthAssociateGcbBindingResourcesToHclTerraform, true)(this._gcbBindingResources.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "CcGlobalConnectionBandwidthAssociateGcbBindingResourcesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

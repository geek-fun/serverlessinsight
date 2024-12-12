// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CcCentralNetworkAttachmentConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#central_network_id CcCentralNetworkAttachment#central_network_id}
  */
  readonly centralNetworkId: string;
  /**
  * The central network plane ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#central_network_plane_id CcCentralNetworkAttachment#central_network_plane_id}
  */
  readonly centralNetworkPlaneId?: string;
  /**
  * The description of the attachment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#description CcCentralNetworkAttachment#description}
  */
  readonly description?: string;
  /**
  * The enterprise router ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#enterprise_router_id CcCentralNetworkAttachment#enterprise_router_id}
  */
  readonly enterpriseRouterId: string;
  /**
  * The project ID to which the enterprise router belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#enterprise_router_project_id CcCentralNetworkAttachment#enterprise_router_project_id}
  */
  readonly enterpriseRouterProjectId: string;
  /**
  * The region ID to which the enterprise router belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#enterprise_router_region_id CcCentralNetworkAttachment#enterprise_router_region_id}
  */
  readonly enterpriseRouterRegionId: string;
  /**
  * The global DC gateway ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#global_dc_gateway_id CcCentralNetworkAttachment#global_dc_gateway_id}
  */
  readonly globalDcGatewayId: string;
  /**
  * The project ID to which the global DC gateway belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#global_dc_gateway_project_id CcCentralNetworkAttachment#global_dc_gateway_project_id}
  */
  readonly globalDcGatewayProjectId: string;
  /**
  * The region ID to which the global DC gateway belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#global_dc_gateway_region_id CcCentralNetworkAttachment#global_dc_gateway_region_id}
  */
  readonly globalDcGatewayRegionId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#id CcCentralNetworkAttachment#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the attachment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#name CcCentralNetworkAttachment#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#region CcCentralNetworkAttachment#region}
  */
  readonly region?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#timeouts CcCentralNetworkAttachment#timeouts}
  */
  readonly timeouts?: CcCentralNetworkAttachmentTimeouts;
}
export interface CcCentralNetworkAttachmentTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#create CcCentralNetworkAttachment#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#delete CcCentralNetworkAttachment#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#update CcCentralNetworkAttachment#update}
  */
  readonly update?: string;
}

export function ccCentralNetworkAttachmentTimeoutsToTerraform(struct?: CcCentralNetworkAttachmentTimeouts | cdktf.IResolvable): any {
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


export function ccCentralNetworkAttachmentTimeoutsToHclTerraform(struct?: CcCentralNetworkAttachmentTimeouts | cdktf.IResolvable): any {
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

export class CcCentralNetworkAttachmentTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CcCentralNetworkAttachmentTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CcCentralNetworkAttachmentTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment huaweicloud_cc_central_network_attachment}
*/
export class CcCentralNetworkAttachment extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_central_network_attachment";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CcCentralNetworkAttachment resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CcCentralNetworkAttachment to import
  * @param importFromId The id of the existing CcCentralNetworkAttachment that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CcCentralNetworkAttachment to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_central_network_attachment", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_attachment huaweicloud_cc_central_network_attachment} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CcCentralNetworkAttachmentConfig
  */
  public constructor(scope: Construct, id: string, config: CcCentralNetworkAttachmentConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_central_network_attachment',
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
    this._centralNetworkPlaneId = config.centralNetworkPlaneId;
    this._description = config.description;
    this._enterpriseRouterId = config.enterpriseRouterId;
    this._enterpriseRouterProjectId = config.enterpriseRouterProjectId;
    this._enterpriseRouterRegionId = config.enterpriseRouterRegionId;
    this._globalDcGatewayId = config.globalDcGatewayId;
    this._globalDcGatewayProjectId = config.globalDcGatewayProjectId;
    this._globalDcGatewayRegionId = config.globalDcGatewayRegionId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._timeouts.internalValue = config.timeouts;
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

  // central_network_plane_id - computed: true, optional: true, required: false
  private _centralNetworkPlaneId?: string; 
  public get centralNetworkPlaneId() {
    return this.getStringAttribute('central_network_plane_id');
  }
  public set centralNetworkPlaneId(value: string) {
    this._centralNetworkPlaneId = value;
  }
  public resetCentralNetworkPlaneId() {
    this._centralNetworkPlaneId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get centralNetworkPlaneIdInput() {
    return this._centralNetworkPlaneId;
  }

  // description - computed: true, optional: true, required: false
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  public resetDescription() {
    this._description = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
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

  // enterprise_router_project_id - computed: false, optional: false, required: true
  private _enterpriseRouterProjectId?: string; 
  public get enterpriseRouterProjectId() {
    return this.getStringAttribute('enterprise_router_project_id');
  }
  public set enterpriseRouterProjectId(value: string) {
    this._enterpriseRouterProjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseRouterProjectIdInput() {
    return this._enterpriseRouterProjectId;
  }

  // enterprise_router_region_id - computed: false, optional: false, required: true
  private _enterpriseRouterRegionId?: string; 
  public get enterpriseRouterRegionId() {
    return this.getStringAttribute('enterprise_router_region_id');
  }
  public set enterpriseRouterRegionId(value: string) {
    this._enterpriseRouterRegionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseRouterRegionIdInput() {
    return this._enterpriseRouterRegionId;
  }

  // global_dc_gateway_id - computed: false, optional: false, required: true
  private _globalDcGatewayId?: string; 
  public get globalDcGatewayId() {
    return this.getStringAttribute('global_dc_gateway_id');
  }
  public set globalDcGatewayId(value: string) {
    this._globalDcGatewayId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get globalDcGatewayIdInput() {
    return this._globalDcGatewayId;
  }

  // global_dc_gateway_project_id - computed: false, optional: false, required: true
  private _globalDcGatewayProjectId?: string; 
  public get globalDcGatewayProjectId() {
    return this.getStringAttribute('global_dc_gateway_project_id');
  }
  public set globalDcGatewayProjectId(value: string) {
    this._globalDcGatewayProjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get globalDcGatewayProjectIdInput() {
    return this._globalDcGatewayProjectId;
  }

  // global_dc_gateway_region_id - computed: false, optional: false, required: true
  private _globalDcGatewayRegionId?: string; 
  public get globalDcGatewayRegionId() {
    return this.getStringAttribute('global_dc_gateway_region_id');
  }
  public set globalDcGatewayRegionId(value: string) {
    this._globalDcGatewayRegionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get globalDcGatewayRegionIdInput() {
    return this._globalDcGatewayRegionId;
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

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CcCentralNetworkAttachmentTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CcCentralNetworkAttachmentTimeouts) {
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
      central_network_id: cdktf.stringToTerraform(this._centralNetworkId),
      central_network_plane_id: cdktf.stringToTerraform(this._centralNetworkPlaneId),
      description: cdktf.stringToTerraform(this._description),
      enterprise_router_id: cdktf.stringToTerraform(this._enterpriseRouterId),
      enterprise_router_project_id: cdktf.stringToTerraform(this._enterpriseRouterProjectId),
      enterprise_router_region_id: cdktf.stringToTerraform(this._enterpriseRouterRegionId),
      global_dc_gateway_id: cdktf.stringToTerraform(this._globalDcGatewayId),
      global_dc_gateway_project_id: cdktf.stringToTerraform(this._globalDcGatewayProjectId),
      global_dc_gateway_region_id: cdktf.stringToTerraform(this._globalDcGatewayRegionId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      timeouts: ccCentralNetworkAttachmentTimeoutsToTerraform(this._timeouts.internalValue),
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
      central_network_plane_id: {
        value: cdktf.stringToHclTerraform(this._centralNetworkPlaneId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enterprise_router_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseRouterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enterprise_router_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseRouterProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enterprise_router_region_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseRouterRegionId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      global_dc_gateway_id: {
        value: cdktf.stringToHclTerraform(this._globalDcGatewayId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      global_dc_gateway_project_id: {
        value: cdktf.stringToHclTerraform(this._globalDcGatewayProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      global_dc_gateway_region_id: {
        value: cdktf.stringToHclTerraform(this._globalDcGatewayRegionId),
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
      timeouts: {
        value: ccCentralNetworkAttachmentTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CcCentralNetworkAttachmentTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

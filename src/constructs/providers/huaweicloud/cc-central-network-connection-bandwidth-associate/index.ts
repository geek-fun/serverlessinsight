// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CcCentralNetworkConnectionBandwidthAssociateConfig extends cdktf.TerraformMetaArguments {
  /**
  * The bandwidth size of the connection.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#bandwidth_size CcCentralNetworkConnectionBandwidthAssociate#bandwidth_size}
  */
  readonly bandwidthSize: number;
  /**
  * The ID of the central network to which the connection belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#central_network_id CcCentralNetworkConnectionBandwidthAssociate#central_network_id}
  */
  readonly centralNetworkId: string;
  /**
  * The ID of the connection.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#connection_id CcCentralNetworkConnectionBandwidthAssociate#connection_id}
  */
  readonly connectionId: string;
  /**
  * The ID of the global connection bandwidth.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#global_connection_bandwidth_id CcCentralNetworkConnectionBandwidthAssociate#global_connection_bandwidth_id}
  */
  readonly globalConnectionBandwidthId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#id CcCentralNetworkConnectionBandwidthAssociate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#region CcCentralNetworkConnectionBandwidthAssociate#region}
  */
  readonly region?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#timeouts CcCentralNetworkConnectionBandwidthAssociate#timeouts}
  */
  readonly timeouts?: CcCentralNetworkConnectionBandwidthAssociateTimeouts;
}
export interface CcCentralNetworkConnectionBandwidthAssociateTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#create CcCentralNetworkConnectionBandwidthAssociate#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#delete CcCentralNetworkConnectionBandwidthAssociate#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#update CcCentralNetworkConnectionBandwidthAssociate#update}
  */
  readonly update?: string;
}

export function ccCentralNetworkConnectionBandwidthAssociateTimeoutsToTerraform(struct?: CcCentralNetworkConnectionBandwidthAssociateTimeouts | cdktf.IResolvable): any {
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


export function ccCentralNetworkConnectionBandwidthAssociateTimeoutsToHclTerraform(struct?: CcCentralNetworkConnectionBandwidthAssociateTimeouts | cdktf.IResolvable): any {
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

export class CcCentralNetworkConnectionBandwidthAssociateTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CcCentralNetworkConnectionBandwidthAssociateTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CcCentralNetworkConnectionBandwidthAssociateTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate huaweicloud_cc_central_network_connection_bandwidth_associate}
*/
export class CcCentralNetworkConnectionBandwidthAssociate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_central_network_connection_bandwidth_associate";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CcCentralNetworkConnectionBandwidthAssociate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CcCentralNetworkConnectionBandwidthAssociate to import
  * @param importFromId The id of the existing CcCentralNetworkConnectionBandwidthAssociate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CcCentralNetworkConnectionBandwidthAssociate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_central_network_connection_bandwidth_associate", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_central_network_connection_bandwidth_associate huaweicloud_cc_central_network_connection_bandwidth_associate} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CcCentralNetworkConnectionBandwidthAssociateConfig
  */
  public constructor(scope: Construct, id: string, config: CcCentralNetworkConnectionBandwidthAssociateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_central_network_connection_bandwidth_associate',
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
    this._bandwidthSize = config.bandwidthSize;
    this._centralNetworkId = config.centralNetworkId;
    this._connectionId = config.connectionId;
    this._globalConnectionBandwidthId = config.globalConnectionBandwidthId;
    this._id = config.id;
    this._region = config.region;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bandwidth_size - computed: false, optional: false, required: true
  private _bandwidthSize?: number; 
  public get bandwidthSize() {
    return this.getNumberAttribute('bandwidth_size');
  }
  public set bandwidthSize(value: number) {
    this._bandwidthSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthSizeInput() {
    return this._bandwidthSize;
  }

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

  // connection_id - computed: false, optional: false, required: true
  private _connectionId?: string; 
  public get connectionId() {
    return this.getStringAttribute('connection_id');
  }
  public set connectionId(value: string) {
    this._connectionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get connectionIdInput() {
    return this._connectionId;
  }

  // global_connection_bandwidth_id - computed: false, optional: false, required: true
  private _globalConnectionBandwidthId?: string; 
  public get globalConnectionBandwidthId() {
    return this.getStringAttribute('global_connection_bandwidth_id');
  }
  public set globalConnectionBandwidthId(value: string) {
    this._globalConnectionBandwidthId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get globalConnectionBandwidthIdInput() {
    return this._globalConnectionBandwidthId;
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

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CcCentralNetworkConnectionBandwidthAssociateTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CcCentralNetworkConnectionBandwidthAssociateTimeouts) {
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
      bandwidth_size: cdktf.numberToTerraform(this._bandwidthSize),
      central_network_id: cdktf.stringToTerraform(this._centralNetworkId),
      connection_id: cdktf.stringToTerraform(this._connectionId),
      global_connection_bandwidth_id: cdktf.stringToTerraform(this._globalConnectionBandwidthId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      timeouts: ccCentralNetworkConnectionBandwidthAssociateTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      bandwidth_size: {
        value: cdktf.numberToHclTerraform(this._bandwidthSize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      central_network_id: {
        value: cdktf.stringToHclTerraform(this._centralNetworkId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      connection_id: {
        value: cdktf.stringToHclTerraform(this._connectionId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      global_connection_bandwidth_id: {
        value: cdktf.stringToHclTerraform(this._globalConnectionBandwidthId),
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
      timeouts: {
        value: ccCentralNetworkConnectionBandwidthAssociateTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CcCentralNetworkConnectionBandwidthAssociateTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

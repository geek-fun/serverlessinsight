// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudVpcTrafficMirrorSessionsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies whether the mirror session is enabled. Defaults to **true**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#enabled DataHuaweicloudVpcTrafficMirrorSessions#enabled}
  */
  readonly enabled?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#id DataHuaweicloudVpcTrafficMirrorSessions#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the traffic mirror session name used to query.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#name DataHuaweicloudVpcTrafficMirrorSessions#name}
  */
  readonly name?: string;
  /**
  * Specifies the maximum transmission unit (MTU).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#packet_length DataHuaweicloudVpcTrafficMirrorSessions#packet_length}
  */
  readonly packetLength?: string;
  /**
  * Specifies the mirror session priority. The value range is **1-32766**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#priority DataHuaweicloudVpcTrafficMirrorSessions#priority}
  */
  readonly priority?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#region DataHuaweicloudVpcTrafficMirrorSessions#region}
  */
  readonly region?: string;
  /**
  * Specifies the traffic mirror filter ID used in the session.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#traffic_mirror_filter_id DataHuaweicloudVpcTrafficMirrorSessions#traffic_mirror_filter_id}
  */
  readonly trafficMirrorFilterId?: string;
  /**
  * Specifies the traffic mirror session ID used to query.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#traffic_mirror_session_id DataHuaweicloudVpcTrafficMirrorSessions#traffic_mirror_session_id}
  */
  readonly trafficMirrorSessionId?: string;
  /**
  * Specifies the traffic mirror target ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#traffic_mirror_target_id DataHuaweicloudVpcTrafficMirrorSessions#traffic_mirror_target_id}
  */
  readonly trafficMirrorTargetId?: string;
  /**
  * Specifies the mirror target type. The value can be:
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#traffic_mirror_target_type DataHuaweicloudVpcTrafficMirrorSessions#traffic_mirror_target_type}
  */
  readonly trafficMirrorTargetType?: string;
  /**
  * Specifies the mirror source type. The value can be **eni**(elastic network interface).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#type DataHuaweicloudVpcTrafficMirrorSessions#type}
  */
  readonly type?: string;
  /**
  * Specifies the VNI, which is used to distinguish mirrored traffic of different
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#virtual_network_id DataHuaweicloudVpcTrafficMirrorSessions#virtual_network_id}
  */
  readonly virtualNetworkId?: string;
}
export interface DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessions {
}

export function dataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessionsToTerraform(struct?: DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessionsToHclTerraform(struct?: DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enabled - computed: true, optional: false, required: false
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // packet_length - computed: true, optional: false, required: false
  public get packetLength() {
    return this.getNumberAttribute('packet_length');
  }

  // priority - computed: true, optional: false, required: false
  public get priority() {
    return this.getNumberAttribute('priority');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // traffic_mirror_filter_id - computed: true, optional: false, required: false
  public get trafficMirrorFilterId() {
    return this.getStringAttribute('traffic_mirror_filter_id');
  }

  // traffic_mirror_sources - computed: true, optional: false, required: false
  public get trafficMirrorSources() {
    return this.getListAttribute('traffic_mirror_sources');
  }

  // traffic_mirror_target_id - computed: true, optional: false, required: false
  public get trafficMirrorTargetId() {
    return this.getStringAttribute('traffic_mirror_target_id');
  }

  // traffic_mirror_target_type - computed: true, optional: false, required: false
  public get trafficMirrorTargetType() {
    return this.getStringAttribute('traffic_mirror_target_type');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // virtual_network_id - computed: true, optional: false, required: false
  public get virtualNetworkId() {
    return this.getNumberAttribute('virtual_network_id');
  }
}

export class DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessionsOutputReference {
    return new DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions huaweicloud_vpc_traffic_mirror_sessions}
*/
export class DataHuaweicloudVpcTrafficMirrorSessions extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vpc_traffic_mirror_sessions";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudVpcTrafficMirrorSessions resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudVpcTrafficMirrorSessions to import
  * @param importFromId The id of the existing DataHuaweicloudVpcTrafficMirrorSessions that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudVpcTrafficMirrorSessions to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vpc_traffic_mirror_sessions", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_sessions huaweicloud_vpc_traffic_mirror_sessions} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudVpcTrafficMirrorSessionsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudVpcTrafficMirrorSessionsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vpc_traffic_mirror_sessions',
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
    this._enabled = config.enabled;
    this._id = config.id;
    this._name = config.name;
    this._packetLength = config.packetLength;
    this._priority = config.priority;
    this._region = config.region;
    this._trafficMirrorFilterId = config.trafficMirrorFilterId;
    this._trafficMirrorSessionId = config.trafficMirrorSessionId;
    this._trafficMirrorTargetId = config.trafficMirrorTargetId;
    this._trafficMirrorTargetType = config.trafficMirrorTargetType;
    this._type = config.type;
    this._virtualNetworkId = config.virtualNetworkId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // enabled - computed: false, optional: true, required: false
  private _enabled?: string; 
  public get enabled() {
    return this.getStringAttribute('enabled');
  }
  public set enabled(value: string) {
    this._enabled = value;
  }
  public resetEnabled() {
    this._enabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
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

  // name - computed: false, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // packet_length - computed: false, optional: true, required: false
  private _packetLength?: string; 
  public get packetLength() {
    return this.getStringAttribute('packet_length');
  }
  public set packetLength(value: string) {
    this._packetLength = value;
  }
  public resetPacketLength() {
    this._packetLength = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get packetLengthInput() {
    return this._packetLength;
  }

  // priority - computed: false, optional: true, required: false
  private _priority?: string; 
  public get priority() {
    return this.getStringAttribute('priority');
  }
  public set priority(value: string) {
    this._priority = value;
  }
  public resetPriority() {
    this._priority = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get priorityInput() {
    return this._priority;
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

  // traffic_mirror_filter_id - computed: false, optional: true, required: false
  private _trafficMirrorFilterId?: string; 
  public get trafficMirrorFilterId() {
    return this.getStringAttribute('traffic_mirror_filter_id');
  }
  public set trafficMirrorFilterId(value: string) {
    this._trafficMirrorFilterId = value;
  }
  public resetTrafficMirrorFilterId() {
    this._trafficMirrorFilterId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trafficMirrorFilterIdInput() {
    return this._trafficMirrorFilterId;
  }

  // traffic_mirror_session_id - computed: false, optional: true, required: false
  private _trafficMirrorSessionId?: string; 
  public get trafficMirrorSessionId() {
    return this.getStringAttribute('traffic_mirror_session_id');
  }
  public set trafficMirrorSessionId(value: string) {
    this._trafficMirrorSessionId = value;
  }
  public resetTrafficMirrorSessionId() {
    this._trafficMirrorSessionId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trafficMirrorSessionIdInput() {
    return this._trafficMirrorSessionId;
  }

  // traffic_mirror_sessions - computed: true, optional: false, required: false
  private _trafficMirrorSessions = new DataHuaweicloudVpcTrafficMirrorSessionsTrafficMirrorSessionsList(this, "traffic_mirror_sessions", false);
  public get trafficMirrorSessions() {
    return this._trafficMirrorSessions;
  }

  // traffic_mirror_target_id - computed: false, optional: true, required: false
  private _trafficMirrorTargetId?: string; 
  public get trafficMirrorTargetId() {
    return this.getStringAttribute('traffic_mirror_target_id');
  }
  public set trafficMirrorTargetId(value: string) {
    this._trafficMirrorTargetId = value;
  }
  public resetTrafficMirrorTargetId() {
    this._trafficMirrorTargetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trafficMirrorTargetIdInput() {
    return this._trafficMirrorTargetId;
  }

  // traffic_mirror_target_type - computed: false, optional: true, required: false
  private _trafficMirrorTargetType?: string; 
  public get trafficMirrorTargetType() {
    return this.getStringAttribute('traffic_mirror_target_type');
  }
  public set trafficMirrorTargetType(value: string) {
    this._trafficMirrorTargetType = value;
  }
  public resetTrafficMirrorTargetType() {
    this._trafficMirrorTargetType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trafficMirrorTargetTypeInput() {
    return this._trafficMirrorTargetType;
  }

  // type - computed: false, optional: true, required: false
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

  // virtual_network_id - computed: false, optional: true, required: false
  private _virtualNetworkId?: string; 
  public get virtualNetworkId() {
    return this.getStringAttribute('virtual_network_id');
  }
  public set virtualNetworkId(value: string) {
    this._virtualNetworkId = value;
  }
  public resetVirtualNetworkId() {
    this._virtualNetworkId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get virtualNetworkIdInput() {
    return this._virtualNetworkId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      enabled: cdktf.stringToTerraform(this._enabled),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      packet_length: cdktf.stringToTerraform(this._packetLength),
      priority: cdktf.stringToTerraform(this._priority),
      region: cdktf.stringToTerraform(this._region),
      traffic_mirror_filter_id: cdktf.stringToTerraform(this._trafficMirrorFilterId),
      traffic_mirror_session_id: cdktf.stringToTerraform(this._trafficMirrorSessionId),
      traffic_mirror_target_id: cdktf.stringToTerraform(this._trafficMirrorTargetId),
      traffic_mirror_target_type: cdktf.stringToTerraform(this._trafficMirrorTargetType),
      type: cdktf.stringToTerraform(this._type),
      virtual_network_id: cdktf.stringToTerraform(this._virtualNetworkId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      enabled: {
        value: cdktf.stringToHclTerraform(this._enabled),
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
      packet_length: {
        value: cdktf.stringToHclTerraform(this._packetLength),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      priority: {
        value: cdktf.stringToHclTerraform(this._priority),
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
      traffic_mirror_filter_id: {
        value: cdktf.stringToHclTerraform(this._trafficMirrorFilterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      traffic_mirror_session_id: {
        value: cdktf.stringToHclTerraform(this._trafficMirrorSessionId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      traffic_mirror_target_id: {
        value: cdktf.stringToHclTerraform(this._trafficMirrorTargetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      traffic_mirror_target_type: {
        value: cdktf.stringToHclTerraform(this._trafficMirrorTargetType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      virtual_network_id: {
        value: cdktf.stringToHclTerraform(this._virtualNetworkId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

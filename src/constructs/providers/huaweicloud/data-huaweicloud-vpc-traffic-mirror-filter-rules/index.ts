// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudVpcTrafficMirrorFilterRulesConfig extends cdktf.TerraformMetaArguments {
  /**
  * The policy of in the traffic mirror filter rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#action DataHuaweicloudVpcTrafficMirrorFilterRules#action}
  */
  readonly action?: string;
  /**
  * The destination IP address of the traffic mirror filter rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#destination_cidr_block DataHuaweicloudVpcTrafficMirrorFilterRules#destination_cidr_block}
  */
  readonly destinationCidrBlock?: string;
  /**
  * The destination port number range of the traffic mirror filter rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#destination_port_range DataHuaweicloudVpcTrafficMirrorFilterRules#destination_port_range}
  */
  readonly destinationPortRange?: string;
  /**
  * The direction of the traffic mirror filter rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#direction DataHuaweicloudVpcTrafficMirrorFilterRules#direction}
  */
  readonly direction?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#id DataHuaweicloudVpcTrafficMirrorFilterRules#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The priority number of the traffic mirror filter rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#priority DataHuaweicloudVpcTrafficMirrorFilterRules#priority}
  */
  readonly priority?: string;
  /**
  * The protocol of the traffic mirror filter rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#protocol DataHuaweicloudVpcTrafficMirrorFilterRules#protocol}
  */
  readonly protocol?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#region DataHuaweicloudVpcTrafficMirrorFilterRules#region}
  */
  readonly region?: string;
  /**
  * The source IP address of the traffic mirror filter rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#source_cidr_block DataHuaweicloudVpcTrafficMirrorFilterRules#source_cidr_block}
  */
  readonly sourceCidrBlock?: string;
  /**
  * The source port number range of the traffic mirror filter rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#source_port_range DataHuaweicloudVpcTrafficMirrorFilterRules#source_port_range}
  */
  readonly sourcePortRange?: string;
  /**
  * The traffic mirror filter ID used as the query filter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#traffic_mirror_filter_id DataHuaweicloudVpcTrafficMirrorFilterRules#traffic_mirror_filter_id}
  */
  readonly trafficMirrorFilterId?: string;
  /**
  * The traffic mirror filter rule ID used as the query filter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#traffic_mirror_filter_rule_id DataHuaweicloudVpcTrafficMirrorFilterRules#traffic_mirror_filter_rule_id}
  */
  readonly trafficMirrorFilterRuleId?: string;
}
export interface DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRules {
}

export function dataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRulesToTerraform(struct?: DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRulesToHclTerraform(struct?: DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRules | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRules | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // action - computed: true, optional: false, required: false
  public get action() {
    return this.getStringAttribute('action');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // destination_cidr_block - computed: true, optional: false, required: false
  public get destinationCidrBlock() {
    return this.getStringAttribute('destination_cidr_block');
  }

  // destination_port_range - computed: true, optional: false, required: false
  public get destinationPortRange() {
    return this.getStringAttribute('destination_port_range');
  }

  // direction - computed: true, optional: false, required: false
  public get direction() {
    return this.getStringAttribute('direction');
  }

  // ethertype - computed: true, optional: false, required: false
  public get ethertype() {
    return this.getStringAttribute('ethertype');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // priority - computed: true, optional: false, required: false
  public get priority() {
    return this.getNumberAttribute('priority');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }

  // source_cidr_block - computed: true, optional: false, required: false
  public get sourceCidrBlock() {
    return this.getStringAttribute('source_cidr_block');
  }

  // source_port_range - computed: true, optional: false, required: false
  public get sourcePortRange() {
    return this.getStringAttribute('source_port_range');
  }

  // traffic_mirror_filter_id - computed: true, optional: false, required: false
  public get trafficMirrorFilterId() {
    return this.getStringAttribute('traffic_mirror_filter_id');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRulesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRulesOutputReference {
    return new DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules huaweicloud_vpc_traffic_mirror_filter_rules}
*/
export class DataHuaweicloudVpcTrafficMirrorFilterRules extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vpc_traffic_mirror_filter_rules";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudVpcTrafficMirrorFilterRules resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudVpcTrafficMirrorFilterRules to import
  * @param importFromId The id of the existing DataHuaweicloudVpcTrafficMirrorFilterRules that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudVpcTrafficMirrorFilterRules to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vpc_traffic_mirror_filter_rules", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpc_traffic_mirror_filter_rules huaweicloud_vpc_traffic_mirror_filter_rules} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudVpcTrafficMirrorFilterRulesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudVpcTrafficMirrorFilterRulesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vpc_traffic_mirror_filter_rules',
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
    this._action = config.action;
    this._destinationCidrBlock = config.destinationCidrBlock;
    this._destinationPortRange = config.destinationPortRange;
    this._direction = config.direction;
    this._id = config.id;
    this._priority = config.priority;
    this._protocol = config.protocol;
    this._region = config.region;
    this._sourceCidrBlock = config.sourceCidrBlock;
    this._sourcePortRange = config.sourcePortRange;
    this._trafficMirrorFilterId = config.trafficMirrorFilterId;
    this._trafficMirrorFilterRuleId = config.trafficMirrorFilterRuleId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action - computed: false, optional: true, required: false
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  public resetAction() {
    this._action = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
  }

  // destination_cidr_block - computed: false, optional: true, required: false
  private _destinationCidrBlock?: string; 
  public get destinationCidrBlock() {
    return this.getStringAttribute('destination_cidr_block');
  }
  public set destinationCidrBlock(value: string) {
    this._destinationCidrBlock = value;
  }
  public resetDestinationCidrBlock() {
    this._destinationCidrBlock = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationCidrBlockInput() {
    return this._destinationCidrBlock;
  }

  // destination_port_range - computed: false, optional: true, required: false
  private _destinationPortRange?: string; 
  public get destinationPortRange() {
    return this.getStringAttribute('destination_port_range');
  }
  public set destinationPortRange(value: string) {
    this._destinationPortRange = value;
  }
  public resetDestinationPortRange() {
    this._destinationPortRange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationPortRangeInput() {
    return this._destinationPortRange;
  }

  // direction - computed: false, optional: true, required: false
  private _direction?: string; 
  public get direction() {
    return this.getStringAttribute('direction');
  }
  public set direction(value: string) {
    this._direction = value;
  }
  public resetDirection() {
    this._direction = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get directionInput() {
    return this._direction;
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

  // protocol - computed: false, optional: true, required: false
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  public resetProtocol() {
    this._protocol = undefined;
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

  // source_cidr_block - computed: false, optional: true, required: false
  private _sourceCidrBlock?: string; 
  public get sourceCidrBlock() {
    return this.getStringAttribute('source_cidr_block');
  }
  public set sourceCidrBlock(value: string) {
    this._sourceCidrBlock = value;
  }
  public resetSourceCidrBlock() {
    this._sourceCidrBlock = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceCidrBlockInput() {
    return this._sourceCidrBlock;
  }

  // source_port_range - computed: false, optional: true, required: false
  private _sourcePortRange?: string; 
  public get sourcePortRange() {
    return this.getStringAttribute('source_port_range');
  }
  public set sourcePortRange(value: string) {
    this._sourcePortRange = value;
  }
  public resetSourcePortRange() {
    this._sourcePortRange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourcePortRangeInput() {
    return this._sourcePortRange;
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

  // traffic_mirror_filter_rule_id - computed: false, optional: true, required: false
  private _trafficMirrorFilterRuleId?: string; 
  public get trafficMirrorFilterRuleId() {
    return this.getStringAttribute('traffic_mirror_filter_rule_id');
  }
  public set trafficMirrorFilterRuleId(value: string) {
    this._trafficMirrorFilterRuleId = value;
  }
  public resetTrafficMirrorFilterRuleId() {
    this._trafficMirrorFilterRuleId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trafficMirrorFilterRuleIdInput() {
    return this._trafficMirrorFilterRuleId;
  }

  // traffic_mirror_filter_rules - computed: true, optional: false, required: false
  private _trafficMirrorFilterRules = new DataHuaweicloudVpcTrafficMirrorFilterRulesTrafficMirrorFilterRulesList(this, "traffic_mirror_filter_rules", false);
  public get trafficMirrorFilterRules() {
    return this._trafficMirrorFilterRules;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      action: cdktf.stringToTerraform(this._action),
      destination_cidr_block: cdktf.stringToTerraform(this._destinationCidrBlock),
      destination_port_range: cdktf.stringToTerraform(this._destinationPortRange),
      direction: cdktf.stringToTerraform(this._direction),
      id: cdktf.stringToTerraform(this._id),
      priority: cdktf.stringToTerraform(this._priority),
      protocol: cdktf.stringToTerraform(this._protocol),
      region: cdktf.stringToTerraform(this._region),
      source_cidr_block: cdktf.stringToTerraform(this._sourceCidrBlock),
      source_port_range: cdktf.stringToTerraform(this._sourcePortRange),
      traffic_mirror_filter_id: cdktf.stringToTerraform(this._trafficMirrorFilterId),
      traffic_mirror_filter_rule_id: cdktf.stringToTerraform(this._trafficMirrorFilterRuleId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      action: {
        value: cdktf.stringToHclTerraform(this._action),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_cidr_block: {
        value: cdktf.stringToHclTerraform(this._destinationCidrBlock),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_port_range: {
        value: cdktf.stringToHclTerraform(this._destinationPortRange),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      direction: {
        value: cdktf.stringToHclTerraform(this._direction),
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
      priority: {
        value: cdktf.stringToHclTerraform(this._priority),
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
      source_cidr_block: {
        value: cdktf.stringToHclTerraform(this._sourceCidrBlock),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_port_range: {
        value: cdktf.stringToHclTerraform(this._sourcePortRange),
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
      traffic_mirror_filter_rule_id: {
        value: cdktf.stringToHclTerraform(this._trafficMirrorFilterRuleId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

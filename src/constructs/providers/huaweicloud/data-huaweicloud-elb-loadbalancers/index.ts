// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudElbLoadbalancersConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#description DataHuaweicloudElbLoadbalancers#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#enterprise_project_id DataHuaweicloudElbLoadbalancers#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#id DataHuaweicloudElbLoadbalancers#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#ipv4_subnet_id DataHuaweicloudElbLoadbalancers#ipv4_subnet_id}
  */
  readonly ipv4SubnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#ipv6_network_id DataHuaweicloudElbLoadbalancers#ipv6_network_id}
  */
  readonly ipv6NetworkId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#l4_flavor_id DataHuaweicloudElbLoadbalancers#l4_flavor_id}
  */
  readonly l4FlavorId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#l7_flavor_id DataHuaweicloudElbLoadbalancers#l7_flavor_id}
  */
  readonly l7FlavorId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#loadbalancer_id DataHuaweicloudElbLoadbalancers#loadbalancer_id}
  */
  readonly loadbalancerId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#name DataHuaweicloudElbLoadbalancers#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#region DataHuaweicloudElbLoadbalancers#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#type DataHuaweicloudElbLoadbalancers#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#vpc_id DataHuaweicloudElbLoadbalancers#vpc_id}
  */
  readonly vpcId?: string;
}
export interface DataHuaweicloudElbLoadbalancersLoadbalancers {
}

export function dataHuaweicloudElbLoadbalancersLoadbalancersToTerraform(struct?: DataHuaweicloudElbLoadbalancersLoadbalancers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudElbLoadbalancersLoadbalancersToHclTerraform(struct?: DataHuaweicloudElbLoadbalancersLoadbalancers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudElbLoadbalancersLoadbalancersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudElbLoadbalancersLoadbalancers | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudElbLoadbalancersLoadbalancers | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // autoscaling_enabled - computed: true, optional: false, required: false
  public get autoscalingEnabled() {
    return this.getBooleanAttribute('autoscaling_enabled');
  }

  // availability_zone - computed: true, optional: false, required: false
  public get availabilityZone() {
    return this.getListAttribute('availability_zone');
  }

  // backend_subnets - computed: true, optional: false, required: false
  public get backendSubnets() {
    return this.getListAttribute('backend_subnets');
  }

  // cross_vpc_backend - computed: true, optional: false, required: false
  public get crossVpcBackend() {
    return this.getBooleanAttribute('cross_vpc_backend');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // gw_flavor_id - computed: true, optional: false, required: false
  public get gwFlavorId() {
    return this.getStringAttribute('gw_flavor_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // ipv4_address - computed: true, optional: false, required: false
  public get ipv4Address() {
    return this.getStringAttribute('ipv4_address');
  }

  // ipv4_port_id - computed: true, optional: false, required: false
  public get ipv4PortId() {
    return this.getStringAttribute('ipv4_port_id');
  }

  // ipv4_subnet_id - computed: true, optional: false, required: false
  public get ipv4SubnetId() {
    return this.getStringAttribute('ipv4_subnet_id');
  }

  // ipv6_address - computed: true, optional: false, required: false
  public get ipv6Address() {
    return this.getStringAttribute('ipv6_address');
  }

  // ipv6_network_id - computed: true, optional: false, required: false
  public get ipv6NetworkId() {
    return this.getStringAttribute('ipv6_network_id');
  }

  // l4_flavor_id - computed: true, optional: false, required: false
  public get l4FlavorId() {
    return this.getStringAttribute('l4_flavor_id');
  }

  // l7_flavor_id - computed: true, optional: false, required: false
  public get l7FlavorId() {
    return this.getStringAttribute('l7_flavor_id');
  }

  // loadbalancer_type - computed: true, optional: false, required: false
  public get loadbalancerType() {
    return this.getStringAttribute('loadbalancer_type');
  }

  // min_l7_flavor_id - computed: true, optional: false, required: false
  public get minL7FlavorId() {
    return this.getStringAttribute('min_l7_flavor_id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // protection_reason - computed: true, optional: false, required: false
  public get protectionReason() {
    return this.getStringAttribute('protection_reason');
  }

  // protection_status - computed: true, optional: false, required: false
  public get protectionStatus() {
    return this.getStringAttribute('protection_status');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // vpc_id - computed: true, optional: false, required: false
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
}

export class DataHuaweicloudElbLoadbalancersLoadbalancersList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudElbLoadbalancersLoadbalancersOutputReference {
    return new DataHuaweicloudElbLoadbalancersLoadbalancersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers huaweicloud_elb_loadbalancers}
*/
export class DataHuaweicloudElbLoadbalancers extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_elb_loadbalancers";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudElbLoadbalancers resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudElbLoadbalancers to import
  * @param importFromId The id of the existing DataHuaweicloudElbLoadbalancers that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudElbLoadbalancers to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_elb_loadbalancers", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/elb_loadbalancers huaweicloud_elb_loadbalancers} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudElbLoadbalancersConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudElbLoadbalancersConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_elb_loadbalancers',
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
    this._description = config.description;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._ipv4SubnetId = config.ipv4SubnetId;
    this._ipv6NetworkId = config.ipv6NetworkId;
    this._l4FlavorId = config.l4FlavorId;
    this._l7FlavorId = config.l7FlavorId;
    this._loadbalancerId = config.loadbalancerId;
    this._name = config.name;
    this._region = config.region;
    this._type = config.type;
    this._vpcId = config.vpcId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // description - computed: false, optional: true, required: false
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

  // ipv4_subnet_id - computed: false, optional: true, required: false
  private _ipv4SubnetId?: string; 
  public get ipv4SubnetId() {
    return this.getStringAttribute('ipv4_subnet_id');
  }
  public set ipv4SubnetId(value: string) {
    this._ipv4SubnetId = value;
  }
  public resetIpv4SubnetId() {
    this._ipv4SubnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipv4SubnetIdInput() {
    return this._ipv4SubnetId;
  }

  // ipv6_network_id - computed: false, optional: true, required: false
  private _ipv6NetworkId?: string; 
  public get ipv6NetworkId() {
    return this.getStringAttribute('ipv6_network_id');
  }
  public set ipv6NetworkId(value: string) {
    this._ipv6NetworkId = value;
  }
  public resetIpv6NetworkId() {
    this._ipv6NetworkId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipv6NetworkIdInput() {
    return this._ipv6NetworkId;
  }

  // l4_flavor_id - computed: false, optional: true, required: false
  private _l4FlavorId?: string; 
  public get l4FlavorId() {
    return this.getStringAttribute('l4_flavor_id');
  }
  public set l4FlavorId(value: string) {
    this._l4FlavorId = value;
  }
  public resetL4FlavorId() {
    this._l4FlavorId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get l4FlavorIdInput() {
    return this._l4FlavorId;
  }

  // l7_flavor_id - computed: false, optional: true, required: false
  private _l7FlavorId?: string; 
  public get l7FlavorId() {
    return this.getStringAttribute('l7_flavor_id');
  }
  public set l7FlavorId(value: string) {
    this._l7FlavorId = value;
  }
  public resetL7FlavorId() {
    this._l7FlavorId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get l7FlavorIdInput() {
    return this._l7FlavorId;
  }

  // loadbalancer_id - computed: false, optional: true, required: false
  private _loadbalancerId?: string; 
  public get loadbalancerId() {
    return this.getStringAttribute('loadbalancer_id');
  }
  public set loadbalancerId(value: string) {
    this._loadbalancerId = value;
  }
  public resetLoadbalancerId() {
    this._loadbalancerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loadbalancerIdInput() {
    return this._loadbalancerId;
  }

  // loadbalancers - computed: true, optional: false, required: false
  private _loadbalancers = new DataHuaweicloudElbLoadbalancersLoadbalancersList(this, "loadbalancers", false);
  public get loadbalancers() {
    return this._loadbalancers;
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

  // vpc_id - computed: false, optional: true, required: false
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  public resetVpcId() {
    this._vpcId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      ipv4_subnet_id: cdktf.stringToTerraform(this._ipv4SubnetId),
      ipv6_network_id: cdktf.stringToTerraform(this._ipv6NetworkId),
      l4_flavor_id: cdktf.stringToTerraform(this._l4FlavorId),
      l7_flavor_id: cdktf.stringToTerraform(this._l7FlavorId),
      loadbalancer_id: cdktf.stringToTerraform(this._loadbalancerId),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.stringToTerraform(this._type),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      description: {
        value: cdktf.stringToHclTerraform(this._description),
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
      ipv4_subnet_id: {
        value: cdktf.stringToHclTerraform(this._ipv4SubnetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ipv6_network_id: {
        value: cdktf.stringToHclTerraform(this._ipv6NetworkId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      l4_flavor_id: {
        value: cdktf.stringToHclTerraform(this._l4FlavorId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      l7_flavor_id: {
        value: cdktf.stringToHclTerraform(this._l7FlavorId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      loadbalancer_id: {
        value: cdktf.stringToHclTerraform(this._loadbalancerId),
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
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

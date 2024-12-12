// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_policies_change_set
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCcCentralNetworkPoliciesChangeSetConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies central network ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_policies_change_set#central_network_id DataHuaweicloudCcCentralNetworkPoliciesChangeSet#central_network_id}
  */
  readonly centralNetworkId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_policies_change_set#id DataHuaweicloudCcCentralNetworkPoliciesChangeSet#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies central network policy ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_policies_change_set#policy_id DataHuaweicloudCcCentralNetworkPoliciesChangeSet#policy_id}
  */
  readonly policyId: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_policies_change_set#region DataHuaweicloudCcCentralNetworkPoliciesChangeSet#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSet {
}

export function dataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSetToTerraform(struct?: DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSet): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSetToHclTerraform(struct?: DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSet): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSetOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSet | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSet | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // change_content - computed: true, optional: false, required: false
  private _changeContent = new cdktf.StringMap(this, "change_content");
  public get changeContent() {
    return this._changeContent;
  }
}

export class DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSetList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSetOutputReference {
    return new DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSetOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_policies_change_set huaweicloud_cc_central_network_policies_change_set}
*/
export class DataHuaweicloudCcCentralNetworkPoliciesChangeSet extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_central_network_policies_change_set";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCcCentralNetworkPoliciesChangeSet resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCcCentralNetworkPoliciesChangeSet to import
  * @param importFromId The id of the existing DataHuaweicloudCcCentralNetworkPoliciesChangeSet that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_policies_change_set#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCcCentralNetworkPoliciesChangeSet to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_central_network_policies_change_set", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_policies_change_set huaweicloud_cc_central_network_policies_change_set} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCcCentralNetworkPoliciesChangeSetConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCcCentralNetworkPoliciesChangeSetConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_central_network_policies_change_set',
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
    this._policyId = config.policyId;
    this._region = config.region;
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

  // central_network_policy_change_set - computed: true, optional: false, required: false
  private _centralNetworkPolicyChangeSet = new DataHuaweicloudCcCentralNetworkPoliciesChangeSetCentralNetworkPolicyChangeSetList(this, "central_network_policy_change_set", false);
  public get centralNetworkPolicyChangeSet() {
    return this._centralNetworkPolicyChangeSet;
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

  // policy_id - computed: false, optional: false, required: true
  private _policyId?: string; 
  public get policyId() {
    return this.getStringAttribute('policy_id');
  }
  public set policyId(value: string) {
    this._policyId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get policyIdInput() {
    return this._policyId;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      central_network_id: cdktf.stringToTerraform(this._centralNetworkId),
      id: cdktf.stringToTerraform(this._id),
      policy_id: cdktf.stringToTerraform(this._policyId),
      region: cdktf.stringToTerraform(this._region),
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
      policy_id: {
        value: cdktf.stringToHclTerraform(this._policyId),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

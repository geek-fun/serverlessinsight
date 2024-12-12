// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_configuration
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DwsWorkloadConfigurationConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the DWS cluster ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_configuration#cluster_id DwsWorkloadConfiguration#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_configuration#id DwsWorkloadConfiguration#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the maximum number of concurrent tasks on a single CN.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_configuration#max_concurrency_num DwsWorkloadConfiguration#max_concurrency_num}
  */
  readonly maxConcurrencyNum?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_configuration#region DwsWorkloadConfiguration#region}
  */
  readonly region?: string;
  /**
  * Specifies the workload management switch.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_configuration#workload_switch DwsWorkloadConfiguration#workload_switch}
  */
  readonly workloadSwitch: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_configuration huaweicloud_dws_workload_configuration}
*/
export class DwsWorkloadConfiguration extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dws_workload_configuration";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DwsWorkloadConfiguration resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DwsWorkloadConfiguration to import
  * @param importFromId The id of the existing DwsWorkloadConfiguration that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_configuration#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DwsWorkloadConfiguration to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dws_workload_configuration", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_configuration huaweicloud_dws_workload_configuration} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DwsWorkloadConfigurationConfig
  */
  public constructor(scope: Construct, id: string, config: DwsWorkloadConfigurationConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dws_workload_configuration',
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
    this._id = config.id;
    this._maxConcurrencyNum = config.maxConcurrencyNum;
    this._region = config.region;
    this._workloadSwitch = config.workloadSwitch;
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

  // max_concurrency_num - computed: true, optional: true, required: false
  private _maxConcurrencyNum?: string; 
  public get maxConcurrencyNum() {
    return this.getStringAttribute('max_concurrency_num');
  }
  public set maxConcurrencyNum(value: string) {
    this._maxConcurrencyNum = value;
  }
  public resetMaxConcurrencyNum() {
    this._maxConcurrencyNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxConcurrencyNumInput() {
    return this._maxConcurrencyNum;
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

  // workload_switch - computed: false, optional: false, required: true
  private _workloadSwitch?: string; 
  public get workloadSwitch() {
    return this.getStringAttribute('workload_switch');
  }
  public set workloadSwitch(value: string) {
    this._workloadSwitch = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workloadSwitchInput() {
    return this._workloadSwitch;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      id: cdktf.stringToTerraform(this._id),
      max_concurrency_num: cdktf.stringToTerraform(this._maxConcurrencyNum),
      region: cdktf.stringToTerraform(this._region),
      workload_switch: cdktf.stringToTerraform(this._workloadSwitch),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      max_concurrency_num: {
        value: cdktf.stringToHclTerraform(this._maxConcurrencyNum),
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
      workload_switch: {
        value: cdktf.stringToHclTerraform(this._workloadSwitch),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

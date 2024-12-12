// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CfwLtsLogConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#fw_instance_id CfwLtsLog#fw_instance_id}
  */
  readonly fwInstanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#id CfwLtsLog#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * LTS access log stream switch.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#lts_access_log_stream_enable CfwLtsLog#lts_access_log_stream_enable}
  */
  readonly ltsAccessLogStreamEnable: number;
  /**
  * LTS access log stream ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#lts_access_log_stream_id CfwLtsLog#lts_access_log_stream_id}
  */
  readonly ltsAccessLogStreamId?: string;
  /**
  * LTS attack log stream switch.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#lts_attack_log_stream_enable CfwLtsLog#lts_attack_log_stream_enable}
  */
  readonly ltsAttackLogStreamEnable: number;
  /**
  * LTS attack log stream ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#lts_attack_log_stream_id CfwLtsLog#lts_attack_log_stream_id}
  */
  readonly ltsAttackLogStreamId?: string;
  /**
  * LTS flow log stream switch.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#lts_flow_log_stream_enable CfwLtsLog#lts_flow_log_stream_enable}
  */
  readonly ltsFlowLogStreamEnable: number;
  /**
  * LTS flow log stream ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#lts_flow_log_stream_id CfwLtsLog#lts_flow_log_stream_id}
  */
  readonly ltsFlowLogStreamId?: string;
  /**
  * LTS log group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#lts_log_group_id CfwLtsLog#lts_log_group_id}
  */
  readonly ltsLogGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#region CfwLtsLog#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log huaweicloud_cfw_lts_log}
*/
export class CfwLtsLog extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cfw_lts_log";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CfwLtsLog resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CfwLtsLog to import
  * @param importFromId The id of the existing CfwLtsLog that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CfwLtsLog to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cfw_lts_log", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_lts_log huaweicloud_cfw_lts_log} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CfwLtsLogConfig
  */
  public constructor(scope: Construct, id: string, config: CfwLtsLogConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cfw_lts_log',
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
    this._fwInstanceId = config.fwInstanceId;
    this._id = config.id;
    this._ltsAccessLogStreamEnable = config.ltsAccessLogStreamEnable;
    this._ltsAccessLogStreamId = config.ltsAccessLogStreamId;
    this._ltsAttackLogStreamEnable = config.ltsAttackLogStreamEnable;
    this._ltsAttackLogStreamId = config.ltsAttackLogStreamId;
    this._ltsFlowLogStreamEnable = config.ltsFlowLogStreamEnable;
    this._ltsFlowLogStreamId = config.ltsFlowLogStreamId;
    this._ltsLogGroupId = config.ltsLogGroupId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // fw_instance_id - computed: false, optional: false, required: true
  private _fwInstanceId?: string; 
  public get fwInstanceId() {
    return this.getStringAttribute('fw_instance_id');
  }
  public set fwInstanceId(value: string) {
    this._fwInstanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fwInstanceIdInput() {
    return this._fwInstanceId;
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

  // lts_access_log_stream_enable - computed: false, optional: false, required: true
  private _ltsAccessLogStreamEnable?: number; 
  public get ltsAccessLogStreamEnable() {
    return this.getNumberAttribute('lts_access_log_stream_enable');
  }
  public set ltsAccessLogStreamEnable(value: number) {
    this._ltsAccessLogStreamEnable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsAccessLogStreamEnableInput() {
    return this._ltsAccessLogStreamEnable;
  }

  // lts_access_log_stream_id - computed: false, optional: true, required: false
  private _ltsAccessLogStreamId?: string; 
  public get ltsAccessLogStreamId() {
    return this.getStringAttribute('lts_access_log_stream_id');
  }
  public set ltsAccessLogStreamId(value: string) {
    this._ltsAccessLogStreamId = value;
  }
  public resetLtsAccessLogStreamId() {
    this._ltsAccessLogStreamId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsAccessLogStreamIdInput() {
    return this._ltsAccessLogStreamId;
  }

  // lts_attack_log_stream_enable - computed: false, optional: false, required: true
  private _ltsAttackLogStreamEnable?: number; 
  public get ltsAttackLogStreamEnable() {
    return this.getNumberAttribute('lts_attack_log_stream_enable');
  }
  public set ltsAttackLogStreamEnable(value: number) {
    this._ltsAttackLogStreamEnable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsAttackLogStreamEnableInput() {
    return this._ltsAttackLogStreamEnable;
  }

  // lts_attack_log_stream_id - computed: false, optional: true, required: false
  private _ltsAttackLogStreamId?: string; 
  public get ltsAttackLogStreamId() {
    return this.getStringAttribute('lts_attack_log_stream_id');
  }
  public set ltsAttackLogStreamId(value: string) {
    this._ltsAttackLogStreamId = value;
  }
  public resetLtsAttackLogStreamId() {
    this._ltsAttackLogStreamId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsAttackLogStreamIdInput() {
    return this._ltsAttackLogStreamId;
  }

  // lts_flow_log_stream_enable - computed: false, optional: false, required: true
  private _ltsFlowLogStreamEnable?: number; 
  public get ltsFlowLogStreamEnable() {
    return this.getNumberAttribute('lts_flow_log_stream_enable');
  }
  public set ltsFlowLogStreamEnable(value: number) {
    this._ltsFlowLogStreamEnable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsFlowLogStreamEnableInput() {
    return this._ltsFlowLogStreamEnable;
  }

  // lts_flow_log_stream_id - computed: false, optional: true, required: false
  private _ltsFlowLogStreamId?: string; 
  public get ltsFlowLogStreamId() {
    return this.getStringAttribute('lts_flow_log_stream_id');
  }
  public set ltsFlowLogStreamId(value: string) {
    this._ltsFlowLogStreamId = value;
  }
  public resetLtsFlowLogStreamId() {
    this._ltsFlowLogStreamId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsFlowLogStreamIdInput() {
    return this._ltsFlowLogStreamId;
  }

  // lts_log_group_id - computed: false, optional: false, required: true
  private _ltsLogGroupId?: string; 
  public get ltsLogGroupId() {
    return this.getStringAttribute('lts_log_group_id');
  }
  public set ltsLogGroupId(value: string) {
    this._ltsLogGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsLogGroupIdInput() {
    return this._ltsLogGroupId;
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
      fw_instance_id: cdktf.stringToTerraform(this._fwInstanceId),
      id: cdktf.stringToTerraform(this._id),
      lts_access_log_stream_enable: cdktf.numberToTerraform(this._ltsAccessLogStreamEnable),
      lts_access_log_stream_id: cdktf.stringToTerraform(this._ltsAccessLogStreamId),
      lts_attack_log_stream_enable: cdktf.numberToTerraform(this._ltsAttackLogStreamEnable),
      lts_attack_log_stream_id: cdktf.stringToTerraform(this._ltsAttackLogStreamId),
      lts_flow_log_stream_enable: cdktf.numberToTerraform(this._ltsFlowLogStreamEnable),
      lts_flow_log_stream_id: cdktf.stringToTerraform(this._ltsFlowLogStreamId),
      lts_log_group_id: cdktf.stringToTerraform(this._ltsLogGroupId),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      fw_instance_id: {
        value: cdktf.stringToHclTerraform(this._fwInstanceId),
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
      lts_access_log_stream_enable: {
        value: cdktf.numberToHclTerraform(this._ltsAccessLogStreamEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      lts_access_log_stream_id: {
        value: cdktf.stringToHclTerraform(this._ltsAccessLogStreamId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lts_attack_log_stream_enable: {
        value: cdktf.numberToHclTerraform(this._ltsAttackLogStreamEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      lts_attack_log_stream_id: {
        value: cdktf.stringToHclTerraform(this._ltsAttackLogStreamId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lts_flow_log_stream_enable: {
        value: cdktf.numberToHclTerraform(this._ltsFlowLogStreamEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      lts_flow_log_stream_id: {
        value: cdktf.stringToHclTerraform(this._ltsFlowLogStreamId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lts_log_group_id: {
        value: cdktf.stringToHclTerraform(this._ltsLogGroupId),
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

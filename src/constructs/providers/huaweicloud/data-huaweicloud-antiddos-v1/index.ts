// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_v1
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudAntiddosV1Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_v1#floating_ip_address DataHuaweicloudAntiddosV1#floating_ip_address}
  */
  readonly floatingIpAddress?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_v1#floating_ip_id DataHuaweicloudAntiddosV1#floating_ip_id}
  */
  readonly floatingIpId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_v1#id DataHuaweicloudAntiddosV1#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_v1#region DataHuaweicloudAntiddosV1#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_v1#status DataHuaweicloudAntiddosV1#status}
  */
  readonly status?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_v1 huaweicloud_antiddos_v1}
*/
export class DataHuaweicloudAntiddosV1 extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_antiddos_v1";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudAntiddosV1 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudAntiddosV1 to import
  * @param importFromId The id of the existing DataHuaweicloudAntiddosV1 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_v1#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudAntiddosV1 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_antiddos_v1", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_v1 huaweicloud_antiddos_v1} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudAntiddosV1Config = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudAntiddosV1Config = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_antiddos_v1',
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
    this._floatingIpAddress = config.floatingIpAddress;
    this._floatingIpId = config.floatingIpId;
    this._id = config.id;
    this._region = config.region;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bps_attack - computed: true, optional: false, required: false
  public get bpsAttack() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('bps_attack')));
  }

  // bps_in - computed: true, optional: false, required: false
  public get bpsIn() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('bps_in')));
  }

  // end_time - computed: true, optional: false, required: false
  public get endTime() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('end_time')));
  }

  // floating_ip_address - computed: true, optional: true, required: false
  private _floatingIpAddress?: string; 
  public get floatingIpAddress() {
    return this.getStringAttribute('floating_ip_address');
  }
  public set floatingIpAddress(value: string) {
    this._floatingIpAddress = value;
  }
  public resetFloatingIpAddress() {
    this._floatingIpAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get floatingIpAddressInput() {
    return this._floatingIpAddress;
  }

  // floating_ip_id - computed: true, optional: true, required: false
  private _floatingIpId?: string; 
  public get floatingIpId() {
    return this.getStringAttribute('floating_ip_id');
  }
  public set floatingIpId(value: string) {
    this._floatingIpId = value;
  }
  public resetFloatingIpId() {
    this._floatingIpId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get floatingIpIdInput() {
    return this._floatingIpId;
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

  // network_type - computed: true, optional: false, required: false
  public get networkType() {
    return this.getStringAttribute('network_type');
  }

  // period_start - computed: true, optional: false, required: false
  public get periodStart() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('period_start')));
  }

  // pps_attack - computed: true, optional: false, required: false
  public get ppsAttack() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('pps_attack')));
  }

  // pps_in - computed: true, optional: false, required: false
  public get ppsIn() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('pps_in')));
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

  // start_time - computed: true, optional: false, required: false
  public get startTime() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('start_time')));
  }

  // status - computed: true, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // total_bps - computed: true, optional: false, required: false
  public get totalBps() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('total_bps')));
  }

  // total_pps - computed: true, optional: false, required: false
  public get totalPps() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('total_pps')));
  }

  // traffic_cleaning_status - computed: true, optional: false, required: false
  public get trafficCleaningStatus() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('traffic_cleaning_status')));
  }

  // trigger_bps - computed: true, optional: false, required: false
  public get triggerBps() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('trigger_bps')));
  }

  // trigger_http_pps - computed: true, optional: false, required: false
  public get triggerHttpPps() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('trigger_http_pps')));
  }

  // trigger_pps - computed: true, optional: false, required: false
  public get triggerPps() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('trigger_pps')));
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      floating_ip_address: cdktf.stringToTerraform(this._floatingIpAddress),
      floating_ip_id: cdktf.stringToTerraform(this._floatingIpId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      floating_ip_address: {
        value: cdktf.stringToHclTerraform(this._floatingIpAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      floating_ip_id: {
        value: cdktf.stringToHclTerraform(this._floatingIpId),
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
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

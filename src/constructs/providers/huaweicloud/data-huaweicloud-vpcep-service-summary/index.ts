// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpcep_service_summary
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudVpcepServiceSummaryConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the ID of the VPC endpoint service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpcep_service_summary#endpoint_service_id DataHuaweicloudVpcepServiceSummary#endpoint_service_id}
  */
  readonly endpointServiceId?: string;
  /**
  * Specifies the name of the VPC endpoint service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpcep_service_summary#endpoint_service_name DataHuaweicloudVpcepServiceSummary#endpoint_service_name}
  */
  readonly endpointServiceName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpcep_service_summary#id DataHuaweicloudVpcepServiceSummary#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpcep_service_summary#region DataHuaweicloudVpcepServiceSummary#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpcep_service_summary huaweicloud_vpcep_service_summary}
*/
export class DataHuaweicloudVpcepServiceSummary extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vpcep_service_summary";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudVpcepServiceSummary resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudVpcepServiceSummary to import
  * @param importFromId The id of the existing DataHuaweicloudVpcepServiceSummary that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpcep_service_summary#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudVpcepServiceSummary to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vpcep_service_summary", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpcep_service_summary huaweicloud_vpcep_service_summary} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudVpcepServiceSummaryConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudVpcepServiceSummaryConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vpcep_service_summary',
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
    this._endpointServiceId = config.endpointServiceId;
    this._endpointServiceName = config.endpointServiceName;
    this._id = config.id;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // enable_policy - computed: true, optional: false, required: false
  public get enablePolicy() {
    return this.getBooleanAttribute('enable_policy');
  }

  // endpoint_service_id - computed: false, optional: true, required: false
  private _endpointServiceId?: string; 
  public get endpointServiceId() {
    return this.getStringAttribute('endpoint_service_id');
  }
  public set endpointServiceId(value: string) {
    this._endpointServiceId = value;
  }
  public resetEndpointServiceId() {
    this._endpointServiceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointServiceIdInput() {
    return this._endpointServiceId;
  }

  // endpoint_service_name - computed: false, optional: true, required: false
  private _endpointServiceName?: string; 
  public get endpointServiceName() {
    return this.getStringAttribute('endpoint_service_name');
  }
  public set endpointServiceName(value: string) {
    this._endpointServiceName = value;
  }
  public resetEndpointServiceName() {
    this._endpointServiceName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointServiceNameInput() {
    return this._endpointServiceName;
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

  // is_charge - computed: true, optional: false, required: false
  public get isCharge() {
    return this.getBooleanAttribute('is_charge');
  }

  // public_border_group - computed: true, optional: false, required: false
  public get publicBorderGroup() {
    return this.getStringAttribute('public_border_group');
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

  // service_name - computed: true, optional: false, required: false
  public get serviceName() {
    return this.getStringAttribute('service_name');
  }

  // service_type - computed: true, optional: false, required: false
  public get serviceType() {
    return this.getStringAttribute('service_type');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      endpoint_service_id: cdktf.stringToTerraform(this._endpointServiceId),
      endpoint_service_name: cdktf.stringToTerraform(this._endpointServiceName),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      endpoint_service_id: {
        value: cdktf.stringToHclTerraform(this._endpointServiceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      endpoint_service_name: {
        value: cdktf.stringToHclTerraform(this._endpointServiceName),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

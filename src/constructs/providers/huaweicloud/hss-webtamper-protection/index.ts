// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface HssWebtamperProtectionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection#enterprise_project_id HssWebtamperProtection#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection#host_id HssWebtamperProtection#host_id}
  */
  readonly hostId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection#id HssWebtamperProtection#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection#is_dynamics_protect HssWebtamperProtection#is_dynamics_protect}
  */
  readonly isDynamicsProtect?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection#quota_id HssWebtamperProtection#quota_id}
  */
  readonly quotaId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection#region HssWebtamperProtection#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection huaweicloud_hss_webtamper_protection}
*/
export class HssWebtamperProtection extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_hss_webtamper_protection";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a HssWebtamperProtection resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the HssWebtamperProtection to import
  * @param importFromId The id of the existing HssWebtamperProtection that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the HssWebtamperProtection to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_hss_webtamper_protection", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_webtamper_protection huaweicloud_hss_webtamper_protection} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options HssWebtamperProtectionConfig
  */
  public constructor(scope: Construct, id: string, config: HssWebtamperProtectionConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_hss_webtamper_protection',
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
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._hostId = config.hostId;
    this._id = config.id;
    this._isDynamicsProtect = config.isDynamicsProtect;
    this._quotaId = config.quotaId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // anti_tampering_times - computed: true, optional: false, required: false
  public get antiTamperingTimes() {
    return this.getNumberAttribute('anti_tampering_times');
  }

  // detect_tampering_times - computed: true, optional: false, required: false
  public get detectTamperingTimes() {
    return this.getNumberAttribute('detect_tampering_times');
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

  // group_name - computed: true, optional: false, required: false
  public get groupName() {
    return this.getStringAttribute('group_name');
  }

  // host_id - computed: false, optional: false, required: true
  private _hostId?: string; 
  public get hostId() {
    return this.getStringAttribute('host_id');
  }
  public set hostId(value: string) {
    this._hostId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get hostIdInput() {
    return this._hostId;
  }

  // host_name - computed: true, optional: false, required: false
  public get hostName() {
    return this.getStringAttribute('host_name');
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

  // is_dynamics_protect - computed: false, optional: true, required: false
  private _isDynamicsProtect?: boolean | cdktf.IResolvable; 
  public get isDynamicsProtect() {
    return this.getBooleanAttribute('is_dynamics_protect');
  }
  public set isDynamicsProtect(value: boolean | cdktf.IResolvable) {
    this._isDynamicsProtect = value;
  }
  public resetIsDynamicsProtect() {
    this._isDynamicsProtect = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isDynamicsProtectInput() {
    return this._isDynamicsProtect;
  }

  // os_bit - computed: true, optional: false, required: false
  public get osBit() {
    return this.getStringAttribute('os_bit');
  }

  // os_type - computed: true, optional: false, required: false
  public get osType() {
    return this.getStringAttribute('os_type');
  }

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }

  // protect_status - computed: true, optional: false, required: false
  public get protectStatus() {
    return this.getStringAttribute('protect_status');
  }

  // public_ip - computed: true, optional: false, required: false
  public get publicIp() {
    return this.getStringAttribute('public_ip');
  }

  // quota_id - computed: false, optional: true, required: false
  private _quotaId?: string; 
  public get quotaId() {
    return this.getStringAttribute('quota_id');
  }
  public set quotaId(value: string) {
    this._quotaId = value;
  }
  public resetQuotaId() {
    this._quotaId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get quotaIdInput() {
    return this._quotaId;
  }

  // rasp_protect_status - computed: true, optional: false, required: false
  public get raspProtectStatus() {
    return this.getStringAttribute('rasp_protect_status');
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
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      host_id: cdktf.stringToTerraform(this._hostId),
      id: cdktf.stringToTerraform(this._id),
      is_dynamics_protect: cdktf.booleanToTerraform(this._isDynamicsProtect),
      quota_id: cdktf.stringToTerraform(this._quotaId),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      host_id: {
        value: cdktf.stringToHclTerraform(this._hostId),
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
      is_dynamics_protect: {
        value: cdktf.booleanToHclTerraform(this._isDynamicsProtect),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      quota_id: {
        value: cdktf.stringToHclTerraform(this._quotaId),
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

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsWafAccessConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access#enterprise_project_id LtsWafAccess#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access#id LtsWafAccess#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the log stream ID for access logs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access#lts_access_stream_id LtsWafAccess#lts_access_stream_id}
  */
  readonly ltsAccessStreamId?: string;
  /**
  * Specifies the log stream ID for attack logs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access#lts_attack_stream_id LtsWafAccess#lts_attack_stream_id}
  */
  readonly ltsAttackStreamId?: string;
  /**
  * Specifies the log group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access#lts_group_id LtsWafAccess#lts_group_id}
  */
  readonly ltsGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access#region LtsWafAccess#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access huaweicloud_lts_waf_access}
*/
export class LtsWafAccess extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_waf_access";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsWafAccess resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsWafAccess to import
  * @param importFromId The id of the existing LtsWafAccess that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsWafAccess to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_waf_access", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_waf_access huaweicloud_lts_waf_access} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsWafAccessConfig
  */
  public constructor(scope: Construct, id: string, config: LtsWafAccessConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_waf_access',
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
    this._id = config.id;
    this._ltsAccessStreamId = config.ltsAccessStreamId;
    this._ltsAttackStreamId = config.ltsAttackStreamId;
    this._ltsGroupId = config.ltsGroupId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // lts_access_stream_id - computed: false, optional: true, required: false
  private _ltsAccessStreamId?: string; 
  public get ltsAccessStreamId() {
    return this.getStringAttribute('lts_access_stream_id');
  }
  public set ltsAccessStreamId(value: string) {
    this._ltsAccessStreamId = value;
  }
  public resetLtsAccessStreamId() {
    this._ltsAccessStreamId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsAccessStreamIdInput() {
    return this._ltsAccessStreamId;
  }

  // lts_attack_stream_id - computed: false, optional: true, required: false
  private _ltsAttackStreamId?: string; 
  public get ltsAttackStreamId() {
    return this.getStringAttribute('lts_attack_stream_id');
  }
  public set ltsAttackStreamId(value: string) {
    this._ltsAttackStreamId = value;
  }
  public resetLtsAttackStreamId() {
    this._ltsAttackStreamId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsAttackStreamIdInput() {
    return this._ltsAttackStreamId;
  }

  // lts_group_id - computed: false, optional: false, required: true
  private _ltsGroupId?: string; 
  public get ltsGroupId() {
    return this.getStringAttribute('lts_group_id');
  }
  public set ltsGroupId(value: string) {
    this._ltsGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsGroupIdInput() {
    return this._ltsGroupId;
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
      id: cdktf.stringToTerraform(this._id),
      lts_access_stream_id: cdktf.stringToTerraform(this._ltsAccessStreamId),
      lts_attack_stream_id: cdktf.stringToTerraform(this._ltsAttackStreamId),
      lts_group_id: cdktf.stringToTerraform(this._ltsGroupId),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lts_access_stream_id: {
        value: cdktf.stringToHclTerraform(this._ltsAccessStreamId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lts_attack_stream_id: {
        value: cdktf.stringToHclTerraform(this._ltsAttackStreamId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lts_group_id: {
        value: cdktf.stringToHclTerraform(this._ltsGroupId),
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

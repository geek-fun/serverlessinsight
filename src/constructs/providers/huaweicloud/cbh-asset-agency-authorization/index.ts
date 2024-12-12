// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbh_asset_agency_authorization
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CbhAssetAgencyAuthorizationConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbh_asset_agency_authorization#csms CbhAssetAgencyAuthorization#csms}
  */
  readonly csms: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbh_asset_agency_authorization#id CbhAssetAgencyAuthorization#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbh_asset_agency_authorization#kms CbhAssetAgencyAuthorization#kms}
  */
  readonly kms: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbh_asset_agency_authorization#region CbhAssetAgencyAuthorization#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbh_asset_agency_authorization huaweicloud_cbh_asset_agency_authorization}
*/
export class CbhAssetAgencyAuthorization extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cbh_asset_agency_authorization";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CbhAssetAgencyAuthorization resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CbhAssetAgencyAuthorization to import
  * @param importFromId The id of the existing CbhAssetAgencyAuthorization that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbh_asset_agency_authorization#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CbhAssetAgencyAuthorization to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cbh_asset_agency_authorization", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbh_asset_agency_authorization huaweicloud_cbh_asset_agency_authorization} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CbhAssetAgencyAuthorizationConfig
  */
  public constructor(scope: Construct, id: string, config: CbhAssetAgencyAuthorizationConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cbh_asset_agency_authorization',
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
    this._csms = config.csms;
    this._id = config.id;
    this._kms = config.kms;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // csms - computed: false, optional: false, required: true
  private _csms?: boolean | cdktf.IResolvable; 
  public get csms() {
    return this.getBooleanAttribute('csms');
  }
  public set csms(value: boolean | cdktf.IResolvable) {
    this._csms = value;
  }
  // Temporarily expose input value. Use with caution.
  public get csmsInput() {
    return this._csms;
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

  // kms - computed: false, optional: false, required: true
  private _kms?: boolean | cdktf.IResolvable; 
  public get kms() {
    return this.getBooleanAttribute('kms');
  }
  public set kms(value: boolean | cdktf.IResolvable) {
    this._kms = value;
  }
  // Temporarily expose input value. Use with caution.
  public get kmsInput() {
    return this._kms;
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
      csms: cdktf.booleanToTerraform(this._csms),
      id: cdktf.stringToTerraform(this._id),
      kms: cdktf.booleanToTerraform(this._kms),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      csms: {
        value: cdktf.booleanToHclTerraform(this._csms),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      kms: {
        value: cdktf.booleanToHclTerraform(this._kms),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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

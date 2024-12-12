// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_black_white_list
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CnadAdvancedBlackWhiteListConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the black IP list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_black_white_list#black_ip_list CnadAdvancedBlackWhiteList#black_ip_list}
  */
  readonly blackIpList?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_black_white_list#id CnadAdvancedBlackWhiteList#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the policy ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_black_white_list#policy_id CnadAdvancedBlackWhiteList#policy_id}
  */
  readonly policyId: string;
  /**
  * Specifies the white IP list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_black_white_list#white_ip_list CnadAdvancedBlackWhiteList#white_ip_list}
  */
  readonly whiteIpList?: string[];
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_black_white_list huaweicloud_cnad_advanced_black_white_list}
*/
export class CnadAdvancedBlackWhiteList extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cnad_advanced_black_white_list";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CnadAdvancedBlackWhiteList resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CnadAdvancedBlackWhiteList to import
  * @param importFromId The id of the existing CnadAdvancedBlackWhiteList that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_black_white_list#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CnadAdvancedBlackWhiteList to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cnad_advanced_black_white_list", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_black_white_list huaweicloud_cnad_advanced_black_white_list} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CnadAdvancedBlackWhiteListConfig
  */
  public constructor(scope: Construct, id: string, config: CnadAdvancedBlackWhiteListConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cnad_advanced_black_white_list',
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
    this._blackIpList = config.blackIpList;
    this._id = config.id;
    this._policyId = config.policyId;
    this._whiteIpList = config.whiteIpList;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // black_ip_list - computed: true, optional: true, required: false
  private _blackIpList?: string[]; 
  public get blackIpList() {
    return cdktf.Fn.tolist(this.getListAttribute('black_ip_list'));
  }
  public set blackIpList(value: string[]) {
    this._blackIpList = value;
  }
  public resetBlackIpList() {
    this._blackIpList = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blackIpListInput() {
    return this._blackIpList;
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

  // white_ip_list - computed: true, optional: true, required: false
  private _whiteIpList?: string[]; 
  public get whiteIpList() {
    return cdktf.Fn.tolist(this.getListAttribute('white_ip_list'));
  }
  public set whiteIpList(value: string[]) {
    this._whiteIpList = value;
  }
  public resetWhiteIpList() {
    this._whiteIpList = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get whiteIpListInput() {
    return this._whiteIpList;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      black_ip_list: cdktf.listMapper(cdktf.stringToTerraform, false)(this._blackIpList),
      id: cdktf.stringToTerraform(this._id),
      policy_id: cdktf.stringToTerraform(this._policyId),
      white_ip_list: cdktf.listMapper(cdktf.stringToTerraform, false)(this._whiteIpList),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      black_ip_list: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._blackIpList),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
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
      white_ip_list: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._whiteIpList),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

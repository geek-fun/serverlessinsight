// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CnadAdvancedPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy#id CnadAdvancedPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the CNAD advanced instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy#instance_id CnadAdvancedPolicy#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the policy name, the maximum length is 255 characters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy#name CnadAdvancedPolicy#name}
  */
  readonly name: string;
  /**
  * Specifies the cleaning threshold, the value ranges from 100 to 1000.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy#threshold CnadAdvancedPolicy#threshold}
  */
  readonly threshold?: number;
  /**
  * Specifies whether to block the UDP protocol. Valid values are **block** and **unblock**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy#udp CnadAdvancedPolicy#udp}
  */
  readonly udp?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy huaweicloud_cnad_advanced_policy}
*/
export class CnadAdvancedPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cnad_advanced_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CnadAdvancedPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CnadAdvancedPolicy to import
  * @param importFromId The id of the existing CnadAdvancedPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CnadAdvancedPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cnad_advanced_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy huaweicloud_cnad_advanced_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CnadAdvancedPolicyConfig
  */
  public constructor(scope: Construct, id: string, config: CnadAdvancedPolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cnad_advanced_policy',
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
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._threshold = config.threshold;
    this._udp = config.udp;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // block_location - computed: true, optional: false, required: false
  public get blockLocation() {
    return this.getListAttribute('block_location');
  }

  // block_protocol - computed: true, optional: false, required: false
  public get blockProtocol() {
    return this.getListAttribute('block_protocol');
  }

  // connection_protection - computed: true, optional: false, required: false
  public get connectionProtection() {
    return this.getBooleanAttribute('connection_protection');
  }

  // connection_protection_list - computed: true, optional: false, required: false
  public get connectionProtectionList() {
    return this.getListAttribute('connection_protection_list');
  }

  // fingerprint_count - computed: true, optional: false, required: false
  public get fingerprintCount() {
    return this.getNumberAttribute('fingerprint_count');
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // port_block_count - computed: true, optional: false, required: false
  public get portBlockCount() {
    return this.getNumberAttribute('port_block_count');
  }

  // threshold - computed: true, optional: true, required: false
  private _threshold?: number; 
  public get threshold() {
    return this.getNumberAttribute('threshold');
  }
  public set threshold(value: number) {
    this._threshold = value;
  }
  public resetThreshold() {
    this._threshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get thresholdInput() {
    return this._threshold;
  }

  // udp - computed: false, optional: true, required: false
  private _udp?: string; 
  public get udp() {
    return this.getStringAttribute('udp');
  }
  public set udp(value: string) {
    this._udp = value;
  }
  public resetUdp() {
    this._udp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get udpInput() {
    return this._udp;
  }

  // watermark_count - computed: true, optional: false, required: false
  public get watermarkCount() {
    return this.getNumberAttribute('watermark_count');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      threshold: cdktf.numberToTerraform(this._threshold),
      udp: cdktf.stringToTerraform(this._udp),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
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
      threshold: {
        value: cdktf.numberToHclTerraform(this._threshold),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      udp: {
        value: cdktf.stringToHclTerraform(this._udp),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

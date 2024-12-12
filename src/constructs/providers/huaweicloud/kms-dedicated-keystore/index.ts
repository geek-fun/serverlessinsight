// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_dedicated_keystore
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface KmsDedicatedKeystoreConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the alias of a dedicated keystore.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_dedicated_keystore#alias KmsDedicatedKeystore#alias}
  */
  readonly alias: string;
  /**
  * Specifies the CA certificate of the dedicated HSM cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_dedicated_keystore#hsm_ca_cert KmsDedicatedKeystore#hsm_ca_cert}
  */
  readonly hsmCaCert: string;
  /**
  * Specifies the ID of a dedicated HSM cluster that has no dedicated keystore.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_dedicated_keystore#hsm_cluster_id KmsDedicatedKeystore#hsm_cluster_id}
  */
  readonly hsmClusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_dedicated_keystore#id KmsDedicatedKeystore#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_dedicated_keystore#region KmsDedicatedKeystore#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_dedicated_keystore huaweicloud_kms_dedicated_keystore}
*/
export class KmsDedicatedKeystore extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_kms_dedicated_keystore";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a KmsDedicatedKeystore resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the KmsDedicatedKeystore to import
  * @param importFromId The id of the existing KmsDedicatedKeystore that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_dedicated_keystore#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the KmsDedicatedKeystore to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_kms_dedicated_keystore", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_dedicated_keystore huaweicloud_kms_dedicated_keystore} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options KmsDedicatedKeystoreConfig
  */
  public constructor(scope: Construct, id: string, config: KmsDedicatedKeystoreConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_kms_dedicated_keystore',
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
    this._alias = config.alias;
    this._hsmCaCert = config.hsmCaCert;
    this._hsmClusterId = config.hsmClusterId;
    this._id = config.id;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // alias - computed: false, optional: false, required: true
  private _alias?: string; 
  public get alias() {
    return this.getStringAttribute('alias');
  }
  public set alias(value: string) {
    this._alias = value;
  }
  // Temporarily expose input value. Use with caution.
  public get aliasInput() {
    return this._alias;
  }

  // hsm_ca_cert - computed: false, optional: false, required: true
  private _hsmCaCert?: string; 
  public get hsmCaCert() {
    return this.getStringAttribute('hsm_ca_cert');
  }
  public set hsmCaCert(value: string) {
    this._hsmCaCert = value;
  }
  // Temporarily expose input value. Use with caution.
  public get hsmCaCertInput() {
    return this._hsmCaCert;
  }

  // hsm_cluster_id - computed: false, optional: false, required: true
  private _hsmClusterId?: string; 
  public get hsmClusterId() {
    return this.getStringAttribute('hsm_cluster_id');
  }
  public set hsmClusterId(value: string) {
    this._hsmClusterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get hsmClusterIdInput() {
    return this._hsmClusterId;
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
      alias: cdktf.stringToTerraform(this._alias),
      hsm_ca_cert: cdktf.stringToTerraform(this._hsmCaCert),
      hsm_cluster_id: cdktf.stringToTerraform(this._hsmClusterId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      alias: {
        value: cdktf.stringToHclTerraform(this._alias),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      hsm_ca_cert: {
        value: cdktf.stringToHclTerraform(this._hsmCaCert),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      hsm_cluster_id: {
        value: cdktf.stringToHclTerraform(this._hsmClusterId),
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

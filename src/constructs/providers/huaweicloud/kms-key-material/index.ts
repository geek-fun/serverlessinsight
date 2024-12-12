// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface KmsKeyMaterialConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material#encrypted_key_material KmsKeyMaterial#encrypted_key_material}
  */
  readonly encryptedKeyMaterial: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material#encrypted_privatekey KmsKeyMaterial#encrypted_privatekey}
  */
  readonly encryptedPrivatekey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material#expiration_time KmsKeyMaterial#expiration_time}
  */
  readonly expirationTime?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material#id KmsKeyMaterial#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material#import_token KmsKeyMaterial#import_token}
  */
  readonly importToken: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material#key_id KmsKeyMaterial#key_id}
  */
  readonly keyId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material#region KmsKeyMaterial#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material huaweicloud_kms_key_material}
*/
export class KmsKeyMaterial extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_kms_key_material";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a KmsKeyMaterial resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the KmsKeyMaterial to import
  * @param importFromId The id of the existing KmsKeyMaterial that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the KmsKeyMaterial to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_kms_key_material", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/kms_key_material huaweicloud_kms_key_material} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options KmsKeyMaterialConfig
  */
  public constructor(scope: Construct, id: string, config: KmsKeyMaterialConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_kms_key_material',
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
    this._encryptedKeyMaterial = config.encryptedKeyMaterial;
    this._encryptedPrivatekey = config.encryptedPrivatekey;
    this._expirationTime = config.expirationTime;
    this._id = config.id;
    this._importToken = config.importToken;
    this._keyId = config.keyId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // encrypted_key_material - computed: false, optional: false, required: true
  private _encryptedKeyMaterial?: string; 
  public get encryptedKeyMaterial() {
    return this.getStringAttribute('encrypted_key_material');
  }
  public set encryptedKeyMaterial(value: string) {
    this._encryptedKeyMaterial = value;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptedKeyMaterialInput() {
    return this._encryptedKeyMaterial;
  }

  // encrypted_privatekey - computed: false, optional: true, required: false
  private _encryptedPrivatekey?: string; 
  public get encryptedPrivatekey() {
    return this.getStringAttribute('encrypted_privatekey');
  }
  public set encryptedPrivatekey(value: string) {
    this._encryptedPrivatekey = value;
  }
  public resetEncryptedPrivatekey() {
    this._encryptedPrivatekey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptedPrivatekeyInput() {
    return this._encryptedPrivatekey;
  }

  // expiration_time - computed: true, optional: true, required: false
  private _expirationTime?: string; 
  public get expirationTime() {
    return this.getStringAttribute('expiration_time');
  }
  public set expirationTime(value: string) {
    this._expirationTime = value;
  }
  public resetExpirationTime() {
    this._expirationTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expirationTimeInput() {
    return this._expirationTime;
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

  // import_token - computed: false, optional: false, required: true
  private _importToken?: string; 
  public get importToken() {
    return this.getStringAttribute('import_token');
  }
  public set importToken(value: string) {
    this._importToken = value;
  }
  // Temporarily expose input value. Use with caution.
  public get importTokenInput() {
    return this._importToken;
  }

  // key_id - computed: false, optional: false, required: true
  private _keyId?: string; 
  public get keyId() {
    return this.getStringAttribute('key_id');
  }
  public set keyId(value: string) {
    this._keyId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get keyIdInput() {
    return this._keyId;
  }

  // key_state - computed: true, optional: false, required: false
  public get keyState() {
    return this.getStringAttribute('key_state');
  }

  // key_usage - computed: true, optional: false, required: false
  public get keyUsage() {
    return this.getStringAttribute('key_usage');
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
      encrypted_key_material: cdktf.stringToTerraform(this._encryptedKeyMaterial),
      encrypted_privatekey: cdktf.stringToTerraform(this._encryptedPrivatekey),
      expiration_time: cdktf.stringToTerraform(this._expirationTime),
      id: cdktf.stringToTerraform(this._id),
      import_token: cdktf.stringToTerraform(this._importToken),
      key_id: cdktf.stringToTerraform(this._keyId),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      encrypted_key_material: {
        value: cdktf.stringToHclTerraform(this._encryptedKeyMaterial),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      encrypted_privatekey: {
        value: cdktf.stringToHclTerraform(this._encryptedPrivatekey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      expiration_time: {
        value: cdktf.stringToHclTerraform(this._expirationTime),
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
      import_token: {
        value: cdktf.stringToHclTerraform(this._importToken),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      key_id: {
        value: cdktf.stringToHclTerraform(this._keyId),
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

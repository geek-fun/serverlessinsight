// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/kms_data_key_v1
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudKmsDataKeyV1Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/kms_data_key_v1#datakey_length DataHuaweicloudKmsDataKeyV1#datakey_length}
  */
  readonly datakeyLength: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/kms_data_key_v1#encryption_context DataHuaweicloudKmsDataKeyV1#encryption_context}
  */
  readonly encryptionContext?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/kms_data_key_v1#id DataHuaweicloudKmsDataKeyV1#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/kms_data_key_v1#key_id DataHuaweicloudKmsDataKeyV1#key_id}
  */
  readonly keyId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/kms_data_key_v1#region DataHuaweicloudKmsDataKeyV1#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/kms_data_key_v1 huaweicloud_kms_data_key_v1}
*/
export class DataHuaweicloudKmsDataKeyV1 extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_kms_data_key_v1";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudKmsDataKeyV1 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudKmsDataKeyV1 to import
  * @param importFromId The id of the existing DataHuaweicloudKmsDataKeyV1 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/kms_data_key_v1#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudKmsDataKeyV1 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_kms_data_key_v1", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/kms_data_key_v1 huaweicloud_kms_data_key_v1} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudKmsDataKeyV1Config
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudKmsDataKeyV1Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_kms_data_key_v1',
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
    this._datakeyLength = config.datakeyLength;
    this._encryptionContext = config.encryptionContext;
    this._id = config.id;
    this._keyId = config.keyId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cipher_text - computed: true, optional: false, required: false
  public get cipherText() {
    return this.getStringAttribute('cipher_text');
  }

  // datakey_length - computed: false, optional: false, required: true
  private _datakeyLength?: string; 
  public get datakeyLength() {
    return this.getStringAttribute('datakey_length');
  }
  public set datakeyLength(value: string) {
    this._datakeyLength = value;
  }
  // Temporarily expose input value. Use with caution.
  public get datakeyLengthInput() {
    return this._datakeyLength;
  }

  // encryption_context - computed: false, optional: true, required: false
  private _encryptionContext?: string; 
  public get encryptionContext() {
    return this.getStringAttribute('encryption_context');
  }
  public set encryptionContext(value: string) {
    this._encryptionContext = value;
  }
  public resetEncryptionContext() {
    this._encryptionContext = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptionContextInput() {
    return this._encryptionContext;
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

  // plain_text - computed: true, optional: false, required: false
  public get plainText() {
    return this.getStringAttribute('plain_text');
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
      datakey_length: cdktf.stringToTerraform(this._datakeyLength),
      encryption_context: cdktf.stringToTerraform(this._encryptionContext),
      id: cdktf.stringToTerraform(this._id),
      key_id: cdktf.stringToTerraform(this._keyId),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      datakey_length: {
        value: cdktf.stringToHclTerraform(this._datakeyLength),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      encryption_context: {
        value: cdktf.stringToHclTerraform(this._encryptionContext),
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

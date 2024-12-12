// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LiveSnapshotConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the application name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#app_name LiveSnapshot#app_name}
  */
  readonly appName: string;
  /**
  * Specifies the callback authentication key value.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#call_back_auth_key LiveSnapshot#call_back_auth_key}
  */
  readonly callBackAuthKey?: string;
  /**
  * Specifies whether to enable callback notifications.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#call_back_enabled LiveSnapshot#call_back_enabled}
  */
  readonly callBackEnabled?: string;
  /**
  * Specifies the notification server address. 
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#call_back_url LiveSnapshot#call_back_url}
  */
  readonly callBackUrl?: string;
  /**
  * Specifies the ingest domain name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#domain_name LiveSnapshot#domain_name}
  */
  readonly domainName: string;
  /**
  * Specifies the screenshot frequency.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#frequency LiveSnapshot#frequency}
  */
  readonly frequency: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#id LiveSnapshot#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#region LiveSnapshot#region}
  */
  readonly region?: string;
  /**
  * Specifies the bucket name of the OBS.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#storage_bucket LiveSnapshot#storage_bucket}
  */
  readonly storageBucket: string;
  /**
  * Specifies the store mode in OBS bucket.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#storage_mode LiveSnapshot#storage_mode}
  */
  readonly storageMode: number;
  /**
  * Specifies the path of OBS object.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#storage_path LiveSnapshot#storage_path}
  */
  readonly storagePath: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot huaweicloud_live_snapshot}
*/
export class LiveSnapshot extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_live_snapshot";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LiveSnapshot resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LiveSnapshot to import
  * @param importFromId The id of the existing LiveSnapshot that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LiveSnapshot to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_live_snapshot", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_snapshot huaweicloud_live_snapshot} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LiveSnapshotConfig
  */
  public constructor(scope: Construct, id: string, config: LiveSnapshotConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_live_snapshot',
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
    this._appName = config.appName;
    this._callBackAuthKey = config.callBackAuthKey;
    this._callBackEnabled = config.callBackEnabled;
    this._callBackUrl = config.callBackUrl;
    this._domainName = config.domainName;
    this._frequency = config.frequency;
    this._id = config.id;
    this._region = config.region;
    this._storageBucket = config.storageBucket;
    this._storageMode = config.storageMode;
    this._storagePath = config.storagePath;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // app_name - computed: false, optional: false, required: true
  private _appName?: string; 
  public get appName() {
    return this.getStringAttribute('app_name');
  }
  public set appName(value: string) {
    this._appName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get appNameInput() {
    return this._appName;
  }

  // call_back_auth_key - computed: true, optional: true, required: false
  private _callBackAuthKey?: string; 
  public get callBackAuthKey() {
    return this.getStringAttribute('call_back_auth_key');
  }
  public set callBackAuthKey(value: string) {
    this._callBackAuthKey = value;
  }
  public resetCallBackAuthKey() {
    this._callBackAuthKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get callBackAuthKeyInput() {
    return this._callBackAuthKey;
  }

  // call_back_enabled - computed: true, optional: true, required: false
  private _callBackEnabled?: string; 
  public get callBackEnabled() {
    return this.getStringAttribute('call_back_enabled');
  }
  public set callBackEnabled(value: string) {
    this._callBackEnabled = value;
  }
  public resetCallBackEnabled() {
    this._callBackEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get callBackEnabledInput() {
    return this._callBackEnabled;
  }

  // call_back_url - computed: true, optional: true, required: false
  private _callBackUrl?: string; 
  public get callBackUrl() {
    return this.getStringAttribute('call_back_url');
  }
  public set callBackUrl(value: string) {
    this._callBackUrl = value;
  }
  public resetCallBackUrl() {
    this._callBackUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get callBackUrlInput() {
    return this._callBackUrl;
  }

  // domain_name - computed: false, optional: false, required: true
  private _domainName?: string; 
  public get domainName() {
    return this.getStringAttribute('domain_name');
  }
  public set domainName(value: string) {
    this._domainName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainNameInput() {
    return this._domainName;
  }

  // frequency - computed: false, optional: false, required: true
  private _frequency?: number; 
  public get frequency() {
    return this.getNumberAttribute('frequency');
  }
  public set frequency(value: number) {
    this._frequency = value;
  }
  // Temporarily expose input value. Use with caution.
  public get frequencyInput() {
    return this._frequency;
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

  // storage_bucket - computed: false, optional: false, required: true
  private _storageBucket?: string; 
  public get storageBucket() {
    return this.getStringAttribute('storage_bucket');
  }
  public set storageBucket(value: string) {
    this._storageBucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageBucketInput() {
    return this._storageBucket;
  }

  // storage_mode - computed: false, optional: false, required: true
  private _storageMode?: number; 
  public get storageMode() {
    return this.getNumberAttribute('storage_mode');
  }
  public set storageMode(value: number) {
    this._storageMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageModeInput() {
    return this._storageMode;
  }

  // storage_path - computed: false, optional: false, required: true
  private _storagePath?: string; 
  public get storagePath() {
    return this.getStringAttribute('storage_path');
  }
  public set storagePath(value: string) {
    this._storagePath = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storagePathInput() {
    return this._storagePath;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      app_name: cdktf.stringToTerraform(this._appName),
      call_back_auth_key: cdktf.stringToTerraform(this._callBackAuthKey),
      call_back_enabled: cdktf.stringToTerraform(this._callBackEnabled),
      call_back_url: cdktf.stringToTerraform(this._callBackUrl),
      domain_name: cdktf.stringToTerraform(this._domainName),
      frequency: cdktf.numberToTerraform(this._frequency),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      storage_bucket: cdktf.stringToTerraform(this._storageBucket),
      storage_mode: cdktf.numberToTerraform(this._storageMode),
      storage_path: cdktf.stringToTerraform(this._storagePath),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      app_name: {
        value: cdktf.stringToHclTerraform(this._appName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      call_back_auth_key: {
        value: cdktf.stringToHclTerraform(this._callBackAuthKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      call_back_enabled: {
        value: cdktf.stringToHclTerraform(this._callBackEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      call_back_url: {
        value: cdktf.stringToHclTerraform(this._callBackUrl),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      domain_name: {
        value: cdktf.stringToHclTerraform(this._domainName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      frequency: {
        value: cdktf.numberToHclTerraform(this._frequency),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      storage_bucket: {
        value: cdktf.stringToHclTerraform(this._storageBucket),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      storage_mode: {
        value: cdktf.numberToHclTerraform(this._storageMode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      storage_path: {
        value: cdktf.stringToHclTerraform(this._storagePath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

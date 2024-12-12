// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IotdaDeviceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#description IotdaDevice#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#device_id IotdaDevice#device_id}
  */
  readonly deviceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#extension_info IotdaDevice#extension_info}
  */
  readonly extensionInfo?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#fingerprint IotdaDevice#fingerprint}
  */
  readonly fingerprint?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#force_disconnect IotdaDevice#force_disconnect}
  */
  readonly forceDisconnect?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#frozen IotdaDevice#frozen}
  */
  readonly frozen?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#gateway_id IotdaDevice#gateway_id}
  */
  readonly gatewayId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#id IotdaDevice#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#name IotdaDevice#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#node_id IotdaDevice#node_id}
  */
  readonly nodeId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#product_id IotdaDevice#product_id}
  */
  readonly productId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#region IotdaDevice#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#secondary_fingerprint IotdaDevice#secondary_fingerprint}
  */
  readonly secondaryFingerprint?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#secondary_secret IotdaDevice#secondary_secret}
  */
  readonly secondarySecret?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#secret IotdaDevice#secret}
  */
  readonly secret?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#secure_access IotdaDevice#secure_access}
  */
  readonly secureAccess?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#space_id IotdaDevice#space_id}
  */
  readonly spaceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#tags IotdaDevice#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * shadow block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#shadow IotdaDevice#shadow}
  */
  readonly shadow?: IotdaDeviceShadow[] | cdktf.IResolvable;
}
export interface IotdaDeviceShadow {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#desired IotdaDevice#desired}
  */
  readonly desired: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#service_id IotdaDevice#service_id}
  */
  readonly serviceId: string;
}

export function iotdaDeviceShadowToTerraform(struct?: IotdaDeviceShadow | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    desired: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.desired),
    service_id: cdktf.stringToTerraform(struct!.serviceId),
  }
}


export function iotdaDeviceShadowToHclTerraform(struct?: IotdaDeviceShadow | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    desired: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.desired),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    service_id: {
      value: cdktf.stringToHclTerraform(struct!.serviceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceShadowOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): IotdaDeviceShadow | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._desired !== undefined) {
      hasAnyValues = true;
      internalValueResult.desired = this._desired;
    }
    if (this._serviceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.serviceId = this._serviceId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceShadow | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._desired = undefined;
      this._serviceId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._desired = value.desired;
      this._serviceId = value.serviceId;
    }
  }

  // desired - computed: false, optional: false, required: true
  private _desired?: { [key: string]: string }; 
  public get desired() {
    return this.getStringMapAttribute('desired');
  }
  public set desired(value: { [key: string]: string }) {
    this._desired = value;
  }
  // Temporarily expose input value. Use with caution.
  public get desiredInput() {
    return this._desired;
  }

  // service_id - computed: false, optional: false, required: true
  private _serviceId?: string; 
  public get serviceId() {
    return this.getStringAttribute('service_id');
  }
  public set serviceId(value: string) {
    this._serviceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceIdInput() {
    return this._serviceId;
  }
}

export class IotdaDeviceShadowList extends cdktf.ComplexList {
  public internalValue? : IotdaDeviceShadow[] | cdktf.IResolvable

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): IotdaDeviceShadowOutputReference {
    return new IotdaDeviceShadowOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device huaweicloud_iotda_device}
*/
export class IotdaDevice extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_iotda_device";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IotdaDevice resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IotdaDevice to import
  * @param importFromId The id of the existing IotdaDevice that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IotdaDevice to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_iotda_device", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device huaweicloud_iotda_device} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IotdaDeviceConfig
  */
  public constructor(scope: Construct, id: string, config: IotdaDeviceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_iotda_device',
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
    this._description = config.description;
    this._deviceId = config.deviceId;
    this._extensionInfo = config.extensionInfo;
    this._fingerprint = config.fingerprint;
    this._forceDisconnect = config.forceDisconnect;
    this._frozen = config.frozen;
    this._gatewayId = config.gatewayId;
    this._id = config.id;
    this._name = config.name;
    this._nodeId = config.nodeId;
    this._productId = config.productId;
    this._region = config.region;
    this._secondaryFingerprint = config.secondaryFingerprint;
    this._secondarySecret = config.secondarySecret;
    this._secret = config.secret;
    this._secureAccess = config.secureAccess;
    this._spaceId = config.spaceId;
    this._tags = config.tags;
    this._shadow.internalValue = config.shadow;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auth_type - computed: true, optional: false, required: false
  public get authType() {
    return this.getStringAttribute('auth_type');
  }

  // description - computed: false, optional: true, required: false
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  public resetDescription() {
    this._description = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
  }

  // device_id - computed: true, optional: true, required: false
  private _deviceId?: string; 
  public get deviceId() {
    return this.getStringAttribute('device_id');
  }
  public set deviceId(value: string) {
    this._deviceId = value;
  }
  public resetDeviceId() {
    this._deviceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deviceIdInput() {
    return this._deviceId;
  }

  // extension_info - computed: false, optional: true, required: false
  private _extensionInfo?: { [key: string]: string }; 
  public get extensionInfo() {
    return this.getStringMapAttribute('extension_info');
  }
  public set extensionInfo(value: { [key: string]: string }) {
    this._extensionInfo = value;
  }
  public resetExtensionInfo() {
    this._extensionInfo = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extensionInfoInput() {
    return this._extensionInfo;
  }

  // fingerprint - computed: true, optional: true, required: false
  private _fingerprint?: string; 
  public get fingerprint() {
    return this.getStringAttribute('fingerprint');
  }
  public set fingerprint(value: string) {
    this._fingerprint = value;
  }
  public resetFingerprint() {
    this._fingerprint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fingerprintInput() {
    return this._fingerprint;
  }

  // force_disconnect - computed: false, optional: true, required: false
  private _forceDisconnect?: boolean | cdktf.IResolvable; 
  public get forceDisconnect() {
    return this.getBooleanAttribute('force_disconnect');
  }
  public set forceDisconnect(value: boolean | cdktf.IResolvable) {
    this._forceDisconnect = value;
  }
  public resetForceDisconnect() {
    this._forceDisconnect = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forceDisconnectInput() {
    return this._forceDisconnect;
  }

  // frozen - computed: true, optional: true, required: false
  private _frozen?: boolean | cdktf.IResolvable; 
  public get frozen() {
    return this.getBooleanAttribute('frozen');
  }
  public set frozen(value: boolean | cdktf.IResolvable) {
    this._frozen = value;
  }
  public resetFrozen() {
    this._frozen = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get frozenInput() {
    return this._frozen;
  }

  // gateway_id - computed: true, optional: true, required: false
  private _gatewayId?: string; 
  public get gatewayId() {
    return this.getStringAttribute('gateway_id');
  }
  public set gatewayId(value: string) {
    this._gatewayId = value;
  }
  public resetGatewayId() {
    this._gatewayId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gatewayIdInput() {
    return this._gatewayId;
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

  // node_id - computed: false, optional: false, required: true
  private _nodeId?: string; 
  public get nodeId() {
    return this.getStringAttribute('node_id');
  }
  public set nodeId(value: string) {
    this._nodeId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeIdInput() {
    return this._nodeId;
  }

  // node_type - computed: true, optional: false, required: false
  public get nodeType() {
    return this.getStringAttribute('node_type');
  }

  // product_id - computed: false, optional: false, required: true
  private _productId?: string; 
  public get productId() {
    return this.getStringAttribute('product_id');
  }
  public set productId(value: string) {
    this._productId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get productIdInput() {
    return this._productId;
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

  // secondary_fingerprint - computed: true, optional: true, required: false
  private _secondaryFingerprint?: string; 
  public get secondaryFingerprint() {
    return this.getStringAttribute('secondary_fingerprint');
  }
  public set secondaryFingerprint(value: string) {
    this._secondaryFingerprint = value;
  }
  public resetSecondaryFingerprint() {
    this._secondaryFingerprint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secondaryFingerprintInput() {
    return this._secondaryFingerprint;
  }

  // secondary_secret - computed: true, optional: true, required: false
  private _secondarySecret?: string; 
  public get secondarySecret() {
    return this.getStringAttribute('secondary_secret');
  }
  public set secondarySecret(value: string) {
    this._secondarySecret = value;
  }
  public resetSecondarySecret() {
    this._secondarySecret = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secondarySecretInput() {
    return this._secondarySecret;
  }

  // secret - computed: true, optional: true, required: false
  private _secret?: string; 
  public get secret() {
    return this.getStringAttribute('secret');
  }
  public set secret(value: string) {
    this._secret = value;
  }
  public resetSecret() {
    this._secret = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretInput() {
    return this._secret;
  }

  // secure_access - computed: true, optional: true, required: false
  private _secureAccess?: boolean | cdktf.IResolvable; 
  public get secureAccess() {
    return this.getBooleanAttribute('secure_access');
  }
  public set secureAccess(value: boolean | cdktf.IResolvable) {
    this._secureAccess = value;
  }
  public resetSecureAccess() {
    this._secureAccess = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secureAccessInput() {
    return this._secureAccess;
  }

  // space_id - computed: false, optional: false, required: true
  private _spaceId?: string; 
  public get spaceId() {
    return this.getStringAttribute('space_id');
  }
  public set spaceId(value: string) {
    this._spaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get spaceIdInput() {
    return this._spaceId;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // shadow - computed: false, optional: true, required: false
  private _shadow = new IotdaDeviceShadowList(this, "shadow", false);
  public get shadow() {
    return this._shadow;
  }
  public putShadow(value: IotdaDeviceShadow[] | cdktf.IResolvable) {
    this._shadow.internalValue = value;
  }
  public resetShadow() {
    this._shadow.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get shadowInput() {
    return this._shadow.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      device_id: cdktf.stringToTerraform(this._deviceId),
      extension_info: cdktf.hashMapper(cdktf.stringToTerraform)(this._extensionInfo),
      fingerprint: cdktf.stringToTerraform(this._fingerprint),
      force_disconnect: cdktf.booleanToTerraform(this._forceDisconnect),
      frozen: cdktf.booleanToTerraform(this._frozen),
      gateway_id: cdktf.stringToTerraform(this._gatewayId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      node_id: cdktf.stringToTerraform(this._nodeId),
      product_id: cdktf.stringToTerraform(this._productId),
      region: cdktf.stringToTerraform(this._region),
      secondary_fingerprint: cdktf.stringToTerraform(this._secondaryFingerprint),
      secondary_secret: cdktf.stringToTerraform(this._secondarySecret),
      secret: cdktf.stringToTerraform(this._secret),
      secure_access: cdktf.booleanToTerraform(this._secureAccess),
      space_id: cdktf.stringToTerraform(this._spaceId),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      shadow: cdktf.listMapper(iotdaDeviceShadowToTerraform, true)(this._shadow.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      device_id: {
        value: cdktf.stringToHclTerraform(this._deviceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      extension_info: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._extensionInfo),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      fingerprint: {
        value: cdktf.stringToHclTerraform(this._fingerprint),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      force_disconnect: {
        value: cdktf.booleanToHclTerraform(this._forceDisconnect),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      frozen: {
        value: cdktf.booleanToHclTerraform(this._frozen),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      gateway_id: {
        value: cdktf.stringToHclTerraform(this._gatewayId),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      node_id: {
        value: cdktf.stringToHclTerraform(this._nodeId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      product_id: {
        value: cdktf.stringToHclTerraform(this._productId),
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
      secondary_fingerprint: {
        value: cdktf.stringToHclTerraform(this._secondaryFingerprint),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      secondary_secret: {
        value: cdktf.stringToHclTerraform(this._secondarySecret),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      secret: {
        value: cdktf.stringToHclTerraform(this._secret),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      secure_access: {
        value: cdktf.booleanToHclTerraform(this._secureAccess),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      space_id: {
        value: cdktf.stringToHclTerraform(this._spaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      shadow: {
        value: cdktf.listMapperHcl(iotdaDeviceShadowToHclTerraform, true)(this._shadow.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "IotdaDeviceShadowList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

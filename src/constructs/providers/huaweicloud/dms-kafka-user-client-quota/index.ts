// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsKafkaUserClientQuotaConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the ID of the client to which the quota applies.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#client DmsKafkaUserClientQuota#client}
  */
  readonly client?: string;
  /**
  * Specifies the client default configuration of the quota.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#client_default DmsKafkaUserClientQuota#client_default}
  */
  readonly clientDefault?: boolean | cdktf.IResolvable;
  /**
  * Specifies an upper limit on the consumption rate. The unit is B/s.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#consumer_byte_rate DmsKafkaUserClientQuota#consumer_byte_rate}
  */
  readonly consumerByteRate?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#id DmsKafkaUserClientQuota#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the Kafka instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#instance_id DmsKafkaUserClientQuota#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies an upper limit on the prodction rate. The unit is B/s.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#producer_byte_rate DmsKafkaUserClientQuota#producer_byte_rate}
  */
  readonly producerByteRate?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#region DmsKafkaUserClientQuota#region}
  */
  readonly region?: string;
  /**
  * Specifies the user name to apply the quota.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#user DmsKafkaUserClientQuota#user}
  */
  readonly user?: string;
  /**
  * Specifies the user default configuration of the quota.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#user_default DmsKafkaUserClientQuota#user_default}
  */
  readonly userDefault?: boolean | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#timeouts DmsKafkaUserClientQuota#timeouts}
  */
  readonly timeouts?: DmsKafkaUserClientQuotaTimeouts;
}
export interface DmsKafkaUserClientQuotaTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#create DmsKafkaUserClientQuota#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#delete DmsKafkaUserClientQuota#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#update DmsKafkaUserClientQuota#update}
  */
  readonly update?: string;
}

export function dmsKafkaUserClientQuotaTimeoutsToTerraform(struct?: DmsKafkaUserClientQuotaTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function dmsKafkaUserClientQuotaTimeoutsToHclTerraform(struct?: DmsKafkaUserClientQuotaTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsKafkaUserClientQuotaTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DmsKafkaUserClientQuotaTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsKafkaUserClientQuotaTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota huaweicloud_dms_kafka_user_client_quota}
*/
export class DmsKafkaUserClientQuota extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_kafka_user_client_quota";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsKafkaUserClientQuota resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsKafkaUserClientQuota to import
  * @param importFromId The id of the existing DmsKafkaUserClientQuota that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsKafkaUserClientQuota to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_kafka_user_client_quota", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_user_client_quota huaweicloud_dms_kafka_user_client_quota} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsKafkaUserClientQuotaConfig
  */
  public constructor(scope: Construct, id: string, config: DmsKafkaUserClientQuotaConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_kafka_user_client_quota',
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
    this._client = config.client;
    this._clientDefault = config.clientDefault;
    this._consumerByteRate = config.consumerByteRate;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._producerByteRate = config.producerByteRate;
    this._region = config.region;
    this._user = config.user;
    this._userDefault = config.userDefault;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // client - computed: false, optional: true, required: false
  private _client?: string; 
  public get client() {
    return this.getStringAttribute('client');
  }
  public set client(value: string) {
    this._client = value;
  }
  public resetClient() {
    this._client = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clientInput() {
    return this._client;
  }

  // client_default - computed: false, optional: true, required: false
  private _clientDefault?: boolean | cdktf.IResolvable; 
  public get clientDefault() {
    return this.getBooleanAttribute('client_default');
  }
  public set clientDefault(value: boolean | cdktf.IResolvable) {
    this._clientDefault = value;
  }
  public resetClientDefault() {
    this._clientDefault = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clientDefaultInput() {
    return this._clientDefault;
  }

  // consumer_byte_rate - computed: true, optional: true, required: false
  private _consumerByteRate?: number; 
  public get consumerByteRate() {
    return this.getNumberAttribute('consumer_byte_rate');
  }
  public set consumerByteRate(value: number) {
    this._consumerByteRate = value;
  }
  public resetConsumerByteRate() {
    this._consumerByteRate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consumerByteRateInput() {
    return this._consumerByteRate;
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

  // producer_byte_rate - computed: true, optional: true, required: false
  private _producerByteRate?: number; 
  public get producerByteRate() {
    return this.getNumberAttribute('producer_byte_rate');
  }
  public set producerByteRate(value: number) {
    this._producerByteRate = value;
  }
  public resetProducerByteRate() {
    this._producerByteRate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get producerByteRateInput() {
    return this._producerByteRate;
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

  // user - computed: false, optional: true, required: false
  private _user?: string; 
  public get user() {
    return this.getStringAttribute('user');
  }
  public set user(value: string) {
    this._user = value;
  }
  public resetUser() {
    this._user = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userInput() {
    return this._user;
  }

  // user_default - computed: false, optional: true, required: false
  private _userDefault?: boolean | cdktf.IResolvable; 
  public get userDefault() {
    return this.getBooleanAttribute('user_default');
  }
  public set userDefault(value: boolean | cdktf.IResolvable) {
    this._userDefault = value;
  }
  public resetUserDefault() {
    this._userDefault = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userDefaultInput() {
    return this._userDefault;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DmsKafkaUserClientQuotaTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DmsKafkaUserClientQuotaTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      client: cdktf.stringToTerraform(this._client),
      client_default: cdktf.booleanToTerraform(this._clientDefault),
      consumer_byte_rate: cdktf.numberToTerraform(this._consumerByteRate),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      producer_byte_rate: cdktf.numberToTerraform(this._producerByteRate),
      region: cdktf.stringToTerraform(this._region),
      user: cdktf.stringToTerraform(this._user),
      user_default: cdktf.booleanToTerraform(this._userDefault),
      timeouts: dmsKafkaUserClientQuotaTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      client: {
        value: cdktf.stringToHclTerraform(this._client),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      client_default: {
        value: cdktf.booleanToHclTerraform(this._clientDefault),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      consumer_byte_rate: {
        value: cdktf.numberToHclTerraform(this._consumerByteRate),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      producer_byte_rate: {
        value: cdktf.numberToHclTerraform(this._producerByteRate),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      user: {
        value: cdktf.stringToHclTerraform(this._user),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      user_default: {
        value: cdktf.booleanToHclTerraform(this._userDefault),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      timeouts: {
        value: dmsKafkaUserClientQuotaTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DmsKafkaUserClientQuotaTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

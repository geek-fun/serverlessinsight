// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DrsJobConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#action DrsJob#action}
  */
  readonly action?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#auto_renew DrsJob#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#charging_mode DrsJob#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#databases DrsJob#databases}
  */
  readonly databases?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#description DrsJob#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#destination_db_readnoly DrsJob#destination_db_readnoly}
  */
  readonly destinationDbReadnoly?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#direction DrsJob#direction}
  */
  readonly direction: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#engine_type DrsJob#engine_type}
  */
  readonly engineType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#enterprise_project_id DrsJob#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#expired_days DrsJob#expired_days}
  */
  readonly expiredDays?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#force_destroy DrsJob#force_destroy}
  */
  readonly forceDestroy?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#id DrsJob#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#is_open_fast_clean DrsJob#is_open_fast_clean}
  */
  readonly isOpenFastClean?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#is_sync_re_edit DrsJob#is_sync_re_edit}
  */
  readonly isSyncReEdit?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#master_az DrsJob#master_az}
  */
  readonly masterAz?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#migrate_definer DrsJob#migrate_definer}
  */
  readonly migrateDefiner?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#migration_type DrsJob#migration_type}
  */
  readonly migrationType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#multi_write DrsJob#multi_write}
  */
  readonly multiWrite?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#name DrsJob#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#net_type DrsJob#net_type}
  */
  readonly netType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#node_type DrsJob#node_type}
  */
  readonly nodeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#pause_mode DrsJob#pause_mode}
  */
  readonly pauseMode?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#period DrsJob#period}
  */
  readonly period?: number;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#period_unit DrsJob#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#region DrsJob#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#slave_az DrsJob#slave_az}
  */
  readonly slaveAz?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#start_time DrsJob#start_time}
  */
  readonly startTime?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#tags DrsJob#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#type DrsJob#type}
  */
  readonly type: string;
  /**
  * alarm_notify block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#alarm_notify DrsJob#alarm_notify}
  */
  readonly alarmNotify?: DrsJobAlarmNotify;
  /**
  * destination_db block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#destination_db DrsJob#destination_db}
  */
  readonly destinationDb: DrsJobDestinationDb;
  /**
  * limit_speed block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#limit_speed DrsJob#limit_speed}
  */
  readonly limitSpeed?: DrsJobLimitSpeed[] | cdktf.IResolvable;
  /**
  * policy_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#policy_config DrsJob#policy_config}
  */
  readonly policyConfig?: DrsJobPolicyConfig;
  /**
  * public_ip_list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#public_ip_list DrsJob#public_ip_list}
  */
  readonly publicIpList?: DrsJobPublicIpListStruct[] | cdktf.IResolvable;
  /**
  * source_db block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#source_db DrsJob#source_db}
  */
  readonly sourceDb: DrsJobSourceDb;
  /**
  * tables block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#tables DrsJob#tables}
  */
  readonly tables?: DrsJobTables[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#timeouts DrsJob#timeouts}
  */
  readonly timeouts?: DrsJobTimeouts;
}
export interface DrsJobAlarmNotify {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#delay_time DrsJob#delay_time}
  */
  readonly delayTime?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#rpo_delay DrsJob#rpo_delay}
  */
  readonly rpoDelay?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#rto_delay DrsJob#rto_delay}
  */
  readonly rtoDelay?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#topic_urn DrsJob#topic_urn}
  */
  readonly topicUrn: string;
}

export function drsJobAlarmNotifyToTerraform(struct?: DrsJobAlarmNotifyOutputReference | DrsJobAlarmNotify): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    delay_time: cdktf.numberToTerraform(struct!.delayTime),
    rpo_delay: cdktf.numberToTerraform(struct!.rpoDelay),
    rto_delay: cdktf.numberToTerraform(struct!.rtoDelay),
    topic_urn: cdktf.stringToTerraform(struct!.topicUrn),
  }
}


export function drsJobAlarmNotifyToHclTerraform(struct?: DrsJobAlarmNotifyOutputReference | DrsJobAlarmNotify): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    delay_time: {
      value: cdktf.numberToHclTerraform(struct!.delayTime),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    rpo_delay: {
      value: cdktf.numberToHclTerraform(struct!.rpoDelay),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    rto_delay: {
      value: cdktf.numberToHclTerraform(struct!.rtoDelay),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    topic_urn: {
      value: cdktf.stringToHclTerraform(struct!.topicUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DrsJobAlarmNotifyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DrsJobAlarmNotify | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._delayTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.delayTime = this._delayTime;
    }
    if (this._rpoDelay !== undefined) {
      hasAnyValues = true;
      internalValueResult.rpoDelay = this._rpoDelay;
    }
    if (this._rtoDelay !== undefined) {
      hasAnyValues = true;
      internalValueResult.rtoDelay = this._rtoDelay;
    }
    if (this._topicUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicUrn = this._topicUrn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DrsJobAlarmNotify | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._delayTime = undefined;
      this._rpoDelay = undefined;
      this._rtoDelay = undefined;
      this._topicUrn = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._delayTime = value.delayTime;
      this._rpoDelay = value.rpoDelay;
      this._rtoDelay = value.rtoDelay;
      this._topicUrn = value.topicUrn;
    }
  }

  // delay_time - computed: true, optional: true, required: false
  private _delayTime?: number; 
  public get delayTime() {
    return this.getNumberAttribute('delay_time');
  }
  public set delayTime(value: number) {
    this._delayTime = value;
  }
  public resetDelayTime() {
    this._delayTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get delayTimeInput() {
    return this._delayTime;
  }

  // rpo_delay - computed: true, optional: true, required: false
  private _rpoDelay?: number; 
  public get rpoDelay() {
    return this.getNumberAttribute('rpo_delay');
  }
  public set rpoDelay(value: number) {
    this._rpoDelay = value;
  }
  public resetRpoDelay() {
    this._rpoDelay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rpoDelayInput() {
    return this._rpoDelay;
  }

  // rto_delay - computed: true, optional: true, required: false
  private _rtoDelay?: number; 
  public get rtoDelay() {
    return this.getNumberAttribute('rto_delay');
  }
  public set rtoDelay(value: number) {
    this._rtoDelay = value;
  }
  public resetRtoDelay() {
    this._rtoDelay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rtoDelayInput() {
    return this._rtoDelay;
  }

  // topic_urn - computed: false, optional: false, required: true
  private _topicUrn?: string; 
  public get topicUrn() {
    return this.getStringAttribute('topic_urn');
  }
  public set topicUrn(value: string) {
    this._topicUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicUrnInput() {
    return this._topicUrn;
  }
}
export interface DrsJobDestinationDbKafkaSecurityConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#delegation_tokens DrsJob#delegation_tokens}
  */
  readonly delegationTokens?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#enable_key_store DrsJob#enable_key_store}
  */
  readonly enableKeyStore?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#endpoint_algorithm DrsJob#endpoint_algorithm}
  */
  readonly endpointAlgorithm?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#key_password DrsJob#key_password}
  */
  readonly keyPassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#key_store_key DrsJob#key_store_key}
  */
  readonly keyStoreKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#key_store_key_name DrsJob#key_store_key_name}
  */
  readonly keyStoreKeyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#key_store_password DrsJob#key_store_password}
  */
  readonly keyStorePassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#sasl_mechanism DrsJob#sasl_mechanism}
  */
  readonly saslMechanism?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#set_private_key_password DrsJob#set_private_key_password}
  */
  readonly setPrivateKeyPassword?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#trust_store_key DrsJob#trust_store_key}
  */
  readonly trustStoreKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#trust_store_key_name DrsJob#trust_store_key_name}
  */
  readonly trustStoreKeyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#trust_store_password DrsJob#trust_store_password}
  */
  readonly trustStorePassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#type DrsJob#type}
  */
  readonly type?: string;
}

export function drsJobDestinationDbKafkaSecurityConfigToTerraform(struct?: DrsJobDestinationDbKafkaSecurityConfigOutputReference | DrsJobDestinationDbKafkaSecurityConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    delegation_tokens: cdktf.booleanToTerraform(struct!.delegationTokens),
    enable_key_store: cdktf.booleanToTerraform(struct!.enableKeyStore),
    endpoint_algorithm: cdktf.stringToTerraform(struct!.endpointAlgorithm),
    key_password: cdktf.stringToTerraform(struct!.keyPassword),
    key_store_key: cdktf.stringToTerraform(struct!.keyStoreKey),
    key_store_key_name: cdktf.stringToTerraform(struct!.keyStoreKeyName),
    key_store_password: cdktf.stringToTerraform(struct!.keyStorePassword),
    sasl_mechanism: cdktf.stringToTerraform(struct!.saslMechanism),
    set_private_key_password: cdktf.booleanToTerraform(struct!.setPrivateKeyPassword),
    trust_store_key: cdktf.stringToTerraform(struct!.trustStoreKey),
    trust_store_key_name: cdktf.stringToTerraform(struct!.trustStoreKeyName),
    trust_store_password: cdktf.stringToTerraform(struct!.trustStorePassword),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function drsJobDestinationDbKafkaSecurityConfigToHclTerraform(struct?: DrsJobDestinationDbKafkaSecurityConfigOutputReference | DrsJobDestinationDbKafkaSecurityConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    delegation_tokens: {
      value: cdktf.booleanToHclTerraform(struct!.delegationTokens),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    enable_key_store: {
      value: cdktf.booleanToHclTerraform(struct!.enableKeyStore),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    endpoint_algorithm: {
      value: cdktf.stringToHclTerraform(struct!.endpointAlgorithm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key_password: {
      value: cdktf.stringToHclTerraform(struct!.keyPassword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key_store_key: {
      value: cdktf.stringToHclTerraform(struct!.keyStoreKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key_store_key_name: {
      value: cdktf.stringToHclTerraform(struct!.keyStoreKeyName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key_store_password: {
      value: cdktf.stringToHclTerraform(struct!.keyStorePassword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sasl_mechanism: {
      value: cdktf.stringToHclTerraform(struct!.saslMechanism),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    set_private_key_password: {
      value: cdktf.booleanToHclTerraform(struct!.setPrivateKeyPassword),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    trust_store_key: {
      value: cdktf.stringToHclTerraform(struct!.trustStoreKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    trust_store_key_name: {
      value: cdktf.stringToHclTerraform(struct!.trustStoreKeyName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    trust_store_password: {
      value: cdktf.stringToHclTerraform(struct!.trustStorePassword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DrsJobDestinationDbKafkaSecurityConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DrsJobDestinationDbKafkaSecurityConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._delegationTokens !== undefined) {
      hasAnyValues = true;
      internalValueResult.delegationTokens = this._delegationTokens;
    }
    if (this._enableKeyStore !== undefined) {
      hasAnyValues = true;
      internalValueResult.enableKeyStore = this._enableKeyStore;
    }
    if (this._endpointAlgorithm !== undefined) {
      hasAnyValues = true;
      internalValueResult.endpointAlgorithm = this._endpointAlgorithm;
    }
    if (this._keyPassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.keyPassword = this._keyPassword;
    }
    if (this._keyStoreKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.keyStoreKey = this._keyStoreKey;
    }
    if (this._keyStoreKeyName !== undefined) {
      hasAnyValues = true;
      internalValueResult.keyStoreKeyName = this._keyStoreKeyName;
    }
    if (this._keyStorePassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.keyStorePassword = this._keyStorePassword;
    }
    if (this._saslMechanism !== undefined) {
      hasAnyValues = true;
      internalValueResult.saslMechanism = this._saslMechanism;
    }
    if (this._setPrivateKeyPassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.setPrivateKeyPassword = this._setPrivateKeyPassword;
    }
    if (this._trustStoreKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.trustStoreKey = this._trustStoreKey;
    }
    if (this._trustStoreKeyName !== undefined) {
      hasAnyValues = true;
      internalValueResult.trustStoreKeyName = this._trustStoreKeyName;
    }
    if (this._trustStorePassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.trustStorePassword = this._trustStorePassword;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DrsJobDestinationDbKafkaSecurityConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._delegationTokens = undefined;
      this._enableKeyStore = undefined;
      this._endpointAlgorithm = undefined;
      this._keyPassword = undefined;
      this._keyStoreKey = undefined;
      this._keyStoreKeyName = undefined;
      this._keyStorePassword = undefined;
      this._saslMechanism = undefined;
      this._setPrivateKeyPassword = undefined;
      this._trustStoreKey = undefined;
      this._trustStoreKeyName = undefined;
      this._trustStorePassword = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._delegationTokens = value.delegationTokens;
      this._enableKeyStore = value.enableKeyStore;
      this._endpointAlgorithm = value.endpointAlgorithm;
      this._keyPassword = value.keyPassword;
      this._keyStoreKey = value.keyStoreKey;
      this._keyStoreKeyName = value.keyStoreKeyName;
      this._keyStorePassword = value.keyStorePassword;
      this._saslMechanism = value.saslMechanism;
      this._setPrivateKeyPassword = value.setPrivateKeyPassword;
      this._trustStoreKey = value.trustStoreKey;
      this._trustStoreKeyName = value.trustStoreKeyName;
      this._trustStorePassword = value.trustStorePassword;
      this._type = value.type;
    }
  }

  // delegation_tokens - computed: false, optional: true, required: false
  private _delegationTokens?: boolean | cdktf.IResolvable; 
  public get delegationTokens() {
    return this.getBooleanAttribute('delegation_tokens');
  }
  public set delegationTokens(value: boolean | cdktf.IResolvable) {
    this._delegationTokens = value;
  }
  public resetDelegationTokens() {
    this._delegationTokens = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get delegationTokensInput() {
    return this._delegationTokens;
  }

  // enable_key_store - computed: false, optional: true, required: false
  private _enableKeyStore?: boolean | cdktf.IResolvable; 
  public get enableKeyStore() {
    return this.getBooleanAttribute('enable_key_store');
  }
  public set enableKeyStore(value: boolean | cdktf.IResolvable) {
    this._enableKeyStore = value;
  }
  public resetEnableKeyStore() {
    this._enableKeyStore = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableKeyStoreInput() {
    return this._enableKeyStore;
  }

  // endpoint_algorithm - computed: false, optional: true, required: false
  private _endpointAlgorithm?: string; 
  public get endpointAlgorithm() {
    return this.getStringAttribute('endpoint_algorithm');
  }
  public set endpointAlgorithm(value: string) {
    this._endpointAlgorithm = value;
  }
  public resetEndpointAlgorithm() {
    this._endpointAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointAlgorithmInput() {
    return this._endpointAlgorithm;
  }

  // key_password - computed: false, optional: true, required: false
  private _keyPassword?: string; 
  public get keyPassword() {
    return this.getStringAttribute('key_password');
  }
  public set keyPassword(value: string) {
    this._keyPassword = value;
  }
  public resetKeyPassword() {
    this._keyPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyPasswordInput() {
    return this._keyPassword;
  }

  // key_store_key - computed: false, optional: true, required: false
  private _keyStoreKey?: string; 
  public get keyStoreKey() {
    return this.getStringAttribute('key_store_key');
  }
  public set keyStoreKey(value: string) {
    this._keyStoreKey = value;
  }
  public resetKeyStoreKey() {
    this._keyStoreKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyStoreKeyInput() {
    return this._keyStoreKey;
  }

  // key_store_key_name - computed: false, optional: true, required: false
  private _keyStoreKeyName?: string; 
  public get keyStoreKeyName() {
    return this.getStringAttribute('key_store_key_name');
  }
  public set keyStoreKeyName(value: string) {
    this._keyStoreKeyName = value;
  }
  public resetKeyStoreKeyName() {
    this._keyStoreKeyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyStoreKeyNameInput() {
    return this._keyStoreKeyName;
  }

  // key_store_password - computed: false, optional: true, required: false
  private _keyStorePassword?: string; 
  public get keyStorePassword() {
    return this.getStringAttribute('key_store_password');
  }
  public set keyStorePassword(value: string) {
    this._keyStorePassword = value;
  }
  public resetKeyStorePassword() {
    this._keyStorePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyStorePasswordInput() {
    return this._keyStorePassword;
  }

  // sasl_mechanism - computed: false, optional: true, required: false
  private _saslMechanism?: string; 
  public get saslMechanism() {
    return this.getStringAttribute('sasl_mechanism');
  }
  public set saslMechanism(value: string) {
    this._saslMechanism = value;
  }
  public resetSaslMechanism() {
    this._saslMechanism = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get saslMechanismInput() {
    return this._saslMechanism;
  }

  // set_private_key_password - computed: false, optional: true, required: false
  private _setPrivateKeyPassword?: boolean | cdktf.IResolvable; 
  public get setPrivateKeyPassword() {
    return this.getBooleanAttribute('set_private_key_password');
  }
  public set setPrivateKeyPassword(value: boolean | cdktf.IResolvable) {
    this._setPrivateKeyPassword = value;
  }
  public resetSetPrivateKeyPassword() {
    this._setPrivateKeyPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get setPrivateKeyPasswordInput() {
    return this._setPrivateKeyPassword;
  }

  // trust_store_key - computed: false, optional: true, required: false
  private _trustStoreKey?: string; 
  public get trustStoreKey() {
    return this.getStringAttribute('trust_store_key');
  }
  public set trustStoreKey(value: string) {
    this._trustStoreKey = value;
  }
  public resetTrustStoreKey() {
    this._trustStoreKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trustStoreKeyInput() {
    return this._trustStoreKey;
  }

  // trust_store_key_name - computed: false, optional: true, required: false
  private _trustStoreKeyName?: string; 
  public get trustStoreKeyName() {
    return this.getStringAttribute('trust_store_key_name');
  }
  public set trustStoreKeyName(value: string) {
    this._trustStoreKeyName = value;
  }
  public resetTrustStoreKeyName() {
    this._trustStoreKeyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trustStoreKeyNameInput() {
    return this._trustStoreKeyName;
  }

  // trust_store_password - computed: false, optional: true, required: false
  private _trustStorePassword?: string; 
  public get trustStorePassword() {
    return this.getStringAttribute('trust_store_password');
  }
  public set trustStorePassword(value: string) {
    this._trustStorePassword = value;
  }
  public resetTrustStorePassword() {
    this._trustStorePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trustStorePasswordInput() {
    return this._trustStorePassword;
  }

  // type - computed: false, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface DrsJobDestinationDb {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#engine_type DrsJob#engine_type}
  */
  readonly engineType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#instance_id DrsJob#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ip DrsJob#ip}
  */
  readonly ip: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#name DrsJob#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#password DrsJob#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#port DrsJob#port}
  */
  readonly port?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#region DrsJob#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_cert_check_sum DrsJob#ssl_cert_check_sum}
  */
  readonly sslCertCheckSum?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_cert_key DrsJob#ssl_cert_key}
  */
  readonly sslCertKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_cert_name DrsJob#ssl_cert_name}
  */
  readonly sslCertName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_cert_password DrsJob#ssl_cert_password}
  */
  readonly sslCertPassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_enabled DrsJob#ssl_enabled}
  */
  readonly sslEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#subnet_id DrsJob#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#user DrsJob#user}
  */
  readonly user?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#vpc_id DrsJob#vpc_id}
  */
  readonly vpcId?: string;
  /**
  * kafka_security_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#kafka_security_config DrsJob#kafka_security_config}
  */
  readonly kafkaSecurityConfig?: DrsJobDestinationDbKafkaSecurityConfig;
}

export function drsJobDestinationDbToTerraform(struct?: DrsJobDestinationDbOutputReference | DrsJobDestinationDb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    engine_type: cdktf.stringToTerraform(struct!.engineType),
    instance_id: cdktf.stringToTerraform(struct!.instanceId),
    ip: cdktf.stringToTerraform(struct!.ip),
    name: cdktf.stringToTerraform(struct!.name),
    password: cdktf.stringToTerraform(struct!.password),
    port: cdktf.numberToTerraform(struct!.port),
    region: cdktf.stringToTerraform(struct!.region),
    ssl_cert_check_sum: cdktf.stringToTerraform(struct!.sslCertCheckSum),
    ssl_cert_key: cdktf.stringToTerraform(struct!.sslCertKey),
    ssl_cert_name: cdktf.stringToTerraform(struct!.sslCertName),
    ssl_cert_password: cdktf.stringToTerraform(struct!.sslCertPassword),
    ssl_enabled: cdktf.booleanToTerraform(struct!.sslEnabled),
    subnet_id: cdktf.stringToTerraform(struct!.subnetId),
    user: cdktf.stringToTerraform(struct!.user),
    vpc_id: cdktf.stringToTerraform(struct!.vpcId),
    kafka_security_config: drsJobDestinationDbKafkaSecurityConfigToTerraform(struct!.kafkaSecurityConfig),
  }
}


export function drsJobDestinationDbToHclTerraform(struct?: DrsJobDestinationDbOutputReference | DrsJobDestinationDb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    engine_type: {
      value: cdktf.stringToHclTerraform(struct!.engineType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    instance_id: {
      value: cdktf.stringToHclTerraform(struct!.instanceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ip: {
      value: cdktf.stringToHclTerraform(struct!.ip),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_cert_check_sum: {
      value: cdktf.stringToHclTerraform(struct!.sslCertCheckSum),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_cert_key: {
      value: cdktf.stringToHclTerraform(struct!.sslCertKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_cert_name: {
      value: cdktf.stringToHclTerraform(struct!.sslCertName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_cert_password: {
      value: cdktf.stringToHclTerraform(struct!.sslCertPassword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.sslEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    subnet_id: {
      value: cdktf.stringToHclTerraform(struct!.subnetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user: {
      value: cdktf.stringToHclTerraform(struct!.user),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vpc_id: {
      value: cdktf.stringToHclTerraform(struct!.vpcId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    kafka_security_config: {
      value: drsJobDestinationDbKafkaSecurityConfigToHclTerraform(struct!.kafkaSecurityConfig),
      isBlock: true,
      type: "list",
      storageClassType: "DrsJobDestinationDbKafkaSecurityConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DrsJobDestinationDbOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DrsJobDestinationDb | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._engineType !== undefined) {
      hasAnyValues = true;
      internalValueResult.engineType = this._engineType;
    }
    if (this._instanceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceId = this._instanceId;
    }
    if (this._ip !== undefined) {
      hasAnyValues = true;
      internalValueResult.ip = this._ip;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._sslCertCheckSum !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslCertCheckSum = this._sslCertCheckSum;
    }
    if (this._sslCertKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslCertKey = this._sslCertKey;
    }
    if (this._sslCertName !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslCertName = this._sslCertName;
    }
    if (this._sslCertPassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslCertPassword = this._sslCertPassword;
    }
    if (this._sslEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslEnabled = this._sslEnabled;
    }
    if (this._subnetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnetId = this._subnetId;
    }
    if (this._user !== undefined) {
      hasAnyValues = true;
      internalValueResult.user = this._user;
    }
    if (this._vpcId !== undefined) {
      hasAnyValues = true;
      internalValueResult.vpcId = this._vpcId;
    }
    if (this._kafkaSecurityConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.kafkaSecurityConfig = this._kafkaSecurityConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DrsJobDestinationDb | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._engineType = undefined;
      this._instanceId = undefined;
      this._ip = undefined;
      this._name = undefined;
      this._password = undefined;
      this._port = undefined;
      this._region = undefined;
      this._sslCertCheckSum = undefined;
      this._sslCertKey = undefined;
      this._sslCertName = undefined;
      this._sslCertPassword = undefined;
      this._sslEnabled = undefined;
      this._subnetId = undefined;
      this._user = undefined;
      this._vpcId = undefined;
      this._kafkaSecurityConfig.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._engineType = value.engineType;
      this._instanceId = value.instanceId;
      this._ip = value.ip;
      this._name = value.name;
      this._password = value.password;
      this._port = value.port;
      this._region = value.region;
      this._sslCertCheckSum = value.sslCertCheckSum;
      this._sslCertKey = value.sslCertKey;
      this._sslCertName = value.sslCertName;
      this._sslCertPassword = value.sslCertPassword;
      this._sslEnabled = value.sslEnabled;
      this._subnetId = value.subnetId;
      this._user = value.user;
      this._vpcId = value.vpcId;
      this._kafkaSecurityConfig.internalValue = value.kafkaSecurityConfig;
    }
  }

  // engine_type - computed: false, optional: false, required: true
  private _engineType?: string; 
  public get engineType() {
    return this.getStringAttribute('engine_type');
  }
  public set engineType(value: string) {
    this._engineType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get engineTypeInput() {
    return this._engineType;
  }

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // ip - computed: false, optional: false, required: true
  private _ip?: string; 
  public get ip() {
    return this.getStringAttribute('ip');
  }
  public set ip(value: string) {
    this._ip = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ipInput() {
    return this._ip;
  }

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // port - computed: false, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
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

  // security_group_id - computed: true, optional: false, required: false
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }

  // ssl_cert_check_sum - computed: false, optional: true, required: false
  private _sslCertCheckSum?: string; 
  public get sslCertCheckSum() {
    return this.getStringAttribute('ssl_cert_check_sum');
  }
  public set sslCertCheckSum(value: string) {
    this._sslCertCheckSum = value;
  }
  public resetSslCertCheckSum() {
    this._sslCertCheckSum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslCertCheckSumInput() {
    return this._sslCertCheckSum;
  }

  // ssl_cert_key - computed: false, optional: true, required: false
  private _sslCertKey?: string; 
  public get sslCertKey() {
    return this.getStringAttribute('ssl_cert_key');
  }
  public set sslCertKey(value: string) {
    this._sslCertKey = value;
  }
  public resetSslCertKey() {
    this._sslCertKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslCertKeyInput() {
    return this._sslCertKey;
  }

  // ssl_cert_name - computed: false, optional: true, required: false
  private _sslCertName?: string; 
  public get sslCertName() {
    return this.getStringAttribute('ssl_cert_name');
  }
  public set sslCertName(value: string) {
    this._sslCertName = value;
  }
  public resetSslCertName() {
    this._sslCertName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslCertNameInput() {
    return this._sslCertName;
  }

  // ssl_cert_password - computed: false, optional: true, required: false
  private _sslCertPassword?: string; 
  public get sslCertPassword() {
    return this.getStringAttribute('ssl_cert_password');
  }
  public set sslCertPassword(value: string) {
    this._sslCertPassword = value;
  }
  public resetSslCertPassword() {
    this._sslCertPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslCertPasswordInput() {
    return this._sslCertPassword;
  }

  // ssl_enabled - computed: false, optional: true, required: false
  private _sslEnabled?: boolean | cdktf.IResolvable; 
  public get sslEnabled() {
    return this.getBooleanAttribute('ssl_enabled');
  }
  public set sslEnabled(value: boolean | cdktf.IResolvable) {
    this._sslEnabled = value;
  }
  public resetSslEnabled() {
    this._sslEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslEnabledInput() {
    return this._sslEnabled;
  }

  // subnet_id - computed: false, optional: true, required: false
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  public resetSubnetId() {
    this._subnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
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

  // vpc_id - computed: true, optional: true, required: false
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  public resetVpcId() {
    this._vpcId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // kafka_security_config - computed: false, optional: true, required: false
  private _kafkaSecurityConfig = new DrsJobDestinationDbKafkaSecurityConfigOutputReference(this, "kafka_security_config");
  public get kafkaSecurityConfig() {
    return this._kafkaSecurityConfig;
  }
  public putKafkaSecurityConfig(value: DrsJobDestinationDbKafkaSecurityConfig) {
    this._kafkaSecurityConfig.internalValue = value;
  }
  public resetKafkaSecurityConfig() {
    this._kafkaSecurityConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaSecurityConfigInput() {
    return this._kafkaSecurityConfig.internalValue;
  }
}
export interface DrsJobLimitSpeed {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#end_time DrsJob#end_time}
  */
  readonly endTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#speed DrsJob#speed}
  */
  readonly speed: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#start_time DrsJob#start_time}
  */
  readonly startTime: string;
}

export function drsJobLimitSpeedToTerraform(struct?: DrsJobLimitSpeed | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    end_time: cdktf.stringToTerraform(struct!.endTime),
    speed: cdktf.stringToTerraform(struct!.speed),
    start_time: cdktf.stringToTerraform(struct!.startTime),
  }
}


export function drsJobLimitSpeedToHclTerraform(struct?: DrsJobLimitSpeed | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    end_time: {
      value: cdktf.stringToHclTerraform(struct!.endTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    speed: {
      value: cdktf.stringToHclTerraform(struct!.speed),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    start_time: {
      value: cdktf.stringToHclTerraform(struct!.startTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DrsJobLimitSpeedOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DrsJobLimitSpeed | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._endTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.endTime = this._endTime;
    }
    if (this._speed !== undefined) {
      hasAnyValues = true;
      internalValueResult.speed = this._speed;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DrsJobLimitSpeed | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._endTime = undefined;
      this._speed = undefined;
      this._startTime = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._endTime = value.endTime;
      this._speed = value.speed;
      this._startTime = value.startTime;
    }
  }

  // end_time - computed: false, optional: false, required: true
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
  }

  // speed - computed: false, optional: false, required: true
  private _speed?: string; 
  public get speed() {
    return this.getStringAttribute('speed');
  }
  public set speed(value: string) {
    this._speed = value;
  }
  // Temporarily expose input value. Use with caution.
  public get speedInput() {
    return this._speed;
  }

  // start_time - computed: false, optional: false, required: true
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }
}

export class DrsJobLimitSpeedList extends cdktf.ComplexList {
  public internalValue? : DrsJobLimitSpeed[] | cdktf.IResolvable

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
  public get(index: number): DrsJobLimitSpeedOutputReference {
    return new DrsJobLimitSpeedOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DrsJobPolicyConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#conflict_policy DrsJob#conflict_policy}
  */
  readonly conflictPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#export_snapshot DrsJob#export_snapshot}
  */
  readonly exportSnapshot?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#file_and_position DrsJob#file_and_position}
  */
  readonly fileAndPosition?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#filter_ddl_policy DrsJob#filter_ddl_policy}
  */
  readonly filterDdlPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#gtid_set DrsJob#gtid_set}
  */
  readonly gtidSet?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#index_trans DrsJob#index_trans}
  */
  readonly indexTrans?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#is_fill_materialized_view DrsJob#is_fill_materialized_view}
  */
  readonly isFillMaterializedView?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#kafka_data_format DrsJob#kafka_data_format}
  */
  readonly kafkaDataFormat?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#partition_policy DrsJob#partition_policy}
  */
  readonly partitionPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#partitions_num DrsJob#partitions_num}
  */
  readonly partitionsNum?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#replication_factor DrsJob#replication_factor}
  */
  readonly replicationFactor?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#slot_name DrsJob#slot_name}
  */
  readonly slotName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#topic DrsJob#topic}
  */
  readonly topic?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#topic_name_format DrsJob#topic_name_format}
  */
  readonly topicNameFormat?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#topic_policy DrsJob#topic_policy}
  */
  readonly topicPolicy?: string;
}

export function drsJobPolicyConfigToTerraform(struct?: DrsJobPolicyConfigOutputReference | DrsJobPolicyConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    conflict_policy: cdktf.stringToTerraform(struct!.conflictPolicy),
    export_snapshot: cdktf.booleanToTerraform(struct!.exportSnapshot),
    file_and_position: cdktf.stringToTerraform(struct!.fileAndPosition),
    filter_ddl_policy: cdktf.stringToTerraform(struct!.filterDdlPolicy),
    gtid_set: cdktf.stringToTerraform(struct!.gtidSet),
    index_trans: cdktf.booleanToTerraform(struct!.indexTrans),
    is_fill_materialized_view: cdktf.booleanToTerraform(struct!.isFillMaterializedView),
    kafka_data_format: cdktf.stringToTerraform(struct!.kafkaDataFormat),
    partition_policy: cdktf.stringToTerraform(struct!.partitionPolicy),
    partitions_num: cdktf.stringToTerraform(struct!.partitionsNum),
    replication_factor: cdktf.stringToTerraform(struct!.replicationFactor),
    slot_name: cdktf.stringToTerraform(struct!.slotName),
    topic: cdktf.stringToTerraform(struct!.topic),
    topic_name_format: cdktf.stringToTerraform(struct!.topicNameFormat),
    topic_policy: cdktf.stringToTerraform(struct!.topicPolicy),
  }
}


export function drsJobPolicyConfigToHclTerraform(struct?: DrsJobPolicyConfigOutputReference | DrsJobPolicyConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    conflict_policy: {
      value: cdktf.stringToHclTerraform(struct!.conflictPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    export_snapshot: {
      value: cdktf.booleanToHclTerraform(struct!.exportSnapshot),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    file_and_position: {
      value: cdktf.stringToHclTerraform(struct!.fileAndPosition),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    filter_ddl_policy: {
      value: cdktf.stringToHclTerraform(struct!.filterDdlPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    gtid_set: {
      value: cdktf.stringToHclTerraform(struct!.gtidSet),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    index_trans: {
      value: cdktf.booleanToHclTerraform(struct!.indexTrans),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    is_fill_materialized_view: {
      value: cdktf.booleanToHclTerraform(struct!.isFillMaterializedView),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    kafka_data_format: {
      value: cdktf.stringToHclTerraform(struct!.kafkaDataFormat),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    partition_policy: {
      value: cdktf.stringToHclTerraform(struct!.partitionPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    partitions_num: {
      value: cdktf.stringToHclTerraform(struct!.partitionsNum),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    replication_factor: {
      value: cdktf.stringToHclTerraform(struct!.replicationFactor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    slot_name: {
      value: cdktf.stringToHclTerraform(struct!.slotName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic: {
      value: cdktf.stringToHclTerraform(struct!.topic),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic_name_format: {
      value: cdktf.stringToHclTerraform(struct!.topicNameFormat),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic_policy: {
      value: cdktf.stringToHclTerraform(struct!.topicPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DrsJobPolicyConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DrsJobPolicyConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._conflictPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.conflictPolicy = this._conflictPolicy;
    }
    if (this._exportSnapshot !== undefined) {
      hasAnyValues = true;
      internalValueResult.exportSnapshot = this._exportSnapshot;
    }
    if (this._fileAndPosition !== undefined) {
      hasAnyValues = true;
      internalValueResult.fileAndPosition = this._fileAndPosition;
    }
    if (this._filterDdlPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.filterDdlPolicy = this._filterDdlPolicy;
    }
    if (this._gtidSet !== undefined) {
      hasAnyValues = true;
      internalValueResult.gtidSet = this._gtidSet;
    }
    if (this._indexTrans !== undefined) {
      hasAnyValues = true;
      internalValueResult.indexTrans = this._indexTrans;
    }
    if (this._isFillMaterializedView !== undefined) {
      hasAnyValues = true;
      internalValueResult.isFillMaterializedView = this._isFillMaterializedView;
    }
    if (this._kafkaDataFormat !== undefined) {
      hasAnyValues = true;
      internalValueResult.kafkaDataFormat = this._kafkaDataFormat;
    }
    if (this._partitionPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.partitionPolicy = this._partitionPolicy;
    }
    if (this._partitionsNum !== undefined) {
      hasAnyValues = true;
      internalValueResult.partitionsNum = this._partitionsNum;
    }
    if (this._replicationFactor !== undefined) {
      hasAnyValues = true;
      internalValueResult.replicationFactor = this._replicationFactor;
    }
    if (this._slotName !== undefined) {
      hasAnyValues = true;
      internalValueResult.slotName = this._slotName;
    }
    if (this._topic !== undefined) {
      hasAnyValues = true;
      internalValueResult.topic = this._topic;
    }
    if (this._topicNameFormat !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicNameFormat = this._topicNameFormat;
    }
    if (this._topicPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicPolicy = this._topicPolicy;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DrsJobPolicyConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._conflictPolicy = undefined;
      this._exportSnapshot = undefined;
      this._fileAndPosition = undefined;
      this._filterDdlPolicy = undefined;
      this._gtidSet = undefined;
      this._indexTrans = undefined;
      this._isFillMaterializedView = undefined;
      this._kafkaDataFormat = undefined;
      this._partitionPolicy = undefined;
      this._partitionsNum = undefined;
      this._replicationFactor = undefined;
      this._slotName = undefined;
      this._topic = undefined;
      this._topicNameFormat = undefined;
      this._topicPolicy = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._conflictPolicy = value.conflictPolicy;
      this._exportSnapshot = value.exportSnapshot;
      this._fileAndPosition = value.fileAndPosition;
      this._filterDdlPolicy = value.filterDdlPolicy;
      this._gtidSet = value.gtidSet;
      this._indexTrans = value.indexTrans;
      this._isFillMaterializedView = value.isFillMaterializedView;
      this._kafkaDataFormat = value.kafkaDataFormat;
      this._partitionPolicy = value.partitionPolicy;
      this._partitionsNum = value.partitionsNum;
      this._replicationFactor = value.replicationFactor;
      this._slotName = value.slotName;
      this._topic = value.topic;
      this._topicNameFormat = value.topicNameFormat;
      this._topicPolicy = value.topicPolicy;
    }
  }

  // conflict_policy - computed: false, optional: true, required: false
  private _conflictPolicy?: string; 
  public get conflictPolicy() {
    return this.getStringAttribute('conflict_policy');
  }
  public set conflictPolicy(value: string) {
    this._conflictPolicy = value;
  }
  public resetConflictPolicy() {
    this._conflictPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get conflictPolicyInput() {
    return this._conflictPolicy;
  }

  // export_snapshot - computed: false, optional: true, required: false
  private _exportSnapshot?: boolean | cdktf.IResolvable; 
  public get exportSnapshot() {
    return this.getBooleanAttribute('export_snapshot');
  }
  public set exportSnapshot(value: boolean | cdktf.IResolvable) {
    this._exportSnapshot = value;
  }
  public resetExportSnapshot() {
    this._exportSnapshot = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get exportSnapshotInput() {
    return this._exportSnapshot;
  }

  // file_and_position - computed: false, optional: true, required: false
  private _fileAndPosition?: string; 
  public get fileAndPosition() {
    return this.getStringAttribute('file_and_position');
  }
  public set fileAndPosition(value: string) {
    this._fileAndPosition = value;
  }
  public resetFileAndPosition() {
    this._fileAndPosition = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fileAndPositionInput() {
    return this._fileAndPosition;
  }

  // filter_ddl_policy - computed: false, optional: true, required: false
  private _filterDdlPolicy?: string; 
  public get filterDdlPolicy() {
    return this.getStringAttribute('filter_ddl_policy');
  }
  public set filterDdlPolicy(value: string) {
    this._filterDdlPolicy = value;
  }
  public resetFilterDdlPolicy() {
    this._filterDdlPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get filterDdlPolicyInput() {
    return this._filterDdlPolicy;
  }

  // gtid_set - computed: false, optional: true, required: false
  private _gtidSet?: string; 
  public get gtidSet() {
    return this.getStringAttribute('gtid_set');
  }
  public set gtidSet(value: string) {
    this._gtidSet = value;
  }
  public resetGtidSet() {
    this._gtidSet = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gtidSetInput() {
    return this._gtidSet;
  }

  // index_trans - computed: false, optional: true, required: false
  private _indexTrans?: boolean | cdktf.IResolvable; 
  public get indexTrans() {
    return this.getBooleanAttribute('index_trans');
  }
  public set indexTrans(value: boolean | cdktf.IResolvable) {
    this._indexTrans = value;
  }
  public resetIndexTrans() {
    this._indexTrans = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get indexTransInput() {
    return this._indexTrans;
  }

  // is_fill_materialized_view - computed: false, optional: true, required: false
  private _isFillMaterializedView?: boolean | cdktf.IResolvable; 
  public get isFillMaterializedView() {
    return this.getBooleanAttribute('is_fill_materialized_view');
  }
  public set isFillMaterializedView(value: boolean | cdktf.IResolvable) {
    this._isFillMaterializedView = value;
  }
  public resetIsFillMaterializedView() {
    this._isFillMaterializedView = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isFillMaterializedViewInput() {
    return this._isFillMaterializedView;
  }

  // kafka_data_format - computed: false, optional: true, required: false
  private _kafkaDataFormat?: string; 
  public get kafkaDataFormat() {
    return this.getStringAttribute('kafka_data_format');
  }
  public set kafkaDataFormat(value: string) {
    this._kafkaDataFormat = value;
  }
  public resetKafkaDataFormat() {
    this._kafkaDataFormat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaDataFormatInput() {
    return this._kafkaDataFormat;
  }

  // partition_policy - computed: false, optional: true, required: false
  private _partitionPolicy?: string; 
  public get partitionPolicy() {
    return this.getStringAttribute('partition_policy');
  }
  public set partitionPolicy(value: string) {
    this._partitionPolicy = value;
  }
  public resetPartitionPolicy() {
    this._partitionPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionPolicyInput() {
    return this._partitionPolicy;
  }

  // partitions_num - computed: false, optional: true, required: false
  private _partitionsNum?: string; 
  public get partitionsNum() {
    return this.getStringAttribute('partitions_num');
  }
  public set partitionsNum(value: string) {
    this._partitionsNum = value;
  }
  public resetPartitionsNum() {
    this._partitionsNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionsNumInput() {
    return this._partitionsNum;
  }

  // replication_factor - computed: false, optional: true, required: false
  private _replicationFactor?: string; 
  public get replicationFactor() {
    return this.getStringAttribute('replication_factor');
  }
  public set replicationFactor(value: string) {
    this._replicationFactor = value;
  }
  public resetReplicationFactor() {
    this._replicationFactor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get replicationFactorInput() {
    return this._replicationFactor;
  }

  // slot_name - computed: false, optional: true, required: false
  private _slotName?: string; 
  public get slotName() {
    return this.getStringAttribute('slot_name');
  }
  public set slotName(value: string) {
    this._slotName = value;
  }
  public resetSlotName() {
    this._slotName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get slotNameInput() {
    return this._slotName;
  }

  // topic - computed: false, optional: true, required: false
  private _topic?: string; 
  public get topic() {
    return this.getStringAttribute('topic');
  }
  public set topic(value: string) {
    this._topic = value;
  }
  public resetTopic() {
    this._topic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicInput() {
    return this._topic;
  }

  // topic_name_format - computed: false, optional: true, required: false
  private _topicNameFormat?: string; 
  public get topicNameFormat() {
    return this.getStringAttribute('topic_name_format');
  }
  public set topicNameFormat(value: string) {
    this._topicNameFormat = value;
  }
  public resetTopicNameFormat() {
    this._topicNameFormat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicNameFormatInput() {
    return this._topicNameFormat;
  }

  // topic_policy - computed: false, optional: true, required: false
  private _topicPolicy?: string; 
  public get topicPolicy() {
    return this.getStringAttribute('topic_policy');
  }
  public set topicPolicy(value: string) {
    this._topicPolicy = value;
  }
  public resetTopicPolicy() {
    this._topicPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicPolicyInput() {
    return this._topicPolicy;
  }
}
export interface DrsJobPublicIpListStruct {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#id DrsJob#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#public_ip DrsJob#public_ip}
  */
  readonly publicIp: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#type DrsJob#type}
  */
  readonly type: string;
}

export function drsJobPublicIpListStructToTerraform(struct?: DrsJobPublicIpListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    id: cdktf.stringToTerraform(struct!.id),
    public_ip: cdktf.stringToTerraform(struct!.publicIp),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function drsJobPublicIpListStructToHclTerraform(struct?: DrsJobPublicIpListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    public_ip: {
      value: cdktf.stringToHclTerraform(struct!.publicIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DrsJobPublicIpListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DrsJobPublicIpListStruct | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._publicIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.publicIp = this._publicIp;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DrsJobPublicIpListStruct | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._id = undefined;
      this._publicIp = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._id = value.id;
      this._publicIp = value.publicIp;
      this._type = value.type;
    }
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // public_ip - computed: false, optional: false, required: true
  private _publicIp?: string; 
  public get publicIp() {
    return this.getStringAttribute('public_ip');
  }
  public set publicIp(value: string) {
    this._publicIp = value;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpInput() {
    return this._publicIp;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}

export class DrsJobPublicIpListStructList extends cdktf.ComplexList {
  public internalValue? : DrsJobPublicIpListStruct[] | cdktf.IResolvable

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
  public get(index: number): DrsJobPublicIpListStructOutputReference {
    return new DrsJobPublicIpListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DrsJobSourceDbKafkaSecurityConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#delegation_tokens DrsJob#delegation_tokens}
  */
  readonly delegationTokens?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#enable_key_store DrsJob#enable_key_store}
  */
  readonly enableKeyStore?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#endpoint_algorithm DrsJob#endpoint_algorithm}
  */
  readonly endpointAlgorithm?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#key_password DrsJob#key_password}
  */
  readonly keyPassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#key_store_key DrsJob#key_store_key}
  */
  readonly keyStoreKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#key_store_key_name DrsJob#key_store_key_name}
  */
  readonly keyStoreKeyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#key_store_password DrsJob#key_store_password}
  */
  readonly keyStorePassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#sasl_mechanism DrsJob#sasl_mechanism}
  */
  readonly saslMechanism?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#set_private_key_password DrsJob#set_private_key_password}
  */
  readonly setPrivateKeyPassword?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#trust_store_key DrsJob#trust_store_key}
  */
  readonly trustStoreKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#trust_store_key_name DrsJob#trust_store_key_name}
  */
  readonly trustStoreKeyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#trust_store_password DrsJob#trust_store_password}
  */
  readonly trustStorePassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#type DrsJob#type}
  */
  readonly type?: string;
}

export function drsJobSourceDbKafkaSecurityConfigToTerraform(struct?: DrsJobSourceDbKafkaSecurityConfigOutputReference | DrsJobSourceDbKafkaSecurityConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    delegation_tokens: cdktf.booleanToTerraform(struct!.delegationTokens),
    enable_key_store: cdktf.booleanToTerraform(struct!.enableKeyStore),
    endpoint_algorithm: cdktf.stringToTerraform(struct!.endpointAlgorithm),
    key_password: cdktf.stringToTerraform(struct!.keyPassword),
    key_store_key: cdktf.stringToTerraform(struct!.keyStoreKey),
    key_store_key_name: cdktf.stringToTerraform(struct!.keyStoreKeyName),
    key_store_password: cdktf.stringToTerraform(struct!.keyStorePassword),
    sasl_mechanism: cdktf.stringToTerraform(struct!.saslMechanism),
    set_private_key_password: cdktf.booleanToTerraform(struct!.setPrivateKeyPassword),
    trust_store_key: cdktf.stringToTerraform(struct!.trustStoreKey),
    trust_store_key_name: cdktf.stringToTerraform(struct!.trustStoreKeyName),
    trust_store_password: cdktf.stringToTerraform(struct!.trustStorePassword),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function drsJobSourceDbKafkaSecurityConfigToHclTerraform(struct?: DrsJobSourceDbKafkaSecurityConfigOutputReference | DrsJobSourceDbKafkaSecurityConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    delegation_tokens: {
      value: cdktf.booleanToHclTerraform(struct!.delegationTokens),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    enable_key_store: {
      value: cdktf.booleanToHclTerraform(struct!.enableKeyStore),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    endpoint_algorithm: {
      value: cdktf.stringToHclTerraform(struct!.endpointAlgorithm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key_password: {
      value: cdktf.stringToHclTerraform(struct!.keyPassword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key_store_key: {
      value: cdktf.stringToHclTerraform(struct!.keyStoreKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key_store_key_name: {
      value: cdktf.stringToHclTerraform(struct!.keyStoreKeyName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key_store_password: {
      value: cdktf.stringToHclTerraform(struct!.keyStorePassword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sasl_mechanism: {
      value: cdktf.stringToHclTerraform(struct!.saslMechanism),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    set_private_key_password: {
      value: cdktf.booleanToHclTerraform(struct!.setPrivateKeyPassword),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    trust_store_key: {
      value: cdktf.stringToHclTerraform(struct!.trustStoreKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    trust_store_key_name: {
      value: cdktf.stringToHclTerraform(struct!.trustStoreKeyName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    trust_store_password: {
      value: cdktf.stringToHclTerraform(struct!.trustStorePassword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DrsJobSourceDbKafkaSecurityConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DrsJobSourceDbKafkaSecurityConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._delegationTokens !== undefined) {
      hasAnyValues = true;
      internalValueResult.delegationTokens = this._delegationTokens;
    }
    if (this._enableKeyStore !== undefined) {
      hasAnyValues = true;
      internalValueResult.enableKeyStore = this._enableKeyStore;
    }
    if (this._endpointAlgorithm !== undefined) {
      hasAnyValues = true;
      internalValueResult.endpointAlgorithm = this._endpointAlgorithm;
    }
    if (this._keyPassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.keyPassword = this._keyPassword;
    }
    if (this._keyStoreKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.keyStoreKey = this._keyStoreKey;
    }
    if (this._keyStoreKeyName !== undefined) {
      hasAnyValues = true;
      internalValueResult.keyStoreKeyName = this._keyStoreKeyName;
    }
    if (this._keyStorePassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.keyStorePassword = this._keyStorePassword;
    }
    if (this._saslMechanism !== undefined) {
      hasAnyValues = true;
      internalValueResult.saslMechanism = this._saslMechanism;
    }
    if (this._setPrivateKeyPassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.setPrivateKeyPassword = this._setPrivateKeyPassword;
    }
    if (this._trustStoreKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.trustStoreKey = this._trustStoreKey;
    }
    if (this._trustStoreKeyName !== undefined) {
      hasAnyValues = true;
      internalValueResult.trustStoreKeyName = this._trustStoreKeyName;
    }
    if (this._trustStorePassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.trustStorePassword = this._trustStorePassword;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DrsJobSourceDbKafkaSecurityConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._delegationTokens = undefined;
      this._enableKeyStore = undefined;
      this._endpointAlgorithm = undefined;
      this._keyPassword = undefined;
      this._keyStoreKey = undefined;
      this._keyStoreKeyName = undefined;
      this._keyStorePassword = undefined;
      this._saslMechanism = undefined;
      this._setPrivateKeyPassword = undefined;
      this._trustStoreKey = undefined;
      this._trustStoreKeyName = undefined;
      this._trustStorePassword = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._delegationTokens = value.delegationTokens;
      this._enableKeyStore = value.enableKeyStore;
      this._endpointAlgorithm = value.endpointAlgorithm;
      this._keyPassword = value.keyPassword;
      this._keyStoreKey = value.keyStoreKey;
      this._keyStoreKeyName = value.keyStoreKeyName;
      this._keyStorePassword = value.keyStorePassword;
      this._saslMechanism = value.saslMechanism;
      this._setPrivateKeyPassword = value.setPrivateKeyPassword;
      this._trustStoreKey = value.trustStoreKey;
      this._trustStoreKeyName = value.trustStoreKeyName;
      this._trustStorePassword = value.trustStorePassword;
      this._type = value.type;
    }
  }

  // delegation_tokens - computed: false, optional: true, required: false
  private _delegationTokens?: boolean | cdktf.IResolvable; 
  public get delegationTokens() {
    return this.getBooleanAttribute('delegation_tokens');
  }
  public set delegationTokens(value: boolean | cdktf.IResolvable) {
    this._delegationTokens = value;
  }
  public resetDelegationTokens() {
    this._delegationTokens = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get delegationTokensInput() {
    return this._delegationTokens;
  }

  // enable_key_store - computed: false, optional: true, required: false
  private _enableKeyStore?: boolean | cdktf.IResolvable; 
  public get enableKeyStore() {
    return this.getBooleanAttribute('enable_key_store');
  }
  public set enableKeyStore(value: boolean | cdktf.IResolvable) {
    this._enableKeyStore = value;
  }
  public resetEnableKeyStore() {
    this._enableKeyStore = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableKeyStoreInput() {
    return this._enableKeyStore;
  }

  // endpoint_algorithm - computed: false, optional: true, required: false
  private _endpointAlgorithm?: string; 
  public get endpointAlgorithm() {
    return this.getStringAttribute('endpoint_algorithm');
  }
  public set endpointAlgorithm(value: string) {
    this._endpointAlgorithm = value;
  }
  public resetEndpointAlgorithm() {
    this._endpointAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointAlgorithmInput() {
    return this._endpointAlgorithm;
  }

  // key_password - computed: false, optional: true, required: false
  private _keyPassword?: string; 
  public get keyPassword() {
    return this.getStringAttribute('key_password');
  }
  public set keyPassword(value: string) {
    this._keyPassword = value;
  }
  public resetKeyPassword() {
    this._keyPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyPasswordInput() {
    return this._keyPassword;
  }

  // key_store_key - computed: false, optional: true, required: false
  private _keyStoreKey?: string; 
  public get keyStoreKey() {
    return this.getStringAttribute('key_store_key');
  }
  public set keyStoreKey(value: string) {
    this._keyStoreKey = value;
  }
  public resetKeyStoreKey() {
    this._keyStoreKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyStoreKeyInput() {
    return this._keyStoreKey;
  }

  // key_store_key_name - computed: false, optional: true, required: false
  private _keyStoreKeyName?: string; 
  public get keyStoreKeyName() {
    return this.getStringAttribute('key_store_key_name');
  }
  public set keyStoreKeyName(value: string) {
    this._keyStoreKeyName = value;
  }
  public resetKeyStoreKeyName() {
    this._keyStoreKeyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyStoreKeyNameInput() {
    return this._keyStoreKeyName;
  }

  // key_store_password - computed: false, optional: true, required: false
  private _keyStorePassword?: string; 
  public get keyStorePassword() {
    return this.getStringAttribute('key_store_password');
  }
  public set keyStorePassword(value: string) {
    this._keyStorePassword = value;
  }
  public resetKeyStorePassword() {
    this._keyStorePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyStorePasswordInput() {
    return this._keyStorePassword;
  }

  // sasl_mechanism - computed: false, optional: true, required: false
  private _saslMechanism?: string; 
  public get saslMechanism() {
    return this.getStringAttribute('sasl_mechanism');
  }
  public set saslMechanism(value: string) {
    this._saslMechanism = value;
  }
  public resetSaslMechanism() {
    this._saslMechanism = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get saslMechanismInput() {
    return this._saslMechanism;
  }

  // set_private_key_password - computed: false, optional: true, required: false
  private _setPrivateKeyPassword?: boolean | cdktf.IResolvable; 
  public get setPrivateKeyPassword() {
    return this.getBooleanAttribute('set_private_key_password');
  }
  public set setPrivateKeyPassword(value: boolean | cdktf.IResolvable) {
    this._setPrivateKeyPassword = value;
  }
  public resetSetPrivateKeyPassword() {
    this._setPrivateKeyPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get setPrivateKeyPasswordInput() {
    return this._setPrivateKeyPassword;
  }

  // trust_store_key - computed: false, optional: true, required: false
  private _trustStoreKey?: string; 
  public get trustStoreKey() {
    return this.getStringAttribute('trust_store_key');
  }
  public set trustStoreKey(value: string) {
    this._trustStoreKey = value;
  }
  public resetTrustStoreKey() {
    this._trustStoreKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trustStoreKeyInput() {
    return this._trustStoreKey;
  }

  // trust_store_key_name - computed: false, optional: true, required: false
  private _trustStoreKeyName?: string; 
  public get trustStoreKeyName() {
    return this.getStringAttribute('trust_store_key_name');
  }
  public set trustStoreKeyName(value: string) {
    this._trustStoreKeyName = value;
  }
  public resetTrustStoreKeyName() {
    this._trustStoreKeyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trustStoreKeyNameInput() {
    return this._trustStoreKeyName;
  }

  // trust_store_password - computed: false, optional: true, required: false
  private _trustStorePassword?: string; 
  public get trustStorePassword() {
    return this.getStringAttribute('trust_store_password');
  }
  public set trustStorePassword(value: string) {
    this._trustStorePassword = value;
  }
  public resetTrustStorePassword() {
    this._trustStorePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trustStorePasswordInput() {
    return this._trustStorePassword;
  }

  // type - computed: false, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface DrsJobSourceDb {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#engine_type DrsJob#engine_type}
  */
  readonly engineType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#instance_id DrsJob#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ip DrsJob#ip}
  */
  readonly ip: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#name DrsJob#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#password DrsJob#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#port DrsJob#port}
  */
  readonly port?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#region DrsJob#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_cert_check_sum DrsJob#ssl_cert_check_sum}
  */
  readonly sslCertCheckSum?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_cert_key DrsJob#ssl_cert_key}
  */
  readonly sslCertKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_cert_name DrsJob#ssl_cert_name}
  */
  readonly sslCertName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_cert_password DrsJob#ssl_cert_password}
  */
  readonly sslCertPassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#ssl_enabled DrsJob#ssl_enabled}
  */
  readonly sslEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#subnet_id DrsJob#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#user DrsJob#user}
  */
  readonly user?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#vpc_id DrsJob#vpc_id}
  */
  readonly vpcId?: string;
  /**
  * kafka_security_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#kafka_security_config DrsJob#kafka_security_config}
  */
  readonly kafkaSecurityConfig?: DrsJobSourceDbKafkaSecurityConfig;
}

export function drsJobSourceDbToTerraform(struct?: DrsJobSourceDbOutputReference | DrsJobSourceDb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    engine_type: cdktf.stringToTerraform(struct!.engineType),
    instance_id: cdktf.stringToTerraform(struct!.instanceId),
    ip: cdktf.stringToTerraform(struct!.ip),
    name: cdktf.stringToTerraform(struct!.name),
    password: cdktf.stringToTerraform(struct!.password),
    port: cdktf.numberToTerraform(struct!.port),
    region: cdktf.stringToTerraform(struct!.region),
    ssl_cert_check_sum: cdktf.stringToTerraform(struct!.sslCertCheckSum),
    ssl_cert_key: cdktf.stringToTerraform(struct!.sslCertKey),
    ssl_cert_name: cdktf.stringToTerraform(struct!.sslCertName),
    ssl_cert_password: cdktf.stringToTerraform(struct!.sslCertPassword),
    ssl_enabled: cdktf.booleanToTerraform(struct!.sslEnabled),
    subnet_id: cdktf.stringToTerraform(struct!.subnetId),
    user: cdktf.stringToTerraform(struct!.user),
    vpc_id: cdktf.stringToTerraform(struct!.vpcId),
    kafka_security_config: drsJobSourceDbKafkaSecurityConfigToTerraform(struct!.kafkaSecurityConfig),
  }
}


export function drsJobSourceDbToHclTerraform(struct?: DrsJobSourceDbOutputReference | DrsJobSourceDb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    engine_type: {
      value: cdktf.stringToHclTerraform(struct!.engineType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    instance_id: {
      value: cdktf.stringToHclTerraform(struct!.instanceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ip: {
      value: cdktf.stringToHclTerraform(struct!.ip),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_cert_check_sum: {
      value: cdktf.stringToHclTerraform(struct!.sslCertCheckSum),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_cert_key: {
      value: cdktf.stringToHclTerraform(struct!.sslCertKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_cert_name: {
      value: cdktf.stringToHclTerraform(struct!.sslCertName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_cert_password: {
      value: cdktf.stringToHclTerraform(struct!.sslCertPassword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssl_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.sslEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    subnet_id: {
      value: cdktf.stringToHclTerraform(struct!.subnetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user: {
      value: cdktf.stringToHclTerraform(struct!.user),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vpc_id: {
      value: cdktf.stringToHclTerraform(struct!.vpcId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    kafka_security_config: {
      value: drsJobSourceDbKafkaSecurityConfigToHclTerraform(struct!.kafkaSecurityConfig),
      isBlock: true,
      type: "list",
      storageClassType: "DrsJobSourceDbKafkaSecurityConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DrsJobSourceDbOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DrsJobSourceDb | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._engineType !== undefined) {
      hasAnyValues = true;
      internalValueResult.engineType = this._engineType;
    }
    if (this._instanceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceId = this._instanceId;
    }
    if (this._ip !== undefined) {
      hasAnyValues = true;
      internalValueResult.ip = this._ip;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._sslCertCheckSum !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslCertCheckSum = this._sslCertCheckSum;
    }
    if (this._sslCertKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslCertKey = this._sslCertKey;
    }
    if (this._sslCertName !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslCertName = this._sslCertName;
    }
    if (this._sslCertPassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslCertPassword = this._sslCertPassword;
    }
    if (this._sslEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslEnabled = this._sslEnabled;
    }
    if (this._subnetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnetId = this._subnetId;
    }
    if (this._user !== undefined) {
      hasAnyValues = true;
      internalValueResult.user = this._user;
    }
    if (this._vpcId !== undefined) {
      hasAnyValues = true;
      internalValueResult.vpcId = this._vpcId;
    }
    if (this._kafkaSecurityConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.kafkaSecurityConfig = this._kafkaSecurityConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DrsJobSourceDb | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._engineType = undefined;
      this._instanceId = undefined;
      this._ip = undefined;
      this._name = undefined;
      this._password = undefined;
      this._port = undefined;
      this._region = undefined;
      this._sslCertCheckSum = undefined;
      this._sslCertKey = undefined;
      this._sslCertName = undefined;
      this._sslCertPassword = undefined;
      this._sslEnabled = undefined;
      this._subnetId = undefined;
      this._user = undefined;
      this._vpcId = undefined;
      this._kafkaSecurityConfig.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._engineType = value.engineType;
      this._instanceId = value.instanceId;
      this._ip = value.ip;
      this._name = value.name;
      this._password = value.password;
      this._port = value.port;
      this._region = value.region;
      this._sslCertCheckSum = value.sslCertCheckSum;
      this._sslCertKey = value.sslCertKey;
      this._sslCertName = value.sslCertName;
      this._sslCertPassword = value.sslCertPassword;
      this._sslEnabled = value.sslEnabled;
      this._subnetId = value.subnetId;
      this._user = value.user;
      this._vpcId = value.vpcId;
      this._kafkaSecurityConfig.internalValue = value.kafkaSecurityConfig;
    }
  }

  // engine_type - computed: false, optional: false, required: true
  private _engineType?: string; 
  public get engineType() {
    return this.getStringAttribute('engine_type');
  }
  public set engineType(value: string) {
    this._engineType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get engineTypeInput() {
    return this._engineType;
  }

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // ip - computed: false, optional: false, required: true
  private _ip?: string; 
  public get ip() {
    return this.getStringAttribute('ip');
  }
  public set ip(value: string) {
    this._ip = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ipInput() {
    return this._ip;
  }

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // port - computed: false, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
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

  // security_group_id - computed: true, optional: false, required: false
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }

  // ssl_cert_check_sum - computed: false, optional: true, required: false
  private _sslCertCheckSum?: string; 
  public get sslCertCheckSum() {
    return this.getStringAttribute('ssl_cert_check_sum');
  }
  public set sslCertCheckSum(value: string) {
    this._sslCertCheckSum = value;
  }
  public resetSslCertCheckSum() {
    this._sslCertCheckSum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslCertCheckSumInput() {
    return this._sslCertCheckSum;
  }

  // ssl_cert_key - computed: false, optional: true, required: false
  private _sslCertKey?: string; 
  public get sslCertKey() {
    return this.getStringAttribute('ssl_cert_key');
  }
  public set sslCertKey(value: string) {
    this._sslCertKey = value;
  }
  public resetSslCertKey() {
    this._sslCertKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslCertKeyInput() {
    return this._sslCertKey;
  }

  // ssl_cert_name - computed: false, optional: true, required: false
  private _sslCertName?: string; 
  public get sslCertName() {
    return this.getStringAttribute('ssl_cert_name');
  }
  public set sslCertName(value: string) {
    this._sslCertName = value;
  }
  public resetSslCertName() {
    this._sslCertName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslCertNameInput() {
    return this._sslCertName;
  }

  // ssl_cert_password - computed: false, optional: true, required: false
  private _sslCertPassword?: string; 
  public get sslCertPassword() {
    return this.getStringAttribute('ssl_cert_password');
  }
  public set sslCertPassword(value: string) {
    this._sslCertPassword = value;
  }
  public resetSslCertPassword() {
    this._sslCertPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslCertPasswordInput() {
    return this._sslCertPassword;
  }

  // ssl_enabled - computed: false, optional: true, required: false
  private _sslEnabled?: boolean | cdktf.IResolvable; 
  public get sslEnabled() {
    return this.getBooleanAttribute('ssl_enabled');
  }
  public set sslEnabled(value: boolean | cdktf.IResolvable) {
    this._sslEnabled = value;
  }
  public resetSslEnabled() {
    this._sslEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslEnabledInput() {
    return this._sslEnabled;
  }

  // subnet_id - computed: false, optional: true, required: false
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  public resetSubnetId() {
    this._subnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
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

  // vpc_id - computed: true, optional: true, required: false
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  public resetVpcId() {
    this._vpcId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // kafka_security_config - computed: false, optional: true, required: false
  private _kafkaSecurityConfig = new DrsJobSourceDbKafkaSecurityConfigOutputReference(this, "kafka_security_config");
  public get kafkaSecurityConfig() {
    return this._kafkaSecurityConfig;
  }
  public putKafkaSecurityConfig(value: DrsJobSourceDbKafkaSecurityConfig) {
    this._kafkaSecurityConfig.internalValue = value;
  }
  public resetKafkaSecurityConfig() {
    this._kafkaSecurityConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaSecurityConfigInput() {
    return this._kafkaSecurityConfig.internalValue;
  }
}
export interface DrsJobTables {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#database DrsJob#database}
  */
  readonly database: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#table_names DrsJob#table_names}
  */
  readonly tableNames: string[];
}

export function drsJobTablesToTerraform(struct?: DrsJobTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    database: cdktf.stringToTerraform(struct!.database),
    table_names: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.tableNames),
  }
}


export function drsJobTablesToHclTerraform(struct?: DrsJobTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    database: {
      value: cdktf.stringToHclTerraform(struct!.database),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    table_names: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.tableNames),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DrsJobTablesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DrsJobTables | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._database !== undefined) {
      hasAnyValues = true;
      internalValueResult.database = this._database;
    }
    if (this._tableNames !== undefined) {
      hasAnyValues = true;
      internalValueResult.tableNames = this._tableNames;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DrsJobTables | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._database = undefined;
      this._tableNames = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._database = value.database;
      this._tableNames = value.tableNames;
    }
  }

  // database - computed: false, optional: false, required: true
  private _database?: string; 
  public get database() {
    return this.getStringAttribute('database');
  }
  public set database(value: string) {
    this._database = value;
  }
  // Temporarily expose input value. Use with caution.
  public get databaseInput() {
    return this._database;
  }

  // table_names - computed: false, optional: false, required: true
  private _tableNames?: string[]; 
  public get tableNames() {
    return cdktf.Fn.tolist(this.getListAttribute('table_names'));
  }
  public set tableNames(value: string[]) {
    this._tableNames = value;
  }
  // Temporarily expose input value. Use with caution.
  public get tableNamesInput() {
    return this._tableNames;
  }
}

export class DrsJobTablesList extends cdktf.ComplexList {
  public internalValue? : DrsJobTables[] | cdktf.IResolvable

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
  public get(index: number): DrsJobTablesOutputReference {
    return new DrsJobTablesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DrsJobTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#create DrsJob#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#delete DrsJob#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#update DrsJob#update}
  */
  readonly update?: string;
}

export function drsJobTimeoutsToTerraform(struct?: DrsJobTimeouts | cdktf.IResolvable): any {
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


export function drsJobTimeoutsToHclTerraform(struct?: DrsJobTimeouts | cdktf.IResolvable): any {
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

export class DrsJobTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DrsJobTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DrsJobTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job huaweicloud_drs_job}
*/
export class DrsJob extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_drs_job";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DrsJob resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DrsJob to import
  * @param importFromId The id of the existing DrsJob that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DrsJob to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_drs_job", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/drs_job huaweicloud_drs_job} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DrsJobConfig
  */
  public constructor(scope: Construct, id: string, config: DrsJobConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_drs_job',
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
    this._action = config.action;
    this._autoRenew = config.autoRenew;
    this._chargingMode = config.chargingMode;
    this._databases = config.databases;
    this._description = config.description;
    this._destinationDbReadnoly = config.destinationDbReadnoly;
    this._direction = config.direction;
    this._engineType = config.engineType;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._expiredDays = config.expiredDays;
    this._forceDestroy = config.forceDestroy;
    this._id = config.id;
    this._isOpenFastClean = config.isOpenFastClean;
    this._isSyncReEdit = config.isSyncReEdit;
    this._masterAz = config.masterAz;
    this._migrateDefiner = config.migrateDefiner;
    this._migrationType = config.migrationType;
    this._multiWrite = config.multiWrite;
    this._name = config.name;
    this._netType = config.netType;
    this._nodeType = config.nodeType;
    this._pauseMode = config.pauseMode;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._region = config.region;
    this._slaveAz = config.slaveAz;
    this._startTime = config.startTime;
    this._tags = config.tags;
    this._type = config.type;
    this._alarmNotify.internalValue = config.alarmNotify;
    this._destinationDb.internalValue = config.destinationDb;
    this._limitSpeed.internalValue = config.limitSpeed;
    this._policyConfig.internalValue = config.policyConfig;
    this._publicIpList.internalValue = config.publicIpList;
    this._sourceDb.internalValue = config.sourceDb;
    this._tables.internalValue = config.tables;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action - computed: false, optional: true, required: false
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  public resetAction() {
    this._action = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
  }

  // auto_renew - computed: false, optional: true, required: false
  private _autoRenew?: string; 
  public get autoRenew() {
    return this.getStringAttribute('auto_renew');
  }
  public set autoRenew(value: string) {
    this._autoRenew = value;
  }
  public resetAutoRenew() {
    this._autoRenew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoRenewInput() {
    return this._autoRenew;
  }

  // charging_mode - computed: true, optional: true, required: false
  private _chargingMode?: string; 
  public get chargingMode() {
    return this.getStringAttribute('charging_mode');
  }
  public set chargingMode(value: string) {
    this._chargingMode = value;
  }
  public resetChargingMode() {
    this._chargingMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chargingModeInput() {
    return this._chargingMode;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // databases - computed: false, optional: true, required: false
  private _databases?: string[]; 
  public get databases() {
    return cdktf.Fn.tolist(this.getListAttribute('databases'));
  }
  public set databases(value: string[]) {
    this._databases = value;
  }
  public resetDatabases() {
    this._databases = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get databasesInput() {
    return this._databases;
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

  // destination_db_readnoly - computed: false, optional: true, required: false
  private _destinationDbReadnoly?: boolean | cdktf.IResolvable; 
  public get destinationDbReadnoly() {
    return this.getBooleanAttribute('destination_db_readnoly');
  }
  public set destinationDbReadnoly(value: boolean | cdktf.IResolvable) {
    this._destinationDbReadnoly = value;
  }
  public resetDestinationDbReadnoly() {
    this._destinationDbReadnoly = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationDbReadnolyInput() {
    return this._destinationDbReadnoly;
  }

  // direction - computed: false, optional: false, required: true
  private _direction?: string; 
  public get direction() {
    return this.getStringAttribute('direction');
  }
  public set direction(value: string) {
    this._direction = value;
  }
  // Temporarily expose input value. Use with caution.
  public get directionInput() {
    return this._direction;
  }

  // engine_type - computed: false, optional: false, required: true
  private _engineType?: string; 
  public get engineType() {
    return this.getStringAttribute('engine_type');
  }
  public set engineType(value: string) {
    this._engineType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get engineTypeInput() {
    return this._engineType;
  }

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

  // expired_days - computed: false, optional: true, required: false
  private _expiredDays?: number; 
  public get expiredDays() {
    return this.getNumberAttribute('expired_days');
  }
  public set expiredDays(value: number) {
    this._expiredDays = value;
  }
  public resetExpiredDays() {
    this._expiredDays = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expiredDaysInput() {
    return this._expiredDays;
  }

  // force_destroy - computed: false, optional: true, required: false
  private _forceDestroy?: boolean | cdktf.IResolvable; 
  public get forceDestroy() {
    return this.getBooleanAttribute('force_destroy');
  }
  public set forceDestroy(value: boolean | cdktf.IResolvable) {
    this._forceDestroy = value;
  }
  public resetForceDestroy() {
    this._forceDestroy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forceDestroyInput() {
    return this._forceDestroy;
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

  // is_open_fast_clean - computed: true, optional: true, required: false
  private _isOpenFastClean?: boolean | cdktf.IResolvable; 
  public get isOpenFastClean() {
    return this.getBooleanAttribute('is_open_fast_clean');
  }
  public set isOpenFastClean(value: boolean | cdktf.IResolvable) {
    this._isOpenFastClean = value;
  }
  public resetIsOpenFastClean() {
    this._isOpenFastClean = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isOpenFastCleanInput() {
    return this._isOpenFastClean;
  }

  // is_sync_re_edit - computed: false, optional: true, required: false
  private _isSyncReEdit?: boolean | cdktf.IResolvable; 
  public get isSyncReEdit() {
    return this.getBooleanAttribute('is_sync_re_edit');
  }
  public set isSyncReEdit(value: boolean | cdktf.IResolvable) {
    this._isSyncReEdit = value;
  }
  public resetIsSyncReEdit() {
    this._isSyncReEdit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isSyncReEditInput() {
    return this._isSyncReEdit;
  }

  // master_az - computed: false, optional: true, required: false
  private _masterAz?: string; 
  public get masterAz() {
    return this.getStringAttribute('master_az');
  }
  public set masterAz(value: string) {
    this._masterAz = value;
  }
  public resetMasterAz() {
    this._masterAz = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get masterAzInput() {
    return this._masterAz;
  }

  // master_job_id - computed: true, optional: false, required: false
  public get masterJobId() {
    return this.getStringAttribute('master_job_id');
  }

  // migrate_definer - computed: false, optional: true, required: false
  private _migrateDefiner?: boolean | cdktf.IResolvable; 
  public get migrateDefiner() {
    return this.getBooleanAttribute('migrate_definer');
  }
  public set migrateDefiner(value: boolean | cdktf.IResolvable) {
    this._migrateDefiner = value;
  }
  public resetMigrateDefiner() {
    this._migrateDefiner = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get migrateDefinerInput() {
    return this._migrateDefiner;
  }

  // migration_type - computed: false, optional: true, required: false
  private _migrationType?: string; 
  public get migrationType() {
    return this.getStringAttribute('migration_type');
  }
  public set migrationType(value: string) {
    this._migrationType = value;
  }
  public resetMigrationType() {
    this._migrationType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get migrationTypeInput() {
    return this._migrationType;
  }

  // multi_write - computed: false, optional: true, required: false
  private _multiWrite?: boolean | cdktf.IResolvable; 
  public get multiWrite() {
    return this.getBooleanAttribute('multi_write');
  }
  public set multiWrite(value: boolean | cdktf.IResolvable) {
    this._multiWrite = value;
  }
  public resetMultiWrite() {
    this._multiWrite = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get multiWriteInput() {
    return this._multiWrite;
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

  // net_type - computed: false, optional: true, required: false
  private _netType?: string; 
  public get netType() {
    return this.getStringAttribute('net_type');
  }
  public set netType(value: string) {
    this._netType = value;
  }
  public resetNetType() {
    this._netType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get netTypeInput() {
    return this._netType;
  }

  // node_type - computed: false, optional: true, required: false
  private _nodeType?: string; 
  public get nodeType() {
    return this.getStringAttribute('node_type');
  }
  public set nodeType(value: string) {
    this._nodeType = value;
  }
  public resetNodeType() {
    this._nodeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeTypeInput() {
    return this._nodeType;
  }

  // order_id - computed: true, optional: false, required: false
  public get orderId() {
    return this.getStringAttribute('order_id');
  }

  // original_job_direction - computed: true, optional: false, required: false
  public get originalJobDirection() {
    return this.getStringAttribute('original_job_direction');
  }

  // pause_mode - computed: false, optional: true, required: false
  private _pauseMode?: string; 
  public get pauseMode() {
    return this.getStringAttribute('pause_mode');
  }
  public set pauseMode(value: string) {
    this._pauseMode = value;
  }
  public resetPauseMode() {
    this._pauseMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pauseModeInput() {
    return this._pauseMode;
  }

  // period - computed: false, optional: true, required: false
  private _period?: number; 
  public get period() {
    return this.getNumberAttribute('period');
  }
  public set period(value: number) {
    this._period = value;
  }
  public resetPeriod() {
    this._period = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodInput() {
    return this._period;
  }

  // period_unit - computed: false, optional: true, required: false
  private _periodUnit?: string; 
  public get periodUnit() {
    return this.getStringAttribute('period_unit');
  }
  public set periodUnit(value: string) {
    this._periodUnit = value;
  }
  public resetPeriodUnit() {
    this._periodUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodUnitInput() {
    return this._periodUnit;
  }

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }

  // progress - computed: true, optional: false, required: false
  public get progress() {
    return this.getStringAttribute('progress');
  }

  // public_ip - computed: true, optional: false, required: false
  public get publicIp() {
    return this.getStringAttribute('public_ip');
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

  // security_group_id - computed: true, optional: false, required: false
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }

  // slave_az - computed: false, optional: true, required: false
  private _slaveAz?: string; 
  public get slaveAz() {
    return this.getStringAttribute('slave_az');
  }
  public set slaveAz(value: string) {
    this._slaveAz = value;
  }
  public resetSlaveAz() {
    this._slaveAz = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get slaveAzInput() {
    return this._slaveAz;
  }

  // slave_job_id - computed: true, optional: false, required: false
  public get slaveJobId() {
    return this.getStringAttribute('slave_job_id');
  }

  // start_time - computed: false, optional: true, required: false
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  public resetStartTime() {
    this._startTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subnet_id - computed: true, optional: false, required: false
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
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

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // vpc_id - computed: true, optional: false, required: false
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }

  // alarm_notify - computed: false, optional: true, required: false
  private _alarmNotify = new DrsJobAlarmNotifyOutputReference(this, "alarm_notify");
  public get alarmNotify() {
    return this._alarmNotify;
  }
  public putAlarmNotify(value: DrsJobAlarmNotify) {
    this._alarmNotify.internalValue = value;
  }
  public resetAlarmNotify() {
    this._alarmNotify.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmNotifyInput() {
    return this._alarmNotify.internalValue;
  }

  // destination_db - computed: false, optional: false, required: true
  private _destinationDb = new DrsJobDestinationDbOutputReference(this, "destination_db");
  public get destinationDb() {
    return this._destinationDb;
  }
  public putDestinationDb(value: DrsJobDestinationDb) {
    this._destinationDb.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationDbInput() {
    return this._destinationDb.internalValue;
  }

  // limit_speed - computed: false, optional: true, required: false
  private _limitSpeed = new DrsJobLimitSpeedList(this, "limit_speed", true);
  public get limitSpeed() {
    return this._limitSpeed;
  }
  public putLimitSpeed(value: DrsJobLimitSpeed[] | cdktf.IResolvable) {
    this._limitSpeed.internalValue = value;
  }
  public resetLimitSpeed() {
    this._limitSpeed.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get limitSpeedInput() {
    return this._limitSpeed.internalValue;
  }

  // policy_config - computed: false, optional: true, required: false
  private _policyConfig = new DrsJobPolicyConfigOutputReference(this, "policy_config");
  public get policyConfig() {
    return this._policyConfig;
  }
  public putPolicyConfig(value: DrsJobPolicyConfig) {
    this._policyConfig.internalValue = value;
  }
  public resetPolicyConfig() {
    this._policyConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyConfigInput() {
    return this._policyConfig.internalValue;
  }

  // public_ip_list - computed: false, optional: true, required: false
  private _publicIpList = new DrsJobPublicIpListStructList(this, "public_ip_list", false);
  public get publicIpList() {
    return this._publicIpList;
  }
  public putPublicIpList(value: DrsJobPublicIpListStruct[] | cdktf.IResolvable) {
    this._publicIpList.internalValue = value;
  }
  public resetPublicIpList() {
    this._publicIpList.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpListInput() {
    return this._publicIpList.internalValue;
  }

  // source_db - computed: false, optional: false, required: true
  private _sourceDb = new DrsJobSourceDbOutputReference(this, "source_db");
  public get sourceDb() {
    return this._sourceDb;
  }
  public putSourceDb(value: DrsJobSourceDb) {
    this._sourceDb.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceDbInput() {
    return this._sourceDb.internalValue;
  }

  // tables - computed: false, optional: true, required: false
  private _tables = new DrsJobTablesList(this, "tables", true);
  public get tables() {
    return this._tables;
  }
  public putTables(value: DrsJobTables[] | cdktf.IResolvable) {
    this._tables.internalValue = value;
  }
  public resetTables() {
    this._tables.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tablesInput() {
    return this._tables.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DrsJobTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DrsJobTimeouts) {
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
      action: cdktf.stringToTerraform(this._action),
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      databases: cdktf.listMapper(cdktf.stringToTerraform, false)(this._databases),
      description: cdktf.stringToTerraform(this._description),
      destination_db_readnoly: cdktf.booleanToTerraform(this._destinationDbReadnoly),
      direction: cdktf.stringToTerraform(this._direction),
      engine_type: cdktf.stringToTerraform(this._engineType),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      expired_days: cdktf.numberToTerraform(this._expiredDays),
      force_destroy: cdktf.booleanToTerraform(this._forceDestroy),
      id: cdktf.stringToTerraform(this._id),
      is_open_fast_clean: cdktf.booleanToTerraform(this._isOpenFastClean),
      is_sync_re_edit: cdktf.booleanToTerraform(this._isSyncReEdit),
      master_az: cdktf.stringToTerraform(this._masterAz),
      migrate_definer: cdktf.booleanToTerraform(this._migrateDefiner),
      migration_type: cdktf.stringToTerraform(this._migrationType),
      multi_write: cdktf.booleanToTerraform(this._multiWrite),
      name: cdktf.stringToTerraform(this._name),
      net_type: cdktf.stringToTerraform(this._netType),
      node_type: cdktf.stringToTerraform(this._nodeType),
      pause_mode: cdktf.stringToTerraform(this._pauseMode),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      region: cdktf.stringToTerraform(this._region),
      slave_az: cdktf.stringToTerraform(this._slaveAz),
      start_time: cdktf.stringToTerraform(this._startTime),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      type: cdktf.stringToTerraform(this._type),
      alarm_notify: drsJobAlarmNotifyToTerraform(this._alarmNotify.internalValue),
      destination_db: drsJobDestinationDbToTerraform(this._destinationDb.internalValue),
      limit_speed: cdktf.listMapper(drsJobLimitSpeedToTerraform, true)(this._limitSpeed.internalValue),
      policy_config: drsJobPolicyConfigToTerraform(this._policyConfig.internalValue),
      public_ip_list: cdktf.listMapper(drsJobPublicIpListStructToTerraform, true)(this._publicIpList.internalValue),
      source_db: drsJobSourceDbToTerraform(this._sourceDb.internalValue),
      tables: cdktf.listMapper(drsJobTablesToTerraform, true)(this._tables.internalValue),
      timeouts: drsJobTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      action: {
        value: cdktf.stringToHclTerraform(this._action),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auto_renew: {
        value: cdktf.stringToHclTerraform(this._autoRenew),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      databases: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._databases),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_db_readnoly: {
        value: cdktf.booleanToHclTerraform(this._destinationDbReadnoly),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      direction: {
        value: cdktf.stringToHclTerraform(this._direction),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      engine_type: {
        value: cdktf.stringToHclTerraform(this._engineType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      expired_days: {
        value: cdktf.numberToHclTerraform(this._expiredDays),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      force_destroy: {
        value: cdktf.booleanToHclTerraform(this._forceDestroy),
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
      is_open_fast_clean: {
        value: cdktf.booleanToHclTerraform(this._isOpenFastClean),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      is_sync_re_edit: {
        value: cdktf.booleanToHclTerraform(this._isSyncReEdit),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      master_az: {
        value: cdktf.stringToHclTerraform(this._masterAz),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      migrate_definer: {
        value: cdktf.booleanToHclTerraform(this._migrateDefiner),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      migration_type: {
        value: cdktf.stringToHclTerraform(this._migrationType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      multi_write: {
        value: cdktf.booleanToHclTerraform(this._multiWrite),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      net_type: {
        value: cdktf.stringToHclTerraform(this._netType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      node_type: {
        value: cdktf.stringToHclTerraform(this._nodeType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      pause_mode: {
        value: cdktf.stringToHclTerraform(this._pauseMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      period: {
        value: cdktf.numberToHclTerraform(this._period),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      period_unit: {
        value: cdktf.stringToHclTerraform(this._periodUnit),
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
      slave_az: {
        value: cdktf.stringToHclTerraform(this._slaveAz),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      start_time: {
        value: cdktf.stringToHclTerraform(this._startTime),
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
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      alarm_notify: {
        value: drsJobAlarmNotifyToHclTerraform(this._alarmNotify.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DrsJobAlarmNotifyList",
      },
      destination_db: {
        value: drsJobDestinationDbToHclTerraform(this._destinationDb.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DrsJobDestinationDbList",
      },
      limit_speed: {
        value: cdktf.listMapperHcl(drsJobLimitSpeedToHclTerraform, true)(this._limitSpeed.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "DrsJobLimitSpeedList",
      },
      policy_config: {
        value: drsJobPolicyConfigToHclTerraform(this._policyConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DrsJobPolicyConfigList",
      },
      public_ip_list: {
        value: cdktf.listMapperHcl(drsJobPublicIpListStructToHclTerraform, true)(this._publicIpList.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DrsJobPublicIpListStructList",
      },
      source_db: {
        value: drsJobSourceDbToHclTerraform(this._sourceDb.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DrsJobSourceDbList",
      },
      tables: {
        value: cdktf.listMapperHcl(drsJobTablesToHclTerraform, true)(this._tables.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "DrsJobTablesList",
      },
      timeouts: {
        value: drsJobTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DrsJobTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface OmsMigrationTaskConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#description OmsMigrationTask#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#enable_failed_object_recording OmsMigrationTask#enable_failed_object_recording}
  */
  readonly enableFailedObjectRecording?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#enable_kms OmsMigrationTask#enable_kms}
  */
  readonly enableKms?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#enable_restore OmsMigrationTask#enable_restore}
  */
  readonly enableRestore?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#id OmsMigrationTask#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#migrate_since OmsMigrationTask#migrate_since}
  */
  readonly migrateSince?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#region OmsMigrationTask#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#start_task OmsMigrationTask#start_task}
  */
  readonly startTask?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#type OmsMigrationTask#type}
  */
  readonly type: string;
  /**
  * bandwidth_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#bandwidth_policy OmsMigrationTask#bandwidth_policy}
  */
  readonly bandwidthPolicy?: OmsMigrationTaskBandwidthPolicy[] | cdktf.IResolvable;
  /**
  * destination_object block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#destination_object OmsMigrationTask#destination_object}
  */
  readonly destinationObject: OmsMigrationTaskDestinationObject;
  /**
  * smn_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#smn_config OmsMigrationTask#smn_config}
  */
  readonly smnConfig?: OmsMigrationTaskSmnConfig;
  /**
  * source_cdn block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#source_cdn OmsMigrationTask#source_cdn}
  */
  readonly sourceCdn?: OmsMigrationTaskSourceCdn;
  /**
  * source_object block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#source_object OmsMigrationTask#source_object}
  */
  readonly sourceObject: OmsMigrationTaskSourceObject;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#timeouts OmsMigrationTask#timeouts}
  */
  readonly timeouts?: OmsMigrationTaskTimeouts;
}
export interface OmsMigrationTaskBandwidthPolicy {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#end OmsMigrationTask#end}
  */
  readonly end: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#max_bandwidth OmsMigrationTask#max_bandwidth}
  */
  readonly maxBandwidth: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#start OmsMigrationTask#start}
  */
  readonly start: string;
}

export function omsMigrationTaskBandwidthPolicyToTerraform(struct?: OmsMigrationTaskBandwidthPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    end: cdktf.stringToTerraform(struct!.end),
    max_bandwidth: cdktf.numberToTerraform(struct!.maxBandwidth),
    start: cdktf.stringToTerraform(struct!.start),
  }
}


export function omsMigrationTaskBandwidthPolicyToHclTerraform(struct?: OmsMigrationTaskBandwidthPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    end: {
      value: cdktf.stringToHclTerraform(struct!.end),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_bandwidth: {
      value: cdktf.numberToHclTerraform(struct!.maxBandwidth),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    start: {
      value: cdktf.stringToHclTerraform(struct!.start),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsMigrationTaskBandwidthPolicyOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): OmsMigrationTaskBandwidthPolicy | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._end !== undefined) {
      hasAnyValues = true;
      internalValueResult.end = this._end;
    }
    if (this._maxBandwidth !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxBandwidth = this._maxBandwidth;
    }
    if (this._start !== undefined) {
      hasAnyValues = true;
      internalValueResult.start = this._start;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsMigrationTaskBandwidthPolicy | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._end = undefined;
      this._maxBandwidth = undefined;
      this._start = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._end = value.end;
      this._maxBandwidth = value.maxBandwidth;
      this._start = value.start;
    }
  }

  // end - computed: false, optional: false, required: true
  private _end?: string; 
  public get end() {
    return this.getStringAttribute('end');
  }
  public set end(value: string) {
    this._end = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endInput() {
    return this._end;
  }

  // max_bandwidth - computed: false, optional: false, required: true
  private _maxBandwidth?: number; 
  public get maxBandwidth() {
    return this.getNumberAttribute('max_bandwidth');
  }
  public set maxBandwidth(value: number) {
    this._maxBandwidth = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxBandwidthInput() {
    return this._maxBandwidth;
  }

  // start - computed: false, optional: false, required: true
  private _start?: string; 
  public get start() {
    return this.getStringAttribute('start');
  }
  public set start(value: string) {
    this._start = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startInput() {
    return this._start;
  }
}

export class OmsMigrationTaskBandwidthPolicyList extends cdktf.ComplexList {
  public internalValue? : OmsMigrationTaskBandwidthPolicy[] | cdktf.IResolvable

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
  public get(index: number): OmsMigrationTaskBandwidthPolicyOutputReference {
    return new OmsMigrationTaskBandwidthPolicyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface OmsMigrationTaskDestinationObject {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#access_key OmsMigrationTask#access_key}
  */
  readonly accessKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#bucket OmsMigrationTask#bucket}
  */
  readonly bucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#region OmsMigrationTask#region}
  */
  readonly region: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#save_prefix OmsMigrationTask#save_prefix}
  */
  readonly savePrefix?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#secret_key OmsMigrationTask#secret_key}
  */
  readonly secretKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#security_token OmsMigrationTask#security_token}
  */
  readonly securityToken?: string;
}

export function omsMigrationTaskDestinationObjectToTerraform(struct?: OmsMigrationTaskDestinationObjectOutputReference | OmsMigrationTaskDestinationObject): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_key: cdktf.stringToTerraform(struct!.accessKey),
    bucket: cdktf.stringToTerraform(struct!.bucket),
    region: cdktf.stringToTerraform(struct!.region),
    save_prefix: cdktf.stringToTerraform(struct!.savePrefix),
    secret_key: cdktf.stringToTerraform(struct!.secretKey),
    security_token: cdktf.stringToTerraform(struct!.securityToken),
  }
}


export function omsMigrationTaskDestinationObjectToHclTerraform(struct?: OmsMigrationTaskDestinationObjectOutputReference | OmsMigrationTaskDestinationObject): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    access_key: {
      value: cdktf.stringToHclTerraform(struct!.accessKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bucket: {
      value: cdktf.stringToHclTerraform(struct!.bucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    save_prefix: {
      value: cdktf.stringToHclTerraform(struct!.savePrefix),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    secret_key: {
      value: cdktf.stringToHclTerraform(struct!.secretKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    security_token: {
      value: cdktf.stringToHclTerraform(struct!.securityToken),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsMigrationTaskDestinationObjectOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsMigrationTaskDestinationObject | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessKey = this._accessKey;
    }
    if (this._bucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucket = this._bucket;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._savePrefix !== undefined) {
      hasAnyValues = true;
      internalValueResult.savePrefix = this._savePrefix;
    }
    if (this._secretKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.secretKey = this._secretKey;
    }
    if (this._securityToken !== undefined) {
      hasAnyValues = true;
      internalValueResult.securityToken = this._securityToken;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsMigrationTaskDestinationObject | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessKey = undefined;
      this._bucket = undefined;
      this._region = undefined;
      this._savePrefix = undefined;
      this._secretKey = undefined;
      this._securityToken = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessKey = value.accessKey;
      this._bucket = value.bucket;
      this._region = value.region;
      this._savePrefix = value.savePrefix;
      this._secretKey = value.secretKey;
      this._securityToken = value.securityToken;
    }
  }

  // access_key - computed: false, optional: true, required: false
  private _accessKey?: string; 
  public get accessKey() {
    return this.getStringAttribute('access_key');
  }
  public set accessKey(value: string) {
    this._accessKey = value;
  }
  public resetAccessKey() {
    this._accessKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessKeyInput() {
    return this._accessKey;
  }

  // bucket - computed: false, optional: false, required: true
  private _bucket?: string; 
  public get bucket() {
    return this.getStringAttribute('bucket');
  }
  public set bucket(value: string) {
    this._bucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketInput() {
    return this._bucket;
  }

  // region - computed: false, optional: false, required: true
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }

  // save_prefix - computed: false, optional: true, required: false
  private _savePrefix?: string; 
  public get savePrefix() {
    return this.getStringAttribute('save_prefix');
  }
  public set savePrefix(value: string) {
    this._savePrefix = value;
  }
  public resetSavePrefix() {
    this._savePrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get savePrefixInput() {
    return this._savePrefix;
  }

  // secret_key - computed: false, optional: true, required: false
  private _secretKey?: string; 
  public get secretKey() {
    return this.getStringAttribute('secret_key');
  }
  public set secretKey(value: string) {
    this._secretKey = value;
  }
  public resetSecretKey() {
    this._secretKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretKeyInput() {
    return this._secretKey;
  }

  // security_token - computed: false, optional: true, required: false
  private _securityToken?: string; 
  public get securityToken() {
    return this.getStringAttribute('security_token');
  }
  public set securityToken(value: string) {
    this._securityToken = value;
  }
  public resetSecurityToken() {
    this._securityToken = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityTokenInput() {
    return this._securityToken;
  }
}
export interface OmsMigrationTaskSmnConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#language OmsMigrationTask#language}
  */
  readonly language?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#topic_urn OmsMigrationTask#topic_urn}
  */
  readonly topicUrn: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#trigger_conditions OmsMigrationTask#trigger_conditions}
  */
  readonly triggerConditions: string[];
}

export function omsMigrationTaskSmnConfigToTerraform(struct?: OmsMigrationTaskSmnConfigOutputReference | OmsMigrationTaskSmnConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    language: cdktf.stringToTerraform(struct!.language),
    topic_urn: cdktf.stringToTerraform(struct!.topicUrn),
    trigger_conditions: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.triggerConditions),
  }
}


export function omsMigrationTaskSmnConfigToHclTerraform(struct?: OmsMigrationTaskSmnConfigOutputReference | OmsMigrationTaskSmnConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    language: {
      value: cdktf.stringToHclTerraform(struct!.language),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic_urn: {
      value: cdktf.stringToHclTerraform(struct!.topicUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    trigger_conditions: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.triggerConditions),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsMigrationTaskSmnConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsMigrationTaskSmnConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._language !== undefined) {
      hasAnyValues = true;
      internalValueResult.language = this._language;
    }
    if (this._topicUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicUrn = this._topicUrn;
    }
    if (this._triggerConditions !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerConditions = this._triggerConditions;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsMigrationTaskSmnConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._language = undefined;
      this._topicUrn = undefined;
      this._triggerConditions = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._language = value.language;
      this._topicUrn = value.topicUrn;
      this._triggerConditions = value.triggerConditions;
    }
  }

  // language - computed: false, optional: true, required: false
  private _language?: string; 
  public get language() {
    return this.getStringAttribute('language');
  }
  public set language(value: string) {
    this._language = value;
  }
  public resetLanguage() {
    this._language = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get languageInput() {
    return this._language;
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

  // trigger_conditions - computed: false, optional: false, required: true
  private _triggerConditions?: string[]; 
  public get triggerConditions() {
    return this.getListAttribute('trigger_conditions');
  }
  public set triggerConditions(value: string[]) {
    this._triggerConditions = value;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerConditionsInput() {
    return this._triggerConditions;
  }
}
export interface OmsMigrationTaskSourceCdn {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#authentication_key OmsMigrationTask#authentication_key}
  */
  readonly authenticationKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#authentication_type OmsMigrationTask#authentication_type}
  */
  readonly authenticationType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#domain OmsMigrationTask#domain}
  */
  readonly domain: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#protocol OmsMigrationTask#protocol}
  */
  readonly protocol: string;
}

export function omsMigrationTaskSourceCdnToTerraform(struct?: OmsMigrationTaskSourceCdnOutputReference | OmsMigrationTaskSourceCdn): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authentication_key: cdktf.stringToTerraform(struct!.authenticationKey),
    authentication_type: cdktf.stringToTerraform(struct!.authenticationType),
    domain: cdktf.stringToTerraform(struct!.domain),
    protocol: cdktf.stringToTerraform(struct!.protocol),
  }
}


export function omsMigrationTaskSourceCdnToHclTerraform(struct?: OmsMigrationTaskSourceCdnOutputReference | OmsMigrationTaskSourceCdn): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authentication_key: {
      value: cdktf.stringToHclTerraform(struct!.authenticationKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    authentication_type: {
      value: cdktf.stringToHclTerraform(struct!.authenticationType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    domain: {
      value: cdktf.stringToHclTerraform(struct!.domain),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    protocol: {
      value: cdktf.stringToHclTerraform(struct!.protocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsMigrationTaskSourceCdnOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsMigrationTaskSourceCdn | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authenticationKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.authenticationKey = this._authenticationKey;
    }
    if (this._authenticationType !== undefined) {
      hasAnyValues = true;
      internalValueResult.authenticationType = this._authenticationType;
    }
    if (this._domain !== undefined) {
      hasAnyValues = true;
      internalValueResult.domain = this._domain;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsMigrationTaskSourceCdn | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._authenticationKey = undefined;
      this._authenticationType = undefined;
      this._domain = undefined;
      this._protocol = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._authenticationKey = value.authenticationKey;
      this._authenticationType = value.authenticationType;
      this._domain = value.domain;
      this._protocol = value.protocol;
    }
  }

  // authentication_key - computed: false, optional: true, required: false
  private _authenticationKey?: string; 
  public get authenticationKey() {
    return this.getStringAttribute('authentication_key');
  }
  public set authenticationKey(value: string) {
    this._authenticationKey = value;
  }
  public resetAuthenticationKey() {
    this._authenticationKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticationKeyInput() {
    return this._authenticationKey;
  }

  // authentication_type - computed: false, optional: true, required: false
  private _authenticationType?: string; 
  public get authenticationType() {
    return this.getStringAttribute('authentication_type');
  }
  public set authenticationType(value: string) {
    this._authenticationType = value;
  }
  public resetAuthenticationType() {
    this._authenticationType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticationTypeInput() {
    return this._authenticationType;
  }

  // domain - computed: false, optional: false, required: true
  private _domain?: string; 
  public get domain() {
    return this.getStringAttribute('domain');
  }
  public set domain(value: string) {
    this._domain = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainInput() {
    return this._domain;
  }

  // protocol - computed: false, optional: false, required: true
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }
}
export interface OmsMigrationTaskSourceObject {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#access_key OmsMigrationTask#access_key}
  */
  readonly accessKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#app_id OmsMigrationTask#app_id}
  */
  readonly appId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#bucket OmsMigrationTask#bucket}
  */
  readonly bucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#data_source OmsMigrationTask#data_source}
  */
  readonly dataSource?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#list_file_bucket OmsMigrationTask#list_file_bucket}
  */
  readonly listFileBucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#list_file_key OmsMigrationTask#list_file_key}
  */
  readonly listFileKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#object OmsMigrationTask#object}
  */
  readonly object?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#region OmsMigrationTask#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#secret_key OmsMigrationTask#secret_key}
  */
  readonly secretKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#security_token OmsMigrationTask#security_token}
  */
  readonly securityToken?: string;
}

export function omsMigrationTaskSourceObjectToTerraform(struct?: OmsMigrationTaskSourceObjectOutputReference | OmsMigrationTaskSourceObject): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_key: cdktf.stringToTerraform(struct!.accessKey),
    app_id: cdktf.stringToTerraform(struct!.appId),
    bucket: cdktf.stringToTerraform(struct!.bucket),
    data_source: cdktf.stringToTerraform(struct!.dataSource),
    list_file_bucket: cdktf.stringToTerraform(struct!.listFileBucket),
    list_file_key: cdktf.stringToTerraform(struct!.listFileKey),
    object: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.object),
    region: cdktf.stringToTerraform(struct!.region),
    secret_key: cdktf.stringToTerraform(struct!.secretKey),
    security_token: cdktf.stringToTerraform(struct!.securityToken),
  }
}


export function omsMigrationTaskSourceObjectToHclTerraform(struct?: OmsMigrationTaskSourceObjectOutputReference | OmsMigrationTaskSourceObject): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    access_key: {
      value: cdktf.stringToHclTerraform(struct!.accessKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    app_id: {
      value: cdktf.stringToHclTerraform(struct!.appId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bucket: {
      value: cdktf.stringToHclTerraform(struct!.bucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    data_source: {
      value: cdktf.stringToHclTerraform(struct!.dataSource),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    list_file_bucket: {
      value: cdktf.stringToHclTerraform(struct!.listFileBucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    list_file_key: {
      value: cdktf.stringToHclTerraform(struct!.listFileKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    object: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.object),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    secret_key: {
      value: cdktf.stringToHclTerraform(struct!.secretKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    security_token: {
      value: cdktf.stringToHclTerraform(struct!.securityToken),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsMigrationTaskSourceObjectOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsMigrationTaskSourceObject | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessKey = this._accessKey;
    }
    if (this._appId !== undefined) {
      hasAnyValues = true;
      internalValueResult.appId = this._appId;
    }
    if (this._bucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucket = this._bucket;
    }
    if (this._dataSource !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataSource = this._dataSource;
    }
    if (this._listFileBucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.listFileBucket = this._listFileBucket;
    }
    if (this._listFileKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.listFileKey = this._listFileKey;
    }
    if (this._object !== undefined) {
      hasAnyValues = true;
      internalValueResult.object = this._object;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._secretKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.secretKey = this._secretKey;
    }
    if (this._securityToken !== undefined) {
      hasAnyValues = true;
      internalValueResult.securityToken = this._securityToken;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsMigrationTaskSourceObject | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessKey = undefined;
      this._appId = undefined;
      this._bucket = undefined;
      this._dataSource = undefined;
      this._listFileBucket = undefined;
      this._listFileKey = undefined;
      this._object = undefined;
      this._region = undefined;
      this._secretKey = undefined;
      this._securityToken = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessKey = value.accessKey;
      this._appId = value.appId;
      this._bucket = value.bucket;
      this._dataSource = value.dataSource;
      this._listFileBucket = value.listFileBucket;
      this._listFileKey = value.listFileKey;
      this._object = value.object;
      this._region = value.region;
      this._secretKey = value.secretKey;
      this._securityToken = value.securityToken;
    }
  }

  // access_key - computed: false, optional: true, required: false
  private _accessKey?: string; 
  public get accessKey() {
    return this.getStringAttribute('access_key');
  }
  public set accessKey(value: string) {
    this._accessKey = value;
  }
  public resetAccessKey() {
    this._accessKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessKeyInput() {
    return this._accessKey;
  }

  // app_id - computed: false, optional: true, required: false
  private _appId?: string; 
  public get appId() {
    return this.getStringAttribute('app_id');
  }
  public set appId(value: string) {
    this._appId = value;
  }
  public resetAppId() {
    this._appId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appIdInput() {
    return this._appId;
  }

  // bucket - computed: false, optional: true, required: false
  private _bucket?: string; 
  public get bucket() {
    return this.getStringAttribute('bucket');
  }
  public set bucket(value: string) {
    this._bucket = value;
  }
  public resetBucket() {
    this._bucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketInput() {
    return this._bucket;
  }

  // data_source - computed: false, optional: true, required: false
  private _dataSource?: string; 
  public get dataSource() {
    return this.getStringAttribute('data_source');
  }
  public set dataSource(value: string) {
    this._dataSource = value;
  }
  public resetDataSource() {
    this._dataSource = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataSourceInput() {
    return this._dataSource;
  }

  // list_file_bucket - computed: false, optional: true, required: false
  private _listFileBucket?: string; 
  public get listFileBucket() {
    return this.getStringAttribute('list_file_bucket');
  }
  public set listFileBucket(value: string) {
    this._listFileBucket = value;
  }
  public resetListFileBucket() {
    this._listFileBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get listFileBucketInput() {
    return this._listFileBucket;
  }

  // list_file_key - computed: false, optional: true, required: false
  private _listFileKey?: string; 
  public get listFileKey() {
    return this.getStringAttribute('list_file_key');
  }
  public set listFileKey(value: string) {
    this._listFileKey = value;
  }
  public resetListFileKey() {
    this._listFileKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get listFileKeyInput() {
    return this._listFileKey;
  }

  // object - computed: false, optional: true, required: false
  private _object?: string[]; 
  public get object() {
    return this.getListAttribute('object');
  }
  public set object(value: string[]) {
    this._object = value;
  }
  public resetObject() {
    this._object = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get objectInput() {
    return this._object;
  }

  // region - computed: false, optional: true, required: false
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

  // secret_key - computed: false, optional: true, required: false
  private _secretKey?: string; 
  public get secretKey() {
    return this.getStringAttribute('secret_key');
  }
  public set secretKey(value: string) {
    this._secretKey = value;
  }
  public resetSecretKey() {
    this._secretKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretKeyInput() {
    return this._secretKey;
  }

  // security_token - computed: false, optional: true, required: false
  private _securityToken?: string; 
  public get securityToken() {
    return this.getStringAttribute('security_token');
  }
  public set securityToken(value: string) {
    this._securityToken = value;
  }
  public resetSecurityToken() {
    this._securityToken = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityTokenInput() {
    return this._securityToken;
  }
}
export interface OmsMigrationTaskTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#create OmsMigrationTask#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#update OmsMigrationTask#update}
  */
  readonly update?: string;
}

export function omsMigrationTaskTimeoutsToTerraform(struct?: OmsMigrationTaskTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function omsMigrationTaskTimeoutsToHclTerraform(struct?: OmsMigrationTaskTimeouts | cdktf.IResolvable): any {
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

export class OmsMigrationTaskTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): OmsMigrationTaskTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsMigrationTaskTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task huaweicloud_oms_migration_task}
*/
export class OmsMigrationTask extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_oms_migration_task";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a OmsMigrationTask resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the OmsMigrationTask to import
  * @param importFromId The id of the existing OmsMigrationTask that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the OmsMigrationTask to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_oms_migration_task", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task huaweicloud_oms_migration_task} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options OmsMigrationTaskConfig
  */
  public constructor(scope: Construct, id: string, config: OmsMigrationTaskConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_oms_migration_task',
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
    this._enableFailedObjectRecording = config.enableFailedObjectRecording;
    this._enableKms = config.enableKms;
    this._enableRestore = config.enableRestore;
    this._id = config.id;
    this._migrateSince = config.migrateSince;
    this._region = config.region;
    this._startTask = config.startTask;
    this._type = config.type;
    this._bandwidthPolicy.internalValue = config.bandwidthPolicy;
    this._destinationObject.internalValue = config.destinationObject;
    this._smnConfig.internalValue = config.smnConfig;
    this._sourceCdn.internalValue = config.sourceCdn;
    this._sourceObject.internalValue = config.sourceObject;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // enable_failed_object_recording - computed: false, optional: true, required: false
  private _enableFailedObjectRecording?: boolean | cdktf.IResolvable; 
  public get enableFailedObjectRecording() {
    return this.getBooleanAttribute('enable_failed_object_recording');
  }
  public set enableFailedObjectRecording(value: boolean | cdktf.IResolvable) {
    this._enableFailedObjectRecording = value;
  }
  public resetEnableFailedObjectRecording() {
    this._enableFailedObjectRecording = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableFailedObjectRecordingInput() {
    return this._enableFailedObjectRecording;
  }

  // enable_kms - computed: false, optional: true, required: false
  private _enableKms?: boolean | cdktf.IResolvable; 
  public get enableKms() {
    return this.getBooleanAttribute('enable_kms');
  }
  public set enableKms(value: boolean | cdktf.IResolvable) {
    this._enableKms = value;
  }
  public resetEnableKms() {
    this._enableKms = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableKmsInput() {
    return this._enableKms;
  }

  // enable_restore - computed: false, optional: true, required: false
  private _enableRestore?: boolean | cdktf.IResolvable; 
  public get enableRestore() {
    return this.getBooleanAttribute('enable_restore');
  }
  public set enableRestore(value: boolean | cdktf.IResolvable) {
    this._enableRestore = value;
  }
  public resetEnableRestore() {
    this._enableRestore = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableRestoreInput() {
    return this._enableRestore;
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

  // migrate_since - computed: true, optional: true, required: false
  private _migrateSince?: string; 
  public get migrateSince() {
    return this.getStringAttribute('migrate_since');
  }
  public set migrateSince(value: string) {
    this._migrateSince = value;
  }
  public resetMigrateSince() {
    this._migrateSince = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get migrateSinceInput() {
    return this._migrateSince;
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
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

  // start_task - computed: false, optional: true, required: false
  private _startTask?: boolean | cdktf.IResolvable; 
  public get startTask() {
    return this.getBooleanAttribute('start_task');
  }
  public set startTask(value: boolean | cdktf.IResolvable) {
    this._startTask = value;
  }
  public resetStartTask() {
    this._startTask = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startTaskInput() {
    return this._startTask;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
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

  // bandwidth_policy - computed: false, optional: true, required: false
  private _bandwidthPolicy = new OmsMigrationTaskBandwidthPolicyList(this, "bandwidth_policy", false);
  public get bandwidthPolicy() {
    return this._bandwidthPolicy;
  }
  public putBandwidthPolicy(value: OmsMigrationTaskBandwidthPolicy[] | cdktf.IResolvable) {
    this._bandwidthPolicy.internalValue = value;
  }
  public resetBandwidthPolicy() {
    this._bandwidthPolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthPolicyInput() {
    return this._bandwidthPolicy.internalValue;
  }

  // destination_object - computed: false, optional: false, required: true
  private _destinationObject = new OmsMigrationTaskDestinationObjectOutputReference(this, "destination_object");
  public get destinationObject() {
    return this._destinationObject;
  }
  public putDestinationObject(value: OmsMigrationTaskDestinationObject) {
    this._destinationObject.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationObjectInput() {
    return this._destinationObject.internalValue;
  }

  // smn_config - computed: false, optional: true, required: false
  private _smnConfig = new OmsMigrationTaskSmnConfigOutputReference(this, "smn_config");
  public get smnConfig() {
    return this._smnConfig;
  }
  public putSmnConfig(value: OmsMigrationTaskSmnConfig) {
    this._smnConfig.internalValue = value;
  }
  public resetSmnConfig() {
    this._smnConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smnConfigInput() {
    return this._smnConfig.internalValue;
  }

  // source_cdn - computed: false, optional: true, required: false
  private _sourceCdn = new OmsMigrationTaskSourceCdnOutputReference(this, "source_cdn");
  public get sourceCdn() {
    return this._sourceCdn;
  }
  public putSourceCdn(value: OmsMigrationTaskSourceCdn) {
    this._sourceCdn.internalValue = value;
  }
  public resetSourceCdn() {
    this._sourceCdn.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceCdnInput() {
    return this._sourceCdn.internalValue;
  }

  // source_object - computed: false, optional: false, required: true
  private _sourceObject = new OmsMigrationTaskSourceObjectOutputReference(this, "source_object");
  public get sourceObject() {
    return this._sourceObject;
  }
  public putSourceObject(value: OmsMigrationTaskSourceObject) {
    this._sourceObject.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceObjectInput() {
    return this._sourceObject.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new OmsMigrationTaskTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: OmsMigrationTaskTimeouts) {
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
      description: cdktf.stringToTerraform(this._description),
      enable_failed_object_recording: cdktf.booleanToTerraform(this._enableFailedObjectRecording),
      enable_kms: cdktf.booleanToTerraform(this._enableKms),
      enable_restore: cdktf.booleanToTerraform(this._enableRestore),
      id: cdktf.stringToTerraform(this._id),
      migrate_since: cdktf.stringToTerraform(this._migrateSince),
      region: cdktf.stringToTerraform(this._region),
      start_task: cdktf.booleanToTerraform(this._startTask),
      type: cdktf.stringToTerraform(this._type),
      bandwidth_policy: cdktf.listMapper(omsMigrationTaskBandwidthPolicyToTerraform, true)(this._bandwidthPolicy.internalValue),
      destination_object: omsMigrationTaskDestinationObjectToTerraform(this._destinationObject.internalValue),
      smn_config: omsMigrationTaskSmnConfigToTerraform(this._smnConfig.internalValue),
      source_cdn: omsMigrationTaskSourceCdnToTerraform(this._sourceCdn.internalValue),
      source_object: omsMigrationTaskSourceObjectToTerraform(this._sourceObject.internalValue),
      timeouts: omsMigrationTaskTimeoutsToTerraform(this._timeouts.internalValue),
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
      enable_failed_object_recording: {
        value: cdktf.booleanToHclTerraform(this._enableFailedObjectRecording),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_kms: {
        value: cdktf.booleanToHclTerraform(this._enableKms),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_restore: {
        value: cdktf.booleanToHclTerraform(this._enableRestore),
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
      migrate_since: {
        value: cdktf.stringToHclTerraform(this._migrateSince),
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
      start_task: {
        value: cdktf.booleanToHclTerraform(this._startTask),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      bandwidth_policy: {
        value: cdktf.listMapperHcl(omsMigrationTaskBandwidthPolicyToHclTerraform, true)(this._bandwidthPolicy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationTaskBandwidthPolicyList",
      },
      destination_object: {
        value: omsMigrationTaskDestinationObjectToHclTerraform(this._destinationObject.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationTaskDestinationObjectList",
      },
      smn_config: {
        value: omsMigrationTaskSmnConfigToHclTerraform(this._smnConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationTaskSmnConfigList",
      },
      source_cdn: {
        value: omsMigrationTaskSourceCdnToHclTerraform(this._sourceCdn.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationTaskSourceCdnList",
      },
      source_object: {
        value: omsMigrationTaskSourceObjectToHclTerraform(this._sourceObject.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationTaskSourceObjectList",
      },
      timeouts: {
        value: omsMigrationTaskTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "OmsMigrationTaskTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

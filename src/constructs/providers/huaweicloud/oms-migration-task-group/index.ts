// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface OmsMigrationTaskGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#action OmsMigrationTaskGroup#action}
  */
  readonly action?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#consistency_check OmsMigrationTaskGroup#consistency_check}
  */
  readonly consistencyCheck?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#description OmsMigrationTaskGroup#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#enable_failed_object_recording OmsMigrationTaskGroup#enable_failed_object_recording}
  */
  readonly enableFailedObjectRecording?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#enable_kms OmsMigrationTaskGroup#enable_kms}
  */
  readonly enableKms?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#enable_requester_pays OmsMigrationTaskGroup#enable_requester_pays}
  */
  readonly enableRequesterPays?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#id OmsMigrationTaskGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#migrate_since OmsMigrationTaskGroup#migrate_since}
  */
  readonly migrateSince?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#object_overwrite_mode OmsMigrationTaskGroup#object_overwrite_mode}
  */
  readonly objectOverwriteMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#region OmsMigrationTaskGroup#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#type OmsMigrationTaskGroup#type}
  */
  readonly type: string;
  /**
  * bandwidth_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#bandwidth_policy OmsMigrationTaskGroup#bandwidth_policy}
  */
  readonly bandwidthPolicy?: OmsMigrationTaskGroupBandwidthPolicy[] | cdktf.IResolvable;
  /**
  * destination_object block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#destination_object OmsMigrationTaskGroup#destination_object}
  */
  readonly destinationObject: OmsMigrationTaskGroupDestinationObject;
  /**
  * source_cdn block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#source_cdn OmsMigrationTaskGroup#source_cdn}
  */
  readonly sourceCdn?: OmsMigrationTaskGroupSourceCdn;
  /**
  * source_object block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#source_object OmsMigrationTaskGroup#source_object}
  */
  readonly sourceObject: OmsMigrationTaskGroupSourceObject;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#timeouts OmsMigrationTaskGroup#timeouts}
  */
  readonly timeouts?: OmsMigrationTaskGroupTimeouts;
}
export interface OmsMigrationTaskGroupBandwidthPolicy {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#end OmsMigrationTaskGroup#end}
  */
  readonly end: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#max_bandwidth OmsMigrationTaskGroup#max_bandwidth}
  */
  readonly maxBandwidth: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#start OmsMigrationTaskGroup#start}
  */
  readonly start: string;
}

export function omsMigrationTaskGroupBandwidthPolicyToTerraform(struct?: OmsMigrationTaskGroupBandwidthPolicy | cdktf.IResolvable): any {
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


export function omsMigrationTaskGroupBandwidthPolicyToHclTerraform(struct?: OmsMigrationTaskGroupBandwidthPolicy | cdktf.IResolvable): any {
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

export class OmsMigrationTaskGroupBandwidthPolicyOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): OmsMigrationTaskGroupBandwidthPolicy | cdktf.IResolvable | undefined {
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

  public set internalValue(value: OmsMigrationTaskGroupBandwidthPolicy | cdktf.IResolvable | undefined) {
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

export class OmsMigrationTaskGroupBandwidthPolicyList extends cdktf.ComplexList {
  public internalValue? : OmsMigrationTaskGroupBandwidthPolicy[] | cdktf.IResolvable

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
  public get(index: number): OmsMigrationTaskGroupBandwidthPolicyOutputReference {
    return new OmsMigrationTaskGroupBandwidthPolicyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface OmsMigrationTaskGroupDestinationObject {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#access_key OmsMigrationTaskGroup#access_key}
  */
  readonly accessKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#bucket OmsMigrationTaskGroup#bucket}
  */
  readonly bucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#data_source OmsMigrationTaskGroup#data_source}
  */
  readonly dataSource?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#region OmsMigrationTaskGroup#region}
  */
  readonly region: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#save_prefix OmsMigrationTaskGroup#save_prefix}
  */
  readonly savePrefix?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#secret_key OmsMigrationTaskGroup#secret_key}
  */
  readonly secretKey?: string;
}

export function omsMigrationTaskGroupDestinationObjectToTerraform(struct?: OmsMigrationTaskGroupDestinationObjectOutputReference | OmsMigrationTaskGroupDestinationObject): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_key: cdktf.stringToTerraform(struct!.accessKey),
    bucket: cdktf.stringToTerraform(struct!.bucket),
    data_source: cdktf.stringToTerraform(struct!.dataSource),
    region: cdktf.stringToTerraform(struct!.region),
    save_prefix: cdktf.stringToTerraform(struct!.savePrefix),
    secret_key: cdktf.stringToTerraform(struct!.secretKey),
  }
}


export function omsMigrationTaskGroupDestinationObjectToHclTerraform(struct?: OmsMigrationTaskGroupDestinationObjectOutputReference | OmsMigrationTaskGroupDestinationObject): any {
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
    data_source: {
      value: cdktf.stringToHclTerraform(struct!.dataSource),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsMigrationTaskGroupDestinationObjectOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsMigrationTaskGroupDestinationObject | undefined {
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
    if (this._dataSource !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataSource = this._dataSource;
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
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsMigrationTaskGroupDestinationObject | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessKey = undefined;
      this._bucket = undefined;
      this._dataSource = undefined;
      this._region = undefined;
      this._savePrefix = undefined;
      this._secretKey = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessKey = value.accessKey;
      this._bucket = value.bucket;
      this._dataSource = value.dataSource;
      this._region = value.region;
      this._savePrefix = value.savePrefix;
      this._secretKey = value.secretKey;
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
}
export interface OmsMigrationTaskGroupSourceCdn {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#authentication_key OmsMigrationTaskGroup#authentication_key}
  */
  readonly authenticationKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#authentication_type OmsMigrationTaskGroup#authentication_type}
  */
  readonly authenticationType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#domain OmsMigrationTaskGroup#domain}
  */
  readonly domain: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#protocol OmsMigrationTaskGroup#protocol}
  */
  readonly protocol: string;
}

export function omsMigrationTaskGroupSourceCdnToTerraform(struct?: OmsMigrationTaskGroupSourceCdnOutputReference | OmsMigrationTaskGroupSourceCdn): any {
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


export function omsMigrationTaskGroupSourceCdnToHclTerraform(struct?: OmsMigrationTaskGroupSourceCdnOutputReference | OmsMigrationTaskGroupSourceCdn): any {
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

export class OmsMigrationTaskGroupSourceCdnOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsMigrationTaskGroupSourceCdn | undefined {
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

  public set internalValue(value: OmsMigrationTaskGroupSourceCdn | undefined) {
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
export interface OmsMigrationTaskGroupSourceObject {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#access_key OmsMigrationTaskGroup#access_key}
  */
  readonly accessKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#app_id OmsMigrationTaskGroup#app_id}
  */
  readonly appId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#bucket OmsMigrationTaskGroup#bucket}
  */
  readonly bucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#data_source OmsMigrationTaskGroup#data_source}
  */
  readonly dataSource?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#list_file_bucket OmsMigrationTaskGroup#list_file_bucket}
  */
  readonly listFileBucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#list_file_key OmsMigrationTaskGroup#list_file_key}
  */
  readonly listFileKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#object OmsMigrationTaskGroup#object}
  */
  readonly object?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#region OmsMigrationTaskGroup#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#secret_key OmsMigrationTaskGroup#secret_key}
  */
  readonly secretKey?: string;
}

export function omsMigrationTaskGroupSourceObjectToTerraform(struct?: OmsMigrationTaskGroupSourceObjectOutputReference | OmsMigrationTaskGroupSourceObject): any {
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
  }
}


export function omsMigrationTaskGroupSourceObjectToHclTerraform(struct?: OmsMigrationTaskGroupSourceObjectOutputReference | OmsMigrationTaskGroupSourceObject): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsMigrationTaskGroupSourceObjectOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsMigrationTaskGroupSourceObject | undefined {
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
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsMigrationTaskGroupSourceObject | undefined) {
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
}
export interface OmsMigrationTaskGroupTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#create OmsMigrationTaskGroup#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#delete OmsMigrationTaskGroup#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#update OmsMigrationTaskGroup#update}
  */
  readonly update?: string;
}

export function omsMigrationTaskGroupTimeoutsToTerraform(struct?: OmsMigrationTaskGroupTimeouts | cdktf.IResolvable): any {
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


export function omsMigrationTaskGroupTimeoutsToHclTerraform(struct?: OmsMigrationTaskGroupTimeouts | cdktf.IResolvable): any {
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

export class OmsMigrationTaskGroupTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): OmsMigrationTaskGroupTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: OmsMigrationTaskGroupTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group huaweicloud_oms_migration_task_group}
*/
export class OmsMigrationTaskGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_oms_migration_task_group";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a OmsMigrationTaskGroup resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the OmsMigrationTaskGroup to import
  * @param importFromId The id of the existing OmsMigrationTaskGroup that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the OmsMigrationTaskGroup to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_oms_migration_task_group", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_task_group huaweicloud_oms_migration_task_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options OmsMigrationTaskGroupConfig
  */
  public constructor(scope: Construct, id: string, config: OmsMigrationTaskGroupConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_oms_migration_task_group',
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
    this._consistencyCheck = config.consistencyCheck;
    this._description = config.description;
    this._enableFailedObjectRecording = config.enableFailedObjectRecording;
    this._enableKms = config.enableKms;
    this._enableRequesterPays = config.enableRequesterPays;
    this._id = config.id;
    this._migrateSince = config.migrateSince;
    this._objectOverwriteMode = config.objectOverwriteMode;
    this._region = config.region;
    this._type = config.type;
    this._bandwidthPolicy.internalValue = config.bandwidthPolicy;
    this._destinationObject.internalValue = config.destinationObject;
    this._sourceCdn.internalValue = config.sourceCdn;
    this._sourceObject.internalValue = config.sourceObject;
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

  // complete_size - computed: true, optional: false, required: false
  public get completeSize() {
    return this.getNumberAttribute('complete_size');
  }

  // consistency_check - computed: true, optional: true, required: false
  private _consistencyCheck?: string; 
  public get consistencyCheck() {
    return this.getStringAttribute('consistency_check');
  }
  public set consistencyCheck(value: string) {
    this._consistencyCheck = value;
  }
  public resetConsistencyCheck() {
    this._consistencyCheck = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consistencyCheckInput() {
    return this._consistencyCheck;
  }

  // description - computed: true, optional: true, required: false
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

  // enable_kms - computed: true, optional: true, required: false
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

  // enable_requester_pays - computed: true, optional: true, required: false
  private _enableRequesterPays?: boolean | cdktf.IResolvable; 
  public get enableRequesterPays() {
    return this.getBooleanAttribute('enable_requester_pays');
  }
  public set enableRequesterPays(value: boolean | cdktf.IResolvable) {
    this._enableRequesterPays = value;
  }
  public resetEnableRequesterPays() {
    this._enableRequesterPays = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableRequesterPaysInput() {
    return this._enableRequesterPays;
  }

  // fail_num - computed: true, optional: false, required: false
  public get failNum() {
    return this.getNumberAttribute('fail_num');
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

  // object_overwrite_mode - computed: true, optional: true, required: false
  private _objectOverwriteMode?: string; 
  public get objectOverwriteMode() {
    return this.getStringAttribute('object_overwrite_mode');
  }
  public set objectOverwriteMode(value: string) {
    this._objectOverwriteMode = value;
  }
  public resetObjectOverwriteMode() {
    this._objectOverwriteMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get objectOverwriteModeInput() {
    return this._objectOverwriteMode;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
  }

  // success_num - computed: true, optional: false, required: false
  public get successNum() {
    return this.getNumberAttribute('success_num');
  }

  // total_num - computed: true, optional: false, required: false
  public get totalNum() {
    return this.getNumberAttribute('total_num');
  }

  // total_size - computed: true, optional: false, required: false
  public get totalSize() {
    return this.getNumberAttribute('total_size');
  }

  // total_time - computed: true, optional: false, required: false
  public get totalTime() {
    return this.getNumberAttribute('total_time');
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
  private _bandwidthPolicy = new OmsMigrationTaskGroupBandwidthPolicyList(this, "bandwidth_policy", false);
  public get bandwidthPolicy() {
    return this._bandwidthPolicy;
  }
  public putBandwidthPolicy(value: OmsMigrationTaskGroupBandwidthPolicy[] | cdktf.IResolvable) {
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
  private _destinationObject = new OmsMigrationTaskGroupDestinationObjectOutputReference(this, "destination_object");
  public get destinationObject() {
    return this._destinationObject;
  }
  public putDestinationObject(value: OmsMigrationTaskGroupDestinationObject) {
    this._destinationObject.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationObjectInput() {
    return this._destinationObject.internalValue;
  }

  // source_cdn - computed: false, optional: true, required: false
  private _sourceCdn = new OmsMigrationTaskGroupSourceCdnOutputReference(this, "source_cdn");
  public get sourceCdn() {
    return this._sourceCdn;
  }
  public putSourceCdn(value: OmsMigrationTaskGroupSourceCdn) {
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
  private _sourceObject = new OmsMigrationTaskGroupSourceObjectOutputReference(this, "source_object");
  public get sourceObject() {
    return this._sourceObject;
  }
  public putSourceObject(value: OmsMigrationTaskGroupSourceObject) {
    this._sourceObject.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceObjectInput() {
    return this._sourceObject.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new OmsMigrationTaskGroupTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: OmsMigrationTaskGroupTimeouts) {
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
      consistency_check: cdktf.stringToTerraform(this._consistencyCheck),
      description: cdktf.stringToTerraform(this._description),
      enable_failed_object_recording: cdktf.booleanToTerraform(this._enableFailedObjectRecording),
      enable_kms: cdktf.booleanToTerraform(this._enableKms),
      enable_requester_pays: cdktf.booleanToTerraform(this._enableRequesterPays),
      id: cdktf.stringToTerraform(this._id),
      migrate_since: cdktf.stringToTerraform(this._migrateSince),
      object_overwrite_mode: cdktf.stringToTerraform(this._objectOverwriteMode),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.stringToTerraform(this._type),
      bandwidth_policy: cdktf.listMapper(omsMigrationTaskGroupBandwidthPolicyToTerraform, true)(this._bandwidthPolicy.internalValue),
      destination_object: omsMigrationTaskGroupDestinationObjectToTerraform(this._destinationObject.internalValue),
      source_cdn: omsMigrationTaskGroupSourceCdnToTerraform(this._sourceCdn.internalValue),
      source_object: omsMigrationTaskGroupSourceObjectToTerraform(this._sourceObject.internalValue),
      timeouts: omsMigrationTaskGroupTimeoutsToTerraform(this._timeouts.internalValue),
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
      consistency_check: {
        value: cdktf.stringToHclTerraform(this._consistencyCheck),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
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
      enable_requester_pays: {
        value: cdktf.booleanToHclTerraform(this._enableRequesterPays),
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
      object_overwrite_mode: {
        value: cdktf.stringToHclTerraform(this._objectOverwriteMode),
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
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      bandwidth_policy: {
        value: cdktf.listMapperHcl(omsMigrationTaskGroupBandwidthPolicyToHclTerraform, true)(this._bandwidthPolicy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationTaskGroupBandwidthPolicyList",
      },
      destination_object: {
        value: omsMigrationTaskGroupDestinationObjectToHclTerraform(this._destinationObject.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationTaskGroupDestinationObjectList",
      },
      source_cdn: {
        value: omsMigrationTaskGroupSourceCdnToHclTerraform(this._sourceCdn.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationTaskGroupSourceCdnList",
      },
      source_object: {
        value: omsMigrationTaskGroupSourceObjectToHclTerraform(this._sourceObject.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationTaskGroupSourceObjectList",
      },
      timeouts: {
        value: omsMigrationTaskGroupTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "OmsMigrationTaskGroupTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

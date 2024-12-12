// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsTransferConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#id LtsTransfer#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Log group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_group_id LtsTransfer#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#region LtsTransfer#region}
  */
  readonly region?: string;
  /**
  * log_streams block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_streams LtsTransfer#log_streams}
  */
  readonly logStreams: LtsTransferLogStreams[] | cdktf.IResolvable;
  /**
  * log_transfer_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_transfer_info LtsTransfer#log_transfer_info}
  */
  readonly logTransferInfo: LtsTransferLogTransferInfo;
}
export interface LtsTransferLogStreams {
  /**
  * Log stream ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_stream_id LtsTransfer#log_stream_id}
  */
  readonly logStreamId: string;
  /**
  * Log stream name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_stream_name LtsTransfer#log_stream_name}
  */
  readonly logStreamName?: string;
}

export function ltsTransferLogStreamsToTerraform(struct?: LtsTransferLogStreams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    log_stream_id: cdktf.stringToTerraform(struct!.logStreamId),
    log_stream_name: cdktf.stringToTerraform(struct!.logStreamName),
  }
}


export function ltsTransferLogStreamsToHclTerraform(struct?: LtsTransferLogStreams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    log_stream_id: {
      value: cdktf.stringToHclTerraform(struct!.logStreamId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    log_stream_name: {
      value: cdktf.stringToHclTerraform(struct!.logStreamName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsTransferLogStreamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsTransferLogStreams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._logStreamId !== undefined) {
      hasAnyValues = true;
      internalValueResult.logStreamId = this._logStreamId;
    }
    if (this._logStreamName !== undefined) {
      hasAnyValues = true;
      internalValueResult.logStreamName = this._logStreamName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsTransferLogStreams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._logStreamId = undefined;
      this._logStreamName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._logStreamId = value.logStreamId;
      this._logStreamName = value.logStreamName;
    }
  }

  // log_stream_id - computed: false, optional: false, required: true
  private _logStreamId?: string; 
  public get logStreamId() {
    return this.getStringAttribute('log_stream_id');
  }
  public set logStreamId(value: string) {
    this._logStreamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamIdInput() {
    return this._logStreamId;
  }

  // log_stream_name - computed: true, optional: true, required: false
  private _logStreamName?: string; 
  public get logStreamName() {
    return this.getStringAttribute('log_stream_name');
  }
  public set logStreamName(value: string) {
    this._logStreamName = value;
  }
  public resetLogStreamName() {
    this._logStreamName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamNameInput() {
    return this._logStreamName;
  }
}

export class LtsTransferLogStreamsList extends cdktf.ComplexList {
  public internalValue? : LtsTransferLogStreams[] | cdktf.IResolvable

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
  public get(index: number): LtsTransferLogStreamsOutputReference {
    return new LtsTransferLogStreamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LtsTransferLogTransferInfoLogAgencyTransfer {
  /**
  * Delegator account ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#agency_domain_id LtsTransfer#agency_domain_id}
  */
  readonly agencyDomainId: string;
  /**
  * Delegator account name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#agency_domain_name LtsTransfer#agency_domain_name}
  */
  readonly agencyDomainName: string;
  /**
  * The agency name created by the delegator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#agency_name LtsTransfer#agency_name}
  */
  readonly agencyName: string;
  /**
  * Project ID of the delegator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#agency_project_id LtsTransfer#agency_project_id}
  */
  readonly agencyProjectId: string;
}

export function ltsTransferLogTransferInfoLogAgencyTransferToTerraform(struct?: LtsTransferLogTransferInfoLogAgencyTransferOutputReference | LtsTransferLogTransferInfoLogAgencyTransfer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    agency_domain_id: cdktf.stringToTerraform(struct!.agencyDomainId),
    agency_domain_name: cdktf.stringToTerraform(struct!.agencyDomainName),
    agency_name: cdktf.stringToTerraform(struct!.agencyName),
    agency_project_id: cdktf.stringToTerraform(struct!.agencyProjectId),
  }
}


export function ltsTransferLogTransferInfoLogAgencyTransferToHclTerraform(struct?: LtsTransferLogTransferInfoLogAgencyTransferOutputReference | LtsTransferLogTransferInfoLogAgencyTransfer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    agency_domain_id: {
      value: cdktf.stringToHclTerraform(struct!.agencyDomainId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    agency_domain_name: {
      value: cdktf.stringToHclTerraform(struct!.agencyDomainName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    agency_name: {
      value: cdktf.stringToHclTerraform(struct!.agencyName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    agency_project_id: {
      value: cdktf.stringToHclTerraform(struct!.agencyProjectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsTransferLogTransferInfoLogAgencyTransferOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsTransferLogTransferInfoLogAgencyTransfer | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._agencyDomainId !== undefined) {
      hasAnyValues = true;
      internalValueResult.agencyDomainId = this._agencyDomainId;
    }
    if (this._agencyDomainName !== undefined) {
      hasAnyValues = true;
      internalValueResult.agencyDomainName = this._agencyDomainName;
    }
    if (this._agencyName !== undefined) {
      hasAnyValues = true;
      internalValueResult.agencyName = this._agencyName;
    }
    if (this._agencyProjectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.agencyProjectId = this._agencyProjectId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsTransferLogTransferInfoLogAgencyTransfer | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._agencyDomainId = undefined;
      this._agencyDomainName = undefined;
      this._agencyName = undefined;
      this._agencyProjectId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._agencyDomainId = value.agencyDomainId;
      this._agencyDomainName = value.agencyDomainName;
      this._agencyName = value.agencyName;
      this._agencyProjectId = value.agencyProjectId;
    }
  }

  // agency_domain_id - computed: false, optional: false, required: true
  private _agencyDomainId?: string; 
  public get agencyDomainId() {
    return this.getStringAttribute('agency_domain_id');
  }
  public set agencyDomainId(value: string) {
    this._agencyDomainId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyDomainIdInput() {
    return this._agencyDomainId;
  }

  // agency_domain_name - computed: false, optional: false, required: true
  private _agencyDomainName?: string; 
  public get agencyDomainName() {
    return this.getStringAttribute('agency_domain_name');
  }
  public set agencyDomainName(value: string) {
    this._agencyDomainName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyDomainNameInput() {
    return this._agencyDomainName;
  }

  // agency_name - computed: false, optional: false, required: true
  private _agencyName?: string; 
  public get agencyName() {
    return this.getStringAttribute('agency_name');
  }
  public set agencyName(value: string) {
    this._agencyName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyNameInput() {
    return this._agencyName;
  }

  // agency_project_id - computed: false, optional: false, required: true
  private _agencyProjectId?: string; 
  public get agencyProjectId() {
    return this.getStringAttribute('agency_project_id');
  }
  public set agencyProjectId(value: string) {
    this._agencyProjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyProjectIdInput() {
    return this._agencyProjectId;
  }
}
export interface LtsTransferLogTransferInfoLogTransferDetail {
  /**
  * The list of tag fields will be delivered when transferring.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#delivery_tags LtsTransfer#delivery_tags}
  */
  readonly deliveryTags?: string[];
  /**
  * DIS stream ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#dis_id LtsTransfer#dis_id}
  */
  readonly disId?: string;
  /**
  * DIS stream name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#dis_name LtsTransfer#dis_name}
  */
  readonly disName?: string;
  /**
  * Kafka ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#kafka_id LtsTransfer#kafka_id}
  */
  readonly kafkaId?: string;
  /**
  * Kafka topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#kafka_topic LtsTransfer#kafka_topic}
  */
  readonly kafkaTopic?: string;
  /**
  * OBS bucket name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_bucket_name LtsTransfer#obs_bucket_name}
  */
  readonly obsBucketName?: string;
  /**
  * Custom transfer path of an OBS transfer task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_dir_prefix_name LtsTransfer#obs_dir_prefix_name}
  */
  readonly obsDirPrefixName?: string;
  /**
  * Whether OBS bucket encryption is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_encrypted_enable LtsTransfer#obs_encrypted_enable}
  */
  readonly obsEncryptedEnable?: boolean | cdktf.IResolvable;
  /**
  * KMS key ID for an OBS transfer task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_encrypted_id LtsTransfer#obs_encrypted_id}
  */
  readonly obsEncryptedId?: string;
  /**
  * Enterprise project ID of an OBS transfer task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_eps_id LtsTransfer#obs_eps_id}
  */
  readonly obsEpsId?: string;
  /**
  * Length of the transfer interval for an OBS transfer task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_period LtsTransfer#obs_period}
  */
  readonly obsPeriod?: number;
  /**
  * Unit of the transfer interval for an OBS transfer task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_period_unit LtsTransfer#obs_period_unit}
  */
  readonly obsPeriodUnit?: string;
  /**
  * Transfer file prefix of an OBS transfer task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_prefix_name LtsTransfer#obs_prefix_name}
  */
  readonly obsPrefixName?: string;
  /**
  * Time zone for an OBS transfer task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_time_zone LtsTransfer#obs_time_zone}
  */
  readonly obsTimeZone?: string;
  /**
  * ID of the time zone for an OBS transfer task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_time_zone_id LtsTransfer#obs_time_zone_id}
  */
  readonly obsTimeZoneId?: string;
  /**
  * OBS bucket path, which is the log transfer destination.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#obs_transfer_path LtsTransfer#obs_transfer_path}
  */
  readonly obsTransferPath?: string;
}

export function ltsTransferLogTransferInfoLogTransferDetailToTerraform(struct?: LtsTransferLogTransferInfoLogTransferDetailOutputReference | LtsTransferLogTransferInfoLogTransferDetail): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    delivery_tags: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.deliveryTags),
    dis_id: cdktf.stringToTerraform(struct!.disId),
    dis_name: cdktf.stringToTerraform(struct!.disName),
    kafka_id: cdktf.stringToTerraform(struct!.kafkaId),
    kafka_topic: cdktf.stringToTerraform(struct!.kafkaTopic),
    obs_bucket_name: cdktf.stringToTerraform(struct!.obsBucketName),
    obs_dir_prefix_name: cdktf.stringToTerraform(struct!.obsDirPrefixName),
    obs_encrypted_enable: cdktf.booleanToTerraform(struct!.obsEncryptedEnable),
    obs_encrypted_id: cdktf.stringToTerraform(struct!.obsEncryptedId),
    obs_eps_id: cdktf.stringToTerraform(struct!.obsEpsId),
    obs_period: cdktf.numberToTerraform(struct!.obsPeriod),
    obs_period_unit: cdktf.stringToTerraform(struct!.obsPeriodUnit),
    obs_prefix_name: cdktf.stringToTerraform(struct!.obsPrefixName),
    obs_time_zone: cdktf.stringToTerraform(struct!.obsTimeZone),
    obs_time_zone_id: cdktf.stringToTerraform(struct!.obsTimeZoneId),
    obs_transfer_path: cdktf.stringToTerraform(struct!.obsTransferPath),
  }
}


export function ltsTransferLogTransferInfoLogTransferDetailToHclTerraform(struct?: LtsTransferLogTransferInfoLogTransferDetailOutputReference | LtsTransferLogTransferInfoLogTransferDetail): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    delivery_tags: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.deliveryTags),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    dis_id: {
      value: cdktf.stringToHclTerraform(struct!.disId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    dis_name: {
      value: cdktf.stringToHclTerraform(struct!.disName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    kafka_id: {
      value: cdktf.stringToHclTerraform(struct!.kafkaId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    kafka_topic: {
      value: cdktf.stringToHclTerraform(struct!.kafkaTopic),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_bucket_name: {
      value: cdktf.stringToHclTerraform(struct!.obsBucketName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_dir_prefix_name: {
      value: cdktf.stringToHclTerraform(struct!.obsDirPrefixName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_encrypted_enable: {
      value: cdktf.booleanToHclTerraform(struct!.obsEncryptedEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    obs_encrypted_id: {
      value: cdktf.stringToHclTerraform(struct!.obsEncryptedId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_eps_id: {
      value: cdktf.stringToHclTerraform(struct!.obsEpsId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_period: {
      value: cdktf.numberToHclTerraform(struct!.obsPeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    obs_period_unit: {
      value: cdktf.stringToHclTerraform(struct!.obsPeriodUnit),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_prefix_name: {
      value: cdktf.stringToHclTerraform(struct!.obsPrefixName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_time_zone: {
      value: cdktf.stringToHclTerraform(struct!.obsTimeZone),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_time_zone_id: {
      value: cdktf.stringToHclTerraform(struct!.obsTimeZoneId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_transfer_path: {
      value: cdktf.stringToHclTerraform(struct!.obsTransferPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsTransferLogTransferInfoLogTransferDetailOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsTransferLogTransferInfoLogTransferDetail | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._deliveryTags !== undefined) {
      hasAnyValues = true;
      internalValueResult.deliveryTags = this._deliveryTags;
    }
    if (this._disId !== undefined) {
      hasAnyValues = true;
      internalValueResult.disId = this._disId;
    }
    if (this._disName !== undefined) {
      hasAnyValues = true;
      internalValueResult.disName = this._disName;
    }
    if (this._kafkaId !== undefined) {
      hasAnyValues = true;
      internalValueResult.kafkaId = this._kafkaId;
    }
    if (this._kafkaTopic !== undefined) {
      hasAnyValues = true;
      internalValueResult.kafkaTopic = this._kafkaTopic;
    }
    if (this._obsBucketName !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsBucketName = this._obsBucketName;
    }
    if (this._obsDirPrefixName !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsDirPrefixName = this._obsDirPrefixName;
    }
    if (this._obsEncryptedEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsEncryptedEnable = this._obsEncryptedEnable;
    }
    if (this._obsEncryptedId !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsEncryptedId = this._obsEncryptedId;
    }
    if (this._obsEpsId !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsEpsId = this._obsEpsId;
    }
    if (this._obsPeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsPeriod = this._obsPeriod;
    }
    if (this._obsPeriodUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsPeriodUnit = this._obsPeriodUnit;
    }
    if (this._obsPrefixName !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsPrefixName = this._obsPrefixName;
    }
    if (this._obsTimeZone !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsTimeZone = this._obsTimeZone;
    }
    if (this._obsTimeZoneId !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsTimeZoneId = this._obsTimeZoneId;
    }
    if (this._obsTransferPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsTransferPath = this._obsTransferPath;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsTransferLogTransferInfoLogTransferDetail | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._deliveryTags = undefined;
      this._disId = undefined;
      this._disName = undefined;
      this._kafkaId = undefined;
      this._kafkaTopic = undefined;
      this._obsBucketName = undefined;
      this._obsDirPrefixName = undefined;
      this._obsEncryptedEnable = undefined;
      this._obsEncryptedId = undefined;
      this._obsEpsId = undefined;
      this._obsPeriod = undefined;
      this._obsPeriodUnit = undefined;
      this._obsPrefixName = undefined;
      this._obsTimeZone = undefined;
      this._obsTimeZoneId = undefined;
      this._obsTransferPath = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._deliveryTags = value.deliveryTags;
      this._disId = value.disId;
      this._disName = value.disName;
      this._kafkaId = value.kafkaId;
      this._kafkaTopic = value.kafkaTopic;
      this._obsBucketName = value.obsBucketName;
      this._obsDirPrefixName = value.obsDirPrefixName;
      this._obsEncryptedEnable = value.obsEncryptedEnable;
      this._obsEncryptedId = value.obsEncryptedId;
      this._obsEpsId = value.obsEpsId;
      this._obsPeriod = value.obsPeriod;
      this._obsPeriodUnit = value.obsPeriodUnit;
      this._obsPrefixName = value.obsPrefixName;
      this._obsTimeZone = value.obsTimeZone;
      this._obsTimeZoneId = value.obsTimeZoneId;
      this._obsTransferPath = value.obsTransferPath;
    }
  }

  // delivery_tags - computed: true, optional: true, required: false
  private _deliveryTags?: string[]; 
  public get deliveryTags() {
    return this.getListAttribute('delivery_tags');
  }
  public set deliveryTags(value: string[]) {
    this._deliveryTags = value;
  }
  public resetDeliveryTags() {
    this._deliveryTags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deliveryTagsInput() {
    return this._deliveryTags;
  }

  // dis_id - computed: true, optional: true, required: false
  private _disId?: string; 
  public get disId() {
    return this.getStringAttribute('dis_id');
  }
  public set disId(value: string) {
    this._disId = value;
  }
  public resetDisId() {
    this._disId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disIdInput() {
    return this._disId;
  }

  // dis_name - computed: true, optional: true, required: false
  private _disName?: string; 
  public get disName() {
    return this.getStringAttribute('dis_name');
  }
  public set disName(value: string) {
    this._disName = value;
  }
  public resetDisName() {
    this._disName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disNameInput() {
    return this._disName;
  }

  // kafka_id - computed: true, optional: true, required: false
  private _kafkaId?: string; 
  public get kafkaId() {
    return this.getStringAttribute('kafka_id');
  }
  public set kafkaId(value: string) {
    this._kafkaId = value;
  }
  public resetKafkaId() {
    this._kafkaId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaIdInput() {
    return this._kafkaId;
  }

  // kafka_topic - computed: true, optional: true, required: false
  private _kafkaTopic?: string; 
  public get kafkaTopic() {
    return this.getStringAttribute('kafka_topic');
  }
  public set kafkaTopic(value: string) {
    this._kafkaTopic = value;
  }
  public resetKafkaTopic() {
    this._kafkaTopic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaTopicInput() {
    return this._kafkaTopic;
  }

  // obs_bucket_name - computed: true, optional: true, required: false
  private _obsBucketName?: string; 
  public get obsBucketName() {
    return this.getStringAttribute('obs_bucket_name');
  }
  public set obsBucketName(value: string) {
    this._obsBucketName = value;
  }
  public resetObsBucketName() {
    this._obsBucketName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsBucketNameInput() {
    return this._obsBucketName;
  }

  // obs_dir_prefix_name - computed: true, optional: true, required: false
  private _obsDirPrefixName?: string; 
  public get obsDirPrefixName() {
    return this.getStringAttribute('obs_dir_prefix_name');
  }
  public set obsDirPrefixName(value: string) {
    this._obsDirPrefixName = value;
  }
  public resetObsDirPrefixName() {
    this._obsDirPrefixName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsDirPrefixNameInput() {
    return this._obsDirPrefixName;
  }

  // obs_encrypted_enable - computed: true, optional: true, required: false
  private _obsEncryptedEnable?: boolean | cdktf.IResolvable; 
  public get obsEncryptedEnable() {
    return this.getBooleanAttribute('obs_encrypted_enable');
  }
  public set obsEncryptedEnable(value: boolean | cdktf.IResolvable) {
    this._obsEncryptedEnable = value;
  }
  public resetObsEncryptedEnable() {
    this._obsEncryptedEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsEncryptedEnableInput() {
    return this._obsEncryptedEnable;
  }

  // obs_encrypted_id - computed: true, optional: true, required: false
  private _obsEncryptedId?: string; 
  public get obsEncryptedId() {
    return this.getStringAttribute('obs_encrypted_id');
  }
  public set obsEncryptedId(value: string) {
    this._obsEncryptedId = value;
  }
  public resetObsEncryptedId() {
    this._obsEncryptedId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsEncryptedIdInput() {
    return this._obsEncryptedId;
  }

  // obs_eps_id - computed: true, optional: true, required: false
  private _obsEpsId?: string; 
  public get obsEpsId() {
    return this.getStringAttribute('obs_eps_id');
  }
  public set obsEpsId(value: string) {
    this._obsEpsId = value;
  }
  public resetObsEpsId() {
    this._obsEpsId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsEpsIdInput() {
    return this._obsEpsId;
  }

  // obs_period - computed: true, optional: true, required: false
  private _obsPeriod?: number; 
  public get obsPeriod() {
    return this.getNumberAttribute('obs_period');
  }
  public set obsPeriod(value: number) {
    this._obsPeriod = value;
  }
  public resetObsPeriod() {
    this._obsPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsPeriodInput() {
    return this._obsPeriod;
  }

  // obs_period_unit - computed: true, optional: true, required: false
  private _obsPeriodUnit?: string; 
  public get obsPeriodUnit() {
    return this.getStringAttribute('obs_period_unit');
  }
  public set obsPeriodUnit(value: string) {
    this._obsPeriodUnit = value;
  }
  public resetObsPeriodUnit() {
    this._obsPeriodUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsPeriodUnitInput() {
    return this._obsPeriodUnit;
  }

  // obs_prefix_name - computed: true, optional: true, required: false
  private _obsPrefixName?: string; 
  public get obsPrefixName() {
    return this.getStringAttribute('obs_prefix_name');
  }
  public set obsPrefixName(value: string) {
    this._obsPrefixName = value;
  }
  public resetObsPrefixName() {
    this._obsPrefixName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsPrefixNameInput() {
    return this._obsPrefixName;
  }

  // obs_time_zone - computed: true, optional: true, required: false
  private _obsTimeZone?: string; 
  public get obsTimeZone() {
    return this.getStringAttribute('obs_time_zone');
  }
  public set obsTimeZone(value: string) {
    this._obsTimeZone = value;
  }
  public resetObsTimeZone() {
    this._obsTimeZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsTimeZoneInput() {
    return this._obsTimeZone;
  }

  // obs_time_zone_id - computed: true, optional: true, required: false
  private _obsTimeZoneId?: string; 
  public get obsTimeZoneId() {
    return this.getStringAttribute('obs_time_zone_id');
  }
  public set obsTimeZoneId(value: string) {
    this._obsTimeZoneId = value;
  }
  public resetObsTimeZoneId() {
    this._obsTimeZoneId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsTimeZoneIdInput() {
    return this._obsTimeZoneId;
  }

  // obs_transfer_path - computed: true, optional: true, required: false
  private _obsTransferPath?: string; 
  public get obsTransferPath() {
    return this.getStringAttribute('obs_transfer_path');
  }
  public set obsTransferPath(value: string) {
    this._obsTransferPath = value;
  }
  public resetObsTransferPath() {
    this._obsTransferPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsTransferPathInput() {
    return this._obsTransferPath;
  }
}
export interface LtsTransferLogTransferInfo {
  /**
  * Log transfer format.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_storage_format LtsTransfer#log_storage_format}
  */
  readonly logStorageFormat: string;
  /**
  * Log transfer mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_transfer_mode LtsTransfer#log_transfer_mode}
  */
  readonly logTransferMode: string;
  /**
  * Log transfer status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_transfer_status LtsTransfer#log_transfer_status}
  */
  readonly logTransferStatus: string;
  /**
  * Log transfer type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_transfer_type LtsTransfer#log_transfer_type}
  */
  readonly logTransferType: string;
  /**
  * log_agency_transfer block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_agency_transfer LtsTransfer#log_agency_transfer}
  */
  readonly logAgencyTransfer?: LtsTransferLogTransferInfoLogAgencyTransfer;
  /**
  * log_transfer_detail block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#log_transfer_detail LtsTransfer#log_transfer_detail}
  */
  readonly logTransferDetail: LtsTransferLogTransferInfoLogTransferDetail;
}

export function ltsTransferLogTransferInfoToTerraform(struct?: LtsTransferLogTransferInfoOutputReference | LtsTransferLogTransferInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    log_storage_format: cdktf.stringToTerraform(struct!.logStorageFormat),
    log_transfer_mode: cdktf.stringToTerraform(struct!.logTransferMode),
    log_transfer_status: cdktf.stringToTerraform(struct!.logTransferStatus),
    log_transfer_type: cdktf.stringToTerraform(struct!.logTransferType),
    log_agency_transfer: ltsTransferLogTransferInfoLogAgencyTransferToTerraform(struct!.logAgencyTransfer),
    log_transfer_detail: ltsTransferLogTransferInfoLogTransferDetailToTerraform(struct!.logTransferDetail),
  }
}


export function ltsTransferLogTransferInfoToHclTerraform(struct?: LtsTransferLogTransferInfoOutputReference | LtsTransferLogTransferInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    log_storage_format: {
      value: cdktf.stringToHclTerraform(struct!.logStorageFormat),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    log_transfer_mode: {
      value: cdktf.stringToHclTerraform(struct!.logTransferMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    log_transfer_status: {
      value: cdktf.stringToHclTerraform(struct!.logTransferStatus),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    log_transfer_type: {
      value: cdktf.stringToHclTerraform(struct!.logTransferType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    log_agency_transfer: {
      value: ltsTransferLogTransferInfoLogAgencyTransferToHclTerraform(struct!.logAgencyTransfer),
      isBlock: true,
      type: "list",
      storageClassType: "LtsTransferLogTransferInfoLogAgencyTransferList",
    },
    log_transfer_detail: {
      value: ltsTransferLogTransferInfoLogTransferDetailToHclTerraform(struct!.logTransferDetail),
      isBlock: true,
      type: "list",
      storageClassType: "LtsTransferLogTransferInfoLogTransferDetailList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsTransferLogTransferInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsTransferLogTransferInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._logStorageFormat !== undefined) {
      hasAnyValues = true;
      internalValueResult.logStorageFormat = this._logStorageFormat;
    }
    if (this._logTransferMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.logTransferMode = this._logTransferMode;
    }
    if (this._logTransferStatus !== undefined) {
      hasAnyValues = true;
      internalValueResult.logTransferStatus = this._logTransferStatus;
    }
    if (this._logTransferType !== undefined) {
      hasAnyValues = true;
      internalValueResult.logTransferType = this._logTransferType;
    }
    if (this._logAgencyTransfer?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.logAgencyTransfer = this._logAgencyTransfer?.internalValue;
    }
    if (this._logTransferDetail?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.logTransferDetail = this._logTransferDetail?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsTransferLogTransferInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._logStorageFormat = undefined;
      this._logTransferMode = undefined;
      this._logTransferStatus = undefined;
      this._logTransferType = undefined;
      this._logAgencyTransfer.internalValue = undefined;
      this._logTransferDetail.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._logStorageFormat = value.logStorageFormat;
      this._logTransferMode = value.logTransferMode;
      this._logTransferStatus = value.logTransferStatus;
      this._logTransferType = value.logTransferType;
      this._logAgencyTransfer.internalValue = value.logAgencyTransfer;
      this._logTransferDetail.internalValue = value.logTransferDetail;
    }
  }

  // log_storage_format - computed: false, optional: false, required: true
  private _logStorageFormat?: string; 
  public get logStorageFormat() {
    return this.getStringAttribute('log_storage_format');
  }
  public set logStorageFormat(value: string) {
    this._logStorageFormat = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStorageFormatInput() {
    return this._logStorageFormat;
  }

  // log_transfer_mode - computed: false, optional: false, required: true
  private _logTransferMode?: string; 
  public get logTransferMode() {
    return this.getStringAttribute('log_transfer_mode');
  }
  public set logTransferMode(value: string) {
    this._logTransferMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logTransferModeInput() {
    return this._logTransferMode;
  }

  // log_transfer_status - computed: false, optional: false, required: true
  private _logTransferStatus?: string; 
  public get logTransferStatus() {
    return this.getStringAttribute('log_transfer_status');
  }
  public set logTransferStatus(value: string) {
    this._logTransferStatus = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logTransferStatusInput() {
    return this._logTransferStatus;
  }

  // log_transfer_type - computed: false, optional: false, required: true
  private _logTransferType?: string; 
  public get logTransferType() {
    return this.getStringAttribute('log_transfer_type');
  }
  public set logTransferType(value: string) {
    this._logTransferType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logTransferTypeInput() {
    return this._logTransferType;
  }

  // log_agency_transfer - computed: false, optional: true, required: false
  private _logAgencyTransfer = new LtsTransferLogTransferInfoLogAgencyTransferOutputReference(this, "log_agency_transfer");
  public get logAgencyTransfer() {
    return this._logAgencyTransfer;
  }
  public putLogAgencyTransfer(value: LtsTransferLogTransferInfoLogAgencyTransfer) {
    this._logAgencyTransfer.internalValue = value;
  }
  public resetLogAgencyTransfer() {
    this._logAgencyTransfer.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logAgencyTransferInput() {
    return this._logAgencyTransfer.internalValue;
  }

  // log_transfer_detail - computed: false, optional: false, required: true
  private _logTransferDetail = new LtsTransferLogTransferInfoLogTransferDetailOutputReference(this, "log_transfer_detail");
  public get logTransferDetail() {
    return this._logTransferDetail;
  }
  public putLogTransferDetail(value: LtsTransferLogTransferInfoLogTransferDetail) {
    this._logTransferDetail.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logTransferDetailInput() {
    return this._logTransferDetail.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer huaweicloud_lts_transfer}
*/
export class LtsTransfer extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_transfer";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsTransfer resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsTransfer to import
  * @param importFromId The id of the existing LtsTransfer that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsTransfer to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_transfer", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_transfer huaweicloud_lts_transfer} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsTransferConfig
  */
  public constructor(scope: Construct, id: string, config: LtsTransferConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_transfer',
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
    this._logGroupId = config.logGroupId;
    this._region = config.region;
    this._logStreams.internalValue = config.logStreams;
    this._logTransferInfo.internalValue = config.logTransferInfo;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // log_group_id - computed: false, optional: false, required: true
  private _logGroupId?: string; 
  public get logGroupId() {
    return this.getStringAttribute('log_group_id');
  }
  public set logGroupId(value: string) {
    this._logGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupIdInput() {
    return this._logGroupId;
  }

  // log_group_name - computed: true, optional: false, required: false
  public get logGroupName() {
    return this.getStringAttribute('log_group_name');
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

  // log_streams - computed: false, optional: false, required: true
  private _logStreams = new LtsTransferLogStreamsList(this, "log_streams", false);
  public get logStreams() {
    return this._logStreams;
  }
  public putLogStreams(value: LtsTransferLogStreams[] | cdktf.IResolvable) {
    this._logStreams.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamsInput() {
    return this._logStreams.internalValue;
  }

  // log_transfer_info - computed: false, optional: false, required: true
  private _logTransferInfo = new LtsTransferLogTransferInfoOutputReference(this, "log_transfer_info");
  public get logTransferInfo() {
    return this._logTransferInfo;
  }
  public putLogTransferInfo(value: LtsTransferLogTransferInfo) {
    this._logTransferInfo.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logTransferInfoInput() {
    return this._logTransferInfo.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      log_group_id: cdktf.stringToTerraform(this._logGroupId),
      region: cdktf.stringToTerraform(this._region),
      log_streams: cdktf.listMapper(ltsTransferLogStreamsToTerraform, true)(this._logStreams.internalValue),
      log_transfer_info: ltsTransferLogTransferInfoToTerraform(this._logTransferInfo.internalValue),
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
      log_group_id: {
        value: cdktf.stringToHclTerraform(this._logGroupId),
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
      log_streams: {
        value: cdktf.listMapperHcl(ltsTransferLogStreamsToHclTerraform, true)(this._logStreams.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsTransferLogStreamsList",
      },
      log_transfer_info: {
        value: ltsTransferLogTransferInfoToHclTerraform(this._logTransferInfo.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsTransferLogTransferInfoList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

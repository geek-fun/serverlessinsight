// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_transfers
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudLtsTransfersConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_transfers#id DataHuaweicloudLtsTransfers#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the log group to which the log transfers and log streams belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_transfers#log_group_name DataHuaweicloudLtsTransfers#log_group_name}
  */
  readonly logGroupName?: string;
  /**
  * The name of the log stream to be transferred in the log transfer.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_transfers#log_stream_name DataHuaweicloudLtsTransfers#log_stream_name}
  */
  readonly logStreamName?: string;
  /**
  * The region in which to query log transfers.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_transfers#region DataHuaweicloudLtsTransfers#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudLtsTransfersTransfersLogStreams {
}

export function dataHuaweicloudLtsTransfersTransfersLogStreamsToTerraform(struct?: DataHuaweicloudLtsTransfersTransfersLogStreams): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsTransfersTransfersLogStreamsToHclTerraform(struct?: DataHuaweicloudLtsTransfersTransfersLogStreams): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsTransfersTransfersLogStreamsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudLtsTransfersTransfersLogStreams | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsTransfersTransfersLogStreams | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // log_stream_id - computed: true, optional: false, required: false
  public get logStreamId() {
    return this.getStringAttribute('log_stream_id');
  }

  // log_stream_name - computed: true, optional: false, required: false
  public get logStreamName() {
    return this.getStringAttribute('log_stream_name');
  }
}

export class DataHuaweicloudLtsTransfersTransfersLogStreamsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsTransfersTransfersLogStreamsOutputReference {
    return new DataHuaweicloudLtsTransfersTransfersLogStreamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransfer {
}

export function dataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransferToTerraform(struct?: DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransfer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransferToHclTerraform(struct?: DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransfer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransferOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransfer | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransfer | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // agency_domain_id - computed: true, optional: false, required: false
  public get agencyDomainId() {
    return this.getStringAttribute('agency_domain_id');
  }

  // agency_domain_name - computed: true, optional: false, required: false
  public get agencyDomainName() {
    return this.getStringAttribute('agency_domain_name');
  }

  // agency_name - computed: true, optional: false, required: false
  public get agencyName() {
    return this.getStringAttribute('agency_name');
  }

  // agency_project_id - computed: true, optional: false, required: false
  public get agencyProjectId() {
    return this.getStringAttribute('agency_project_id');
  }
}

export class DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransferList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransferOutputReference {
    return new DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransferOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetail {
}

export function dataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetailToTerraform(struct?: DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetail): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetailToHclTerraform(struct?: DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetail): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetailOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetail | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetail | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // delivery_tags - computed: true, optional: false, required: false
  public get deliveryTags() {
    return this.getListAttribute('delivery_tags');
  }

  // dis_id - computed: true, optional: false, required: false
  public get disId() {
    return this.getStringAttribute('dis_id');
  }

  // dis_name - computed: true, optional: false, required: false
  public get disName() {
    return this.getStringAttribute('dis_name');
  }

  // kafka_id - computed: true, optional: false, required: false
  public get kafkaId() {
    return this.getStringAttribute('kafka_id');
  }

  // kafka_topic - computed: true, optional: false, required: false
  public get kafkaTopic() {
    return this.getStringAttribute('kafka_topic');
  }

  // obs_bucket_name - computed: true, optional: false, required: false
  public get obsBucketName() {
    return this.getStringAttribute('obs_bucket_name');
  }

  // obs_dir_prefix_name - computed: true, optional: false, required: false
  public get obsDirPrefixName() {
    return this.getStringAttribute('obs_dir_prefix_name');
  }

  // obs_encrypted_enable - computed: true, optional: false, required: false
  public get obsEncryptedEnable() {
    return this.getBooleanAttribute('obs_encrypted_enable');
  }

  // obs_encrypted_id - computed: true, optional: false, required: false
  public get obsEncryptedId() {
    return this.getStringAttribute('obs_encrypted_id');
  }

  // obs_eps_id - computed: true, optional: false, required: false
  public get obsEpsId() {
    return this.getStringAttribute('obs_eps_id');
  }

  // obs_period - computed: true, optional: false, required: false
  public get obsPeriod() {
    return this.getNumberAttribute('obs_period');
  }

  // obs_period_unit - computed: true, optional: false, required: false
  public get obsPeriodUnit() {
    return this.getStringAttribute('obs_period_unit');
  }

  // obs_prefix_name - computed: true, optional: false, required: false
  public get obsPrefixName() {
    return this.getStringAttribute('obs_prefix_name');
  }

  // obs_time_zone - computed: true, optional: false, required: false
  public get obsTimeZone() {
    return this.getStringAttribute('obs_time_zone');
  }

  // obs_time_zone_id - computed: true, optional: false, required: false
  public get obsTimeZoneId() {
    return this.getStringAttribute('obs_time_zone_id');
  }

  // obs_transfer_path - computed: true, optional: false, required: false
  public get obsTransferPath() {
    return this.getStringAttribute('obs_transfer_path');
  }
}

export class DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetailList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetailOutputReference {
    return new DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetailOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudLtsTransfersTransfersLogTransferInfo {
}

export function dataHuaweicloudLtsTransfersTransfersLogTransferInfoToTerraform(struct?: DataHuaweicloudLtsTransfersTransfersLogTransferInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsTransfersTransfersLogTransferInfoToHclTerraform(struct?: DataHuaweicloudLtsTransfersTransfersLogTransferInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsTransfersTransfersLogTransferInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudLtsTransfersTransfersLogTransferInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsTransfersTransfersLogTransferInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // log_agency_transfer - computed: true, optional: false, required: false
  private _logAgencyTransfer = new DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogAgencyTransferList(this, "log_agency_transfer", false);
  public get logAgencyTransfer() {
    return this._logAgencyTransfer;
  }

  // log_storage_format - computed: true, optional: false, required: false
  public get logStorageFormat() {
    return this.getStringAttribute('log_storage_format');
  }

  // log_transfer_detail - computed: true, optional: false, required: false
  private _logTransferDetail = new DataHuaweicloudLtsTransfersTransfersLogTransferInfoLogTransferDetailList(this, "log_transfer_detail", false);
  public get logTransferDetail() {
    return this._logTransferDetail;
  }

  // log_transfer_mode - computed: true, optional: false, required: false
  public get logTransferMode() {
    return this.getStringAttribute('log_transfer_mode');
  }

  // log_transfer_status - computed: true, optional: false, required: false
  public get logTransferStatus() {
    return this.getStringAttribute('log_transfer_status');
  }

  // log_transfer_type - computed: true, optional: false, required: false
  public get logTransferType() {
    return this.getStringAttribute('log_transfer_type');
  }
}

export class DataHuaweicloudLtsTransfersTransfersLogTransferInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsTransfersTransfersLogTransferInfoOutputReference {
    return new DataHuaweicloudLtsTransfersTransfersLogTransferInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudLtsTransfersTransfers {
}

export function dataHuaweicloudLtsTransfersTransfersToTerraform(struct?: DataHuaweicloudLtsTransfersTransfers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsTransfersTransfersToHclTerraform(struct?: DataHuaweicloudLtsTransfersTransfers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsTransfersTransfersOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudLtsTransfersTransfers | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsTransfersTransfers | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // log_group_id - computed: true, optional: false, required: false
  public get logGroupId() {
    return this.getStringAttribute('log_group_id');
  }

  // log_group_name - computed: true, optional: false, required: false
  public get logGroupName() {
    return this.getStringAttribute('log_group_name');
  }

  // log_streams - computed: true, optional: false, required: false
  private _logStreams = new DataHuaweicloudLtsTransfersTransfersLogStreamsList(this, "log_streams", false);
  public get logStreams() {
    return this._logStreams;
  }

  // log_transfer_info - computed: true, optional: false, required: false
  private _logTransferInfo = new DataHuaweicloudLtsTransfersTransfersLogTransferInfoList(this, "log_transfer_info", false);
  public get logTransferInfo() {
    return this._logTransferInfo;
  }
}

export class DataHuaweicloudLtsTransfersTransfersList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsTransfersTransfersOutputReference {
    return new DataHuaweicloudLtsTransfersTransfersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_transfers huaweicloud_lts_transfers}
*/
export class DataHuaweicloudLtsTransfers extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_transfers";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudLtsTransfers resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudLtsTransfers to import
  * @param importFromId The id of the existing DataHuaweicloudLtsTransfers that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_transfers#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudLtsTransfers to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_transfers", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_transfers huaweicloud_lts_transfers} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudLtsTransfersConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudLtsTransfersConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_transfers',
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
    this._logGroupName = config.logGroupName;
    this._logStreamName = config.logStreamName;
    this._region = config.region;
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

  // log_group_name - computed: false, optional: true, required: false
  private _logGroupName?: string; 
  public get logGroupName() {
    return this.getStringAttribute('log_group_name');
  }
  public set logGroupName(value: string) {
    this._logGroupName = value;
  }
  public resetLogGroupName() {
    this._logGroupName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupNameInput() {
    return this._logGroupName;
  }

  // log_stream_name - computed: false, optional: true, required: false
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

  // transfers - computed: true, optional: false, required: false
  private _transfers = new DataHuaweicloudLtsTransfersTransfersList(this, "transfers", false);
  public get transfers() {
    return this._transfers;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      log_group_name: cdktf.stringToTerraform(this._logGroupName),
      log_stream_name: cdktf.stringToTerraform(this._logStreamName),
      region: cdktf.stringToTerraform(this._region),
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
      log_group_name: {
        value: cdktf.stringToHclTerraform(this._logGroupName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_stream_name: {
        value: cdktf.stringToHclTerraform(this._logStreamName),
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

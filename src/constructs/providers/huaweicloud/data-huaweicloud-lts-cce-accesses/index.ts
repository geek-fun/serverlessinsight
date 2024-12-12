// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudLtsCceAccessesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses#id DataHuaweicloudLtsCceAccesses#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the log group to which the access configurations and log streams belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses#log_group_name DataHuaweicloudLtsCceAccesses#log_group_name}
  */
  readonly logGroupName?: string;
  /**
  * The name of the log stream to which the access configurations belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses#log_stream_name DataHuaweicloudLtsCceAccesses#log_stream_name}
  */
  readonly logStreamName?: string;
  /**
  * The name of the CCE access.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses#name DataHuaweicloudLtsCceAccesses#name}
  */
  readonly name?: string;
  /**
  * The region in which to query CCE access configurations.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses#region DataHuaweicloudLtsCceAccesses#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses#tags DataHuaweicloudLtsCceAccesses#tags}
  */
  readonly tags?: { [key: string]: string };
}
export interface DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormat {
}

export function dataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormatToTerraform(struct?: DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormatToHclTerraform(struct?: DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormatOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormat | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormat | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // value - computed: true, optional: false, required: false
  public get value() {
    return this.getStringAttribute('value');
  }
}

export class DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormatList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormatOutputReference {
    return new DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormatOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormat {
}

export function dataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormatToTerraform(struct?: DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormatToHclTerraform(struct?: DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormatOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormat | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormat | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // value - computed: true, optional: false, required: false
  public get value() {
    return this.getStringAttribute('value');
  }
}

export class DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormatList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormatOutputReference {
    return new DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormatOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfo {
}

export function dataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfoToTerraform(struct?: DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfoToHclTerraform(struct?: DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // categorys - computed: true, optional: false, required: false
  public get categorys() {
    return this.getListAttribute('categorys');
  }

  // event_level - computed: true, optional: false, required: false
  public get eventLevel() {
    return this.getListAttribute('event_level');
  }

  // time_offset - computed: true, optional: false, required: false
  public get timeOffset() {
    return this.getNumberAttribute('time_offset');
  }

  // time_offset_unit - computed: true, optional: false, required: false
  public get timeOffsetUnit() {
    return this.getStringAttribute('time_offset_unit');
  }
}

export class DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfoOutputReference {
    return new DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudLtsCceAccessesAccessesAccessConfig {
}

export function dataHuaweicloudLtsCceAccessesAccessesAccessConfigToTerraform(struct?: DataHuaweicloudLtsCceAccessesAccessesAccessConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsCceAccessesAccessesAccessConfigToHclTerraform(struct?: DataHuaweicloudLtsCceAccessesAccessesAccessConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsCceAccessesAccessesAccessConfigOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudLtsCceAccessesAccessesAccessConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsCceAccessesAccessesAccessConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // black_paths - computed: true, optional: false, required: false
  public get blackPaths() {
    return this.getListAttribute('black_paths');
  }

  // container_name_regex - computed: true, optional: false, required: false
  public get containerNameRegex() {
    return this.getStringAttribute('container_name_regex');
  }

  // exclude_envs - computed: true, optional: false, required: false
  private _excludeEnvs = new cdktf.StringMap(this, "exclude_envs");
  public get excludeEnvs() {
    return this._excludeEnvs;
  }

  // exclude_k8s_labels - computed: true, optional: false, required: false
  private _excludeK8SLabels = new cdktf.StringMap(this, "exclude_k8s_labels");
  public get excludeK8SLabels() {
    return this._excludeK8SLabels;
  }

  // exclude_labels - computed: true, optional: false, required: false
  private _excludeLabels = new cdktf.StringMap(this, "exclude_labels");
  public get excludeLabels() {
    return this._excludeLabels;
  }

  // include_envs - computed: true, optional: false, required: false
  private _includeEnvs = new cdktf.StringMap(this, "include_envs");
  public get includeEnvs() {
    return this._includeEnvs;
  }

  // include_k8s_labels - computed: true, optional: false, required: false
  private _includeK8SLabels = new cdktf.StringMap(this, "include_k8s_labels");
  public get includeK8SLabels() {
    return this._includeK8SLabels;
  }

  // include_labels - computed: true, optional: false, required: false
  private _includeLabels = new cdktf.StringMap(this, "include_labels");
  public get includeLabels() {
    return this._includeLabels;
  }

  // log_envs - computed: true, optional: false, required: false
  private _logEnvs = new cdktf.StringMap(this, "log_envs");
  public get logEnvs() {
    return this._logEnvs;
  }

  // log_k8s - computed: true, optional: false, required: false
  private _logK8S = new cdktf.StringMap(this, "log_k8s");
  public get logK8S() {
    return this._logK8S;
  }

  // log_labels - computed: true, optional: false, required: false
  private _logLabels = new cdktf.StringMap(this, "log_labels");
  public get logLabels() {
    return this._logLabels;
  }

  // multi_log_format - computed: true, optional: false, required: false
  private _multiLogFormat = new DataHuaweicloudLtsCceAccessesAccessesAccessConfigMultiLogFormatList(this, "multi_log_format", false);
  public get multiLogFormat() {
    return this._multiLogFormat;
  }

  // name_space_regex - computed: true, optional: false, required: false
  public get nameSpaceRegex() {
    return this.getStringAttribute('name_space_regex');
  }

  // path_type - computed: true, optional: false, required: false
  public get pathType() {
    return this.getStringAttribute('path_type');
  }

  // paths - computed: true, optional: false, required: false
  public get paths() {
    return this.getListAttribute('paths');
  }

  // pod_name_regex - computed: true, optional: false, required: false
  public get podNameRegex() {
    return this.getStringAttribute('pod_name_regex');
  }

  // single_log_format - computed: true, optional: false, required: false
  private _singleLogFormat = new DataHuaweicloudLtsCceAccessesAccessesAccessConfigSingleLogFormatList(this, "single_log_format", false);
  public get singleLogFormat() {
    return this._singleLogFormat;
  }

  // stderr - computed: true, optional: false, required: false
  public get stderr() {
    return this.getBooleanAttribute('stderr');
  }

  // stdout - computed: true, optional: false, required: false
  public get stdout() {
    return this.getBooleanAttribute('stdout');
  }

  // windows_log_info - computed: true, optional: false, required: false
  private _windowsLogInfo = new DataHuaweicloudLtsCceAccessesAccessesAccessConfigWindowsLogInfoList(this, "windows_log_info", false);
  public get windowsLogInfo() {
    return this._windowsLogInfo;
  }
}

export class DataHuaweicloudLtsCceAccessesAccessesAccessConfigList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsCceAccessesAccessesAccessConfigOutputReference {
    return new DataHuaweicloudLtsCceAccessesAccessesAccessConfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudLtsCceAccessesAccesses {
}

export function dataHuaweicloudLtsCceAccessesAccessesToTerraform(struct?: DataHuaweicloudLtsCceAccessesAccesses): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudLtsCceAccessesAccessesToHclTerraform(struct?: DataHuaweicloudLtsCceAccessesAccesses): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudLtsCceAccessesAccessesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudLtsCceAccessesAccesses | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudLtsCceAccessesAccesses | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // access_config - computed: true, optional: false, required: false
  private _accessConfig = new DataHuaweicloudLtsCceAccessesAccessesAccessConfigList(this, "access_config", false);
  public get accessConfig() {
    return this._accessConfig;
  }

  // access_type - computed: true, optional: false, required: false
  public get accessType() {
    return this.getStringAttribute('access_type');
  }

  // binary_collect - computed: true, optional: false, required: false
  public get binaryCollect() {
    return this.getBooleanAttribute('binary_collect');
  }

  // cluster_id - computed: true, optional: false, required: false
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // host_group_ids - computed: true, optional: false, required: false
  public get hostGroupIds() {
    return this.getListAttribute('host_group_ids');
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

  // log_split - computed: true, optional: false, required: false
  public get logSplit() {
    return this.getBooleanAttribute('log_split');
  }

  // log_stream_id - computed: true, optional: false, required: false
  public get logStreamId() {
    return this.getStringAttribute('log_stream_id');
  }

  // log_stream_name - computed: true, optional: false, required: false
  public get logStreamName() {
    return this.getStringAttribute('log_stream_name');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // tags - computed: true, optional: false, required: false
  private _tags = new cdktf.StringMap(this, "tags");
  public get tags() {
    return this._tags;
  }
}

export class DataHuaweicloudLtsCceAccessesAccessesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudLtsCceAccessesAccessesOutputReference {
    return new DataHuaweicloudLtsCceAccessesAccessesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses huaweicloud_lts_cce_accesses}
*/
export class DataHuaweicloudLtsCceAccesses extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_cce_accesses";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudLtsCceAccesses resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudLtsCceAccesses to import
  * @param importFromId The id of the existing DataHuaweicloudLtsCceAccesses that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudLtsCceAccesses to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_cce_accesses", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/lts_cce_accesses huaweicloud_lts_cce_accesses} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudLtsCceAccessesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudLtsCceAccessesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_cce_accesses',
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
    this._name = config.name;
    this._region = config.region;
    this._tags = config.tags;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // accesses - computed: true, optional: false, required: false
  private _accesses = new DataHuaweicloudLtsCceAccessesAccessesList(this, "accesses", false);
  public get accesses() {
    return this._accesses;
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

  // name - computed: false, optional: true, required: false
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      log_group_name: cdktf.stringToTerraform(this._logGroupName),
      log_stream_name: cdktf.stringToTerraform(this._logStreamName),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

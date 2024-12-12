// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsAccessRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#cluster_id LtsAccessRule#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#cluster_name LtsAccessRule#cluster_name}
  */
  readonly clusterName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#deployments LtsAccessRule#deployments}
  */
  readonly deployments: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#id LtsAccessRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#name_space LtsAccessRule#name_space}
  */
  readonly nameSpace: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#region LtsAccessRule#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#rule_name LtsAccessRule#rule_name}
  */
  readonly ruleName: string;
  /**
  * files block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#files LtsAccessRule#files}
  */
  readonly files: LtsAccessRuleFiles[] | cdktf.IResolvable;
}
export interface LtsAccessRuleFilesLogStreamInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#target_log_group_id LtsAccessRule#target_log_group_id}
  */
  readonly targetLogGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#target_log_group_name LtsAccessRule#target_log_group_name}
  */
  readonly targetLogGroupName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#target_log_stream_id LtsAccessRule#target_log_stream_id}
  */
  readonly targetLogStreamId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#target_log_stream_name LtsAccessRule#target_log_stream_name}
  */
  readonly targetLogStreamName: string;
}

export function ltsAccessRuleFilesLogStreamInfoToTerraform(struct?: LtsAccessRuleFilesLogStreamInfo | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    target_log_group_id: cdktf.stringToTerraform(struct!.targetLogGroupId),
    target_log_group_name: cdktf.stringToTerraform(struct!.targetLogGroupName),
    target_log_stream_id: cdktf.stringToTerraform(struct!.targetLogStreamId),
    target_log_stream_name: cdktf.stringToTerraform(struct!.targetLogStreamName),
  }
}


export function ltsAccessRuleFilesLogStreamInfoToHclTerraform(struct?: LtsAccessRuleFilesLogStreamInfo | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    target_log_group_id: {
      value: cdktf.stringToHclTerraform(struct!.targetLogGroupId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_log_group_name: {
      value: cdktf.stringToHclTerraform(struct!.targetLogGroupName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_log_stream_id: {
      value: cdktf.stringToHclTerraform(struct!.targetLogStreamId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_log_stream_name: {
      value: cdktf.stringToHclTerraform(struct!.targetLogStreamName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsAccessRuleFilesLogStreamInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsAccessRuleFilesLogStreamInfo | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._targetLogGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLogGroupId = this._targetLogGroupId;
    }
    if (this._targetLogGroupName !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLogGroupName = this._targetLogGroupName;
    }
    if (this._targetLogStreamId !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLogStreamId = this._targetLogStreamId;
    }
    if (this._targetLogStreamName !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLogStreamName = this._targetLogStreamName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsAccessRuleFilesLogStreamInfo | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._targetLogGroupId = undefined;
      this._targetLogGroupName = undefined;
      this._targetLogStreamId = undefined;
      this._targetLogStreamName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._targetLogGroupId = value.targetLogGroupId;
      this._targetLogGroupName = value.targetLogGroupName;
      this._targetLogStreamId = value.targetLogStreamId;
      this._targetLogStreamName = value.targetLogStreamName;
    }
  }

  // target_log_group_id - computed: false, optional: false, required: true
  private _targetLogGroupId?: string; 
  public get targetLogGroupId() {
    return this.getStringAttribute('target_log_group_id');
  }
  public set targetLogGroupId(value: string) {
    this._targetLogGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetLogGroupIdInput() {
    return this._targetLogGroupId;
  }

  // target_log_group_name - computed: false, optional: false, required: true
  private _targetLogGroupName?: string; 
  public get targetLogGroupName() {
    return this.getStringAttribute('target_log_group_name');
  }
  public set targetLogGroupName(value: string) {
    this._targetLogGroupName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetLogGroupNameInput() {
    return this._targetLogGroupName;
  }

  // target_log_stream_id - computed: false, optional: false, required: true
  private _targetLogStreamId?: string; 
  public get targetLogStreamId() {
    return this.getStringAttribute('target_log_stream_id');
  }
  public set targetLogStreamId(value: string) {
    this._targetLogStreamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetLogStreamIdInput() {
    return this._targetLogStreamId;
  }

  // target_log_stream_name - computed: false, optional: false, required: true
  private _targetLogStreamName?: string; 
  public get targetLogStreamName() {
    return this.getStringAttribute('target_log_stream_name');
  }
  public set targetLogStreamName(value: string) {
    this._targetLogStreamName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetLogStreamNameInput() {
    return this._targetLogStreamName;
  }
}

export class LtsAccessRuleFilesLogStreamInfoList extends cdktf.ComplexList {
  public internalValue? : LtsAccessRuleFilesLogStreamInfo[] | cdktf.IResolvable

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
  public get(index: number): LtsAccessRuleFilesLogStreamInfoOutputReference {
    return new LtsAccessRuleFilesLogStreamInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LtsAccessRuleFiles {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#file_name LtsAccessRule#file_name}
  */
  readonly fileName: string;
  /**
  * log_stream_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#log_stream_info LtsAccessRule#log_stream_info}
  */
  readonly logStreamInfo: LtsAccessRuleFilesLogStreamInfo[] | cdktf.IResolvable;
}

export function ltsAccessRuleFilesToTerraform(struct?: LtsAccessRuleFiles | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    file_name: cdktf.stringToTerraform(struct!.fileName),
    log_stream_info: cdktf.listMapper(ltsAccessRuleFilesLogStreamInfoToTerraform, true)(struct!.logStreamInfo),
  }
}


export function ltsAccessRuleFilesToHclTerraform(struct?: LtsAccessRuleFiles | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    file_name: {
      value: cdktf.stringToHclTerraform(struct!.fileName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    log_stream_info: {
      value: cdktf.listMapperHcl(ltsAccessRuleFilesLogStreamInfoToHclTerraform, true)(struct!.logStreamInfo),
      isBlock: true,
      type: "list",
      storageClassType: "LtsAccessRuleFilesLogStreamInfoList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsAccessRuleFilesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsAccessRuleFiles | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._fileName !== undefined) {
      hasAnyValues = true;
      internalValueResult.fileName = this._fileName;
    }
    if (this._logStreamInfo?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.logStreamInfo = this._logStreamInfo?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsAccessRuleFiles | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._fileName = undefined;
      this._logStreamInfo.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._fileName = value.fileName;
      this._logStreamInfo.internalValue = value.logStreamInfo;
    }
  }

  // file_name - computed: false, optional: false, required: true
  private _fileName?: string; 
  public get fileName() {
    return this.getStringAttribute('file_name');
  }
  public set fileName(value: string) {
    this._fileName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fileNameInput() {
    return this._fileName;
  }

  // log_stream_info - computed: false, optional: false, required: true
  private _logStreamInfo = new LtsAccessRuleFilesLogStreamInfoList(this, "log_stream_info", false);
  public get logStreamInfo() {
    return this._logStreamInfo;
  }
  public putLogStreamInfo(value: LtsAccessRuleFilesLogStreamInfo[] | cdktf.IResolvable) {
    this._logStreamInfo.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamInfoInput() {
    return this._logStreamInfo.internalValue;
  }
}

export class LtsAccessRuleFilesList extends cdktf.ComplexList {
  public internalValue? : LtsAccessRuleFiles[] | cdktf.IResolvable

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
  public get(index: number): LtsAccessRuleFilesOutputReference {
    return new LtsAccessRuleFilesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule huaweicloud_lts_access_rule}
*/
export class LtsAccessRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_access_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsAccessRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsAccessRule to import
  * @param importFromId The id of the existing LtsAccessRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsAccessRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_access_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_access_rule huaweicloud_lts_access_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsAccessRuleConfig
  */
  public constructor(scope: Construct, id: string, config: LtsAccessRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_access_rule',
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
    this._clusterId = config.clusterId;
    this._clusterName = config.clusterName;
    this._deployments = config.deployments;
    this._id = config.id;
    this._nameSpace = config.nameSpace;
    this._region = config.region;
    this._ruleName = config.ruleName;
    this._files.internalValue = config.files;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cluster_id - computed: false, optional: false, required: true
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
  }

  // cluster_name - computed: false, optional: false, required: true
  private _clusterName?: string; 
  public get clusterName() {
    return this.getStringAttribute('cluster_name');
  }
  public set clusterName(value: string) {
    this._clusterName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterNameInput() {
    return this._clusterName;
  }

  // container_name - computed: true, optional: false, required: false
  public get containerName() {
    return this.getStringAttribute('container_name');
  }

  // deployments - computed: false, optional: false, required: true
  private _deployments?: string[]; 
  public get deployments() {
    return this.getListAttribute('deployments');
  }
  public set deployments(value: string[]) {
    this._deployments = value;
  }
  // Temporarily expose input value. Use with caution.
  public get deploymentsInput() {
    return this._deployments;
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

  // name_space - computed: false, optional: false, required: true
  private _nameSpace?: string; 
  public get nameSpace() {
    return this.getStringAttribute('name_space');
  }
  public set nameSpace(value: string) {
    this._nameSpace = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameSpaceInput() {
    return this._nameSpace;
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

  // rule_name - computed: false, optional: false, required: true
  private _ruleName?: string; 
  public get ruleName() {
    return this.getStringAttribute('rule_name');
  }
  public set ruleName(value: string) {
    this._ruleName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleNameInput() {
    return this._ruleName;
  }

  // files - computed: false, optional: false, required: true
  private _files = new LtsAccessRuleFilesList(this, "files", false);
  public get files() {
    return this._files;
  }
  public putFiles(value: LtsAccessRuleFiles[] | cdktf.IResolvable) {
    this._files.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get filesInput() {
    return this._files.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      cluster_name: cdktf.stringToTerraform(this._clusterName),
      deployments: cdktf.listMapper(cdktf.stringToTerraform, false)(this._deployments),
      id: cdktf.stringToTerraform(this._id),
      name_space: cdktf.stringToTerraform(this._nameSpace),
      region: cdktf.stringToTerraform(this._region),
      rule_name: cdktf.stringToTerraform(this._ruleName),
      files: cdktf.listMapper(ltsAccessRuleFilesToTerraform, true)(this._files.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_name: {
        value: cdktf.stringToHclTerraform(this._clusterName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      deployments: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._deployments),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name_space: {
        value: cdktf.stringToHclTerraform(this._nameSpace),
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
      rule_name: {
        value: cdktf.stringToHclTerraform(this._ruleName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      files: {
        value: cdktf.listMapperHcl(ltsAccessRuleFilesToHclTerraform, true)(this._files.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsAccessRuleFilesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

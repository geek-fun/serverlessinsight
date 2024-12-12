// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsLogConvergeConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#id LtsLogConverge#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The administrator account ID used to manage log converge.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#management_account_id LtsLogConverge#management_account_id}
  */
  readonly managementAccountId: string;
  /**
  * The administrator project ID that required for first-time use.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#management_project_id LtsLogConverge#management_project_id}
  */
  readonly managementProjectId?: string;
  /**
  * The member account ID to which the converged logs belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#member_account_id LtsLogConverge#member_account_id}
  */
  readonly memberAccountId: string;
  /**
  * The organization ID to which the converged logs belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#organization_id LtsLogConverge#organization_id}
  */
  readonly organizationId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#region LtsLogConverge#region}
  */
  readonly region?: string;
  /**
  * log_mapping_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#log_mapping_config LtsLogConverge#log_mapping_config}
  */
  readonly logMappingConfig: LtsLogConvergeLogMappingConfig[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#timeouts LtsLogConverge#timeouts}
  */
  readonly timeouts?: LtsLogConvergeTimeouts;
}
export interface LtsLogConvergeLogMappingConfigLogStreamConfig {
  /**
  * The ID of the log stream for source side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#source_log_stream_id LtsLogConverge#source_log_stream_id}
  */
  readonly sourceLogStreamId: string;
  /**
  * The ID of the log stream for target side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#target_log_stream_id LtsLogConverge#target_log_stream_id}
  */
  readonly targetLogStreamId?: string;
  /**
  * The name of the log group for target side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#target_log_stream_name LtsLogConverge#target_log_stream_name}
  */
  readonly targetLogStreamName: string;
  /**
  * The TTL of the log stream for target side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#target_log_stream_ttl LtsLogConverge#target_log_stream_ttl}
  */
  readonly targetLogStreamTtl: number;
}

export function ltsLogConvergeLogMappingConfigLogStreamConfigToTerraform(struct?: LtsLogConvergeLogMappingConfigLogStreamConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    source_log_stream_id: cdktf.stringToTerraform(struct!.sourceLogStreamId),
    target_log_stream_id: cdktf.stringToTerraform(struct!.targetLogStreamId),
    target_log_stream_name: cdktf.stringToTerraform(struct!.targetLogStreamName),
    target_log_stream_ttl: cdktf.numberToTerraform(struct!.targetLogStreamTtl),
  }
}


export function ltsLogConvergeLogMappingConfigLogStreamConfigToHclTerraform(struct?: LtsLogConvergeLogMappingConfigLogStreamConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    source_log_stream_id: {
      value: cdktf.stringToHclTerraform(struct!.sourceLogStreamId),
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
    target_log_stream_ttl: {
      value: cdktf.numberToHclTerraform(struct!.targetLogStreamTtl),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsLogConvergeLogMappingConfigLogStreamConfigOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsLogConvergeLogMappingConfigLogStreamConfig | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._sourceLogStreamId !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceLogStreamId = this._sourceLogStreamId;
    }
    if (this._targetLogStreamId !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLogStreamId = this._targetLogStreamId;
    }
    if (this._targetLogStreamName !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLogStreamName = this._targetLogStreamName;
    }
    if (this._targetLogStreamTtl !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLogStreamTtl = this._targetLogStreamTtl;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsLogConvergeLogMappingConfigLogStreamConfig | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._sourceLogStreamId = undefined;
      this._targetLogStreamId = undefined;
      this._targetLogStreamName = undefined;
      this._targetLogStreamTtl = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._sourceLogStreamId = value.sourceLogStreamId;
      this._targetLogStreamId = value.targetLogStreamId;
      this._targetLogStreamName = value.targetLogStreamName;
      this._targetLogStreamTtl = value.targetLogStreamTtl;
    }
  }

  // source_log_stream_id - computed: false, optional: false, required: true
  private _sourceLogStreamId?: string; 
  public get sourceLogStreamId() {
    return this.getStringAttribute('source_log_stream_id');
  }
  public set sourceLogStreamId(value: string) {
    this._sourceLogStreamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceLogStreamIdInput() {
    return this._sourceLogStreamId;
  }

  // target_log_stream_eps_id - computed: true, optional: false, required: false
  public get targetLogStreamEpsId() {
    return this.getStringAttribute('target_log_stream_eps_id');
  }

  // target_log_stream_id - computed: true, optional: true, required: false
  private _targetLogStreamId?: string; 
  public get targetLogStreamId() {
    return this.getStringAttribute('target_log_stream_id');
  }
  public set targetLogStreamId(value: string) {
    this._targetLogStreamId = value;
  }
  public resetTargetLogStreamId() {
    this._targetLogStreamId = undefined;
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

  // target_log_stream_ttl - computed: false, optional: false, required: true
  private _targetLogStreamTtl?: number; 
  public get targetLogStreamTtl() {
    return this.getNumberAttribute('target_log_stream_ttl');
  }
  public set targetLogStreamTtl(value: number) {
    this._targetLogStreamTtl = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetLogStreamTtlInput() {
    return this._targetLogStreamTtl;
  }
}

export class LtsLogConvergeLogMappingConfigLogStreamConfigList extends cdktf.ComplexList {
  public internalValue? : LtsLogConvergeLogMappingConfigLogStreamConfig[] | cdktf.IResolvable

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
  public get(index: number): LtsLogConvergeLogMappingConfigLogStreamConfigOutputReference {
    return new LtsLogConvergeLogMappingConfigLogStreamConfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LtsLogConvergeLogMappingConfig {
  /**
  * The ID of the log group for source side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#source_log_group_id LtsLogConverge#source_log_group_id}
  */
  readonly sourceLogGroupId: string;
  /**
  * The ID of the log group for target side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#target_log_group_id LtsLogConverge#target_log_group_id}
  */
  readonly targetLogGroupId?: string;
  /**
  * The name of the log group for target side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#target_log_group_name LtsLogConverge#target_log_group_name}
  */
  readonly targetLogGroupName: string;
  /**
  * log_stream_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#log_stream_config LtsLogConverge#log_stream_config}
  */
  readonly logStreamConfig?: LtsLogConvergeLogMappingConfigLogStreamConfig[] | cdktf.IResolvable;
}

export function ltsLogConvergeLogMappingConfigToTerraform(struct?: LtsLogConvergeLogMappingConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    source_log_group_id: cdktf.stringToTerraform(struct!.sourceLogGroupId),
    target_log_group_id: cdktf.stringToTerraform(struct!.targetLogGroupId),
    target_log_group_name: cdktf.stringToTerraform(struct!.targetLogGroupName),
    log_stream_config: cdktf.listMapper(ltsLogConvergeLogMappingConfigLogStreamConfigToTerraform, true)(struct!.logStreamConfig),
  }
}


export function ltsLogConvergeLogMappingConfigToHclTerraform(struct?: LtsLogConvergeLogMappingConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    source_log_group_id: {
      value: cdktf.stringToHclTerraform(struct!.sourceLogGroupId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
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
    log_stream_config: {
      value: cdktf.listMapperHcl(ltsLogConvergeLogMappingConfigLogStreamConfigToHclTerraform, true)(struct!.logStreamConfig),
      isBlock: true,
      type: "set",
      storageClassType: "LtsLogConvergeLogMappingConfigLogStreamConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsLogConvergeLogMappingConfigOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsLogConvergeLogMappingConfig | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._sourceLogGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceLogGroupId = this._sourceLogGroupId;
    }
    if (this._targetLogGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLogGroupId = this._targetLogGroupId;
    }
    if (this._targetLogGroupName !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLogGroupName = this._targetLogGroupName;
    }
    if (this._logStreamConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.logStreamConfig = this._logStreamConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsLogConvergeLogMappingConfig | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._sourceLogGroupId = undefined;
      this._targetLogGroupId = undefined;
      this._targetLogGroupName = undefined;
      this._logStreamConfig.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._sourceLogGroupId = value.sourceLogGroupId;
      this._targetLogGroupId = value.targetLogGroupId;
      this._targetLogGroupName = value.targetLogGroupName;
      this._logStreamConfig.internalValue = value.logStreamConfig;
    }
  }

  // source_log_group_id - computed: false, optional: false, required: true
  private _sourceLogGroupId?: string; 
  public get sourceLogGroupId() {
    return this.getStringAttribute('source_log_group_id');
  }
  public set sourceLogGroupId(value: string) {
    this._sourceLogGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceLogGroupIdInput() {
    return this._sourceLogGroupId;
  }

  // target_log_group_id - computed: true, optional: true, required: false
  private _targetLogGroupId?: string; 
  public get targetLogGroupId() {
    return this.getStringAttribute('target_log_group_id');
  }
  public set targetLogGroupId(value: string) {
    this._targetLogGroupId = value;
  }
  public resetTargetLogGroupId() {
    this._targetLogGroupId = undefined;
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

  // log_stream_config - computed: false, optional: true, required: false
  private _logStreamConfig = new LtsLogConvergeLogMappingConfigLogStreamConfigList(this, "log_stream_config", true);
  public get logStreamConfig() {
    return this._logStreamConfig;
  }
  public putLogStreamConfig(value: LtsLogConvergeLogMappingConfigLogStreamConfig[] | cdktf.IResolvable) {
    this._logStreamConfig.internalValue = value;
  }
  public resetLogStreamConfig() {
    this._logStreamConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamConfigInput() {
    return this._logStreamConfig.internalValue;
  }
}

export class LtsLogConvergeLogMappingConfigList extends cdktf.ComplexList {
  public internalValue? : LtsLogConvergeLogMappingConfig[] | cdktf.IResolvable

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
  public get(index: number): LtsLogConvergeLogMappingConfigOutputReference {
    return new LtsLogConvergeLogMappingConfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LtsLogConvergeTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#create LtsLogConverge#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#delete LtsLogConverge#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#update LtsLogConverge#update}
  */
  readonly update?: string;
}

export function ltsLogConvergeTimeoutsToTerraform(struct?: LtsLogConvergeTimeouts | cdktf.IResolvable): any {
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


export function ltsLogConvergeTimeoutsToHclTerraform(struct?: LtsLogConvergeTimeouts | cdktf.IResolvable): any {
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

export class LtsLogConvergeTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): LtsLogConvergeTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: LtsLogConvergeTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge huaweicloud_lts_log_converge}
*/
export class LtsLogConverge extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_log_converge";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsLogConverge resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsLogConverge to import
  * @param importFromId The id of the existing LtsLogConverge that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsLogConverge to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_log_converge", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_log_converge huaweicloud_lts_log_converge} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsLogConvergeConfig
  */
  public constructor(scope: Construct, id: string, config: LtsLogConvergeConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_log_converge',
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
    this._managementAccountId = config.managementAccountId;
    this._managementProjectId = config.managementProjectId;
    this._memberAccountId = config.memberAccountId;
    this._organizationId = config.organizationId;
    this._region = config.region;
    this._logMappingConfig.internalValue = config.logMappingConfig;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // management_account_id - computed: false, optional: false, required: true
  private _managementAccountId?: string; 
  public get managementAccountId() {
    return this.getStringAttribute('management_account_id');
  }
  public set managementAccountId(value: string) {
    this._managementAccountId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get managementAccountIdInput() {
    return this._managementAccountId;
  }

  // management_project_id - computed: true, optional: true, required: false
  private _managementProjectId?: string; 
  public get managementProjectId() {
    return this.getStringAttribute('management_project_id');
  }
  public set managementProjectId(value: string) {
    this._managementProjectId = value;
  }
  public resetManagementProjectId() {
    this._managementProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get managementProjectIdInput() {
    return this._managementProjectId;
  }

  // member_account_id - computed: false, optional: false, required: true
  private _memberAccountId?: string; 
  public get memberAccountId() {
    return this.getStringAttribute('member_account_id');
  }
  public set memberAccountId(value: string) {
    this._memberAccountId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get memberAccountIdInput() {
    return this._memberAccountId;
  }

  // organization_id - computed: false, optional: false, required: true
  private _organizationId?: string; 
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }
  public set organizationId(value: string) {
    this._organizationId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get organizationIdInput() {
    return this._organizationId;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // log_mapping_config - computed: false, optional: false, required: true
  private _logMappingConfig = new LtsLogConvergeLogMappingConfigList(this, "log_mapping_config", true);
  public get logMappingConfig() {
    return this._logMappingConfig;
  }
  public putLogMappingConfig(value: LtsLogConvergeLogMappingConfig[] | cdktf.IResolvable) {
    this._logMappingConfig.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logMappingConfigInput() {
    return this._logMappingConfig.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new LtsLogConvergeTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: LtsLogConvergeTimeouts) {
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
      id: cdktf.stringToTerraform(this._id),
      management_account_id: cdktf.stringToTerraform(this._managementAccountId),
      management_project_id: cdktf.stringToTerraform(this._managementProjectId),
      member_account_id: cdktf.stringToTerraform(this._memberAccountId),
      organization_id: cdktf.stringToTerraform(this._organizationId),
      region: cdktf.stringToTerraform(this._region),
      log_mapping_config: cdktf.listMapper(ltsLogConvergeLogMappingConfigToTerraform, true)(this._logMappingConfig.internalValue),
      timeouts: ltsLogConvergeTimeoutsToTerraform(this._timeouts.internalValue),
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
      management_account_id: {
        value: cdktf.stringToHclTerraform(this._managementAccountId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      management_project_id: {
        value: cdktf.stringToHclTerraform(this._managementProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      member_account_id: {
        value: cdktf.stringToHclTerraform(this._memberAccountId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      organization_id: {
        value: cdktf.stringToHclTerraform(this._organizationId),
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
      log_mapping_config: {
        value: cdktf.listMapperHcl(ltsLogConvergeLogMappingConfigToHclTerraform, true)(this._logMappingConfig.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "LtsLogConvergeLogMappingConfigList",
      },
      timeouts: {
        value: ltsLogConvergeTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "LtsLogConvergeTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

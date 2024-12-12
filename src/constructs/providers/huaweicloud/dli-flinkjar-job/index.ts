// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DliFlinkjarJobConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#checkpoint_path DliFlinkjarJob#checkpoint_path}
  */
  readonly checkpointPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#cu_num DliFlinkjarJob#cu_num}
  */
  readonly cuNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#dependency_files DliFlinkjarJob#dependency_files}
  */
  readonly dependencyFiles?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#dependency_jars DliFlinkjarJob#dependency_jars}
  */
  readonly dependencyJars?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#description DliFlinkjarJob#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#entrypoint DliFlinkjarJob#entrypoint}
  */
  readonly entrypoint?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#entrypoint_args DliFlinkjarJob#entrypoint_args}
  */
  readonly entrypointArgs?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#feature DliFlinkjarJob#feature}
  */
  readonly feature?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#flink_version DliFlinkjarJob#flink_version}
  */
  readonly flinkVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#id DliFlinkjarJob#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#image DliFlinkjarJob#image}
  */
  readonly image?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#log_enabled DliFlinkjarJob#log_enabled}
  */
  readonly logEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#main_class DliFlinkjarJob#main_class}
  */
  readonly mainClass?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#manager_cu_num DliFlinkjarJob#manager_cu_num}
  */
  readonly managerCuNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#name DliFlinkjarJob#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#obs_bucket DliFlinkjarJob#obs_bucket}
  */
  readonly obsBucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#parallel_num DliFlinkjarJob#parallel_num}
  */
  readonly parallelNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#queue_name DliFlinkjarJob#queue_name}
  */
  readonly queueName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#region DliFlinkjarJob#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#restart_when_exception DliFlinkjarJob#restart_when_exception}
  */
  readonly restartWhenException?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#resume_checkpoint DliFlinkjarJob#resume_checkpoint}
  */
  readonly resumeCheckpoint?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#resume_max_num DliFlinkjarJob#resume_max_num}
  */
  readonly resumeMaxNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#runtime_config DliFlinkjarJob#runtime_config}
  */
  readonly runtimeConfig?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#smn_topic DliFlinkjarJob#smn_topic}
  */
  readonly smnTopic?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#tags DliFlinkjarJob#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#tm_cu_num DliFlinkjarJob#tm_cu_num}
  */
  readonly tmCuNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#tm_slot_num DliFlinkjarJob#tm_slot_num}
  */
  readonly tmSlotNum?: number;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#timeouts DliFlinkjarJob#timeouts}
  */
  readonly timeouts?: DliFlinkjarJobTimeouts;
}
export interface DliFlinkjarJobTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#create DliFlinkjarJob#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#delete DliFlinkjarJob#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#update DliFlinkjarJob#update}
  */
  readonly update?: string;
}

export function dliFlinkjarJobTimeoutsToTerraform(struct?: DliFlinkjarJobTimeouts | cdktf.IResolvable): any {
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


export function dliFlinkjarJobTimeoutsToHclTerraform(struct?: DliFlinkjarJobTimeouts | cdktf.IResolvable): any {
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

export class DliFlinkjarJobTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DliFlinkjarJobTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DliFlinkjarJobTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job huaweicloud_dli_flinkjar_job}
*/
export class DliFlinkjarJob extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dli_flinkjar_job";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DliFlinkjarJob resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DliFlinkjarJob to import
  * @param importFromId The id of the existing DliFlinkjarJob that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DliFlinkjarJob to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dli_flinkjar_job", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinkjar_job huaweicloud_dli_flinkjar_job} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DliFlinkjarJobConfig
  */
  public constructor(scope: Construct, id: string, config: DliFlinkjarJobConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dli_flinkjar_job',
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
    this._checkpointPath = config.checkpointPath;
    this._cuNum = config.cuNum;
    this._dependencyFiles = config.dependencyFiles;
    this._dependencyJars = config.dependencyJars;
    this._description = config.description;
    this._entrypoint = config.entrypoint;
    this._entrypointArgs = config.entrypointArgs;
    this._feature = config.feature;
    this._flinkVersion = config.flinkVersion;
    this._id = config.id;
    this._image = config.image;
    this._logEnabled = config.logEnabled;
    this._mainClass = config.mainClass;
    this._managerCuNum = config.managerCuNum;
    this._name = config.name;
    this._obsBucket = config.obsBucket;
    this._parallelNum = config.parallelNum;
    this._queueName = config.queueName;
    this._region = config.region;
    this._restartWhenException = config.restartWhenException;
    this._resumeCheckpoint = config.resumeCheckpoint;
    this._resumeMaxNum = config.resumeMaxNum;
    this._runtimeConfig = config.runtimeConfig;
    this._smnTopic = config.smnTopic;
    this._tags = config.tags;
    this._tmCuNum = config.tmCuNum;
    this._tmSlotNum = config.tmSlotNum;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // checkpoint_path - computed: false, optional: true, required: false
  private _checkpointPath?: string; 
  public get checkpointPath() {
    return this.getStringAttribute('checkpoint_path');
  }
  public set checkpointPath(value: string) {
    this._checkpointPath = value;
  }
  public resetCheckpointPath() {
    this._checkpointPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get checkpointPathInput() {
    return this._checkpointPath;
  }

  // cu_num - computed: false, optional: true, required: false
  private _cuNum?: number; 
  public get cuNum() {
    return this.getNumberAttribute('cu_num');
  }
  public set cuNum(value: number) {
    this._cuNum = value;
  }
  public resetCuNum() {
    this._cuNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cuNumInput() {
    return this._cuNum;
  }

  // dependency_files - computed: false, optional: true, required: false
  private _dependencyFiles?: string[]; 
  public get dependencyFiles() {
    return this.getListAttribute('dependency_files');
  }
  public set dependencyFiles(value: string[]) {
    this._dependencyFiles = value;
  }
  public resetDependencyFiles() {
    this._dependencyFiles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependencyFilesInput() {
    return this._dependencyFiles;
  }

  // dependency_jars - computed: false, optional: true, required: false
  private _dependencyJars?: string[]; 
  public get dependencyJars() {
    return this.getListAttribute('dependency_jars');
  }
  public set dependencyJars(value: string[]) {
    this._dependencyJars = value;
  }
  public resetDependencyJars() {
    this._dependencyJars = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependencyJarsInput() {
    return this._dependencyJars;
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

  // entrypoint - computed: false, optional: true, required: false
  private _entrypoint?: string; 
  public get entrypoint() {
    return this.getStringAttribute('entrypoint');
  }
  public set entrypoint(value: string) {
    this._entrypoint = value;
  }
  public resetEntrypoint() {
    this._entrypoint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get entrypointInput() {
    return this._entrypoint;
  }

  // entrypoint_args - computed: false, optional: true, required: false
  private _entrypointArgs?: string; 
  public get entrypointArgs() {
    return this.getStringAttribute('entrypoint_args');
  }
  public set entrypointArgs(value: string) {
    this._entrypointArgs = value;
  }
  public resetEntrypointArgs() {
    this._entrypointArgs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get entrypointArgsInput() {
    return this._entrypointArgs;
  }

  // feature - computed: true, optional: true, required: false
  private _feature?: string; 
  public get feature() {
    return this.getStringAttribute('feature');
  }
  public set feature(value: string) {
    this._feature = value;
  }
  public resetFeature() {
    this._feature = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get featureInput() {
    return this._feature;
  }

  // flink_version - computed: true, optional: true, required: false
  private _flinkVersion?: string; 
  public get flinkVersion() {
    return this.getStringAttribute('flink_version');
  }
  public set flinkVersion(value: string) {
    this._flinkVersion = value;
  }
  public resetFlinkVersion() {
    this._flinkVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get flinkVersionInput() {
    return this._flinkVersion;
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

  // image - computed: false, optional: true, required: false
  private _image?: string; 
  public get image() {
    return this.getStringAttribute('image');
  }
  public set image(value: string) {
    this._image = value;
  }
  public resetImage() {
    this._image = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get imageInput() {
    return this._image;
  }

  // log_enabled - computed: false, optional: true, required: false
  private _logEnabled?: boolean | cdktf.IResolvable; 
  public get logEnabled() {
    return this.getBooleanAttribute('log_enabled');
  }
  public set logEnabled(value: boolean | cdktf.IResolvable) {
    this._logEnabled = value;
  }
  public resetLogEnabled() {
    this._logEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logEnabledInput() {
    return this._logEnabled;
  }

  // main_class - computed: false, optional: true, required: false
  private _mainClass?: string; 
  public get mainClass() {
    return this.getStringAttribute('main_class');
  }
  public set mainClass(value: string) {
    this._mainClass = value;
  }
  public resetMainClass() {
    this._mainClass = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mainClassInput() {
    return this._mainClass;
  }

  // manager_cu_num - computed: false, optional: true, required: false
  private _managerCuNum?: number; 
  public get managerCuNum() {
    return this.getNumberAttribute('manager_cu_num');
  }
  public set managerCuNum(value: number) {
    this._managerCuNum = value;
  }
  public resetManagerCuNum() {
    this._managerCuNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get managerCuNumInput() {
    return this._managerCuNum;
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

  // obs_bucket - computed: false, optional: true, required: false
  private _obsBucket?: string; 
  public get obsBucket() {
    return this.getStringAttribute('obs_bucket');
  }
  public set obsBucket(value: string) {
    this._obsBucket = value;
  }
  public resetObsBucket() {
    this._obsBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsBucketInput() {
    return this._obsBucket;
  }

  // parallel_num - computed: false, optional: true, required: false
  private _parallelNum?: number; 
  public get parallelNum() {
    return this.getNumberAttribute('parallel_num');
  }
  public set parallelNum(value: number) {
    this._parallelNum = value;
  }
  public resetParallelNum() {
    this._parallelNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parallelNumInput() {
    return this._parallelNum;
  }

  // queue_name - computed: true, optional: true, required: false
  private _queueName?: string; 
  public get queueName() {
    return this.getStringAttribute('queue_name');
  }
  public set queueName(value: string) {
    this._queueName = value;
  }
  public resetQueueName() {
    this._queueName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queueNameInput() {
    return this._queueName;
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

  // restart_when_exception - computed: false, optional: true, required: false
  private _restartWhenException?: boolean | cdktf.IResolvable; 
  public get restartWhenException() {
    return this.getBooleanAttribute('restart_when_exception');
  }
  public set restartWhenException(value: boolean | cdktf.IResolvable) {
    this._restartWhenException = value;
  }
  public resetRestartWhenException() {
    this._restartWhenException = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get restartWhenExceptionInput() {
    return this._restartWhenException;
  }

  // resume_checkpoint - computed: false, optional: true, required: false
  private _resumeCheckpoint?: boolean | cdktf.IResolvable; 
  public get resumeCheckpoint() {
    return this.getBooleanAttribute('resume_checkpoint');
  }
  public set resumeCheckpoint(value: boolean | cdktf.IResolvable) {
    this._resumeCheckpoint = value;
  }
  public resetResumeCheckpoint() {
    this._resumeCheckpoint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resumeCheckpointInput() {
    return this._resumeCheckpoint;
  }

  // resume_max_num - computed: false, optional: true, required: false
  private _resumeMaxNum?: number; 
  public get resumeMaxNum() {
    return this.getNumberAttribute('resume_max_num');
  }
  public set resumeMaxNum(value: number) {
    this._resumeMaxNum = value;
  }
  public resetResumeMaxNum() {
    this._resumeMaxNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resumeMaxNumInput() {
    return this._resumeMaxNum;
  }

  // runtime_config - computed: false, optional: true, required: false
  private _runtimeConfig?: { [key: string]: string }; 
  public get runtimeConfig() {
    return this.getStringMapAttribute('runtime_config');
  }
  public set runtimeConfig(value: { [key: string]: string }) {
    this._runtimeConfig = value;
  }
  public resetRuntimeConfig() {
    this._runtimeConfig = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimeConfigInput() {
    return this._runtimeConfig;
  }

  // smn_topic - computed: false, optional: true, required: false
  private _smnTopic?: string; 
  public get smnTopic() {
    return this.getStringAttribute('smn_topic');
  }
  public set smnTopic(value: string) {
    this._smnTopic = value;
  }
  public resetSmnTopic() {
    this._smnTopic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smnTopicInput() {
    return this._smnTopic;
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

  // tm_cu_num - computed: false, optional: true, required: false
  private _tmCuNum?: number; 
  public get tmCuNum() {
    return this.getNumberAttribute('tm_cu_num');
  }
  public set tmCuNum(value: number) {
    this._tmCuNum = value;
  }
  public resetTmCuNum() {
    this._tmCuNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tmCuNumInput() {
    return this._tmCuNum;
  }

  // tm_slot_num - computed: true, optional: true, required: false
  private _tmSlotNum?: number; 
  public get tmSlotNum() {
    return this.getNumberAttribute('tm_slot_num');
  }
  public set tmSlotNum(value: number) {
    this._tmSlotNum = value;
  }
  public resetTmSlotNum() {
    this._tmSlotNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tmSlotNumInput() {
    return this._tmSlotNum;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DliFlinkjarJobTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DliFlinkjarJobTimeouts) {
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
      checkpoint_path: cdktf.stringToTerraform(this._checkpointPath),
      cu_num: cdktf.numberToTerraform(this._cuNum),
      dependency_files: cdktf.listMapper(cdktf.stringToTerraform, false)(this._dependencyFiles),
      dependency_jars: cdktf.listMapper(cdktf.stringToTerraform, false)(this._dependencyJars),
      description: cdktf.stringToTerraform(this._description),
      entrypoint: cdktf.stringToTerraform(this._entrypoint),
      entrypoint_args: cdktf.stringToTerraform(this._entrypointArgs),
      feature: cdktf.stringToTerraform(this._feature),
      flink_version: cdktf.stringToTerraform(this._flinkVersion),
      id: cdktf.stringToTerraform(this._id),
      image: cdktf.stringToTerraform(this._image),
      log_enabled: cdktf.booleanToTerraform(this._logEnabled),
      main_class: cdktf.stringToTerraform(this._mainClass),
      manager_cu_num: cdktf.numberToTerraform(this._managerCuNum),
      name: cdktf.stringToTerraform(this._name),
      obs_bucket: cdktf.stringToTerraform(this._obsBucket),
      parallel_num: cdktf.numberToTerraform(this._parallelNum),
      queue_name: cdktf.stringToTerraform(this._queueName),
      region: cdktf.stringToTerraform(this._region),
      restart_when_exception: cdktf.booleanToTerraform(this._restartWhenException),
      resume_checkpoint: cdktf.booleanToTerraform(this._resumeCheckpoint),
      resume_max_num: cdktf.numberToTerraform(this._resumeMaxNum),
      runtime_config: cdktf.hashMapper(cdktf.stringToTerraform)(this._runtimeConfig),
      smn_topic: cdktf.stringToTerraform(this._smnTopic),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      tm_cu_num: cdktf.numberToTerraform(this._tmCuNum),
      tm_slot_num: cdktf.numberToTerraform(this._tmSlotNum),
      timeouts: dliFlinkjarJobTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      checkpoint_path: {
        value: cdktf.stringToHclTerraform(this._checkpointPath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cu_num: {
        value: cdktf.numberToHclTerraform(this._cuNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      dependency_files: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._dependencyFiles),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      dependency_jars: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._dependencyJars),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      entrypoint: {
        value: cdktf.stringToHclTerraform(this._entrypoint),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      entrypoint_args: {
        value: cdktf.stringToHclTerraform(this._entrypointArgs),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      feature: {
        value: cdktf.stringToHclTerraform(this._feature),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      flink_version: {
        value: cdktf.stringToHclTerraform(this._flinkVersion),
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
      image: {
        value: cdktf.stringToHclTerraform(this._image),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_enabled: {
        value: cdktf.booleanToHclTerraform(this._logEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      main_class: {
        value: cdktf.stringToHclTerraform(this._mainClass),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      manager_cu_num: {
        value: cdktf.numberToHclTerraform(this._managerCuNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      obs_bucket: {
        value: cdktf.stringToHclTerraform(this._obsBucket),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      parallel_num: {
        value: cdktf.numberToHclTerraform(this._parallelNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      queue_name: {
        value: cdktf.stringToHclTerraform(this._queueName),
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
      restart_when_exception: {
        value: cdktf.booleanToHclTerraform(this._restartWhenException),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      resume_checkpoint: {
        value: cdktf.booleanToHclTerraform(this._resumeCheckpoint),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      resume_max_num: {
        value: cdktf.numberToHclTerraform(this._resumeMaxNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      runtime_config: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._runtimeConfig),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      smn_topic: {
        value: cdktf.stringToHclTerraform(this._smnTopic),
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
      tm_cu_num: {
        value: cdktf.numberToHclTerraform(this._tmCuNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      tm_slot_num: {
        value: cdktf.numberToHclTerraform(this._tmSlotNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      timeouts: {
        value: dliFlinkjarJobTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DliFlinkjarJobTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

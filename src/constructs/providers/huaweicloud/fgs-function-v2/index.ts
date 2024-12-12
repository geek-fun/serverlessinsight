// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface FgsFunctionV2Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#agency FgsFunctionV2#agency}
  */
  readonly agency?: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#app FgsFunctionV2#app}
  */
  readonly app?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#app_agency FgsFunctionV2#app_agency}
  */
  readonly appAgency?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#code_filename FgsFunctionV2#code_filename}
  */
  readonly codeFilename?: string;
  /**
  * The code type of the function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#code_type FgsFunctionV2#code_type}
  */
  readonly codeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#code_url FgsFunctionV2#code_url}
  */
  readonly codeUrl?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#concurrency_num FgsFunctionV2#concurrency_num}
  */
  readonly concurrencyNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#depend_list FgsFunctionV2#depend_list}
  */
  readonly dependList?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#description FgsFunctionV2#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#dns_list FgsFunctionV2#dns_list}
  */
  readonly dnsList?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#encrypted_user_data FgsFunctionV2#encrypted_user_data}
  */
  readonly encryptedUserData?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#enterprise_project_id FgsFunctionV2#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#func_code FgsFunctionV2#func_code}
  */
  readonly funcCode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#functiongraph_version FgsFunctionV2#functiongraph_version}
  */
  readonly functiongraphVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#gpu_memory FgsFunctionV2#gpu_memory}
  */
  readonly gpuMemory?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#gpu_type FgsFunctionV2#gpu_type}
  */
  readonly gpuType?: string;
  /**
  * schema: Required; The entry point of the function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#handler FgsFunctionV2#handler}
  */
  readonly handler?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#id FgsFunctionV2#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#initializer_handler FgsFunctionV2#initializer_handler}
  */
  readonly initializerHandler?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#initializer_timeout FgsFunctionV2#initializer_timeout}
  */
  readonly initializerTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#log_group_id FgsFunctionV2#log_group_id}
  */
  readonly logGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#log_group_name FgsFunctionV2#log_group_name}
  */
  readonly logGroupName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#log_stream_id FgsFunctionV2#log_stream_id}
  */
  readonly logStreamId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#log_stream_name FgsFunctionV2#log_stream_name}
  */
  readonly logStreamName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#max_instance_num FgsFunctionV2#max_instance_num}
  */
  readonly maxInstanceNum?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#memory_size FgsFunctionV2#memory_size}
  */
  readonly memorySize: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#mount_user_group_id FgsFunctionV2#mount_user_group_id}
  */
  readonly mountUserGroupId?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#mount_user_id FgsFunctionV2#mount_user_id}
  */
  readonly mountUserId?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#name FgsFunctionV2#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#network_id FgsFunctionV2#network_id}
  */
  readonly networkId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#package FgsFunctionV2#package}
  */
  readonly package?: string;
  /**
  * schema: Internal; Specifies the pre-stop handler of a function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#pre_stop_handler FgsFunctionV2#pre_stop_handler}
  */
  readonly preStopHandler?: string;
  /**
  * schema: Internal; Specifies the maximum duration that the function can be initialized.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#pre_stop_timeout FgsFunctionV2#pre_stop_timeout}
  */
  readonly preStopTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#region FgsFunctionV2#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#runtime FgsFunctionV2#runtime}
  */
  readonly runtime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#tags FgsFunctionV2#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#timeout FgsFunctionV2#timeout}
  */
  readonly timeout: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#user_data FgsFunctionV2#user_data}
  */
  readonly userData?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#vpc_id FgsFunctionV2#vpc_id}
  */
  readonly vpcId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#xrole FgsFunctionV2#xrole}
  */
  readonly xrole?: string;
  /**
  * custom_image block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#custom_image FgsFunctionV2#custom_image}
  */
  readonly customImage?: FgsFunctionV2CustomImage;
  /**
  * func_mounts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#func_mounts FgsFunctionV2#func_mounts}
  */
  readonly funcMounts?: FgsFunctionV2FuncMounts[] | cdktf.IResolvable;
  /**
  * reserved_instances block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#reserved_instances FgsFunctionV2#reserved_instances}
  */
  readonly reservedInstances?: FgsFunctionV2ReservedInstances[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#timeouts FgsFunctionV2#timeouts}
  */
  readonly timeouts?: FgsFunctionV2Timeouts;
  /**
  * versions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#versions FgsFunctionV2#versions}
  */
  readonly versions?: FgsFunctionV2Versions[] | cdktf.IResolvable;
}
export interface FgsFunctionV2CustomImage {
  /**
  * Specifies the command line arguments used to start the SWR image.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#args FgsFunctionV2#args}
  */
  readonly args?: string;
  /**
  * Specifies the startup commands of the SWR image.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#command FgsFunctionV2#command}
  */
  readonly command?: string;
  /**
  * Specifies the URL of SWR image.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#url FgsFunctionV2#url}
  */
  readonly url: string;
  /**
  * schema: Internal; Specifies the user group ID for running the image.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#user_group_id FgsFunctionV2#user_group_id}
  */
  readonly userGroupId?: string;
  /**
  * schema: Internal; Specifies the user ID for running the image.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#user_id FgsFunctionV2#user_id}
  */
  readonly userId?: string;
  /**
  * Specifies the working directory of the SWR image.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#working_dir FgsFunctionV2#working_dir}
  */
  readonly workingDir?: string;
}

export function fgsFunctionV2CustomImageToTerraform(struct?: FgsFunctionV2CustomImageOutputReference | FgsFunctionV2CustomImage): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    args: cdktf.stringToTerraform(struct!.args),
    command: cdktf.stringToTerraform(struct!.command),
    url: cdktf.stringToTerraform(struct!.url),
    user_group_id: cdktf.stringToTerraform(struct!.userGroupId),
    user_id: cdktf.stringToTerraform(struct!.userId),
    working_dir: cdktf.stringToTerraform(struct!.workingDir),
  }
}


export function fgsFunctionV2CustomImageToHclTerraform(struct?: FgsFunctionV2CustomImageOutputReference | FgsFunctionV2CustomImage): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    args: {
      value: cdktf.stringToHclTerraform(struct!.args),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    command: {
      value: cdktf.stringToHclTerraform(struct!.command),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    url: {
      value: cdktf.stringToHclTerraform(struct!.url),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user_group_id: {
      value: cdktf.stringToHclTerraform(struct!.userGroupId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user_id: {
      value: cdktf.stringToHclTerraform(struct!.userId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    working_dir: {
      value: cdktf.stringToHclTerraform(struct!.workingDir),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsFunctionV2CustomImageOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsFunctionV2CustomImage | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._args !== undefined) {
      hasAnyValues = true;
      internalValueResult.args = this._args;
    }
    if (this._command !== undefined) {
      hasAnyValues = true;
      internalValueResult.command = this._command;
    }
    if (this._url !== undefined) {
      hasAnyValues = true;
      internalValueResult.url = this._url;
    }
    if (this._userGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.userGroupId = this._userGroupId;
    }
    if (this._userId !== undefined) {
      hasAnyValues = true;
      internalValueResult.userId = this._userId;
    }
    if (this._workingDir !== undefined) {
      hasAnyValues = true;
      internalValueResult.workingDir = this._workingDir;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsFunctionV2CustomImage | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._args = undefined;
      this._command = undefined;
      this._url = undefined;
      this._userGroupId = undefined;
      this._userId = undefined;
      this._workingDir = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._args = value.args;
      this._command = value.command;
      this._url = value.url;
      this._userGroupId = value.userGroupId;
      this._userId = value.userId;
      this._workingDir = value.workingDir;
    }
  }

  // args - computed: false, optional: true, required: false
  private _args?: string; 
  public get args() {
    return this.getStringAttribute('args');
  }
  public set args(value: string) {
    this._args = value;
  }
  public resetArgs() {
    this._args = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get argsInput() {
    return this._args;
  }

  // command - computed: false, optional: true, required: false
  private _command?: string; 
  public get command() {
    return this.getStringAttribute('command');
  }
  public set command(value: string) {
    this._command = value;
  }
  public resetCommand() {
    this._command = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get commandInput() {
    return this._command;
  }

  // url - computed: false, optional: false, required: true
  private _url?: string; 
  public get url() {
    return this.getStringAttribute('url');
  }
  public set url(value: string) {
    this._url = value;
  }
  // Temporarily expose input value. Use with caution.
  public get urlInput() {
    return this._url;
  }

  // user_group_id - computed: false, optional: true, required: false
  private _userGroupId?: string; 
  public get userGroupId() {
    return this.getStringAttribute('user_group_id');
  }
  public set userGroupId(value: string) {
    this._userGroupId = value;
  }
  public resetUserGroupId() {
    this._userGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userGroupIdInput() {
    return this._userGroupId;
  }

  // user_id - computed: false, optional: true, required: false
  private _userId?: string; 
  public get userId() {
    return this.getStringAttribute('user_id');
  }
  public set userId(value: string) {
    this._userId = value;
  }
  public resetUserId() {
    this._userId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userIdInput() {
    return this._userId;
  }

  // working_dir - computed: true, optional: true, required: false
  private _workingDir?: string; 
  public get workingDir() {
    return this.getStringAttribute('working_dir');
  }
  public set workingDir(value: string) {
    this._workingDir = value;
  }
  public resetWorkingDir() {
    this._workingDir = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get workingDirInput() {
    return this._workingDir;
  }
}
export interface FgsFunctionV2FuncMounts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#local_mount_path FgsFunctionV2#local_mount_path}
  */
  readonly localMountPath: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#mount_resource FgsFunctionV2#mount_resource}
  */
  readonly mountResource: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#mount_share_path FgsFunctionV2#mount_share_path}
  */
  readonly mountSharePath: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#mount_type FgsFunctionV2#mount_type}
  */
  readonly mountType: string;
}

export function fgsFunctionV2FuncMountsToTerraform(struct?: FgsFunctionV2FuncMounts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    local_mount_path: cdktf.stringToTerraform(struct!.localMountPath),
    mount_resource: cdktf.stringToTerraform(struct!.mountResource),
    mount_share_path: cdktf.stringToTerraform(struct!.mountSharePath),
    mount_type: cdktf.stringToTerraform(struct!.mountType),
  }
}


export function fgsFunctionV2FuncMountsToHclTerraform(struct?: FgsFunctionV2FuncMounts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    local_mount_path: {
      value: cdktf.stringToHclTerraform(struct!.localMountPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mount_resource: {
      value: cdktf.stringToHclTerraform(struct!.mountResource),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mount_share_path: {
      value: cdktf.stringToHclTerraform(struct!.mountSharePath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mount_type: {
      value: cdktf.stringToHclTerraform(struct!.mountType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsFunctionV2FuncMountsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): FgsFunctionV2FuncMounts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._localMountPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.localMountPath = this._localMountPath;
    }
    if (this._mountResource !== undefined) {
      hasAnyValues = true;
      internalValueResult.mountResource = this._mountResource;
    }
    if (this._mountSharePath !== undefined) {
      hasAnyValues = true;
      internalValueResult.mountSharePath = this._mountSharePath;
    }
    if (this._mountType !== undefined) {
      hasAnyValues = true;
      internalValueResult.mountType = this._mountType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsFunctionV2FuncMounts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._localMountPath = undefined;
      this._mountResource = undefined;
      this._mountSharePath = undefined;
      this._mountType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._localMountPath = value.localMountPath;
      this._mountResource = value.mountResource;
      this._mountSharePath = value.mountSharePath;
      this._mountType = value.mountType;
    }
  }

  // local_mount_path - computed: false, optional: false, required: true
  private _localMountPath?: string; 
  public get localMountPath() {
    return this.getStringAttribute('local_mount_path');
  }
  public set localMountPath(value: string) {
    this._localMountPath = value;
  }
  // Temporarily expose input value. Use with caution.
  public get localMountPathInput() {
    return this._localMountPath;
  }

  // mount_resource - computed: false, optional: false, required: true
  private _mountResource?: string; 
  public get mountResource() {
    return this.getStringAttribute('mount_resource');
  }
  public set mountResource(value: string) {
    this._mountResource = value;
  }
  // Temporarily expose input value. Use with caution.
  public get mountResourceInput() {
    return this._mountResource;
  }

  // mount_share_path - computed: false, optional: false, required: true
  private _mountSharePath?: string; 
  public get mountSharePath() {
    return this.getStringAttribute('mount_share_path');
  }
  public set mountSharePath(value: string) {
    this._mountSharePath = value;
  }
  // Temporarily expose input value. Use with caution.
  public get mountSharePathInput() {
    return this._mountSharePath;
  }

  // mount_type - computed: false, optional: false, required: true
  private _mountType?: string; 
  public get mountType() {
    return this.getStringAttribute('mount_type');
  }
  public set mountType(value: string) {
    this._mountType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get mountTypeInput() {
    return this._mountType;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }
}

export class FgsFunctionV2FuncMountsList extends cdktf.ComplexList {
  public internalValue? : FgsFunctionV2FuncMounts[] | cdktf.IResolvable

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
  public get(index: number): FgsFunctionV2FuncMountsOutputReference {
    return new FgsFunctionV2FuncMountsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface FgsFunctionV2ReservedInstancesTacticsConfigCronConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#count FgsFunctionV2#count}
  */
  readonly count: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#cron FgsFunctionV2#cron}
  */
  readonly cron: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#expired_time FgsFunctionV2#expired_time}
  */
  readonly expiredTime: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#name FgsFunctionV2#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#start_time FgsFunctionV2#start_time}
  */
  readonly startTime: number;
}

export function fgsFunctionV2ReservedInstancesTacticsConfigCronConfigsToTerraform(struct?: FgsFunctionV2ReservedInstancesTacticsConfigCronConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    count: cdktf.numberToTerraform(struct!.count),
    cron: cdktf.stringToTerraform(struct!.cron),
    expired_time: cdktf.numberToTerraform(struct!.expiredTime),
    name: cdktf.stringToTerraform(struct!.name),
    start_time: cdktf.numberToTerraform(struct!.startTime),
  }
}


export function fgsFunctionV2ReservedInstancesTacticsConfigCronConfigsToHclTerraform(struct?: FgsFunctionV2ReservedInstancesTacticsConfigCronConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    count: {
      value: cdktf.numberToHclTerraform(struct!.count),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    cron: {
      value: cdktf.stringToHclTerraform(struct!.cron),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    expired_time: {
      value: cdktf.numberToHclTerraform(struct!.expiredTime),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    start_time: {
      value: cdktf.numberToHclTerraform(struct!.startTime),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsFunctionV2ReservedInstancesTacticsConfigCronConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): FgsFunctionV2ReservedInstancesTacticsConfigCronConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._count !== undefined) {
      hasAnyValues = true;
      internalValueResult.count = this._count;
    }
    if (this._cron !== undefined) {
      hasAnyValues = true;
      internalValueResult.cron = this._cron;
    }
    if (this._expiredTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.expiredTime = this._expiredTime;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsFunctionV2ReservedInstancesTacticsConfigCronConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._count = undefined;
      this._cron = undefined;
      this._expiredTime = undefined;
      this._name = undefined;
      this._startTime = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._count = value.count;
      this._cron = value.cron;
      this._expiredTime = value.expiredTime;
      this._name = value.name;
      this._startTime = value.startTime;
    }
  }

  // count - computed: false, optional: false, required: true
  private _count?: number; 
  public get count() {
    return this.getNumberAttribute('count');
  }
  public set count(value: number) {
    this._count = value;
  }
  // Temporarily expose input value. Use with caution.
  public get countInput() {
    return this._count;
  }

  // cron - computed: false, optional: false, required: true
  private _cron?: string; 
  public get cron() {
    return this.getStringAttribute('cron');
  }
  public set cron(value: string) {
    this._cron = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cronInput() {
    return this._cron;
  }

  // expired_time - computed: false, optional: false, required: true
  private _expiredTime?: number; 
  public get expiredTime() {
    return this.getNumberAttribute('expired_time');
  }
  public set expiredTime(value: number) {
    this._expiredTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get expiredTimeInput() {
    return this._expiredTime;
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

  // start_time - computed: false, optional: false, required: true
  private _startTime?: number; 
  public get startTime() {
    return this.getNumberAttribute('start_time');
  }
  public set startTime(value: number) {
    this._startTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }
}

export class FgsFunctionV2ReservedInstancesTacticsConfigCronConfigsList extends cdktf.ComplexList {
  public internalValue? : FgsFunctionV2ReservedInstancesTacticsConfigCronConfigs[] | cdktf.IResolvable

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
  public get(index: number): FgsFunctionV2ReservedInstancesTacticsConfigCronConfigsOutputReference {
    return new FgsFunctionV2ReservedInstancesTacticsConfigCronConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#min FgsFunctionV2#min}
  */
  readonly min: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#name FgsFunctionV2#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#threshold FgsFunctionV2#threshold}
  */
  readonly threshold: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#type FgsFunctionV2#type}
  */
  readonly type: string;
}

export function fgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsToTerraform(struct?: FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    min: cdktf.numberToTerraform(struct!.min),
    name: cdktf.stringToTerraform(struct!.name),
    threshold: cdktf.numberToTerraform(struct!.threshold),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function fgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsToHclTerraform(struct?: FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    min: {
      value: cdktf.numberToHclTerraform(struct!.min),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    threshold: {
      value: cdktf.numberToHclTerraform(struct!.threshold),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
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

export class FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._min !== undefined) {
      hasAnyValues = true;
      internalValueResult.min = this._min;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._threshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.threshold = this._threshold;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._min = undefined;
      this._name = undefined;
      this._threshold = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._min = value.min;
      this._name = value.name;
      this._threshold = value.threshold;
      this._type = value.type;
    }
  }

  // min - computed: false, optional: false, required: true
  private _min?: number; 
  public get min() {
    return this.getNumberAttribute('min');
  }
  public set min(value: number) {
    this._min = value;
  }
  // Temporarily expose input value. Use with caution.
  public get minInput() {
    return this._min;
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

  // threshold - computed: false, optional: false, required: true
  private _threshold?: number; 
  public get threshold() {
    return this.getNumberAttribute('threshold');
  }
  public set threshold(value: number) {
    this._threshold = value;
  }
  // Temporarily expose input value. Use with caution.
  public get thresholdInput() {
    return this._threshold;
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

export class FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsList extends cdktf.ComplexList {
  public internalValue? : FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigs[] | cdktf.IResolvable

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
  public get(index: number): FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsOutputReference {
    return new FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface FgsFunctionV2ReservedInstancesTacticsConfig {
  /**
  * cron_configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#cron_configs FgsFunctionV2#cron_configs}
  */
  readonly cronConfigs?: FgsFunctionV2ReservedInstancesTacticsConfigCronConfigs[] | cdktf.IResolvable;
  /**
  * metric_configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#metric_configs FgsFunctionV2#metric_configs}
  */
  readonly metricConfigs?: FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigs[] | cdktf.IResolvable;
}

export function fgsFunctionV2ReservedInstancesTacticsConfigToTerraform(struct?: FgsFunctionV2ReservedInstancesTacticsConfigOutputReference | FgsFunctionV2ReservedInstancesTacticsConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cron_configs: cdktf.listMapper(fgsFunctionV2ReservedInstancesTacticsConfigCronConfigsToTerraform, true)(struct!.cronConfigs),
    metric_configs: cdktf.listMapper(fgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsToTerraform, true)(struct!.metricConfigs),
  }
}


export function fgsFunctionV2ReservedInstancesTacticsConfigToHclTerraform(struct?: FgsFunctionV2ReservedInstancesTacticsConfigOutputReference | FgsFunctionV2ReservedInstancesTacticsConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cron_configs: {
      value: cdktf.listMapperHcl(fgsFunctionV2ReservedInstancesTacticsConfigCronConfigsToHclTerraform, true)(struct!.cronConfigs),
      isBlock: true,
      type: "list",
      storageClassType: "FgsFunctionV2ReservedInstancesTacticsConfigCronConfigsList",
    },
    metric_configs: {
      value: cdktf.listMapperHcl(fgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsToHclTerraform, true)(struct!.metricConfigs),
      isBlock: true,
      type: "list",
      storageClassType: "FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsFunctionV2ReservedInstancesTacticsConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsFunctionV2ReservedInstancesTacticsConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cronConfigs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.cronConfigs = this._cronConfigs?.internalValue;
    }
    if (this._metricConfigs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricConfigs = this._metricConfigs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsFunctionV2ReservedInstancesTacticsConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._cronConfigs.internalValue = undefined;
      this._metricConfigs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._cronConfigs.internalValue = value.cronConfigs;
      this._metricConfigs.internalValue = value.metricConfigs;
    }
  }

  // cron_configs - computed: false, optional: true, required: false
  private _cronConfigs = new FgsFunctionV2ReservedInstancesTacticsConfigCronConfigsList(this, "cron_configs", false);
  public get cronConfigs() {
    return this._cronConfigs;
  }
  public putCronConfigs(value: FgsFunctionV2ReservedInstancesTacticsConfigCronConfigs[] | cdktf.IResolvable) {
    this._cronConfigs.internalValue = value;
  }
  public resetCronConfigs() {
    this._cronConfigs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cronConfigsInput() {
    return this._cronConfigs.internalValue;
  }

  // metric_configs - computed: false, optional: true, required: false
  private _metricConfigs = new FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigsList(this, "metric_configs", false);
  public get metricConfigs() {
    return this._metricConfigs;
  }
  public putMetricConfigs(value: FgsFunctionV2ReservedInstancesTacticsConfigMetricConfigs[] | cdktf.IResolvable) {
    this._metricConfigs.internalValue = value;
  }
  public resetMetricConfigs() {
    this._metricConfigs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricConfigsInput() {
    return this._metricConfigs.internalValue;
  }
}
export interface FgsFunctionV2ReservedInstances {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#count FgsFunctionV2#count}
  */
  readonly count: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#idle_mode FgsFunctionV2#idle_mode}
  */
  readonly idleMode?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#qualifier_name FgsFunctionV2#qualifier_name}
  */
  readonly qualifierName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#qualifier_type FgsFunctionV2#qualifier_type}
  */
  readonly qualifierType: string;
  /**
  * tactics_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#tactics_config FgsFunctionV2#tactics_config}
  */
  readonly tacticsConfig?: FgsFunctionV2ReservedInstancesTacticsConfig;
}

export function fgsFunctionV2ReservedInstancesToTerraform(struct?: FgsFunctionV2ReservedInstances | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    count: cdktf.numberToTerraform(struct!.count),
    idle_mode: cdktf.booleanToTerraform(struct!.idleMode),
    qualifier_name: cdktf.stringToTerraform(struct!.qualifierName),
    qualifier_type: cdktf.stringToTerraform(struct!.qualifierType),
    tactics_config: fgsFunctionV2ReservedInstancesTacticsConfigToTerraform(struct!.tacticsConfig),
  }
}


export function fgsFunctionV2ReservedInstancesToHclTerraform(struct?: FgsFunctionV2ReservedInstances | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    count: {
      value: cdktf.numberToHclTerraform(struct!.count),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    idle_mode: {
      value: cdktf.booleanToHclTerraform(struct!.idleMode),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    qualifier_name: {
      value: cdktf.stringToHclTerraform(struct!.qualifierName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    qualifier_type: {
      value: cdktf.stringToHclTerraform(struct!.qualifierType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    tactics_config: {
      value: fgsFunctionV2ReservedInstancesTacticsConfigToHclTerraform(struct!.tacticsConfig),
      isBlock: true,
      type: "list",
      storageClassType: "FgsFunctionV2ReservedInstancesTacticsConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsFunctionV2ReservedInstancesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): FgsFunctionV2ReservedInstances | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._count !== undefined) {
      hasAnyValues = true;
      internalValueResult.count = this._count;
    }
    if (this._idleMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.idleMode = this._idleMode;
    }
    if (this._qualifierName !== undefined) {
      hasAnyValues = true;
      internalValueResult.qualifierName = this._qualifierName;
    }
    if (this._qualifierType !== undefined) {
      hasAnyValues = true;
      internalValueResult.qualifierType = this._qualifierType;
    }
    if (this._tacticsConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.tacticsConfig = this._tacticsConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsFunctionV2ReservedInstances | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._count = undefined;
      this._idleMode = undefined;
      this._qualifierName = undefined;
      this._qualifierType = undefined;
      this._tacticsConfig.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._count = value.count;
      this._idleMode = value.idleMode;
      this._qualifierName = value.qualifierName;
      this._qualifierType = value.qualifierType;
      this._tacticsConfig.internalValue = value.tacticsConfig;
    }
  }

  // count - computed: false, optional: false, required: true
  private _count?: number; 
  public get count() {
    return this.getNumberAttribute('count');
  }
  public set count(value: number) {
    this._count = value;
  }
  // Temporarily expose input value. Use with caution.
  public get countInput() {
    return this._count;
  }

  // idle_mode - computed: false, optional: true, required: false
  private _idleMode?: boolean | cdktf.IResolvable; 
  public get idleMode() {
    return this.getBooleanAttribute('idle_mode');
  }
  public set idleMode(value: boolean | cdktf.IResolvable) {
    this._idleMode = value;
  }
  public resetIdleMode() {
    this._idleMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idleModeInput() {
    return this._idleMode;
  }

  // qualifier_name - computed: false, optional: false, required: true
  private _qualifierName?: string; 
  public get qualifierName() {
    return this.getStringAttribute('qualifier_name');
  }
  public set qualifierName(value: string) {
    this._qualifierName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get qualifierNameInput() {
    return this._qualifierName;
  }

  // qualifier_type - computed: false, optional: false, required: true
  private _qualifierType?: string; 
  public get qualifierType() {
    return this.getStringAttribute('qualifier_type');
  }
  public set qualifierType(value: string) {
    this._qualifierType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get qualifierTypeInput() {
    return this._qualifierType;
  }

  // tactics_config - computed: false, optional: true, required: false
  private _tacticsConfig = new FgsFunctionV2ReservedInstancesTacticsConfigOutputReference(this, "tactics_config");
  public get tacticsConfig() {
    return this._tacticsConfig;
  }
  public putTacticsConfig(value: FgsFunctionV2ReservedInstancesTacticsConfig) {
    this._tacticsConfig.internalValue = value;
  }
  public resetTacticsConfig() {
    this._tacticsConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tacticsConfigInput() {
    return this._tacticsConfig.internalValue;
  }
}

export class FgsFunctionV2ReservedInstancesList extends cdktf.ComplexList {
  public internalValue? : FgsFunctionV2ReservedInstances[] | cdktf.IResolvable

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
  public get(index: number): FgsFunctionV2ReservedInstancesOutputReference {
    return new FgsFunctionV2ReservedInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface FgsFunctionV2Timeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#create FgsFunctionV2#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#delete FgsFunctionV2#delete}
  */
  readonly delete?: string;
}

export function fgsFunctionV2TimeoutsToTerraform(struct?: FgsFunctionV2Timeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function fgsFunctionV2TimeoutsToHclTerraform(struct?: FgsFunctionV2Timeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsFunctionV2TimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): FgsFunctionV2Timeouts | cdktf.IResolvable | undefined {
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
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsFunctionV2Timeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
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
}
export interface FgsFunctionV2VersionsAliases {
  /**
  * The description of the version alias.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#description FgsFunctionV2#description}
  */
  readonly description?: string;
  /**
  * The name of the version alias.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#name FgsFunctionV2#name}
  */
  readonly name: string;
}

export function fgsFunctionV2VersionsAliasesToTerraform(struct?: FgsFunctionV2VersionsAliasesOutputReference | FgsFunctionV2VersionsAliases): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function fgsFunctionV2VersionsAliasesToHclTerraform(struct?: FgsFunctionV2VersionsAliasesOutputReference | FgsFunctionV2VersionsAliases): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsFunctionV2VersionsAliasesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsFunctionV2VersionsAliases | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsFunctionV2VersionsAliases | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._description = undefined;
      this._name = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._description = value.description;
      this._name = value.name;
    }
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
}
export interface FgsFunctionV2Versions {
  /**
  * The version name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#name FgsFunctionV2#name}
  */
  readonly name: string;
  /**
  * aliases block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#aliases FgsFunctionV2#aliases}
  */
  readonly aliases?: FgsFunctionV2VersionsAliases;
}

export function fgsFunctionV2VersionsToTerraform(struct?: FgsFunctionV2Versions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    aliases: fgsFunctionV2VersionsAliasesToTerraform(struct!.aliases),
  }
}


export function fgsFunctionV2VersionsToHclTerraform(struct?: FgsFunctionV2Versions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    aliases: {
      value: fgsFunctionV2VersionsAliasesToHclTerraform(struct!.aliases),
      isBlock: true,
      type: "list",
      storageClassType: "FgsFunctionV2VersionsAliasesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsFunctionV2VersionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): FgsFunctionV2Versions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._aliases?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.aliases = this._aliases?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsFunctionV2Versions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._aliases.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._aliases.internalValue = value.aliases;
    }
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

  // aliases - computed: false, optional: true, required: false
  private _aliases = new FgsFunctionV2VersionsAliasesOutputReference(this, "aliases");
  public get aliases() {
    return this._aliases;
  }
  public putAliases(value: FgsFunctionV2VersionsAliases) {
    this._aliases.internalValue = value;
  }
  public resetAliases() {
    this._aliases.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aliasesInput() {
    return this._aliases.internalValue;
  }
}

export class FgsFunctionV2VersionsList extends cdktf.ComplexList {
  public internalValue? : FgsFunctionV2Versions[] | cdktf.IResolvable

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
  public get(index: number): FgsFunctionV2VersionsOutputReference {
    return new FgsFunctionV2VersionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2 huaweicloud_fgs_function_v2}
*/
export class FgsFunctionV2 extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_fgs_function_v2";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a FgsFunctionV2 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the FgsFunctionV2 to import
  * @param importFromId The id of the existing FgsFunctionV2 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the FgsFunctionV2 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_fgs_function_v2", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_function_v2 huaweicloud_fgs_function_v2} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options FgsFunctionV2Config
  */
  public constructor(scope: Construct, id: string, config: FgsFunctionV2Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_fgs_function_v2',
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
    this._agency = config.agency;
    this._app = config.app;
    this._appAgency = config.appAgency;
    this._codeFilename = config.codeFilename;
    this._codeType = config.codeType;
    this._codeUrl = config.codeUrl;
    this._concurrencyNum = config.concurrencyNum;
    this._dependList = config.dependList;
    this._description = config.description;
    this._dnsList = config.dnsList;
    this._encryptedUserData = config.encryptedUserData;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._funcCode = config.funcCode;
    this._functiongraphVersion = config.functiongraphVersion;
    this._gpuMemory = config.gpuMemory;
    this._gpuType = config.gpuType;
    this._handler = config.handler;
    this._id = config.id;
    this._initializerHandler = config.initializerHandler;
    this._initializerTimeout = config.initializerTimeout;
    this._logGroupId = config.logGroupId;
    this._logGroupName = config.logGroupName;
    this._logStreamId = config.logStreamId;
    this._logStreamName = config.logStreamName;
    this._maxInstanceNum = config.maxInstanceNum;
    this._memorySize = config.memorySize;
    this._mountUserGroupId = config.mountUserGroupId;
    this._mountUserId = config.mountUserId;
    this._name = config.name;
    this._networkId = config.networkId;
    this._package = config.package;
    this._preStopHandler = config.preStopHandler;
    this._preStopTimeout = config.preStopTimeout;
    this._region = config.region;
    this._runtime = config.runtime;
    this._tags = config.tags;
    this._timeout = config.timeout;
    this._userData = config.userData;
    this._vpcId = config.vpcId;
    this._xrole = config.xrole;
    this._customImage.internalValue = config.customImage;
    this._funcMounts.internalValue = config.funcMounts;
    this._reservedInstances.internalValue = config.reservedInstances;
    this._timeouts.internalValue = config.timeouts;
    this._versions.internalValue = config.versions;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // agency - computed: false, optional: true, required: false
  private _agency?: string; 
  public get agency() {
    return this.getStringAttribute('agency');
  }
  public set agency(value: string) {
    this._agency = value;
  }
  public resetAgency() {
    this._agency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyInput() {
    return this._agency;
  }

  // app - computed: false, optional: true, required: false
  private _app?: string; 
  public get app() {
    return this.getStringAttribute('app');
  }
  public set app(value: string) {
    this._app = value;
  }
  public resetApp() {
    this._app = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appInput() {
    return this._app;
  }

  // app_agency - computed: true, optional: true, required: false
  private _appAgency?: string; 
  public get appAgency() {
    return this.getStringAttribute('app_agency');
  }
  public set appAgency(value: string) {
    this._appAgency = value;
  }
  public resetAppAgency() {
    this._appAgency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appAgencyInput() {
    return this._appAgency;
  }

  // code_filename - computed: true, optional: true, required: false
  private _codeFilename?: string; 
  public get codeFilename() {
    return this.getStringAttribute('code_filename');
  }
  public set codeFilename(value: string) {
    this._codeFilename = value;
  }
  public resetCodeFilename() {
    this._codeFilename = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeFilenameInput() {
    return this._codeFilename;
  }

  // code_type - computed: true, optional: true, required: false
  private _codeType?: string; 
  public get codeType() {
    return this.getStringAttribute('code_type');
  }
  public set codeType(value: string) {
    this._codeType = value;
  }
  public resetCodeType() {
    this._codeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeTypeInput() {
    return this._codeType;
  }

  // code_url - computed: false, optional: true, required: false
  private _codeUrl?: string; 
  public get codeUrl() {
    return this.getStringAttribute('code_url');
  }
  public set codeUrl(value: string) {
    this._codeUrl = value;
  }
  public resetCodeUrl() {
    this._codeUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeUrlInput() {
    return this._codeUrl;
  }

  // concurrency_num - computed: true, optional: true, required: false
  private _concurrencyNum?: number; 
  public get concurrencyNum() {
    return this.getNumberAttribute('concurrency_num');
  }
  public set concurrencyNum(value: number) {
    this._concurrencyNum = value;
  }
  public resetConcurrencyNum() {
    this._concurrencyNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get concurrencyNumInput() {
    return this._concurrencyNum;
  }

  // depend_list - computed: true, optional: true, required: false
  private _dependList?: string[]; 
  public get dependList() {
    return cdktf.Fn.tolist(this.getListAttribute('depend_list'));
  }
  public set dependList(value: string[]) {
    this._dependList = value;
  }
  public resetDependList() {
    this._dependList = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependListInput() {
    return this._dependList;
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

  // dns_list - computed: true, optional: true, required: false
  private _dnsList?: string; 
  public get dnsList() {
    return this.getStringAttribute('dns_list');
  }
  public set dnsList(value: string) {
    this._dnsList = value;
  }
  public resetDnsList() {
    this._dnsList = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dnsListInput() {
    return this._dnsList;
  }

  // encrypted_user_data - computed: false, optional: true, required: false
  private _encryptedUserData?: string; 
  public get encryptedUserData() {
    return this.getStringAttribute('encrypted_user_data');
  }
  public set encryptedUserData(value: string) {
    this._encryptedUserData = value;
  }
  public resetEncryptedUserData() {
    this._encryptedUserData = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptedUserDataInput() {
    return this._encryptedUserData;
  }

  // enterprise_project_id - computed: true, optional: true, required: false
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

  // func_code - computed: false, optional: true, required: false
  private _funcCode?: string; 
  public get funcCode() {
    return this.getStringAttribute('func_code');
  }
  public set funcCode(value: string) {
    this._funcCode = value;
  }
  public resetFuncCode() {
    this._funcCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get funcCodeInput() {
    return this._funcCode;
  }

  // functiongraph_version - computed: true, optional: true, required: false
  private _functiongraphVersion?: string; 
  public get functiongraphVersion() {
    return this.getStringAttribute('functiongraph_version');
  }
  public set functiongraphVersion(value: string) {
    this._functiongraphVersion = value;
  }
  public resetFunctiongraphVersion() {
    this._functiongraphVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get functiongraphVersionInput() {
    return this._functiongraphVersion;
  }

  // gpu_memory - computed: false, optional: true, required: false
  private _gpuMemory?: number; 
  public get gpuMemory() {
    return this.getNumberAttribute('gpu_memory');
  }
  public set gpuMemory(value: number) {
    this._gpuMemory = value;
  }
  public resetGpuMemory() {
    this._gpuMemory = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gpuMemoryInput() {
    return this._gpuMemory;
  }

  // gpu_type - computed: false, optional: true, required: false
  private _gpuType?: string; 
  public get gpuType() {
    return this.getStringAttribute('gpu_type');
  }
  public set gpuType(value: string) {
    this._gpuType = value;
  }
  public resetGpuType() {
    this._gpuType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gpuTypeInput() {
    return this._gpuType;
  }

  // handler - computed: true, optional: true, required: false
  private _handler?: string; 
  public get handler() {
    return this.getStringAttribute('handler');
  }
  public set handler(value: string) {
    this._handler = value;
  }
  public resetHandler() {
    this._handler = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get handlerInput() {
    return this._handler;
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

  // initializer_handler - computed: true, optional: true, required: false
  private _initializerHandler?: string; 
  public get initializerHandler() {
    return this.getStringAttribute('initializer_handler');
  }
  public set initializerHandler(value: string) {
    this._initializerHandler = value;
  }
  public resetInitializerHandler() {
    this._initializerHandler = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get initializerHandlerInput() {
    return this._initializerHandler;
  }

  // initializer_timeout - computed: true, optional: true, required: false
  private _initializerTimeout?: number; 
  public get initializerTimeout() {
    return this.getNumberAttribute('initializer_timeout');
  }
  public set initializerTimeout(value: number) {
    this._initializerTimeout = value;
  }
  public resetInitializerTimeout() {
    this._initializerTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get initializerTimeoutInput() {
    return this._initializerTimeout;
  }

  // log_group_id - computed: true, optional: true, required: false
  private _logGroupId?: string; 
  public get logGroupId() {
    return this.getStringAttribute('log_group_id');
  }
  public set logGroupId(value: string) {
    this._logGroupId = value;
  }
  public resetLogGroupId() {
    this._logGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupIdInput() {
    return this._logGroupId;
  }

  // log_group_name - computed: true, optional: true, required: false
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

  // log_stream_id - computed: true, optional: true, required: false
  private _logStreamId?: string; 
  public get logStreamId() {
    return this.getStringAttribute('log_stream_id');
  }
  public set logStreamId(value: string) {
    this._logStreamId = value;
  }
  public resetLogStreamId() {
    this._logStreamId = undefined;
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

  // max_instance_num - computed: true, optional: true, required: false
  private _maxInstanceNum?: string; 
  public get maxInstanceNum() {
    return this.getStringAttribute('max_instance_num');
  }
  public set maxInstanceNum(value: string) {
    this._maxInstanceNum = value;
  }
  public resetMaxInstanceNum() {
    this._maxInstanceNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxInstanceNumInput() {
    return this._maxInstanceNum;
  }

  // memory_size - computed: false, optional: false, required: true
  private _memorySize?: number; 
  public get memorySize() {
    return this.getNumberAttribute('memory_size');
  }
  public set memorySize(value: number) {
    this._memorySize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get memorySizeInput() {
    return this._memorySize;
  }

  // mount_user_group_id - computed: true, optional: true, required: false
  private _mountUserGroupId?: number; 
  public get mountUserGroupId() {
    return this.getNumberAttribute('mount_user_group_id');
  }
  public set mountUserGroupId(value: number) {
    this._mountUserGroupId = value;
  }
  public resetMountUserGroupId() {
    this._mountUserGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mountUserGroupIdInput() {
    return this._mountUserGroupId;
  }

  // mount_user_id - computed: true, optional: true, required: false
  private _mountUserId?: number; 
  public get mountUserId() {
    return this.getNumberAttribute('mount_user_id');
  }
  public set mountUserId(value: number) {
    this._mountUserId = value;
  }
  public resetMountUserId() {
    this._mountUserId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mountUserIdInput() {
    return this._mountUserId;
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

  // network_id - computed: false, optional: true, required: false
  private _networkId?: string; 
  public get networkId() {
    return this.getStringAttribute('network_id');
  }
  public set networkId(value: string) {
    this._networkId = value;
  }
  public resetNetworkId() {
    this._networkId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get networkIdInput() {
    return this._networkId;
  }

  // package - computed: false, optional: true, required: false
  private _package?: string; 
  public get package() {
    return this.getStringAttribute('package');
  }
  public set package(value: string) {
    this._package = value;
  }
  public resetPackage() {
    this._package = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get packageInput() {
    return this._package;
  }

  // pre_stop_handler - computed: false, optional: true, required: false
  private _preStopHandler?: string; 
  public get preStopHandler() {
    return this.getStringAttribute('pre_stop_handler');
  }
  public set preStopHandler(value: string) {
    this._preStopHandler = value;
  }
  public resetPreStopHandler() {
    this._preStopHandler = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preStopHandlerInput() {
    return this._preStopHandler;
  }

  // pre_stop_timeout - computed: false, optional: true, required: false
  private _preStopTimeout?: number; 
  public get preStopTimeout() {
    return this.getNumberAttribute('pre_stop_timeout');
  }
  public set preStopTimeout(value: number) {
    this._preStopTimeout = value;
  }
  public resetPreStopTimeout() {
    this._preStopTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preStopTimeoutInput() {
    return this._preStopTimeout;
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

  // runtime - computed: false, optional: false, required: true
  private _runtime?: string; 
  public get runtime() {
    return this.getStringAttribute('runtime');
  }
  public set runtime(value: string) {
    this._runtime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimeInput() {
    return this._runtime;
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

  // timeout - computed: false, optional: false, required: true
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }

  // urn - computed: true, optional: false, required: false
  public get urn() {
    return this.getStringAttribute('urn');
  }

  // user_data - computed: false, optional: true, required: false
  private _userData?: string; 
  public get userData() {
    return this.getStringAttribute('user_data');
  }
  public set userData(value: string) {
    this._userData = value;
  }
  public resetUserData() {
    this._userData = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userDataInput() {
    return this._userData;
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getStringAttribute('version');
  }

  // vpc_id - computed: false, optional: true, required: false
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

  // xrole - computed: false, optional: true, required: false
  private _xrole?: string; 
  public get xrole() {
    return this.getStringAttribute('xrole');
  }
  public set xrole(value: string) {
    this._xrole = value;
  }
  public resetXrole() {
    this._xrole = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get xroleInput() {
    return this._xrole;
  }

  // custom_image - computed: false, optional: true, required: false
  private _customImage = new FgsFunctionV2CustomImageOutputReference(this, "custom_image");
  public get customImage() {
    return this._customImage;
  }
  public putCustomImage(value: FgsFunctionV2CustomImage) {
    this._customImage.internalValue = value;
  }
  public resetCustomImage() {
    this._customImage.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customImageInput() {
    return this._customImage.internalValue;
  }

  // func_mounts - computed: false, optional: true, required: false
  private _funcMounts = new FgsFunctionV2FuncMountsList(this, "func_mounts", false);
  public get funcMounts() {
    return this._funcMounts;
  }
  public putFuncMounts(value: FgsFunctionV2FuncMounts[] | cdktf.IResolvable) {
    this._funcMounts.internalValue = value;
  }
  public resetFuncMounts() {
    this._funcMounts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get funcMountsInput() {
    return this._funcMounts.internalValue;
  }

  // reserved_instances - computed: false, optional: true, required: false
  private _reservedInstances = new FgsFunctionV2ReservedInstancesList(this, "reserved_instances", true);
  public get reservedInstances() {
    return this._reservedInstances;
  }
  public putReservedInstances(value: FgsFunctionV2ReservedInstances[] | cdktf.IResolvable) {
    this._reservedInstances.internalValue = value;
  }
  public resetReservedInstances() {
    this._reservedInstances.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get reservedInstancesInput() {
    return this._reservedInstances.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new FgsFunctionV2TimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: FgsFunctionV2Timeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // versions - computed: false, optional: true, required: false
  private _versions = new FgsFunctionV2VersionsList(this, "versions", true);
  public get versions() {
    return this._versions;
  }
  public putVersions(value: FgsFunctionV2Versions[] | cdktf.IResolvable) {
    this._versions.internalValue = value;
  }
  public resetVersions() {
    this._versions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get versionsInput() {
    return this._versions.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      agency: cdktf.stringToTerraform(this._agency),
      app: cdktf.stringToTerraform(this._app),
      app_agency: cdktf.stringToTerraform(this._appAgency),
      code_filename: cdktf.stringToTerraform(this._codeFilename),
      code_type: cdktf.stringToTerraform(this._codeType),
      code_url: cdktf.stringToTerraform(this._codeUrl),
      concurrency_num: cdktf.numberToTerraform(this._concurrencyNum),
      depend_list: cdktf.listMapper(cdktf.stringToTerraform, false)(this._dependList),
      description: cdktf.stringToTerraform(this._description),
      dns_list: cdktf.stringToTerraform(this._dnsList),
      encrypted_user_data: cdktf.stringToTerraform(this._encryptedUserData),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      func_code: cdktf.stringToTerraform(this._funcCode),
      functiongraph_version: cdktf.stringToTerraform(this._functiongraphVersion),
      gpu_memory: cdktf.numberToTerraform(this._gpuMemory),
      gpu_type: cdktf.stringToTerraform(this._gpuType),
      handler: cdktf.stringToTerraform(this._handler),
      id: cdktf.stringToTerraform(this._id),
      initializer_handler: cdktf.stringToTerraform(this._initializerHandler),
      initializer_timeout: cdktf.numberToTerraform(this._initializerTimeout),
      log_group_id: cdktf.stringToTerraform(this._logGroupId),
      log_group_name: cdktf.stringToTerraform(this._logGroupName),
      log_stream_id: cdktf.stringToTerraform(this._logStreamId),
      log_stream_name: cdktf.stringToTerraform(this._logStreamName),
      max_instance_num: cdktf.stringToTerraform(this._maxInstanceNum),
      memory_size: cdktf.numberToTerraform(this._memorySize),
      mount_user_group_id: cdktf.numberToTerraform(this._mountUserGroupId),
      mount_user_id: cdktf.numberToTerraform(this._mountUserId),
      name: cdktf.stringToTerraform(this._name),
      network_id: cdktf.stringToTerraform(this._networkId),
      package: cdktf.stringToTerraform(this._package),
      pre_stop_handler: cdktf.stringToTerraform(this._preStopHandler),
      pre_stop_timeout: cdktf.numberToTerraform(this._preStopTimeout),
      region: cdktf.stringToTerraform(this._region),
      runtime: cdktf.stringToTerraform(this._runtime),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      timeout: cdktf.numberToTerraform(this._timeout),
      user_data: cdktf.stringToTerraform(this._userData),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      xrole: cdktf.stringToTerraform(this._xrole),
      custom_image: fgsFunctionV2CustomImageToTerraform(this._customImage.internalValue),
      func_mounts: cdktf.listMapper(fgsFunctionV2FuncMountsToTerraform, true)(this._funcMounts.internalValue),
      reserved_instances: cdktf.listMapper(fgsFunctionV2ReservedInstancesToTerraform, true)(this._reservedInstances.internalValue),
      timeouts: fgsFunctionV2TimeoutsToTerraform(this._timeouts.internalValue),
      versions: cdktf.listMapper(fgsFunctionV2VersionsToTerraform, true)(this._versions.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      agency: {
        value: cdktf.stringToHclTerraform(this._agency),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      app: {
        value: cdktf.stringToHclTerraform(this._app),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      app_agency: {
        value: cdktf.stringToHclTerraform(this._appAgency),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      code_filename: {
        value: cdktf.stringToHclTerraform(this._codeFilename),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      code_type: {
        value: cdktf.stringToHclTerraform(this._codeType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      code_url: {
        value: cdktf.stringToHclTerraform(this._codeUrl),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      concurrency_num: {
        value: cdktf.numberToHclTerraform(this._concurrencyNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      depend_list: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._dependList),
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
      dns_list: {
        value: cdktf.stringToHclTerraform(this._dnsList),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      encrypted_user_data: {
        value: cdktf.stringToHclTerraform(this._encryptedUserData),
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
      func_code: {
        value: cdktf.stringToHclTerraform(this._funcCode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      functiongraph_version: {
        value: cdktf.stringToHclTerraform(this._functiongraphVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      gpu_memory: {
        value: cdktf.numberToHclTerraform(this._gpuMemory),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      gpu_type: {
        value: cdktf.stringToHclTerraform(this._gpuType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      handler: {
        value: cdktf.stringToHclTerraform(this._handler),
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
      initializer_handler: {
        value: cdktf.stringToHclTerraform(this._initializerHandler),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      initializer_timeout: {
        value: cdktf.numberToHclTerraform(this._initializerTimeout),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      log_group_id: {
        value: cdktf.stringToHclTerraform(this._logGroupId),
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
      log_stream_id: {
        value: cdktf.stringToHclTerraform(this._logStreamId),
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
      max_instance_num: {
        value: cdktf.stringToHclTerraform(this._maxInstanceNum),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      memory_size: {
        value: cdktf.numberToHclTerraform(this._memorySize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      mount_user_group_id: {
        value: cdktf.numberToHclTerraform(this._mountUserGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      mount_user_id: {
        value: cdktf.numberToHclTerraform(this._mountUserId),
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
      network_id: {
        value: cdktf.stringToHclTerraform(this._networkId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      package: {
        value: cdktf.stringToHclTerraform(this._package),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      pre_stop_handler: {
        value: cdktf.stringToHclTerraform(this._preStopHandler),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      pre_stop_timeout: {
        value: cdktf.numberToHclTerraform(this._preStopTimeout),
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
      runtime: {
        value: cdktf.stringToHclTerraform(this._runtime),
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
      timeout: {
        value: cdktf.numberToHclTerraform(this._timeout),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      user_data: {
        value: cdktf.stringToHclTerraform(this._userData),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      xrole: {
        value: cdktf.stringToHclTerraform(this._xrole),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      custom_image: {
        value: fgsFunctionV2CustomImageToHclTerraform(this._customImage.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsFunctionV2CustomImageList",
      },
      func_mounts: {
        value: cdktf.listMapperHcl(fgsFunctionV2FuncMountsToHclTerraform, true)(this._funcMounts.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsFunctionV2FuncMountsList",
      },
      reserved_instances: {
        value: cdktf.listMapperHcl(fgsFunctionV2ReservedInstancesToHclTerraform, true)(this._reservedInstances.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "FgsFunctionV2ReservedInstancesList",
      },
      timeouts: {
        value: fgsFunctionV2TimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "FgsFunctionV2Timeouts",
      },
      versions: {
        value: cdktf.listMapperHcl(fgsFunctionV2VersionsToHclTerraform, true)(this._versions.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "FgsFunctionV2VersionsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

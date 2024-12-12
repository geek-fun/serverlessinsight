// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DliSparkJobConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#app_name DliSparkJob#app_name}
  */
  readonly appName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#app_parameters DliSparkJob#app_parameters}
  */
  readonly appParameters?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#configurations DliSparkJob#configurations}
  */
  readonly configurations?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#driver_cores DliSparkJob#driver_cores}
  */
  readonly driverCores?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#driver_memory DliSparkJob#driver_memory}
  */
  readonly driverMemory?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#executor_cores DliSparkJob#executor_cores}
  */
  readonly executorCores?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#executor_memory DliSparkJob#executor_memory}
  */
  readonly executorMemory?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#executors DliSparkJob#executors}
  */
  readonly executors?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#files DliSparkJob#files}
  */
  readonly files?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#id DliSparkJob#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#jars DliSparkJob#jars}
  */
  readonly jars?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#main_class DliSparkJob#main_class}
  */
  readonly mainClass?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#max_retries DliSparkJob#max_retries}
  */
  readonly maxRetries?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#modules DliSparkJob#modules}
  */
  readonly modules?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#name DliSparkJob#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#python_files DliSparkJob#python_files}
  */
  readonly pythonFiles?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#queue_name DliSparkJob#queue_name}
  */
  readonly queueName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#region DliSparkJob#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#specification DliSparkJob#specification}
  */
  readonly specification?: string;
  /**
  * dependent_packages block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#dependent_packages DliSparkJob#dependent_packages}
  */
  readonly dependentPackages?: DliSparkJobDependentPackages[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#timeouts DliSparkJob#timeouts}
  */
  readonly timeouts?: DliSparkJobTimeouts;
}
export interface DliSparkJobDependentPackagesPackages {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#package_name DliSparkJob#package_name}
  */
  readonly packageName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#type DliSparkJob#type}
  */
  readonly type: string;
}

export function dliSparkJobDependentPackagesPackagesToTerraform(struct?: DliSparkJobDependentPackagesPackages | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    package_name: cdktf.stringToTerraform(struct!.packageName),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function dliSparkJobDependentPackagesPackagesToHclTerraform(struct?: DliSparkJobDependentPackagesPackages | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    package_name: {
      value: cdktf.stringToHclTerraform(struct!.packageName),
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

export class DliSparkJobDependentPackagesPackagesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DliSparkJobDependentPackagesPackages | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._packageName !== undefined) {
      hasAnyValues = true;
      internalValueResult.packageName = this._packageName;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliSparkJobDependentPackagesPackages | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._packageName = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._packageName = value.packageName;
      this._type = value.type;
    }
  }

  // package_name - computed: false, optional: false, required: true
  private _packageName?: string; 
  public get packageName() {
    return this.getStringAttribute('package_name');
  }
  public set packageName(value: string) {
    this._packageName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get packageNameInput() {
    return this._packageName;
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

export class DliSparkJobDependentPackagesPackagesList extends cdktf.ComplexList {
  public internalValue? : DliSparkJobDependentPackagesPackages[] | cdktf.IResolvable

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
  public get(index: number): DliSparkJobDependentPackagesPackagesOutputReference {
    return new DliSparkJobDependentPackagesPackagesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DliSparkJobDependentPackages {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#group_name DliSparkJob#group_name}
  */
  readonly groupName: string;
  /**
  * packages block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#packages DliSparkJob#packages}
  */
  readonly packages: DliSparkJobDependentPackagesPackages[] | cdktf.IResolvable;
}

export function dliSparkJobDependentPackagesToTerraform(struct?: DliSparkJobDependentPackages | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    group_name: cdktf.stringToTerraform(struct!.groupName),
    packages: cdktf.listMapper(dliSparkJobDependentPackagesPackagesToTerraform, true)(struct!.packages),
  }
}


export function dliSparkJobDependentPackagesToHclTerraform(struct?: DliSparkJobDependentPackages | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    group_name: {
      value: cdktf.stringToHclTerraform(struct!.groupName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    packages: {
      value: cdktf.listMapperHcl(dliSparkJobDependentPackagesPackagesToHclTerraform, true)(struct!.packages),
      isBlock: true,
      type: "list",
      storageClassType: "DliSparkJobDependentPackagesPackagesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DliSparkJobDependentPackagesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DliSparkJobDependentPackages | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._groupName !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupName = this._groupName;
    }
    if (this._packages?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.packages = this._packages?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliSparkJobDependentPackages | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._groupName = undefined;
      this._packages.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._groupName = value.groupName;
      this._packages.internalValue = value.packages;
    }
  }

  // group_name - computed: false, optional: false, required: true
  private _groupName?: string; 
  public get groupName() {
    return this.getStringAttribute('group_name');
  }
  public set groupName(value: string) {
    this._groupName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupNameInput() {
    return this._groupName;
  }

  // packages - computed: false, optional: false, required: true
  private _packages = new DliSparkJobDependentPackagesPackagesList(this, "packages", false);
  public get packages() {
    return this._packages;
  }
  public putPackages(value: DliSparkJobDependentPackagesPackages[] | cdktf.IResolvable) {
    this._packages.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get packagesInput() {
    return this._packages.internalValue;
  }
}

export class DliSparkJobDependentPackagesList extends cdktf.ComplexList {
  public internalValue? : DliSparkJobDependentPackages[] | cdktf.IResolvable

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
  public get(index: number): DliSparkJobDependentPackagesOutputReference {
    return new DliSparkJobDependentPackagesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DliSparkJobTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#delete DliSparkJob#delete}
  */
  readonly delete?: string;
}

export function dliSparkJobTimeoutsToTerraform(struct?: DliSparkJobTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function dliSparkJobTimeoutsToHclTerraform(struct?: DliSparkJobTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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

export class DliSparkJobTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DliSparkJobTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliSparkJobTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._delete = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._delete = value.delete;
    }
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

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job huaweicloud_dli_spark_job}
*/
export class DliSparkJob extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dli_spark_job";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DliSparkJob resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DliSparkJob to import
  * @param importFromId The id of the existing DliSparkJob that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DliSparkJob to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dli_spark_job", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_spark_job huaweicloud_dli_spark_job} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DliSparkJobConfig
  */
  public constructor(scope: Construct, id: string, config: DliSparkJobConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dli_spark_job',
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
    this._appName = config.appName;
    this._appParameters = config.appParameters;
    this._configurations = config.configurations;
    this._driverCores = config.driverCores;
    this._driverMemory = config.driverMemory;
    this._executorCores = config.executorCores;
    this._executorMemory = config.executorMemory;
    this._executors = config.executors;
    this._files = config.files;
    this._id = config.id;
    this._jars = config.jars;
    this._mainClass = config.mainClass;
    this._maxRetries = config.maxRetries;
    this._modules = config.modules;
    this._name = config.name;
    this._pythonFiles = config.pythonFiles;
    this._queueName = config.queueName;
    this._region = config.region;
    this._specification = config.specification;
    this._dependentPackages.internalValue = config.dependentPackages;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // app_name - computed: false, optional: false, required: true
  private _appName?: string; 
  public get appName() {
    return this.getStringAttribute('app_name');
  }
  public set appName(value: string) {
    this._appName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get appNameInput() {
    return this._appName;
  }

  // app_parameters - computed: false, optional: true, required: false
  private _appParameters?: string; 
  public get appParameters() {
    return this.getStringAttribute('app_parameters');
  }
  public set appParameters(value: string) {
    this._appParameters = value;
  }
  public resetAppParameters() {
    this._appParameters = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appParametersInput() {
    return this._appParameters;
  }

  // configurations - computed: false, optional: true, required: false
  private _configurations?: { [key: string]: string }; 
  public get configurations() {
    return this.getStringMapAttribute('configurations');
  }
  public set configurations(value: { [key: string]: string }) {
    this._configurations = value;
  }
  public resetConfigurations() {
    this._configurations = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationsInput() {
    return this._configurations;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // driver_cores - computed: false, optional: true, required: false
  private _driverCores?: number; 
  public get driverCores() {
    return this.getNumberAttribute('driver_cores');
  }
  public set driverCores(value: number) {
    this._driverCores = value;
  }
  public resetDriverCores() {
    this._driverCores = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get driverCoresInput() {
    return this._driverCores;
  }

  // driver_memory - computed: false, optional: true, required: false
  private _driverMemory?: string; 
  public get driverMemory() {
    return this.getStringAttribute('driver_memory');
  }
  public set driverMemory(value: string) {
    this._driverMemory = value;
  }
  public resetDriverMemory() {
    this._driverMemory = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get driverMemoryInput() {
    return this._driverMemory;
  }

  // executor_cores - computed: false, optional: true, required: false
  private _executorCores?: number; 
  public get executorCores() {
    return this.getNumberAttribute('executor_cores');
  }
  public set executorCores(value: number) {
    this._executorCores = value;
  }
  public resetExecutorCores() {
    this._executorCores = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executorCoresInput() {
    return this._executorCores;
  }

  // executor_memory - computed: false, optional: true, required: false
  private _executorMemory?: string; 
  public get executorMemory() {
    return this.getStringAttribute('executor_memory');
  }
  public set executorMemory(value: string) {
    this._executorMemory = value;
  }
  public resetExecutorMemory() {
    this._executorMemory = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executorMemoryInput() {
    return this._executorMemory;
  }

  // executors - computed: false, optional: true, required: false
  private _executors?: number; 
  public get executors() {
    return this.getNumberAttribute('executors');
  }
  public set executors(value: number) {
    this._executors = value;
  }
  public resetExecutors() {
    this._executors = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executorsInput() {
    return this._executors;
  }

  // files - computed: false, optional: true, required: false
  private _files?: string[]; 
  public get files() {
    return this.getListAttribute('files');
  }
  public set files(value: string[]) {
    this._files = value;
  }
  public resetFiles() {
    this._files = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get filesInput() {
    return this._files;
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

  // jars - computed: false, optional: true, required: false
  private _jars?: string[]; 
  public get jars() {
    return this.getListAttribute('jars');
  }
  public set jars(value: string[]) {
    this._jars = value;
  }
  public resetJars() {
    this._jars = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get jarsInput() {
    return this._jars;
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

  // max_retries - computed: false, optional: true, required: false
  private _maxRetries?: number; 
  public get maxRetries() {
    return this.getNumberAttribute('max_retries');
  }
  public set maxRetries(value: number) {
    this._maxRetries = value;
  }
  public resetMaxRetries() {
    this._maxRetries = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxRetriesInput() {
    return this._maxRetries;
  }

  // modules - computed: false, optional: true, required: false
  private _modules?: string[]; 
  public get modules() {
    return this.getListAttribute('modules');
  }
  public set modules(value: string[]) {
    this._modules = value;
  }
  public resetModules() {
    this._modules = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get modulesInput() {
    return this._modules;
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

  // owner - computed: true, optional: false, required: false
  public get owner() {
    return this.getStringAttribute('owner');
  }

  // python_files - computed: false, optional: true, required: false
  private _pythonFiles?: string[]; 
  public get pythonFiles() {
    return this.getListAttribute('python_files');
  }
  public set pythonFiles(value: string[]) {
    this._pythonFiles = value;
  }
  public resetPythonFiles() {
    this._pythonFiles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pythonFilesInput() {
    return this._pythonFiles;
  }

  // queue_name - computed: false, optional: false, required: true
  private _queueName?: string; 
  public get queueName() {
    return this.getStringAttribute('queue_name');
  }
  public set queueName(value: string) {
    this._queueName = value;
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

  // specification - computed: false, optional: true, required: false
  private _specification?: string; 
  public get specification() {
    return this.getStringAttribute('specification');
  }
  public set specification(value: string) {
    this._specification = value;
  }
  public resetSpecification() {
    this._specification = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get specificationInput() {
    return this._specification;
  }

  // dependent_packages - computed: false, optional: true, required: false
  private _dependentPackages = new DliSparkJobDependentPackagesList(this, "dependent_packages", false);
  public get dependentPackages() {
    return this._dependentPackages;
  }
  public putDependentPackages(value: DliSparkJobDependentPackages[] | cdktf.IResolvable) {
    this._dependentPackages.internalValue = value;
  }
  public resetDependentPackages() {
    this._dependentPackages.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependentPackagesInput() {
    return this._dependentPackages.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DliSparkJobTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DliSparkJobTimeouts) {
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
      app_name: cdktf.stringToTerraform(this._appName),
      app_parameters: cdktf.stringToTerraform(this._appParameters),
      configurations: cdktf.hashMapper(cdktf.stringToTerraform)(this._configurations),
      driver_cores: cdktf.numberToTerraform(this._driverCores),
      driver_memory: cdktf.stringToTerraform(this._driverMemory),
      executor_cores: cdktf.numberToTerraform(this._executorCores),
      executor_memory: cdktf.stringToTerraform(this._executorMemory),
      executors: cdktf.numberToTerraform(this._executors),
      files: cdktf.listMapper(cdktf.stringToTerraform, false)(this._files),
      id: cdktf.stringToTerraform(this._id),
      jars: cdktf.listMapper(cdktf.stringToTerraform, false)(this._jars),
      main_class: cdktf.stringToTerraform(this._mainClass),
      max_retries: cdktf.numberToTerraform(this._maxRetries),
      modules: cdktf.listMapper(cdktf.stringToTerraform, false)(this._modules),
      name: cdktf.stringToTerraform(this._name),
      python_files: cdktf.listMapper(cdktf.stringToTerraform, false)(this._pythonFiles),
      queue_name: cdktf.stringToTerraform(this._queueName),
      region: cdktf.stringToTerraform(this._region),
      specification: cdktf.stringToTerraform(this._specification),
      dependent_packages: cdktf.listMapper(dliSparkJobDependentPackagesToTerraform, true)(this._dependentPackages.internalValue),
      timeouts: dliSparkJobTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      app_name: {
        value: cdktf.stringToHclTerraform(this._appName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      app_parameters: {
        value: cdktf.stringToHclTerraform(this._appParameters),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      configurations: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._configurations),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      driver_cores: {
        value: cdktf.numberToHclTerraform(this._driverCores),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      driver_memory: {
        value: cdktf.stringToHclTerraform(this._driverMemory),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      executor_cores: {
        value: cdktf.numberToHclTerraform(this._executorCores),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      executor_memory: {
        value: cdktf.stringToHclTerraform(this._executorMemory),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      executors: {
        value: cdktf.numberToHclTerraform(this._executors),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      files: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._files),
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
      jars: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._jars),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      main_class: {
        value: cdktf.stringToHclTerraform(this._mainClass),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      max_retries: {
        value: cdktf.numberToHclTerraform(this._maxRetries),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      modules: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._modules),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      python_files: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._pythonFiles),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
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
      specification: {
        value: cdktf.stringToHclTerraform(this._specification),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dependent_packages: {
        value: cdktf.listMapperHcl(dliSparkJobDependentPackagesToHclTerraform, true)(this._dependentPackages.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DliSparkJobDependentPackagesList",
      },
      timeouts: {
        value: dliSparkJobTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DliSparkJobTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

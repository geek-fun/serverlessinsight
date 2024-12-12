// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DliTemplateSparkConfig extends cdktf.TerraformMetaArguments {
  /**
  * The description of the spark template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#description DliTemplateSpark#description}
  */
  readonly description?: string;
  /**
  * The group of the spark template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#group DliTemplateSpark#group}
  */
  readonly group?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#id DliTemplateSpark#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the spark template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#name DliTemplateSpark#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#region DliTemplateSpark#region}
  */
  readonly region?: string;
  /**
  * body block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#body DliTemplateSpark#body}
  */
  readonly body: DliTemplateSparkBody;
}
export interface DliTemplateSparkBodyDependentPackagesResources {
  /**
  * Resource name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#name DliTemplateSpark#name}
  */
  readonly name?: string;
  /**
  * Resource type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#type DliTemplateSpark#type}
  */
  readonly type?: string;
}

export function dliTemplateSparkBodyDependentPackagesResourcesToTerraform(struct?: DliTemplateSparkBodyDependentPackagesResources | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function dliTemplateSparkBodyDependentPackagesResourcesToHclTerraform(struct?: DliTemplateSparkBodyDependentPackagesResources | cdktf.IResolvable): any {
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

export class DliTemplateSparkBodyDependentPackagesResourcesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DliTemplateSparkBodyDependentPackagesResources | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliTemplateSparkBodyDependentPackagesResources | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._type = value.type;
    }
  }

  // name - computed: true, optional: true, required: false
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

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}

export class DliTemplateSparkBodyDependentPackagesResourcesList extends cdktf.ComplexList {
  public internalValue? : DliTemplateSparkBodyDependentPackagesResources[] | cdktf.IResolvable

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
  public get(index: number): DliTemplateSparkBodyDependentPackagesResourcesOutputReference {
    return new DliTemplateSparkBodyDependentPackagesResourcesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DliTemplateSparkBodyDependentPackages {
  /**
  * User group name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#name DliTemplateSpark#name}
  */
  readonly name?: string;
  /**
  * resources block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#resources DliTemplateSpark#resources}
  */
  readonly resources?: DliTemplateSparkBodyDependentPackagesResources[] | cdktf.IResolvable;
}

export function dliTemplateSparkBodyDependentPackagesToTerraform(struct?: DliTemplateSparkBodyDependentPackages | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    resources: cdktf.listMapper(dliTemplateSparkBodyDependentPackagesResourcesToTerraform, true)(struct!.resources),
  }
}


export function dliTemplateSparkBodyDependentPackagesToHclTerraform(struct?: DliTemplateSparkBodyDependentPackages | cdktf.IResolvable): any {
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
    resources: {
      value: cdktf.listMapperHcl(dliTemplateSparkBodyDependentPackagesResourcesToHclTerraform, true)(struct!.resources),
      isBlock: true,
      type: "list",
      storageClassType: "DliTemplateSparkBodyDependentPackagesResourcesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DliTemplateSparkBodyDependentPackagesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DliTemplateSparkBodyDependentPackages | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._resources?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.resources = this._resources?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliTemplateSparkBodyDependentPackages | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._resources.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._resources.internalValue = value.resources;
    }
  }

  // name - computed: true, optional: true, required: false
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

  // resources - computed: false, optional: true, required: false
  private _resources = new DliTemplateSparkBodyDependentPackagesResourcesList(this, "resources", false);
  public get resources() {
    return this._resources;
  }
  public putResources(value: DliTemplateSparkBodyDependentPackagesResources[] | cdktf.IResolvable) {
    this._resources.internalValue = value;
  }
  public resetResources() {
    this._resources.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourcesInput() {
    return this._resources.internalValue;
  }
}

export class DliTemplateSparkBodyDependentPackagesList extends cdktf.ComplexList {
  public internalValue? : DliTemplateSparkBodyDependentPackages[] | cdktf.IResolvable

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
  public get(index: number): DliTemplateSparkBodyDependentPackagesOutputReference {
    return new DliTemplateSparkBodyDependentPackagesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DliTemplateSparkBodyResources {
  /**
  * Resource name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#name DliTemplateSpark#name}
  */
  readonly name?: string;
  /**
  * Resource type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#type DliTemplateSpark#type}
  */
  readonly type?: string;
}

export function dliTemplateSparkBodyResourcesToTerraform(struct?: DliTemplateSparkBodyResources | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function dliTemplateSparkBodyResourcesToHclTerraform(struct?: DliTemplateSparkBodyResources | cdktf.IResolvable): any {
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

export class DliTemplateSparkBodyResourcesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DliTemplateSparkBodyResources | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliTemplateSparkBodyResources | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._type = value.type;
    }
  }

  // name - computed: true, optional: true, required: false
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

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}

export class DliTemplateSparkBodyResourcesList extends cdktf.ComplexList {
  public internalValue? : DliTemplateSparkBodyResources[] | cdktf.IResolvable

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
  public get(index: number): DliTemplateSparkBodyResourcesOutputReference {
    return new DliTemplateSparkBodyResourcesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DliTemplateSparkBody {
  /**
  * Name of the package that is of the JAR or pyFile type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#app_name DliTemplateSpark#app_name}
  */
  readonly appName?: string;
  /**
  * Input parameters of the main class, that is application parameters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#app_parameters DliTemplateSpark#app_parameters}
  */
  readonly appParameters?: string[];
  /**
  * Whether to enable the retry function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#auto_recovery DliTemplateSpark#auto_recovery}
  */
  readonly autoRecovery?: boolean | cdktf.IResolvable;
  /**
  * The configuration items of the DLI spark.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#configurations DliTemplateSpark#configurations}
  */
  readonly configurations?: { [key: string]: string };
  /**
  * Number of CPU cores of the Spark application driver.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#driver_cores DliTemplateSpark#driver_cores}
  */
  readonly driverCores?: number;
  /**
  * Driver memory of the Spark application, for example, 2 GB and 2048 MB.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#driver_memory DliTemplateSpark#driver_memory}
  */
  readonly driverMemory?: string;
  /**
  * Number of CPU cores of each Executor in the Spark application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#executor_cores DliTemplateSpark#executor_cores}
  */
  readonly executorCores?: number;
  /**
  * Executor memory of the Spark application, for example, 2 GB and 2048 MB.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#executor_memory DliTemplateSpark#executor_memory}
  */
  readonly executorMemory?: string;
  /**
  * Name of the package that is of the file type and has been uploaded to the DLI resource management system.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#files DliTemplateSpark#files}
  */
  readonly files?: string[];
  /**
  * Name of the package that is of the JAR type and has been uploaded to the DLI resource management system.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#jars DliTemplateSpark#jars}
  */
  readonly jars?: string[];
  /**
  * Java/Spark main class of the template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#main_class DliTemplateSpark#main_class}
  */
  readonly mainClass?: string;
  /**
  * Maximum retry times.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#max_retry_times DliTemplateSpark#max_retry_times}
  */
  readonly maxRetryTimes?: number;
  /**
  * Name of the dependent system resource module.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#modules DliTemplateSpark#modules}
  */
  readonly modules?: string[];
  /**
  * The spark job name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#name DliTemplateSpark#name}
  */
  readonly name?: string;
  /**
  * Number of Executors in a Spark application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#num_executors DliTemplateSpark#num_executors}
  */
  readonly numExecutors?: number;
  /**
  * OBS bucket for storing the Spark jobs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#obs_bucket DliTemplateSpark#obs_bucket}
  */
  readonly obsBucket?: string;
  /**
  * Name of the package that is of the PyFile type and has been uploaded to the DLI resource management system.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#python_files DliTemplateSpark#python_files}
  */
  readonly pythonFiles?: string[];
  /**
  * The DLI queue name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#queue_name DliTemplateSpark#queue_name}
  */
  readonly queueName?: string;
  /**
  * Compute resource type. Currently, resource types A, B, and C are available.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#specification DliTemplateSpark#specification}
  */
  readonly specification?: string;
  /**
  * dependent_packages block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#dependent_packages DliTemplateSpark#dependent_packages}
  */
  readonly dependentPackages?: DliTemplateSparkBodyDependentPackages[] | cdktf.IResolvable;
  /**
  * resources block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#resources DliTemplateSpark#resources}
  */
  readonly resources?: DliTemplateSparkBodyResources[] | cdktf.IResolvable;
}

export function dliTemplateSparkBodyToTerraform(struct?: DliTemplateSparkBodyOutputReference | DliTemplateSparkBody): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    app_name: cdktf.stringToTerraform(struct!.appName),
    app_parameters: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.appParameters),
    auto_recovery: cdktf.booleanToTerraform(struct!.autoRecovery),
    configurations: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.configurations),
    driver_cores: cdktf.numberToTerraform(struct!.driverCores),
    driver_memory: cdktf.stringToTerraform(struct!.driverMemory),
    executor_cores: cdktf.numberToTerraform(struct!.executorCores),
    executor_memory: cdktf.stringToTerraform(struct!.executorMemory),
    files: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.files),
    jars: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.jars),
    main_class: cdktf.stringToTerraform(struct!.mainClass),
    max_retry_times: cdktf.numberToTerraform(struct!.maxRetryTimes),
    modules: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.modules),
    name: cdktf.stringToTerraform(struct!.name),
    num_executors: cdktf.numberToTerraform(struct!.numExecutors),
    obs_bucket: cdktf.stringToTerraform(struct!.obsBucket),
    python_files: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.pythonFiles),
    queue_name: cdktf.stringToTerraform(struct!.queueName),
    specification: cdktf.stringToTerraform(struct!.specification),
    dependent_packages: cdktf.listMapper(dliTemplateSparkBodyDependentPackagesToTerraform, true)(struct!.dependentPackages),
    resources: cdktf.listMapper(dliTemplateSparkBodyResourcesToTerraform, true)(struct!.resources),
  }
}


export function dliTemplateSparkBodyToHclTerraform(struct?: DliTemplateSparkBodyOutputReference | DliTemplateSparkBody): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    app_name: {
      value: cdktf.stringToHclTerraform(struct!.appName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    app_parameters: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.appParameters),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    auto_recovery: {
      value: cdktf.booleanToHclTerraform(struct!.autoRecovery),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    configurations: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.configurations),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    driver_cores: {
      value: cdktf.numberToHclTerraform(struct!.driverCores),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    driver_memory: {
      value: cdktf.stringToHclTerraform(struct!.driverMemory),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    executor_cores: {
      value: cdktf.numberToHclTerraform(struct!.executorCores),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    executor_memory: {
      value: cdktf.stringToHclTerraform(struct!.executorMemory),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    files: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.files),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    jars: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.jars),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    main_class: {
      value: cdktf.stringToHclTerraform(struct!.mainClass),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_retry_times: {
      value: cdktf.numberToHclTerraform(struct!.maxRetryTimes),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    modules: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.modules),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    num_executors: {
      value: cdktf.numberToHclTerraform(struct!.numExecutors),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    obs_bucket: {
      value: cdktf.stringToHclTerraform(struct!.obsBucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    python_files: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.pythonFiles),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    queue_name: {
      value: cdktf.stringToHclTerraform(struct!.queueName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    specification: {
      value: cdktf.stringToHclTerraform(struct!.specification),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    dependent_packages: {
      value: cdktf.listMapperHcl(dliTemplateSparkBodyDependentPackagesToHclTerraform, true)(struct!.dependentPackages),
      isBlock: true,
      type: "list",
      storageClassType: "DliTemplateSparkBodyDependentPackagesList",
    },
    resources: {
      value: cdktf.listMapperHcl(dliTemplateSparkBodyResourcesToHclTerraform, true)(struct!.resources),
      isBlock: true,
      type: "list",
      storageClassType: "DliTemplateSparkBodyResourcesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DliTemplateSparkBodyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DliTemplateSparkBody | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._appName !== undefined) {
      hasAnyValues = true;
      internalValueResult.appName = this._appName;
    }
    if (this._appParameters !== undefined) {
      hasAnyValues = true;
      internalValueResult.appParameters = this._appParameters;
    }
    if (this._autoRecovery !== undefined) {
      hasAnyValues = true;
      internalValueResult.autoRecovery = this._autoRecovery;
    }
    if (this._configurations !== undefined) {
      hasAnyValues = true;
      internalValueResult.configurations = this._configurations;
    }
    if (this._driverCores !== undefined) {
      hasAnyValues = true;
      internalValueResult.driverCores = this._driverCores;
    }
    if (this._driverMemory !== undefined) {
      hasAnyValues = true;
      internalValueResult.driverMemory = this._driverMemory;
    }
    if (this._executorCores !== undefined) {
      hasAnyValues = true;
      internalValueResult.executorCores = this._executorCores;
    }
    if (this._executorMemory !== undefined) {
      hasAnyValues = true;
      internalValueResult.executorMemory = this._executorMemory;
    }
    if (this._files !== undefined) {
      hasAnyValues = true;
      internalValueResult.files = this._files;
    }
    if (this._jars !== undefined) {
      hasAnyValues = true;
      internalValueResult.jars = this._jars;
    }
    if (this._mainClass !== undefined) {
      hasAnyValues = true;
      internalValueResult.mainClass = this._mainClass;
    }
    if (this._maxRetryTimes !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxRetryTimes = this._maxRetryTimes;
    }
    if (this._modules !== undefined) {
      hasAnyValues = true;
      internalValueResult.modules = this._modules;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._numExecutors !== undefined) {
      hasAnyValues = true;
      internalValueResult.numExecutors = this._numExecutors;
    }
    if (this._obsBucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsBucket = this._obsBucket;
    }
    if (this._pythonFiles !== undefined) {
      hasAnyValues = true;
      internalValueResult.pythonFiles = this._pythonFiles;
    }
    if (this._queueName !== undefined) {
      hasAnyValues = true;
      internalValueResult.queueName = this._queueName;
    }
    if (this._specification !== undefined) {
      hasAnyValues = true;
      internalValueResult.specification = this._specification;
    }
    if (this._dependentPackages?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.dependentPackages = this._dependentPackages?.internalValue;
    }
    if (this._resources?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.resources = this._resources?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliTemplateSparkBody | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._appName = undefined;
      this._appParameters = undefined;
      this._autoRecovery = undefined;
      this._configurations = undefined;
      this._driverCores = undefined;
      this._driverMemory = undefined;
      this._executorCores = undefined;
      this._executorMemory = undefined;
      this._files = undefined;
      this._jars = undefined;
      this._mainClass = undefined;
      this._maxRetryTimes = undefined;
      this._modules = undefined;
      this._name = undefined;
      this._numExecutors = undefined;
      this._obsBucket = undefined;
      this._pythonFiles = undefined;
      this._queueName = undefined;
      this._specification = undefined;
      this._dependentPackages.internalValue = undefined;
      this._resources.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._appName = value.appName;
      this._appParameters = value.appParameters;
      this._autoRecovery = value.autoRecovery;
      this._configurations = value.configurations;
      this._driverCores = value.driverCores;
      this._driverMemory = value.driverMemory;
      this._executorCores = value.executorCores;
      this._executorMemory = value.executorMemory;
      this._files = value.files;
      this._jars = value.jars;
      this._mainClass = value.mainClass;
      this._maxRetryTimes = value.maxRetryTimes;
      this._modules = value.modules;
      this._name = value.name;
      this._numExecutors = value.numExecutors;
      this._obsBucket = value.obsBucket;
      this._pythonFiles = value.pythonFiles;
      this._queueName = value.queueName;
      this._specification = value.specification;
      this._dependentPackages.internalValue = value.dependentPackages;
      this._resources.internalValue = value.resources;
    }
  }

  // app_name - computed: true, optional: true, required: false
  private _appName?: string; 
  public get appName() {
    return this.getStringAttribute('app_name');
  }
  public set appName(value: string) {
    this._appName = value;
  }
  public resetAppName() {
    this._appName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appNameInput() {
    return this._appName;
  }

  // app_parameters - computed: true, optional: true, required: false
  private _appParameters?: string[]; 
  public get appParameters() {
    return this.getListAttribute('app_parameters');
  }
  public set appParameters(value: string[]) {
    this._appParameters = value;
  }
  public resetAppParameters() {
    this._appParameters = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appParametersInput() {
    return this._appParameters;
  }

  // auto_recovery - computed: true, optional: true, required: false
  private _autoRecovery?: boolean | cdktf.IResolvable; 
  public get autoRecovery() {
    return this.getBooleanAttribute('auto_recovery');
  }
  public set autoRecovery(value: boolean | cdktf.IResolvable) {
    this._autoRecovery = value;
  }
  public resetAutoRecovery() {
    this._autoRecovery = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoRecoveryInput() {
    return this._autoRecovery;
  }

  // configurations - computed: true, optional: true, required: false
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

  // driver_cores - computed: true, optional: true, required: false
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

  // driver_memory - computed: true, optional: true, required: false
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

  // executor_cores - computed: true, optional: true, required: false
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

  // executor_memory - computed: true, optional: true, required: false
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

  // files - computed: true, optional: true, required: false
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

  // jars - computed: true, optional: true, required: false
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

  // main_class - computed: true, optional: true, required: false
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

  // max_retry_times - computed: true, optional: true, required: false
  private _maxRetryTimes?: number; 
  public get maxRetryTimes() {
    return this.getNumberAttribute('max_retry_times');
  }
  public set maxRetryTimes(value: number) {
    this._maxRetryTimes = value;
  }
  public resetMaxRetryTimes() {
    this._maxRetryTimes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxRetryTimesInput() {
    return this._maxRetryTimes;
  }

  // modules - computed: true, optional: true, required: false
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

  // name - computed: true, optional: true, required: false
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

  // num_executors - computed: true, optional: true, required: false
  private _numExecutors?: number; 
  public get numExecutors() {
    return this.getNumberAttribute('num_executors');
  }
  public set numExecutors(value: number) {
    this._numExecutors = value;
  }
  public resetNumExecutors() {
    this._numExecutors = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get numExecutorsInput() {
    return this._numExecutors;
  }

  // obs_bucket - computed: true, optional: true, required: false
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

  // python_files - computed: true, optional: true, required: false
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

  // specification - computed: true, optional: true, required: false
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
  private _dependentPackages = new DliTemplateSparkBodyDependentPackagesList(this, "dependent_packages", false);
  public get dependentPackages() {
    return this._dependentPackages;
  }
  public putDependentPackages(value: DliTemplateSparkBodyDependentPackages[] | cdktf.IResolvable) {
    this._dependentPackages.internalValue = value;
  }
  public resetDependentPackages() {
    this._dependentPackages.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependentPackagesInput() {
    return this._dependentPackages.internalValue;
  }

  // resources - computed: false, optional: true, required: false
  private _resources = new DliTemplateSparkBodyResourcesList(this, "resources", false);
  public get resources() {
    return this._resources;
  }
  public putResources(value: DliTemplateSparkBodyResources[] | cdktf.IResolvable) {
    this._resources.internalValue = value;
  }
  public resetResources() {
    this._resources.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourcesInput() {
    return this._resources.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark huaweicloud_dli_template_spark}
*/
export class DliTemplateSpark extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dli_template_spark";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DliTemplateSpark resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DliTemplateSpark to import
  * @param importFromId The id of the existing DliTemplateSpark that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DliTemplateSpark to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dli_template_spark", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_template_spark huaweicloud_dli_template_spark} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DliTemplateSparkConfig
  */
  public constructor(scope: Construct, id: string, config: DliTemplateSparkConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dli_template_spark',
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
    this._group = config.group;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._body.internalValue = config.body;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // group - computed: true, optional: true, required: false
  private _group?: string; 
  public get group() {
    return this.getStringAttribute('group');
  }
  public set group(value: string) {
    this._group = value;
  }
  public resetGroup() {
    this._group = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get groupInput() {
    return this._group;
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

  // body - computed: false, optional: false, required: true
  private _body = new DliTemplateSparkBodyOutputReference(this, "body");
  public get body() {
    return this._body;
  }
  public putBody(value: DliTemplateSparkBody) {
    this._body.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bodyInput() {
    return this._body.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      group: cdktf.stringToTerraform(this._group),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      body: dliTemplateSparkBodyToTerraform(this._body.internalValue),
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
      group: {
        value: cdktf.stringToHclTerraform(this._group),
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
      body: {
        value: dliTemplateSparkBodyToHclTerraform(this._body.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DliTemplateSparkBodyList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

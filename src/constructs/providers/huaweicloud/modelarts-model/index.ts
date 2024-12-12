// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ModelartsModelConfig extends cdktf.TerraformMetaArguments {
  /**
  * Model description that consists of 1 to 100 characters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#description ModelartsModel#description}
  */
  readonly description?: string;
  /**
  * OBS path for storing the execution code.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#execution_code ModelartsModel#execution_code}
  */
  readonly executionCode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#id ModelartsModel#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The model configuration file.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#initial_config ModelartsModel#initial_config}
  */
  readonly initialConfig?: string;
  /**
  * Deployment type. Only lowercase letters are supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#install_type ModelartsModel#install_type}
  */
  readonly installType?: string[];
  /**
  * Model precision.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#metrics ModelartsModel#metrics}
  */
  readonly metrics?: string;
  /**
  * Model algorithm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#model_algorithm ModelartsModel#model_algorithm}
  */
  readonly modelAlgorithm?: string;
  /**
  * Model type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#model_type ModelartsModel#model_type}
  */
  readonly modelType: string;
  /**
  * Model name, which consists of 1 to 64 characters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#name ModelartsModel#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#region ModelartsModel#region}
  */
  readonly region?: string;
  /**
  * Model runtime environment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#runtime ModelartsModel#runtime}
  */
  readonly runtime?: string;
  /**
  * Whether to enable image replication.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#source_copy ModelartsModel#source_copy}
  */
  readonly sourceCopy?: string;
  /**
  * ID of the source training job.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#source_job_id ModelartsModel#source_job_id}
  */
  readonly sourceJobId?: string;
  /**
  * Version of the source training job.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#source_job_version ModelartsModel#source_job_version}
  */
  readonly sourceJobVersion?: string;
  /**
  * OBS path where the model is located or the SWR image location.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#source_location ModelartsModel#source_location}
  */
  readonly sourceLocation: string;
  /**
  * Model source type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#source_type ModelartsModel#source_type}
  */
  readonly sourceType?: string;
  /**
  * Model version in the format of Digit.Digit.Digit.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#version ModelartsModel#version}
  */
  readonly version: string;
  /**
  * Workspace ID, which defaults to 0.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#workspace_id ModelartsModel#workspace_id}
  */
  readonly workspaceId?: string;
  /**
  * dependencies block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#dependencies ModelartsModel#dependencies}
  */
  readonly dependencies?: ModelartsModelDependencies[] | cdktf.IResolvable;
  /**
  * model_docs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#model_docs ModelartsModel#model_docs}
  */
  readonly modelDocs?: ModelartsModelModelDocs[] | cdktf.IResolvable;
  /**
  * template block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#template ModelartsModel#template}
  */
  readonly template?: ModelartsModelTemplate;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#timeouts ModelartsModel#timeouts}
  */
  readonly timeouts?: ModelartsModelTimeouts;
}
export interface ModelartsModelDependenciesPackages {
  /**
  * Name of a dependency package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#package_name ModelartsModel#package_name}
  */
  readonly packageName: string;
  /**
  * Version of a dependency package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#package_version ModelartsModel#package_version}
  */
  readonly packageVersion?: string;
  /**
  * Version restriction, which can be **EXACT**, **ATLEAST**, or **ATMOST**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#restraint ModelartsModel#restraint}
  */
  readonly restraint?: string;
}

export function modelartsModelDependenciesPackagesToTerraform(struct?: ModelartsModelDependenciesPackages | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    package_name: cdktf.stringToTerraform(struct!.packageName),
    package_version: cdktf.stringToTerraform(struct!.packageVersion),
    restraint: cdktf.stringToTerraform(struct!.restraint),
  }
}


export function modelartsModelDependenciesPackagesToHclTerraform(struct?: ModelartsModelDependenciesPackages | cdktf.IResolvable): any {
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
    package_version: {
      value: cdktf.stringToHclTerraform(struct!.packageVersion),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    restraint: {
      value: cdktf.stringToHclTerraform(struct!.restraint),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsModelDependenciesPackagesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ModelartsModelDependenciesPackages | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._packageName !== undefined) {
      hasAnyValues = true;
      internalValueResult.packageName = this._packageName;
    }
    if (this._packageVersion !== undefined) {
      hasAnyValues = true;
      internalValueResult.packageVersion = this._packageVersion;
    }
    if (this._restraint !== undefined) {
      hasAnyValues = true;
      internalValueResult.restraint = this._restraint;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsModelDependenciesPackages | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._packageName = undefined;
      this._packageVersion = undefined;
      this._restraint = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._packageName = value.packageName;
      this._packageVersion = value.packageVersion;
      this._restraint = value.restraint;
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

  // package_version - computed: true, optional: true, required: false
  private _packageVersion?: string; 
  public get packageVersion() {
    return this.getStringAttribute('package_version');
  }
  public set packageVersion(value: string) {
    this._packageVersion = value;
  }
  public resetPackageVersion() {
    this._packageVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get packageVersionInput() {
    return this._packageVersion;
  }

  // restraint - computed: true, optional: true, required: false
  private _restraint?: string; 
  public get restraint() {
    return this.getStringAttribute('restraint');
  }
  public set restraint(value: string) {
    this._restraint = value;
  }
  public resetRestraint() {
    this._restraint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get restraintInput() {
    return this._restraint;
  }
}

export class ModelartsModelDependenciesPackagesList extends cdktf.ComplexList {
  public internalValue? : ModelartsModelDependenciesPackages[] | cdktf.IResolvable

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
  public get(index: number): ModelartsModelDependenciesPackagesOutputReference {
    return new ModelartsModelDependenciesPackagesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ModelartsModelDependencies {
  /**
  * Installation mode. Only **pip** is supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#installer ModelartsModel#installer}
  */
  readonly installer: string;
  /**
  * packages block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#packages ModelartsModel#packages}
  */
  readonly packages: ModelartsModelDependenciesPackages[] | cdktf.IResolvable;
}

export function modelartsModelDependenciesToTerraform(struct?: ModelartsModelDependencies | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    installer: cdktf.stringToTerraform(struct!.installer),
    packages: cdktf.listMapper(modelartsModelDependenciesPackagesToTerraform, true)(struct!.packages),
  }
}


export function modelartsModelDependenciesToHclTerraform(struct?: ModelartsModelDependencies | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    installer: {
      value: cdktf.stringToHclTerraform(struct!.installer),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    packages: {
      value: cdktf.listMapperHcl(modelartsModelDependenciesPackagesToHclTerraform, true)(struct!.packages),
      isBlock: true,
      type: "list",
      storageClassType: "ModelartsModelDependenciesPackagesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsModelDependenciesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ModelartsModelDependencies | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._installer !== undefined) {
      hasAnyValues = true;
      internalValueResult.installer = this._installer;
    }
    if (this._packages?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.packages = this._packages?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsModelDependencies | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._installer = undefined;
      this._packages.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._installer = value.installer;
      this._packages.internalValue = value.packages;
    }
  }

  // installer - computed: false, optional: false, required: true
  private _installer?: string; 
  public get installer() {
    return this.getStringAttribute('installer');
  }
  public set installer(value: string) {
    this._installer = value;
  }
  // Temporarily expose input value. Use with caution.
  public get installerInput() {
    return this._installer;
  }

  // packages - computed: false, optional: false, required: true
  private _packages = new ModelartsModelDependenciesPackagesList(this, "packages", false);
  public get packages() {
    return this._packages;
  }
  public putPackages(value: ModelartsModelDependenciesPackages[] | cdktf.IResolvable) {
    this._packages.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get packagesInput() {
    return this._packages.internalValue;
  }
}

export class ModelartsModelDependenciesList extends cdktf.ComplexList {
  public internalValue? : ModelartsModelDependencies[] | cdktf.IResolvable

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
  public get(index: number): ModelartsModelDependenciesOutputReference {
    return new ModelartsModelDependenciesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ModelartsModelModelDocs {
  /**
  * Document name, which must start with a letter. Enter 1 to 48 characters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#doc_name ModelartsModel#doc_name}
  */
  readonly docName?: string;
  /**
  * HTTP(S) link of the document.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#doc_url ModelartsModel#doc_url}
  */
  readonly docUrl?: string;
}

export function modelartsModelModelDocsToTerraform(struct?: ModelartsModelModelDocs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    doc_name: cdktf.stringToTerraform(struct!.docName),
    doc_url: cdktf.stringToTerraform(struct!.docUrl),
  }
}


export function modelartsModelModelDocsToHclTerraform(struct?: ModelartsModelModelDocs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    doc_name: {
      value: cdktf.stringToHclTerraform(struct!.docName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    doc_url: {
      value: cdktf.stringToHclTerraform(struct!.docUrl),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsModelModelDocsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ModelartsModelModelDocs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._docName !== undefined) {
      hasAnyValues = true;
      internalValueResult.docName = this._docName;
    }
    if (this._docUrl !== undefined) {
      hasAnyValues = true;
      internalValueResult.docUrl = this._docUrl;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsModelModelDocs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._docName = undefined;
      this._docUrl = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._docName = value.docName;
      this._docUrl = value.docUrl;
    }
  }

  // doc_name - computed: true, optional: true, required: false
  private _docName?: string; 
  public get docName() {
    return this.getStringAttribute('doc_name');
  }
  public set docName(value: string) {
    this._docName = value;
  }
  public resetDocName() {
    this._docName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get docNameInput() {
    return this._docName;
  }

  // doc_url - computed: true, optional: true, required: false
  private _docUrl?: string; 
  public get docUrl() {
    return this.getStringAttribute('doc_url');
  }
  public set docUrl(value: string) {
    this._docUrl = value;
  }
  public resetDocUrl() {
    this._docUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get docUrlInput() {
    return this._docUrl;
  }
}

export class ModelartsModelModelDocsList extends cdktf.ComplexList {
  public internalValue? : ModelartsModelModelDocs[] | cdktf.IResolvable

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
  public get(index: number): ModelartsModelModelDocsOutputReference {
    return new ModelartsModelModelDocsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ModelartsModelTemplateTemplateInputs {
  /**
  * Template input path, which can be a path to an OBS file or directory.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#input ModelartsModel#input}
  */
  readonly input: string;
  /**
  * Input item ID, which is obtained from template details.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#input_id ModelartsModel#input_id}
  */
  readonly inputId: string;
}

export function modelartsModelTemplateTemplateInputsToTerraform(struct?: ModelartsModelTemplateTemplateInputs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    input: cdktf.stringToTerraform(struct!.input),
    input_id: cdktf.stringToTerraform(struct!.inputId),
  }
}


export function modelartsModelTemplateTemplateInputsToHclTerraform(struct?: ModelartsModelTemplateTemplateInputs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    input: {
      value: cdktf.stringToHclTerraform(struct!.input),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    input_id: {
      value: cdktf.stringToHclTerraform(struct!.inputId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsModelTemplateTemplateInputsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ModelartsModelTemplateTemplateInputs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._input !== undefined) {
      hasAnyValues = true;
      internalValueResult.input = this._input;
    }
    if (this._inputId !== undefined) {
      hasAnyValues = true;
      internalValueResult.inputId = this._inputId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsModelTemplateTemplateInputs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._input = undefined;
      this._inputId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._input = value.input;
      this._inputId = value.inputId;
    }
  }

  // input - computed: false, optional: false, required: true
  private _input?: string; 
  public get input() {
    return this.getStringAttribute('input');
  }
  public set input(value: string) {
    this._input = value;
  }
  // Temporarily expose input value. Use with caution.
  public get inputInput() {
    return this._input;
  }

  // input_id - computed: false, optional: false, required: true
  private _inputId?: string; 
  public get inputId() {
    return this.getStringAttribute('input_id');
  }
  public set inputId(value: string) {
    this._inputId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get inputIdInput() {
    return this._inputId;
  }
}

export class ModelartsModelTemplateTemplateInputsList extends cdktf.ComplexList {
  public internalValue? : ModelartsModelTemplateTemplateInputs[] | cdktf.IResolvable

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
  public get(index: number): ModelartsModelTemplateTemplateInputsOutputReference {
    return new ModelartsModelTemplateTemplateInputsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ModelartsModelTemplate {
  /**
  * ID of the input and output mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#infer_format ModelartsModel#infer_format}
  */
  readonly inferFormat?: string;
  /**
  * ID of the used template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#template_id ModelartsModel#template_id}
  */
  readonly templateId: string;
  /**
  * template_inputs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#template_inputs ModelartsModel#template_inputs}
  */
  readonly templateInputs: ModelartsModelTemplateTemplateInputs[] | cdktf.IResolvable;
}

export function modelartsModelTemplateToTerraform(struct?: ModelartsModelTemplateOutputReference | ModelartsModelTemplate): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    infer_format: cdktf.stringToTerraform(struct!.inferFormat),
    template_id: cdktf.stringToTerraform(struct!.templateId),
    template_inputs: cdktf.listMapper(modelartsModelTemplateTemplateInputsToTerraform, true)(struct!.templateInputs),
  }
}


export function modelartsModelTemplateToHclTerraform(struct?: ModelartsModelTemplateOutputReference | ModelartsModelTemplate): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    infer_format: {
      value: cdktf.stringToHclTerraform(struct!.inferFormat),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    template_id: {
      value: cdktf.stringToHclTerraform(struct!.templateId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    template_inputs: {
      value: cdktf.listMapperHcl(modelartsModelTemplateTemplateInputsToHclTerraform, true)(struct!.templateInputs),
      isBlock: true,
      type: "list",
      storageClassType: "ModelartsModelTemplateTemplateInputsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsModelTemplateOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ModelartsModelTemplate | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._inferFormat !== undefined) {
      hasAnyValues = true;
      internalValueResult.inferFormat = this._inferFormat;
    }
    if (this._templateId !== undefined) {
      hasAnyValues = true;
      internalValueResult.templateId = this._templateId;
    }
    if (this._templateInputs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.templateInputs = this._templateInputs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsModelTemplate | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._inferFormat = undefined;
      this._templateId = undefined;
      this._templateInputs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._inferFormat = value.inferFormat;
      this._templateId = value.templateId;
      this._templateInputs.internalValue = value.templateInputs;
    }
  }

  // infer_format - computed: true, optional: true, required: false
  private _inferFormat?: string; 
  public get inferFormat() {
    return this.getStringAttribute('infer_format');
  }
  public set inferFormat(value: string) {
    this._inferFormat = value;
  }
  public resetInferFormat() {
    this._inferFormat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inferFormatInput() {
    return this._inferFormat;
  }

  // template_id - computed: false, optional: false, required: true
  private _templateId?: string; 
  public get templateId() {
    return this.getStringAttribute('template_id');
  }
  public set templateId(value: string) {
    this._templateId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get templateIdInput() {
    return this._templateId;
  }

  // template_inputs - computed: false, optional: false, required: true
  private _templateInputs = new ModelartsModelTemplateTemplateInputsList(this, "template_inputs", false);
  public get templateInputs() {
    return this._templateInputs;
  }
  public putTemplateInputs(value: ModelartsModelTemplateTemplateInputs[] | cdktf.IResolvable) {
    this._templateInputs.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get templateInputsInput() {
    return this._templateInputs.internalValue;
  }
}
export interface ModelartsModelTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#create ModelartsModel#create}
  */
  readonly create?: string;
}

export function modelartsModelTimeoutsToTerraform(struct?: ModelartsModelTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function modelartsModelTimeoutsToHclTerraform(struct?: ModelartsModelTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsModelTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): ModelartsModelTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsModelTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model huaweicloud_modelarts_model}
*/
export class ModelartsModel extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_modelarts_model";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ModelartsModel resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ModelartsModel to import
  * @param importFromId The id of the existing ModelartsModel that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ModelartsModel to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_modelarts_model", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_model huaweicloud_modelarts_model} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ModelartsModelConfig
  */
  public constructor(scope: Construct, id: string, config: ModelartsModelConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_modelarts_model',
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
    this._executionCode = config.executionCode;
    this._id = config.id;
    this._initialConfig = config.initialConfig;
    this._installType = config.installType;
    this._metrics = config.metrics;
    this._modelAlgorithm = config.modelAlgorithm;
    this._modelType = config.modelType;
    this._name = config.name;
    this._region = config.region;
    this._runtime = config.runtime;
    this._sourceCopy = config.sourceCopy;
    this._sourceJobId = config.sourceJobId;
    this._sourceJobVersion = config.sourceJobVersion;
    this._sourceLocation = config.sourceLocation;
    this._sourceType = config.sourceType;
    this._version = config.version;
    this._workspaceId = config.workspaceId;
    this._dependencies.internalValue = config.dependencies;
    this._modelDocs.internalValue = config.modelDocs;
    this._template.internalValue = config.template;
    this._timeouts.internalValue = config.timeouts;
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

  // execution_code - computed: true, optional: true, required: false
  private _executionCode?: string; 
  public get executionCode() {
    return this.getStringAttribute('execution_code');
  }
  public set executionCode(value: string) {
    this._executionCode = value;
  }
  public resetExecutionCode() {
    this._executionCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executionCodeInput() {
    return this._executionCode;
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

  // image_address - computed: true, optional: false, required: false
  public get imageAddress() {
    return this.getStringAttribute('image_address');
  }

  // initial_config - computed: true, optional: true, required: false
  private _initialConfig?: string; 
  public get initialConfig() {
    return this.getStringAttribute('initial_config');
  }
  public set initialConfig(value: string) {
    this._initialConfig = value;
  }
  public resetInitialConfig() {
    this._initialConfig = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get initialConfigInput() {
    return this._initialConfig;
  }

  // install_type - computed: true, optional: true, required: false
  private _installType?: string[]; 
  public get installType() {
    return this.getListAttribute('install_type');
  }
  public set installType(value: string[]) {
    this._installType = value;
  }
  public resetInstallType() {
    this._installType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get installTypeInput() {
    return this._installType;
  }

  // market_flag - computed: true, optional: false, required: false
  public get marketFlag() {
    return this.getBooleanAttribute('market_flag');
  }

  // metrics - computed: true, optional: true, required: false
  private _metrics?: string; 
  public get metrics() {
    return this.getStringAttribute('metrics');
  }
  public set metrics(value: string) {
    this._metrics = value;
  }
  public resetMetrics() {
    this._metrics = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricsInput() {
    return this._metrics;
  }

  // model_algorithm - computed: true, optional: true, required: false
  private _modelAlgorithm?: string; 
  public get modelAlgorithm() {
    return this.getStringAttribute('model_algorithm');
  }
  public set modelAlgorithm(value: string) {
    this._modelAlgorithm = value;
  }
  public resetModelAlgorithm() {
    this._modelAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get modelAlgorithmInput() {
    return this._modelAlgorithm;
  }

  // model_size - computed: true, optional: false, required: false
  public get modelSize() {
    return this.getNumberAttribute('model_size');
  }

  // model_source - computed: true, optional: false, required: false
  public get modelSource() {
    return this.getStringAttribute('model_source');
  }

  // model_type - computed: false, optional: false, required: true
  private _modelType?: string; 
  public get modelType() {
    return this.getStringAttribute('model_type');
  }
  public set modelType(value: string) {
    this._modelType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get modelTypeInput() {
    return this._modelType;
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

  // publishable_flag - computed: true, optional: false, required: false
  public get publishableFlag() {
    return this.getBooleanAttribute('publishable_flag');
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

  // runtime - computed: true, optional: true, required: false
  private _runtime?: string; 
  public get runtime() {
    return this.getStringAttribute('runtime');
  }
  public set runtime(value: string) {
    this._runtime = value;
  }
  public resetRuntime() {
    this._runtime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimeInput() {
    return this._runtime;
  }

  // schema_doc - computed: true, optional: false, required: false
  public get schemaDoc() {
    return this.getStringAttribute('schema_doc');
  }

  // source_copy - computed: true, optional: true, required: false
  private _sourceCopy?: string; 
  public get sourceCopy() {
    return this.getStringAttribute('source_copy');
  }
  public set sourceCopy(value: string) {
    this._sourceCopy = value;
  }
  public resetSourceCopy() {
    this._sourceCopy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceCopyInput() {
    return this._sourceCopy;
  }

  // source_job_id - computed: true, optional: true, required: false
  private _sourceJobId?: string; 
  public get sourceJobId() {
    return this.getStringAttribute('source_job_id');
  }
  public set sourceJobId(value: string) {
    this._sourceJobId = value;
  }
  public resetSourceJobId() {
    this._sourceJobId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceJobIdInput() {
    return this._sourceJobId;
  }

  // source_job_version - computed: true, optional: true, required: false
  private _sourceJobVersion?: string; 
  public get sourceJobVersion() {
    return this.getStringAttribute('source_job_version');
  }
  public set sourceJobVersion(value: string) {
    this._sourceJobVersion = value;
  }
  public resetSourceJobVersion() {
    this._sourceJobVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceJobVersionInput() {
    return this._sourceJobVersion;
  }

  // source_location - computed: false, optional: false, required: true
  private _sourceLocation?: string; 
  public get sourceLocation() {
    return this.getStringAttribute('source_location');
  }
  public set sourceLocation(value: string) {
    this._sourceLocation = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceLocationInput() {
    return this._sourceLocation;
  }

  // source_type - computed: true, optional: true, required: false
  private _sourceType?: string; 
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }
  public set sourceType(value: string) {
    this._sourceType = value;
  }
  public resetSourceType() {
    this._sourceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTypeInput() {
    return this._sourceType;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tunable - computed: true, optional: false, required: false
  public get tunable() {
    return this.getBooleanAttribute('tunable');
  }

  // version - computed: false, optional: false, required: true
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // workspace_id - computed: true, optional: true, required: false
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  public resetWorkspaceId() {
    this._workspaceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // dependencies - computed: false, optional: true, required: false
  private _dependencies = new ModelartsModelDependenciesList(this, "dependencies", false);
  public get dependencies() {
    return this._dependencies;
  }
  public putDependencies(value: ModelartsModelDependencies[] | cdktf.IResolvable) {
    this._dependencies.internalValue = value;
  }
  public resetDependencies() {
    this._dependencies.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependenciesInput() {
    return this._dependencies.internalValue;
  }

  // model_docs - computed: false, optional: true, required: false
  private _modelDocs = new ModelartsModelModelDocsList(this, "model_docs", false);
  public get modelDocs() {
    return this._modelDocs;
  }
  public putModelDocs(value: ModelartsModelModelDocs[] | cdktf.IResolvable) {
    this._modelDocs.internalValue = value;
  }
  public resetModelDocs() {
    this._modelDocs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get modelDocsInput() {
    return this._modelDocs.internalValue;
  }

  // template - computed: false, optional: true, required: false
  private _template = new ModelartsModelTemplateOutputReference(this, "template");
  public get template() {
    return this._template;
  }
  public putTemplate(value: ModelartsModelTemplate) {
    this._template.internalValue = value;
  }
  public resetTemplate() {
    this._template.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateInput() {
    return this._template.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new ModelartsModelTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: ModelartsModelTimeouts) {
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
      description: cdktf.stringToTerraform(this._description),
      execution_code: cdktf.stringToTerraform(this._executionCode),
      id: cdktf.stringToTerraform(this._id),
      initial_config: cdktf.stringToTerraform(this._initialConfig),
      install_type: cdktf.listMapper(cdktf.stringToTerraform, false)(this._installType),
      metrics: cdktf.stringToTerraform(this._metrics),
      model_algorithm: cdktf.stringToTerraform(this._modelAlgorithm),
      model_type: cdktf.stringToTerraform(this._modelType),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      runtime: cdktf.stringToTerraform(this._runtime),
      source_copy: cdktf.stringToTerraform(this._sourceCopy),
      source_job_id: cdktf.stringToTerraform(this._sourceJobId),
      source_job_version: cdktf.stringToTerraform(this._sourceJobVersion),
      source_location: cdktf.stringToTerraform(this._sourceLocation),
      source_type: cdktf.stringToTerraform(this._sourceType),
      version: cdktf.stringToTerraform(this._version),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      dependencies: cdktf.listMapper(modelartsModelDependenciesToTerraform, true)(this._dependencies.internalValue),
      model_docs: cdktf.listMapper(modelartsModelModelDocsToTerraform, true)(this._modelDocs.internalValue),
      template: modelartsModelTemplateToTerraform(this._template.internalValue),
      timeouts: modelartsModelTimeoutsToTerraform(this._timeouts.internalValue),
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
      execution_code: {
        value: cdktf.stringToHclTerraform(this._executionCode),
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
      initial_config: {
        value: cdktf.stringToHclTerraform(this._initialConfig),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      install_type: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._installType),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      metrics: {
        value: cdktf.stringToHclTerraform(this._metrics),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      model_algorithm: {
        value: cdktf.stringToHclTerraform(this._modelAlgorithm),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      model_type: {
        value: cdktf.stringToHclTerraform(this._modelType),
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
      runtime: {
        value: cdktf.stringToHclTerraform(this._runtime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_copy: {
        value: cdktf.stringToHclTerraform(this._sourceCopy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_job_id: {
        value: cdktf.stringToHclTerraform(this._sourceJobId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_job_version: {
        value: cdktf.stringToHclTerraform(this._sourceJobVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_location: {
        value: cdktf.stringToHclTerraform(this._sourceLocation),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_type: {
        value: cdktf.stringToHclTerraform(this._sourceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dependencies: {
        value: cdktf.listMapperHcl(modelartsModelDependenciesToHclTerraform, true)(this._dependencies.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsModelDependenciesList",
      },
      model_docs: {
        value: cdktf.listMapperHcl(modelartsModelModelDocsToHclTerraform, true)(this._modelDocs.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsModelModelDocsList",
      },
      template: {
        value: modelartsModelTemplateToHclTerraform(this._template.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsModelTemplateList",
      },
      timeouts: {
        value: modelartsModelTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "ModelartsModelTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CodehubRepositoryConfig extends cdktf.TerraformMetaArguments {
  /**
  * The repository description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#description CodehubRepository#description}
  */
  readonly description?: string;
  /**
  * Whether to generate the README.md file.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#enable_readme CodehubRepository#enable_readme}
  */
  readonly enableReadme?: number;
  /**
  * The program language type for generating .gitignore files.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#gitignore_id CodehubRepository#gitignore_id}
  */
  readonly gitignoreId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#id CodehubRepository#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Whether to import the project members.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#import_members CodehubRepository#import_members}
  */
  readonly importMembers?: number;
  /**
  * The HTTPS address of the template repository encrypted using Base64.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#import_url CodehubRepository#import_url}
  */
  readonly importUrl?: string;
  /**
  * The license ID for public repository.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#license_id CodehubRepository#license_id}
  */
  readonly licenseId?: number;
  /**
  * The repository name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#name CodehubRepository#name}
  */
  readonly name: string;
  /**
  * The project ID for CodeHub service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#project_id CodehubRepository#project_id}
  */
  readonly projectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#region CodehubRepository#region}
  */
  readonly region?: string;
  /**
  * The visibility level.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#visibility_level CodehubRepository#visibility_level}
  */
  readonly visibilityLevel?: number;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#timeouts CodehubRepository#timeouts}
  */
  readonly timeouts?: CodehubRepositoryTimeouts;
}
export interface CodehubRepositoryTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#create CodehubRepository#create}
  */
  readonly create?: string;
}

export function codehubRepositoryTimeoutsToTerraform(struct?: CodehubRepositoryTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function codehubRepositoryTimeoutsToHclTerraform(struct?: CodehubRepositoryTimeouts | cdktf.IResolvable): any {
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

export class CodehubRepositoryTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CodehubRepositoryTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CodehubRepositoryTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository huaweicloud_codehub_repository}
*/
export class CodehubRepository extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_codehub_repository";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CodehubRepository resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CodehubRepository to import
  * @param importFromId The id of the existing CodehubRepository that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CodehubRepository to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_codehub_repository", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codehub_repository huaweicloud_codehub_repository} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CodehubRepositoryConfig
  */
  public constructor(scope: Construct, id: string, config: CodehubRepositoryConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_codehub_repository',
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
    this._enableReadme = config.enableReadme;
    this._gitignoreId = config.gitignoreId;
    this._id = config.id;
    this._importMembers = config.importMembers;
    this._importUrl = config.importUrl;
    this._licenseId = config.licenseId;
    this._name = config.name;
    this._projectId = config.projectId;
    this._region = config.region;
    this._visibilityLevel = config.visibilityLevel;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // capacity - computed: true, optional: false, required: false
  public get capacity() {
    return this.getStringAttribute('capacity');
  }

  // create_at - computed: true, optional: false, required: false
  public get createAt() {
    return this.getStringAttribute('create_at');
  }

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

  // enable_readme - computed: false, optional: true, required: false
  private _enableReadme?: number; 
  public get enableReadme() {
    return this.getNumberAttribute('enable_readme');
  }
  public set enableReadme(value: number) {
    this._enableReadme = value;
  }
  public resetEnableReadme() {
    this._enableReadme = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableReadmeInput() {
    return this._enableReadme;
  }

  // gitignore_id - computed: true, optional: true, required: false
  private _gitignoreId?: string; 
  public get gitignoreId() {
    return this.getStringAttribute('gitignore_id');
  }
  public set gitignoreId(value: string) {
    this._gitignoreId = value;
  }
  public resetGitignoreId() {
    this._gitignoreId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gitignoreIdInput() {
    return this._gitignoreId;
  }

  // https_url - computed: true, optional: false, required: false
  public get httpsUrl() {
    return this.getStringAttribute('https_url');
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

  // import_members - computed: false, optional: true, required: false
  private _importMembers?: number; 
  public get importMembers() {
    return this.getNumberAttribute('import_members');
  }
  public set importMembers(value: number) {
    this._importMembers = value;
  }
  public resetImportMembers() {
    this._importMembers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get importMembersInput() {
    return this._importMembers;
  }

  // import_url - computed: true, optional: true, required: false
  private _importUrl?: string; 
  public get importUrl() {
    return this.getStringAttribute('import_url');
  }
  public set importUrl(value: string) {
    this._importUrl = value;
  }
  public resetImportUrl() {
    this._importUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get importUrlInput() {
    return this._importUrl;
  }

  // lfs_size - computed: true, optional: false, required: false
  public get lfsSize() {
    return this.getStringAttribute('lfs_size');
  }

  // license_id - computed: false, optional: true, required: false
  private _licenseId?: number; 
  public get licenseId() {
    return this.getNumberAttribute('license_id');
  }
  public set licenseId(value: number) {
    this._licenseId = value;
  }
  public resetLicenseId() {
    this._licenseId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get licenseIdInput() {
    return this._licenseId;
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

  // project_id - computed: false, optional: false, required: true
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
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

  // ssh_url - computed: true, optional: false, required: false
  public get sshUrl() {
    return this.getStringAttribute('ssh_url');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
  }

  // update_at - computed: true, optional: false, required: false
  public get updateAt() {
    return this.getStringAttribute('update_at');
  }

  // visibility_level - computed: true, optional: true, required: false
  private _visibilityLevel?: number; 
  public get visibilityLevel() {
    return this.getNumberAttribute('visibility_level');
  }
  public set visibilityLevel(value: number) {
    this._visibilityLevel = value;
  }
  public resetVisibilityLevel() {
    this._visibilityLevel = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get visibilityLevelInput() {
    return this._visibilityLevel;
  }

  // web_url - computed: true, optional: false, required: false
  public get webUrl() {
    return this.getStringAttribute('web_url');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CodehubRepositoryTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CodehubRepositoryTimeouts) {
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
      enable_readme: cdktf.numberToTerraform(this._enableReadme),
      gitignore_id: cdktf.stringToTerraform(this._gitignoreId),
      id: cdktf.stringToTerraform(this._id),
      import_members: cdktf.numberToTerraform(this._importMembers),
      import_url: cdktf.stringToTerraform(this._importUrl),
      license_id: cdktf.numberToTerraform(this._licenseId),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      visibility_level: cdktf.numberToTerraform(this._visibilityLevel),
      timeouts: codehubRepositoryTimeoutsToTerraform(this._timeouts.internalValue),
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
      enable_readme: {
        value: cdktf.numberToHclTerraform(this._enableReadme),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      gitignore_id: {
        value: cdktf.stringToHclTerraform(this._gitignoreId),
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
      import_members: {
        value: cdktf.numberToHclTerraform(this._importMembers),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      import_url: {
        value: cdktf.stringToHclTerraform(this._importUrl),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      license_id: {
        value: cdktf.numberToHclTerraform(this._licenseId),
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
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
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
      visibility_level: {
        value: cdktf.numberToHclTerraform(this._visibilityLevel),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      timeouts: {
        value: codehubRepositoryTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CodehubRepositoryTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RfsPrivateHookConfig extends cdktf.TerraformMetaArguments {
  /**
  * The description of the private hook.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#description RfsPrivateHook#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#id RfsPrivateHook#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Whether keeping old version while updating hook version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#keep_old_version RfsPrivateHook#keep_old_version}
  */
  readonly keepOldVersion?: boolean | cdktf.IResolvable;
  /**
  * The name of the private hook.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#name RfsPrivateHook#name}
  */
  readonly name: string;
  /**
  * The policy content of the private hook.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#policy_body RfsPrivateHook#policy_body}
  */
  readonly policyBody?: string;
  /**
  * The OBS address of the policy file.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#policy_uri RfsPrivateHook#policy_uri}
  */
  readonly policyUri?: string;
  /**
  * The region where the private hook is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#region RfsPrivateHook#region}
  */
  readonly region?: string;
  /**
  * The version of the private hook.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#version RfsPrivateHook#version}
  */
  readonly version: string;
  /**
  * The description of the private hook version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#version_description RfsPrivateHook#version_description}
  */
  readonly versionDescription?: string;
  /**
  * configuration block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#configuration RfsPrivateHook#configuration}
  */
  readonly configuration?: RfsPrivateHookConfiguration;
}
export interface RfsPrivateHookConfiguration {
  /**
  * The behavior after private hook verification fails.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#failure_mode RfsPrivateHook#failure_mode}
  */
  readonly failureMode?: string;
  /**
  * The target resource stack for the private hook to take effect.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#target_stacks RfsPrivateHook#target_stacks}
  */
  readonly targetStacks?: string;
}

export function rfsPrivateHookConfigurationToTerraform(struct?: RfsPrivateHookConfigurationOutputReference | RfsPrivateHookConfiguration): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    failure_mode: cdktf.stringToTerraform(struct!.failureMode),
    target_stacks: cdktf.stringToTerraform(struct!.targetStacks),
  }
}


export function rfsPrivateHookConfigurationToHclTerraform(struct?: RfsPrivateHookConfigurationOutputReference | RfsPrivateHookConfiguration): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    failure_mode: {
      value: cdktf.stringToHclTerraform(struct!.failureMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_stacks: {
      value: cdktf.stringToHclTerraform(struct!.targetStacks),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RfsPrivateHookConfigurationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): RfsPrivateHookConfiguration | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._failureMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.failureMode = this._failureMode;
    }
    if (this._targetStacks !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetStacks = this._targetStacks;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RfsPrivateHookConfiguration | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._failureMode = undefined;
      this._targetStacks = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._failureMode = value.failureMode;
      this._targetStacks = value.targetStacks;
    }
  }

  // failure_mode - computed: true, optional: true, required: false
  private _failureMode?: string; 
  public get failureMode() {
    return this.getStringAttribute('failure_mode');
  }
  public set failureMode(value: string) {
    this._failureMode = value;
  }
  public resetFailureMode() {
    this._failureMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get failureModeInput() {
    return this._failureMode;
  }

  // target_stacks - computed: true, optional: true, required: false
  private _targetStacks?: string; 
  public get targetStacks() {
    return this.getStringAttribute('target_stacks');
  }
  public set targetStacks(value: string) {
    this._targetStacks = value;
  }
  public resetTargetStacks() {
    this._targetStacks = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get targetStacksInput() {
    return this._targetStacks;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook huaweicloud_rfs_private_hook}
*/
export class RfsPrivateHook extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rfs_private_hook";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a RfsPrivateHook resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the RfsPrivateHook to import
  * @param importFromId The id of the existing RfsPrivateHook that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the RfsPrivateHook to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rfs_private_hook", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_private_hook huaweicloud_rfs_private_hook} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RfsPrivateHookConfig
  */
  public constructor(scope: Construct, id: string, config: RfsPrivateHookConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rfs_private_hook',
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
    this._id = config.id;
    this._keepOldVersion = config.keepOldVersion;
    this._name = config.name;
    this._policyBody = config.policyBody;
    this._policyUri = config.policyUri;
    this._region = config.region;
    this._version = config.version;
    this._versionDescription = config.versionDescription;
    this._configuration.internalValue = config.configuration;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // keep_old_version - computed: false, optional: true, required: false
  private _keepOldVersion?: boolean | cdktf.IResolvable; 
  public get keepOldVersion() {
    return this.getBooleanAttribute('keep_old_version');
  }
  public set keepOldVersion(value: boolean | cdktf.IResolvable) {
    this._keepOldVersion = value;
  }
  public resetKeepOldVersion() {
    this._keepOldVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keepOldVersionInput() {
    return this._keepOldVersion;
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

  // policy_body - computed: false, optional: true, required: false
  private _policyBody?: string; 
  public get policyBody() {
    return this.getStringAttribute('policy_body');
  }
  public set policyBody(value: string) {
    this._policyBody = value;
  }
  public resetPolicyBody() {
    this._policyBody = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyBodyInput() {
    return this._policyBody;
  }

  // policy_uri - computed: false, optional: true, required: false
  private _policyUri?: string; 
  public get policyUri() {
    return this.getStringAttribute('policy_uri');
  }
  public set policyUri(value: string) {
    this._policyUri = value;
  }
  public resetPolicyUri() {
    this._policyUri = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyUriInput() {
    return this._policyUri;
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

  // version_description - computed: false, optional: true, required: false
  private _versionDescription?: string; 
  public get versionDescription() {
    return this.getStringAttribute('version_description');
  }
  public set versionDescription(value: string) {
    this._versionDescription = value;
  }
  public resetVersionDescription() {
    this._versionDescription = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get versionDescriptionInput() {
    return this._versionDescription;
  }

  // configuration - computed: false, optional: true, required: false
  private _configuration = new RfsPrivateHookConfigurationOutputReference(this, "configuration");
  public get configuration() {
    return this._configuration;
  }
  public putConfiguration(value: RfsPrivateHookConfiguration) {
    this._configuration.internalValue = value;
  }
  public resetConfiguration() {
    this._configuration.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationInput() {
    return this._configuration.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      keep_old_version: cdktf.booleanToTerraform(this._keepOldVersion),
      name: cdktf.stringToTerraform(this._name),
      policy_body: cdktf.stringToTerraform(this._policyBody),
      policy_uri: cdktf.stringToTerraform(this._policyUri),
      region: cdktf.stringToTerraform(this._region),
      version: cdktf.stringToTerraform(this._version),
      version_description: cdktf.stringToTerraform(this._versionDescription),
      configuration: rfsPrivateHookConfigurationToTerraform(this._configuration.internalValue),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      keep_old_version: {
        value: cdktf.booleanToHclTerraform(this._keepOldVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      policy_body: {
        value: cdktf.stringToHclTerraform(this._policyBody),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      policy_uri: {
        value: cdktf.stringToHclTerraform(this._policyUri),
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
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      version_description: {
        value: cdktf.stringToHclTerraform(this._versionDescription),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      configuration: {
        value: rfsPrivateHookConfigurationToHclTerraform(this._configuration.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "RfsPrivateHookConfigurationList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SecmasterPlaybookVersionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the action strategy of the playbook version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#action_strategy SecmasterPlaybookVersion#action_strategy}
  */
  readonly actionStrategy?: string;
  /**
  * Specifies the data class ID of the playbook version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#dataclass_id SecmasterPlaybookVersion#dataclass_id}
  */
  readonly dataclassId: string;
  /**
  * Specifies whether to trigger the playbook when data object is created.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#dataobject_create SecmasterPlaybookVersion#dataobject_create}
  */
  readonly dataobjectCreate?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether to trigger the playbook when data object is deleted.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#dataobject_delete SecmasterPlaybookVersion#dataobject_delete}
  */
  readonly dataobjectDelete?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether to trigger the playbook when data object is updated.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#dataobject_update SecmasterPlaybookVersion#dataobject_update}
  */
  readonly dataobjectUpdate?: boolean | cdktf.IResolvable;
  /**
  * Specifies the description of the playbook version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#description SecmasterPlaybookVersion#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#id SecmasterPlaybookVersion#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies playbook ID of the playbook version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#playbook_id SecmasterPlaybookVersion#playbook_id}
  */
  readonly playbookId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#region SecmasterPlaybookVersion#region}
  */
  readonly region?: string;
  /**
  * Specifies whether to enable playbook rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#rule_enable SecmasterPlaybookVersion#rule_enable}
  */
  readonly ruleEnable?: boolean | cdktf.IResolvable;
  /**
  * Specifies the playbook rule ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#rule_id SecmasterPlaybookVersion#rule_id}
  */
  readonly ruleId?: string;
  /**
  * Specifies the trigger type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#trigger_type SecmasterPlaybookVersion#trigger_type}
  */
  readonly triggerType?: string;
  /**
  * Specifies the ID of the workspace to which the playbook version belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#workspace_id SecmasterPlaybookVersion#workspace_id}
  */
  readonly workspaceId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version huaweicloud_secmaster_playbook_version}
*/
export class SecmasterPlaybookVersion extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_playbook_version";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SecmasterPlaybookVersion resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SecmasterPlaybookVersion to import
  * @param importFromId The id of the existing SecmasterPlaybookVersion that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SecmasterPlaybookVersion to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_playbook_version", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_version huaweicloud_secmaster_playbook_version} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SecmasterPlaybookVersionConfig
  */
  public constructor(scope: Construct, id: string, config: SecmasterPlaybookVersionConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_playbook_version',
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
    this._actionStrategy = config.actionStrategy;
    this._dataclassId = config.dataclassId;
    this._dataobjectCreate = config.dataobjectCreate;
    this._dataobjectDelete = config.dataobjectDelete;
    this._dataobjectUpdate = config.dataobjectUpdate;
    this._description = config.description;
    this._id = config.id;
    this._playbookId = config.playbookId;
    this._region = config.region;
    this._ruleEnable = config.ruleEnable;
    this._ruleId = config.ruleId;
    this._triggerType = config.triggerType;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action_strategy - computed: true, optional: true, required: false
  private _actionStrategy?: string; 
  public get actionStrategy() {
    return this.getStringAttribute('action_strategy');
  }
  public set actionStrategy(value: string) {
    this._actionStrategy = value;
  }
  public resetActionStrategy() {
    this._actionStrategy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get actionStrategyInput() {
    return this._actionStrategy;
  }

  // approve_name - computed: true, optional: false, required: false
  public get approveName() {
    return this.getStringAttribute('approve_name');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // creator_id - computed: true, optional: false, required: false
  public get creatorId() {
    return this.getStringAttribute('creator_id');
  }

  // dataclass_id - computed: false, optional: false, required: true
  private _dataclassId?: string; 
  public get dataclassId() {
    return this.getStringAttribute('dataclass_id');
  }
  public set dataclassId(value: string) {
    this._dataclassId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataclassIdInput() {
    return this._dataclassId;
  }

  // dataclass_name - computed: true, optional: false, required: false
  public get dataclassName() {
    return this.getStringAttribute('dataclass_name');
  }

  // dataobject_create - computed: true, optional: true, required: false
  private _dataobjectCreate?: boolean | cdktf.IResolvable; 
  public get dataobjectCreate() {
    return this.getBooleanAttribute('dataobject_create');
  }
  public set dataobjectCreate(value: boolean | cdktf.IResolvable) {
    this._dataobjectCreate = value;
  }
  public resetDataobjectCreate() {
    this._dataobjectCreate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataobjectCreateInput() {
    return this._dataobjectCreate;
  }

  // dataobject_delete - computed: true, optional: true, required: false
  private _dataobjectDelete?: boolean | cdktf.IResolvable; 
  public get dataobjectDelete() {
    return this.getBooleanAttribute('dataobject_delete');
  }
  public set dataobjectDelete(value: boolean | cdktf.IResolvable) {
    this._dataobjectDelete = value;
  }
  public resetDataobjectDelete() {
    this._dataobjectDelete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataobjectDeleteInput() {
    return this._dataobjectDelete;
  }

  // dataobject_update - computed: true, optional: true, required: false
  private _dataobjectUpdate?: boolean | cdktf.IResolvable; 
  public get dataobjectUpdate() {
    return this.getBooleanAttribute('dataobject_update');
  }
  public set dataobjectUpdate(value: boolean | cdktf.IResolvable) {
    this._dataobjectUpdate = value;
  }
  public resetDataobjectUpdate() {
    this._dataobjectUpdate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataobjectUpdateInput() {
    return this._dataobjectUpdate;
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

  // enabled - computed: true, optional: false, required: false
  public get enabled() {
    return this.getBooleanAttribute('enabled');
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

  // modifier_id - computed: true, optional: false, required: false
  public get modifierId() {
    return this.getStringAttribute('modifier_id');
  }

  // playbook_id - computed: false, optional: false, required: true
  private _playbookId?: string; 
  public get playbookId() {
    return this.getStringAttribute('playbook_id');
  }
  public set playbookId(value: string) {
    this._playbookId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get playbookIdInput() {
    return this._playbookId;
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

  // rule_enable - computed: true, optional: true, required: false
  private _ruleEnable?: boolean | cdktf.IResolvable; 
  public get ruleEnable() {
    return this.getBooleanAttribute('rule_enable');
  }
  public set ruleEnable(value: boolean | cdktf.IResolvable) {
    this._ruleEnable = value;
  }
  public resetRuleEnable() {
    this._ruleEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleEnableInput() {
    return this._ruleEnable;
  }

  // rule_id - computed: true, optional: true, required: false
  private _ruleId?: string; 
  public get ruleId() {
    return this.getStringAttribute('rule_id');
  }
  public set ruleId(value: string) {
    this._ruleId = value;
  }
  public resetRuleId() {
    this._ruleId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleIdInput() {
    return this._ruleId;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // trigger_type - computed: true, optional: true, required: false
  private _triggerType?: string; 
  public get triggerType() {
    return this.getStringAttribute('trigger_type');
  }
  public set triggerType(value: string) {
    this._triggerType = value;
  }
  public resetTriggerType() {
    this._triggerType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerTypeInput() {
    return this._triggerType;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getStringAttribute('version');
  }

  // version_type - computed: true, optional: false, required: false
  public get versionType() {
    return this.getNumberAttribute('version_type');
  }

  // workspace_id - computed: false, optional: false, required: true
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      action_strategy: cdktf.stringToTerraform(this._actionStrategy),
      dataclass_id: cdktf.stringToTerraform(this._dataclassId),
      dataobject_create: cdktf.booleanToTerraform(this._dataobjectCreate),
      dataobject_delete: cdktf.booleanToTerraform(this._dataobjectDelete),
      dataobject_update: cdktf.booleanToTerraform(this._dataobjectUpdate),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      playbook_id: cdktf.stringToTerraform(this._playbookId),
      region: cdktf.stringToTerraform(this._region),
      rule_enable: cdktf.booleanToTerraform(this._ruleEnable),
      rule_id: cdktf.stringToTerraform(this._ruleId),
      trigger_type: cdktf.stringToTerraform(this._triggerType),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      action_strategy: {
        value: cdktf.stringToHclTerraform(this._actionStrategy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dataclass_id: {
        value: cdktf.stringToHclTerraform(this._dataclassId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dataobject_create: {
        value: cdktf.booleanToHclTerraform(this._dataobjectCreate),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      dataobject_delete: {
        value: cdktf.booleanToHclTerraform(this._dataobjectDelete),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      dataobject_update: {
        value: cdktf.booleanToHclTerraform(this._dataobjectUpdate),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
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
      playbook_id: {
        value: cdktf.stringToHclTerraform(this._playbookId),
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
      rule_enable: {
        value: cdktf.booleanToHclTerraform(this._ruleEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      rule_id: {
        value: cdktf.stringToHclTerraform(this._ruleId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      trigger_type: {
        value: cdktf.stringToHclTerraform(this._triggerType),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

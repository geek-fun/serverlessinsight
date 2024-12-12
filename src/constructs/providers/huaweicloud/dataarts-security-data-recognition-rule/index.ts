// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataartsSecurityDataRecognitionRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#builtin_rule_id DataartsSecurityDataRecognitionRule#builtin_rule_id}
  */
  readonly builtinRuleId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#category_id DataartsSecurityDataRecognitionRule#category_id}
  */
  readonly categoryId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#column_expression DataartsSecurityDataRecognitionRule#column_expression}
  */
  readonly columnExpression?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#comment_expression DataartsSecurityDataRecognitionRule#comment_expression}
  */
  readonly commentExpression?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#content_expression DataartsSecurityDataRecognitionRule#content_expression}
  */
  readonly contentExpression?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#description DataartsSecurityDataRecognitionRule#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#id DataartsSecurityDataRecognitionRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#method DataartsSecurityDataRecognitionRule#method}
  */
  readonly method?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#name DataartsSecurityDataRecognitionRule#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#region DataartsSecurityDataRecognitionRule#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#rule_type DataartsSecurityDataRecognitionRule#rule_type}
  */
  readonly ruleType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#secrecy_level_id DataartsSecurityDataRecognitionRule#secrecy_level_id}
  */
  readonly secrecyLevelId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#workspace_id DataartsSecurityDataRecognitionRule#workspace_id}
  */
  readonly workspaceId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule huaweicloud_dataarts_security_data_recognition_rule}
*/
export class DataartsSecurityDataRecognitionRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_security_data_recognition_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataartsSecurityDataRecognitionRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataartsSecurityDataRecognitionRule to import
  * @param importFromId The id of the existing DataartsSecurityDataRecognitionRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataartsSecurityDataRecognitionRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_security_data_recognition_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_security_data_recognition_rule huaweicloud_dataarts_security_data_recognition_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataartsSecurityDataRecognitionRuleConfig
  */
  public constructor(scope: Construct, id: string, config: DataartsSecurityDataRecognitionRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_security_data_recognition_rule',
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
    this._builtinRuleId = config.builtinRuleId;
    this._categoryId = config.categoryId;
    this._columnExpression = config.columnExpression;
    this._commentExpression = config.commentExpression;
    this._contentExpression = config.contentExpression;
    this._description = config.description;
    this._id = config.id;
    this._method = config.method;
    this._name = config.name;
    this._region = config.region;
    this._ruleType = config.ruleType;
    this._secrecyLevelId = config.secrecyLevelId;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // builtin_rule_id - computed: false, optional: true, required: false
  private _builtinRuleId?: string; 
  public get builtinRuleId() {
    return this.getStringAttribute('builtin_rule_id');
  }
  public set builtinRuleId(value: string) {
    this._builtinRuleId = value;
  }
  public resetBuiltinRuleId() {
    this._builtinRuleId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get builtinRuleIdInput() {
    return this._builtinRuleId;
  }

  // category_id - computed: false, optional: true, required: false
  private _categoryId?: string; 
  public get categoryId() {
    return this.getStringAttribute('category_id');
  }
  public set categoryId(value: string) {
    this._categoryId = value;
  }
  public resetCategoryId() {
    this._categoryId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get categoryIdInput() {
    return this._categoryId;
  }

  // column_expression - computed: false, optional: true, required: false
  private _columnExpression?: string; 
  public get columnExpression() {
    return this.getStringAttribute('column_expression');
  }
  public set columnExpression(value: string) {
    this._columnExpression = value;
  }
  public resetColumnExpression() {
    this._columnExpression = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get columnExpressionInput() {
    return this._columnExpression;
  }

  // comment_expression - computed: false, optional: true, required: false
  private _commentExpression?: string; 
  public get commentExpression() {
    return this.getStringAttribute('comment_expression');
  }
  public set commentExpression(value: string) {
    this._commentExpression = value;
  }
  public resetCommentExpression() {
    this._commentExpression = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get commentExpressionInput() {
    return this._commentExpression;
  }

  // content_expression - computed: false, optional: true, required: false
  private _contentExpression?: string; 
  public get contentExpression() {
    return this.getStringAttribute('content_expression');
  }
  public set contentExpression(value: string) {
    this._contentExpression = value;
  }
  public resetContentExpression() {
    this._contentExpression = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contentExpressionInput() {
    return this._contentExpression;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
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

  // enable - computed: true, optional: false, required: false
  public get enable() {
    return this.getBooleanAttribute('enable');
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

  // method - computed: true, optional: true, required: false
  private _method?: string; 
  public get method() {
    return this.getStringAttribute('method');
  }
  public set method(value: string) {
    this._method = value;
  }
  public resetMethod() {
    this._method = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get methodInput() {
    return this._method;
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

  // rule_type - computed: false, optional: false, required: true
  private _ruleType?: string; 
  public get ruleType() {
    return this.getStringAttribute('rule_type');
  }
  public set ruleType(value: string) {
    this._ruleType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleTypeInput() {
    return this._ruleType;
  }

  // secrecy_level - computed: true, optional: false, required: false
  public get secrecyLevel() {
    return this.getStringAttribute('secrecy_level');
  }

  // secrecy_level_id - computed: false, optional: false, required: true
  private _secrecyLevelId?: string; 
  public get secrecyLevelId() {
    return this.getStringAttribute('secrecy_level_id');
  }
  public set secrecyLevelId(value: string) {
    this._secrecyLevelId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get secrecyLevelIdInput() {
    return this._secrecyLevelId;
  }

  // secrecy_level_num - computed: true, optional: false, required: false
  public get secrecyLevelNum() {
    return this.getNumberAttribute('secrecy_level_num');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
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
      builtin_rule_id: cdktf.stringToTerraform(this._builtinRuleId),
      category_id: cdktf.stringToTerraform(this._categoryId),
      column_expression: cdktf.stringToTerraform(this._columnExpression),
      comment_expression: cdktf.stringToTerraform(this._commentExpression),
      content_expression: cdktf.stringToTerraform(this._contentExpression),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      method: cdktf.stringToTerraform(this._method),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      rule_type: cdktf.stringToTerraform(this._ruleType),
      secrecy_level_id: cdktf.stringToTerraform(this._secrecyLevelId),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      builtin_rule_id: {
        value: cdktf.stringToHclTerraform(this._builtinRuleId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      category_id: {
        value: cdktf.stringToHclTerraform(this._categoryId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      column_expression: {
        value: cdktf.stringToHclTerraform(this._columnExpression),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      comment_expression: {
        value: cdktf.stringToHclTerraform(this._commentExpression),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      content_expression: {
        value: cdktf.stringToHclTerraform(this._contentExpression),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      method: {
        value: cdktf.stringToHclTerraform(this._method),
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
      rule_type: {
        value: cdktf.stringToHclTerraform(this._ruleType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      secrecy_level_id: {
        value: cdktf.stringToHclTerraform(this._secrecyLevelId),
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

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RfsExecutionPlanConfig extends cdktf.TerraformMetaArguments {
  /**
  * The description of the execution plan.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#description RfsExecutionPlan#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#id RfsExecutionPlan#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the execution plan.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#name RfsExecutionPlan#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#region RfsExecutionPlan#region}
  */
  readonly region?: string;
  /**
  * The ID of the resource stack to which the execution plan belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#stack_id RfsExecutionPlan#stack_id}
  */
  readonly stackId?: string;
  /**
  * The name of the resource stack to which the execution plan belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#stack_name RfsExecutionPlan#stack_name}
  */
  readonly stackName: string;
  /**
  * The HCL/JSON template content for deployment resources.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#template_body RfsExecutionPlan#template_body}
  */
  readonly templateBody?: string;
  /**
  * The OBS address where the HCL/JSON template archive (**.zip** file, which contains all resource **.tf.json** script files to be deployed) or **.tf.json** file is located, which describes the target status of the deployment resources.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#template_uri RfsExecutionPlan#template_uri}
  */
  readonly templateUri?: string;
  /**
  * The variable content for deployment resources.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#vars_body RfsExecutionPlan#vars_body}
  */
  readonly varsBody?: string;
  /**
  * The OBS address where the variable (**.tfvars**) file corresponding to the HCL/JSON template located, which describes the target status of the deployment resources.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#vars_uri RfsExecutionPlan#vars_uri}
  */
  readonly varsUri?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan huaweicloud_rfs_execution_plan}
*/
export class RfsExecutionPlan extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rfs_execution_plan";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a RfsExecutionPlan resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the RfsExecutionPlan to import
  * @param importFromId The id of the existing RfsExecutionPlan that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the RfsExecutionPlan to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rfs_execution_plan", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rfs_execution_plan huaweicloud_rfs_execution_plan} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RfsExecutionPlanConfig
  */
  public constructor(scope: Construct, id: string, config: RfsExecutionPlanConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rfs_execution_plan',
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
    this._name = config.name;
    this._region = config.region;
    this._stackId = config.stackId;
    this._stackName = config.stackName;
    this._templateBody = config.templateBody;
    this._templateUri = config.templateUri;
    this._varsBody = config.varsBody;
    this._varsUri = config.varsUri;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // stack_id - computed: false, optional: true, required: false
  private _stackId?: string; 
  public get stackId() {
    return this.getStringAttribute('stack_id');
  }
  public set stackId(value: string) {
    this._stackId = value;
  }
  public resetStackId() {
    this._stackId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get stackIdInput() {
    return this._stackId;
  }

  // stack_name - computed: false, optional: false, required: true
  private _stackName?: string; 
  public get stackName() {
    return this.getStringAttribute('stack_name');
  }
  public set stackName(value: string) {
    this._stackName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get stackNameInput() {
    return this._stackName;
  }

  // template_body - computed: false, optional: true, required: false
  private _templateBody?: string; 
  public get templateBody() {
    return this.getStringAttribute('template_body');
  }
  public set templateBody(value: string) {
    this._templateBody = value;
  }
  public resetTemplateBody() {
    this._templateBody = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateBodyInput() {
    return this._templateBody;
  }

  // template_uri - computed: false, optional: true, required: false
  private _templateUri?: string; 
  public get templateUri() {
    return this.getStringAttribute('template_uri');
  }
  public set templateUri(value: string) {
    this._templateUri = value;
  }
  public resetTemplateUri() {
    this._templateUri = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateUriInput() {
    return this._templateUri;
  }

  // vars_body - computed: false, optional: true, required: false
  private _varsBody?: string; 
  public get varsBody() {
    return this.getStringAttribute('vars_body');
  }
  public set varsBody(value: string) {
    this._varsBody = value;
  }
  public resetVarsBody() {
    this._varsBody = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get varsBodyInput() {
    return this._varsBody;
  }

  // vars_uri - computed: false, optional: true, required: false
  private _varsUri?: string; 
  public get varsUri() {
    return this.getStringAttribute('vars_uri');
  }
  public set varsUri(value: string) {
    this._varsUri = value;
  }
  public resetVarsUri() {
    this._varsUri = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get varsUriInput() {
    return this._varsUri;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      stack_id: cdktf.stringToTerraform(this._stackId),
      stack_name: cdktf.stringToTerraform(this._stackName),
      template_body: cdktf.stringToTerraform(this._templateBody),
      template_uri: cdktf.stringToTerraform(this._templateUri),
      vars_body: cdktf.stringToTerraform(this._varsBody),
      vars_uri: cdktf.stringToTerraform(this._varsUri),
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
      stack_id: {
        value: cdktf.stringToHclTerraform(this._stackId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      stack_name: {
        value: cdktf.stringToHclTerraform(this._stackName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      template_body: {
        value: cdktf.stringToHclTerraform(this._templateBody),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      template_uri: {
        value: cdktf.stringToHclTerraform(this._templateUri),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vars_body: {
        value: cdktf.stringToHclTerraform(this._varsBody),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vars_uri: {
        value: cdktf.stringToHclTerraform(this._varsUri),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

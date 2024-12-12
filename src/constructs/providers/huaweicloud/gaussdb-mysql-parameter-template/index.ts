// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface GaussdbMysqlParameterTemplateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the DB engine.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#datastore_engine GaussdbMysqlParameterTemplate#datastore_engine}
  */
  readonly datastoreEngine?: string;
  /**
  * Specifies the DB version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#datastore_version GaussdbMysqlParameterTemplate#datastore_version}
  */
  readonly datastoreVersion?: string;
  /**
  * Specifies the parameter template description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#description GaussdbMysqlParameterTemplate#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#id GaussdbMysqlParameterTemplate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the parameter template ID of the GaussDB MySQL instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#instance_configuration_id GaussdbMysqlParameterTemplate#instance_configuration_id}
  */
  readonly instanceConfigurationId?: string;
  /**
  * Specifies the ID of the GaussDB MySQL instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#instance_id GaussdbMysqlParameterTemplate#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Specifies the parameter template name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#name GaussdbMysqlParameterTemplate#name}
  */
  readonly name: string;
  /**
  * Specifies the mapping between parameter names and parameter values.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#parameter_values GaussdbMysqlParameterTemplate#parameter_values}
  */
  readonly parameterValues?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#region GaussdbMysqlParameterTemplate#region}
  */
  readonly region?: string;
  /**
  * Specifies the source parameter template ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#source_configuration_id GaussdbMysqlParameterTemplate#source_configuration_id}
  */
  readonly sourceConfigurationId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template huaweicloud_gaussdb_mysql_parameter_template}
*/
export class GaussdbMysqlParameterTemplate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_gaussdb_mysql_parameter_template";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a GaussdbMysqlParameterTemplate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the GaussdbMysqlParameterTemplate to import
  * @param importFromId The id of the existing GaussdbMysqlParameterTemplate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the GaussdbMysqlParameterTemplate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_gaussdb_mysql_parameter_template", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_parameter_template huaweicloud_gaussdb_mysql_parameter_template} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options GaussdbMysqlParameterTemplateConfig
  */
  public constructor(scope: Construct, id: string, config: GaussdbMysqlParameterTemplateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_gaussdb_mysql_parameter_template',
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
    this._datastoreEngine = config.datastoreEngine;
    this._datastoreVersion = config.datastoreVersion;
    this._description = config.description;
    this._id = config.id;
    this._instanceConfigurationId = config.instanceConfigurationId;
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._parameterValues = config.parameterValues;
    this._region = config.region;
    this._sourceConfigurationId = config.sourceConfigurationId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // datastore_engine - computed: true, optional: true, required: false
  private _datastoreEngine?: string; 
  public get datastoreEngine() {
    return this.getStringAttribute('datastore_engine');
  }
  public set datastoreEngine(value: string) {
    this._datastoreEngine = value;
  }
  public resetDatastoreEngine() {
    this._datastoreEngine = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get datastoreEngineInput() {
    return this._datastoreEngine;
  }

  // datastore_version - computed: true, optional: true, required: false
  private _datastoreVersion?: string; 
  public get datastoreVersion() {
    return this.getStringAttribute('datastore_version');
  }
  public set datastoreVersion(value: string) {
    this._datastoreVersion = value;
  }
  public resetDatastoreVersion() {
    this._datastoreVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get datastoreVersionInput() {
    return this._datastoreVersion;
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

  // instance_configuration_id - computed: false, optional: true, required: false
  private _instanceConfigurationId?: string; 
  public get instanceConfigurationId() {
    return this.getStringAttribute('instance_configuration_id');
  }
  public set instanceConfigurationId(value: string) {
    this._instanceConfigurationId = value;
  }
  public resetInstanceConfigurationId() {
    this._instanceConfigurationId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceConfigurationIdInput() {
    return this._instanceConfigurationId;
  }

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
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

  // parameter_values - computed: true, optional: true, required: false
  private _parameterValues?: { [key: string]: string }; 
  public get parameterValues() {
    return this.getStringMapAttribute('parameter_values');
  }
  public set parameterValues(value: { [key: string]: string }) {
    this._parameterValues = value;
  }
  public resetParameterValues() {
    this._parameterValues = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parameterValuesInput() {
    return this._parameterValues;
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

  // source_configuration_id - computed: false, optional: true, required: false
  private _sourceConfigurationId?: string; 
  public get sourceConfigurationId() {
    return this.getStringAttribute('source_configuration_id');
  }
  public set sourceConfigurationId(value: string) {
    this._sourceConfigurationId = value;
  }
  public resetSourceConfigurationId() {
    this._sourceConfigurationId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceConfigurationIdInput() {
    return this._sourceConfigurationId;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      datastore_engine: cdktf.stringToTerraform(this._datastoreEngine),
      datastore_version: cdktf.stringToTerraform(this._datastoreVersion),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      instance_configuration_id: cdktf.stringToTerraform(this._instanceConfigurationId),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      parameter_values: cdktf.hashMapper(cdktf.stringToTerraform)(this._parameterValues),
      region: cdktf.stringToTerraform(this._region),
      source_configuration_id: cdktf.stringToTerraform(this._sourceConfigurationId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      datastore_engine: {
        value: cdktf.stringToHclTerraform(this._datastoreEngine),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      datastore_version: {
        value: cdktf.stringToHclTerraform(this._datastoreVersion),
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
      instance_configuration_id: {
        value: cdktf.stringToHclTerraform(this._instanceConfigurationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
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
      parameter_values: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._parameterValues),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_configuration_id: {
        value: cdktf.stringToHclTerraform(this._sourceConfigurationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

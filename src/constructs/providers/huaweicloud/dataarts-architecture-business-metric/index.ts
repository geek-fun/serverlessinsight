// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataartsArchitectureBusinessMetricConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the application scenarios.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#apply_scenario DataartsArchitectureBusinessMetric#apply_scenario}
  */
  readonly applyScenario?: string;
  /**
  * Specifies the process architecture ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#biz_catalog_id DataartsArchitectureBusinessMetric#biz_catalog_id}
  */
  readonly bizCatalogId: string;
  /**
  * Specifies the indicator encoding.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#code DataartsArchitectureBusinessMetric#code}
  */
  readonly code?: string;
  /**
  * Specifies the data sources.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#data_origin DataartsArchitectureBusinessMetric#data_origin}
  */
  readonly dataOrigin?: string;
  /**
  * Specifies the indicator definition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#definition DataartsArchitectureBusinessMetric#definition}
  */
  readonly definition: string;
  /**
  * Specifies the description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#description DataartsArchitectureBusinessMetric#description}
  */
  readonly description?: string;
  /**
  * Specifies the purpose of setting.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#destination DataartsArchitectureBusinessMetric#destination}
  */
  readonly destination: string;
  /**
  * Specifies the statistical dimension.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#dimensions DataartsArchitectureBusinessMetric#dimensions}
  */
  readonly dimensions?: string;
  /**
  * Specifies the calculation formula.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#expression DataartsArchitectureBusinessMetric#expression}
  */
  readonly expression: string;
  /**
  * Specifies the statistical caliber and modifiers.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#general_filters DataartsArchitectureBusinessMetric#general_filters}
  */
  readonly generalFilters?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#id DataartsArchitectureBusinessMetric#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the refresh frequency.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#interval_type DataartsArchitectureBusinessMetric#interval_type}
  */
  readonly intervalType: string;
  /**
  * Specifies the measurement object.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#measure DataartsArchitectureBusinessMetric#measure}
  */
  readonly measure?: string;
  /**
  * Specifies the name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#name DataartsArchitectureBusinessMetric#name}
  */
  readonly name: string;
  /**
  * Specifies the indicator alias.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#name_alias DataartsArchitectureBusinessMetric#name_alias}
  */
  readonly nameAlias?: string;
  /**
  * Specifies the name of person responsible for the indicator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#owner DataartsArchitectureBusinessMetric#owner}
  */
  readonly owner: string;
  /**
  * Specifies the indicator management department name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#owner_department DataartsArchitectureBusinessMetric#owner_department}
  */
  readonly ownerDepartment: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#region DataartsArchitectureBusinessMetric#region}
  */
  readonly region?: string;
  /**
  * Specifies the related technical indicators.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#technical_metric DataartsArchitectureBusinessMetric#technical_metric}
  */
  readonly technicalMetric?: number;
  /**
  * Specifies the statistical frequency.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#time_filters DataartsArchitectureBusinessMetric#time_filters}
  */
  readonly timeFilters: string;
  /**
  * Specifies the unit of measurement.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#unit DataartsArchitectureBusinessMetric#unit}
  */
  readonly unit?: string;
  /**
  * Specifies the ID of DataArts Studio workspace.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#workspace_id DataartsArchitectureBusinessMetric#workspace_id}
  */
  readonly workspaceId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric huaweicloud_dataarts_architecture_business_metric}
*/
export class DataartsArchitectureBusinessMetric extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_architecture_business_metric";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataartsArchitectureBusinessMetric resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataartsArchitectureBusinessMetric to import
  * @param importFromId The id of the existing DataartsArchitectureBusinessMetric that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataartsArchitectureBusinessMetric to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_architecture_business_metric", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_business_metric huaweicloud_dataarts_architecture_business_metric} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataartsArchitectureBusinessMetricConfig
  */
  public constructor(scope: Construct, id: string, config: DataartsArchitectureBusinessMetricConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_architecture_business_metric',
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
    this._applyScenario = config.applyScenario;
    this._bizCatalogId = config.bizCatalogId;
    this._code = config.code;
    this._dataOrigin = config.dataOrigin;
    this._definition = config.definition;
    this._description = config.description;
    this._destination = config.destination;
    this._dimensions = config.dimensions;
    this._expression = config.expression;
    this._generalFilters = config.generalFilters;
    this._id = config.id;
    this._intervalType = config.intervalType;
    this._measure = config.measure;
    this._name = config.name;
    this._nameAlias = config.nameAlias;
    this._owner = config.owner;
    this._ownerDepartment = config.ownerDepartment;
    this._region = config.region;
    this._technicalMetric = config.technicalMetric;
    this._timeFilters = config.timeFilters;
    this._unit = config.unit;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // apply_scenario - computed: false, optional: true, required: false
  private _applyScenario?: string; 
  public get applyScenario() {
    return this.getStringAttribute('apply_scenario');
  }
  public set applyScenario(value: string) {
    this._applyScenario = value;
  }
  public resetApplyScenario() {
    this._applyScenario = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get applyScenarioInput() {
    return this._applyScenario;
  }

  // biz_catalog_id - computed: false, optional: false, required: true
  private _bizCatalogId?: string; 
  public get bizCatalogId() {
    return this.getStringAttribute('biz_catalog_id');
  }
  public set bizCatalogId(value: string) {
    this._bizCatalogId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bizCatalogIdInput() {
    return this._bizCatalogId;
  }

  // biz_catalog_path - computed: true, optional: false, required: false
  public get bizCatalogPath() {
    return this.getStringAttribute('biz_catalog_path');
  }

  // biz_metric - computed: true, optional: false, required: false
  public get bizMetric() {
    return this.getStringAttribute('biz_metric');
  }

  // code - computed: true, optional: true, required: false
  private _code?: string; 
  public get code() {
    return this.getStringAttribute('code');
  }
  public set code(value: string) {
    this._code = value;
  }
  public resetCode() {
    this._code = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeInput() {
    return this._code;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // data_origin - computed: false, optional: true, required: false
  private _dataOrigin?: string; 
  public get dataOrigin() {
    return this.getStringAttribute('data_origin');
  }
  public set dataOrigin(value: string) {
    this._dataOrigin = value;
  }
  public resetDataOrigin() {
    this._dataOrigin = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataOriginInput() {
    return this._dataOrigin;
  }

  // definition - computed: false, optional: false, required: true
  private _definition?: string; 
  public get definition() {
    return this.getStringAttribute('definition');
  }
  public set definition(value: string) {
    this._definition = value;
  }
  // Temporarily expose input value. Use with caution.
  public get definitionInput() {
    return this._definition;
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

  // destination - computed: false, optional: false, required: true
  private _destination?: string; 
  public get destination() {
    return this.getStringAttribute('destination');
  }
  public set destination(value: string) {
    this._destination = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationInput() {
    return this._destination;
  }

  // dimensions - computed: false, optional: true, required: false
  private _dimensions?: string; 
  public get dimensions() {
    return this.getStringAttribute('dimensions');
  }
  public set dimensions(value: string) {
    this._dimensions = value;
  }
  public resetDimensions() {
    this._dimensions = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dimensionsInput() {
    return this._dimensions;
  }

  // expression - computed: false, optional: false, required: true
  private _expression?: string; 
  public get expression() {
    return this.getStringAttribute('expression');
  }
  public set expression(value: string) {
    this._expression = value;
  }
  // Temporarily expose input value. Use with caution.
  public get expressionInput() {
    return this._expression;
  }

  // general_filters - computed: false, optional: true, required: false
  private _generalFilters?: string; 
  public get generalFilters() {
    return this.getStringAttribute('general_filters');
  }
  public set generalFilters(value: string) {
    this._generalFilters = value;
  }
  public resetGeneralFilters() {
    this._generalFilters = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get generalFiltersInput() {
    return this._generalFilters;
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

  // interval_type - computed: false, optional: false, required: true
  private _intervalType?: string; 
  public get intervalType() {
    return this.getStringAttribute('interval_type');
  }
  public set intervalType(value: string) {
    this._intervalType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get intervalTypeInput() {
    return this._intervalType;
  }

  // l1 - computed: true, optional: false, required: false
  public get l1() {
    return this.getStringAttribute('l1');
  }

  // l2 - computed: true, optional: false, required: false
  public get l2() {
    return this.getStringAttribute('l2');
  }

  // l3 - computed: true, optional: false, required: false
  public get l3() {
    return this.getStringAttribute('l3');
  }

  // measure - computed: false, optional: true, required: false
  private _measure?: string; 
  public get measure() {
    return this.getStringAttribute('measure');
  }
  public set measure(value: string) {
    this._measure = value;
  }
  public resetMeasure() {
    this._measure = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get measureInput() {
    return this._measure;
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

  // name_alias - computed: false, optional: true, required: false
  private _nameAlias?: string; 
  public get nameAlias() {
    return this.getStringAttribute('name_alias');
  }
  public set nameAlias(value: string) {
    this._nameAlias = value;
  }
  public resetNameAlias() {
    this._nameAlias = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameAliasInput() {
    return this._nameAlias;
  }

  // owner - computed: false, optional: false, required: true
  private _owner?: string; 
  public get owner() {
    return this.getStringAttribute('owner');
  }
  public set owner(value: string) {
    this._owner = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ownerInput() {
    return this._owner;
  }

  // owner_department - computed: false, optional: false, required: true
  private _ownerDepartment?: string; 
  public get ownerDepartment() {
    return this.getStringAttribute('owner_department');
  }
  public set ownerDepartment(value: string) {
    this._ownerDepartment = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ownerDepartmentInput() {
    return this._ownerDepartment;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // summary_status - computed: true, optional: false, required: false
  public get summaryStatus() {
    return this.getStringAttribute('summary_status');
  }

  // technical_metric - computed: false, optional: true, required: false
  private _technicalMetric?: number; 
  public get technicalMetric() {
    return this.getNumberAttribute('technical_metric');
  }
  public set technicalMetric(value: number) {
    this._technicalMetric = value;
  }
  public resetTechnicalMetric() {
    this._technicalMetric = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get technicalMetricInput() {
    return this._technicalMetric;
  }

  // technical_metric_name - computed: true, optional: false, required: false
  public get technicalMetricName() {
    return this.getStringAttribute('technical_metric_name');
  }

  // technical_metric_type - computed: true, optional: false, required: false
  public get technicalMetricType() {
    return this.getStringAttribute('technical_metric_type');
  }

  // time_filters - computed: false, optional: false, required: true
  private _timeFilters?: string; 
  public get timeFilters() {
    return this.getStringAttribute('time_filters');
  }
  public set timeFilters(value: string) {
    this._timeFilters = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeFiltersInput() {
    return this._timeFilters;
  }

  // unit - computed: false, optional: true, required: false
  private _unit?: string; 
  public get unit() {
    return this.getStringAttribute('unit');
  }
  public set unit(value: string) {
    this._unit = value;
  }
  public resetUnit() {
    this._unit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get unitInput() {
    return this._unit;
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
      apply_scenario: cdktf.stringToTerraform(this._applyScenario),
      biz_catalog_id: cdktf.stringToTerraform(this._bizCatalogId),
      code: cdktf.stringToTerraform(this._code),
      data_origin: cdktf.stringToTerraform(this._dataOrigin),
      definition: cdktf.stringToTerraform(this._definition),
      description: cdktf.stringToTerraform(this._description),
      destination: cdktf.stringToTerraform(this._destination),
      dimensions: cdktf.stringToTerraform(this._dimensions),
      expression: cdktf.stringToTerraform(this._expression),
      general_filters: cdktf.stringToTerraform(this._generalFilters),
      id: cdktf.stringToTerraform(this._id),
      interval_type: cdktf.stringToTerraform(this._intervalType),
      measure: cdktf.stringToTerraform(this._measure),
      name: cdktf.stringToTerraform(this._name),
      name_alias: cdktf.stringToTerraform(this._nameAlias),
      owner: cdktf.stringToTerraform(this._owner),
      owner_department: cdktf.stringToTerraform(this._ownerDepartment),
      region: cdktf.stringToTerraform(this._region),
      technical_metric: cdktf.numberToTerraform(this._technicalMetric),
      time_filters: cdktf.stringToTerraform(this._timeFilters),
      unit: cdktf.stringToTerraform(this._unit),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      apply_scenario: {
        value: cdktf.stringToHclTerraform(this._applyScenario),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      biz_catalog_id: {
        value: cdktf.stringToHclTerraform(this._bizCatalogId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      code: {
        value: cdktf.stringToHclTerraform(this._code),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_origin: {
        value: cdktf.stringToHclTerraform(this._dataOrigin),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      definition: {
        value: cdktf.stringToHclTerraform(this._definition),
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
      destination: {
        value: cdktf.stringToHclTerraform(this._destination),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dimensions: {
        value: cdktf.stringToHclTerraform(this._dimensions),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      expression: {
        value: cdktf.stringToHclTerraform(this._expression),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      general_filters: {
        value: cdktf.stringToHclTerraform(this._generalFilters),
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
      interval_type: {
        value: cdktf.stringToHclTerraform(this._intervalType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      measure: {
        value: cdktf.stringToHclTerraform(this._measure),
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
      name_alias: {
        value: cdktf.stringToHclTerraform(this._nameAlias),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      owner: {
        value: cdktf.stringToHclTerraform(this._owner),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      owner_department: {
        value: cdktf.stringToHclTerraform(this._ownerDepartment),
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
      technical_metric: {
        value: cdktf.numberToHclTerraform(this._technicalMetric),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      time_filters: {
        value: cdktf.stringToHclTerraform(this._timeFilters),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      unit: {
        value: cdktf.stringToHclTerraform(this._unit),
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

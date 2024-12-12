// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDataartsArchitectureDsTemplateOptionalsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the name of the optional field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals#fd_name DataHuaweicloudDataartsArchitectureDsTemplateOptionals#fd_name}
  */
  readonly fdName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals#id DataHuaweicloudDataartsArchitectureDsTemplateOptionals#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals#region DataHuaweicloudDataartsArchitectureDsTemplateOptionals#region}
  */
  readonly region?: string;
  /**
  * Specifies whether the field is required.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals#required DataHuaweicloudDataartsArchitectureDsTemplateOptionals#required}
  */
  readonly required?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether the field is search supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals#searchable DataHuaweicloudDataartsArchitectureDsTemplateOptionals#searchable}
  */
  readonly searchable?: boolean | cdktf.IResolvable;
  /**
  * Specifies the workspace ID of DataArts Architecture.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals#workspace_id DataHuaweicloudDataartsArchitectureDsTemplateOptionals#workspace_id}
  */
  readonly workspaceId: string;
}
export interface DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFields {
}

export function dataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFieldsToTerraform(struct?: DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFields): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFieldsToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFields): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFieldsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFields | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFields | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // description_en - computed: true, optional: false, required: false
  public get descriptionEn() {
    return this.getStringAttribute('description_en');
  }

  // fd_name - computed: true, optional: false, required: false
  public get fdName() {
    return this.getStringAttribute('fd_name');
  }

  // required - computed: true, optional: false, required: false
  public get required() {
    return this.getBooleanAttribute('required');
  }

  // searchable - computed: true, optional: false, required: false
  public get searchable() {
    return this.getBooleanAttribute('searchable');
  }
}

export class DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFieldsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFieldsOutputReference {
    return new DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals huaweicloud_dataarts_architecture_ds_template_optionals}
*/
export class DataHuaweicloudDataartsArchitectureDsTemplateOptionals extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_architecture_ds_template_optionals";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDataartsArchitectureDsTemplateOptionals resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDataartsArchitectureDsTemplateOptionals to import
  * @param importFromId The id of the existing DataHuaweicloudDataartsArchitectureDsTemplateOptionals that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDataartsArchitectureDsTemplateOptionals to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_architecture_ds_template_optionals", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_ds_template_optionals huaweicloud_dataarts_architecture_ds_template_optionals} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDataartsArchitectureDsTemplateOptionalsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDataartsArchitectureDsTemplateOptionalsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_architecture_ds_template_optionals',
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
    this._fdName = config.fdName;
    this._id = config.id;
    this._region = config.region;
    this._required = config.required;
    this._searchable = config.searchable;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // fd_name - computed: false, optional: true, required: false
  private _fdName?: string; 
  public get fdName() {
    return this.getStringAttribute('fd_name');
  }
  public set fdName(value: string) {
    this._fdName = value;
  }
  public resetFdName() {
    this._fdName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fdNameInput() {
    return this._fdName;
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

  // optional_fields - computed: true, optional: false, required: false
  private _optionalFields = new DataHuaweicloudDataartsArchitectureDsTemplateOptionalsOptionalFieldsList(this, "optional_fields", false);
  public get optionalFields() {
    return this._optionalFields;
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

  // required - computed: false, optional: true, required: false
  private _required?: boolean | cdktf.IResolvable; 
  public get required() {
    return this.getBooleanAttribute('required');
  }
  public set required(value: boolean | cdktf.IResolvable) {
    this._required = value;
  }
  public resetRequired() {
    this._required = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requiredInput() {
    return this._required;
  }

  // searchable - computed: false, optional: true, required: false
  private _searchable?: boolean | cdktf.IResolvable; 
  public get searchable() {
    return this.getBooleanAttribute('searchable');
  }
  public set searchable(value: boolean | cdktf.IResolvable) {
    this._searchable = value;
  }
  public resetSearchable() {
    this._searchable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get searchableInput() {
    return this._searchable;
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
      fd_name: cdktf.stringToTerraform(this._fdName),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      required: cdktf.booleanToTerraform(this._required),
      searchable: cdktf.booleanToTerraform(this._searchable),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      fd_name: {
        value: cdktf.stringToHclTerraform(this._fdName),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      required: {
        value: cdktf.booleanToHclTerraform(this._required),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      searchable: {
        value: cdktf.booleanToHclTerraform(this._searchable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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

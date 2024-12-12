// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SecmasterDataObjectRelationsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the data class to which the data object belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations#data_class SecmasterDataObjectRelations#data_class}
  */
  readonly dataClass: string;
  /**
  * Specifies the ID of the data object.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations#data_object_id SecmasterDataObjectRelations#data_object_id}
  */
  readonly dataObjectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations#enable_force_new SecmasterDataObjectRelations#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations#id SecmasterDataObjectRelations#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations#region SecmasterDataObjectRelations#region}
  */
  readonly region?: string;
  /**
  * Specifies the data class to which the related data object belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations#related_data_class SecmasterDataObjectRelations#related_data_class}
  */
  readonly relatedDataClass: string;
  /**
  * Specifies the IDs of the data object.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations#related_data_object_ids SecmasterDataObjectRelations#related_data_object_ids}
  */
  readonly relatedDataObjectIds: string[];
  /**
  * Specifies the ID of the workspace to which the data object belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations#workspace_id SecmasterDataObjectRelations#workspace_id}
  */
  readonly workspaceId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations huaweicloud_secmaster_data_object_relations}
*/
export class SecmasterDataObjectRelations extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_data_object_relations";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SecmasterDataObjectRelations resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SecmasterDataObjectRelations to import
  * @param importFromId The id of the existing SecmasterDataObjectRelations that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SecmasterDataObjectRelations to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_data_object_relations", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_data_object_relations huaweicloud_secmaster_data_object_relations} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SecmasterDataObjectRelationsConfig
  */
  public constructor(scope: Construct, id: string, config: SecmasterDataObjectRelationsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_data_object_relations',
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
    this._dataClass = config.dataClass;
    this._dataObjectId = config.dataObjectId;
    this._enableForceNew = config.enableForceNew;
    this._id = config.id;
    this._region = config.region;
    this._relatedDataClass = config.relatedDataClass;
    this._relatedDataObjectIds = config.relatedDataObjectIds;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // data_class - computed: false, optional: false, required: true
  private _dataClass?: string; 
  public get dataClass() {
    return this.getStringAttribute('data_class');
  }
  public set dataClass(value: string) {
    this._dataClass = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataClassInput() {
    return this._dataClass;
  }

  // data_object_id - computed: false, optional: false, required: true
  private _dataObjectId?: string; 
  public get dataObjectId() {
    return this.getStringAttribute('data_object_id');
  }
  public set dataObjectId(value: string) {
    this._dataObjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataObjectIdInput() {
    return this._dataObjectId;
  }

  // enable_force_new - computed: false, optional: true, required: false
  private _enableForceNew?: string; 
  public get enableForceNew() {
    return this.getStringAttribute('enable_force_new');
  }
  public set enableForceNew(value: string) {
    this._enableForceNew = value;
  }
  public resetEnableForceNew() {
    this._enableForceNew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableForceNewInput() {
    return this._enableForceNew;
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

  // related_data_class - computed: false, optional: false, required: true
  private _relatedDataClass?: string; 
  public get relatedDataClass() {
    return this.getStringAttribute('related_data_class');
  }
  public set relatedDataClass(value: string) {
    this._relatedDataClass = value;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedDataClassInput() {
    return this._relatedDataClass;
  }

  // related_data_object_ids - computed: false, optional: false, required: true
  private _relatedDataObjectIds?: string[]; 
  public get relatedDataObjectIds() {
    return cdktf.Fn.tolist(this.getListAttribute('related_data_object_ids'));
  }
  public set relatedDataObjectIds(value: string[]) {
    this._relatedDataObjectIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedDataObjectIdsInput() {
    return this._relatedDataObjectIds;
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
      data_class: cdktf.stringToTerraform(this._dataClass),
      data_object_id: cdktf.stringToTerraform(this._dataObjectId),
      enable_force_new: cdktf.stringToTerraform(this._enableForceNew),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      related_data_class: cdktf.stringToTerraform(this._relatedDataClass),
      related_data_object_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._relatedDataObjectIds),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      data_class: {
        value: cdktf.stringToHclTerraform(this._dataClass),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_object_id: {
        value: cdktf.stringToHclTerraform(this._dataObjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_force_new: {
        value: cdktf.stringToHclTerraform(this._enableForceNew),
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
      related_data_class: {
        value: cdktf.stringToHclTerraform(this._relatedDataClass),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      related_data_object_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._relatedDataObjectIds),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
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

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudRamResourceShareAssociationsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the association type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations#association_type DataHuaweicloudRamResourceShareAssociations#association_type}
  */
  readonly associationType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations#id DataHuaweicloudRamResourceShareAssociations#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the principal associated with the resource share.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations#principal DataHuaweicloudRamResourceShareAssociations#principal}
  */
  readonly principal?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations#region DataHuaweicloudRamResourceShareAssociations#region}
  */
  readonly region?: string;
  /**
  * Specifies the list of resource IDs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations#resource_ids DataHuaweicloudRamResourceShareAssociations#resource_ids}
  */
  readonly resourceIds?: string[];
  /**
  * Specifies the list of resource share IDs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations#resource_share_ids DataHuaweicloudRamResourceShareAssociations#resource_share_ids}
  */
  readonly resourceShareIds?: string[];
  /**
  * Specifies the URN of the resource associated with the resource share.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations#resource_urn DataHuaweicloudRamResourceShareAssociations#resource_urn}
  */
  readonly resourceUrn?: string;
  /**
  * Specifies the status of the association.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations#status DataHuaweicloudRamResourceShareAssociations#status}
  */
  readonly status?: string;
}
export interface DataHuaweicloudRamResourceShareAssociationsAssociations {
}

export function dataHuaweicloudRamResourceShareAssociationsAssociationsToTerraform(struct?: DataHuaweicloudRamResourceShareAssociationsAssociations): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRamResourceShareAssociationsAssociationsToHclTerraform(struct?: DataHuaweicloudRamResourceShareAssociationsAssociations): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRamResourceShareAssociationsAssociationsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRamResourceShareAssociationsAssociations | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRamResourceShareAssociationsAssociations | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // associated_entity - computed: true, optional: false, required: false
  public get associatedEntity() {
    return this.getStringAttribute('associated_entity');
  }

  // association_type - computed: true, optional: false, required: false
  public get associationType() {
    return this.getStringAttribute('association_type');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // external - computed: true, optional: false, required: false
  public get external() {
    return this.getBooleanAttribute('external');
  }

  // resource_share_id - computed: true, optional: false, required: false
  public get resourceShareId() {
    return this.getStringAttribute('resource_share_id');
  }

  // resource_share_name - computed: true, optional: false, required: false
  public get resourceShareName() {
    return this.getStringAttribute('resource_share_name');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // status_message - computed: true, optional: false, required: false
  public get statusMessage() {
    return this.getStringAttribute('status_message');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudRamResourceShareAssociationsAssociationsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRamResourceShareAssociationsAssociationsOutputReference {
    return new DataHuaweicloudRamResourceShareAssociationsAssociationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations huaweicloud_ram_resource_share_associations}
*/
export class DataHuaweicloudRamResourceShareAssociations extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_ram_resource_share_associations";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudRamResourceShareAssociations resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudRamResourceShareAssociations to import
  * @param importFromId The id of the existing DataHuaweicloudRamResourceShareAssociations that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudRamResourceShareAssociations to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_ram_resource_share_associations", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_associations huaweicloud_ram_resource_share_associations} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudRamResourceShareAssociationsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudRamResourceShareAssociationsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_ram_resource_share_associations',
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
    this._associationType = config.associationType;
    this._id = config.id;
    this._principal = config.principal;
    this._region = config.region;
    this._resourceIds = config.resourceIds;
    this._resourceShareIds = config.resourceShareIds;
    this._resourceUrn = config.resourceUrn;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // association_type - computed: false, optional: false, required: true
  private _associationType?: string; 
  public get associationType() {
    return this.getStringAttribute('association_type');
  }
  public set associationType(value: string) {
    this._associationType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get associationTypeInput() {
    return this._associationType;
  }

  // associations - computed: true, optional: false, required: false
  private _associations = new DataHuaweicloudRamResourceShareAssociationsAssociationsList(this, "associations", false);
  public get associations() {
    return this._associations;
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

  // principal - computed: false, optional: true, required: false
  private _principal?: string; 
  public get principal() {
    return this.getStringAttribute('principal');
  }
  public set principal(value: string) {
    this._principal = value;
  }
  public resetPrincipal() {
    this._principal = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get principalInput() {
    return this._principal;
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

  // resource_ids - computed: false, optional: true, required: false
  private _resourceIds?: string[]; 
  public get resourceIds() {
    return this.getListAttribute('resource_ids');
  }
  public set resourceIds(value: string[]) {
    this._resourceIds = value;
  }
  public resetResourceIds() {
    this._resourceIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceIdsInput() {
    return this._resourceIds;
  }

  // resource_share_ids - computed: false, optional: true, required: false
  private _resourceShareIds?: string[]; 
  public get resourceShareIds() {
    return this.getListAttribute('resource_share_ids');
  }
  public set resourceShareIds(value: string[]) {
    this._resourceShareIds = value;
  }
  public resetResourceShareIds() {
    this._resourceShareIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceShareIdsInput() {
    return this._resourceShareIds;
  }

  // resource_urn - computed: false, optional: true, required: false
  private _resourceUrn?: string; 
  public get resourceUrn() {
    return this.getStringAttribute('resource_urn');
  }
  public set resourceUrn(value: string) {
    this._resourceUrn = value;
  }
  public resetResourceUrn() {
    this._resourceUrn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceUrnInput() {
    return this._resourceUrn;
  }

  // status - computed: false, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      association_type: cdktf.stringToTerraform(this._associationType),
      id: cdktf.stringToTerraform(this._id),
      principal: cdktf.stringToTerraform(this._principal),
      region: cdktf.stringToTerraform(this._region),
      resource_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._resourceIds),
      resource_share_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._resourceShareIds),
      resource_urn: cdktf.stringToTerraform(this._resourceUrn),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      association_type: {
        value: cdktf.stringToHclTerraform(this._associationType),
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
      principal: {
        value: cdktf.stringToHclTerraform(this._principal),
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
      resource_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._resourceIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      resource_share_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._resourceShareIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      resource_urn: {
        value: cdktf.stringToHclTerraform(this._resourceUrn),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

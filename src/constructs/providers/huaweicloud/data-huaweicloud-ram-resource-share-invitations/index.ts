// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_invitations
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudRamResourceShareInvitationsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_invitations#id DataHuaweicloudRamResourceShareInvitations#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_invitations#resource_share_ids DataHuaweicloudRamResourceShareInvitations#resource_share_ids}
  */
  readonly resourceShareIds?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_invitations#resource_share_invitation_ids DataHuaweicloudRamResourceShareInvitations#resource_share_invitation_ids}
  */
  readonly resourceShareInvitationIds?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_invitations#status DataHuaweicloudRamResourceShareInvitations#status}
  */
  readonly status?: string;
}
export interface DataHuaweicloudRamResourceShareInvitationsResourceShareInvitations {
}

export function dataHuaweicloudRamResourceShareInvitationsResourceShareInvitationsToTerraform(struct?: DataHuaweicloudRamResourceShareInvitationsResourceShareInvitations): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRamResourceShareInvitationsResourceShareInvitationsToHclTerraform(struct?: DataHuaweicloudRamResourceShareInvitationsResourceShareInvitations): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRamResourceShareInvitationsResourceShareInvitationsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRamResourceShareInvitationsResourceShareInvitations | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRamResourceShareInvitationsResourceShareInvitations | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // receiver_account_id - computed: true, optional: false, required: false
  public get receiverAccountId() {
    return this.getStringAttribute('receiver_account_id');
  }

  // resource_share_id - computed: true, optional: false, required: false
  public get resourceShareId() {
    return this.getStringAttribute('resource_share_id');
  }

  // resource_share_name - computed: true, optional: false, required: false
  public get resourceShareName() {
    return this.getStringAttribute('resource_share_name');
  }

  // sender_account_id - computed: true, optional: false, required: false
  public get senderAccountId() {
    return this.getStringAttribute('sender_account_id');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudRamResourceShareInvitationsResourceShareInvitationsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRamResourceShareInvitationsResourceShareInvitationsOutputReference {
    return new DataHuaweicloudRamResourceShareInvitationsResourceShareInvitationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_invitations huaweicloud_ram_resource_share_invitations}
*/
export class DataHuaweicloudRamResourceShareInvitations extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_ram_resource_share_invitations";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudRamResourceShareInvitations resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudRamResourceShareInvitations to import
  * @param importFromId The id of the existing DataHuaweicloudRamResourceShareInvitations that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_invitations#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudRamResourceShareInvitations to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_ram_resource_share_invitations", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/ram_resource_share_invitations huaweicloud_ram_resource_share_invitations} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudRamResourceShareInvitationsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudRamResourceShareInvitationsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_ram_resource_share_invitations',
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
    this._id = config.id;
    this._resourceShareIds = config.resourceShareIds;
    this._resourceShareInvitationIds = config.resourceShareInvitationIds;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // resource_share_invitation_ids - computed: false, optional: true, required: false
  private _resourceShareInvitationIds?: string[]; 
  public get resourceShareInvitationIds() {
    return this.getListAttribute('resource_share_invitation_ids');
  }
  public set resourceShareInvitationIds(value: string[]) {
    this._resourceShareInvitationIds = value;
  }
  public resetResourceShareInvitationIds() {
    this._resourceShareInvitationIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceShareInvitationIdsInput() {
    return this._resourceShareInvitationIds;
  }

  // resource_share_invitations - computed: true, optional: false, required: false
  private _resourceShareInvitations = new DataHuaweicloudRamResourceShareInvitationsResourceShareInvitationsList(this, "resource_share_invitations", false);
  public get resourceShareInvitations() {
    return this._resourceShareInvitations;
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
      id: cdktf.stringToTerraform(this._id),
      resource_share_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._resourceShareIds),
      resource_share_invitation_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._resourceShareInvitationIds),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      resource_share_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._resourceShareIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      resource_share_invitation_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._resourceShareInvitationIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
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

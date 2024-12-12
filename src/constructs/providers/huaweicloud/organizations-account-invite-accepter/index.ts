// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/organizations_account_invite_accepter
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface OrganizationsAccountInviteAccepterConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/organizations_account_invite_accepter#id OrganizationsAccountInviteAccepter#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the unique ID of an invitation (handshake).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/organizations_account_invite_accepter#invitation_id OrganizationsAccountInviteAccepter#invitation_id}
  */
  readonly invitationId: string;
  /**
  * Specifies whether to leave the organization when delete the invitation (handshake).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/organizations_account_invite_accepter#leave_organization_on_destroy OrganizationsAccountInviteAccepter#leave_organization_on_destroy}
  */
  readonly leaveOrganizationOnDestroy?: boolean | cdktf.IResolvable;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/organizations_account_invite_accepter huaweicloud_organizations_account_invite_accepter}
*/
export class OrganizationsAccountInviteAccepter extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_organizations_account_invite_accepter";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a OrganizationsAccountInviteAccepter resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the OrganizationsAccountInviteAccepter to import
  * @param importFromId The id of the existing OrganizationsAccountInviteAccepter that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/organizations_account_invite_accepter#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the OrganizationsAccountInviteAccepter to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_organizations_account_invite_accepter", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/organizations_account_invite_accepter huaweicloud_organizations_account_invite_accepter} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options OrganizationsAccountInviteAccepterConfig
  */
  public constructor(scope: Construct, id: string, config: OrganizationsAccountInviteAccepterConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_organizations_account_invite_accepter',
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
    this._invitationId = config.invitationId;
    this._leaveOrganizationOnDestroy = config.leaveOrganizationOnDestroy;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // account_id - computed: true, optional: false, required: false
  public get accountId() {
    return this.getStringAttribute('account_id');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // invitation_id - computed: false, optional: false, required: true
  private _invitationId?: string; 
  public get invitationId() {
    return this.getStringAttribute('invitation_id');
  }
  public set invitationId(value: string) {
    this._invitationId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get invitationIdInput() {
    return this._invitationId;
  }

  // leave_organization_on_destroy - computed: false, optional: true, required: false
  private _leaveOrganizationOnDestroy?: boolean | cdktf.IResolvable; 
  public get leaveOrganizationOnDestroy() {
    return this.getBooleanAttribute('leave_organization_on_destroy');
  }
  public set leaveOrganizationOnDestroy(value: boolean | cdktf.IResolvable) {
    this._leaveOrganizationOnDestroy = value;
  }
  public resetLeaveOrganizationOnDestroy() {
    this._leaveOrganizationOnDestroy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get leaveOrganizationOnDestroyInput() {
    return this._leaveOrganizationOnDestroy;
  }

  // master_account_id - computed: true, optional: false, required: false
  public get masterAccountId() {
    return this.getStringAttribute('master_account_id');
  }

  // master_account_name - computed: true, optional: false, required: false
  public get masterAccountName() {
    return this.getStringAttribute('master_account_name');
  }

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // urn - computed: true, optional: false, required: false
  public get urn() {
    return this.getStringAttribute('urn');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      invitation_id: cdktf.stringToTerraform(this._invitationId),
      leave_organization_on_destroy: cdktf.booleanToTerraform(this._leaveOrganizationOnDestroy),
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
      invitation_id: {
        value: cdktf.stringToHclTerraform(this._invitationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      leave_organization_on_destroy: {
        value: cdktf.booleanToHclTerraform(this._leaveOrganizationOnDestroy),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsCrossAccountAccessConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the name of the delegator account to verify the delegation.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#agency_domain_name LtsCrossAccountAccess#agency_domain_name}
  */
  readonly agencyDomainName: string;
  /**
  * Specifies the name of the agency created in IAM by the delegator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#agency_name LtsCrossAccountAccess#agency_name}
  */
  readonly agencyName: string;
  /**
  * Specifies the delegator project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#agency_project_id LtsCrossAccountAccess#agency_project_id}
  */
  readonly agencyProjectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#id LtsCrossAccountAccess#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specify the log group ID that already exists in the delegated account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#log_agencygroup_id LtsCrossAccountAccess#log_agencygroup_id}
  */
  readonly logAgencygroupId: string;
  /**
  * Specify the log group name that already exists in the delegated account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#log_agencygroup_name LtsCrossAccountAccess#log_agencygroup_name}
  */
  readonly logAgencygroupName: string;
  /**
  * Specifies the log stream ID that already exists in the delegated account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#log_agencystream_id LtsCrossAccountAccess#log_agencystream_id}
  */
  readonly logAgencystreamId: string;
  /**
  * Specifies the log stream name that already exists in the delegated account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#log_agencystream_name LtsCrossAccountAccess#log_agencystream_name}
  */
  readonly logAgencystreamName: string;
  /**
  * Specify the log group ID that already exists in the delegatee account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#log_group_id LtsCrossAccountAccess#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Specify the log group name that already exists in the delegatee account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#log_group_name LtsCrossAccountAccess#log_group_name}
  */
  readonly logGroupName: string;
  /**
  * Specifies the log stream ID that already exists in the delegatee account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#log_stream_id LtsCrossAccountAccess#log_stream_id}
  */
  readonly logStreamId: string;
  /**
  * Specifies the log stream name that already exists in the delegatee account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#log_stream_name LtsCrossAccountAccess#log_stream_name}
  */
  readonly logStreamName: string;
  /**
  * Specifies the name of the cross account access.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#name LtsCrossAccountAccess#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#region LtsCrossAccountAccess#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#tags LtsCrossAccountAccess#tags}
  */
  readonly tags?: { [key: string]: string };
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access huaweicloud_lts_cross_account_access}
*/
export class LtsCrossAccountAccess extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_cross_account_access";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsCrossAccountAccess resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsCrossAccountAccess to import
  * @param importFromId The id of the existing LtsCrossAccountAccess that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsCrossAccountAccess to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_cross_account_access", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cross_account_access huaweicloud_lts_cross_account_access} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsCrossAccountAccessConfig
  */
  public constructor(scope: Construct, id: string, config: LtsCrossAccountAccessConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_cross_account_access',
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
    this._agencyDomainName = config.agencyDomainName;
    this._agencyName = config.agencyName;
    this._agencyProjectId = config.agencyProjectId;
    this._id = config.id;
    this._logAgencygroupId = config.logAgencygroupId;
    this._logAgencygroupName = config.logAgencygroupName;
    this._logAgencystreamId = config.logAgencystreamId;
    this._logAgencystreamName = config.logAgencystreamName;
    this._logGroupId = config.logGroupId;
    this._logGroupName = config.logGroupName;
    this._logStreamId = config.logStreamId;
    this._logStreamName = config.logStreamName;
    this._name = config.name;
    this._region = config.region;
    this._tags = config.tags;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_config_type - computed: true, optional: false, required: false
  public get accessConfigType() {
    return this.getStringAttribute('access_config_type');
  }

  // agency_domain_name - computed: false, optional: false, required: true
  private _agencyDomainName?: string; 
  public get agencyDomainName() {
    return this.getStringAttribute('agency_domain_name');
  }
  public set agencyDomainName(value: string) {
    this._agencyDomainName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyDomainNameInput() {
    return this._agencyDomainName;
  }

  // agency_name - computed: false, optional: false, required: true
  private _agencyName?: string; 
  public get agencyName() {
    return this.getStringAttribute('agency_name');
  }
  public set agencyName(value: string) {
    this._agencyName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyNameInput() {
    return this._agencyName;
  }

  // agency_project_id - computed: false, optional: false, required: true
  private _agencyProjectId?: string; 
  public get agencyProjectId() {
    return this.getStringAttribute('agency_project_id');
  }
  public set agencyProjectId(value: string) {
    this._agencyProjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyProjectIdInput() {
    return this._agencyProjectId;
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

  // log_agencygroup_id - computed: false, optional: false, required: true
  private _logAgencygroupId?: string; 
  public get logAgencygroupId() {
    return this.getStringAttribute('log_agencygroup_id');
  }
  public set logAgencygroupId(value: string) {
    this._logAgencygroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logAgencygroupIdInput() {
    return this._logAgencygroupId;
  }

  // log_agencygroup_name - computed: false, optional: false, required: true
  private _logAgencygroupName?: string; 
  public get logAgencygroupName() {
    return this.getStringAttribute('log_agencygroup_name');
  }
  public set logAgencygroupName(value: string) {
    this._logAgencygroupName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logAgencygroupNameInput() {
    return this._logAgencygroupName;
  }

  // log_agencystream_id - computed: false, optional: false, required: true
  private _logAgencystreamId?: string; 
  public get logAgencystreamId() {
    return this.getStringAttribute('log_agencystream_id');
  }
  public set logAgencystreamId(value: string) {
    this._logAgencystreamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logAgencystreamIdInput() {
    return this._logAgencystreamId;
  }

  // log_agencystream_name - computed: false, optional: false, required: true
  private _logAgencystreamName?: string; 
  public get logAgencystreamName() {
    return this.getStringAttribute('log_agencystream_name');
  }
  public set logAgencystreamName(value: string) {
    this._logAgencystreamName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logAgencystreamNameInput() {
    return this._logAgencystreamName;
  }

  // log_group_id - computed: false, optional: false, required: true
  private _logGroupId?: string; 
  public get logGroupId() {
    return this.getStringAttribute('log_group_id');
  }
  public set logGroupId(value: string) {
    this._logGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupIdInput() {
    return this._logGroupId;
  }

  // log_group_name - computed: false, optional: false, required: true
  private _logGroupName?: string; 
  public get logGroupName() {
    return this.getStringAttribute('log_group_name');
  }
  public set logGroupName(value: string) {
    this._logGroupName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupNameInput() {
    return this._logGroupName;
  }

  // log_stream_id - computed: false, optional: false, required: true
  private _logStreamId?: string; 
  public get logStreamId() {
    return this.getStringAttribute('log_stream_id');
  }
  public set logStreamId(value: string) {
    this._logStreamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamIdInput() {
    return this._logStreamId;
  }

  // log_stream_name - computed: false, optional: false, required: true
  private _logStreamName?: string; 
  public get logStreamName() {
    return this.getStringAttribute('log_stream_name');
  }
  public set logStreamName(value: string) {
    this._logStreamName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamNameInput() {
    return this._logStreamName;
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

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      agency_domain_name: cdktf.stringToTerraform(this._agencyDomainName),
      agency_name: cdktf.stringToTerraform(this._agencyName),
      agency_project_id: cdktf.stringToTerraform(this._agencyProjectId),
      id: cdktf.stringToTerraform(this._id),
      log_agencygroup_id: cdktf.stringToTerraform(this._logAgencygroupId),
      log_agencygroup_name: cdktf.stringToTerraform(this._logAgencygroupName),
      log_agencystream_id: cdktf.stringToTerraform(this._logAgencystreamId),
      log_agencystream_name: cdktf.stringToTerraform(this._logAgencystreamName),
      log_group_id: cdktf.stringToTerraform(this._logGroupId),
      log_group_name: cdktf.stringToTerraform(this._logGroupName),
      log_stream_id: cdktf.stringToTerraform(this._logStreamId),
      log_stream_name: cdktf.stringToTerraform(this._logStreamName),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      agency_domain_name: {
        value: cdktf.stringToHclTerraform(this._agencyDomainName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      agency_name: {
        value: cdktf.stringToHclTerraform(this._agencyName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      agency_project_id: {
        value: cdktf.stringToHclTerraform(this._agencyProjectId),
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
      log_agencygroup_id: {
        value: cdktf.stringToHclTerraform(this._logAgencygroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_agencygroup_name: {
        value: cdktf.stringToHclTerraform(this._logAgencygroupName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_agencystream_id: {
        value: cdktf.stringToHclTerraform(this._logAgencystreamId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_agencystream_name: {
        value: cdktf.stringToHclTerraform(this._logAgencystreamName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_group_id: {
        value: cdktf.stringToHclTerraform(this._logGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_group_name: {
        value: cdktf.stringToHclTerraform(this._logGroupName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_stream_id: {
        value: cdktf.stringToHclTerraform(this._logStreamId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_stream_name: {
        value: cdktf.stringToHclTerraform(this._logStreamName),
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

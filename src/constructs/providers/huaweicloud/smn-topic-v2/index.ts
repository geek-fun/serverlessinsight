// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SmnTopicV2Config extends cdktf.TerraformMetaArguments {
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#access_policy SmnTopicV2#access_policy}
  */
  readonly accessPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#display_name SmnTopicV2#display_name}
  */
  readonly displayName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#enterprise_project_id SmnTopicV2#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#id SmnTopicV2#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#introduction SmnTopicV2#introduction}
  */
  readonly introduction?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#name SmnTopicV2#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#region SmnTopicV2#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#services_publish_allowed SmnTopicV2#services_publish_allowed}
  */
  readonly servicesPublishAllowed?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#tags SmnTopicV2#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#users_publish_allowed SmnTopicV2#users_publish_allowed}
  */
  readonly usersPublishAllowed?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2 huaweicloud_smn_topic_v2}
*/
export class SmnTopicV2 extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_smn_topic_v2";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SmnTopicV2 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SmnTopicV2 to import
  * @param importFromId The id of the existing SmnTopicV2 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SmnTopicV2 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_smn_topic_v2", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/smn_topic_v2 huaweicloud_smn_topic_v2} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SmnTopicV2Config
  */
  public constructor(scope: Construct, id: string, config: SmnTopicV2Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_smn_topic_v2',
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
    this._accessPolicy = config.accessPolicy;
    this._displayName = config.displayName;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._introduction = config.introduction;
    this._name = config.name;
    this._region = config.region;
    this._servicesPublishAllowed = config.servicesPublishAllowed;
    this._tags = config.tags;
    this._usersPublishAllowed = config.usersPublishAllowed;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_policy - computed: false, optional: true, required: false
  private _accessPolicy?: string; 
  public get accessPolicy() {
    return this.getStringAttribute('access_policy');
  }
  public set accessPolicy(value: string) {
    this._accessPolicy = value;
  }
  public resetAccessPolicy() {
    this._accessPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessPolicyInput() {
    return this._accessPolicy;
  }

  // create_time - computed: true, optional: false, required: false
  public get createTime() {
    return this.getStringAttribute('create_time');
  }

  // display_name - computed: false, optional: true, required: false
  private _displayName?: string; 
  public get displayName() {
    return this.getStringAttribute('display_name');
  }
  public set displayName(value: string) {
    this._displayName = value;
  }
  public resetDisplayName() {
    this._displayName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get displayNameInput() {
    return this._displayName;
  }

  // enterprise_project_id - computed: true, optional: true, required: false
  private _enterpriseProjectId?: string; 
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }
  public set enterpriseProjectId(value: string) {
    this._enterpriseProjectId = value;
  }
  public resetEnterpriseProjectId() {
    this._enterpriseProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseProjectIdInput() {
    return this._enterpriseProjectId;
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

  // introduction - computed: false, optional: true, required: false
  private _introduction?: string; 
  public get introduction() {
    return this.getStringAttribute('introduction');
  }
  public set introduction(value: string) {
    this._introduction = value;
  }
  public resetIntroduction() {
    this._introduction = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get introductionInput() {
    return this._introduction;
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

  // push_policy - computed: true, optional: false, required: false
  public get pushPolicy() {
    return this.getNumberAttribute('push_policy');
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

  // services_publish_allowed - computed: false, optional: true, required: false
  private _servicesPublishAllowed?: string; 
  public get servicesPublishAllowed() {
    return this.getStringAttribute('services_publish_allowed');
  }
  public set servicesPublishAllowed(value: string) {
    this._servicesPublishAllowed = value;
  }
  public resetServicesPublishAllowed() {
    this._servicesPublishAllowed = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get servicesPublishAllowedInput() {
    return this._servicesPublishAllowed;
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

  // topic_urn - computed: true, optional: false, required: false
  public get topicUrn() {
    return this.getStringAttribute('topic_urn');
  }

  // update_time - computed: true, optional: false, required: false
  public get updateTime() {
    return this.getStringAttribute('update_time');
  }

  // users_publish_allowed - computed: false, optional: true, required: false
  private _usersPublishAllowed?: string; 
  public get usersPublishAllowed() {
    return this.getStringAttribute('users_publish_allowed');
  }
  public set usersPublishAllowed(value: string) {
    this._usersPublishAllowed = value;
  }
  public resetUsersPublishAllowed() {
    this._usersPublishAllowed = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get usersPublishAllowedInput() {
    return this._usersPublishAllowed;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      access_policy: cdktf.stringToTerraform(this._accessPolicy),
      display_name: cdktf.stringToTerraform(this._displayName),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      introduction: cdktf.stringToTerraform(this._introduction),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      services_publish_allowed: cdktf.stringToTerraform(this._servicesPublishAllowed),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      users_publish_allowed: cdktf.stringToTerraform(this._usersPublishAllowed),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_policy: {
        value: cdktf.stringToHclTerraform(this._accessPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      display_name: {
        value: cdktf.stringToHclTerraform(this._displayName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
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
      introduction: {
        value: cdktf.stringToHclTerraform(this._introduction),
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
      services_publish_allowed: {
        value: cdktf.stringToHclTerraform(this._servicesPublishAllowed),
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
      users_publish_allowed: {
        value: cdktf.stringToHclTerraform(this._usersPublishAllowed),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

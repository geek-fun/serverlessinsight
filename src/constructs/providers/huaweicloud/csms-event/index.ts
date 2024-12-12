// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CsmsEventConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the event list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event#event_types CsmsEvent#event_types}
  */
  readonly eventTypes: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event#id CsmsEvent#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the name of CSMS event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event#name CsmsEvent#name}
  */
  readonly name: string;
  /**
  * Specifies the notification target ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event#notification_target_id CsmsEvent#notification_target_id}
  */
  readonly notificationTargetId: string;
  /**
  * Specifies the notification target name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event#notification_target_name CsmsEvent#notification_target_name}
  */
  readonly notificationTargetName: string;
  /**
  * Specifies the notification target type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event#notification_target_type CsmsEvent#notification_target_type}
  */
  readonly notificationTargetType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event#region CsmsEvent#region}
  */
  readonly region?: string;
  /**
  * Specifies the event status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event#status CsmsEvent#status}
  */
  readonly status: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event huaweicloud_csms_event}
*/
export class CsmsEvent extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_csms_event";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CsmsEvent resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CsmsEvent to import
  * @param importFromId The id of the existing CsmsEvent that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CsmsEvent to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_csms_event", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/csms_event huaweicloud_csms_event} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CsmsEventConfig
  */
  public constructor(scope: Construct, id: string, config: CsmsEventConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_csms_event',
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
    this._eventTypes = config.eventTypes;
    this._id = config.id;
    this._name = config.name;
    this._notificationTargetId = config.notificationTargetId;
    this._notificationTargetName = config.notificationTargetName;
    this._notificationTargetType = config.notificationTargetType;
    this._region = config.region;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // event_id - computed: true, optional: false, required: false
  public get eventId() {
    return this.getStringAttribute('event_id');
  }

  // event_types - computed: false, optional: false, required: true
  private _eventTypes?: string[]; 
  public get eventTypes() {
    return this.getListAttribute('event_types');
  }
  public set eventTypes(value: string[]) {
    this._eventTypes = value;
  }
  // Temporarily expose input value. Use with caution.
  public get eventTypesInput() {
    return this._eventTypes;
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

  // notification_target_id - computed: false, optional: false, required: true
  private _notificationTargetId?: string; 
  public get notificationTargetId() {
    return this.getStringAttribute('notification_target_id');
  }
  public set notificationTargetId(value: string) {
    this._notificationTargetId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationTargetIdInput() {
    return this._notificationTargetId;
  }

  // notification_target_name - computed: false, optional: false, required: true
  private _notificationTargetName?: string; 
  public get notificationTargetName() {
    return this.getStringAttribute('notification_target_name');
  }
  public set notificationTargetName(value: string) {
    this._notificationTargetName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationTargetNameInput() {
    return this._notificationTargetName;
  }

  // notification_target_type - computed: false, optional: false, required: true
  private _notificationTargetType?: string; 
  public get notificationTargetType() {
    return this.getStringAttribute('notification_target_type');
  }
  public set notificationTargetType(value: string) {
    this._notificationTargetType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationTargetTypeInput() {
    return this._notificationTargetType;
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

  // status - computed: false, optional: false, required: true
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
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
      event_types: cdktf.listMapper(cdktf.stringToTerraform, false)(this._eventTypes),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      notification_target_id: cdktf.stringToTerraform(this._notificationTargetId),
      notification_target_name: cdktf.stringToTerraform(this._notificationTargetName),
      notification_target_type: cdktf.stringToTerraform(this._notificationTargetType),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      event_types: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._eventTypes),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
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
      notification_target_id: {
        value: cdktf.stringToHclTerraform(this._notificationTargetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      notification_target_name: {
        value: cdktf.stringToHclTerraform(this._notificationTargetName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      notification_target_type: {
        value: cdktf.stringToHclTerraform(this._notificationTargetType),
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

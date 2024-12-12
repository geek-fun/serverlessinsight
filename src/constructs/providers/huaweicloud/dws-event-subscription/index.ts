// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DwsEventSubscriptionConfig extends cdktf.TerraformMetaArguments {
  /**
  * The category of source event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#category DwsEventSubscription#category}
  */
  readonly category?: string;
  /**
  * whether the event subscription is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#enable DwsEventSubscription#enable}
  */
  readonly enable: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#id DwsEventSubscription#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the event subscription.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#name DwsEventSubscription#name}
  */
  readonly name: string;
  /**
  * The notification target.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#notification_target DwsEventSubscription#notification_target}
  */
  readonly notificationTarget: string;
  /**
  * The name of notification target.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#notification_target_name DwsEventSubscription#notification_target_name}
  */
  readonly notificationTargetName: string;
  /**
  * The type of notification target. Currently only **SMN** is supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#notification_target_type DwsEventSubscription#notification_target_type}
  */
  readonly notificationTargetType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#region DwsEventSubscription#region}
  */
  readonly region?: string;
  /**
  * The severity of source event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#severity DwsEventSubscription#severity}
  */
  readonly severity?: string;
  /**
  * ID of source event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#source_id DwsEventSubscription#source_id}
  */
  readonly sourceId?: string;
  /**
  * The type of source event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#source_type DwsEventSubscription#source_type}
  */
  readonly sourceType?: string;
  /**
  * The time_zone of the event subscription.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#time_zone DwsEventSubscription#time_zone}
  */
  readonly timeZone?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription huaweicloud_dws_event_subscription}
*/
export class DwsEventSubscription extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dws_event_subscription";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DwsEventSubscription resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DwsEventSubscription to import
  * @param importFromId The id of the existing DwsEventSubscription that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DwsEventSubscription to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dws_event_subscription", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_event_subscription huaweicloud_dws_event_subscription} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DwsEventSubscriptionConfig
  */
  public constructor(scope: Construct, id: string, config: DwsEventSubscriptionConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dws_event_subscription',
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
    this._category = config.category;
    this._enable = config.enable;
    this._id = config.id;
    this._name = config.name;
    this._notificationTarget = config.notificationTarget;
    this._notificationTargetName = config.notificationTargetName;
    this._notificationTargetType = config.notificationTargetType;
    this._region = config.region;
    this._severity = config.severity;
    this._sourceId = config.sourceId;
    this._sourceType = config.sourceType;
    this._timeZone = config.timeZone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // category - computed: true, optional: true, required: false
  private _category?: string; 
  public get category() {
    return this.getStringAttribute('category');
  }
  public set category(value: string) {
    this._category = value;
  }
  public resetCategory() {
    this._category = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get categoryInput() {
    return this._category;
  }

  // enable - computed: false, optional: false, required: true
  private _enable?: string; 
  public get enable() {
    return this.getStringAttribute('enable');
  }
  public set enable(value: string) {
    this._enable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enableInput() {
    return this._enable;
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

  // notification_target - computed: false, optional: false, required: true
  private _notificationTarget?: string; 
  public get notificationTarget() {
    return this.getStringAttribute('notification_target');
  }
  public set notificationTarget(value: string) {
    this._notificationTarget = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationTargetInput() {
    return this._notificationTarget;
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

  // severity - computed: true, optional: true, required: false
  private _severity?: string; 
  public get severity() {
    return this.getStringAttribute('severity');
  }
  public set severity(value: string) {
    this._severity = value;
  }
  public resetSeverity() {
    this._severity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get severityInput() {
    return this._severity;
  }

  // source_id - computed: true, optional: true, required: false
  private _sourceId?: string; 
  public get sourceId() {
    return this.getStringAttribute('source_id');
  }
  public set sourceId(value: string) {
    this._sourceId = value;
  }
  public resetSourceId() {
    this._sourceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceIdInput() {
    return this._sourceId;
  }

  // source_type - computed: true, optional: true, required: false
  private _sourceType?: string; 
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }
  public set sourceType(value: string) {
    this._sourceType = value;
  }
  public resetSourceType() {
    this._sourceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTypeInput() {
    return this._sourceType;
  }

  // time_zone - computed: true, optional: true, required: false
  private _timeZone?: string; 
  public get timeZone() {
    return this.getStringAttribute('time_zone');
  }
  public set timeZone(value: string) {
    this._timeZone = value;
  }
  public resetTimeZone() {
    this._timeZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeZoneInput() {
    return this._timeZone;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      category: cdktf.stringToTerraform(this._category),
      enable: cdktf.stringToTerraform(this._enable),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      notification_target: cdktf.stringToTerraform(this._notificationTarget),
      notification_target_name: cdktf.stringToTerraform(this._notificationTargetName),
      notification_target_type: cdktf.stringToTerraform(this._notificationTargetType),
      region: cdktf.stringToTerraform(this._region),
      severity: cdktf.stringToTerraform(this._severity),
      source_id: cdktf.stringToTerraform(this._sourceId),
      source_type: cdktf.stringToTerraform(this._sourceType),
      time_zone: cdktf.stringToTerraform(this._timeZone),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      category: {
        value: cdktf.stringToHclTerraform(this._category),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable: {
        value: cdktf.stringToHclTerraform(this._enable),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      notification_target: {
        value: cdktf.stringToHclTerraform(this._notificationTarget),
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
      severity: {
        value: cdktf.stringToHclTerraform(this._severity),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_id: {
        value: cdktf.stringToHclTerraform(this._sourceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_type: {
        value: cdktf.stringToHclTerraform(this._sourceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      time_zone: {
        value: cdktf.stringToHclTerraform(this._timeZone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

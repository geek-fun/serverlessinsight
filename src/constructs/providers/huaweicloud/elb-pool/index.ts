// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ElbPoolConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#any_port_enable ElbPool#any_port_enable}
  */
  readonly anyPortEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#connection_drain_enabled ElbPool#connection_drain_enabled}
  */
  readonly connectionDrainEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#connection_drain_timeout ElbPool#connection_drain_timeout}
  */
  readonly connectionDrainTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#deletion_protection_enable ElbPool#deletion_protection_enable}
  */
  readonly deletionProtectionEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#description ElbPool#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#id ElbPool#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#ip_version ElbPool#ip_version}
  */
  readonly ipVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#lb_method ElbPool#lb_method}
  */
  readonly lbMethod: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#listener_id ElbPool#listener_id}
  */
  readonly listenerId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#loadbalancer_id ElbPool#loadbalancer_id}
  */
  readonly loadbalancerId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#minimum_healthy_member_count ElbPool#minimum_healthy_member_count}
  */
  readonly minimumHealthyMemberCount?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#name ElbPool#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#protection_reason ElbPool#protection_reason}
  */
  readonly protectionReason?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#protection_status ElbPool#protection_status}
  */
  readonly protectionStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#protocol ElbPool#protocol}
  */
  readonly protocol: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#region ElbPool#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#slow_start_duration ElbPool#slow_start_duration}
  */
  readonly slowStartDuration?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#slow_start_enabled ElbPool#slow_start_enabled}
  */
  readonly slowStartEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#type ElbPool#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#vpc_id ElbPool#vpc_id}
  */
  readonly vpcId?: string;
  /**
  * persistence block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#persistence ElbPool#persistence}
  */
  readonly persistence?: ElbPoolPersistence;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#timeouts ElbPool#timeouts}
  */
  readonly timeouts?: ElbPoolTimeouts;
}
export interface ElbPoolPersistence {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#cookie_name ElbPool#cookie_name}
  */
  readonly cookieName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#timeout ElbPool#timeout}
  */
  readonly timeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#type ElbPool#type}
  */
  readonly type: string;
}

export function elbPoolPersistenceToTerraform(struct?: ElbPoolPersistenceOutputReference | ElbPoolPersistence): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cookie_name: cdktf.stringToTerraform(struct!.cookieName),
    timeout: cdktf.numberToTerraform(struct!.timeout),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function elbPoolPersistenceToHclTerraform(struct?: ElbPoolPersistenceOutputReference | ElbPoolPersistence): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cookie_name: {
      value: cdktf.stringToHclTerraform(struct!.cookieName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    timeout: {
      value: cdktf.numberToHclTerraform(struct!.timeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbPoolPersistenceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbPoolPersistence | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cookieName !== undefined) {
      hasAnyValues = true;
      internalValueResult.cookieName = this._cookieName;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbPoolPersistence | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._cookieName = undefined;
      this._timeout = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._cookieName = value.cookieName;
      this._timeout = value.timeout;
      this._type = value.type;
    }
  }

  // cookie_name - computed: false, optional: true, required: false
  private _cookieName?: string; 
  public get cookieName() {
    return this.getStringAttribute('cookie_name');
  }
  public set cookieName(value: string) {
    this._cookieName = value;
  }
  public resetCookieName() {
    this._cookieName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cookieNameInput() {
    return this._cookieName;
  }

  // timeout - computed: true, optional: true, required: false
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  public resetTimeout() {
    this._timeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface ElbPoolTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#create ElbPool#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#delete ElbPool#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#update ElbPool#update}
  */
  readonly update?: string;
}

export function elbPoolTimeoutsToTerraform(struct?: ElbPoolTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function elbPoolTimeoutsToHclTerraform(struct?: ElbPoolTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbPoolTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): ElbPoolTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbPoolTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool huaweicloud_elb_pool}
*/
export class ElbPool extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_elb_pool";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ElbPool resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ElbPool to import
  * @param importFromId The id of the existing ElbPool that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ElbPool to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_elb_pool", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_pool huaweicloud_elb_pool} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ElbPoolConfig
  */
  public constructor(scope: Construct, id: string, config: ElbPoolConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_elb_pool',
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
    this._anyPortEnable = config.anyPortEnable;
    this._connectionDrainEnabled = config.connectionDrainEnabled;
    this._connectionDrainTimeout = config.connectionDrainTimeout;
    this._deletionProtectionEnable = config.deletionProtectionEnable;
    this._description = config.description;
    this._id = config.id;
    this._ipVersion = config.ipVersion;
    this._lbMethod = config.lbMethod;
    this._listenerId = config.listenerId;
    this._loadbalancerId = config.loadbalancerId;
    this._minimumHealthyMemberCount = config.minimumHealthyMemberCount;
    this._name = config.name;
    this._protectionReason = config.protectionReason;
    this._protectionStatus = config.protectionStatus;
    this._protocol = config.protocol;
    this._region = config.region;
    this._slowStartDuration = config.slowStartDuration;
    this._slowStartEnabled = config.slowStartEnabled;
    this._type = config.type;
    this._vpcId = config.vpcId;
    this._persistence.internalValue = config.persistence;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // any_port_enable - computed: true, optional: true, required: false
  private _anyPortEnable?: boolean | cdktf.IResolvable; 
  public get anyPortEnable() {
    return this.getBooleanAttribute('any_port_enable');
  }
  public set anyPortEnable(value: boolean | cdktf.IResolvable) {
    this._anyPortEnable = value;
  }
  public resetAnyPortEnable() {
    this._anyPortEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get anyPortEnableInput() {
    return this._anyPortEnable;
  }

  // connection_drain_enabled - computed: true, optional: true, required: false
  private _connectionDrainEnabled?: boolean | cdktf.IResolvable; 
  public get connectionDrainEnabled() {
    return this.getBooleanAttribute('connection_drain_enabled');
  }
  public set connectionDrainEnabled(value: boolean | cdktf.IResolvable) {
    this._connectionDrainEnabled = value;
  }
  public resetConnectionDrainEnabled() {
    this._connectionDrainEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get connectionDrainEnabledInput() {
    return this._connectionDrainEnabled;
  }

  // connection_drain_timeout - computed: true, optional: true, required: false
  private _connectionDrainTimeout?: number; 
  public get connectionDrainTimeout() {
    return this.getNumberAttribute('connection_drain_timeout');
  }
  public set connectionDrainTimeout(value: number) {
    this._connectionDrainTimeout = value;
  }
  public resetConnectionDrainTimeout() {
    this._connectionDrainTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get connectionDrainTimeoutInput() {
    return this._connectionDrainTimeout;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // deletion_protection_enable - computed: false, optional: true, required: false
  private _deletionProtectionEnable?: boolean | cdktf.IResolvable; 
  public get deletionProtectionEnable() {
    return this.getBooleanAttribute('deletion_protection_enable');
  }
  public set deletionProtectionEnable(value: boolean | cdktf.IResolvable) {
    this._deletionProtectionEnable = value;
  }
  public resetDeletionProtectionEnable() {
    this._deletionProtectionEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deletionProtectionEnableInput() {
    return this._deletionProtectionEnable;
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

  // ip_version - computed: true, optional: true, required: false
  private _ipVersion?: string; 
  public get ipVersion() {
    return this.getStringAttribute('ip_version');
  }
  public set ipVersion(value: string) {
    this._ipVersion = value;
  }
  public resetIpVersion() {
    this._ipVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipVersionInput() {
    return this._ipVersion;
  }

  // lb_method - computed: false, optional: false, required: true
  private _lbMethod?: string; 
  public get lbMethod() {
    return this.getStringAttribute('lb_method');
  }
  public set lbMethod(value: string) {
    this._lbMethod = value;
  }
  // Temporarily expose input value. Use with caution.
  public get lbMethodInput() {
    return this._lbMethod;
  }

  // listener_id - computed: true, optional: true, required: false
  private _listenerId?: string; 
  public get listenerId() {
    return this.getStringAttribute('listener_id');
  }
  public set listenerId(value: string) {
    this._listenerId = value;
  }
  public resetListenerId() {
    this._listenerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get listenerIdInput() {
    return this._listenerId;
  }

  // loadbalancer_id - computed: true, optional: true, required: false
  private _loadbalancerId?: string; 
  public get loadbalancerId() {
    return this.getStringAttribute('loadbalancer_id');
  }
  public set loadbalancerId(value: string) {
    this._loadbalancerId = value;
  }
  public resetLoadbalancerId() {
    this._loadbalancerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loadbalancerIdInput() {
    return this._loadbalancerId;
  }

  // minimum_healthy_member_count - computed: true, optional: true, required: false
  private _minimumHealthyMemberCount?: number; 
  public get minimumHealthyMemberCount() {
    return this.getNumberAttribute('minimum_healthy_member_count');
  }
  public set minimumHealthyMemberCount(value: number) {
    this._minimumHealthyMemberCount = value;
  }
  public resetMinimumHealthyMemberCount() {
    this._minimumHealthyMemberCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minimumHealthyMemberCountInput() {
    return this._minimumHealthyMemberCount;
  }

  // monitor_id - computed: true, optional: false, required: false
  public get monitorId() {
    return this.getStringAttribute('monitor_id');
  }

  // name - computed: false, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // protection_reason - computed: false, optional: true, required: false
  private _protectionReason?: string; 
  public get protectionReason() {
    return this.getStringAttribute('protection_reason');
  }
  public set protectionReason(value: string) {
    this._protectionReason = value;
  }
  public resetProtectionReason() {
    this._protectionReason = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protectionReasonInput() {
    return this._protectionReason;
  }

  // protection_status - computed: true, optional: true, required: false
  private _protectionStatus?: string; 
  public get protectionStatus() {
    return this.getStringAttribute('protection_status');
  }
  public set protectionStatus(value: string) {
    this._protectionStatus = value;
  }
  public resetProtectionStatus() {
    this._protectionStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protectionStatusInput() {
    return this._protectionStatus;
  }

  // protocol - computed: false, optional: false, required: true
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
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

  // slow_start_duration - computed: true, optional: true, required: false
  private _slowStartDuration?: number; 
  public get slowStartDuration() {
    return this.getNumberAttribute('slow_start_duration');
  }
  public set slowStartDuration(value: number) {
    this._slowStartDuration = value;
  }
  public resetSlowStartDuration() {
    this._slowStartDuration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get slowStartDurationInput() {
    return this._slowStartDuration;
  }

  // slow_start_enabled - computed: true, optional: true, required: false
  private _slowStartEnabled?: boolean | cdktf.IResolvable; 
  public get slowStartEnabled() {
    return this.getBooleanAttribute('slow_start_enabled');
  }
  public set slowStartEnabled(value: boolean | cdktf.IResolvable) {
    this._slowStartEnabled = value;
  }
  public resetSlowStartEnabled() {
    this._slowStartEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get slowStartEnabledInput() {
    return this._slowStartEnabled;
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // vpc_id - computed: true, optional: true, required: false
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  public resetVpcId() {
    this._vpcId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // persistence - computed: false, optional: true, required: false
  private _persistence = new ElbPoolPersistenceOutputReference(this, "persistence");
  public get persistence() {
    return this._persistence;
  }
  public putPersistence(value: ElbPoolPersistence) {
    this._persistence.internalValue = value;
  }
  public resetPersistence() {
    this._persistence.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get persistenceInput() {
    return this._persistence.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new ElbPoolTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: ElbPoolTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      any_port_enable: cdktf.booleanToTerraform(this._anyPortEnable),
      connection_drain_enabled: cdktf.booleanToTerraform(this._connectionDrainEnabled),
      connection_drain_timeout: cdktf.numberToTerraform(this._connectionDrainTimeout),
      deletion_protection_enable: cdktf.booleanToTerraform(this._deletionProtectionEnable),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      ip_version: cdktf.stringToTerraform(this._ipVersion),
      lb_method: cdktf.stringToTerraform(this._lbMethod),
      listener_id: cdktf.stringToTerraform(this._listenerId),
      loadbalancer_id: cdktf.stringToTerraform(this._loadbalancerId),
      minimum_healthy_member_count: cdktf.numberToTerraform(this._minimumHealthyMemberCount),
      name: cdktf.stringToTerraform(this._name),
      protection_reason: cdktf.stringToTerraform(this._protectionReason),
      protection_status: cdktf.stringToTerraform(this._protectionStatus),
      protocol: cdktf.stringToTerraform(this._protocol),
      region: cdktf.stringToTerraform(this._region),
      slow_start_duration: cdktf.numberToTerraform(this._slowStartDuration),
      slow_start_enabled: cdktf.booleanToTerraform(this._slowStartEnabled),
      type: cdktf.stringToTerraform(this._type),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      persistence: elbPoolPersistenceToTerraform(this._persistence.internalValue),
      timeouts: elbPoolTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      any_port_enable: {
        value: cdktf.booleanToHclTerraform(this._anyPortEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      connection_drain_enabled: {
        value: cdktf.booleanToHclTerraform(this._connectionDrainEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      connection_drain_timeout: {
        value: cdktf.numberToHclTerraform(this._connectionDrainTimeout),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      deletion_protection_enable: {
        value: cdktf.booleanToHclTerraform(this._deletionProtectionEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
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
      ip_version: {
        value: cdktf.stringToHclTerraform(this._ipVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lb_method: {
        value: cdktf.stringToHclTerraform(this._lbMethod),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      listener_id: {
        value: cdktf.stringToHclTerraform(this._listenerId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      loadbalancer_id: {
        value: cdktf.stringToHclTerraform(this._loadbalancerId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      minimum_healthy_member_count: {
        value: cdktf.numberToHclTerraform(this._minimumHealthyMemberCount),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protection_reason: {
        value: cdktf.stringToHclTerraform(this._protectionReason),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protection_status: {
        value: cdktf.stringToHclTerraform(this._protectionStatus),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protocol: {
        value: cdktf.stringToHclTerraform(this._protocol),
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
      slow_start_duration: {
        value: cdktf.numberToHclTerraform(this._slowStartDuration),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      slow_start_enabled: {
        value: cdktf.booleanToHclTerraform(this._slowStartEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      persistence: {
        value: elbPoolPersistenceToHclTerraform(this._persistence.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ElbPoolPersistenceList",
      },
      timeouts: {
        value: elbPoolTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "ElbPoolTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

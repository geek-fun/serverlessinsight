// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceTerminalBindingConfig extends cdktf.TerraformMetaArguments {
  /**
  * Whether disabled the binding function before destroy resource.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding#disabled_after_delete WorkspaceTerminalBinding#disabled_after_delete}
  */
  readonly disabledAfterDelete?: boolean | cdktf.IResolvable;
  /**
  * Whether bindings are available.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding#enabled WorkspaceTerminalBinding#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding#id WorkspaceTerminalBinding#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The region where the desktops (to be bound to the MAC address) are located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding#region WorkspaceTerminalBinding#region}
  */
  readonly region?: string;
  /**
  * bindings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding#bindings WorkspaceTerminalBinding#bindings}
  */
  readonly bindings: WorkspaceTerminalBindingBindings[] | cdktf.IResolvable;
}
export interface WorkspaceTerminalBindingBindings {
  /**
  * The binding description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding#description WorkspaceTerminalBinding#description}
  */
  readonly description?: string;
  /**
  * The desktop name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding#desktop_name WorkspaceTerminalBinding#desktop_name}
  */
  readonly desktopName: string;
  /**
  * The MAC address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding#mac WorkspaceTerminalBinding#mac}
  */
  readonly mac: string;
}

export function workspaceTerminalBindingBindingsToTerraform(struct?: WorkspaceTerminalBindingBindings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    desktop_name: cdktf.stringToTerraform(struct!.desktopName),
    mac: cdktf.stringToTerraform(struct!.mac),
  }
}


export function workspaceTerminalBindingBindingsToHclTerraform(struct?: WorkspaceTerminalBindingBindings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    desktop_name: {
      value: cdktf.stringToHclTerraform(struct!.desktopName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mac: {
      value: cdktf.stringToHclTerraform(struct!.mac),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceTerminalBindingBindingsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): WorkspaceTerminalBindingBindings | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._desktopName !== undefined) {
      hasAnyValues = true;
      internalValueResult.desktopName = this._desktopName;
    }
    if (this._mac !== undefined) {
      hasAnyValues = true;
      internalValueResult.mac = this._mac;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceTerminalBindingBindings | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._desktopName = undefined;
      this._mac = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._desktopName = value.desktopName;
      this._mac = value.mac;
    }
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

  // desktop_name - computed: false, optional: false, required: true
  private _desktopName?: string; 
  public get desktopName() {
    return this.getStringAttribute('desktop_name');
  }
  public set desktopName(value: string) {
    this._desktopName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get desktopNameInput() {
    return this._desktopName;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // mac - computed: false, optional: false, required: true
  private _mac?: string; 
  public get mac() {
    return this.getStringAttribute('mac');
  }
  public set mac(value: string) {
    this._mac = value;
  }
  // Temporarily expose input value. Use with caution.
  public get macInput() {
    return this._mac;
  }
}

export class WorkspaceTerminalBindingBindingsList extends cdktf.ComplexList {
  public internalValue? : WorkspaceTerminalBindingBindings[] | cdktf.IResolvable

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
  public get(index: number): WorkspaceTerminalBindingBindingsOutputReference {
    return new WorkspaceTerminalBindingBindingsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding huaweicloud_workspace_terminal_binding}
*/
export class WorkspaceTerminalBinding extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_terminal_binding";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceTerminalBinding resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceTerminalBinding to import
  * @param importFromId The id of the existing WorkspaceTerminalBinding that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceTerminalBinding to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_terminal_binding", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_terminal_binding huaweicloud_workspace_terminal_binding} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceTerminalBindingConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceTerminalBindingConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_terminal_binding',
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
    this._disabledAfterDelete = config.disabledAfterDelete;
    this._enabled = config.enabled;
    this._id = config.id;
    this._region = config.region;
    this._bindings.internalValue = config.bindings;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // disabled_after_delete - computed: false, optional: true, required: false
  private _disabledAfterDelete?: boolean | cdktf.IResolvable; 
  public get disabledAfterDelete() {
    return this.getBooleanAttribute('disabled_after_delete');
  }
  public set disabledAfterDelete(value: boolean | cdktf.IResolvable) {
    this._disabledAfterDelete = value;
  }
  public resetDisabledAfterDelete() {
    this._disabledAfterDelete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disabledAfterDeleteInput() {
    return this._disabledAfterDelete;
  }

  // enabled - computed: true, optional: true, required: false
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  public resetEnabled() {
    this._enabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
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

  // bindings - computed: false, optional: false, required: true
  private _bindings = new WorkspaceTerminalBindingBindingsList(this, "bindings", true);
  public get bindings() {
    return this._bindings;
  }
  public putBindings(value: WorkspaceTerminalBindingBindings[] | cdktf.IResolvable) {
    this._bindings.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bindingsInput() {
    return this._bindings.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      disabled_after_delete: cdktf.booleanToTerraform(this._disabledAfterDelete),
      enabled: cdktf.booleanToTerraform(this._enabled),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      bindings: cdktf.listMapper(workspaceTerminalBindingBindingsToTerraform, true)(this._bindings.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      disabled_after_delete: {
        value: cdktf.booleanToHclTerraform(this._disabledAfterDelete),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enabled: {
        value: cdktf.booleanToHclTerraform(this._enabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      bindings: {
        value: cdktf.listMapperHcl(workspaceTerminalBindingBindingsToHclTerraform, true)(this._bindings.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "WorkspaceTerminalBindingBindingsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DscInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Whether auto renew is enabled. Valid values are "true" and "false".
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#auto_renew DscInstance#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * Billing mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#charging_mode DscInstance#charging_mode}
  */
  readonly chargingMode: string;
  /**
  * Purchase database expansion packages. One expansion package offers one database.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#database_expansion_package DscInstance#database_expansion_package}
  */
  readonly databaseExpansionPackage?: number;
  /**
  * The edition of DSC.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#edition DscInstance#edition}
  */
  readonly edition: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#id DscInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Purchase OBS expansion packages. One OBS expansion package offers 1 TB of OBS storage.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#obs_expansion_package DscInstance#obs_expansion_package}
  */
  readonly obsExpansionPackage?: number;
  /**
  * The charging period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#period DscInstance#period}
  */
  readonly period: number;
  /**
  * The charging period unit.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#period_unit DscInstance#period_unit}
  */
  readonly periodUnit: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#region DscInstance#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance huaweicloud_dsc_instance}
*/
export class DscInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dsc_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DscInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DscInstance to import
  * @param importFromId The id of the existing DscInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DscInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dsc_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dsc_instance huaweicloud_dsc_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DscInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: DscInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dsc_instance',
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
    this._autoRenew = config.autoRenew;
    this._chargingMode = config.chargingMode;
    this._databaseExpansionPackage = config.databaseExpansionPackage;
    this._edition = config.edition;
    this._id = config.id;
    this._obsExpansionPackage = config.obsExpansionPackage;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auto_renew - computed: false, optional: true, required: false
  private _autoRenew?: string; 
  public get autoRenew() {
    return this.getStringAttribute('auto_renew');
  }
  public set autoRenew(value: string) {
    this._autoRenew = value;
  }
  public resetAutoRenew() {
    this._autoRenew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoRenewInput() {
    return this._autoRenew;
  }

  // charging_mode - computed: false, optional: false, required: true
  private _chargingMode?: string; 
  public get chargingMode() {
    return this.getStringAttribute('charging_mode');
  }
  public set chargingMode(value: string) {
    this._chargingMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get chargingModeInput() {
    return this._chargingMode;
  }

  // database_expansion_package - computed: true, optional: true, required: false
  private _databaseExpansionPackage?: number; 
  public get databaseExpansionPackage() {
    return this.getNumberAttribute('database_expansion_package');
  }
  public set databaseExpansionPackage(value: number) {
    this._databaseExpansionPackage = value;
  }
  public resetDatabaseExpansionPackage() {
    this._databaseExpansionPackage = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get databaseExpansionPackageInput() {
    return this._databaseExpansionPackage;
  }

  // edition - computed: false, optional: false, required: true
  private _edition?: string; 
  public get edition() {
    return this.getStringAttribute('edition');
  }
  public set edition(value: string) {
    this._edition = value;
  }
  // Temporarily expose input value. Use with caution.
  public get editionInput() {
    return this._edition;
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

  // obs_expansion_package - computed: true, optional: true, required: false
  private _obsExpansionPackage?: number; 
  public get obsExpansionPackage() {
    return this.getNumberAttribute('obs_expansion_package');
  }
  public set obsExpansionPackage(value: number) {
    this._obsExpansionPackage = value;
  }
  public resetObsExpansionPackage() {
    this._obsExpansionPackage = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsExpansionPackageInput() {
    return this._obsExpansionPackage;
  }

  // period - computed: false, optional: false, required: true
  private _period?: number; 
  public get period() {
    return this.getNumberAttribute('period');
  }
  public set period(value: number) {
    this._period = value;
  }
  // Temporarily expose input value. Use with caution.
  public get periodInput() {
    return this._period;
  }

  // period_unit - computed: false, optional: false, required: true
  private _periodUnit?: string; 
  public get periodUnit() {
    return this.getStringAttribute('period_unit');
  }
  public set periodUnit(value: string) {
    this._periodUnit = value;
  }
  // Temporarily expose input value. Use with caution.
  public get periodUnitInput() {
    return this._periodUnit;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      database_expansion_package: cdktf.numberToTerraform(this._databaseExpansionPackage),
      edition: cdktf.stringToTerraform(this._edition),
      id: cdktf.stringToTerraform(this._id),
      obs_expansion_package: cdktf.numberToTerraform(this._obsExpansionPackage),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_renew: {
        value: cdktf.stringToHclTerraform(this._autoRenew),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      database_expansion_package: {
        value: cdktf.numberToHclTerraform(this._databaseExpansionPackage),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      edition: {
        value: cdktf.stringToHclTerraform(this._edition),
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
      obs_expansion_package: {
        value: cdktf.numberToHclTerraform(this._obsExpansionPackage),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      period: {
        value: cdktf.numberToHclTerraform(this._period),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      period_unit: {
        value: cdktf.stringToHclTerraform(this._periodUnit),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

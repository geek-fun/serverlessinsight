// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_billing_option
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CdnBillingOptionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the billing option.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_billing_option#charge_mode CdnBillingOption#charge_mode}
  */
  readonly chargeMode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_billing_option#id CdnBillingOption#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the product mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_billing_option#product_type CdnBillingOption#product_type}
  */
  readonly productType: string;
  /**
  * Specifies the service area.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_billing_option#service_area CdnBillingOption#service_area}
  */
  readonly serviceArea: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_billing_option huaweicloud_cdn_billing_option}
*/
export class CdnBillingOption extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cdn_billing_option";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CdnBillingOption resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CdnBillingOption to import
  * @param importFromId The id of the existing CdnBillingOption that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_billing_option#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CdnBillingOption to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cdn_billing_option", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_billing_option huaweicloud_cdn_billing_option} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CdnBillingOptionConfig
  */
  public constructor(scope: Construct, id: string, config: CdnBillingOptionConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cdn_billing_option',
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
    this._chargeMode = config.chargeMode;
    this._id = config.id;
    this._productType = config.productType;
    this._serviceArea = config.serviceArea;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // charge_mode - computed: false, optional: false, required: true
  private _chargeMode?: string; 
  public get chargeMode() {
    return this.getStringAttribute('charge_mode');
  }
  public set chargeMode(value: string) {
    this._chargeMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get chargeModeInput() {
    return this._chargeMode;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // current_charge_mode - computed: true, optional: false, required: false
  public get currentChargeMode() {
    return this.getStringAttribute('current_charge_mode');
  }

  // effective_time - computed: true, optional: false, required: false
  public get effectiveTime() {
    return this.getStringAttribute('effective_time');
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

  // product_type - computed: false, optional: false, required: true
  private _productType?: string; 
  public get productType() {
    return this.getStringAttribute('product_type');
  }
  public set productType(value: string) {
    this._productType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get productTypeInput() {
    return this._productType;
  }

  // service_area - computed: false, optional: false, required: true
  private _serviceArea?: string; 
  public get serviceArea() {
    return this.getStringAttribute('service_area');
  }
  public set serviceArea(value: string) {
    this._serviceArea = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceAreaInput() {
    return this._serviceArea;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      charge_mode: cdktf.stringToTerraform(this._chargeMode),
      id: cdktf.stringToTerraform(this._id),
      product_type: cdktf.stringToTerraform(this._productType),
      service_area: cdktf.stringToTerraform(this._serviceArea),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      charge_mode: {
        value: cdktf.stringToHclTerraform(this._chargeMode),
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
      product_type: {
        value: cdktf.stringToHclTerraform(this._productType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      service_area: {
        value: cdktf.stringToHclTerraform(this._serviceArea),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

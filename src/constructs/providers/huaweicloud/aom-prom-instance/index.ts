// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomPromInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance#enterprise_project_id AomPromInstance#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance#id AomPromInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance#prom_name AomPromInstance#prom_name}
  */
  readonly promName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance#prom_type AomPromInstance#prom_type}
  */
  readonly promType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance#prom_version AomPromInstance#prom_version}
  */
  readonly promVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance#region AomPromInstance#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance huaweicloud_aom_prom_instance}
*/
export class AomPromInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_prom_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomPromInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomPromInstance to import
  * @param importFromId The id of the existing AomPromInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomPromInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_prom_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_prom_instance huaweicloud_aom_prom_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomPromInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: AomPromInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_prom_instance',
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
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._promName = config.promName;
    this._promType = config.promType;
    this._promVersion = config.promVersion;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // prom_http_api_endpoint - computed: true, optional: false, required: false
  public get promHttpApiEndpoint() {
    return this.getStringAttribute('prom_http_api_endpoint');
  }

  // prom_name - computed: false, optional: false, required: true
  private _promName?: string; 
  public get promName() {
    return this.getStringAttribute('prom_name');
  }
  public set promName(value: string) {
    this._promName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get promNameInput() {
    return this._promName;
  }

  // prom_type - computed: false, optional: false, required: true
  private _promType?: string; 
  public get promType() {
    return this.getStringAttribute('prom_type');
  }
  public set promType(value: string) {
    this._promType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get promTypeInput() {
    return this._promType;
  }

  // prom_version - computed: false, optional: true, required: false
  private _promVersion?: string; 
  public get promVersion() {
    return this.getStringAttribute('prom_version');
  }
  public set promVersion(value: string) {
    this._promVersion = value;
  }
  public resetPromVersion() {
    this._promVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get promVersionInput() {
    return this._promVersion;
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

  // remote_read_url - computed: true, optional: false, required: false
  public get remoteReadUrl() {
    return this.getStringAttribute('remote_read_url');
  }

  // remote_write_url - computed: true, optional: false, required: false
  public get remoteWriteUrl() {
    return this.getStringAttribute('remote_write_url');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      prom_name: cdktf.stringToTerraform(this._promName),
      prom_type: cdktf.stringToTerraform(this._promType),
      prom_version: cdktf.stringToTerraform(this._promVersion),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
      prom_name: {
        value: cdktf.stringToHclTerraform(this._promName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      prom_type: {
        value: cdktf.stringToHclTerraform(this._promType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      prom_version: {
        value: cdktf.stringToHclTerraform(this._promVersion),
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

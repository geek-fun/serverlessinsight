// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface GaussdbMysqlQuotaConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota#enterprise_project_id GaussdbMysqlQuota#enterprise_project_id}
  */
  readonly enterpriseProjectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota#id GaussdbMysqlQuota#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota#instance_quota GaussdbMysqlQuota#instance_quota}
  */
  readonly instanceQuota?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota#ram_quota GaussdbMysqlQuota#ram_quota}
  */
  readonly ramQuota?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota#region GaussdbMysqlQuota#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota#vcpus_quota GaussdbMysqlQuota#vcpus_quota}
  */
  readonly vcpusQuota?: number;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota huaweicloud_gaussdb_mysql_quota}
*/
export class GaussdbMysqlQuota extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_gaussdb_mysql_quota";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a GaussdbMysqlQuota resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the GaussdbMysqlQuota to import
  * @param importFromId The id of the existing GaussdbMysqlQuota that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the GaussdbMysqlQuota to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_gaussdb_mysql_quota", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_quota huaweicloud_gaussdb_mysql_quota} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options GaussdbMysqlQuotaConfig
  */
  public constructor(scope: Construct, id: string, config: GaussdbMysqlQuotaConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_gaussdb_mysql_quota',
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
    this._instanceQuota = config.instanceQuota;
    this._ramQuota = config.ramQuota;
    this._region = config.region;
    this._vcpusQuota = config.vcpusQuota;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // availability_instance_quota - computed: true, optional: false, required: false
  public get availabilityInstanceQuota() {
    return this.getNumberAttribute('availability_instance_quota');
  }

  // availability_ram_quota - computed: true, optional: false, required: false
  public get availabilityRamQuota() {
    return this.getNumberAttribute('availability_ram_quota');
  }

  // availability_vcpus_quota - computed: true, optional: false, required: false
  public get availabilityVcpusQuota() {
    return this.getNumberAttribute('availability_vcpus_quota');
  }

  // enterprise_project_id - computed: false, optional: false, required: true
  private _enterpriseProjectId?: string; 
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }
  public set enterpriseProjectId(value: string) {
    this._enterpriseProjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseProjectIdInput() {
    return this._enterpriseProjectId;
  }

  // enterprise_project_name - computed: true, optional: false, required: false
  public get enterpriseProjectName() {
    return this.getStringAttribute('enterprise_project_name');
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

  // instance_quota - computed: false, optional: true, required: false
  private _instanceQuota?: number; 
  public get instanceQuota() {
    return this.getNumberAttribute('instance_quota');
  }
  public set instanceQuota(value: number) {
    this._instanceQuota = value;
  }
  public resetInstanceQuota() {
    this._instanceQuota = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceQuotaInput() {
    return this._instanceQuota;
  }

  // ram_quota - computed: false, optional: true, required: false
  private _ramQuota?: number; 
  public get ramQuota() {
    return this.getNumberAttribute('ram_quota');
  }
  public set ramQuota(value: number) {
    this._ramQuota = value;
  }
  public resetRamQuota() {
    this._ramQuota = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ramQuotaInput() {
    return this._ramQuota;
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

  // vcpus_quota - computed: false, optional: true, required: false
  private _vcpusQuota?: number; 
  public get vcpusQuota() {
    return this.getNumberAttribute('vcpus_quota');
  }
  public set vcpusQuota(value: number) {
    this._vcpusQuota = value;
  }
  public resetVcpusQuota() {
    this._vcpusQuota = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vcpusQuotaInput() {
    return this._vcpusQuota;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      instance_quota: cdktf.numberToTerraform(this._instanceQuota),
      ram_quota: cdktf.numberToTerraform(this._ramQuota),
      region: cdktf.stringToTerraform(this._region),
      vcpus_quota: cdktf.numberToTerraform(this._vcpusQuota),
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
      instance_quota: {
        value: cdktf.numberToHclTerraform(this._instanceQuota),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      ram_quota: {
        value: cdktf.numberToHclTerraform(this._ramQuota),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vcpus_quota: {
        value: cdktf.numberToHclTerraform(this._vcpusQuota),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

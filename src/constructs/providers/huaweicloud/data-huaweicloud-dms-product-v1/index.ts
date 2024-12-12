// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDmsProductV1Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#availability_zones DataHuaweicloudDmsProductV1#availability_zones}
  */
  readonly availabilityZones?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#bandwidth DataHuaweicloudDmsProductV1#bandwidth}
  */
  readonly bandwidth?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#engine DataHuaweicloudDmsProductV1#engine}
  */
  readonly engine: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#id DataHuaweicloudDmsProductV1#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#instance_type DataHuaweicloudDmsProductV1#instance_type}
  */
  readonly instanceType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#io_type DataHuaweicloudDmsProductV1#io_type}
  */
  readonly ioType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#node_num DataHuaweicloudDmsProductV1#node_num}
  */
  readonly nodeNum?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#partition_num DataHuaweicloudDmsProductV1#partition_num}
  */
  readonly partitionNum?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#region DataHuaweicloudDmsProductV1#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#storage DataHuaweicloudDmsProductV1#storage}
  */
  readonly storage?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#storage_spec_code DataHuaweicloudDmsProductV1#storage_spec_code}
  */
  readonly storageSpecCode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#version DataHuaweicloudDmsProductV1#version}
  */
  readonly version?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#vm_specification DataHuaweicloudDmsProductV1#vm_specification}
  */
  readonly vmSpecification?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1 huaweicloud_dms_product_v1}
*/
export class DataHuaweicloudDmsProductV1 extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_product_v1";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDmsProductV1 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDmsProductV1 to import
  * @param importFromId The id of the existing DataHuaweicloudDmsProductV1 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDmsProductV1 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_product_v1", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_product_v1 huaweicloud_dms_product_v1} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDmsProductV1Config
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDmsProductV1Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_product_v1',
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
    this._availabilityZones = config.availabilityZones;
    this._bandwidth = config.bandwidth;
    this._engine = config.engine;
    this._id = config.id;
    this._instanceType = config.instanceType;
    this._ioType = config.ioType;
    this._nodeNum = config.nodeNum;
    this._partitionNum = config.partitionNum;
    this._region = config.region;
    this._storage = config.storage;
    this._storageSpecCode = config.storageSpecCode;
    this._version = config.version;
    this._vmSpecification = config.vmSpecification;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // availability_zones - computed: true, optional: true, required: false
  private _availabilityZones?: string[]; 
  public get availabilityZones() {
    return this.getListAttribute('availability_zones');
  }
  public set availabilityZones(value: string[]) {
    this._availabilityZones = value;
  }
  public resetAvailabilityZones() {
    this._availabilityZones = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZonesInput() {
    return this._availabilityZones;
  }

  // bandwidth - computed: true, optional: true, required: false
  private _bandwidth?: string; 
  public get bandwidth() {
    return this.getStringAttribute('bandwidth');
  }
  public set bandwidth(value: string) {
    this._bandwidth = value;
  }
  public resetBandwidth() {
    this._bandwidth = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthInput() {
    return this._bandwidth;
  }

  // engine - computed: false, optional: false, required: true
  private _engine?: string; 
  public get engine() {
    return this.getStringAttribute('engine');
  }
  public set engine(value: string) {
    this._engine = value;
  }
  // Temporarily expose input value. Use with caution.
  public get engineInput() {
    return this._engine;
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

  // instance_type - computed: false, optional: false, required: true
  private _instanceType?: string; 
  public get instanceType() {
    return this.getStringAttribute('instance_type');
  }
  public set instanceType(value: string) {
    this._instanceType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceTypeInput() {
    return this._instanceType;
  }

  // io_type - computed: true, optional: true, required: false
  private _ioType?: string; 
  public get ioType() {
    return this.getStringAttribute('io_type');
  }
  public set ioType(value: string) {
    this._ioType = value;
  }
  public resetIoType() {
    this._ioType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ioTypeInput() {
    return this._ioType;
  }

  // node_num - computed: true, optional: true, required: false
  private _nodeNum?: string; 
  public get nodeNum() {
    return this.getStringAttribute('node_num');
  }
  public set nodeNum(value: string) {
    this._nodeNum = value;
  }
  public resetNodeNum() {
    this._nodeNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeNumInput() {
    return this._nodeNum;
  }

  // partition_num - computed: true, optional: true, required: false
  private _partitionNum?: string; 
  public get partitionNum() {
    return this.getStringAttribute('partition_num');
  }
  public set partitionNum(value: string) {
    this._partitionNum = value;
  }
  public resetPartitionNum() {
    this._partitionNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionNumInput() {
    return this._partitionNum;
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

  // storage - computed: true, optional: true, required: false
  private _storage?: string; 
  public get storage() {
    return this.getStringAttribute('storage');
  }
  public set storage(value: string) {
    this._storage = value;
  }
  public resetStorage() {
    this._storage = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageInput() {
    return this._storage;
  }

  // storage_spec_code - computed: true, optional: true, required: false
  private _storageSpecCode?: string; 
  public get storageSpecCode() {
    return this.getStringAttribute('storage_spec_code');
  }
  public set storageSpecCode(value: string) {
    this._storageSpecCode = value;
  }
  public resetStorageSpecCode() {
    this._storageSpecCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageSpecCodeInput() {
    return this._storageSpecCode;
  }

  // storage_spec_codes - computed: true, optional: false, required: false
  public get storageSpecCodes() {
    return this.getListAttribute('storage_spec_codes');
  }

  // version - computed: true, optional: true, required: false
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  public resetVersion() {
    this._version = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // vm_specification - computed: true, optional: true, required: false
  private _vmSpecification?: string; 
  public get vmSpecification() {
    return this.getStringAttribute('vm_specification');
  }
  public set vmSpecification(value: string) {
    this._vmSpecification = value;
  }
  public resetVmSpecification() {
    this._vmSpecification = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vmSpecificationInput() {
    return this._vmSpecification;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      availability_zones: cdktf.listMapper(cdktf.stringToTerraform, false)(this._availabilityZones),
      bandwidth: cdktf.stringToTerraform(this._bandwidth),
      engine: cdktf.stringToTerraform(this._engine),
      id: cdktf.stringToTerraform(this._id),
      instance_type: cdktf.stringToTerraform(this._instanceType),
      io_type: cdktf.stringToTerraform(this._ioType),
      node_num: cdktf.stringToTerraform(this._nodeNum),
      partition_num: cdktf.stringToTerraform(this._partitionNum),
      region: cdktf.stringToTerraform(this._region),
      storage: cdktf.stringToTerraform(this._storage),
      storage_spec_code: cdktf.stringToTerraform(this._storageSpecCode),
      version: cdktf.stringToTerraform(this._version),
      vm_specification: cdktf.stringToTerraform(this._vmSpecification),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      availability_zones: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._availabilityZones),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      bandwidth: {
        value: cdktf.stringToHclTerraform(this._bandwidth),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      engine: {
        value: cdktf.stringToHclTerraform(this._engine),
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
      instance_type: {
        value: cdktf.stringToHclTerraform(this._instanceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      io_type: {
        value: cdktf.stringToHclTerraform(this._ioType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      node_num: {
        value: cdktf.stringToHclTerraform(this._nodeNum),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      partition_num: {
        value: cdktf.stringToHclTerraform(this._partitionNum),
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
      storage: {
        value: cdktf.stringToHclTerraform(this._storage),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      storage_spec_code: {
        value: cdktf.stringToHclTerraform(this._storageSpecCode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vm_specification: {
        value: cdktf.stringToHclTerraform(this._vmSpecification),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

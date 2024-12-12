// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudRdsRecyclingInstancesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the floating IP address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#data_vip DataHuaweicloudRdsRecyclingInstances#data_vip}
  */
  readonly dataVip?: string;
  /**
  * Specifies the DB engine name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#engine_name DataHuaweicloudRdsRecyclingInstances#engine_name}
  */
  readonly engineName?: string;
  /**
  * Specifies the DB engine version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#engine_version DataHuaweicloudRdsRecyclingInstances#engine_version}
  */
  readonly engineVersion?: string;
  /**
  * Specifies the enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#enterprise_project_id DataHuaweicloudRdsRecyclingInstances#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Specifies the instance type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#ha_mode DataHuaweicloudRdsRecyclingInstances#ha_mode}
  */
  readonly haMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#id DataHuaweicloudRdsRecyclingInstances#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#instance_id DataHuaweicloudRdsRecyclingInstances#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Specifies whether the instance is a serverless instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#is_serverless DataHuaweicloudRdsRecyclingInstances#is_serverless}
  */
  readonly isServerless?: string;
  /**
  * Specifies the instance name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#name DataHuaweicloudRdsRecyclingInstances#name}
  */
  readonly name?: string;
  /**
  * Specifies the billing mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#pay_model DataHuaweicloudRdsRecyclingInstances#pay_model}
  */
  readonly payModel?: string;
  /**
  * Specifies the backup ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#recycle_backup_id DataHuaweicloudRdsRecyclingInstances#recycle_backup_id}
  */
  readonly recycleBackupId?: string;
  /**
  * Specifies the backup status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#recycle_status DataHuaweicloudRdsRecyclingInstances#recycle_status}
  */
  readonly recycleStatus?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#region DataHuaweicloudRdsRecyclingInstances#region}
  */
  readonly region?: string;
  /**
  * Specifies the storage space in **GB**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#volume_size DataHuaweicloudRdsRecyclingInstances#volume_size}
  */
  readonly volumeSize?: string;
  /**
  * Specifies the storage type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#volume_type DataHuaweicloudRdsRecyclingInstances#volume_type}
  */
  readonly volumeType?: string;
}
export interface DataHuaweicloudRdsRecyclingInstancesInstances {
}

export function dataHuaweicloudRdsRecyclingInstancesInstancesToTerraform(struct?: DataHuaweicloudRdsRecyclingInstancesInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRdsRecyclingInstancesInstancesToHclTerraform(struct?: DataHuaweicloudRdsRecyclingInstancesInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRdsRecyclingInstancesInstancesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudRdsRecyclingInstancesInstances | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRdsRecyclingInstancesInstances | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // data_vip - computed: true, optional: false, required: false
  public get dataVip() {
    return this.getStringAttribute('data_vip');
  }

  // deleted_at - computed: true, optional: false, required: false
  public get deletedAt() {
    return this.getStringAttribute('deleted_at');
  }

  // engine_name - computed: true, optional: false, required: false
  public get engineName() {
    return this.getStringAttribute('engine_name');
  }

  // engine_version - computed: true, optional: false, required: false
  public get engineVersion() {
    return this.getStringAttribute('engine_version');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // ha_mode - computed: true, optional: false, required: false
  public get haMode() {
    return this.getStringAttribute('ha_mode');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_serverless - computed: true, optional: false, required: false
  public get isServerless() {
    return this.getBooleanAttribute('is_serverless');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // pay_model - computed: true, optional: false, required: false
  public get payModel() {
    return this.getStringAttribute('pay_model');
  }

  // recycle_backup_id - computed: true, optional: false, required: false
  public get recycleBackupId() {
    return this.getStringAttribute('recycle_backup_id');
  }

  // recycle_status - computed: true, optional: false, required: false
  public get recycleStatus() {
    return this.getStringAttribute('recycle_status');
  }

  // retained_until - computed: true, optional: false, required: false
  public get retainedUntil() {
    return this.getStringAttribute('retained_until');
  }

  // volume_size - computed: true, optional: false, required: false
  public get volumeSize() {
    return this.getNumberAttribute('volume_size');
  }

  // volume_type - computed: true, optional: false, required: false
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
}

export class DataHuaweicloudRdsRecyclingInstancesInstancesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRdsRecyclingInstancesInstancesOutputReference {
    return new DataHuaweicloudRdsRecyclingInstancesInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances huaweicloud_rds_recycling_instances}
*/
export class DataHuaweicloudRdsRecyclingInstances extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rds_recycling_instances";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudRdsRecyclingInstances resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudRdsRecyclingInstances to import
  * @param importFromId The id of the existing DataHuaweicloudRdsRecyclingInstances that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudRdsRecyclingInstances to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rds_recycling_instances", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_recycling_instances huaweicloud_rds_recycling_instances} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudRdsRecyclingInstancesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudRdsRecyclingInstancesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rds_recycling_instances',
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
    this._dataVip = config.dataVip;
    this._engineName = config.engineName;
    this._engineVersion = config.engineVersion;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._haMode = config.haMode;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._isServerless = config.isServerless;
    this._name = config.name;
    this._payModel = config.payModel;
    this._recycleBackupId = config.recycleBackupId;
    this._recycleStatus = config.recycleStatus;
    this._region = config.region;
    this._volumeSize = config.volumeSize;
    this._volumeType = config.volumeType;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // data_vip - computed: false, optional: true, required: false
  private _dataVip?: string; 
  public get dataVip() {
    return this.getStringAttribute('data_vip');
  }
  public set dataVip(value: string) {
    this._dataVip = value;
  }
  public resetDataVip() {
    this._dataVip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVipInput() {
    return this._dataVip;
  }

  // engine_name - computed: false, optional: true, required: false
  private _engineName?: string; 
  public get engineName() {
    return this.getStringAttribute('engine_name');
  }
  public set engineName(value: string) {
    this._engineName = value;
  }
  public resetEngineName() {
    this._engineName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get engineNameInput() {
    return this._engineName;
  }

  // engine_version - computed: false, optional: true, required: false
  private _engineVersion?: string; 
  public get engineVersion() {
    return this.getStringAttribute('engine_version');
  }
  public set engineVersion(value: string) {
    this._engineVersion = value;
  }
  public resetEngineVersion() {
    this._engineVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get engineVersionInput() {
    return this._engineVersion;
  }

  // enterprise_project_id - computed: false, optional: true, required: false
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

  // ha_mode - computed: false, optional: true, required: false
  private _haMode?: string; 
  public get haMode() {
    return this.getStringAttribute('ha_mode');
  }
  public set haMode(value: string) {
    this._haMode = value;
  }
  public resetHaMode() {
    this._haMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get haModeInput() {
    return this._haMode;
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

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // instances - computed: true, optional: false, required: false
  private _instances = new DataHuaweicloudRdsRecyclingInstancesInstancesList(this, "instances", false);
  public get instances() {
    return this._instances;
  }

  // is_serverless - computed: false, optional: true, required: false
  private _isServerless?: string; 
  public get isServerless() {
    return this.getStringAttribute('is_serverless');
  }
  public set isServerless(value: string) {
    this._isServerless = value;
  }
  public resetIsServerless() {
    this._isServerless = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isServerlessInput() {
    return this._isServerless;
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

  // pay_model - computed: false, optional: true, required: false
  private _payModel?: string; 
  public get payModel() {
    return this.getStringAttribute('pay_model');
  }
  public set payModel(value: string) {
    this._payModel = value;
  }
  public resetPayModel() {
    this._payModel = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get payModelInput() {
    return this._payModel;
  }

  // recycle_backup_id - computed: false, optional: true, required: false
  private _recycleBackupId?: string; 
  public get recycleBackupId() {
    return this.getStringAttribute('recycle_backup_id');
  }
  public set recycleBackupId(value: string) {
    this._recycleBackupId = value;
  }
  public resetRecycleBackupId() {
    this._recycleBackupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recycleBackupIdInput() {
    return this._recycleBackupId;
  }

  // recycle_status - computed: false, optional: true, required: false
  private _recycleStatus?: string; 
  public get recycleStatus() {
    return this.getStringAttribute('recycle_status');
  }
  public set recycleStatus(value: string) {
    this._recycleStatus = value;
  }
  public resetRecycleStatus() {
    this._recycleStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recycleStatusInput() {
    return this._recycleStatus;
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

  // volume_size - computed: false, optional: true, required: false
  private _volumeSize?: string; 
  public get volumeSize() {
    return this.getStringAttribute('volume_size');
  }
  public set volumeSize(value: string) {
    this._volumeSize = value;
  }
  public resetVolumeSize() {
    this._volumeSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeSizeInput() {
    return this._volumeSize;
  }

  // volume_type - computed: false, optional: true, required: false
  private _volumeType?: string; 
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
  public set volumeType(value: string) {
    this._volumeType = value;
  }
  public resetVolumeType() {
    this._volumeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeTypeInput() {
    return this._volumeType;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      data_vip: cdktf.stringToTerraform(this._dataVip),
      engine_name: cdktf.stringToTerraform(this._engineName),
      engine_version: cdktf.stringToTerraform(this._engineVersion),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      ha_mode: cdktf.stringToTerraform(this._haMode),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      is_serverless: cdktf.stringToTerraform(this._isServerless),
      name: cdktf.stringToTerraform(this._name),
      pay_model: cdktf.stringToTerraform(this._payModel),
      recycle_backup_id: cdktf.stringToTerraform(this._recycleBackupId),
      recycle_status: cdktf.stringToTerraform(this._recycleStatus),
      region: cdktf.stringToTerraform(this._region),
      volume_size: cdktf.stringToTerraform(this._volumeSize),
      volume_type: cdktf.stringToTerraform(this._volumeType),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      data_vip: {
        value: cdktf.stringToHclTerraform(this._dataVip),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      engine_name: {
        value: cdktf.stringToHclTerraform(this._engineName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      engine_version: {
        value: cdktf.stringToHclTerraform(this._engineVersion),
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
      ha_mode: {
        value: cdktf.stringToHclTerraform(this._haMode),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_serverless: {
        value: cdktf.stringToHclTerraform(this._isServerless),
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
      pay_model: {
        value: cdktf.stringToHclTerraform(this._payModel),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      recycle_backup_id: {
        value: cdktf.stringToHclTerraform(this._recycleBackupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      recycle_status: {
        value: cdktf.stringToHclTerraform(this._recycleStatus),
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
      volume_size: {
        value: cdktf.stringToHclTerraform(this._volumeSize),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      volume_type: {
        value: cdktf.stringToHclTerraform(this._volumeType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

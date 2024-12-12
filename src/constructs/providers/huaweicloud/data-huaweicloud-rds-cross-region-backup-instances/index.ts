// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudRdsCrossRegionBackupInstancesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the project ID of the target backup region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#destination_project_id DataHuaweicloudRdsCrossRegionBackupInstances#destination_project_id}
  */
  readonly destinationProjectId?: string;
  /**
  * Specifies the region where the cross-region backup is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#destination_region DataHuaweicloudRdsCrossRegionBackupInstances#destination_region}
  */
  readonly destinationRegion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#id DataHuaweicloudRdsCrossRegionBackupInstances#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#instance_id DataHuaweicloudRdsCrossRegionBackupInstances#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Specifies the number of days to retain cross-region backups.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#keep_days DataHuaweicloudRdsCrossRegionBackupInstances#keep_days}
  */
  readonly keepDays?: number;
  /**
  * Specifies the name of the instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#name DataHuaweicloudRdsCrossRegionBackupInstances#name}
  */
  readonly name?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#region DataHuaweicloudRdsCrossRegionBackupInstances#region}
  */
  readonly region?: string;
  /**
  * Specifies the project ID of the source backup region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#source_project_id DataHuaweicloudRdsCrossRegionBackupInstances#source_project_id}
  */
  readonly sourceProjectId?: string;
  /**
  * Specifies the source backup region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#source_region DataHuaweicloudRdsCrossRegionBackupInstances#source_region}
  */
  readonly sourceRegion?: string;
}
export interface DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastore {
}

export function dataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastoreToTerraform(struct?: DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastore): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastoreToHclTerraform(struct?: DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastore): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastoreOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastore | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastore | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getStringAttribute('version');
  }
}

export class DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastoreList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastoreOutputReference {
    return new DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastoreOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstances {
}

export function dataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesToTerraform(struct?: DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesToHclTerraform(struct?: DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstances | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstances | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // datastore - computed: true, optional: false, required: false
  private _datastore = new DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesDatastoreList(this, "datastore", false);
  public get datastore() {
    return this._datastore;
  }

  // destination_project_id - computed: true, optional: false, required: false
  public get destinationProjectId() {
    return this.getStringAttribute('destination_project_id');
  }

  // destination_region - computed: true, optional: false, required: false
  public get destinationRegion() {
    return this.getStringAttribute('destination_region');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // keep_days - computed: true, optional: false, required: false
  public get keepDays() {
    return this.getNumberAttribute('keep_days');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // source_project_id - computed: true, optional: false, required: false
  public get sourceProjectId() {
    return this.getStringAttribute('source_project_id');
  }

  // source_region - computed: true, optional: false, required: false
  public get sourceRegion() {
    return this.getStringAttribute('source_region');
  }
}

export class DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesOutputReference {
    return new DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances huaweicloud_rds_cross_region_backup_instances}
*/
export class DataHuaweicloudRdsCrossRegionBackupInstances extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rds_cross_region_backup_instances";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudRdsCrossRegionBackupInstances resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudRdsCrossRegionBackupInstances to import
  * @param importFromId The id of the existing DataHuaweicloudRdsCrossRegionBackupInstances that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudRdsCrossRegionBackupInstances to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rds_cross_region_backup_instances", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_cross_region_backup_instances huaweicloud_rds_cross_region_backup_instances} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudRdsCrossRegionBackupInstancesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudRdsCrossRegionBackupInstancesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rds_cross_region_backup_instances',
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
    this._destinationProjectId = config.destinationProjectId;
    this._destinationRegion = config.destinationRegion;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._keepDays = config.keepDays;
    this._name = config.name;
    this._region = config.region;
    this._sourceProjectId = config.sourceProjectId;
    this._sourceRegion = config.sourceRegion;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backup_instances - computed: true, optional: false, required: false
  private _backupInstances = new DataHuaweicloudRdsCrossRegionBackupInstancesBackupInstancesList(this, "backup_instances", false);
  public get backupInstances() {
    return this._backupInstances;
  }

  // destination_project_id - computed: false, optional: true, required: false
  private _destinationProjectId?: string; 
  public get destinationProjectId() {
    return this.getStringAttribute('destination_project_id');
  }
  public set destinationProjectId(value: string) {
    this._destinationProjectId = value;
  }
  public resetDestinationProjectId() {
    this._destinationProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationProjectIdInput() {
    return this._destinationProjectId;
  }

  // destination_region - computed: false, optional: true, required: false
  private _destinationRegion?: string; 
  public get destinationRegion() {
    return this.getStringAttribute('destination_region');
  }
  public set destinationRegion(value: string) {
    this._destinationRegion = value;
  }
  public resetDestinationRegion() {
    this._destinationRegion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationRegionInput() {
    return this._destinationRegion;
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

  // keep_days - computed: false, optional: true, required: false
  private _keepDays?: number; 
  public get keepDays() {
    return this.getNumberAttribute('keep_days');
  }
  public set keepDays(value: number) {
    this._keepDays = value;
  }
  public resetKeepDays() {
    this._keepDays = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keepDaysInput() {
    return this._keepDays;
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

  // source_project_id - computed: false, optional: true, required: false
  private _sourceProjectId?: string; 
  public get sourceProjectId() {
    return this.getStringAttribute('source_project_id');
  }
  public set sourceProjectId(value: string) {
    this._sourceProjectId = value;
  }
  public resetSourceProjectId() {
    this._sourceProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceProjectIdInput() {
    return this._sourceProjectId;
  }

  // source_region - computed: false, optional: true, required: false
  private _sourceRegion?: string; 
  public get sourceRegion() {
    return this.getStringAttribute('source_region');
  }
  public set sourceRegion(value: string) {
    this._sourceRegion = value;
  }
  public resetSourceRegion() {
    this._sourceRegion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceRegionInput() {
    return this._sourceRegion;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      destination_project_id: cdktf.stringToTerraform(this._destinationProjectId),
      destination_region: cdktf.stringToTerraform(this._destinationRegion),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      keep_days: cdktf.numberToTerraform(this._keepDays),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      source_project_id: cdktf.stringToTerraform(this._sourceProjectId),
      source_region: cdktf.stringToTerraform(this._sourceRegion),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      destination_project_id: {
        value: cdktf.stringToHclTerraform(this._destinationProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_region: {
        value: cdktf.stringToHclTerraform(this._destinationRegion),
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
      keep_days: {
        value: cdktf.numberToHclTerraform(this._keepDays),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_project_id: {
        value: cdktf.stringToHclTerraform(this._sourceProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_region: {
        value: cdktf.stringToHclTerraform(this._sourceRegion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

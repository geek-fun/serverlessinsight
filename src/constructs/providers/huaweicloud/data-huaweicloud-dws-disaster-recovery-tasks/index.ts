// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDwsDisasterRecoveryTasksConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#dr_type DataHuaweicloudDwsDisasterRecoveryTasks#dr_type}
  */
  readonly drType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#id DataHuaweicloudDwsDisasterRecoveryTasks#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#name DataHuaweicloudDwsDisasterRecoveryTasks#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#primary_cluster_name DataHuaweicloudDwsDisasterRecoveryTasks#primary_cluster_name}
  */
  readonly primaryClusterName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#primary_cluster_region DataHuaweicloudDwsDisasterRecoveryTasks#primary_cluster_region}
  */
  readonly primaryClusterRegion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#region DataHuaweicloudDwsDisasterRecoveryTasks#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#standby_cluster_name DataHuaweicloudDwsDisasterRecoveryTasks#standby_cluster_name}
  */
  readonly standbyClusterName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#standby_cluster_region DataHuaweicloudDwsDisasterRecoveryTasks#standby_cluster_region}
  */
  readonly standbyClusterRegion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#status DataHuaweicloudDwsDisasterRecoveryTasks#status}
  */
  readonly status?: string;
}
export interface DataHuaweicloudDwsDisasterRecoveryTasksTasks {
}

export function dataHuaweicloudDwsDisasterRecoveryTasksTasksToTerraform(struct?: DataHuaweicloudDwsDisasterRecoveryTasksTasks): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDwsDisasterRecoveryTasksTasksToHclTerraform(struct?: DataHuaweicloudDwsDisasterRecoveryTasksTasks): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDwsDisasterRecoveryTasksTasksOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDwsDisasterRecoveryTasksTasks | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDwsDisasterRecoveryTasksTasks | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // create_at - computed: true, optional: false, required: false
  public get createAt() {
    return this.getStringAttribute('create_at');
  }

  // dr_type - computed: true, optional: false, required: false
  public get drType() {
    return this.getStringAttribute('dr_type');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // last_disaster_time - computed: true, optional: false, required: false
  public get lastDisasterTime() {
    return this.getStringAttribute('last_disaster_time');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // primary_cluster_id - computed: true, optional: false, required: false
  public get primaryClusterId() {
    return this.getStringAttribute('primary_cluster_id');
  }

  // primary_cluster_name - computed: true, optional: false, required: false
  public get primaryClusterName() {
    return this.getStringAttribute('primary_cluster_name');
  }

  // primary_cluster_project_id - computed: true, optional: false, required: false
  public get primaryClusterProjectId() {
    return this.getStringAttribute('primary_cluster_project_id');
  }

  // primary_cluster_region - computed: true, optional: false, required: false
  public get primaryClusterRegion() {
    return this.getStringAttribute('primary_cluster_region');
  }

  // primary_cluster_role - computed: true, optional: false, required: false
  public get primaryClusterRole() {
    return this.getStringAttribute('primary_cluster_role');
  }

  // primary_cluster_status - computed: true, optional: false, required: false
  public get primaryClusterStatus() {
    return this.getStringAttribute('primary_cluster_status');
  }

  // standby_cluster_id - computed: true, optional: false, required: false
  public get standbyClusterId() {
    return this.getStringAttribute('standby_cluster_id');
  }

  // standby_cluster_name - computed: true, optional: false, required: false
  public get standbyClusterName() {
    return this.getStringAttribute('standby_cluster_name');
  }

  // standby_cluster_project_id - computed: true, optional: false, required: false
  public get standbyClusterProjectId() {
    return this.getStringAttribute('standby_cluster_project_id');
  }

  // standby_cluster_region - computed: true, optional: false, required: false
  public get standbyClusterRegion() {
    return this.getStringAttribute('standby_cluster_region');
  }

  // standby_cluster_role - computed: true, optional: false, required: false
  public get standbyClusterRole() {
    return this.getStringAttribute('standby_cluster_role');
  }

  // standby_cluster_status - computed: true, optional: false, required: false
  public get standbyClusterStatus() {
    return this.getStringAttribute('standby_cluster_status');
  }

  // start_at - computed: true, optional: false, required: false
  public get startAt() {
    return this.getStringAttribute('start_at');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }
}

export class DataHuaweicloudDwsDisasterRecoveryTasksTasksList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDwsDisasterRecoveryTasksTasksOutputReference {
    return new DataHuaweicloudDwsDisasterRecoveryTasksTasksOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks huaweicloud_dws_disaster_recovery_tasks}
*/
export class DataHuaweicloudDwsDisasterRecoveryTasks extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dws_disaster_recovery_tasks";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDwsDisasterRecoveryTasks resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDwsDisasterRecoveryTasks to import
  * @param importFromId The id of the existing DataHuaweicloudDwsDisasterRecoveryTasks that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDwsDisasterRecoveryTasks to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dws_disaster_recovery_tasks", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dws_disaster_recovery_tasks huaweicloud_dws_disaster_recovery_tasks} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDwsDisasterRecoveryTasksConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDwsDisasterRecoveryTasksConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dws_disaster_recovery_tasks',
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
    this._drType = config.drType;
    this._id = config.id;
    this._name = config.name;
    this._primaryClusterName = config.primaryClusterName;
    this._primaryClusterRegion = config.primaryClusterRegion;
    this._region = config.region;
    this._standbyClusterName = config.standbyClusterName;
    this._standbyClusterRegion = config.standbyClusterRegion;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // dr_type - computed: false, optional: true, required: false
  private _drType?: string; 
  public get drType() {
    return this.getStringAttribute('dr_type');
  }
  public set drType(value: string) {
    this._drType = value;
  }
  public resetDrType() {
    this._drType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get drTypeInput() {
    return this._drType;
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

  // primary_cluster_name - computed: false, optional: true, required: false
  private _primaryClusterName?: string; 
  public get primaryClusterName() {
    return this.getStringAttribute('primary_cluster_name');
  }
  public set primaryClusterName(value: string) {
    this._primaryClusterName = value;
  }
  public resetPrimaryClusterName() {
    this._primaryClusterName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get primaryClusterNameInput() {
    return this._primaryClusterName;
  }

  // primary_cluster_region - computed: false, optional: true, required: false
  private _primaryClusterRegion?: string; 
  public get primaryClusterRegion() {
    return this.getStringAttribute('primary_cluster_region');
  }
  public set primaryClusterRegion(value: string) {
    this._primaryClusterRegion = value;
  }
  public resetPrimaryClusterRegion() {
    this._primaryClusterRegion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get primaryClusterRegionInput() {
    return this._primaryClusterRegion;
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

  // standby_cluster_name - computed: false, optional: true, required: false
  private _standbyClusterName?: string; 
  public get standbyClusterName() {
    return this.getStringAttribute('standby_cluster_name');
  }
  public set standbyClusterName(value: string) {
    this._standbyClusterName = value;
  }
  public resetStandbyClusterName() {
    this._standbyClusterName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get standbyClusterNameInput() {
    return this._standbyClusterName;
  }

  // standby_cluster_region - computed: false, optional: true, required: false
  private _standbyClusterRegion?: string; 
  public get standbyClusterRegion() {
    return this.getStringAttribute('standby_cluster_region');
  }
  public set standbyClusterRegion(value: string) {
    this._standbyClusterRegion = value;
  }
  public resetStandbyClusterRegion() {
    this._standbyClusterRegion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get standbyClusterRegionInput() {
    return this._standbyClusterRegion;
  }

  // status - computed: false, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // tasks - computed: true, optional: false, required: false
  private _tasks = new DataHuaweicloudDwsDisasterRecoveryTasksTasksList(this, "tasks", false);
  public get tasks() {
    return this._tasks;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      dr_type: cdktf.stringToTerraform(this._drType),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      primary_cluster_name: cdktf.stringToTerraform(this._primaryClusterName),
      primary_cluster_region: cdktf.stringToTerraform(this._primaryClusterRegion),
      region: cdktf.stringToTerraform(this._region),
      standby_cluster_name: cdktf.stringToTerraform(this._standbyClusterName),
      standby_cluster_region: cdktf.stringToTerraform(this._standbyClusterRegion),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      dr_type: {
        value: cdktf.stringToHclTerraform(this._drType),
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
      primary_cluster_name: {
        value: cdktf.stringToHclTerraform(this._primaryClusterName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      primary_cluster_region: {
        value: cdktf.stringToHclTerraform(this._primaryClusterRegion),
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
      standby_cluster_name: {
        value: cdktf.stringToHclTerraform(this._standbyClusterName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      standby_cluster_region: {
        value: cdktf.stringToHclTerraform(this._standbyClusterRegion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

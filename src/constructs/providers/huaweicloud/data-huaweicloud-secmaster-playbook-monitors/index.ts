// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudSecmasterPlaybookMonitorsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the end time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors#end_time DataHuaweicloudSecmasterPlaybookMonitors#end_time}
  */
  readonly endTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors#id DataHuaweicloudSecmasterPlaybookMonitors#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the playbook ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors#playbook_id DataHuaweicloudSecmasterPlaybookMonitors#playbook_id}
  */
  readonly playbookId: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors#region DataHuaweicloudSecmasterPlaybookMonitors#region}
  */
  readonly region?: string;
  /**
  * Specifies the start time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors#start_time DataHuaweicloudSecmasterPlaybookMonitors#start_time}
  */
  readonly startTime: string;
  /**
  * Specifies the playbook version type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors#version_query_type DataHuaweicloudSecmasterPlaybookMonitors#version_query_type}
  */
  readonly versionQueryType: string;
  /**
  * Specifies the workspace ID to which the playbook belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors#workspace_id DataHuaweicloudSecmasterPlaybookMonitors#workspace_id}
  */
  readonly workspaceId: string;
}
export interface DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstance {
}

export function dataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstanceToTerraform(struct?: DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstance): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstanceToHclTerraform(struct?: DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstance): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstanceOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstance | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstance | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // playbook_instance_id - computed: true, optional: false, required: false
  public get playbookInstanceId() {
    return this.getStringAttribute('playbook_instance_id');
  }

  // playbook_instance_name - computed: true, optional: false, required: false
  public get playbookInstanceName() {
    return this.getStringAttribute('playbook_instance_name');
  }

  // playbook_instance_run_time - computed: true, optional: false, required: false
  public get playbookInstanceRunTime() {
    return this.getNumberAttribute('playbook_instance_run_time');
  }
}

export class DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstanceList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstanceOutputReference {
    return new DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstanceOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstance {
}

export function dataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstanceToTerraform(struct?: DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstance): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstanceToHclTerraform(struct?: DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstance): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstanceOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstance | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstance | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // playbook_instance_id - computed: true, optional: false, required: false
  public get playbookInstanceId() {
    return this.getStringAttribute('playbook_instance_id');
  }

  // playbook_instance_name - computed: true, optional: false, required: false
  public get playbookInstanceName() {
    return this.getStringAttribute('playbook_instance_name');
  }

  // playbook_instance_run_time - computed: true, optional: false, required: false
  public get playbookInstanceRunTime() {
    return this.getNumberAttribute('playbook_instance_run_time');
  }
}

export class DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstanceList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstanceOutputReference {
    return new DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstanceOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterPlaybookMonitorsData {
}

export function dataHuaweicloudSecmasterPlaybookMonitorsDataToTerraform(struct?: DataHuaweicloudSecmasterPlaybookMonitorsData): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterPlaybookMonitorsDataToHclTerraform(struct?: DataHuaweicloudSecmasterPlaybookMonitorsData): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterPlaybookMonitorsDataOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterPlaybookMonitorsData | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterPlaybookMonitorsData | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // average_run_time - computed: true, optional: false, required: false
  public get averageRunTime() {
    return this.getNumberAttribute('average_run_time');
  }

  // event_instance_run_num - computed: true, optional: false, required: false
  public get eventInstanceRunNum() {
    return this.getNumberAttribute('event_instance_run_num');
  }

  // fail_instance_num - computed: true, optional: false, required: false
  public get failInstanceNum() {
    return this.getNumberAttribute('fail_instance_num');
  }

  // max_run_time_instance - computed: true, optional: false, required: false
  private _maxRunTimeInstance = new DataHuaweicloudSecmasterPlaybookMonitorsDataMaxRunTimeInstanceList(this, "max_run_time_instance", false);
  public get maxRunTimeInstance() {
    return this._maxRunTimeInstance;
  }

  // min_run_time_instance - computed: true, optional: false, required: false
  private _minRunTimeInstance = new DataHuaweicloudSecmasterPlaybookMonitorsDataMinRunTimeInstanceList(this, "min_run_time_instance", false);
  public get minRunTimeInstance() {
    return this._minRunTimeInstance;
  }

  // running_instance_num - computed: true, optional: false, required: false
  public get runningInstanceNum() {
    return this.getNumberAttribute('running_instance_num');
  }

  // schedule_instance_run_num - computed: true, optional: false, required: false
  public get scheduleInstanceRunNum() {
    return this.getNumberAttribute('schedule_instance_run_num');
  }

  // success_instance_num - computed: true, optional: false, required: false
  public get successInstanceNum() {
    return this.getNumberAttribute('success_instance_num');
  }

  // terminate_instance_num - computed: true, optional: false, required: false
  public get terminateInstanceNum() {
    return this.getNumberAttribute('terminate_instance_num');
  }

  // total_instance_num - computed: true, optional: false, required: false
  public get totalInstanceNum() {
    return this.getNumberAttribute('total_instance_num');
  }

  // total_instance_run_num - computed: true, optional: false, required: false
  public get totalInstanceRunNum() {
    return this.getNumberAttribute('total_instance_run_num');
  }
}

export class DataHuaweicloudSecmasterPlaybookMonitorsDataList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterPlaybookMonitorsDataOutputReference {
    return new DataHuaweicloudSecmasterPlaybookMonitorsDataOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors huaweicloud_secmaster_playbook_monitors}
*/
export class DataHuaweicloudSecmasterPlaybookMonitors extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_playbook_monitors";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudSecmasterPlaybookMonitors resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudSecmasterPlaybookMonitors to import
  * @param importFromId The id of the existing DataHuaweicloudSecmasterPlaybookMonitors that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudSecmasterPlaybookMonitors to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_playbook_monitors", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_monitors huaweicloud_secmaster_playbook_monitors} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudSecmasterPlaybookMonitorsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudSecmasterPlaybookMonitorsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_playbook_monitors',
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
    this._endTime = config.endTime;
    this._id = config.id;
    this._playbookId = config.playbookId;
    this._region = config.region;
    this._startTime = config.startTime;
    this._versionQueryType = config.versionQueryType;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // data - computed: true, optional: false, required: false
  private _data = new DataHuaweicloudSecmasterPlaybookMonitorsDataList(this, "data", false);
  public get data() {
    return this._data;
  }

  // end_time - computed: false, optional: false, required: true
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
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

  // playbook_id - computed: false, optional: false, required: true
  private _playbookId?: string; 
  public get playbookId() {
    return this.getStringAttribute('playbook_id');
  }
  public set playbookId(value: string) {
    this._playbookId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get playbookIdInput() {
    return this._playbookId;
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

  // start_time - computed: false, optional: false, required: true
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }

  // version_query_type - computed: false, optional: false, required: true
  private _versionQueryType?: string; 
  public get versionQueryType() {
    return this.getStringAttribute('version_query_type');
  }
  public set versionQueryType(value: string) {
    this._versionQueryType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionQueryTypeInput() {
    return this._versionQueryType;
  }

  // workspace_id - computed: false, optional: false, required: true
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      end_time: cdktf.stringToTerraform(this._endTime),
      id: cdktf.stringToTerraform(this._id),
      playbook_id: cdktf.stringToTerraform(this._playbookId),
      region: cdktf.stringToTerraform(this._region),
      start_time: cdktf.stringToTerraform(this._startTime),
      version_query_type: cdktf.stringToTerraform(this._versionQueryType),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      end_time: {
        value: cdktf.stringToHclTerraform(this._endTime),
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
      playbook_id: {
        value: cdktf.stringToHclTerraform(this._playbookId),
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
      start_time: {
        value: cdktf.stringToHclTerraform(this._startTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      version_query_type: {
        value: cdktf.stringToHclTerraform(this._versionQueryType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

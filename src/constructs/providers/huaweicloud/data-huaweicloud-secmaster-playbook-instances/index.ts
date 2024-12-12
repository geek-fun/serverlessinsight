// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudSecmasterPlaybookInstancesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the data class name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#data_class_name DataHuaweicloudSecmasterPlaybookInstances#data_class_name}
  */
  readonly dataClassName?: string;
  /**
  * Specifies the data object name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#data_object_name DataHuaweicloudSecmasterPlaybookInstances#data_object_name}
  */
  readonly dataObjectName?: string;
  /**
  * Specifies the search start time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#from_date DataHuaweicloudSecmasterPlaybookInstances#from_date}
  */
  readonly fromDate?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#id DataHuaweicloudSecmasterPlaybookInstances#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#region DataHuaweicloudSecmasterPlaybookInstances#region}
  */
  readonly region?: string;
  /**
  * Specifies the playbook instance status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#status DataHuaweicloudSecmasterPlaybookInstances#status}
  */
  readonly status?: string;
  /**
  * Specifies the search end time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#to_date DataHuaweicloudSecmasterPlaybookInstances#to_date}
  */
  readonly toDate?: string;
  /**
  * Specifies the triggering type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#trigger_type DataHuaweicloudSecmasterPlaybookInstances#trigger_type}
  */
  readonly triggerType?: string;
  /**
  * Specifies the workspace ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#workspace_id DataHuaweicloudSecmasterPlaybookInstances#workspace_id}
  */
  readonly workspaceId: string;
}
export interface DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClass {
}

export function dataHuaweicloudSecmasterPlaybookInstancesInstancesDataClassToTerraform(struct?: DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClass): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterPlaybookInstancesInstancesDataClassToHclTerraform(struct?: DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClass): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClassOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClass | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClass | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }
}

export class DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClassList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClassOutputReference {
    return new DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClassOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObject {
}

export function dataHuaweicloudSecmasterPlaybookInstancesInstancesDataObjectToTerraform(struct?: DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObject): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterPlaybookInstancesInstancesDataObjectToHclTerraform(struct?: DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObject): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObjectOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObject | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObject | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // content - computed: true, optional: false, required: false
  public get content() {
    return this.getStringAttribute('content');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // data_class_id - computed: true, optional: false, required: false
  public get dataClassId() {
    return this.getStringAttribute('data_class_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObjectList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObjectOutputReference {
    return new DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObjectOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybook {
}

export function dataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybookToTerraform(struct?: DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybook): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybookToHclTerraform(struct?: DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybook): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybookOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybook | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybook | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getStringAttribute('version');
  }

  // version_id - computed: true, optional: false, required: false
  public get versionId() {
    return this.getStringAttribute('version_id');
  }
}

export class DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybookList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybookOutputReference {
    return new DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybookOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterPlaybookInstancesInstances {
}

export function dataHuaweicloudSecmasterPlaybookInstancesInstancesToTerraform(struct?: DataHuaweicloudSecmasterPlaybookInstancesInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterPlaybookInstancesInstancesToHclTerraform(struct?: DataHuaweicloudSecmasterPlaybookInstancesInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterPlaybookInstancesInstancesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterPlaybookInstancesInstances | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterPlaybookInstancesInstances | undefined) {
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

  // data_class - computed: true, optional: false, required: false
  private _dataClass = new DataHuaweicloudSecmasterPlaybookInstancesInstancesDataClassList(this, "data_class", false);
  public get dataClass() {
    return this._dataClass;
  }

  // data_object - computed: true, optional: false, required: false
  private _dataObject = new DataHuaweicloudSecmasterPlaybookInstancesInstancesDataObjectList(this, "data_object", false);
  public get dataObject() {
    return this._dataObject;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // playbook - computed: true, optional: false, required: false
  private _playbook = new DataHuaweicloudSecmasterPlaybookInstancesInstancesPlaybookList(this, "playbook", false);
  public get playbook() {
    return this._playbook;
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // trigger_type - computed: true, optional: false, required: false
  public get triggerType() {
    return this.getStringAttribute('trigger_type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudSecmasterPlaybookInstancesInstancesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterPlaybookInstancesInstancesOutputReference {
    return new DataHuaweicloudSecmasterPlaybookInstancesInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances huaweicloud_secmaster_playbook_instances}
*/
export class DataHuaweicloudSecmasterPlaybookInstances extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_playbook_instances";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudSecmasterPlaybookInstances resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudSecmasterPlaybookInstances to import
  * @param importFromId The id of the existing DataHuaweicloudSecmasterPlaybookInstances that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudSecmasterPlaybookInstances to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_playbook_instances", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_playbook_instances huaweicloud_secmaster_playbook_instances} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudSecmasterPlaybookInstancesConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudSecmasterPlaybookInstancesConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_playbook_instances',
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
    this._dataClassName = config.dataClassName;
    this._dataObjectName = config.dataObjectName;
    this._fromDate = config.fromDate;
    this._id = config.id;
    this._region = config.region;
    this._status = config.status;
    this._toDate = config.toDate;
    this._triggerType = config.triggerType;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // data_class_name - computed: false, optional: true, required: false
  private _dataClassName?: string; 
  public get dataClassName() {
    return this.getStringAttribute('data_class_name');
  }
  public set dataClassName(value: string) {
    this._dataClassName = value;
  }
  public resetDataClassName() {
    this._dataClassName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataClassNameInput() {
    return this._dataClassName;
  }

  // data_object_name - computed: false, optional: true, required: false
  private _dataObjectName?: string; 
  public get dataObjectName() {
    return this.getStringAttribute('data_object_name');
  }
  public set dataObjectName(value: string) {
    this._dataObjectName = value;
  }
  public resetDataObjectName() {
    this._dataObjectName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataObjectNameInput() {
    return this._dataObjectName;
  }

  // from_date - computed: false, optional: true, required: false
  private _fromDate?: string; 
  public get fromDate() {
    return this.getStringAttribute('from_date');
  }
  public set fromDate(value: string) {
    this._fromDate = value;
  }
  public resetFromDate() {
    this._fromDate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fromDateInput() {
    return this._fromDate;
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

  // instances - computed: true, optional: false, required: false
  private _instances = new DataHuaweicloudSecmasterPlaybookInstancesInstancesList(this, "instances", false);
  public get instances() {
    return this._instances;
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

  // to_date - computed: false, optional: true, required: false
  private _toDate?: string; 
  public get toDate() {
    return this.getStringAttribute('to_date');
  }
  public set toDate(value: string) {
    this._toDate = value;
  }
  public resetToDate() {
    this._toDate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get toDateInput() {
    return this._toDate;
  }

  // trigger_type - computed: false, optional: true, required: false
  private _triggerType?: string; 
  public get triggerType() {
    return this.getStringAttribute('trigger_type');
  }
  public set triggerType(value: string) {
    this._triggerType = value;
  }
  public resetTriggerType() {
    this._triggerType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerTypeInput() {
    return this._triggerType;
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
      data_class_name: cdktf.stringToTerraform(this._dataClassName),
      data_object_name: cdktf.stringToTerraform(this._dataObjectName),
      from_date: cdktf.stringToTerraform(this._fromDate),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.stringToTerraform(this._status),
      to_date: cdktf.stringToTerraform(this._toDate),
      trigger_type: cdktf.stringToTerraform(this._triggerType),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      data_class_name: {
        value: cdktf.stringToHclTerraform(this._dataClassName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_object_name: {
        value: cdktf.stringToHclTerraform(this._dataObjectName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      from_date: {
        value: cdktf.stringToHclTerraform(this._fromDate),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
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
      to_date: {
        value: cdktf.stringToHclTerraform(this._toDate),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      trigger_type: {
        value: cdktf.stringToHclTerraform(this._triggerType),
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

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudSecmasterIndicatorsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the data class ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#data_class_id DataHuaweicloudSecmasterIndicators#data_class_id}
  */
  readonly dataClassId?: string;
  /**
  * Specifies the search start time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#from_date DataHuaweicloudSecmasterIndicators#from_date}
  */
  readonly fromDate?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#id DataHuaweicloudSecmasterIndicators#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the indicator IDs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#ids DataHuaweicloudSecmasterIndicators#ids}
  */
  readonly ids?: string[];
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#region DataHuaweicloudSecmasterIndicators#region}
  */
  readonly region?: string;
  /**
  * Specifies the search end time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#to_date DataHuaweicloudSecmasterIndicators#to_date}
  */
  readonly toDate?: string;
  /**
  * Specifies the ID of the workspace to which the indicator belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#workspace_id DataHuaweicloudSecmasterIndicators#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * condition block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#condition DataHuaweicloudSecmasterIndicators#condition}
  */
  readonly condition?: DataHuaweicloudSecmasterIndicatorsCondition;
}
export interface DataHuaweicloudSecmasterIndicatorsIndicatorsDataSource {
}

export function dataHuaweicloudSecmasterIndicatorsIndicatorsDataSourceToTerraform(struct?: DataHuaweicloudSecmasterIndicatorsIndicatorsDataSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterIndicatorsIndicatorsDataSourceToHclTerraform(struct?: DataHuaweicloudSecmasterIndicatorsIndicatorsDataSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterIndicatorsIndicatorsDataSourceOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterIndicatorsIndicatorsDataSource | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterIndicatorsIndicatorsDataSource | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // domain_id - computed: true, optional: false, required: false
  public get domainId() {
    return this.getStringAttribute('domain_id');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // region_id - computed: true, optional: false, required: false
  public get regionId() {
    return this.getStringAttribute('region_id');
  }

  // source_type - computed: true, optional: false, required: false
  public get sourceType() {
    return this.getNumberAttribute('source_type');
  }
}

export class DataHuaweicloudSecmasterIndicatorsIndicatorsDataSourceList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterIndicatorsIndicatorsDataSourceOutputReference {
    return new DataHuaweicloudSecmasterIndicatorsIndicatorsDataSourceOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironment {
}

export function dataHuaweicloudSecmasterIndicatorsIndicatorsEnvironmentToTerraform(struct?: DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironment): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterIndicatorsIndicatorsEnvironmentToHclTerraform(struct?: DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironment): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironmentOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironment | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironment | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // domain_id - computed: true, optional: false, required: false
  public get domainId() {
    return this.getStringAttribute('domain_id');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // region_id - computed: true, optional: false, required: false
  public get regionId() {
    return this.getStringAttribute('region_id');
  }

  // vendor_type - computed: true, optional: false, required: false
  public get vendorType() {
    return this.getStringAttribute('vendor_type');
  }
}

export class DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironmentList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironmentOutputReference {
    return new DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironmentOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterIndicatorsIndicatorsType {
}

export function dataHuaweicloudSecmasterIndicatorsIndicatorsTypeToTerraform(struct?: DataHuaweicloudSecmasterIndicatorsIndicatorsType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterIndicatorsIndicatorsTypeToHclTerraform(struct?: DataHuaweicloudSecmasterIndicatorsIndicatorsType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterIndicatorsIndicatorsTypeOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterIndicatorsIndicatorsType | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterIndicatorsIndicatorsType | undefined) {
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

  // indicator_type - computed: true, optional: false, required: false
  public get indicatorType() {
    return this.getStringAttribute('indicator_type');
  }
}

export class DataHuaweicloudSecmasterIndicatorsIndicatorsTypeList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterIndicatorsIndicatorsTypeOutputReference {
    return new DataHuaweicloudSecmasterIndicatorsIndicatorsTypeOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterIndicatorsIndicators {
}

export function dataHuaweicloudSecmasterIndicatorsIndicatorsToTerraform(struct?: DataHuaweicloudSecmasterIndicatorsIndicators): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterIndicatorsIndicatorsToHclTerraform(struct?: DataHuaweicloudSecmasterIndicatorsIndicators): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterIndicatorsIndicatorsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterIndicatorsIndicators | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterIndicatorsIndicators | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // confidence - computed: true, optional: false, required: false
  public get confidence() {
    return this.getNumberAttribute('confidence');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // data_class_id - computed: true, optional: false, required: false
  public get dataClassId() {
    return this.getStringAttribute('data_class_id');
  }

  // data_source - computed: true, optional: false, required: false
  private _dataSource = new DataHuaweicloudSecmasterIndicatorsIndicatorsDataSourceList(this, "data_source", false);
  public get dataSource() {
    return this._dataSource;
  }

  // environment - computed: true, optional: false, required: false
  private _environment = new DataHuaweicloudSecmasterIndicatorsIndicatorsEnvironmentList(this, "environment", false);
  public get environment() {
    return this._environment;
  }

  // first_occurrence_time - computed: true, optional: false, required: false
  public get firstOccurrenceTime() {
    return this.getStringAttribute('first_occurrence_time');
  }

  // granularity - computed: true, optional: false, required: false
  public get granularity() {
    return this.getNumberAttribute('granularity');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_deleted - computed: true, optional: false, required: false
  public get isDeleted() {
    return this.getBooleanAttribute('is_deleted');
  }

  // last_occurrence_time - computed: true, optional: false, required: false
  public get lastOccurrenceTime() {
    return this.getStringAttribute('last_occurrence_time');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // revoked - computed: true, optional: false, required: false
  public get revoked() {
    return this.getBooleanAttribute('revoked');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // threat_degree - computed: true, optional: false, required: false
  public get threatDegree() {
    return this.getStringAttribute('threat_degree');
  }

  // type - computed: true, optional: false, required: false
  private _type = new DataHuaweicloudSecmasterIndicatorsIndicatorsTypeList(this, "type", false);
  public get type() {
    return this._type;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // value - computed: true, optional: false, required: false
  public get value() {
    return this.getStringAttribute('value');
  }

  // workspace_id - computed: true, optional: false, required: false
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
}

export class DataHuaweicloudSecmasterIndicatorsIndicatorsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterIndicatorsIndicatorsOutputReference {
    return new DataHuaweicloudSecmasterIndicatorsIndicatorsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterIndicatorsConditionConditions {
  /**
  * Specifies the expression content.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#data DataHuaweicloudSecmasterIndicators#data}
  */
  readonly data?: string[];
  /**
  * Specifies the expression name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#name DataHuaweicloudSecmasterIndicators#name}
  */
  readonly name?: string;
}

export function dataHuaweicloudSecmasterIndicatorsConditionConditionsToTerraform(struct?: DataHuaweicloudSecmasterIndicatorsConditionConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    data: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.data),
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function dataHuaweicloudSecmasterIndicatorsConditionConditionsToHclTerraform(struct?: DataHuaweicloudSecmasterIndicatorsConditionConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    data: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.data),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataHuaweicloudSecmasterIndicatorsConditionConditionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudSecmasterIndicatorsConditionConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._data !== undefined) {
      hasAnyValues = true;
      internalValueResult.data = this._data;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterIndicatorsConditionConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._data = undefined;
      this._name = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._data = value.data;
      this._name = value.name;
    }
  }

  // data - computed: false, optional: true, required: false
  private _data?: string[]; 
  public get data() {
    return this.getListAttribute('data');
  }
  public set data(value: string[]) {
    this._data = value;
  }
  public resetData() {
    this._data = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataInput() {
    return this._data;
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
}

export class DataHuaweicloudSecmasterIndicatorsConditionConditionsList extends cdktf.ComplexList {
  public internalValue? : DataHuaweicloudSecmasterIndicatorsConditionConditions[] | cdktf.IResolvable

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
  public get(index: number): DataHuaweicloudSecmasterIndicatorsConditionConditionsOutputReference {
    return new DataHuaweicloudSecmasterIndicatorsConditionConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterIndicatorsCondition {
  /**
  * Specifies the expression logic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#logics DataHuaweicloudSecmasterIndicators#logics}
  */
  readonly logics?: string[];
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#conditions DataHuaweicloudSecmasterIndicators#conditions}
  */
  readonly conditions?: DataHuaweicloudSecmasterIndicatorsConditionConditions[] | cdktf.IResolvable;
}

export function dataHuaweicloudSecmasterIndicatorsConditionToTerraform(struct?: DataHuaweicloudSecmasterIndicatorsConditionOutputReference | DataHuaweicloudSecmasterIndicatorsCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    logics: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.logics),
    conditions: cdktf.listMapper(dataHuaweicloudSecmasterIndicatorsConditionConditionsToTerraform, true)(struct!.conditions),
  }
}


export function dataHuaweicloudSecmasterIndicatorsConditionToHclTerraform(struct?: DataHuaweicloudSecmasterIndicatorsConditionOutputReference | DataHuaweicloudSecmasterIndicatorsCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    logics: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.logics),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    conditions: {
      value: cdktf.listMapperHcl(dataHuaweicloudSecmasterIndicatorsConditionConditionsToHclTerraform, true)(struct!.conditions),
      isBlock: true,
      type: "list",
      storageClassType: "DataHuaweicloudSecmasterIndicatorsConditionConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataHuaweicloudSecmasterIndicatorsConditionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataHuaweicloudSecmasterIndicatorsCondition | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._logics !== undefined) {
      hasAnyValues = true;
      internalValueResult.logics = this._logics;
    }
    if (this._conditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.conditions = this._conditions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterIndicatorsCondition | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._logics = undefined;
      this._conditions.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._logics = value.logics;
      this._conditions.internalValue = value.conditions;
    }
  }

  // logics - computed: false, optional: true, required: false
  private _logics?: string[]; 
  public get logics() {
    return this.getListAttribute('logics');
  }
  public set logics(value: string[]) {
    this._logics = value;
  }
  public resetLogics() {
    this._logics = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logicsInput() {
    return this._logics;
  }

  // conditions - computed: false, optional: true, required: false
  private _conditions = new DataHuaweicloudSecmasterIndicatorsConditionConditionsList(this, "conditions", false);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: DataHuaweicloudSecmasterIndicatorsConditionConditions[] | cdktf.IResolvable) {
    this._conditions.internalValue = value;
  }
  public resetConditions() {
    this._conditions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionsInput() {
    return this._conditions.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators huaweicloud_secmaster_indicators}
*/
export class DataHuaweicloudSecmasterIndicators extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_indicators";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudSecmasterIndicators resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudSecmasterIndicators to import
  * @param importFromId The id of the existing DataHuaweicloudSecmasterIndicators that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudSecmasterIndicators to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_indicators", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_indicators huaweicloud_secmaster_indicators} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudSecmasterIndicatorsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudSecmasterIndicatorsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_indicators',
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
    this._dataClassId = config.dataClassId;
    this._fromDate = config.fromDate;
    this._id = config.id;
    this._ids = config.ids;
    this._region = config.region;
    this._toDate = config.toDate;
    this._workspaceId = config.workspaceId;
    this._condition.internalValue = config.condition;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // data_class_id - computed: false, optional: true, required: false
  private _dataClassId?: string; 
  public get dataClassId() {
    return this.getStringAttribute('data_class_id');
  }
  public set dataClassId(value: string) {
    this._dataClassId = value;
  }
  public resetDataClassId() {
    this._dataClassId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataClassIdInput() {
    return this._dataClassId;
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

  // ids - computed: false, optional: true, required: false
  private _ids?: string[]; 
  public get ids() {
    return this.getListAttribute('ids');
  }
  public set ids(value: string[]) {
    this._ids = value;
  }
  public resetIds() {
    this._ids = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idsInput() {
    return this._ids;
  }

  // indicators - computed: true, optional: false, required: false
  private _indicators = new DataHuaweicloudSecmasterIndicatorsIndicatorsList(this, "indicators", false);
  public get indicators() {
    return this._indicators;
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

  // condition - computed: false, optional: true, required: false
  private _condition = new DataHuaweicloudSecmasterIndicatorsConditionOutputReference(this, "condition");
  public get condition() {
    return this._condition;
  }
  public putCondition(value: DataHuaweicloudSecmasterIndicatorsCondition) {
    this._condition.internalValue = value;
  }
  public resetCondition() {
    this._condition.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionInput() {
    return this._condition.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      data_class_id: cdktf.stringToTerraform(this._dataClassId),
      from_date: cdktf.stringToTerraform(this._fromDate),
      id: cdktf.stringToTerraform(this._id),
      ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._ids),
      region: cdktf.stringToTerraform(this._region),
      to_date: cdktf.stringToTerraform(this._toDate),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      condition: dataHuaweicloudSecmasterIndicatorsConditionToTerraform(this._condition.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      data_class_id: {
        value: cdktf.stringToHclTerraform(this._dataClassId),
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
      ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._ids),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
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
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      condition: {
        value: dataHuaweicloudSecmasterIndicatorsConditionToHclTerraform(this._condition.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataHuaweicloudSecmasterIndicatorsConditionList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

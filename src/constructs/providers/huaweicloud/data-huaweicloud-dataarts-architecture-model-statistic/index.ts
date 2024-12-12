// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_model_statistic
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDataartsArchitectureModelStatisticConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_model_statistic#id DataHuaweicloudDataartsArchitectureModelStatistic#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The region in which to query model statistic information.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_model_statistic#region DataHuaweicloudDataartsArchitectureModelStatistic#region}
  */
  readonly region?: string;
  /**
  * The ID of the workspace in which to query model statistic information.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_model_statistic#workspace_id DataHuaweicloudDataartsArchitectureModelStatistic#workspace_id}
  */
  readonly workspaceId: string;
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticDmModel {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticDmModelToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticDmModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticDmModelToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticDmModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticDmModelOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticDmModel | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticDmModel | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_catalog_ids - computed: true, optional: false, required: false
  public get bizCatalogIds() {
    return this.getStringAttribute('biz_catalog_ids');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // databases - computed: true, optional: false, required: false
  public get databases() {
    return this.getListAttribute('databases');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // dw_type - computed: true, optional: false, required: false
  public get dwType() {
    return this.getStringAttribute('dw_type');
  }

  // frequent - computed: true, optional: false, required: false
  public get frequent() {
    return this.getBooleanAttribute('frequent');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_physical - computed: true, optional: false, required: false
  public get isPhysical() {
    return this.getBooleanAttribute('is_physical');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // table_model_prefix - computed: true, optional: false, required: false
  public get tableModelPrefix() {
    return this.getStringAttribute('table_model_prefix');
  }

  // top - computed: true, optional: false, required: false
  public get top() {
    return this.getBooleanAttribute('top');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticDmModelList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticDmModelOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticDmModelOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticDm {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticDmToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticDm): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticDmToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticDm): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticDmOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticDm | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticDm | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_type - computed: true, optional: false, required: false
  public get bizType() {
    return this.getStringAttribute('biz_type');
  }

  // db - computed: true, optional: false, required: false
  public get db() {
    return this.getNumberAttribute('db');
  }

  // fd - computed: true, optional: false, required: false
  public get fd() {
    return this.getNumberAttribute('fd');
  }

  // fd_published - computed: true, optional: false, required: false
  public get fdPublished() {
    return this.getNumberAttribute('fd_published');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // model - computed: true, optional: false, required: false
  private _model = new DataHuaweicloudDataartsArchitectureModelStatisticDmModelList(this, "model", false);
  public get model() {
    return this._model;
  }

  // st - computed: true, optional: false, required: false
  public get st() {
    return this.getNumberAttribute('st');
  }

  // st_published - computed: true, optional: false, required: false
  public get stPublished() {
    return this.getNumberAttribute('st_published');
  }

  // tb - computed: true, optional: false, required: false
  public get tb() {
    return this.getNumberAttribute('tb');
  }

  // tb_published - computed: true, optional: false, required: false
  public get tbPublished() {
    return this.getNumberAttribute('tb_published');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticDmList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticDmOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticDmOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticDwrModel {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticDwrModelToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticDwrModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticDwrModelToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticDwrModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticDwrModelOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticDwrModel | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticDwrModel | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_catalog_ids - computed: true, optional: false, required: false
  public get bizCatalogIds() {
    return this.getStringAttribute('biz_catalog_ids');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // databases - computed: true, optional: false, required: false
  public get databases() {
    return this.getListAttribute('databases');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // dw_type - computed: true, optional: false, required: false
  public get dwType() {
    return this.getStringAttribute('dw_type');
  }

  // frequent - computed: true, optional: false, required: false
  public get frequent() {
    return this.getBooleanAttribute('frequent');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_physical - computed: true, optional: false, required: false
  public get isPhysical() {
    return this.getBooleanAttribute('is_physical');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // table_model_prefix - computed: true, optional: false, required: false
  public get tableModelPrefix() {
    return this.getStringAttribute('table_model_prefix');
  }

  // top - computed: true, optional: false, required: false
  public get top() {
    return this.getBooleanAttribute('top');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticDwrModelList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticDwrModelOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticDwrModelOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticDwr {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticDwrToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticDwr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticDwrToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticDwr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticDwrOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticDwr | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticDwr | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_type - computed: true, optional: false, required: false
  public get bizType() {
    return this.getStringAttribute('biz_type');
  }

  // db - computed: true, optional: false, required: false
  public get db() {
    return this.getNumberAttribute('db');
  }

  // fd - computed: true, optional: false, required: false
  public get fd() {
    return this.getNumberAttribute('fd');
  }

  // fd_published - computed: true, optional: false, required: false
  public get fdPublished() {
    return this.getNumberAttribute('fd_published');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // model - computed: true, optional: false, required: false
  private _model = new DataHuaweicloudDataartsArchitectureModelStatisticDwrModelList(this, "model", false);
  public get model() {
    return this._model;
  }

  // st - computed: true, optional: false, required: false
  public get st() {
    return this.getNumberAttribute('st');
  }

  // st_published - computed: true, optional: false, required: false
  public get stPublished() {
    return this.getNumberAttribute('st_published');
  }

  // tb - computed: true, optional: false, required: false
  public get tb() {
    return this.getNumberAttribute('tb');
  }

  // tb_published - computed: true, optional: false, required: false
  public get tbPublished() {
    return this.getNumberAttribute('tb_published');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticDwrList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticDwrOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticDwrOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticFrequentModel {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticFrequentModelToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticFrequentModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticFrequentModelToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticFrequentModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticFrequentModelOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticFrequentModel | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticFrequentModel | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_catalog_ids - computed: true, optional: false, required: false
  public get bizCatalogIds() {
    return this.getStringAttribute('biz_catalog_ids');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // databases - computed: true, optional: false, required: false
  public get databases() {
    return this.getListAttribute('databases');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // dw_type - computed: true, optional: false, required: false
  public get dwType() {
    return this.getStringAttribute('dw_type');
  }

  // frequent - computed: true, optional: false, required: false
  public get frequent() {
    return this.getBooleanAttribute('frequent');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_physical - computed: true, optional: false, required: false
  public get isPhysical() {
    return this.getBooleanAttribute('is_physical');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // table_model_prefix - computed: true, optional: false, required: false
  public get tableModelPrefix() {
    return this.getStringAttribute('table_model_prefix');
  }

  // top - computed: true, optional: false, required: false
  public get top() {
    return this.getBooleanAttribute('top');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticFrequentModelList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticFrequentModelOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticFrequentModelOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticFrequent {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticFrequentToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticFrequent): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticFrequentToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticFrequent): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticFrequentOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticFrequent | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticFrequent | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_type - computed: true, optional: false, required: false
  public get bizType() {
    return this.getStringAttribute('biz_type');
  }

  // db - computed: true, optional: false, required: false
  public get db() {
    return this.getNumberAttribute('db');
  }

  // fd - computed: true, optional: false, required: false
  public get fd() {
    return this.getNumberAttribute('fd');
  }

  // fd_published - computed: true, optional: false, required: false
  public get fdPublished() {
    return this.getNumberAttribute('fd_published');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // model - computed: true, optional: false, required: false
  private _model = new DataHuaweicloudDataartsArchitectureModelStatisticFrequentModelList(this, "model", false);
  public get model() {
    return this._model;
  }

  // st - computed: true, optional: false, required: false
  public get st() {
    return this.getNumberAttribute('st');
  }

  // st_published - computed: true, optional: false, required: false
  public get stPublished() {
    return this.getNumberAttribute('st_published');
  }

  // tb - computed: true, optional: false, required: false
  public get tb() {
    return this.getNumberAttribute('tb');
  }

  // tb_published - computed: true, optional: false, required: false
  public get tbPublished() {
    return this.getNumberAttribute('tb_published');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticFrequentList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticFrequentOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticFrequentOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticLogicsModel {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticLogicsModelToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticLogicsModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticLogicsModelToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticLogicsModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticLogicsModelOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticLogicsModel | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticLogicsModel | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_catalog_ids - computed: true, optional: false, required: false
  public get bizCatalogIds() {
    return this.getStringAttribute('biz_catalog_ids');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // databases - computed: true, optional: false, required: false
  public get databases() {
    return this.getListAttribute('databases');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // dw_type - computed: true, optional: false, required: false
  public get dwType() {
    return this.getStringAttribute('dw_type');
  }

  // frequent - computed: true, optional: false, required: false
  public get frequent() {
    return this.getBooleanAttribute('frequent');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_physical - computed: true, optional: false, required: false
  public get isPhysical() {
    return this.getBooleanAttribute('is_physical');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // table_model_prefix - computed: true, optional: false, required: false
  public get tableModelPrefix() {
    return this.getStringAttribute('table_model_prefix');
  }

  // top - computed: true, optional: false, required: false
  public get top() {
    return this.getBooleanAttribute('top');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticLogicsModelList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticLogicsModelOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticLogicsModelOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticLogics {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticLogicsToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticLogics): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticLogicsToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticLogics): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticLogicsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticLogics | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticLogics | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_type - computed: true, optional: false, required: false
  public get bizType() {
    return this.getStringAttribute('biz_type');
  }

  // db - computed: true, optional: false, required: false
  public get db() {
    return this.getNumberAttribute('db');
  }

  // fd - computed: true, optional: false, required: false
  public get fd() {
    return this.getNumberAttribute('fd');
  }

  // fd_published - computed: true, optional: false, required: false
  public get fdPublished() {
    return this.getNumberAttribute('fd_published');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // model - computed: true, optional: false, required: false
  private _model = new DataHuaweicloudDataartsArchitectureModelStatisticLogicsModelList(this, "model", false);
  public get model() {
    return this._model;
  }

  // st - computed: true, optional: false, required: false
  public get st() {
    return this.getNumberAttribute('st');
  }

  // st_published - computed: true, optional: false, required: false
  public get stPublished() {
    return this.getNumberAttribute('st_published');
  }

  // tb - computed: true, optional: false, required: false
  public get tb() {
    return this.getNumberAttribute('tb');
  }

  // tb_published - computed: true, optional: false, required: false
  public get tbPublished() {
    return this.getNumberAttribute('tb_published');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticLogicsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticLogicsOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticLogicsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModel {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModelToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModelToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModelOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModel | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModel | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_catalog_ids - computed: true, optional: false, required: false
  public get bizCatalogIds() {
    return this.getStringAttribute('biz_catalog_ids');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // databases - computed: true, optional: false, required: false
  public get databases() {
    return this.getListAttribute('databases');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // dw_type - computed: true, optional: false, required: false
  public get dwType() {
    return this.getStringAttribute('dw_type');
  }

  // frequent - computed: true, optional: false, required: false
  public get frequent() {
    return this.getBooleanAttribute('frequent');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_physical - computed: true, optional: false, required: false
  public get isPhysical() {
    return this.getBooleanAttribute('is_physical');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // table_model_prefix - computed: true, optional: false, required: false
  public get tableModelPrefix() {
    return this.getStringAttribute('table_model_prefix');
  }

  // top - computed: true, optional: false, required: false
  public get top() {
    return this.getBooleanAttribute('top');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModelList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModelOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModelOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticPhysicals {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticPhysicalsToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticPhysicals): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticPhysicalsToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticPhysicals): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticPhysicals | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticPhysicals | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_type - computed: true, optional: false, required: false
  public get bizType() {
    return this.getStringAttribute('biz_type');
  }

  // db - computed: true, optional: false, required: false
  public get db() {
    return this.getNumberAttribute('db');
  }

  // fd - computed: true, optional: false, required: false
  public get fd() {
    return this.getNumberAttribute('fd');
  }

  // fd_published - computed: true, optional: false, required: false
  public get fdPublished() {
    return this.getNumberAttribute('fd_published');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // model - computed: true, optional: false, required: false
  private _model = new DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsModelList(this, "model", false);
  public get model() {
    return this._model;
  }

  // st - computed: true, optional: false, required: false
  public get st() {
    return this.getNumberAttribute('st');
  }

  // st_published - computed: true, optional: false, required: false
  public get stPublished() {
    return this.getNumberAttribute('st_published');
  }

  // tb - computed: true, optional: false, required: false
  public get tb() {
    return this.getNumberAttribute('tb');
  }

  // tb_published - computed: true, optional: false, required: false
  public get tbPublished() {
    return this.getNumberAttribute('tb_published');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticTopsModel {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticTopsModelToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticTopsModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticTopsModelToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticTopsModel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticTopsModelOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticTopsModel | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticTopsModel | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_catalog_ids - computed: true, optional: false, required: false
  public get bizCatalogIds() {
    return this.getStringAttribute('biz_catalog_ids');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // databases - computed: true, optional: false, required: false
  public get databases() {
    return this.getListAttribute('databases');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // dw_type - computed: true, optional: false, required: false
  public get dwType() {
    return this.getStringAttribute('dw_type');
  }

  // frequent - computed: true, optional: false, required: false
  public get frequent() {
    return this.getBooleanAttribute('frequent');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_physical - computed: true, optional: false, required: false
  public get isPhysical() {
    return this.getBooleanAttribute('is_physical');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // table_model_prefix - computed: true, optional: false, required: false
  public get tableModelPrefix() {
    return this.getStringAttribute('table_model_prefix');
  }

  // top - computed: true, optional: false, required: false
  public get top() {
    return this.getBooleanAttribute('top');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticTopsModelList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticTopsModelOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticTopsModelOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureModelStatisticTops {
}

export function dataHuaweicloudDataartsArchitectureModelStatisticTopsToTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticTops): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureModelStatisticTopsToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureModelStatisticTops): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureModelStatisticTopsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureModelStatisticTops | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureModelStatisticTops | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // biz_type - computed: true, optional: false, required: false
  public get bizType() {
    return this.getStringAttribute('biz_type');
  }

  // db - computed: true, optional: false, required: false
  public get db() {
    return this.getNumberAttribute('db');
  }

  // fd - computed: true, optional: false, required: false
  public get fd() {
    return this.getNumberAttribute('fd');
  }

  // fd_published - computed: true, optional: false, required: false
  public get fdPublished() {
    return this.getNumberAttribute('fd_published');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // model - computed: true, optional: false, required: false
  private _model = new DataHuaweicloudDataartsArchitectureModelStatisticTopsModelList(this, "model", false);
  public get model() {
    return this._model;
  }

  // st - computed: true, optional: false, required: false
  public get st() {
    return this.getNumberAttribute('st');
  }

  // st_published - computed: true, optional: false, required: false
  public get stPublished() {
    return this.getNumberAttribute('st_published');
  }

  // tb - computed: true, optional: false, required: false
  public get tb() {
    return this.getNumberAttribute('tb');
  }

  // tb_published - computed: true, optional: false, required: false
  public get tbPublished() {
    return this.getNumberAttribute('tb_published');
  }
}

export class DataHuaweicloudDataartsArchitectureModelStatisticTopsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureModelStatisticTopsOutputReference {
    return new DataHuaweicloudDataartsArchitectureModelStatisticTopsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_model_statistic huaweicloud_dataarts_architecture_model_statistic}
*/
export class DataHuaweicloudDataartsArchitectureModelStatistic extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_architecture_model_statistic";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDataartsArchitectureModelStatistic resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDataartsArchitectureModelStatistic to import
  * @param importFromId The id of the existing DataHuaweicloudDataartsArchitectureModelStatistic that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_model_statistic#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDataartsArchitectureModelStatistic to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_architecture_model_statistic", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_model_statistic huaweicloud_dataarts_architecture_model_statistic} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDataartsArchitectureModelStatisticConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDataartsArchitectureModelStatisticConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_architecture_model_statistic',
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
    this._id = config.id;
    this._region = config.region;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // dm - computed: true, optional: false, required: false
  private _dm = new DataHuaweicloudDataartsArchitectureModelStatisticDmList(this, "dm", false);
  public get dm() {
    return this._dm;
  }

  // dwr - computed: true, optional: false, required: false
  private _dwr = new DataHuaweicloudDataartsArchitectureModelStatisticDwrList(this, "dwr", false);
  public get dwr() {
    return this._dwr;
  }

  // frequent - computed: true, optional: false, required: false
  private _frequent = new DataHuaweicloudDataartsArchitectureModelStatisticFrequentList(this, "frequent", false);
  public get frequent() {
    return this._frequent;
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

  // logics - computed: true, optional: false, required: false
  private _logics = new DataHuaweicloudDataartsArchitectureModelStatisticLogicsList(this, "logics", false);
  public get logics() {
    return this._logics;
  }

  // physicals - computed: true, optional: false, required: false
  private _physicals = new DataHuaweicloudDataartsArchitectureModelStatisticPhysicalsList(this, "physicals", false);
  public get physicals() {
    return this._physicals;
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

  // tops - computed: true, optional: false, required: false
  private _tops = new DataHuaweicloudDataartsArchitectureModelStatisticTopsList(this, "tops", false);
  public get tops() {
    return this._tops;
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
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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

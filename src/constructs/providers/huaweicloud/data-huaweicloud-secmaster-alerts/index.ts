// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudSecmasterAlertsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the search start time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#from_date DataHuaweicloudSecmasterAlerts#from_date}
  */
  readonly fromDate?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#id DataHuaweicloudSecmasterAlerts#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#region DataHuaweicloudSecmasterAlerts#region}
  */
  readonly region?: string;
  /**
  * Specifies the search end time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#to_date DataHuaweicloudSecmasterAlerts#to_date}
  */
  readonly toDate?: string;
  /**
  * Specifies the ID of the workspace to which the alert belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#workspace_id DataHuaweicloudSecmasterAlerts#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * condition block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#condition DataHuaweicloudSecmasterAlerts#condition}
  */
  readonly condition?: DataHuaweicloudSecmasterAlertsCondition;
}
export interface DataHuaweicloudSecmasterAlertsAlertsDataSource {
}

export function dataHuaweicloudSecmasterAlertsAlertsDataSourceToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsDataSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsDataSourceToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsDataSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsDataSourceOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsDataSource | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsDataSource | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // product_feature - computed: true, optional: false, required: false
  public get productFeature() {
    return this.getStringAttribute('product_feature');
  }

  // product_name - computed: true, optional: false, required: false
  public get productName() {
    return this.getStringAttribute('product_name');
  }

  // source_type - computed: true, optional: false, required: false
  public get sourceType() {
    return this.getNumberAttribute('source_type');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsDataSourceList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsDataSourceOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsDataSourceOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsEnvironment {
}

export function dataHuaweicloudSecmasterAlertsAlertsEnvironmentToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsEnvironment): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsEnvironmentToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsEnvironment): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsEnvironmentOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsEnvironment | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsEnvironment | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // cross_workspace_id - computed: true, optional: false, required: false
  public get crossWorkspaceId() {
    return this.getStringAttribute('cross_workspace_id');
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

export class DataHuaweicloudSecmasterAlertsAlertsEnvironmentList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsEnvironmentOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsEnvironmentOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsFileInfo {
}

export function dataHuaweicloudSecmasterAlertsAlertsFileInfoToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsFileInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsFileInfoToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsFileInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsFileInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsFileInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsFileInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // file_attr - computed: true, optional: false, required: false
  public get fileAttr() {
    return this.getStringAttribute('file_attr');
  }

  // file_content - computed: true, optional: false, required: false
  public get fileContent() {
    return this.getStringAttribute('file_content');
  }

  // file_hash - computed: true, optional: false, required: false
  public get fileHash() {
    return this.getStringAttribute('file_hash');
  }

  // file_md5 - computed: true, optional: false, required: false
  public get fileMd5() {
    return this.getStringAttribute('file_md5');
  }

  // file_new_path - computed: true, optional: false, required: false
  public get fileNewPath() {
    return this.getStringAttribute('file_new_path');
  }

  // file_path - computed: true, optional: false, required: false
  public get filePath() {
    return this.getStringAttribute('file_path');
  }

  // file_sha256 - computed: true, optional: false, required: false
  public get fileSha256() {
    return this.getStringAttribute('file_sha256');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsFileInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsFileInfoOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsFileInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsMalware {
}

export function dataHuaweicloudSecmasterAlertsAlertsMalwareToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsMalware): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsMalwareToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsMalware): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsMalwareOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsMalware | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsMalware | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // malware_class - computed: true, optional: false, required: false
  public get malwareClass() {
    return this.getStringAttribute('malware_class');
  }

  // malware_family - computed: true, optional: false, required: false
  public get malwareFamily() {
    return this.getStringAttribute('malware_family');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsMalwareList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsMalwareOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsMalwareOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeo {
}

export function dataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeoToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeoToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // city_code - computed: true, optional: false, required: false
  public get cityCode() {
    return this.getStringAttribute('city_code');
  }

  // country_code - computed: true, optional: false, required: false
  public get countryCode() {
    return this.getStringAttribute('country_code');
  }

  // latitude - computed: true, optional: false, required: false
  public get latitude() {
    return this.getNumberAttribute('latitude');
  }

  // longitude - computed: true, optional: false, required: false
  public get longitude() {
    return this.getNumberAttribute('longitude');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeoList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeoOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeo {
}

export function dataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeoToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeoToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // city_code - computed: true, optional: false, required: false
  public get cityCode() {
    return this.getStringAttribute('city_code');
  }

  // country_code - computed: true, optional: false, required: false
  public get countryCode() {
    return this.getStringAttribute('country_code');
  }

  // latitude - computed: true, optional: false, required: false
  public get latitude() {
    return this.getNumberAttribute('latitude');
  }

  // longitude - computed: true, optional: false, required: false
  public get longitude() {
    return this.getNumberAttribute('longitude');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeoList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeoOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsNetworkListStruct {
}

export function dataHuaweicloudSecmasterAlertsAlertsNetworkListStructToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsNetworkListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsNetworkListStructToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsNetworkListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsNetworkListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsNetworkListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsNetworkListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // dest_domain - computed: true, optional: false, required: false
  public get destDomain() {
    return this.getStringAttribute('dest_domain');
  }

  // dest_geo - computed: true, optional: false, required: false
  private _destGeo = new DataHuaweicloudSecmasterAlertsAlertsNetworkListDestGeoList(this, "dest_geo", false);
  public get destGeo() {
    return this._destGeo;
  }

  // dest_ip - computed: true, optional: false, required: false
  public get destIp() {
    return this.getStringAttribute('dest_ip');
  }

  // dest_port - computed: true, optional: false, required: false
  public get destPort() {
    return this.getStringAttribute('dest_port');
  }

  // direction - computed: true, optional: false, required: false
  public get direction() {
    return this.getStringAttribute('direction');
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }

  // src_domain - computed: true, optional: false, required: false
  public get srcDomain() {
    return this.getStringAttribute('src_domain');
  }

  // src_geo - computed: true, optional: false, required: false
  private _srcGeo = new DataHuaweicloudSecmasterAlertsAlertsNetworkListSrcGeoList(this, "src_geo", false);
  public get srcGeo() {
    return this._srcGeo;
  }

  // src_ip - computed: true, optional: false, required: false
  public get srcIp() {
    return this.getStringAttribute('src_ip');
  }

  // src_port - computed: true, optional: false, required: false
  public get srcPort() {
    return this.getStringAttribute('src_port');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsNetworkListStructList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsNetworkListStructOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsNetworkListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsProcess {
}

export function dataHuaweicloudSecmasterAlertsAlertsProcessToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsProcess): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsProcessToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsProcess): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsProcessOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsProcess | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsProcess | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // process_child_cmdline - computed: true, optional: false, required: false
  public get processChildCmdline() {
    return this.getStringAttribute('process_child_cmdline');
  }

  // process_child_name - computed: true, optional: false, required: false
  public get processChildName() {
    return this.getStringAttribute('process_child_name');
  }

  // process_child_path - computed: true, optional: false, required: false
  public get processChildPath() {
    return this.getStringAttribute('process_child_path');
  }

  // process_child_pid - computed: true, optional: false, required: false
  public get processChildPid() {
    return this.getNumberAttribute('process_child_pid');
  }

  // process_child_uid - computed: true, optional: false, required: false
  public get processChildUid() {
    return this.getNumberAttribute('process_child_uid');
  }

  // process_cmdline - computed: true, optional: false, required: false
  public get processCmdline() {
    return this.getStringAttribute('process_cmdline');
  }

  // process_launche_time - computed: true, optional: false, required: false
  public get processLauncheTime() {
    return this.getStringAttribute('process_launche_time');
  }

  // process_name - computed: true, optional: false, required: false
  public get processName() {
    return this.getStringAttribute('process_name');
  }

  // process_parent_cmdline - computed: true, optional: false, required: false
  public get processParentCmdline() {
    return this.getStringAttribute('process_parent_cmdline');
  }

  // process_parent_name - computed: true, optional: false, required: false
  public get processParentName() {
    return this.getStringAttribute('process_parent_name');
  }

  // process_parent_path - computed: true, optional: false, required: false
  public get processParentPath() {
    return this.getStringAttribute('process_parent_path');
  }

  // process_parent_pid - computed: true, optional: false, required: false
  public get processParentPid() {
    return this.getNumberAttribute('process_parent_pid');
  }

  // process_parent_uid - computed: true, optional: false, required: false
  public get processParentUid() {
    return this.getNumberAttribute('process_parent_uid');
  }

  // process_path - computed: true, optional: false, required: false
  public get processPath() {
    return this.getStringAttribute('process_path');
  }

  // process_pid - computed: true, optional: false, required: false
  public get processPid() {
    return this.getNumberAttribute('process_pid');
  }

  // process_terminate_time - computed: true, optional: false, required: false
  public get processTerminateTime() {
    return this.getStringAttribute('process_terminate_time');
  }

  // process_uid - computed: true, optional: false, required: false
  public get processUid() {
    return this.getNumberAttribute('process_uid');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsProcessList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsProcessOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsProcessOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsRemediation {
}

export function dataHuaweicloudSecmasterAlertsAlertsRemediationToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsRemediation): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsRemediationToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsRemediation): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsRemediationOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsRemediation | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsRemediation | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // recommendation - computed: true, optional: false, required: false
  public get recommendation() {
    return this.getStringAttribute('recommendation');
  }

  // url - computed: true, optional: false, required: false
  public get url() {
    return this.getStringAttribute('url');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsRemediationList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsRemediationOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsRemediationOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsResourceListStruct {
}

export function dataHuaweicloudSecmasterAlertsAlertsResourceListStructToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsResourceListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsResourceListStructToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsResourceListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsResourceListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsResourceListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsResourceListStruct | undefined) {
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

  // ep_id - computed: true, optional: false, required: false
  public get epId() {
    return this.getStringAttribute('ep_id');
  }

  // ep_name - computed: true, optional: false, required: false
  public get epName() {
    return this.getStringAttribute('ep_name');
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

  // provider - computed: true, optional: false, required: false
  public get provider() {
    return this.getStringAttribute('provider');
  }

  // region_id - computed: true, optional: false, required: false
  public get regionId() {
    return this.getStringAttribute('region_id');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getStringAttribute('tags');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsResourceListStructList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsResourceListStructOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsResourceListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsType {
}

export function dataHuaweicloudSecmasterAlertsAlertsTypeToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsTypeToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsTypeOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsType | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsType | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // alert_type - computed: true, optional: false, required: false
  public get alertType() {
    return this.getStringAttribute('alert_type');
  }

  // category - computed: true, optional: false, required: false
  public get category() {
    return this.getStringAttribute('category');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsTypeList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsTypeOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsTypeOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlertsUserInfo {
}

export function dataHuaweicloudSecmasterAlertsAlertsUserInfoToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsUserInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsUserInfoToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlertsUserInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsUserInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlertsUserInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlertsUserInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // user_id - computed: true, optional: false, required: false
  public get userId() {
    return this.getStringAttribute('user_id');
  }

  // user_name - computed: true, optional: false, required: false
  public get userName() {
    return this.getStringAttribute('user_name');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsUserInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsUserInfoOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsUserInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsAlerts {
}

export function dataHuaweicloudSecmasterAlertsAlertsToTerraform(struct?: DataHuaweicloudSecmasterAlertsAlerts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterAlertsAlertsToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsAlerts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterAlertsAlertsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsAlerts | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterAlertsAlerts | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // arrive_time - computed: true, optional: false, required: false
  public get arriveTime() {
    return this.getStringAttribute('arrive_time');
  }

  // close_comment - computed: true, optional: false, required: false
  public get closeComment() {
    return this.getStringAttribute('close_comment');
  }

  // close_reason - computed: true, optional: false, required: false
  public get closeReason() {
    return this.getStringAttribute('close_reason');
  }

  // count - computed: true, optional: false, required: false
  public get count() {
    return this.getNumberAttribute('count');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // creator - computed: true, optional: false, required: false
  public get creator() {
    return this.getStringAttribute('creator');
  }

  // data_class_id - computed: true, optional: false, required: false
  public get dataClassId() {
    return this.getStringAttribute('data_class_id');
  }

  // data_source - computed: true, optional: false, required: false
  private _dataSource = new DataHuaweicloudSecmasterAlertsAlertsDataSourceList(this, "data_source", false);
  public get dataSource() {
    return this._dataSource;
  }

  // debugging_data - computed: true, optional: false, required: false
  public get debuggingData() {
    return this.getStringAttribute('debugging_data');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // domain_id - computed: true, optional: false, required: false
  public get domainId() {
    return this.getStringAttribute('domain_id');
  }

  // environment - computed: true, optional: false, required: false
  private _environment = new DataHuaweicloudSecmasterAlertsAlertsEnvironmentList(this, "environment", false);
  public get environment() {
    return this._environment;
  }

  // file_info - computed: true, optional: false, required: false
  private _fileInfo = new DataHuaweicloudSecmasterAlertsAlertsFileInfoList(this, "file_info", false);
  public get fileInfo() {
    return this._fileInfo;
  }

  // first_occurrence_time - computed: true, optional: false, required: false
  public get firstOccurrenceTime() {
    return this.getStringAttribute('first_occurrence_time');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // labels - computed: true, optional: false, required: false
  public get labels() {
    return this.getStringAttribute('labels');
  }

  // last_occurrence_time - computed: true, optional: false, required: false
  public get lastOccurrenceTime() {
    return this.getStringAttribute('last_occurrence_time');
  }

  // level - computed: true, optional: false, required: false
  public get level() {
    return this.getStringAttribute('level');
  }

  // malware - computed: true, optional: false, required: false
  private _malware = new DataHuaweicloudSecmasterAlertsAlertsMalwareList(this, "malware", false);
  public get malware() {
    return this._malware;
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // network_list - computed: true, optional: false, required: false
  private _networkList = new DataHuaweicloudSecmasterAlertsAlertsNetworkListStructList(this, "network_list", false);
  public get networkList() {
    return this._networkList;
  }

  // owner - computed: true, optional: false, required: false
  public get owner() {
    return this.getStringAttribute('owner');
  }

  // planned_closure_time - computed: true, optional: false, required: false
  public get plannedClosureTime() {
    return this.getStringAttribute('planned_closure_time');
  }

  // process - computed: true, optional: false, required: false
  private _process = new DataHuaweicloudSecmasterAlertsAlertsProcessList(this, "process", false);
  public get process() {
    return this._process;
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // region_id - computed: true, optional: false, required: false
  public get regionId() {
    return this.getStringAttribute('region_id');
  }

  // remediation - computed: true, optional: false, required: false
  private _remediation = new DataHuaweicloudSecmasterAlertsAlertsRemediationList(this, "remediation", false);
  public get remediation() {
    return this._remediation;
  }

  // resource_list - computed: true, optional: false, required: false
  private _resourceList = new DataHuaweicloudSecmasterAlertsAlertsResourceListStructList(this, "resource_list", false);
  public get resourceList() {
    return this._resourceList;
  }

  // stage - computed: true, optional: false, required: false
  public get stage() {
    return this.getStringAttribute('stage');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // type - computed: true, optional: false, required: false
  private _type = new DataHuaweicloudSecmasterAlertsAlertsTypeList(this, "type", false);
  public get type() {
    return this._type;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // user_info - computed: true, optional: false, required: false
  private _userInfo = new DataHuaweicloudSecmasterAlertsAlertsUserInfoList(this, "user_info", false);
  public get userInfo() {
    return this._userInfo;
  }

  // verification_status - computed: true, optional: false, required: false
  public get verificationStatus() {
    return this.getStringAttribute('verification_status');
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getStringAttribute('version');
  }

  // workspace_id - computed: true, optional: false, required: false
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
}

export class DataHuaweicloudSecmasterAlertsAlertsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterAlertsAlertsOutputReference {
    return new DataHuaweicloudSecmasterAlertsAlertsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsConditionConditions {
  /**
  * Specifies the expression content.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#data DataHuaweicloudSecmasterAlerts#data}
  */
  readonly data?: string[];
  /**
  * Specifies the expression name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#name DataHuaweicloudSecmasterAlerts#name}
  */
  readonly name?: string;
}

export function dataHuaweicloudSecmasterAlertsConditionConditionsToTerraform(struct?: DataHuaweicloudSecmasterAlertsConditionConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    data: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.data),
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function dataHuaweicloudSecmasterAlertsConditionConditionsToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsConditionConditions | cdktf.IResolvable): any {
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

export class DataHuaweicloudSecmasterAlertsConditionConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterAlertsConditionConditions | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DataHuaweicloudSecmasterAlertsConditionConditions | cdktf.IResolvable | undefined) {
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

export class DataHuaweicloudSecmasterAlertsConditionConditionsList extends cdktf.ComplexList {
  public internalValue? : DataHuaweicloudSecmasterAlertsConditionConditions[] | cdktf.IResolvable

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
  public get(index: number): DataHuaweicloudSecmasterAlertsConditionConditionsOutputReference {
    return new DataHuaweicloudSecmasterAlertsConditionConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterAlertsCondition {
  /**
  * Specifies the expression logic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#logics DataHuaweicloudSecmasterAlerts#logics}
  */
  readonly logics?: string[];
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#conditions DataHuaweicloudSecmasterAlerts#conditions}
  */
  readonly conditions?: DataHuaweicloudSecmasterAlertsConditionConditions[] | cdktf.IResolvable;
}

export function dataHuaweicloudSecmasterAlertsConditionToTerraform(struct?: DataHuaweicloudSecmasterAlertsConditionOutputReference | DataHuaweicloudSecmasterAlertsCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    logics: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.logics),
    conditions: cdktf.listMapper(dataHuaweicloudSecmasterAlertsConditionConditionsToTerraform, true)(struct!.conditions),
  }
}


export function dataHuaweicloudSecmasterAlertsConditionToHclTerraform(struct?: DataHuaweicloudSecmasterAlertsConditionOutputReference | DataHuaweicloudSecmasterAlertsCondition): any {
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
      value: cdktf.listMapperHcl(dataHuaweicloudSecmasterAlertsConditionConditionsToHclTerraform, true)(struct!.conditions),
      isBlock: true,
      type: "list",
      storageClassType: "DataHuaweicloudSecmasterAlertsConditionConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataHuaweicloudSecmasterAlertsConditionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataHuaweicloudSecmasterAlertsCondition | undefined {
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

  public set internalValue(value: DataHuaweicloudSecmasterAlertsCondition | undefined) {
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
  private _conditions = new DataHuaweicloudSecmasterAlertsConditionConditionsList(this, "conditions", false);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: DataHuaweicloudSecmasterAlertsConditionConditions[] | cdktf.IResolvable) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts huaweicloud_secmaster_alerts}
*/
export class DataHuaweicloudSecmasterAlerts extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_alerts";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudSecmasterAlerts resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudSecmasterAlerts to import
  * @param importFromId The id of the existing DataHuaweicloudSecmasterAlerts that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudSecmasterAlerts to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_alerts", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_alerts huaweicloud_secmaster_alerts} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudSecmasterAlertsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudSecmasterAlertsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_alerts',
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
    this._fromDate = config.fromDate;
    this._id = config.id;
    this._region = config.region;
    this._toDate = config.toDate;
    this._workspaceId = config.workspaceId;
    this._condition.internalValue = config.condition;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // alerts - computed: true, optional: false, required: false
  private _alerts = new DataHuaweicloudSecmasterAlertsAlertsList(this, "alerts", false);
  public get alerts() {
    return this._alerts;
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
  private _condition = new DataHuaweicloudSecmasterAlertsConditionOutputReference(this, "condition");
  public get condition() {
    return this._condition;
  }
  public putCondition(value: DataHuaweicloudSecmasterAlertsCondition) {
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
      from_date: cdktf.stringToTerraform(this._fromDate),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      to_date: cdktf.stringToTerraform(this._toDate),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      condition: dataHuaweicloudSecmasterAlertsConditionToTerraform(this._condition.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
        value: dataHuaweicloudSecmasterAlertsConditionToHclTerraform(this._condition.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataHuaweicloudSecmasterAlertsConditionList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

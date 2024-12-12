// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DcsDiagnosisTaskConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the start time of the diagnosis task, in RFC3339 format.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task#begin_time DcsDiagnosisTask#begin_time}
  */
  readonly beginTime: string;
  /**
  * Specifies the end time of the diagnosis task, in RFC3339 format.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task#end_time DcsDiagnosisTask#end_time}
  */
  readonly endTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task#id DcsDiagnosisTask#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the DCS instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task#instance_id DcsDiagnosisTask#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the IP addresses of diagnosed nodes. By default, all nodes are diagnosed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task#node_ip_list DcsDiagnosisTask#node_ip_list}
  */
  readonly nodeIpList?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task#region DcsDiagnosisTask#region}
  */
  readonly region?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task#timeouts DcsDiagnosisTask#timeouts}
  */
  readonly timeouts?: DcsDiagnosisTaskTimeouts;
}
export interface DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStruct {
}

export function dcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStructToTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStructToHclTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // average_usec - computed: true, optional: false, required: false
  public get averageUsec() {
    return this.getNumberAttribute('average_usec');
  }

  // calls_sum - computed: true, optional: false, required: false
  public get callsSum() {
    return this.getNumberAttribute('calls_sum');
  }

  // command_name - computed: true, optional: false, required: false
  public get commandName() {
    return this.getStringAttribute('command_name');
  }

  // per_usec - computed: true, optional: false, required: false
  public get perUsec() {
    return this.getStringAttribute('per_usec');
  }

  // usec_sum - computed: true, optional: false, required: false
  public get usecSum() {
    return this.getNumberAttribute('usec_sum');
  }
}

export class DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStructList extends cdktf.ComplexList {

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
  public get(index: number): DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStructOutputReference {
    return new DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStruct {
}

export function dcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStructToTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStructToHclTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // command_list - computed: true, optional: false, required: false
  private _commandList = new DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListCommandListStructList(this, "command_list", false);
  public get commandList() {
    return this._commandList;
  }

  // error_code - computed: true, optional: false, required: false
  public get errorCode() {
    return this.getStringAttribute('error_code');
  }

  // result - computed: true, optional: false, required: false
  public get result() {
    return this.getStringAttribute('result');
  }

  // total_num - computed: true, optional: false, required: false
  public get totalNum() {
    return this.getNumberAttribute('total_num');
  }

  // total_usec_sum - computed: true, optional: false, required: false
  public get totalUsecSum() {
    return this.getNumberAttribute('total_usec_sum');
  }
}

export class DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStructList extends cdktf.ComplexList {

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
  public get(index: number): DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStructOutputReference {
    return new DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIds {
}

export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIdsToTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIds): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIdsToHclTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIds): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIdsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIds | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIds | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getNumberAttribute('id');
  }

  // params - computed: true, optional: false, required: false
  private _params = new cdktf.StringMap(this, "params");
  public get params() {
    return this._params;
  }
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIdsList extends cdktf.ComplexList {

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
  public get(index: number): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIdsOutputReference {
    return new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIdsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIds {
}

export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIdsToTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIds): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIdsToHclTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIds): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIdsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIds | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIds | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getNumberAttribute('id');
  }

  // params - computed: true, optional: false, required: false
  private _params = new cdktf.StringMap(this, "params");
  public get params() {
    return this._params;
  }
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIdsList extends cdktf.ComplexList {

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
  public get(index: number): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIdsOutputReference {
    return new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIdsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIds {
}

export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIdsToTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIds): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIdsToHclTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIds): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIdsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIds | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIds | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getNumberAttribute('id');
  }

  // params - computed: true, optional: false, required: false
  private _params = new cdktf.StringMap(this, "params");
  public get params() {
    return this._params;
  }
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIdsList extends cdktf.ComplexList {

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
  public get(index: number): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIdsOutputReference {
    return new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIdsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStruct {
}

export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStructToTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStructToHclTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // advice_ids - computed: true, optional: false, required: false
  private _adviceIds = new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListAdviceIdsList(this, "advice_ids", false);
  public get adviceIds() {
    return this._adviceIds;
  }

  // cause_ids - computed: true, optional: false, required: false
  private _causeIds = new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListCauseIdsList(this, "cause_ids", false);
  public get causeIds() {
    return this._causeIds;
  }

  // error_code - computed: true, optional: false, required: false
  public get errorCode() {
    return this.getStringAttribute('error_code');
  }

  // impact_ids - computed: true, optional: false, required: false
  private _impactIds = new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListImpactIdsList(this, "impact_ids", false);
  public get impactIds() {
    return this._impactIds;
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // result - computed: true, optional: false, required: false
  public get result() {
    return this.getStringAttribute('result');
  }
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStructList extends cdktf.ComplexList {

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
  public get(index: number): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStructOutputReference {
    return new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStruct {
}

export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStructToTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStructToHclTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // abnormal_num - computed: true, optional: false, required: false
  public get abnormalNum() {
    return this.getNumberAttribute('abnormal_num');
  }

  // diagnosis_item_list - computed: true, optional: false, required: false
  private _diagnosisItemList = new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListDiagnosisItemListStructList(this, "diagnosis_item_list", false);
  public get diagnosisItemList() {
    return this._diagnosisItemList;
  }

  // failed_num - computed: true, optional: false, required: false
  public get failedNum() {
    return this.getNumberAttribute('failed_num');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }
}

export class DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStructList extends cdktf.ComplexList {

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
  public get(index: number): DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStructOutputReference {
    return new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DcsDiagnosisTaskDiagnosisNodeReportListStruct {
}

export function dcsDiagnosisTaskDiagnosisNodeReportListStructToTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dcsDiagnosisTaskDiagnosisNodeReportListStructToHclTerraform(struct?: DcsDiagnosisTaskDiagnosisNodeReportListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DcsDiagnosisTaskDiagnosisNodeReportListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DcsDiagnosisTaskDiagnosisNodeReportListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcsDiagnosisTaskDiagnosisNodeReportListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // abnormal_sum - computed: true, optional: false, required: false
  public get abnormalSum() {
    return this.getNumberAttribute('abnormal_sum');
  }

  // az_code - computed: true, optional: false, required: false
  public get azCode() {
    return this.getStringAttribute('az_code');
  }

  // command_time_taken_list - computed: true, optional: false, required: false
  private _commandTimeTakenList = new DcsDiagnosisTaskDiagnosisNodeReportListCommandTimeTakenListStructList(this, "command_time_taken_list", false);
  public get commandTimeTakenList() {
    return this._commandTimeTakenList;
  }

  // diagnosis_dimension_list - computed: true, optional: false, required: false
  private _diagnosisDimensionList = new DcsDiagnosisTaskDiagnosisNodeReportListDiagnosisDimensionListStructList(this, "diagnosis_dimension_list", false);
  public get diagnosisDimensionList() {
    return this._diagnosisDimensionList;
  }

  // failed_sum - computed: true, optional: false, required: false
  public get failedSum() {
    return this.getNumberAttribute('failed_sum');
  }

  // group_name - computed: true, optional: false, required: false
  public get groupName() {
    return this.getStringAttribute('group_name');
  }

  // is_faulted - computed: true, optional: false, required: false
  public get isFaulted() {
    return this.getBooleanAttribute('is_faulted');
  }

  // node_ip - computed: true, optional: false, required: false
  public get nodeIp() {
    return this.getStringAttribute('node_ip');
  }

  // role - computed: true, optional: false, required: false
  public get role() {
    return this.getStringAttribute('role');
  }
}

export class DcsDiagnosisTaskDiagnosisNodeReportListStructList extends cdktf.ComplexList {

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
  public get(index: number): DcsDiagnosisTaskDiagnosisNodeReportListStructOutputReference {
    return new DcsDiagnosisTaskDiagnosisNodeReportListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DcsDiagnosisTaskTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task#create DcsDiagnosisTask#create}
  */
  readonly create?: string;
}

export function dcsDiagnosisTaskTimeoutsToTerraform(struct?: DcsDiagnosisTaskTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function dcsDiagnosisTaskTimeoutsToHclTerraform(struct?: DcsDiagnosisTaskTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DcsDiagnosisTaskTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DcsDiagnosisTaskTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcsDiagnosisTaskTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task huaweicloud_dcs_diagnosis_task}
*/
export class DcsDiagnosisTask extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dcs_diagnosis_task";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DcsDiagnosisTask resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DcsDiagnosisTask to import
  * @param importFromId The id of the existing DcsDiagnosisTask that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DcsDiagnosisTask to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dcs_diagnosis_task", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dcs_diagnosis_task huaweicloud_dcs_diagnosis_task} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DcsDiagnosisTaskConfig
  */
  public constructor(scope: Construct, id: string, config: DcsDiagnosisTaskConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dcs_diagnosis_task',
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
    this._beginTime = config.beginTime;
    this._endTime = config.endTime;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._nodeIpList = config.nodeIpList;
    this._region = config.region;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // abnormal_item_sum - computed: true, optional: false, required: false
  public get abnormalItemSum() {
    return this.getNumberAttribute('abnormal_item_sum');
  }

  // begin_time - computed: false, optional: false, required: true
  private _beginTime?: string; 
  public get beginTime() {
    return this.getStringAttribute('begin_time');
  }
  public set beginTime(value: string) {
    this._beginTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get beginTimeInput() {
    return this._beginTime;
  }

  // diagnosis_node_report_list - computed: true, optional: false, required: false
  private _diagnosisNodeReportList = new DcsDiagnosisTaskDiagnosisNodeReportListStructList(this, "diagnosis_node_report_list", false);
  public get diagnosisNodeReportList() {
    return this._diagnosisNodeReportList;
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

  // failed_item_sum - computed: true, optional: false, required: false
  public get failedItemSum() {
    return this.getNumberAttribute('failed_item_sum');
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // node_ip_list - computed: true, optional: true, required: false
  private _nodeIpList?: string[]; 
  public get nodeIpList() {
    return cdktf.Fn.tolist(this.getListAttribute('node_ip_list'));
  }
  public set nodeIpList(value: string[]) {
    this._nodeIpList = value;
  }
  public resetNodeIpList() {
    this._nodeIpList = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeIpListInput() {
    return this._nodeIpList;
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

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DcsDiagnosisTaskTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DcsDiagnosisTaskTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      begin_time: cdktf.stringToTerraform(this._beginTime),
      end_time: cdktf.stringToTerraform(this._endTime),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      node_ip_list: cdktf.listMapper(cdktf.stringToTerraform, false)(this._nodeIpList),
      region: cdktf.stringToTerraform(this._region),
      timeouts: dcsDiagnosisTaskTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      begin_time: {
        value: cdktf.stringToHclTerraform(this._beginTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      node_ip_list: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._nodeIpList),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: dcsDiagnosisTaskTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DcsDiagnosisTaskTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

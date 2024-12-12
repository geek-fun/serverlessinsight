// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_config_ranges
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudAntiddosConfigRangesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_config_ranges#id DataHuaweicloudAntiddosConfigRanges#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_config_ranges#region DataHuaweicloudAntiddosConfigRanges#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStruct {
}

export function dataHuaweicloudAntiddosConfigRangesConnectionLimitedListStructToTerraform(struct?: DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAntiddosConfigRangesConnectionLimitedListStructToHclTerraform(struct?: DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // cleaning_access_pos_id - computed: true, optional: false, required: false
  public get cleaningAccessPosId() {
    return this.getNumberAttribute('cleaning_access_pos_id');
  }

  // new_connection_limited - computed: true, optional: false, required: false
  public get newConnectionLimited() {
    return this.getNumberAttribute('new_connection_limited');
  }

  // total_connection_limited - computed: true, optional: false, required: false
  public get totalConnectionLimited() {
    return this.getNumberAttribute('total_connection_limited');
  }
}

export class DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStructList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStructOutputReference {
    return new DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAntiddosConfigRangesExtendDdosConfig {
}

export function dataHuaweicloudAntiddosConfigRangesExtendDdosConfigToTerraform(struct?: DataHuaweicloudAntiddosConfigRangesExtendDdosConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAntiddosConfigRangesExtendDdosConfigToHclTerraform(struct?: DataHuaweicloudAntiddosConfigRangesExtendDdosConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAntiddosConfigRangesExtendDdosConfigOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAntiddosConfigRangesExtendDdosConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAntiddosConfigRangesExtendDdosConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // http_packet_per_second - computed: true, optional: false, required: false
  public get httpPacketPerSecond() {
    return this.getNumberAttribute('http_packet_per_second');
  }

  // new_connection_limited - computed: true, optional: false, required: false
  public get newConnectionLimited() {
    return this.getNumberAttribute('new_connection_limited');
  }

  // packet_per_second - computed: true, optional: false, required: false
  public get packetPerSecond() {
    return this.getNumberAttribute('packet_per_second');
  }

  // set_id - computed: true, optional: false, required: false
  public get setId() {
    return this.getNumberAttribute('set_id');
  }

  // total_connection_limited - computed: true, optional: false, required: false
  public get totalConnectionLimited() {
    return this.getNumberAttribute('total_connection_limited');
  }

  // traffic_per_second - computed: true, optional: false, required: false
  public get trafficPerSecond() {
    return this.getNumberAttribute('traffic_per_second');
  }
}

export class DataHuaweicloudAntiddosConfigRangesExtendDdosConfigList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAntiddosConfigRangesExtendDdosConfigOutputReference {
    return new DataHuaweicloudAntiddosConfigRangesExtendDdosConfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAntiddosConfigRangesHttpLimitedListStruct {
}

export function dataHuaweicloudAntiddosConfigRangesHttpLimitedListStructToTerraform(struct?: DataHuaweicloudAntiddosConfigRangesHttpLimitedListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAntiddosConfigRangesHttpLimitedListStructToHclTerraform(struct?: DataHuaweicloudAntiddosConfigRangesHttpLimitedListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAntiddosConfigRangesHttpLimitedListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAntiddosConfigRangesHttpLimitedListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAntiddosConfigRangesHttpLimitedListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // http_packet_per_second - computed: true, optional: false, required: false
  public get httpPacketPerSecond() {
    return this.getNumberAttribute('http_packet_per_second');
  }

  // http_request_pos_id - computed: true, optional: false, required: false
  public get httpRequestPosId() {
    return this.getNumberAttribute('http_request_pos_id');
  }
}

export class DataHuaweicloudAntiddosConfigRangesHttpLimitedListStructList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAntiddosConfigRangesHttpLimitedListStructOutputReference {
    return new DataHuaweicloudAntiddosConfigRangesHttpLimitedListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStruct {
}

export function dataHuaweicloudAntiddosConfigRangesTrafficLimitedListStructToTerraform(struct?: DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAntiddosConfigRangesTrafficLimitedListStructToHclTerraform(struct?: DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // packet_per_second - computed: true, optional: false, required: false
  public get packetPerSecond() {
    return this.getNumberAttribute('packet_per_second');
  }

  // traffic_per_second - computed: true, optional: false, required: false
  public get trafficPerSecond() {
    return this.getNumberAttribute('traffic_per_second');
  }

  // traffic_pos_id - computed: true, optional: false, required: false
  public get trafficPosId() {
    return this.getNumberAttribute('traffic_pos_id');
  }
}

export class DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStructList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStructOutputReference {
    return new DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_config_ranges huaweicloud_antiddos_config_ranges}
*/
export class DataHuaweicloudAntiddosConfigRanges extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_antiddos_config_ranges";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudAntiddosConfigRanges resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudAntiddosConfigRanges to import
  * @param importFromId The id of the existing DataHuaweicloudAntiddosConfigRanges that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_config_ranges#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudAntiddosConfigRanges to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_antiddos_config_ranges", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_config_ranges huaweicloud_antiddos_config_ranges} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudAntiddosConfigRangesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudAntiddosConfigRangesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_antiddos_config_ranges',
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
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // connection_limited_list - computed: true, optional: false, required: false
  private _connectionLimitedList = new DataHuaweicloudAntiddosConfigRangesConnectionLimitedListStructList(this, "connection_limited_list", false);
  public get connectionLimitedList() {
    return this._connectionLimitedList;
  }

  // extend_ddos_config - computed: true, optional: false, required: false
  private _extendDdosConfig = new DataHuaweicloudAntiddosConfigRangesExtendDdosConfigList(this, "extend_ddos_config", false);
  public get extendDdosConfig() {
    return this._extendDdosConfig;
  }

  // http_limited_list - computed: true, optional: false, required: false
  private _httpLimitedList = new DataHuaweicloudAntiddosConfigRangesHttpLimitedListStructList(this, "http_limited_list", false);
  public get httpLimitedList() {
    return this._httpLimitedList;
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

  // traffic_limited_list - computed: true, optional: false, required: false
  private _trafficLimitedList = new DataHuaweicloudAntiddosConfigRangesTrafficLimitedListStructList(this, "traffic_limited_list", false);
  public get trafficLimitedList() {
    return this._trafficLimitedList;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

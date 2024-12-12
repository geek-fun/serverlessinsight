// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCfwFlowLogsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the application protocol.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#app DataHuaweicloudCfwFlowLogs#app}
  */
  readonly app?: string;
  /**
  * Specifies the direction. The values can be **out2in** and **in2out**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#direction DataHuaweicloudCfwFlowLogs#direction}
  */
  readonly direction?: string;
  /**
  * Specifies the destination city name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#dst_city_name DataHuaweicloudCfwFlowLogs#dst_city_name}
  */
  readonly dstCityName?: string;
  /**
  * Specifies the destination IP address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#dst_ip DataHuaweicloudCfwFlowLogs#dst_ip}
  */
  readonly dstIp?: string;
  /**
  * Specifies the destination port.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#dst_port DataHuaweicloudCfwFlowLogs#dst_port}
  */
  readonly dstPort?: number;
  /**
  * Specifies the destination province name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#dst_province_name DataHuaweicloudCfwFlowLogs#dst_province_name}
  */
  readonly dstProvinceName?: string;
  /**
  * Specifies the destination region name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#dst_region_name DataHuaweicloudCfwFlowLogs#dst_region_name}
  */
  readonly dstRegionName?: string;
  /**
  * Specifies the end time. The time is in UTC.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#end_time DataHuaweicloudCfwFlowLogs#end_time}
  */
  readonly endTime: string;
  /**
  * Specifies the enterprise project id.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#enterprise_project_id DataHuaweicloudCfwFlowLogs#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Specifies the firewall instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#fw_instance_id DataHuaweicloudCfwFlowLogs#fw_instance_id}
  */
  readonly fwInstanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#id DataHuaweicloudCfwFlowLogs#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#region DataHuaweicloudCfwFlowLogs#region}
  */
  readonly region?: string;
  /**
  * Specifies the source city name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#src_city_name DataHuaweicloudCfwFlowLogs#src_city_name}
  */
  readonly srcCityName?: string;
  /**
  * Specifies the source IP address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#src_ip DataHuaweicloudCfwFlowLogs#src_ip}
  */
  readonly srcIp?: string;
  /**
  * Specifies the source port.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#src_port DataHuaweicloudCfwFlowLogs#src_port}
  */
  readonly srcPort?: number;
  /**
  * Specifies the source province name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#src_province_name DataHuaweicloudCfwFlowLogs#src_province_name}
  */
  readonly srcProvinceName?: string;
  /**
  * Specifies the source region name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#src_region_name DataHuaweicloudCfwFlowLogs#src_region_name}
  */
  readonly srcRegionName?: string;
  /**
  * Specifies the start time. The time is in UTC.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#start_time DataHuaweicloudCfwFlowLogs#start_time}
  */
  readonly startTime: string;
}
export interface DataHuaweicloudCfwFlowLogsRecords {
}

export function dataHuaweicloudCfwFlowLogsRecordsToTerraform(struct?: DataHuaweicloudCfwFlowLogsRecords): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCfwFlowLogsRecordsToHclTerraform(struct?: DataHuaweicloudCfwFlowLogsRecords): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCfwFlowLogsRecordsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCfwFlowLogsRecords | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCfwFlowLogsRecords | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // app - computed: true, optional: false, required: false
  public get app() {
    return this.getStringAttribute('app');
  }

  // bytes - computed: true, optional: false, required: false
  public get bytes() {
    return this.getNumberAttribute('bytes');
  }

  // direction - computed: true, optional: false, required: false
  public get direction() {
    return this.getStringAttribute('direction');
  }

  // dst_city_id - computed: true, optional: false, required: false
  public get dstCityId() {
    return this.getStringAttribute('dst_city_id');
  }

  // dst_city_name - computed: true, optional: false, required: false
  public get dstCityName() {
    return this.getStringAttribute('dst_city_name');
  }

  // dst_host - computed: true, optional: false, required: false
  public get dstHost() {
    return this.getStringAttribute('dst_host');
  }

  // dst_ip - computed: true, optional: false, required: false
  public get dstIp() {
    return this.getStringAttribute('dst_ip');
  }

  // dst_port - computed: true, optional: false, required: false
  public get dstPort() {
    return this.getNumberAttribute('dst_port');
  }

  // dst_province_id - computed: true, optional: false, required: false
  public get dstProvinceId() {
    return this.getStringAttribute('dst_province_id');
  }

  // dst_province_name - computed: true, optional: false, required: false
  public get dstProvinceName() {
    return this.getStringAttribute('dst_province_name');
  }

  // dst_region_id - computed: true, optional: false, required: false
  public get dstRegionId() {
    return this.getStringAttribute('dst_region_id');
  }

  // dst_region_name - computed: true, optional: false, required: false
  public get dstRegionName() {
    return this.getStringAttribute('dst_region_name');
  }

  // end_time - computed: true, optional: false, required: false
  public get endTime() {
    return this.getStringAttribute('end_time');
  }

  // log_id - computed: true, optional: false, required: false
  public get logId() {
    return this.getStringAttribute('log_id');
  }

  // packets - computed: true, optional: false, required: false
  public get packets() {
    return this.getNumberAttribute('packets');
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }

  // src_city_id - computed: true, optional: false, required: false
  public get srcCityId() {
    return this.getStringAttribute('src_city_id');
  }

  // src_city_name - computed: true, optional: false, required: false
  public get srcCityName() {
    return this.getStringAttribute('src_city_name');
  }

  // src_ip - computed: true, optional: false, required: false
  public get srcIp() {
    return this.getStringAttribute('src_ip');
  }

  // src_port - computed: true, optional: false, required: false
  public get srcPort() {
    return this.getNumberAttribute('src_port');
  }

  // src_province_id - computed: true, optional: false, required: false
  public get srcProvinceId() {
    return this.getStringAttribute('src_province_id');
  }

  // src_province_name - computed: true, optional: false, required: false
  public get srcProvinceName() {
    return this.getStringAttribute('src_province_name');
  }

  // src_region_id - computed: true, optional: false, required: false
  public get srcRegionId() {
    return this.getStringAttribute('src_region_id');
  }

  // src_region_name - computed: true, optional: false, required: false
  public get srcRegionName() {
    return this.getStringAttribute('src_region_name');
  }

  // start_time - computed: true, optional: false, required: false
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
}

export class DataHuaweicloudCfwFlowLogsRecordsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCfwFlowLogsRecordsOutputReference {
    return new DataHuaweicloudCfwFlowLogsRecordsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs huaweicloud_cfw_flow_logs}
*/
export class DataHuaweicloudCfwFlowLogs extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cfw_flow_logs";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCfwFlowLogs resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCfwFlowLogs to import
  * @param importFromId The id of the existing DataHuaweicloudCfwFlowLogs that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCfwFlowLogs to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cfw_flow_logs", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cfw_flow_logs huaweicloud_cfw_flow_logs} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCfwFlowLogsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCfwFlowLogsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cfw_flow_logs',
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
    this._app = config.app;
    this._direction = config.direction;
    this._dstCityName = config.dstCityName;
    this._dstIp = config.dstIp;
    this._dstPort = config.dstPort;
    this._dstProvinceName = config.dstProvinceName;
    this._dstRegionName = config.dstRegionName;
    this._endTime = config.endTime;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._fwInstanceId = config.fwInstanceId;
    this._id = config.id;
    this._region = config.region;
    this._srcCityName = config.srcCityName;
    this._srcIp = config.srcIp;
    this._srcPort = config.srcPort;
    this._srcProvinceName = config.srcProvinceName;
    this._srcRegionName = config.srcRegionName;
    this._startTime = config.startTime;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // app - computed: false, optional: true, required: false
  private _app?: string; 
  public get app() {
    return this.getStringAttribute('app');
  }
  public set app(value: string) {
    this._app = value;
  }
  public resetApp() {
    this._app = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appInput() {
    return this._app;
  }

  // direction - computed: false, optional: true, required: false
  private _direction?: string; 
  public get direction() {
    return this.getStringAttribute('direction');
  }
  public set direction(value: string) {
    this._direction = value;
  }
  public resetDirection() {
    this._direction = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get directionInput() {
    return this._direction;
  }

  // dst_city_name - computed: false, optional: true, required: false
  private _dstCityName?: string; 
  public get dstCityName() {
    return this.getStringAttribute('dst_city_name');
  }
  public set dstCityName(value: string) {
    this._dstCityName = value;
  }
  public resetDstCityName() {
    this._dstCityName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dstCityNameInput() {
    return this._dstCityName;
  }

  // dst_ip - computed: false, optional: true, required: false
  private _dstIp?: string; 
  public get dstIp() {
    return this.getStringAttribute('dst_ip');
  }
  public set dstIp(value: string) {
    this._dstIp = value;
  }
  public resetDstIp() {
    this._dstIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dstIpInput() {
    return this._dstIp;
  }

  // dst_port - computed: false, optional: true, required: false
  private _dstPort?: number; 
  public get dstPort() {
    return this.getNumberAttribute('dst_port');
  }
  public set dstPort(value: number) {
    this._dstPort = value;
  }
  public resetDstPort() {
    this._dstPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dstPortInput() {
    return this._dstPort;
  }

  // dst_province_name - computed: false, optional: true, required: false
  private _dstProvinceName?: string; 
  public get dstProvinceName() {
    return this.getStringAttribute('dst_province_name');
  }
  public set dstProvinceName(value: string) {
    this._dstProvinceName = value;
  }
  public resetDstProvinceName() {
    this._dstProvinceName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dstProvinceNameInput() {
    return this._dstProvinceName;
  }

  // dst_region_name - computed: false, optional: true, required: false
  private _dstRegionName?: string; 
  public get dstRegionName() {
    return this.getStringAttribute('dst_region_name');
  }
  public set dstRegionName(value: string) {
    this._dstRegionName = value;
  }
  public resetDstRegionName() {
    this._dstRegionName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dstRegionNameInput() {
    return this._dstRegionName;
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

  // fw_instance_id - computed: false, optional: false, required: true
  private _fwInstanceId?: string; 
  public get fwInstanceId() {
    return this.getStringAttribute('fw_instance_id');
  }
  public set fwInstanceId(value: string) {
    this._fwInstanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fwInstanceIdInput() {
    return this._fwInstanceId;
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

  // records - computed: true, optional: false, required: false
  private _records = new DataHuaweicloudCfwFlowLogsRecordsList(this, "records", false);
  public get records() {
    return this._records;
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

  // src_city_name - computed: false, optional: true, required: false
  private _srcCityName?: string; 
  public get srcCityName() {
    return this.getStringAttribute('src_city_name');
  }
  public set srcCityName(value: string) {
    this._srcCityName = value;
  }
  public resetSrcCityName() {
    this._srcCityName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcCityNameInput() {
    return this._srcCityName;
  }

  // src_ip - computed: false, optional: true, required: false
  private _srcIp?: string; 
  public get srcIp() {
    return this.getStringAttribute('src_ip');
  }
  public set srcIp(value: string) {
    this._srcIp = value;
  }
  public resetSrcIp() {
    this._srcIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcIpInput() {
    return this._srcIp;
  }

  // src_port - computed: false, optional: true, required: false
  private _srcPort?: number; 
  public get srcPort() {
    return this.getNumberAttribute('src_port');
  }
  public set srcPort(value: number) {
    this._srcPort = value;
  }
  public resetSrcPort() {
    this._srcPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcPortInput() {
    return this._srcPort;
  }

  // src_province_name - computed: false, optional: true, required: false
  private _srcProvinceName?: string; 
  public get srcProvinceName() {
    return this.getStringAttribute('src_province_name');
  }
  public set srcProvinceName(value: string) {
    this._srcProvinceName = value;
  }
  public resetSrcProvinceName() {
    this._srcProvinceName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcProvinceNameInput() {
    return this._srcProvinceName;
  }

  // src_region_name - computed: false, optional: true, required: false
  private _srcRegionName?: string; 
  public get srcRegionName() {
    return this.getStringAttribute('src_region_name');
  }
  public set srcRegionName(value: string) {
    this._srcRegionName = value;
  }
  public resetSrcRegionName() {
    this._srcRegionName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcRegionNameInput() {
    return this._srcRegionName;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      app: cdktf.stringToTerraform(this._app),
      direction: cdktf.stringToTerraform(this._direction),
      dst_city_name: cdktf.stringToTerraform(this._dstCityName),
      dst_ip: cdktf.stringToTerraform(this._dstIp),
      dst_port: cdktf.numberToTerraform(this._dstPort),
      dst_province_name: cdktf.stringToTerraform(this._dstProvinceName),
      dst_region_name: cdktf.stringToTerraform(this._dstRegionName),
      end_time: cdktf.stringToTerraform(this._endTime),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      fw_instance_id: cdktf.stringToTerraform(this._fwInstanceId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      src_city_name: cdktf.stringToTerraform(this._srcCityName),
      src_ip: cdktf.stringToTerraform(this._srcIp),
      src_port: cdktf.numberToTerraform(this._srcPort),
      src_province_name: cdktf.stringToTerraform(this._srcProvinceName),
      src_region_name: cdktf.stringToTerraform(this._srcRegionName),
      start_time: cdktf.stringToTerraform(this._startTime),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      app: {
        value: cdktf.stringToHclTerraform(this._app),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      direction: {
        value: cdktf.stringToHclTerraform(this._direction),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dst_city_name: {
        value: cdktf.stringToHclTerraform(this._dstCityName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dst_ip: {
        value: cdktf.stringToHclTerraform(this._dstIp),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dst_port: {
        value: cdktf.numberToHclTerraform(this._dstPort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      dst_province_name: {
        value: cdktf.stringToHclTerraform(this._dstProvinceName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dst_region_name: {
        value: cdktf.stringToHclTerraform(this._dstRegionName),
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
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      fw_instance_id: {
        value: cdktf.stringToHclTerraform(this._fwInstanceId),
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
      src_city_name: {
        value: cdktf.stringToHclTerraform(this._srcCityName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      src_ip: {
        value: cdktf.stringToHclTerraform(this._srcIp),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      src_port: {
        value: cdktf.numberToHclTerraform(this._srcPort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      src_province_name: {
        value: cdktf.stringToHclTerraform(this._srcProvinceName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      src_region_name: {
        value: cdktf.stringToHclTerraform(this._srcRegionName),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

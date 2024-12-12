// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_weekly_protection_statistics
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudAntiddosWeeklyProtectionStatisticsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_weekly_protection_statistics#id DataHuaweicloudAntiddosWeeklyProtectionStatistics#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The start date of the seven-day period, the value is a timestamp in milliseconds.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_weekly_protection_statistics#period_start_date DataHuaweicloudAntiddosWeeklyProtectionStatistics#period_start_date}
  */
  readonly periodStartDate?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_weekly_protection_statistics#region DataHuaweicloudAntiddosWeeklyProtectionStatistics#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10 {
}

export function dataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10ToTerraform(struct?: DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10ToHclTerraform(struct?: DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10OutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10 | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10 | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // floating_ip_address - computed: true, optional: false, required: false
  public get floatingIpAddress() {
    return this.getStringAttribute('floating_ip_address');
  }

  // times - computed: true, optional: false, required: false
  public get times() {
    return this.getNumberAttribute('times');
  }
}

export class DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10List extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10OutputReference {
    return new DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10OutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdata {
}

export function dataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdataToTerraform(struct?: DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdata): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdataToHclTerraform(struct?: DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdata): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdataOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdata | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdata | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // ddos_blackhole_times - computed: true, optional: false, required: false
  public get ddosBlackholeTimes() {
    return this.getNumberAttribute('ddos_blackhole_times');
  }

  // ddos_intercept_times - computed: true, optional: false, required: false
  public get ddosInterceptTimes() {
    return this.getNumberAttribute('ddos_intercept_times');
  }

  // max_attack_bps - computed: true, optional: false, required: false
  public get maxAttackBps() {
    return this.getNumberAttribute('max_attack_bps');
  }

  // max_attack_conns - computed: true, optional: false, required: false
  public get maxAttackConns() {
    return this.getNumberAttribute('max_attack_conns');
  }

  // period_start_date - computed: true, optional: false, required: false
  public get periodStartDate() {
    return this.getNumberAttribute('period_start_date');
  }
}

export class DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdataList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdataOutputReference {
    return new DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdataOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_weekly_protection_statistics huaweicloud_antiddos_weekly_protection_statistics}
*/
export class DataHuaweicloudAntiddosWeeklyProtectionStatistics extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_antiddos_weekly_protection_statistics";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudAntiddosWeeklyProtectionStatistics resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudAntiddosWeeklyProtectionStatistics to import
  * @param importFromId The id of the existing DataHuaweicloudAntiddosWeeklyProtectionStatistics that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_weekly_protection_statistics#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudAntiddosWeeklyProtectionStatistics to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_antiddos_weekly_protection_statistics", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/antiddos_weekly_protection_statistics huaweicloud_antiddos_weekly_protection_statistics} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudAntiddosWeeklyProtectionStatisticsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudAntiddosWeeklyProtectionStatisticsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_antiddos_weekly_protection_statistics',
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
    this._periodStartDate = config.periodStartDate;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // ddos_intercept_times - computed: true, optional: false, required: false
  public get ddosInterceptTimes() {
    return this.getNumberAttribute('ddos_intercept_times');
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

  // period_start_date - computed: false, optional: true, required: false
  private _periodStartDate?: string; 
  public get periodStartDate() {
    return this.getStringAttribute('period_start_date');
  }
  public set periodStartDate(value: string) {
    this._periodStartDate = value;
  }
  public resetPeriodStartDate() {
    this._periodStartDate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodStartDateInput() {
    return this._periodStartDate;
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

  // top10 - computed: true, optional: false, required: false
  private _top10 = new DataHuaweicloudAntiddosWeeklyProtectionStatisticsTop10List(this, "top10", false);
  public get top10() {
    return this._top10;
  }

  // weekdata - computed: true, optional: false, required: false
  private _weekdata = new DataHuaweicloudAntiddosWeeklyProtectionStatisticsWeekdataList(this, "weekdata", false);
  public get weekdata() {
    return this._weekdata;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      period_start_date: cdktf.stringToTerraform(this._periodStartDate),
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
      period_start_date: {
        value: cdktf.stringToHclTerraform(this._periodStartDate),
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

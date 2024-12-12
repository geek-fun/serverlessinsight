// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface GaussdbMysqlInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#audit_log_enabled GaussdbMysqlInstance#audit_log_enabled}
  */
  readonly auditLogEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#auto_pay GaussdbMysqlInstance#auto_pay}
  */
  readonly autoPay?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#auto_renew GaussdbMysqlInstance#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#availability_zone_mode GaussdbMysqlInstance#availability_zone_mode}
  */
  readonly availabilityZoneMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#charging_mode GaussdbMysqlInstance#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#configuration_id GaussdbMysqlInstance#configuration_id}
  */
  readonly configurationId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#configuration_name GaussdbMysqlInstance#configuration_name}
  */
  readonly configurationName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#dedicated_resource_id GaussdbMysqlInstance#dedicated_resource_id}
  */
  readonly dedicatedResourceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#dedicated_resource_name GaussdbMysqlInstance#dedicated_resource_name}
  */
  readonly dedicatedResourceName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#description GaussdbMysqlInstance#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#encryption_status GaussdbMysqlInstance#encryption_status}
  */
  readonly encryptionStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#encryption_type GaussdbMysqlInstance#encryption_type}
  */
  readonly encryptionType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#enterprise_project_id GaussdbMysqlInstance#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#flavor GaussdbMysqlInstance#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#force_import GaussdbMysqlInstance#force_import}
  */
  readonly forceImport?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#id GaussdbMysqlInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#kms_key_id GaussdbMysqlInstance#kms_key_id}
  */
  readonly kmsKeyId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#maintain_begin GaussdbMysqlInstance#maintain_begin}
  */
  readonly maintainBegin?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#maintain_end GaussdbMysqlInstance#maintain_end}
  */
  readonly maintainEnd?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#master_availability_zone GaussdbMysqlInstance#master_availability_zone}
  */
  readonly masterAvailabilityZone?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#name GaussdbMysqlInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#password GaussdbMysqlInstance#password}
  */
  readonly password: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#period GaussdbMysqlInstance#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#period_unit GaussdbMysqlInstance#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#port GaussdbMysqlInstance#port}
  */
  readonly port?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#private_dns_name_prefix GaussdbMysqlInstance#private_dns_name_prefix}
  */
  readonly privateDnsNamePrefix?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#private_write_ip GaussdbMysqlInstance#private_write_ip}
  */
  readonly privateWriteIp?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#proxy_flavor GaussdbMysqlInstance#proxy_flavor}
  */
  readonly proxyFlavor?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#proxy_node_num GaussdbMysqlInstance#proxy_node_num}
  */
  readonly proxyNodeNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#read_replicas GaussdbMysqlInstance#read_replicas}
  */
  readonly readReplicas?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#region GaussdbMysqlInstance#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#seconds_level_monitoring_enabled GaussdbMysqlInstance#seconds_level_monitoring_enabled}
  */
  readonly secondsLevelMonitoringEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#seconds_level_monitoring_period GaussdbMysqlInstance#seconds_level_monitoring_period}
  */
  readonly secondsLevelMonitoringPeriod?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#security_group_id GaussdbMysqlInstance#security_group_id}
  */
  readonly securityGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#slow_log_show_original_switch GaussdbMysqlInstance#slow_log_show_original_switch}
  */
  readonly slowLogShowOriginalSwitch?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#sql_filter_enabled GaussdbMysqlInstance#sql_filter_enabled}
  */
  readonly sqlFilterEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#ssl_option GaussdbMysqlInstance#ssl_option}
  */
  readonly sslOption?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#subnet_id GaussdbMysqlInstance#subnet_id}
  */
  readonly subnetId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#table_name_case_sensitivity GaussdbMysqlInstance#table_name_case_sensitivity}
  */
  readonly tableNameCaseSensitivity?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#tags GaussdbMysqlInstance#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#time_zone GaussdbMysqlInstance#time_zone}
  */
  readonly timeZone?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#volume_size GaussdbMysqlInstance#volume_size}
  */
  readonly volumeSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#vpc_id GaussdbMysqlInstance#vpc_id}
  */
  readonly vpcId: string;
  /**
  * auto_scaling block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#auto_scaling GaussdbMysqlInstance#auto_scaling}
  */
  readonly autoScaling?: GaussdbMysqlInstanceAutoScaling;
  /**
  * backup_strategy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#backup_strategy GaussdbMysqlInstance#backup_strategy}
  */
  readonly backupStrategy?: GaussdbMysqlInstanceBackupStrategy;
  /**
  * datastore block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#datastore GaussdbMysqlInstance#datastore}
  */
  readonly datastore?: GaussdbMysqlInstanceDatastore;
  /**
  * parameters block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#parameters GaussdbMysqlInstance#parameters}
  */
  readonly parameters?: GaussdbMysqlInstanceParameters[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#timeouts GaussdbMysqlInstance#timeouts}
  */
  readonly timeouts?: GaussdbMysqlInstanceTimeouts;
}
export interface GaussdbMysqlInstanceNodes {
}

export function gaussdbMysqlInstanceNodesToTerraform(struct?: GaussdbMysqlInstanceNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function gaussdbMysqlInstanceNodesToHclTerraform(struct?: GaussdbMysqlInstanceNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class GaussdbMysqlInstanceNodesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): GaussdbMysqlInstanceNodes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlInstanceNodes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // availability_zone - computed: true, optional: false, required: false
  public get availabilityZone() {
    return this.getStringAttribute('availability_zone');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // private_read_ip - computed: true, optional: false, required: false
  public get privateReadIp() {
    return this.getStringAttribute('private_read_ip');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class GaussdbMysqlInstanceNodesList extends cdktf.ComplexList {

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
  public get(index: number): GaussdbMysqlInstanceNodesOutputReference {
    return new GaussdbMysqlInstanceNodesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface GaussdbMysqlInstanceAutoScalingScalingStrategy {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#flavor_switch GaussdbMysqlInstance#flavor_switch}
  */
  readonly flavorSwitch: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#read_only_switch GaussdbMysqlInstance#read_only_switch}
  */
  readonly readOnlySwitch: string;
}

export function gaussdbMysqlInstanceAutoScalingScalingStrategyToTerraform(struct?: GaussdbMysqlInstanceAutoScalingScalingStrategyOutputReference | GaussdbMysqlInstanceAutoScalingScalingStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    flavor_switch: cdktf.stringToTerraform(struct!.flavorSwitch),
    read_only_switch: cdktf.stringToTerraform(struct!.readOnlySwitch),
  }
}


export function gaussdbMysqlInstanceAutoScalingScalingStrategyToHclTerraform(struct?: GaussdbMysqlInstanceAutoScalingScalingStrategyOutputReference | GaussdbMysqlInstanceAutoScalingScalingStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    flavor_switch: {
      value: cdktf.stringToHclTerraform(struct!.flavorSwitch),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    read_only_switch: {
      value: cdktf.stringToHclTerraform(struct!.readOnlySwitch),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GaussdbMysqlInstanceAutoScalingScalingStrategyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): GaussdbMysqlInstanceAutoScalingScalingStrategy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._flavorSwitch !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavorSwitch = this._flavorSwitch;
    }
    if (this._readOnlySwitch !== undefined) {
      hasAnyValues = true;
      internalValueResult.readOnlySwitch = this._readOnlySwitch;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlInstanceAutoScalingScalingStrategy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._flavorSwitch = undefined;
      this._readOnlySwitch = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._flavorSwitch = value.flavorSwitch;
      this._readOnlySwitch = value.readOnlySwitch;
    }
  }

  // flavor_switch - computed: false, optional: false, required: true
  private _flavorSwitch?: string; 
  public get flavorSwitch() {
    return this.getStringAttribute('flavor_switch');
  }
  public set flavorSwitch(value: string) {
    this._flavorSwitch = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorSwitchInput() {
    return this._flavorSwitch;
  }

  // read_only_switch - computed: false, optional: false, required: true
  private _readOnlySwitch?: string; 
  public get readOnlySwitch() {
    return this.getStringAttribute('read_only_switch');
  }
  public set readOnlySwitch(value: string) {
    this._readOnlySwitch = value;
  }
  // Temporarily expose input value. Use with caution.
  public get readOnlySwitchInput() {
    return this._readOnlySwitch;
  }
}
export interface GaussdbMysqlInstanceAutoScaling {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#enlarge_threshold GaussdbMysqlInstance#enlarge_threshold}
  */
  readonly enlargeThreshold?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#max_flavor GaussdbMysqlInstance#max_flavor}
  */
  readonly maxFlavor?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#max_read_only_count GaussdbMysqlInstance#max_read_only_count}
  */
  readonly maxReadOnlyCount?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#monitor_cycle GaussdbMysqlInstance#monitor_cycle}
  */
  readonly monitorCycle?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#read_only_weight GaussdbMysqlInstance#read_only_weight}
  */
  readonly readOnlyWeight?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#reduce_enabled GaussdbMysqlInstance#reduce_enabled}
  */
  readonly reduceEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#silence_cycle GaussdbMysqlInstance#silence_cycle}
  */
  readonly silenceCycle?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#status GaussdbMysqlInstance#status}
  */
  readonly status: string;
  /**
  * scaling_strategy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#scaling_strategy GaussdbMysqlInstance#scaling_strategy}
  */
  readonly scalingStrategy: GaussdbMysqlInstanceAutoScalingScalingStrategy;
}

export function gaussdbMysqlInstanceAutoScalingToTerraform(struct?: GaussdbMysqlInstanceAutoScalingOutputReference | GaussdbMysqlInstanceAutoScaling): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enlarge_threshold: cdktf.numberToTerraform(struct!.enlargeThreshold),
    max_flavor: cdktf.stringToTerraform(struct!.maxFlavor),
    max_read_only_count: cdktf.numberToTerraform(struct!.maxReadOnlyCount),
    monitor_cycle: cdktf.numberToTerraform(struct!.monitorCycle),
    read_only_weight: cdktf.numberToTerraform(struct!.readOnlyWeight),
    reduce_enabled: cdktf.booleanToTerraform(struct!.reduceEnabled),
    silence_cycle: cdktf.numberToTerraform(struct!.silenceCycle),
    status: cdktf.stringToTerraform(struct!.status),
    scaling_strategy: gaussdbMysqlInstanceAutoScalingScalingStrategyToTerraform(struct!.scalingStrategy),
  }
}


export function gaussdbMysqlInstanceAutoScalingToHclTerraform(struct?: GaussdbMysqlInstanceAutoScalingOutputReference | GaussdbMysqlInstanceAutoScaling): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enlarge_threshold: {
      value: cdktf.numberToHclTerraform(struct!.enlargeThreshold),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_flavor: {
      value: cdktf.stringToHclTerraform(struct!.maxFlavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_read_only_count: {
      value: cdktf.numberToHclTerraform(struct!.maxReadOnlyCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    monitor_cycle: {
      value: cdktf.numberToHclTerraform(struct!.monitorCycle),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    read_only_weight: {
      value: cdktf.numberToHclTerraform(struct!.readOnlyWeight),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    reduce_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.reduceEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    silence_cycle: {
      value: cdktf.numberToHclTerraform(struct!.silenceCycle),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    status: {
      value: cdktf.stringToHclTerraform(struct!.status),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scaling_strategy: {
      value: gaussdbMysqlInstanceAutoScalingScalingStrategyToHclTerraform(struct!.scalingStrategy),
      isBlock: true,
      type: "list",
      storageClassType: "GaussdbMysqlInstanceAutoScalingScalingStrategyList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GaussdbMysqlInstanceAutoScalingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): GaussdbMysqlInstanceAutoScaling | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enlargeThreshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.enlargeThreshold = this._enlargeThreshold;
    }
    if (this._maxFlavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxFlavor = this._maxFlavor;
    }
    if (this._maxReadOnlyCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxReadOnlyCount = this._maxReadOnlyCount;
    }
    if (this._monitorCycle !== undefined) {
      hasAnyValues = true;
      internalValueResult.monitorCycle = this._monitorCycle;
    }
    if (this._readOnlyWeight !== undefined) {
      hasAnyValues = true;
      internalValueResult.readOnlyWeight = this._readOnlyWeight;
    }
    if (this._reduceEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.reduceEnabled = this._reduceEnabled;
    }
    if (this._silenceCycle !== undefined) {
      hasAnyValues = true;
      internalValueResult.silenceCycle = this._silenceCycle;
    }
    if (this._status !== undefined) {
      hasAnyValues = true;
      internalValueResult.status = this._status;
    }
    if (this._scalingStrategy?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.scalingStrategy = this._scalingStrategy?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlInstanceAutoScaling | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enlargeThreshold = undefined;
      this._maxFlavor = undefined;
      this._maxReadOnlyCount = undefined;
      this._monitorCycle = undefined;
      this._readOnlyWeight = undefined;
      this._reduceEnabled = undefined;
      this._silenceCycle = undefined;
      this._status = undefined;
      this._scalingStrategy.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enlargeThreshold = value.enlargeThreshold;
      this._maxFlavor = value.maxFlavor;
      this._maxReadOnlyCount = value.maxReadOnlyCount;
      this._monitorCycle = value.monitorCycle;
      this._readOnlyWeight = value.readOnlyWeight;
      this._reduceEnabled = value.reduceEnabled;
      this._silenceCycle = value.silenceCycle;
      this._status = value.status;
      this._scalingStrategy.internalValue = value.scalingStrategy;
    }
  }

  // enlarge_threshold - computed: true, optional: true, required: false
  private _enlargeThreshold?: number; 
  public get enlargeThreshold() {
    return this.getNumberAttribute('enlarge_threshold');
  }
  public set enlargeThreshold(value: number) {
    this._enlargeThreshold = value;
  }
  public resetEnlargeThreshold() {
    this._enlargeThreshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enlargeThresholdInput() {
    return this._enlargeThreshold;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // max_flavor - computed: true, optional: true, required: false
  private _maxFlavor?: string; 
  public get maxFlavor() {
    return this.getStringAttribute('max_flavor');
  }
  public set maxFlavor(value: string) {
    this._maxFlavor = value;
  }
  public resetMaxFlavor() {
    this._maxFlavor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxFlavorInput() {
    return this._maxFlavor;
  }

  // max_read_only_count - computed: true, optional: true, required: false
  private _maxReadOnlyCount?: number; 
  public get maxReadOnlyCount() {
    return this.getNumberAttribute('max_read_only_count');
  }
  public set maxReadOnlyCount(value: number) {
    this._maxReadOnlyCount = value;
  }
  public resetMaxReadOnlyCount() {
    this._maxReadOnlyCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxReadOnlyCountInput() {
    return this._maxReadOnlyCount;
  }

  // min_flavor - computed: true, optional: false, required: false
  public get minFlavor() {
    return this.getStringAttribute('min_flavor');
  }

  // min_read_only_count - computed: true, optional: false, required: false
  public get minReadOnlyCount() {
    return this.getNumberAttribute('min_read_only_count');
  }

  // monitor_cycle - computed: true, optional: true, required: false
  private _monitorCycle?: number; 
  public get monitorCycle() {
    return this.getNumberAttribute('monitor_cycle');
  }
  public set monitorCycle(value: number) {
    this._monitorCycle = value;
  }
  public resetMonitorCycle() {
    this._monitorCycle = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get monitorCycleInput() {
    return this._monitorCycle;
  }

  // read_only_weight - computed: true, optional: true, required: false
  private _readOnlyWeight?: number; 
  public get readOnlyWeight() {
    return this.getNumberAttribute('read_only_weight');
  }
  public set readOnlyWeight(value: number) {
    this._readOnlyWeight = value;
  }
  public resetReadOnlyWeight() {
    this._readOnlyWeight = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readOnlyWeightInput() {
    return this._readOnlyWeight;
  }

  // reduce_enabled - computed: true, optional: true, required: false
  private _reduceEnabled?: boolean | cdktf.IResolvable; 
  public get reduceEnabled() {
    return this.getBooleanAttribute('reduce_enabled');
  }
  public set reduceEnabled(value: boolean | cdktf.IResolvable) {
    this._reduceEnabled = value;
  }
  public resetReduceEnabled() {
    this._reduceEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get reduceEnabledInput() {
    return this._reduceEnabled;
  }

  // silence_cycle - computed: true, optional: true, required: false
  private _silenceCycle?: number; 
  public get silenceCycle() {
    return this.getNumberAttribute('silence_cycle');
  }
  public set silenceCycle(value: number) {
    this._silenceCycle = value;
  }
  public resetSilenceCycle() {
    this._silenceCycle = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get silenceCycleInput() {
    return this._silenceCycle;
  }

  // silence_start_at - computed: true, optional: false, required: false
  public get silenceStartAt() {
    return this.getStringAttribute('silence_start_at');
  }

  // status - computed: false, optional: false, required: true
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // scaling_strategy - computed: false, optional: false, required: true
  private _scalingStrategy = new GaussdbMysqlInstanceAutoScalingScalingStrategyOutputReference(this, "scaling_strategy");
  public get scalingStrategy() {
    return this._scalingStrategy;
  }
  public putScalingStrategy(value: GaussdbMysqlInstanceAutoScalingScalingStrategy) {
    this._scalingStrategy.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingStrategyInput() {
    return this._scalingStrategy.internalValue;
  }
}
export interface GaussdbMysqlInstanceBackupStrategy {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#keep_days GaussdbMysqlInstance#keep_days}
  */
  readonly keepDays?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#start_time GaussdbMysqlInstance#start_time}
  */
  readonly startTime: string;
}

export function gaussdbMysqlInstanceBackupStrategyToTerraform(struct?: GaussdbMysqlInstanceBackupStrategyOutputReference | GaussdbMysqlInstanceBackupStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    keep_days: cdktf.numberToTerraform(struct!.keepDays),
    start_time: cdktf.stringToTerraform(struct!.startTime),
  }
}


export function gaussdbMysqlInstanceBackupStrategyToHclTerraform(struct?: GaussdbMysqlInstanceBackupStrategyOutputReference | GaussdbMysqlInstanceBackupStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    keep_days: {
      value: cdktf.numberToHclTerraform(struct!.keepDays),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    start_time: {
      value: cdktf.stringToHclTerraform(struct!.startTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GaussdbMysqlInstanceBackupStrategyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): GaussdbMysqlInstanceBackupStrategy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._keepDays !== undefined) {
      hasAnyValues = true;
      internalValueResult.keepDays = this._keepDays;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlInstanceBackupStrategy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._keepDays = undefined;
      this._startTime = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._keepDays = value.keepDays;
      this._startTime = value.startTime;
    }
  }

  // keep_days - computed: false, optional: true, required: false
  private _keepDays?: number; 
  public get keepDays() {
    return this.getNumberAttribute('keep_days');
  }
  public set keepDays(value: number) {
    this._keepDays = value;
  }
  public resetKeepDays() {
    this._keepDays = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keepDaysInput() {
    return this._keepDays;
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
}
export interface GaussdbMysqlInstanceDatastore {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#engine GaussdbMysqlInstance#engine}
  */
  readonly engine: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#version GaussdbMysqlInstance#version}
  */
  readonly version: string;
}

export function gaussdbMysqlInstanceDatastoreToTerraform(struct?: GaussdbMysqlInstanceDatastoreOutputReference | GaussdbMysqlInstanceDatastore): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    engine: cdktf.stringToTerraform(struct!.engine),
    version: cdktf.stringToTerraform(struct!.version),
  }
}


export function gaussdbMysqlInstanceDatastoreToHclTerraform(struct?: GaussdbMysqlInstanceDatastoreOutputReference | GaussdbMysqlInstanceDatastore): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    engine: {
      value: cdktf.stringToHclTerraform(struct!.engine),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    version: {
      value: cdktf.stringToHclTerraform(struct!.version),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GaussdbMysqlInstanceDatastoreOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): GaussdbMysqlInstanceDatastore | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._engine !== undefined) {
      hasAnyValues = true;
      internalValueResult.engine = this._engine;
    }
    if (this._version !== undefined) {
      hasAnyValues = true;
      internalValueResult.version = this._version;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlInstanceDatastore | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._engine = undefined;
      this._version = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._engine = value.engine;
      this._version = value.version;
    }
  }

  // engine - computed: false, optional: false, required: true
  private _engine?: string; 
  public get engine() {
    return this.getStringAttribute('engine');
  }
  public set engine(value: string) {
    this._engine = value;
  }
  // Temporarily expose input value. Use with caution.
  public get engineInput() {
    return this._engine;
  }

  // version - computed: false, optional: false, required: true
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }
}
export interface GaussdbMysqlInstanceParameters {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#name GaussdbMysqlInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#value GaussdbMysqlInstance#value}
  */
  readonly value: string;
}

export function gaussdbMysqlInstanceParametersToTerraform(struct?: GaussdbMysqlInstanceParameters | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function gaussdbMysqlInstanceParametersToHclTerraform(struct?: GaussdbMysqlInstanceParameters | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GaussdbMysqlInstanceParametersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): GaussdbMysqlInstanceParameters | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlInstanceParameters | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._value = value.value;
    }
  }

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class GaussdbMysqlInstanceParametersList extends cdktf.ComplexList {
  public internalValue? : GaussdbMysqlInstanceParameters[] | cdktf.IResolvable

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
  public get(index: number): GaussdbMysqlInstanceParametersOutputReference {
    return new GaussdbMysqlInstanceParametersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface GaussdbMysqlInstanceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#create GaussdbMysqlInstance#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#delete GaussdbMysqlInstance#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#update GaussdbMysqlInstance#update}
  */
  readonly update?: string;
}

export function gaussdbMysqlInstanceTimeoutsToTerraform(struct?: GaussdbMysqlInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function gaussdbMysqlInstanceTimeoutsToHclTerraform(struct?: GaussdbMysqlInstanceTimeouts | cdktf.IResolvable): any {
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
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GaussdbMysqlInstanceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): GaussdbMysqlInstanceTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlInstanceTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
      this._update = value.update;
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

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance huaweicloud_gaussdb_mysql_instance}
*/
export class GaussdbMysqlInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_gaussdb_mysql_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a GaussdbMysqlInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the GaussdbMysqlInstance to import
  * @param importFromId The id of the existing GaussdbMysqlInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the GaussdbMysqlInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_gaussdb_mysql_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_instance huaweicloud_gaussdb_mysql_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options GaussdbMysqlInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: GaussdbMysqlInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_gaussdb_mysql_instance',
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
    this._auditLogEnabled = config.auditLogEnabled;
    this._autoPay = config.autoPay;
    this._autoRenew = config.autoRenew;
    this._availabilityZoneMode = config.availabilityZoneMode;
    this._chargingMode = config.chargingMode;
    this._configurationId = config.configurationId;
    this._configurationName = config.configurationName;
    this._dedicatedResourceId = config.dedicatedResourceId;
    this._dedicatedResourceName = config.dedicatedResourceName;
    this._description = config.description;
    this._encryptionStatus = config.encryptionStatus;
    this._encryptionType = config.encryptionType;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._flavor = config.flavor;
    this._forceImport = config.forceImport;
    this._id = config.id;
    this._kmsKeyId = config.kmsKeyId;
    this._maintainBegin = config.maintainBegin;
    this._maintainEnd = config.maintainEnd;
    this._masterAvailabilityZone = config.masterAvailabilityZone;
    this._name = config.name;
    this._password = config.password;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._port = config.port;
    this._privateDnsNamePrefix = config.privateDnsNamePrefix;
    this._privateWriteIp = config.privateWriteIp;
    this._proxyFlavor = config.proxyFlavor;
    this._proxyNodeNum = config.proxyNodeNum;
    this._readReplicas = config.readReplicas;
    this._region = config.region;
    this._secondsLevelMonitoringEnabled = config.secondsLevelMonitoringEnabled;
    this._secondsLevelMonitoringPeriod = config.secondsLevelMonitoringPeriod;
    this._securityGroupId = config.securityGroupId;
    this._slowLogShowOriginalSwitch = config.slowLogShowOriginalSwitch;
    this._sqlFilterEnabled = config.sqlFilterEnabled;
    this._sslOption = config.sslOption;
    this._subnetId = config.subnetId;
    this._tableNameCaseSensitivity = config.tableNameCaseSensitivity;
    this._tags = config.tags;
    this._timeZone = config.timeZone;
    this._volumeSize = config.volumeSize;
    this._vpcId = config.vpcId;
    this._autoScaling.internalValue = config.autoScaling;
    this._backupStrategy.internalValue = config.backupStrategy;
    this._datastore.internalValue = config.datastore;
    this._parameters.internalValue = config.parameters;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // audit_log_enabled - computed: true, optional: true, required: false
  private _auditLogEnabled?: boolean | cdktf.IResolvable; 
  public get auditLogEnabled() {
    return this.getBooleanAttribute('audit_log_enabled');
  }
  public set auditLogEnabled(value: boolean | cdktf.IResolvable) {
    this._auditLogEnabled = value;
  }
  public resetAuditLogEnabled() {
    this._auditLogEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get auditLogEnabledInput() {
    return this._auditLogEnabled;
  }

  // auto_pay - computed: false, optional: true, required: false
  private _autoPay?: string; 
  public get autoPay() {
    return this.getStringAttribute('auto_pay');
  }
  public set autoPay(value: string) {
    this._autoPay = value;
  }
  public resetAutoPay() {
    this._autoPay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoPayInput() {
    return this._autoPay;
  }

  // auto_renew - computed: false, optional: true, required: false
  private _autoRenew?: string; 
  public get autoRenew() {
    return this.getStringAttribute('auto_renew');
  }
  public set autoRenew(value: string) {
    this._autoRenew = value;
  }
  public resetAutoRenew() {
    this._autoRenew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoRenewInput() {
    return this._autoRenew;
  }

  // availability_zone_mode - computed: false, optional: true, required: false
  private _availabilityZoneMode?: string; 
  public get availabilityZoneMode() {
    return this.getStringAttribute('availability_zone_mode');
  }
  public set availabilityZoneMode(value: string) {
    this._availabilityZoneMode = value;
  }
  public resetAvailabilityZoneMode() {
    this._availabilityZoneMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneModeInput() {
    return this._availabilityZoneMode;
  }

  // charging_mode - computed: false, optional: true, required: false
  private _chargingMode?: string; 
  public get chargingMode() {
    return this.getStringAttribute('charging_mode');
  }
  public set chargingMode(value: string) {
    this._chargingMode = value;
  }
  public resetChargingMode() {
    this._chargingMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chargingModeInput() {
    return this._chargingMode;
  }

  // configuration_id - computed: true, optional: true, required: false
  private _configurationId?: string; 
  public get configurationId() {
    return this.getStringAttribute('configuration_id');
  }
  public set configurationId(value: string) {
    this._configurationId = value;
  }
  public resetConfigurationId() {
    this._configurationId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationIdInput() {
    return this._configurationId;
  }

  // configuration_name - computed: true, optional: true, required: false
  private _configurationName?: string; 
  public get configurationName() {
    return this.getStringAttribute('configuration_name');
  }
  public set configurationName(value: string) {
    this._configurationName = value;
  }
  public resetConfigurationName() {
    this._configurationName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationNameInput() {
    return this._configurationName;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // current_kernel_version - computed: true, optional: false, required: false
  public get currentKernelVersion() {
    return this.getStringAttribute('current_kernel_version');
  }

  // current_version - computed: true, optional: false, required: false
  public get currentVersion() {
    return this.getStringAttribute('current_version');
  }

  // db_user_name - computed: true, optional: false, required: false
  public get dbUserName() {
    return this.getStringAttribute('db_user_name');
  }

  // dedicated_resource_id - computed: true, optional: true, required: false
  private _dedicatedResourceId?: string; 
  public get dedicatedResourceId() {
    return this.getStringAttribute('dedicated_resource_id');
  }
  public set dedicatedResourceId(value: string) {
    this._dedicatedResourceId = value;
  }
  public resetDedicatedResourceId() {
    this._dedicatedResourceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dedicatedResourceIdInput() {
    return this._dedicatedResourceId;
  }

  // dedicated_resource_name - computed: true, optional: true, required: false
  private _dedicatedResourceName?: string; 
  public get dedicatedResourceName() {
    return this.getStringAttribute('dedicated_resource_name');
  }
  public set dedicatedResourceName(value: string) {
    this._dedicatedResourceName = value;
  }
  public resetDedicatedResourceName() {
    this._dedicatedResourceName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dedicatedResourceNameInput() {
    return this._dedicatedResourceName;
  }

  // description - computed: false, optional: true, required: false
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  public resetDescription() {
    this._description = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
  }

  // encryption_status - computed: true, optional: true, required: false
  private _encryptionStatus?: string; 
  public get encryptionStatus() {
    return this.getStringAttribute('encryption_status');
  }
  public set encryptionStatus(value: string) {
    this._encryptionStatus = value;
  }
  public resetEncryptionStatus() {
    this._encryptionStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptionStatusInput() {
    return this._encryptionStatus;
  }

  // encryption_type - computed: false, optional: true, required: false
  private _encryptionType?: string; 
  public get encryptionType() {
    return this.getStringAttribute('encryption_type');
  }
  public set encryptionType(value: string) {
    this._encryptionType = value;
  }
  public resetEncryptionType() {
    this._encryptionType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptionTypeInput() {
    return this._encryptionType;
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

  // flavor - computed: false, optional: false, required: true
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // force_import - computed: false, optional: true, required: false
  private _forceImport?: boolean | cdktf.IResolvable; 
  public get forceImport() {
    return this.getBooleanAttribute('force_import');
  }
  public set forceImport(value: boolean | cdktf.IResolvable) {
    this._forceImport = value;
  }
  public resetForceImport() {
    this._forceImport = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forceImportInput() {
    return this._forceImport;
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

  // kms_key_id - computed: false, optional: true, required: false
  private _kmsKeyId?: string; 
  public get kmsKeyId() {
    return this.getStringAttribute('kms_key_id');
  }
  public set kmsKeyId(value: string) {
    this._kmsKeyId = value;
  }
  public resetKmsKeyId() {
    this._kmsKeyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kmsKeyIdInput() {
    return this._kmsKeyId;
  }

  // maintain_begin - computed: true, optional: true, required: false
  private _maintainBegin?: string; 
  public get maintainBegin() {
    return this.getStringAttribute('maintain_begin');
  }
  public set maintainBegin(value: string) {
    this._maintainBegin = value;
  }
  public resetMaintainBegin() {
    this._maintainBegin = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maintainBeginInput() {
    return this._maintainBegin;
  }

  // maintain_end - computed: true, optional: true, required: false
  private _maintainEnd?: string; 
  public get maintainEnd() {
    return this.getStringAttribute('maintain_end');
  }
  public set maintainEnd(value: string) {
    this._maintainEnd = value;
  }
  public resetMaintainEnd() {
    this._maintainEnd = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maintainEndInput() {
    return this._maintainEnd;
  }

  // master_availability_zone - computed: true, optional: true, required: false
  private _masterAvailabilityZone?: string; 
  public get masterAvailabilityZone() {
    return this.getStringAttribute('master_availability_zone');
  }
  public set masterAvailabilityZone(value: string) {
    this._masterAvailabilityZone = value;
  }
  public resetMasterAvailabilityZone() {
    this._masterAvailabilityZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get masterAvailabilityZoneInput() {
    return this._masterAvailabilityZone;
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // nodes - computed: true, optional: false, required: false
  private _nodes = new GaussdbMysqlInstanceNodesList(this, "nodes", false);
  public get nodes() {
    return this._nodes;
  }

  // password - computed: false, optional: false, required: true
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // period - computed: false, optional: true, required: false
  private _period?: number; 
  public get period() {
    return this.getNumberAttribute('period');
  }
  public set period(value: number) {
    this._period = value;
  }
  public resetPeriod() {
    this._period = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodInput() {
    return this._period;
  }

  // period_unit - computed: false, optional: true, required: false
  private _periodUnit?: string; 
  public get periodUnit() {
    return this.getStringAttribute('period_unit');
  }
  public set periodUnit(value: string) {
    this._periodUnit = value;
  }
  public resetPeriodUnit() {
    this._periodUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodUnitInput() {
    return this._periodUnit;
  }

  // port - computed: true, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }

  // private_dns_name - computed: true, optional: false, required: false
  public get privateDnsName() {
    return this.getStringAttribute('private_dns_name');
  }

  // private_dns_name_prefix - computed: true, optional: true, required: false
  private _privateDnsNamePrefix?: string; 
  public get privateDnsNamePrefix() {
    return this.getStringAttribute('private_dns_name_prefix');
  }
  public set privateDnsNamePrefix(value: string) {
    this._privateDnsNamePrefix = value;
  }
  public resetPrivateDnsNamePrefix() {
    this._privateDnsNamePrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateDnsNamePrefixInput() {
    return this._privateDnsNamePrefix;
  }

  // private_write_ip - computed: true, optional: true, required: false
  private _privateWriteIp?: string; 
  public get privateWriteIp() {
    return this.getStringAttribute('private_write_ip');
  }
  public set privateWriteIp(value: string) {
    this._privateWriteIp = value;
  }
  public resetPrivateWriteIp() {
    this._privateWriteIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateWriteIpInput() {
    return this._privateWriteIp;
  }

  // proxy_address - computed: true, optional: false, required: false
  public get proxyAddress() {
    return this.getStringAttribute('proxy_address');
  }

  // proxy_flavor - computed: true, optional: true, required: false
  private _proxyFlavor?: string; 
  public get proxyFlavor() {
    return this.getStringAttribute('proxy_flavor');
  }
  public set proxyFlavor(value: string) {
    this._proxyFlavor = value;
  }
  public resetProxyFlavor() {
    this._proxyFlavor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get proxyFlavorInput() {
    return this._proxyFlavor;
  }

  // proxy_node_num - computed: true, optional: true, required: false
  private _proxyNodeNum?: number; 
  public get proxyNodeNum() {
    return this.getNumberAttribute('proxy_node_num');
  }
  public set proxyNodeNum(value: number) {
    this._proxyNodeNum = value;
  }
  public resetProxyNodeNum() {
    this._proxyNodeNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get proxyNodeNumInput() {
    return this._proxyNodeNum;
  }

  // proxy_port - computed: true, optional: false, required: false
  public get proxyPort() {
    return this.getNumberAttribute('proxy_port');
  }

  // read_replicas - computed: false, optional: true, required: false
  private _readReplicas?: number; 
  public get readReplicas() {
    return this.getNumberAttribute('read_replicas');
  }
  public set readReplicas(value: number) {
    this._readReplicas = value;
  }
  public resetReadReplicas() {
    this._readReplicas = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readReplicasInput() {
    return this._readReplicas;
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

  // seconds_level_monitoring_enabled - computed: true, optional: true, required: false
  private _secondsLevelMonitoringEnabled?: boolean | cdktf.IResolvable; 
  public get secondsLevelMonitoringEnabled() {
    return this.getBooleanAttribute('seconds_level_monitoring_enabled');
  }
  public set secondsLevelMonitoringEnabled(value: boolean | cdktf.IResolvable) {
    this._secondsLevelMonitoringEnabled = value;
  }
  public resetSecondsLevelMonitoringEnabled() {
    this._secondsLevelMonitoringEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secondsLevelMonitoringEnabledInput() {
    return this._secondsLevelMonitoringEnabled;
  }

  // seconds_level_monitoring_period - computed: false, optional: true, required: false
  private _secondsLevelMonitoringPeriod?: number; 
  public get secondsLevelMonitoringPeriod() {
    return this.getNumberAttribute('seconds_level_monitoring_period');
  }
  public set secondsLevelMonitoringPeriod(value: number) {
    this._secondsLevelMonitoringPeriod = value;
  }
  public resetSecondsLevelMonitoringPeriod() {
    this._secondsLevelMonitoringPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secondsLevelMonitoringPeriodInput() {
    return this._secondsLevelMonitoringPeriod;
  }

  // security_group_id - computed: true, optional: true, required: false
  private _securityGroupId?: string; 
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }
  public set securityGroupId(value: string) {
    this._securityGroupId = value;
  }
  public resetSecurityGroupId() {
    this._securityGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupIdInput() {
    return this._securityGroupId;
  }

  // slow_log_show_original_switch - computed: true, optional: true, required: false
  private _slowLogShowOriginalSwitch?: boolean | cdktf.IResolvable; 
  public get slowLogShowOriginalSwitch() {
    return this.getBooleanAttribute('slow_log_show_original_switch');
  }
  public set slowLogShowOriginalSwitch(value: boolean | cdktf.IResolvable) {
    this._slowLogShowOriginalSwitch = value;
  }
  public resetSlowLogShowOriginalSwitch() {
    this._slowLogShowOriginalSwitch = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get slowLogShowOriginalSwitchInput() {
    return this._slowLogShowOriginalSwitch;
  }

  // sql_filter_enabled - computed: true, optional: true, required: false
  private _sqlFilterEnabled?: boolean | cdktf.IResolvable; 
  public get sqlFilterEnabled() {
    return this.getBooleanAttribute('sql_filter_enabled');
  }
  public set sqlFilterEnabled(value: boolean | cdktf.IResolvable) {
    this._sqlFilterEnabled = value;
  }
  public resetSqlFilterEnabled() {
    this._sqlFilterEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sqlFilterEnabledInput() {
    return this._sqlFilterEnabled;
  }

  // ssl_option - computed: false, optional: true, required: false
  private _sslOption?: string; 
  public get sslOption() {
    return this.getStringAttribute('ssl_option');
  }
  public set sslOption(value: string) {
    this._sslOption = value;
  }
  public resetSslOption() {
    this._sslOption = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslOptionInput() {
    return this._sslOption;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subnet_id - computed: false, optional: false, required: true
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
  }

  // table_name_case_sensitivity - computed: false, optional: true, required: false
  private _tableNameCaseSensitivity?: boolean | cdktf.IResolvable; 
  public get tableNameCaseSensitivity() {
    return this.getBooleanAttribute('table_name_case_sensitivity');
  }
  public set tableNameCaseSensitivity(value: boolean | cdktf.IResolvable) {
    this._tableNameCaseSensitivity = value;
  }
  public resetTableNameCaseSensitivity() {
    this._tableNameCaseSensitivity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tableNameCaseSensitivityInput() {
    return this._tableNameCaseSensitivity;
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // time_zone - computed: false, optional: true, required: false
  private _timeZone?: string; 
  public get timeZone() {
    return this.getStringAttribute('time_zone');
  }
  public set timeZone(value: string) {
    this._timeZone = value;
  }
  public resetTimeZone() {
    this._timeZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeZoneInput() {
    return this._timeZone;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // upgrade_flag - computed: true, optional: false, required: false
  public get upgradeFlag() {
    return this.getBooleanAttribute('upgrade_flag');
  }

  // volume_size - computed: true, optional: true, required: false
  private _volumeSize?: number; 
  public get volumeSize() {
    return this.getNumberAttribute('volume_size');
  }
  public set volumeSize(value: number) {
    this._volumeSize = value;
  }
  public resetVolumeSize() {
    this._volumeSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeSizeInput() {
    return this._volumeSize;
  }

  // vpc_id - computed: false, optional: false, required: true
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // auto_scaling - computed: false, optional: true, required: false
  private _autoScaling = new GaussdbMysqlInstanceAutoScalingOutputReference(this, "auto_scaling");
  public get autoScaling() {
    return this._autoScaling;
  }
  public putAutoScaling(value: GaussdbMysqlInstanceAutoScaling) {
    this._autoScaling.internalValue = value;
  }
  public resetAutoScaling() {
    this._autoScaling.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoScalingInput() {
    return this._autoScaling.internalValue;
  }

  // backup_strategy - computed: false, optional: true, required: false
  private _backupStrategy = new GaussdbMysqlInstanceBackupStrategyOutputReference(this, "backup_strategy");
  public get backupStrategy() {
    return this._backupStrategy;
  }
  public putBackupStrategy(value: GaussdbMysqlInstanceBackupStrategy) {
    this._backupStrategy.internalValue = value;
  }
  public resetBackupStrategy() {
    this._backupStrategy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backupStrategyInput() {
    return this._backupStrategy.internalValue;
  }

  // datastore - computed: false, optional: true, required: false
  private _datastore = new GaussdbMysqlInstanceDatastoreOutputReference(this, "datastore");
  public get datastore() {
    return this._datastore;
  }
  public putDatastore(value: GaussdbMysqlInstanceDatastore) {
    this._datastore.internalValue = value;
  }
  public resetDatastore() {
    this._datastore.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get datastoreInput() {
    return this._datastore.internalValue;
  }

  // parameters - computed: false, optional: true, required: false
  private _parameters = new GaussdbMysqlInstanceParametersList(this, "parameters", true);
  public get parameters() {
    return this._parameters;
  }
  public putParameters(value: GaussdbMysqlInstanceParameters[] | cdktf.IResolvable) {
    this._parameters.internalValue = value;
  }
  public resetParameters() {
    this._parameters.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parametersInput() {
    return this._parameters.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new GaussdbMysqlInstanceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: GaussdbMysqlInstanceTimeouts) {
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
      audit_log_enabled: cdktf.booleanToTerraform(this._auditLogEnabled),
      auto_pay: cdktf.stringToTerraform(this._autoPay),
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      availability_zone_mode: cdktf.stringToTerraform(this._availabilityZoneMode),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      configuration_id: cdktf.stringToTerraform(this._configurationId),
      configuration_name: cdktf.stringToTerraform(this._configurationName),
      dedicated_resource_id: cdktf.stringToTerraform(this._dedicatedResourceId),
      dedicated_resource_name: cdktf.stringToTerraform(this._dedicatedResourceName),
      description: cdktf.stringToTerraform(this._description),
      encryption_status: cdktf.stringToTerraform(this._encryptionStatus),
      encryption_type: cdktf.stringToTerraform(this._encryptionType),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      flavor: cdktf.stringToTerraform(this._flavor),
      force_import: cdktf.booleanToTerraform(this._forceImport),
      id: cdktf.stringToTerraform(this._id),
      kms_key_id: cdktf.stringToTerraform(this._kmsKeyId),
      maintain_begin: cdktf.stringToTerraform(this._maintainBegin),
      maintain_end: cdktf.stringToTerraform(this._maintainEnd),
      master_availability_zone: cdktf.stringToTerraform(this._masterAvailabilityZone),
      name: cdktf.stringToTerraform(this._name),
      password: cdktf.stringToTerraform(this._password),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      port: cdktf.numberToTerraform(this._port),
      private_dns_name_prefix: cdktf.stringToTerraform(this._privateDnsNamePrefix),
      private_write_ip: cdktf.stringToTerraform(this._privateWriteIp),
      proxy_flavor: cdktf.stringToTerraform(this._proxyFlavor),
      proxy_node_num: cdktf.numberToTerraform(this._proxyNodeNum),
      read_replicas: cdktf.numberToTerraform(this._readReplicas),
      region: cdktf.stringToTerraform(this._region),
      seconds_level_monitoring_enabled: cdktf.booleanToTerraform(this._secondsLevelMonitoringEnabled),
      seconds_level_monitoring_period: cdktf.numberToTerraform(this._secondsLevelMonitoringPeriod),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      slow_log_show_original_switch: cdktf.booleanToTerraform(this._slowLogShowOriginalSwitch),
      sql_filter_enabled: cdktf.booleanToTerraform(this._sqlFilterEnabled),
      ssl_option: cdktf.stringToTerraform(this._sslOption),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      table_name_case_sensitivity: cdktf.booleanToTerraform(this._tableNameCaseSensitivity),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      time_zone: cdktf.stringToTerraform(this._timeZone),
      volume_size: cdktf.numberToTerraform(this._volumeSize),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      auto_scaling: gaussdbMysqlInstanceAutoScalingToTerraform(this._autoScaling.internalValue),
      backup_strategy: gaussdbMysqlInstanceBackupStrategyToTerraform(this._backupStrategy.internalValue),
      datastore: gaussdbMysqlInstanceDatastoreToTerraform(this._datastore.internalValue),
      parameters: cdktf.listMapper(gaussdbMysqlInstanceParametersToTerraform, true)(this._parameters.internalValue),
      timeouts: gaussdbMysqlInstanceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      audit_log_enabled: {
        value: cdktf.booleanToHclTerraform(this._auditLogEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      auto_pay: {
        value: cdktf.stringToHclTerraform(this._autoPay),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auto_renew: {
        value: cdktf.stringToHclTerraform(this._autoRenew),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      availability_zone_mode: {
        value: cdktf.stringToHclTerraform(this._availabilityZoneMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      configuration_id: {
        value: cdktf.stringToHclTerraform(this._configurationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      configuration_name: {
        value: cdktf.stringToHclTerraform(this._configurationName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dedicated_resource_id: {
        value: cdktf.stringToHclTerraform(this._dedicatedResourceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dedicated_resource_name: {
        value: cdktf.stringToHclTerraform(this._dedicatedResourceName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      encryption_status: {
        value: cdktf.stringToHclTerraform(this._encryptionStatus),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      encryption_type: {
        value: cdktf.stringToHclTerraform(this._encryptionType),
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
      flavor: {
        value: cdktf.stringToHclTerraform(this._flavor),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      force_import: {
        value: cdktf.booleanToHclTerraform(this._forceImport),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      kms_key_id: {
        value: cdktf.stringToHclTerraform(this._kmsKeyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      maintain_begin: {
        value: cdktf.stringToHclTerraform(this._maintainBegin),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      maintain_end: {
        value: cdktf.stringToHclTerraform(this._maintainEnd),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      master_availability_zone: {
        value: cdktf.stringToHclTerraform(this._masterAvailabilityZone),
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
      password: {
        value: cdktf.stringToHclTerraform(this._password),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      period: {
        value: cdktf.numberToHclTerraform(this._period),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      period_unit: {
        value: cdktf.stringToHclTerraform(this._periodUnit),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      port: {
        value: cdktf.numberToHclTerraform(this._port),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      private_dns_name_prefix: {
        value: cdktf.stringToHclTerraform(this._privateDnsNamePrefix),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      private_write_ip: {
        value: cdktf.stringToHclTerraform(this._privateWriteIp),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      proxy_flavor: {
        value: cdktf.stringToHclTerraform(this._proxyFlavor),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      proxy_node_num: {
        value: cdktf.numberToHclTerraform(this._proxyNodeNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      read_replicas: {
        value: cdktf.numberToHclTerraform(this._readReplicas),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      seconds_level_monitoring_enabled: {
        value: cdktf.booleanToHclTerraform(this._secondsLevelMonitoringEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      seconds_level_monitoring_period: {
        value: cdktf.numberToHclTerraform(this._secondsLevelMonitoringPeriod),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      security_group_id: {
        value: cdktf.stringToHclTerraform(this._securityGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      slow_log_show_original_switch: {
        value: cdktf.booleanToHclTerraform(this._slowLogShowOriginalSwitch),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      sql_filter_enabled: {
        value: cdktf.booleanToHclTerraform(this._sqlFilterEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      ssl_option: {
        value: cdktf.stringToHclTerraform(this._sslOption),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      subnet_id: {
        value: cdktf.stringToHclTerraform(this._subnetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      table_name_case_sensitivity: {
        value: cdktf.booleanToHclTerraform(this._tableNameCaseSensitivity),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      time_zone: {
        value: cdktf.stringToHclTerraform(this._timeZone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      volume_size: {
        value: cdktf.numberToHclTerraform(this._volumeSize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auto_scaling: {
        value: gaussdbMysqlInstanceAutoScalingToHclTerraform(this._autoScaling.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "GaussdbMysqlInstanceAutoScalingList",
      },
      backup_strategy: {
        value: gaussdbMysqlInstanceBackupStrategyToHclTerraform(this._backupStrategy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "GaussdbMysqlInstanceBackupStrategyList",
      },
      datastore: {
        value: gaussdbMysqlInstanceDatastoreToHclTerraform(this._datastore.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "GaussdbMysqlInstanceDatastoreList",
      },
      parameters: {
        value: cdktf.listMapperHcl(gaussdbMysqlInstanceParametersToHclTerraform, true)(this._parameters.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "GaussdbMysqlInstanceParametersList",
      },
      timeouts: {
        value: gaussdbMysqlInstanceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "GaussdbMysqlInstanceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CssClusterConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#auto_renew CssCluster#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#availability_zone CssCluster#availability_zone}
  */
  readonly availabilityZone?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#charging_mode CssCluster#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#enable_force_new CssCluster#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#engine_type CssCluster#engine_type}
  */
  readonly engineType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#engine_version CssCluster#engine_version}
  */
  readonly engineVersion: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#enterprise_project_id CssCluster#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#expect_node_num CssCluster#expect_node_num}
  */
  readonly expectNodeNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#https_enabled CssCluster#https_enabled}
  */
  readonly httpsEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#id CssCluster#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#name CssCluster#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#password CssCluster#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#period CssCluster#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#period_unit CssCluster#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#region CssCluster#region}
  */
  readonly region?: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#security_group_id CssCluster#security_group_id}
  */
  readonly securityGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#security_mode CssCluster#security_mode}
  */
  readonly securityMode?: boolean | cdktf.IResolvable;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#subnet_id CssCluster#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#tags CssCluster#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#vpc_id CssCluster#vpc_id}
  */
  readonly vpcId?: string;
  /**
  * backup_strategy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#backup_strategy CssCluster#backup_strategy}
  */
  readonly backupStrategy?: CssClusterBackupStrategy;
  /**
  * client_node_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#client_node_config CssCluster#client_node_config}
  */
  readonly clientNodeConfig?: CssClusterClientNodeConfig;
  /**
  * cold_node_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#cold_node_config CssCluster#cold_node_config}
  */
  readonly coldNodeConfig?: CssClusterColdNodeConfig;
  /**
  * ess_node_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#ess_node_config CssCluster#ess_node_config}
  */
  readonly essNodeConfig?: CssClusterEssNodeConfig;
  /**
  * kibana_public_access block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#kibana_public_access CssCluster#kibana_public_access}
  */
  readonly kibanaPublicAccess?: CssClusterKibanaPublicAccess;
  /**
  * master_node_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#master_node_config CssCluster#master_node_config}
  */
  readonly masterNodeConfig?: CssClusterMasterNodeConfig;
  /**
  * node_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#node_config CssCluster#node_config}
  */
  readonly nodeConfig?: CssClusterNodeConfig;
  /**
  * public_access block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#public_access CssCluster#public_access}
  */
  readonly publicAccess?: CssClusterPublicAccess;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#timeouts CssCluster#timeouts}
  */
  readonly timeouts?: CssClusterTimeouts;
  /**
  * vpcep_endpoint block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#vpcep_endpoint CssCluster#vpcep_endpoint}
  */
  readonly vpcepEndpoint?: CssClusterVpcepEndpoint;
}
export interface CssClusterNodes {
}

export function cssClusterNodesToTerraform(struct?: CssClusterNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function cssClusterNodesToHclTerraform(struct?: CssClusterNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CssClusterNodesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CssClusterNodes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterNodes | undefined) {
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

  // ip - computed: true, optional: false, required: false
  public get ip() {
    return this.getStringAttribute('ip');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // resource_id - computed: true, optional: false, required: false
  public get resourceId() {
    return this.getStringAttribute('resource_id');
  }

  // spec_code - computed: true, optional: false, required: false
  public get specCode() {
    return this.getStringAttribute('spec_code');
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

export class CssClusterNodesList extends cdktf.ComplexList {

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
  public get(index: number): CssClusterNodesOutputReference {
    return new CssClusterNodesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CssClusterBackupStrategy {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#agency CssCluster#agency}
  */
  readonly agency?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#backup_path CssCluster#backup_path}
  */
  readonly backupPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#bucket CssCluster#bucket}
  */
  readonly bucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#keep_days CssCluster#keep_days}
  */
  readonly keepDays?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#prefix CssCluster#prefix}
  */
  readonly prefix?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#start_time CssCluster#start_time}
  */
  readonly startTime: string;
}

export function cssClusterBackupStrategyToTerraform(struct?: CssClusterBackupStrategyOutputReference | CssClusterBackupStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    agency: cdktf.stringToTerraform(struct!.agency),
    backup_path: cdktf.stringToTerraform(struct!.backupPath),
    bucket: cdktf.stringToTerraform(struct!.bucket),
    keep_days: cdktf.numberToTerraform(struct!.keepDays),
    prefix: cdktf.stringToTerraform(struct!.prefix),
    start_time: cdktf.stringToTerraform(struct!.startTime),
  }
}


export function cssClusterBackupStrategyToHclTerraform(struct?: CssClusterBackupStrategyOutputReference | CssClusterBackupStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    agency: {
      value: cdktf.stringToHclTerraform(struct!.agency),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    backup_path: {
      value: cdktf.stringToHclTerraform(struct!.backupPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bucket: {
      value: cdktf.stringToHclTerraform(struct!.bucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    keep_days: {
      value: cdktf.numberToHclTerraform(struct!.keepDays),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    prefix: {
      value: cdktf.stringToHclTerraform(struct!.prefix),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
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

export class CssClusterBackupStrategyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterBackupStrategy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._agency !== undefined) {
      hasAnyValues = true;
      internalValueResult.agency = this._agency;
    }
    if (this._backupPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.backupPath = this._backupPath;
    }
    if (this._bucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucket = this._bucket;
    }
    if (this._keepDays !== undefined) {
      hasAnyValues = true;
      internalValueResult.keepDays = this._keepDays;
    }
    if (this._prefix !== undefined) {
      hasAnyValues = true;
      internalValueResult.prefix = this._prefix;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterBackupStrategy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._agency = undefined;
      this._backupPath = undefined;
      this._bucket = undefined;
      this._keepDays = undefined;
      this._prefix = undefined;
      this._startTime = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._agency = value.agency;
      this._backupPath = value.backupPath;
      this._bucket = value.bucket;
      this._keepDays = value.keepDays;
      this._prefix = value.prefix;
      this._startTime = value.startTime;
    }
  }

  // agency - computed: true, optional: true, required: false
  private _agency?: string; 
  public get agency() {
    return this.getStringAttribute('agency');
  }
  public set agency(value: string) {
    this._agency = value;
  }
  public resetAgency() {
    this._agency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyInput() {
    return this._agency;
  }

  // backup_path - computed: true, optional: true, required: false
  private _backupPath?: string; 
  public get backupPath() {
    return this.getStringAttribute('backup_path');
  }
  public set backupPath(value: string) {
    this._backupPath = value;
  }
  public resetBackupPath() {
    this._backupPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backupPathInput() {
    return this._backupPath;
  }

  // bucket - computed: true, optional: true, required: false
  private _bucket?: string; 
  public get bucket() {
    return this.getStringAttribute('bucket');
  }
  public set bucket(value: string) {
    this._bucket = value;
  }
  public resetBucket() {
    this._bucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketInput() {
    return this._bucket;
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

  // prefix - computed: false, optional: true, required: false
  private _prefix?: string; 
  public get prefix() {
    return this.getStringAttribute('prefix');
  }
  public set prefix(value: string) {
    this._prefix = value;
  }
  public resetPrefix() {
    this._prefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get prefixInput() {
    return this._prefix;
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
export interface CssClusterClientNodeConfigVolume {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#size CssCluster#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume_type CssCluster#volume_type}
  */
  readonly volumeType: string;
}

export function cssClusterClientNodeConfigVolumeToTerraform(struct?: CssClusterClientNodeConfigVolumeOutputReference | CssClusterClientNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    size: cdktf.numberToTerraform(struct!.size),
    volume_type: cdktf.stringToTerraform(struct!.volumeType),
  }
}


export function cssClusterClientNodeConfigVolumeToHclTerraform(struct?: CssClusterClientNodeConfigVolumeOutputReference | CssClusterClientNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    volume_type: {
      value: cdktf.stringToHclTerraform(struct!.volumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterClientNodeConfigVolumeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterClientNodeConfigVolume | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    if (this._volumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.volumeType = this._volumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterClientNodeConfigVolume | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._size = undefined;
      this._volumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._size = value.size;
      this._volumeType = value.volumeType;
    }
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // volume_type - computed: false, optional: false, required: true
  private _volumeType?: string; 
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
  public set volumeType(value: string) {
    this._volumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeTypeInput() {
    return this._volumeType;
  }
}
export interface CssClusterClientNodeConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#flavor CssCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#instance_number CssCluster#instance_number}
  */
  readonly instanceNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#shrink_node_ids CssCluster#shrink_node_ids}
  */
  readonly shrinkNodeIds?: string[];
  /**
  * volume block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume CssCluster#volume}
  */
  readonly volume: CssClusterClientNodeConfigVolume;
}

export function cssClusterClientNodeConfigToTerraform(struct?: CssClusterClientNodeConfigOutputReference | CssClusterClientNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    flavor: cdktf.stringToTerraform(struct!.flavor),
    instance_number: cdktf.numberToTerraform(struct!.instanceNumber),
    shrink_node_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.shrinkNodeIds),
    volume: cssClusterClientNodeConfigVolumeToTerraform(struct!.volume),
  }
}


export function cssClusterClientNodeConfigToHclTerraform(struct?: CssClusterClientNodeConfigOutputReference | CssClusterClientNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    instance_number: {
      value: cdktf.numberToHclTerraform(struct!.instanceNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    shrink_node_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.shrinkNodeIds),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    volume: {
      value: cssClusterClientNodeConfigVolumeToHclTerraform(struct!.volume),
      isBlock: true,
      type: "list",
      storageClassType: "CssClusterClientNodeConfigVolumeList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterClientNodeConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterClientNodeConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._instanceNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceNumber = this._instanceNumber;
    }
    if (this._shrinkNodeIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.shrinkNodeIds = this._shrinkNodeIds;
    }
    if (this._volume?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.volume = this._volume?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterClientNodeConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._flavor = undefined;
      this._instanceNumber = undefined;
      this._shrinkNodeIds = undefined;
      this._volume.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._flavor = value.flavor;
      this._instanceNumber = value.instanceNumber;
      this._shrinkNodeIds = value.shrinkNodeIds;
      this._volume.internalValue = value.volume;
    }
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

  // instance_number - computed: false, optional: false, required: true
  private _instanceNumber?: number; 
  public get instanceNumber() {
    return this.getNumberAttribute('instance_number');
  }
  public set instanceNumber(value: number) {
    this._instanceNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceNumberInput() {
    return this._instanceNumber;
  }

  // shrink_node_ids - computed: false, optional: true, required: false
  private _shrinkNodeIds?: string[]; 
  public get shrinkNodeIds() {
    return this.getListAttribute('shrink_node_ids');
  }
  public set shrinkNodeIds(value: string[]) {
    this._shrinkNodeIds = value;
  }
  public resetShrinkNodeIds() {
    this._shrinkNodeIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get shrinkNodeIdsInput() {
    return this._shrinkNodeIds;
  }

  // volume - computed: false, optional: false, required: true
  private _volume = new CssClusterClientNodeConfigVolumeOutputReference(this, "volume");
  public get volume() {
    return this._volume;
  }
  public putVolume(value: CssClusterClientNodeConfigVolume) {
    this._volume.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeInput() {
    return this._volume.internalValue;
  }
}
export interface CssClusterColdNodeConfigVolume {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#size CssCluster#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume_type CssCluster#volume_type}
  */
  readonly volumeType: string;
}

export function cssClusterColdNodeConfigVolumeToTerraform(struct?: CssClusterColdNodeConfigVolumeOutputReference | CssClusterColdNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    size: cdktf.numberToTerraform(struct!.size),
    volume_type: cdktf.stringToTerraform(struct!.volumeType),
  }
}


export function cssClusterColdNodeConfigVolumeToHclTerraform(struct?: CssClusterColdNodeConfigVolumeOutputReference | CssClusterColdNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    volume_type: {
      value: cdktf.stringToHclTerraform(struct!.volumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterColdNodeConfigVolumeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterColdNodeConfigVolume | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    if (this._volumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.volumeType = this._volumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterColdNodeConfigVolume | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._size = undefined;
      this._volumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._size = value.size;
      this._volumeType = value.volumeType;
    }
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // volume_type - computed: false, optional: false, required: true
  private _volumeType?: string; 
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
  public set volumeType(value: string) {
    this._volumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeTypeInput() {
    return this._volumeType;
  }
}
export interface CssClusterColdNodeConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#flavor CssCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#instance_number CssCluster#instance_number}
  */
  readonly instanceNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#shrink_node_ids CssCluster#shrink_node_ids}
  */
  readonly shrinkNodeIds?: string[];
  /**
  * volume block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume CssCluster#volume}
  */
  readonly volume?: CssClusterColdNodeConfigVolume;
}

export function cssClusterColdNodeConfigToTerraform(struct?: CssClusterColdNodeConfigOutputReference | CssClusterColdNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    flavor: cdktf.stringToTerraform(struct!.flavor),
    instance_number: cdktf.numberToTerraform(struct!.instanceNumber),
    shrink_node_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.shrinkNodeIds),
    volume: cssClusterColdNodeConfigVolumeToTerraform(struct!.volume),
  }
}


export function cssClusterColdNodeConfigToHclTerraform(struct?: CssClusterColdNodeConfigOutputReference | CssClusterColdNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    instance_number: {
      value: cdktf.numberToHclTerraform(struct!.instanceNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    shrink_node_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.shrinkNodeIds),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    volume: {
      value: cssClusterColdNodeConfigVolumeToHclTerraform(struct!.volume),
      isBlock: true,
      type: "list",
      storageClassType: "CssClusterColdNodeConfigVolumeList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterColdNodeConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterColdNodeConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._instanceNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceNumber = this._instanceNumber;
    }
    if (this._shrinkNodeIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.shrinkNodeIds = this._shrinkNodeIds;
    }
    if (this._volume?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.volume = this._volume?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterColdNodeConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._flavor = undefined;
      this._instanceNumber = undefined;
      this._shrinkNodeIds = undefined;
      this._volume.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._flavor = value.flavor;
      this._instanceNumber = value.instanceNumber;
      this._shrinkNodeIds = value.shrinkNodeIds;
      this._volume.internalValue = value.volume;
    }
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

  // instance_number - computed: false, optional: false, required: true
  private _instanceNumber?: number; 
  public get instanceNumber() {
    return this.getNumberAttribute('instance_number');
  }
  public set instanceNumber(value: number) {
    this._instanceNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceNumberInput() {
    return this._instanceNumber;
  }

  // shrink_node_ids - computed: false, optional: true, required: false
  private _shrinkNodeIds?: string[]; 
  public get shrinkNodeIds() {
    return this.getListAttribute('shrink_node_ids');
  }
  public set shrinkNodeIds(value: string[]) {
    this._shrinkNodeIds = value;
  }
  public resetShrinkNodeIds() {
    this._shrinkNodeIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get shrinkNodeIdsInput() {
    return this._shrinkNodeIds;
  }

  // volume - computed: false, optional: true, required: false
  private _volume = new CssClusterColdNodeConfigVolumeOutputReference(this, "volume");
  public get volume() {
    return this._volume;
  }
  public putVolume(value: CssClusterColdNodeConfigVolume) {
    this._volume.internalValue = value;
  }
  public resetVolume() {
    this._volume.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeInput() {
    return this._volume.internalValue;
  }
}
export interface CssClusterEssNodeConfigVolume {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#size CssCluster#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume_type CssCluster#volume_type}
  */
  readonly volumeType: string;
}

export function cssClusterEssNodeConfigVolumeToTerraform(struct?: CssClusterEssNodeConfigVolumeOutputReference | CssClusterEssNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    size: cdktf.numberToTerraform(struct!.size),
    volume_type: cdktf.stringToTerraform(struct!.volumeType),
  }
}


export function cssClusterEssNodeConfigVolumeToHclTerraform(struct?: CssClusterEssNodeConfigVolumeOutputReference | CssClusterEssNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    volume_type: {
      value: cdktf.stringToHclTerraform(struct!.volumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterEssNodeConfigVolumeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterEssNodeConfigVolume | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    if (this._volumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.volumeType = this._volumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterEssNodeConfigVolume | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._size = undefined;
      this._volumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._size = value.size;
      this._volumeType = value.volumeType;
    }
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // volume_type - computed: false, optional: false, required: true
  private _volumeType?: string; 
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
  public set volumeType(value: string) {
    this._volumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeTypeInput() {
    return this._volumeType;
  }
}
export interface CssClusterEssNodeConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#flavor CssCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#instance_number CssCluster#instance_number}
  */
  readonly instanceNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#shrink_node_ids CssCluster#shrink_node_ids}
  */
  readonly shrinkNodeIds?: string[];
  /**
  * volume block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume CssCluster#volume}
  */
  readonly volume?: CssClusterEssNodeConfigVolume;
}

export function cssClusterEssNodeConfigToTerraform(struct?: CssClusterEssNodeConfigOutputReference | CssClusterEssNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    flavor: cdktf.stringToTerraform(struct!.flavor),
    instance_number: cdktf.numberToTerraform(struct!.instanceNumber),
    shrink_node_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.shrinkNodeIds),
    volume: cssClusterEssNodeConfigVolumeToTerraform(struct!.volume),
  }
}


export function cssClusterEssNodeConfigToHclTerraform(struct?: CssClusterEssNodeConfigOutputReference | CssClusterEssNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    instance_number: {
      value: cdktf.numberToHclTerraform(struct!.instanceNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    shrink_node_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.shrinkNodeIds),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    volume: {
      value: cssClusterEssNodeConfigVolumeToHclTerraform(struct!.volume),
      isBlock: true,
      type: "list",
      storageClassType: "CssClusterEssNodeConfigVolumeList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterEssNodeConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterEssNodeConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._instanceNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceNumber = this._instanceNumber;
    }
    if (this._shrinkNodeIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.shrinkNodeIds = this._shrinkNodeIds;
    }
    if (this._volume?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.volume = this._volume?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterEssNodeConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._flavor = undefined;
      this._instanceNumber = undefined;
      this._shrinkNodeIds = undefined;
      this._volume.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._flavor = value.flavor;
      this._instanceNumber = value.instanceNumber;
      this._shrinkNodeIds = value.shrinkNodeIds;
      this._volume.internalValue = value.volume;
    }
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

  // instance_number - computed: false, optional: false, required: true
  private _instanceNumber?: number; 
  public get instanceNumber() {
    return this.getNumberAttribute('instance_number');
  }
  public set instanceNumber(value: number) {
    this._instanceNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceNumberInput() {
    return this._instanceNumber;
  }

  // shrink_node_ids - computed: false, optional: true, required: false
  private _shrinkNodeIds?: string[]; 
  public get shrinkNodeIds() {
    return this.getListAttribute('shrink_node_ids');
  }
  public set shrinkNodeIds(value: string[]) {
    this._shrinkNodeIds = value;
  }
  public resetShrinkNodeIds() {
    this._shrinkNodeIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get shrinkNodeIdsInput() {
    return this._shrinkNodeIds;
  }

  // volume - computed: false, optional: true, required: false
  private _volume = new CssClusterEssNodeConfigVolumeOutputReference(this, "volume");
  public get volume() {
    return this._volume;
  }
  public putVolume(value: CssClusterEssNodeConfigVolume) {
    this._volume.internalValue = value;
  }
  public resetVolume() {
    this._volume.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeInput() {
    return this._volume.internalValue;
  }
}
export interface CssClusterKibanaPublicAccess {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#bandwidth CssCluster#bandwidth}
  */
  readonly bandwidth: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#whitelist CssCluster#whitelist}
  */
  readonly whitelist?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#whitelist_enabled CssCluster#whitelist_enabled}
  */
  readonly whitelistEnabled: boolean | cdktf.IResolvable;
}

export function cssClusterKibanaPublicAccessToTerraform(struct?: CssClusterKibanaPublicAccessOutputReference | CssClusterKibanaPublicAccess): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bandwidth: cdktf.numberToTerraform(struct!.bandwidth),
    whitelist: cdktf.stringToTerraform(struct!.whitelist),
    whitelist_enabled: cdktf.booleanToTerraform(struct!.whitelistEnabled),
  }
}


export function cssClusterKibanaPublicAccessToHclTerraform(struct?: CssClusterKibanaPublicAccessOutputReference | CssClusterKibanaPublicAccess): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bandwidth: {
      value: cdktf.numberToHclTerraform(struct!.bandwidth),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    whitelist: {
      value: cdktf.stringToHclTerraform(struct!.whitelist),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    whitelist_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.whitelistEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterKibanaPublicAccessOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterKibanaPublicAccess | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bandwidth !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidth = this._bandwidth;
    }
    if (this._whitelist !== undefined) {
      hasAnyValues = true;
      internalValueResult.whitelist = this._whitelist;
    }
    if (this._whitelistEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.whitelistEnabled = this._whitelistEnabled;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterKibanaPublicAccess | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bandwidth = undefined;
      this._whitelist = undefined;
      this._whitelistEnabled = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bandwidth = value.bandwidth;
      this._whitelist = value.whitelist;
      this._whitelistEnabled = value.whitelistEnabled;
    }
  }

  // bandwidth - computed: false, optional: false, required: true
  private _bandwidth?: number; 
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }
  public set bandwidth(value: number) {
    this._bandwidth = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthInput() {
    return this._bandwidth;
  }

  // public_ip - computed: true, optional: false, required: false
  public get publicIp() {
    return this.getStringAttribute('public_ip');
  }

  // whitelist - computed: false, optional: true, required: false
  private _whitelist?: string; 
  public get whitelist() {
    return this.getStringAttribute('whitelist');
  }
  public set whitelist(value: string) {
    this._whitelist = value;
  }
  public resetWhitelist() {
    this._whitelist = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get whitelistInput() {
    return this._whitelist;
  }

  // whitelist_enabled - computed: false, optional: false, required: true
  private _whitelistEnabled?: boolean | cdktf.IResolvable; 
  public get whitelistEnabled() {
    return this.getBooleanAttribute('whitelist_enabled');
  }
  public set whitelistEnabled(value: boolean | cdktf.IResolvable) {
    this._whitelistEnabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get whitelistEnabledInput() {
    return this._whitelistEnabled;
  }
}
export interface CssClusterMasterNodeConfigVolume {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#size CssCluster#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume_type CssCluster#volume_type}
  */
  readonly volumeType: string;
}

export function cssClusterMasterNodeConfigVolumeToTerraform(struct?: CssClusterMasterNodeConfigVolumeOutputReference | CssClusterMasterNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    size: cdktf.numberToTerraform(struct!.size),
    volume_type: cdktf.stringToTerraform(struct!.volumeType),
  }
}


export function cssClusterMasterNodeConfigVolumeToHclTerraform(struct?: CssClusterMasterNodeConfigVolumeOutputReference | CssClusterMasterNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    volume_type: {
      value: cdktf.stringToHclTerraform(struct!.volumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterMasterNodeConfigVolumeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterMasterNodeConfigVolume | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    if (this._volumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.volumeType = this._volumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterMasterNodeConfigVolume | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._size = undefined;
      this._volumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._size = value.size;
      this._volumeType = value.volumeType;
    }
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // volume_type - computed: false, optional: false, required: true
  private _volumeType?: string; 
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
  public set volumeType(value: string) {
    this._volumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeTypeInput() {
    return this._volumeType;
  }
}
export interface CssClusterMasterNodeConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#flavor CssCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#instance_number CssCluster#instance_number}
  */
  readonly instanceNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#shrink_node_ids CssCluster#shrink_node_ids}
  */
  readonly shrinkNodeIds?: string[];
  /**
  * volume block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume CssCluster#volume}
  */
  readonly volume: CssClusterMasterNodeConfigVolume;
}

export function cssClusterMasterNodeConfigToTerraform(struct?: CssClusterMasterNodeConfigOutputReference | CssClusterMasterNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    flavor: cdktf.stringToTerraform(struct!.flavor),
    instance_number: cdktf.numberToTerraform(struct!.instanceNumber),
    shrink_node_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.shrinkNodeIds),
    volume: cssClusterMasterNodeConfigVolumeToTerraform(struct!.volume),
  }
}


export function cssClusterMasterNodeConfigToHclTerraform(struct?: CssClusterMasterNodeConfigOutputReference | CssClusterMasterNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    instance_number: {
      value: cdktf.numberToHclTerraform(struct!.instanceNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    shrink_node_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.shrinkNodeIds),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    volume: {
      value: cssClusterMasterNodeConfigVolumeToHclTerraform(struct!.volume),
      isBlock: true,
      type: "list",
      storageClassType: "CssClusterMasterNodeConfigVolumeList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterMasterNodeConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterMasterNodeConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._instanceNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceNumber = this._instanceNumber;
    }
    if (this._shrinkNodeIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.shrinkNodeIds = this._shrinkNodeIds;
    }
    if (this._volume?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.volume = this._volume?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterMasterNodeConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._flavor = undefined;
      this._instanceNumber = undefined;
      this._shrinkNodeIds = undefined;
      this._volume.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._flavor = value.flavor;
      this._instanceNumber = value.instanceNumber;
      this._shrinkNodeIds = value.shrinkNodeIds;
      this._volume.internalValue = value.volume;
    }
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

  // instance_number - computed: false, optional: false, required: true
  private _instanceNumber?: number; 
  public get instanceNumber() {
    return this.getNumberAttribute('instance_number');
  }
  public set instanceNumber(value: number) {
    this._instanceNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceNumberInput() {
    return this._instanceNumber;
  }

  // shrink_node_ids - computed: false, optional: true, required: false
  private _shrinkNodeIds?: string[]; 
  public get shrinkNodeIds() {
    return this.getListAttribute('shrink_node_ids');
  }
  public set shrinkNodeIds(value: string[]) {
    this._shrinkNodeIds = value;
  }
  public resetShrinkNodeIds() {
    this._shrinkNodeIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get shrinkNodeIdsInput() {
    return this._shrinkNodeIds;
  }

  // volume - computed: false, optional: false, required: true
  private _volume = new CssClusterMasterNodeConfigVolumeOutputReference(this, "volume");
  public get volume() {
    return this._volume;
  }
  public putVolume(value: CssClusterMasterNodeConfigVolume) {
    this._volume.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeInput() {
    return this._volume.internalValue;
  }
}
export interface CssClusterNodeConfigNetworkInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#security_group_id CssCluster#security_group_id}
  */
  readonly securityGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#subnet_id CssCluster#subnet_id}
  */
  readonly subnetId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#vpc_id CssCluster#vpc_id}
  */
  readonly vpcId: string;
}

export function cssClusterNodeConfigNetworkInfoToTerraform(struct?: CssClusterNodeConfigNetworkInfoOutputReference | CssClusterNodeConfigNetworkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    security_group_id: cdktf.stringToTerraform(struct!.securityGroupId),
    subnet_id: cdktf.stringToTerraform(struct!.subnetId),
    vpc_id: cdktf.stringToTerraform(struct!.vpcId),
  }
}


export function cssClusterNodeConfigNetworkInfoToHclTerraform(struct?: CssClusterNodeConfigNetworkInfoOutputReference | CssClusterNodeConfigNetworkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    security_group_id: {
      value: cdktf.stringToHclTerraform(struct!.securityGroupId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    subnet_id: {
      value: cdktf.stringToHclTerraform(struct!.subnetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vpc_id: {
      value: cdktf.stringToHclTerraform(struct!.vpcId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterNodeConfigNetworkInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterNodeConfigNetworkInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._securityGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.securityGroupId = this._securityGroupId;
    }
    if (this._subnetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnetId = this._subnetId;
    }
    if (this._vpcId !== undefined) {
      hasAnyValues = true;
      internalValueResult.vpcId = this._vpcId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterNodeConfigNetworkInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._securityGroupId = undefined;
      this._subnetId = undefined;
      this._vpcId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._securityGroupId = value.securityGroupId;
      this._subnetId = value.subnetId;
      this._vpcId = value.vpcId;
    }
  }

  // security_group_id - computed: false, optional: false, required: true
  private _securityGroupId?: string; 
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }
  public set securityGroupId(value: string) {
    this._securityGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupIdInput() {
    return this._securityGroupId;
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
}
export interface CssClusterNodeConfigVolume {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#size CssCluster#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume_type CssCluster#volume_type}
  */
  readonly volumeType: string;
}

export function cssClusterNodeConfigVolumeToTerraform(struct?: CssClusterNodeConfigVolumeOutputReference | CssClusterNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    size: cdktf.numberToTerraform(struct!.size),
    volume_type: cdktf.stringToTerraform(struct!.volumeType),
  }
}


export function cssClusterNodeConfigVolumeToHclTerraform(struct?: CssClusterNodeConfigVolumeOutputReference | CssClusterNodeConfigVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    volume_type: {
      value: cdktf.stringToHclTerraform(struct!.volumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterNodeConfigVolumeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterNodeConfigVolume | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    if (this._volumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.volumeType = this._volumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterNodeConfigVolume | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._size = undefined;
      this._volumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._size = value.size;
      this._volumeType = value.volumeType;
    }
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // volume_type - computed: false, optional: false, required: true
  private _volumeType?: string; 
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
  public set volumeType(value: string) {
    this._volumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeTypeInput() {
    return this._volumeType;
  }
}
export interface CssClusterNodeConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#availability_zone CssCluster#availability_zone}
  */
  readonly availabilityZone: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#flavor CssCluster#flavor}
  */
  readonly flavor: string;
  /**
  * network_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#network_info CssCluster#network_info}
  */
  readonly networkInfo: CssClusterNodeConfigNetworkInfo;
  /**
  * volume block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#volume CssCluster#volume}
  */
  readonly volume: CssClusterNodeConfigVolume;
}

export function cssClusterNodeConfigToTerraform(struct?: CssClusterNodeConfigOutputReference | CssClusterNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    availability_zone: cdktf.stringToTerraform(struct!.availabilityZone),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    network_info: cssClusterNodeConfigNetworkInfoToTerraform(struct!.networkInfo),
    volume: cssClusterNodeConfigVolumeToTerraform(struct!.volume),
  }
}


export function cssClusterNodeConfigToHclTerraform(struct?: CssClusterNodeConfigOutputReference | CssClusterNodeConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    availability_zone: {
      value: cdktf.stringToHclTerraform(struct!.availabilityZone),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    network_info: {
      value: cssClusterNodeConfigNetworkInfoToHclTerraform(struct!.networkInfo),
      isBlock: true,
      type: "list",
      storageClassType: "CssClusterNodeConfigNetworkInfoList",
    },
    volume: {
      value: cssClusterNodeConfigVolumeToHclTerraform(struct!.volume),
      isBlock: true,
      type: "list",
      storageClassType: "CssClusterNodeConfigVolumeList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterNodeConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterNodeConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._availabilityZone !== undefined) {
      hasAnyValues = true;
      internalValueResult.availabilityZone = this._availabilityZone;
    }
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._networkInfo?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.networkInfo = this._networkInfo?.internalValue;
    }
    if (this._volume?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.volume = this._volume?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterNodeConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._availabilityZone = undefined;
      this._flavor = undefined;
      this._networkInfo.internalValue = undefined;
      this._volume.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._availabilityZone = value.availabilityZone;
      this._flavor = value.flavor;
      this._networkInfo.internalValue = value.networkInfo;
      this._volume.internalValue = value.volume;
    }
  }

  // availability_zone - computed: false, optional: false, required: true
  private _availabilityZone?: string; 
  public get availabilityZone() {
    return this.getStringAttribute('availability_zone');
  }
  public set availabilityZone(value: string) {
    this._availabilityZone = value;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneInput() {
    return this._availabilityZone;
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

  // network_info - computed: false, optional: false, required: true
  private _networkInfo = new CssClusterNodeConfigNetworkInfoOutputReference(this, "network_info");
  public get networkInfo() {
    return this._networkInfo;
  }
  public putNetworkInfo(value: CssClusterNodeConfigNetworkInfo) {
    this._networkInfo.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get networkInfoInput() {
    return this._networkInfo.internalValue;
  }

  // volume - computed: false, optional: false, required: true
  private _volume = new CssClusterNodeConfigVolumeOutputReference(this, "volume");
  public get volume() {
    return this._volume;
  }
  public putVolume(value: CssClusterNodeConfigVolume) {
    this._volume.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeInput() {
    return this._volume.internalValue;
  }
}
export interface CssClusterPublicAccess {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#bandwidth CssCluster#bandwidth}
  */
  readonly bandwidth: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#whitelist CssCluster#whitelist}
  */
  readonly whitelist?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#whitelist_enabled CssCluster#whitelist_enabled}
  */
  readonly whitelistEnabled: boolean | cdktf.IResolvable;
}

export function cssClusterPublicAccessToTerraform(struct?: CssClusterPublicAccessOutputReference | CssClusterPublicAccess): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bandwidth: cdktf.numberToTerraform(struct!.bandwidth),
    whitelist: cdktf.stringToTerraform(struct!.whitelist),
    whitelist_enabled: cdktf.booleanToTerraform(struct!.whitelistEnabled),
  }
}


export function cssClusterPublicAccessToHclTerraform(struct?: CssClusterPublicAccessOutputReference | CssClusterPublicAccess): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bandwidth: {
      value: cdktf.numberToHclTerraform(struct!.bandwidth),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    whitelist: {
      value: cdktf.stringToHclTerraform(struct!.whitelist),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    whitelist_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.whitelistEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterPublicAccessOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterPublicAccess | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bandwidth !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidth = this._bandwidth;
    }
    if (this._whitelist !== undefined) {
      hasAnyValues = true;
      internalValueResult.whitelist = this._whitelist;
    }
    if (this._whitelistEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.whitelistEnabled = this._whitelistEnabled;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterPublicAccess | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bandwidth = undefined;
      this._whitelist = undefined;
      this._whitelistEnabled = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bandwidth = value.bandwidth;
      this._whitelist = value.whitelist;
      this._whitelistEnabled = value.whitelistEnabled;
    }
  }

  // bandwidth - computed: false, optional: false, required: true
  private _bandwidth?: number; 
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }
  public set bandwidth(value: number) {
    this._bandwidth = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthInput() {
    return this._bandwidth;
  }

  // public_ip - computed: true, optional: false, required: false
  public get publicIp() {
    return this.getStringAttribute('public_ip');
  }

  // whitelist - computed: false, optional: true, required: false
  private _whitelist?: string; 
  public get whitelist() {
    return this.getStringAttribute('whitelist');
  }
  public set whitelist(value: string) {
    this._whitelist = value;
  }
  public resetWhitelist() {
    this._whitelist = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get whitelistInput() {
    return this._whitelist;
  }

  // whitelist_enabled - computed: false, optional: false, required: true
  private _whitelistEnabled?: boolean | cdktf.IResolvable; 
  public get whitelistEnabled() {
    return this.getBooleanAttribute('whitelist_enabled');
  }
  public set whitelistEnabled(value: boolean | cdktf.IResolvable) {
    this._whitelistEnabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get whitelistEnabledInput() {
    return this._whitelistEnabled;
  }
}
export interface CssClusterTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#create CssCluster#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#delete CssCluster#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#update CssCluster#update}
  */
  readonly update?: string;
}

export function cssClusterTimeoutsToTerraform(struct?: CssClusterTimeouts | cdktf.IResolvable): any {
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


export function cssClusterTimeoutsToHclTerraform(struct?: CssClusterTimeouts | cdktf.IResolvable): any {
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

export class CssClusterTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CssClusterTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CssClusterTimeouts | cdktf.IResolvable | undefined) {
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
export interface CssClusterVpcepEndpoint {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#endpoint_with_dns_name CssCluster#endpoint_with_dns_name}
  */
  readonly endpointWithDnsName: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#whitelist CssCluster#whitelist}
  */
  readonly whitelist?: string[];
}

export function cssClusterVpcepEndpointToTerraform(struct?: CssClusterVpcepEndpointOutputReference | CssClusterVpcepEndpoint): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    endpoint_with_dns_name: cdktf.booleanToTerraform(struct!.endpointWithDnsName),
    whitelist: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.whitelist),
  }
}


export function cssClusterVpcepEndpointToHclTerraform(struct?: CssClusterVpcepEndpointOutputReference | CssClusterVpcepEndpoint): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    endpoint_with_dns_name: {
      value: cdktf.booleanToHclTerraform(struct!.endpointWithDnsName),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    whitelist: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.whitelist),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssClusterVpcepEndpointOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssClusterVpcepEndpoint | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._endpointWithDnsName !== undefined) {
      hasAnyValues = true;
      internalValueResult.endpointWithDnsName = this._endpointWithDnsName;
    }
    if (this._whitelist !== undefined) {
      hasAnyValues = true;
      internalValueResult.whitelist = this._whitelist;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssClusterVpcepEndpoint | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._endpointWithDnsName = undefined;
      this._whitelist = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._endpointWithDnsName = value.endpointWithDnsName;
      this._whitelist = value.whitelist;
    }
  }

  // endpoint_with_dns_name - computed: false, optional: false, required: true
  private _endpointWithDnsName?: boolean | cdktf.IResolvable; 
  public get endpointWithDnsName() {
    return this.getBooleanAttribute('endpoint_with_dns_name');
  }
  public set endpointWithDnsName(value: boolean | cdktf.IResolvable) {
    this._endpointWithDnsName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointWithDnsNameInput() {
    return this._endpointWithDnsName;
  }

  // whitelist - computed: false, optional: true, required: false
  private _whitelist?: string[]; 
  public get whitelist() {
    return this.getListAttribute('whitelist');
  }
  public set whitelist(value: string[]) {
    this._whitelist = value;
  }
  public resetWhitelist() {
    this._whitelist = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get whitelistInput() {
    return this._whitelist;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster huaweicloud_css_cluster}
*/
export class CssCluster extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_css_cluster";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CssCluster resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CssCluster to import
  * @param importFromId The id of the existing CssCluster that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CssCluster to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_css_cluster", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster huaweicloud_css_cluster} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CssClusterConfig
  */
  public constructor(scope: Construct, id: string, config: CssClusterConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_css_cluster',
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
    this._autoRenew = config.autoRenew;
    this._availabilityZone = config.availabilityZone;
    this._chargingMode = config.chargingMode;
    this._enableForceNew = config.enableForceNew;
    this._engineType = config.engineType;
    this._engineVersion = config.engineVersion;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._expectNodeNum = config.expectNodeNum;
    this._httpsEnabled = config.httpsEnabled;
    this._id = config.id;
    this._name = config.name;
    this._password = config.password;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._region = config.region;
    this._securityGroupId = config.securityGroupId;
    this._securityMode = config.securityMode;
    this._subnetId = config.subnetId;
    this._tags = config.tags;
    this._vpcId = config.vpcId;
    this._backupStrategy.internalValue = config.backupStrategy;
    this._clientNodeConfig.internalValue = config.clientNodeConfig;
    this._coldNodeConfig.internalValue = config.coldNodeConfig;
    this._essNodeConfig.internalValue = config.essNodeConfig;
    this._kibanaPublicAccess.internalValue = config.kibanaPublicAccess;
    this._masterNodeConfig.internalValue = config.masterNodeConfig;
    this._nodeConfig.internalValue = config.nodeConfig;
    this._publicAccess.internalValue = config.publicAccess;
    this._timeouts.internalValue = config.timeouts;
    this._vpcepEndpoint.internalValue = config.vpcepEndpoint;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // availability_zone - computed: true, optional: true, required: false
  private _availabilityZone?: string; 
  public get availabilityZone() {
    return this.getStringAttribute('availability_zone');
  }
  public set availabilityZone(value: string) {
    this._availabilityZone = value;
  }
  public resetAvailabilityZone() {
    this._availabilityZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneInput() {
    return this._availabilityZone;
  }

  // backup_available - computed: true, optional: false, required: false
  public get backupAvailable() {
    return this.getBooleanAttribute('backup_available');
  }

  // bandwidth_resource_id - computed: true, optional: false, required: false
  public get bandwidthResourceId() {
    return this.getStringAttribute('bandwidth_resource_id');
  }

  // charging_mode - computed: true, optional: true, required: false
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

  // created - computed: true, optional: false, required: false
  public get created() {
    return this.getStringAttribute('created');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // disk_encrypted - computed: true, optional: false, required: false
  public get diskEncrypted() {
    return this.getBooleanAttribute('disk_encrypted');
  }

  // enable_force_new - computed: false, optional: true, required: false
  private _enableForceNew?: string; 
  public get enableForceNew() {
    return this.getStringAttribute('enable_force_new');
  }
  public set enableForceNew(value: string) {
    this._enableForceNew = value;
  }
  public resetEnableForceNew() {
    this._enableForceNew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableForceNewInput() {
    return this._enableForceNew;
  }

  // endpoint - computed: true, optional: false, required: false
  public get endpoint() {
    return this.getStringAttribute('endpoint');
  }

  // engine_type - computed: false, optional: true, required: false
  private _engineType?: string; 
  public get engineType() {
    return this.getStringAttribute('engine_type');
  }
  public set engineType(value: string) {
    this._engineType = value;
  }
  public resetEngineType() {
    this._engineType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get engineTypeInput() {
    return this._engineType;
  }

  // engine_version - computed: false, optional: false, required: true
  private _engineVersion?: string; 
  public get engineVersion() {
    return this.getStringAttribute('engine_version');
  }
  public set engineVersion(value: string) {
    this._engineVersion = value;
  }
  // Temporarily expose input value. Use with caution.
  public get engineVersionInput() {
    return this._engineVersion;
  }

  // enterprise_project_id - computed: true, optional: true, required: false
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

  // expect_node_num - computed: true, optional: true, required: false
  private _expectNodeNum?: number; 
  public get expectNodeNum() {
    return this.getNumberAttribute('expect_node_num');
  }
  public set expectNodeNum(value: number) {
    this._expectNodeNum = value;
  }
  public resetExpectNodeNum() {
    this._expectNodeNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expectNodeNumInput() {
    return this._expectNodeNum;
  }

  // https_enabled - computed: true, optional: true, required: false
  private _httpsEnabled?: boolean | cdktf.IResolvable; 
  public get httpsEnabled() {
    return this.getBooleanAttribute('https_enabled');
  }
  public set httpsEnabled(value: boolean | cdktf.IResolvable) {
    this._httpsEnabled = value;
  }
  public resetHttpsEnabled() {
    this._httpsEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpsEnabledInput() {
    return this._httpsEnabled;
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

  // is_period - computed: true, optional: false, required: false
  public get isPeriod() {
    return this.getBooleanAttribute('is_period');
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
  private _nodes = new CssClusterNodesList(this, "nodes", false);
  public get nodes() {
    return this._nodes;
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
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

  // security_mode - computed: false, optional: true, required: false
  private _securityMode?: boolean | cdktf.IResolvable; 
  public get securityMode() {
    return this.getBooleanAttribute('security_mode');
  }
  public set securityMode(value: boolean | cdktf.IResolvable) {
    this._securityMode = value;
  }
  public resetSecurityMode() {
    this._securityMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityModeInput() {
    return this._securityMode;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subnet_id - computed: true, optional: true, required: false
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  public resetSubnetId() {
    this._subnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // vpc_id - computed: true, optional: true, required: false
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  public resetVpcId() {
    this._vpcId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // vpcep_endpoint_id - computed: true, optional: false, required: false
  public get vpcepEndpointId() {
    return this.getStringAttribute('vpcep_endpoint_id');
  }

  // vpcep_ip - computed: true, optional: false, required: false
  public get vpcepIp() {
    return this.getStringAttribute('vpcep_ip');
  }

  // backup_strategy - computed: false, optional: true, required: false
  private _backupStrategy = new CssClusterBackupStrategyOutputReference(this, "backup_strategy");
  public get backupStrategy() {
    return this._backupStrategy;
  }
  public putBackupStrategy(value: CssClusterBackupStrategy) {
    this._backupStrategy.internalValue = value;
  }
  public resetBackupStrategy() {
    this._backupStrategy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backupStrategyInput() {
    return this._backupStrategy.internalValue;
  }

  // client_node_config - computed: false, optional: true, required: false
  private _clientNodeConfig = new CssClusterClientNodeConfigOutputReference(this, "client_node_config");
  public get clientNodeConfig() {
    return this._clientNodeConfig;
  }
  public putClientNodeConfig(value: CssClusterClientNodeConfig) {
    this._clientNodeConfig.internalValue = value;
  }
  public resetClientNodeConfig() {
    this._clientNodeConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clientNodeConfigInput() {
    return this._clientNodeConfig.internalValue;
  }

  // cold_node_config - computed: false, optional: true, required: false
  private _coldNodeConfig = new CssClusterColdNodeConfigOutputReference(this, "cold_node_config");
  public get coldNodeConfig() {
    return this._coldNodeConfig;
  }
  public putColdNodeConfig(value: CssClusterColdNodeConfig) {
    this._coldNodeConfig.internalValue = value;
  }
  public resetColdNodeConfig() {
    this._coldNodeConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get coldNodeConfigInput() {
    return this._coldNodeConfig.internalValue;
  }

  // ess_node_config - computed: false, optional: true, required: false
  private _essNodeConfig = new CssClusterEssNodeConfigOutputReference(this, "ess_node_config");
  public get essNodeConfig() {
    return this._essNodeConfig;
  }
  public putEssNodeConfig(value: CssClusterEssNodeConfig) {
    this._essNodeConfig.internalValue = value;
  }
  public resetEssNodeConfig() {
    this._essNodeConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get essNodeConfigInput() {
    return this._essNodeConfig.internalValue;
  }

  // kibana_public_access - computed: false, optional: true, required: false
  private _kibanaPublicAccess = new CssClusterKibanaPublicAccessOutputReference(this, "kibana_public_access");
  public get kibanaPublicAccess() {
    return this._kibanaPublicAccess;
  }
  public putKibanaPublicAccess(value: CssClusterKibanaPublicAccess) {
    this._kibanaPublicAccess.internalValue = value;
  }
  public resetKibanaPublicAccess() {
    this._kibanaPublicAccess.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kibanaPublicAccessInput() {
    return this._kibanaPublicAccess.internalValue;
  }

  // master_node_config - computed: false, optional: true, required: false
  private _masterNodeConfig = new CssClusterMasterNodeConfigOutputReference(this, "master_node_config");
  public get masterNodeConfig() {
    return this._masterNodeConfig;
  }
  public putMasterNodeConfig(value: CssClusterMasterNodeConfig) {
    this._masterNodeConfig.internalValue = value;
  }
  public resetMasterNodeConfig() {
    this._masterNodeConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get masterNodeConfigInput() {
    return this._masterNodeConfig.internalValue;
  }

  // node_config - computed: false, optional: true, required: false
  private _nodeConfig = new CssClusterNodeConfigOutputReference(this, "node_config");
  public get nodeConfig() {
    return this._nodeConfig;
  }
  public putNodeConfig(value: CssClusterNodeConfig) {
    this._nodeConfig.internalValue = value;
  }
  public resetNodeConfig() {
    this._nodeConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeConfigInput() {
    return this._nodeConfig.internalValue;
  }

  // public_access - computed: false, optional: true, required: false
  private _publicAccess = new CssClusterPublicAccessOutputReference(this, "public_access");
  public get publicAccess() {
    return this._publicAccess;
  }
  public putPublicAccess(value: CssClusterPublicAccess) {
    this._publicAccess.internalValue = value;
  }
  public resetPublicAccess() {
    this._publicAccess.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicAccessInput() {
    return this._publicAccess.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CssClusterTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CssClusterTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // vpcep_endpoint - computed: false, optional: true, required: false
  private _vpcepEndpoint = new CssClusterVpcepEndpointOutputReference(this, "vpcep_endpoint");
  public get vpcepEndpoint() {
    return this._vpcepEndpoint;
  }
  public putVpcepEndpoint(value: CssClusterVpcepEndpoint) {
    this._vpcepEndpoint.internalValue = value;
  }
  public resetVpcepEndpoint() {
    this._vpcepEndpoint.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcepEndpointInput() {
    return this._vpcepEndpoint.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      availability_zone: cdktf.stringToTerraform(this._availabilityZone),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      enable_force_new: cdktf.stringToTerraform(this._enableForceNew),
      engine_type: cdktf.stringToTerraform(this._engineType),
      engine_version: cdktf.stringToTerraform(this._engineVersion),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      expect_node_num: cdktf.numberToTerraform(this._expectNodeNum),
      https_enabled: cdktf.booleanToTerraform(this._httpsEnabled),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      password: cdktf.stringToTerraform(this._password),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      region: cdktf.stringToTerraform(this._region),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      security_mode: cdktf.booleanToTerraform(this._securityMode),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      backup_strategy: cssClusterBackupStrategyToTerraform(this._backupStrategy.internalValue),
      client_node_config: cssClusterClientNodeConfigToTerraform(this._clientNodeConfig.internalValue),
      cold_node_config: cssClusterColdNodeConfigToTerraform(this._coldNodeConfig.internalValue),
      ess_node_config: cssClusterEssNodeConfigToTerraform(this._essNodeConfig.internalValue),
      kibana_public_access: cssClusterKibanaPublicAccessToTerraform(this._kibanaPublicAccess.internalValue),
      master_node_config: cssClusterMasterNodeConfigToTerraform(this._masterNodeConfig.internalValue),
      node_config: cssClusterNodeConfigToTerraform(this._nodeConfig.internalValue),
      public_access: cssClusterPublicAccessToTerraform(this._publicAccess.internalValue),
      timeouts: cssClusterTimeoutsToTerraform(this._timeouts.internalValue),
      vpcep_endpoint: cssClusterVpcepEndpointToTerraform(this._vpcepEndpoint.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_renew: {
        value: cdktf.stringToHclTerraform(this._autoRenew),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      availability_zone: {
        value: cdktf.stringToHclTerraform(this._availabilityZone),
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
      enable_force_new: {
        value: cdktf.stringToHclTerraform(this._enableForceNew),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      engine_type: {
        value: cdktf.stringToHclTerraform(this._engineType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      engine_version: {
        value: cdktf.stringToHclTerraform(this._engineVersion),
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
      expect_node_num: {
        value: cdktf.numberToHclTerraform(this._expectNodeNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      https_enabled: {
        value: cdktf.booleanToHclTerraform(this._httpsEnabled),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      security_group_id: {
        value: cdktf.stringToHclTerraform(this._securityGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      security_mode: {
        value: cdktf.booleanToHclTerraform(this._securityMode),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      subnet_id: {
        value: cdktf.stringToHclTerraform(this._subnetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      backup_strategy: {
        value: cssClusterBackupStrategyToHclTerraform(this._backupStrategy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssClusterBackupStrategyList",
      },
      client_node_config: {
        value: cssClusterClientNodeConfigToHclTerraform(this._clientNodeConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssClusterClientNodeConfigList",
      },
      cold_node_config: {
        value: cssClusterColdNodeConfigToHclTerraform(this._coldNodeConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssClusterColdNodeConfigList",
      },
      ess_node_config: {
        value: cssClusterEssNodeConfigToHclTerraform(this._essNodeConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssClusterEssNodeConfigList",
      },
      kibana_public_access: {
        value: cssClusterKibanaPublicAccessToHclTerraform(this._kibanaPublicAccess.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssClusterKibanaPublicAccessList",
      },
      master_node_config: {
        value: cssClusterMasterNodeConfigToHclTerraform(this._masterNodeConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssClusterMasterNodeConfigList",
      },
      node_config: {
        value: cssClusterNodeConfigToHclTerraform(this._nodeConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssClusterNodeConfigList",
      },
      public_access: {
        value: cssClusterPublicAccessToHclTerraform(this._publicAccess.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssClusterPublicAccessList",
      },
      timeouts: {
        value: cssClusterTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CssClusterTimeouts",
      },
      vpcep_endpoint: {
        value: cssClusterVpcepEndpointToHclTerraform(this._vpcepEndpoint.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssClusterVpcepEndpointList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

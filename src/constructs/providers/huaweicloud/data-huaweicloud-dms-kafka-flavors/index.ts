// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDmsKafkaFlavorsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors#arch_type DataHuaweicloudDmsKafkaFlavors#arch_type}
  */
  readonly archType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors#availability_zones DataHuaweicloudDmsKafkaFlavors#availability_zones}
  */
  readonly availabilityZones?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors#charging_mode DataHuaweicloudDmsKafkaFlavors#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors#flavor_id DataHuaweicloudDmsKafkaFlavors#flavor_id}
  */
  readonly flavorId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors#id DataHuaweicloudDmsKafkaFlavors#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors#region DataHuaweicloudDmsKafkaFlavors#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors#storage_spec_code DataHuaweicloudDmsKafkaFlavors#storage_spec_code}
  */
  readonly storageSpecCode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors#type DataHuaweicloudDmsKafkaFlavors#type}
  */
  readonly type?: string;
}
export interface DataHuaweicloudDmsKafkaFlavorsFlavorsIos {
}

export function dataHuaweicloudDmsKafkaFlavorsFlavorsIosToTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavorsIos): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsKafkaFlavorsFlavorsIosToHclTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavorsIos): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsIosOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsKafkaFlavorsFlavorsIos | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsKafkaFlavorsFlavorsIos | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // availability_zones - computed: true, optional: false, required: false
  public get availabilityZones() {
    return this.getListAttribute('availability_zones');
  }

  // storage_spec_code - computed: true, optional: false, required: false
  public get storageSpecCode() {
    return this.getStringAttribute('storage_spec_code');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // unavailability_zones - computed: true, optional: false, required: false
  public get unavailabilityZones() {
    return this.getListAttribute('unavailability_zones');
  }
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsIosList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsKafkaFlavorsFlavorsIosOutputReference {
    return new DataHuaweicloudDmsKafkaFlavorsFlavorsIosOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsKafkaFlavorsFlavorsProperties {
}

export function dataHuaweicloudDmsKafkaFlavorsFlavorsPropertiesToTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavorsProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsKafkaFlavorsFlavorsPropertiesToHclTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavorsProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsPropertiesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsKafkaFlavorsFlavorsProperties | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsKafkaFlavorsFlavorsProperties | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // flavor_alias - computed: true, optional: false, required: false
  public get flavorAlias() {
    return this.getStringAttribute('flavor_alias');
  }

  // max_bandwidth_per_broker - computed: true, optional: false, required: false
  public get maxBandwidthPerBroker() {
    return this.getNumberAttribute('max_bandwidth_per_broker');
  }

  // max_broker - computed: true, optional: false, required: false
  public get maxBroker() {
    return this.getNumberAttribute('max_broker');
  }

  // max_consumer_per_broker - computed: true, optional: false, required: false
  public get maxConsumerPerBroker() {
    return this.getNumberAttribute('max_consumer_per_broker');
  }

  // max_partition_per_broker - computed: true, optional: false, required: false
  public get maxPartitionPerBroker() {
    return this.getNumberAttribute('max_partition_per_broker');
  }

  // max_storage_per_node - computed: true, optional: false, required: false
  public get maxStoragePerNode() {
    return this.getNumberAttribute('max_storage_per_node');
  }

  // max_tps_per_broker - computed: true, optional: false, required: false
  public get maxTpsPerBroker() {
    return this.getNumberAttribute('max_tps_per_broker');
  }

  // min_broker - computed: true, optional: false, required: false
  public get minBroker() {
    return this.getNumberAttribute('min_broker');
  }

  // min_storage_per_node - computed: true, optional: false, required: false
  public get minStoragePerNode() {
    return this.getNumberAttribute('min_storage_per_node');
  }
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsPropertiesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsKafkaFlavorsFlavorsPropertiesOutputReference {
    return new DataHuaweicloudDmsKafkaFlavorsFlavorsPropertiesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesProperties {
}

export function dataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesPropertiesToTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesPropertiesToHclTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesPropertiesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesProperties | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesProperties | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // max_node - computed: true, optional: false, required: false
  public get maxNode() {
    return this.getNumberAttribute('max_node');
  }

  // max_task - computed: true, optional: false, required: false
  public get maxTask() {
    return this.getNumberAttribute('max_task');
  }

  // min_node - computed: true, optional: false, required: false
  public get minNode() {
    return this.getNumberAttribute('min_node');
  }

  // min_task - computed: true, optional: false, required: false
  public get minTask() {
    return this.getNumberAttribute('min_task');
  }
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesPropertiesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesPropertiesOutputReference {
    return new DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesPropertiesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeatures {
}

export function dataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesToTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeatures): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesToHclTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeatures): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeatures | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeatures | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // properties - computed: true, optional: false, required: false
  private _properties = new DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesPropertiesList(this, "properties", false);
  public get properties() {
    return this._properties;
  }
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesOutputReference {
    return new DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsKafkaFlavorsFlavors {
}

export function dataHuaweicloudDmsKafkaFlavorsFlavorsToTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavors): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsKafkaFlavorsFlavorsToHclTerraform(struct?: DataHuaweicloudDmsKafkaFlavorsFlavors): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsKafkaFlavorsFlavors | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsKafkaFlavorsFlavors | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // arch_types - computed: true, optional: false, required: false
  public get archTypes() {
    return this.getListAttribute('arch_types');
  }

  // charging_modes - computed: true, optional: false, required: false
  public get chargingModes() {
    return this.getListAttribute('charging_modes');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // ios - computed: true, optional: false, required: false
  private _ios = new DataHuaweicloudDmsKafkaFlavorsFlavorsIosList(this, "ios", false);
  public get ios() {
    return this._ios;
  }

  // properties - computed: true, optional: false, required: false
  private _properties = new DataHuaweicloudDmsKafkaFlavorsFlavorsPropertiesList(this, "properties", false);
  public get properties() {
    return this._properties;
  }

  // support_features - computed: true, optional: false, required: false
  private _supportFeatures = new DataHuaweicloudDmsKafkaFlavorsFlavorsSupportFeaturesList(this, "support_features", false);
  public get supportFeatures() {
    return this._supportFeatures;
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // vm_specification - computed: true, optional: false, required: false
  public get vmSpecification() {
    return this.getStringAttribute('vm_specification');
  }
}

export class DataHuaweicloudDmsKafkaFlavorsFlavorsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsKafkaFlavorsFlavorsOutputReference {
    return new DataHuaweicloudDmsKafkaFlavorsFlavorsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors huaweicloud_dms_kafka_flavors}
*/
export class DataHuaweicloudDmsKafkaFlavors extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_kafka_flavors";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDmsKafkaFlavors resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDmsKafkaFlavors to import
  * @param importFromId The id of the existing DataHuaweicloudDmsKafkaFlavors that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDmsKafkaFlavors to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_kafka_flavors", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafka_flavors huaweicloud_dms_kafka_flavors} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDmsKafkaFlavorsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDmsKafkaFlavorsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_kafka_flavors',
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
    this._archType = config.archType;
    this._availabilityZones = config.availabilityZones;
    this._chargingMode = config.chargingMode;
    this._flavorId = config.flavorId;
    this._id = config.id;
    this._region = config.region;
    this._storageSpecCode = config.storageSpecCode;
    this._type = config.type;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // arch_type - computed: false, optional: true, required: false
  private _archType?: string; 
  public get archType() {
    return this.getStringAttribute('arch_type');
  }
  public set archType(value: string) {
    this._archType = value;
  }
  public resetArchType() {
    this._archType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get archTypeInput() {
    return this._archType;
  }

  // availability_zones - computed: false, optional: true, required: false
  private _availabilityZones?: string[]; 
  public get availabilityZones() {
    return this.getListAttribute('availability_zones');
  }
  public set availabilityZones(value: string[]) {
    this._availabilityZones = value;
  }
  public resetAvailabilityZones() {
    this._availabilityZones = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZonesInput() {
    return this._availabilityZones;
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

  // flavor_id - computed: false, optional: true, required: false
  private _flavorId?: string; 
  public get flavorId() {
    return this.getStringAttribute('flavor_id');
  }
  public set flavorId(value: string) {
    this._flavorId = value;
  }
  public resetFlavorId() {
    this._flavorId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorIdInput() {
    return this._flavorId;
  }

  // flavors - computed: true, optional: false, required: false
  private _flavors = new DataHuaweicloudDmsKafkaFlavorsFlavorsList(this, "flavors", false);
  public get flavors() {
    return this._flavors;
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

  // storage_spec_code - computed: false, optional: true, required: false
  private _storageSpecCode?: string; 
  public get storageSpecCode() {
    return this.getStringAttribute('storage_spec_code');
  }
  public set storageSpecCode(value: string) {
    this._storageSpecCode = value;
  }
  public resetStorageSpecCode() {
    this._storageSpecCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageSpecCodeInput() {
    return this._storageSpecCode;
  }

  // type - computed: false, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // versions - computed: true, optional: false, required: false
  public get versions() {
    return this.getListAttribute('versions');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      arch_type: cdktf.stringToTerraform(this._archType),
      availability_zones: cdktf.listMapper(cdktf.stringToTerraform, false)(this._availabilityZones),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      flavor_id: cdktf.stringToTerraform(this._flavorId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      storage_spec_code: cdktf.stringToTerraform(this._storageSpecCode),
      type: cdktf.stringToTerraform(this._type),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      arch_type: {
        value: cdktf.stringToHclTerraform(this._archType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      availability_zones: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._availabilityZones),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      flavor_id: {
        value: cdktf.stringToHclTerraform(this._flavorId),
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
      storage_spec_code: {
        value: cdktf.stringToHclTerraform(this._storageSpecCode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDmsRabbitmqExtendFlavorsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the type of CPU architecture, e.g. **X86**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors#arch_type DataHuaweicloudDmsRabbitmqExtendFlavors#arch_type}
  */
  readonly archType?: string;
  /**
  * Specifies the flavor billing mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors#charging_mode DataHuaweicloudDmsRabbitmqExtendFlavors#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors#id DataHuaweicloudDmsRabbitmqExtendFlavors#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the DMS RabbitMQ instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors#instance_id DataHuaweicloudDmsRabbitmqExtendFlavors#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors#region DataHuaweicloudDmsRabbitmqExtendFlavors#region}
  */
  readonly region?: string;
  /**
  * Specifies the disk IO encoding, e.g. **dms.physical.storage.high.v2**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors#storage_spec_code DataHuaweicloudDmsRabbitmqExtendFlavors#storage_spec_code}
  */
  readonly storageSpecCode?: string;
  /**
  * Specifies flavor type. The valid values are **single** and **cluster**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors#type DataHuaweicloudDmsRabbitmqExtendFlavors#type}
  */
  readonly type?: string;
}
export interface DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIos {
}

export function dataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIosToTerraform(struct?: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIos): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIosToHclTerraform(struct?: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIos): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIosOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIos | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIos | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // available_zones - computed: true, optional: false, required: false
  public get availableZones() {
    return this.getListAttribute('available_zones');
  }

  // storage_spec_code - computed: true, optional: false, required: false
  public get storageSpecCode() {
    return this.getStringAttribute('storage_spec_code');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // unavailable_zones - computed: true, optional: false, required: false
  public get unavailableZones() {
    return this.getListAttribute('unavailable_zones');
  }
}

export class DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIosList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIosOutputReference {
    return new DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIosOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsProperties {
}

export function dataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsPropertiesToTerraform(struct?: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsPropertiesToHclTerraform(struct?: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsPropertiesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsProperties | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsProperties | undefined) {
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

  // max_broker - computed: true, optional: false, required: false
  public get maxBroker() {
    return this.getStringAttribute('max_broker');
  }

  // max_connection_per_broker - computed: true, optional: false, required: false
  public get maxConnectionPerBroker() {
    return this.getStringAttribute('max_connection_per_broker');
  }

  // max_queue_per_broker - computed: true, optional: false, required: false
  public get maxQueuePerBroker() {
    return this.getStringAttribute('max_queue_per_broker');
  }

  // max_storage_per_node - computed: true, optional: false, required: false
  public get maxStoragePerNode() {
    return this.getStringAttribute('max_storage_per_node');
  }

  // min_broker - computed: true, optional: false, required: false
  public get minBroker() {
    return this.getStringAttribute('min_broker');
  }

  // min_storage_per_node - computed: true, optional: false, required: false
  public get minStoragePerNode() {
    return this.getStringAttribute('min_storage_per_node');
  }

  // step_length - computed: true, optional: false, required: false
  public get stepLength() {
    return this.getStringAttribute('step_length');
  }
}

export class DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsPropertiesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsPropertiesOutputReference {
    return new DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsPropertiesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeatures {
}

export function dataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeaturesToTerraform(struct?: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeatures): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeaturesToHclTerraform(struct?: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeatures): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeaturesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeatures | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeatures | undefined) {
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
  private _properties = new cdktf.StringMap(this, "properties");
  public get properties() {
    return this._properties;
  }
}

export class DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeaturesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeaturesOutputReference {
    return new DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeaturesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsRabbitmqExtendFlavorsFlavors {
}

export function dataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsToTerraform(struct?: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavors): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsToHclTerraform(struct?: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavors): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsRabbitmqExtendFlavorsFlavors | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRabbitmqExtendFlavorsFlavors | undefined) {
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
  private _ios = new DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsIosList(this, "ios", false);
  public get ios() {
    return this._ios;
  }

  // properties - computed: true, optional: false, required: false
  private _properties = new DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsPropertiesList(this, "properties", false);
  public get properties() {
    return this._properties;
  }

  // support_features - computed: true, optional: false, required: false
  private _supportFeatures = new DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsSupportFeaturesList(this, "support_features", false);
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

export class DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsOutputReference {
    return new DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors huaweicloud_dms_rabbitmq_extend_flavors}
*/
export class DataHuaweicloudDmsRabbitmqExtendFlavors extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_rabbitmq_extend_flavors";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDmsRabbitmqExtendFlavors resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDmsRabbitmqExtendFlavors to import
  * @param importFromId The id of the existing DataHuaweicloudDmsRabbitmqExtendFlavors that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDmsRabbitmqExtendFlavors to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_rabbitmq_extend_flavors", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rabbitmq_extend_flavors huaweicloud_dms_rabbitmq_extend_flavors} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDmsRabbitmqExtendFlavorsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDmsRabbitmqExtendFlavorsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_rabbitmq_extend_flavors',
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
    this._chargingMode = config.chargingMode;
    this._id = config.id;
    this._instanceId = config.instanceId;
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

  // flavors - computed: true, optional: false, required: false
  private _flavors = new DataHuaweicloudDmsRabbitmqExtendFlavorsFlavorsList(this, "flavors", false);
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
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
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
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
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

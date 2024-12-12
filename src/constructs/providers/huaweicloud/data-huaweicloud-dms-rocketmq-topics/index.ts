// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDmsRocketmqTopicsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics#id DataHuaweicloudDmsRocketmqTopics#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics#instance_id DataHuaweicloudDmsRocketmqTopics#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics#name DataHuaweicloudDmsRocketmqTopics#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics#permission DataHuaweicloudDmsRocketmqTopics#permission}
  */
  readonly permission?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics#region DataHuaweicloudDmsRocketmqTopics#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics#total_read_queue_num DataHuaweicloudDmsRocketmqTopics#total_read_queue_num}
  */
  readonly totalReadQueueNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics#total_write_queue_num DataHuaweicloudDmsRocketmqTopics#total_write_queue_num}
  */
  readonly totalWriteQueueNum?: number;
}
export interface DataHuaweicloudDmsRocketmqTopicsTopicsBrokers {
}

export function dataHuaweicloudDmsRocketmqTopicsTopicsBrokersToTerraform(struct?: DataHuaweicloudDmsRocketmqTopicsTopicsBrokers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRocketmqTopicsTopicsBrokersToHclTerraform(struct?: DataHuaweicloudDmsRocketmqTopicsTopicsBrokers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRocketmqTopicsTopicsBrokersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsRocketmqTopicsTopicsBrokers | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRocketmqTopicsTopicsBrokers | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // broker_name - computed: true, optional: false, required: false
  public get brokerName() {
    return this.getStringAttribute('broker_name');
  }

  // read_queue_num - computed: true, optional: false, required: false
  public get readQueueNum() {
    return this.getNumberAttribute('read_queue_num');
  }

  // write_queue_num - computed: true, optional: false, required: false
  public get writeQueueNum() {
    return this.getNumberAttribute('write_queue_num');
  }
}

export class DataHuaweicloudDmsRocketmqTopicsTopicsBrokersList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsRocketmqTopicsTopicsBrokersOutputReference {
    return new DataHuaweicloudDmsRocketmqTopicsTopicsBrokersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsRocketmqTopicsTopics {
}

export function dataHuaweicloudDmsRocketmqTopicsTopicsToTerraform(struct?: DataHuaweicloudDmsRocketmqTopicsTopics): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsRocketmqTopicsTopicsToHclTerraform(struct?: DataHuaweicloudDmsRocketmqTopicsTopics): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsRocketmqTopicsTopicsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsRocketmqTopicsTopics | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsRocketmqTopicsTopics | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // brokers - computed: true, optional: false, required: false
  private _brokers = new DataHuaweicloudDmsRocketmqTopicsTopicsBrokersList(this, "brokers", false);
  public get brokers() {
    return this._brokers;
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // permission - computed: true, optional: false, required: false
  public get permission() {
    return this.getStringAttribute('permission');
  }

  // total_read_queue_num - computed: true, optional: false, required: false
  public get totalReadQueueNum() {
    return this.getNumberAttribute('total_read_queue_num');
  }

  // total_write_queue_num - computed: true, optional: false, required: false
  public get totalWriteQueueNum() {
    return this.getNumberAttribute('total_write_queue_num');
  }
}

export class DataHuaweicloudDmsRocketmqTopicsTopicsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsRocketmqTopicsTopicsOutputReference {
    return new DataHuaweicloudDmsRocketmqTopicsTopicsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics huaweicloud_dms_rocketmq_topics}
*/
export class DataHuaweicloudDmsRocketmqTopics extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_rocketmq_topics";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDmsRocketmqTopics resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDmsRocketmqTopics to import
  * @param importFromId The id of the existing DataHuaweicloudDmsRocketmqTopics that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDmsRocketmqTopics to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_rocketmq_topics", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_rocketmq_topics huaweicloud_dms_rocketmq_topics} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDmsRocketmqTopicsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDmsRocketmqTopicsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_rocketmq_topics',
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
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._permission = config.permission;
    this._region = config.region;
    this._totalReadQueueNum = config.totalReadQueueNum;
    this._totalWriteQueueNum = config.totalWriteQueueNum;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // permission - computed: false, optional: true, required: false
  private _permission?: string; 
  public get permission() {
    return this.getStringAttribute('permission');
  }
  public set permission(value: string) {
    this._permission = value;
  }
  public resetPermission() {
    this._permission = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get permissionInput() {
    return this._permission;
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

  // topics - computed: true, optional: false, required: false
  private _topics = new DataHuaweicloudDmsRocketmqTopicsTopicsList(this, "topics", false);
  public get topics() {
    return this._topics;
  }

  // total_read_queue_num - computed: false, optional: true, required: false
  private _totalReadQueueNum?: number; 
  public get totalReadQueueNum() {
    return this.getNumberAttribute('total_read_queue_num');
  }
  public set totalReadQueueNum(value: number) {
    this._totalReadQueueNum = value;
  }
  public resetTotalReadQueueNum() {
    this._totalReadQueueNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get totalReadQueueNumInput() {
    return this._totalReadQueueNum;
  }

  // total_write_queue_num - computed: false, optional: true, required: false
  private _totalWriteQueueNum?: number; 
  public get totalWriteQueueNum() {
    return this.getNumberAttribute('total_write_queue_num');
  }
  public set totalWriteQueueNum(value: number) {
    this._totalWriteQueueNum = value;
  }
  public resetTotalWriteQueueNum() {
    this._totalWriteQueueNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get totalWriteQueueNumInput() {
    return this._totalWriteQueueNum;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      permission: cdktf.stringToTerraform(this._permission),
      region: cdktf.stringToTerraform(this._region),
      total_read_queue_num: cdktf.numberToTerraform(this._totalReadQueueNum),
      total_write_queue_num: cdktf.numberToTerraform(this._totalWriteQueueNum),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
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
      permission: {
        value: cdktf.stringToHclTerraform(this._permission),
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
      total_read_queue_num: {
        value: cdktf.numberToHclTerraform(this._totalReadQueueNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      total_write_queue_num: {
        value: cdktf.numberToHclTerraform(this._totalWriteQueueNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsKafkaPartitionReassignConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#execute_at DmsKafkaPartitionReassign#execute_at}
  */
  readonly executeAt?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#id DmsKafkaPartitionReassign#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#instance_id DmsKafkaPartitionReassign#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#is_schedule DmsKafkaPartitionReassign#is_schedule}
  */
  readonly isSchedule?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#region DmsKafkaPartitionReassign#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#throttle DmsKafkaPartitionReassign#throttle}
  */
  readonly throttle?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#time_estimate DmsKafkaPartitionReassign#time_estimate}
  */
  readonly timeEstimate?: boolean | cdktf.IResolvable;
  /**
  * reassignments block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#reassignments DmsKafkaPartitionReassign#reassignments}
  */
  readonly reassignments: DmsKafkaPartitionReassignReassignments[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#timeouts DmsKafkaPartitionReassign#timeouts}
  */
  readonly timeouts?: DmsKafkaPartitionReassignTimeouts;
}
export interface DmsKafkaPartitionReassignReassignmentsAssignment {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#partition DmsKafkaPartitionReassign#partition}
  */
  readonly partition?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#partition_brokers DmsKafkaPartitionReassign#partition_brokers}
  */
  readonly partitionBrokers?: number[];
}

export function dmsKafkaPartitionReassignReassignmentsAssignmentToTerraform(struct?: DmsKafkaPartitionReassignReassignmentsAssignment | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    partition: cdktf.numberToTerraform(struct!.partition),
    partition_brokers: cdktf.listMapper(cdktf.numberToTerraform, false)(struct!.partitionBrokers),
  }
}


export function dmsKafkaPartitionReassignReassignmentsAssignmentToHclTerraform(struct?: DmsKafkaPartitionReassignReassignmentsAssignment | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    partition: {
      value: cdktf.numberToHclTerraform(struct!.partition),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    partition_brokers: {
      value: cdktf.listMapperHcl(cdktf.numberToHclTerraform, false)(struct!.partitionBrokers),
      isBlock: false,
      type: "list",
      storageClassType: "numberList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsKafkaPartitionReassignReassignmentsAssignmentOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsKafkaPartitionReassignReassignmentsAssignment | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._partition !== undefined) {
      hasAnyValues = true;
      internalValueResult.partition = this._partition;
    }
    if (this._partitionBrokers !== undefined) {
      hasAnyValues = true;
      internalValueResult.partitionBrokers = this._partitionBrokers;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsKafkaPartitionReassignReassignmentsAssignment | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._partition = undefined;
      this._partitionBrokers = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._partition = value.partition;
      this._partitionBrokers = value.partitionBrokers;
    }
  }

  // partition - computed: false, optional: true, required: false
  private _partition?: number; 
  public get partition() {
    return this.getNumberAttribute('partition');
  }
  public set partition(value: number) {
    this._partition = value;
  }
  public resetPartition() {
    this._partition = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionInput() {
    return this._partition;
  }

  // partition_brokers - computed: false, optional: true, required: false
  private _partitionBrokers?: number[]; 
  public get partitionBrokers() {
    return this.getNumberListAttribute('partition_brokers');
  }
  public set partitionBrokers(value: number[]) {
    this._partitionBrokers = value;
  }
  public resetPartitionBrokers() {
    this._partitionBrokers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionBrokersInput() {
    return this._partitionBrokers;
  }
}

export class DmsKafkaPartitionReassignReassignmentsAssignmentList extends cdktf.ComplexList {
  public internalValue? : DmsKafkaPartitionReassignReassignmentsAssignment[] | cdktf.IResolvable

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
  public get(index: number): DmsKafkaPartitionReassignReassignmentsAssignmentOutputReference {
    return new DmsKafkaPartitionReassignReassignmentsAssignmentOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsKafkaPartitionReassignReassignments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#brokers DmsKafkaPartitionReassign#brokers}
  */
  readonly brokers?: number[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#replication_factor DmsKafkaPartitionReassign#replication_factor}
  */
  readonly replicationFactor?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#topic DmsKafkaPartitionReassign#topic}
  */
  readonly topic: string;
  /**
  * assignment block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#assignment DmsKafkaPartitionReassign#assignment}
  */
  readonly assignment?: DmsKafkaPartitionReassignReassignmentsAssignment[] | cdktf.IResolvable;
}

export function dmsKafkaPartitionReassignReassignmentsToTerraform(struct?: DmsKafkaPartitionReassignReassignments | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    brokers: cdktf.listMapper(cdktf.numberToTerraform, false)(struct!.brokers),
    replication_factor: cdktf.numberToTerraform(struct!.replicationFactor),
    topic: cdktf.stringToTerraform(struct!.topic),
    assignment: cdktf.listMapper(dmsKafkaPartitionReassignReassignmentsAssignmentToTerraform, true)(struct!.assignment),
  }
}


export function dmsKafkaPartitionReassignReassignmentsToHclTerraform(struct?: DmsKafkaPartitionReassignReassignments | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    brokers: {
      value: cdktf.listMapperHcl(cdktf.numberToHclTerraform, false)(struct!.brokers),
      isBlock: false,
      type: "list",
      storageClassType: "numberList",
    },
    replication_factor: {
      value: cdktf.numberToHclTerraform(struct!.replicationFactor),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    topic: {
      value: cdktf.stringToHclTerraform(struct!.topic),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    assignment: {
      value: cdktf.listMapperHcl(dmsKafkaPartitionReassignReassignmentsAssignmentToHclTerraform, true)(struct!.assignment),
      isBlock: true,
      type: "list",
      storageClassType: "DmsKafkaPartitionReassignReassignmentsAssignmentList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsKafkaPartitionReassignReassignmentsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsKafkaPartitionReassignReassignments | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._brokers !== undefined) {
      hasAnyValues = true;
      internalValueResult.brokers = this._brokers;
    }
    if (this._replicationFactor !== undefined) {
      hasAnyValues = true;
      internalValueResult.replicationFactor = this._replicationFactor;
    }
    if (this._topic !== undefined) {
      hasAnyValues = true;
      internalValueResult.topic = this._topic;
    }
    if (this._assignment?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.assignment = this._assignment?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsKafkaPartitionReassignReassignments | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._brokers = undefined;
      this._replicationFactor = undefined;
      this._topic = undefined;
      this._assignment.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._brokers = value.brokers;
      this._replicationFactor = value.replicationFactor;
      this._topic = value.topic;
      this._assignment.internalValue = value.assignment;
    }
  }

  // brokers - computed: false, optional: true, required: false
  private _brokers?: number[]; 
  public get brokers() {
    return this.getNumberListAttribute('brokers');
  }
  public set brokers(value: number[]) {
    this._brokers = value;
  }
  public resetBrokers() {
    this._brokers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get brokersInput() {
    return this._brokers;
  }

  // replication_factor - computed: false, optional: true, required: false
  private _replicationFactor?: number; 
  public get replicationFactor() {
    return this.getNumberAttribute('replication_factor');
  }
  public set replicationFactor(value: number) {
    this._replicationFactor = value;
  }
  public resetReplicationFactor() {
    this._replicationFactor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get replicationFactorInput() {
    return this._replicationFactor;
  }

  // topic - computed: false, optional: false, required: true
  private _topic?: string; 
  public get topic() {
    return this.getStringAttribute('topic');
  }
  public set topic(value: string) {
    this._topic = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicInput() {
    return this._topic;
  }

  // assignment - computed: false, optional: true, required: false
  private _assignment = new DmsKafkaPartitionReassignReassignmentsAssignmentList(this, "assignment", false);
  public get assignment() {
    return this._assignment;
  }
  public putAssignment(value: DmsKafkaPartitionReassignReassignmentsAssignment[] | cdktf.IResolvable) {
    this._assignment.internalValue = value;
  }
  public resetAssignment() {
    this._assignment.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignmentInput() {
    return this._assignment.internalValue;
  }
}

export class DmsKafkaPartitionReassignReassignmentsList extends cdktf.ComplexList {
  public internalValue? : DmsKafkaPartitionReassignReassignments[] | cdktf.IResolvable

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
  public get(index: number): DmsKafkaPartitionReassignReassignmentsOutputReference {
    return new DmsKafkaPartitionReassignReassignmentsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsKafkaPartitionReassignTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#create DmsKafkaPartitionReassign#create}
  */
  readonly create?: string;
}

export function dmsKafkaPartitionReassignTimeoutsToTerraform(struct?: DmsKafkaPartitionReassignTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function dmsKafkaPartitionReassignTimeoutsToHclTerraform(struct?: DmsKafkaPartitionReassignTimeouts | cdktf.IResolvable): any {
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

export class DmsKafkaPartitionReassignTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DmsKafkaPartitionReassignTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DmsKafkaPartitionReassignTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign huaweicloud_dms_kafka_partition_reassign}
*/
export class DmsKafkaPartitionReassign extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_kafka_partition_reassign";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsKafkaPartitionReassign resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsKafkaPartitionReassign to import
  * @param importFromId The id of the existing DmsKafkaPartitionReassign that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsKafkaPartitionReassign to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_kafka_partition_reassign", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_partition_reassign huaweicloud_dms_kafka_partition_reassign} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsKafkaPartitionReassignConfig
  */
  public constructor(scope: Construct, id: string, config: DmsKafkaPartitionReassignConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_kafka_partition_reassign',
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
    this._executeAt = config.executeAt;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._isSchedule = config.isSchedule;
    this._region = config.region;
    this._throttle = config.throttle;
    this._timeEstimate = config.timeEstimate;
    this._reassignments.internalValue = config.reassignments;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // execute_at - computed: false, optional: true, required: false
  private _executeAt?: number; 
  public get executeAt() {
    return this.getNumberAttribute('execute_at');
  }
  public set executeAt(value: number) {
    this._executeAt = value;
  }
  public resetExecuteAt() {
    this._executeAt = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executeAtInput() {
    return this._executeAt;
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

  // is_schedule - computed: false, optional: true, required: false
  private _isSchedule?: boolean | cdktf.IResolvable; 
  public get isSchedule() {
    return this.getBooleanAttribute('is_schedule');
  }
  public set isSchedule(value: boolean | cdktf.IResolvable) {
    this._isSchedule = value;
  }
  public resetIsSchedule() {
    this._isSchedule = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isScheduleInput() {
    return this._isSchedule;
  }

  // reassignment_time - computed: true, optional: false, required: false
  public get reassignmentTime() {
    return this.getNumberAttribute('reassignment_time');
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

  // task_id - computed: true, optional: false, required: false
  public get taskId() {
    return this.getStringAttribute('task_id');
  }

  // throttle - computed: false, optional: true, required: false
  private _throttle?: number; 
  public get throttle() {
    return this.getNumberAttribute('throttle');
  }
  public set throttle(value: number) {
    this._throttle = value;
  }
  public resetThrottle() {
    this._throttle = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get throttleInput() {
    return this._throttle;
  }

  // time_estimate - computed: false, optional: true, required: false
  private _timeEstimate?: boolean | cdktf.IResolvable; 
  public get timeEstimate() {
    return this.getBooleanAttribute('time_estimate');
  }
  public set timeEstimate(value: boolean | cdktf.IResolvable) {
    this._timeEstimate = value;
  }
  public resetTimeEstimate() {
    this._timeEstimate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeEstimateInput() {
    return this._timeEstimate;
  }

  // reassignments - computed: false, optional: false, required: true
  private _reassignments = new DmsKafkaPartitionReassignReassignmentsList(this, "reassignments", false);
  public get reassignments() {
    return this._reassignments;
  }
  public putReassignments(value: DmsKafkaPartitionReassignReassignments[] | cdktf.IResolvable) {
    this._reassignments.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get reassignmentsInput() {
    return this._reassignments.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DmsKafkaPartitionReassignTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DmsKafkaPartitionReassignTimeouts) {
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
      execute_at: cdktf.numberToTerraform(this._executeAt),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      is_schedule: cdktf.booleanToTerraform(this._isSchedule),
      region: cdktf.stringToTerraform(this._region),
      throttle: cdktf.numberToTerraform(this._throttle),
      time_estimate: cdktf.booleanToTerraform(this._timeEstimate),
      reassignments: cdktf.listMapper(dmsKafkaPartitionReassignReassignmentsToTerraform, true)(this._reassignments.internalValue),
      timeouts: dmsKafkaPartitionReassignTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      execute_at: {
        value: cdktf.numberToHclTerraform(this._executeAt),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      is_schedule: {
        value: cdktf.booleanToHclTerraform(this._isSchedule),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      throttle: {
        value: cdktf.numberToHclTerraform(this._throttle),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      time_estimate: {
        value: cdktf.booleanToHclTerraform(this._timeEstimate),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      reassignments: {
        value: cdktf.listMapperHcl(dmsKafkaPartitionReassignReassignmentsToHclTerraform, true)(this._reassignments.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsKafkaPartitionReassignReassignmentsList",
      },
      timeouts: {
        value: dmsKafkaPartitionReassignTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DmsKafkaPartitionReassignTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

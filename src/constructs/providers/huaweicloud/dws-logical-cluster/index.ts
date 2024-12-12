// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DwsLogicalClusterConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the DWS cluster ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#cluster_id DwsLogicalCluster#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#id DwsLogicalCluster#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the logical cluster name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#logical_cluster_name DwsLogicalCluster#logical_cluster_name}
  */
  readonly logicalClusterName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#region DwsLogicalCluster#region}
  */
  readonly region?: string;
  /**
  * cluster_rings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#cluster_rings DwsLogicalCluster#cluster_rings}
  */
  readonly clusterRings: DwsLogicalClusterClusterRings[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#timeouts DwsLogicalCluster#timeouts}
  */
  readonly timeouts?: DwsLogicalClusterTimeouts;
}
export interface DwsLogicalClusterClusterRingsRingHosts {
  /**
  * Specifies the backend IP address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#back_ip DwsLogicalCluster#back_ip}
  */
  readonly backIp: string;
  /**
  * Specifies the number of CPU cores.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#cpu_cores DwsLogicalCluster#cpu_cores}
  */
  readonly cpuCores: number;
  /**
  * Specifies the host disk size.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#disk_size DwsLogicalCluster#disk_size}
  */
  readonly diskSize: number;
  /**
  * Specifies the host name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#host_name DwsLogicalCluster#host_name}
  */
  readonly hostName: string;
  /**
  * Specifies the host memory.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#memory DwsLogicalCluster#memory}
  */
  readonly memory: number;
}

export function dwsLogicalClusterClusterRingsRingHostsToTerraform(struct?: DwsLogicalClusterClusterRingsRingHosts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    back_ip: cdktf.stringToTerraform(struct!.backIp),
    cpu_cores: cdktf.numberToTerraform(struct!.cpuCores),
    disk_size: cdktf.numberToTerraform(struct!.diskSize),
    host_name: cdktf.stringToTerraform(struct!.hostName),
    memory: cdktf.numberToTerraform(struct!.memory),
  }
}


export function dwsLogicalClusterClusterRingsRingHostsToHclTerraform(struct?: DwsLogicalClusterClusterRingsRingHosts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    back_ip: {
      value: cdktf.stringToHclTerraform(struct!.backIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    cpu_cores: {
      value: cdktf.numberToHclTerraform(struct!.cpuCores),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    disk_size: {
      value: cdktf.numberToHclTerraform(struct!.diskSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    host_name: {
      value: cdktf.stringToHclTerraform(struct!.hostName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    memory: {
      value: cdktf.numberToHclTerraform(struct!.memory),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DwsLogicalClusterClusterRingsRingHostsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DwsLogicalClusterClusterRingsRingHosts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._backIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.backIp = this._backIp;
    }
    if (this._cpuCores !== undefined) {
      hasAnyValues = true;
      internalValueResult.cpuCores = this._cpuCores;
    }
    if (this._diskSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.diskSize = this._diskSize;
    }
    if (this._hostName !== undefined) {
      hasAnyValues = true;
      internalValueResult.hostName = this._hostName;
    }
    if (this._memory !== undefined) {
      hasAnyValues = true;
      internalValueResult.memory = this._memory;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsLogicalClusterClusterRingsRingHosts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._backIp = undefined;
      this._cpuCores = undefined;
      this._diskSize = undefined;
      this._hostName = undefined;
      this._memory = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._backIp = value.backIp;
      this._cpuCores = value.cpuCores;
      this._diskSize = value.diskSize;
      this._hostName = value.hostName;
      this._memory = value.memory;
    }
  }

  // back_ip - computed: false, optional: false, required: true
  private _backIp?: string; 
  public get backIp() {
    return this.getStringAttribute('back_ip');
  }
  public set backIp(value: string) {
    this._backIp = value;
  }
  // Temporarily expose input value. Use with caution.
  public get backIpInput() {
    return this._backIp;
  }

  // cpu_cores - computed: false, optional: false, required: true
  private _cpuCores?: number; 
  public get cpuCores() {
    return this.getNumberAttribute('cpu_cores');
  }
  public set cpuCores(value: number) {
    this._cpuCores = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cpuCoresInput() {
    return this._cpuCores;
  }

  // disk_size - computed: false, optional: false, required: true
  private _diskSize?: number; 
  public get diskSize() {
    return this.getNumberAttribute('disk_size');
  }
  public set diskSize(value: number) {
    this._diskSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get diskSizeInput() {
    return this._diskSize;
  }

  // host_name - computed: false, optional: false, required: true
  private _hostName?: string; 
  public get hostName() {
    return this.getStringAttribute('host_name');
  }
  public set hostName(value: string) {
    this._hostName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get hostNameInput() {
    return this._hostName;
  }

  // memory - computed: false, optional: false, required: true
  private _memory?: number; 
  public get memory() {
    return this.getNumberAttribute('memory');
  }
  public set memory(value: number) {
    this._memory = value;
  }
  // Temporarily expose input value. Use with caution.
  public get memoryInput() {
    return this._memory;
  }
}

export class DwsLogicalClusterClusterRingsRingHostsList extends cdktf.ComplexList {
  public internalValue? : DwsLogicalClusterClusterRingsRingHosts[] | cdktf.IResolvable

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
  public get(index: number): DwsLogicalClusterClusterRingsRingHostsOutputReference {
    return new DwsLogicalClusterClusterRingsRingHostsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DwsLogicalClusterClusterRings {
  /**
  * ring_hosts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#ring_hosts DwsLogicalCluster#ring_hosts}
  */
  readonly ringHosts: DwsLogicalClusterClusterRingsRingHosts[] | cdktf.IResolvable;
}

export function dwsLogicalClusterClusterRingsToTerraform(struct?: DwsLogicalClusterClusterRings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    ring_hosts: cdktf.listMapper(dwsLogicalClusterClusterRingsRingHostsToTerraform, true)(struct!.ringHosts),
  }
}


export function dwsLogicalClusterClusterRingsToHclTerraform(struct?: DwsLogicalClusterClusterRings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    ring_hosts: {
      value: cdktf.listMapperHcl(dwsLogicalClusterClusterRingsRingHostsToHclTerraform, true)(struct!.ringHosts),
      isBlock: true,
      type: "set",
      storageClassType: "DwsLogicalClusterClusterRingsRingHostsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DwsLogicalClusterClusterRingsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DwsLogicalClusterClusterRings | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._ringHosts?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.ringHosts = this._ringHosts?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsLogicalClusterClusterRings | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._ringHosts.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._ringHosts.internalValue = value.ringHosts;
    }
  }

  // ring_hosts - computed: false, optional: false, required: true
  private _ringHosts = new DwsLogicalClusterClusterRingsRingHostsList(this, "ring_hosts", true);
  public get ringHosts() {
    return this._ringHosts;
  }
  public putRingHosts(value: DwsLogicalClusterClusterRingsRingHosts[] | cdktf.IResolvable) {
    this._ringHosts.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ringHostsInput() {
    return this._ringHosts.internalValue;
  }
}

export class DwsLogicalClusterClusterRingsList extends cdktf.ComplexList {
  public internalValue? : DwsLogicalClusterClusterRings[] | cdktf.IResolvable

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
  public get(index: number): DwsLogicalClusterClusterRingsOutputReference {
    return new DwsLogicalClusterClusterRingsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DwsLogicalClusterTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#create DwsLogicalCluster#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#delete DwsLogicalCluster#delete}
  */
  readonly delete?: string;
}

export function dwsLogicalClusterTimeoutsToTerraform(struct?: DwsLogicalClusterTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function dwsLogicalClusterTimeoutsToHclTerraform(struct?: DwsLogicalClusterTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DwsLogicalClusterTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DwsLogicalClusterTimeouts | cdktf.IResolvable | undefined {
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
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsLogicalClusterTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster huaweicloud_dws_logical_cluster}
*/
export class DwsLogicalCluster extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dws_logical_cluster";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DwsLogicalCluster resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DwsLogicalCluster to import
  * @param importFromId The id of the existing DwsLogicalCluster that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DwsLogicalCluster to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dws_logical_cluster", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_logical_cluster huaweicloud_dws_logical_cluster} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DwsLogicalClusterConfig
  */
  public constructor(scope: Construct, id: string, config: DwsLogicalClusterConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dws_logical_cluster',
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
    this._clusterId = config.clusterId;
    this._id = config.id;
    this._logicalClusterName = config.logicalClusterName;
    this._region = config.region;
    this._clusterRings.internalValue = config.clusterRings;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cluster_id - computed: false, optional: false, required: true
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
  }

  // delete_enable - computed: true, optional: false, required: false
  public get deleteEnable() {
    return this.getBooleanAttribute('delete_enable');
  }

  // edit_enable - computed: true, optional: false, required: false
  public get editEnable() {
    return this.getBooleanAttribute('edit_enable');
  }

  // first_logical_cluster - computed: true, optional: false, required: false
  public get firstLogicalCluster() {
    return this.getBooleanAttribute('first_logical_cluster');
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

  // logical_cluster_name - computed: false, optional: false, required: true
  private _logicalClusterName?: string; 
  public get logicalClusterName() {
    return this.getStringAttribute('logical_cluster_name');
  }
  public set logicalClusterName(value: string) {
    this._logicalClusterName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logicalClusterNameInput() {
    return this._logicalClusterName;
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

  // restart_enable - computed: true, optional: false, required: false
  public get restartEnable() {
    return this.getBooleanAttribute('restart_enable');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // cluster_rings - computed: false, optional: false, required: true
  private _clusterRings = new DwsLogicalClusterClusterRingsList(this, "cluster_rings", true);
  public get clusterRings() {
    return this._clusterRings;
  }
  public putClusterRings(value: DwsLogicalClusterClusterRings[] | cdktf.IResolvable) {
    this._clusterRings.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterRingsInput() {
    return this._clusterRings.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DwsLogicalClusterTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DwsLogicalClusterTimeouts) {
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
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      id: cdktf.stringToTerraform(this._id),
      logical_cluster_name: cdktf.stringToTerraform(this._logicalClusterName),
      region: cdktf.stringToTerraform(this._region),
      cluster_rings: cdktf.listMapper(dwsLogicalClusterClusterRingsToTerraform, true)(this._clusterRings.internalValue),
      timeouts: dwsLogicalClusterTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
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
      logical_cluster_name: {
        value: cdktf.stringToHclTerraform(this._logicalClusterName),
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
      cluster_rings: {
        value: cdktf.listMapperHcl(dwsLogicalClusterClusterRingsToHclTerraform, true)(this._clusterRings.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "DwsLogicalClusterClusterRingsList",
      },
      timeouts: {
        value: dwsLogicalClusterTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DwsLogicalClusterTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

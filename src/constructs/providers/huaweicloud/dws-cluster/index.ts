// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DwsClusterConfig extends cdktf.TerraformMetaArguments {
  /**
  * The availability zone in which to create the cluster instance. 
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#availability_zone DwsCluster#availability_zone}
  */
  readonly availabilityZone: string;
  /**
  * The description of the cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#description DwsCluster#description}
  */
  readonly description?: string;
  /**
  * Dedicated storage pool ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#dss_pool_id DwsCluster#dss_pool_id}
  */
  readonly dssPoolId?: string;
  /**
  * The ID of the ELB load balancer.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#elb_id DwsCluster#elb_id}
  */
  readonly elbId?: string;
  /**
  * The enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#enterprise_project_id DwsCluster#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#id DwsCluster#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The number of latest manual snapshots that need to be retained when deleting the cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#keep_last_manual_snapshot DwsCluster#keep_last_manual_snapshot}
  */
  readonly keepLastManualSnapshot?: number;
  /**
  * The KMS key ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#kms_key_id DwsCluster#kms_key_id}
  */
  readonly kmsKeyId?: string;
  /**
  * Whether to enable logical cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#logical_cluster_enable DwsCluster#logical_cluster_enable}
  */
  readonly logicalClusterEnable?: boolean | cdktf.IResolvable;
  /**
  * Whether to enable LTS.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#lts_enable DwsCluster#lts_enable}
  */
  readonly ltsEnable?: boolean | cdktf.IResolvable;
  /**
  * The cluster name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#name DwsCluster#name}
  */
  readonly name: string;
  /**
  * The subnet ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#network_id DwsCluster#network_id}
  */
  readonly networkId: string;
  /**
  * The flavor of the cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#node_type DwsCluster#node_type}
  */
  readonly nodeType: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#number_of_cn DwsCluster#number_of_cn}
  */
  readonly numberOfCn?: number;
  /**
  * Number of nodes in a cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#number_of_node DwsCluster#number_of_node}
  */
  readonly numberOfNode: number;
  /**
  * Service port of a cluster (8000 to 10000). The default value is 8000.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#port DwsCluster#port}
  */
  readonly port?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#region DwsCluster#region}
  */
  readonly region?: string;
  /**
  * The security group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#security_group_id DwsCluster#security_group_id}
  */
  readonly securityGroupId: string;
  /**
  * The key/value pairs to associate with the cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#tags DwsCluster#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Administrator username for logging in to a data warehouse cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#user_name DwsCluster#user_name}
  */
  readonly userName: string;
  /**
  * Administrator password for logging in to a data warehouse cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#user_pwd DwsCluster#user_pwd}
  */
  readonly userPwd: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#version DwsCluster#version}
  */
  readonly version?: string;
  /**
  * The VPC ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#vpc_id DwsCluster#vpc_id}
  */
  readonly vpcId: string;
  /**
  * public_ip block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#public_ip DwsCluster#public_ip}
  */
  readonly publicIp?: DwsClusterPublicIp;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#timeouts DwsCluster#timeouts}
  */
  readonly timeouts?: DwsClusterTimeouts;
  /**
  * volume block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#volume DwsCluster#volume}
  */
  readonly volume?: DwsClusterVolume;
}
export interface DwsClusterElb {
}

export function dwsClusterElbToTerraform(struct?: DwsClusterElb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dwsClusterElbToHclTerraform(struct?: DwsClusterElb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DwsClusterElbOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DwsClusterElb | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsClusterElb | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // private_endpoint - computed: true, optional: false, required: false
  public get privateEndpoint() {
    return this.getStringAttribute('private_endpoint');
  }

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }

  // private_ip_v6 - computed: true, optional: false, required: false
  public get privateIpV6() {
    return this.getStringAttribute('private_ip_v6');
  }

  // public_ip - computed: true, optional: false, required: false
  public get publicIp() {
    return this.getStringAttribute('public_ip');
  }

  // vpc_id - computed: true, optional: false, required: false
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
}

export class DwsClusterElbList extends cdktf.ComplexList {

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
  public get(index: number): DwsClusterElbOutputReference {
    return new DwsClusterElbOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DwsClusterEndpoints {
}

export function dwsClusterEndpointsToTerraform(struct?: DwsClusterEndpoints): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dwsClusterEndpointsToHclTerraform(struct?: DwsClusterEndpoints): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DwsClusterEndpointsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DwsClusterEndpoints | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsClusterEndpoints | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // connect_info - computed: true, optional: false, required: false
  public get connectInfo() {
    return this.getStringAttribute('connect_info');
  }

  // jdbc_url - computed: true, optional: false, required: false
  public get jdbcUrl() {
    return this.getStringAttribute('jdbc_url');
  }
}

export class DwsClusterEndpointsList extends cdktf.ComplexList {

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
  public get(index: number): DwsClusterEndpointsOutputReference {
    return new DwsClusterEndpointsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DwsClusterMaintainWindow {
}

export function dwsClusterMaintainWindowToTerraform(struct?: DwsClusterMaintainWindow): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dwsClusterMaintainWindowToHclTerraform(struct?: DwsClusterMaintainWindow): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DwsClusterMaintainWindowOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DwsClusterMaintainWindow | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsClusterMaintainWindow | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // day - computed: true, optional: false, required: false
  public get day() {
    return this.getStringAttribute('day');
  }

  // end_time - computed: true, optional: false, required: false
  public get endTime() {
    return this.getStringAttribute('end_time');
  }

  // start_time - computed: true, optional: false, required: false
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
}

export class DwsClusterMaintainWindowList extends cdktf.ComplexList {

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
  public get(index: number): DwsClusterMaintainWindowOutputReference {
    return new DwsClusterMaintainWindowOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DwsClusterPublicEndpoints {
}

export function dwsClusterPublicEndpointsToTerraform(struct?: DwsClusterPublicEndpoints): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dwsClusterPublicEndpointsToHclTerraform(struct?: DwsClusterPublicEndpoints): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DwsClusterPublicEndpointsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DwsClusterPublicEndpoints | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsClusterPublicEndpoints | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // jdbc_url - computed: true, optional: false, required: false
  public get jdbcUrl() {
    return this.getStringAttribute('jdbc_url');
  }

  // public_connect_info - computed: true, optional: false, required: false
  public get publicConnectInfo() {
    return this.getStringAttribute('public_connect_info');
  }
}

export class DwsClusterPublicEndpointsList extends cdktf.ComplexList {

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
  public get(index: number): DwsClusterPublicEndpointsOutputReference {
    return new DwsClusterPublicEndpointsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DwsClusterPublicIp {
  /**
  * The EIP ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#eip_id DwsCluster#eip_id}
  */
  readonly eipId?: string;
  /**
  * The bind type of public IP.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#public_bind_type DwsCluster#public_bind_type}
  */
  readonly publicBindType?: string;
}

export function dwsClusterPublicIpToTerraform(struct?: DwsClusterPublicIpOutputReference | DwsClusterPublicIp): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    eip_id: cdktf.stringToTerraform(struct!.eipId),
    public_bind_type: cdktf.stringToTerraform(struct!.publicBindType),
  }
}


export function dwsClusterPublicIpToHclTerraform(struct?: DwsClusterPublicIpOutputReference | DwsClusterPublicIp): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    eip_id: {
      value: cdktf.stringToHclTerraform(struct!.eipId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    public_bind_type: {
      value: cdktf.stringToHclTerraform(struct!.publicBindType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DwsClusterPublicIpOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DwsClusterPublicIp | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._eipId !== undefined) {
      hasAnyValues = true;
      internalValueResult.eipId = this._eipId;
    }
    if (this._publicBindType !== undefined) {
      hasAnyValues = true;
      internalValueResult.publicBindType = this._publicBindType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsClusterPublicIp | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._eipId = undefined;
      this._publicBindType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._eipId = value.eipId;
      this._publicBindType = value.publicBindType;
    }
  }

  // eip_id - computed: false, optional: true, required: false
  private _eipId?: string; 
  public get eipId() {
    return this.getStringAttribute('eip_id');
  }
  public set eipId(value: string) {
    this._eipId = value;
  }
  public resetEipId() {
    this._eipId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eipIdInput() {
    return this._eipId;
  }

  // public_bind_type - computed: true, optional: true, required: false
  private _publicBindType?: string; 
  public get publicBindType() {
    return this.getStringAttribute('public_bind_type');
  }
  public set publicBindType(value: string) {
    this._publicBindType = value;
  }
  public resetPublicBindType() {
    this._publicBindType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicBindTypeInput() {
    return this._publicBindType;
  }
}
export interface DwsClusterTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#create DwsCluster#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#delete DwsCluster#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#update DwsCluster#update}
  */
  readonly update?: string;
}

export function dwsClusterTimeoutsToTerraform(struct?: DwsClusterTimeouts | cdktf.IResolvable): any {
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


export function dwsClusterTimeoutsToHclTerraform(struct?: DwsClusterTimeouts | cdktf.IResolvable): any {
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

export class DwsClusterTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DwsClusterTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DwsClusterTimeouts | cdktf.IResolvable | undefined) {
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
export interface DwsClusterVolume {
  /**
  * The capacity size, in GB.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#capacity DwsCluster#capacity}
  */
  readonly capacity?: string;
  /**
  * The volume type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#type DwsCluster#type}
  */
  readonly type?: string;
}

export function dwsClusterVolumeToTerraform(struct?: DwsClusterVolumeOutputReference | DwsClusterVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    capacity: cdktf.stringToTerraform(struct!.capacity),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function dwsClusterVolumeToHclTerraform(struct?: DwsClusterVolumeOutputReference | DwsClusterVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    capacity: {
      value: cdktf.stringToHclTerraform(struct!.capacity),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DwsClusterVolumeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DwsClusterVolume | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._capacity !== undefined) {
      hasAnyValues = true;
      internalValueResult.capacity = this._capacity;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsClusterVolume | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._capacity = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._capacity = value.capacity;
      this._type = value.type;
    }
  }

  // capacity - computed: true, optional: true, required: false
  private _capacity?: string; 
  public get capacity() {
    return this.getStringAttribute('capacity');
  }
  public set capacity(value: string) {
    this._capacity = value;
  }
  public resetCapacity() {
    this._capacity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get capacityInput() {
    return this._capacity;
  }

  // type - computed: true, optional: true, required: false
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster huaweicloud_dws_cluster}
*/
export class DwsCluster extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dws_cluster";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DwsCluster resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DwsCluster to import
  * @param importFromId The id of the existing DwsCluster that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DwsCluster to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dws_cluster", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_cluster huaweicloud_dws_cluster} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DwsClusterConfig
  */
  public constructor(scope: Construct, id: string, config: DwsClusterConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dws_cluster',
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
    this._availabilityZone = config.availabilityZone;
    this._description = config.description;
    this._dssPoolId = config.dssPoolId;
    this._elbId = config.elbId;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._keepLastManualSnapshot = config.keepLastManualSnapshot;
    this._kmsKeyId = config.kmsKeyId;
    this._logicalClusterEnable = config.logicalClusterEnable;
    this._ltsEnable = config.ltsEnable;
    this._name = config.name;
    this._networkId = config.networkId;
    this._nodeType = config.nodeType;
    this._numberOfCn = config.numberOfCn;
    this._numberOfNode = config.numberOfNode;
    this._port = config.port;
    this._region = config.region;
    this._securityGroupId = config.securityGroupId;
    this._tags = config.tags;
    this._userName = config.userName;
    this._userPwd = config.userPwd;
    this._version = config.version;
    this._vpcId = config.vpcId;
    this._publicIp.internalValue = config.publicIp;
    this._timeouts.internalValue = config.timeouts;
    this._volume.internalValue = config.volume;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // created - computed: true, optional: false, required: false
  public get created() {
    return this.getStringAttribute('created');
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

  // dss_pool_id - computed: true, optional: true, required: false
  private _dssPoolId?: string; 
  public get dssPoolId() {
    return this.getStringAttribute('dss_pool_id');
  }
  public set dssPoolId(value: string) {
    this._dssPoolId = value;
  }
  public resetDssPoolId() {
    this._dssPoolId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dssPoolIdInput() {
    return this._dssPoolId;
  }

  // elb - computed: true, optional: false, required: false
  private _elb = new DwsClusterElbList(this, "elb", false);
  public get elb() {
    return this._elb;
  }

  // elb_id - computed: false, optional: true, required: false
  private _elbId?: string; 
  public get elbId() {
    return this.getStringAttribute('elb_id');
  }
  public set elbId(value: string) {
    this._elbId = value;
  }
  public resetElbId() {
    this._elbId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get elbIdInput() {
    return this._elbId;
  }

  // endpoints - computed: true, optional: false, required: false
  private _endpoints = new DwsClusterEndpointsList(this, "endpoints", false);
  public get endpoints() {
    return this._endpoints;
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

  // keep_last_manual_snapshot - computed: false, optional: true, required: false
  private _keepLastManualSnapshot?: number; 
  public get keepLastManualSnapshot() {
    return this.getNumberAttribute('keep_last_manual_snapshot');
  }
  public set keepLastManualSnapshot(value: number) {
    this._keepLastManualSnapshot = value;
  }
  public resetKeepLastManualSnapshot() {
    this._keepLastManualSnapshot = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keepLastManualSnapshotInput() {
    return this._keepLastManualSnapshot;
  }

  // kms_key_id - computed: true, optional: true, required: false
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

  // logical_cluster_enable - computed: false, optional: true, required: false
  private _logicalClusterEnable?: boolean | cdktf.IResolvable; 
  public get logicalClusterEnable() {
    return this.getBooleanAttribute('logical_cluster_enable');
  }
  public set logicalClusterEnable(value: boolean | cdktf.IResolvable) {
    this._logicalClusterEnable = value;
  }
  public resetLogicalClusterEnable() {
    this._logicalClusterEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logicalClusterEnableInput() {
    return this._logicalClusterEnable;
  }

  // lts_enable - computed: false, optional: true, required: false
  private _ltsEnable?: boolean | cdktf.IResolvable; 
  public get ltsEnable() {
    return this.getBooleanAttribute('lts_enable');
  }
  public set ltsEnable(value: boolean | cdktf.IResolvable) {
    this._ltsEnable = value;
  }
  public resetLtsEnable() {
    this._ltsEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsEnableInput() {
    return this._ltsEnable;
  }

  // maintain_window - computed: true, optional: false, required: false
  private _maintainWindow = new DwsClusterMaintainWindowList(this, "maintain_window", false);
  public get maintainWindow() {
    return this._maintainWindow;
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

  // network_id - computed: false, optional: false, required: true
  private _networkId?: string; 
  public get networkId() {
    return this.getStringAttribute('network_id');
  }
  public set networkId(value: string) {
    this._networkId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get networkIdInput() {
    return this._networkId;
  }

  // node_type - computed: false, optional: false, required: true
  private _nodeType?: string; 
  public get nodeType() {
    return this.getStringAttribute('node_type');
  }
  public set nodeType(value: string) {
    this._nodeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeTypeInput() {
    return this._nodeType;
  }

  // number_of_cn - computed: false, optional: true, required: false
  private _numberOfCn?: number; 
  public get numberOfCn() {
    return this.getNumberAttribute('number_of_cn');
  }
  public set numberOfCn(value: number) {
    this._numberOfCn = value;
  }
  public resetNumberOfCn() {
    this._numberOfCn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get numberOfCnInput() {
    return this._numberOfCn;
  }

  // number_of_node - computed: false, optional: false, required: true
  private _numberOfNode?: number; 
  public get numberOfNode() {
    return this.getNumberAttribute('number_of_node');
  }
  public set numberOfNode(value: number) {
    this._numberOfNode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get numberOfNodeInput() {
    return this._numberOfNode;
  }

  // port - computed: false, optional: true, required: false
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

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getListAttribute('private_ip');
  }

  // public_endpoints - computed: true, optional: false, required: false
  private _publicEndpoints = new DwsClusterPublicEndpointsList(this, "public_endpoints", false);
  public get publicEndpoints() {
    return this._publicEndpoints;
  }

  // recent_event - computed: true, optional: false, required: false
  public get recentEvent() {
    return this.getNumberAttribute('recent_event');
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // sub_status - computed: true, optional: false, required: false
  public get subStatus() {
    return this.getStringAttribute('sub_status');
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

  // task_status - computed: true, optional: false, required: false
  public get taskStatus() {
    return this.getStringAttribute('task_status');
  }

  // updated - computed: true, optional: false, required: false
  public get updated() {
    return this.getStringAttribute('updated');
  }

  // user_name - computed: false, optional: false, required: true
  private _userName?: string; 
  public get userName() {
    return this.getStringAttribute('user_name');
  }
  public set userName(value: string) {
    this._userName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get userNameInput() {
    return this._userName;
  }

  // user_pwd - computed: false, optional: false, required: true
  private _userPwd?: string; 
  public get userPwd() {
    return this.getStringAttribute('user_pwd');
  }
  public set userPwd(value: string) {
    this._userPwd = value;
  }
  // Temporarily expose input value. Use with caution.
  public get userPwdInput() {
    return this._userPwd;
  }

  // version - computed: true, optional: true, required: false
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  public resetVersion() {
    this._version = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
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

  // public_ip - computed: false, optional: true, required: false
  private _publicIp = new DwsClusterPublicIpOutputReference(this, "public_ip");
  public get publicIp() {
    return this._publicIp;
  }
  public putPublicIp(value: DwsClusterPublicIp) {
    this._publicIp.internalValue = value;
  }
  public resetPublicIp() {
    this._publicIp.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpInput() {
    return this._publicIp.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DwsClusterTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DwsClusterTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // volume - computed: false, optional: true, required: false
  private _volume = new DwsClusterVolumeOutputReference(this, "volume");
  public get volume() {
    return this._volume;
  }
  public putVolume(value: DwsClusterVolume) {
    this._volume.internalValue = value;
  }
  public resetVolume() {
    this._volume.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeInput() {
    return this._volume.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      availability_zone: cdktf.stringToTerraform(this._availabilityZone),
      description: cdktf.stringToTerraform(this._description),
      dss_pool_id: cdktf.stringToTerraform(this._dssPoolId),
      elb_id: cdktf.stringToTerraform(this._elbId),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      keep_last_manual_snapshot: cdktf.numberToTerraform(this._keepLastManualSnapshot),
      kms_key_id: cdktf.stringToTerraform(this._kmsKeyId),
      logical_cluster_enable: cdktf.booleanToTerraform(this._logicalClusterEnable),
      lts_enable: cdktf.booleanToTerraform(this._ltsEnable),
      name: cdktf.stringToTerraform(this._name),
      network_id: cdktf.stringToTerraform(this._networkId),
      node_type: cdktf.stringToTerraform(this._nodeType),
      number_of_cn: cdktf.numberToTerraform(this._numberOfCn),
      number_of_node: cdktf.numberToTerraform(this._numberOfNode),
      port: cdktf.numberToTerraform(this._port),
      region: cdktf.stringToTerraform(this._region),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      user_name: cdktf.stringToTerraform(this._userName),
      user_pwd: cdktf.stringToTerraform(this._userPwd),
      version: cdktf.stringToTerraform(this._version),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      public_ip: dwsClusterPublicIpToTerraform(this._publicIp.internalValue),
      timeouts: dwsClusterTimeoutsToTerraform(this._timeouts.internalValue),
      volume: dwsClusterVolumeToTerraform(this._volume.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      availability_zone: {
        value: cdktf.stringToHclTerraform(this._availabilityZone),
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
      dss_pool_id: {
        value: cdktf.stringToHclTerraform(this._dssPoolId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      elb_id: {
        value: cdktf.stringToHclTerraform(this._elbId),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      keep_last_manual_snapshot: {
        value: cdktf.numberToHclTerraform(this._keepLastManualSnapshot),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      kms_key_id: {
        value: cdktf.stringToHclTerraform(this._kmsKeyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      logical_cluster_enable: {
        value: cdktf.booleanToHclTerraform(this._logicalClusterEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      lts_enable: {
        value: cdktf.booleanToHclTerraform(this._ltsEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      network_id: {
        value: cdktf.stringToHclTerraform(this._networkId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      node_type: {
        value: cdktf.stringToHclTerraform(this._nodeType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      number_of_cn: {
        value: cdktf.numberToHclTerraform(this._numberOfCn),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      number_of_node: {
        value: cdktf.numberToHclTerraform(this._numberOfNode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      port: {
        value: cdktf.numberToHclTerraform(this._port),
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
      security_group_id: {
        value: cdktf.stringToHclTerraform(this._securityGroupId),
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
      user_name: {
        value: cdktf.stringToHclTerraform(this._userName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      user_pwd: {
        value: cdktf.stringToHclTerraform(this._userPwd),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      public_ip: {
        value: dwsClusterPublicIpToHclTerraform(this._publicIp.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DwsClusterPublicIpList",
      },
      timeouts: {
        value: dwsClusterTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DwsClusterTimeouts",
      },
      volume: {
        value: dwsClusterVolumeToHclTerraform(this._volume.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DwsClusterVolumeList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

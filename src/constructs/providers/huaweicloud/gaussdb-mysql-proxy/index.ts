// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface GaussdbMysqlProxyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#access_control_type GaussdbMysqlProxy#access_control_type}
  */
  readonly accessControlType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#connection_pool_type GaussdbMysqlProxy#connection_pool_type}
  */
  readonly connectionPoolType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#consistence_mode GaussdbMysqlProxy#consistence_mode}
  */
  readonly consistenceMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#flavor GaussdbMysqlProxy#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#id GaussdbMysqlProxy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#instance_id GaussdbMysqlProxy#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#new_node_auto_add_status GaussdbMysqlProxy#new_node_auto_add_status}
  */
  readonly newNodeAutoAddStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#new_node_weight GaussdbMysqlProxy#new_node_weight}
  */
  readonly newNodeWeight?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#node_num GaussdbMysqlProxy#node_num}
  */
  readonly nodeNum: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#open_access_control GaussdbMysqlProxy#open_access_control}
  */
  readonly openAccessControl?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#port GaussdbMysqlProxy#port}
  */
  readonly port?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#proxy_mode GaussdbMysqlProxy#proxy_mode}
  */
  readonly proxyMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#proxy_name GaussdbMysqlProxy#proxy_name}
  */
  readonly proxyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#region GaussdbMysqlProxy#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#route_mode GaussdbMysqlProxy#route_mode}
  */
  readonly routeMode?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#subnet_id GaussdbMysqlProxy#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#transaction_split GaussdbMysqlProxy#transaction_split}
  */
  readonly transactionSplit?: string;
  /**
  * access_control_ip_list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#access_control_ip_list GaussdbMysqlProxy#access_control_ip_list}
  */
  readonly accessControlIpList?: GaussdbMysqlProxyAccessControlIpListStruct[] | cdktf.IResolvable;
  /**
  * master_node_weight block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#master_node_weight GaussdbMysqlProxy#master_node_weight}
  */
  readonly masterNodeWeight?: GaussdbMysqlProxyMasterNodeWeight;
  /**
  * parameters block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#parameters GaussdbMysqlProxy#parameters}
  */
  readonly parameters?: GaussdbMysqlProxyParameters[] | cdktf.IResolvable;
  /**
  * readonly_nodes_weight block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#readonly_nodes_weight GaussdbMysqlProxy#readonly_nodes_weight}
  */
  readonly readonlyNodesWeight?: GaussdbMysqlProxyReadonlyNodesWeight[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#timeouts GaussdbMysqlProxy#timeouts}
  */
  readonly timeouts?: GaussdbMysqlProxyTimeouts;
}
export interface GaussdbMysqlProxyNodes {
}

export function gaussdbMysqlProxyNodesToTerraform(struct?: GaussdbMysqlProxyNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function gaussdbMysqlProxyNodesToHclTerraform(struct?: GaussdbMysqlProxyNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class GaussdbMysqlProxyNodesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): GaussdbMysqlProxyNodes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlProxyNodes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // az_code - computed: true, optional: false, required: false
  public get azCode() {
    return this.getStringAttribute('az_code');
  }

  // frozen_flag - computed: true, optional: false, required: false
  public get frozenFlag() {
    return this.getNumberAttribute('frozen_flag');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // role - computed: true, optional: false, required: false
  public get role() {
    return this.getStringAttribute('role');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }
}

export class GaussdbMysqlProxyNodesList extends cdktf.ComplexList {

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
  public get(index: number): GaussdbMysqlProxyNodesOutputReference {
    return new GaussdbMysqlProxyNodesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface GaussdbMysqlProxyAccessControlIpListStruct {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#description GaussdbMysqlProxy#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#ip GaussdbMysqlProxy#ip}
  */
  readonly ip: string;
}

export function gaussdbMysqlProxyAccessControlIpListStructToTerraform(struct?: GaussdbMysqlProxyAccessControlIpListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    ip: cdktf.stringToTerraform(struct!.ip),
  }
}


export function gaussdbMysqlProxyAccessControlIpListStructToHclTerraform(struct?: GaussdbMysqlProxyAccessControlIpListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ip: {
      value: cdktf.stringToHclTerraform(struct!.ip),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GaussdbMysqlProxyAccessControlIpListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): GaussdbMysqlProxyAccessControlIpListStruct | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._ip !== undefined) {
      hasAnyValues = true;
      internalValueResult.ip = this._ip;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlProxyAccessControlIpListStruct | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._ip = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._ip = value.ip;
    }
  }

  // description - computed: true, optional: true, required: false
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

  // ip - computed: false, optional: false, required: true
  private _ip?: string; 
  public get ip() {
    return this.getStringAttribute('ip');
  }
  public set ip(value: string) {
    this._ip = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ipInput() {
    return this._ip;
  }
}

export class GaussdbMysqlProxyAccessControlIpListStructList extends cdktf.ComplexList {
  public internalValue? : GaussdbMysqlProxyAccessControlIpListStruct[] | cdktf.IResolvable

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
  public get(index: number): GaussdbMysqlProxyAccessControlIpListStructOutputReference {
    return new GaussdbMysqlProxyAccessControlIpListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface GaussdbMysqlProxyMasterNodeWeight {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#id GaussdbMysqlProxy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#weight GaussdbMysqlProxy#weight}
  */
  readonly weight: number;
}

export function gaussdbMysqlProxyMasterNodeWeightToTerraform(struct?: GaussdbMysqlProxyMasterNodeWeightOutputReference | GaussdbMysqlProxyMasterNodeWeight): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    id: cdktf.stringToTerraform(struct!.id),
    weight: cdktf.numberToTerraform(struct!.weight),
  }
}


export function gaussdbMysqlProxyMasterNodeWeightToHclTerraform(struct?: GaussdbMysqlProxyMasterNodeWeightOutputReference | GaussdbMysqlProxyMasterNodeWeight): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    weight: {
      value: cdktf.numberToHclTerraform(struct!.weight),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GaussdbMysqlProxyMasterNodeWeightOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): GaussdbMysqlProxyMasterNodeWeight | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._weight !== undefined) {
      hasAnyValues = true;
      internalValueResult.weight = this._weight;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlProxyMasterNodeWeight | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._id = undefined;
      this._weight = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._id = value.id;
      this._weight = value.weight;
    }
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // weight - computed: false, optional: false, required: true
  private _weight?: number; 
  public get weight() {
    return this.getNumberAttribute('weight');
  }
  public set weight(value: number) {
    this._weight = value;
  }
  // Temporarily expose input value. Use with caution.
  public get weightInput() {
    return this._weight;
  }
}
export interface GaussdbMysqlProxyParameters {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#elem_type GaussdbMysqlProxy#elem_type}
  */
  readonly elemType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#name GaussdbMysqlProxy#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#value GaussdbMysqlProxy#value}
  */
  readonly value: string;
}

export function gaussdbMysqlProxyParametersToTerraform(struct?: GaussdbMysqlProxyParameters | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    elem_type: cdktf.stringToTerraform(struct!.elemType),
    name: cdktf.stringToTerraform(struct!.name),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function gaussdbMysqlProxyParametersToHclTerraform(struct?: GaussdbMysqlProxyParameters | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    elem_type: {
      value: cdktf.stringToHclTerraform(struct!.elemType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
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

export class GaussdbMysqlProxyParametersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): GaussdbMysqlProxyParameters | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._elemType !== undefined) {
      hasAnyValues = true;
      internalValueResult.elemType = this._elemType;
    }
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

  public set internalValue(value: GaussdbMysqlProxyParameters | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._elemType = undefined;
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
      this._elemType = value.elemType;
      this._name = value.name;
      this._value = value.value;
    }
  }

  // elem_type - computed: false, optional: false, required: true
  private _elemType?: string; 
  public get elemType() {
    return this.getStringAttribute('elem_type');
  }
  public set elemType(value: string) {
    this._elemType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get elemTypeInput() {
    return this._elemType;
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

export class GaussdbMysqlProxyParametersList extends cdktf.ComplexList {
  public internalValue? : GaussdbMysqlProxyParameters[] | cdktf.IResolvable

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
  public get(index: number): GaussdbMysqlProxyParametersOutputReference {
    return new GaussdbMysqlProxyParametersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface GaussdbMysqlProxyReadonlyNodesWeight {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#id GaussdbMysqlProxy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#weight GaussdbMysqlProxy#weight}
  */
  readonly weight: number;
}

export function gaussdbMysqlProxyReadonlyNodesWeightToTerraform(struct?: GaussdbMysqlProxyReadonlyNodesWeight | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    id: cdktf.stringToTerraform(struct!.id),
    weight: cdktf.numberToTerraform(struct!.weight),
  }
}


export function gaussdbMysqlProxyReadonlyNodesWeightToHclTerraform(struct?: GaussdbMysqlProxyReadonlyNodesWeight | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    weight: {
      value: cdktf.numberToHclTerraform(struct!.weight),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GaussdbMysqlProxyReadonlyNodesWeightOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): GaussdbMysqlProxyReadonlyNodesWeight | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._weight !== undefined) {
      hasAnyValues = true;
      internalValueResult.weight = this._weight;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GaussdbMysqlProxyReadonlyNodesWeight | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._id = undefined;
      this._weight = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._id = value.id;
      this._weight = value.weight;
    }
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // weight - computed: false, optional: false, required: true
  private _weight?: number; 
  public get weight() {
    return this.getNumberAttribute('weight');
  }
  public set weight(value: number) {
    this._weight = value;
  }
  // Temporarily expose input value. Use with caution.
  public get weightInput() {
    return this._weight;
  }
}

export class GaussdbMysqlProxyReadonlyNodesWeightList extends cdktf.ComplexList {
  public internalValue? : GaussdbMysqlProxyReadonlyNodesWeight[] | cdktf.IResolvable

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
  public get(index: number): GaussdbMysqlProxyReadonlyNodesWeightOutputReference {
    return new GaussdbMysqlProxyReadonlyNodesWeightOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface GaussdbMysqlProxyTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#create GaussdbMysqlProxy#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#delete GaussdbMysqlProxy#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#update GaussdbMysqlProxy#update}
  */
  readonly update?: string;
}

export function gaussdbMysqlProxyTimeoutsToTerraform(struct?: GaussdbMysqlProxyTimeouts | cdktf.IResolvable): any {
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


export function gaussdbMysqlProxyTimeoutsToHclTerraform(struct?: GaussdbMysqlProxyTimeouts | cdktf.IResolvable): any {
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

export class GaussdbMysqlProxyTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): GaussdbMysqlProxyTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: GaussdbMysqlProxyTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy huaweicloud_gaussdb_mysql_proxy}
*/
export class GaussdbMysqlProxy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_gaussdb_mysql_proxy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a GaussdbMysqlProxy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the GaussdbMysqlProxy to import
  * @param importFromId The id of the existing GaussdbMysqlProxy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the GaussdbMysqlProxy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_gaussdb_mysql_proxy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/gaussdb_mysql_proxy huaweicloud_gaussdb_mysql_proxy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options GaussdbMysqlProxyConfig
  */
  public constructor(scope: Construct, id: string, config: GaussdbMysqlProxyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_gaussdb_mysql_proxy',
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
    this._accessControlType = config.accessControlType;
    this._connectionPoolType = config.connectionPoolType;
    this._consistenceMode = config.consistenceMode;
    this._flavor = config.flavor;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._newNodeAutoAddStatus = config.newNodeAutoAddStatus;
    this._newNodeWeight = config.newNodeWeight;
    this._nodeNum = config.nodeNum;
    this._openAccessControl = config.openAccessControl;
    this._port = config.port;
    this._proxyMode = config.proxyMode;
    this._proxyName = config.proxyName;
    this._region = config.region;
    this._routeMode = config.routeMode;
    this._subnetId = config.subnetId;
    this._transactionSplit = config.transactionSplit;
    this._accessControlIpList.internalValue = config.accessControlIpList;
    this._masterNodeWeight.internalValue = config.masterNodeWeight;
    this._parameters.internalValue = config.parameters;
    this._readonlyNodesWeight.internalValue = config.readonlyNodesWeight;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_control_type - computed: true, optional: true, required: false
  private _accessControlType?: string; 
  public get accessControlType() {
    return this.getStringAttribute('access_control_type');
  }
  public set accessControlType(value: string) {
    this._accessControlType = value;
  }
  public resetAccessControlType() {
    this._accessControlType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessControlTypeInput() {
    return this._accessControlType;
  }

  // address - computed: true, optional: false, required: false
  public get address() {
    return this.getStringAttribute('address');
  }

  // can_upgrade - computed: true, optional: false, required: false
  public get canUpgrade() {
    return this.getBooleanAttribute('can_upgrade');
  }

  // connection_pool_type - computed: true, optional: true, required: false
  private _connectionPoolType?: string; 
  public get connectionPoolType() {
    return this.getStringAttribute('connection_pool_type');
  }
  public set connectionPoolType(value: string) {
    this._connectionPoolType = value;
  }
  public resetConnectionPoolType() {
    this._connectionPoolType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get connectionPoolTypeInput() {
    return this._connectionPoolType;
  }

  // consistence_mode - computed: true, optional: true, required: false
  private _consistenceMode?: string; 
  public get consistenceMode() {
    return this.getStringAttribute('consistence_mode');
  }
  public set consistenceMode(value: string) {
    this._consistenceMode = value;
  }
  public resetConsistenceMode() {
    this._consistenceMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consistenceModeInput() {
    return this._consistenceMode;
  }

  // current_version - computed: true, optional: false, required: false
  public get currentVersion() {
    return this.getStringAttribute('current_version');
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

  // new_node_auto_add_status - computed: true, optional: true, required: false
  private _newNodeAutoAddStatus?: string; 
  public get newNodeAutoAddStatus() {
    return this.getStringAttribute('new_node_auto_add_status');
  }
  public set newNodeAutoAddStatus(value: string) {
    this._newNodeAutoAddStatus = value;
  }
  public resetNewNodeAutoAddStatus() {
    this._newNodeAutoAddStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get newNodeAutoAddStatusInput() {
    return this._newNodeAutoAddStatus;
  }

  // new_node_weight - computed: false, optional: true, required: false
  private _newNodeWeight?: number; 
  public get newNodeWeight() {
    return this.getNumberAttribute('new_node_weight');
  }
  public set newNodeWeight(value: number) {
    this._newNodeWeight = value;
  }
  public resetNewNodeWeight() {
    this._newNodeWeight = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get newNodeWeightInput() {
    return this._newNodeWeight;
  }

  // node_num - computed: false, optional: false, required: true
  private _nodeNum?: number; 
  public get nodeNum() {
    return this.getNumberAttribute('node_num');
  }
  public set nodeNum(value: number) {
    this._nodeNum = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeNumInput() {
    return this._nodeNum;
  }

  // nodes - computed: true, optional: false, required: false
  private _nodes = new GaussdbMysqlProxyNodesList(this, "nodes", false);
  public get nodes() {
    return this._nodes;
  }

  // open_access_control - computed: true, optional: true, required: false
  private _openAccessControl?: boolean | cdktf.IResolvable; 
  public get openAccessControl() {
    return this.getBooleanAttribute('open_access_control');
  }
  public set openAccessControl(value: boolean | cdktf.IResolvable) {
    this._openAccessControl = value;
  }
  public resetOpenAccessControl() {
    this._openAccessControl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get openAccessControlInput() {
    return this._openAccessControl;
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

  // proxy_mode - computed: false, optional: true, required: false
  private _proxyMode?: string; 
  public get proxyMode() {
    return this.getStringAttribute('proxy_mode');
  }
  public set proxyMode(value: string) {
    this._proxyMode = value;
  }
  public resetProxyMode() {
    this._proxyMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get proxyModeInput() {
    return this._proxyMode;
  }

  // proxy_name - computed: true, optional: true, required: false
  private _proxyName?: string; 
  public get proxyName() {
    return this.getStringAttribute('proxy_name');
  }
  public set proxyName(value: string) {
    this._proxyName = value;
  }
  public resetProxyName() {
    this._proxyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get proxyNameInput() {
    return this._proxyName;
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

  // route_mode - computed: true, optional: true, required: false
  private _routeMode?: number; 
  public get routeMode() {
    return this.getNumberAttribute('route_mode');
  }
  public set routeMode(value: number) {
    this._routeMode = value;
  }
  public resetRouteMode() {
    this._routeMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get routeModeInput() {
    return this._routeMode;
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

  // switch_connection_pool_type_enabled - computed: true, optional: false, required: false
  public get switchConnectionPoolTypeEnabled() {
    return this.getBooleanAttribute('switch_connection_pool_type_enabled');
  }

  // transaction_split - computed: true, optional: true, required: false
  private _transactionSplit?: string; 
  public get transactionSplit() {
    return this.getStringAttribute('transaction_split');
  }
  public set transactionSplit(value: string) {
    this._transactionSplit = value;
  }
  public resetTransactionSplit() {
    this._transactionSplit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get transactionSplitInput() {
    return this._transactionSplit;
  }

  // access_control_ip_list - computed: false, optional: true, required: false
  private _accessControlIpList = new GaussdbMysqlProxyAccessControlIpListStructList(this, "access_control_ip_list", true);
  public get accessControlIpList() {
    return this._accessControlIpList;
  }
  public putAccessControlIpList(value: GaussdbMysqlProxyAccessControlIpListStruct[] | cdktf.IResolvable) {
    this._accessControlIpList.internalValue = value;
  }
  public resetAccessControlIpList() {
    this._accessControlIpList.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessControlIpListInput() {
    return this._accessControlIpList.internalValue;
  }

  // master_node_weight - computed: false, optional: true, required: false
  private _masterNodeWeight = new GaussdbMysqlProxyMasterNodeWeightOutputReference(this, "master_node_weight");
  public get masterNodeWeight() {
    return this._masterNodeWeight;
  }
  public putMasterNodeWeight(value: GaussdbMysqlProxyMasterNodeWeight) {
    this._masterNodeWeight.internalValue = value;
  }
  public resetMasterNodeWeight() {
    this._masterNodeWeight.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get masterNodeWeightInput() {
    return this._masterNodeWeight.internalValue;
  }

  // parameters - computed: false, optional: true, required: false
  private _parameters = new GaussdbMysqlProxyParametersList(this, "parameters", true);
  public get parameters() {
    return this._parameters;
  }
  public putParameters(value: GaussdbMysqlProxyParameters[] | cdktf.IResolvable) {
    this._parameters.internalValue = value;
  }
  public resetParameters() {
    this._parameters.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parametersInput() {
    return this._parameters.internalValue;
  }

  // readonly_nodes_weight - computed: false, optional: true, required: false
  private _readonlyNodesWeight = new GaussdbMysqlProxyReadonlyNodesWeightList(this, "readonly_nodes_weight", true);
  public get readonlyNodesWeight() {
    return this._readonlyNodesWeight;
  }
  public putReadonlyNodesWeight(value: GaussdbMysqlProxyReadonlyNodesWeight[] | cdktf.IResolvable) {
    this._readonlyNodesWeight.internalValue = value;
  }
  public resetReadonlyNodesWeight() {
    this._readonlyNodesWeight.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readonlyNodesWeightInput() {
    return this._readonlyNodesWeight.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new GaussdbMysqlProxyTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: GaussdbMysqlProxyTimeouts) {
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
      access_control_type: cdktf.stringToTerraform(this._accessControlType),
      connection_pool_type: cdktf.stringToTerraform(this._connectionPoolType),
      consistence_mode: cdktf.stringToTerraform(this._consistenceMode),
      flavor: cdktf.stringToTerraform(this._flavor),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      new_node_auto_add_status: cdktf.stringToTerraform(this._newNodeAutoAddStatus),
      new_node_weight: cdktf.numberToTerraform(this._newNodeWeight),
      node_num: cdktf.numberToTerraform(this._nodeNum),
      open_access_control: cdktf.booleanToTerraform(this._openAccessControl),
      port: cdktf.numberToTerraform(this._port),
      proxy_mode: cdktf.stringToTerraform(this._proxyMode),
      proxy_name: cdktf.stringToTerraform(this._proxyName),
      region: cdktf.stringToTerraform(this._region),
      route_mode: cdktf.numberToTerraform(this._routeMode),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      transaction_split: cdktf.stringToTerraform(this._transactionSplit),
      access_control_ip_list: cdktf.listMapper(gaussdbMysqlProxyAccessControlIpListStructToTerraform, true)(this._accessControlIpList.internalValue),
      master_node_weight: gaussdbMysqlProxyMasterNodeWeightToTerraform(this._masterNodeWeight.internalValue),
      parameters: cdktf.listMapper(gaussdbMysqlProxyParametersToTerraform, true)(this._parameters.internalValue),
      readonly_nodes_weight: cdktf.listMapper(gaussdbMysqlProxyReadonlyNodesWeightToTerraform, true)(this._readonlyNodesWeight.internalValue),
      timeouts: gaussdbMysqlProxyTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_control_type: {
        value: cdktf.stringToHclTerraform(this._accessControlType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      connection_pool_type: {
        value: cdktf.stringToHclTerraform(this._connectionPoolType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      consistence_mode: {
        value: cdktf.stringToHclTerraform(this._consistenceMode),
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
      new_node_auto_add_status: {
        value: cdktf.stringToHclTerraform(this._newNodeAutoAddStatus),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      new_node_weight: {
        value: cdktf.numberToHclTerraform(this._newNodeWeight),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      node_num: {
        value: cdktf.numberToHclTerraform(this._nodeNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      open_access_control: {
        value: cdktf.booleanToHclTerraform(this._openAccessControl),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      port: {
        value: cdktf.numberToHclTerraform(this._port),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      proxy_mode: {
        value: cdktf.stringToHclTerraform(this._proxyMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      proxy_name: {
        value: cdktf.stringToHclTerraform(this._proxyName),
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
      route_mode: {
        value: cdktf.numberToHclTerraform(this._routeMode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      subnet_id: {
        value: cdktf.stringToHclTerraform(this._subnetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      transaction_split: {
        value: cdktf.stringToHclTerraform(this._transactionSplit),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      access_control_ip_list: {
        value: cdktf.listMapperHcl(gaussdbMysqlProxyAccessControlIpListStructToHclTerraform, true)(this._accessControlIpList.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "GaussdbMysqlProxyAccessControlIpListStructList",
      },
      master_node_weight: {
        value: gaussdbMysqlProxyMasterNodeWeightToHclTerraform(this._masterNodeWeight.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "GaussdbMysqlProxyMasterNodeWeightList",
      },
      parameters: {
        value: cdktf.listMapperHcl(gaussdbMysqlProxyParametersToHclTerraform, true)(this._parameters.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "GaussdbMysqlProxyParametersList",
      },
      readonly_nodes_weight: {
        value: cdktf.listMapperHcl(gaussdbMysqlProxyReadonlyNodesWeightToHclTerraform, true)(this._readonlyNodesWeight.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "GaussdbMysqlProxyReadonlyNodesWeightList",
      },
      timeouts: {
        value: gaussdbMysqlProxyTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "GaussdbMysqlProxyTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

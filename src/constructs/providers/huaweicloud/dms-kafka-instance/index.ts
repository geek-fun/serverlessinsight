// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsKafkaInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#access_user DmsKafkaInstance#access_user}
  */
  readonly accessUser?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#arch_type DmsKafkaInstance#arch_type}
  */
  readonly archType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#auto_renew DmsKafkaInstance#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#availability_zones DmsKafkaInstance#availability_zones}
  */
  readonly availabilityZones?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#available_zones DmsKafkaInstance#available_zones}
  */
  readonly availableZones?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#bandwidth DmsKafkaInstance#bandwidth}
  */
  readonly bandwidth?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#broker_num DmsKafkaInstance#broker_num}
  */
  readonly brokerNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#charging_mode DmsKafkaInstance#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#description DmsKafkaInstance#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#dumping DmsKafkaInstance#dumping}
  */
  readonly dumping?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#enable_auto_topic DmsKafkaInstance#enable_auto_topic}
  */
  readonly enableAutoTopic?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#enabled_mechanisms DmsKafkaInstance#enabled_mechanisms}
  */
  readonly enabledMechanisms?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#engine_version DmsKafkaInstance#engine_version}
  */
  readonly engineVersion: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#enterprise_project_id DmsKafkaInstance#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#flavor_id DmsKafkaInstance#flavor_id}
  */
  readonly flavorId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#id DmsKafkaInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#ipv6_enable DmsKafkaInstance#ipv6_enable}
  */
  readonly ipv6Enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#maintain_begin DmsKafkaInstance#maintain_begin}
  */
  readonly maintainBegin?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#maintain_end DmsKafkaInstance#maintain_end}
  */
  readonly maintainEnd?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#manager_password DmsKafkaInstance#manager_password}
  */
  readonly managerPassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#manager_user DmsKafkaInstance#manager_user}
  */
  readonly managerUser?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#name DmsKafkaInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#network_id DmsKafkaInstance#network_id}
  */
  readonly networkId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#new_tenant_ips DmsKafkaInstance#new_tenant_ips}
  */
  readonly newTenantIps?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#password DmsKafkaInstance#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#period DmsKafkaInstance#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#period_unit DmsKafkaInstance#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#product_id DmsKafkaInstance#product_id}
  */
  readonly productId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#public_ip_ids DmsKafkaInstance#public_ip_ids}
  */
  readonly publicIpIds?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#region DmsKafkaInstance#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#retention_policy DmsKafkaInstance#retention_policy}
  */
  readonly retentionPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#security_group_id DmsKafkaInstance#security_group_id}
  */
  readonly securityGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#security_protocol DmsKafkaInstance#security_protocol}
  */
  readonly securityProtocol?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#ssl_enable DmsKafkaInstance#ssl_enable}
  */
  readonly sslEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#storage_space DmsKafkaInstance#storage_space}
  */
  readonly storageSpace?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#storage_spec_code DmsKafkaInstance#storage_spec_code}
  */
  readonly storageSpecCode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#tags DmsKafkaInstance#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#vpc_client_plain DmsKafkaInstance#vpc_client_plain}
  */
  readonly vpcClientPlain?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#vpc_id DmsKafkaInstance#vpc_id}
  */
  readonly vpcId: string;
  /**
  * cross_vpc_accesses block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#cross_vpc_accesses DmsKafkaInstance#cross_vpc_accesses}
  */
  readonly crossVpcAccesses?: DmsKafkaInstanceCrossVpcAccesses[] | cdktf.IResolvable;
  /**
  * parameters block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#parameters DmsKafkaInstance#parameters}
  */
  readonly parameters?: DmsKafkaInstanceParameters[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#timeouts DmsKafkaInstance#timeouts}
  */
  readonly timeouts?: DmsKafkaInstanceTimeouts;
}
export interface DmsKafkaInstanceCrossVpcAccesses {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#advertised_ip DmsKafkaInstance#advertised_ip}
  */
  readonly advertisedIp?: string;
}

export function dmsKafkaInstanceCrossVpcAccessesToTerraform(struct?: DmsKafkaInstanceCrossVpcAccesses | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    advertised_ip: cdktf.stringToTerraform(struct!.advertisedIp),
  }
}


export function dmsKafkaInstanceCrossVpcAccessesToHclTerraform(struct?: DmsKafkaInstanceCrossVpcAccesses | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    advertised_ip: {
      value: cdktf.stringToHclTerraform(struct!.advertisedIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsKafkaInstanceCrossVpcAccessesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsKafkaInstanceCrossVpcAccesses | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._advertisedIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.advertisedIp = this._advertisedIp;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsKafkaInstanceCrossVpcAccesses | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._advertisedIp = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._advertisedIp = value.advertisedIp;
    }
  }

  // advertised_ip - computed: true, optional: true, required: false
  private _advertisedIp?: string; 
  public get advertisedIp() {
    return this.getStringAttribute('advertised_ip');
  }
  public set advertisedIp(value: string) {
    this._advertisedIp = value;
  }
  public resetAdvertisedIp() {
    this._advertisedIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get advertisedIpInput() {
    return this._advertisedIp;
  }

  // lisenter_ip - computed: true, optional: false, required: false
  public get lisenterIp() {
    return this.getStringAttribute('lisenter_ip');
  }

  // listener_ip - computed: true, optional: false, required: false
  public get listenerIp() {
    return this.getStringAttribute('listener_ip');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }

  // port_id - computed: true, optional: false, required: false
  public get portId() {
    return this.getStringAttribute('port_id');
  }
}

export class DmsKafkaInstanceCrossVpcAccessesList extends cdktf.ComplexList {
  public internalValue? : DmsKafkaInstanceCrossVpcAccesses[] | cdktf.IResolvable

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
  public get(index: number): DmsKafkaInstanceCrossVpcAccessesOutputReference {
    return new DmsKafkaInstanceCrossVpcAccessesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsKafkaInstanceParameters {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#name DmsKafkaInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#value DmsKafkaInstance#value}
  */
  readonly value: string;
}

export function dmsKafkaInstanceParametersToTerraform(struct?: DmsKafkaInstanceParameters | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function dmsKafkaInstanceParametersToHclTerraform(struct?: DmsKafkaInstanceParameters | cdktf.IResolvable): any {
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

export class DmsKafkaInstanceParametersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsKafkaInstanceParameters | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DmsKafkaInstanceParameters | cdktf.IResolvable | undefined) {
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

export class DmsKafkaInstanceParametersList extends cdktf.ComplexList {
  public internalValue? : DmsKafkaInstanceParameters[] | cdktf.IResolvable

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
  public get(index: number): DmsKafkaInstanceParametersOutputReference {
    return new DmsKafkaInstanceParametersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsKafkaInstanceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#create DmsKafkaInstance#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#delete DmsKafkaInstance#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#update DmsKafkaInstance#update}
  */
  readonly update?: string;
}

export function dmsKafkaInstanceTimeoutsToTerraform(struct?: DmsKafkaInstanceTimeouts | cdktf.IResolvable): any {
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


export function dmsKafkaInstanceTimeoutsToHclTerraform(struct?: DmsKafkaInstanceTimeouts | cdktf.IResolvable): any {
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

export class DmsKafkaInstanceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DmsKafkaInstanceTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DmsKafkaInstanceTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance huaweicloud_dms_kafka_instance}
*/
export class DmsKafkaInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_kafka_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsKafkaInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsKafkaInstance to import
  * @param importFromId The id of the existing DmsKafkaInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsKafkaInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_kafka_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_instance huaweicloud_dms_kafka_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsKafkaInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: DmsKafkaInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_kafka_instance',
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
    this._accessUser = config.accessUser;
    this._archType = config.archType;
    this._autoRenew = config.autoRenew;
    this._availabilityZones = config.availabilityZones;
    this._availableZones = config.availableZones;
    this._bandwidth = config.bandwidth;
    this._brokerNum = config.brokerNum;
    this._chargingMode = config.chargingMode;
    this._description = config.description;
    this._dumping = config.dumping;
    this._enableAutoTopic = config.enableAutoTopic;
    this._enabledMechanisms = config.enabledMechanisms;
    this._engineVersion = config.engineVersion;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._flavorId = config.flavorId;
    this._id = config.id;
    this._ipv6Enable = config.ipv6Enable;
    this._maintainBegin = config.maintainBegin;
    this._maintainEnd = config.maintainEnd;
    this._managerPassword = config.managerPassword;
    this._managerUser = config.managerUser;
    this._name = config.name;
    this._networkId = config.networkId;
    this._newTenantIps = config.newTenantIps;
    this._password = config.password;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._productId = config.productId;
    this._publicIpIds = config.publicIpIds;
    this._region = config.region;
    this._retentionPolicy = config.retentionPolicy;
    this._securityGroupId = config.securityGroupId;
    this._securityProtocol = config.securityProtocol;
    this._sslEnable = config.sslEnable;
    this._storageSpace = config.storageSpace;
    this._storageSpecCode = config.storageSpecCode;
    this._tags = config.tags;
    this._vpcClientPlain = config.vpcClientPlain;
    this._vpcId = config.vpcId;
    this._crossVpcAccesses.internalValue = config.crossVpcAccesses;
    this._parameters.internalValue = config.parameters;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_user - computed: false, optional: true, required: false
  private _accessUser?: string; 
  public get accessUser() {
    return this.getStringAttribute('access_user');
  }
  public set accessUser(value: string) {
    this._accessUser = value;
  }
  public resetAccessUser() {
    this._accessUser = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessUserInput() {
    return this._accessUser;
  }

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

  // availability_zones - computed: true, optional: true, required: false
  private _availabilityZones?: string[]; 
  public get availabilityZones() {
    return cdktf.Fn.tolist(this.getListAttribute('availability_zones'));
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

  // available_zones - computed: true, optional: true, required: false
  private _availableZones?: string[]; 
  public get availableZones() {
    return this.getListAttribute('available_zones');
  }
  public set availableZones(value: string[]) {
    this._availableZones = value;
  }
  public resetAvailableZones() {
    this._availableZones = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availableZonesInput() {
    return this._availableZones;
  }

  // bandwidth - computed: true, optional: true, required: false
  private _bandwidth?: string; 
  public get bandwidth() {
    return this.getStringAttribute('bandwidth');
  }
  public set bandwidth(value: string) {
    this._bandwidth = value;
  }
  public resetBandwidth() {
    this._bandwidth = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthInput() {
    return this._bandwidth;
  }

  // broker_num - computed: true, optional: true, required: false
  private _brokerNum?: number; 
  public get brokerNum() {
    return this.getNumberAttribute('broker_num');
  }
  public set brokerNum(value: number) {
    this._brokerNum = value;
  }
  public resetBrokerNum() {
    this._brokerNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get brokerNumInput() {
    return this._brokerNum;
  }

  // cert_replaced - computed: true, optional: false, required: false
  public get certReplaced() {
    return this.getBooleanAttribute('cert_replaced');
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

  // connect_address - computed: true, optional: false, required: false
  public get connectAddress() {
    return this.getStringAttribute('connect_address');
  }

  // connector_id - computed: true, optional: false, required: false
  public get connectorId() {
    return this.getStringAttribute('connector_id');
  }

  // connector_node_num - computed: true, optional: false, required: false
  public get connectorNodeNum() {
    return this.getNumberAttribute('connector_node_num');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // dumping - computed: true, optional: true, required: false
  private _dumping?: boolean | cdktf.IResolvable; 
  public get dumping() {
    return this.getBooleanAttribute('dumping');
  }
  public set dumping(value: boolean | cdktf.IResolvable) {
    this._dumping = value;
  }
  public resetDumping() {
    this._dumping = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dumpingInput() {
    return this._dumping;
  }

  // enable_auto_topic - computed: true, optional: true, required: false
  private _enableAutoTopic?: boolean | cdktf.IResolvable; 
  public get enableAutoTopic() {
    return this.getBooleanAttribute('enable_auto_topic');
  }
  public set enableAutoTopic(value: boolean | cdktf.IResolvable) {
    this._enableAutoTopic = value;
  }
  public resetEnableAutoTopic() {
    this._enableAutoTopic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableAutoTopicInput() {
    return this._enableAutoTopic;
  }

  // enable_public_ip - computed: true, optional: false, required: false
  public get enablePublicIp() {
    return this.getBooleanAttribute('enable_public_ip');
  }

  // enabled_mechanisms - computed: false, optional: true, required: false
  private _enabledMechanisms?: string[]; 
  public get enabledMechanisms() {
    return cdktf.Fn.tolist(this.getListAttribute('enabled_mechanisms'));
  }
  public set enabledMechanisms(value: string[]) {
    this._enabledMechanisms = value;
  }
  public resetEnabledMechanisms() {
    this._enabledMechanisms = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledMechanismsInput() {
    return this._enabledMechanisms;
  }

  // engine - computed: true, optional: false, required: false
  public get engine() {
    return this.getStringAttribute('engine');
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

  // extend_times - computed: true, optional: false, required: false
  public get extendTimes() {
    return this.getNumberAttribute('extend_times');
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

  // ipv6_connect_addresses - computed: true, optional: false, required: false
  public get ipv6ConnectAddresses() {
    return this.getListAttribute('ipv6_connect_addresses');
  }

  // ipv6_enable - computed: true, optional: true, required: false
  private _ipv6Enable?: boolean | cdktf.IResolvable; 
  public get ipv6Enable() {
    return this.getBooleanAttribute('ipv6_enable');
  }
  public set ipv6Enable(value: boolean | cdktf.IResolvable) {
    this._ipv6Enable = value;
  }
  public resetIpv6Enable() {
    this._ipv6Enable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipv6EnableInput() {
    return this._ipv6Enable;
  }

  // is_logical_volume - computed: true, optional: false, required: false
  public get isLogicalVolume() {
    return this.getBooleanAttribute('is_logical_volume');
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

  // management_connect_address - computed: true, optional: false, required: false
  public get managementConnectAddress() {
    return this.getStringAttribute('management_connect_address');
  }

  // manager_password - computed: false, optional: true, required: false
  private _managerPassword?: string; 
  public get managerPassword() {
    return this.getStringAttribute('manager_password');
  }
  public set managerPassword(value: string) {
    this._managerPassword = value;
  }
  public resetManagerPassword() {
    this._managerPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get managerPasswordInput() {
    return this._managerPassword;
  }

  // manager_user - computed: false, optional: true, required: false
  private _managerUser?: string; 
  public get managerUser() {
    return this.getStringAttribute('manager_user');
  }
  public set managerUser(value: string) {
    this._managerUser = value;
  }
  public resetManagerUser() {
    this._managerUser = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get managerUserInput() {
    return this._managerUser;
  }

  // manegement_connect_address - computed: true, optional: false, required: false
  public get manegementConnectAddress() {
    return this.getStringAttribute('manegement_connect_address');
  }

  // message_query_inst_enable - computed: true, optional: false, required: false
  public get messageQueryInstEnable() {
    return this.getBooleanAttribute('message_query_inst_enable');
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

  // new_tenant_ips - computed: false, optional: true, required: false
  private _newTenantIps?: string[]; 
  public get newTenantIps() {
    return this.getListAttribute('new_tenant_ips');
  }
  public set newTenantIps(value: string[]) {
    this._newTenantIps = value;
  }
  public resetNewTenantIps() {
    this._newTenantIps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get newTenantIpsInput() {
    return this._newTenantIps;
  }

  // node_num - computed: true, optional: false, required: false
  public get nodeNum() {
    return this.getNumberAttribute('node_num');
  }

  // partition_num - computed: true, optional: false, required: false
  public get partitionNum() {
    return this.getNumberAttribute('partition_num');
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

  // pod_connect_address - computed: true, optional: false, required: false
  public get podConnectAddress() {
    return this.getStringAttribute('pod_connect_address');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }

  // product_id - computed: false, optional: true, required: false
  private _productId?: string; 
  public get productId() {
    return this.getStringAttribute('product_id');
  }
  public set productId(value: string) {
    this._productId = value;
  }
  public resetProductId() {
    this._productId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get productIdInput() {
    return this._productId;
  }

  // public_bandwidth - computed: true, optional: false, required: false
  public get publicBandwidth() {
    return this.getNumberAttribute('public_bandwidth');
  }

  // public_ip_address - computed: true, optional: false, required: false
  public get publicIpAddress() {
    return this.getListAttribute('public_ip_address');
  }

  // public_ip_ids - computed: false, optional: true, required: false
  private _publicIpIds?: string[]; 
  public get publicIpIds() {
    return cdktf.Fn.tolist(this.getListAttribute('public_ip_ids'));
  }
  public set publicIpIds(value: string[]) {
    this._publicIpIds = value;
  }
  public resetPublicIpIds() {
    this._publicIpIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpIdsInput() {
    return this._publicIpIds;
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

  // resource_spec_code - computed: true, optional: false, required: false
  public get resourceSpecCode() {
    return this.getStringAttribute('resource_spec_code');
  }

  // retention_policy - computed: true, optional: true, required: false
  private _retentionPolicy?: string; 
  public get retentionPolicy() {
    return this.getStringAttribute('retention_policy');
  }
  public set retentionPolicy(value: string) {
    this._retentionPolicy = value;
  }
  public resetRetentionPolicy() {
    this._retentionPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retentionPolicyInput() {
    return this._retentionPolicy;
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

  // security_protocol - computed: false, optional: true, required: false
  private _securityProtocol?: string; 
  public get securityProtocol() {
    return this.getStringAttribute('security_protocol');
  }
  public set securityProtocol(value: string) {
    this._securityProtocol = value;
  }
  public resetSecurityProtocol() {
    this._securityProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityProtocolInput() {
    return this._securityProtocol;
  }

  // ssl_enable - computed: true, optional: true, required: false
  private _sslEnable?: boolean | cdktf.IResolvable; 
  public get sslEnable() {
    return this.getBooleanAttribute('ssl_enable');
  }
  public set sslEnable(value: boolean | cdktf.IResolvable) {
    this._sslEnable = value;
  }
  public resetSslEnable() {
    this._sslEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslEnableInput() {
    return this._sslEnable;
  }

  // ssl_two_way_enable - computed: true, optional: false, required: false
  public get sslTwoWayEnable() {
    return this.getBooleanAttribute('ssl_two_way_enable');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // storage_resource_id - computed: true, optional: false, required: false
  public get storageResourceId() {
    return this.getStringAttribute('storage_resource_id');
  }

  // storage_space - computed: true, optional: true, required: false
  private _storageSpace?: number; 
  public get storageSpace() {
    return this.getNumberAttribute('storage_space');
  }
  public set storageSpace(value: number) {
    this._storageSpace = value;
  }
  public resetStorageSpace() {
    this._storageSpace = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageSpaceInput() {
    return this._storageSpace;
  }

  // storage_spec_code - computed: false, optional: false, required: true
  private _storageSpecCode?: string; 
  public get storageSpecCode() {
    return this.getStringAttribute('storage_spec_code');
  }
  public set storageSpecCode(value: string) {
    this._storageSpecCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageSpecCodeInput() {
    return this._storageSpecCode;
  }

  // storage_type - computed: true, optional: false, required: false
  public get storageType() {
    return this.getStringAttribute('storage_type');
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

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // used_storage_space - computed: true, optional: false, required: false
  public get usedStorageSpace() {
    return this.getNumberAttribute('used_storage_space');
  }

  // user_id - computed: true, optional: false, required: false
  public get userId() {
    return this.getStringAttribute('user_id');
  }

  // user_name - computed: true, optional: false, required: false
  public get userName() {
    return this.getStringAttribute('user_name');
  }

  // vpc_client_plain - computed: true, optional: true, required: false
  private _vpcClientPlain?: boolean | cdktf.IResolvable; 
  public get vpcClientPlain() {
    return this.getBooleanAttribute('vpc_client_plain');
  }
  public set vpcClientPlain(value: boolean | cdktf.IResolvable) {
    this._vpcClientPlain = value;
  }
  public resetVpcClientPlain() {
    this._vpcClientPlain = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcClientPlainInput() {
    return this._vpcClientPlain;
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

  // cross_vpc_accesses - computed: false, optional: true, required: false
  private _crossVpcAccesses = new DmsKafkaInstanceCrossVpcAccessesList(this, "cross_vpc_accesses", false);
  public get crossVpcAccesses() {
    return this._crossVpcAccesses;
  }
  public putCrossVpcAccesses(value: DmsKafkaInstanceCrossVpcAccesses[] | cdktf.IResolvable) {
    this._crossVpcAccesses.internalValue = value;
  }
  public resetCrossVpcAccesses() {
    this._crossVpcAccesses.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get crossVpcAccessesInput() {
    return this._crossVpcAccesses.internalValue;
  }

  // parameters - computed: false, optional: true, required: false
  private _parameters = new DmsKafkaInstanceParametersList(this, "parameters", true);
  public get parameters() {
    return this._parameters;
  }
  public putParameters(value: DmsKafkaInstanceParameters[] | cdktf.IResolvable) {
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
  private _timeouts = new DmsKafkaInstanceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DmsKafkaInstanceTimeouts) {
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
      access_user: cdktf.stringToTerraform(this._accessUser),
      arch_type: cdktf.stringToTerraform(this._archType),
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      availability_zones: cdktf.listMapper(cdktf.stringToTerraform, false)(this._availabilityZones),
      available_zones: cdktf.listMapper(cdktf.stringToTerraform, false)(this._availableZones),
      bandwidth: cdktf.stringToTerraform(this._bandwidth),
      broker_num: cdktf.numberToTerraform(this._brokerNum),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      description: cdktf.stringToTerraform(this._description),
      dumping: cdktf.booleanToTerraform(this._dumping),
      enable_auto_topic: cdktf.booleanToTerraform(this._enableAutoTopic),
      enabled_mechanisms: cdktf.listMapper(cdktf.stringToTerraform, false)(this._enabledMechanisms),
      engine_version: cdktf.stringToTerraform(this._engineVersion),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      flavor_id: cdktf.stringToTerraform(this._flavorId),
      id: cdktf.stringToTerraform(this._id),
      ipv6_enable: cdktf.booleanToTerraform(this._ipv6Enable),
      maintain_begin: cdktf.stringToTerraform(this._maintainBegin),
      maintain_end: cdktf.stringToTerraform(this._maintainEnd),
      manager_password: cdktf.stringToTerraform(this._managerPassword),
      manager_user: cdktf.stringToTerraform(this._managerUser),
      name: cdktf.stringToTerraform(this._name),
      network_id: cdktf.stringToTerraform(this._networkId),
      new_tenant_ips: cdktf.listMapper(cdktf.stringToTerraform, false)(this._newTenantIps),
      password: cdktf.stringToTerraform(this._password),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      product_id: cdktf.stringToTerraform(this._productId),
      public_ip_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._publicIpIds),
      region: cdktf.stringToTerraform(this._region),
      retention_policy: cdktf.stringToTerraform(this._retentionPolicy),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      security_protocol: cdktf.stringToTerraform(this._securityProtocol),
      ssl_enable: cdktf.booleanToTerraform(this._sslEnable),
      storage_space: cdktf.numberToTerraform(this._storageSpace),
      storage_spec_code: cdktf.stringToTerraform(this._storageSpecCode),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      vpc_client_plain: cdktf.booleanToTerraform(this._vpcClientPlain),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      cross_vpc_accesses: cdktf.listMapper(dmsKafkaInstanceCrossVpcAccessesToTerraform, true)(this._crossVpcAccesses.internalValue),
      parameters: cdktf.listMapper(dmsKafkaInstanceParametersToTerraform, true)(this._parameters.internalValue),
      timeouts: dmsKafkaInstanceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_user: {
        value: cdktf.stringToHclTerraform(this._accessUser),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      arch_type: {
        value: cdktf.stringToHclTerraform(this._archType),
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
      availability_zones: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._availabilityZones),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      available_zones: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._availableZones),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      bandwidth: {
        value: cdktf.stringToHclTerraform(this._bandwidth),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      broker_num: {
        value: cdktf.numberToHclTerraform(this._brokerNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
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
      dumping: {
        value: cdktf.booleanToHclTerraform(this._dumping),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_auto_topic: {
        value: cdktf.booleanToHclTerraform(this._enableAutoTopic),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enabled_mechanisms: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._enabledMechanisms),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
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
      ipv6_enable: {
        value: cdktf.booleanToHclTerraform(this._ipv6Enable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      manager_password: {
        value: cdktf.stringToHclTerraform(this._managerPassword),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      manager_user: {
        value: cdktf.stringToHclTerraform(this._managerUser),
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
      network_id: {
        value: cdktf.stringToHclTerraform(this._networkId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      new_tenant_ips: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._newTenantIps),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
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
      product_id: {
        value: cdktf.stringToHclTerraform(this._productId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      public_ip_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._publicIpIds),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      retention_policy: {
        value: cdktf.stringToHclTerraform(this._retentionPolicy),
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
      security_protocol: {
        value: cdktf.stringToHclTerraform(this._securityProtocol),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ssl_enable: {
        value: cdktf.booleanToHclTerraform(this._sslEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      storage_space: {
        value: cdktf.numberToHclTerraform(this._storageSpace),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      storage_spec_code: {
        value: cdktf.stringToHclTerraform(this._storageSpecCode),
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
      vpc_client_plain: {
        value: cdktf.booleanToHclTerraform(this._vpcClientPlain),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cross_vpc_accesses: {
        value: cdktf.listMapperHcl(dmsKafkaInstanceCrossVpcAccessesToHclTerraform, true)(this._crossVpcAccesses.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsKafkaInstanceCrossVpcAccessesList",
      },
      parameters: {
        value: cdktf.listMapperHcl(dmsKafkaInstanceParametersToHclTerraform, true)(this._parameters.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "DmsKafkaInstanceParametersList",
      },
      timeouts: {
        value: dmsKafkaInstanceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DmsKafkaInstanceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

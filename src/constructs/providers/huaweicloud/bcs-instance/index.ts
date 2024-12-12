// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface BcsInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#blockchain_type BcsInstance#blockchain_type}
  */
  readonly blockchainType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#cce_cluster_id BcsInstance#cce_cluster_id}
  */
  readonly cceClusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#consensus BcsInstance#consensus}
  */
  readonly consensus: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#database_type BcsInstance#database_type}
  */
  readonly databaseType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#delete_obs BcsInstance#delete_obs}
  */
  readonly deleteObs?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#delete_storage BcsInstance#delete_storage}
  */
  readonly deleteStorage?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#edition BcsInstance#edition}
  */
  readonly edition: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#eip_enable BcsInstance#eip_enable}
  */
  readonly eipEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#enterprise_project_id BcsInstance#enterprise_project_id}
  */
  readonly enterpriseProjectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#fabric_version BcsInstance#fabric_version}
  */
  readonly fabricVersion: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#id BcsInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#name BcsInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#orderer_node_num BcsInstance#orderer_node_num}
  */
  readonly ordererNodeNum: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#org_disk_size BcsInstance#org_disk_size}
  */
  readonly orgDiskSize: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#password BcsInstance#password}
  */
  readonly password: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#region BcsInstance#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#restful_api_support BcsInstance#restful_api_support}
  */
  readonly restfulApiSupport?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#security_mechanism BcsInstance#security_mechanism}
  */
  readonly securityMechanism?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#tc3_need BcsInstance#tc3_need}
  */
  readonly tc3Need?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#volume_type BcsInstance#volume_type}
  */
  readonly volumeType: string;
  /**
  * block_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#block_info BcsInstance#block_info}
  */
  readonly blockInfo?: BcsInstanceBlockInfo;
  /**
  * channels block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#channels BcsInstance#channels}
  */
  readonly channels?: BcsInstanceChannels[] | cdktf.IResolvable;
  /**
  * couchdb block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#couchdb BcsInstance#couchdb}
  */
  readonly couchdb?: BcsInstanceCouchdb;
  /**
  * kafka block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#kafka BcsInstance#kafka}
  */
  readonly kafka?: BcsInstanceKafka;
  /**
  * peer_orgs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#peer_orgs BcsInstance#peer_orgs}
  */
  readonly peerOrgs?: BcsInstancePeerOrgs[] | cdktf.IResolvable;
  /**
  * sfs_turbo block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#sfs_turbo BcsInstance#sfs_turbo}
  */
  readonly sfsTurbo?: BcsInstanceSfsTurbo;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#timeouts BcsInstance#timeouts}
  */
  readonly timeouts?: BcsInstanceTimeouts;
}
export interface BcsInstanceBlockInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#block_size BcsInstance#block_size}
  */
  readonly blockSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#generation_interval BcsInstance#generation_interval}
  */
  readonly generationInterval?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#transaction_quantity BcsInstance#transaction_quantity}
  */
  readonly transactionQuantity?: number;
}

export function bcsInstanceBlockInfoToTerraform(struct?: BcsInstanceBlockInfoOutputReference | BcsInstanceBlockInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    block_size: cdktf.numberToTerraform(struct!.blockSize),
    generation_interval: cdktf.numberToTerraform(struct!.generationInterval),
    transaction_quantity: cdktf.numberToTerraform(struct!.transactionQuantity),
  }
}


export function bcsInstanceBlockInfoToHclTerraform(struct?: BcsInstanceBlockInfoOutputReference | BcsInstanceBlockInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    block_size: {
      value: cdktf.numberToHclTerraform(struct!.blockSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    generation_interval: {
      value: cdktf.numberToHclTerraform(struct!.generationInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    transaction_quantity: {
      value: cdktf.numberToHclTerraform(struct!.transactionQuantity),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class BcsInstanceBlockInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): BcsInstanceBlockInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._blockSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.blockSize = this._blockSize;
    }
    if (this._generationInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.generationInterval = this._generationInterval;
    }
    if (this._transactionQuantity !== undefined) {
      hasAnyValues = true;
      internalValueResult.transactionQuantity = this._transactionQuantity;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: BcsInstanceBlockInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._blockSize = undefined;
      this._generationInterval = undefined;
      this._transactionQuantity = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._blockSize = value.blockSize;
      this._generationInterval = value.generationInterval;
      this._transactionQuantity = value.transactionQuantity;
    }
  }

  // block_size - computed: false, optional: true, required: false
  private _blockSize?: number; 
  public get blockSize() {
    return this.getNumberAttribute('block_size');
  }
  public set blockSize(value: number) {
    this._blockSize = value;
  }
  public resetBlockSize() {
    this._blockSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blockSizeInput() {
    return this._blockSize;
  }

  // generation_interval - computed: false, optional: true, required: false
  private _generationInterval?: number; 
  public get generationInterval() {
    return this.getNumberAttribute('generation_interval');
  }
  public set generationInterval(value: number) {
    this._generationInterval = value;
  }
  public resetGenerationInterval() {
    this._generationInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get generationIntervalInput() {
    return this._generationInterval;
  }

  // transaction_quantity - computed: false, optional: true, required: false
  private _transactionQuantity?: number; 
  public get transactionQuantity() {
    return this.getNumberAttribute('transaction_quantity');
  }
  public set transactionQuantity(value: number) {
    this._transactionQuantity = value;
  }
  public resetTransactionQuantity() {
    this._transactionQuantity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get transactionQuantityInput() {
    return this._transactionQuantity;
  }
}
export interface BcsInstanceChannels {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#name BcsInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#org_names BcsInstance#org_names}
  */
  readonly orgNames?: string[];
}

export function bcsInstanceChannelsToTerraform(struct?: BcsInstanceChannels | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    org_names: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.orgNames),
  }
}


export function bcsInstanceChannelsToHclTerraform(struct?: BcsInstanceChannels | cdktf.IResolvable): any {
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
    org_names: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.orgNames),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class BcsInstanceChannelsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): BcsInstanceChannels | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._orgNames !== undefined) {
      hasAnyValues = true;
      internalValueResult.orgNames = this._orgNames;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: BcsInstanceChannels | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._orgNames = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._orgNames = value.orgNames;
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

  // org_names - computed: true, optional: true, required: false
  private _orgNames?: string[]; 
  public get orgNames() {
    return this.getListAttribute('org_names');
  }
  public set orgNames(value: string[]) {
    this._orgNames = value;
  }
  public resetOrgNames() {
    this._orgNames = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get orgNamesInput() {
    return this._orgNames;
  }
}

export class BcsInstanceChannelsList extends cdktf.ComplexList {
  public internalValue? : BcsInstanceChannels[] | cdktf.IResolvable

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
  public get(index: number): BcsInstanceChannelsOutputReference {
    return new BcsInstanceChannelsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface BcsInstanceCouchdb {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#password BcsInstance#password}
  */
  readonly password: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#user_name BcsInstance#user_name}
  */
  readonly userName: string;
}

export function bcsInstanceCouchdbToTerraform(struct?: BcsInstanceCouchdbOutputReference | BcsInstanceCouchdb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    password: cdktf.stringToTerraform(struct!.password),
    user_name: cdktf.stringToTerraform(struct!.userName),
  }
}


export function bcsInstanceCouchdbToHclTerraform(struct?: BcsInstanceCouchdbOutputReference | BcsInstanceCouchdb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user_name: {
      value: cdktf.stringToHclTerraform(struct!.userName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class BcsInstanceCouchdbOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): BcsInstanceCouchdb | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._userName !== undefined) {
      hasAnyValues = true;
      internalValueResult.userName = this._userName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: BcsInstanceCouchdb | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._password = undefined;
      this._userName = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._password = value.password;
      this._userName = value.userName;
    }
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
}
export interface BcsInstanceKafka {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#availability_zone BcsInstance#availability_zone}
  */
  readonly availabilityZone: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#flavor BcsInstance#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#storage_size BcsInstance#storage_size}
  */
  readonly storageSize: number;
}

export function bcsInstanceKafkaToTerraform(struct?: BcsInstanceKafkaOutputReference | BcsInstanceKafka): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    availability_zone: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.availabilityZone),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    storage_size: cdktf.numberToTerraform(struct!.storageSize),
  }
}


export function bcsInstanceKafkaToHclTerraform(struct?: BcsInstanceKafkaOutputReference | BcsInstanceKafka): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    availability_zone: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.availabilityZone),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    storage_size: {
      value: cdktf.numberToHclTerraform(struct!.storageSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class BcsInstanceKafkaOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): BcsInstanceKafka | undefined {
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
    if (this._storageSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.storageSize = this._storageSize;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: BcsInstanceKafka | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._availabilityZone = undefined;
      this._flavor = undefined;
      this._storageSize = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._availabilityZone = value.availabilityZone;
      this._flavor = value.flavor;
      this._storageSize = value.storageSize;
    }
  }

  // availability_zone - computed: false, optional: false, required: true
  private _availabilityZone?: string[]; 
  public get availabilityZone() {
    return this.getListAttribute('availability_zone');
  }
  public set availabilityZone(value: string[]) {
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

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // storage_size - computed: false, optional: false, required: true
  private _storageSize?: number; 
  public get storageSize() {
    return this.getNumberAttribute('storage_size');
  }
  public set storageSize(value: number) {
    this._storageSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageSizeInput() {
    return this._storageSize;
  }
}
export interface BcsInstancePeerOrgsAddress {
}

export function bcsInstancePeerOrgsAddressToTerraform(struct?: BcsInstancePeerOrgsAddress): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function bcsInstancePeerOrgsAddressToHclTerraform(struct?: BcsInstancePeerOrgsAddress): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class BcsInstancePeerOrgsAddressOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): BcsInstancePeerOrgsAddress | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: BcsInstancePeerOrgsAddress | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // domain_port - computed: true, optional: false, required: false
  public get domainPort() {
    return this.getStringAttribute('domain_port');
  }

  // ip_port - computed: true, optional: false, required: false
  public get ipPort() {
    return this.getStringAttribute('ip_port');
  }
}

export class BcsInstancePeerOrgsAddressList extends cdktf.ComplexList {

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
  public get(index: number): BcsInstancePeerOrgsAddressOutputReference {
    return new BcsInstancePeerOrgsAddressOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface BcsInstancePeerOrgs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#count BcsInstance#count}
  */
  readonly count: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#org_name BcsInstance#org_name}
  */
  readonly orgName: string;
}

export function bcsInstancePeerOrgsToTerraform(struct?: BcsInstancePeerOrgs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    count: cdktf.numberToTerraform(struct!.count),
    org_name: cdktf.stringToTerraform(struct!.orgName),
  }
}


export function bcsInstancePeerOrgsToHclTerraform(struct?: BcsInstancePeerOrgs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    count: {
      value: cdktf.numberToHclTerraform(struct!.count),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    org_name: {
      value: cdktf.stringToHclTerraform(struct!.orgName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class BcsInstancePeerOrgsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): BcsInstancePeerOrgs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._count !== undefined) {
      hasAnyValues = true;
      internalValueResult.count = this._count;
    }
    if (this._orgName !== undefined) {
      hasAnyValues = true;
      internalValueResult.orgName = this._orgName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: BcsInstancePeerOrgs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._count = undefined;
      this._orgName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._count = value.count;
      this._orgName = value.orgName;
    }
  }

  // address - computed: true, optional: false, required: false
  private _address = new BcsInstancePeerOrgsAddressList(this, "address", false);
  public get address() {
    return this._address;
  }

  // count - computed: false, optional: false, required: true
  private _count?: number; 
  public get count() {
    return this.getNumberAttribute('count');
  }
  public set count(value: number) {
    this._count = value;
  }
  // Temporarily expose input value. Use with caution.
  public get countInput() {
    return this._count;
  }

  // org_name - computed: false, optional: false, required: true
  private _orgName?: string; 
  public get orgName() {
    return this.getStringAttribute('org_name');
  }
  public set orgName(value: string) {
    this._orgName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get orgNameInput() {
    return this._orgName;
  }

  // pvc_name - computed: true, optional: false, required: false
  public get pvcName() {
    return this.getStringAttribute('pvc_name');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // status_detail - computed: true, optional: false, required: false
  public get statusDetail() {
    return this.getStringAttribute('status_detail');
  }
}

export class BcsInstancePeerOrgsList extends cdktf.ComplexList {
  public internalValue? : BcsInstancePeerOrgs[] | cdktf.IResolvable

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
  public get(index: number): BcsInstancePeerOrgsOutputReference {
    return new BcsInstancePeerOrgsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface BcsInstanceSfsTurbo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#availability_zone BcsInstance#availability_zone}
  */
  readonly availabilityZone?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#flavor BcsInstance#flavor}
  */
  readonly flavor?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#share_type BcsInstance#share_type}
  */
  readonly shareType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#type BcsInstance#type}
  */
  readonly type?: string;
}

export function bcsInstanceSfsTurboToTerraform(struct?: BcsInstanceSfsTurboOutputReference | BcsInstanceSfsTurbo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    availability_zone: cdktf.stringToTerraform(struct!.availabilityZone),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    share_type: cdktf.stringToTerraform(struct!.shareType),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function bcsInstanceSfsTurboToHclTerraform(struct?: BcsInstanceSfsTurboOutputReference | BcsInstanceSfsTurbo): any {
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
    share_type: {
      value: cdktf.stringToHclTerraform(struct!.shareType),
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

export class BcsInstanceSfsTurboOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): BcsInstanceSfsTurbo | undefined {
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
    if (this._shareType !== undefined) {
      hasAnyValues = true;
      internalValueResult.shareType = this._shareType;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: BcsInstanceSfsTurbo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._availabilityZone = undefined;
      this._flavor = undefined;
      this._shareType = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._availabilityZone = value.availabilityZone;
      this._flavor = value.flavor;
      this._shareType = value.shareType;
      this._type = value.type;
    }
  }

  // availability_zone - computed: false, optional: true, required: false
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

  // flavor - computed: false, optional: true, required: false
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  public resetFlavor() {
    this._flavor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // share_type - computed: true, optional: true, required: false
  private _shareType?: string; 
  public get shareType() {
    return this.getStringAttribute('share_type');
  }
  public set shareType(value: string) {
    this._shareType = value;
  }
  public resetShareType() {
    this._shareType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get shareTypeInput() {
    return this._shareType;
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
}
export interface BcsInstanceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#create BcsInstance#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#delete BcsInstance#delete}
  */
  readonly delete?: string;
}

export function bcsInstanceTimeoutsToTerraform(struct?: BcsInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function bcsInstanceTimeoutsToHclTerraform(struct?: BcsInstanceTimeouts | cdktf.IResolvable): any {
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

export class BcsInstanceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): BcsInstanceTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: BcsInstanceTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance huaweicloud_bcs_instance}
*/
export class BcsInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_bcs_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a BcsInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the BcsInstance to import
  * @param importFromId The id of the existing BcsInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the BcsInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_bcs_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/bcs_instance huaweicloud_bcs_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options BcsInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: BcsInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_bcs_instance',
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
    this._blockchainType = config.blockchainType;
    this._cceClusterId = config.cceClusterId;
    this._consensus = config.consensus;
    this._databaseType = config.databaseType;
    this._deleteObs = config.deleteObs;
    this._deleteStorage = config.deleteStorage;
    this._edition = config.edition;
    this._eipEnable = config.eipEnable;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._fabricVersion = config.fabricVersion;
    this._id = config.id;
    this._name = config.name;
    this._ordererNodeNum = config.ordererNodeNum;
    this._orgDiskSize = config.orgDiskSize;
    this._password = config.password;
    this._region = config.region;
    this._restfulApiSupport = config.restfulApiSupport;
    this._securityMechanism = config.securityMechanism;
    this._tc3Need = config.tc3Need;
    this._volumeType = config.volumeType;
    this._blockInfo.internalValue = config.blockInfo;
    this._channels.internalValue = config.channels;
    this._couchdb.internalValue = config.couchdb;
    this._kafka.internalValue = config.kafka;
    this._peerOrgs.internalValue = config.peerOrgs;
    this._sfsTurbo.internalValue = config.sfsTurbo;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // agent_portal_address - computed: true, optional: false, required: false
  public get agentPortalAddress() {
    return this.getListAttribute('agent_portal_address');
  }

  // blockchain_type - computed: true, optional: true, required: false
  private _blockchainType?: string; 
  public get blockchainType() {
    return this.getStringAttribute('blockchain_type');
  }
  public set blockchainType(value: string) {
    this._blockchainType = value;
  }
  public resetBlockchainType() {
    this._blockchainType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blockchainTypeInput() {
    return this._blockchainType;
  }

  // cce_cluster_id - computed: false, optional: false, required: true
  private _cceClusterId?: string; 
  public get cceClusterId() {
    return this.getStringAttribute('cce_cluster_id');
  }
  public set cceClusterId(value: string) {
    this._cceClusterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cceClusterIdInput() {
    return this._cceClusterId;
  }

  // cluster_type - computed: true, optional: false, required: false
  public get clusterType() {
    return this.getStringAttribute('cluster_type');
  }

  // consensus - computed: false, optional: false, required: true
  private _consensus?: string; 
  public get consensus() {
    return this.getStringAttribute('consensus');
  }
  public set consensus(value: string) {
    this._consensus = value;
  }
  // Temporarily expose input value. Use with caution.
  public get consensusInput() {
    return this._consensus;
  }

  // cross_region_support - computed: true, optional: false, required: false
  public get crossRegionSupport() {
    return this.getBooleanAttribute('cross_region_support');
  }

  // database_type - computed: true, optional: true, required: false
  private _databaseType?: string; 
  public get databaseType() {
    return this.getStringAttribute('database_type');
  }
  public set databaseType(value: string) {
    this._databaseType = value;
  }
  public resetDatabaseType() {
    this._databaseType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get databaseTypeInput() {
    return this._databaseType;
  }

  // delete_obs - computed: false, optional: true, required: false
  private _deleteObs?: boolean | cdktf.IResolvable; 
  public get deleteObs() {
    return this.getBooleanAttribute('delete_obs');
  }
  public set deleteObs(value: boolean | cdktf.IResolvable) {
    this._deleteObs = value;
  }
  public resetDeleteObs() {
    this._deleteObs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteObsInput() {
    return this._deleteObs;
  }

  // delete_storage - computed: false, optional: true, required: false
  private _deleteStorage?: boolean | cdktf.IResolvable; 
  public get deleteStorage() {
    return this.getBooleanAttribute('delete_storage');
  }
  public set deleteStorage(value: boolean | cdktf.IResolvable) {
    this._deleteStorage = value;
  }
  public resetDeleteStorage() {
    this._deleteStorage = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteStorageInput() {
    return this._deleteStorage;
  }

  // edition - computed: false, optional: false, required: true
  private _edition?: number; 
  public get edition() {
    return this.getNumberAttribute('edition');
  }
  public set edition(value: number) {
    this._edition = value;
  }
  // Temporarily expose input value. Use with caution.
  public get editionInput() {
    return this._edition;
  }

  // eip_enable - computed: false, optional: true, required: false
  private _eipEnable?: boolean | cdktf.IResolvable; 
  public get eipEnable() {
    return this.getBooleanAttribute('eip_enable');
  }
  public set eipEnable(value: boolean | cdktf.IResolvable) {
    this._eipEnable = value;
  }
  public resetEipEnable() {
    this._eipEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eipEnableInput() {
    return this._eipEnable;
  }

  // enterprise_project_id - computed: false, optional: false, required: true
  private _enterpriseProjectId?: string; 
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }
  public set enterpriseProjectId(value: string) {
    this._enterpriseProjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseProjectIdInput() {
    return this._enterpriseProjectId;
  }

  // fabric_version - computed: false, optional: false, required: true
  private _fabricVersion?: string; 
  public get fabricVersion() {
    return this.getStringAttribute('fabric_version');
  }
  public set fabricVersion(value: string) {
    this._fabricVersion = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fabricVersionInput() {
    return this._fabricVersion;
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

  // old_service_version - computed: true, optional: false, required: false
  public get oldServiceVersion() {
    return this.getStringAttribute('old_service_version');
  }

  // orderer_node_num - computed: false, optional: false, required: true
  private _ordererNodeNum?: number; 
  public get ordererNodeNum() {
    return this.getNumberAttribute('orderer_node_num');
  }
  public set ordererNodeNum(value: number) {
    this._ordererNodeNum = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ordererNodeNumInput() {
    return this._ordererNodeNum;
  }

  // org_disk_size - computed: false, optional: false, required: true
  private _orgDiskSize?: number; 
  public get orgDiskSize() {
    return this.getNumberAttribute('org_disk_size');
  }
  public set orgDiskSize(value: number) {
    this._orgDiskSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get orgDiskSizeInput() {
    return this._orgDiskSize;
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

  // purchase_type - computed: true, optional: false, required: false
  public get purchaseType() {
    return this.getStringAttribute('purchase_type');
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

  // restful_api_support - computed: true, optional: true, required: false
  private _restfulApiSupport?: boolean | cdktf.IResolvable; 
  public get restfulApiSupport() {
    return this.getBooleanAttribute('restful_api_support');
  }
  public set restfulApiSupport(value: boolean | cdktf.IResolvable) {
    this._restfulApiSupport = value;
  }
  public resetRestfulApiSupport() {
    this._restfulApiSupport = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get restfulApiSupportInput() {
    return this._restfulApiSupport;
  }

  // rollback_support - computed: true, optional: false, required: false
  public get rollbackSupport() {
    return this.getBooleanAttribute('rollback_support');
  }

  // security_mechanism - computed: true, optional: true, required: false
  private _securityMechanism?: string; 
  public get securityMechanism() {
    return this.getStringAttribute('security_mechanism');
  }
  public set securityMechanism(value: string) {
    this._securityMechanism = value;
  }
  public resetSecurityMechanism() {
    this._securityMechanism = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityMechanismInput() {
    return this._securityMechanism;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tc3_need - computed: true, optional: true, required: false
  private _tc3Need?: boolean | cdktf.IResolvable; 
  public get tc3Need() {
    return this.getBooleanAttribute('tc3_need');
  }
  public set tc3Need(value: boolean | cdktf.IResolvable) {
    this._tc3Need = value;
  }
  public resetTc3Need() {
    this._tc3Need = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tc3NeedInput() {
    return this._tc3Need;
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getStringAttribute('version');
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

  // block_info - computed: false, optional: true, required: false
  private _blockInfo = new BcsInstanceBlockInfoOutputReference(this, "block_info");
  public get blockInfo() {
    return this._blockInfo;
  }
  public putBlockInfo(value: BcsInstanceBlockInfo) {
    this._blockInfo.internalValue = value;
  }
  public resetBlockInfo() {
    this._blockInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blockInfoInput() {
    return this._blockInfo.internalValue;
  }

  // channels - computed: false, optional: true, required: false
  private _channels = new BcsInstanceChannelsList(this, "channels", true);
  public get channels() {
    return this._channels;
  }
  public putChannels(value: BcsInstanceChannels[] | cdktf.IResolvable) {
    this._channels.internalValue = value;
  }
  public resetChannels() {
    this._channels.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get channelsInput() {
    return this._channels.internalValue;
  }

  // couchdb - computed: false, optional: true, required: false
  private _couchdb = new BcsInstanceCouchdbOutputReference(this, "couchdb");
  public get couchdb() {
    return this._couchdb;
  }
  public putCouchdb(value: BcsInstanceCouchdb) {
    this._couchdb.internalValue = value;
  }
  public resetCouchdb() {
    this._couchdb.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get couchdbInput() {
    return this._couchdb.internalValue;
  }

  // kafka - computed: false, optional: true, required: false
  private _kafka = new BcsInstanceKafkaOutputReference(this, "kafka");
  public get kafka() {
    return this._kafka;
  }
  public putKafka(value: BcsInstanceKafka) {
    this._kafka.internalValue = value;
  }
  public resetKafka() {
    this._kafka.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaInput() {
    return this._kafka.internalValue;
  }

  // peer_orgs - computed: false, optional: true, required: false
  private _peerOrgs = new BcsInstancePeerOrgsList(this, "peer_orgs", true);
  public get peerOrgs() {
    return this._peerOrgs;
  }
  public putPeerOrgs(value: BcsInstancePeerOrgs[] | cdktf.IResolvable) {
    this._peerOrgs.internalValue = value;
  }
  public resetPeerOrgs() {
    this._peerOrgs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get peerOrgsInput() {
    return this._peerOrgs.internalValue;
  }

  // sfs_turbo - computed: false, optional: true, required: false
  private _sfsTurbo = new BcsInstanceSfsTurboOutputReference(this, "sfs_turbo");
  public get sfsTurbo() {
    return this._sfsTurbo;
  }
  public putSfsTurbo(value: BcsInstanceSfsTurbo) {
    this._sfsTurbo.internalValue = value;
  }
  public resetSfsTurbo() {
    this._sfsTurbo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sfsTurboInput() {
    return this._sfsTurbo.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new BcsInstanceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: BcsInstanceTimeouts) {
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
      blockchain_type: cdktf.stringToTerraform(this._blockchainType),
      cce_cluster_id: cdktf.stringToTerraform(this._cceClusterId),
      consensus: cdktf.stringToTerraform(this._consensus),
      database_type: cdktf.stringToTerraform(this._databaseType),
      delete_obs: cdktf.booleanToTerraform(this._deleteObs),
      delete_storage: cdktf.booleanToTerraform(this._deleteStorage),
      edition: cdktf.numberToTerraform(this._edition),
      eip_enable: cdktf.booleanToTerraform(this._eipEnable),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      fabric_version: cdktf.stringToTerraform(this._fabricVersion),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      orderer_node_num: cdktf.numberToTerraform(this._ordererNodeNum),
      org_disk_size: cdktf.numberToTerraform(this._orgDiskSize),
      password: cdktf.stringToTerraform(this._password),
      region: cdktf.stringToTerraform(this._region),
      restful_api_support: cdktf.booleanToTerraform(this._restfulApiSupport),
      security_mechanism: cdktf.stringToTerraform(this._securityMechanism),
      tc3_need: cdktf.booleanToTerraform(this._tc3Need),
      volume_type: cdktf.stringToTerraform(this._volumeType),
      block_info: bcsInstanceBlockInfoToTerraform(this._blockInfo.internalValue),
      channels: cdktf.listMapper(bcsInstanceChannelsToTerraform, true)(this._channels.internalValue),
      couchdb: bcsInstanceCouchdbToTerraform(this._couchdb.internalValue),
      kafka: bcsInstanceKafkaToTerraform(this._kafka.internalValue),
      peer_orgs: cdktf.listMapper(bcsInstancePeerOrgsToTerraform, true)(this._peerOrgs.internalValue),
      sfs_turbo: bcsInstanceSfsTurboToTerraform(this._sfsTurbo.internalValue),
      timeouts: bcsInstanceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      blockchain_type: {
        value: cdktf.stringToHclTerraform(this._blockchainType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cce_cluster_id: {
        value: cdktf.stringToHclTerraform(this._cceClusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      consensus: {
        value: cdktf.stringToHclTerraform(this._consensus),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      database_type: {
        value: cdktf.stringToHclTerraform(this._databaseType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      delete_obs: {
        value: cdktf.booleanToHclTerraform(this._deleteObs),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      delete_storage: {
        value: cdktf.booleanToHclTerraform(this._deleteStorage),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      edition: {
        value: cdktf.numberToHclTerraform(this._edition),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      eip_enable: {
        value: cdktf.booleanToHclTerraform(this._eipEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      fabric_version: {
        value: cdktf.stringToHclTerraform(this._fabricVersion),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      orderer_node_num: {
        value: cdktf.numberToHclTerraform(this._ordererNodeNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      org_disk_size: {
        value: cdktf.numberToHclTerraform(this._orgDiskSize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      password: {
        value: cdktf.stringToHclTerraform(this._password),
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
      restful_api_support: {
        value: cdktf.booleanToHclTerraform(this._restfulApiSupport),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      security_mechanism: {
        value: cdktf.stringToHclTerraform(this._securityMechanism),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tc3_need: {
        value: cdktf.booleanToHclTerraform(this._tc3Need),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      volume_type: {
        value: cdktf.stringToHclTerraform(this._volumeType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      block_info: {
        value: bcsInstanceBlockInfoToHclTerraform(this._blockInfo.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "BcsInstanceBlockInfoList",
      },
      channels: {
        value: cdktf.listMapperHcl(bcsInstanceChannelsToHclTerraform, true)(this._channels.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "BcsInstanceChannelsList",
      },
      couchdb: {
        value: bcsInstanceCouchdbToHclTerraform(this._couchdb.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "BcsInstanceCouchdbList",
      },
      kafka: {
        value: bcsInstanceKafkaToHclTerraform(this._kafka.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "BcsInstanceKafkaList",
      },
      peer_orgs: {
        value: cdktf.listMapperHcl(bcsInstancePeerOrgsToHclTerraform, true)(this._peerOrgs.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "BcsInstancePeerOrgsList",
      },
      sfs_turbo: {
        value: bcsInstanceSfsTurboToHclTerraform(this._sfsTurbo.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "BcsInstanceSfsTurboList",
      },
      timeouts: {
        value: bcsInstanceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "BcsInstanceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ObsBucketAclConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the name of the bucket to which to set the acl.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#bucket ObsBucketAcl#bucket}
  */
  readonly bucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#id ObsBucketAcl#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#region ObsBucketAcl#region}
  */
  readonly region?: string;
  /**
  * account_permission block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#account_permission ObsBucketAcl#account_permission}
  */
  readonly accountPermission?: ObsBucketAclAccountPermission[] | cdktf.IResolvable;
  /**
  * log_delivery_user_permission block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#log_delivery_user_permission ObsBucketAcl#log_delivery_user_permission}
  */
  readonly logDeliveryUserPermission?: ObsBucketAclLogDeliveryUserPermission;
  /**
  * owner_permission block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#owner_permission ObsBucketAcl#owner_permission}
  */
  readonly ownerPermission?: ObsBucketAclOwnerPermission;
  /**
  * public_permission block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#public_permission ObsBucketAcl#public_permission}
  */
  readonly publicPermission?: ObsBucketAclPublicPermission;
}
export interface ObsBucketAclAccountPermission {
  /**
  * Specifies the access to acl. Valid values are **READ_ACP** and **WRITE_ACP**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#access_to_acl ObsBucketAcl#access_to_acl}
  */
  readonly accessToAcl?: string[];
  /**
  * Specifies the access to bucket. Valid values are **READ** and **WRITE**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#access_to_bucket ObsBucketAcl#access_to_bucket}
  */
  readonly accessToBucket?: string[];
  /**
  * Specifies the account id to authorize. The account id cannot be the bucket owner, 
  * and must be unique.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#account_id ObsBucketAcl#account_id}
  */
  readonly accountId: string;
}

export function obsBucketAclAccountPermissionToTerraform(struct?: ObsBucketAclAccountPermission | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_to_acl: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToAcl),
    access_to_bucket: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToBucket),
    account_id: cdktf.stringToTerraform(struct!.accountId),
  }
}


export function obsBucketAclAccountPermissionToHclTerraform(struct?: ObsBucketAclAccountPermission | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    access_to_acl: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToAcl),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    access_to_bucket: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToBucket),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    account_id: {
      value: cdktf.stringToHclTerraform(struct!.accountId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ObsBucketAclAccountPermissionOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ObsBucketAclAccountPermission | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessToAcl !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToAcl = this._accessToAcl;
    }
    if (this._accessToBucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToBucket = this._accessToBucket;
    }
    if (this._accountId !== undefined) {
      hasAnyValues = true;
      internalValueResult.accountId = this._accountId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObsBucketAclAccountPermission | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._accessToAcl = undefined;
      this._accessToBucket = undefined;
      this._accountId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._accessToAcl = value.accessToAcl;
      this._accessToBucket = value.accessToBucket;
      this._accountId = value.accountId;
    }
  }

  // access_to_acl - computed: false, optional: true, required: false
  private _accessToAcl?: string[]; 
  public get accessToAcl() {
    return this.getListAttribute('access_to_acl');
  }
  public set accessToAcl(value: string[]) {
    this._accessToAcl = value;
  }
  public resetAccessToAcl() {
    this._accessToAcl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToAclInput() {
    return this._accessToAcl;
  }

  // access_to_bucket - computed: false, optional: true, required: false
  private _accessToBucket?: string[]; 
  public get accessToBucket() {
    return this.getListAttribute('access_to_bucket');
  }
  public set accessToBucket(value: string[]) {
    this._accessToBucket = value;
  }
  public resetAccessToBucket() {
    this._accessToBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToBucketInput() {
    return this._accessToBucket;
  }

  // account_id - computed: false, optional: false, required: true
  private _accountId?: string; 
  public get accountId() {
    return this.getStringAttribute('account_id');
  }
  public set accountId(value: string) {
    this._accountId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accountIdInput() {
    return this._accountId;
  }
}

export class ObsBucketAclAccountPermissionList extends cdktf.ComplexList {
  public internalValue? : ObsBucketAclAccountPermission[] | cdktf.IResolvable

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
  public get(index: number): ObsBucketAclAccountPermissionOutputReference {
    return new ObsBucketAclAccountPermissionOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ObsBucketAclLogDeliveryUserPermission {
  /**
  * Specifies the access to acl. Valid values are **READ_ACP** and **WRITE_ACP**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#access_to_acl ObsBucketAcl#access_to_acl}
  */
  readonly accessToAcl?: string[];
  /**
  * Specifies the access to bucket. Valid values are **READ** and **WRITE**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#access_to_bucket ObsBucketAcl#access_to_bucket}
  */
  readonly accessToBucket?: string[];
}

export function obsBucketAclLogDeliveryUserPermissionToTerraform(struct?: ObsBucketAclLogDeliveryUserPermissionOutputReference | ObsBucketAclLogDeliveryUserPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_to_acl: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToAcl),
    access_to_bucket: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToBucket),
  }
}


export function obsBucketAclLogDeliveryUserPermissionToHclTerraform(struct?: ObsBucketAclLogDeliveryUserPermissionOutputReference | ObsBucketAclLogDeliveryUserPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    access_to_acl: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToAcl),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    access_to_bucket: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToBucket),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ObsBucketAclLogDeliveryUserPermissionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ObsBucketAclLogDeliveryUserPermission | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessToAcl !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToAcl = this._accessToAcl;
    }
    if (this._accessToBucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToBucket = this._accessToBucket;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObsBucketAclLogDeliveryUserPermission | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessToAcl = undefined;
      this._accessToBucket = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessToAcl = value.accessToAcl;
      this._accessToBucket = value.accessToBucket;
    }
  }

  // access_to_acl - computed: false, optional: true, required: false
  private _accessToAcl?: string[]; 
  public get accessToAcl() {
    return this.getListAttribute('access_to_acl');
  }
  public set accessToAcl(value: string[]) {
    this._accessToAcl = value;
  }
  public resetAccessToAcl() {
    this._accessToAcl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToAclInput() {
    return this._accessToAcl;
  }

  // access_to_bucket - computed: false, optional: true, required: false
  private _accessToBucket?: string[]; 
  public get accessToBucket() {
    return this.getListAttribute('access_to_bucket');
  }
  public set accessToBucket(value: string[]) {
    this._accessToBucket = value;
  }
  public resetAccessToBucket() {
    this._accessToBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToBucketInput() {
    return this._accessToBucket;
  }
}
export interface ObsBucketAclOwnerPermission {
  /**
  * Specifies the access to acl. Valid values are **READ_ACP** and **WRITE_ACP**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#access_to_acl ObsBucketAcl#access_to_acl}
  */
  readonly accessToAcl?: string[];
  /**
  * Specifies the access to bucket. Valid values are **READ** and **WRITE**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#access_to_bucket ObsBucketAcl#access_to_bucket}
  */
  readonly accessToBucket?: string[];
}

export function obsBucketAclOwnerPermissionToTerraform(struct?: ObsBucketAclOwnerPermissionOutputReference | ObsBucketAclOwnerPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_to_acl: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToAcl),
    access_to_bucket: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToBucket),
  }
}


export function obsBucketAclOwnerPermissionToHclTerraform(struct?: ObsBucketAclOwnerPermissionOutputReference | ObsBucketAclOwnerPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    access_to_acl: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToAcl),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    access_to_bucket: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToBucket),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ObsBucketAclOwnerPermissionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ObsBucketAclOwnerPermission | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessToAcl !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToAcl = this._accessToAcl;
    }
    if (this._accessToBucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToBucket = this._accessToBucket;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObsBucketAclOwnerPermission | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessToAcl = undefined;
      this._accessToBucket = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessToAcl = value.accessToAcl;
      this._accessToBucket = value.accessToBucket;
    }
  }

  // access_to_acl - computed: false, optional: true, required: false
  private _accessToAcl?: string[]; 
  public get accessToAcl() {
    return this.getListAttribute('access_to_acl');
  }
  public set accessToAcl(value: string[]) {
    this._accessToAcl = value;
  }
  public resetAccessToAcl() {
    this._accessToAcl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToAclInput() {
    return this._accessToAcl;
  }

  // access_to_bucket - computed: false, optional: true, required: false
  private _accessToBucket?: string[]; 
  public get accessToBucket() {
    return this.getListAttribute('access_to_bucket');
  }
  public set accessToBucket(value: string[]) {
    this._accessToBucket = value;
  }
  public resetAccessToBucket() {
    this._accessToBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToBucketInput() {
    return this._accessToBucket;
  }
}
export interface ObsBucketAclPublicPermission {
  /**
  * Specifies the access to acl. Valid values are **READ_ACP** and **WRITE_ACP**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#access_to_acl ObsBucketAcl#access_to_acl}
  */
  readonly accessToAcl?: string[];
  /**
  * Specifies the access to bucket. Valid values are **READ** and **WRITE**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#access_to_bucket ObsBucketAcl#access_to_bucket}
  */
  readonly accessToBucket?: string[];
}

export function obsBucketAclPublicPermissionToTerraform(struct?: ObsBucketAclPublicPermissionOutputReference | ObsBucketAclPublicPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_to_acl: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToAcl),
    access_to_bucket: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToBucket),
  }
}


export function obsBucketAclPublicPermissionToHclTerraform(struct?: ObsBucketAclPublicPermissionOutputReference | ObsBucketAclPublicPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    access_to_acl: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToAcl),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    access_to_bucket: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToBucket),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ObsBucketAclPublicPermissionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ObsBucketAclPublicPermission | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessToAcl !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToAcl = this._accessToAcl;
    }
    if (this._accessToBucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToBucket = this._accessToBucket;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObsBucketAclPublicPermission | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessToAcl = undefined;
      this._accessToBucket = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessToAcl = value.accessToAcl;
      this._accessToBucket = value.accessToBucket;
    }
  }

  // access_to_acl - computed: false, optional: true, required: false
  private _accessToAcl?: string[]; 
  public get accessToAcl() {
    return this.getListAttribute('access_to_acl');
  }
  public set accessToAcl(value: string[]) {
    this._accessToAcl = value;
  }
  public resetAccessToAcl() {
    this._accessToAcl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToAclInput() {
    return this._accessToAcl;
  }

  // access_to_bucket - computed: false, optional: true, required: false
  private _accessToBucket?: string[]; 
  public get accessToBucket() {
    return this.getListAttribute('access_to_bucket');
  }
  public set accessToBucket(value: string[]) {
    this._accessToBucket = value;
  }
  public resetAccessToBucket() {
    this._accessToBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToBucketInput() {
    return this._accessToBucket;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl huaweicloud_obs_bucket_acl}
*/
export class ObsBucketAcl extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_obs_bucket_acl";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ObsBucketAcl resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ObsBucketAcl to import
  * @param importFromId The id of the existing ObsBucketAcl that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ObsBucketAcl to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_obs_bucket_acl", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_acl huaweicloud_obs_bucket_acl} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ObsBucketAclConfig
  */
  public constructor(scope: Construct, id: string, config: ObsBucketAclConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_obs_bucket_acl',
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
    this._bucket = config.bucket;
    this._id = config.id;
    this._region = config.region;
    this._accountPermission.internalValue = config.accountPermission;
    this._logDeliveryUserPermission.internalValue = config.logDeliveryUserPermission;
    this._ownerPermission.internalValue = config.ownerPermission;
    this._publicPermission.internalValue = config.publicPermission;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bucket - computed: false, optional: false, required: true
  private _bucket?: string; 
  public get bucket() {
    return this.getStringAttribute('bucket');
  }
  public set bucket(value: string) {
    this._bucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketInput() {
    return this._bucket;
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

  // account_permission - computed: false, optional: true, required: false
  private _accountPermission = new ObsBucketAclAccountPermissionList(this, "account_permission", true);
  public get accountPermission() {
    return this._accountPermission;
  }
  public putAccountPermission(value: ObsBucketAclAccountPermission[] | cdktf.IResolvable) {
    this._accountPermission.internalValue = value;
  }
  public resetAccountPermission() {
    this._accountPermission.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountPermissionInput() {
    return this._accountPermission.internalValue;
  }

  // log_delivery_user_permission - computed: false, optional: true, required: false
  private _logDeliveryUserPermission = new ObsBucketAclLogDeliveryUserPermissionOutputReference(this, "log_delivery_user_permission");
  public get logDeliveryUserPermission() {
    return this._logDeliveryUserPermission;
  }
  public putLogDeliveryUserPermission(value: ObsBucketAclLogDeliveryUserPermission) {
    this._logDeliveryUserPermission.internalValue = value;
  }
  public resetLogDeliveryUserPermission() {
    this._logDeliveryUserPermission.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logDeliveryUserPermissionInput() {
    return this._logDeliveryUserPermission.internalValue;
  }

  // owner_permission - computed: false, optional: true, required: false
  private _ownerPermission = new ObsBucketAclOwnerPermissionOutputReference(this, "owner_permission");
  public get ownerPermission() {
    return this._ownerPermission;
  }
  public putOwnerPermission(value: ObsBucketAclOwnerPermission) {
    this._ownerPermission.internalValue = value;
  }
  public resetOwnerPermission() {
    this._ownerPermission.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ownerPermissionInput() {
    return this._ownerPermission.internalValue;
  }

  // public_permission - computed: false, optional: true, required: false
  private _publicPermission = new ObsBucketAclPublicPermissionOutputReference(this, "public_permission");
  public get publicPermission() {
    return this._publicPermission;
  }
  public putPublicPermission(value: ObsBucketAclPublicPermission) {
    this._publicPermission.internalValue = value;
  }
  public resetPublicPermission() {
    this._publicPermission.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicPermissionInput() {
    return this._publicPermission.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      bucket: cdktf.stringToTerraform(this._bucket),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      account_permission: cdktf.listMapper(obsBucketAclAccountPermissionToTerraform, true)(this._accountPermission.internalValue),
      log_delivery_user_permission: obsBucketAclLogDeliveryUserPermissionToTerraform(this._logDeliveryUserPermission.internalValue),
      owner_permission: obsBucketAclOwnerPermissionToTerraform(this._ownerPermission.internalValue),
      public_permission: obsBucketAclPublicPermissionToTerraform(this._publicPermission.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      bucket: {
        value: cdktf.stringToHclTerraform(this._bucket),
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
      account_permission: {
        value: cdktf.listMapperHcl(obsBucketAclAccountPermissionToHclTerraform, true)(this._accountPermission.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ObsBucketAclAccountPermissionList",
      },
      log_delivery_user_permission: {
        value: obsBucketAclLogDeliveryUserPermissionToHclTerraform(this._logDeliveryUserPermission.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ObsBucketAclLogDeliveryUserPermissionList",
      },
      owner_permission: {
        value: obsBucketAclOwnerPermissionToHclTerraform(this._ownerPermission.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ObsBucketAclOwnerPermissionList",
      },
      public_permission: {
        value: obsBucketAclPublicPermissionToHclTerraform(this._publicPermission.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ObsBucketAclPublicPermissionList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

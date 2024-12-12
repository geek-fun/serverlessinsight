// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ObsBucketObjectAclConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the name of the bucket which the object belongs to.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#bucket ObsBucketObjectAcl#bucket}
  */
  readonly bucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#id ObsBucketObjectAcl#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the name of the object to which to set the acl.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#key ObsBucketObjectAcl#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#region ObsBucketObjectAcl#region}
  */
  readonly region?: string;
  /**
  * account_permission block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#account_permission ObsBucketObjectAcl#account_permission}
  */
  readonly accountPermission?: ObsBucketObjectAclAccountPermission[] | cdktf.IResolvable;
  /**
  * public_permission block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#public_permission ObsBucketObjectAcl#public_permission}
  */
  readonly publicPermission?: ObsBucketObjectAclPublicPermission;
}
export interface ObsBucketObjectAclOwnerPermission {
}

export function obsBucketObjectAclOwnerPermissionToTerraform(struct?: ObsBucketObjectAclOwnerPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function obsBucketObjectAclOwnerPermissionToHclTerraform(struct?: ObsBucketObjectAclOwnerPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class ObsBucketObjectAclOwnerPermissionOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ObsBucketObjectAclOwnerPermission | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObsBucketObjectAclOwnerPermission | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // access_to_acl - computed: true, optional: false, required: false
  public get accessToAcl() {
    return this.getListAttribute('access_to_acl');
  }

  // access_to_object - computed: true, optional: false, required: false
  public get accessToObject() {
    return this.getListAttribute('access_to_object');
  }
}

export class ObsBucketObjectAclOwnerPermissionList extends cdktf.ComplexList {

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
  public get(index: number): ObsBucketObjectAclOwnerPermissionOutputReference {
    return new ObsBucketObjectAclOwnerPermissionOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ObsBucketObjectAclAccountPermission {
  /**
  * Specifies the access to acl. Valid values are **READ_ACP** and **WRITE_ACP**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#access_to_acl ObsBucketObjectAcl#access_to_acl}
  */
  readonly accessToAcl?: string[];
  /**
  * Specifies the access to object. Only **READ** supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#access_to_object ObsBucketObjectAcl#access_to_object}
  */
  readonly accessToObject?: string[];
  /**
  * Specifies the account id to authorize. The account id cannot be the object owner, 
  * and must be unique.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#account_id ObsBucketObjectAcl#account_id}
  */
  readonly accountId: string;
}

export function obsBucketObjectAclAccountPermissionToTerraform(struct?: ObsBucketObjectAclAccountPermission | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_to_acl: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToAcl),
    access_to_object: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToObject),
    account_id: cdktf.stringToTerraform(struct!.accountId),
  }
}


export function obsBucketObjectAclAccountPermissionToHclTerraform(struct?: ObsBucketObjectAclAccountPermission | cdktf.IResolvable): any {
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
    access_to_object: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToObject),
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

export class ObsBucketObjectAclAccountPermissionOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ObsBucketObjectAclAccountPermission | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessToAcl !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToAcl = this._accessToAcl;
    }
    if (this._accessToObject !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToObject = this._accessToObject;
    }
    if (this._accountId !== undefined) {
      hasAnyValues = true;
      internalValueResult.accountId = this._accountId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObsBucketObjectAclAccountPermission | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._accessToAcl = undefined;
      this._accessToObject = undefined;
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
      this._accessToObject = value.accessToObject;
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

  // access_to_object - computed: false, optional: true, required: false
  private _accessToObject?: string[]; 
  public get accessToObject() {
    return this.getListAttribute('access_to_object');
  }
  public set accessToObject(value: string[]) {
    this._accessToObject = value;
  }
  public resetAccessToObject() {
    this._accessToObject = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToObjectInput() {
    return this._accessToObject;
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

export class ObsBucketObjectAclAccountPermissionList extends cdktf.ComplexList {
  public internalValue? : ObsBucketObjectAclAccountPermission[] | cdktf.IResolvable

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
  public get(index: number): ObsBucketObjectAclAccountPermissionOutputReference {
    return new ObsBucketObjectAclAccountPermissionOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ObsBucketObjectAclPublicPermission {
  /**
  * Specifies the access to acl. Valid values are **READ_ACP** and **WRITE_ACP**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#access_to_acl ObsBucketObjectAcl#access_to_acl}
  */
  readonly accessToAcl?: string[];
  /**
  * Specifies the access to object. Only **READ** supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#access_to_object ObsBucketObjectAcl#access_to_object}
  */
  readonly accessToObject?: string[];
}

export function obsBucketObjectAclPublicPermissionToTerraform(struct?: ObsBucketObjectAclPublicPermissionOutputReference | ObsBucketObjectAclPublicPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_to_acl: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToAcl),
    access_to_object: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.accessToObject),
  }
}


export function obsBucketObjectAclPublicPermissionToHclTerraform(struct?: ObsBucketObjectAclPublicPermissionOutputReference | ObsBucketObjectAclPublicPermission): any {
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
    access_to_object: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.accessToObject),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ObsBucketObjectAclPublicPermissionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ObsBucketObjectAclPublicPermission | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessToAcl !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToAcl = this._accessToAcl;
    }
    if (this._accessToObject !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessToObject = this._accessToObject;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObsBucketObjectAclPublicPermission | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessToAcl = undefined;
      this._accessToObject = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessToAcl = value.accessToAcl;
      this._accessToObject = value.accessToObject;
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

  // access_to_object - computed: false, optional: true, required: false
  private _accessToObject?: string[]; 
  public get accessToObject() {
    return this.getListAttribute('access_to_object');
  }
  public set accessToObject(value: string[]) {
    this._accessToObject = value;
  }
  public resetAccessToObject() {
    this._accessToObject = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessToObjectInput() {
    return this._accessToObject;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl huaweicloud_obs_bucket_object_acl}
*/
export class ObsBucketObjectAcl extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_obs_bucket_object_acl";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ObsBucketObjectAcl resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ObsBucketObjectAcl to import
  * @param importFromId The id of the existing ObsBucketObjectAcl that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ObsBucketObjectAcl to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_obs_bucket_object_acl", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/obs_bucket_object_acl huaweicloud_obs_bucket_object_acl} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ObsBucketObjectAclConfig
  */
  public constructor(scope: Construct, id: string, config: ObsBucketObjectAclConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_obs_bucket_object_acl',
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
    this._key = config.key;
    this._region = config.region;
    this._accountPermission.internalValue = config.accountPermission;
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

  // key - computed: false, optional: false, required: true
  private _key?: string; 
  public get key() {
    return this.getStringAttribute('key');
  }
  public set key(value: string) {
    this._key = value;
  }
  // Temporarily expose input value. Use with caution.
  public get keyInput() {
    return this._key;
  }

  // owner_permission - computed: true, optional: false, required: false
  private _ownerPermission = new ObsBucketObjectAclOwnerPermissionList(this, "owner_permission", false);
  public get ownerPermission() {
    return this._ownerPermission;
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
  private _accountPermission = new ObsBucketObjectAclAccountPermissionList(this, "account_permission", true);
  public get accountPermission() {
    return this._accountPermission;
  }
  public putAccountPermission(value: ObsBucketObjectAclAccountPermission[] | cdktf.IResolvable) {
    this._accountPermission.internalValue = value;
  }
  public resetAccountPermission() {
    this._accountPermission.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountPermissionInput() {
    return this._accountPermission.internalValue;
  }

  // public_permission - computed: false, optional: true, required: false
  private _publicPermission = new ObsBucketObjectAclPublicPermissionOutputReference(this, "public_permission");
  public get publicPermission() {
    return this._publicPermission;
  }
  public putPublicPermission(value: ObsBucketObjectAclPublicPermission) {
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
      key: cdktf.stringToTerraform(this._key),
      region: cdktf.stringToTerraform(this._region),
      account_permission: cdktf.listMapper(obsBucketObjectAclAccountPermissionToTerraform, true)(this._accountPermission.internalValue),
      public_permission: obsBucketObjectAclPublicPermissionToTerraform(this._publicPermission.internalValue),
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
      key: {
        value: cdktf.stringToHclTerraform(this._key),
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
        value: cdktf.listMapperHcl(obsBucketObjectAclAccountPermissionToHclTerraform, true)(this._accountPermission.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ObsBucketObjectAclAccountPermissionList",
      },
      public_permission: {
        value: obsBucketObjectAclPublicPermissionToHclTerraform(this._publicPermission.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ObsBucketObjectAclPublicPermissionList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

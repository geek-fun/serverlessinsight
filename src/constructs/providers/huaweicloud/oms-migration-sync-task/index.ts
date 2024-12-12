// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface OmsMigrationSyncTaskConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#action OmsMigrationSyncTask#action}
  */
  readonly action?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#app_id OmsMigrationSyncTask#app_id}
  */
  readonly appId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#consistency_check OmsMigrationSyncTask#consistency_check}
  */
  readonly consistencyCheck?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#description OmsMigrationSyncTask#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#dst_ak OmsMigrationSyncTask#dst_ak}
  */
  readonly dstAk: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#dst_bucket OmsMigrationSyncTask#dst_bucket}
  */
  readonly dstBucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#dst_sk OmsMigrationSyncTask#dst_sk}
  */
  readonly dstSk: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#enable_kms OmsMigrationSyncTask#enable_kms}
  */
  readonly enableKms?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#enable_metadata_migration OmsMigrationSyncTask#enable_metadata_migration}
  */
  readonly enableMetadataMigration?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#enable_restore OmsMigrationSyncTask#enable_restore}
  */
  readonly enableRestore?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#id OmsMigrationSyncTask#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#region OmsMigrationSyncTask#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#src_ak OmsMigrationSyncTask#src_ak}
  */
  readonly srcAk: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#src_bucket OmsMigrationSyncTask#src_bucket}
  */
  readonly srcBucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#src_cloud_type OmsMigrationSyncTask#src_cloud_type}
  */
  readonly srcCloudType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#src_region OmsMigrationSyncTask#src_region}
  */
  readonly srcRegion: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#src_sk OmsMigrationSyncTask#src_sk}
  */
  readonly srcSk: string;
  /**
  * source_cdn block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#source_cdn OmsMigrationSyncTask#source_cdn}
  */
  readonly sourceCdn?: OmsMigrationSyncTaskSourceCdn;
}
export interface OmsMigrationSyncTaskSourceCdn {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#authentication_key OmsMigrationSyncTask#authentication_key}
  */
  readonly authenticationKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#authentication_type OmsMigrationSyncTask#authentication_type}
  */
  readonly authenticationType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#domain OmsMigrationSyncTask#domain}
  */
  readonly domain: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#protocol OmsMigrationSyncTask#protocol}
  */
  readonly protocol: string;
}

export function omsMigrationSyncTaskSourceCdnToTerraform(struct?: OmsMigrationSyncTaskSourceCdnOutputReference | OmsMigrationSyncTaskSourceCdn): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authentication_key: cdktf.stringToTerraform(struct!.authenticationKey),
    authentication_type: cdktf.stringToTerraform(struct!.authenticationType),
    domain: cdktf.stringToTerraform(struct!.domain),
    protocol: cdktf.stringToTerraform(struct!.protocol),
  }
}


export function omsMigrationSyncTaskSourceCdnToHclTerraform(struct?: OmsMigrationSyncTaskSourceCdnOutputReference | OmsMigrationSyncTaskSourceCdn): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authentication_key: {
      value: cdktf.stringToHclTerraform(struct!.authenticationKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    authentication_type: {
      value: cdktf.stringToHclTerraform(struct!.authenticationType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    domain: {
      value: cdktf.stringToHclTerraform(struct!.domain),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    protocol: {
      value: cdktf.stringToHclTerraform(struct!.protocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsMigrationSyncTaskSourceCdnOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsMigrationSyncTaskSourceCdn | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authenticationKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.authenticationKey = this._authenticationKey;
    }
    if (this._authenticationType !== undefined) {
      hasAnyValues = true;
      internalValueResult.authenticationType = this._authenticationType;
    }
    if (this._domain !== undefined) {
      hasAnyValues = true;
      internalValueResult.domain = this._domain;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsMigrationSyncTaskSourceCdn | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._authenticationKey = undefined;
      this._authenticationType = undefined;
      this._domain = undefined;
      this._protocol = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._authenticationKey = value.authenticationKey;
      this._authenticationType = value.authenticationType;
      this._domain = value.domain;
      this._protocol = value.protocol;
    }
  }

  // authentication_key - computed: false, optional: true, required: false
  private _authenticationKey?: string; 
  public get authenticationKey() {
    return this.getStringAttribute('authentication_key');
  }
  public set authenticationKey(value: string) {
    this._authenticationKey = value;
  }
  public resetAuthenticationKey() {
    this._authenticationKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticationKeyInput() {
    return this._authenticationKey;
  }

  // authentication_type - computed: false, optional: true, required: false
  private _authenticationType?: string; 
  public get authenticationType() {
    return this.getStringAttribute('authentication_type');
  }
  public set authenticationType(value: string) {
    this._authenticationType = value;
  }
  public resetAuthenticationType() {
    this._authenticationType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticationTypeInput() {
    return this._authenticationType;
  }

  // domain - computed: false, optional: false, required: true
  private _domain?: string; 
  public get domain() {
    return this.getStringAttribute('domain');
  }
  public set domain(value: string) {
    this._domain = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainInput() {
    return this._domain;
  }

  // protocol - computed: false, optional: false, required: true
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task huaweicloud_oms_migration_sync_task}
*/
export class OmsMigrationSyncTask extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_oms_migration_sync_task";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a OmsMigrationSyncTask resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the OmsMigrationSyncTask to import
  * @param importFromId The id of the existing OmsMigrationSyncTask that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the OmsMigrationSyncTask to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_oms_migration_sync_task", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_migration_sync_task huaweicloud_oms_migration_sync_task} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options OmsMigrationSyncTaskConfig
  */
  public constructor(scope: Construct, id: string, config: OmsMigrationSyncTaskConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_oms_migration_sync_task',
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
    this._action = config.action;
    this._appId = config.appId;
    this._consistencyCheck = config.consistencyCheck;
    this._description = config.description;
    this._dstAk = config.dstAk;
    this._dstBucket = config.dstBucket;
    this._dstSk = config.dstSk;
    this._enableKms = config.enableKms;
    this._enableMetadataMigration = config.enableMetadataMigration;
    this._enableRestore = config.enableRestore;
    this._id = config.id;
    this._region = config.region;
    this._srcAk = config.srcAk;
    this._srcBucket = config.srcBucket;
    this._srcCloudType = config.srcCloudType;
    this._srcRegion = config.srcRegion;
    this._srcSk = config.srcSk;
    this._sourceCdn.internalValue = config.sourceCdn;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action - computed: true, optional: true, required: false
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  public resetAction() {
    this._action = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
  }

  // app_id - computed: false, optional: true, required: false
  private _appId?: string; 
  public get appId() {
    return this.getStringAttribute('app_id');
  }
  public set appId(value: string) {
    this._appId = value;
  }
  public resetAppId() {
    this._appId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appIdInput() {
    return this._appId;
  }

  // consistency_check - computed: true, optional: true, required: false
  private _consistencyCheck?: string; 
  public get consistencyCheck() {
    return this.getStringAttribute('consistency_check');
  }
  public set consistencyCheck(value: string) {
    this._consistencyCheck = value;
  }
  public resetConsistencyCheck() {
    this._consistencyCheck = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consistencyCheckInput() {
    return this._consistencyCheck;
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

  // dst_ak - computed: false, optional: false, required: true
  private _dstAk?: string; 
  public get dstAk() {
    return this.getStringAttribute('dst_ak');
  }
  public set dstAk(value: string) {
    this._dstAk = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dstAkInput() {
    return this._dstAk;
  }

  // dst_bucket - computed: false, optional: false, required: true
  private _dstBucket?: string; 
  public get dstBucket() {
    return this.getStringAttribute('dst_bucket');
  }
  public set dstBucket(value: string) {
    this._dstBucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dstBucketInput() {
    return this._dstBucket;
  }

  // dst_sk - computed: false, optional: false, required: true
  private _dstSk?: string; 
  public get dstSk() {
    return this.getStringAttribute('dst_sk');
  }
  public set dstSk(value: string) {
    this._dstSk = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dstSkInput() {
    return this._dstSk;
  }

  // dst_storage_policy - computed: true, optional: false, required: false
  public get dstStoragePolicy() {
    return this.getStringAttribute('dst_storage_policy');
  }

  // enable_kms - computed: false, optional: true, required: false
  private _enableKms?: boolean | cdktf.IResolvable; 
  public get enableKms() {
    return this.getBooleanAttribute('enable_kms');
  }
  public set enableKms(value: boolean | cdktf.IResolvable) {
    this._enableKms = value;
  }
  public resetEnableKms() {
    this._enableKms = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableKmsInput() {
    return this._enableKms;
  }

  // enable_metadata_migration - computed: false, optional: true, required: false
  private _enableMetadataMigration?: boolean | cdktf.IResolvable; 
  public get enableMetadataMigration() {
    return this.getBooleanAttribute('enable_metadata_migration');
  }
  public set enableMetadataMigration(value: boolean | cdktf.IResolvable) {
    this._enableMetadataMigration = value;
  }
  public resetEnableMetadataMigration() {
    this._enableMetadataMigration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableMetadataMigrationInput() {
    return this._enableMetadataMigration;
  }

  // enable_restore - computed: false, optional: true, required: false
  private _enableRestore?: boolean | cdktf.IResolvable; 
  public get enableRestore() {
    return this.getBooleanAttribute('enable_restore');
  }
  public set enableRestore(value: boolean | cdktf.IResolvable) {
    this._enableRestore = value;
  }
  public resetEnableRestore() {
    this._enableRestore = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableRestoreInput() {
    return this._enableRestore;
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

  // last_start_at - computed: true, optional: false, required: false
  public get lastStartAt() {
    return this.getStringAttribute('last_start_at');
  }

  // monthly_acceptance_request - computed: true, optional: false, required: false
  public get monthlyAcceptanceRequest() {
    return this.getNumberAttribute('monthly_acceptance_request');
  }

  // monthly_failure_object - computed: true, optional: false, required: false
  public get monthlyFailureObject() {
    return this.getNumberAttribute('monthly_failure_object');
  }

  // monthly_size - computed: true, optional: false, required: false
  public get monthlySize() {
    return this.getNumberAttribute('monthly_size');
  }

  // monthly_skip_object - computed: true, optional: false, required: false
  public get monthlySkipObject() {
    return this.getNumberAttribute('monthly_skip_object');
  }

  // monthly_success_object - computed: true, optional: false, required: false
  public get monthlySuccessObject() {
    return this.getNumberAttribute('monthly_success_object');
  }

  // object_overwrite_mode - computed: true, optional: false, required: false
  public get objectOverwriteMode() {
    return this.getStringAttribute('object_overwrite_mode');
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

  // src_ak - computed: false, optional: false, required: true
  private _srcAk?: string; 
  public get srcAk() {
    return this.getStringAttribute('src_ak');
  }
  public set srcAk(value: string) {
    this._srcAk = value;
  }
  // Temporarily expose input value. Use with caution.
  public get srcAkInput() {
    return this._srcAk;
  }

  // src_bucket - computed: false, optional: false, required: true
  private _srcBucket?: string; 
  public get srcBucket() {
    return this.getStringAttribute('src_bucket');
  }
  public set srcBucket(value: string) {
    this._srcBucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get srcBucketInput() {
    return this._srcBucket;
  }

  // src_cloud_type - computed: false, optional: true, required: false
  private _srcCloudType?: string; 
  public get srcCloudType() {
    return this.getStringAttribute('src_cloud_type');
  }
  public set srcCloudType(value: string) {
    this._srcCloudType = value;
  }
  public resetSrcCloudType() {
    this._srcCloudType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcCloudTypeInput() {
    return this._srcCloudType;
  }

  // src_region - computed: false, optional: false, required: true
  private _srcRegion?: string; 
  public get srcRegion() {
    return this.getStringAttribute('src_region');
  }
  public set srcRegion(value: string) {
    this._srcRegion = value;
  }
  // Temporarily expose input value. Use with caution.
  public get srcRegionInput() {
    return this._srcRegion;
  }

  // src_sk - computed: false, optional: false, required: true
  private _srcSk?: string; 
  public get srcSk() {
    return this.getStringAttribute('src_sk');
  }
  public set srcSk(value: string) {
    this._srcSk = value;
  }
  // Temporarily expose input value. Use with caution.
  public get srcSkInput() {
    return this._srcSk;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // source_cdn - computed: false, optional: true, required: false
  private _sourceCdn = new OmsMigrationSyncTaskSourceCdnOutputReference(this, "source_cdn");
  public get sourceCdn() {
    return this._sourceCdn;
  }
  public putSourceCdn(value: OmsMigrationSyncTaskSourceCdn) {
    this._sourceCdn.internalValue = value;
  }
  public resetSourceCdn() {
    this._sourceCdn.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceCdnInput() {
    return this._sourceCdn.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      action: cdktf.stringToTerraform(this._action),
      app_id: cdktf.stringToTerraform(this._appId),
      consistency_check: cdktf.stringToTerraform(this._consistencyCheck),
      description: cdktf.stringToTerraform(this._description),
      dst_ak: cdktf.stringToTerraform(this._dstAk),
      dst_bucket: cdktf.stringToTerraform(this._dstBucket),
      dst_sk: cdktf.stringToTerraform(this._dstSk),
      enable_kms: cdktf.booleanToTerraform(this._enableKms),
      enable_metadata_migration: cdktf.booleanToTerraform(this._enableMetadataMigration),
      enable_restore: cdktf.booleanToTerraform(this._enableRestore),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      src_ak: cdktf.stringToTerraform(this._srcAk),
      src_bucket: cdktf.stringToTerraform(this._srcBucket),
      src_cloud_type: cdktf.stringToTerraform(this._srcCloudType),
      src_region: cdktf.stringToTerraform(this._srcRegion),
      src_sk: cdktf.stringToTerraform(this._srcSk),
      source_cdn: omsMigrationSyncTaskSourceCdnToTerraform(this._sourceCdn.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      action: {
        value: cdktf.stringToHclTerraform(this._action),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      app_id: {
        value: cdktf.stringToHclTerraform(this._appId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      consistency_check: {
        value: cdktf.stringToHclTerraform(this._consistencyCheck),
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
      dst_ak: {
        value: cdktf.stringToHclTerraform(this._dstAk),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dst_bucket: {
        value: cdktf.stringToHclTerraform(this._dstBucket),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dst_sk: {
        value: cdktf.stringToHclTerraform(this._dstSk),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_kms: {
        value: cdktf.booleanToHclTerraform(this._enableKms),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_metadata_migration: {
        value: cdktf.booleanToHclTerraform(this._enableMetadataMigration),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_restore: {
        value: cdktf.booleanToHclTerraform(this._enableRestore),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      src_ak: {
        value: cdktf.stringToHclTerraform(this._srcAk),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      src_bucket: {
        value: cdktf.stringToHclTerraform(this._srcBucket),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      src_cloud_type: {
        value: cdktf.stringToHclTerraform(this._srcCloudType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      src_region: {
        value: cdktf.stringToHclTerraform(this._srcRegion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      src_sk: {
        value: cdktf.stringToHclTerraform(this._srcSk),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_cdn: {
        value: omsMigrationSyncTaskSourceCdnToHclTerraform(this._sourceCdn.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsMigrationSyncTaskSourceCdnList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

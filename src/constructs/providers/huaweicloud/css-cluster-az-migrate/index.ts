// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CssClusterAzMigrateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#agency CssClusterAzMigrate#agency}
  */
  readonly agency: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#cluster_id CssClusterAzMigrate#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#enable_force_new CssClusterAzMigrate#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#id CssClusterAzMigrate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#indices_backup_check CssClusterAzMigrate#indices_backup_check}
  */
  readonly indicesBackupCheck?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#instance_type CssClusterAzMigrate#instance_type}
  */
  readonly instanceType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#migrate_type CssClusterAzMigrate#migrate_type}
  */
  readonly migrateType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#region CssClusterAzMigrate#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#source_az CssClusterAzMigrate#source_az}
  */
  readonly sourceAz: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#target_az CssClusterAzMigrate#target_az}
  */
  readonly targetAz: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#timeouts CssClusterAzMigrate#timeouts}
  */
  readonly timeouts?: CssClusterAzMigrateTimeouts;
}
export interface CssClusterAzMigrateTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#create CssClusterAzMigrate#create}
  */
  readonly create?: string;
}

export function cssClusterAzMigrateTimeoutsToTerraform(struct?: CssClusterAzMigrateTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function cssClusterAzMigrateTimeoutsToHclTerraform(struct?: CssClusterAzMigrateTimeouts | cdktf.IResolvable): any {
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

export class CssClusterAzMigrateTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CssClusterAzMigrateTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CssClusterAzMigrateTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate huaweicloud_css_cluster_az_migrate}
*/
export class CssClusterAzMigrate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_css_cluster_az_migrate";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CssClusterAzMigrate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CssClusterAzMigrate to import
  * @param importFromId The id of the existing CssClusterAzMigrate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CssClusterAzMigrate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_css_cluster_az_migrate", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_cluster_az_migrate huaweicloud_css_cluster_az_migrate} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CssClusterAzMigrateConfig
  */
  public constructor(scope: Construct, id: string, config: CssClusterAzMigrateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_css_cluster_az_migrate',
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
    this._agency = config.agency;
    this._clusterId = config.clusterId;
    this._enableForceNew = config.enableForceNew;
    this._id = config.id;
    this._indicesBackupCheck = config.indicesBackupCheck;
    this._instanceType = config.instanceType;
    this._migrateType = config.migrateType;
    this._region = config.region;
    this._sourceAz = config.sourceAz;
    this._targetAz = config.targetAz;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // agency - computed: false, optional: false, required: true
  private _agency?: string; 
  public get agency() {
    return this.getStringAttribute('agency');
  }
  public set agency(value: string) {
    this._agency = value;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyInput() {
    return this._agency;
  }

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

  // enable_force_new - computed: false, optional: true, required: false
  private _enableForceNew?: string; 
  public get enableForceNew() {
    return this.getStringAttribute('enable_force_new');
  }
  public set enableForceNew(value: string) {
    this._enableForceNew = value;
  }
  public resetEnableForceNew() {
    this._enableForceNew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableForceNewInput() {
    return this._enableForceNew;
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

  // indices_backup_check - computed: false, optional: true, required: false
  private _indicesBackupCheck?: boolean | cdktf.IResolvable; 
  public get indicesBackupCheck() {
    return this.getBooleanAttribute('indices_backup_check');
  }
  public set indicesBackupCheck(value: boolean | cdktf.IResolvable) {
    this._indicesBackupCheck = value;
  }
  public resetIndicesBackupCheck() {
    this._indicesBackupCheck = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get indicesBackupCheckInput() {
    return this._indicesBackupCheck;
  }

  // instance_type - computed: false, optional: false, required: true
  private _instanceType?: string; 
  public get instanceType() {
    return this.getStringAttribute('instance_type');
  }
  public set instanceType(value: string) {
    this._instanceType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceTypeInput() {
    return this._instanceType;
  }

  // migrate_type - computed: false, optional: false, required: true
  private _migrateType?: string; 
  public get migrateType() {
    return this.getStringAttribute('migrate_type');
  }
  public set migrateType(value: string) {
    this._migrateType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get migrateTypeInput() {
    return this._migrateType;
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

  // source_az - computed: false, optional: false, required: true
  private _sourceAz?: string; 
  public get sourceAz() {
    return this.getStringAttribute('source_az');
  }
  public set sourceAz(value: string) {
    this._sourceAz = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceAzInput() {
    return this._sourceAz;
  }

  // target_az - computed: false, optional: false, required: true
  private _targetAz?: string; 
  public get targetAz() {
    return this.getStringAttribute('target_az');
  }
  public set targetAz(value: string) {
    this._targetAz = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetAzInput() {
    return this._targetAz;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CssClusterAzMigrateTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CssClusterAzMigrateTimeouts) {
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
      agency: cdktf.stringToTerraform(this._agency),
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      enable_force_new: cdktf.stringToTerraform(this._enableForceNew),
      id: cdktf.stringToTerraform(this._id),
      indices_backup_check: cdktf.booleanToTerraform(this._indicesBackupCheck),
      instance_type: cdktf.stringToTerraform(this._instanceType),
      migrate_type: cdktf.stringToTerraform(this._migrateType),
      region: cdktf.stringToTerraform(this._region),
      source_az: cdktf.stringToTerraform(this._sourceAz),
      target_az: cdktf.stringToTerraform(this._targetAz),
      timeouts: cssClusterAzMigrateTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      agency: {
        value: cdktf.stringToHclTerraform(this._agency),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_force_new: {
        value: cdktf.stringToHclTerraform(this._enableForceNew),
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
      indices_backup_check: {
        value: cdktf.booleanToHclTerraform(this._indicesBackupCheck),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      instance_type: {
        value: cdktf.stringToHclTerraform(this._instanceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      migrate_type: {
        value: cdktf.stringToHclTerraform(this._migrateType),
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
      source_az: {
        value: cdktf.stringToHclTerraform(this._sourceAz),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      target_az: {
        value: cdktf.stringToHclTerraform(this._targetAz),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: cssClusterAzMigrateTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CssClusterAzMigrateTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

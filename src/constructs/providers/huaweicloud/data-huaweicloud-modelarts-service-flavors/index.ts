// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudModelartsServiceFlavorsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors#id DataHuaweicloudModelartsServiceFlavors#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Inference mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors#infer_type DataHuaweicloudModelartsServiceFlavors#infer_type}
  */
  readonly inferType?: string;
  /**
  * Whether the flavor is free of charge.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors#is_free DataHuaweicloudModelartsServiceFlavors#is_free}
  */
  readonly isFree?: boolean | cdktf.IResolvable;
  /**
  * Whether this flavor is open or not.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors#is_open DataHuaweicloudModelartsServiceFlavors#is_open}
  */
  readonly isOpen?: boolean | cdktf.IResolvable;
  /**
  * Whether this flavors is supported by dedicated resource pool.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors#is_personal_cluster DataHuaweicloudModelartsServiceFlavors#is_personal_cluster}
  */
  readonly isPersonalCluster?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors#region DataHuaweicloudModelartsServiceFlavors#region}
  */
  readonly region?: string;
  /**
  * Flavor status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors#status DataHuaweicloudModelartsServiceFlavors#status}
  */
  readonly status?: string;
}
export interface DataHuaweicloudModelartsServiceFlavorsFlavors {
}

export function dataHuaweicloudModelartsServiceFlavorsFlavorsToTerraform(struct?: DataHuaweicloudModelartsServiceFlavorsFlavors): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudModelartsServiceFlavorsFlavorsToHclTerraform(struct?: DataHuaweicloudModelartsServiceFlavorsFlavors): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudModelartsServiceFlavorsFlavorsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudModelartsServiceFlavorsFlavors | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudModelartsServiceFlavorsFlavors | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // billing_spec - computed: true, optional: false, required: false
  public get billingSpec() {
    return this.getStringAttribute('billing_spec');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // extend_params - computed: true, optional: false, required: false
  public get extendParams() {
    return this.getNumberAttribute('extend_params');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_free - computed: true, optional: false, required: false
  public get isFree() {
    return this.getBooleanAttribute('is_free');
  }

  // is_open - computed: true, optional: false, required: false
  public get isOpen() {
    return this.getBooleanAttribute('is_open');
  }

  // over_quota - computed: true, optional: false, required: false
  public get overQuota() {
    return this.getBooleanAttribute('over_quota');
  }

  // source_type - computed: true, optional: false, required: false
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }
}

export class DataHuaweicloudModelartsServiceFlavorsFlavorsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudModelartsServiceFlavorsFlavorsOutputReference {
    return new DataHuaweicloudModelartsServiceFlavorsFlavorsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors huaweicloud_modelarts_service_flavors}
*/
export class DataHuaweicloudModelartsServiceFlavors extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_modelarts_service_flavors";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudModelartsServiceFlavors resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudModelartsServiceFlavors to import
  * @param importFromId The id of the existing DataHuaweicloudModelartsServiceFlavors that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudModelartsServiceFlavors to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_modelarts_service_flavors", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/modelarts_service_flavors huaweicloud_modelarts_service_flavors} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudModelartsServiceFlavorsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudModelartsServiceFlavorsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_modelarts_service_flavors',
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
    this._id = config.id;
    this._inferType = config.inferType;
    this._isFree = config.isFree;
    this._isOpen = config.isOpen;
    this._isPersonalCluster = config.isPersonalCluster;
    this._region = config.region;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // flavors - computed: true, optional: false, required: false
  private _flavors = new DataHuaweicloudModelartsServiceFlavorsFlavorsList(this, "flavors", false);
  public get flavors() {
    return this._flavors;
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

  // infer_type - computed: false, optional: true, required: false
  private _inferType?: string; 
  public get inferType() {
    return this.getStringAttribute('infer_type');
  }
  public set inferType(value: string) {
    this._inferType = value;
  }
  public resetInferType() {
    this._inferType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inferTypeInput() {
    return this._inferType;
  }

  // is_free - computed: false, optional: true, required: false
  private _isFree?: boolean | cdktf.IResolvable; 
  public get isFree() {
    return this.getBooleanAttribute('is_free');
  }
  public set isFree(value: boolean | cdktf.IResolvable) {
    this._isFree = value;
  }
  public resetIsFree() {
    this._isFree = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isFreeInput() {
    return this._isFree;
  }

  // is_open - computed: false, optional: true, required: false
  private _isOpen?: boolean | cdktf.IResolvable; 
  public get isOpen() {
    return this.getBooleanAttribute('is_open');
  }
  public set isOpen(value: boolean | cdktf.IResolvable) {
    this._isOpen = value;
  }
  public resetIsOpen() {
    this._isOpen = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isOpenInput() {
    return this._isOpen;
  }

  // is_personal_cluster - computed: false, optional: true, required: false
  private _isPersonalCluster?: boolean | cdktf.IResolvable; 
  public get isPersonalCluster() {
    return this.getBooleanAttribute('is_personal_cluster');
  }
  public set isPersonalCluster(value: boolean | cdktf.IResolvable) {
    this._isPersonalCluster = value;
  }
  public resetIsPersonalCluster() {
    this._isPersonalCluster = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isPersonalClusterInput() {
    return this._isPersonalCluster;
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

  // status - computed: false, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      infer_type: cdktf.stringToTerraform(this._inferType),
      is_free: cdktf.booleanToTerraform(this._isFree),
      is_open: cdktf.booleanToTerraform(this._isOpen),
      is_personal_cluster: cdktf.booleanToTerraform(this._isPersonalCluster),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      infer_type: {
        value: cdktf.stringToHclTerraform(this._inferType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_free: {
        value: cdktf.booleanToHclTerraform(this._isFree),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      is_open: {
        value: cdktf.booleanToHclTerraform(this._isOpen),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      is_personal_cluster: {
        value: cdktf.booleanToHclTerraform(this._isPersonalCluster),
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
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

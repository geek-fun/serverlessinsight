// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataartsArchitectureBatchUnpublishConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the user ID of the architecture reviewer.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#approver_user_id DataartsArchitectureBatchUnpublish#approver_user_id}
  */
  readonly approverUserId: string;
  /**
  * Specifies the user name of the architecture reviewer.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#approver_user_name DataartsArchitectureBatchUnpublish#approver_user_name}
  */
  readonly approverUserName: string;
  /**
  * Specifies whether to automatically review.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#fast_approval DataartsArchitectureBatchUnpublish#fast_approval}
  */
  readonly fastApproval?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#id DataartsArchitectureBatchUnpublish#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#region DataartsArchitectureBatchUnpublish#region}
  */
  readonly region?: string;
  /**
  * The ID of DataArts Studio workspace.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#workspace_id DataartsArchitectureBatchUnpublish#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * biz_infos block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#biz_infos DataartsArchitectureBatchUnpublish#biz_infos}
  */
  readonly bizInfos: DataartsArchitectureBatchUnpublishBizInfos[] | cdktf.IResolvable;
}
export interface DataartsArchitectureBatchUnpublishBizInfos {
  /**
  * Specifies the ID of the object to be published.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#biz_id DataartsArchitectureBatchUnpublish#biz_id}
  */
  readonly bizId: string;
  /**
  * Specifies the type of the object to be published.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#biz_type DataartsArchitectureBatchUnpublish#biz_type}
  */
  readonly bizType: string;
}

export function dataartsArchitectureBatchUnpublishBizInfosToTerraform(struct?: DataartsArchitectureBatchUnpublishBizInfos | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    biz_id: cdktf.stringToTerraform(struct!.bizId),
    biz_type: cdktf.stringToTerraform(struct!.bizType),
  }
}


export function dataartsArchitectureBatchUnpublishBizInfosToHclTerraform(struct?: DataartsArchitectureBatchUnpublishBizInfos | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    biz_id: {
      value: cdktf.stringToHclTerraform(struct!.bizId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    biz_type: {
      value: cdktf.stringToHclTerraform(struct!.bizType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureBatchUnpublishBizInfosOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureBatchUnpublishBizInfos | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bizId !== undefined) {
      hasAnyValues = true;
      internalValueResult.bizId = this._bizId;
    }
    if (this._bizType !== undefined) {
      hasAnyValues = true;
      internalValueResult.bizType = this._bizType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureBatchUnpublishBizInfos | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._bizId = undefined;
      this._bizType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._bizId = value.bizId;
      this._bizType = value.bizType;
    }
  }

  // biz_id - computed: false, optional: false, required: true
  private _bizId?: string; 
  public get bizId() {
    return this.getStringAttribute('biz_id');
  }
  public set bizId(value: string) {
    this._bizId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bizIdInput() {
    return this._bizId;
  }

  // biz_type - computed: false, optional: false, required: true
  private _bizType?: string; 
  public get bizType() {
    return this.getStringAttribute('biz_type');
  }
  public set bizType(value: string) {
    this._bizType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bizTypeInput() {
    return this._bizType;
  }
}

export class DataartsArchitectureBatchUnpublishBizInfosList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureBatchUnpublishBizInfos[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureBatchUnpublishBizInfosOutputReference {
    return new DataartsArchitectureBatchUnpublishBizInfosOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish huaweicloud_dataarts_architecture_batch_unpublish}
*/
export class DataartsArchitectureBatchUnpublish extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_architecture_batch_unpublish";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataartsArchitectureBatchUnpublish resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataartsArchitectureBatchUnpublish to import
  * @param importFromId The id of the existing DataartsArchitectureBatchUnpublish that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataartsArchitectureBatchUnpublish to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_architecture_batch_unpublish", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_batch_unpublish huaweicloud_dataarts_architecture_batch_unpublish} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataartsArchitectureBatchUnpublishConfig
  */
  public constructor(scope: Construct, id: string, config: DataartsArchitectureBatchUnpublishConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_architecture_batch_unpublish',
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
    this._approverUserId = config.approverUserId;
    this._approverUserName = config.approverUserName;
    this._fastApproval = config.fastApproval;
    this._id = config.id;
    this._region = config.region;
    this._workspaceId = config.workspaceId;
    this._bizInfos.internalValue = config.bizInfos;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // approver_user_id - computed: false, optional: false, required: true
  private _approverUserId?: string; 
  public get approverUserId() {
    return this.getStringAttribute('approver_user_id');
  }
  public set approverUserId(value: string) {
    this._approverUserId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get approverUserIdInput() {
    return this._approverUserId;
  }

  // approver_user_name - computed: false, optional: false, required: true
  private _approverUserName?: string; 
  public get approverUserName() {
    return this.getStringAttribute('approver_user_name');
  }
  public set approverUserName(value: string) {
    this._approverUserName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get approverUserNameInput() {
    return this._approverUserName;
  }

  // fast_approval - computed: false, optional: true, required: false
  private _fastApproval?: boolean | cdktf.IResolvable; 
  public get fastApproval() {
    return this.getBooleanAttribute('fast_approval');
  }
  public set fastApproval(value: boolean | cdktf.IResolvable) {
    this._fastApproval = value;
  }
  public resetFastApproval() {
    this._fastApproval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fastApprovalInput() {
    return this._fastApproval;
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

  // workspace_id - computed: false, optional: false, required: true
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // biz_infos - computed: false, optional: false, required: true
  private _bizInfos = new DataartsArchitectureBatchUnpublishBizInfosList(this, "biz_infos", false);
  public get bizInfos() {
    return this._bizInfos;
  }
  public putBizInfos(value: DataartsArchitectureBatchUnpublishBizInfos[] | cdktf.IResolvable) {
    this._bizInfos.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bizInfosInput() {
    return this._bizInfos.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      approver_user_id: cdktf.stringToTerraform(this._approverUserId),
      approver_user_name: cdktf.stringToTerraform(this._approverUserName),
      fast_approval: cdktf.booleanToTerraform(this._fastApproval),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      biz_infos: cdktf.listMapper(dataartsArchitectureBatchUnpublishBizInfosToTerraform, true)(this._bizInfos.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      approver_user_id: {
        value: cdktf.stringToHclTerraform(this._approverUserId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      approver_user_name: {
        value: cdktf.stringToHclTerraform(this._approverUserName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      fast_approval: {
        value: cdktf.booleanToHclTerraform(this._fastApproval),
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
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      biz_infos: {
        value: cdktf.listMapperHcl(dataartsArchitectureBatchUnpublishBizInfosToHclTerraform, true)(this._bizInfos.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsArchitectureBatchUnpublishBizInfosList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

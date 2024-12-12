// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCcCentralNetworkAttachmentsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the attachment ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments#attachment_id DataHuaweicloudCcCentralNetworkAttachments#attachment_id}
  */
  readonly attachmentId?: string;
  /**
  * Specifies the instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments#attachment_instance_id DataHuaweicloudCcCentralNetworkAttachments#attachment_instance_id}
  */
  readonly attachmentInstanceId?: string;
  /**
  * Specifies the type of attachment instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments#attachment_instance_type DataHuaweicloudCcCentralNetworkAttachments#attachment_instance_type}
  */
  readonly attachmentInstanceType?: string;
  /**
  * Specifies the central network ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments#central_network_id DataHuaweicloudCcCentralNetworkAttachments#central_network_id}
  */
  readonly centralNetworkId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments#id DataHuaweicloudCcCentralNetworkAttachments#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the attachment name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments#name DataHuaweicloudCcCentralNetworkAttachments#name}
  */
  readonly name?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments#region DataHuaweicloudCcCentralNetworkAttachments#region}
  */
  readonly region?: string;
  /**
  * Specifies the attachment status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments#state DataHuaweicloudCcCentralNetworkAttachments#state}
  */
  readonly state?: string;
}
export interface DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValue {
}

export function dataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValueToTerraform(struct?: DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValue): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValueToHclTerraform(struct?: DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValue): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValueOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValue | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValue | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // approved_state - computed: true, optional: false, required: false
  public get approvedState() {
    return this.getStringAttribute('approved_state');
  }

  // attached_er_id - computed: true, optional: false, required: false
  public get attachedErId() {
    return this.getStringAttribute('attached_er_id');
  }

  // enterprise_router_table_id - computed: true, optional: false, required: false
  public get enterpriseRouterTableId() {
    return this.getStringAttribute('enterprise_router_table_id');
  }

  // hosted_cloud - computed: true, optional: false, required: false
  public get hostedCloud() {
    return this.getStringAttribute('hosted_cloud');
  }

  // reason - computed: true, optional: false, required: false
  public get reason() {
    return this.getStringAttribute('reason');
  }
}

export class DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValueList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValueOutputReference {
    return new DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValueOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachments {
}

export function dataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsToTerraform(struct?: DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachments): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsToHclTerraform(struct?: DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachments): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachments | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachments | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // attachment_id - computed: true, optional: false, required: false
  public get attachmentId() {
    return this.getStringAttribute('attachment_id');
  }

  // attachment_instance_id - computed: true, optional: false, required: false
  public get attachmentInstanceId() {
    return this.getStringAttribute('attachment_instance_id');
  }

  // attachment_instance_project_id - computed: true, optional: false, required: false
  public get attachmentInstanceProjectId() {
    return this.getStringAttribute('attachment_instance_project_id');
  }

  // attachment_instance_region_id - computed: true, optional: false, required: false
  public get attachmentInstanceRegionId() {
    return this.getStringAttribute('attachment_instance_region_id');
  }

  // attachment_instance_site_code - computed: true, optional: false, required: false
  public get attachmentInstanceSiteCode() {
    return this.getStringAttribute('attachment_instance_site_code');
  }

  // attachment_instance_type - computed: true, optional: false, required: false
  public get attachmentInstanceType() {
    return this.getStringAttribute('attachment_instance_type');
  }

  // bandwidth_size - computed: true, optional: false, required: false
  public get bandwidthSize() {
    return this.getNumberAttribute('bandwidth_size');
  }

  // bandwidth_type - computed: true, optional: false, required: false
  public get bandwidthType() {
    return this.getStringAttribute('bandwidth_type');
  }

  // central_network_id - computed: true, optional: false, required: false
  public get centralNetworkId() {
    return this.getStringAttribute('central_network_id');
  }

  // central_network_plane_id - computed: true, optional: false, required: false
  public get centralNetworkPlaneId() {
    return this.getStringAttribute('central_network_plane_id');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // domain_id - computed: true, optional: false, required: false
  public get domainId() {
    return this.getStringAttribute('domain_id');
  }

  // enterprise_router_attachment_id - computed: true, optional: false, required: false
  public get enterpriseRouterAttachmentId() {
    return this.getStringAttribute('enterprise_router_attachment_id');
  }

  // enterprise_router_id - computed: true, optional: false, required: false
  public get enterpriseRouterId() {
    return this.getStringAttribute('enterprise_router_id');
  }

  // enterprise_router_project_id - computed: true, optional: false, required: false
  public get enterpriseRouterProjectId() {
    return this.getStringAttribute('enterprise_router_project_id');
  }

  // enterprise_router_region_id - computed: true, optional: false, required: false
  public get enterpriseRouterRegionId() {
    return this.getStringAttribute('enterprise_router_region_id');
  }

  // enterprise_router_site_code - computed: true, optional: false, required: false
  public get enterpriseRouterSiteCode() {
    return this.getStringAttribute('enterprise_router_site_code');
  }

  // global_connection_bandwidth_id - computed: true, optional: false, required: false
  public get globalConnectionBandwidthId() {
    return this.getStringAttribute('global_connection_bandwidth_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_frozen - computed: true, optional: false, required: false
  public get isFrozen() {
    return this.getBooleanAttribute('is_frozen');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // specification_value - computed: true, optional: false, required: false
  private _specificationValue = new DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsSpecificationValueList(this, "specification_value", false);
  public get specificationValue() {
    return this._specificationValue;
  }

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsOutputReference {
    return new DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments huaweicloud_cc_central_network_attachments}
*/
export class DataHuaweicloudCcCentralNetworkAttachments extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_central_network_attachments";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCcCentralNetworkAttachments resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCcCentralNetworkAttachments to import
  * @param importFromId The id of the existing DataHuaweicloudCcCentralNetworkAttachments that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCcCentralNetworkAttachments to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_central_network_attachments", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_central_network_attachments huaweicloud_cc_central_network_attachments} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCcCentralNetworkAttachmentsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCcCentralNetworkAttachmentsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_central_network_attachments',
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
    this._attachmentId = config.attachmentId;
    this._attachmentInstanceId = config.attachmentInstanceId;
    this._attachmentInstanceType = config.attachmentInstanceType;
    this._centralNetworkId = config.centralNetworkId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._state = config.state;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // attachment_id - computed: false, optional: true, required: false
  private _attachmentId?: string; 
  public get attachmentId() {
    return this.getStringAttribute('attachment_id');
  }
  public set attachmentId(value: string) {
    this._attachmentId = value;
  }
  public resetAttachmentId() {
    this._attachmentId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get attachmentIdInput() {
    return this._attachmentId;
  }

  // attachment_instance_id - computed: false, optional: true, required: false
  private _attachmentInstanceId?: string; 
  public get attachmentInstanceId() {
    return this.getStringAttribute('attachment_instance_id');
  }
  public set attachmentInstanceId(value: string) {
    this._attachmentInstanceId = value;
  }
  public resetAttachmentInstanceId() {
    this._attachmentInstanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get attachmentInstanceIdInput() {
    return this._attachmentInstanceId;
  }

  // attachment_instance_type - computed: false, optional: true, required: false
  private _attachmentInstanceType?: string; 
  public get attachmentInstanceType() {
    return this.getStringAttribute('attachment_instance_type');
  }
  public set attachmentInstanceType(value: string) {
    this._attachmentInstanceType = value;
  }
  public resetAttachmentInstanceType() {
    this._attachmentInstanceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get attachmentInstanceTypeInput() {
    return this._attachmentInstanceType;
  }

  // central_network_attachments - computed: true, optional: false, required: false
  private _centralNetworkAttachments = new DataHuaweicloudCcCentralNetworkAttachmentsCentralNetworkAttachmentsList(this, "central_network_attachments", false);
  public get centralNetworkAttachments() {
    return this._centralNetworkAttachments;
  }

  // central_network_id - computed: false, optional: false, required: true
  private _centralNetworkId?: string; 
  public get centralNetworkId() {
    return this.getStringAttribute('central_network_id');
  }
  public set centralNetworkId(value: string) {
    this._centralNetworkId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get centralNetworkIdInput() {
    return this._centralNetworkId;
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

  // name - computed: false, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
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

  // state - computed: false, optional: true, required: false
  private _state?: string; 
  public get state() {
    return this.getStringAttribute('state');
  }
  public set state(value: string) {
    this._state = value;
  }
  public resetState() {
    this._state = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get stateInput() {
    return this._state;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      attachment_id: cdktf.stringToTerraform(this._attachmentId),
      attachment_instance_id: cdktf.stringToTerraform(this._attachmentInstanceId),
      attachment_instance_type: cdktf.stringToTerraform(this._attachmentInstanceType),
      central_network_id: cdktf.stringToTerraform(this._centralNetworkId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      state: cdktf.stringToTerraform(this._state),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      attachment_id: {
        value: cdktf.stringToHclTerraform(this._attachmentId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      attachment_instance_id: {
        value: cdktf.stringToHclTerraform(this._attachmentInstanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      attachment_instance_type: {
        value: cdktf.stringToHclTerraform(this._attachmentInstanceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      central_network_id: {
        value: cdktf.stringToHclTerraform(this._centralNetworkId),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      state: {
        value: cdktf.stringToHclTerraform(this._state),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

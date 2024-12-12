// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RmsResourceRecorderConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the IAM agency name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#agency_name RmsResourceRecorder#agency_name}
  */
  readonly agencyName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#id RmsResourceRecorder#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * obs_channel block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#obs_channel RmsResourceRecorder#obs_channel}
  */
  readonly obsChannel?: RmsResourceRecorderObsChannel;
  /**
  * selector block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#selector RmsResourceRecorder#selector}
  */
  readonly selector: RmsResourceRecorderSelector;
  /**
  * smn_channel block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#smn_channel RmsResourceRecorder#smn_channel}
  */
  readonly smnChannel?: RmsResourceRecorderSmnChannel;
}
export interface RmsResourceRecorderObsChannel {
  /**
  * Specifies the OBS bucket name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#bucket RmsResourceRecorder#bucket}
  */
  readonly bucket: string;
  /**
  * Specifies the region where this bucket is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#region RmsResourceRecorder#region}
  */
  readonly region: string;
}

export function rmsResourceRecorderObsChannelToTerraform(struct?: RmsResourceRecorderObsChannelOutputReference | RmsResourceRecorderObsChannel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bucket: cdktf.stringToTerraform(struct!.bucket),
    region: cdktf.stringToTerraform(struct!.region),
  }
}


export function rmsResourceRecorderObsChannelToHclTerraform(struct?: RmsResourceRecorderObsChannelOutputReference | RmsResourceRecorderObsChannel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bucket: {
      value: cdktf.stringToHclTerraform(struct!.bucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RmsResourceRecorderObsChannelOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): RmsResourceRecorderObsChannel | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucket = this._bucket;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RmsResourceRecorderObsChannel | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bucket = undefined;
      this._region = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bucket = value.bucket;
      this._region = value.region;
    }
  }

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

  // region - computed: false, optional: false, required: true
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }
}
export interface RmsResourceRecorderSelector {
  /**
  * Specifies whether to select all supported resources.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#all_supported RmsResourceRecorder#all_supported}
  */
  readonly allSupported: boolean | cdktf.IResolvable;
  /**
  * Specifies the resource type list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#resource_types RmsResourceRecorder#resource_types}
  */
  readonly resourceTypes?: string[];
}

export function rmsResourceRecorderSelectorToTerraform(struct?: RmsResourceRecorderSelectorOutputReference | RmsResourceRecorderSelector): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    all_supported: cdktf.booleanToTerraform(struct!.allSupported),
    resource_types: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.resourceTypes),
  }
}


export function rmsResourceRecorderSelectorToHclTerraform(struct?: RmsResourceRecorderSelectorOutputReference | RmsResourceRecorderSelector): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    all_supported: {
      value: cdktf.booleanToHclTerraform(struct!.allSupported),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    resource_types: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.resourceTypes),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RmsResourceRecorderSelectorOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): RmsResourceRecorderSelector | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._allSupported !== undefined) {
      hasAnyValues = true;
      internalValueResult.allSupported = this._allSupported;
    }
    if (this._resourceTypes !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceTypes = this._resourceTypes;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RmsResourceRecorderSelector | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._allSupported = undefined;
      this._resourceTypes = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._allSupported = value.allSupported;
      this._resourceTypes = value.resourceTypes;
    }
  }

  // all_supported - computed: false, optional: false, required: true
  private _allSupported?: boolean | cdktf.IResolvable; 
  public get allSupported() {
    return this.getBooleanAttribute('all_supported');
  }
  public set allSupported(value: boolean | cdktf.IResolvable) {
    this._allSupported = value;
  }
  // Temporarily expose input value. Use with caution.
  public get allSupportedInput() {
    return this._allSupported;
  }

  // resource_types - computed: false, optional: true, required: false
  private _resourceTypes?: string[]; 
  public get resourceTypes() {
    return cdktf.Fn.tolist(this.getListAttribute('resource_types'));
  }
  public set resourceTypes(value: string[]) {
    this._resourceTypes = value;
  }
  public resetResourceTypes() {
    this._resourceTypes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceTypesInput() {
    return this._resourceTypes;
  }
}
export interface RmsResourceRecorderSmnChannel {
  /**
  * Specifies the project ID where this SMN topic is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#project_id RmsResourceRecorder#project_id}
  */
  readonly projectId?: string;
  /**
  * Specifies the region where this SMN topic is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#region RmsResourceRecorder#region}
  */
  readonly region?: string;
  /**
  * Specifies the SMN topic URN.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#topic_urn RmsResourceRecorder#topic_urn}
  */
  readonly topicUrn: string;
}

export function rmsResourceRecorderSmnChannelToTerraform(struct?: RmsResourceRecorderSmnChannelOutputReference | RmsResourceRecorderSmnChannel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    project_id: cdktf.stringToTerraform(struct!.projectId),
    region: cdktf.stringToTerraform(struct!.region),
    topic_urn: cdktf.stringToTerraform(struct!.topicUrn),
  }
}


export function rmsResourceRecorderSmnChannelToHclTerraform(struct?: RmsResourceRecorderSmnChannelOutputReference | RmsResourceRecorderSmnChannel): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    project_id: {
      value: cdktf.stringToHclTerraform(struct!.projectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic_urn: {
      value: cdktf.stringToHclTerraform(struct!.topicUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RmsResourceRecorderSmnChannelOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): RmsResourceRecorderSmnChannel | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._projectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.projectId = this._projectId;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._topicUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicUrn = this._topicUrn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RmsResourceRecorderSmnChannel | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._projectId = undefined;
      this._region = undefined;
      this._topicUrn = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._projectId = value.projectId;
      this._region = value.region;
      this._topicUrn = value.topicUrn;
    }
  }

  // project_id - computed: true, optional: true, required: false
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  public resetProjectId() {
    this._projectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
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

  // topic_urn - computed: false, optional: false, required: true
  private _topicUrn?: string; 
  public get topicUrn() {
    return this.getStringAttribute('topic_urn');
  }
  public set topicUrn(value: string) {
    this._topicUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicUrnInput() {
    return this._topicUrn;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder huaweicloud_rms_resource_recorder}
*/
export class RmsResourceRecorder extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rms_resource_recorder";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a RmsResourceRecorder resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the RmsResourceRecorder to import
  * @param importFromId The id of the existing RmsResourceRecorder that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the RmsResourceRecorder to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rms_resource_recorder", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_resource_recorder huaweicloud_rms_resource_recorder} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RmsResourceRecorderConfig
  */
  public constructor(scope: Construct, id: string, config: RmsResourceRecorderConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rms_resource_recorder',
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
    this._agencyName = config.agencyName;
    this._id = config.id;
    this._obsChannel.internalValue = config.obsChannel;
    this._selector.internalValue = config.selector;
    this._smnChannel.internalValue = config.smnChannel;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // agency_name - computed: false, optional: false, required: true
  private _agencyName?: string; 
  public get agencyName() {
    return this.getStringAttribute('agency_name');
  }
  public set agencyName(value: string) {
    this._agencyName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyNameInput() {
    return this._agencyName;
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

  // obs_channel - computed: false, optional: true, required: false
  private _obsChannel = new RmsResourceRecorderObsChannelOutputReference(this, "obs_channel");
  public get obsChannel() {
    return this._obsChannel;
  }
  public putObsChannel(value: RmsResourceRecorderObsChannel) {
    this._obsChannel.internalValue = value;
  }
  public resetObsChannel() {
    this._obsChannel.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsChannelInput() {
    return this._obsChannel.internalValue;
  }

  // selector - computed: false, optional: false, required: true
  private _selector = new RmsResourceRecorderSelectorOutputReference(this, "selector");
  public get selector() {
    return this._selector;
  }
  public putSelector(value: RmsResourceRecorderSelector) {
    this._selector.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get selectorInput() {
    return this._selector.internalValue;
  }

  // smn_channel - computed: false, optional: true, required: false
  private _smnChannel = new RmsResourceRecorderSmnChannelOutputReference(this, "smn_channel");
  public get smnChannel() {
    return this._smnChannel;
  }
  public putSmnChannel(value: RmsResourceRecorderSmnChannel) {
    this._smnChannel.internalValue = value;
  }
  public resetSmnChannel() {
    this._smnChannel.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smnChannelInput() {
    return this._smnChannel.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      agency_name: cdktf.stringToTerraform(this._agencyName),
      id: cdktf.stringToTerraform(this._id),
      obs_channel: rmsResourceRecorderObsChannelToTerraform(this._obsChannel.internalValue),
      selector: rmsResourceRecorderSelectorToTerraform(this._selector.internalValue),
      smn_channel: rmsResourceRecorderSmnChannelToTerraform(this._smnChannel.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      agency_name: {
        value: cdktf.stringToHclTerraform(this._agencyName),
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
      obs_channel: {
        value: rmsResourceRecorderObsChannelToHclTerraform(this._obsChannel.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "RmsResourceRecorderObsChannelList",
      },
      selector: {
        value: rmsResourceRecorderSelectorToHclTerraform(this._selector.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "RmsResourceRecorderSelectorList",
      },
      smn_channel: {
        value: rmsResourceRecorderSmnChannelToHclTerraform(this._smnChannel.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "RmsResourceRecorderSmnChannelList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

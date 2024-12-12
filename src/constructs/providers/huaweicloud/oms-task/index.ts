// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface OmsTaskConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#description OmsTask#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#enable_kms OmsTask#enable_kms}
  */
  readonly enableKms: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#id OmsTask#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#region OmsTask#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#thread_num OmsTask#thread_num}
  */
  readonly threadNum: number;
  /**
  * dst_node block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#dst_node OmsTask#dst_node}
  */
  readonly dstNode: OmsTaskDstNode;
  /**
  * smn_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#smn_info OmsTask#smn_info}
  */
  readonly smnInfo?: OmsTaskSmnInfo;
  /**
  * src_node block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#src_node OmsTask#src_node}
  */
  readonly srcNode: OmsTaskSrcNode;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#timeouts OmsTask#timeouts}
  */
  readonly timeouts?: OmsTaskTimeouts;
}
export interface OmsTaskDstNode {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#ak OmsTask#ak}
  */
  readonly ak: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#bucket OmsTask#bucket}
  */
  readonly bucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#object_key OmsTask#object_key}
  */
  readonly objectKey: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#region OmsTask#region}
  */
  readonly region: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#sk OmsTask#sk}
  */
  readonly sk: string;
}

export function omsTaskDstNodeToTerraform(struct?: OmsTaskDstNodeOutputReference | OmsTaskDstNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    ak: cdktf.stringToTerraform(struct!.ak),
    bucket: cdktf.stringToTerraform(struct!.bucket),
    object_key: cdktf.stringToTerraform(struct!.objectKey),
    region: cdktf.stringToTerraform(struct!.region),
    sk: cdktf.stringToTerraform(struct!.sk),
  }
}


export function omsTaskDstNodeToHclTerraform(struct?: OmsTaskDstNodeOutputReference | OmsTaskDstNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    ak: {
      value: cdktf.stringToHclTerraform(struct!.ak),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bucket: {
      value: cdktf.stringToHclTerraform(struct!.bucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    object_key: {
      value: cdktf.stringToHclTerraform(struct!.objectKey),
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
    sk: {
      value: cdktf.stringToHclTerraform(struct!.sk),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsTaskDstNodeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsTaskDstNode | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._ak !== undefined) {
      hasAnyValues = true;
      internalValueResult.ak = this._ak;
    }
    if (this._bucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucket = this._bucket;
    }
    if (this._objectKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.objectKey = this._objectKey;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._sk !== undefined) {
      hasAnyValues = true;
      internalValueResult.sk = this._sk;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsTaskDstNode | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._ak = undefined;
      this._bucket = undefined;
      this._objectKey = undefined;
      this._region = undefined;
      this._sk = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._ak = value.ak;
      this._bucket = value.bucket;
      this._objectKey = value.objectKey;
      this._region = value.region;
      this._sk = value.sk;
    }
  }

  // ak - computed: false, optional: false, required: true
  private _ak?: string; 
  public get ak() {
    return this.getStringAttribute('ak');
  }
  public set ak(value: string) {
    this._ak = value;
  }
  // Temporarily expose input value. Use with caution.
  public get akInput() {
    return this._ak;
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

  // object_key - computed: false, optional: false, required: true
  private _objectKey?: string; 
  public get objectKey() {
    return this.getStringAttribute('object_key');
  }
  public set objectKey(value: string) {
    this._objectKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get objectKeyInput() {
    return this._objectKey;
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

  // sk - computed: false, optional: false, required: true
  private _sk?: string; 
  public get sk() {
    return this.getStringAttribute('sk');
  }
  public set sk(value: string) {
    this._sk = value;
  }
  // Temporarily expose input value. Use with caution.
  public get skInput() {
    return this._sk;
  }
}
export interface OmsTaskSmnInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#language OmsTask#language}
  */
  readonly language?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#topic_urn OmsTask#topic_urn}
  */
  readonly topicUrn: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#trigger_conditions OmsTask#trigger_conditions}
  */
  readonly triggerConditions: string[];
}

export function omsTaskSmnInfoToTerraform(struct?: OmsTaskSmnInfoOutputReference | OmsTaskSmnInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    language: cdktf.stringToTerraform(struct!.language),
    topic_urn: cdktf.stringToTerraform(struct!.topicUrn),
    trigger_conditions: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.triggerConditions),
  }
}


export function omsTaskSmnInfoToHclTerraform(struct?: OmsTaskSmnInfoOutputReference | OmsTaskSmnInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    language: {
      value: cdktf.stringToHclTerraform(struct!.language),
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
    trigger_conditions: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.triggerConditions),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsTaskSmnInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsTaskSmnInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._language !== undefined) {
      hasAnyValues = true;
      internalValueResult.language = this._language;
    }
    if (this._topicUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicUrn = this._topicUrn;
    }
    if (this._triggerConditions !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerConditions = this._triggerConditions;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsTaskSmnInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._language = undefined;
      this._topicUrn = undefined;
      this._triggerConditions = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._language = value.language;
      this._topicUrn = value.topicUrn;
      this._triggerConditions = value.triggerConditions;
    }
  }

  // language - computed: false, optional: true, required: false
  private _language?: string; 
  public get language() {
    return this.getStringAttribute('language');
  }
  public set language(value: string) {
    this._language = value;
  }
  public resetLanguage() {
    this._language = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get languageInput() {
    return this._language;
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

  // trigger_conditions - computed: false, optional: false, required: true
  private _triggerConditions?: string[]; 
  public get triggerConditions() {
    return cdktf.Fn.tolist(this.getListAttribute('trigger_conditions'));
  }
  public set triggerConditions(value: string[]) {
    this._triggerConditions = value;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerConditionsInput() {
    return this._triggerConditions;
  }
}
export interface OmsTaskSrcNode {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#ak OmsTask#ak}
  */
  readonly ak: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#bucket OmsTask#bucket}
  */
  readonly bucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#cloud_type OmsTask#cloud_type}
  */
  readonly cloudType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#object_key OmsTask#object_key}
  */
  readonly objectKey: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#region OmsTask#region}
  */
  readonly region: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#sk OmsTask#sk}
  */
  readonly sk: string;
}

export function omsTaskSrcNodeToTerraform(struct?: OmsTaskSrcNodeOutputReference | OmsTaskSrcNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    ak: cdktf.stringToTerraform(struct!.ak),
    bucket: cdktf.stringToTerraform(struct!.bucket),
    cloud_type: cdktf.stringToTerraform(struct!.cloudType),
    object_key: cdktf.stringToTerraform(struct!.objectKey),
    region: cdktf.stringToTerraform(struct!.region),
    sk: cdktf.stringToTerraform(struct!.sk),
  }
}


export function omsTaskSrcNodeToHclTerraform(struct?: OmsTaskSrcNodeOutputReference | OmsTaskSrcNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    ak: {
      value: cdktf.stringToHclTerraform(struct!.ak),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bucket: {
      value: cdktf.stringToHclTerraform(struct!.bucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    cloud_type: {
      value: cdktf.stringToHclTerraform(struct!.cloudType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    object_key: {
      value: cdktf.stringToHclTerraform(struct!.objectKey),
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
    sk: {
      value: cdktf.stringToHclTerraform(struct!.sk),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class OmsTaskSrcNodeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): OmsTaskSrcNode | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._ak !== undefined) {
      hasAnyValues = true;
      internalValueResult.ak = this._ak;
    }
    if (this._bucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucket = this._bucket;
    }
    if (this._cloudType !== undefined) {
      hasAnyValues = true;
      internalValueResult.cloudType = this._cloudType;
    }
    if (this._objectKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.objectKey = this._objectKey;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._sk !== undefined) {
      hasAnyValues = true;
      internalValueResult.sk = this._sk;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: OmsTaskSrcNode | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._ak = undefined;
      this._bucket = undefined;
      this._cloudType = undefined;
      this._objectKey = undefined;
      this._region = undefined;
      this._sk = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._ak = value.ak;
      this._bucket = value.bucket;
      this._cloudType = value.cloudType;
      this._objectKey = value.objectKey;
      this._region = value.region;
      this._sk = value.sk;
    }
  }

  // ak - computed: false, optional: false, required: true
  private _ak?: string; 
  public get ak() {
    return this.getStringAttribute('ak');
  }
  public set ak(value: string) {
    this._ak = value;
  }
  // Temporarily expose input value. Use with caution.
  public get akInput() {
    return this._ak;
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

  // cloud_type - computed: false, optional: true, required: false
  private _cloudType?: string; 
  public get cloudType() {
    return this.getStringAttribute('cloud_type');
  }
  public set cloudType(value: string) {
    this._cloudType = value;
  }
  public resetCloudType() {
    this._cloudType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cloudTypeInput() {
    return this._cloudType;
  }

  // object_key - computed: false, optional: false, required: true
  private _objectKey?: string; 
  public get objectKey() {
    return this.getStringAttribute('object_key');
  }
  public set objectKey(value: string) {
    this._objectKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get objectKeyInput() {
    return this._objectKey;
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

  // sk - computed: false, optional: false, required: true
  private _sk?: string; 
  public get sk() {
    return this.getStringAttribute('sk');
  }
  public set sk(value: string) {
    this._sk = value;
  }
  // Temporarily expose input value. Use with caution.
  public get skInput() {
    return this._sk;
  }
}
export interface OmsTaskTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#create OmsTask#create}
  */
  readonly create?: string;
}

export function omsTaskTimeoutsToTerraform(struct?: OmsTaskTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function omsTaskTimeoutsToHclTerraform(struct?: OmsTaskTimeouts | cdktf.IResolvable): any {
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

export class OmsTaskTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): OmsTaskTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: OmsTaskTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task huaweicloud_oms_task}
*/
export class OmsTask extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_oms_task";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a OmsTask resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the OmsTask to import
  * @param importFromId The id of the existing OmsTask that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the OmsTask to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_oms_task", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/oms_task huaweicloud_oms_task} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options OmsTaskConfig
  */
  public constructor(scope: Construct, id: string, config: OmsTaskConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_oms_task',
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
    this._description = config.description;
    this._enableKms = config.enableKms;
    this._id = config.id;
    this._region = config.region;
    this._threadNum = config.threadNum;
    this._dstNode.internalValue = config.dstNode;
    this._smnInfo.internalValue = config.smnInfo;
    this._srcNode.internalValue = config.srcNode;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // enable_kms - computed: false, optional: false, required: true
  private _enableKms?: boolean | cdktf.IResolvable; 
  public get enableKms() {
    return this.getBooleanAttribute('enable_kms');
  }
  public set enableKms(value: boolean | cdktf.IResolvable) {
    this._enableKms = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enableKmsInput() {
    return this._enableKms;
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

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
  }

  // thread_num - computed: false, optional: false, required: true
  private _threadNum?: number; 
  public get threadNum() {
    return this.getNumberAttribute('thread_num');
  }
  public set threadNum(value: number) {
    this._threadNum = value;
  }
  // Temporarily expose input value. Use with caution.
  public get threadNumInput() {
    return this._threadNum;
  }

  // dst_node - computed: false, optional: false, required: true
  private _dstNode = new OmsTaskDstNodeOutputReference(this, "dst_node");
  public get dstNode() {
    return this._dstNode;
  }
  public putDstNode(value: OmsTaskDstNode) {
    this._dstNode.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dstNodeInput() {
    return this._dstNode.internalValue;
  }

  // smn_info - computed: false, optional: true, required: false
  private _smnInfo = new OmsTaskSmnInfoOutputReference(this, "smn_info");
  public get smnInfo() {
    return this._smnInfo;
  }
  public putSmnInfo(value: OmsTaskSmnInfo) {
    this._smnInfo.internalValue = value;
  }
  public resetSmnInfo() {
    this._smnInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smnInfoInput() {
    return this._smnInfo.internalValue;
  }

  // src_node - computed: false, optional: false, required: true
  private _srcNode = new OmsTaskSrcNodeOutputReference(this, "src_node");
  public get srcNode() {
    return this._srcNode;
  }
  public putSrcNode(value: OmsTaskSrcNode) {
    this._srcNode.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get srcNodeInput() {
    return this._srcNode.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new OmsTaskTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: OmsTaskTimeouts) {
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
      description: cdktf.stringToTerraform(this._description),
      enable_kms: cdktf.booleanToTerraform(this._enableKms),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      thread_num: cdktf.numberToTerraform(this._threadNum),
      dst_node: omsTaskDstNodeToTerraform(this._dstNode.internalValue),
      smn_info: omsTaskSmnInfoToTerraform(this._smnInfo.internalValue),
      src_node: omsTaskSrcNodeToTerraform(this._srcNode.internalValue),
      timeouts: omsTaskTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      description: {
        value: cdktf.stringToHclTerraform(this._description),
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
      thread_num: {
        value: cdktf.numberToHclTerraform(this._threadNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      dst_node: {
        value: omsTaskDstNodeToHclTerraform(this._dstNode.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsTaskDstNodeList",
      },
      smn_info: {
        value: omsTaskSmnInfoToHclTerraform(this._smnInfo.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsTaskSmnInfoList",
      },
      src_node: {
        value: omsTaskSrcNodeToHclTerraform(this._srcNode.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "OmsTaskSrcNodeList",
      },
      timeouts: {
        value: omsTaskTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "OmsTaskTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsStructTemplateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#content LtsStructTemplate#content}
  */
  readonly content?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#id LtsStructTemplate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#log_group_id LtsStructTemplate#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#log_stream_id LtsStructTemplate#log_stream_id}
  */
  readonly logStreamId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#region LtsStructTemplate#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#template_id LtsStructTemplate#template_id}
  */
  readonly templateId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#template_name LtsStructTemplate#template_name}
  */
  readonly templateName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#template_type LtsStructTemplate#template_type}
  */
  readonly templateType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#tokenizer LtsStructTemplate#tokenizer}
  */
  readonly tokenizer?: string;
  /**
  * demo_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#demo_fields LtsStructTemplate#demo_fields}
  */
  readonly demoFields?: LtsStructTemplateDemoFields[] | cdktf.IResolvable;
  /**
  * tag_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#tag_fields LtsStructTemplate#tag_fields}
  */
  readonly tagFields?: LtsStructTemplateTagFields[] | cdktf.IResolvable;
}
export interface LtsStructTemplateDemoFields {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#content LtsStructTemplate#content}
  */
  readonly content?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#field_name LtsStructTemplate#field_name}
  */
  readonly fieldName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#index LtsStructTemplate#index}
  */
  readonly index?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#is_analysis LtsStructTemplate#is_analysis}
  */
  readonly isAnalysis?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#type LtsStructTemplate#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#user_defined_name LtsStructTemplate#user_defined_name}
  */
  readonly userDefinedName?: string;
}

export function ltsStructTemplateDemoFieldsToTerraform(struct?: LtsStructTemplateDemoFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    content: cdktf.stringToTerraform(struct!.content),
    field_name: cdktf.stringToTerraform(struct!.fieldName),
    index: cdktf.numberToTerraform(struct!.index),
    is_analysis: cdktf.booleanToTerraform(struct!.isAnalysis),
    type: cdktf.stringToTerraform(struct!.type),
    user_defined_name: cdktf.stringToTerraform(struct!.userDefinedName),
  }
}


export function ltsStructTemplateDemoFieldsToHclTerraform(struct?: LtsStructTemplateDemoFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    content: {
      value: cdktf.stringToHclTerraform(struct!.content),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    field_name: {
      value: cdktf.stringToHclTerraform(struct!.fieldName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    index: {
      value: cdktf.numberToHclTerraform(struct!.index),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    is_analysis: {
      value: cdktf.booleanToHclTerraform(struct!.isAnalysis),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user_defined_name: {
      value: cdktf.stringToHclTerraform(struct!.userDefinedName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsStructTemplateDemoFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsStructTemplateDemoFields | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._content !== undefined) {
      hasAnyValues = true;
      internalValueResult.content = this._content;
    }
    if (this._fieldName !== undefined) {
      hasAnyValues = true;
      internalValueResult.fieldName = this._fieldName;
    }
    if (this._index !== undefined) {
      hasAnyValues = true;
      internalValueResult.index = this._index;
    }
    if (this._isAnalysis !== undefined) {
      hasAnyValues = true;
      internalValueResult.isAnalysis = this._isAnalysis;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._userDefinedName !== undefined) {
      hasAnyValues = true;
      internalValueResult.userDefinedName = this._userDefinedName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsStructTemplateDemoFields | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._content = undefined;
      this._fieldName = undefined;
      this._index = undefined;
      this._isAnalysis = undefined;
      this._type = undefined;
      this._userDefinedName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._content = value.content;
      this._fieldName = value.fieldName;
      this._index = value.index;
      this._isAnalysis = value.isAnalysis;
      this._type = value.type;
      this._userDefinedName = value.userDefinedName;
    }
  }

  // content - computed: false, optional: true, required: false
  private _content?: string; 
  public get content() {
    return this.getStringAttribute('content');
  }
  public set content(value: string) {
    this._content = value;
  }
  public resetContent() {
    this._content = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contentInput() {
    return this._content;
  }

  // field_name - computed: false, optional: true, required: false
  private _fieldName?: string; 
  public get fieldName() {
    return this.getStringAttribute('field_name');
  }
  public set fieldName(value: string) {
    this._fieldName = value;
  }
  public resetFieldName() {
    this._fieldName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldNameInput() {
    return this._fieldName;
  }

  // index - computed: false, optional: true, required: false
  private _index?: number; 
  public get index() {
    return this.getNumberAttribute('index');
  }
  public set index(value: number) {
    this._index = value;
  }
  public resetIndex() {
    this._index = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get indexInput() {
    return this._index;
  }

  // is_analysis - computed: false, optional: true, required: false
  private _isAnalysis?: boolean | cdktf.IResolvable; 
  public get isAnalysis() {
    return this.getBooleanAttribute('is_analysis');
  }
  public set isAnalysis(value: boolean | cdktf.IResolvable) {
    this._isAnalysis = value;
  }
  public resetIsAnalysis() {
    this._isAnalysis = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isAnalysisInput() {
    return this._isAnalysis;
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

  // user_defined_name - computed: false, optional: true, required: false
  private _userDefinedName?: string; 
  public get userDefinedName() {
    return this.getStringAttribute('user_defined_name');
  }
  public set userDefinedName(value: string) {
    this._userDefinedName = value;
  }
  public resetUserDefinedName() {
    this._userDefinedName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userDefinedNameInput() {
    return this._userDefinedName;
  }
}

export class LtsStructTemplateDemoFieldsList extends cdktf.ComplexList {
  public internalValue? : LtsStructTemplateDemoFields[] | cdktf.IResolvable

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
  public get(index: number): LtsStructTemplateDemoFieldsOutputReference {
    return new LtsStructTemplateDemoFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LtsStructTemplateTagFields {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#content LtsStructTemplate#content}
  */
  readonly content?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#field_name LtsStructTemplate#field_name}
  */
  readonly fieldName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#is_analysis LtsStructTemplate#is_analysis}
  */
  readonly isAnalysis?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#type LtsStructTemplate#type}
  */
  readonly type?: string;
}

export function ltsStructTemplateTagFieldsToTerraform(struct?: LtsStructTemplateTagFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    content: cdktf.stringToTerraform(struct!.content),
    field_name: cdktf.stringToTerraform(struct!.fieldName),
    is_analysis: cdktf.booleanToTerraform(struct!.isAnalysis),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function ltsStructTemplateTagFieldsToHclTerraform(struct?: LtsStructTemplateTagFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    content: {
      value: cdktf.stringToHclTerraform(struct!.content),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    field_name: {
      value: cdktf.stringToHclTerraform(struct!.fieldName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    is_analysis: {
      value: cdktf.booleanToHclTerraform(struct!.isAnalysis),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
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

export class LtsStructTemplateTagFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsStructTemplateTagFields | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._content !== undefined) {
      hasAnyValues = true;
      internalValueResult.content = this._content;
    }
    if (this._fieldName !== undefined) {
      hasAnyValues = true;
      internalValueResult.fieldName = this._fieldName;
    }
    if (this._isAnalysis !== undefined) {
      hasAnyValues = true;
      internalValueResult.isAnalysis = this._isAnalysis;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsStructTemplateTagFields | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._content = undefined;
      this._fieldName = undefined;
      this._isAnalysis = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._content = value.content;
      this._fieldName = value.fieldName;
      this._isAnalysis = value.isAnalysis;
      this._type = value.type;
    }
  }

  // content - computed: false, optional: true, required: false
  private _content?: string; 
  public get content() {
    return this.getStringAttribute('content');
  }
  public set content(value: string) {
    this._content = value;
  }
  public resetContent() {
    this._content = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contentInput() {
    return this._content;
  }

  // field_name - computed: false, optional: true, required: false
  private _fieldName?: string; 
  public get fieldName() {
    return this.getStringAttribute('field_name');
  }
  public set fieldName(value: string) {
    this._fieldName = value;
  }
  public resetFieldName() {
    this._fieldName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldNameInput() {
    return this._fieldName;
  }

  // is_analysis - computed: false, optional: true, required: false
  private _isAnalysis?: boolean | cdktf.IResolvable; 
  public get isAnalysis() {
    return this.getBooleanAttribute('is_analysis');
  }
  public set isAnalysis(value: boolean | cdktf.IResolvable) {
    this._isAnalysis = value;
  }
  public resetIsAnalysis() {
    this._isAnalysis = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isAnalysisInput() {
    return this._isAnalysis;
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

export class LtsStructTemplateTagFieldsList extends cdktf.ComplexList {
  public internalValue? : LtsStructTemplateTagFields[] | cdktf.IResolvable

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
  public get(index: number): LtsStructTemplateTagFieldsOutputReference {
    return new LtsStructTemplateTagFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template huaweicloud_lts_struct_template}
*/
export class LtsStructTemplate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_struct_template";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsStructTemplate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsStructTemplate to import
  * @param importFromId The id of the existing LtsStructTemplate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsStructTemplate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_struct_template", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_struct_template huaweicloud_lts_struct_template} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsStructTemplateConfig
  */
  public constructor(scope: Construct, id: string, config: LtsStructTemplateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_struct_template',
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
    this._content = config.content;
    this._id = config.id;
    this._logGroupId = config.logGroupId;
    this._logStreamId = config.logStreamId;
    this._region = config.region;
    this._templateId = config.templateId;
    this._templateName = config.templateName;
    this._templateType = config.templateType;
    this._tokenizer = config.tokenizer;
    this._demoFields.internalValue = config.demoFields;
    this._tagFields.internalValue = config.tagFields;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // content - computed: false, optional: true, required: false
  private _content?: string; 
  public get content() {
    return this.getStringAttribute('content');
  }
  public set content(value: string) {
    this._content = value;
  }
  public resetContent() {
    this._content = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contentInput() {
    return this._content;
  }

  // demo_log - computed: true, optional: false, required: false
  public get demoLog() {
    return this.getStringAttribute('demo_log');
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

  // log_group_id - computed: false, optional: false, required: true
  private _logGroupId?: string; 
  public get logGroupId() {
    return this.getStringAttribute('log_group_id');
  }
  public set logGroupId(value: string) {
    this._logGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupIdInput() {
    return this._logGroupId;
  }

  // log_stream_id - computed: false, optional: false, required: true
  private _logStreamId?: string; 
  public get logStreamId() {
    return this.getStringAttribute('log_stream_id');
  }
  public set logStreamId(value: string) {
    this._logStreamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamIdInput() {
    return this._logStreamId;
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

  // template_id - computed: false, optional: true, required: false
  private _templateId?: string; 
  public get templateId() {
    return this.getStringAttribute('template_id');
  }
  public set templateId(value: string) {
    this._templateId = value;
  }
  public resetTemplateId() {
    this._templateId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateIdInput() {
    return this._templateId;
  }

  // template_name - computed: false, optional: true, required: false
  private _templateName?: string; 
  public get templateName() {
    return this.getStringAttribute('template_name');
  }
  public set templateName(value: string) {
    this._templateName = value;
  }
  public resetTemplateName() {
    this._templateName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateNameInput() {
    return this._templateName;
  }

  // template_type - computed: false, optional: false, required: true
  private _templateType?: string; 
  public get templateType() {
    return this.getStringAttribute('template_type');
  }
  public set templateType(value: string) {
    this._templateType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get templateTypeInput() {
    return this._templateType;
  }

  // tokenizer - computed: false, optional: true, required: false
  private _tokenizer?: string; 
  public get tokenizer() {
    return this.getStringAttribute('tokenizer');
  }
  public set tokenizer(value: string) {
    this._tokenizer = value;
  }
  public resetTokenizer() {
    this._tokenizer = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tokenizerInput() {
    return this._tokenizer;
  }

  // demo_fields - computed: false, optional: true, required: false
  private _demoFields = new LtsStructTemplateDemoFieldsList(this, "demo_fields", false);
  public get demoFields() {
    return this._demoFields;
  }
  public putDemoFields(value: LtsStructTemplateDemoFields[] | cdktf.IResolvable) {
    this._demoFields.internalValue = value;
  }
  public resetDemoFields() {
    this._demoFields.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get demoFieldsInput() {
    return this._demoFields.internalValue;
  }

  // tag_fields - computed: false, optional: true, required: false
  private _tagFields = new LtsStructTemplateTagFieldsList(this, "tag_fields", false);
  public get tagFields() {
    return this._tagFields;
  }
  public putTagFields(value: LtsStructTemplateTagFields[] | cdktf.IResolvable) {
    this._tagFields.internalValue = value;
  }
  public resetTagFields() {
    this._tagFields.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagFieldsInput() {
    return this._tagFields.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      content: cdktf.stringToTerraform(this._content),
      id: cdktf.stringToTerraform(this._id),
      log_group_id: cdktf.stringToTerraform(this._logGroupId),
      log_stream_id: cdktf.stringToTerraform(this._logStreamId),
      region: cdktf.stringToTerraform(this._region),
      template_id: cdktf.stringToTerraform(this._templateId),
      template_name: cdktf.stringToTerraform(this._templateName),
      template_type: cdktf.stringToTerraform(this._templateType),
      tokenizer: cdktf.stringToTerraform(this._tokenizer),
      demo_fields: cdktf.listMapper(ltsStructTemplateDemoFieldsToTerraform, true)(this._demoFields.internalValue),
      tag_fields: cdktf.listMapper(ltsStructTemplateTagFieldsToTerraform, true)(this._tagFields.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      content: {
        value: cdktf.stringToHclTerraform(this._content),
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
      log_group_id: {
        value: cdktf.stringToHclTerraform(this._logGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_stream_id: {
        value: cdktf.stringToHclTerraform(this._logStreamId),
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
      template_id: {
        value: cdktf.stringToHclTerraform(this._templateId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      template_name: {
        value: cdktf.stringToHclTerraform(this._templateName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      template_type: {
        value: cdktf.stringToHclTerraform(this._templateType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tokenizer: {
        value: cdktf.stringToHclTerraform(this._tokenizer),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      demo_fields: {
        value: cdktf.listMapperHcl(ltsStructTemplateDemoFieldsToHclTerraform, true)(this._demoFields.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsStructTemplateDemoFieldsList",
      },
      tag_fields: {
        value: cdktf.listMapperHcl(ltsStructTemplateTagFieldsToHclTerraform, true)(this._tagFields.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsStructTemplateTagFieldsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

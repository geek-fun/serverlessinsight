// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsStructuringCustomConfigurationConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies a sample log event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#content LtsStructuringCustomConfiguration#content}
  */
  readonly content: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#id LtsStructuringCustomConfiguration#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the maximum parsing layers.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#layers LtsStructuringCustomConfiguration#layers}
  */
  readonly layers?: number;
  /**
  * Specifies the nginx configuration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#log_format LtsStructuringCustomConfiguration#log_format}
  */
  readonly logFormat?: string;
  /**
  * Specifies the log group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#log_group_id LtsStructuringCustomConfiguration#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Specifies the log stream ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#log_stream_id LtsStructuringCustomConfiguration#log_stream_id}
  */
  readonly logStreamId: string;
  /**
  * Specifies the regular expression.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#regex_rules LtsStructuringCustomConfiguration#regex_rules}
  */
  readonly regexRules?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#region LtsStructuringCustomConfiguration#region}
  */
  readonly region?: string;
  /**
  * Specifies the delimiter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#tokenizer LtsStructuringCustomConfiguration#tokenizer}
  */
  readonly tokenizer?: string;
  /**
  * demo_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#demo_fields LtsStructuringCustomConfiguration#demo_fields}
  */
  readonly demoFields: LtsStructuringCustomConfigurationDemoFields[] | cdktf.IResolvable;
  /**
  * tag_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#tag_fields LtsStructuringCustomConfiguration#tag_fields}
  */
  readonly tagFields?: LtsStructuringCustomConfigurationTagFields[] | cdktf.IResolvable;
}
export interface LtsStructuringCustomConfigurationDemoFields {
  /**
  * Specifies the content.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#content LtsStructuringCustomConfiguration#content}
  */
  readonly content?: string;
  /**
  * Specifies the field name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#field_name LtsStructuringCustomConfiguration#field_name}
  */
  readonly fieldName?: string;
  /**
  * Specifies whether quick analysis is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#is_analysis LtsStructuringCustomConfiguration#is_analysis}
  */
  readonly isAnalysis?: boolean | cdktf.IResolvable;
  /**
  * Specifies the field data type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#type LtsStructuringCustomConfiguration#type}
  */
  readonly type?: string;
}

export function ltsStructuringCustomConfigurationDemoFieldsToTerraform(struct?: LtsStructuringCustomConfigurationDemoFields | cdktf.IResolvable): any {
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


export function ltsStructuringCustomConfigurationDemoFieldsToHclTerraform(struct?: LtsStructuringCustomConfigurationDemoFields | cdktf.IResolvable): any {
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

export class LtsStructuringCustomConfigurationDemoFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsStructuringCustomConfigurationDemoFields | cdktf.IResolvable | undefined {
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

  public set internalValue(value: LtsStructuringCustomConfigurationDemoFields | cdktf.IResolvable | undefined) {
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

export class LtsStructuringCustomConfigurationDemoFieldsList extends cdktf.ComplexList {
  public internalValue? : LtsStructuringCustomConfigurationDemoFields[] | cdktf.IResolvable

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
  public get(index: number): LtsStructuringCustomConfigurationDemoFieldsOutputReference {
    return new LtsStructuringCustomConfigurationDemoFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LtsStructuringCustomConfigurationTagFields {
  /**
  * Specifies the field content.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#content LtsStructuringCustomConfiguration#content}
  */
  readonly content?: string;
  /**
  * Specifies the field name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#field_name LtsStructuringCustomConfiguration#field_name}
  */
  readonly fieldName: string;
  /**
  * Specifies whether quick analysis is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#is_analysis LtsStructuringCustomConfiguration#is_analysis}
  */
  readonly isAnalysis?: boolean | cdktf.IResolvable;
  /**
  * Specifies the field data type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#type LtsStructuringCustomConfiguration#type}
  */
  readonly type: string;
}

export function ltsStructuringCustomConfigurationTagFieldsToTerraform(struct?: LtsStructuringCustomConfigurationTagFields | cdktf.IResolvable): any {
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


export function ltsStructuringCustomConfigurationTagFieldsToHclTerraform(struct?: LtsStructuringCustomConfigurationTagFields | cdktf.IResolvable): any {
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

export class LtsStructuringCustomConfigurationTagFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsStructuringCustomConfigurationTagFields | cdktf.IResolvable | undefined {
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

  public set internalValue(value: LtsStructuringCustomConfigurationTagFields | cdktf.IResolvable | undefined) {
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

  // field_name - computed: false, optional: false, required: true
  private _fieldName?: string; 
  public get fieldName() {
    return this.getStringAttribute('field_name');
  }
  public set fieldName(value: string) {
    this._fieldName = value;
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

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}

export class LtsStructuringCustomConfigurationTagFieldsList extends cdktf.ComplexList {
  public internalValue? : LtsStructuringCustomConfigurationTagFields[] | cdktf.IResolvable

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
  public get(index: number): LtsStructuringCustomConfigurationTagFieldsOutputReference {
    return new LtsStructuringCustomConfigurationTagFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration huaweicloud_lts_structuring_custom_configuration}
*/
export class LtsStructuringCustomConfiguration extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_structuring_custom_configuration";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsStructuringCustomConfiguration resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsStructuringCustomConfiguration to import
  * @param importFromId The id of the existing LtsStructuringCustomConfiguration that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsStructuringCustomConfiguration to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_structuring_custom_configuration", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structuring_custom_configuration huaweicloud_lts_structuring_custom_configuration} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsStructuringCustomConfigurationConfig
  */
  public constructor(scope: Construct, id: string, config: LtsStructuringCustomConfigurationConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_structuring_custom_configuration',
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
    this._layers = config.layers;
    this._logFormat = config.logFormat;
    this._logGroupId = config.logGroupId;
    this._logStreamId = config.logStreamId;
    this._regexRules = config.regexRules;
    this._region = config.region;
    this._tokenizer = config.tokenizer;
    this._demoFields.internalValue = config.demoFields;
    this._tagFields.internalValue = config.tagFields;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // content - computed: false, optional: false, required: true
  private _content?: string; 
  public get content() {
    return this.getStringAttribute('content');
  }
  public set content(value: string) {
    this._content = value;
  }
  // Temporarily expose input value. Use with caution.
  public get contentInput() {
    return this._content;
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

  // layers - computed: false, optional: true, required: false
  private _layers?: number; 
  public get layers() {
    return this.getNumberAttribute('layers');
  }
  public set layers(value: number) {
    this._layers = value;
  }
  public resetLayers() {
    this._layers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get layersInput() {
    return this._layers;
  }

  // log_format - computed: false, optional: true, required: false
  private _logFormat?: string; 
  public get logFormat() {
    return this.getStringAttribute('log_format');
  }
  public set logFormat(value: string) {
    this._logFormat = value;
  }
  public resetLogFormat() {
    this._logFormat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logFormatInput() {
    return this._logFormat;
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

  // regex_rules - computed: false, optional: true, required: false
  private _regexRules?: string; 
  public get regexRules() {
    return this.getStringAttribute('regex_rules');
  }
  public set regexRules(value: string) {
    this._regexRules = value;
  }
  public resetRegexRules() {
    this._regexRules = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regexRulesInput() {
    return this._regexRules;
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

  // demo_fields - computed: false, optional: false, required: true
  private _demoFields = new LtsStructuringCustomConfigurationDemoFieldsList(this, "demo_fields", false);
  public get demoFields() {
    return this._demoFields;
  }
  public putDemoFields(value: LtsStructuringCustomConfigurationDemoFields[] | cdktf.IResolvable) {
    this._demoFields.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get demoFieldsInput() {
    return this._demoFields.internalValue;
  }

  // tag_fields - computed: false, optional: true, required: false
  private _tagFields = new LtsStructuringCustomConfigurationTagFieldsList(this, "tag_fields", false);
  public get tagFields() {
    return this._tagFields;
  }
  public putTagFields(value: LtsStructuringCustomConfigurationTagFields[] | cdktf.IResolvable) {
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
      layers: cdktf.numberToTerraform(this._layers),
      log_format: cdktf.stringToTerraform(this._logFormat),
      log_group_id: cdktf.stringToTerraform(this._logGroupId),
      log_stream_id: cdktf.stringToTerraform(this._logStreamId),
      regex_rules: cdktf.stringToTerraform(this._regexRules),
      region: cdktf.stringToTerraform(this._region),
      tokenizer: cdktf.stringToTerraform(this._tokenizer),
      demo_fields: cdktf.listMapper(ltsStructuringCustomConfigurationDemoFieldsToTerraform, true)(this._demoFields.internalValue),
      tag_fields: cdktf.listMapper(ltsStructuringCustomConfigurationTagFieldsToTerraform, true)(this._tagFields.internalValue),
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
      layers: {
        value: cdktf.numberToHclTerraform(this._layers),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      log_format: {
        value: cdktf.stringToHclTerraform(this._logFormat),
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
      regex_rules: {
        value: cdktf.stringToHclTerraform(this._regexRules),
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
      tokenizer: {
        value: cdktf.stringToHclTerraform(this._tokenizer),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      demo_fields: {
        value: cdktf.listMapperHcl(ltsStructuringCustomConfigurationDemoFieldsToHclTerraform, true)(this._demoFields.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsStructuringCustomConfigurationDemoFieldsList",
      },
      tag_fields: {
        value: cdktf.listMapperHcl(ltsStructuringCustomConfigurationTagFieldsToHclTerraform, true)(this._tagFields.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsStructuringCustomConfigurationTagFieldsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

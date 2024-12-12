// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsStructingTemplateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#id LtsStructingTemplate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the log group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#log_group_id LtsStructingTemplate#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Specifies the log stream ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#log_stream_id LtsStructingTemplate#log_stream_id}
  */
  readonly logStreamId: string;
  /**
  * Specifies whether to enable demo_fields and tag_fields quick analysis.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#quick_analysis LtsStructingTemplate#quick_analysis}
  */
  readonly quickAnalysis?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#region LtsStructingTemplate#region}
  */
  readonly region?: string;
  /**
  * Specifies the template ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#template_id LtsStructingTemplate#template_id}
  */
  readonly templateId?: string;
  /**
  * Specifies the template name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#template_name LtsStructingTemplate#template_name}
  */
  readonly templateName: string;
  /**
  * Specifies the type of the template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#template_type LtsStructingTemplate#template_type}
  */
  readonly templateType: string;
  /**
  * demo_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#demo_fields LtsStructingTemplate#demo_fields}
  */
  readonly demoFields?: LtsStructingTemplateDemoFields[] | cdktf.IResolvable;
  /**
  * tag_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#tag_fields LtsStructingTemplate#tag_fields}
  */
  readonly tagFields?: LtsStructingTemplateTagFields[] | cdktf.IResolvable;
}
export interface LtsStructingTemplateDemoFields {
  /**
  * Specifies the field name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#field_name LtsStructingTemplate#field_name}
  */
  readonly fieldName: string;
  /**
  * Specifies whether quick analysis is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#is_analysis LtsStructingTemplate#is_analysis}
  */
  readonly isAnalysis?: boolean | cdktf.IResolvable;
}

export function ltsStructingTemplateDemoFieldsToTerraform(struct?: LtsStructingTemplateDemoFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    field_name: cdktf.stringToTerraform(struct!.fieldName),
    is_analysis: cdktf.booleanToTerraform(struct!.isAnalysis),
  }
}


export function ltsStructingTemplateDemoFieldsToHclTerraform(struct?: LtsStructingTemplateDemoFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsStructingTemplateDemoFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsStructingTemplateDemoFields | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._fieldName !== undefined) {
      hasAnyValues = true;
      internalValueResult.fieldName = this._fieldName;
    }
    if (this._isAnalysis !== undefined) {
      hasAnyValues = true;
      internalValueResult.isAnalysis = this._isAnalysis;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsStructingTemplateDemoFields | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._fieldName = undefined;
      this._isAnalysis = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._fieldName = value.fieldName;
      this._isAnalysis = value.isAnalysis;
    }
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
}

export class LtsStructingTemplateDemoFieldsList extends cdktf.ComplexList {
  public internalValue? : LtsStructingTemplateDemoFields[] | cdktf.IResolvable

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
  public get(index: number): LtsStructingTemplateDemoFieldsOutputReference {
    return new LtsStructingTemplateDemoFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LtsStructingTemplateTagFields {
  /**
  * Specifies the field name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#field_name LtsStructingTemplate#field_name}
  */
  readonly fieldName: string;
  /**
  * Specifies whether quick analysis is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#is_analysis LtsStructingTemplate#is_analysis}
  */
  readonly isAnalysis?: boolean | cdktf.IResolvable;
}

export function ltsStructingTemplateTagFieldsToTerraform(struct?: LtsStructingTemplateTagFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    field_name: cdktf.stringToTerraform(struct!.fieldName),
    is_analysis: cdktf.booleanToTerraform(struct!.isAnalysis),
  }
}


export function ltsStructingTemplateTagFieldsToHclTerraform(struct?: LtsStructingTemplateTagFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsStructingTemplateTagFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsStructingTemplateTagFields | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._fieldName !== undefined) {
      hasAnyValues = true;
      internalValueResult.fieldName = this._fieldName;
    }
    if (this._isAnalysis !== undefined) {
      hasAnyValues = true;
      internalValueResult.isAnalysis = this._isAnalysis;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsStructingTemplateTagFields | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._fieldName = undefined;
      this._isAnalysis = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._fieldName = value.fieldName;
      this._isAnalysis = value.isAnalysis;
    }
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
}

export class LtsStructingTemplateTagFieldsList extends cdktf.ComplexList {
  public internalValue? : LtsStructingTemplateTagFields[] | cdktf.IResolvable

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
  public get(index: number): LtsStructingTemplateTagFieldsOutputReference {
    return new LtsStructingTemplateTagFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template huaweicloud_lts_structing_template}
*/
export class LtsStructingTemplate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_structing_template";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsStructingTemplate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsStructingTemplate to import
  * @param importFromId The id of the existing LtsStructingTemplate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsStructingTemplate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_structing_template", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_structing_template huaweicloud_lts_structing_template} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsStructingTemplateConfig
  */
  public constructor(scope: Construct, id: string, config: LtsStructingTemplateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_structing_template',
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
    this._logGroupId = config.logGroupId;
    this._logStreamId = config.logStreamId;
    this._quickAnalysis = config.quickAnalysis;
    this._region = config.region;
    this._templateId = config.templateId;
    this._templateName = config.templateName;
    this._templateType = config.templateType;
    this._demoFields.internalValue = config.demoFields;
    this._tagFields.internalValue = config.tagFields;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // quick_analysis - computed: false, optional: true, required: false
  private _quickAnalysis?: boolean | cdktf.IResolvable; 
  public get quickAnalysis() {
    return this.getBooleanAttribute('quick_analysis');
  }
  public set quickAnalysis(value: boolean | cdktf.IResolvable) {
    this._quickAnalysis = value;
  }
  public resetQuickAnalysis() {
    this._quickAnalysis = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get quickAnalysisInput() {
    return this._quickAnalysis;
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

  // template_name - computed: false, optional: false, required: true
  private _templateName?: string; 
  public get templateName() {
    return this.getStringAttribute('template_name');
  }
  public set templateName(value: string) {
    this._templateName = value;
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

  // demo_fields - computed: false, optional: true, required: false
  private _demoFields = new LtsStructingTemplateDemoFieldsList(this, "demo_fields", false);
  public get demoFields() {
    return this._demoFields;
  }
  public putDemoFields(value: LtsStructingTemplateDemoFields[] | cdktf.IResolvable) {
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
  private _tagFields = new LtsStructingTemplateTagFieldsList(this, "tag_fields", false);
  public get tagFields() {
    return this._tagFields;
  }
  public putTagFields(value: LtsStructingTemplateTagFields[] | cdktf.IResolvable) {
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
      id: cdktf.stringToTerraform(this._id),
      log_group_id: cdktf.stringToTerraform(this._logGroupId),
      log_stream_id: cdktf.stringToTerraform(this._logStreamId),
      quick_analysis: cdktf.booleanToTerraform(this._quickAnalysis),
      region: cdktf.stringToTerraform(this._region),
      template_id: cdktf.stringToTerraform(this._templateId),
      template_name: cdktf.stringToTerraform(this._templateName),
      template_type: cdktf.stringToTerraform(this._templateType),
      demo_fields: cdktf.listMapper(ltsStructingTemplateDemoFieldsToTerraform, true)(this._demoFields.internalValue),
      tag_fields: cdktf.listMapper(ltsStructingTemplateTagFieldsToTerraform, true)(this._tagFields.internalValue),
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
      quick_analysis: {
        value: cdktf.booleanToHclTerraform(this._quickAnalysis),
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
      demo_fields: {
        value: cdktf.listMapperHcl(ltsStructingTemplateDemoFieldsToHclTerraform, true)(this._demoFields.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsStructingTemplateDemoFieldsList",
      },
      tag_fields: {
        value: cdktf.listMapperHcl(ltsStructingTemplateTagFieldsToHclTerraform, true)(this._tagFields.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsStructingTemplateTagFieldsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

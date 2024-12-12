// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AccessAnalyzerArchiveRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#analyzer_id AccessAnalyzerArchiveRule#analyzer_id}
  */
  readonly analyzerId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#enable_force_new AccessAnalyzerArchiveRule#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#id AccessAnalyzerArchiveRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#name AccessAnalyzerArchiveRule#name}
  */
  readonly name: string;
  /**
  * filters block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#filters AccessAnalyzerArchiveRule#filters}
  */
  readonly filters: AccessAnalyzerArchiveRuleFilters[] | cdktf.IResolvable;
}
export interface AccessAnalyzerArchiveRuleFiltersCriterion {
  /**
  * Specifies the cluster informations in the mesh.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#contains AccessAnalyzerArchiveRule#contains}
  */
  readonly contains?: string[];
  /**
  * Specifies the cluster informations in the mesh.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#eq AccessAnalyzerArchiveRule#eq}
  */
  readonly eq?: string[];
  /**
  * Specifies the cluster informations in the mesh.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#exists AccessAnalyzerArchiveRule#exists}
  */
  readonly exists?: string;
  /**
  * Specifies the cluster informations in the mesh.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#neq AccessAnalyzerArchiveRule#neq}
  */
  readonly neq?: string[];
}

export function accessAnalyzerArchiveRuleFiltersCriterionToTerraform(struct?: AccessAnalyzerArchiveRuleFiltersCriterionOutputReference | AccessAnalyzerArchiveRuleFiltersCriterion): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    contains: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.contains),
    eq: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.eq),
    exists: cdktf.stringToTerraform(struct!.exists),
    neq: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.neq),
  }
}


export function accessAnalyzerArchiveRuleFiltersCriterionToHclTerraform(struct?: AccessAnalyzerArchiveRuleFiltersCriterionOutputReference | AccessAnalyzerArchiveRuleFiltersCriterion): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    contains: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.contains),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    eq: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.eq),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    exists: {
      value: cdktf.stringToHclTerraform(struct!.exists),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    neq: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.neq),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AccessAnalyzerArchiveRuleFiltersCriterionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AccessAnalyzerArchiveRuleFiltersCriterion | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._contains !== undefined) {
      hasAnyValues = true;
      internalValueResult.contains = this._contains;
    }
    if (this._eq !== undefined) {
      hasAnyValues = true;
      internalValueResult.eq = this._eq;
    }
    if (this._exists !== undefined) {
      hasAnyValues = true;
      internalValueResult.exists = this._exists;
    }
    if (this._neq !== undefined) {
      hasAnyValues = true;
      internalValueResult.neq = this._neq;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AccessAnalyzerArchiveRuleFiltersCriterion | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._contains = undefined;
      this._eq = undefined;
      this._exists = undefined;
      this._neq = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._contains = value.contains;
      this._eq = value.eq;
      this._exists = value.exists;
      this._neq = value.neq;
    }
  }

  // contains - computed: false, optional: true, required: false
  private _contains?: string[]; 
  public get contains() {
    return this.getListAttribute('contains');
  }
  public set contains(value: string[]) {
    this._contains = value;
  }
  public resetContains() {
    this._contains = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get containsInput() {
    return this._contains;
  }

  // eq - computed: false, optional: true, required: false
  private _eq?: string[]; 
  public get eq() {
    return this.getListAttribute('eq');
  }
  public set eq(value: string[]) {
    this._eq = value;
  }
  public resetEq() {
    this._eq = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eqInput() {
    return this._eq;
  }

  // exists - computed: false, optional: true, required: false
  private _exists?: string; 
  public get exists() {
    return this.getStringAttribute('exists');
  }
  public set exists(value: string) {
    this._exists = value;
  }
  public resetExists() {
    this._exists = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get existsInput() {
    return this._exists;
  }

  // neq - computed: false, optional: true, required: false
  private _neq?: string[]; 
  public get neq() {
    return this.getListAttribute('neq');
  }
  public set neq(value: string[]) {
    this._neq = value;
  }
  public resetNeq() {
    this._neq = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get neqInput() {
    return this._neq;
  }
}
export interface AccessAnalyzerArchiveRuleFilters {
  /**
  * Specifies the cluster informations in the mesh.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#key AccessAnalyzerArchiveRule#key}
  */
  readonly key: string;
  /**
  * Specifies the cluster informations in the mesh.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#organization_id AccessAnalyzerArchiveRule#organization_id}
  */
  readonly organizationId?: string;
  /**
  * criterion block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#criterion AccessAnalyzerArchiveRule#criterion}
  */
  readonly criterion: AccessAnalyzerArchiveRuleFiltersCriterion;
}

export function accessAnalyzerArchiveRuleFiltersToTerraform(struct?: AccessAnalyzerArchiveRuleFilters | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
    organization_id: cdktf.stringToTerraform(struct!.organizationId),
    criterion: accessAnalyzerArchiveRuleFiltersCriterionToTerraform(struct!.criterion),
  }
}


export function accessAnalyzerArchiveRuleFiltersToHclTerraform(struct?: AccessAnalyzerArchiveRuleFilters | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    key: {
      value: cdktf.stringToHclTerraform(struct!.key),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    organization_id: {
      value: cdktf.stringToHclTerraform(struct!.organizationId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    criterion: {
      value: accessAnalyzerArchiveRuleFiltersCriterionToHclTerraform(struct!.criterion),
      isBlock: true,
      type: "list",
      storageClassType: "AccessAnalyzerArchiveRuleFiltersCriterionList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AccessAnalyzerArchiveRuleFiltersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AccessAnalyzerArchiveRuleFilters | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._organizationId !== undefined) {
      hasAnyValues = true;
      internalValueResult.organizationId = this._organizationId;
    }
    if (this._criterion?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.criterion = this._criterion?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AccessAnalyzerArchiveRuleFilters | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
      this._organizationId = undefined;
      this._criterion.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._key = value.key;
      this._organizationId = value.organizationId;
      this._criterion.internalValue = value.criterion;
    }
  }

  // key - computed: false, optional: false, required: true
  private _key?: string; 
  public get key() {
    return this.getStringAttribute('key');
  }
  public set key(value: string) {
    this._key = value;
  }
  // Temporarily expose input value. Use with caution.
  public get keyInput() {
    return this._key;
  }

  // organization_id - computed: false, optional: true, required: false
  private _organizationId?: string; 
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }
  public set organizationId(value: string) {
    this._organizationId = value;
  }
  public resetOrganizationId() {
    this._organizationId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get organizationIdInput() {
    return this._organizationId;
  }

  // criterion - computed: false, optional: false, required: true
  private _criterion = new AccessAnalyzerArchiveRuleFiltersCriterionOutputReference(this, "criterion");
  public get criterion() {
    return this._criterion;
  }
  public putCriterion(value: AccessAnalyzerArchiveRuleFiltersCriterion) {
    this._criterion.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get criterionInput() {
    return this._criterion.internalValue;
  }
}

export class AccessAnalyzerArchiveRuleFiltersList extends cdktf.ComplexList {
  public internalValue? : AccessAnalyzerArchiveRuleFilters[] | cdktf.IResolvable

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
  public get(index: number): AccessAnalyzerArchiveRuleFiltersOutputReference {
    return new AccessAnalyzerArchiveRuleFiltersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule huaweicloud_access_analyzer_archive_rule}
*/
export class AccessAnalyzerArchiveRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_access_analyzer_archive_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AccessAnalyzerArchiveRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AccessAnalyzerArchiveRule to import
  * @param importFromId The id of the existing AccessAnalyzerArchiveRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AccessAnalyzerArchiveRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_access_analyzer_archive_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/access_analyzer_archive_rule huaweicloud_access_analyzer_archive_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AccessAnalyzerArchiveRuleConfig
  */
  public constructor(scope: Construct, id: string, config: AccessAnalyzerArchiveRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_access_analyzer_archive_rule',
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
    this._analyzerId = config.analyzerId;
    this._enableForceNew = config.enableForceNew;
    this._id = config.id;
    this._name = config.name;
    this._filters.internalValue = config.filters;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // analyzer_id - computed: false, optional: false, required: true
  private _analyzerId?: string; 
  public get analyzerId() {
    return this.getStringAttribute('analyzer_id');
  }
  public set analyzerId(value: string) {
    this._analyzerId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get analyzerIdInput() {
    return this._analyzerId;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // urn - computed: true, optional: false, required: false
  public get urn() {
    return this.getStringAttribute('urn');
  }

  // filters - computed: false, optional: false, required: true
  private _filters = new AccessAnalyzerArchiveRuleFiltersList(this, "filters", false);
  public get filters() {
    return this._filters;
  }
  public putFilters(value: AccessAnalyzerArchiveRuleFilters[] | cdktf.IResolvable) {
    this._filters.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get filtersInput() {
    return this._filters.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      analyzer_id: cdktf.stringToTerraform(this._analyzerId),
      enable_force_new: cdktf.stringToTerraform(this._enableForceNew),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      filters: cdktf.listMapper(accessAnalyzerArchiveRuleFiltersToTerraform, true)(this._filters.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      analyzer_id: {
        value: cdktf.stringToHclTerraform(this._analyzerId),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      filters: {
        value: cdktf.listMapperHcl(accessAnalyzerArchiveRuleFiltersToHclTerraform, true)(this._filters.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AccessAnalyzerArchiveRuleFiltersList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

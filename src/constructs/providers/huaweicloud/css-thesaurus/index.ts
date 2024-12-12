// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CssThesaurusConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#bucket_name CssThesaurus#bucket_name}
  */
  readonly bucketName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#cluster_id CssThesaurus#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#id CssThesaurus#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#main_object CssThesaurus#main_object}
  */
  readonly mainObject?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#region CssThesaurus#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#stop_object CssThesaurus#stop_object}
  */
  readonly stopObject?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#synonym_object CssThesaurus#synonym_object}
  */
  readonly synonymObject?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#timeouts CssThesaurus#timeouts}
  */
  readonly timeouts?: CssThesaurusTimeouts;
}
export interface CssThesaurusTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#create CssThesaurus#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#delete CssThesaurus#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#update CssThesaurus#update}
  */
  readonly update?: string;
}

export function cssThesaurusTimeoutsToTerraform(struct?: CssThesaurusTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function cssThesaurusTimeoutsToHclTerraform(struct?: CssThesaurusTimeouts | cdktf.IResolvable): any {
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
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssThesaurusTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CssThesaurusTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssThesaurusTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
      this._update = value.update;
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

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus huaweicloud_css_thesaurus}
*/
export class CssThesaurus extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_css_thesaurus";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CssThesaurus resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CssThesaurus to import
  * @param importFromId The id of the existing CssThesaurus that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CssThesaurus to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_css_thesaurus", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_thesaurus huaweicloud_css_thesaurus} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CssThesaurusConfig
  */
  public constructor(scope: Construct, id: string, config: CssThesaurusConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_css_thesaurus',
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
    this._bucketName = config.bucketName;
    this._clusterId = config.clusterId;
    this._id = config.id;
    this._mainObject = config.mainObject;
    this._region = config.region;
    this._stopObject = config.stopObject;
    this._synonymObject = config.synonymObject;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bucket_name - computed: false, optional: false, required: true
  private _bucketName?: string; 
  public get bucketName() {
    return this.getStringAttribute('bucket_name');
  }
  public set bucketName(value: string) {
    this._bucketName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketNameInput() {
    return this._bucketName;
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

  // main_object - computed: true, optional: true, required: false
  private _mainObject?: string; 
  public get mainObject() {
    return this.getStringAttribute('main_object');
  }
  public set mainObject(value: string) {
    this._mainObject = value;
  }
  public resetMainObject() {
    this._mainObject = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mainObjectInput() {
    return this._mainObject;
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
    return this.getStringAttribute('status');
  }

  // stop_object - computed: true, optional: true, required: false
  private _stopObject?: string; 
  public get stopObject() {
    return this.getStringAttribute('stop_object');
  }
  public set stopObject(value: string) {
    this._stopObject = value;
  }
  public resetStopObject() {
    this._stopObject = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get stopObjectInput() {
    return this._stopObject;
  }

  // synonym_object - computed: true, optional: true, required: false
  private _synonymObject?: string; 
  public get synonymObject() {
    return this.getStringAttribute('synonym_object');
  }
  public set synonymObject(value: string) {
    this._synonymObject = value;
  }
  public resetSynonymObject() {
    this._synonymObject = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get synonymObjectInput() {
    return this._synonymObject;
  }

  // update_time - computed: true, optional: false, required: false
  public get updateTime() {
    return this.getStringAttribute('update_time');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CssThesaurusTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CssThesaurusTimeouts) {
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
      bucket_name: cdktf.stringToTerraform(this._bucketName),
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      id: cdktf.stringToTerraform(this._id),
      main_object: cdktf.stringToTerraform(this._mainObject),
      region: cdktf.stringToTerraform(this._region),
      stop_object: cdktf.stringToTerraform(this._stopObject),
      synonym_object: cdktf.stringToTerraform(this._synonymObject),
      timeouts: cssThesaurusTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      bucket_name: {
        value: cdktf.stringToHclTerraform(this._bucketName),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      main_object: {
        value: cdktf.stringToHclTerraform(this._mainObject),
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
      stop_object: {
        value: cdktf.stringToHclTerraform(this._stopObject),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      synonym_object: {
        value: cdktf.stringToHclTerraform(this._synonymObject),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: cssThesaurusTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CssThesaurusTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CssLogstashConfigurationConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#cluster_id CssLogstashConfiguration#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#conf_content CssLogstashConfiguration#conf_content}
  */
  readonly confContent: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#id CssLogstashConfiguration#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#name CssLogstashConfiguration#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#region CssLogstashConfiguration#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#sensitive_words CssLogstashConfiguration#sensitive_words}
  */
  readonly sensitiveWords?: string[];
  /**
  * setting block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#setting CssLogstashConfiguration#setting}
  */
  readonly setting: CssLogstashConfigurationSetting;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#timeouts CssLogstashConfiguration#timeouts}
  */
  readonly timeouts?: CssLogstashConfigurationTimeouts;
}
export interface CssLogstashConfigurationSetting {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#batch_delay_ms CssLogstashConfiguration#batch_delay_ms}
  */
  readonly batchDelayMs?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#batch_size CssLogstashConfiguration#batch_size}
  */
  readonly batchSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#queue_check_point_writes CssLogstashConfiguration#queue_check_point_writes}
  */
  readonly queueCheckPointWrites?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#queue_max_bytes_mb CssLogstashConfiguration#queue_max_bytes_mb}
  */
  readonly queueMaxBytesMb?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#queue_type CssLogstashConfiguration#queue_type}
  */
  readonly queueType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#workers CssLogstashConfiguration#workers}
  */
  readonly workers?: number;
}

export function cssLogstashConfigurationSettingToTerraform(struct?: CssLogstashConfigurationSettingOutputReference | CssLogstashConfigurationSetting): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    batch_delay_ms: cdktf.numberToTerraform(struct!.batchDelayMs),
    batch_size: cdktf.numberToTerraform(struct!.batchSize),
    queue_check_point_writes: cdktf.numberToTerraform(struct!.queueCheckPointWrites),
    queue_max_bytes_mb: cdktf.numberToTerraform(struct!.queueMaxBytesMb),
    queue_type: cdktf.stringToTerraform(struct!.queueType),
    workers: cdktf.numberToTerraform(struct!.workers),
  }
}


export function cssLogstashConfigurationSettingToHclTerraform(struct?: CssLogstashConfigurationSettingOutputReference | CssLogstashConfigurationSetting): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    batch_delay_ms: {
      value: cdktf.numberToHclTerraform(struct!.batchDelayMs),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    batch_size: {
      value: cdktf.numberToHclTerraform(struct!.batchSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    queue_check_point_writes: {
      value: cdktf.numberToHclTerraform(struct!.queueCheckPointWrites),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    queue_max_bytes_mb: {
      value: cdktf.numberToHclTerraform(struct!.queueMaxBytesMb),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    queue_type: {
      value: cdktf.stringToHclTerraform(struct!.queueType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    workers: {
      value: cdktf.numberToHclTerraform(struct!.workers),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CssLogstashConfigurationSettingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CssLogstashConfigurationSetting | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._batchDelayMs !== undefined) {
      hasAnyValues = true;
      internalValueResult.batchDelayMs = this._batchDelayMs;
    }
    if (this._batchSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.batchSize = this._batchSize;
    }
    if (this._queueCheckPointWrites !== undefined) {
      hasAnyValues = true;
      internalValueResult.queueCheckPointWrites = this._queueCheckPointWrites;
    }
    if (this._queueMaxBytesMb !== undefined) {
      hasAnyValues = true;
      internalValueResult.queueMaxBytesMb = this._queueMaxBytesMb;
    }
    if (this._queueType !== undefined) {
      hasAnyValues = true;
      internalValueResult.queueType = this._queueType;
    }
    if (this._workers !== undefined) {
      hasAnyValues = true;
      internalValueResult.workers = this._workers;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssLogstashConfigurationSetting | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._batchDelayMs = undefined;
      this._batchSize = undefined;
      this._queueCheckPointWrites = undefined;
      this._queueMaxBytesMb = undefined;
      this._queueType = undefined;
      this._workers = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._batchDelayMs = value.batchDelayMs;
      this._batchSize = value.batchSize;
      this._queueCheckPointWrites = value.queueCheckPointWrites;
      this._queueMaxBytesMb = value.queueMaxBytesMb;
      this._queueType = value.queueType;
      this._workers = value.workers;
    }
  }

  // batch_delay_ms - computed: false, optional: true, required: false
  private _batchDelayMs?: number; 
  public get batchDelayMs() {
    return this.getNumberAttribute('batch_delay_ms');
  }
  public set batchDelayMs(value: number) {
    this._batchDelayMs = value;
  }
  public resetBatchDelayMs() {
    this._batchDelayMs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get batchDelayMsInput() {
    return this._batchDelayMs;
  }

  // batch_size - computed: false, optional: true, required: false
  private _batchSize?: number; 
  public get batchSize() {
    return this.getNumberAttribute('batch_size');
  }
  public set batchSize(value: number) {
    this._batchSize = value;
  }
  public resetBatchSize() {
    this._batchSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get batchSizeInput() {
    return this._batchSize;
  }

  // queue_check_point_writes - computed: false, optional: true, required: false
  private _queueCheckPointWrites?: number; 
  public get queueCheckPointWrites() {
    return this.getNumberAttribute('queue_check_point_writes');
  }
  public set queueCheckPointWrites(value: number) {
    this._queueCheckPointWrites = value;
  }
  public resetQueueCheckPointWrites() {
    this._queueCheckPointWrites = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queueCheckPointWritesInput() {
    return this._queueCheckPointWrites;
  }

  // queue_max_bytes_mb - computed: false, optional: true, required: false
  private _queueMaxBytesMb?: number; 
  public get queueMaxBytesMb() {
    return this.getNumberAttribute('queue_max_bytes_mb');
  }
  public set queueMaxBytesMb(value: number) {
    this._queueMaxBytesMb = value;
  }
  public resetQueueMaxBytesMb() {
    this._queueMaxBytesMb = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queueMaxBytesMbInput() {
    return this._queueMaxBytesMb;
  }

  // queue_type - computed: false, optional: false, required: true
  private _queueType?: string; 
  public get queueType() {
    return this.getStringAttribute('queue_type');
  }
  public set queueType(value: string) {
    this._queueType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get queueTypeInput() {
    return this._queueType;
  }

  // workers - computed: false, optional: true, required: false
  private _workers?: number; 
  public get workers() {
    return this.getNumberAttribute('workers');
  }
  public set workers(value: number) {
    this._workers = value;
  }
  public resetWorkers() {
    this._workers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get workersInput() {
    return this._workers;
  }
}
export interface CssLogstashConfigurationTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#create CssLogstashConfiguration#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#update CssLogstashConfiguration#update}
  */
  readonly update?: string;
}

export function cssLogstashConfigurationTimeoutsToTerraform(struct?: CssLogstashConfigurationTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function cssLogstashConfigurationTimeoutsToHclTerraform(struct?: CssLogstashConfigurationTimeouts | cdktf.IResolvable): any {
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

export class CssLogstashConfigurationTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CssLogstashConfigurationTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CssLogstashConfigurationTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration huaweicloud_css_logstash_configuration}
*/
export class CssLogstashConfiguration extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_css_logstash_configuration";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CssLogstashConfiguration resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CssLogstashConfiguration to import
  * @param importFromId The id of the existing CssLogstashConfiguration that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CssLogstashConfiguration to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_css_logstash_configuration", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/css_logstash_configuration huaweicloud_css_logstash_configuration} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CssLogstashConfigurationConfig
  */
  public constructor(scope: Construct, id: string, config: CssLogstashConfigurationConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_css_logstash_configuration',
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
    this._clusterId = config.clusterId;
    this._confContent = config.confContent;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._sensitiveWords = config.sensitiveWords;
    this._setting.internalValue = config.setting;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // conf_content - computed: false, optional: false, required: true
  private _confContent?: string; 
  public get confContent() {
    return this.getStringAttribute('conf_content');
  }
  public set confContent(value: string) {
    this._confContent = value;
  }
  // Temporarily expose input value. Use with caution.
  public get confContentInput() {
    return this._confContent;
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

  // sensitive_words - computed: false, optional: true, required: false
  private _sensitiveWords?: string[]; 
  public get sensitiveWords() {
    return this.getListAttribute('sensitive_words');
  }
  public set sensitiveWords(value: string[]) {
    this._sensitiveWords = value;
  }
  public resetSensitiveWords() {
    this._sensitiveWords = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sensitiveWordsInput() {
    return this._sensitiveWords;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // setting - computed: false, optional: false, required: true
  private _setting = new CssLogstashConfigurationSettingOutputReference(this, "setting");
  public get setting() {
    return this._setting;
  }
  public putSetting(value: CssLogstashConfigurationSetting) {
    this._setting.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get settingInput() {
    return this._setting.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CssLogstashConfigurationTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CssLogstashConfigurationTimeouts) {
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
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      conf_content: cdktf.stringToTerraform(this._confContent),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      sensitive_words: cdktf.listMapper(cdktf.stringToTerraform, false)(this._sensitiveWords),
      setting: cssLogstashConfigurationSettingToTerraform(this._setting.internalValue),
      timeouts: cssLogstashConfigurationTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      conf_content: {
        value: cdktf.stringToHclTerraform(this._confContent),
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
      sensitive_words: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._sensitiveWords),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      setting: {
        value: cssLogstashConfigurationSettingToHclTerraform(this._setting.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CssLogstashConfigurationSettingList",
      },
      timeouts: {
        value: cssLogstashConfigurationTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CssLogstashConfigurationTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

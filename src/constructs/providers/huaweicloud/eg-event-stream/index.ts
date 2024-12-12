// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface EgEventStreamConfig extends cdktf.TerraformMetaArguments {
  /**
  * The desired running status of the event stream.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#action EgEventStream#action}
  */
  readonly action?: string;
  /**
  * The description of the event stream.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#description EgEventStream#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#id EgEventStream#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the event stream.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#name EgEventStream#name}
  */
  readonly name: string;
  /**
  * The region where the event stream is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#region EgEventStream#region}
  */
  readonly region?: string;
  /**
  * option block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#option EgEventStream#option}
  */
  readonly option: EgEventStreamOption;
  /**
  * rule_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#rule_config EgEventStream#rule_config}
  */
  readonly ruleConfig: EgEventStreamRuleConfig;
  /**
  * sink block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#sink EgEventStream#sink}
  */
  readonly sink: EgEventStreamSink;
  /**
  * source block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#source EgEventStream#source}
  */
  readonly source: EgEventStreamSource;
}
export interface EgEventStreamOptionBatchWindow {
  /**
  * The number of items pushed in batches.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#count EgEventStream#count}
  */
  readonly count: number;
  /**
  * The interval of the batch push.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#interval EgEventStream#interval}
  */
  readonly interval?: number;
  /**
  * The number of retries.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#time EgEventStream#time}
  */
  readonly time?: number;
}

export function egEventStreamOptionBatchWindowToTerraform(struct?: EgEventStreamOptionBatchWindowOutputReference | EgEventStreamOptionBatchWindow): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    count: cdktf.numberToTerraform(struct!.count),
    interval: cdktf.numberToTerraform(struct!.interval),
    time: cdktf.numberToTerraform(struct!.time),
  }
}


export function egEventStreamOptionBatchWindowToHclTerraform(struct?: EgEventStreamOptionBatchWindowOutputReference | EgEventStreamOptionBatchWindow): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    count: {
      value: cdktf.numberToHclTerraform(struct!.count),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    interval: {
      value: cdktf.numberToHclTerraform(struct!.interval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    time: {
      value: cdktf.numberToHclTerraform(struct!.time),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EgEventStreamOptionBatchWindowOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EgEventStreamOptionBatchWindow | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._count !== undefined) {
      hasAnyValues = true;
      internalValueResult.count = this._count;
    }
    if (this._interval !== undefined) {
      hasAnyValues = true;
      internalValueResult.interval = this._interval;
    }
    if (this._time !== undefined) {
      hasAnyValues = true;
      internalValueResult.time = this._time;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EgEventStreamOptionBatchWindow | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._count = undefined;
      this._interval = undefined;
      this._time = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._count = value.count;
      this._interval = value.interval;
      this._time = value.time;
    }
  }

  // count - computed: false, optional: false, required: true
  private _count?: number; 
  public get count() {
    return this.getNumberAttribute('count');
  }
  public set count(value: number) {
    this._count = value;
  }
  // Temporarily expose input value. Use with caution.
  public get countInput() {
    return this._count;
  }

  // interval - computed: true, optional: true, required: false
  private _interval?: number; 
  public get interval() {
    return this.getNumberAttribute('interval');
  }
  public set interval(value: number) {
    this._interval = value;
  }
  public resetInterval() {
    this._interval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get intervalInput() {
    return this._interval;
  }

  // time - computed: true, optional: true, required: false
  private _time?: number; 
  public get time() {
    return this.getNumberAttribute('time');
  }
  public set time(value: number) {
    this._time = value;
  }
  public resetTime() {
    this._time = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeInput() {
    return this._time;
  }
}
export interface EgEventStreamOption {
  /**
  * The number of concurrent threads.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#thread_num EgEventStream#thread_num}
  */
  readonly threadNum: number;
  /**
  * batch_window block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#batch_window EgEventStream#batch_window}
  */
  readonly batchWindow: EgEventStreamOptionBatchWindow;
}

export function egEventStreamOptionToTerraform(struct?: EgEventStreamOptionOutputReference | EgEventStreamOption): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    thread_num: cdktf.numberToTerraform(struct!.threadNum),
    batch_window: egEventStreamOptionBatchWindowToTerraform(struct!.batchWindow),
  }
}


export function egEventStreamOptionToHclTerraform(struct?: EgEventStreamOptionOutputReference | EgEventStreamOption): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    thread_num: {
      value: cdktf.numberToHclTerraform(struct!.threadNum),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    batch_window: {
      value: egEventStreamOptionBatchWindowToHclTerraform(struct!.batchWindow),
      isBlock: true,
      type: "list",
      storageClassType: "EgEventStreamOptionBatchWindowList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EgEventStreamOptionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EgEventStreamOption | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._threadNum !== undefined) {
      hasAnyValues = true;
      internalValueResult.threadNum = this._threadNum;
    }
    if (this._batchWindow?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.batchWindow = this._batchWindow?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EgEventStreamOption | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._threadNum = undefined;
      this._batchWindow.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._threadNum = value.threadNum;
      this._batchWindow.internalValue = value.batchWindow;
    }
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

  // batch_window - computed: false, optional: false, required: true
  private _batchWindow = new EgEventStreamOptionBatchWindowOutputReference(this, "batch_window");
  public get batchWindow() {
    return this._batchWindow;
  }
  public putBatchWindow(value: EgEventStreamOptionBatchWindow) {
    this._batchWindow.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get batchWindowInput() {
    return this._batchWindow.internalValue;
  }
}
export interface EgEventStreamRuleConfigTransform {
  /**
  * The template definition of the rule content.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#template EgEventStream#template}
  */
  readonly template?: string;
  /**
  * The type of transform rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#type EgEventStream#type}
  */
  readonly type: string;
  /**
  * The rule content definition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#value EgEventStream#value}
  */
  readonly value?: string;
}

export function egEventStreamRuleConfigTransformToTerraform(struct?: EgEventStreamRuleConfigTransformOutputReference | EgEventStreamRuleConfigTransform): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    template: cdktf.stringToTerraform(struct!.template),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function egEventStreamRuleConfigTransformToHclTerraform(struct?: EgEventStreamRuleConfigTransformOutputReference | EgEventStreamRuleConfigTransform): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    template: {
      value: cdktf.stringToHclTerraform(struct!.template),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EgEventStreamRuleConfigTransformOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EgEventStreamRuleConfigTransform | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._template !== undefined) {
      hasAnyValues = true;
      internalValueResult.template = this._template;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EgEventStreamRuleConfigTransform | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._template = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._template = value.template;
      this._type = value.type;
      this._value = value.value;
    }
  }

  // template - computed: true, optional: true, required: false
  private _template?: string; 
  public get template() {
    return this.getStringAttribute('template');
  }
  public set template(value: string) {
    this._template = value;
  }
  public resetTemplate() {
    this._template = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateInput() {
    return this._template;
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

  // value - computed: true, optional: true, required: false
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  public resetValue() {
    this._value = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}
export interface EgEventStreamRuleConfig {
  /**
  * The configuration detail of the filter rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#filter EgEventStream#filter}
  */
  readonly filter?: string;
  /**
  * transform block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#transform EgEventStream#transform}
  */
  readonly transform: EgEventStreamRuleConfigTransform;
}

export function egEventStreamRuleConfigToTerraform(struct?: EgEventStreamRuleConfigOutputReference | EgEventStreamRuleConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    filter: cdktf.stringToTerraform(struct!.filter),
    transform: egEventStreamRuleConfigTransformToTerraform(struct!.transform),
  }
}


export function egEventStreamRuleConfigToHclTerraform(struct?: EgEventStreamRuleConfigOutputReference | EgEventStreamRuleConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    filter: {
      value: cdktf.stringToHclTerraform(struct!.filter),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    transform: {
      value: egEventStreamRuleConfigTransformToHclTerraform(struct!.transform),
      isBlock: true,
      type: "list",
      storageClassType: "EgEventStreamRuleConfigTransformList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EgEventStreamRuleConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EgEventStreamRuleConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._filter !== undefined) {
      hasAnyValues = true;
      internalValueResult.filter = this._filter;
    }
    if (this._transform?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.transform = this._transform?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EgEventStreamRuleConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._filter = undefined;
      this._transform.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._filter = value.filter;
      this._transform.internalValue = value.transform;
    }
  }

  // filter - computed: true, optional: true, required: false
  private _filter?: string; 
  public get filter() {
    return this.getStringAttribute('filter');
  }
  public set filter(value: string) {
    this._filter = value;
  }
  public resetFilter() {
    this._filter = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get filterInput() {
    return this._filter;
  }

  // transform - computed: false, optional: false, required: true
  private _transform = new EgEventStreamRuleConfigTransformOutputReference(this, "transform");
  public get transform() {
    return this._transform;
  }
  public putTransform(value: EgEventStreamRuleConfigTransform) {
    this._transform.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get transformInput() {
    return this._transform.internalValue;
  }
}
export interface EgEventStreamSink {
  /**
  * The event target configuration detail for FunctionGraph type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#functiongraph EgEventStream#functiongraph}
  */
  readonly functiongraph?: string;
  /**
  * The event target configuration detail for DMS Kafka type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#kafka EgEventStream#kafka}
  */
  readonly kafka?: string;
  /**
  * The name of the event target type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#name EgEventStream#name}
  */
  readonly name: string;
}

export function egEventStreamSinkToTerraform(struct?: EgEventStreamSinkOutputReference | EgEventStreamSink): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    functiongraph: cdktf.stringToTerraform(struct!.functiongraph),
    kafka: cdktf.stringToTerraform(struct!.kafka),
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function egEventStreamSinkToHclTerraform(struct?: EgEventStreamSinkOutputReference | EgEventStreamSink): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    functiongraph: {
      value: cdktf.stringToHclTerraform(struct!.functiongraph),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    kafka: {
      value: cdktf.stringToHclTerraform(struct!.kafka),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EgEventStreamSinkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EgEventStreamSink | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._functiongraph !== undefined) {
      hasAnyValues = true;
      internalValueResult.functiongraph = this._functiongraph;
    }
    if (this._kafka !== undefined) {
      hasAnyValues = true;
      internalValueResult.kafka = this._kafka;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EgEventStreamSink | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._functiongraph = undefined;
      this._kafka = undefined;
      this._name = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._functiongraph = value.functiongraph;
      this._kafka = value.kafka;
      this._name = value.name;
    }
  }

  // functiongraph - computed: false, optional: true, required: false
  private _functiongraph?: string; 
  public get functiongraph() {
    return this.getStringAttribute('functiongraph');
  }
  public set functiongraph(value: string) {
    this._functiongraph = value;
  }
  public resetFunctiongraph() {
    this._functiongraph = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get functiongraphInput() {
    return this._functiongraph;
  }

  // kafka - computed: false, optional: true, required: false
  private _kafka?: string; 
  public get kafka() {
    return this.getStringAttribute('kafka');
  }
  public set kafka(value: string) {
    this._kafka = value;
  }
  public resetKafka() {
    this._kafka = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaInput() {
    return this._kafka;
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
}
export interface EgEventStreamSource {
  /**
  * The event source configuration detail for community RocketMQ type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#community_rocketmq EgEventStream#community_rocketmq}
  */
  readonly communityRocketmq?: string;
  /**
  * The event source configuration detail for DMS RocketMQ type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#dms_rocketmq EgEventStream#dms_rocketmq}
  */
  readonly dmsRocketmq?: string;
  /**
  * The event source configuration detail for DMS Kafka type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#kafka EgEventStream#kafka}
  */
  readonly kafka?: string;
  /**
  * The event source configuration detail for mobile RocketMQ type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#mobile_rocketmq EgEventStream#mobile_rocketmq}
  */
  readonly mobileRocketmq?: string;
  /**
  * The name of the event source type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#name EgEventStream#name}
  */
  readonly name: string;
}

export function egEventStreamSourceToTerraform(struct?: EgEventStreamSourceOutputReference | EgEventStreamSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    community_rocketmq: cdktf.stringToTerraform(struct!.communityRocketmq),
    dms_rocketmq: cdktf.stringToTerraform(struct!.dmsRocketmq),
    kafka: cdktf.stringToTerraform(struct!.kafka),
    mobile_rocketmq: cdktf.stringToTerraform(struct!.mobileRocketmq),
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function egEventStreamSourceToHclTerraform(struct?: EgEventStreamSourceOutputReference | EgEventStreamSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    community_rocketmq: {
      value: cdktf.stringToHclTerraform(struct!.communityRocketmq),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    dms_rocketmq: {
      value: cdktf.stringToHclTerraform(struct!.dmsRocketmq),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    kafka: {
      value: cdktf.stringToHclTerraform(struct!.kafka),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mobile_rocketmq: {
      value: cdktf.stringToHclTerraform(struct!.mobileRocketmq),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EgEventStreamSourceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EgEventStreamSource | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._communityRocketmq !== undefined) {
      hasAnyValues = true;
      internalValueResult.communityRocketmq = this._communityRocketmq;
    }
    if (this._dmsRocketmq !== undefined) {
      hasAnyValues = true;
      internalValueResult.dmsRocketmq = this._dmsRocketmq;
    }
    if (this._kafka !== undefined) {
      hasAnyValues = true;
      internalValueResult.kafka = this._kafka;
    }
    if (this._mobileRocketmq !== undefined) {
      hasAnyValues = true;
      internalValueResult.mobileRocketmq = this._mobileRocketmq;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EgEventStreamSource | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._communityRocketmq = undefined;
      this._dmsRocketmq = undefined;
      this._kafka = undefined;
      this._mobileRocketmq = undefined;
      this._name = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._communityRocketmq = value.communityRocketmq;
      this._dmsRocketmq = value.dmsRocketmq;
      this._kafka = value.kafka;
      this._mobileRocketmq = value.mobileRocketmq;
      this._name = value.name;
    }
  }

  // community_rocketmq - computed: false, optional: true, required: false
  private _communityRocketmq?: string; 
  public get communityRocketmq() {
    return this.getStringAttribute('community_rocketmq');
  }
  public set communityRocketmq(value: string) {
    this._communityRocketmq = value;
  }
  public resetCommunityRocketmq() {
    this._communityRocketmq = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get communityRocketmqInput() {
    return this._communityRocketmq;
  }

  // dms_rocketmq - computed: false, optional: true, required: false
  private _dmsRocketmq?: string; 
  public get dmsRocketmq() {
    return this.getStringAttribute('dms_rocketmq');
  }
  public set dmsRocketmq(value: string) {
    this._dmsRocketmq = value;
  }
  public resetDmsRocketmq() {
    this._dmsRocketmq = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dmsRocketmqInput() {
    return this._dmsRocketmq;
  }

  // kafka - computed: false, optional: true, required: false
  private _kafka?: string; 
  public get kafka() {
    return this.getStringAttribute('kafka');
  }
  public set kafka(value: string) {
    this._kafka = value;
  }
  public resetKafka() {
    this._kafka = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaInput() {
    return this._kafka;
  }

  // mobile_rocketmq - computed: false, optional: true, required: false
  private _mobileRocketmq?: string; 
  public get mobileRocketmq() {
    return this.getStringAttribute('mobile_rocketmq');
  }
  public set mobileRocketmq(value: string) {
    this._mobileRocketmq = value;
  }
  public resetMobileRocketmq() {
    this._mobileRocketmq = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mobileRocketmqInput() {
    return this._mobileRocketmq;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream huaweicloud_eg_event_stream}
*/
export class EgEventStream extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_eg_event_stream";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a EgEventStream resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the EgEventStream to import
  * @param importFromId The id of the existing EgEventStream that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the EgEventStream to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_eg_event_stream", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/eg_event_stream huaweicloud_eg_event_stream} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options EgEventStreamConfig
  */
  public constructor(scope: Construct, id: string, config: EgEventStreamConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_eg_event_stream',
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
    this._action = config.action;
    this._description = config.description;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._option.internalValue = config.option;
    this._ruleConfig.internalValue = config.ruleConfig;
    this._sink.internalValue = config.sink;
    this._source.internalValue = config.source;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action - computed: true, optional: true, required: false
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  public resetAction() {
    this._action = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // option - computed: false, optional: false, required: true
  private _option = new EgEventStreamOptionOutputReference(this, "option");
  public get option() {
    return this._option;
  }
  public putOption(value: EgEventStreamOption) {
    this._option.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get optionInput() {
    return this._option.internalValue;
  }

  // rule_config - computed: false, optional: false, required: true
  private _ruleConfig = new EgEventStreamRuleConfigOutputReference(this, "rule_config");
  public get ruleConfig() {
    return this._ruleConfig;
  }
  public putRuleConfig(value: EgEventStreamRuleConfig) {
    this._ruleConfig.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleConfigInput() {
    return this._ruleConfig.internalValue;
  }

  // sink - computed: false, optional: false, required: true
  private _sink = new EgEventStreamSinkOutputReference(this, "sink");
  public get sink() {
    return this._sink;
  }
  public putSink(value: EgEventStreamSink) {
    this._sink.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sinkInput() {
    return this._sink.internalValue;
  }

  // source - computed: false, optional: false, required: true
  private _source = new EgEventStreamSourceOutputReference(this, "source");
  public get source() {
    return this._source;
  }
  public putSource(value: EgEventStreamSource) {
    this._source.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceInput() {
    return this._source.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      action: cdktf.stringToTerraform(this._action),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      option: egEventStreamOptionToTerraform(this._option.internalValue),
      rule_config: egEventStreamRuleConfigToTerraform(this._ruleConfig.internalValue),
      sink: egEventStreamSinkToTerraform(this._sink.internalValue),
      source: egEventStreamSourceToTerraform(this._source.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      action: {
        value: cdktf.stringToHclTerraform(this._action),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
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
      option: {
        value: egEventStreamOptionToHclTerraform(this._option.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "EgEventStreamOptionList",
      },
      rule_config: {
        value: egEventStreamRuleConfigToHclTerraform(this._ruleConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "EgEventStreamRuleConfigList",
      },
      sink: {
        value: egEventStreamSinkToHclTerraform(this._sink.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "EgEventStreamSinkList",
      },
      source: {
        value: egEventStreamSourceToHclTerraform(this._source.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "EgEventStreamSourceList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

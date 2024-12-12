// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CodeartsInspectorWebsiteScanConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies whether to perform CVE vulnerability scanning.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#cve_check CodeartsInspectorWebsiteScan#cve_check}
  */
  readonly cveCheck?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#id CodeartsInspectorWebsiteScan#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies whether to perform malicious code scanning.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#malicious_code CodeartsInspectorWebsiteScan#malicious_code}
  */
  readonly maliciousCode?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether to perform link health detection.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#malicious_link CodeartsInspectorWebsiteScan#malicious_link}
  */
  readonly maliciousLink?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether to conduct website content compliance image detection.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#picture_check CodeartsInspectorWebsiteScan#picture_check}
  */
  readonly pictureCheck?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether to perform port scanning.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#port_scan CodeartsInspectorWebsiteScan#port_scan}
  */
  readonly portScan?: boolean | cdktf.IResolvable;
  /**
  * Specifies the task scan mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#scan_mode CodeartsInspectorWebsiteScan#scan_mode}
  */
  readonly scanMode?: string;
  /**
  * Specifies the task name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#task_name CodeartsInspectorWebsiteScan#task_name}
  */
  readonly taskName: string;
  /**
  * Specifies the scheduled trigger period of the monitor task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#task_period CodeartsInspectorWebsiteScan#task_period}
  */
  readonly taskPeriod?: string;
  /**
  * Specifies the task type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#task_type CodeartsInspectorWebsiteScan#task_type}
  */
  readonly taskType?: string;
  /**
  * Specifies whether to conduct website content compliance text detection.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#text_check CodeartsInspectorWebsiteScan#text_check}
  */
  readonly textCheck?: boolean | cdktf.IResolvable;
  /**
  * Specifies the scheduled trigger time of the normal task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#timer CodeartsInspectorWebsiteScan#timer}
  */
  readonly timer?: string;
  /**
  * Specifies the scheduled trigger time of the monitor task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#trigger_time CodeartsInspectorWebsiteScan#trigger_time}
  */
  readonly triggerTime?: string;
  /**
  * Specifies the URL.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#url CodeartsInspectorWebsiteScan#url}
  */
  readonly url: string;
  /**
  * Specifies whether to scan for weak passwords.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#weak_pwd_scan CodeartsInspectorWebsiteScan#weak_pwd_scan}
  */
  readonly weakPwdScan?: boolean | cdktf.IResolvable;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan huaweicloud_codearts_inspector_website_scan}
*/
export class CodeartsInspectorWebsiteScan extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_codearts_inspector_website_scan";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CodeartsInspectorWebsiteScan resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CodeartsInspectorWebsiteScan to import
  * @param importFromId The id of the existing CodeartsInspectorWebsiteScan that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CodeartsInspectorWebsiteScan to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_codearts_inspector_website_scan", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website_scan huaweicloud_codearts_inspector_website_scan} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CodeartsInspectorWebsiteScanConfig
  */
  public constructor(scope: Construct, id: string, config: CodeartsInspectorWebsiteScanConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_codearts_inspector_website_scan',
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
    this._cveCheck = config.cveCheck;
    this._id = config.id;
    this._maliciousCode = config.maliciousCode;
    this._maliciousLink = config.maliciousLink;
    this._pictureCheck = config.pictureCheck;
    this._portScan = config.portScan;
    this._scanMode = config.scanMode;
    this._taskName = config.taskName;
    this._taskPeriod = config.taskPeriod;
    this._taskType = config.taskType;
    this._textCheck = config.textCheck;
    this._timer = config.timer;
    this._triggerTime = config.triggerTime;
    this._url = config.url;
    this._weakPwdScan = config.weakPwdScan;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // cve_check - computed: true, optional: true, required: false
  private _cveCheck?: boolean | cdktf.IResolvable; 
  public get cveCheck() {
    return this.getBooleanAttribute('cve_check');
  }
  public set cveCheck(value: boolean | cdktf.IResolvable) {
    this._cveCheck = value;
  }
  public resetCveCheck() {
    this._cveCheck = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cveCheckInput() {
    return this._cveCheck;
  }

  // high - computed: true, optional: false, required: false
  public get high() {
    return this.getNumberAttribute('high');
  }

  // hint - computed: true, optional: false, required: false
  public get hint() {
    return this.getNumberAttribute('hint');
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

  // low - computed: true, optional: false, required: false
  public get low() {
    return this.getNumberAttribute('low');
  }

  // malicious_code - computed: true, optional: true, required: false
  private _maliciousCode?: boolean | cdktf.IResolvable; 
  public get maliciousCode() {
    return this.getBooleanAttribute('malicious_code');
  }
  public set maliciousCode(value: boolean | cdktf.IResolvable) {
    this._maliciousCode = value;
  }
  public resetMaliciousCode() {
    this._maliciousCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maliciousCodeInput() {
    return this._maliciousCode;
  }

  // malicious_link - computed: true, optional: true, required: false
  private _maliciousLink?: boolean | cdktf.IResolvable; 
  public get maliciousLink() {
    return this.getBooleanAttribute('malicious_link');
  }
  public set maliciousLink(value: boolean | cdktf.IResolvable) {
    this._maliciousLink = value;
  }
  public resetMaliciousLink() {
    this._maliciousLink = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maliciousLinkInput() {
    return this._maliciousLink;
  }

  // middle - computed: true, optional: false, required: false
  public get middle() {
    return this.getNumberAttribute('middle');
  }

  // pack_num - computed: true, optional: false, required: false
  public get packNum() {
    return this.getNumberAttribute('pack_num');
  }

  // picture_check - computed: true, optional: true, required: false
  private _pictureCheck?: boolean | cdktf.IResolvable; 
  public get pictureCheck() {
    return this.getBooleanAttribute('picture_check');
  }
  public set pictureCheck(value: boolean | cdktf.IResolvable) {
    this._pictureCheck = value;
  }
  public resetPictureCheck() {
    this._pictureCheck = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pictureCheckInput() {
    return this._pictureCheck;
  }

  // port_scan - computed: true, optional: true, required: false
  private _portScan?: boolean | cdktf.IResolvable; 
  public get portScan() {
    return this.getBooleanAttribute('port_scan');
  }
  public set portScan(value: boolean | cdktf.IResolvable) {
    this._portScan = value;
  }
  public resetPortScan() {
    this._portScan = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portScanInput() {
    return this._portScan;
  }

  // progress - computed: true, optional: false, required: false
  public get progress() {
    return this.getNumberAttribute('progress');
  }

  // reason - computed: true, optional: false, required: false
  public get reason() {
    return this.getStringAttribute('reason');
  }

  // safe_level - computed: true, optional: false, required: false
  public get safeLevel() {
    return this.getStringAttribute('safe_level');
  }

  // scan_mode - computed: true, optional: true, required: false
  private _scanMode?: string; 
  public get scanMode() {
    return this.getStringAttribute('scan_mode');
  }
  public set scanMode(value: string) {
    this._scanMode = value;
  }
  public resetScanMode() {
    this._scanMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scanModeInput() {
    return this._scanMode;
  }

  // schedule_status - computed: true, optional: false, required: false
  public get scheduleStatus() {
    return this.getStringAttribute('schedule_status');
  }

  // score - computed: true, optional: false, required: false
  public get score() {
    return this.getNumberAttribute('score');
  }

  // task_name - computed: false, optional: false, required: true
  private _taskName?: string; 
  public get taskName() {
    return this.getStringAttribute('task_name');
  }
  public set taskName(value: string) {
    this._taskName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get taskNameInput() {
    return this._taskName;
  }

  // task_period - computed: true, optional: true, required: false
  private _taskPeriod?: string; 
  public get taskPeriod() {
    return this.getStringAttribute('task_period');
  }
  public set taskPeriod(value: string) {
    this._taskPeriod = value;
  }
  public resetTaskPeriod() {
    this._taskPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get taskPeriodInput() {
    return this._taskPeriod;
  }

  // task_status - computed: true, optional: false, required: false
  public get taskStatus() {
    return this.getStringAttribute('task_status');
  }

  // task_type - computed: true, optional: true, required: false
  private _taskType?: string; 
  public get taskType() {
    return this.getStringAttribute('task_type');
  }
  public set taskType(value: string) {
    this._taskType = value;
  }
  public resetTaskType() {
    this._taskType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get taskTypeInput() {
    return this._taskType;
  }

  // text_check - computed: true, optional: true, required: false
  private _textCheck?: boolean | cdktf.IResolvable; 
  public get textCheck() {
    return this.getBooleanAttribute('text_check');
  }
  public set textCheck(value: boolean | cdktf.IResolvable) {
    this._textCheck = value;
  }
  public resetTextCheck() {
    this._textCheck = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get textCheckInput() {
    return this._textCheck;
  }

  // timer - computed: true, optional: true, required: false
  private _timer?: string; 
  public get timer() {
    return this.getStringAttribute('timer');
  }
  public set timer(value: string) {
    this._timer = value;
  }
  public resetTimer() {
    this._timer = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timerInput() {
    return this._timer;
  }

  // trigger_time - computed: true, optional: true, required: false
  private _triggerTime?: string; 
  public get triggerTime() {
    return this.getStringAttribute('trigger_time');
  }
  public set triggerTime(value: string) {
    this._triggerTime = value;
  }
  public resetTriggerTime() {
    this._triggerTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerTimeInput() {
    return this._triggerTime;
  }

  // url - computed: false, optional: false, required: true
  private _url?: string; 
  public get url() {
    return this.getStringAttribute('url');
  }
  public set url(value: string) {
    this._url = value;
  }
  // Temporarily expose input value. Use with caution.
  public get urlInput() {
    return this._url;
  }

  // weak_pwd_scan - computed: true, optional: true, required: false
  private _weakPwdScan?: boolean | cdktf.IResolvable; 
  public get weakPwdScan() {
    return this.getBooleanAttribute('weak_pwd_scan');
  }
  public set weakPwdScan(value: boolean | cdktf.IResolvable) {
    this._weakPwdScan = value;
  }
  public resetWeakPwdScan() {
    this._weakPwdScan = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get weakPwdScanInput() {
    return this._weakPwdScan;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cve_check: cdktf.booleanToTerraform(this._cveCheck),
      id: cdktf.stringToTerraform(this._id),
      malicious_code: cdktf.booleanToTerraform(this._maliciousCode),
      malicious_link: cdktf.booleanToTerraform(this._maliciousLink),
      picture_check: cdktf.booleanToTerraform(this._pictureCheck),
      port_scan: cdktf.booleanToTerraform(this._portScan),
      scan_mode: cdktf.stringToTerraform(this._scanMode),
      task_name: cdktf.stringToTerraform(this._taskName),
      task_period: cdktf.stringToTerraform(this._taskPeriod),
      task_type: cdktf.stringToTerraform(this._taskType),
      text_check: cdktf.booleanToTerraform(this._textCheck),
      timer: cdktf.stringToTerraform(this._timer),
      trigger_time: cdktf.stringToTerraform(this._triggerTime),
      url: cdktf.stringToTerraform(this._url),
      weak_pwd_scan: cdktf.booleanToTerraform(this._weakPwdScan),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cve_check: {
        value: cdktf.booleanToHclTerraform(this._cveCheck),
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
      malicious_code: {
        value: cdktf.booleanToHclTerraform(this._maliciousCode),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      malicious_link: {
        value: cdktf.booleanToHclTerraform(this._maliciousLink),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      picture_check: {
        value: cdktf.booleanToHclTerraform(this._pictureCheck),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      port_scan: {
        value: cdktf.booleanToHclTerraform(this._portScan),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      scan_mode: {
        value: cdktf.stringToHclTerraform(this._scanMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      task_name: {
        value: cdktf.stringToHclTerraform(this._taskName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      task_period: {
        value: cdktf.stringToHclTerraform(this._taskPeriod),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      task_type: {
        value: cdktf.stringToHclTerraform(this._taskType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      text_check: {
        value: cdktf.booleanToHclTerraform(this._textCheck),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      timer: {
        value: cdktf.stringToHclTerraform(this._timer),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      trigger_time: {
        value: cdktf.stringToHclTerraform(this._triggerTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      url: {
        value: cdktf.stringToHclTerraform(this._url),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      weak_pwd_scan: {
        value: cdktf.booleanToHclTerraform(this._weakPwdScan),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

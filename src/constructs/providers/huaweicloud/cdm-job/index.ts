// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CdmJobConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#cluster_id CdmJob#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#destination_connector CdmJob#destination_connector}
  */
  readonly destinationConnector: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#destination_job_config CdmJob#destination_job_config}
  */
  readonly destinationJobConfig: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#destination_link_name CdmJob#destination_link_name}
  */
  readonly destinationLinkName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#id CdmJob#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#job_type CdmJob#job_type}
  */
  readonly jobType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#name CdmJob#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#region CdmJob#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#source_connector CdmJob#source_connector}
  */
  readonly sourceConnector: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#source_job_config CdmJob#source_job_config}
  */
  readonly sourceJobConfig: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#source_link_name CdmJob#source_link_name}
  */
  readonly sourceLinkName: string;
  /**
  * config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#config CdmJob#config}
  */
  readonly config?: CdmJobConfigA;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#timeouts CdmJob#timeouts}
  */
  readonly timeouts?: CdmJobTimeouts;
}
export interface CdmJobConfigA {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#group_name CdmJob#group_name}
  */
  readonly groupName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#retry_type CdmJob#retry_type}
  */
  readonly retryType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#scheduler_cycle CdmJob#scheduler_cycle}
  */
  readonly schedulerCycle?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#scheduler_cycle_type CdmJob#scheduler_cycle_type}
  */
  readonly schedulerCycleType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#scheduler_disposable_type CdmJob#scheduler_disposable_type}
  */
  readonly schedulerDisposableType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#scheduler_enabled CdmJob#scheduler_enabled}
  */
  readonly schedulerEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#scheduler_run_at CdmJob#scheduler_run_at}
  */
  readonly schedulerRunAt?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#scheduler_start_date CdmJob#scheduler_start_date}
  */
  readonly schedulerStartDate?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#scheduler_stop_date CdmJob#scheduler_stop_date}
  */
  readonly schedulerStopDate?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#throttling_dirty_write_to_bucket CdmJob#throttling_dirty_write_to_bucket}
  */
  readonly throttlingDirtyWriteToBucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#throttling_dirty_write_to_directory CdmJob#throttling_dirty_write_to_directory}
  */
  readonly throttlingDirtyWriteToDirectory?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#throttling_dirty_write_to_link CdmJob#throttling_dirty_write_to_link}
  */
  readonly throttlingDirtyWriteToLink?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#throttling_extractors_number CdmJob#throttling_extractors_number}
  */
  readonly throttlingExtractorsNumber?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#throttling_loader_number CdmJob#throttling_loader_number}
  */
  readonly throttlingLoaderNumber?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#throttling_max_error_records CdmJob#throttling_max_error_records}
  */
  readonly throttlingMaxErrorRecords?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#throttling_record_dirty_data CdmJob#throttling_record_dirty_data}
  */
  readonly throttlingRecordDirtyData?: boolean | cdktf.IResolvable;
}

export function cdmJobConfigAToTerraform(struct?: CdmJobConfigAOutputReference | CdmJobConfigA): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    group_name: cdktf.stringToTerraform(struct!.groupName),
    retry_type: cdktf.stringToTerraform(struct!.retryType),
    scheduler_cycle: cdktf.numberToTerraform(struct!.schedulerCycle),
    scheduler_cycle_type: cdktf.stringToTerraform(struct!.schedulerCycleType),
    scheduler_disposable_type: cdktf.stringToTerraform(struct!.schedulerDisposableType),
    scheduler_enabled: cdktf.booleanToTerraform(struct!.schedulerEnabled),
    scheduler_run_at: cdktf.stringToTerraform(struct!.schedulerRunAt),
    scheduler_start_date: cdktf.stringToTerraform(struct!.schedulerStartDate),
    scheduler_stop_date: cdktf.stringToTerraform(struct!.schedulerStopDate),
    throttling_dirty_write_to_bucket: cdktf.stringToTerraform(struct!.throttlingDirtyWriteToBucket),
    throttling_dirty_write_to_directory: cdktf.stringToTerraform(struct!.throttlingDirtyWriteToDirectory),
    throttling_dirty_write_to_link: cdktf.stringToTerraform(struct!.throttlingDirtyWriteToLink),
    throttling_extractors_number: cdktf.numberToTerraform(struct!.throttlingExtractorsNumber),
    throttling_loader_number: cdktf.numberToTerraform(struct!.throttlingLoaderNumber),
    throttling_max_error_records: cdktf.numberToTerraform(struct!.throttlingMaxErrorRecords),
    throttling_record_dirty_data: cdktf.booleanToTerraform(struct!.throttlingRecordDirtyData),
  }
}


export function cdmJobConfigAToHclTerraform(struct?: CdmJobConfigAOutputReference | CdmJobConfigA): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    group_name: {
      value: cdktf.stringToHclTerraform(struct!.groupName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    retry_type: {
      value: cdktf.stringToHclTerraform(struct!.retryType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scheduler_cycle: {
      value: cdktf.numberToHclTerraform(struct!.schedulerCycle),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    scheduler_cycle_type: {
      value: cdktf.stringToHclTerraform(struct!.schedulerCycleType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scheduler_disposable_type: {
      value: cdktf.stringToHclTerraform(struct!.schedulerDisposableType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scheduler_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.schedulerEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    scheduler_run_at: {
      value: cdktf.stringToHclTerraform(struct!.schedulerRunAt),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scheduler_start_date: {
      value: cdktf.stringToHclTerraform(struct!.schedulerStartDate),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scheduler_stop_date: {
      value: cdktf.stringToHclTerraform(struct!.schedulerStopDate),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    throttling_dirty_write_to_bucket: {
      value: cdktf.stringToHclTerraform(struct!.throttlingDirtyWriteToBucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    throttling_dirty_write_to_directory: {
      value: cdktf.stringToHclTerraform(struct!.throttlingDirtyWriteToDirectory),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    throttling_dirty_write_to_link: {
      value: cdktf.stringToHclTerraform(struct!.throttlingDirtyWriteToLink),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    throttling_extractors_number: {
      value: cdktf.numberToHclTerraform(struct!.throttlingExtractorsNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    throttling_loader_number: {
      value: cdktf.numberToHclTerraform(struct!.throttlingLoaderNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    throttling_max_error_records: {
      value: cdktf.numberToHclTerraform(struct!.throttlingMaxErrorRecords),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    throttling_record_dirty_data: {
      value: cdktf.booleanToHclTerraform(struct!.throttlingRecordDirtyData),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdmJobConfigAOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdmJobConfigA | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._groupName !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupName = this._groupName;
    }
    if (this._retryType !== undefined) {
      hasAnyValues = true;
      internalValueResult.retryType = this._retryType;
    }
    if (this._schedulerCycle !== undefined) {
      hasAnyValues = true;
      internalValueResult.schedulerCycle = this._schedulerCycle;
    }
    if (this._schedulerCycleType !== undefined) {
      hasAnyValues = true;
      internalValueResult.schedulerCycleType = this._schedulerCycleType;
    }
    if (this._schedulerDisposableType !== undefined) {
      hasAnyValues = true;
      internalValueResult.schedulerDisposableType = this._schedulerDisposableType;
    }
    if (this._schedulerEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.schedulerEnabled = this._schedulerEnabled;
    }
    if (this._schedulerRunAt !== undefined) {
      hasAnyValues = true;
      internalValueResult.schedulerRunAt = this._schedulerRunAt;
    }
    if (this._schedulerStartDate !== undefined) {
      hasAnyValues = true;
      internalValueResult.schedulerStartDate = this._schedulerStartDate;
    }
    if (this._schedulerStopDate !== undefined) {
      hasAnyValues = true;
      internalValueResult.schedulerStopDate = this._schedulerStopDate;
    }
    if (this._throttlingDirtyWriteToBucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.throttlingDirtyWriteToBucket = this._throttlingDirtyWriteToBucket;
    }
    if (this._throttlingDirtyWriteToDirectory !== undefined) {
      hasAnyValues = true;
      internalValueResult.throttlingDirtyWriteToDirectory = this._throttlingDirtyWriteToDirectory;
    }
    if (this._throttlingDirtyWriteToLink !== undefined) {
      hasAnyValues = true;
      internalValueResult.throttlingDirtyWriteToLink = this._throttlingDirtyWriteToLink;
    }
    if (this._throttlingExtractorsNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.throttlingExtractorsNumber = this._throttlingExtractorsNumber;
    }
    if (this._throttlingLoaderNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.throttlingLoaderNumber = this._throttlingLoaderNumber;
    }
    if (this._throttlingMaxErrorRecords !== undefined) {
      hasAnyValues = true;
      internalValueResult.throttlingMaxErrorRecords = this._throttlingMaxErrorRecords;
    }
    if (this._throttlingRecordDirtyData !== undefined) {
      hasAnyValues = true;
      internalValueResult.throttlingRecordDirtyData = this._throttlingRecordDirtyData;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdmJobConfigA | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._groupName = undefined;
      this._retryType = undefined;
      this._schedulerCycle = undefined;
      this._schedulerCycleType = undefined;
      this._schedulerDisposableType = undefined;
      this._schedulerEnabled = undefined;
      this._schedulerRunAt = undefined;
      this._schedulerStartDate = undefined;
      this._schedulerStopDate = undefined;
      this._throttlingDirtyWriteToBucket = undefined;
      this._throttlingDirtyWriteToDirectory = undefined;
      this._throttlingDirtyWriteToLink = undefined;
      this._throttlingExtractorsNumber = undefined;
      this._throttlingLoaderNumber = undefined;
      this._throttlingMaxErrorRecords = undefined;
      this._throttlingRecordDirtyData = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._groupName = value.groupName;
      this._retryType = value.retryType;
      this._schedulerCycle = value.schedulerCycle;
      this._schedulerCycleType = value.schedulerCycleType;
      this._schedulerDisposableType = value.schedulerDisposableType;
      this._schedulerEnabled = value.schedulerEnabled;
      this._schedulerRunAt = value.schedulerRunAt;
      this._schedulerStartDate = value.schedulerStartDate;
      this._schedulerStopDate = value.schedulerStopDate;
      this._throttlingDirtyWriteToBucket = value.throttlingDirtyWriteToBucket;
      this._throttlingDirtyWriteToDirectory = value.throttlingDirtyWriteToDirectory;
      this._throttlingDirtyWriteToLink = value.throttlingDirtyWriteToLink;
      this._throttlingExtractorsNumber = value.throttlingExtractorsNumber;
      this._throttlingLoaderNumber = value.throttlingLoaderNumber;
      this._throttlingMaxErrorRecords = value.throttlingMaxErrorRecords;
      this._throttlingRecordDirtyData = value.throttlingRecordDirtyData;
    }
  }

  // group_name - computed: false, optional: true, required: false
  private _groupName?: string; 
  public get groupName() {
    return this.getStringAttribute('group_name');
  }
  public set groupName(value: string) {
    this._groupName = value;
  }
  public resetGroupName() {
    this._groupName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get groupNameInput() {
    return this._groupName;
  }

  // retry_type - computed: false, optional: true, required: false
  private _retryType?: string; 
  public get retryType() {
    return this.getStringAttribute('retry_type');
  }
  public set retryType(value: string) {
    this._retryType = value;
  }
  public resetRetryType() {
    this._retryType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retryTypeInput() {
    return this._retryType;
  }

  // scheduler_cycle - computed: false, optional: true, required: false
  private _schedulerCycle?: number; 
  public get schedulerCycle() {
    return this.getNumberAttribute('scheduler_cycle');
  }
  public set schedulerCycle(value: number) {
    this._schedulerCycle = value;
  }
  public resetSchedulerCycle() {
    this._schedulerCycle = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schedulerCycleInput() {
    return this._schedulerCycle;
  }

  // scheduler_cycle_type - computed: false, optional: true, required: false
  private _schedulerCycleType?: string; 
  public get schedulerCycleType() {
    return this.getStringAttribute('scheduler_cycle_type');
  }
  public set schedulerCycleType(value: string) {
    this._schedulerCycleType = value;
  }
  public resetSchedulerCycleType() {
    this._schedulerCycleType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schedulerCycleTypeInput() {
    return this._schedulerCycleType;
  }

  // scheduler_disposable_type - computed: false, optional: true, required: false
  private _schedulerDisposableType?: string; 
  public get schedulerDisposableType() {
    return this.getStringAttribute('scheduler_disposable_type');
  }
  public set schedulerDisposableType(value: string) {
    this._schedulerDisposableType = value;
  }
  public resetSchedulerDisposableType() {
    this._schedulerDisposableType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schedulerDisposableTypeInput() {
    return this._schedulerDisposableType;
  }

  // scheduler_enabled - computed: false, optional: true, required: false
  private _schedulerEnabled?: boolean | cdktf.IResolvable; 
  public get schedulerEnabled() {
    return this.getBooleanAttribute('scheduler_enabled');
  }
  public set schedulerEnabled(value: boolean | cdktf.IResolvable) {
    this._schedulerEnabled = value;
  }
  public resetSchedulerEnabled() {
    this._schedulerEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schedulerEnabledInput() {
    return this._schedulerEnabled;
  }

  // scheduler_run_at - computed: false, optional: true, required: false
  private _schedulerRunAt?: string; 
  public get schedulerRunAt() {
    return this.getStringAttribute('scheduler_run_at');
  }
  public set schedulerRunAt(value: string) {
    this._schedulerRunAt = value;
  }
  public resetSchedulerRunAt() {
    this._schedulerRunAt = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schedulerRunAtInput() {
    return this._schedulerRunAt;
  }

  // scheduler_start_date - computed: false, optional: true, required: false
  private _schedulerStartDate?: string; 
  public get schedulerStartDate() {
    return this.getStringAttribute('scheduler_start_date');
  }
  public set schedulerStartDate(value: string) {
    this._schedulerStartDate = value;
  }
  public resetSchedulerStartDate() {
    this._schedulerStartDate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schedulerStartDateInput() {
    return this._schedulerStartDate;
  }

  // scheduler_stop_date - computed: false, optional: true, required: false
  private _schedulerStopDate?: string; 
  public get schedulerStopDate() {
    return this.getStringAttribute('scheduler_stop_date');
  }
  public set schedulerStopDate(value: string) {
    this._schedulerStopDate = value;
  }
  public resetSchedulerStopDate() {
    this._schedulerStopDate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schedulerStopDateInput() {
    return this._schedulerStopDate;
  }

  // throttling_dirty_write_to_bucket - computed: false, optional: true, required: false
  private _throttlingDirtyWriteToBucket?: string; 
  public get throttlingDirtyWriteToBucket() {
    return this.getStringAttribute('throttling_dirty_write_to_bucket');
  }
  public set throttlingDirtyWriteToBucket(value: string) {
    this._throttlingDirtyWriteToBucket = value;
  }
  public resetThrottlingDirtyWriteToBucket() {
    this._throttlingDirtyWriteToBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get throttlingDirtyWriteToBucketInput() {
    return this._throttlingDirtyWriteToBucket;
  }

  // throttling_dirty_write_to_directory - computed: false, optional: true, required: false
  private _throttlingDirtyWriteToDirectory?: string; 
  public get throttlingDirtyWriteToDirectory() {
    return this.getStringAttribute('throttling_dirty_write_to_directory');
  }
  public set throttlingDirtyWriteToDirectory(value: string) {
    this._throttlingDirtyWriteToDirectory = value;
  }
  public resetThrottlingDirtyWriteToDirectory() {
    this._throttlingDirtyWriteToDirectory = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get throttlingDirtyWriteToDirectoryInput() {
    return this._throttlingDirtyWriteToDirectory;
  }

  // throttling_dirty_write_to_link - computed: false, optional: true, required: false
  private _throttlingDirtyWriteToLink?: string; 
  public get throttlingDirtyWriteToLink() {
    return this.getStringAttribute('throttling_dirty_write_to_link');
  }
  public set throttlingDirtyWriteToLink(value: string) {
    this._throttlingDirtyWriteToLink = value;
  }
  public resetThrottlingDirtyWriteToLink() {
    this._throttlingDirtyWriteToLink = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get throttlingDirtyWriteToLinkInput() {
    return this._throttlingDirtyWriteToLink;
  }

  // throttling_extractors_number - computed: false, optional: true, required: false
  private _throttlingExtractorsNumber?: number; 
  public get throttlingExtractorsNumber() {
    return this.getNumberAttribute('throttling_extractors_number');
  }
  public set throttlingExtractorsNumber(value: number) {
    this._throttlingExtractorsNumber = value;
  }
  public resetThrottlingExtractorsNumber() {
    this._throttlingExtractorsNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get throttlingExtractorsNumberInput() {
    return this._throttlingExtractorsNumber;
  }

  // throttling_loader_number - computed: false, optional: true, required: false
  private _throttlingLoaderNumber?: number; 
  public get throttlingLoaderNumber() {
    return this.getNumberAttribute('throttling_loader_number');
  }
  public set throttlingLoaderNumber(value: number) {
    this._throttlingLoaderNumber = value;
  }
  public resetThrottlingLoaderNumber() {
    this._throttlingLoaderNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get throttlingLoaderNumberInput() {
    return this._throttlingLoaderNumber;
  }

  // throttling_max_error_records - computed: false, optional: true, required: false
  private _throttlingMaxErrorRecords?: number; 
  public get throttlingMaxErrorRecords() {
    return this.getNumberAttribute('throttling_max_error_records');
  }
  public set throttlingMaxErrorRecords(value: number) {
    this._throttlingMaxErrorRecords = value;
  }
  public resetThrottlingMaxErrorRecords() {
    this._throttlingMaxErrorRecords = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get throttlingMaxErrorRecordsInput() {
    return this._throttlingMaxErrorRecords;
  }

  // throttling_record_dirty_data - computed: false, optional: true, required: false
  private _throttlingRecordDirtyData?: boolean | cdktf.IResolvable; 
  public get throttlingRecordDirtyData() {
    return this.getBooleanAttribute('throttling_record_dirty_data');
  }
  public set throttlingRecordDirtyData(value: boolean | cdktf.IResolvable) {
    this._throttlingRecordDirtyData = value;
  }
  public resetThrottlingRecordDirtyData() {
    this._throttlingRecordDirtyData = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get throttlingRecordDirtyDataInput() {
    return this._throttlingRecordDirtyData;
  }
}
export interface CdmJobTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#create CdmJob#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#delete CdmJob#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#update CdmJob#update}
  */
  readonly update?: string;
}

export function cdmJobTimeoutsToTerraform(struct?: CdmJobTimeouts | cdktf.IResolvable): any {
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


export function cdmJobTimeoutsToHclTerraform(struct?: CdmJobTimeouts | cdktf.IResolvable): any {
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

export class CdmJobTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CdmJobTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdmJobTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job huaweicloud_cdm_job}
*/
export class CdmJob extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cdm_job";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CdmJob resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CdmJob to import
  * @param importFromId The id of the existing CdmJob that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CdmJob to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cdm_job", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdm_job huaweicloud_cdm_job} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CdmJobConfig
  */
  public constructor(scope: Construct, id: string, config: CdmJobConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cdm_job',
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
    this._destinationConnector = config.destinationConnector;
    this._destinationJobConfig = config.destinationJobConfig;
    this._destinationLinkName = config.destinationLinkName;
    this._id = config.id;
    this._jobType = config.jobType;
    this._name = config.name;
    this._region = config.region;
    this._sourceConnector = config.sourceConnector;
    this._sourceJobConfig = config.sourceJobConfig;
    this._sourceLinkName = config.sourceLinkName;
    this._config.internalValue = config.config;
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

  // destination_connector - computed: false, optional: false, required: true
  private _destinationConnector?: string; 
  public get destinationConnector() {
    return this.getStringAttribute('destination_connector');
  }
  public set destinationConnector(value: string) {
    this._destinationConnector = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationConnectorInput() {
    return this._destinationConnector;
  }

  // destination_job_config - computed: false, optional: false, required: true
  private _destinationJobConfig?: { [key: string]: string }; 
  public get destinationJobConfig() {
    return this.getStringMapAttribute('destination_job_config');
  }
  public set destinationJobConfig(value: { [key: string]: string }) {
    this._destinationJobConfig = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationJobConfigInput() {
    return this._destinationJobConfig;
  }

  // destination_link_name - computed: false, optional: false, required: true
  private _destinationLinkName?: string; 
  public get destinationLinkName() {
    return this.getStringAttribute('destination_link_name');
  }
  public set destinationLinkName(value: string) {
    this._destinationLinkName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationLinkNameInput() {
    return this._destinationLinkName;
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

  // job_type - computed: false, optional: false, required: true
  private _jobType?: string; 
  public get jobType() {
    return this.getStringAttribute('job_type');
  }
  public set jobType(value: string) {
    this._jobType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get jobTypeInput() {
    return this._jobType;
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

  // source_connector - computed: false, optional: false, required: true
  private _sourceConnector?: string; 
  public get sourceConnector() {
    return this.getStringAttribute('source_connector');
  }
  public set sourceConnector(value: string) {
    this._sourceConnector = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceConnectorInput() {
    return this._sourceConnector;
  }

  // source_job_config - computed: false, optional: false, required: true
  private _sourceJobConfig?: { [key: string]: string }; 
  public get sourceJobConfig() {
    return this.getStringMapAttribute('source_job_config');
  }
  public set sourceJobConfig(value: { [key: string]: string }) {
    this._sourceJobConfig = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceJobConfigInput() {
    return this._sourceJobConfig;
  }

  // source_link_name - computed: false, optional: false, required: true
  private _sourceLinkName?: string; 
  public get sourceLinkName() {
    return this.getStringAttribute('source_link_name');
  }
  public set sourceLinkName(value: string) {
    this._sourceLinkName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceLinkNameInput() {
    return this._sourceLinkName;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // config - computed: false, optional: true, required: false
  private _config = new CdmJobConfigAOutputReference(this, "config");
  public get config() {
    return this._config;
  }
  public putConfig(value: CdmJobConfigA) {
    this._config.internalValue = value;
  }
  public resetConfig() {
    this._config.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configInput() {
    return this._config.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CdmJobTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CdmJobTimeouts) {
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
      destination_connector: cdktf.stringToTerraform(this._destinationConnector),
      destination_job_config: cdktf.hashMapper(cdktf.stringToTerraform)(this._destinationJobConfig),
      destination_link_name: cdktf.stringToTerraform(this._destinationLinkName),
      id: cdktf.stringToTerraform(this._id),
      job_type: cdktf.stringToTerraform(this._jobType),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      source_connector: cdktf.stringToTerraform(this._sourceConnector),
      source_job_config: cdktf.hashMapper(cdktf.stringToTerraform)(this._sourceJobConfig),
      source_link_name: cdktf.stringToTerraform(this._sourceLinkName),
      config: cdmJobConfigAToTerraform(this._config.internalValue),
      timeouts: cdmJobTimeoutsToTerraform(this._timeouts.internalValue),
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
      destination_connector: {
        value: cdktf.stringToHclTerraform(this._destinationConnector),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_job_config: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._destinationJobConfig),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      destination_link_name: {
        value: cdktf.stringToHclTerraform(this._destinationLinkName),
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
      job_type: {
        value: cdktf.stringToHclTerraform(this._jobType),
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
      source_connector: {
        value: cdktf.stringToHclTerraform(this._sourceConnector),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_job_config: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._sourceJobConfig),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      source_link_name: {
        value: cdktf.stringToHclTerraform(this._sourceLinkName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      config: {
        value: cdmJobConfigAToHclTerraform(this._config.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CdmJobConfigAList",
      },
      timeouts: {
        value: cdmJobTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CdmJobTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WafDedicatedInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#anti_affinity WafDedicatedInstance#anti_affinity}
  */
  readonly antiAffinity?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#available_zone WafDedicatedInstance#available_zone}
  */
  readonly availableZone: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#cpu_architecture WafDedicatedInstance#cpu_architecture}
  */
  readonly cpuArchitecture?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#ecs_flavor WafDedicatedInstance#ecs_flavor}
  */
  readonly ecsFlavor?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#enterprise_project_id WafDedicatedInstance#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * schema: Deprecated;
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#group_id WafDedicatedInstance#group_id}
  */
  readonly groupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#id WafDedicatedInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#name WafDedicatedInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#region WafDedicatedInstance#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#res_tenant WafDedicatedInstance#res_tenant}
  */
  readonly resTenant?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#security_group WafDedicatedInstance#security_group}
  */
  readonly securityGroup: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#specification_code WafDedicatedInstance#specification_code}
  */
  readonly specificationCode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#subnet_id WafDedicatedInstance#subnet_id}
  */
  readonly subnetId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#vpc_id WafDedicatedInstance#vpc_id}
  */
  readonly vpcId: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#timeouts WafDedicatedInstance#timeouts}
  */
  readonly timeouts?: WafDedicatedInstanceTimeouts;
}
export interface WafDedicatedInstanceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#create WafDedicatedInstance#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#delete WafDedicatedInstance#delete}
  */
  readonly delete?: string;
}

export function wafDedicatedInstanceTimeoutsToTerraform(struct?: WafDedicatedInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function wafDedicatedInstanceTimeoutsToHclTerraform(struct?: WafDedicatedInstanceTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafDedicatedInstanceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): WafDedicatedInstanceTimeouts | cdktf.IResolvable | undefined {
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
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafDedicatedInstanceTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance huaweicloud_waf_dedicated_instance}
*/
export class WafDedicatedInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_waf_dedicated_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WafDedicatedInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WafDedicatedInstance to import
  * @param importFromId The id of the existing WafDedicatedInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WafDedicatedInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_waf_dedicated_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_instance huaweicloud_waf_dedicated_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WafDedicatedInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: WafDedicatedInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_waf_dedicated_instance',
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
    this._antiAffinity = config.antiAffinity;
    this._availableZone = config.availableZone;
    this._cpuArchitecture = config.cpuArchitecture;
    this._ecsFlavor = config.ecsFlavor;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._groupId = config.groupId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._resTenant = config.resTenant;
    this._securityGroup = config.securityGroup;
    this._specificationCode = config.specificationCode;
    this._subnetId = config.subnetId;
    this._vpcId = config.vpcId;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_status - computed: true, optional: false, required: false
  public get accessStatus() {
    return this.getNumberAttribute('access_status');
  }

  // anti_affinity - computed: false, optional: true, required: false
  private _antiAffinity?: boolean | cdktf.IResolvable; 
  public get antiAffinity() {
    return this.getBooleanAttribute('anti_affinity');
  }
  public set antiAffinity(value: boolean | cdktf.IResolvable) {
    this._antiAffinity = value;
  }
  public resetAntiAffinity() {
    this._antiAffinity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get antiAffinityInput() {
    return this._antiAffinity;
  }

  // available_zone - computed: false, optional: false, required: true
  private _availableZone?: string; 
  public get availableZone() {
    return this.getStringAttribute('available_zone');
  }
  public set availableZone(value: string) {
    this._availableZone = value;
  }
  // Temporarily expose input value. Use with caution.
  public get availableZoneInput() {
    return this._availableZone;
  }

  // cpu_architecture - computed: false, optional: true, required: false
  private _cpuArchitecture?: string; 
  public get cpuArchitecture() {
    return this.getStringAttribute('cpu_architecture');
  }
  public set cpuArchitecture(value: string) {
    this._cpuArchitecture = value;
  }
  public resetCpuArchitecture() {
    this._cpuArchitecture = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cpuArchitectureInput() {
    return this._cpuArchitecture;
  }

  // ecs_flavor - computed: true, optional: true, required: false
  private _ecsFlavor?: string; 
  public get ecsFlavor() {
    return this.getStringAttribute('ecs_flavor');
  }
  public set ecsFlavor(value: string) {
    this._ecsFlavor = value;
  }
  public resetEcsFlavor() {
    this._ecsFlavor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ecsFlavorInput() {
    return this._ecsFlavor;
  }

  // enterprise_project_id - computed: false, optional: true, required: false
  private _enterpriseProjectId?: string; 
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }
  public set enterpriseProjectId(value: string) {
    this._enterpriseProjectId = value;
  }
  public resetEnterpriseProjectId() {
    this._enterpriseProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseProjectIdInput() {
    return this._enterpriseProjectId;
  }

  // group_id - computed: false, optional: true, required: false
  private _groupId?: string; 
  public get groupId() {
    return this.getStringAttribute('group_id');
  }
  public set groupId(value: string) {
    this._groupId = value;
  }
  public resetGroupId() {
    this._groupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get groupIdInput() {
    return this._groupId;
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

  // res_tenant - computed: false, optional: true, required: false
  private _resTenant?: boolean | cdktf.IResolvable; 
  public get resTenant() {
    return this.getBooleanAttribute('res_tenant');
  }
  public set resTenant(value: boolean | cdktf.IResolvable) {
    this._resTenant = value;
  }
  public resetResTenant() {
    this._resTenant = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resTenantInput() {
    return this._resTenant;
  }

  // run_status - computed: true, optional: false, required: false
  public get runStatus() {
    return this.getNumberAttribute('run_status');
  }

  // security_group - computed: false, optional: false, required: true
  private _securityGroup?: string[]; 
  public get securityGroup() {
    return this.getListAttribute('security_group');
  }
  public set securityGroup(value: string[]) {
    this._securityGroup = value;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupInput() {
    return this._securityGroup;
  }

  // server_id - computed: true, optional: false, required: false
  public get serverId() {
    return this.getStringAttribute('server_id');
  }

  // service_ip - computed: true, optional: false, required: false
  public get serviceIp() {
    return this.getStringAttribute('service_ip');
  }

  // specification_code - computed: false, optional: false, required: true
  private _specificationCode?: string; 
  public get specificationCode() {
    return this.getStringAttribute('specification_code');
  }
  public set specificationCode(value: string) {
    this._specificationCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get specificationCodeInput() {
    return this._specificationCode;
  }

  // subnet_id - computed: false, optional: false, required: true
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
  }

  // upgradable - computed: true, optional: false, required: false
  public get upgradable() {
    return this.getNumberAttribute('upgradable');
  }

  // vpc_id - computed: false, optional: false, required: true
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new WafDedicatedInstanceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: WafDedicatedInstanceTimeouts) {
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
      anti_affinity: cdktf.booleanToTerraform(this._antiAffinity),
      available_zone: cdktf.stringToTerraform(this._availableZone),
      cpu_architecture: cdktf.stringToTerraform(this._cpuArchitecture),
      ecs_flavor: cdktf.stringToTerraform(this._ecsFlavor),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      group_id: cdktf.stringToTerraform(this._groupId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      res_tenant: cdktf.booleanToTerraform(this._resTenant),
      security_group: cdktf.listMapper(cdktf.stringToTerraform, false)(this._securityGroup),
      specification_code: cdktf.stringToTerraform(this._specificationCode),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      timeouts: wafDedicatedInstanceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      anti_affinity: {
        value: cdktf.booleanToHclTerraform(this._antiAffinity),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      available_zone: {
        value: cdktf.stringToHclTerraform(this._availableZone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cpu_architecture: {
        value: cdktf.stringToHclTerraform(this._cpuArchitecture),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ecs_flavor: {
        value: cdktf.stringToHclTerraform(this._ecsFlavor),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      group_id: {
        value: cdktf.stringToHclTerraform(this._groupId),
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
      res_tenant: {
        value: cdktf.booleanToHclTerraform(this._resTenant),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      security_group: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._securityGroup),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      specification_code: {
        value: cdktf.stringToHclTerraform(this._specificationCode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      subnet_id: {
        value: cdktf.stringToHclTerraform(this._subnetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: wafDedicatedInstanceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "WafDedicatedInstanceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

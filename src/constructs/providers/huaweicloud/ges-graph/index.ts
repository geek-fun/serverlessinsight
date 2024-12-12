// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface GesGraphConfig extends cdktf.TerraformMetaArguments {
  /**
  * Graph instance's CPU architecture type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#cpu_arch GesGraph#cpu_arch}
  */
  readonly cpuArch?: string;
  /**
  * Graph instance cryptography algorithm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#crypt_algorithm GesGraph#crypt_algorithm}
  */
  readonly cryptAlgorithm: string;
  /**
  * Whether to enable full-text index control for the created graph.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#enable_full_text_index GesGraph#enable_full_text_index}
  */
  readonly enableFullTextIndex?: boolean | cdktf.IResolvable;
  /**
  * Whether to enable the security mode. This mode may damage GES performance greatly.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#enable_https GesGraph#enable_https}
  */
  readonly enableHttps: boolean | cdktf.IResolvable;
  /**
  * Whether to enable HyG for the graph. This parameter is available for database edition graphs only.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#enable_hyg GesGraph#enable_hyg}
  */
  readonly enableHyg?: boolean | cdktf.IResolvable;
  /**
  * Whether the created graph supports the cross-AZ mode. The default value is false.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#enable_multi_az GesGraph#enable_multi_az}
  */
  readonly enableMultiAz?: boolean | cdktf.IResolvable;
  /**
  * Whether to enable granular permission control for the created graph.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#enable_rbac GesGraph#enable_rbac}
  */
  readonly enableRbac?: boolean | cdktf.IResolvable;
  /**
  * The enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#enterprise_project_id GesGraph#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Graph size type index.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#graph_size_type_index GesGraph#graph_size_type_index}
  */
  readonly graphSizeTypeIndex: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#id GesGraph#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Whether to retain the backups of a graph after it is deleted.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#keep_backup GesGraph#keep_backup}
  */
  readonly keepBackup?: boolean | cdktf.IResolvable;
  /**
  * The graph name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#name GesGraph#name}
  */
  readonly name: string;
  /**
  * Graph product type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#product_type GesGraph#product_type}
  */
  readonly productType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#region GesGraph#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#replication GesGraph#replication}
  */
  readonly replication?: number;
  /**
  * The security group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#security_group_id GesGraph#security_group_id}
  */
  readonly securityGroupId: string;
  /**
  * The subnet ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#subnet_id GesGraph#subnet_id}
  */
  readonly subnetId: string;
  /**
  * The key/value pairs to associate with the graph.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#tags GesGraph#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The VPC ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#vpc_id GesGraph#vpc_id}
  */
  readonly vpcId: string;
  /**
  * encryption block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#encryption GesGraph#encryption}
  */
  readonly encryption?: GesGraphEncryption;
  /**
  * lts_operation_trace block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#lts_operation_trace GesGraph#lts_operation_trace}
  */
  readonly ltsOperationTrace?: GesGraphLtsOperationTrace;
  /**
  * public_ip block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#public_ip GesGraph#public_ip}
  */
  readonly publicIp?: GesGraphPublicIp;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#timeouts GesGraph#timeouts}
  */
  readonly timeouts?: GesGraphTimeouts;
  /**
  * vertex_id_type block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#vertex_id_type GesGraph#vertex_id_type}
  */
  readonly vertexIdType?: GesGraphVertexIdType;
}
export interface GesGraphEncryption {
  /**
  * Whether to enable data encryption The value can be true or false. The default value is false.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#enable GesGraph#enable}
  */
  readonly enable?: boolean | cdktf.IResolvable;
  /**
  * ID of the customer master key created by DEW in the project corresponding to the graph creation.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#master_key_id GesGraph#master_key_id}
  */
  readonly masterKeyId?: string;
}

export function gesGraphEncryptionToTerraform(struct?: GesGraphEncryptionOutputReference | GesGraphEncryption): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enable: cdktf.booleanToTerraform(struct!.enable),
    master_key_id: cdktf.stringToTerraform(struct!.masterKeyId),
  }
}


export function gesGraphEncryptionToHclTerraform(struct?: GesGraphEncryptionOutputReference | GesGraphEncryption): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enable: {
      value: cdktf.booleanToHclTerraform(struct!.enable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    master_key_id: {
      value: cdktf.stringToHclTerraform(struct!.masterKeyId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GesGraphEncryptionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): GesGraphEncryption | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enable !== undefined) {
      hasAnyValues = true;
      internalValueResult.enable = this._enable;
    }
    if (this._masterKeyId !== undefined) {
      hasAnyValues = true;
      internalValueResult.masterKeyId = this._masterKeyId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GesGraphEncryption | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enable = undefined;
      this._masterKeyId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enable = value.enable;
      this._masterKeyId = value.masterKeyId;
    }
  }

  // enable - computed: true, optional: true, required: false
  private _enable?: boolean | cdktf.IResolvable; 
  public get enable() {
    return this.getBooleanAttribute('enable');
  }
  public set enable(value: boolean | cdktf.IResolvable) {
    this._enable = value;
  }
  public resetEnable() {
    this._enable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableInput() {
    return this._enable;
  }

  // master_key_id - computed: true, optional: true, required: false
  private _masterKeyId?: string; 
  public get masterKeyId() {
    return this.getStringAttribute('master_key_id');
  }
  public set masterKeyId(value: string) {
    this._masterKeyId = value;
  }
  public resetMasterKeyId() {
    this._masterKeyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get masterKeyIdInput() {
    return this._masterKeyId;
  }
}
export interface GesGraphLtsOperationTrace {
  /**
  * LTS log group name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#audit_log_group_name GesGraph#audit_log_group_name}
  */
  readonly auditLogGroupName?: string;
  /**
  * Whether to enable graph audit. The default value is false.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#enable_audit GesGraph#enable_audit}
  */
  readonly enableAudit?: boolean | cdktf.IResolvable;
}

export function gesGraphLtsOperationTraceToTerraform(struct?: GesGraphLtsOperationTraceOutputReference | GesGraphLtsOperationTrace): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    audit_log_group_name: cdktf.stringToTerraform(struct!.auditLogGroupName),
    enable_audit: cdktf.booleanToTerraform(struct!.enableAudit),
  }
}


export function gesGraphLtsOperationTraceToHclTerraform(struct?: GesGraphLtsOperationTraceOutputReference | GesGraphLtsOperationTrace): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    audit_log_group_name: {
      value: cdktf.stringToHclTerraform(struct!.auditLogGroupName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    enable_audit: {
      value: cdktf.booleanToHclTerraform(struct!.enableAudit),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GesGraphLtsOperationTraceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): GesGraphLtsOperationTrace | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._auditLogGroupName !== undefined) {
      hasAnyValues = true;
      internalValueResult.auditLogGroupName = this._auditLogGroupName;
    }
    if (this._enableAudit !== undefined) {
      hasAnyValues = true;
      internalValueResult.enableAudit = this._enableAudit;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GesGraphLtsOperationTrace | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._auditLogGroupName = undefined;
      this._enableAudit = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._auditLogGroupName = value.auditLogGroupName;
      this._enableAudit = value.enableAudit;
    }
  }

  // audit_log_group_name - computed: true, optional: true, required: false
  private _auditLogGroupName?: string; 
  public get auditLogGroupName() {
    return this.getStringAttribute('audit_log_group_name');
  }
  public set auditLogGroupName(value: string) {
    this._auditLogGroupName = value;
  }
  public resetAuditLogGroupName() {
    this._auditLogGroupName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get auditLogGroupNameInput() {
    return this._auditLogGroupName;
  }

  // enable_audit - computed: true, optional: true, required: false
  private _enableAudit?: boolean | cdktf.IResolvable; 
  public get enableAudit() {
    return this.getBooleanAttribute('enable_audit');
  }
  public set enableAudit(value: boolean | cdktf.IResolvable) {
    this._enableAudit = value;
  }
  public resetEnableAudit() {
    this._enableAudit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableAuditInput() {
    return this._enableAudit;
  }
}
export interface GesGraphPublicIp {
  /**
  * The EIP ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#eip_id GesGraph#eip_id}
  */
  readonly eipId?: string;
  /**
  * The bind type of public IP.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#public_bind_type GesGraph#public_bind_type}
  */
  readonly publicBindType?: string;
}

export function gesGraphPublicIpToTerraform(struct?: GesGraphPublicIpOutputReference | GesGraphPublicIp): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    eip_id: cdktf.stringToTerraform(struct!.eipId),
    public_bind_type: cdktf.stringToTerraform(struct!.publicBindType),
  }
}


export function gesGraphPublicIpToHclTerraform(struct?: GesGraphPublicIpOutputReference | GesGraphPublicIp): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    eip_id: {
      value: cdktf.stringToHclTerraform(struct!.eipId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    public_bind_type: {
      value: cdktf.stringToHclTerraform(struct!.publicBindType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GesGraphPublicIpOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): GesGraphPublicIp | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._eipId !== undefined) {
      hasAnyValues = true;
      internalValueResult.eipId = this._eipId;
    }
    if (this._publicBindType !== undefined) {
      hasAnyValues = true;
      internalValueResult.publicBindType = this._publicBindType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GesGraphPublicIp | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._eipId = undefined;
      this._publicBindType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._eipId = value.eipId;
      this._publicBindType = value.publicBindType;
    }
  }

  // eip_id - computed: true, optional: true, required: false
  private _eipId?: string; 
  public get eipId() {
    return this.getStringAttribute('eip_id');
  }
  public set eipId(value: string) {
    this._eipId = value;
  }
  public resetEipId() {
    this._eipId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eipIdInput() {
    return this._eipId;
  }

  // public_bind_type - computed: true, optional: true, required: false
  private _publicBindType?: string; 
  public get publicBindType() {
    return this.getStringAttribute('public_bind_type');
  }
  public set publicBindType(value: string) {
    this._publicBindType = value;
  }
  public resetPublicBindType() {
    this._publicBindType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicBindTypeInput() {
    return this._publicBindType;
  }
}
export interface GesGraphTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#create GesGraph#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#delete GesGraph#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#update GesGraph#update}
  */
  readonly update?: string;
}

export function gesGraphTimeoutsToTerraform(struct?: GesGraphTimeouts | cdktf.IResolvable): any {
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


export function gesGraphTimeoutsToHclTerraform(struct?: GesGraphTimeouts | cdktf.IResolvable): any {
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

export class GesGraphTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): GesGraphTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: GesGraphTimeouts | cdktf.IResolvable | undefined) {
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
export interface GesGraphVertexIdType {
  /**
  * The length of ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#id_length GesGraph#id_length}
  */
  readonly idLength?: number;
  /**
  * Vertex ID type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#id_type GesGraph#id_type}
  */
  readonly idType?: string;
}

export function gesGraphVertexIdTypeToTerraform(struct?: GesGraphVertexIdTypeOutputReference | GesGraphVertexIdType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    id_length: cdktf.numberToTerraform(struct!.idLength),
    id_type: cdktf.stringToTerraform(struct!.idType),
  }
}


export function gesGraphVertexIdTypeToHclTerraform(struct?: GesGraphVertexIdTypeOutputReference | GesGraphVertexIdType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    id_length: {
      value: cdktf.numberToHclTerraform(struct!.idLength),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    id_type: {
      value: cdktf.stringToHclTerraform(struct!.idType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class GesGraphVertexIdTypeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): GesGraphVertexIdType | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._idLength !== undefined) {
      hasAnyValues = true;
      internalValueResult.idLength = this._idLength;
    }
    if (this._idType !== undefined) {
      hasAnyValues = true;
      internalValueResult.idType = this._idType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: GesGraphVertexIdType | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._idLength = undefined;
      this._idType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._idLength = value.idLength;
      this._idType = value.idType;
    }
  }

  // id_length - computed: true, optional: true, required: false
  private _idLength?: number; 
  public get idLength() {
    return this.getNumberAttribute('id_length');
  }
  public set idLength(value: number) {
    this._idLength = value;
  }
  public resetIdLength() {
    this._idLength = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idLengthInput() {
    return this._idLength;
  }

  // id_type - computed: true, optional: true, required: false
  private _idType?: string; 
  public get idType() {
    return this.getStringAttribute('id_type');
  }
  public set idType(value: string) {
    this._idType = value;
  }
  public resetIdType() {
    this._idType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idTypeInput() {
    return this._idType;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph huaweicloud_ges_graph}
*/
export class GesGraph extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_ges_graph";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a GesGraph resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the GesGraph to import
  * @param importFromId The id of the existing GesGraph that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the GesGraph to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_ges_graph", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ges_graph huaweicloud_ges_graph} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options GesGraphConfig
  */
  public constructor(scope: Construct, id: string, config: GesGraphConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_ges_graph',
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
    this._cpuArch = config.cpuArch;
    this._cryptAlgorithm = config.cryptAlgorithm;
    this._enableFullTextIndex = config.enableFullTextIndex;
    this._enableHttps = config.enableHttps;
    this._enableHyg = config.enableHyg;
    this._enableMultiAz = config.enableMultiAz;
    this._enableRbac = config.enableRbac;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._graphSizeTypeIndex = config.graphSizeTypeIndex;
    this._id = config.id;
    this._keepBackup = config.keepBackup;
    this._name = config.name;
    this._productType = config.productType;
    this._region = config.region;
    this._replication = config.replication;
    this._securityGroupId = config.securityGroupId;
    this._subnetId = config.subnetId;
    this._tags = config.tags;
    this._vpcId = config.vpcId;
    this._encryption.internalValue = config.encryption;
    this._ltsOperationTrace.internalValue = config.ltsOperationTrace;
    this._publicIp.internalValue = config.publicIp;
    this._timeouts.internalValue = config.timeouts;
    this._vertexIdType.internalValue = config.vertexIdType;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // az_code - computed: true, optional: false, required: false
  public get azCode() {
    return this.getStringAttribute('az_code');
  }

  // cpu_arch - computed: true, optional: true, required: false
  private _cpuArch?: string; 
  public get cpuArch() {
    return this.getStringAttribute('cpu_arch');
  }
  public set cpuArch(value: string) {
    this._cpuArch = value;
  }
  public resetCpuArch() {
    this._cpuArch = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cpuArchInput() {
    return this._cpuArch;
  }

  // crypt_algorithm - computed: false, optional: false, required: true
  private _cryptAlgorithm?: string; 
  public get cryptAlgorithm() {
    return this.getStringAttribute('crypt_algorithm');
  }
  public set cryptAlgorithm(value: string) {
    this._cryptAlgorithm = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cryptAlgorithmInput() {
    return this._cryptAlgorithm;
  }

  // enable_full_text_index - computed: true, optional: true, required: false
  private _enableFullTextIndex?: boolean | cdktf.IResolvable; 
  public get enableFullTextIndex() {
    return this.getBooleanAttribute('enable_full_text_index');
  }
  public set enableFullTextIndex(value: boolean | cdktf.IResolvable) {
    this._enableFullTextIndex = value;
  }
  public resetEnableFullTextIndex() {
    this._enableFullTextIndex = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableFullTextIndexInput() {
    return this._enableFullTextIndex;
  }

  // enable_https - computed: false, optional: false, required: true
  private _enableHttps?: boolean | cdktf.IResolvable; 
  public get enableHttps() {
    return this.getBooleanAttribute('enable_https');
  }
  public set enableHttps(value: boolean | cdktf.IResolvable) {
    this._enableHttps = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enableHttpsInput() {
    return this._enableHttps;
  }

  // enable_hyg - computed: true, optional: true, required: false
  private _enableHyg?: boolean | cdktf.IResolvable; 
  public get enableHyg() {
    return this.getBooleanAttribute('enable_hyg');
  }
  public set enableHyg(value: boolean | cdktf.IResolvable) {
    this._enableHyg = value;
  }
  public resetEnableHyg() {
    this._enableHyg = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableHygInput() {
    return this._enableHyg;
  }

  // enable_multi_az - computed: true, optional: true, required: false
  private _enableMultiAz?: boolean | cdktf.IResolvable; 
  public get enableMultiAz() {
    return this.getBooleanAttribute('enable_multi_az');
  }
  public set enableMultiAz(value: boolean | cdktf.IResolvable) {
    this._enableMultiAz = value;
  }
  public resetEnableMultiAz() {
    this._enableMultiAz = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableMultiAzInput() {
    return this._enableMultiAz;
  }

  // enable_rbac - computed: true, optional: true, required: false
  private _enableRbac?: boolean | cdktf.IResolvable; 
  public get enableRbac() {
    return this.getBooleanAttribute('enable_rbac');
  }
  public set enableRbac(value: boolean | cdktf.IResolvable) {
    this._enableRbac = value;
  }
  public resetEnableRbac() {
    this._enableRbac = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableRbacInput() {
    return this._enableRbac;
  }

  // enterprise_project_id - computed: true, optional: true, required: false
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

  // graph_size_type_index - computed: false, optional: false, required: true
  private _graphSizeTypeIndex?: string; 
  public get graphSizeTypeIndex() {
    return this.getStringAttribute('graph_size_type_index');
  }
  public set graphSizeTypeIndex(value: string) {
    this._graphSizeTypeIndex = value;
  }
  // Temporarily expose input value. Use with caution.
  public get graphSizeTypeIndexInput() {
    return this._graphSizeTypeIndex;
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

  // keep_backup - computed: true, optional: true, required: false
  private _keepBackup?: boolean | cdktf.IResolvable; 
  public get keepBackup() {
    return this.getBooleanAttribute('keep_backup');
  }
  public set keepBackup(value: boolean | cdktf.IResolvable) {
    this._keepBackup = value;
  }
  public resetKeepBackup() {
    this._keepBackup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keepBackupInput() {
    return this._keepBackup;
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

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }

  // product_type - computed: true, optional: true, required: false
  private _productType?: string; 
  public get productType() {
    return this.getStringAttribute('product_type');
  }
  public set productType(value: string) {
    this._productType = value;
  }
  public resetProductType() {
    this._productType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get productTypeInput() {
    return this._productType;
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

  // replication - computed: true, optional: true, required: false
  private _replication?: number; 
  public get replication() {
    return this.getNumberAttribute('replication');
  }
  public set replication(value: number) {
    this._replication = value;
  }
  public resetReplication() {
    this._replication = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get replicationInput() {
    return this._replication;
  }

  // security_group_id - computed: false, optional: false, required: true
  private _securityGroupId?: string; 
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }
  public set securityGroupId(value: string) {
    this._securityGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupIdInput() {
    return this._securityGroupId;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // tags - computed: true, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // traffic_ip_list - computed: true, optional: false, required: false
  public get trafficIpList() {
    return this.getListAttribute('traffic_ip_list');
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

  // encryption - computed: false, optional: true, required: false
  private _encryption = new GesGraphEncryptionOutputReference(this, "encryption");
  public get encryption() {
    return this._encryption;
  }
  public putEncryption(value: GesGraphEncryption) {
    this._encryption.internalValue = value;
  }
  public resetEncryption() {
    this._encryption.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptionInput() {
    return this._encryption.internalValue;
  }

  // lts_operation_trace - computed: false, optional: true, required: false
  private _ltsOperationTrace = new GesGraphLtsOperationTraceOutputReference(this, "lts_operation_trace");
  public get ltsOperationTrace() {
    return this._ltsOperationTrace;
  }
  public putLtsOperationTrace(value: GesGraphLtsOperationTrace) {
    this._ltsOperationTrace.internalValue = value;
  }
  public resetLtsOperationTrace() {
    this._ltsOperationTrace.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsOperationTraceInput() {
    return this._ltsOperationTrace.internalValue;
  }

  // public_ip - computed: false, optional: true, required: false
  private _publicIp = new GesGraphPublicIpOutputReference(this, "public_ip");
  public get publicIp() {
    return this._publicIp;
  }
  public putPublicIp(value: GesGraphPublicIp) {
    this._publicIp.internalValue = value;
  }
  public resetPublicIp() {
    this._publicIp.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpInput() {
    return this._publicIp.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new GesGraphTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: GesGraphTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // vertex_id_type - computed: false, optional: true, required: false
  private _vertexIdType = new GesGraphVertexIdTypeOutputReference(this, "vertex_id_type");
  public get vertexIdType() {
    return this._vertexIdType;
  }
  public putVertexIdType(value: GesGraphVertexIdType) {
    this._vertexIdType.internalValue = value;
  }
  public resetVertexIdType() {
    this._vertexIdType.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vertexIdTypeInput() {
    return this._vertexIdType.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cpu_arch: cdktf.stringToTerraform(this._cpuArch),
      crypt_algorithm: cdktf.stringToTerraform(this._cryptAlgorithm),
      enable_full_text_index: cdktf.booleanToTerraform(this._enableFullTextIndex),
      enable_https: cdktf.booleanToTerraform(this._enableHttps),
      enable_hyg: cdktf.booleanToTerraform(this._enableHyg),
      enable_multi_az: cdktf.booleanToTerraform(this._enableMultiAz),
      enable_rbac: cdktf.booleanToTerraform(this._enableRbac),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      graph_size_type_index: cdktf.stringToTerraform(this._graphSizeTypeIndex),
      id: cdktf.stringToTerraform(this._id),
      keep_backup: cdktf.booleanToTerraform(this._keepBackup),
      name: cdktf.stringToTerraform(this._name),
      product_type: cdktf.stringToTerraform(this._productType),
      region: cdktf.stringToTerraform(this._region),
      replication: cdktf.numberToTerraform(this._replication),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      encryption: gesGraphEncryptionToTerraform(this._encryption.internalValue),
      lts_operation_trace: gesGraphLtsOperationTraceToTerraform(this._ltsOperationTrace.internalValue),
      public_ip: gesGraphPublicIpToTerraform(this._publicIp.internalValue),
      timeouts: gesGraphTimeoutsToTerraform(this._timeouts.internalValue),
      vertex_id_type: gesGraphVertexIdTypeToTerraform(this._vertexIdType.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cpu_arch: {
        value: cdktf.stringToHclTerraform(this._cpuArch),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      crypt_algorithm: {
        value: cdktf.stringToHclTerraform(this._cryptAlgorithm),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_full_text_index: {
        value: cdktf.booleanToHclTerraform(this._enableFullTextIndex),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_https: {
        value: cdktf.booleanToHclTerraform(this._enableHttps),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_hyg: {
        value: cdktf.booleanToHclTerraform(this._enableHyg),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_multi_az: {
        value: cdktf.booleanToHclTerraform(this._enableMultiAz),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_rbac: {
        value: cdktf.booleanToHclTerraform(this._enableRbac),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      graph_size_type_index: {
        value: cdktf.stringToHclTerraform(this._graphSizeTypeIndex),
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
      keep_backup: {
        value: cdktf.booleanToHclTerraform(this._keepBackup),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      product_type: {
        value: cdktf.stringToHclTerraform(this._productType),
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
      replication: {
        value: cdktf.numberToHclTerraform(this._replication),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      security_group_id: {
        value: cdktf.stringToHclTerraform(this._securityGroupId),
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      encryption: {
        value: gesGraphEncryptionToHclTerraform(this._encryption.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "GesGraphEncryptionList",
      },
      lts_operation_trace: {
        value: gesGraphLtsOperationTraceToHclTerraform(this._ltsOperationTrace.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "GesGraphLtsOperationTraceList",
      },
      public_ip: {
        value: gesGraphPublicIpToHclTerraform(this._publicIp.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "GesGraphPublicIpList",
      },
      timeouts: {
        value: gesGraphTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "GesGraphTimeouts",
      },
      vertex_id_type: {
        value: gesGraphVertexIdTypeToHclTerraform(this._vertexIdType.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "GesGraphVertexIdTypeList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

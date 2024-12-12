// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CcmCertificateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the certificate authority.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#cert_brand CcmCertificate#cert_brand}
  */
  readonly certBrand: string;
  /**
  * Specifies the certificate type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#cert_type CcmCertificate#cert_type}
  */
  readonly certType: string;
  /**
  * Specifies the quantity of domain name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#domain_numbers CcmCertificate#domain_numbers}
  */
  readonly domainNumbers: number;
  /**
  * Specifies the type of domain name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#domain_type CcmCertificate#domain_type}
  */
  readonly domainType: string;
  /**
  * Specifies the validity period (year).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#effective_time CcmCertificate#effective_time}
  */
  readonly effectiveTime: number;
  /**
  * Specifies the enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#enterprise_project_id CcmCertificate#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#id CcmCertificate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the type of primary domain name in multiple domains.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#primary_domain_type CcmCertificate#primary_domain_type}
  */
  readonly primaryDomainType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#region CcmCertificate#region}
  */
  readonly region?: string;
  /**
  * Specifies the number of additional single domain names.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#single_domain_number CcmCertificate#single_domain_number}
  */
  readonly singleDomainNumber?: number;
  /**
  * Specifies the number of additional wildcard domain names.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#wildcard_domain_number CcmCertificate#wildcard_domain_number}
  */
  readonly wildcardDomainNumber?: number;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#timeouts CcmCertificate#timeouts}
  */
  readonly timeouts?: CcmCertificateTimeouts;
}
export interface CcmCertificateAuthentification {
}

export function ccmCertificateAuthentificationToTerraform(struct?: CcmCertificateAuthentification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function ccmCertificateAuthentificationToHclTerraform(struct?: CcmCertificateAuthentification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CcmCertificateAuthentificationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): CcmCertificateAuthentification | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CcmCertificateAuthentification | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // domain - computed: true, optional: false, required: false
  public get domain() {
    return this.getStringAttribute('domain');
  }

  // record_name - computed: true, optional: false, required: false
  public get recordName() {
    return this.getStringAttribute('record_name');
  }

  // record_type - computed: true, optional: false, required: false
  public get recordType() {
    return this.getStringAttribute('record_type');
  }

  // record_value - computed: true, optional: false, required: false
  public get recordValue() {
    return this.getStringAttribute('record_value');
  }
}

export class CcmCertificateAuthentificationList extends cdktf.ComplexList {

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
  public get(index: number): CcmCertificateAuthentificationOutputReference {
    return new CcmCertificateAuthentificationOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CcmCertificateTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#create CcmCertificate#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#delete CcmCertificate#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#update CcmCertificate#update}
  */
  readonly update?: string;
}

export function ccmCertificateTimeoutsToTerraform(struct?: CcmCertificateTimeouts | cdktf.IResolvable): any {
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


export function ccmCertificateTimeoutsToHclTerraform(struct?: CcmCertificateTimeouts | cdktf.IResolvable): any {
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

export class CcmCertificateTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CcmCertificateTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CcmCertificateTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate huaweicloud_ccm_certificate}
*/
export class CcmCertificate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_ccm_certificate";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CcmCertificate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CcmCertificate to import
  * @param importFromId The id of the existing CcmCertificate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CcmCertificate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_ccm_certificate", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate huaweicloud_ccm_certificate} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CcmCertificateConfig
  */
  public constructor(scope: Construct, id: string, config: CcmCertificateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_ccm_certificate',
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
    this._certBrand = config.certBrand;
    this._certType = config.certType;
    this._domainNumbers = config.domainNumbers;
    this._domainType = config.domainType;
    this._effectiveTime = config.effectiveTime;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._primaryDomainType = config.primaryDomainType;
    this._region = config.region;
    this._singleDomainNumber = config.singleDomainNumber;
    this._wildcardDomainNumber = config.wildcardDomainNumber;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // authentification - computed: true, optional: false, required: false
  private _authentification = new CcmCertificateAuthentificationList(this, "authentification", false);
  public get authentification() {
    return this._authentification;
  }

  // cert_brand - computed: false, optional: false, required: true
  private _certBrand?: string; 
  public get certBrand() {
    return this.getStringAttribute('cert_brand');
  }
  public set certBrand(value: string) {
    this._certBrand = value;
  }
  // Temporarily expose input value. Use with caution.
  public get certBrandInput() {
    return this._certBrand;
  }

  // cert_type - computed: false, optional: false, required: true
  private _certType?: string; 
  public get certType() {
    return this.getStringAttribute('cert_type');
  }
  public set certType(value: string) {
    this._certType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get certTypeInput() {
    return this._certType;
  }

  // domain - computed: true, optional: false, required: false
  public get domain() {
    return this.getStringAttribute('domain');
  }

  // domain_numbers - computed: false, optional: false, required: true
  private _domainNumbers?: number; 
  public get domainNumbers() {
    return this.getNumberAttribute('domain_numbers');
  }
  public set domainNumbers(value: number) {
    this._domainNumbers = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainNumbersInput() {
    return this._domainNumbers;
  }

  // domain_type - computed: false, optional: false, required: true
  private _domainType?: string; 
  public get domainType() {
    return this.getStringAttribute('domain_type');
  }
  public set domainType(value: string) {
    this._domainType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainTypeInput() {
    return this._domainType;
  }

  // effective_time - computed: false, optional: false, required: true
  private _effectiveTime?: number; 
  public get effectiveTime() {
    return this.getNumberAttribute('effective_time');
  }
  public set effectiveTime(value: number) {
    this._effectiveTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get effectiveTimeInput() {
    return this._effectiveTime;
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

  // fingerprint - computed: true, optional: false, required: false
  public get fingerprint() {
    return this.getStringAttribute('fingerprint');
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

  // issue_time - computed: true, optional: false, required: false
  public get issueTime() {
    return this.getStringAttribute('issue_time');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // not_after - computed: true, optional: false, required: false
  public get notAfter() {
    return this.getStringAttribute('not_after');
  }

  // not_before - computed: true, optional: false, required: false
  public get notBefore() {
    return this.getStringAttribute('not_before');
  }

  // order_id - computed: true, optional: false, required: false
  public get orderId() {
    return this.getStringAttribute('order_id');
  }

  // primary_domain_type - computed: true, optional: true, required: false
  private _primaryDomainType?: string; 
  public get primaryDomainType() {
    return this.getStringAttribute('primary_domain_type');
  }
  public set primaryDomainType(value: string) {
    this._primaryDomainType = value;
  }
  public resetPrimaryDomainType() {
    this._primaryDomainType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get primaryDomainTypeInput() {
    return this._primaryDomainType;
  }

  // push_support - computed: true, optional: false, required: false
  public get pushSupport() {
    return this.getStringAttribute('push_support');
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

  // revoke_reason - computed: true, optional: false, required: false
  public get revokeReason() {
    return this.getStringAttribute('revoke_reason');
  }

  // sans - computed: true, optional: false, required: false
  public get sans() {
    return this.getStringAttribute('sans');
  }

  // signature_algorithm - computed: true, optional: false, required: false
  public get signatureAlgorithm() {
    return this.getStringAttribute('signature_algorithm');
  }

  // single_domain_number - computed: true, optional: true, required: false
  private _singleDomainNumber?: number; 
  public get singleDomainNumber() {
    return this.getNumberAttribute('single_domain_number');
  }
  public set singleDomainNumber(value: number) {
    this._singleDomainNumber = value;
  }
  public resetSingleDomainNumber() {
    this._singleDomainNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get singleDomainNumberInput() {
    return this._singleDomainNumber;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // validation_method - computed: true, optional: false, required: false
  public get validationMethod() {
    return this.getStringAttribute('validation_method');
  }

  // validity_period - computed: true, optional: false, required: false
  public get validityPeriod() {
    return this.getNumberAttribute('validity_period');
  }

  // wildcard_domain_number - computed: true, optional: true, required: false
  private _wildcardDomainNumber?: number; 
  public get wildcardDomainNumber() {
    return this.getNumberAttribute('wildcard_domain_number');
  }
  public set wildcardDomainNumber(value: number) {
    this._wildcardDomainNumber = value;
  }
  public resetWildcardDomainNumber() {
    this._wildcardDomainNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get wildcardDomainNumberInput() {
    return this._wildcardDomainNumber;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CcmCertificateTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CcmCertificateTimeouts) {
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
      cert_brand: cdktf.stringToTerraform(this._certBrand),
      cert_type: cdktf.stringToTerraform(this._certType),
      domain_numbers: cdktf.numberToTerraform(this._domainNumbers),
      domain_type: cdktf.stringToTerraform(this._domainType),
      effective_time: cdktf.numberToTerraform(this._effectiveTime),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      primary_domain_type: cdktf.stringToTerraform(this._primaryDomainType),
      region: cdktf.stringToTerraform(this._region),
      single_domain_number: cdktf.numberToTerraform(this._singleDomainNumber),
      wildcard_domain_number: cdktf.numberToTerraform(this._wildcardDomainNumber),
      timeouts: ccmCertificateTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cert_brand: {
        value: cdktf.stringToHclTerraform(this._certBrand),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cert_type: {
        value: cdktf.stringToHclTerraform(this._certType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      domain_numbers: {
        value: cdktf.numberToHclTerraform(this._domainNumbers),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      domain_type: {
        value: cdktf.stringToHclTerraform(this._domainType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      effective_time: {
        value: cdktf.numberToHclTerraform(this._effectiveTime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
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
      primary_domain_type: {
        value: cdktf.stringToHclTerraform(this._primaryDomainType),
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
      single_domain_number: {
        value: cdktf.numberToHclTerraform(this._singleDomainNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      wildcard_domain_number: {
        value: cdktf.numberToHclTerraform(this._wildcardDomainNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      timeouts: {
        value: ccmCertificateTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CcmCertificateTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CcmCertificateApplyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the email of the applicant.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#applicant_email CcmCertificateApply#applicant_email}
  */
  readonly applicantEmail: string;
  /**
  * Specifies the name of the applicant.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#applicant_name CcmCertificateApply#applicant_name}
  */
  readonly applicantName: string;
  /**
  * Specifies the phone number of the applicant.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#applicant_phone CcmCertificateApply#applicant_phone}
  */
  readonly applicantPhone: string;
  /**
  * Specifies whether to push DNS verification information to HuaweiCloud resolution service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#auto_dns_auth CcmCertificateApply#auto_dns_auth}
  */
  readonly autoDnsAuth?: boolean | cdktf.IResolvable;
  /**
  * Specifies the signature algorithm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#ca_hash_algorithm CcmCertificateApply#ca_hash_algorithm}
  */
  readonly caHashAlgorithm?: string;
  /**
  * Specifies the CCM SSL certificate ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#certificate_id CcmCertificateApply#certificate_id}
  */
  readonly certificateId: string;
  /**
  * Specifies the city where the company is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#company_city CcmCertificateApply#company_city}
  */
  readonly companyCity?: string;
  /**
  * Specifies the company name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#company_name CcmCertificateApply#company_name}
  */
  readonly companyName?: string;
  /**
  * Specifies the province where the company is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#company_province CcmCertificateApply#company_province}
  */
  readonly companyProvince?: string;
  /**
  * Specifies the department name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#company_unit CcmCertificateApply#company_unit}
  */
  readonly companyUnit?: string;
  /**
  * Specifies the technical contact email.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#contact_email CcmCertificateApply#contact_email}
  */
  readonly contactEmail?: string;
  /**
  * Specifies the technical contact name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#contact_name CcmCertificateApply#contact_name}
  */
  readonly contactName?: string;
  /**
  * Specifies the technical contact phone number.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#contact_phone CcmCertificateApply#contact_phone}
  */
  readonly contactPhone?: string;
  /**
  * Specifies the country code.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#country CcmCertificateApply#country}
  */
  readonly country?: string;
  /**
  * Specifies the certificate CSR string, which must match the domain name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#csr CcmCertificateApply#csr}
  */
  readonly csr?: string;
  /**
  * Specifies the domain name bound to the certificate.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#domain CcmCertificateApply#domain}
  */
  readonly domain: string;
  /**
  * Specifies the domain name verification method.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#domain_method CcmCertificateApply#domain_method}
  */
  readonly domainMethod: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#id CcmCertificateApply#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the key algorithm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#key_algorithm CcmCertificateApply#key_algorithm}
  */
  readonly keyAlgorithm?: string;
  /**
  * The region in which to create the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#region CcmCertificateApply#region}
  */
  readonly region?: string;
  /**
  * Specifies additional domain names bound to multi-domain type certificates.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#sans CcmCertificateApply#sans}
  */
  readonly sans?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply huaweicloud_ccm_certificate_apply}
*/
export class CcmCertificateApply extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_ccm_certificate_apply";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CcmCertificateApply resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CcmCertificateApply to import
  * @param importFromId The id of the existing CcmCertificateApply that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CcmCertificateApply to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_ccm_certificate_apply", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ccm_certificate_apply huaweicloud_ccm_certificate_apply} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CcmCertificateApplyConfig
  */
  public constructor(scope: Construct, id: string, config: CcmCertificateApplyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_ccm_certificate_apply',
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
    this._applicantEmail = config.applicantEmail;
    this._applicantName = config.applicantName;
    this._applicantPhone = config.applicantPhone;
    this._autoDnsAuth = config.autoDnsAuth;
    this._caHashAlgorithm = config.caHashAlgorithm;
    this._certificateId = config.certificateId;
    this._companyCity = config.companyCity;
    this._companyName = config.companyName;
    this._companyProvince = config.companyProvince;
    this._companyUnit = config.companyUnit;
    this._contactEmail = config.contactEmail;
    this._contactName = config.contactName;
    this._contactPhone = config.contactPhone;
    this._country = config.country;
    this._csr = config.csr;
    this._domain = config.domain;
    this._domainMethod = config.domainMethod;
    this._id = config.id;
    this._keyAlgorithm = config.keyAlgorithm;
    this._region = config.region;
    this._sans = config.sans;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // applicant_email - computed: false, optional: false, required: true
  private _applicantEmail?: string; 
  public get applicantEmail() {
    return this.getStringAttribute('applicant_email');
  }
  public set applicantEmail(value: string) {
    this._applicantEmail = value;
  }
  // Temporarily expose input value. Use with caution.
  public get applicantEmailInput() {
    return this._applicantEmail;
  }

  // applicant_name - computed: false, optional: false, required: true
  private _applicantName?: string; 
  public get applicantName() {
    return this.getStringAttribute('applicant_name');
  }
  public set applicantName(value: string) {
    this._applicantName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get applicantNameInput() {
    return this._applicantName;
  }

  // applicant_phone - computed: false, optional: false, required: true
  private _applicantPhone?: string; 
  public get applicantPhone() {
    return this.getStringAttribute('applicant_phone');
  }
  public set applicantPhone(value: string) {
    this._applicantPhone = value;
  }
  // Temporarily expose input value. Use with caution.
  public get applicantPhoneInput() {
    return this._applicantPhone;
  }

  // auto_dns_auth - computed: false, optional: true, required: false
  private _autoDnsAuth?: boolean | cdktf.IResolvable; 
  public get autoDnsAuth() {
    return this.getBooleanAttribute('auto_dns_auth');
  }
  public set autoDnsAuth(value: boolean | cdktf.IResolvable) {
    this._autoDnsAuth = value;
  }
  public resetAutoDnsAuth() {
    this._autoDnsAuth = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoDnsAuthInput() {
    return this._autoDnsAuth;
  }

  // ca_hash_algorithm - computed: false, optional: true, required: false
  private _caHashAlgorithm?: string; 
  public get caHashAlgorithm() {
    return this.getStringAttribute('ca_hash_algorithm');
  }
  public set caHashAlgorithm(value: string) {
    this._caHashAlgorithm = value;
  }
  public resetCaHashAlgorithm() {
    this._caHashAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get caHashAlgorithmInput() {
    return this._caHashAlgorithm;
  }

  // certificate_id - computed: false, optional: false, required: true
  private _certificateId?: string; 
  public get certificateId() {
    return this.getStringAttribute('certificate_id');
  }
  public set certificateId(value: string) {
    this._certificateId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateIdInput() {
    return this._certificateId;
  }

  // company_city - computed: false, optional: true, required: false
  private _companyCity?: string; 
  public get companyCity() {
    return this.getStringAttribute('company_city');
  }
  public set companyCity(value: string) {
    this._companyCity = value;
  }
  public resetCompanyCity() {
    this._companyCity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get companyCityInput() {
    return this._companyCity;
  }

  // company_name - computed: false, optional: true, required: false
  private _companyName?: string; 
  public get companyName() {
    return this.getStringAttribute('company_name');
  }
  public set companyName(value: string) {
    this._companyName = value;
  }
  public resetCompanyName() {
    this._companyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get companyNameInput() {
    return this._companyName;
  }

  // company_province - computed: false, optional: true, required: false
  private _companyProvince?: string; 
  public get companyProvince() {
    return this.getStringAttribute('company_province');
  }
  public set companyProvince(value: string) {
    this._companyProvince = value;
  }
  public resetCompanyProvince() {
    this._companyProvince = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get companyProvinceInput() {
    return this._companyProvince;
  }

  // company_unit - computed: false, optional: true, required: false
  private _companyUnit?: string; 
  public get companyUnit() {
    return this.getStringAttribute('company_unit');
  }
  public set companyUnit(value: string) {
    this._companyUnit = value;
  }
  public resetCompanyUnit() {
    this._companyUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get companyUnitInput() {
    return this._companyUnit;
  }

  // contact_email - computed: false, optional: true, required: false
  private _contactEmail?: string; 
  public get contactEmail() {
    return this.getStringAttribute('contact_email');
  }
  public set contactEmail(value: string) {
    this._contactEmail = value;
  }
  public resetContactEmail() {
    this._contactEmail = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contactEmailInput() {
    return this._contactEmail;
  }

  // contact_name - computed: false, optional: true, required: false
  private _contactName?: string; 
  public get contactName() {
    return this.getStringAttribute('contact_name');
  }
  public set contactName(value: string) {
    this._contactName = value;
  }
  public resetContactName() {
    this._contactName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contactNameInput() {
    return this._contactName;
  }

  // contact_phone - computed: false, optional: true, required: false
  private _contactPhone?: string; 
  public get contactPhone() {
    return this.getStringAttribute('contact_phone');
  }
  public set contactPhone(value: string) {
    this._contactPhone = value;
  }
  public resetContactPhone() {
    this._contactPhone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contactPhoneInput() {
    return this._contactPhone;
  }

  // country - computed: false, optional: true, required: false
  private _country?: string; 
  public get country() {
    return this.getStringAttribute('country');
  }
  public set country(value: string) {
    this._country = value;
  }
  public resetCountry() {
    this._country = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get countryInput() {
    return this._country;
  }

  // csr - computed: false, optional: true, required: false
  private _csr?: string; 
  public get csr() {
    return this.getStringAttribute('csr');
  }
  public set csr(value: string) {
    this._csr = value;
  }
  public resetCsr() {
    this._csr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get csrInput() {
    return this._csr;
  }

  // domain - computed: false, optional: false, required: true
  private _domain?: string; 
  public get domain() {
    return this.getStringAttribute('domain');
  }
  public set domain(value: string) {
    this._domain = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainInput() {
    return this._domain;
  }

  // domain_method - computed: false, optional: false, required: true
  private _domainMethod?: string; 
  public get domainMethod() {
    return this.getStringAttribute('domain_method');
  }
  public set domainMethod(value: string) {
    this._domainMethod = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainMethodInput() {
    return this._domainMethod;
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

  // key_algorithm - computed: false, optional: true, required: false
  private _keyAlgorithm?: string; 
  public get keyAlgorithm() {
    return this.getStringAttribute('key_algorithm');
  }
  public set keyAlgorithm(value: string) {
    this._keyAlgorithm = value;
  }
  public resetKeyAlgorithm() {
    this._keyAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyAlgorithmInput() {
    return this._keyAlgorithm;
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

  // sans - computed: false, optional: true, required: false
  private _sans?: string; 
  public get sans() {
    return this.getStringAttribute('sans');
  }
  public set sans(value: string) {
    this._sans = value;
  }
  public resetSans() {
    this._sans = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sansInput() {
    return this._sans;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      applicant_email: cdktf.stringToTerraform(this._applicantEmail),
      applicant_name: cdktf.stringToTerraform(this._applicantName),
      applicant_phone: cdktf.stringToTerraform(this._applicantPhone),
      auto_dns_auth: cdktf.booleanToTerraform(this._autoDnsAuth),
      ca_hash_algorithm: cdktf.stringToTerraform(this._caHashAlgorithm),
      certificate_id: cdktf.stringToTerraform(this._certificateId),
      company_city: cdktf.stringToTerraform(this._companyCity),
      company_name: cdktf.stringToTerraform(this._companyName),
      company_province: cdktf.stringToTerraform(this._companyProvince),
      company_unit: cdktf.stringToTerraform(this._companyUnit),
      contact_email: cdktf.stringToTerraform(this._contactEmail),
      contact_name: cdktf.stringToTerraform(this._contactName),
      contact_phone: cdktf.stringToTerraform(this._contactPhone),
      country: cdktf.stringToTerraform(this._country),
      csr: cdktf.stringToTerraform(this._csr),
      domain: cdktf.stringToTerraform(this._domain),
      domain_method: cdktf.stringToTerraform(this._domainMethod),
      id: cdktf.stringToTerraform(this._id),
      key_algorithm: cdktf.stringToTerraform(this._keyAlgorithm),
      region: cdktf.stringToTerraform(this._region),
      sans: cdktf.stringToTerraform(this._sans),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      applicant_email: {
        value: cdktf.stringToHclTerraform(this._applicantEmail),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      applicant_name: {
        value: cdktf.stringToHclTerraform(this._applicantName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      applicant_phone: {
        value: cdktf.stringToHclTerraform(this._applicantPhone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auto_dns_auth: {
        value: cdktf.booleanToHclTerraform(this._autoDnsAuth),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      ca_hash_algorithm: {
        value: cdktf.stringToHclTerraform(this._caHashAlgorithm),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      certificate_id: {
        value: cdktf.stringToHclTerraform(this._certificateId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      company_city: {
        value: cdktf.stringToHclTerraform(this._companyCity),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      company_name: {
        value: cdktf.stringToHclTerraform(this._companyName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      company_province: {
        value: cdktf.stringToHclTerraform(this._companyProvince),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      company_unit: {
        value: cdktf.stringToHclTerraform(this._companyUnit),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      contact_email: {
        value: cdktf.stringToHclTerraform(this._contactEmail),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      contact_name: {
        value: cdktf.stringToHclTerraform(this._contactName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      contact_phone: {
        value: cdktf.stringToHclTerraform(this._contactPhone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      country: {
        value: cdktf.stringToHclTerraform(this._country),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      csr: {
        value: cdktf.stringToHclTerraform(this._csr),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      domain: {
        value: cdktf.stringToHclTerraform(this._domain),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      domain_method: {
        value: cdktf.stringToHclTerraform(this._domainMethod),
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
      key_algorithm: {
        value: cdktf.stringToHclTerraform(this._keyAlgorithm),
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
      sans: {
        value: cdktf.stringToHclTerraform(this._sans),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

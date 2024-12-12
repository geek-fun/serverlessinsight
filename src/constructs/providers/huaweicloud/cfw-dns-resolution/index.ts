// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CfwDnsResolutionConfig extends cdktf.TerraformMetaArguments {
  /**
  * The custom DNS servers.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution#custom_dns_servers CfwDnsResolution#custom_dns_servers}
  */
  readonly customDnsServers?: string[];
  /**
  * The default DNS servers.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution#default_dns_servers CfwDnsResolution#default_dns_servers}
  */
  readonly defaultDnsServers?: string[];
  /**
  * The ID of the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution#fw_instance_id CfwDnsResolution#fw_instance_id}
  */
  readonly fwInstanceId: string;
  /**
  * The health check domain name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution#health_check_domain_name CfwDnsResolution#health_check_domain_name}
  */
  readonly healthCheckDomainName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution#id CfwDnsResolution#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution#region CfwDnsResolution#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution huaweicloud_cfw_dns_resolution}
*/
export class CfwDnsResolution extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cfw_dns_resolution";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CfwDnsResolution resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CfwDnsResolution to import
  * @param importFromId The id of the existing CfwDnsResolution that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CfwDnsResolution to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cfw_dns_resolution", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_dns_resolution huaweicloud_cfw_dns_resolution} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CfwDnsResolutionConfig
  */
  public constructor(scope: Construct, id: string, config: CfwDnsResolutionConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cfw_dns_resolution',
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
    this._customDnsServers = config.customDnsServers;
    this._defaultDnsServers = config.defaultDnsServers;
    this._fwInstanceId = config.fwInstanceId;
    this._healthCheckDomainName = config.healthCheckDomainName;
    this._id = config.id;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // custom_dns_servers - computed: false, optional: true, required: false
  private _customDnsServers?: string[]; 
  public get customDnsServers() {
    return cdktf.Fn.tolist(this.getListAttribute('custom_dns_servers'));
  }
  public set customDnsServers(value: string[]) {
    this._customDnsServers = value;
  }
  public resetCustomDnsServers() {
    this._customDnsServers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customDnsServersInput() {
    return this._customDnsServers;
  }

  // default_dns_servers - computed: false, optional: true, required: false
  private _defaultDnsServers?: string[]; 
  public get defaultDnsServers() {
    return cdktf.Fn.tolist(this.getListAttribute('default_dns_servers'));
  }
  public set defaultDnsServers(value: string[]) {
    this._defaultDnsServers = value;
  }
  public resetDefaultDnsServers() {
    this._defaultDnsServers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultDnsServersInput() {
    return this._defaultDnsServers;
  }

  // fw_instance_id - computed: false, optional: false, required: true
  private _fwInstanceId?: string; 
  public get fwInstanceId() {
    return this.getStringAttribute('fw_instance_id');
  }
  public set fwInstanceId(value: string) {
    this._fwInstanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fwInstanceIdInput() {
    return this._fwInstanceId;
  }

  // health_check_domain_name - computed: true, optional: true, required: false
  private _healthCheckDomainName?: string; 
  public get healthCheckDomainName() {
    return this.getStringAttribute('health_check_domain_name');
  }
  public set healthCheckDomainName(value: string) {
    this._healthCheckDomainName = value;
  }
  public resetHealthCheckDomainName() {
    this._healthCheckDomainName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckDomainNameInput() {
    return this._healthCheckDomainName;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      custom_dns_servers: cdktf.listMapper(cdktf.stringToTerraform, false)(this._customDnsServers),
      default_dns_servers: cdktf.listMapper(cdktf.stringToTerraform, false)(this._defaultDnsServers),
      fw_instance_id: cdktf.stringToTerraform(this._fwInstanceId),
      health_check_domain_name: cdktf.stringToTerraform(this._healthCheckDomainName),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      custom_dns_servers: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._customDnsServers),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      default_dns_servers: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._defaultDnsServers),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      fw_instance_id: {
        value: cdktf.stringToHclTerraform(this._fwInstanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      health_check_domain_name: {
        value: cdktf.stringToHclTerraform(this._healthCheckDomainName),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

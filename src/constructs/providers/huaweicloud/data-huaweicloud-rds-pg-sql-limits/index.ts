// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudRdsPgSqlLimitsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the name of the database.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#db_name DataHuaweicloudRdsPgSqlLimits#db_name}
  */
  readonly dbName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#id DataHuaweicloudRdsPgSqlLimits#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of RDS PostgreSQL instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#instance_id DataHuaweicloudRdsPgSqlLimits#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies whether the SQL limit is effective.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#is_effective DataHuaweicloudRdsPgSqlLimits#is_effective}
  */
  readonly isEffective?: string;
  /**
  * Specifies the number of SQL statements executed simultaneously.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#max_concurrency DataHuaweicloudRdsPgSqlLimits#max_concurrency}
  */
  readonly maxConcurrency?: string;
  /**
  * Specifies the max waiting time in seconds.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#max_waiting DataHuaweicloudRdsPgSqlLimits#max_waiting}
  */
  readonly maxWaiting?: string;
  /**
  * Specifies the query ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#query_id DataHuaweicloudRdsPgSqlLimits#query_id}
  */
  readonly queryId?: string;
  /**
  * Specifies the text form of SQL statement.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#query_string DataHuaweicloudRdsPgSqlLimits#query_string}
  */
  readonly queryString?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#region DataHuaweicloudRdsPgSqlLimits#region}
  */
  readonly region?: string;
  /**
  * Specifies the query order for names that are not schema qualified.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#search_path DataHuaweicloudRdsPgSqlLimits#search_path}
  */
  readonly searchPath?: string;
  /**
  * Specifies the ID of SQL limit.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#sql_limit_id DataHuaweicloudRdsPgSqlLimits#sql_limit_id}
  */
  readonly sqlLimitId?: string;
}
export interface DataHuaweicloudRdsPgSqlLimitsSqlLimits {
}

export function dataHuaweicloudRdsPgSqlLimitsSqlLimitsToTerraform(struct?: DataHuaweicloudRdsPgSqlLimitsSqlLimits): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRdsPgSqlLimitsSqlLimitsToHclTerraform(struct?: DataHuaweicloudRdsPgSqlLimitsSqlLimits): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRdsPgSqlLimitsSqlLimitsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRdsPgSqlLimitsSqlLimits | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRdsPgSqlLimitsSqlLimits | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_effective - computed: true, optional: false, required: false
  public get isEffective() {
    return this.getBooleanAttribute('is_effective');
  }

  // max_concurrency - computed: true, optional: false, required: false
  public get maxConcurrency() {
    return this.getNumberAttribute('max_concurrency');
  }

  // max_waiting - computed: true, optional: false, required: false
  public get maxWaiting() {
    return this.getNumberAttribute('max_waiting');
  }

  // query_id - computed: true, optional: false, required: false
  public get queryId() {
    return this.getStringAttribute('query_id');
  }

  // query_string - computed: true, optional: false, required: false
  public get queryString() {
    return this.getStringAttribute('query_string');
  }

  // search_path - computed: true, optional: false, required: false
  public get searchPath() {
    return this.getStringAttribute('search_path');
  }
}

export class DataHuaweicloudRdsPgSqlLimitsSqlLimitsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRdsPgSqlLimitsSqlLimitsOutputReference {
    return new DataHuaweicloudRdsPgSqlLimitsSqlLimitsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits huaweicloud_rds_pg_sql_limits}
*/
export class DataHuaweicloudRdsPgSqlLimits extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rds_pg_sql_limits";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudRdsPgSqlLimits resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudRdsPgSqlLimits to import
  * @param importFromId The id of the existing DataHuaweicloudRdsPgSqlLimits that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudRdsPgSqlLimits to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rds_pg_sql_limits", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rds_pg_sql_limits huaweicloud_rds_pg_sql_limits} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudRdsPgSqlLimitsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudRdsPgSqlLimitsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rds_pg_sql_limits',
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
    this._dbName = config.dbName;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._isEffective = config.isEffective;
    this._maxConcurrency = config.maxConcurrency;
    this._maxWaiting = config.maxWaiting;
    this._queryId = config.queryId;
    this._queryString = config.queryString;
    this._region = config.region;
    this._searchPath = config.searchPath;
    this._sqlLimitId = config.sqlLimitId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // db_name - computed: false, optional: false, required: true
  private _dbName?: string; 
  public get dbName() {
    return this.getStringAttribute('db_name');
  }
  public set dbName(value: string) {
    this._dbName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dbNameInput() {
    return this._dbName;
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // is_effective - computed: false, optional: true, required: false
  private _isEffective?: string; 
  public get isEffective() {
    return this.getStringAttribute('is_effective');
  }
  public set isEffective(value: string) {
    this._isEffective = value;
  }
  public resetIsEffective() {
    this._isEffective = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isEffectiveInput() {
    return this._isEffective;
  }

  // max_concurrency - computed: false, optional: true, required: false
  private _maxConcurrency?: string; 
  public get maxConcurrency() {
    return this.getStringAttribute('max_concurrency');
  }
  public set maxConcurrency(value: string) {
    this._maxConcurrency = value;
  }
  public resetMaxConcurrency() {
    this._maxConcurrency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxConcurrencyInput() {
    return this._maxConcurrency;
  }

  // max_waiting - computed: false, optional: true, required: false
  private _maxWaiting?: string; 
  public get maxWaiting() {
    return this.getStringAttribute('max_waiting');
  }
  public set maxWaiting(value: string) {
    this._maxWaiting = value;
  }
  public resetMaxWaiting() {
    this._maxWaiting = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxWaitingInput() {
    return this._maxWaiting;
  }

  // query_id - computed: false, optional: true, required: false
  private _queryId?: string; 
  public get queryId() {
    return this.getStringAttribute('query_id');
  }
  public set queryId(value: string) {
    this._queryId = value;
  }
  public resetQueryId() {
    this._queryId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queryIdInput() {
    return this._queryId;
  }

  // query_string - computed: false, optional: true, required: false
  private _queryString?: string; 
  public get queryString() {
    return this.getStringAttribute('query_string');
  }
  public set queryString(value: string) {
    this._queryString = value;
  }
  public resetQueryString() {
    this._queryString = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queryStringInput() {
    return this._queryString;
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

  // search_path - computed: false, optional: true, required: false
  private _searchPath?: string; 
  public get searchPath() {
    return this.getStringAttribute('search_path');
  }
  public set searchPath(value: string) {
    this._searchPath = value;
  }
  public resetSearchPath() {
    this._searchPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get searchPathInput() {
    return this._searchPath;
  }

  // sql_limit_id - computed: false, optional: true, required: false
  private _sqlLimitId?: string; 
  public get sqlLimitId() {
    return this.getStringAttribute('sql_limit_id');
  }
  public set sqlLimitId(value: string) {
    this._sqlLimitId = value;
  }
  public resetSqlLimitId() {
    this._sqlLimitId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sqlLimitIdInput() {
    return this._sqlLimitId;
  }

  // sql_limits - computed: true, optional: false, required: false
  private _sqlLimits = new DataHuaweicloudRdsPgSqlLimitsSqlLimitsList(this, "sql_limits", false);
  public get sqlLimits() {
    return this._sqlLimits;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      db_name: cdktf.stringToTerraform(this._dbName),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      is_effective: cdktf.stringToTerraform(this._isEffective),
      max_concurrency: cdktf.stringToTerraform(this._maxConcurrency),
      max_waiting: cdktf.stringToTerraform(this._maxWaiting),
      query_id: cdktf.stringToTerraform(this._queryId),
      query_string: cdktf.stringToTerraform(this._queryString),
      region: cdktf.stringToTerraform(this._region),
      search_path: cdktf.stringToTerraform(this._searchPath),
      sql_limit_id: cdktf.stringToTerraform(this._sqlLimitId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      db_name: {
        value: cdktf.stringToHclTerraform(this._dbName),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_effective: {
        value: cdktf.stringToHclTerraform(this._isEffective),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      max_concurrency: {
        value: cdktf.stringToHclTerraform(this._maxConcurrency),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      max_waiting: {
        value: cdktf.stringToHclTerraform(this._maxWaiting),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      query_id: {
        value: cdktf.stringToHclTerraform(this._queryId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      query_string: {
        value: cdktf.stringToHclTerraform(this._queryString),
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
      search_path: {
        value: cdktf.stringToHclTerraform(this._searchPath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      sql_limit_id: {
        value: cdktf.stringToHclTerraform(this._sqlLimitId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

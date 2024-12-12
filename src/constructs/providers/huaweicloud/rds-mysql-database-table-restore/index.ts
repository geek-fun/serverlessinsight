// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RdsMysqlDatabaseTableRestoreConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#id RdsMysqlDatabaseTableRestore#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of RDS MySQL instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#instance_id RdsMysqlDatabaseTableRestore#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies whether to use fast restoration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#is_fast_restore RdsMysqlDatabaseTableRestore#is_fast_restore}
  */
  readonly isFastRestore?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#region RdsMysqlDatabaseTableRestore#region}
  */
  readonly region?: string;
  /**
  * Specifies the restoration time point.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#restore_time RdsMysqlDatabaseTableRestore#restore_time}
  */
  readonly restoreTime: number;
  /**
  * databases block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#databases RdsMysqlDatabaseTableRestore#databases}
  */
  readonly databases?: RdsMysqlDatabaseTableRestoreDatabases[] | cdktf.IResolvable;
  /**
  * restore_tables block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#restore_tables RdsMysqlDatabaseTableRestore#restore_tables}
  */
  readonly restoreTables?: RdsMysqlDatabaseTableRestoreRestoreTables[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#timeouts RdsMysqlDatabaseTableRestore#timeouts}
  */
  readonly timeouts?: RdsMysqlDatabaseTableRestoreTimeouts;
}
export interface RdsMysqlDatabaseTableRestoreDatabases {
  /**
  * Specifies the name of the database after restoration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#new_name RdsMysqlDatabaseTableRestore#new_name}
  */
  readonly newName: string;
  /**
  * Specifies the name of the database before restoration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#old_name RdsMysqlDatabaseTableRestore#old_name}
  */
  readonly oldName: string;
}

export function rdsMysqlDatabaseTableRestoreDatabasesToTerraform(struct?: RdsMysqlDatabaseTableRestoreDatabases | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    new_name: cdktf.stringToTerraform(struct!.newName),
    old_name: cdktf.stringToTerraform(struct!.oldName),
  }
}


export function rdsMysqlDatabaseTableRestoreDatabasesToHclTerraform(struct?: RdsMysqlDatabaseTableRestoreDatabases | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    new_name: {
      value: cdktf.stringToHclTerraform(struct!.newName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    old_name: {
      value: cdktf.stringToHclTerraform(struct!.oldName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RdsMysqlDatabaseTableRestoreDatabasesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): RdsMysqlDatabaseTableRestoreDatabases | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._newName !== undefined) {
      hasAnyValues = true;
      internalValueResult.newName = this._newName;
    }
    if (this._oldName !== undefined) {
      hasAnyValues = true;
      internalValueResult.oldName = this._oldName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdsMysqlDatabaseTableRestoreDatabases | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._newName = undefined;
      this._oldName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._newName = value.newName;
      this._oldName = value.oldName;
    }
  }

  // new_name - computed: false, optional: false, required: true
  private _newName?: string; 
  public get newName() {
    return this.getStringAttribute('new_name');
  }
  public set newName(value: string) {
    this._newName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get newNameInput() {
    return this._newName;
  }

  // old_name - computed: false, optional: false, required: true
  private _oldName?: string; 
  public get oldName() {
    return this.getStringAttribute('old_name');
  }
  public set oldName(value: string) {
    this._oldName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get oldNameInput() {
    return this._oldName;
  }
}

export class RdsMysqlDatabaseTableRestoreDatabasesList extends cdktf.ComplexList {
  public internalValue? : RdsMysqlDatabaseTableRestoreDatabases[] | cdktf.IResolvable

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
  public get(index: number): RdsMysqlDatabaseTableRestoreDatabasesOutputReference {
    return new RdsMysqlDatabaseTableRestoreDatabasesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface RdsMysqlDatabaseTableRestoreRestoreTablesTables {
  /**
  * Specifies the name of the table after restoration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#new_name RdsMysqlDatabaseTableRestore#new_name}
  */
  readonly newName: string;
  /**
  * Specifies the name of the table before restoration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#old_name RdsMysqlDatabaseTableRestore#old_name}
  */
  readonly oldName: string;
}

export function rdsMysqlDatabaseTableRestoreRestoreTablesTablesToTerraform(struct?: RdsMysqlDatabaseTableRestoreRestoreTablesTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    new_name: cdktf.stringToTerraform(struct!.newName),
    old_name: cdktf.stringToTerraform(struct!.oldName),
  }
}


export function rdsMysqlDatabaseTableRestoreRestoreTablesTablesToHclTerraform(struct?: RdsMysqlDatabaseTableRestoreRestoreTablesTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    new_name: {
      value: cdktf.stringToHclTerraform(struct!.newName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    old_name: {
      value: cdktf.stringToHclTerraform(struct!.oldName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RdsMysqlDatabaseTableRestoreRestoreTablesTablesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): RdsMysqlDatabaseTableRestoreRestoreTablesTables | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._newName !== undefined) {
      hasAnyValues = true;
      internalValueResult.newName = this._newName;
    }
    if (this._oldName !== undefined) {
      hasAnyValues = true;
      internalValueResult.oldName = this._oldName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdsMysqlDatabaseTableRestoreRestoreTablesTables | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._newName = undefined;
      this._oldName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._newName = value.newName;
      this._oldName = value.oldName;
    }
  }

  // new_name - computed: false, optional: false, required: true
  private _newName?: string; 
  public get newName() {
    return this.getStringAttribute('new_name');
  }
  public set newName(value: string) {
    this._newName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get newNameInput() {
    return this._newName;
  }

  // old_name - computed: false, optional: false, required: true
  private _oldName?: string; 
  public get oldName() {
    return this.getStringAttribute('old_name');
  }
  public set oldName(value: string) {
    this._oldName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get oldNameInput() {
    return this._oldName;
  }
}

export class RdsMysqlDatabaseTableRestoreRestoreTablesTablesList extends cdktf.ComplexList {
  public internalValue? : RdsMysqlDatabaseTableRestoreRestoreTablesTables[] | cdktf.IResolvable

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
  public get(index: number): RdsMysqlDatabaseTableRestoreRestoreTablesTablesOutputReference {
    return new RdsMysqlDatabaseTableRestoreRestoreTablesTablesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface RdsMysqlDatabaseTableRestoreRestoreTables {
  /**
  * Specifies the database name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#database RdsMysqlDatabaseTableRestore#database}
  */
  readonly database: string;
  /**
  * tables block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#tables RdsMysqlDatabaseTableRestore#tables}
  */
  readonly tables: RdsMysqlDatabaseTableRestoreRestoreTablesTables[] | cdktf.IResolvable;
}

export function rdsMysqlDatabaseTableRestoreRestoreTablesToTerraform(struct?: RdsMysqlDatabaseTableRestoreRestoreTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    database: cdktf.stringToTerraform(struct!.database),
    tables: cdktf.listMapper(rdsMysqlDatabaseTableRestoreRestoreTablesTablesToTerraform, true)(struct!.tables),
  }
}


export function rdsMysqlDatabaseTableRestoreRestoreTablesToHclTerraform(struct?: RdsMysqlDatabaseTableRestoreRestoreTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    database: {
      value: cdktf.stringToHclTerraform(struct!.database),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    tables: {
      value: cdktf.listMapperHcl(rdsMysqlDatabaseTableRestoreRestoreTablesTablesToHclTerraform, true)(struct!.tables),
      isBlock: true,
      type: "list",
      storageClassType: "RdsMysqlDatabaseTableRestoreRestoreTablesTablesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RdsMysqlDatabaseTableRestoreRestoreTablesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): RdsMysqlDatabaseTableRestoreRestoreTables | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._database !== undefined) {
      hasAnyValues = true;
      internalValueResult.database = this._database;
    }
    if (this._tables?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.tables = this._tables?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdsMysqlDatabaseTableRestoreRestoreTables | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._database = undefined;
      this._tables.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._database = value.database;
      this._tables.internalValue = value.tables;
    }
  }

  // database - computed: false, optional: false, required: true
  private _database?: string; 
  public get database() {
    return this.getStringAttribute('database');
  }
  public set database(value: string) {
    this._database = value;
  }
  // Temporarily expose input value. Use with caution.
  public get databaseInput() {
    return this._database;
  }

  // tables - computed: false, optional: false, required: true
  private _tables = new RdsMysqlDatabaseTableRestoreRestoreTablesTablesList(this, "tables", false);
  public get tables() {
    return this._tables;
  }
  public putTables(value: RdsMysqlDatabaseTableRestoreRestoreTablesTables[] | cdktf.IResolvable) {
    this._tables.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get tablesInput() {
    return this._tables.internalValue;
  }
}

export class RdsMysqlDatabaseTableRestoreRestoreTablesList extends cdktf.ComplexList {
  public internalValue? : RdsMysqlDatabaseTableRestoreRestoreTables[] | cdktf.IResolvable

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
  public get(index: number): RdsMysqlDatabaseTableRestoreRestoreTablesOutputReference {
    return new RdsMysqlDatabaseTableRestoreRestoreTablesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface RdsMysqlDatabaseTableRestoreTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#create RdsMysqlDatabaseTableRestore#create}
  */
  readonly create?: string;
}

export function rdsMysqlDatabaseTableRestoreTimeoutsToTerraform(struct?: RdsMysqlDatabaseTableRestoreTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function rdsMysqlDatabaseTableRestoreTimeoutsToHclTerraform(struct?: RdsMysqlDatabaseTableRestoreTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RdsMysqlDatabaseTableRestoreTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): RdsMysqlDatabaseTableRestoreTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdsMysqlDatabaseTableRestoreTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore huaweicloud_rds_mysql_database_table_restore}
*/
export class RdsMysqlDatabaseTableRestore extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rds_mysql_database_table_restore";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a RdsMysqlDatabaseTableRestore resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the RdsMysqlDatabaseTableRestore to import
  * @param importFromId The id of the existing RdsMysqlDatabaseTableRestore that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the RdsMysqlDatabaseTableRestore to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rds_mysql_database_table_restore", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rds_mysql_database_table_restore huaweicloud_rds_mysql_database_table_restore} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RdsMysqlDatabaseTableRestoreConfig
  */
  public constructor(scope: Construct, id: string, config: RdsMysqlDatabaseTableRestoreConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rds_mysql_database_table_restore',
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
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._isFastRestore = config.isFastRestore;
    this._region = config.region;
    this._restoreTime = config.restoreTime;
    this._databases.internalValue = config.databases;
    this._restoreTables.internalValue = config.restoreTables;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // is_fast_restore - computed: false, optional: true, required: false
  private _isFastRestore?: boolean | cdktf.IResolvable; 
  public get isFastRestore() {
    return this.getBooleanAttribute('is_fast_restore');
  }
  public set isFastRestore(value: boolean | cdktf.IResolvable) {
    this._isFastRestore = value;
  }
  public resetIsFastRestore() {
    this._isFastRestore = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isFastRestoreInput() {
    return this._isFastRestore;
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

  // restore_time - computed: false, optional: false, required: true
  private _restoreTime?: number; 
  public get restoreTime() {
    return this.getNumberAttribute('restore_time');
  }
  public set restoreTime(value: number) {
    this._restoreTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get restoreTimeInput() {
    return this._restoreTime;
  }

  // databases - computed: false, optional: true, required: false
  private _databases = new RdsMysqlDatabaseTableRestoreDatabasesList(this, "databases", false);
  public get databases() {
    return this._databases;
  }
  public putDatabases(value: RdsMysqlDatabaseTableRestoreDatabases[] | cdktf.IResolvable) {
    this._databases.internalValue = value;
  }
  public resetDatabases() {
    this._databases.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get databasesInput() {
    return this._databases.internalValue;
  }

  // restore_tables - computed: false, optional: true, required: false
  private _restoreTables = new RdsMysqlDatabaseTableRestoreRestoreTablesList(this, "restore_tables", false);
  public get restoreTables() {
    return this._restoreTables;
  }
  public putRestoreTables(value: RdsMysqlDatabaseTableRestoreRestoreTables[] | cdktf.IResolvable) {
    this._restoreTables.internalValue = value;
  }
  public resetRestoreTables() {
    this._restoreTables.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get restoreTablesInput() {
    return this._restoreTables.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new RdsMysqlDatabaseTableRestoreTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: RdsMysqlDatabaseTableRestoreTimeouts) {
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
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      is_fast_restore: cdktf.booleanToTerraform(this._isFastRestore),
      region: cdktf.stringToTerraform(this._region),
      restore_time: cdktf.numberToTerraform(this._restoreTime),
      databases: cdktf.listMapper(rdsMysqlDatabaseTableRestoreDatabasesToTerraform, true)(this._databases.internalValue),
      restore_tables: cdktf.listMapper(rdsMysqlDatabaseTableRestoreRestoreTablesToTerraform, true)(this._restoreTables.internalValue),
      timeouts: rdsMysqlDatabaseTableRestoreTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
      is_fast_restore: {
        value: cdktf.booleanToHclTerraform(this._isFastRestore),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      restore_time: {
        value: cdktf.numberToHclTerraform(this._restoreTime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      databases: {
        value: cdktf.listMapperHcl(rdsMysqlDatabaseTableRestoreDatabasesToHclTerraform, true)(this._databases.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "RdsMysqlDatabaseTableRestoreDatabasesList",
      },
      restore_tables: {
        value: cdktf.listMapperHcl(rdsMysqlDatabaseTableRestoreRestoreTablesToHclTerraform, true)(this._restoreTables.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "RdsMysqlDatabaseTableRestoreRestoreTablesList",
      },
      timeouts: {
        value: rdsMysqlDatabaseTableRestoreTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "RdsMysqlDatabaseTableRestoreTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

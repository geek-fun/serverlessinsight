// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MeetingConferenceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#account_name MeetingConference#account_name}
  */
  readonly accountName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#account_password MeetingConference#account_password}
  */
  readonly accountPassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#app_id MeetingConference#app_id}
  */
  readonly appId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#app_key MeetingConference#app_key}
  */
  readonly appKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#aux_address MeetingConference#aux_address}
  */
  readonly auxAddress?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#corp_id MeetingConference#corp_id}
  */
  readonly corpId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#duration MeetingConference#duration}
  */
  readonly duration: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#encrypt_mode MeetingConference#encrypt_mode}
  */
  readonly encryptMode?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#id MeetingConference#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_auto_record MeetingConference#is_auto_record}
  */
  readonly isAutoRecord?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_record_aux_stream MeetingConference#is_record_aux_stream}
  */
  readonly isRecordAuxStream?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#language MeetingConference#language}
  */
  readonly language?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#live_address MeetingConference#live_address}
  */
  readonly liveAddress?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#media_types MeetingConference#media_types}
  */
  readonly mediaTypes?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#meeting_room_id MeetingConference#meeting_room_id}
  */
  readonly meetingRoomId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#participant_number MeetingConference#participant_number}
  */
  readonly participantNumber?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#record_auth_type MeetingConference#record_auth_type}
  */
  readonly recordAuthType?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#record_type MeetingConference#record_type}
  */
  readonly recordType?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#start_time MeetingConference#start_time}
  */
  readonly startTime?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#timezone_id MeetingConference#timezone_id}
  */
  readonly timezoneId?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#topic MeetingConference#topic}
  */
  readonly topic: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#user_id MeetingConference#user_id}
  */
  readonly userId?: string;
  /**
  * configuration block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#configuration MeetingConference#configuration}
  */
  readonly configuration?: MeetingConferenceConfiguration;
  /**
  * cycle_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#cycle_params MeetingConference#cycle_params}
  */
  readonly cycleParams?: MeetingConferenceCycleParams;
  /**
  * participant block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#participant MeetingConference#participant}
  */
  readonly participant?: MeetingConferenceParticipant[] | cdktf.IResolvable;
}
export interface MeetingConferenceJoinPassword {
}

export function meetingConferenceJoinPasswordToTerraform(struct?: MeetingConferenceJoinPassword): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function meetingConferenceJoinPasswordToHclTerraform(struct?: MeetingConferenceJoinPassword): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class MeetingConferenceJoinPasswordOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MeetingConferenceJoinPassword | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MeetingConferenceJoinPassword | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // guest - computed: true, optional: false, required: false
  public get guest() {
    return this.getStringAttribute('guest');
  }

  // host - computed: true, optional: false, required: false
  public get host() {
    return this.getStringAttribute('host');
  }
}

export class MeetingConferenceJoinPasswordList extends cdktf.ComplexList {

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
  public get(index: number): MeetingConferenceJoinPasswordOutputReference {
    return new MeetingConferenceJoinPasswordOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MeetingConferenceSubconferencesSubconfigurationShowAudiencePolicies {
}

export function meetingConferenceSubconferencesSubconfigurationShowAudiencePoliciesToTerraform(struct?: MeetingConferenceSubconferencesSubconfigurationShowAudiencePolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function meetingConferenceSubconferencesSubconfigurationShowAudiencePoliciesToHclTerraform(struct?: MeetingConferenceSubconferencesSubconfigurationShowAudiencePolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class MeetingConferenceSubconferencesSubconfigurationShowAudiencePoliciesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MeetingConferenceSubconferencesSubconfigurationShowAudiencePolicies | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MeetingConferenceSubconferencesSubconfigurationShowAudiencePolicies | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // base_audience_count - computed: true, optional: false, required: false
  public get baseAudienceCount() {
    return this.getNumberAttribute('base_audience_count');
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getNumberAttribute('mode');
  }

  // multiple - computed: true, optional: false, required: false
  public get multiple() {
    return this.getNumberAttribute('multiple');
  }
}

export class MeetingConferenceSubconferencesSubconfigurationShowAudiencePoliciesList extends cdktf.ComplexList {

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
  public get(index: number): MeetingConferenceSubconferencesSubconfigurationShowAudiencePoliciesOutputReference {
    return new MeetingConferenceSubconferencesSubconfigurationShowAudiencePoliciesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MeetingConferenceSubconferencesSubconfiguration {
}

export function meetingConferenceSubconferencesSubconfigurationToTerraform(struct?: MeetingConferenceSubconferencesSubconfiguration): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function meetingConferenceSubconferencesSubconfigurationToHclTerraform(struct?: MeetingConferenceSubconferencesSubconfiguration): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class MeetingConferenceSubconferencesSubconfigurationOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MeetingConferenceSubconferencesSubconfiguration | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MeetingConferenceSubconferencesSubconfiguration | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // allow_guest_start - computed: true, optional: false, required: false
  public get allowGuestStart() {
    return this.getBooleanAttribute('allow_guest_start');
  }

  // audience_callin_restriction - computed: true, optional: false, required: false
  public get audienceCallinRestriction() {
    return this.getNumberAttribute('audience_callin_restriction');
  }

  // callin_restriction - computed: true, optional: false, required: false
  public get callinRestriction() {
    return this.getNumberAttribute('callin_restriction');
  }

  // show_audience_policies - computed: true, optional: false, required: false
  private _showAudiencePolicies = new MeetingConferenceSubconferencesSubconfigurationShowAudiencePoliciesList(this, "show_audience_policies", false);
  public get showAudiencePolicies() {
    return this._showAudiencePolicies;
  }

  // waiting_room_enabled - computed: true, optional: false, required: false
  public get waitingRoomEnabled() {
    return this.getBooleanAttribute('waiting_room_enabled');
  }
}

export class MeetingConferenceSubconferencesSubconfigurationList extends cdktf.ComplexList {

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
  public get(index: number): MeetingConferenceSubconferencesSubconfigurationOutputReference {
    return new MeetingConferenceSubconferencesSubconfigurationOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MeetingConferenceSubconferences {
}

export function meetingConferenceSubconferencesToTerraform(struct?: MeetingConferenceSubconferences): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function meetingConferenceSubconferencesToHclTerraform(struct?: MeetingConferenceSubconferences): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class MeetingConferenceSubconferencesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MeetingConferenceSubconferences | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MeetingConferenceSubconferences | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // end_time - computed: true, optional: false, required: false
  public get endTime() {
    return this.getStringAttribute('end_time');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_auto_record - computed: true, optional: false, required: false
  public get isAutoRecord() {
    return this.getNumberAttribute('is_auto_record');
  }

  // media_types - computed: true, optional: false, required: false
  public get mediaTypes() {
    return this.getListAttribute('media_types');
  }

  // record_auth_type - computed: true, optional: false, required: false
  public get recordAuthType() {
    return this.getNumberAttribute('record_auth_type');
  }

  // start_time - computed: true, optional: false, required: false
  public get startTime() {
    return this.getStringAttribute('start_time');
  }

  // subconfiguration - computed: true, optional: false, required: false
  private _subconfiguration = new MeetingConferenceSubconferencesSubconfigurationList(this, "subconfiguration", false);
  public get subconfiguration() {
    return this._subconfiguration;
  }
}

export class MeetingConferenceSubconferencesList extends cdktf.ComplexList {

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
  public get(index: number): MeetingConferenceSubconferencesOutputReference {
    return new MeetingConferenceSubconferencesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MeetingConferenceConfiguration {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#allow_guest_start MeetingConference#allow_guest_start}
  */
  readonly allowGuestStart?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#callin_restriction MeetingConference#callin_restriction}
  */
  readonly callinRestriction?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#guest_password MeetingConference#guest_password}
  */
  readonly guestPassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_auto_mute MeetingConference#is_auto_mute}
  */
  readonly isAutoMute?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_guest_free_password MeetingConference#is_guest_free_password}
  */
  readonly isGuestFreePassword?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_hard_terminal_auto_mute MeetingConference#is_hard_terminal_auto_mute}
  */
  readonly isHardTerminalAutoMute?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_send_calendar MeetingConference#is_send_calendar}
  */
  readonly isSendCalendar?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_send_notify MeetingConference#is_send_notify}
  */
  readonly isSendNotify?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_send_sms MeetingConference#is_send_sms}
  */
  readonly isSendSms?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#prolong_time MeetingConference#prolong_time}
  */
  readonly prolongTime?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#waiting_room_enabled MeetingConference#waiting_room_enabled}
  */
  readonly waitingRoomEnabled?: boolean | cdktf.IResolvable;
}

export function meetingConferenceConfigurationToTerraform(struct?: MeetingConferenceConfigurationOutputReference | MeetingConferenceConfiguration): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    allow_guest_start: cdktf.booleanToTerraform(struct!.allowGuestStart),
    callin_restriction: cdktf.numberToTerraform(struct!.callinRestriction),
    guest_password: cdktf.stringToTerraform(struct!.guestPassword),
    is_auto_mute: cdktf.booleanToTerraform(struct!.isAutoMute),
    is_guest_free_password: cdktf.booleanToTerraform(struct!.isGuestFreePassword),
    is_hard_terminal_auto_mute: cdktf.booleanToTerraform(struct!.isHardTerminalAutoMute),
    is_send_calendar: cdktf.booleanToTerraform(struct!.isSendCalendar),
    is_send_notify: cdktf.booleanToTerraform(struct!.isSendNotify),
    is_send_sms: cdktf.booleanToTerraform(struct!.isSendSms),
    prolong_time: cdktf.numberToTerraform(struct!.prolongTime),
    waiting_room_enabled: cdktf.booleanToTerraform(struct!.waitingRoomEnabled),
  }
}


export function meetingConferenceConfigurationToHclTerraform(struct?: MeetingConferenceConfigurationOutputReference | MeetingConferenceConfiguration): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    allow_guest_start: {
      value: cdktf.booleanToHclTerraform(struct!.allowGuestStart),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    callin_restriction: {
      value: cdktf.numberToHclTerraform(struct!.callinRestriction),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    guest_password: {
      value: cdktf.stringToHclTerraform(struct!.guestPassword),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    is_auto_mute: {
      value: cdktf.booleanToHclTerraform(struct!.isAutoMute),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    is_guest_free_password: {
      value: cdktf.booleanToHclTerraform(struct!.isGuestFreePassword),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    is_hard_terminal_auto_mute: {
      value: cdktf.booleanToHclTerraform(struct!.isHardTerminalAutoMute),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    is_send_calendar: {
      value: cdktf.booleanToHclTerraform(struct!.isSendCalendar),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    is_send_notify: {
      value: cdktf.booleanToHclTerraform(struct!.isSendNotify),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    is_send_sms: {
      value: cdktf.booleanToHclTerraform(struct!.isSendSms),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    prolong_time: {
      value: cdktf.numberToHclTerraform(struct!.prolongTime),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    waiting_room_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.waitingRoomEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MeetingConferenceConfigurationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MeetingConferenceConfiguration | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._allowGuestStart !== undefined) {
      hasAnyValues = true;
      internalValueResult.allowGuestStart = this._allowGuestStart;
    }
    if (this._callinRestriction !== undefined) {
      hasAnyValues = true;
      internalValueResult.callinRestriction = this._callinRestriction;
    }
    if (this._guestPassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.guestPassword = this._guestPassword;
    }
    if (this._isAutoMute !== undefined) {
      hasAnyValues = true;
      internalValueResult.isAutoMute = this._isAutoMute;
    }
    if (this._isGuestFreePassword !== undefined) {
      hasAnyValues = true;
      internalValueResult.isGuestFreePassword = this._isGuestFreePassword;
    }
    if (this._isHardTerminalAutoMute !== undefined) {
      hasAnyValues = true;
      internalValueResult.isHardTerminalAutoMute = this._isHardTerminalAutoMute;
    }
    if (this._isSendCalendar !== undefined) {
      hasAnyValues = true;
      internalValueResult.isSendCalendar = this._isSendCalendar;
    }
    if (this._isSendNotify !== undefined) {
      hasAnyValues = true;
      internalValueResult.isSendNotify = this._isSendNotify;
    }
    if (this._isSendSms !== undefined) {
      hasAnyValues = true;
      internalValueResult.isSendSms = this._isSendSms;
    }
    if (this._prolongTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.prolongTime = this._prolongTime;
    }
    if (this._waitingRoomEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.waitingRoomEnabled = this._waitingRoomEnabled;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MeetingConferenceConfiguration | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._allowGuestStart = undefined;
      this._callinRestriction = undefined;
      this._guestPassword = undefined;
      this._isAutoMute = undefined;
      this._isGuestFreePassword = undefined;
      this._isHardTerminalAutoMute = undefined;
      this._isSendCalendar = undefined;
      this._isSendNotify = undefined;
      this._isSendSms = undefined;
      this._prolongTime = undefined;
      this._waitingRoomEnabled = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._allowGuestStart = value.allowGuestStart;
      this._callinRestriction = value.callinRestriction;
      this._guestPassword = value.guestPassword;
      this._isAutoMute = value.isAutoMute;
      this._isGuestFreePassword = value.isGuestFreePassword;
      this._isHardTerminalAutoMute = value.isHardTerminalAutoMute;
      this._isSendCalendar = value.isSendCalendar;
      this._isSendNotify = value.isSendNotify;
      this._isSendSms = value.isSendSms;
      this._prolongTime = value.prolongTime;
      this._waitingRoomEnabled = value.waitingRoomEnabled;
    }
  }

  // allow_guest_start - computed: true, optional: true, required: false
  private _allowGuestStart?: boolean | cdktf.IResolvable; 
  public get allowGuestStart() {
    return this.getBooleanAttribute('allow_guest_start');
  }
  public set allowGuestStart(value: boolean | cdktf.IResolvable) {
    this._allowGuestStart = value;
  }
  public resetAllowGuestStart() {
    this._allowGuestStart = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get allowGuestStartInput() {
    return this._allowGuestStart;
  }

  // callin_restriction - computed: true, optional: true, required: false
  private _callinRestriction?: number; 
  public get callinRestriction() {
    return this.getNumberAttribute('callin_restriction');
  }
  public set callinRestriction(value: number) {
    this._callinRestriction = value;
  }
  public resetCallinRestriction() {
    this._callinRestriction = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get callinRestrictionInput() {
    return this._callinRestriction;
  }

  // guest_password - computed: true, optional: true, required: false
  private _guestPassword?: string; 
  public get guestPassword() {
    return this.getStringAttribute('guest_password');
  }
  public set guestPassword(value: string) {
    this._guestPassword = value;
  }
  public resetGuestPassword() {
    this._guestPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get guestPasswordInput() {
    return this._guestPassword;
  }

  // is_auto_mute - computed: true, optional: true, required: false
  private _isAutoMute?: boolean | cdktf.IResolvable; 
  public get isAutoMute() {
    return this.getBooleanAttribute('is_auto_mute');
  }
  public set isAutoMute(value: boolean | cdktf.IResolvable) {
    this._isAutoMute = value;
  }
  public resetIsAutoMute() {
    this._isAutoMute = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isAutoMuteInput() {
    return this._isAutoMute;
  }

  // is_guest_free_password - computed: true, optional: true, required: false
  private _isGuestFreePassword?: boolean | cdktf.IResolvable; 
  public get isGuestFreePassword() {
    return this.getBooleanAttribute('is_guest_free_password');
  }
  public set isGuestFreePassword(value: boolean | cdktf.IResolvable) {
    this._isGuestFreePassword = value;
  }
  public resetIsGuestFreePassword() {
    this._isGuestFreePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isGuestFreePasswordInput() {
    return this._isGuestFreePassword;
  }

  // is_hard_terminal_auto_mute - computed: true, optional: true, required: false
  private _isHardTerminalAutoMute?: boolean | cdktf.IResolvable; 
  public get isHardTerminalAutoMute() {
    return this.getBooleanAttribute('is_hard_terminal_auto_mute');
  }
  public set isHardTerminalAutoMute(value: boolean | cdktf.IResolvable) {
    this._isHardTerminalAutoMute = value;
  }
  public resetIsHardTerminalAutoMute() {
    this._isHardTerminalAutoMute = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isHardTerminalAutoMuteInput() {
    return this._isHardTerminalAutoMute;
  }

  // is_send_calendar - computed: true, optional: true, required: false
  private _isSendCalendar?: boolean | cdktf.IResolvable; 
  public get isSendCalendar() {
    return this.getBooleanAttribute('is_send_calendar');
  }
  public set isSendCalendar(value: boolean | cdktf.IResolvable) {
    this._isSendCalendar = value;
  }
  public resetIsSendCalendar() {
    this._isSendCalendar = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isSendCalendarInput() {
    return this._isSendCalendar;
  }

  // is_send_notify - computed: true, optional: true, required: false
  private _isSendNotify?: boolean | cdktf.IResolvable; 
  public get isSendNotify() {
    return this.getBooleanAttribute('is_send_notify');
  }
  public set isSendNotify(value: boolean | cdktf.IResolvable) {
    this._isSendNotify = value;
  }
  public resetIsSendNotify() {
    this._isSendNotify = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isSendNotifyInput() {
    return this._isSendNotify;
  }

  // is_send_sms - computed: true, optional: true, required: false
  private _isSendSms?: boolean | cdktf.IResolvable; 
  public get isSendSms() {
    return this.getBooleanAttribute('is_send_sms');
  }
  public set isSendSms(value: boolean | cdktf.IResolvable) {
    this._isSendSms = value;
  }
  public resetIsSendSms() {
    this._isSendSms = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isSendSmsInput() {
    return this._isSendSms;
  }

  // prolong_time - computed: true, optional: true, required: false
  private _prolongTime?: number; 
  public get prolongTime() {
    return this.getNumberAttribute('prolong_time');
  }
  public set prolongTime(value: number) {
    this._prolongTime = value;
  }
  public resetProlongTime() {
    this._prolongTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get prolongTimeInput() {
    return this._prolongTime;
  }

  // waiting_room_enabled - computed: true, optional: true, required: false
  private _waitingRoomEnabled?: boolean | cdktf.IResolvable; 
  public get waitingRoomEnabled() {
    return this.getBooleanAttribute('waiting_room_enabled');
  }
  public set waitingRoomEnabled(value: boolean | cdktf.IResolvable) {
    this._waitingRoomEnabled = value;
  }
  public resetWaitingRoomEnabled() {
    this._waitingRoomEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get waitingRoomEnabledInput() {
    return this._waitingRoomEnabled;
  }
}
export interface MeetingConferenceCycleParams {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#cycle MeetingConference#cycle}
  */
  readonly cycle: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#end_date MeetingConference#end_date}
  */
  readonly endDate: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#interval MeetingConference#interval}
  */
  readonly interval?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#points MeetingConference#points}
  */
  readonly points?: number[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#pre_remind MeetingConference#pre_remind}
  */
  readonly preRemind: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#start_date MeetingConference#start_date}
  */
  readonly startDate: string;
}

export function meetingConferenceCycleParamsToTerraform(struct?: MeetingConferenceCycleParamsOutputReference | MeetingConferenceCycleParams): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cycle: cdktf.stringToTerraform(struct!.cycle),
    end_date: cdktf.stringToTerraform(struct!.endDate),
    interval: cdktf.numberToTerraform(struct!.interval),
    points: cdktf.listMapper(cdktf.numberToTerraform, false)(struct!.points),
    pre_remind: cdktf.numberToTerraform(struct!.preRemind),
    start_date: cdktf.stringToTerraform(struct!.startDate),
  }
}


export function meetingConferenceCycleParamsToHclTerraform(struct?: MeetingConferenceCycleParamsOutputReference | MeetingConferenceCycleParams): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cycle: {
      value: cdktf.stringToHclTerraform(struct!.cycle),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    end_date: {
      value: cdktf.stringToHclTerraform(struct!.endDate),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    interval: {
      value: cdktf.numberToHclTerraform(struct!.interval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    points: {
      value: cdktf.listMapperHcl(cdktf.numberToHclTerraform, false)(struct!.points),
      isBlock: false,
      type: "list",
      storageClassType: "numberList",
    },
    pre_remind: {
      value: cdktf.numberToHclTerraform(struct!.preRemind),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    start_date: {
      value: cdktf.stringToHclTerraform(struct!.startDate),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MeetingConferenceCycleParamsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MeetingConferenceCycleParams | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cycle !== undefined) {
      hasAnyValues = true;
      internalValueResult.cycle = this._cycle;
    }
    if (this._endDate !== undefined) {
      hasAnyValues = true;
      internalValueResult.endDate = this._endDate;
    }
    if (this._interval !== undefined) {
      hasAnyValues = true;
      internalValueResult.interval = this._interval;
    }
    if (this._points !== undefined) {
      hasAnyValues = true;
      internalValueResult.points = this._points;
    }
    if (this._preRemind !== undefined) {
      hasAnyValues = true;
      internalValueResult.preRemind = this._preRemind;
    }
    if (this._startDate !== undefined) {
      hasAnyValues = true;
      internalValueResult.startDate = this._startDate;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MeetingConferenceCycleParams | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._cycle = undefined;
      this._endDate = undefined;
      this._interval = undefined;
      this._points = undefined;
      this._preRemind = undefined;
      this._startDate = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._cycle = value.cycle;
      this._endDate = value.endDate;
      this._interval = value.interval;
      this._points = value.points;
      this._preRemind = value.preRemind;
      this._startDate = value.startDate;
    }
  }

  // cycle - computed: false, optional: false, required: true
  private _cycle?: string; 
  public get cycle() {
    return this.getStringAttribute('cycle');
  }
  public set cycle(value: string) {
    this._cycle = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cycleInput() {
    return this._cycle;
  }

  // end_date - computed: false, optional: false, required: true
  private _endDate?: string; 
  public get endDate() {
    return this.getStringAttribute('end_date');
  }
  public set endDate(value: string) {
    this._endDate = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endDateInput() {
    return this._endDate;
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

  // points - computed: true, optional: true, required: false
  private _points?: number[]; 
  public get points() {
    return this.getNumberListAttribute('points');
  }
  public set points(value: number[]) {
    this._points = value;
  }
  public resetPoints() {
    this._points = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pointsInput() {
    return this._points;
  }

  // pre_remind - computed: false, optional: false, required: true
  private _preRemind?: number; 
  public get preRemind() {
    return this.getNumberAttribute('pre_remind');
  }
  public set preRemind(value: number) {
    this._preRemind = value;
  }
  // Temporarily expose input value. Use with caution.
  public get preRemindInput() {
    return this._preRemind;
  }

  // start_date - computed: false, optional: false, required: true
  private _startDate?: string; 
  public get startDate() {
    return this.getStringAttribute('start_date');
  }
  public set startDate(value: string) {
    this._startDate = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startDateInput() {
    return this._startDate;
  }
}
export interface MeetingConferenceParticipant {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#account_id MeetingConference#account_id}
  */
  readonly accountId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#email MeetingConference#email}
  */
  readonly email?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_auto_invite MeetingConference#is_auto_invite}
  */
  readonly isAutoInvite?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#is_mute MeetingConference#is_mute}
  */
  readonly isMute?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#name MeetingConference#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#phone MeetingConference#phone}
  */
  readonly phone?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#role MeetingConference#role}
  */
  readonly role?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#sms MeetingConference#sms}
  */
  readonly sms?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#type MeetingConference#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#user_id MeetingConference#user_id}
  */
  readonly userId?: string;
}

export function meetingConferenceParticipantToTerraform(struct?: MeetingConferenceParticipant | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    account_id: cdktf.stringToTerraform(struct!.accountId),
    email: cdktf.stringToTerraform(struct!.email),
    is_auto_invite: cdktf.numberToTerraform(struct!.isAutoInvite),
    is_mute: cdktf.numberToTerraform(struct!.isMute),
    name: cdktf.stringToTerraform(struct!.name),
    phone: cdktf.stringToTerraform(struct!.phone),
    role: cdktf.numberToTerraform(struct!.role),
    sms: cdktf.stringToTerraform(struct!.sms),
    type: cdktf.stringToTerraform(struct!.type),
    user_id: cdktf.stringToTerraform(struct!.userId),
  }
}


export function meetingConferenceParticipantToHclTerraform(struct?: MeetingConferenceParticipant | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    account_id: {
      value: cdktf.stringToHclTerraform(struct!.accountId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    email: {
      value: cdktf.stringToHclTerraform(struct!.email),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    is_auto_invite: {
      value: cdktf.numberToHclTerraform(struct!.isAutoInvite),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    is_mute: {
      value: cdktf.numberToHclTerraform(struct!.isMute),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    phone: {
      value: cdktf.stringToHclTerraform(struct!.phone),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    role: {
      value: cdktf.numberToHclTerraform(struct!.role),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    sms: {
      value: cdktf.stringToHclTerraform(struct!.sms),
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
    user_id: {
      value: cdktf.stringToHclTerraform(struct!.userId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MeetingConferenceParticipantOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MeetingConferenceParticipant | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accountId !== undefined) {
      hasAnyValues = true;
      internalValueResult.accountId = this._accountId;
    }
    if (this._email !== undefined) {
      hasAnyValues = true;
      internalValueResult.email = this._email;
    }
    if (this._isAutoInvite !== undefined) {
      hasAnyValues = true;
      internalValueResult.isAutoInvite = this._isAutoInvite;
    }
    if (this._isMute !== undefined) {
      hasAnyValues = true;
      internalValueResult.isMute = this._isMute;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._phone !== undefined) {
      hasAnyValues = true;
      internalValueResult.phone = this._phone;
    }
    if (this._role !== undefined) {
      hasAnyValues = true;
      internalValueResult.role = this._role;
    }
    if (this._sms !== undefined) {
      hasAnyValues = true;
      internalValueResult.sms = this._sms;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._userId !== undefined) {
      hasAnyValues = true;
      internalValueResult.userId = this._userId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MeetingConferenceParticipant | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._accountId = undefined;
      this._email = undefined;
      this._isAutoInvite = undefined;
      this._isMute = undefined;
      this._name = undefined;
      this._phone = undefined;
      this._role = undefined;
      this._sms = undefined;
      this._type = undefined;
      this._userId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._accountId = value.accountId;
      this._email = value.email;
      this._isAutoInvite = value.isAutoInvite;
      this._isMute = value.isMute;
      this._name = value.name;
      this._phone = value.phone;
      this._role = value.role;
      this._sms = value.sms;
      this._type = value.type;
      this._userId = value.userId;
    }
  }

  // account_id - computed: true, optional: true, required: false
  private _accountId?: string; 
  public get accountId() {
    return this.getStringAttribute('account_id');
  }
  public set accountId(value: string) {
    this._accountId = value;
  }
  public resetAccountId() {
    this._accountId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountIdInput() {
    return this._accountId;
  }

  // email - computed: true, optional: true, required: false
  private _email?: string; 
  public get email() {
    return this.getStringAttribute('email');
  }
  public set email(value: string) {
    this._email = value;
  }
  public resetEmail() {
    this._email = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get emailInput() {
    return this._email;
  }

  // is_auto_invite - computed: true, optional: true, required: false
  private _isAutoInvite?: number; 
  public get isAutoInvite() {
    return this.getNumberAttribute('is_auto_invite');
  }
  public set isAutoInvite(value: number) {
    this._isAutoInvite = value;
  }
  public resetIsAutoInvite() {
    this._isAutoInvite = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isAutoInviteInput() {
    return this._isAutoInvite;
  }

  // is_mute - computed: true, optional: true, required: false
  private _isMute?: number; 
  public get isMute() {
    return this.getNumberAttribute('is_mute');
  }
  public set isMute(value: number) {
    this._isMute = value;
  }
  public resetIsMute() {
    this._isMute = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isMuteInput() {
    return this._isMute;
  }

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // phone - computed: true, optional: true, required: false
  private _phone?: string; 
  public get phone() {
    return this.getStringAttribute('phone');
  }
  public set phone(value: string) {
    this._phone = value;
  }
  public resetPhone() {
    this._phone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get phoneInput() {
    return this._phone;
  }

  // role - computed: true, optional: true, required: false
  private _role?: number; 
  public get role() {
    return this.getNumberAttribute('role');
  }
  public set role(value: number) {
    this._role = value;
  }
  public resetRole() {
    this._role = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get roleInput() {
    return this._role;
  }

  // sms - computed: true, optional: true, required: false
  private _sms?: string; 
  public get sms() {
    return this.getStringAttribute('sms');
  }
  public set sms(value: string) {
    this._sms = value;
  }
  public resetSms() {
    this._sms = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smsInput() {
    return this._sms;
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // user_id - computed: true, optional: true, required: false
  private _userId?: string; 
  public get userId() {
    return this.getStringAttribute('user_id');
  }
  public set userId(value: string) {
    this._userId = value;
  }
  public resetUserId() {
    this._userId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userIdInput() {
    return this._userId;
  }
}

export class MeetingConferenceParticipantList extends cdktf.ComplexList {
  public internalValue? : MeetingConferenceParticipant[] | cdktf.IResolvable

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
  public get(index: number): MeetingConferenceParticipantOutputReference {
    return new MeetingConferenceParticipantOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference huaweicloud_meeting_conference}
*/
export class MeetingConference extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_meeting_conference";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MeetingConference resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MeetingConference to import
  * @param importFromId The id of the existing MeetingConference that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MeetingConference to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_meeting_conference", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_conference huaweicloud_meeting_conference} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MeetingConferenceConfig
  */
  public constructor(scope: Construct, id: string, config: MeetingConferenceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_meeting_conference',
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
    this._accountName = config.accountName;
    this._accountPassword = config.accountPassword;
    this._appId = config.appId;
    this._appKey = config.appKey;
    this._auxAddress = config.auxAddress;
    this._corpId = config.corpId;
    this._duration = config.duration;
    this._encryptMode = config.encryptMode;
    this._id = config.id;
    this._isAutoRecord = config.isAutoRecord;
    this._isRecordAuxStream = config.isRecordAuxStream;
    this._language = config.language;
    this._liveAddress = config.liveAddress;
    this._mediaTypes = config.mediaTypes;
    this._meetingRoomId = config.meetingRoomId;
    this._participantNumber = config.participantNumber;
    this._recordAuthType = config.recordAuthType;
    this._recordType = config.recordType;
    this._startTime = config.startTime;
    this._timezoneId = config.timezoneId;
    this._topic = config.topic;
    this._userId = config.userId;
    this._configuration.internalValue = config.configuration;
    this._cycleParams.internalValue = config.cycleParams;
    this._participant.internalValue = config.participant;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_number - computed: true, optional: false, required: false
  public get accessNumber() {
    return this.getStringAttribute('access_number');
  }

  // account_name - computed: false, optional: true, required: false
  private _accountName?: string; 
  public get accountName() {
    return this.getStringAttribute('account_name');
  }
  public set accountName(value: string) {
    this._accountName = value;
  }
  public resetAccountName() {
    this._accountName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountNameInput() {
    return this._accountName;
  }

  // account_password - computed: false, optional: true, required: false
  private _accountPassword?: string; 
  public get accountPassword() {
    return this.getStringAttribute('account_password');
  }
  public set accountPassword(value: string) {
    this._accountPassword = value;
  }
  public resetAccountPassword() {
    this._accountPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountPasswordInput() {
    return this._accountPassword;
  }

  // app_id - computed: false, optional: true, required: false
  private _appId?: string; 
  public get appId() {
    return this.getStringAttribute('app_id');
  }
  public set appId(value: string) {
    this._appId = value;
  }
  public resetAppId() {
    this._appId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appIdInput() {
    return this._appId;
  }

  // app_key - computed: false, optional: true, required: false
  private _appKey?: string; 
  public get appKey() {
    return this.getStringAttribute('app_key');
  }
  public set appKey(value: string) {
    this._appKey = value;
  }
  public resetAppKey() {
    this._appKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appKeyInput() {
    return this._appKey;
  }

  // audience_join_uri - computed: true, optional: false, required: false
  public get audienceJoinUri() {
    return this.getStringAttribute('audience_join_uri');
  }

  // aux_address - computed: true, optional: true, required: false
  private _auxAddress?: string; 
  public get auxAddress() {
    return this.getStringAttribute('aux_address');
  }
  public set auxAddress(value: string) {
    this._auxAddress = value;
  }
  public resetAuxAddress() {
    this._auxAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get auxAddressInput() {
    return this._auxAddress;
  }

  // chair_join_uri - computed: true, optional: false, required: false
  public get chairJoinUri() {
    return this.getStringAttribute('chair_join_uri');
  }

  // conference_type - computed: true, optional: false, required: false
  public get conferenceType() {
    return this.getStringAttribute('conference_type');
  }

  // conference_uuid - computed: true, optional: false, required: false
  public get conferenceUuid() {
    return this.getStringAttribute('conference_uuid');
  }

  // corp_id - computed: true, optional: true, required: false
  private _corpId?: string; 
  public get corpId() {
    return this.getStringAttribute('corp_id');
  }
  public set corpId(value: string) {
    this._corpId = value;
  }
  public resetCorpId() {
    this._corpId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get corpIdInput() {
    return this._corpId;
  }

  // duration - computed: false, optional: false, required: true
  private _duration?: number; 
  public get duration() {
    return this.getNumberAttribute('duration');
  }
  public set duration(value: number) {
    this._duration = value;
  }
  // Temporarily expose input value. Use with caution.
  public get durationInput() {
    return this._duration;
  }

  // encrypt_mode - computed: true, optional: true, required: false
  private _encryptMode?: number; 
  public get encryptMode() {
    return this.getNumberAttribute('encrypt_mode');
  }
  public set encryptMode(value: number) {
    this._encryptMode = value;
  }
  public resetEncryptMode() {
    this._encryptMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptModeInput() {
    return this._encryptMode;
  }

  // guest_join_uri - computed: true, optional: false, required: false
  public get guestJoinUri() {
    return this.getStringAttribute('guest_join_uri');
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

  // is_auto_record - computed: true, optional: true, required: false
  private _isAutoRecord?: number; 
  public get isAutoRecord() {
    return this.getNumberAttribute('is_auto_record');
  }
  public set isAutoRecord(value: number) {
    this._isAutoRecord = value;
  }
  public resetIsAutoRecord() {
    this._isAutoRecord = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isAutoRecordInput() {
    return this._isAutoRecord;
  }

  // is_record_aux_stream - computed: true, optional: true, required: false
  private _isRecordAuxStream?: number; 
  public get isRecordAuxStream() {
    return this.getNumberAttribute('is_record_aux_stream');
  }
  public set isRecordAuxStream(value: number) {
    this._isRecordAuxStream = value;
  }
  public resetIsRecordAuxStream() {
    this._isRecordAuxStream = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isRecordAuxStreamInput() {
    return this._isRecordAuxStream;
  }

  // join_password - computed: true, optional: false, required: false
  private _joinPassword = new MeetingConferenceJoinPasswordList(this, "join_password", false);
  public get joinPassword() {
    return this._joinPassword;
  }

  // language - computed: true, optional: true, required: false
  private _language?: string; 
  public get language() {
    return this.getStringAttribute('language');
  }
  public set language(value: string) {
    this._language = value;
  }
  public resetLanguage() {
    this._language = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get languageInput() {
    return this._language;
  }

  // live_address - computed: true, optional: true, required: false
  private _liveAddress?: string; 
  public get liveAddress() {
    return this.getStringAttribute('live_address');
  }
  public set liveAddress(value: string) {
    this._liveAddress = value;
  }
  public resetLiveAddress() {
    this._liveAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get liveAddressInput() {
    return this._liveAddress;
  }

  // media_types - computed: true, optional: true, required: false
  private _mediaTypes?: string[]; 
  public get mediaTypes() {
    return cdktf.Fn.tolist(this.getListAttribute('media_types'));
  }
  public set mediaTypes(value: string[]) {
    this._mediaTypes = value;
  }
  public resetMediaTypes() {
    this._mediaTypes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mediaTypesInput() {
    return this._mediaTypes;
  }

  // meeting_room_id - computed: false, optional: false, required: true
  private _meetingRoomId?: string; 
  public get meetingRoomId() {
    return this.getStringAttribute('meeting_room_id');
  }
  public set meetingRoomId(value: string) {
    this._meetingRoomId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get meetingRoomIdInput() {
    return this._meetingRoomId;
  }

  // participant_number - computed: false, optional: true, required: false
  private _participantNumber?: number; 
  public get participantNumber() {
    return this.getNumberAttribute('participant_number');
  }
  public set participantNumber(value: number) {
    this._participantNumber = value;
  }
  public resetParticipantNumber() {
    this._participantNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get participantNumberInput() {
    return this._participantNumber;
  }

  // record_auth_type - computed: true, optional: true, required: false
  private _recordAuthType?: number; 
  public get recordAuthType() {
    return this.getNumberAttribute('record_auth_type');
  }
  public set recordAuthType(value: number) {
    this._recordAuthType = value;
  }
  public resetRecordAuthType() {
    this._recordAuthType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recordAuthTypeInput() {
    return this._recordAuthType;
  }

  // record_type - computed: true, optional: true, required: false
  private _recordType?: number; 
  public get recordType() {
    return this.getNumberAttribute('record_type');
  }
  public set recordType(value: number) {
    this._recordType = value;
  }
  public resetRecordType() {
    this._recordType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recordTypeInput() {
    return this._recordType;
  }

  // start_time - computed: false, optional: true, required: false
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  public resetStartTime() {
    this._startTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subconferences - computed: true, optional: false, required: false
  private _subconferences = new MeetingConferenceSubconferencesList(this, "subconferences", false);
  public get subconferences() {
    return this._subconferences;
  }

  // timezone_id - computed: true, optional: true, required: false
  private _timezoneId?: number; 
  public get timezoneId() {
    return this.getNumberAttribute('timezone_id');
  }
  public set timezoneId(value: number) {
    this._timezoneId = value;
  }
  public resetTimezoneId() {
    this._timezoneId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timezoneIdInput() {
    return this._timezoneId;
  }

  // topic - computed: false, optional: false, required: true
  private _topic?: string; 
  public get topic() {
    return this.getStringAttribute('topic');
  }
  public set topic(value: string) {
    this._topic = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicInput() {
    return this._topic;
  }

  // user_id - computed: true, optional: true, required: false
  private _userId?: string; 
  public get userId() {
    return this.getStringAttribute('user_id');
  }
  public set userId(value: string) {
    this._userId = value;
  }
  public resetUserId() {
    this._userId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userIdInput() {
    return this._userId;
  }

  // configuration - computed: false, optional: true, required: false
  private _configuration = new MeetingConferenceConfigurationOutputReference(this, "configuration");
  public get configuration() {
    return this._configuration;
  }
  public putConfiguration(value: MeetingConferenceConfiguration) {
    this._configuration.internalValue = value;
  }
  public resetConfiguration() {
    this._configuration.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationInput() {
    return this._configuration.internalValue;
  }

  // cycle_params - computed: false, optional: true, required: false
  private _cycleParams = new MeetingConferenceCycleParamsOutputReference(this, "cycle_params");
  public get cycleParams() {
    return this._cycleParams;
  }
  public putCycleParams(value: MeetingConferenceCycleParams) {
    this._cycleParams.internalValue = value;
  }
  public resetCycleParams() {
    this._cycleParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cycleParamsInput() {
    return this._cycleParams.internalValue;
  }

  // participant - computed: false, optional: true, required: false
  private _participant = new MeetingConferenceParticipantList(this, "participant", false);
  public get participant() {
    return this._participant;
  }
  public putParticipant(value: MeetingConferenceParticipant[] | cdktf.IResolvable) {
    this._participant.internalValue = value;
  }
  public resetParticipant() {
    this._participant.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get participantInput() {
    return this._participant.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      account_name: cdktf.stringToTerraform(this._accountName),
      account_password: cdktf.stringToTerraform(this._accountPassword),
      app_id: cdktf.stringToTerraform(this._appId),
      app_key: cdktf.stringToTerraform(this._appKey),
      aux_address: cdktf.stringToTerraform(this._auxAddress),
      corp_id: cdktf.stringToTerraform(this._corpId),
      duration: cdktf.numberToTerraform(this._duration),
      encrypt_mode: cdktf.numberToTerraform(this._encryptMode),
      id: cdktf.stringToTerraform(this._id),
      is_auto_record: cdktf.numberToTerraform(this._isAutoRecord),
      is_record_aux_stream: cdktf.numberToTerraform(this._isRecordAuxStream),
      language: cdktf.stringToTerraform(this._language),
      live_address: cdktf.stringToTerraform(this._liveAddress),
      media_types: cdktf.listMapper(cdktf.stringToTerraform, false)(this._mediaTypes),
      meeting_room_id: cdktf.stringToTerraform(this._meetingRoomId),
      participant_number: cdktf.numberToTerraform(this._participantNumber),
      record_auth_type: cdktf.numberToTerraform(this._recordAuthType),
      record_type: cdktf.numberToTerraform(this._recordType),
      start_time: cdktf.stringToTerraform(this._startTime),
      timezone_id: cdktf.numberToTerraform(this._timezoneId),
      topic: cdktf.stringToTerraform(this._topic),
      user_id: cdktf.stringToTerraform(this._userId),
      configuration: meetingConferenceConfigurationToTerraform(this._configuration.internalValue),
      cycle_params: meetingConferenceCycleParamsToTerraform(this._cycleParams.internalValue),
      participant: cdktf.listMapper(meetingConferenceParticipantToTerraform, true)(this._participant.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      account_name: {
        value: cdktf.stringToHclTerraform(this._accountName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      account_password: {
        value: cdktf.stringToHclTerraform(this._accountPassword),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      app_id: {
        value: cdktf.stringToHclTerraform(this._appId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      app_key: {
        value: cdktf.stringToHclTerraform(this._appKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      aux_address: {
        value: cdktf.stringToHclTerraform(this._auxAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      corp_id: {
        value: cdktf.stringToHclTerraform(this._corpId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      duration: {
        value: cdktf.numberToHclTerraform(this._duration),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      encrypt_mode: {
        value: cdktf.numberToHclTerraform(this._encryptMode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_auto_record: {
        value: cdktf.numberToHclTerraform(this._isAutoRecord),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      is_record_aux_stream: {
        value: cdktf.numberToHclTerraform(this._isRecordAuxStream),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      language: {
        value: cdktf.stringToHclTerraform(this._language),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      live_address: {
        value: cdktf.stringToHclTerraform(this._liveAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      media_types: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._mediaTypes),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      meeting_room_id: {
        value: cdktf.stringToHclTerraform(this._meetingRoomId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      participant_number: {
        value: cdktf.numberToHclTerraform(this._participantNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      record_auth_type: {
        value: cdktf.numberToHclTerraform(this._recordAuthType),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      record_type: {
        value: cdktf.numberToHclTerraform(this._recordType),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      start_time: {
        value: cdktf.stringToHclTerraform(this._startTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timezone_id: {
        value: cdktf.numberToHclTerraform(this._timezoneId),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      topic: {
        value: cdktf.stringToHclTerraform(this._topic),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      user_id: {
        value: cdktf.stringToHclTerraform(this._userId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      configuration: {
        value: meetingConferenceConfigurationToHclTerraform(this._configuration.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MeetingConferenceConfigurationList",
      },
      cycle_params: {
        value: meetingConferenceCycleParamsToHclTerraform(this._cycleParams.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MeetingConferenceCycleParamsList",
      },
      participant: {
        value: cdktf.listMapperHcl(meetingConferenceParticipantToHclTerraform, true)(this._participant.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MeetingConferenceParticipantList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

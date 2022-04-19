import { Action } from "@ngrx/store";

export enum ESettingActionTypes {
  GET_FIRST_ACTIVE = "[FIRST_ACTIVE]_GET_FIRST_ACTIVE",
  CHANGE_FIRST_ACTIVE = "[FIRST_ACTIVE]_CHANGE_FIRST_ACTIVE"
}

export class GetFirstActive implements Action {
  readonly type = ESettingActionTypes.GET_FIRST_ACTIVE;
  constructor(readonly payload: boolean) {}
}

export class ChangeFirstActive implements Action {
  readonly type = ESettingActionTypes.CHANGE_FIRST_ACTIVE;
  constructor(readonly payload: boolean) {}
}

export type SettingActions = GetFirstActive | ChangeFirstActive;

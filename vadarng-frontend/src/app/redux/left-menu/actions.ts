import { Action } from "@ngrx/store";

export enum ESettingActionTypes {
  GET_SHOW_LEFT_MENU = "[SETTING]_GET_SHOW_LEFT_MENU",
  CHANGE_SHOW_LEFT_MENU = "[SETTING]_CHANGE_SHOW_LEFT_MENU"
}

export class GetSettingSuccess implements Action {
  readonly type = ESettingActionTypes.GET_SHOW_LEFT_MENU;
  constructor(readonly payload: boolean) {}
}

export class ChangeShowLeftMenu implements Action {
  readonly type = ESettingActionTypes.CHANGE_SHOW_LEFT_MENU;
  constructor(readonly payload: boolean) {}
}

export type SettingActions = GetSettingSuccess | ChangeShowLeftMenu;

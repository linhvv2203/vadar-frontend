import { Action } from "@ngrx/store";

import { ISettingState, Language } from "src/app/redux/setting/models";

export enum ESettingActionTypes {
  GET_SETTING = "[SETTING]_GET_SETTING",
  GET_SETTING_SUCCESS = "[SETTING]_GET_SETTING_SUCCESS",
  CHANGE_LANGUAGE = "[SETTING]_CHANGE_LANGUAGE",
  CHANGE_LANGUAGE_SUCCESS = "[SETTING]_CHANGE_LANGUAGE_SUCCESS",
  TOGGLE_HEADER_TRANSPARENT = "[SETTING]_TOGGLE_HEADER_TRANSPARENT"
}

export class GetSetting implements Action {
  public readonly type = ESettingActionTypes.GET_SETTING;
}

export class GetSettingSuccess implements Action {
  readonly type = ESettingActionTypes.GET_SETTING_SUCCESS;
  constructor(readonly payload: ISettingState) {}
}

export class ChangeLanguage implements Action {
  readonly type = ESettingActionTypes.CHANGE_LANGUAGE;
  constructor(readonly payload: { lang: Language }) {}
}

export type SettingActions = GetSetting | GetSettingSuccess | ChangeLanguage;

import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { IAlertEmailRequest, ItemData } from ".";
import { Action } from "@ngrx/store";

export enum EActionTypes {
  GET_LIST_ALERT_EMAIL_SUCCESS = "[NOTIFICATION]_GET_LIST_ALERT_EMAIL_SUCCESS",
  ADD_LIST_ALERT_EMAIL_SUCCESS = "[NOTIFICATION]_ADD_LIST_ALERT_EMAIL_SUCCESS",
  ADD_LIST_ALERT_SUCCESS = "[NOTIFICATION]_ADD_LIST_ALERT_SUCCESS",
  ADD_LIST_ALERT_SETTING_SUCCESS = "[NOTIFICATION]_ADD_LIST_ALERT_SETTING_SUCCESS",
  GET_LIST_ALERT_SETTING_SUCCESS = "[NOTIFICATION]_GET_LIST_ALERT_SETTING_SUCCESS",
  CHECK_SECURITY_CONDITION_SUCCESS = "[NOTIFICATION]_CHECK_SECURITY_CONDITION_SUCCESS",
  DELETE_CONDITION_SUCCESS = "[NOTIFICATION]_DELETE_CONDITION_SUCCESS"
}

export class GetListAlert implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: IAlertEmailRequest,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Alerts`,
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_LIST_ALERT_EMAIL_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class AddListAlert implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: IAlertEmailRequest,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Alerts/AddChannelsToAlerts`,
      method: "POST",
      data: payload,
      successType: EActionTypes.ADD_LIST_ALERT_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class AddListAlertSetting implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: IAlertEmailRequest,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Alerts/AlertSetting`,
      method: "POST",
      data: payload,
      successType: EActionTypes.ADD_LIST_ALERT_SETTING_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class CheckSecurityAlertCondition implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: IAlertEmailRequest,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Alerts/CheckCondition`,
      method: "POST",
      data: payload,
      successType: EActionTypes.CHECK_SECURITY_CONDITION_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetListAlertSetting implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: IAlertEmailRequest,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Alerts/GetAlertsSetting`,
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_LIST_ALERT_SETTING_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class DeleteSecurityConditionSetting implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: IAlertEmailRequest,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Alerts/DeleleCondition`,
      method: "DELETE",
      params: payload,
      successType: EActionTypes.DELETE_CONDITION_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

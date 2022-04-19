import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { IHostQueryConditions, IPolicyWhiteListPaging } from ".";
import { Action } from "@ngrx/store";

export enum EActionTypes {
  GET_ACTION_WHITELIST_SUCCESS = "[ACTION]_GET_ACTION_WHITELIST_SUCCESS",
  GET_WHITE_LIST_SUCCESS = "[ACTION]_GET_WHITE_LIST_SUCCESS",
  UPDATE_ACTION_WHITELIST_SUCCESS = "[ACTION]_UPDATE_ACTION_WHITELIST_SUCCESS",
  ADD_ACTION_WHITELIST_SUCCESS = "[ACTION]_ADD_ACTION_WHITELIST_SUCCESS",
  GET_WHITE_LIST_PAGING_SUCCESS = "[ACTION]_GET_WHITE_LIST_PAGING_SUCCESS"
}

export class Add implements Action {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: any,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/policy/CreateWhiteIp", // todo
      data: payload,
      method: "POST",
      successType: EActionTypes.ADD_ACTION_WHITELIST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetWhiteIps implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/policy/GetWhiteList/${payload.workspaceId}`, // todo
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_WHITE_LIST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetPagingWhileList implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IPolicyWhiteListPaging,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/policy/GetWhiteIpPaging`, // todo
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_WHITE_LIST_PAGING_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetDetail implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IHostQueryConditions,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/test/${payload.id}`, // todo
      method: "GET",
      successType: EActionTypes.GET_ACTION_WHITELIST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Update implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IHostQueryConditions,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/test", // todo
      params: payload,
      method: "PUT",
      successType: EActionTypes.UPDATE_ACTION_WHITELIST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Delete implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: string,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/Policy/DeleteWhiteIp/${payload}`,
      method: "DELETE",
      successType: EActionTypes.UPDATE_ACTION_WHITELIST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class DeleteMultil implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: any,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/Policy/DeleteWhiteIps`,
      method: "POST",
      data: payload,
      successType: EActionTypes.UPDATE_ACTION_WHITELIST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type AuthActions =
  | GetWhiteIps
  | Update
  | Delete
  | DeleteMultil
  | GetPagingWhileList;

import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_POLICIES_SUCCESS = "[ACTION]_GET_POLICIES_SUCCESS",
  UPDATE_ACTION_SUCCESS = "[ACTION]_UPDATE_ACTION_SUCCESS",
  ADD_ACTION_SUCCESS = "[ACTION]_ADD_ACTION_SUCCESS"
}

export class GetPolicies implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/policy/GetPolicies/` + payload.workspaceId, // todo
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_POLICIES_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Update implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: any,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/Policy", // todo
      data: payload,
      method: "PUT",
      successType: EActionTypes.UPDATE_ACTION_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type AuthActions = GetPolicies | Update;

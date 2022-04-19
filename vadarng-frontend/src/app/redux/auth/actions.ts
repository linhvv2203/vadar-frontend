import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_PROFILE_AUTH_SUCCESS = "[AUTH]_GET_PROFILE_AUTH_SUCCESS",
  LOGOUT_ALL_SERVICES = "[AUTH]_LOGOUT_ALL_SERVICES"
}

export class GetProfileAuth implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { workspaceId: number },
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/User/GetUserBaseInfo`,
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_PROFILE_AUTH_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class LogoutAllServices implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(next?: (res?: any) => void, nextError?: (error?: any) => void) {
    this.payload = {
      url: "/User/LogoutAllServices",
      method: "POST",
      successType: EActionTypes.LOGOUT_ALL_SERVICES,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class UpdateProfileAuth implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: any,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/User/UpdateProfile",
      data: payload,
      method: "PUT",
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type AuthActions =
  | GetProfileAuth
  | UpdateProfileAuth
  | LogoutAllServices;

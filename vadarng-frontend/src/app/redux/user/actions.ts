import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { Action } from "@ngrx/store";

export enum EActionTypes {
  GET_USER_BASE_INFORMATION_SUCCESS = "[GLORIFICATIONS]_GET_USER_BASE_INFORMATION_SUCCESS"
}

export class GetUserBaseInformation implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/User/GetUserBaseInfo`,
      method: "GET",
      successType: EActionTypes.GET_USER_BASE_INFORMATION_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type AuthActions = GetUserBaseInformation;

import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { ILogsNetworkRequest } from ".";

export enum EActionTypes {
  GET_LOGS_NETWORK_SUCCESS = "[LOGS]_GET_LOGS_NETWORK_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: ILogsNetworkRequest,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Logs/GetLogsNetWorkPaging`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_LOGS_NETWORK_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type AuthActions = Get;

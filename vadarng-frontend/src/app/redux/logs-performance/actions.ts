import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { IHostQueryConditions } from ".";

export enum EActionTypes {
  GET_LOGS_SUCCESS = "[LOGS]_GET_LOGS_SUCCESS",
  UPDATE_LOGS_SUCCESS = "[LOGS]_UPDATE_LOGS_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IHostQueryConditions,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Logs/GetLogsPerformancePaging`, // todo
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_LOGS_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

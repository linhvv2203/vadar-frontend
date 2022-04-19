import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { IHostQueryConditions } from ".";

export enum EActionTypes {
  GET_EVENTS_PERFORMANCE_STATISTICS_SUCCESS = "[EVENTS]_GET_EVENTS_PERFORMANCE_STATISTICS_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: any, //IHostQueryConditions,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Dashboard/GetLast10PerformanceEvent/` + payload, // todo
      method: "GET",
      data: payload,
      successType: EActionTypes.GET_EVENTS_PERFORMANCE_STATISTICS_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type AuthActions = Get;

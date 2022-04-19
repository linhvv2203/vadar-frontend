import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { IHostQueryConditions } from ".";
import { Action } from "@ngrx/store";

export enum EActionTypes {
  GET_EVENTS_SUCCESS = "[EVENTS]_GET_EVENTS_SUCCESS",
  UPDATE_EVENTS_SUCCESS = "[EVENTS]_UPDATE_EVENTS_SUCCESS",
  FILTER = "FILTER"
}

export class Filter implements Action {
  public readonly type = EActionTypes.FILTER;
  constructor(readonly payload: string) {}
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
      url: `/assets/data/host.csv`, // todo
      method: "GET",
      apiVersion: "v2",
      successType: EActionTypes.GET_EVENTS_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

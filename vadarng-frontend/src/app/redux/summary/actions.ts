import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_SUMMARY_SUCCESS = "[SUMMARY]_GET_SUMMARY_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetDashboardSummary/` + payload,
      method: "GET",
      successType: EActionTypes.GET_SUMMARY_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type AuthActions = Get;

import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_EVENTS_SUMMARY_SUCCESS = "[SECURITY]_GET_EVENTS_SUMMARY_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetEventSummaryIntegrityMonitoring`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_EVENTS_SUMMARY_SUCCESS,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_ALERTS_BY_ACTION_OVER_TIME_SUCCESS = "[SECURITY]_GET_ALERTS_BY_ACTION_OVER_TIME_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetAlertsByActionOverTime`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_ALERTS_BY_ACTION_OVER_TIME_SUCCESS,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

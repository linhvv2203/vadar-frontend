import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_EVENT_SECURITY_SUCCESS = "[EVENT_SECURITY]_GET_EVENT_SECURITY_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetSecurityEventByTime`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_EVENT_SECURITY_SUCCESS,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

export type AuthActions = Get;

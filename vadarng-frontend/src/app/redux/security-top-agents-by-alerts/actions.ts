import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_TOP_AGENTS_BY_ALERTS_NUMBER = "[SECURITY]_GET_TOP_AGENTS_BY_ALERTS_NUMBER"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetTop10AgentsByAlertsNumber`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_TOP_AGENTS_BY_ALERTS_NUMBER,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

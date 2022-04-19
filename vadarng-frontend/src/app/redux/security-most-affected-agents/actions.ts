import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_MOST_AFFECTED_AGENTS = "[SECURITY]_GET_MOST_AFFECTED_AGENTS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetMostAffectedAgents`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_MOST_AFFECTED_AGENTS,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

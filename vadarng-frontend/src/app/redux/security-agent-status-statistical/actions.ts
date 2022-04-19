import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_AGENT_STATUS_STATISTICAL_SUCCESS = "[SECURITY]_GET_AGENT_STATUS_STATISTICAL_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetAgentsStatus`,
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_AGENT_STATUS_STATISTICAL_SUCCESS,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

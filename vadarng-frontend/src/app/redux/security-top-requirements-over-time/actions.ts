import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_TOP_REQ_OVER_TIME = "[SECURITY]_GET_TOP_REQ_OVER_TIME"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetTopRequirementsOverTime`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_TOP_REQ_OVER_TIME,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { IHostQueryConditions } from ".";

export enum EActionTypes {
  GET_LOGSSECURITY_GROUP_BY_SUCCESS = "[LOGSSECURITY]_GET_LOGSSECURITY_GROUP_BY_SUCCESS"
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
      url: `/Logs/GetGroupLogsByCondition`, // todo
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_LOGSSECURITY_GROUP_BY_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

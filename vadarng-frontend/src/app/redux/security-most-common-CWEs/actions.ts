import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_MOST_COMMON_CWES_SUCCESS = "[SECURITY]_GET_MOST_COMMON_CWES_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetMostCommonCWEs`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_MOST_COMMON_CWES_SUCCESS,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

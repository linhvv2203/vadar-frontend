import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_VUL_SUMMARY = "[SECURITY]_GET_VUL_SUMMARY"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetVulnerabilitiesSummary`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_VUL_SUMMARY,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

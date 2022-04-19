import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_TOP10ATTACK_SUCCESS = "[TOP10ATTACK]_GET_TOP10ATTACK_SUCCESS",
  GET_DETECT_IP = "[TOP10ATTACK]_GET_DETECT_IP"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetTop10AttackIP/` + payload,
      method: "GET",
      successType: EActionTypes.GET_TOP10ATTACK_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class DetectIP implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      // url: `http://ip-api.com/json/${payload}`,
      url: `https://api.safesai.com/stripe/ip2geo/${payload}`,
      method: "GET",
      headers: {
        // "Cache-Control": "max-age=31536000"
      },
      apiVersion: "outDoor",
      successType: EActionTypes.GET_DETECT_IP,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type AuthActions = Get | DetectIP;

import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";

export enum EActionTypes {
  GET_REQ_PCI_DSS = "[SECURITY]_GET_REQ_PCI_DSS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload?: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Dashboard/GetPCIDSSRequirements`,
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_REQ_PCI_DSS,
      afterSuccess: next
      //afterError: nextError
    };
  }
}

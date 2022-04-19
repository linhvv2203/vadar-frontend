import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction,
  IQueryTheHive
} from "src/app/redux/middleware";
import { IHostQueryConditions } from ".";

export enum EActionTypes {
  GET_LOGSSECURITY_SUCCESS = "[LOGSSECURITY]_GET_LOGSSECURITY_SUCCESS",
  GET_CASE_TEMPLATE_SUCCESS = "[LOGSSECURITY]_GET_CASE_TEMPLATE_SUCCESS",
  CREATE_TICKET_SUCCESS = "[LOGSSECURITY]_CREATE_TICKET_SUCCESS"
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
      url: `/Logs/GetLogSecurity`, // todo
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_LOGSSECURITY_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}
export class GetCaseTempalte implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IQueryTheHive,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Ticket`, // todo
      method: "POST",
      data: { ...payload, services: "Ticket" },
      successType: EActionTypes.GET_CASE_TEMPLATE_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class CreatTicket implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IQueryTheHive,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Ticket`, // todo
      method: "POST",
      data: { ...payload, services: "Ticket" },
      successType: EActionTypes.CREATE_TICKET_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

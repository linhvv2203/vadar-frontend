import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction,
  IQueryTheHive
} from "src/app/redux/middleware";
import { ILogsTicketRequest } from ".";

export enum EActionTypes {
  GET_LOGS_TICKET_SUCCESS = "[TICKET]_GET_LOGS_TICKET_SUCCESS",
  GET_DETAIL_TICKET_SUCCESS = "[TICKET]_GET_DETAIL_TICKET_SUCCESS"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: ILogsTicketRequest,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Ticket`,
      method: "POST",
      data: {
        ...payload,
        services: "GetTicketElasticsearch",
        index: "noindex",
        method: "POST"
      },
      successType: EActionTypes.GET_LOGS_TICKET_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}
export class GetDetailTicket implements IMiddlewareAction {
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
      successType: EActionTypes.GET_DETAIL_TICKET_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class UpdateTicket implements IMiddlewareAction {
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
      afterSuccess: next,
      afterError: nextError
    };
  }
}

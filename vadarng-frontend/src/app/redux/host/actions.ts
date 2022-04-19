import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { IHostQueryConditions } from ".";

export enum EActionTypes {
  GET_HOST_SUCCESS = "[HOST]_GET_HOST_SUCCESS",
  GET_GRF_SECURITY4_SUCCESS = "[HOST]_GET_GRF_SECURITY4_SUCCESS",
  UPDATE_HOST_SUCCESS = "[HOST]_UPDATE_HOST_SUCCESS",
  GET_HOST_NOT_EXIST_SUCCESS = "[HOST]_GET_HOST_NOT_EXIST_SUCCESS",
  GET_AGENT_INSTALL_BY_WORKSPACE_ID_SUCCESS = "[HOST]_GET_AGENT_INSTALL_BY_WORKSPACE_ID_SUCCESS",
  DELETE_HOST_SUCCESS = "[HOST]_DELETE_HOST_SUCCESS"
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
      url: `/host`, // todo
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_HOST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetAgentInstallByWorkspace implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { workspaceId: string },
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/AgentInstall/GetAgentInstallByWorkspace/${payload.workspaceId}`, // todo
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_AGENT_INSTALL_BY_WORKSPACE_ID_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetNotExist implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IHostQueryConditions,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/host`, // todo
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_HOST_NOT_EXIST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetDetail implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IHostQueryConditions,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/test/${payload}`, // todo
      method: "GET",
      successType: EActionTypes.GET_HOST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Update implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IHostQueryConditions,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/host", // todo
      data: payload,
      method: "PUT",
      successType: EActionTypes.UPDATE_HOST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Delete implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { hostId: string; workspaceId: string },
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/host/DeleteHost/${payload.hostId}/${payload.workspaceId}`,
      method: "DELETE",
      successType: EActionTypes.DELETE_HOST_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetSelectGrfSecurity4 implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IHostQueryConditions,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Dashboard/GetRuleByAgentName`, // todo
      method: "POST",
      data: payload,
      successType: EActionTypes.GET_GRF_SECURITY4_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

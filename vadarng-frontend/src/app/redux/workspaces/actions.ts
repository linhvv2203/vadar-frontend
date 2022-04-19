import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction,
  IQueryTheHive
} from "src/app/redux/middleware";
import { IWorkspacePagingRequest, ItemData } from ".";
import { Action } from "@ngrx/store";

export enum EActionTypes {
  GET_WORKSPACE_PAGING_SUCCESS = "[WORKSPACES]_GET_WORKSPACE_PAGING_SUCCESS",
  GET_WORKSPACE_BY_ID_SUCCESS = "[WORKSPACES]_GET_WORKSPACE_BY_ID_SUCCESS",
  CREATE_WORKSPACES_SUCCESS = "[WORKSPACES]_CREATE_WORKSPACES_SUCCESS",
  UPDATE_WORKSPACES_SUCCESS = "[WORKSPACES]_UPDATE_WORKSPACES_SUCCESS",
  DELETE_WORKSPACES_SUCCESS = "[WORKSPACES]_DELETE_WORKSPACES_SUCCESS",
  DELETE_BY_LIST_ID_SUCCESS = "[WORKSPACES]_DELETE_BY_LIST_ID_SUCCESS",
  GET_ALL_WORKSPACE_BY_USERID_SUCCESS = "[WORKSPACES]_GET_ALL_WORKSPACE_BY_USERID",
  SET_WORKSPACES_SELECTED_HEADER = "[WORKSPACES]SET_WORKSPACES_SELECTED_HEADER"
}

export class SetSelectedWorkspacesHeader implements Action {
  public readonly type = EActionTypes.SET_WORKSPACES_SELECTED_HEADER;
  constructor(readonly payload: any) {}
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: IWorkspacePagingRequest,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Workspace`,
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_WORKSPACE_PAGING_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetAllWorkspaceByUserId implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/Workspace/GetAllWorkspace`,
      method: "GET",
      successType: EActionTypes.GET_ALL_WORKSPACE_BY_USERID_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetDetail implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { workspaceId: number },
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/Workspace/${payload.workspaceId}`,
      method: "GET",
      successType: EActionTypes.GET_WORKSPACE_BY_ID_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Create implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: ItemData,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/Workspace",
      data: payload,
      method: "POST",
      successType: EActionTypes.CREATE_WORKSPACES_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Update implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: ItemData,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/Workspace",
      data: payload,
      method: "PUT",
      successType: EActionTypes.UPDATE_WORKSPACES_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Delete implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { workspaceId: number },
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/Workspace/${payload.workspaceId}`,
      method: "DELETE",
      successType: EActionTypes.DELETE_WORKSPACES_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class DeleteByListId implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { workspaceIds: string[] },
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/Workspace/DeleteByListId`,
      data: payload.workspaceIds,
      method: "POST",
      successType: EActionTypes.DELETE_BY_LIST_ID_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Organisation implements IMiddlewareAction {
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

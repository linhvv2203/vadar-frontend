import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { IWorkspaceRolePaging } from ".";
import { IWorkspacePaging } from "../workspaces";

export enum EActionTypes {
  GET_WORKSPACEROLES_BY_WORKSPACEID_SUCCESS = "[WORKSPACEROLES]_GET_WORKSPACEROLES_BY_WORKSPACEID_SUCCESS",
  DELETE_BY_LIST_ID_SUCCESS = "[WORKSPACEROLES]_DELETE_BY_LIST_ID_SUCCESS",
  CREATE_WORKSPACEROLE_SUCCESS = "[WORKSPACEROLES]_CREATE_WORKSPACEROLE_SUCCESS",
  DELETE_WORKSPACEROLES_SUCCESS = "[WORKSPACEROLES]_DELETE_WORKSPACEROLES_SUCCESS",
  GET_PERMISSIONS_BY_WORKSPACEROLEID_AND_USERID_SUCCESS = "[WORKSPACEROLES]_GET_PERMISSIONS_BY_WORKSPACEID_AND_USERID_SUCCESS",
  ASSIGN_PERMISSION_TO_ROLE_SUCCESS = "[WORKSPACEROLES]_ASSIGN_PERMISSION_TO_ROLE_SUCCESS",
  GET_WORKSPACEROLES_PAGING_SUCCESS = "GET_WORKSPACEROLES_PAGING_SUCCESS"
}

export class GetAllWorkspaceRolesByWorkspaceId implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: { workspaceId: Number; workspaceRoleName?: string },
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/WorkspaceRole/${payload.workspaceId}`,
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_WORKSPACEROLES_BY_WORKSPACEID_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetAllWorkspaceRolesPaging implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IWorkspaceRolePaging,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/WorkspaceRole/GetRolePaging`,
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_WORKSPACEROLES_PAGING_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class GetPermissionsByWorkspaceRoleIdAndUserId
  implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(payload: any, next?: (res) => void, nextError?: () => void) {
    this.payload = {
      url: `/WorkspaceRole/GetPermissions/${payload.workspaceRoleId}`,
      method: "GET",
      successType:
        EActionTypes.GET_PERMISSIONS_BY_WORKSPACEROLEID_AND_USERID_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class AssignPermissionToRole implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: any,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/WorkspaceRole/AssignWorkspaceRolePermissions",
      data: payload,
      method: "POST",
      successType: EActionTypes.ASSIGN_PERMISSION_TO_ROLE_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class DeleteByListId implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { workspaceRoleIds: any },
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/WorkspaceRole/DeleteWorkspaceRoleIds`,
      data: payload.workspaceRoleIds,
      method: "POST",
      successType: EActionTypes.DELETE_BY_LIST_ID_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Create implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: any,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/WorkspaceRole",
      data: payload,
      method: "POST",
      successType: EActionTypes.CREATE_WORKSPACEROLE_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Delete implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { workspaceRoleId: number },
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/WorkspaceRole/${payload.workspaceRoleId}`,
      method: "DELETE",
      successType: EActionTypes.DELETE_WORKSPACEROLES_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type WorkspaceActions =
  | GetAllWorkspaceRolesByWorkspaceId
  | GetPermissionsByWorkspaceRoleIdAndUserId
  | AssignPermissionToRole
  | DeleteByListId
  | Delete
  | Create
  | GetAllWorkspaceRolesPaging;

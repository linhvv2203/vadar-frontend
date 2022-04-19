import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import {
  IInviteWorkspaceRequest,
  IAcceptRejectInvitation,
  IWorkspaceRoleUserUpdateRequest
} from ".";

export enum EActionTypes {
  GET_MEMBERS_BY_WORKSPACE_SUCCESS = "[MEMBERS]_GET_MEMBERS_BY_WORKSPACE_SUCCESS",
  ACCEPT_REJECT_INVITATION_SUCCESS = "[MEMBERS]_ACCEPT_REJECT_INVITATION_SUCCESS",
  CANCEL_INVITATION_SUCCESS = "[MEMBERS]_CANCEL_INVITATION_SUCCESS",
  CREATE_INVITATION_TO_WORKSPACE_SUCCESS = "[MEMBERS]_CREATE_INVITATION_TO_WORKSPACE_SUCCESS",
  RESEND_INVITATION_SUCCESS = "[MEMBERS]_RESEND_INVITATION_SUCCESS",
  DELETE_INVITATION_SUCCESS = "[MEMBERS]_DELETE_INVITATION_SUCCESS",
  UPDATE_WORKSPACE_ROLE_FOR_USER_SUCCESS = "[MEMBERS]_UPDATE_WORKSPACE_ROLE_FOR_USER_SUCCESS",
  VERIFY_INVITATION_SUCCESS = "[MEMBERS]_VERIFY_INVITATION_SUCCESS"
}

export class GetMembersByWorkspace implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: { workspaceId: number; emailAddress?: string },
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/InviteWorkspaceRole/GetMembersByWorkspace/${payload.workspaceId}`,
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_MEMBERS_BY_WORKSPACE_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class AcceptRejectInvitation implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IAcceptRejectInvitation,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/InviteWorkspaceRole`,
      method: "POST",
      data: payload,
      successType: EActionTypes.ACCEPT_REJECT_INVITATION_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class CancelInvitation implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { invitationId: string },
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/InviteWorkspaceRole/${payload.invitationId}`,
      method: "DELETE",
      successType: EActionTypes.CANCEL_INVITATION_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class DeleteInvitation implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { invitationId: string; workspaceId: number },
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/InviteWorkspaceRole/DeleteInvitation/${payload.invitationId}/${payload.workspaceId}`,
      method: "DELETE",
      successType: EActionTypes.DELETE_INVITATION_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class ResendInvitation implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { invitationId: string; language: string },
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/InviteWorkspaceRole/ResendInvitation/${payload.invitationId}/${payload.language}`,
      method: "GET",
      successType: EActionTypes.RESEND_INVITATION_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class CreateInviteForWorkspace implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: IInviteWorkspaceRequest,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/InviteWorkspaceRole/CreateInviteForWorkspace",
      data: payload,
      method: "POST",
      successType: EActionTypes.CREATE_INVITATION_TO_WORKSPACE_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class UpdateWorkspaceRoleForUser implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: IWorkspaceRoleUserUpdateRequest,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/InviteWorkspaceRole/UpdateWorkspaceRoleForUser",
      data: payload,
      method: "PUT",
      successType: EActionTypes.UPDATE_WORKSPACE_ROLE_FOR_USER_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class VerifyInvitation implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload: { invitationId: string },
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/InviteWorkspaceRole/VerifyInvitation/${payload.invitationId}`,
      method: "GET",
      successType: EActionTypes.VERIFY_INVITATION_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export type MembersActions =
  | GetMembersByWorkspace
  | AcceptRejectInvitation
  | CancelInvitation
  | CreateInviteForWorkspace
  | UpdateWorkspaceRoleForUser
  | ResendInvitation
  | DeleteInvitation;

export interface IInviteWorkspaceRequest {
  emails?: string[];
  workspaceRoles?: string[];
  language?: string;
}

export interface IWorkspaceRoleUserUpdateRequest {
  email?: string;
  workspaceRoles?: string[];
}

export interface IAcceptRejectInvitation {
  status?: number;
  invitationId?: string;
}

export interface IMembersByWorkspaceView {
  userId?: string;
  userName?: string;
  inviteStatus?: number;
  workspaceRoleId?: string;
}

export interface IState {
  getMembersByWorkspace: IMembersByWorkspaceView[];
}

export const initialState: IState = {
  getMembersByWorkspace: []
};

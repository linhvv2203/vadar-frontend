export interface ItemData {
  id?: string;
  name?: string;
  nameEngine?: string;
  description?: string;
  groupName?: string;
  level?: number;
  fullLog?: string;
  count?: number;
}

export interface IHostQueryConditions {
  pageIndex?: number;
  pageSize?: number;
  hostName?: string;
  nameEngine?: string;
  groupId?: string;
  workspaceId?: string;
  createdById?: string;
  checkExist?: number;
  status?: number;
}

export interface IPagedResult {
  count?: number;
  items?: ItemData[];
}

export interface IState {
  getGroupPaging: IPagedResult;
  getNotExist: IPagedResult;
  getAgentInstallByWorkspace: any[];
  grfSecurity4: any;
}

export const initialState: IState = {
  getGroupPaging: {},
  getNotExist: {},
  getAgentInstallByWorkspace: [],
  grfSecurity4: []
};

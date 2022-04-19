import { LocalStorageService } from "src/app/services/local-storage";
const localStorageInstance = new LocalStorageService();
export interface IGroupPagingRequest {
  groupName?: string;
  pageIndex?: number;
  pageSize?: number;
  workspaceId?: any;
}

export interface IAddGroupToGroupRequest {
  id: string[];
  groupId: string;
}

export interface IGroupRequest {
  id?: string;
  name?: string;
  description?: string;
}

export interface IPagedResult {
  count?: number;
  items?: IGroupViewModel[];
}

export interface IGroupViewModel {
  id?: number;
  name?: string;
  HostName?: any;
  NumberOfHost?: number;
}

export interface IState {
  getGroupPaging: IPagedResult;
  hostOfGroup: any;
}

export const initialGroupState: IGroupViewModel[] = [];

export const initialState: IState = {
  getGroupPaging: {},
  hostOfGroup: initialGroupState[0]
};

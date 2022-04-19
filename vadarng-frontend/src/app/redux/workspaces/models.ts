import { LocalStorageService } from "src/app/services/local-storage";
import { NzInputNumberComponent } from "ng-zorro-antd";
const localStorageInstance = new LocalStorageService();
export interface ItemData {
  id?: number;
  name?: string;
  description?: string;
  createdById?: string;
  createdDate?: string;
  updateById?: string;
  updatedDate?: string;
}

export interface IWorkspacePaging {
  count?: number;
  items?: ItemData[];
}

export interface IWorkspacePagingRequest {
  pageIndex?: number;
  pageSize?: number;
  workspaceName?: string;
}

export const initialWorkspacesState: ItemData[] = [];

export interface IState {
  workspacePaging: IWorkspacePaging;
  allWorkspaces: any[];
  getDetail: ItemData;
  selectedWorkspacesHeader: any;
}

export const initialState: IState = {
  workspacePaging: {},
  allWorkspaces: null,
  getDetail: {},
  selectedWorkspacesHeader: null
};

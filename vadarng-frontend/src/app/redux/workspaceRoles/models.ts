import { LocalStorageService } from "src/app/services/local-storage";
import { NzInputNumberComponent } from "ng-zorro-antd";
const localStorageInstance = new LocalStorageService();

export const initialWorkspaceRolesState: any[] = [];

export const initialWorkspaceRolePagingState = [];

export interface IState {
  getAll: any[];
  getPermissions: any;
  workspaceRolePaging: any[];
}

export interface IWorkspaceRolePaging {
  pageIndex?: number;
  pageSize?: number;
  workspaceId?: number;
  workspaceRoleName?: string;
}

export const initialState: IState = {
  getAll: [],
  getPermissions: {},
  workspaceRolePaging: initialWorkspaceRolePagingState
};

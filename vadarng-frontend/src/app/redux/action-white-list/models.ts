export interface ItemData {
  id?: number;
  ip?: string;
  comment?: string;
}

export interface IHostQueryConditions {
  pageIndex?: number;
  pageSize?: number;
  groupId?: string;
  id?: string;
}

export interface IPolicyWhiteListPaging {
  pageIndex?: number;
  pageSize?: number;
  workspaceId?: number;
  ip?: string;
}

export const initialWhiteListState = [];
export const initialWhiteListPagingState = [];

export const initialActionState: ItemData[] = [];

export interface IState {
  whitelist: any[];
  whiteListPaging: any[];
}

export const initialState: IState = {
  whitelist: initialWhiteListState,
  whiteListPaging: initialWhiteListPagingState
};

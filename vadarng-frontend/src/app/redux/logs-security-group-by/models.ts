export interface ItemData {
  id?: number;
  timestamp?: string;
  host?: any;
  description?: string;
  fullLog?: string;
  level?: string;
  groups?: string;
}

export interface IHostQueryConditions {
  pageIndex?: number;
  pageSize?: number;
  id?: string;
  fromDate?: any;
  toDate?: any;
  level?: number;
  eventGroup?: string;
  eventName?: string;
  hostName?: string;
  workspaceId?: number;
  checkExist?: number;
  sort?: string;
}

export const initialLogsSecurityState: ItemData[] = [];

export interface IState {
  count: number;
  items: ItemData[];
  item: ItemData;
}

export const initialState: IState = {
  items: initialLogsSecurityState,
  count: initialLogsSecurityState.length,
  item: initialLogsSecurityState[0]
};

export interface ItemData {
  id?: number;
  time?: string;
  level?: string;
  hostName?: string;
  eventName?: string;
  description?: string;
  severity?: string;
  status?: string;
}

export interface IHostQueryConditions {
  pageIndex?: number;
  pageSize?: number;
  fromDate?: any;
  toDate?: any;
  status?: string;
  groupName?: string;
  workspaceId?: number;
}

export const initialLogPerformanceState: ItemData[] = [];

export interface IState {
  count: number;
  items: ItemData[];
  item: ItemData;
}

export const initialState: IState = {
  items: initialLogPerformanceState,
  count: initialLogPerformanceState.length,
  item: initialLogPerformanceState[0]
};

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

export interface ILogsNetworkRequest {
  pageIndex?: number;
  pageSize?: number;
  fromDate?: any;
  toDate?: any;
  hostName?: string;
  sourceAddress?: string;
  destinationAddress?: string;
  workspaceId?: number;
}

export const initialLogNetworkState: ItemData[] = [];

export interface IState {
  count: number;
  items: ItemData[];
  item: ItemData;
}

export const initialState: IState = {
  items: initialLogNetworkState,
  count: initialLogNetworkState.length,
  item: initialLogNetworkState[0]
};

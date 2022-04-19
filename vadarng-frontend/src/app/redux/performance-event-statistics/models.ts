export interface ItemData {
  id?: number;
  eventName?: string;
  hostName?: string;
  time?: string;
}

export interface IHostQueryConditions {
  pageIndex?: number;
  pageSize?: number;
  id?: string;
}

export const initialEventsState: ItemData[] = []; //convertData(facade);

export interface IState {
  data: ItemData[];
}

export const initialState: IState = {
  data: []
};

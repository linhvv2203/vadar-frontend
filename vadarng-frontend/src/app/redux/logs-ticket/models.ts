export interface ItemData {
  id?: number;
  startDate?: string;
  endDate?: string;
  title?: string;
  severity?: string;
  tlp?: string;
  pap?: string;
  tags?: string[];
  link?: string;
  assignee: string;
  isInit?: boolean;
  hostName?: string;
  eventTime?: string;
}

export interface ILogsTicketRequest {
  owner?: string;
  query?: any;
  workspaceId?: number;
}

export const initialLogTicketState: ItemData[] = [];

export interface IState {
  count: number;
  items: ItemData[];
  item: ItemData;
}

export const initialState: IState = {
  items: initialLogTicketState,
  count: initialLogTicketState.length,
  item: {
    startDate: "--",
    endDate: "--",
    title: "--",
    severity: "--",
    tlp: "--",
    pap: "--",
    tags: [],
    link: "--",
    assignee: "--",
    isInit: true,
    hostName: "--",
    eventTime: "--"
  }
};

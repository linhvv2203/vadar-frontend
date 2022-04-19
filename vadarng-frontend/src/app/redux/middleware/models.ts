export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface IPayload {
  readonly url: string;
  readonly params?: object;
  readonly data?: object;
  readonly method?: Method;
  readonly headers?: object;
  readonly noLoading?: boolean;
  readonly beforeCallType?: string;
  readonly afterCallType?: string;
  readonly successType?: string;
  readonly errorType?: string;
  readonly apiVersion?: string;
  afterSuccess?(res?: any, params?: any): void;
  afterError?(error?: any, params?: any): void;
}

export interface IAction {
  readonly type: string;
  readonly payload: IPayload;
}

export interface IQueryTheHive {
  method: Method;
  index: string;
  useCookie?: boolean;
  query: any;
  organisation?: string;
  workspaceId?: number;
  owner?: string;
}

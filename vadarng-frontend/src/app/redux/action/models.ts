import { LocalStorageService } from "src/app/services/local-storage";
const localStorageInstance = new LocalStorageService();
export interface ItemData {
  id?: number;
  name?: string;
  status?: boolean;
}

export interface IHostQueryConditions {
  pageIndex?: number;
  pageSize?: number;
  id?: string;
}

export const initialPolicyState = [];

export interface IState {
  policies: any[];
}

export const initialState: IState = {
  policies: initialPolicyState
};

import { LocalStorageService } from "src/app/services/local-storage";
import { NzInputNumberComponent } from "ng-zorro-antd";
const localStorageInstance = new LocalStorageService();
export interface ItemData {
  email?: string;
}

export interface IAlertEmailRequest {
  email?: string;
  emails?: string[];
  workspaceName?: string;
  workspaceToken?: string;
  workspaceId?: number;
}

export const initialAlertChannelState: ItemData[] = [];

export interface IState {
  alertChannelSetting: IAlertEmailRequest;
}

export const initialState: IState = {
  alertChannelSetting: {}
};

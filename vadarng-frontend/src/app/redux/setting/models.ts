import { IAppState } from "src/app/redux/app.state";
import { LocalStorageService } from "src/app/services/local-storage";

import { environment } from "src/environments/environment";

const localStorageInstance = new LocalStorageService();

export type Language = "en" | "vn";

export interface ISettingState {
  lang: string;
}

export const initialSettingState: ISettingState = localStorageInstance.getItem(
  environment.localStorage.settingsKey
) || {
  lang: "vn"
};

export interface IState extends IAppState {
  settings: ISettingState;
}

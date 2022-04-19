import { createSelector } from "@ngrx/store";

import { IAppState } from "src/app/redux/app.state";
import { ISettingState } from "src/app/redux/setting/models";

const settingState = (state: IAppState) => {
  return state.setting;
};

export const selectSetting = createSelector(
  settingState,
  (state: ISettingState) => state
);

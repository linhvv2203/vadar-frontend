import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.alertChannel;
};

export const selectSetting = createSelector(
  stateSelected,
  (state: IState) => state.alertChannelSetting
);

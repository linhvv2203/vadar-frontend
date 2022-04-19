import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.actionWhiteList;
};

export const selectWhiteList = createSelector(
  stateSelected,
  (state: IState) => state.whitelist
);

export const selectWhiteListPaging = createSelector(
  stateSelected,
  (state: IState) => state.whiteListPaging
);

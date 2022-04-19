import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.logSecurity;
};

export const select = createSelector(stateSelected, (state: IState) => state);

export const selectCaseTemplate = createSelector(
  stateSelected,
  (state: IState) => state.templateTheHive
);

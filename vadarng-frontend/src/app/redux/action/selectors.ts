import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.action;
};

export const selectPolicies = createSelector(
  stateSelected,
  (state: IState) => state.policies
);

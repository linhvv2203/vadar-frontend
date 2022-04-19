import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.securityTop5Agents;
};

export const select = createSelector(stateSelected, (state: IState) => state);

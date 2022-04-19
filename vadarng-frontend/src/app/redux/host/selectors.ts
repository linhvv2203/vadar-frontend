import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.host;
};

export const selectGroupPaging = createSelector(
  stateSelected,
  (state: IState) => state.getGroupPaging
);

export const selectGetHostNotExist = createSelector(
  stateSelected,
  (state: IState) => state.getNotExist
);

export const selectGetAgentInstallByWorkspace = createSelector(
  stateSelected,
  (state: IState) => state.getAgentInstallByWorkspace
);

export const selectgrfSecurity4 = createSelector(
  stateSelected,
  (state: IState) => state.grfSecurity4
);

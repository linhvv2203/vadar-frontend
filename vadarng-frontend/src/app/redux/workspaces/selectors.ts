import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.workspaces;
};

export const select = createSelector(
  stateSelected,
  (state: IState) => state.workspacePaging
);

export const selectDetail = createSelector(
  stateSelected,
  (state: IState) => state.getDetail
);

export const selectAll = createSelector(
  stateSelected,
  (state: IState) => state.allWorkspaces
);

export const selectedWorkspacesHeader = createSelector(
  stateSelected,
  (state: IState) => state.selectedWorkspacesHeader
);

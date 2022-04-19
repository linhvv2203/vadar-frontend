import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.workspaceRoles;
};

export const selectAll = createSelector(
  stateSelected,
  (state: IState) => state.getAll
);

export const selectPermissions = createSelector(
  stateSelected,
  (state: IState) => state.getPermissions
);

export const selectWorkspaceRolePaging = createSelector(
  stateSelected,
  (state: IState) => state.workspaceRolePaging
);

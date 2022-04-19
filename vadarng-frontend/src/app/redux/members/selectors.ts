import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.members;
};

export const selectMembersByWorkspace = createSelector(
  stateSelected,
  (state: IState) => state.getMembersByWorkspace
);

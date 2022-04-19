import { IAppState } from "src/app/redux/app.state";
import { IState } from "./models";
import { createSelector } from "@ngrx/store";

const stateSelected = (state: IAppState) => {
  return state.group;
};

export const selectGetGroupPaging = createSelector(
  stateSelected,
  (state: IState) => state.getGroupPaging
);

export const selectDetail = createSelector(
  stateSelected,
  (state: IState) => state.hostOfGroup
);

import { createSelector } from "@ngrx/store";
import { IState } from "./models";
import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.logTicket;
};

export const selectLogsTicket = createSelector(
  stateSelected,
  (state: IState) => state
);

export const selectDetailTicket = createSelector(
  stateSelected,
  (state: IState) => state.item
);

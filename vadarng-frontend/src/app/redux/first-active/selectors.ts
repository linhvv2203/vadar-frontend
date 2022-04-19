import { createSelector } from "@ngrx/store";

import { IAppState } from "src/app/redux/app.state";

const firstActive = (state: IAppState) => {
  return state.firstActive;
};

export const selectFirstActive = createSelector(
  firstActive,
  (payload: boolean) => {
    return payload;
  }
);

import { createSelector } from "@ngrx/store";

import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.auth;
};

export const select = createSelector(stateSelected, (state: any) => state);

import { createSelector } from "@ngrx/store";

import { IAppState } from "src/app/redux/app.state";

const stateSelected = (state: IAppState) => {
  return state.loading;
};

export const select = createSelector(stateSelected, (state: boolean) => state);

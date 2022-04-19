import { createSelector } from "@ngrx/store";

import { IAppState } from "src/app/redux/app.state";

const showLeftMenuState = (state: IAppState) => {
  return state.showLeftMenu;
};

export const selectShowLeftMenu = createSelector(
  showLeftMenuState,
  (payload: boolean) => {
    return payload;
  }
);

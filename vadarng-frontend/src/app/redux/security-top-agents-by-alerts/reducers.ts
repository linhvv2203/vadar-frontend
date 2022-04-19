import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_TOP_AGENTS_BY_ALERTS_NUMBER: {
      return [...action.payload];
    }

    default:
      return state;
  }
}

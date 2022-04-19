import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_ALERT_EVOLUTION_OVER_TIME: {
      return [...action.payload];
    }

    default:
      return state;
  }
}

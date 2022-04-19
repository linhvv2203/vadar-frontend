import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_EVENTS_SECURITY_STATISTICS_SUCCESS: {
      return {
        ...state,
        data: action.payload || []
      };
    }

    default:
      return state;
  }
}

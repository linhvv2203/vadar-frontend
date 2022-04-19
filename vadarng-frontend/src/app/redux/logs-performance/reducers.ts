import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_LOGS_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}

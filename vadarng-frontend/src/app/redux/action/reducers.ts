import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";
import { ItemData } from ".";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_POLICIES_SUCCESS: {
      return {
        ...state,
        policies: action.payload
      };
    }

    default:
      return state;
  }
}

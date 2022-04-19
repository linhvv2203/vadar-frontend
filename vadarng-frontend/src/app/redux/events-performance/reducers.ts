import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_EVENT_PER_SUCCESS: {
      return [...(action.payload || [])];
    }

    default:
      return state;
  }
}

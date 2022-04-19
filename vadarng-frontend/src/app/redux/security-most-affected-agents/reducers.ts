import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_MOST_AFFECTED_AGENTS: {
      return [...(action.payload || [])];
    }

    default:
      return state;
  }
}

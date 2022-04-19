import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_AGENT_STATUS_STATISTICAL_SUCCESS: {
      return [...(action.payload || [])];
    }

    default:
      return state;
  }
}

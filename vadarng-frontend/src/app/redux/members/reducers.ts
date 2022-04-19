import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_MEMBERS_BY_WORKSPACE_SUCCESS: {
      return {
        ...state,
        getMembersByWorkspace: action.payload || []
      };
    }

    default:
      return state;
  }
}

import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";
import { count } from "rxjs/operators";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_USER_BASE_INFORMATION_SUCCESS: {
      return {
        ...state,
        userBaseInfo: action.payload || {}
      };
    }

    default:
      return state;
  }
}

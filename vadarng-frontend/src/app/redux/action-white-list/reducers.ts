import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_WHITE_LIST_SUCCESS: {
      return {
        ...state,
        whitelist: action.payload || []
      };
    }

    case EActionTypes.GET_ACTION_WHITELIST_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case EActionTypes.GET_WHITE_LIST_PAGING_SUCCESS: {
      return {
        ...state,
        whiteListPaging: action.payload || []
      };
    }

    default:
      return state;
  }
}

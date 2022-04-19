import { IState, initialState } from "./models";
import { EActionTypes } from "./actions";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_GROUP_PAGING: {
      return {
        ...state,
        getGroupPaging: action.payload || {}
      };
    }

    case EActionTypes.GET_GROUP_DETAIL: {
      return {
        ...state,
        hostOfGroup: action.payload || {}
      };
    }

    default:
      return state;
  }
}

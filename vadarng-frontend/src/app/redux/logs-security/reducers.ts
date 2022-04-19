import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_LOGSSECURITY_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case EActionTypes.GET_CASE_TEMPLATE_SUCCESS: {
      return {
        ...state,
        templateTheHive: [...action.payload.result]
      };
    }

    default:
      return state;
  }
}

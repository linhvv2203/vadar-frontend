import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_LOGS_TICKET_SUCCESS: {
      return {
        ...state,
        items: action.payload.result.hits.hits,
        count: action.payload.result.hits.total.value
      };
    }

    case EActionTypes.GET_DETAIL_TICKET_SUCCESS: {
      return {
        ...state,
        item: action.payload.result[0]
      };
    }

    default:
      return state;
  }
}

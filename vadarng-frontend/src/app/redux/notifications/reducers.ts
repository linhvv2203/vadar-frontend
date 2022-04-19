import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_LIST_ALERT_SETTING_SUCCESS: {
      return {
        ...state,
        alertChannelSetting: action.payload || {}
      };
    }

    default:
      return state;
  }
}

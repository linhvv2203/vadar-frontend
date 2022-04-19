import { EActionTypes } from "src/app/redux/auth/actions";
import { initialAuthState } from "src/app/redux/auth/models";

export function authReducers(state = initialAuthState, action) {
  switch (action.type) {
    case EActionTypes.GET_PROFILE_AUTH_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}

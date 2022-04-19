import { EActionTypes } from "src/app/redux/loader/actions";
import { EActionTypes as EMiddleActionTypes } from "src/app/redux/middleware/actions";

export function loaderReducers(state = false, action): boolean {
  switch (action.type) {
    case EActionTypes.START_LOADING: {
      return true;
    }
    case EActionTypes.STOP_LOADING:
    case EMiddleActionTypes.REQUEST_ERROR: {
      return false;
    }
    case EActionTypes.TOGGLE_LOADING: {
      return !state;
    }

    default:
      return state;
  }
}

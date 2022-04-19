import {
  SettingActions,
  ESettingActionTypes
} from "src/app/redux/setting/actions";
import {
  initialSettingState,
  ISettingState
} from "src/app/redux/setting/models";

export function settingReducers(
  state = initialSettingState,
  action: SettingActions
): ISettingState {
  switch (action.type) {
    case ESettingActionTypes.GET_SETTING_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case ESettingActionTypes.CHANGE_LANGUAGE: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}

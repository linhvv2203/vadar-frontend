import { SettingActions, ESettingActionTypes } from "./actions";

export function firstActiveReducers(
  firstActive = true,
  action: SettingActions
): boolean {
  switch (action.type) {
    case ESettingActionTypes.GET_FIRST_ACTIVE: {
      return firstActive;
    }

    case ESettingActionTypes.CHANGE_FIRST_ACTIVE: {
      return action.payload;
    }

    default:
      return firstActive;
  }
}

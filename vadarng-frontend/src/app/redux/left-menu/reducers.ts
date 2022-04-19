import {
  SettingActions,
  ESettingActionTypes
} from "src/app/redux/left-menu/actions";

export function leftMenuReducers(
  showLeftMenu = false,
  action: SettingActions
): boolean {
  switch (action.type) {
    case ESettingActionTypes.GET_SHOW_LEFT_MENU: {
      return showLeftMenu;
    }

    case ESettingActionTypes.CHANGE_SHOW_LEFT_MENU: {
      return action.payload;
    }

    default:
      return showLeftMenu;
  }
}

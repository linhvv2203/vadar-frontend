import { LocalStorageService } from "src/app/services/local-storage";
import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

const localStorageInstance = new LocalStorageService();

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_WORKSPACE_PAGING_SUCCESS: {
      return {
        ...state,
        workspacePaging: action.payload || {}
      };
    }

    case EActionTypes.GET_WORKSPACE_BY_ID_SUCCESS: {
      return {
        ...state,
        getDetail: action.payload || {}
      };
    }

    case EActionTypes.GET_ALL_WORKSPACE_BY_USERID_SUCCESS: {
      return {
        ...state,
        allWorkspaces: action.payload || []
      };
    }

    case EActionTypes.SET_WORKSPACES_SELECTED_HEADER: {
      localStorageInstance.setItem(
        "WORKSPACES_SELECTED",
        action.payload || null
      );
      return {
        ...state,
        selectedWorkspacesHeader: action.payload || null
      };
    }

    default:
      return state;
  }
}

import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_WORKSPACEROLES_BY_WORKSPACEID_SUCCESS: {
      return {
        ...state,
        getAll: action.payload || []
      };
    }

    case EActionTypes.GET_WORKSPACEROLES_PAGING_SUCCESS: {
      return {
        ...state,
        workspaceRolePaging: action.payload || []
      };
    }

    case EActionTypes.GET_PERMISSIONS_BY_WORKSPACEROLEID_AND_USERID_SUCCESS: {
      return {
        ...state,
        getPermissions: action.payload || {}
      };
    }

    default:
      return state;
  }
}

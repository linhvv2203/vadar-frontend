import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_HOST_SUCCESS: {
      return {
        ...state,
        getGroupPaging: action.payload || {}
      };
    }

    case EActionTypes.GET_GRF_SECURITY4_SUCCESS: {
      return {
        ...state,
        grfSecurity4: action.payload || []
      };
    }

    case EActionTypes.GET_HOST_NOT_EXIST_SUCCESS: {
      return {
        ...state,
        getNotExist: action.payload || {}
      };
    }

    case EActionTypes.GET_AGENT_INSTALL_BY_WORKSPACE_ID_SUCCESS: {
      return {
        ...state,
        getAgentInstallByWorkspace: action.payload || []
      };
    }

    default:
      return state;
  }
}

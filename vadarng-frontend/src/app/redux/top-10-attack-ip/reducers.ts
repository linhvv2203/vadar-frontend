import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

const convertData = a => {
  const b = {
    data: [],
    label: []
  };
  a &&
    a.forEach(elm => {
      b.data.push(elm.value), b.label.push(elm.hostName);
    });
  return b;
};

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_TOP10ATTACK_SUCCESS: {
      return {
        ...state,
        ...convertData(action.payload)
      };
    }

    default:
      return state;
  }
}

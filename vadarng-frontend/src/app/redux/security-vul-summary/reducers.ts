import { EActionTypes } from "./actions";
import { IState, initialState } from "./models";

const convertData = a => {
  const b = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0
  };
  a &&
    a.forEach(elm => {
      var key = elm.key;
      switch (key) {
        case "Critical":
          b.Critical = elm.value;
          break;
        case "High":
          b.High = elm.value;
          break;
        case "Medium":
          b.Medium = elm.value;
          break;
        case "Low":
          b.Low = elm.value;
          break;
        default:
        // code block
      }
    });
  return b;
};

export function reducers(state = initialState, action): IState {
  switch (action.type) {
    case EActionTypes.GET_VUL_SUMMARY: {
      return {
        ...state,
        ...convertData(action.payload)
      };
    }

    default:
      return state;
  }
}

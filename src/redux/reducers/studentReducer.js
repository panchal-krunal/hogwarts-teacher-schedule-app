import { ASSIGN_TEACHER } from "../types";

let initialState = {
  students: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_TEACHER: {
      return {
        ...state,
        students: action.payload,
      };
    }
    default:
      return state;
  }
};

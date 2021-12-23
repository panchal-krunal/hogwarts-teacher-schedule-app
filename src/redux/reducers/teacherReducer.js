import { TOGGLE_TEACHER_PRESENCE, ALLOCATE_SUBJECT } from "../types";
import teachers from "../../helpers/config/teachers";

let initialState = {
  teachers: teachers,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TEACHER_PRESENCE: {
      return {
        ...state,
        teachers: {
          ...state.teachers,
          [action.payload.id]: {
            ...state.teachers[action.payload.id],
            isPresent: action.payload.isPresent === "false" ? false : true,
          },
        },
      };
    }
    default:
      return state;
  }
};

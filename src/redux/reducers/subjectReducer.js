import { TOGGLE_TEACHER_PRESENCE, ALLOCATE_SUBJECT } from "../types";
import subjects from "../../helpers/config/subjects";

let initialState = {
  subjects: { ...subjects },
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

import { TOGGLE_TEACHER_PRESENCE } from "../types";

export const toggleAttendance = (id, isPresent) => (dispatch) => {
  dispatch({
    type: TOGGLE_TEACHER_PRESENCE,
    payload: {
      id,
      isPresent,
    },
  });
};

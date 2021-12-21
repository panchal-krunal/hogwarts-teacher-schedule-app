import { TOGGLE_TEACHER_PRESENCE,DUMMY_ACTION } from "../types";

export const toggleAttendance = (id, isPresent) => (dispatch) => {
  dispatch({
    type: TOGGLE_TEACHER_PRESENCE,
    payload: {
      id,
      isPresent,
    },
  });
};
export const dummyAction = () => (dispatch) => {
  dispatch({
    type: DUMMY_ACTION,
    payload: {
      id: 1,
    },
  });
};

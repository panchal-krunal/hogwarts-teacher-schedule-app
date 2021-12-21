import { ASSIGN_TEACHER } from "../types";

export const assignTeacher = (data) => (dispatch) => {
  dispatch({
    type: ASSIGN_TEACHER,
    payload: data,
  });
};

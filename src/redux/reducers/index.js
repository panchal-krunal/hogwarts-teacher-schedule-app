import { combineReducers } from "redux";
import teacherReducer from "./teacherReducer";
import subjectReducer from "./subjectReducer";
import studentReducer from "./studentReducer";
const rootReducer = combineReducers({
  teacherReducer,
  subjectReducer,
  studentReducer
});

export default rootReducer;

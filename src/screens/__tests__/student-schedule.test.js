import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import teachers from "../../helpers/config/teachers";
import subjects from "../../helpers/config/subjects";
import * as ReactReduxHooks from "../../helpers/react-redux-hooks";
// import * as teacherActions from "../../redux/actions/teacherActions";
import thunk from "redux-thunk";
import StudendSchedule from "../student-schedule";
import students from "../../helpers/config/students";
import { assignTeacher } from "../../redux/actions/studentActions";
import { ASSIGN_TEACHER } from "../../redux/types";
Enzyme.configure({ adapter: new Adapter() });

describe("teacher attendance component renders correctly", () => {
  let wrapper;
  let useEffect;
  let store;
  let updatedStudentObj;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };
  beforeEach(() => {
    store = mockStore({
      teacherReducer: {
        teachers: { ...teachers },
      },
      subjectReducer: {
        subjects: { ...subjects },
      },
      studentReducer: {
        students: null,
      },
    });
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect(); // important to do it twice
    mockUseEffect();
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = mount(<StudendSchedule store={store} />);

    updatedStudentObj = [
      {
        student: "Harry Potter",
        subject: "gaJoeo1e1K",
        teacher: "Professor Dumbledore",
      },
      {
        student: "Hermione Granger",
        subject: "gaJoeo1e1K",
        teacher: "Professor Dumbledore",
      },
      {
        student: "Ron Weasley",
        subject: "gaJoeo1e1K",
        teacher: "Professor Dumbledore",
      },
      {
        student: "Draco Malfoy",
        subject: "gaJoeo1e1K",
        teacher: "Professor Dumbledore",
      },
      {
        student: "Padma Patil",
        subject: "gaJoeo1e1K",
        teacher: "Professor Dumbledore",
      },
      {
        student: "Luna Lovegood",
        subject: "gaJoeo1e1K",
        teacher: "Professor Dumbledore",
      },
    ];
  });

  it("should find table", () => {
    const tableElement = wrapper.find("table");
    expect(tableElement).toHaveLength(1);
  });
  it("should dispatch assign teacher action", () => {
    store.dispatch(assignTeacher(updatedStudentObj));
    const action = store.getActions();
    const expectedAction = [
      { type: ASSIGN_TEACHER, payload: updatedStudentObj },
    ];
    expect(action).toEqual(expectedAction);
  });
  it("should dispatch assign teacher action and update store values", () => {
    store.dispatch(assignTeacher(updatedStudentObj));
    store = mockStore({
      teacherReducer: {
        teachers: { ...teachers },
      },
      subjectReducer: {
        subjects: { ...subjects },
      },
      studentReducer: {
        students: updatedStudentObj,
      },
    });
    wrapper = mount(<StudendSchedule store={store} />);
    const tableElement= wrapper.find('table')
    const rowElement= tableElement.find('tr')
    expect(rowElement).toHaveLength(7)
  });
});

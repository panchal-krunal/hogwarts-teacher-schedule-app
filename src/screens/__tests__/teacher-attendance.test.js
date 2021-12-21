import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import TeacherAttendance from "../teacher-attendance";
import configureStore from "redux-mock-store";
import teachers from "../../helpers/config/teachers";
import subjects from "../../helpers/config/subjects";
import * as ReactReduxHooks from "../../helpers/react-redux-hooks";
// import * as teacherActions from "../../redux/actions/teacherActions";
import thunk from "redux-thunk";
import {TOGGLE_TEACHER_PRESENCE} from '../../redux/types'
Enzyme.configure({ adapter: new Adapter() });

describe("teacher attendance component renders correctly", () => {
  let wrapper;
  let useEffect;
  let store;
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

    wrapper = mount(<TeacherAttendance />);
  });

  it("should render table", () => {
    const tableElement = wrapper.find("table");
    expect(tableElement).toHaveLength(1);
  });
  it("should render table rows", () => {
    const tableElement = wrapper.find("table");
    const tableRow = tableElement.find("tr");
    expect(tableRow).toHaveLength(8); // 7 teachers and 1 header
  });
  it("should render dropdown for all table rows", () => {
    const tableElement = wrapper.find("table");
    const tableRow = tableElement.find("tr");
    const ddlElement = tableRow.find("select");
    expect(ddlElement).toHaveLength(7); 
  });
  it("should dispatch no action on load", () => {
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
  it("should dispatch action on dropdown change for present", () => {
    const tableElement = wrapper.find("table");
    const tableRow = tableElement.find("tr");
    const dropdDownElement = tableRow.find("select");
    dropdDownElement.at(0).simulate("change", {
      target: { value: true },
    });
    const expectedAction = [
      {
        type: "TOGGLE_TEACHER_PRESENCE",
        payload: { id: "ql_HP3WWb5", isPresent: true },
      },
    ];
    const actions = store.getActions();
    // console.log(actions);

    expect(actions).toEqual(expectedAction);
  });
  it("should dispatch action on dropdown change for absent", () => {
    const tableElement = wrapper.find("table");
    const tableRow = tableElement.find("tr");
    const dropdDownElement = tableRow.find("select");
    dropdDownElement.at(0).simulate("change", {
      target: { value: false },
    });
    const expectedAction = [
      {
        type: TOGGLE_TEACHER_PRESENCE,
        payload: { id: "ql_HP3WWb5", isPresent: false },
      },
    ];
    const actions = store.getActions();

    expect(actions).toEqual(expectedAction);
  });
});

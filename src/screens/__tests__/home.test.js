import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Home from "../home";
import configureStore from "redux-mock-store";
import teachers from "../../helpers/config/teachers";
import subjects from "../../helpers/config/subjects";
import * as ReactReduxHooks from "../../helpers/react-redux-hooks";
import thunk from "redux-thunk";
import { TOGGLE_TEACHER_PRESENCE, ASSIGN_TEACHER } from "../../redux/types";

Enzyme.configure({ adapter: new Adapter() });

describe("tests for home component", () => {
  let wrapper, useEffect, store, shallowWrapper, updatedStudentObj;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };
  beforeAll(() => {
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

    wrapper = mount(<Home />);
    shallowWrapper = shallow(<Home />);
  });
  test("should render correctly", () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });
  it("should render header", () => {
    const headerElement = shallowWrapper.find('[data-test="header-label"]');
    expect(headerElement).toHaveLength(1);
    expect(headerElement.text()).toEqual("Hogwarts Teacher Schedule App");
  });
  it("should render teachers table", () => {
    const tableElement = shallowWrapper.find('[data-test="teachers-table"]');
    expect(tableElement).toHaveLength(1);
  });
  it("should render students table", () => {
    const tableElement = shallowWrapper.find('[data-test="students-table"]');
    expect(tableElement).toHaveLength(1);
  });
  describe("teachers table tests", () => {
    it("should render table rows", () => {
      const tableElement = shallowWrapper.find('[data-test="teachers-table"]');
      const tableRow = tableElement.find("tr");
      expect(tableRow).toHaveLength(8); // 7 teachers and 1 header
    });
    it("should render dropdown for all table rows", () => {
      const tableElement = shallowWrapper.find('[data-test="teachers-table"]');
      const tableRow = tableElement.find("tr");
      const ddlElement = tableRow.find("select");
      expect(ddlElement).toHaveLength(7);
    });
    it("should dispatch action on dropdown change for present", () => {
      const tableElement = shallowWrapper.find('[data-test="teachers-table"]');
      const tableRow = tableElement.find("tr");
      const dropdDownElement = tableRow.find("select");
      dropdDownElement.at(0).simulate("change", {
        target: { value: true },
      });
      const expectedAction = {
        type: TOGGLE_TEACHER_PRESENCE,
        payload: { id: "ql_HP3WWb5", isPresent: true },
      };
      const actions = store.getActions();
      expect(actions).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedAction)])
      );
    });
    it("should dispatch action on dropdown change for absent", () => {
      const tableElement = shallowWrapper.find('[data-test="teachers-table"]');
      const tableRow = tableElement.find("tr");
      const dropdDownElement = tableRow.find("select");
      dropdDownElement.at(0).simulate("change", {
        target: { value: false },
      });
      const expectedAction = {
        type: TOGGLE_TEACHER_PRESENCE,
        payload: { id: "ql_HP3WWb5", isPresent: false },
      };
      const actions = store.getActions();
      expect(actions).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedAction)])
      );
    });
  });

  describe("students table tests", () => {
    it("should dispatch assign teacher action", () => {
     
      const expectedAction = {
        type: ASSIGN_TEACHER,
      };
      const action = store.getActions();
      expect(action).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedAction)])
      );
    });
    
  });
});

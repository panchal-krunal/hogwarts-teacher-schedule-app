import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import studentReducer from "../studentReducer";
import * as types from "../../types";
Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  students: null,
};

describe("student reducer tests", () => {
  it("handles default state", () => {
    const result = studentReducer(initialState, {
      type: types.DUMMY_ACTION,
    });
    expect(result).toEqual(initialState);
  });
  it("handles ASSIGN_TEACHER actions", () => {
    const result = studentReducer(initialState, {
      type: types.ASSIGN_TEACHER,
      payload: {
        BVK8aC82Y8: {
          name: "Harry Potter",
          subject: "gaJoeo1e1K",
          teacherAllocated: "e6Xah9MirI",
        },
        ubUFqkgphE: {
          name: "Hermione Granger",
          subject: "gaJoeo1e1K",
          teacherAllocated: "",
        },
      },
    });
    expect(result).toEqual({
      students: {
        BVK8aC82Y8: {
          name: "Harry Potter",
          subject: "gaJoeo1e1K",
          teacherAllocated: "e6Xah9MirI",
        },
        ubUFqkgphE: {
          name: "Hermione Granger",
          subject: "gaJoeo1e1K",
          teacherAllocated: "",
        },
      },
    });
  });
});

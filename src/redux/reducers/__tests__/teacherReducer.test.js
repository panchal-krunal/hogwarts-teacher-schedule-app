import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import teacherReducer from "../teacherReducer";
import * as types from "../../types";
import teachers from '../../../helpers/config/teachers'

Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  teachers: {...teachers},
};

describe("student reducer tests", () => {
  it("handles default state", () => {
    const result = teacherReducer(initialState, {
      type: types.DUMMY_ACTION,
    });
    expect(result).toEqual(initialState);
  });
  it("handles TOGGLE_TEACHER_PRESENCE actions", () => {
    const result = teacherReducer(initialState, {
      type: types.TOGGLE_TEACHER_PRESENCE,
      payload: {
       id:"ql_HP3WWb5",
       isPresent:"false"
      },
    });
    expect(result).toEqual({
      teachers: {
        ...teachers,
        ["ql_HP3WWb5"]:{
            ...teachers["ql_HP3WWb5"],
            isPresent:false
        }
      },
    });
  });
});

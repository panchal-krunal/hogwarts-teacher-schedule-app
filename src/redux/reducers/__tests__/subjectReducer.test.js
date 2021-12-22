import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import subjectReducer from "../subjectReducer";
import subjects from "../../../helpers/config/subjects";
import * as types from "../../types";
Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  subjects: {...subjects},
};

describe("subject reducer tests", () => {
  it("handles default state", () => {
    const result = subjectReducer(initialState, {
      type: types.DUMMY_ACTION,
    });
    expect(result).toEqual(initialState);
  });

});

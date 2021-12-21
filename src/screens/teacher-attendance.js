import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "../helpers/react-redux-hooks";
import * as actions from "../redux/actions/teacherActions";

const TeacherAttendance = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { teachers } = state?.teacherReducer;
  const { subjects } = state?.subjectReducer;

  const onPresentAbsentDropdownChange = async (e, id) => {
    await dispatch(actions.toggleAttendance(id, e.target.value));
  };

  const renderTableRow = () => {
    return (
      <tbody>
        {teachers &&
          Object.keys(teachers).map((item, index) => {
            const { name, reporting_to, isPresent, subject } = teachers[item];
            const reportingToName = teachers[reporting_to]?.name || "";
            const subjectName = subjects?.[subject]?.name || "";
            return (
              <tr key={item}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{subjectName}</td>
                <td>{reportingToName}</td>
                <td>
                  <select
                    onChange={(e) => onPresentAbsentDropdownChange(e, item)}
                    value={isPresent}
                  >
                    <option value={false}>Absent</option>
                    <option value={true}>Present</option>
                  </select>
                </td>
              </tr>
            );
          })}
      </tbody>
    );
  };

  // const dispatchDummyAction = async () => {
  //   await dispatch(actions.dummyAction());
  // };
  // React.useEffect(() => {
  //   dispatchDummyAction();
  // }, []);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Teacher</th>
            <th>Subject</th>
            <th>Reporting To</th>
            <th>Attendance</th>
          </tr>
        </thead>
        {renderTableRow()}
      </Table>
    </Container>
  );
};

export default TeacherAttendance;

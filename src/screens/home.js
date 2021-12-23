import React from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "../helpers/react-redux-hooks";
import * as actions from "../redux/actions/teacherActions";
import allStudents from "../helpers/config/students";
import { assignTeacher } from "../redux/actions/studentActions";

const Home = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { teachers } = state?.teacherReducer;
  const { subjects } = state?.subjectReducer;
  const { students } = state?.studentReducer;

  const onPresentAbsentDropdownChange = async (e, id) => {
    await dispatch(actions.toggleAttendance(id, e.target.value));
  };
  const renderTeachers = () => {
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
  const getAllocatedTeacher = async () => {
    let studentTeacher = [];
    // console.log(allStudents);
    allStudents &&
      Object.keys(allStudents).map((s, _) => {
        if (allStudents[s]?.teacherAllocated) {
          // console.log(
          //   allStudents[s].name,
          //   getTeacher(allStudents[s]?.teacherAllocated).name
          // );
          studentTeacher.push({
            student: allStudents[s]?.name,
            subject: allStudents[s]?.subject,
            teacher: getTeacher(allStudents[s]?.teacherAllocated).name,
          });
        } else {
          const headOfSubject =
            teachers &&
            Object.keys(teachers).filter((t, _) => {
              if (
                teachers[t]?.subject.toString() ===
                  allStudents[s]?.subject.toString() &&
                teachers[t]?.isHeadingSubject
              ) {
                return teachers[t];
              }
            });
          // console.log(allStudents[s].name, getTeacher(headOfSubject[0]).name);
          studentTeacher.push({
            student: allStudents[s]?.name,
            subject: allStudents[s]?.subject,
            teacher: getTeacher(headOfSubject[0]).name,
          });
        }
      });
    // console.log(studentTeacher);
    await dispatch(assignTeacher(studentTeacher));
  };
  const getTeacher = (id) => {
    if (teachers[id]?.isPresent === true) {
      // console.log(`${teachers[id]?.name} is present`);
      return teachers[id];
    } else if (
      teachers[id]?.isPresent === false &&
      teachers[id]?.reporting_to
    ) {
      // console.log(
      //   `${teachers[id]?.name} is absent & checking for ${teachers[id]?.reporting_to}`
      // );
      return getTeacher(teachers[id]?.reporting_to);
    } else return { name: "not assigned" };
  };
  const renderStudents = () => {
    if (!students) return;
    return (
      <tbody>
        {students &&
          students?.length !== 0 &&
          students.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.student}</td>
                <td>{subjects[item.subject].name}</td>
                <td>{item.teacher}</td>
              </tr>
            );
          })}
      </tbody>
    );
  };
  React.useEffect(() => {
    if (teachers && Object.keys(teachers).length !== 0) getAllocatedTeacher();
  }, [teachers]);

  return (
    <Container>
      <Col>
        <Row>
          <Col md="auto">
            <h3 data-test="header-label">Hogwarts Teacher Schedule App</h3>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col md="auto">
            <h5 data-test="header-label">Teachers Attendance</h5>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col xs lg="8">
            <Table data-test="teachers-table" striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Teacher</th>
                  <th>Subject</th>
                  <th>Reporting To</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              {renderTeachers()}
            </Table>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col md="auto">
            <h5 data-test="header-label">Students Schedule</h5>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col xs lg="8">
            <Table data-test="students-table" striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Subject</th>
                  <th>Allocated Teacher</th>
                </tr>
              </thead>
              {renderStudents()}
            </Table>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};
export default Home;

import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import students from "../helpers/config/students";
import { assignTeacher } from "../redux/actions/studentActions";

const StudendSchedule = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { teachers } = state?.teacherReducer;
  const { students: allocatedStudents } = state?.studentReducer;
  const { subjects } = state?.subjectReducer;

  const getAllocatedTeacher = async () => {
    let studentTeacher = [];
    students &&
      Object.keys(students).map((s, _) => {
        if (students[s]?.teacherAllocated) {
          console.log(
            students[s].name,
            getTeacher(students[s]?.teacherAllocated).name
          );
          studentTeacher.push({
            student: students[s]?.name,
            subject: students[s]?.subject,
            teacher: getTeacher(students[s]?.teacherAllocated).name,
          });
        } else {
          const headOfSubject =
            teachers &&
            Object.keys(teachers).filter((t, _) => {
              if (
                teachers[t]?.subject.toString() ===
                  students[s]?.subject.toString() &&
                teachers[t]?.isHeadingSubject
              ) {
                return teachers[t];
              }
            });
          console.log(students[s].name, getTeacher(headOfSubject[0]).name);
          studentTeacher.push({
            student: students[s]?.name,
            subject: students[s]?.subject,
            teacher: getTeacher(headOfSubject[0]).name,
          });
        }
      });
    console.log(studentTeacher);
    await dispatch(assignTeacher(studentTeacher));
  };

  const getTeacher = (id) => {
    if (teachers[id]?.isPresent === true) {
      console.log(`${teachers[id]?.name} is present`);
      return teachers[id];
    } else if (
      teachers[id]?.isPresent === false &&
      teachers[id]?.reporting_to
    ) {
      console.log(
        `${teachers[id]?.name} is absent & checking for ${teachers[id]?.reporting_to}`
      );
      return getTeacher(teachers[id]?.reporting_to);
    } else return { name: "not assigned" };
  };

  useEffect(() => {
    getAllocatedTeacher();
  }, []);

  const renderTableRow = () => {
    if (!allocatedStudents) return;
    console.log(allocatedStudents);
    return (
      <tbody>
        {allocatedStudents?.length !== 0 &&
          allocatedStudents.map((item, index) => {
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

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Subject</th>
            <th>Allocated Teacher</th>
          </tr>
        </thead>
        {renderTableRow()}
      </Table>
    </Container>
  );
};
export default StudendSchedule;

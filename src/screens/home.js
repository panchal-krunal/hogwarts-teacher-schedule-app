import React from "react";
import { Container, Col, Row } from "react-bootstrap";
const Home = (props) => {
  return (
    <Container>
      <Col>
        <Row>
          <Col md="auto">
            <h3>Hogwarts Teacher Schedule App</h3>
          </Col>
        </Row>
        <Row>
          <Col xs lg="2">
            <a href="/attendance">Attendance</a>
          </Col>
        </Row>
        <Row>
          <Col xs lg="2">
            <a href="/student-schedule">Student Schedule</a>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};
export default Home;

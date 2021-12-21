import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TeacherAttendance, StudentSchedule, Home } from "./screens";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/attendance">
            <TeacherAttendance />
          </Route>
          <Route exact path="/student-schedule">
            <StudentSchedule />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

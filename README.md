# Hogwarts Teacher Schedule App

- git clone https://github.com/panchal-krunal/hogwarts-teacher-schedule-app.git
- yarn
- yarn start
- yarn test (to run the tests)
## Features

- Home page (Welcome page)
- Attendance page, where you can mark a teacher Absent/Present
- Student allocated teacher

## Tech

- [ReactJS] - Frontend
- [Redux] - state management
- [redux-thunk] - Middleware
- [redux-boootstrap] - UI library
- [react-router-dom] - Navigation library
- [redux-persist] - Used for state persistance 
- [react-redux] - Used for connectivity between react & redux
- [@wojtekmaj/enzyme-adapter-react-17] - Enzyme adapter for React 17
- [enzyme] - Javascript testing utility for react 
- [Jest] - Javascript test framework

## Folder Structure
- /src - root folder
- /src/redux - all related to redux
- /src/redux/actions - all actions
- /src/redux/reducers - all reducers
- /src/screens - all individual screens
- /src/components - empty for now, but all isolated components will be placed here
- /helpers/config - configuration files (Constants)
- App.js - Navigation
- index.js - Starting point of the app
- src/screens/__test__ - This includes all tests for screens
- src/screens/__test__/__snapshots__ - This includes snapshots for screens
- src/redux/reducers/__tests__ - This includes all tests for reducers

Home Page - 
![Home page](https://github.com/panchal-krunal/hogwarts-teacher-schedule-app/blob/master/images/home.png?raw=true)


Attendance page -
![Attendance page](https://github.com/panchal-krunal/hogwarts-teacher-schedule-app/blob/master/images/attendance.png?raw=true)


Student teacher allocation page -
![Student teacher page](https://github.com/panchal-krunal/hogwarts-teacher-schedule-app/blob/master/images/student-teacher.png?raw=true)


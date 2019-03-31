import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import modal from './reducers/modal.reducer';
import courses from './reducers/courses.reducer';
// import loginReducer from "./loginReducer";  // example

const indexReducer = combineReducers({
  // loginReducer,
  modal,
  courses,
  routing: routerReducer
});

export default indexReducer;

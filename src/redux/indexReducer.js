import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import modal from './reducers/modal.reducer';
import courses from './reducers/courses.reducer';
import user from './reducers/user.reducer';
// import loginReducer from "./loginReducer";  // example

const indexReducer = combineReducers({
  // loginReducer,
  modal,
  courses,
  routing: routerReducer,
  user,
});

export default indexReducer;

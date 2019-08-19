import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { modal, courses, user, singleOlympiad } from './reducers/index';

const indexReducer = combineReducers({
  modal,
  courses,
  routing: routerReducer,
  user,
  singleOlympiad,
});

export default indexReducer;

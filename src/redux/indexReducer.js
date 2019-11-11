import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { modal, courses, user, singleOlympiad } from './reducers/index';
import tests from './reducers/tests.reducer' ;
import filter from './reducers/filter.reducer';
import questions from './reducers/questions.reducer';
import results from './reducers/results.reducer';
import timer from './reducers/timer.reducer';
import {reducer as formReducer} from 'redux-form';
const indexReducer = combineReducers({
  modal,
  courses,
  routing: routerReducer,
  user,
  singleOlympiad,
  tests,
  results,
  filter,
  questions,
  timer,
  form: formReducer
});

export default indexReducer;

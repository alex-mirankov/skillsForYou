import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import modal from './reducers/modal.reducer';
// import loginReducer from "./loginReducer";  // example

const indexReducer = combineReducers({
  // loginReducer,
  modal,
  routing: routerReducer
});

export default indexReducer;

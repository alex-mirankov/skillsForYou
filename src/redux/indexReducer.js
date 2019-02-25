import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
// import loginReducer from "./loginReducer";  // example

const indexReducer = combineReducers({
  // loginReducer,
  routing: routerReducer
});

export default indexReducer;

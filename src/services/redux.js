import { createStore, applyMiddleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import indexReducer from "../redux/indexReducer";
export const history = createHistory();

const enhancer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)();

export const store = createStore(
  indexReducer,
  compose(
    applyMiddleware(routerMiddleware(history)),
    enhancer
  )
);

import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga"; // example

import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import indexReducer from "../redux/indexReducer";
// import indexSaga from "../sagas/indexSaga"; // example

export const history = createHistory();

// const sagaMiddleware = createSagaMiddleware(); // example

const enhancer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)();

export const store = createStore(
  indexReducer,
  compose(
    applyMiddleware(/*sagaMiddleware,*/ routerMiddleware(history)),
    enhancer
  )
);


// sagaMiddleware.run(indexSaga); // example

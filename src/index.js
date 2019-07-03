import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./adaptive.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import { history, store } from "./services/redux";
import { App } from "./components/app-container/App";

const Root = () => {
  return <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
};

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.register();

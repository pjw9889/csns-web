import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import { createBrowserHistory } from "history";
import { ConnectedRouter } from "react-router-redux";

import rootReducer from "./rootReducers";
import { Switch, Route } from "react-router";
import { routes } from "./routes";

const history = createBrowserHistory();
const middleWares: any = [thunk];

if (process.env.NODE_ENV === "development") {
  middleWares.push(createLogger());
}

const store = createStore(rootReducer, applyMiddleware(...middleWares));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>{routes.map(route => <Route key={`${route.path}`} {...route} />)}</Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("mainContainer"),
);

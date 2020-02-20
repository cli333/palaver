import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Provider from "./context/context";

import TestComponent from "./TestComponent";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/test" component={TestComponent} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

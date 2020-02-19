import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/*  some header here */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" render={() => <div>Main page</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Dashboard from "./components/DashBoard/Dashboard";
import History from "./components/History/History";
import HomePage from "./components/HomePage/HomePage";
import Overview from "./components/Overview/Overview";

function DefaultRoute(props) {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/Dashboard/:currency">
        <Dashboard />
      </Route>
      <Route exact path="/Overview/:currency">
        <Overview />
      </Route>
      <Route exact path="/History/:currency">
        <History />
      </Route>
      {/* <Redirect to="/" /> */}
    </Switch>
  );
}

export default DefaultRoute;

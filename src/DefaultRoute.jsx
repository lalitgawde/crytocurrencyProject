import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Dashboard from "./components/DashBoard/Dashboard";
import History from "./components/History/History";
import Overview from "./components/Overview/Overview";

function DefaultRoute(props) {
  return (
    <Switch>
      <Route exact path="/Dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/Overview">
        <Overview />
      </Route>
      <Route exact path="/History">
        <History />
      </Route>
      <Route exact path="/">
        <Redirect to="/Dashboard" />
      </Route>
    </Switch>
  );
}

export default DefaultRoute;

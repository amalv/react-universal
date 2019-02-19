// @flow
import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import LogOut from "./LogOut";
import Home from "./Home";
import About from "./About";
import Users from "./Users";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about/" component={About} />
    <Route path="/users/" component={Users} />
    <Route path="/signup/" component={SignUp} />
    <Route path="/signin/" component={SignIn} />
    <Route path="/logout/" component={LogOut} />
  </Switch>
);

export default Routes;

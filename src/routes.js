import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import User from "./components/users/Users";
import UserMessages from "./components/userMessages/UserMessages";

export default (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={User} path="/users" />
    <Route component={UserMessages} path="/userMessages" />
  </Switch>
);

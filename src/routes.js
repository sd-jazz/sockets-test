import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import User from "./components/users/Users";
import UserMessages from "./components/userMessages/UserMessages";
import Message from "./components/message/Message"; 

export default (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={User} path="/users" />
    <Route component={UserMessages} path="/userMessages" />
    <Route component={Message} path="/message/:user1/:user2" />
  </Switch>
);

import React from "react";

import { Provider } from "react-redux";
import HomeView from "./views/Home";
import LoginView from "./views/Login";
import ChatView from "./views/Chat";
import RegisterView from "./views/Register";
import SettingsView from "./views/Settings";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar";

import configureStore from "./store";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="content-wrapper">
          <Switch>
            <Route path="/settings">
              <SettingsView />
            </Route>
            <Route path="/chat/:id">
              <ChatView />
            </Route>
            <Route path="/login">
              <LoginView />
            </Route>
            <Route path="/register">
              <RegisterView />
            </Route>

            <Route path="/">
              <HomeView />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

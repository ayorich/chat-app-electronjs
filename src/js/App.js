import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import HomeView from "./views/Home";
import WelcomeView from "./views/Welcome";
import ChatView from "./views/Chat";
import SettingsView from "./views/Settings";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import StoreProvider from "./store/StoreProvider";
import { listenToAuthChanges } from "./actions/auth";
import LoadingView from "./components/shared/LoadingView";

function AuthRoute({ children, ...rest }) {
  const user = useSelector(({ auth }) => auth.user);

  const onlyChild = React.Children.only(children);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.cloneElement(onlyChild, { ...rest, ...props })
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

function ChatApp() {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (isChecking) {
    return <LoadingView />;
  }
  return (
    <Router>
      <div className="content-wrapper">
        <Switch>
          <Route path="/" exact>
            <WelcomeView />
          </Route>
          <AuthRoute path="/settings">
            <SettingsView />
          </AuthRoute>
          <AuthRoute path="/chat/:id">
            <ChatView />
          </AuthRoute>

          <AuthRoute path="/home">
            <HomeView />
          </AuthRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  );
}

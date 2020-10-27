import React, { useContext } from "react";
import Tracker from "./Tracker";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import Home from "./Home";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { CookiesProvider } from "react-cookie";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const AuthenticatedRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        authContext.isAuthenticated() ? children : <Redirect to="/" />
      }
    />
  );
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <CookiesProvider>
          <AuthProvider>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <AuthenticatedRoute>
                <Tracker />
              </AuthenticatedRoute>
            </Switch>
          </AuthProvider>
        </CookiesProvider>
      </Router>
    );
  }
}

export default App;

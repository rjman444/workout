import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const auth = useContext(AuthContext);
  console.log(auth);

  return (
    <div className="ui container">
      {auth.isAuthenticated() && (
        <>
          <h1 className="ui header">{`Logged in as user ${auth.authState.userInfo.username} `}</h1>
          <Link to="/tracker">Go to Tracker</Link>
        </>
      )}

      {!auth.isAuthenticated() && (
        <>
          <h1 className="ui header">
            <Link to={auth.isAuthenticated() ? "/tracker" : "/login"}>
              Login
            </Link>
          </h1>
          <h1 className="ui header">
            <Link to={auth.isAuthenticated() ? "/tracker" : "/signup"}>
              Signup
            </Link>
          </h1>
        </>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = ({ onFormSubmit }) => {
  const authContext = useContext(AuthContext);
  const [redirectOnSignup, setRedirect] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [Error, setError] = useState();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", {
        username,
        password,
      });

      authContext.setAuthState(data);
      setRedirect(true);
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      setError(data.message);
    }
  };

  return (
    <>
      {redirectOnSignup && <Redirect to="/tracker" />}
      <div className="ui container">
        {authContext.isAuthenticated() && (
          <>
            <h1 className="ui header">{`Logged in as user ${authContext.authState.userInfo.username} `}</h1>
            <Link to="/tracker">Go to Tracker</Link>
          </>
        )}

        {!authContext.isAuthenticated() && (
          <>
            <h1 className="header">Login</h1>
            <form
              className={`ui form ${isLoading ? "loading" : ""} ${
                Error ? "error" : ""
              }`}
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <div className={`field ${errors.username ? "error" : ""}  `}>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  ref={register({ required: true })}
                />
              </div>
              <div className={`field ${errors.password ? "error" : ""}  `}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  ref={register({ required: true })}
                />
              </div>

              <div class="ui error message">
                <div class="header">Something went wrong...</div>
                <p>{Error}</p>
              </div>

              <button className="ui button" type="submit">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default LoginForm;

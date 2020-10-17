import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Redirect } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const SignupForm = ({ onFormSubmit }) => {
  const authContext = useContext(AuthContext);
  const [redirectOnSignup, setRedirect] = useState(false);
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await axios.post("/api/users/signup", {
        username,
        password,
      });

      authContext.setAuthState(data);
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {redirectOnSignup && <Redirect to="/tracker" />}
      <div className="ui container">
        <h1 className="header">Signup</h1>
        <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
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
              type="text"
              name="password"
              ref={register({ required: true })}
            />
          </div>

          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupForm;

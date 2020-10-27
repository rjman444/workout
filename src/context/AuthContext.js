import Axios from "axios";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const userInfo = localStorage.getItem("userInfo");
  const expiresAt = localStorage.getItem("expiresAt");

  const [authState, setAuthState] = useState({
    token: null,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    expiresAt,
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);
    setAuthState({ token, userInfo, expiresAt });
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");

    setAuthState({ token: null, userInfo: {}, expiresAt: null });

    history.push("/login");
  };

  const isAuthenticated = () => {
    if (!authState.expiresAt) {
      return false;
    }

    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const authAxios = Axios.create();

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

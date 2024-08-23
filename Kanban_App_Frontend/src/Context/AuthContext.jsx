import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({
    isAuth: false,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth({ ...auth, isAuth: true, token: token });
    }
  }, []);

  const Login = (token) => {
    if (token) {
      if (token) {
        localStorage.setItem("token", token);
        setAuth({ ...auth, isAuth: true, token: token });
      }
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setAuth({ ...auth, isAuth: false, token: null });
  };

  const authData = {
    Login,
    Logout,
    auth,
  };

  return (
    <AuthContext.Provider value={authData}>
      {props.children}
    </AuthContext.Provider>
  );
};

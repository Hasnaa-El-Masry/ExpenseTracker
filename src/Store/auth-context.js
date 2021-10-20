import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

const calculateExpirationTime = (expirationTime) => {
  const currentTime = new Date().getTime();

  const expireTime = new Date(expirationTime).getTime();

  const remainTime = expireTime - currentTime;

  return remainTime;
};

const retrievToken = () => {
  const storedToken = localStorage.getItem("Token");
  const storedExpirationTime = localStorage.getItem("expirationDate");
  const remainTime = calculateExpirationTime(storedExpirationTime);

  if (remainTime < 60000) {
    localStorage.removeItem("Token");
    localStorage.removeItem("expirationDate");
    return null;
  }

  return { token: storedToken, deuration: remainTime };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrievToken();

  let initalToken;

  if (tokenData) {
    initalToken = tokenData.token;
  }

  const [token, setToken] = useState(initalToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("Token");
    localStorage.removeItem("expirationDate");

    setToken(null);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  },[]);

  const loginHandler = (token, expirationTime) => {
    setToken(token);

    localStorage.setItem("Token", token);
    localStorage.setItem("expirationDate", expirationTime);

    const remainDuration = calculateExpirationTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainDuration);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.deuration);
    }
  }, [tokenData,logoutHandler]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: userIsLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

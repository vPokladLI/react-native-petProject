import { createContext, useState } from "react";

export const AuthContext = createContext({
  authToken: "",
  isLoggedIn: false,
  authenticate: (token) => {},
  logOut: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  function authenticate(token) {
    setAuthToken(token);
  }
  function logOut() {
    setAuthToken(null);
  }
  const value = {
    token: authToken,
    isLoggedIn: !!authToken,
    authenticate,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

import { createContext, useState } from "react";
// type token = string | null;
const token = "asdasdasdsadasd";
// interface IProps {
//   children: React.ReactNode;
// }
zzz
export const AuthContext = createContext({
  authToken: "",
  isLoggedIn: false,
  authenticate: (token) => {},
  logOut: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(token);
  function authenticate(token) {
    setAuthToken(token);
  }
  function logOut() {
    setAuthToken(null);
  }
  const values = {
    token: authToken,
    isLoggedIn: !!authToken,
    authenticate,
    logOut,
  };

  return (
    <AuthContext.Provider values={values}> {children} </AuthContext.Provider>
  );
}

export default AuthContextProvider;

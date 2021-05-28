import { AuthContext } from "./AuthContext";
import { useContext, useReducer } from "react";
import { reducerFunction } from "./ReducerFunction";

export const AuthProvider = ({ children }) => {
  const userDetails = JSON.parse(localStorage?.getItem("login")) || {
    isLoggedIn: false,
    userToken: null,
  };
  const [authState, authDispatch] = useReducer(reducerFunction, userDetails);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

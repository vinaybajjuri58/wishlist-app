import { AuthContext } from "./AuthContext";
import { useContext, useReducer } from "react";
import { reducerFunction } from "./ReducerFunction";

export const AuthProvider = ({ children }) => {
  const getWithExpiry = () => {
    const initialLoginDetails = {
      isLoggedIn: false,
      userToken: null,
    };
    const loginDetails = localStorage?.getItem("login");
    if (!loginDetails) {
      return initialLoginDetails;
    }
    const loginDetailsParsed = JSON.parse(loginDetails);
    const now = new Date().getTime();
    if (now > loginDetailsParsed.expiry) {
      localStorage?.removeItem("login");
      return initialLoginDetails;
    }
    return loginDetailsParsed;
  };
  const initialLoginDetails = getWithExpiry();
  const userDetails =
    JSON.parse(localStorage?.getItem("login")) || initialLoginDetails;
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

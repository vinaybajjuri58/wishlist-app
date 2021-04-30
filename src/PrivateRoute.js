import { Navigate, Route } from "react-router";
import { useAuth } from "./Context";
export const PrivateRoute = ({ path, ...props }) => {
  const { authState } = useAuth();
  console.log({ authState });
  if (authState.isLoggedIn) {
    return <Route path={path} {...props} />;
  } else {
    return <Navigate state={{ from: path }} replace to="/login" />;
  }
};

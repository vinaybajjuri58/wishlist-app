import { Navigate, Route } from "react-router";
import { useAuth } from "./Context";
export const PrivateRoute = ({ path, ...props }) => {
  const {
    authState: { isLoggedIn },
  } = useAuth();
  if (isLoggedIn) {
    return <Route path={path} {...props} />;
  } else {
    return <Navigate state={{ from: path }} replace to="/login" />;
  }
};

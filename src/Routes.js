import { Routes, Route, Navigate } from "react-router-dom";
import { WishList, Products, Cart, LoginPage, Main } from "./Components";
import { PrivateRoute } from "./PrivateRoute";
export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/category/:categoryId" element={<Products />} />
      <PrivateRoute path="/wishlist" element={<WishList />} />
      <PrivateRoute path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<RouteNotFound />} />
    </Routes>
  );
};
const RouteNotFound = () => {
  return <Navigate replace to="/" />;
};

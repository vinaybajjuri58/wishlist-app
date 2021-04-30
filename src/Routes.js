import { Routes, Route } from "react-router-dom";
import { WishList, Products, Cart, LoginPage } from "./Components";
import { PrivateRoute } from "./PrivateRoute";
export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <PrivateRoute path="/wishlist" element={<WishList />} />
      <PrivateRoute path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

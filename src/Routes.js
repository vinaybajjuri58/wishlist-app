import { Routes, Route, Navigate } from "react-router-dom";
import {
  WishList,
  Products,
  Cart,
  LoginPage,
  Main,
  Product,
} from "./Components";
import { PrivateRoute } from "./PrivateRoute";
export const RouterComponent = () => {
  return (
    <div className="routes-component">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/category/:categoryId"
          element={<Products allproducts={false} />}
        />
        <Route path="/products" element={<Products allproducts={true} />} />
        <Route path="/product/:productId" element={<Product />} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
    </div>
  );
};
const RouteNotFound = () => {
  return <Navigate replace to="/" />;
};

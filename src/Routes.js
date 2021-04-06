import { Routes, Route } from "react-router-dom";
import { WishList, Products, Cart } from "./Components";
export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

import { WishContext } from "./WishContext";
import { useState } from "react";

export const WishProvider = ({ children }) => {
  const [products] = useState([]);
  const [wishProducts, setWishProducts] = useState([]);
  return (
    <WishContext.Provider value={{ products, wishProducts, setWishProducts }}>
      {children}
    </WishContext.Provider>
  );
};

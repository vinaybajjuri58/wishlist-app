// import logo from "./logo.svg";

import { useState } from "react";
import { WishList, Products } from "./Components";
import { useWish } from "./Context";
import "./App.css";

function App() {
  const [route, setRoute] = useState("products");
  const { wishProducts } = useWish();
  return (
    <div>
      <div className="navigation">
        <button className="logo" onClick={() => setRoute("products")}>
          Home
        </button>
        <div className="wishlist-icon">
          <i onClick={() => setRoute("wishlist")} class="far fa-heart"></i>
          <span className="wishlist-count">
            {wishProducts.length === 0 ? "" : wishProducts.length}
          </span>
        </div>
      </div>
      {route === "products" && <Products />}
      {route === "wishlist" && <WishList />}
    </div>
  );
}

export default App;

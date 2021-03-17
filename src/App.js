// import logo from "./logo.svg";

import { useState } from "react";
import { WishList, Products, Toast } from "./Components";
import { useWish } from "./Context";
import "./App.css";

function App() {
  const [route, setRoute] = useState("products");
  const { wishProducts, toast } = useWish();
  return (
    <div>
      <nav className="navigation">
        <button className="logo" onClick={() => setRoute("products")}>
          Home
        </button>
        <div className="wishlist-icon">
          <i onClick={() => setRoute("wishlist")} class="far fa-heart"></i>
          <span className="wishlist-count">
            {wishProducts.length === 0 ? "" : wishProducts.length}
          </span>
        </div>
      </nav>
      {route === "products" && <Products />}
      {route === "wishlist" && <WishList />}
      {toast ? <Toast /> : <></>}
    </div>
  );
}

export default App;

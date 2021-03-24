import { useState } from "react";
import { WishList, Products, Toast, Cart } from "./Components";
import { useWish } from "./Context";
import "./App.css";

function App() {
  const [route, setRoute] = useState("products");
  const { toast, state } = useWish();
  return (
    <div>
      <nav className="navigation">
        <button className="logo" onClick={() => setRoute("products")}>
          Home
        </button>
        <div className="icons">
          <div className="wishlist-icon">
            <i onClick={() => setRoute("wishlist")} class="far fa-heart"></i>
            <span className="wishlist-count">
              {state.wishProducts.length === 0 ? "" : state.wishProducts.length}
            </span>
          </div>
          <div className="cart-icon">
            <i
              onClick={() => setRoute("cart")}
              class="fa fa-shopping-cart"
              aria-hidden="true"
            ></i>
            <span className="cart-count">
              {state.cartProducts.length === 0 ? "" : state.cartProducts.length}
            </span>
          </div>
        </div>
      </nav>
      {route === "products" && <Products />}
      {route === "wishlist" && <WishList />}
      {route === "cart" && <Cart />}
      {toast ? <Toast /> : <></>}
    </div>
  );
}

export default App;

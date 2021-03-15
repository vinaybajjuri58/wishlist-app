// import logo from "./logo.svg";

import { useState } from "react";
import { WishList, Products } from "./Components";
import { useWish } from "./Context";
import "./App.css";

function App() {
  const [route, setRoute] = useState("products");
  const { wishProducts } = useWish();
  {
    console.log(useWish());
  }
  return (
    <div>
      <div className="navigation">
        <button onClick={() => setRoute("products")}>Home</button>
        <span style={{ fontSize: "1.5rem" }}>
          <i onClick={() => setRoute("wishlist")} class="far fa-heart"></i>
          <p>{wishProducts.length === 0 ? "" : wishProducts.length}</p>
        </span>
      </div>
      {route === "products" && <Products />}
      {route === "wishlist" && <WishList />}
    </div>
  );
}

export default App;

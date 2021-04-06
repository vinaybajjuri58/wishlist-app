import { Link } from "react-router-dom";
import { useData } from "../../Context";
export const Navbar = () => {
  const { state } = useData();
  return (
    <nav className="navigation">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <button className="logo">Home</button>
      </Link>
      <div className="icons">
        <Link to="/wishlist" style={{ textDecoration: "none", color: "black" }}>
          <div className="wishlist-icon">
            <i class="far fa-heart"></i>
            <span className="wishlist-count">
              {state.wishProducts.length === 0 ? "" : state.wishProducts.length}
            </span>
          </div>
        </Link>
        <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
          <div className="cart-icon">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <span className="cart-count">
              {state.cartProducts.length === 0 ? "" : state.cartProducts.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

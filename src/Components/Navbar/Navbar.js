import { Link } from "react-router-dom";
import { useData, useAuth, AuthActionTypes } from "../../Context";
export const Navbar = () => {
  const { state } = useData();
  const { authState, authDispatch } = useAuth();
  const logoutHandler = () => {
    authDispatch({
      type: AuthActionTypes.SET_LOGOUT,
    });
  };
  return (
    <nav className="navigation">
      <Link to="/" className="link-style">
        <button className="logo">Home</button>
      </Link>
      <div className="icons">
        <Link to="/wishlist" className="link-style">
          <div className="wishlist-icon">
            <i class="far fa-heart"></i>
            <span className="wishlist-count">
              {state.wishProducts.length === 0 ? "" : state.wishProducts.length}
            </span>
          </div>
        </Link>
        <Link to="/cart" className="link-style">
          <div className="cart-icon">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <span className="cart-count">
              {state.cartProducts.length === 0 ? "" : state.cartProducts.length}
            </span>
          </div>
        </Link>
        <div>
          {authState.isLoggedIn === false ? (
            <Link to="/login" className="link-style">
              <button className="button button-border">Login</button>
            </Link>
          ) : (
            <button
              className="button button-border border-warning"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

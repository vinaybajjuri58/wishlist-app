// import axios from "axios";
import { Actions,useData } from "../../Context";
export const ProductItem = ({ product }) => {
  const { dispatch, setToast, setToastMessage, state } = useData();
  const inCartProducts = (_id) => {
    return state.cartProducts.findIndex((item) => item._id === _id) === -1
      ? false
      : true;
  };
  const inWishProducts = (_id) => {
    return state.wishProducts.findIndex((item) => item._id === _id) === -1
      ? false
      : true;
  };

  return (
    <div className="product">
      <div className="card card-shopping">
        <img src={product.imageUrl} alt="" className="card-img" />
        <h4 className="card-brand">{product.name}</h4>
        <p className="card-desc">Rs {product.price}</p>

        {inWishProducts(product._id) ? (
          <span
            onClick={async() => {
              setToast("true");
              setToastMessage(`${product.name} removed from  wishlist`);
              dispatch({
                type: Actions.REMOVE_FROM_WISHLIST,
                payload: product._id,
              });
            }}
            className="wish-button"
            role="button"
          >
            <i class="fas fa-heart"></i>
          </span>
        ) : (
          <span
            onClick={async () => {
              setToast("true");
              setToastMessage(`${product.name} is added to wishlist`);
              dispatch({ type: Actions.ADD_TO_WISHLIST, payload: product._id });
            }}
            className="wish-button"
            role="button"
          >
            <i class="far fa-heart"></i>
          </span>
        )}

        {inCartProducts(product._id) ? (
          <button
            onClick={async () => {
              setToast("true");
              setToastMessage(`${product.name} is removed from Cart`);
              dispatch({ type: Actions.REMOVE_FROM_CART, payload: product._id });
            }}
            className="button button-primary"
          >
            REMOVE FROM CART
          </button>
        ) : (
          <button
            onClick={async() => {
              setToast("true");
              setToastMessage(`${product.name} is added to Cart`);
              dispatch({ type: Actions.ADD_TO_CART, payload: product._id });
            }}
            className="button button-primary"
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

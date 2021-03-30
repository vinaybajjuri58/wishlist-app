import { useData } from "../Context";
import { Actions } from "../Context";
export const ProductItem = ({ product }) => {
  const { dispatch, setToast, setToastMessage, state } = useData();
  const inCartProducts = (id) => {
    return state.cartProducts.findIndex((item) => item.id === id) === -1
      ? false
      : true;
  };
  const inWishProducts = (id) => {
    return state.wishProducts.findIndex((item) => item.id === id) === -1
      ? false
      : true;
  };

  return (
    <div className="product">
      <div className="card card-shopping">
        <img src={product.url} alt="" className="card-img" />
        <h4 className="card-brand">{product.brandName}</h4>
        <p className="card-desc">{product.description}</p>
        <p className="card-desc">Rs {product.price}</p>

        {inWishProducts(product.id) ? (
          <span
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.brandName} removed from  wishlist`);
              dispatch({
                type: Actions.REMOVE_FROM_WISHLIST,
                payload: product.id,
              });
            }}
            className="wish-button"
            role="button"
          >
            <i class="fas fa-heart"></i>
          </span>
        ) : (
          <span
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.brandName} is added to wishlist`);
              dispatch({ type: Actions.ADD_TO_WISHLIST, payload: product.id });
            }}
            className="wish-button"
            role="button"
          >
            <i class="far fa-heart"></i>
          </span>
        )}

        {inCartProducts(product.id) ? (
          <button
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.brandName} is added to Cart`);
              dispatch({ type: Actions.REMOVE_FROM_CART, payload: product.id });
            }}
            className="button button-primary"
          >
            REMOVE FROM CART
          </button>
        ) : (
          <button
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.brandName} is added to Cart`);
              dispatch({ type: Actions.ADD_TO_CART, payload: product.id });
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

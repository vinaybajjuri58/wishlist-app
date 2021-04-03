// import axios from "axios";
import { Actions,useData } from "../../Context";
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
            onClick={async() => {
              setToast("true");
              setToastMessage(`${product.brandName} removed from  wishlist`);
              // const response = await axios.delete(`/api/wishes/${product.id}`);
              // console.log({response})
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
            onClick={async () => {
              setToast("true");
              setToastMessage(`${product.brandName} is added to wishlist`);
              // const {data:wish} = await axios.post(`/api/wishes`,
              // {wish:{...product,count:1}}
              // );
              // console.log({wish});
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
            onClick={async () => {
              setToast("true");
              setToastMessage(`${product.brandName} is removed from Cart`);
              // const response = await axios.delete(`/api/carts/${product.id}`);
              // console.log({response})
              dispatch({ type: Actions.REMOVE_FROM_CART, payload: product.id });
            }}
            className="button button-primary"
          >
            REMOVE FROM CART
          </button>
        ) : (
          <button
            onClick={async() => {
              setToast("true");
              setToastMessage(`${product.brandName} is added to Cart`);
              // const {data:cart} = await axios.post(`/api/carts`,
              // {cart:{...product,count:1}}
              // );
              // console.log(cart)
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

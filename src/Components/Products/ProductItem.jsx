import { Actions,useData } from "../../Context";
import {addToWish,addToCart,removeCartItem,removeWishItem} from "./serverCalls"
import {inCartProducts,inWishProducts} from "../utils";
export const ProductItem = ({ product }) => {
  const { dispatch, setToast, setToastMessage, state } = useData();

  return (
    <div className="product">
      <div className="card card-shopping card-height" >
        <img src={product.imageUrl} alt="" className="card-img" />
        <div className="card-text-content" >
        <h4 className="card-brand">{product.name}</h4>
        <p className="card-desc">Rs {product.price}</p>

        {inWishProducts({id:product._id,wishItems:state.wishProducts}) ? (
          <button
            onClick={async() => {
              setToast("true");
              setToastMessage(`${product.name} being removed from  wishlist`);
              const {data:{wishlistItem}} = await removeWishItem({productId:product._id});
              setToast("true");
              setToastMessage(`${product.name} removed from  wishlist`);
              dispatch({
                type: Actions.REMOVE_FROM_WISHLIST,
                payload: wishlistItem._id,
              });
            }}
            className="card-remove icon-button"
          >
            <i class="fas fa-heart"></i>
          </button>
        ) : (
          <button
            onClick={async () => {
              setToast("true");
              setToastMessage(`${product.name} is being added to wishlist`);
              const {data:{wishlistItem}} = await addToWish({productId:product._id});
              setToast("true");
              setToastMessage(`${product.name} is added to wishlist`);
              dispatch({ type: Actions.ADD_TO_WISHLIST, payload: wishlistItem._id });
            }}
            className="card-remove icon-button"
          >
            <i class="far fa-heart"></i>
          </button>
        )}

        {inCartProducts({id:product._id,cartItems:state.cartProducts }) ? (
          <button
            onClick={async () => {
              setToast("true");
              setToastMessage(`${product.name} is being removed from Cart`);
              const {data:{cartItem}} = await removeCartItem({productId:product._id});
              setToast("true");
              setToastMessage(`${product.name} is being removed from Cart`);
              dispatch({ type: Actions.REMOVE_FROM_CART, payload: cartItem._id });
            }}
            className="button button-primary"
          >
            REMOVE FROM CART
          </button>
        ) : (
          <button
            onClick={async() => {
              setToast("true");
              setToastMessage(`${product.name} is being added to Cart`);
              const {data:{cartItem}} = await addToCart({productId:product._id});
              setToast("true");
              setToastMessage(`${product.name} is  added to Cart`);
              dispatch({ type: Actions.ADD_TO_CART, payload: cartItem._id });
            }}
            className="button button-primary"
          >
            ADD TO CART
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

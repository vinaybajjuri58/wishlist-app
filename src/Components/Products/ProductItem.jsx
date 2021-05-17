import { Actions,useData,useAuth } from "../../Context";
import {addToWish,addToCart,removeCartItem,removeWishItem} from "./serverCalls"
import {inCartProducts,inWishProducts} from "../utils";
import { Link } from "react-router-dom";
export const ProductItem = ({ product }) => {
  const { dispatch, setToast, setToastMessage, state } = useData()
  const {authState} = useAuth();
  const checkLoggedInHandler = ({callback})=>{
    if(authState.isLoggedIn){
      callback();
    }
    else{
      setToast("true");
      setToastMessage("Please Login")
    }
  }

  const addToWishlistHandler = ()=>{
    checkLoggedInHandler({callback : async () => {
      setToast("true");
      setToastMessage(`${product.name} is being added to wishlist`);
      const {data:{wishlistItem,success}} = await addToWish({productId:product._id});
      if(success===true){
      setToast("true");
      setToastMessage(`${product.name} is added to wishlist`);
      dispatch({ type: Actions.ADD_TO_WISHLIST, payload: wishlistItem._id });}
      else{
        setToast(true);
        setToastMessage("Error occured idding product to wish");
      }
  }})
}
  const removeFromWishlistHandler = ()=>{
    checkLoggedInHandler({callback: async() => {
      setToast("true");
      setToastMessage(`${product.name} being removed from  wishlist`);
      const {data:{wishlistItem,success}} = await removeWishItem({productId:product._id});
      if(success===true){
        setToast("true");
      setToastMessage(`${product.name} removed from  wishlist`);
      dispatch({
        type: Actions.REMOVE_FROM_WISHLIST,
        payload: wishlistItem._id,
      });
    }
    else{
      setToastMessage("Error in removing from wish");
      setToast(true)
    }
    }})
  }
  const addToCartHandler = ()=>{
    checkLoggedInHandler({callback:async() => {
      setToast("true");
      setToastMessage(`${product.name} is being added to Cart`);
      const {data:{cartItem}} = await addToCart({productId:product._id});
      setToast("true");
      setToastMessage(`${product.name} is  added to Cart`);
      dispatch({ type: Actions.ADD_TO_CART, payload: cartItem._id });
    }})
  }
  const removeFromCartHandler =()=> {
    checkLoggedInHandler({callback:async () => {
      setToast("true");
      setToastMessage(`${product.name} is being removed from Cart`);
      const {data:{cartItem}} = await removeCartItem({productId:product._id});
      setToast("true");
      setToastMessage(`${product.name} is being removed from Cart`);
      dispatch({ type: Actions.REMOVE_FROM_CART, payload: cartItem._id });
    }})
  }

  return (
    <div className="product">
      <div className="card card-shopping card-height" >
        <img src={product.imageUrl} alt={product.name} className="card-img" />
        <div className="card-text-content" >
        <Link className="link-style" to={`/product/${product._id}`} >
        <h4 className="card-brand">{product.name}</h4>
        </Link>
        <p className="card-desc">Rs {product.price}</p>

        {inWishProducts({id:product._id,wishItems:state.wishProducts}) ? (
          <button
            onClick={removeFromWishlistHandler}
            className="card-remove icon-button"
          >
            <i class="fas fa-heart"></i>
          </button>
        ) : (
          <button
            onClick={addToWishlistHandler}
            className="card-remove icon-button"
          >
            <i class="far fa-heart"></i>
          </button>
        )}

        {inCartProducts({id:product._id,cartItems:state.cartProducts }) ? (
          <button
            onClick={removeFromCartHandler}
            className="button button-primary card-action button-position"
          >
            REMOVE FROM CART
          </button>
        ) : (
          <button
            onClick={addToCartHandler}
            className="button button-primary card-action button-position"
          >
            ADD TO CART
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

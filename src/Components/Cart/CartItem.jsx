import { useData,useAuth, Actions } from "../../Context";
import {removeCartItem,updateQuantity,moveToWish} from "./serverCalls"
import {inWishProducts} from "../utils";
import {Link} from "react-router-dom"
export const CartItem = ({ product }) => {
  const {state, dispatch, setToast, setToastMessage } = useData();
  const {authState:{userToken}} = useAuth()
  const removeCartItemHandler = async () => {
      setToast("true");
      setToastMessage(`${product.name} is being removed from Cart`);
     const {data:{cartItem,success}} = await removeCartItem({productId:product._id,token:userToken});
     if(success===true){
        setToast("true");
        setToastMessage(`${product.name} removed from Cart`);
        dispatch({ type: Actions.REMOVE_FROM_CART, payload: cartItem._id });}
      else{
        setToast("true");
        setToastMessage(`error in removing cart item`);
      }
  }
  const moveToWishHandler =async () => {
    setToast(true);
    setToastMessage(`${product.name} is being moved to wish`)
      const {data:{wishlistItem,success}} = await moveToWish({productId:product._id,token:userToken});
      if(success===true){
        setToast("true");
        setToastMessage(`${product.name} moved to wish`);
        dispatch({
          type: Actions.ADD_TO_WISHLIST,
          payload: wishlistItem._id,
        });
        dispatch({
          type: Actions.REMOVE_FROM_CART,
          payload: wishlistItem._id,
        });
      }
      else{
        setToast("false");
        setToastMessage("Error occured in moving product to wish")
      }
  }
  const increaseQuantityHandler = async() => {
    setToast("true");
    setToastMessage(`Updating Quantity`);
    const {data:{cartItem}} = await updateQuantity({productId:product._id,quantity:product.quantity+1,token:userToken});
    setToast("true");
    setToastMessage(`Updated Quantity`);
    dispatch({
      type: Actions.INCREASE_ITEM_IN_CART,
      payload: cartItem._id,
    });
  }
  const decreaseQuantityHandler = async() => {
    setToast("true");
    setToastMessage(`Updating Quantity`);
    const {data:{cartItem}} = await updateQuantity({productId:product._id,quantity:product.quantity-1,token:userToken});
    setToast("true");
    setToastMessage(`Updated Quantity`);
    if(product.quantity===1){
      dispatch({ type: Actions.REMOVE_FROM_CART, payload: product._id })
    }
    dispatch({
      type: Actions.DECREASE_ITEM_IN_CART,
      payload: cartItem._id,
    });
  }
  return (
      <div className="card-horizontal card-horizontal-shape">
        <div className="card-content-img" >
        <img src={product.imageUrl} alt="" className="card-img" />
        </div>
        <div className="card-content" >
          <h4 className="card-brand">{product.name}</h4>
          <p className="card-desc">Rs {product.price}</p>
          <p className="card-desc">Quantity: {product.quantity}</p>
          <button
            onClick={removeCartItemHandler}
            className="card-remove buton button-border border-warning icon-button"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
          {inWishProducts({id:product._id,wishItems:state.wishProducts}) ?(<Link to="/wishlist"
          ><button
            className="button button-primary card-action "
          >
            Go To Wish
          </button></Link>):(
            <button
            className="button button-primary card-action "
            onClick={moveToWishHandler}
          >
            Move To Wish
          </button>
          )}
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="button button-border border-primary"
            onClick={increaseQuantityHandler}
          >
            +
          </button>
          <button
            className="button button-border border-primary"
            onClick={decreaseQuantityHandler}
          >
            -
          </button>
        </div>
        </div>
      </div>
  );
};


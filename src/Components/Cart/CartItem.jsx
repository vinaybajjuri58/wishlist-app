import { useData, Actions } from "../../Context";
import {removeCartItem,moveToWish,updateQuantity} from "./serverCalls"
import {inWishProducts} from "../utils"
export const CartItem = ({ product }) => {
  const {state, dispatch, setToast, setToastMessage } = useData();
  return (
    <div className="wish-product">
      <div className="card card-shopping">
        <img src={product.imageUrl} alt="" className="card-img" />
        <div className="card-text-content" >
          <h4 className="card-brand">{product.name}</h4>
          <p className="card-desc">Rs {product.price}</p>
          <p className="card-desc">Quantity: {product.quantity}</p>
          <button
            onClick={async () => {
              setToast("true");
              setToastMessage(`${product.name} is being removed from Cart`);
              const {data:{cartItem}} = await removeCartItem({productId:product._id});
              setToast("true");
              setToastMessage(`${product.name} is being removed from Cart`);
              dispatch({ type: Actions.REMOVE_FROM_CART, payload: cartItem._id });
            }}
            className="card-remove buton button-border border-warning icon-button"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
          <button
            className="button button-primary"
            onClick={ async () => {
              if(inWishProducts({id:product._id,wishItems:state.wishProducts})){
                const {data:{cartItem,success}} = await removeCartItem({productId:product._id});
                if(success){
                  setToast("true");
                  setToastMessage(`${product.name} removed from cart`);
                  dispatch({
                    type: Actions.REMOVE_FROM_CART,
                    payload: cartItem._id,
                  });
                }
                else{
                  setToast("false");
                  setToastMessage("Error occured in removing product")
                }
              }
              else{
                setToast("true");
                setToastMessage(`${product.name} being moved to wish`);
                const {data:{cartItem}} = await moveToWish({productId:product._id});
                setToast("true");
                setToastMessage(`${product.name} moved to wish`);
                dispatch({
                  type: Actions.MOVE_TO_WISHLIST_FROM_CART,
                  payload: { id: cartItem._id, count: product.count },
                });
              }
            }}
          >
            Move To Wish
          </button>
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="button button-border border-primary"
            onClick={async() => {
              const {data:{cartItem}} = await updateQuantity({productId:product._id,quantity:product.quantity+1});
              dispatch({
                type: Actions.INCREASE_ITEM_IN_CART,
                payload: cartItem._id,
              });
            }}
          >
            +
          </button>
          <button
            className="button button-border border-primary"
            onClick={async() => {
              const {data:{cartItem}} = await updateQuantity({productId:product._id,quantity:product.quantity-1});
              dispatch({
                type: Actions.DECREASE_ITEM_IN_CART,
                payload: cartItem._id,
              });
            }}
          >
            -
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

// {
//   setToast("true");
//   setToastMessage(`${product.name} is being added to Cart`);
//   if(inCartProducts({id:product._id,cartItems:state.cartProducts})){
//     const {data:{wishlistItem,success}} = await removeWishItem({productId:product._id});
//     if(success){
//       setToast("true");
//       setToastMessage(`${product.name} removed from  wishlist`);
//       dispatch({
//         type: Actions.REMOVE_FROM_WISHLIST,
//         payload: wishlistItem._id,
//       });
//     }
//     else{
//       setToast("false");
//       setToastMessage("Error occured in removing product")
//     }
//   }
//   else{
//     const response =  await moveToCart({productId:product._id}) ;
//     console.log({response})
//     dispatch({
//       type: Actions.MOVE_TO_CART_FROM_WISHLIST,
//       payload: { id: product._id, count: 1 },
//     });
//   } 
// }

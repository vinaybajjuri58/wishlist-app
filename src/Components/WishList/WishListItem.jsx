import { useData, Actions } from "../../Context";
import {removeWishItem,moveToCart} from "./serverCalls"
import {inCartProducts} from "../utils"
export const WishListItem = ({ product }) => {
    const { state,dispatch, setToast, setToastMessage } = useData();
    return (
      <div className="wish-product">
        <div className="card card-shopping card-height">
          <img src={product.imageUrl} alt="" className="card-img" />
          <div className="card-text-content" >
            <h4 className="card-brand">{product.name}</h4>
            <p className="card-desc">Rs {product.price}</p>
            <button
              onClick={
                async() => {
                  setToast("true");
                  setToastMessage(`${product.name} being removed from  wishlist`);
                  const {data:{wishlistItem,success}} = await removeWishItem({productId:product._id});
                  if(success){
                    setToast("true");
                    setToastMessage(`${product.name} removed from  wishlist`);
                    dispatch({
                      type: Actions.REMOVE_FROM_WISHLIST,
                      payload: wishlistItem._id,
                    });
                  }
                  else{
                    setToast("false");
                    setToastMessage("Error occured in removing product")
                  }
                }
              }
              className="card-remove button button-border"
            >
              X
            </button>
            <button
            className="button button-primary"
            onClick={async () => {
              setToast("true");
              setToastMessage(`${product.name} is being added to Cart`);
              if(inCartProducts({id:product._id,cartItems:state.cartProducts})){
                const {data:{wishlistItem,success}} = await removeWishItem({productId:product._id});
                if(success){
                  setToast("true");
                  setToastMessage(`${product.name} removed from  wishlist`);
                  dispatch({
                    type: Actions.REMOVE_FROM_WISHLIST,
                    payload: wishlistItem._id,
                  });
                }
                else{
                  setToast("false");
                  setToastMessage("Error occured in removing product")
                }
              }
              else{
                const {data:{cartItem}} =  await moveToCart({productId:product._id});
                dispatch({
                  type: Actions.MOVE_TO_CART_FROM_WISHLIST,
                  payload: { id: cartItem._id, count: 1 },
                });
              } 
            }}
          >
            Move To Cart
          </button>
          </div>
        </div>
      </div>
    );
  };

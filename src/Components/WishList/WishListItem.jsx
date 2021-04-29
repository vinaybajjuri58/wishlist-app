import { useData, Actions } from "../../Context";
import {removeWishItem} from "./serverCalls"
export const WishListItem = ({ product }) => {
    const { dispatch, setToast, setToastMessage } = useData();
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
                  const {data:{wishlistItem}} = await removeWishItem({productId:product._id});
                  setToast("true");
                  setToastMessage(`${product.name} removed from  wishlist`);
                  dispatch({
                    type: Actions.REMOVE_FROM_WISHLIST,
                    payload: wishlistItem._id,
                  });
                }
              }
              className="card-remove button button-border"
            >
              X
            </button>
            <button
            className="button button-primary"
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.name} is added to Cart`);
              dispatch({
                type: Actions.MOVE_TO_CART_FROM_WISHLIST,
                payload: { id: product._id, count: product.count },
              });
            }}
          >
            Move To Cart
          </button>
          </div>
        </div>
      </div>
    );
  };

  // <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           <button
  //             className="button button-border border-primary"
  //             onClick={() => {
  //               dispatch({
  //                 type: Actions.INCREASE_ITEM_IN_WISHLIST,
  //                 payload: product.id,
  //               });
  //             }}
  //           >
  //             +
  //           </button>
  //           <button
  //             className="button button-border border-primary"
  //             onClick={() => {
  //               dispatch({
  //                 type: Actions.DECREASE_ITEM_IN_WISHLIST,
  //                 payload: product.id,
  //               });
  //             }}
  //           >
  //             -
  //           </button>
  //         </div>
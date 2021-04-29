import { useData, Actions } from "../../Context";
import {removeCartItem} from "./serverCalls"
export const CartItem = ({ product }) => {
  const { dispatch, setToast, setToastMessage } = useData();
  return (
    <div className="wish-product">
      <div className="card card-shopping">
        <img src={product.imageUrl} alt="" className="card-img" />
        <div className="card-text-content" >
          <h4 className="card-brand">{product.name}</h4>
          <p className="card-desc">Rs {product.price}</p>
          <p className="card-desc">Count: {product.count}</p>
          <button
            onClick={async() => {
              setToast("true");
              setToastMessage(`${product.name} is being removed from Cart`);
              const response = await removeCartItem({productId:product._id});
              console.log({response})
              dispatch({ type: Actions.REMOVE_FROM_CART, payload: product._id });
              setToast("true");
              setToastMessage(`${product.name} is removed from Cart`);
            }}
            className="card-remove buton button-border border-warning icon-button"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
          <button
            className="button button-primary"
            onClick={ () => {

              setToast("true");
              setToastMessage(`${product.name} moved to wish`);
              dispatch({
                type: Actions.MOVE_TO_WISHLIST_FROM_CART,
                payload: { id: product._id, count: product.count },
              });
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
            onClick={() => {
              dispatch({
                type: Actions.INCREASE_ITEM_IN_CART,
                payload: product._id,
              });
            }}
          >
            +
          </button>
          <button
            className="button button-border border-primary"
            onClick={() => {
              dispatch({
                type: Actions.DECREASE_ITEM_IN_CART,
                payload: product._id,
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

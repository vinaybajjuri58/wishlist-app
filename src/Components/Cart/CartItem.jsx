import { useData, Actions } from "../../Context";
// import axios from "axios"
export const CartItem = ({ product }) => {
  const { dispatch, setToast, setToastMessage } = useData();
  return (
    <div className="wish-product">
      <div className="card card-shopping">
        <img src={product.url} alt="" className="card-img" />
        <h4 className="card-brand">{product.brandName}</h4>
        <p className="card-desc">{product.description}</p>
        <p className="card-desc">Rs {product.price}</p>
        <p className="card-desc">Count: {product.count}</p>
        <button
          onClick={async() => {
            setToast("true");
            setToastMessage(`${product.brandName} removed from Cart`);
            // const response = await axios.delete(`/api/carts/${product.id}`);
            // console.log({response})
            dispatch({ type: Actions.REMOVE_FROM_CART, payload: product.id });
          }}
          className="card-remove button button-border"
        >
          X
        </button>
        <button
          className="button button-primary"
          onClick={() => {
            setToast("true");
            setToastMessage(`${product.brandName} moved to wish`);
            dispatch({
              type: Actions.MOVE_TO_WISHLIST_FROM_CART,
              payload: { id: product.id, count: product.count },
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
                payload: product.id,
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
                payload: product.id,
              });
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

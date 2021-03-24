import { useWish, Actions } from "../Context";
import { useEffect } from "react";

export const WishList = () => {
  const { state } = useWish();
  useEffect(() => {
    document.title = "Wish List";
  }, []);
  return (
    <div className="products-list">
      {state.wishProducts.length > 0 ? (
        state.wishProducts.map((item) => (
          <Product key={item.id} product={item} />
        ))
      ) : (
        <h2>No items in WishList</h2>
      )}
    </div>
  );
};

const Product = ({ product }) => {
  const { dispatch, setToast, setToastMessage } = useWish();
  return (
    <div className="wish-product">
      <div className="card card-shopping">
        <img src={product.url} alt="" className="card-img" />
        <h4 className="card-brand">{product.brandName}</h4>
        <p className="card-desc">{product.description}</p>
        <p className="card-desc">Count:{product.count}</p>
        <p className="card-desc">Rs {product.price}</p>
        <button
          onClick={() => {
            setToast("true");
            setToastMessage(`${product.brandName} removed from wish list`);
            dispatch({ type: Actions.REMOVE_FROM_WISH, payload: product.id });
          }}
          className="remove-button"
        >
          X
        </button>
        <button
          onClick={() => {
            setToast("true");
            setToastMessage(`${product.brandName} is added to Cart`);
            dispatch({
              type: Actions.MOVE_TO_CART,
              payload: { id: product.id, count: product.count },
            });
          }}
        >
          Move To Cart
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              dispatch({
                type: Actions.INCREASE_ITEM_IN_WISH,
                payload: product.id,
              });
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              dispatch({
                type: Actions.DECREASE_ITEM_IN_WISH,
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

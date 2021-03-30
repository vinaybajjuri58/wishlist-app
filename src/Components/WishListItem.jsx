import { useData, Actions } from "../Context";
export const WishListItem = ({ product }) => {
    const { dispatch, setToast, setToastMessage } = useData();
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
              dispatch({
                type: Actions.REMOVE_FROM_WISHLIST,
                payload: product.id,
              });
            }}
            className="remove-button"
          >
            X
          </button>
          <button
            className="button button-primary"
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.brandName} is added to Cart`);
              dispatch({
                type: Actions.MOVE_TO_CART_FROM_WISHLIST,
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
              className="button button-border border-primary"
              onClick={() => {
                dispatch({
                  type: Actions.INCREASE_ITEM_IN_WISHLIST,
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
                  type: Actions.DECREASE_ITEM_IN_WISHLIST,
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
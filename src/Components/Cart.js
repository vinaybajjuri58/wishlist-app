import { useEffect, useState } from "react";
import { useData, Actions } from "../Context";
export const Cart = () => {
  const { state } = useData();
  useEffect(() => {
    document.title = "Cart";
  }, []);
  return (
    <div>
      {state.cartProducts.length > 0 ? (
        <DisplayProducts />
      ) : (
        <h2>No items in Cart</h2>
      )}
    </div>
  );
};

const DisplayProducts = () => {
  const { state } = useData();
  return (
    <div>
      <ul className="products-list">
        {state.cartProducts.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </ul>
      <PricingDisplay />
    </div>
  );
};

const Product = ({ product }) => {
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
          onClick={() => {
            setToast("true");
            setToastMessage(`${product.brandName} removed from Cart`);
            dispatch({ type: Actions.REMOVE_FROM_CART, payload: product.id });
          }}
          className="remove-button"
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

const PricingDisplay = () => {
  const { state } = useData();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const totalCost = state.cartProducts.reduce(
      (cumulative, current) =>
        cumulative + Number(current.count) * Number(current.price),
      0
    );
    setTotalPrice(totalCost);
  }, [state.cartProducts]);
  return (
    <div>
      <p style={{ paddingLeft: "2.5rem" }}>Total Price :{totalPrice}</p>
      <p style={{ paddingLeft: "2.5rem" }}>Price Breakdown : </p>
      <ul className="list list-unstyled">
        {state.cartProducts.map((product) => (
          <div className="price">
            <p>
              {product.brandName} * {product.count} ={" "}
              {Number(product.count) * Number(product.price)}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
};

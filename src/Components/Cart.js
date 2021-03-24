import { useEffect, useState } from "react";
import { useWish, Actions } from "../Context";
export const Cart = () => {
  const { state } = useWish();
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
  const { state } = useWish();
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
  const { dispatch, setToast, setToastMessage } = useWish();
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <button onClick={() => increaseItem(product.id)}>+</button>
          <button onClick={() => removeOneItem(product.id)}>-</button> */}
        </div>
      </div>
    </div>
  );
};

const PricingDisplay = () => {
  const { state } = useWish();
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
      <p style={{ paddingLeft: "2.5rem" }}>Price Breakage</p>
      <ul>
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

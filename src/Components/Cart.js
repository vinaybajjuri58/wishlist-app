import { useEffect, useState } from "react";
import { useWish } from "../Context";
export const Cart = () => {
  const { cartProducts } = useWish();
  return (
    <div>
      {cartProducts.length > 0 ? (
        <DisplayProducts />
      ) : (
        <h2>No items in Cart</h2>
      )}
    </div>
  );
};

const DisplayProducts = () => {
  const { cartProducts } = useWish();
  return (
    <div>
      <ul className="products-list">
        {cartProducts.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </ul>
      <PricingDisplay />
    </div>
  );
};

const Product = ({ product }) => {
  const { removeFromCart, setToast, setToastMessage } = useWish();
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
            removeFromCart(product.id);
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
  const { cartProducts } = useWish();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const totalCost = cartProducts.reduce(
      (cumulative, current) =>
        cumulative + Number(current.count) * Number(current.price),
      0
    );
    setTotalPrice(totalCost);
  }, [cartProducts]);
  return (
    <div>
      <p style={{ paddingLeft: "2.5rem" }}>Total Price :{totalPrice}</p>
      <p style={{ paddingLeft: "2.5rem" }}>Price Breakage</p>
      <ul>
        {cartProducts.map((product) => (
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

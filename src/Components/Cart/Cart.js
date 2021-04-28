import { useEffect, useState } from "react";
import { useData } from "../../Context";

import { CartItem } from "./CartItem";
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
          <CartItem key={item._id} product={item} />
        ))}
      </ul>
      <PricingDisplay />
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
          <div className="price" key={product._id}>
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

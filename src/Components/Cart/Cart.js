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
    <div className="products-list-cart">
      <PricingDisplay />
      <ul className="products-list cart-ul">
        {state.cartProducts.map((item) => (
          <CartItem key={item._id} product={item} />
        ))}
      </ul>
    </div>
  );
};
const PricingDisplay = () => {
  const { state } = useData();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const totalCost = state.cartProducts.reduce(
      (cumulative, current) =>
        cumulative + Number(current.quantity) * Number(current.price),
      0
    );
    setTotalPrice(totalCost);
  }, [state.cartProducts]);
  return (
    <div className="total-price-container">
      <p>Total Price :{totalPrice}</p>
    </div>
  );
};

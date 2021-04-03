import { useEffect, useState } from "react";
import { useData } from "../../Context";
// import { Actions } from "../../Context";
// import axios from "axios";

import { CartItem } from "./CartItem";
export const Cart = () => {
  const { state } = useData();
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Cart";
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       const { data: cart } = await axios.get("/api/carts");
  //       dispatch({
  //         type: Actions.SET_CART_DATA,
  //         payload: cart.carts,
  //       });
  //     } catch (err) {
  //       console.log({ err });
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [dispatch]);
  // if (loading) {
  //   return <h2>Loading Data</h2>;
  // }
  return (
    <div>
      {/* {loadError === true && <h2>Error in loading cart Data</h2>} */}
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
          <CartItem key={item.id} product={item} />
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
          <div className="price" key={product.id}>
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

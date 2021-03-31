import { useData } from "../Context";
import { useEffect } from "react";
import { WishListItem } from "./WishListItem.jsx";
import { Actions } from "../Context";
import axios from "axios";

export const WishList = () => {
  const { state, dispatch } = useData();
  useEffect(() => {
    document.title = "Wish List";
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/cartList");
        dispatch({
          type: Actions.SET,
          payload: data.cartProducts,
        });
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [dispatch]);
  return (
    <div className="products-list">
      {state.wishProducts.length > 0 ? (
        state.wishProducts.map((item) => (
          <WishListItem key={item.id} product={item} />
        ))
      ) : (
        <h2>No items in WishList</h2>
      )}
    </div>
  );
};

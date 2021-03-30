import { useData } from "../Context";
import { useEffect } from "react";
import { WishListItem } from "./WishListItem.jsx";

export const WishList = () => {
  const { state } = useData();
  useEffect(() => {
    document.title = "Wish List";
  }, []);
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

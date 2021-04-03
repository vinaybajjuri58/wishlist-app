import { useData } from "../../Context";
import { useEffect } from "react";
import { WishListItem } from "./WishListItem.jsx";
// import { Actions } from "../../Context";
// import axios from "axios";

export const WishList = () => {
  const { state } = useData();
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Wish List";
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       const { data: wishes } = await axios.get("/api/wishes");
  //       dispatch({
  //         type: Actions.SET_WISHLIST_DATA,
  //         payload: wishes.wishes,
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

import axios from "axios";
export const removeWishItem = async ({ productId }) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}wishlist/${productId}`
  );
  return response;
};
export const moveToCart = async ({ productId }) => {
  const {
    data: { wishlistItem },
  } = await removeWishItem({ productId: productId });
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}api/cart`,
    {
      _id: wishlistItem._id,
      quantity: 1,
    }
  );
  return response;
};

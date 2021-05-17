import axios from "axios";
import { addToCart } from "../Products/serverCalls";
export const removeWishItem = async ({ productId }) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}wishlist/${productId}`
  );
  return response;
};
export const moveToCart = async ({ productId }) => {
  const {
    data: { success },
  } = await removeWishItem({ productId });
  if (success) {
    const response = await addToCart({ productId });
    return response;
  } else {
    return {
      data: {
        success: false,
      },
    };
  }
};

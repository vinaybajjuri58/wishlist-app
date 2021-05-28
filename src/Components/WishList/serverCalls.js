// import axios from "axios";
import { addToCart, removeWishItem } from "../Products/serverCalls";

export const moveToCart = async ({ productId, token }) => {
  const {
    data: { success },
  } = await removeWishItem({ productId, token });
  if (success) {
    const response = await addToCart({ productId, token });
    return response;
  } else {
    return {
      data: {
        success: false,
      },
    };
  }
};

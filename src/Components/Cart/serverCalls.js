import axios from "axios";
import { addToWish } from "../Products/serverCalls";
export const updateQuantity = async ({ productId, quantity }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}cart/${productId}`,
    {
      quantity: quantity,
    }
  );
  return response;
};

export const removeCartItem = async ({ productId }) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}cart/${productId}`
  );
  return response;
};
export const moveToWish = async ({ productId }) => {
  const {
    data: { success },
  } = await removeCartItem({ productId });
  if (success === true) {
    const response = await addToWish({ productId });
    return response;
  } else {
    return { data: { success: false, message: "Error in moving product" } };
  }
};

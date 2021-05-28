import axios from "axios";
import { addToWish } from "../Products/serverCalls";
export const updateQuantity = async ({ productId, quantity, token }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}cart/${productId}`,
    {
      quantity: quantity,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
  return response;
};

export const removeCartItem = async ({ productId, token }) => {
  const response = axios({
    url: `${process.env.REACT_APP_BACKEND_API}cart/${productId}`,
    method: "delete",
    headers: { authorization: token },
  });
  return response;
};
export const moveToWish = async ({ productId, token }) => {
  const {
    data: { success },
  } = await removeCartItem({ productId, token });
  if (success === true) {
    const response = await addToWish({ productId, token });
    return response;
  } else {
    return { data: { success: false, message: "Error in moving product" } };
  }
};

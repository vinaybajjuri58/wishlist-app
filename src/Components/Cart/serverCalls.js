import axios from "axios";
export const updateQuantity = async ({ productId, quantity }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}cart/${productId}`,
    {
      quantity: quantity,
    }
  );
  return response;
};
export const moveToWish = async ({ productId }) => {
  const {
    data: { wishlistItem },
  } = await axios.post(`${process.env.REACT_APP_BACKEND_API}wishlist`, {
    _id: productId,
  });
  const removedResponse = await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}cart/${wishlistItem._id}`
  );
  return removedResponse;
};
export const removeCartItem = async ({ productId }) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}cart/${productId}`
  );
  return response;
};

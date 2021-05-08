import axios from "axios";
export const addToWish = async ({ productId }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}wishlist`,
    {
      _id: productId,
    }
  );
  return response;
};
export const removeWishItem = async ({ productId }) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}wishlist/${productId}`
  );
  return response;
};
export const addToCart = async ({ productId }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}cart`,
    {
      _id: productId,
      quantity: 1,
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

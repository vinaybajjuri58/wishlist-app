import axios from "axios";
export const addToWish = async ({ productId, token }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}wishlist`,
    {
      _id: productId,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
  return response;
};
export const removeWishItem = async ({ productId, token }) => {
  const response = await axios({
    url: `${process.env.REACT_APP_BACKEND_API}wishlist/${productId}`,
    method: "delete",
    headers: { authorization: token },
  });
  return response;
};
export const addToCart = async ({ productId, token }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}cart`,
    {
      _id: productId,
      quantity: 1,
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

import axios from "axios";
export const addToWish = async ({ productId }) => {
  const response = await axios.post(
    "https://ecom-backend-deploy.herokuapp.com/api/wishlist",
    {
      _id: productId,
    }
  );
  return response;
};
export const removeWishItem = async ({ productId }) => {
  const response = await axios.delete(
    `https://ecom-backend-deploy.herokuapp.com/api/wishlist/${productId}`
  );
  return response;
};
export const addToCart = async ({ productId }) => {
  const response = await axios.post(
    "https://ecom-backend-deploy.herokuapp.com/api/cart",
    {
      _id: productId,
      quantity: 1,
    }
  );
  return response;
};

export const removeCartItem = async ({ productId }) => {
  const response = await axios.delete(
    `https://ecom-backend-deploy.herokuapp.com/api/cart/${productId}`
  );
  return response;
};

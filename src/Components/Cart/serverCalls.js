import axios from "axios";
export const updateQuantity = async ({ productId, quantity }) => {
  const response = await axios.post(
    `https://ecom-backend-deploy.herokuapp.com/api/cart/${productId}`,
    {
      quantity: quantity,
    }
  );
  return response;
};
export const moveToWish = async ({ productId }) => {
  const {
    data: { wishlistItem },
  } = await axios.post(
    "https://ecom-backend-deploy.herokuapp.com/api/wishlist",
    {
      _id: productId,
    }
  );
  const removedResponse = await axios.delete(
    `https://ecom-backend-deploy.herokuapp.com/api/cart/${wishlistItem._id}`
  );
  return removedResponse;
};
export const removeCartItem = async ({ productId }) => {
  const response = await axios.delete(
    `https://ecom-backend-deploy.herokuapp.com/api/cart/${productId}`
  );
  return response;
};

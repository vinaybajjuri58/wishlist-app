import axios from "axios";
export const removeWishItem = async ({ productId }) => {
  const response = await axios.delete(
    `https://ecom-backend-deploy.herokuapp.com/api/wishlist/${productId}`
  );
  return response;
};

import axios from "axios";
export const removeWishItem = async ({ productId }) => {
  const response = await axios.delete(
    `https://ecom-backend-deploy.herokuapp.com/api/wishlist/${productId}`
  );
  return response;
};
export const moveToCart = async ({ productId }) => {
  const {
    data: { wishlistItem },
  } = await removeWishItem({ productId: productId });
  const response = await axios.post(
    "https://ecom-backend-deploy.herokuapp.com/api/cart",
    {
      _id: wishlistItem._id,
      quantity: 1,
    }
  );
  return response;
};

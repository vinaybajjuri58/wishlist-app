import axios from "axios";
// const updateQuantity = async ({ productId, quantity }) => {

// };
// const addToWish = async ({productId})=>{

// }
export const removeCartItem = async ({ productId }) => {
  const response = await axios.delete(
    `https://ecom-backend-deploy.herokuapp.com/api/cart/${productId}`
  );
  return response;
};

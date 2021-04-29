export const inCartProducts = ({ id, cartItems }) => {
  return cartItems.findIndex((item) => item._id === id) === -1 ? false : true;
};
export const inWishProducts = ({ id, wishItems }) => {
  return wishItems.findIndex((item) => item._id === id) === -1 ? false : true;
};

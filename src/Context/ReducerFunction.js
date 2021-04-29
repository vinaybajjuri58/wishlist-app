import * as Actions from "./ActionTypes";
export const reducerFunction = (state, action) => {
  switch (action.type) {
    case Actions.SET_PRODUCTS_DATA:
      return {
        ...state,
        products: action.payload,
      };
    case Actions.SET_WISHLIST_DATA:
      return {
        ...state,
        wishProducts: action.payload,
      };
    case Actions.SET_CART_DATA:
      return {
        ...state,
        cartProducts: action.payload,
      };
    case Actions.ADD_TO_WISHLIST:
      return {
        ...state,
        wishProducts: addToWishList({
          idFromWishListClick: action.payload,
          wishItems: state.wishProducts,
          productItems: state.products,
        }),
      };
    case Actions.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishProducts: removeFromWishList({
          idFromRemoveClick: action.payload,
          wishItems: state.wishProducts,
        }),
      };
    case Actions.MOVE_TO_CART_FROM_WISHLIST:
      return {
        ...state,
        cartProducts: moveToCart({
          idFromWishList: action.payload.id,
          quantityFromWishList: action.payload.quantity,
          products: state.products,
          cartItems: state.cartProducts,
        }),
        wishProducts: removeFromWishList({
          idFromRemoveClick: action.payload.id,
          wishItems: state.wishProducts,
        }),
      };
    case Actions.MOVE_TO_WISHLIST_FROM_CART:
      return {
        ...state,
        wishProducts: moveToWishList({
          idFromCart: action.payload.id,
          products: state.products,
          wishItems: state.wishProducts,
        }),
        cartProducts: removeFromCart({
          idFromRemoveCart: action.payload.id,
          cartItems: state.cartProducts,
        }),
      };
    case Actions.ADD_TO_CART:
      return {
        ...state,
        cartProducts: addToCart({
          idFromCartClick: action.payload,
          productItems: state.products,
          cartItems: state.cartProducts,
        }),
      };
    case Actions.REMOVE_FROM_CART:
      return {
        ...state,
        cartProducts: removeFromCart({
          idFromRemoveCart: action.payload,
          cartItems: state.cartProducts,
        }),
      };
    case Actions.INCREASE_ITEM_IN_CART:
      return {
        ...state,
        cartProducts: increaseItem({
          id: action.payload,
          Items: state.cartProducts,
        }),
      };
    case Actions.DECREASE_ITEM_IN_CART:
      return {
        ...state,
        cartProducts: removeOneItem({
          id: action.payload,
          Items: state.cartProducts,
        }),
      };
    default:
      return state;
  }
};

function addToCart({ idFromCartClick, productItems, cartItems }) {
  const productIndex = productItems.findIndex(
    (product) => product._id === idFromCartClick
  );
  const foundInCart = cartItems.findIndex(
    (product) => product._id === idFromCartClick
  );
  if (foundInCart === -1) {
    return [...cartItems, { ...productItems[productIndex], quantity: 1 }];
  }
  let allItems = cartItems.map((item) =>
    item._id === idFromCartClick
      ? { ...item, quantity: item.quantity + 1 }
      : { ...item }
  );
  return allItems.filter((item) => item.quantity > 0);
}

function addToWishList({ idFromWishListClick, wishItems, productItems }) {
  const productIndex = productItems.findIndex(
    (product) => product._id === idFromWishListClick
  );
  const foundInWishList = wishItems.findIndex(
    (product) => product._id === idFromWishListClick
  );
  if (foundInWishList === -1) {
    return [...wishItems, { ...productItems[productIndex] }];
  }
  return wishItems;
}
function removeFromWishList({ idFromRemoveClick, wishItems }) {
  return wishItems.filter((item) => item._id !== idFromRemoveClick);
}

function moveToCart({
  idFromWishList,
  quantityFromWishList = 1,
  products,
  cartItems,
}) {
  const productIndex = products.findIndex(
    (product) => product._id === idFromWishList
  );
  const foundInCart = cartItems.findIndex(
    (product) => product._id === idFromWishList
  );
  if (foundInCart === -1) {
    return [
      ...cartItems,
      {
        ...products[productIndex],
        quantity: quantityFromWishList,
      },
    ];
  }
  const allItems = cartItems.map((item) =>
    item._id === idFromWishList
      ? { ...item, quantity: item.quantity + quantityFromWishList }
      : { ...item }
  );
  return allItems.filter((item) => item.quantity > 0);
}
function moveToWishList({ idFromCart, products, wishItems }) {
  const productIndex = products.findIndex(
    (product) => product._id === idFromCart
  );
  const foundInWishList = wishItems.findIndex(
    (product) => product._id === idFromCart
  );
  if (foundInWishList === -1) {
    return [
      ...wishItems,
      {
        ...products[productIndex],
      },
    ];
  }
  return wishItems;
}

function removeFromCart({ idFromRemoveCart, cartItems }) {
  let allItems = [...cartItems];
  let index = allItems.findIndex((item) => item._id === idFromRemoveCart);
  allItems[index].quantity = 0;

  return allItems.filter((item) => item.quantity > 0);
}

function increaseItem({ id, Items }) {
  return Items.map((item) =>
    item._id === id ? { ...item, quantity: item.quantity + 1 } : { ...item }
  );
}
function removeOneItem({ id, Items }) {
  let allItems = Items.map((item) =>
    item._id === id ? { ...item, quantity: item.quantity - 1 } : { ...item }
  );

  return allItems.filter((item) => item.quantity > 0);
}

import * as Actions from "./ActionTypes";
export const reducerFunction = (state, action) => {
  switch (action.type) {
    case Actions.SET_PRODUCTS_DATA:
      return {
        ...state,
        products: action.payload,
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
          countFromWishList: action.payload.count,
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
          countFromCart: action.payload.count,
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
    case Actions.INCREASE_ITEM_IN_WISHLIST:
      return {
        ...state,
        wishProducts: increaseItem({
          id: action.payload,
          Items: state.wishProducts,
        }),
      };
    case Actions.DECREASE_ITEM_IN_WISHLIST:
      return {
        ...state,
        wishProducts: removeOneItem({
          id: action.payload,
          Items: state.wishProducts,
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
    (product) => product.id === idFromCartClick
  );
  const foundInCart = cartItems.findIndex(
    (product) => product.id === idFromCartClick
  );
  if (foundInCart === -1) {
    return [...cartItems, { ...productItems[productIndex], count: 1 }];
  }
  let allItems = cartItems.map((item) =>
    item.id === idFromCartClick
      ? { ...item, count: item.count + 1 }
      : { ...item }
  );
  return allItems.filter((item) => item.count > 0);
}

function addToWishList({ idFromWishListClick, wishItems, productItems }) {
  const productIndex = productItems.findIndex(
    (product) => product.id === idFromWishListClick
  );
  const foundInWishList = wishItems.findIndex(
    (product) => product.id === idFromWishListClick
  );
  if (foundInWishList === -1) {
    return [...wishItems, { ...productItems[productIndex], count: 1 }];
  }
  let allItems = [...wishItems];
  const index = allItems.findIndex((item) => item.id === idFromWishListClick);
  allItems[index].count += 1;
  return allItems.filter((item) => item.count > 0);
}
function removeFromWishList({ idFromRemoveClick, wishItems }) {
  let allItems = [...wishItems];
  const index = allItems.findIndex((item) => item.id === idFromRemoveClick);
  allItems[index].count = 0;

  return allItems.filter((item) => item.count > 0);
}

function moveToCart({
  idFromWishList,
  countFromWishList = 1,
  products,
  cartItems,
}) {
  const productIndex = products.findIndex(
    (product) => product.id === idFromWishList
  );
  const foundInCart = cartItems.findIndex(
    (product) => product.id === idFromWishList
  );
  if (foundInCart === -1) {
    return [
      ...cartItems,
      {
        ...products[productIndex],
        count: countFromWishList,
      },
    ];
  }
  const allItems = cartItems.map((item) =>
    item.id === idFromWishList
      ? { ...item, count: item.count + countFromWishList }
      : { ...item }
  );
  return allItems.filter((item) => item.count > 0);
}
function moveToWishList({
  idFromCart,
  countFromCart = 1,
  products,
  wishItems,
}) {
  const productIndex = products.findIndex(
    (product) => product.id === idFromCart
  );
  const foundInCart = wishItems.findIndex(
    (product) => product.id === idFromCart
  );
  if (foundInCart === -1) {
    return [
      ...wishItems,
      {
        ...products[productIndex],
        count: countFromCart,
      },
    ];
  }
  let allItems = wishItems.map((item) =>
    item.id === idFromCart
      ? { ...item, count: item.count + countFromCart }
      : { ...item }
  );
  return allItems.filter((item) => item.count > 0);
}

function removeFromCart({ idFromRemoveCart, cartItems }) {
  let allItems = [...cartItems];
  let index = allItems.findIndex((item) => item.id === idFromRemoveCart);
  allItems[index].count = 0;

  return allItems.filter((item) => item.count > 0);
}

function increaseItem({ id, Items }) {
  return Items.map((item) =>
    item.id === id ? { ...item, count: item.count + 1 } : { ...item }
  );
}
function removeOneItem({ id, Items }) {
  let allItems = Items.map((item) =>
    item.id === id ? { ...item, count: item.count - 1 } : { ...item }
  );

  return allItems.filter((item) => item.count > 0);
}

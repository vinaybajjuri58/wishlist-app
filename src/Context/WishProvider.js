import { WishContext } from "./WishContext";
import { useState, useReducer } from "react";
import * as Actions from "./ActionTypes";
import { products } from "./Products";

export const WishProvider = ({ children }) => {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const dispatchFunction = (state, action) => {
    switch (action.type) {
      case Actions.ADD_TO_WISH:
        return {
          ...state,
          wishProducts: addToWish(
            action.payload,
            state.wishProducts,
            state.products
          ),
        };
      case Actions.REMOVE_FROM_WISH:
        return {
          ...state,
          wishProducts: removeFromWish(action.payload, state.wishProducts),
        };
      case Actions.MOVE_TO_CART:
        return {
          ...state,
          cartProducts: moveToCart(
            action.payload.id,
            action.payload.count,
            state.products,
            state.cartProducts
          ),
          wishProducts: removeFromWish(action.payload.id, state.wishProducts),
        };
      case Actions.ADD_TO_CART:
        break;
      case Actions.REMOVE_FROM_CART:
        return {
          ...state,
          cartProducts: removeFromCart(action.payload, state.cartProducts),
        };
      case Actions.INCREASE_ITEM_IN_WISH:
        return {
          ...state,
          wishProducts: increaseItem(action.payload, state.wishProducts),
        };
      case Actions.DECREASE_ITEM_IN_WISH:
        return {
          ...state,
          wishProducts: removeOneItem(action.payload, state.wishProducts),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(dispatchFunction, {
    products,
    wishProducts: [],
    cartProducts: [],
  });

  function addToWish(idFromWishClick, wishItems, productItems) {
    const productIndex = productItems.findIndex(
      (product) => product.id === idFromWishClick
    );
    const foundInWish = wishItems.findIndex(
      (product) => product.id === idFromWishClick
    );
    if (foundInWish === -1) {
      return [...wishItems, { ...productItems[productIndex], count: 1 }];
    } else {
      let allItems = [...wishItems];
      const index = allItems.findIndex((item) => item.id === idFromWishClick);
      allItems[index].count += 1;
      return allItems.filter((item) => item.count > 0);
    }
  }
  function removeFromWish(idFromRemoveClick, wishItems) {
    let allItems = [...wishItems];
    const index = allItems.findIndex((item) => item.id === idFromRemoveClick);
    allItems[index].count = 0;

    return allItems.filter((item) => item.count > 0);
  }

  function moveToCart(idFromWish, countFromWish = 1, products, cartItems) {
    const productIndex = products.findIndex(
      (product) => product.id === idFromWish
    );
    const foundInCart = cartItems.findIndex(
      (product) => product.id === idFromWish
    );
    if (foundInCart === -1) {
      return [
        ...cartItems,
        {
          ...products[productIndex],
          count: countFromWish,
        },
      ];
    } else {
      let allItems = [...cartItems];
      const index = allItems.findIndex((item) => item.id === idFromWish);
      allItems[index].count += countFromWish;
      return allItems.filter((item) => item.count > 0);
    }
  }

  function removeFromCart(idFromRemoveCart, cartItems) {
    let allItems = [...cartItems];
    let index = allItems.findIndex((item) => item.id === idFromRemoveCart);
    allItems[index].count = 0;

    return allItems.filter((item) => item.count > 0);
  }

  function increaseItem(id, wishItems) {
    return wishItems.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : { ...item }
    );
  }
  function removeOneItem(id, wishItems) {
    let allItems = [...wishItems];
    let index = allItems.findIndex((item) => item.id === id);
    allItems[index].count -= 1;

    return allItems.filter((item) => item.count > 0);
  }

  return (
    <WishContext.Provider
      value={{
        toast,
        setToast,
        toastMessage,
        setToastMessage,
        state,
        dispatch,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

// const addToCart = (idFromCartClick) => {
//   const productIndex = products.findIndex(
//     (product) => product.id === idFromCartClick
//   );
//   const foundInCart = cartProducts.findIndex(
//     (product) => product.id === idFromCartClick
//   );
//   if (foundInCart === -1) {
//     setCartProducts((cartProducts) => [
//       ...cartProducts,
//       { ...products[productIndex], count: 1 },
//     ]);
//   } else {
//     let allItems = [...cartProducts];
//     const index = allItems.findIndex((item) => item.id === idFromCartClick);
//     allItems[index].count += 1;
//     const cartItems = allItems.filter((item) => item.count > 0);
//     setCartProducts(cartItems);
//   }
// };

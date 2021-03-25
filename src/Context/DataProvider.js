import { DataContext } from "./DataContext";
import { useState, useReducer } from "react";
import * as Actions from "./ActionTypes";
import { products } from "./Products";

export const DataProvider = ({ children }) => {
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
      case Actions.MOVE_TO_CART_FROM_WISH:
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
      case Actions.MOVE_TO_WISH_FROM_CART:
        return {
          ...state,
          wishProducts: moveToWish(
            action.payload.id,
            action.payload.count,
            state.products,
            state.wishProducts
          ),
          cartProducts: removeFromCart(action.payload.id, state.cartProducts),
        };
      case Actions.ADD_TO_CART:
        return {
          ...state,
          cartProducts: addToCart(
            action.payload,
            state.products,
            state.cartProducts
          ),
        };
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
      case Actions.INCREASE_ITEM_IN_CART:
        return {
          ...state,
          cartProducts: increaseItem(action.payload, state.cartProducts),
        };
      case Actions.DECREASE_ITEM_IN_CART:
        return {
          ...state,
          cartProducts: removeOneItem(action.payload, state.cartProducts),
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

  function addToCart(idFromCartClick, productItems, cartItems) {
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

  function addToWish(idFromWishClick, wishItems, productItems) {
    const productIndex = productItems.findIndex(
      (product) => product.id === idFromWishClick
    );
    const foundInWish = wishItems.findIndex(
      (product) => product.id === idFromWishClick
    );
    if (foundInWish === -1) {
      return [...wishItems, { ...productItems[productIndex], count: 1 }];
    }
    let allItems = [...wishItems];
    const index = allItems.findIndex((item) => item.id === idFromWishClick);
    allItems[index].count += 1;
    return allItems.filter((item) => item.count > 0);
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
    }
    const allItems = cartItems.map((item) =>
      item.id === idFromWish
        ? { ...item, count: item.count + countFromWish }
        : { ...item }
    );
    return allItems.filter((item) => item.count > 0);
  }
  function moveToWish(idFromCart, countFromCart = 1, products, wishItems) {
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

  function removeFromCart(idFromRemoveCart, cartItems) {
    let allItems = [...cartItems];
    let index = allItems.findIndex((item) => item.id === idFromRemoveCart);
    allItems[index].count = 0;

    return allItems.filter((item) => item.count > 0);
  }

  function increaseItem(id, Items) {
    return Items.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : { ...item }
    );
  }
  function removeOneItem(id, Items) {
    let allItems = Items.map((item) =>
      item.id === id ? { ...item, count: item.count - 1 } : { ...item }
    );

    return allItems.filter((item) => item.count > 0);
  }

  return (
    <DataContext.Provider
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
    </DataContext.Provider>
  );
};

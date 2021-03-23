import { WishContext } from "./WishContext";
import { useState } from "react";

export const WishProvider = ({ children }) => {
  const [products] = useState([
    {
      id: 0,
      url:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/4318138/2018/5/4/11525433792765-HERENOW-Men-Black-Printed-Round-Neck-T-shirt-2881525433792598-1.jpg",
      brandName: "Here and Now",
      description: "Black Here and Now T-Shirt",
      price: 1500,
      speedDelivery: false,
      inStock: false,
    },
    {
      id: 1,
      url:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1700944/2019/6/8/972c9498-3a37-4d5d-976c-4493b4d5c0021559989322793-HRX-by-Hrithik-Roshan-Men-Yellow-Printed-Round-Neck-T-Shirt--1.jpg",
      brandName: "HRX by Hrithik",
      description: "Men Yellow Printed T-Shirt",
      price: 600,
      speedDelivery: true,
      inStock: true,
    },
    {
      id: 2,
      url:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2312468/2018/2/21/11519195992929-Roadster-Women-Maroon-Solid-Round-Neck-T-shirt-7951519195992737-1.jpg",
      brandName: "Roadster",
      description: "Women Maroon Solid T-shirt",
      price: 1500,
      speedDelivery: false,
      inStock: true,
    },
    {
      id: 3,
      url:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11900232/2021/2/15/772d4a99-5ea0-40ac-bf21-4c4854708a491613387487527-ether-Men-Red--Navy-Blue-Pure-Cotton-Striped-Polo-Collar-T-s-1.jpg",
      brandName: "Ether",
      description: "Pure cotton polo T-Shirt",
      price: 300,
      speedDelivery: true,
      inStock: false,
    },
    {
      id: 4,
      url:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/13420828/2021/2/18/61a79dc5-805d-4c2f-a5c1-996a78742f531613633242784-US-Polo-Assn-Men-Tshirts-7961613633241342-1.jpg",
      brandName: "US Polo Assn.",
      description: "Men Navy Blue Solid Polo T-shirt",
      price: 550,
      speedDelivery: false,
      inStock: true,
    },
    {
      id: 5,
      url:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11067734/2019/12/10/2c445402-038d-4e7d-b07f-62284a09f4a01575972547961-DILLINGER-Men-Tshirts-4071575972546110-3.jpg",
      brandName: "Dillinger",
      description: "Striped Round Neck T-Shirt",
      price: 450,
      speedDelivery: true,
      inStock: true,
    },
  ]);
  const [wishProducts, setWishProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const addToWish = (idFromWishClick) => {
    const productIndex = products.findIndex(
      (product) => product.id === idFromWishClick
    );
    const foundInWish = wishProducts.findIndex(
      (product) => product.id === idFromWishClick
    );
    if (foundInWish === -1) {
      setWishProducts((wishProds) => [
        ...wishProds,
        { ...products[productIndex], count: 1 },
      ]);
    } else {
      let allItems = [...wishProducts];
      const index = allItems.findIndex((item) => item.id === idFromWishClick);
      allItems[index].count += 1;
      const wishItems = allItems.filter((item) => item.count > 0);
      setWishProducts(wishItems);
    }
  };
  const removeFromWish = (idFromRemoveClick) => {
    let allItems = [...wishProducts];
    let index = allItems.findIndex((item) => item.id === idFromRemoveClick);
    allItems[index].count = 0;

    let cartItems = allItems.filter((item) => item.count > 0);
    setWishProducts(cartItems);
  };

  const moveToCart = (idFromWish, countFromWish = 1) => {
    const productIndex = products.findIndex(
      (product) => product.id === idFromWish
    );
    // const productIndexInWish = wishProducts.findIndex(
    //   (product) => product.id === idFromWish
    // );
    const foundInCart = cartProducts.findIndex(
      (product) => product.id === idFromWish
    );
    if (foundInCart === -1) {
      setCartProducts((cartProducts) => [
        ...cartProducts,
        {
          ...products[productIndex],
          count: countFromWish,
        },
      ]);
    } else {
      let allItems = [...cartProducts];
      const index = allItems.findIndex((item) => item.id === idFromWish);
      allItems[index].count += 1;
      const cartItems = allItems.filter((item) => item.count > 0);
      setCartProducts(cartItems);
    }
    removeFromWish(idFromWish);
  };

  const addToCart = (idFromCartClick) => {
    const productIndex = products.findIndex(
      (product) => product.id === idFromCartClick
    );
    const foundInCart = cartProducts.findIndex(
      (product) => product.id === idFromCartClick
    );
    if (foundInCart === -1) {
      setCartProducts((cartProducts) => [
        ...cartProducts,
        { ...products[productIndex], count: 1 },
      ]);
    } else {
      let allItems = [...cartProducts];
      const index = allItems.findIndex((item) => item.id === idFromCartClick);
      allItems[index].count += 1;
      const cartItems = allItems.filter((item) => item.count > 0);
      setCartProducts(cartItems);
    }
  };
  const removeFromCart = (idFromRemoveCart) => {
    let allItems = [...cartProducts];
    let index = allItems.findIndex((item) => item.id === idFromRemoveCart);
    allItems[index].count = 0;

    let cartItems = allItems.filter((item) => item.count > 0);
    setCartProducts(cartItems);
  };

  const increaseItem = (id) => {
    let allItems = [...wishProducts];
    const index = allItems.findIndex((item) => item.id === id);
    allItems[index].count += 1;
    const wishItems = allItems.filter((item) => item.count > 0);
    setWishProducts(wishItems);
  };
  const removeOneItem = (id) => {
    let allItems = [...wishProducts];
    let index = allItems.findIndex((item) => item.id === id);
    allItems[index].count -= 1;

    let cartItems = allItems.filter((item) => item.count > 0);
    setWishProducts(cartItems);
  };

  return (
    <WishContext.Provider
      value={{
        products,
        wishProducts,
        addToWish,
        removeFromWish,
        increaseItem,
        removeOneItem,
        toast,
        setToast,
        toastMessage,
        setToastMessage,
        cartProducts,
        addToCart,
        removeFromCart,
        moveToCart,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

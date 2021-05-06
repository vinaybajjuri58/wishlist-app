import { Toast } from "./Components";
import axios from "axios";
import { useData, Actions, useAuth } from "./Context";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { RouterComponent } from "./Routes";
import { useEffect } from "react";

const App = () => {
  const { toast, dispatch } = useData();
  const { authState } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const { data: products } = await axios.get(
          `https://ecom-backend-deploy.herokuapp.com/api/products`
        );
        dispatch({
          type: Actions.SET_PRODUCTS_DATA,
          payload: products.products,
        });
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [dispatch]);
  useEffect(() => {
    if (authState.isLoggedIn) {
      (async () => {
        try {
          const { data } = await axios.get(
            `https://ecom-backend-deploy.herokuapp.com/api/cart`
          );
          dispatch({
            type: Actions.SET_CART_DATA,
            payload: data.cartItems,
          });
        } catch (err) {
          console.log({ err });
        }
      })();
    }
  }, [dispatch, authState]);
  useEffect(() => {
    if (authState.isLoggedIn) {
      (async () => {
        try {
          const { data } = await axios.get(
            `https://ecom-backend-deploy.herokuapp.com/api/wishlist`
          );
          dispatch({
            type: Actions.SET_WISHLIST_DATA,
            payload: data.wishlistItems,
          });
        } catch (err) {
          console.log({ err });
        }
      })();
    }
  }, [dispatch, authState]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://ecom-backend-deploy.herokuapp.com/api/categories"
        );
        dispatch({
          type: Actions.SET_CATEGORIES_DATA,
          payload: data.categories,
        });
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <RouterComponent />
      {toast ? <Toast /> : <></>}
    </div>
  );
};

export default App;

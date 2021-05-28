import { Toast } from "./Components";
import axios from "axios";
import { useData, Actions, useAuth } from "./Context";
import "./App.css";
import { RouterComponent } from "./Routes";
import { useEffect } from "react";

const App = () => {
  const { toast, dispatch } = useData();
  const {
    authState: { isLoggedIn, userToken },
  } = useAuth();
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
    if (isLoggedIn) {
      (async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_API}cart`,
            {
              headers: {
                authorization: userToken,
              },
            }
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
  }, [dispatch, userToken, isLoggedIn]);
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_API}wishlist`,
            {
              headers: {
                authorization: userToken,
              },
            }
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
  }, [dispatch, isLoggedIn, userToken]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}categories`
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
      <RouterComponent />
      {toast ? <Toast /> : <></>}
    </div>
  );
};

export default App;

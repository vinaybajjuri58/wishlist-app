import { Toast } from "./Components";
import axios from "axios";
import { useData, Actions } from "./Context";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { RouterComponent } from "./Routes";
import { useEffect } from "react";

const App = () => {
  const { toast, dispatch } = useData();
  useEffect(() => {
    (async () => {
      try {
        const { data: products } = await axios.get(
          "https://ecom-backend-deploy.herokuapp.com/products"
        );
        dispatch({
          type: Actions.SET_PRODUCTS_DATA,
          payload: products.products,
        });
        console.log({ products });
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

import { DataContext } from "./DataContext";
import { useState, useReducer } from "react";
import { reducerFunction } from "./ReducerFunction";
export const initialState = {
  products: [],
  wishProducts: [],
  cartProducts: [],
  categories: [],
};

export const DataProvider = ({ children }) => {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [state, dispatch] = useReducer(reducerFunction, initialState);

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

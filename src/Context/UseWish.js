import { useContext } from "react";
import { DataContext } from "./DataContext";
export const useWish = () => {
  return useContext(DataContext);
};

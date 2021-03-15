import { useContext } from "react";
import { WishContext } from "./WishContext";
export const useWish = () => {
  return useContext(WishContext);
};

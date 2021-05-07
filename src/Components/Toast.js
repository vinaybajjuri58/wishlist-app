import { useEffect } from "react";
import { useData } from "../Context";
export const Toast = () => {
  const { toast, setToast, toastMessage } = useData();
  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      setToast(false);
    }, 1000);
    return () => {
      clearTimeout(toastTimeout);
    };
  }, [toast, setToast]);
  return (
    <div className="snackbar">
      <p>{toastMessage}</p>
    </div>
  );
};

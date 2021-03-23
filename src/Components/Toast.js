import { useEffect } from "react";
import { useWish } from "../Context";
export const Toast = () => {
  const { toast, setToast, toastMessage } = useWish();
  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      setToast(false);
    }, 1000);
    return () => {
      clearTimeout(toastTimeout);
    };
  }, [toast,setToast]);
  return (
    <div
      style={{
        position: "fixed",
        padding: "1rem",
        top: "2rem",
        right: "0.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "grey",
        margin: "20px",
        // border: "10px solid white",
        width: "250px",
        height: "40px",
        color: "white",
      }}
    >
      <p>{toastMessage}</p>
      <button onClick={() => setToast(false)}>X</button>
    </div>
  );
};

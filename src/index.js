import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WishProvider } from "./Context";

ReactDOM.render(
  <React.StrictMode>
    <WishProvider>
      <App />
    </WishProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

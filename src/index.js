import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DataProvider } from "./Context";
import mockServer from "./api/mockServer";
import { BrowserRouter as Router } from "react-router-dom";
mockServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataProvider>
        <App />
      </DataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

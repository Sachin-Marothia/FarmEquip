import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // ✅ Important!
import { BrowserRouter} from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "antd/dist/reset.css";
import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider direction="rtl" locale={enUS}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

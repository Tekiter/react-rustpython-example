import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PythonProvider } from "./python/python.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PythonProvider>
      <App />
    </PythonProvider>
  </React.StrictMode>
);

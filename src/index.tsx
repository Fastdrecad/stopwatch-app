import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StopwatchProvider } from "./context/StopwatchContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StopwatchProvider>
      <App />
    </StopwatchProvider>
  </React.StrictMode>
);

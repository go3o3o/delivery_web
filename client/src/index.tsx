import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { worker } from "./mocks";
import queryClient from "./api/queryClient";
import App from "./App";

if (process.env.NODE_ENV === "development" && !process.env.SERVER_HOST) {
  worker.start();
}

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

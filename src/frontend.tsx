import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import React from "react";

const router = createBrowserRouter(routes);

function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

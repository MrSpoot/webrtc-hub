import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import AppPage from "./pages/app";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import AppProviders from "./provider/AppProvider";

const rootElement = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/app/:serverId/:channelId",
    element: <AppPage />,
  },
  {
    path: "/app/:serverId",
    element: <AppPage />,
  },
  {
    path: "/*",
    element: (
      <div className="flex h-screen w-screen justify-center items-center">
        Not Found
      </div>
    ),
  },
]);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </React.StrictMode>
  );
}

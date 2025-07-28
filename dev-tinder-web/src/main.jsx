import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Feed from "./components/Feed.jsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore.js";
import EditProfile from "./components/EditProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit/profile",
        element: <EditProfile />,
      },
      {
        path: "/",
        element: <Feed />,
      },
    ],
    errorElement: (
      <>
        <h1>Page not found</h1>
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);

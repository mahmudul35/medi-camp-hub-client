import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import MainLayout from "../layout/MainLayout";
import AvailableCamp from "../pages/AvailableCamps/AvailableCamp";
import Home from "../pages/Home/Home";
import DetailsCamp from "../pages/Home/shared/DetailsCamp";
import CryptoLogin from "../pages/Login/Login";
import Register from "../pages/Register/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/availableCamp",
        element: <AvailableCamp />,
      },
      {
        path: "/join-us",
        element: <CryptoLogin />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/camp-details/:id",
        element: <DetailsCamp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
]);

export default router;

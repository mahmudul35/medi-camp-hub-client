import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import MainLayout from "../layout/MainLayout";
import AddCamp from "../pages/Admin/AddCamp";
import ManageCamps from "../pages/Admin/ManageCamp";
import ManageRegisteredCamps from "../pages/Admin/ManageRegisteredCamp";
import ManageUsers from "../pages/Admin/ManageUsers";
import AvailableCamp from "../pages/AvailableCamps/AvailableCamp";
import Home from "../pages/Home/Home";
import DetailsCamp from "../pages/Home/shared/DetailsCamp";
import CryptoLogin from "../pages/Login/Login";
import ParticipantProfile from "../pages/Participant/Profile";
import RegisteredCamps from "../pages/Participant/RegisteredCamp";
import Payment from "../pages/payment/Payment";
import Register from "../pages/Register/Register";
import PrivateRoute from "../private/PrivateRoute";
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
    path: "dashboard/payment",
    element: <Payment />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "addCamp",
        element: (
          <PrivateRoute>
            <AddCamp />
          </PrivateRoute>
        ),
      },
      {
        path: "manageCamp",
        element: (
          <PrivateRoute>
            {" "}
            <ManageCamps />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "manageRegistered",
        element: (
          <PrivateRoute>
            {" "}
            <ManageRegisteredCamps />
          </PrivateRoute>
        ),
      },
      {
        path: "manageUser",
        element: (
          <PrivateRoute>
            {" "}
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "registerdCamp",
        element: (
          <PrivateRoute>
            {" "}
            <RegisteredCamps />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: <ParticipantProfile />,
      },
    ],
  },
]);

export default router;

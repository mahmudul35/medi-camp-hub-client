import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import MainLayout from "../layout/MainLayout";
import AddCamp from "../pages/Admin/AddCamp";
import ManageCamps from "../pages/Admin/ManageCamp";
import ManageRegisteredCamps from "../pages/Admin/ManageRegisteredCamp";
import ManageUsers from "../pages/Admin/ManageUsers";
import AvailableCamp from "../pages/AvailableCamps/AvailableCamp";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import DetailsCamp from "../pages/Home/shared/DetailsCamp";
import CryptoLogin from "../pages/Login/Login";
import Analytics from "../pages/Participant/Analytics";
import ParticipantProfile from "../pages/Participant/Profile";
import RegisteredCamps from "../pages/Participant/RegisteredCamp";
import Payment from "../pages/payment/Payment";
import PaymentHistory from "../pages/payment/PaymentHistory";
import Register from "../pages/Register/Register";
import AdminRoute from "../private/AdminRoute";
import PrivateRoute from "../private/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
          <AdminRoute>
            <AddCamp />
          </AdminRoute>
        ),
      },
      {
        path: "manageCamp",
        element: (
          <AdminRoute>
            {" "}
            <ManageCamps />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "manageRegistered",
        element: (
          <AdminRoute>
            {" "}
            <ManageRegisteredCamps />
          </AdminRoute>
        ),
      },
      {
        path: "manageUser",
        element: (
          <AdminRoute>
            {" "}
            <ManageUsers />
          </AdminRoute>
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
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "profile",
        element: <ParticipantProfile />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
]);

export default router;

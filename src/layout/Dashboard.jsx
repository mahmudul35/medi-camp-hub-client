import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/common/Sidebar";
const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

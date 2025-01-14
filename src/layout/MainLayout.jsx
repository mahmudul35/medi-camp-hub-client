import React from "react";
import { Outlet } from "react-router-dom";
import { ComplexNavbar } from "../component/common/Navbar";
const MainLayout = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <ComplexNavbar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;

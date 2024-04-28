import React from "react";
import SideNav from "./_components/SideNav";

function DashboardLayout({ children }) {
  return (
    <>
      <div className="fixed md:w-64 hidden md:block border shadow-sm">
        <SideNav />
      </div>

      <div className="md:ml-64 bg-green-200">{children}</div>
    </>
  );
}

export default DashboardLayout;

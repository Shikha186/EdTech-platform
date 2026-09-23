import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    // Apply StudySphere theme for background and text
    <div className="flex w-full min-h-screen flex-col bg-background text-foreground font-sans">

      {/* Main Container: Column on mobile (sidebar top, content bottom), Row on desktop */}
      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Dashboard Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-10">
          <div className="mx-auto w-full max-w-[1000px]">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
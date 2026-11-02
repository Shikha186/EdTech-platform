import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { 
  VscAccount, 
  VscMortarBoard, 
  VscArchive, 
  VscSettingsGear,
  VscVm,
  VscAdd,
  VscEditCode
} from "react-icons/vsc";
import {StoreContext} from "../../../StoreContext/StoreContext"
const Sidebar = () => {
  const { user } = useContext(StoreContext);
  const links = [
    {
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: VscAccount,
      type:"Common"
    },
    // --- STUDENT ONLY LINKS ---
    {
      name: "Enrolled Courses",
      path: "/dashboard/enrolled-courses",
      icon: VscMortarBoard,
      type: "Student"
    },
    {
      name: "Cart",
      path: "/dashboard/cart",
      icon: VscArchive,
      type: "Student"
    },
    {
      name: "My Courses",
      path: "/dashboard/my-courses",
      icon: VscVm,
      type: "Instructor"
    },
    {
      name: "Add Course",
      path: "/dashboard/add-course",
      icon: VscAdd,
      type: "Instructor"
    },
    {
      name: "Edit Course",
      path: "/dashboard/edit-course",
      icon: VscEditCode,
      type: "Instructor"
    },
    
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: VscSettingsGear,
      type:"Common"
    },

  ];

  //Filter the links array based on the logged-in user's accountType
  const filteredLinks = links.filter(
    (link) => link.type === "Common" || link.type === user?.accountType
  );

  return (
    <aside className="flex flex-col w-full md:w-[222px] min-h-fit md:min-h-[calc(100vh-3.5rem)] border-r-0 md:border-r border-b md:border-b-0 border-border bg-card py-4 md:py-10">
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible px-4 md:px-0 scrollbar-hide">
        
        {/* Render the dynamically filtered links */}
        {filteredLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-4 md:px-8 py-3 text-sm font-medium transition-all duration-200 flex items-center gap-x-3 whitespace-nowrap rounded-md md:rounded-none
                ${
                  isActive
                    ? "bg-brand-btn-bg text-brand md:border-l-4 md:border-b-0 border-b-4 border-brand"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground md:border-l-4 md:border-b-0 border-b-4 border-transparent"
                }`
              }
            >
              <Icon className="text-lg" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}

        {/* Visual Divider line for desktop */}
        <div className="hidden md:block mx-4 my-2 h-[1px] bg-border"></div>

        {/* Settings is typically pinned to the bottom of the group for all users */}
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `relative px-4 md:px-8 py-3 text-sm font-medium transition-all duration-200 flex items-center gap-x-3 whitespace-nowrap rounded-md md:rounded-none
            ${
              isActive
                ? "bg-brand-btn-bg text-brand md:border-l-4 md:border-b-0 border-b-4 border-brand"
                : "text-muted-foreground hover:bg-muted hover:text-foreground md:border-l-4 md:border-b-0 border-b-4 border-transparent"
            }`
          }
        >
          <VscSettingsGear className="text-lg" />
          <span>Settings</span>
        </NavLink>

      </div>
    </aside>
  );
};

export default Sidebar;

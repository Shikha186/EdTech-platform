import React from "react";
import { NavLink } from "react-router-dom";
import { 
  VscAccount, 
  VscMortarBoard, 
  VscArchive, 
  VscSettingsGear 
} from "react-icons/vsc";

const Sidebar = () => {
  const links = [
    {
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: VscAccount
    },
    {
      name: "Enrolled Courses",
      path: "/dashboard/enrolled-courses",
      icon: VscMortarBoard
    },
    {
      name: "Cart",
      path: "/dashboard/cart",
      icon: VscArchive
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: VscSettingsGear
    },
  ];

  return (
    <aside className="flex flex-col w-full md:w-[222px] min-h-fit md:min-h-[calc(100vh-3.5rem)] border-r-0 md:border-r border-b md:border-b-0 border-border bg-card py-4 md:py-10">
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible px-4 md:px-0">
        {links.map((link) => {
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
      </div>
    </aside>
  );
};

export default Sidebar;
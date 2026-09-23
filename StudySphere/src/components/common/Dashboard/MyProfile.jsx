import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../StoreContext/StoreContext"; // Adjust path as needed

const MyProfile = () => {
  const { user } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-10 text-foreground">
      <h1 className="text-3xl font-semibold">My Profile</h1>

      {/* Section 1: Basic Info */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-md border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName || 'User'}`}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover border border-border"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-foreground">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={() => navigate("/dashboard/settings")}
          className="mt-4 md:mt-0 bg-brand text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-brand-dark transition-colors"
        >
          Edit
        </button>
      </div>

      {/* Section 2: About */}
      <div className="flex flex-col rounded-md border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">About</h2>
          <button 
            onClick={() => navigate("/dashboard/settings")}
            className="bg-brand text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            Edit
          </button>
        </div>
        <p className={`${user?.additionalDetails?.about ? "text-foreground" : "text-muted-foreground"} text-sm font-medium`}>
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Section 3: Personal Details */}
      <div className="flex flex-col rounded-md border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Personal Details</h2>
          <button 
            onClick={() => navigate("/dashboard/settings")}
            className="bg-brand text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            Edit
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 max-w-[500px]">
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-muted-foreground">First Name</p>
            <p className="text-sm font-medium text-foreground">{user?.firstName || "-"}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-muted-foreground">Last Name</p>
            <p className="text-sm font-medium text-foreground">{user?.lastName || "-"}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-sm font-medium text-foreground">{user?.email || "-"}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p className="text-sm font-medium text-foreground">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-muted-foreground">Gender</p>
            <p className="text-sm font-medium text-foreground">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-muted-foreground">Date Of Birth</p>
            <p className="text-sm font-medium text-foreground">{user?.additionalDetails?.dateOfBirth ?? "January 1, 1970"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
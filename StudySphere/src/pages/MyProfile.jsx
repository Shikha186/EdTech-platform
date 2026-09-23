
import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext/StoreContext";
import { VscEdit } from "react-icons/vsc";
import {
  getUserDetails,
  updateProfile,
  updateDisplayPicture,
} from "../services/operations/profileAPI";

const MyProfile = () => {
  // =========================================================
  // STATES
  // =========================================================

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { user, setUser } = useContext(StoreContext);
  
  // Profile Photo States
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    about: "",
    contactNumber: "",
    gender: "",
  });

  const token = localStorage.getItem("token");

  // =========================================================
  // GET USER DETAILS
  // =========================================================
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await getUserDetails(token);
      
      if (response?.data?.success) {
        const user = response.data.userDetails;
        setUserDetails(user);

        const profile = user.additionalDetails || {};
        setFormData({
          dateOfBirth: profile.dateOfBirth
            ? profile.dateOfBirth.split("T")[0]
            : "",
          about: profile.about || "",
          contactNumber: profile.contactNumber || "",
          gender: profile.gender || "",
        });
      }
    } catch (error) {
      console.log("Error while fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // =========================================================
  // IMAGE UPLOAD HANDLERS
  // =========================================================
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const cancelPhotoUpload = () => {
    setImageFile(null);
    setPreviewSource(null);
  };

  const handleFileUpload = async () => {
    try {
      setUploadingImage(true);
      const imageFormData = new FormData();
      imageFormData.append("displayPicture", imageFile); 
      
      const response = await updateDisplayPicture(token, imageFormData);

      if (response?.success) {
        alert("Profile photo updated successfully!");
        setImageFile(null);
        setPreviewSource(null);
        
        // 1. Update the local profile page state
        await fetchUserDetails(); 
        
        // 2. Update the Global Context so the Navbar changes instantly
        // The backend returns the updated user document inside response.data
        const updatedUser = response.data; 
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.log("Error uploading image:", error);
      alert(error?.response?.data?.message || "Could not upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  // =========================================================
  // PROFILE EDIT HANDLERS
  // =========================================================
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    const profile = userDetails?.additionalDetails || {};
    setFormData({
      dateOfBirth: profile.dateOfBirth
        ? profile.dateOfBirth.split("T")[0]
        : "",
      about: profile.about || "",
      contactNumber: profile.contactNumber || "",
      gender: profile.gender || "",
    });
    setEditMode(false);
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      const response = await updateProfile(formData, token);

      if (response?.data?.success) {
        alert("Profile updated successfully!");
        setEditMode(false);
        await fetchUserDetails();
      } else {
        alert(response?.data?.message || "Profile couldn't be updated");
      }
    } catch (error) {
      console.log("Error while updating profile:", error);
      alert(error?.response?.data?.message || "Profile couldn't be updated");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // RENDER CHECKS
  // =========================================================
  if (loading && !userDetails) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground text-lg font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500 font-medium">Unable to load profile.</p>
      </div>
    );
  }

  const profile = userDetails.additionalDetails || {};
  const firstName = userDetails.firstname || "";
  const lastName = userDetails.lastname || "";

  return (
    <div className="mx-auto w-full max-w-4xl text-foreground pb-10">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          Manage your personal information.
        </p>
      </div>

      {/* PROFILE HEADER (PHOTO & EMAIL) */}
      <div className="mb-6 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          
          {/* PROFILE PHOTO WITH EDIT ICON BADGE */}
          <div className="relative flex shrink-0 items-center justify-center self-start sm:self-auto">
            {previewSource || userDetails?.image ? (
              <img
                src={previewSource || userDetails?.image}
                alt={`profile-${firstName}`}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border border-border shadow-md"
              />
            ) : (
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-brand text-2xl sm:text-3xl font-bold text-white shadow-md items-center justify-center">
                {firstName?.charAt(0)}
                {lastName?.charAt(0)}
              </div>
            )}

            {/* Small circular edit badge */}
            <button
              onClick={handleClick}
              title="Change Profile Photo"
              className="absolute bottom-0 right-0 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-brand text-white border-2 border-card hover:bg-opacity-90 transition-transform hover:scale-105 shadow-sm cursor-pointer z-10"
            >
              <VscEdit className="text-sm sm:text-base" />
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>

          {/* NAME + EMAIL + PENDING UPLOAD CONTROLS */}
          <div className="flex flex-col gap-y-2 w-full justify-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">
                {firstName || "User"} {lastName || ""}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground break-all">
                {userDetails.email || "Email not available"}
              </p>
            </div>
            
            {/* Show these buttons only when a new image is selected and waiting to be uploaded */}
            {imageFile && (
              <div className="flex gap-3 mt-2">
                <button
                  onClick={cancelPhotoUpload}
                  disabled={uploadingImage}
                  className="rounded-md border border-border px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFileUpload}
                  disabled={uploadingImage}
                  className="rounded-md bg-brand px-3 py-1.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-opacity-90 shadow-sm disabled:opacity-50"
                >
                  {uploadingImage ? "Uploading..." : "Save Photo"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* COMBINED PROFILE INFORMATION SECTION */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="mb-6 sm:mb-8 flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Profile Information</h2>

          {!editMode && (
            <button
              onClick={handleEdit}
              className="rounded-lg bg-brand px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-90 shadow-sm"
            >
              Edit
            </button>
          )}
        </div>

        <div className="flex flex-col gap-8">
          {/* ABOUT PORTION */}
          <div>
            <p className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">About</p>
            {!editMode ? (
              <p className="leading-7 text-sm sm:text-base font-medium">
                {profile.about ? profile.about : "Add something about yourself."}
              </p>
            ) : (
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Write something about yourself..."
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-background p-3 text-sm sm:text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />
            )}
          </div>

          {/* PERSONAL DETAILS PORTION */}
          <div>
            <p className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Personal Details</p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs sm:text-sm text-muted-foreground">First Name</p>
                <p className="text-sm sm:text-base font-medium">{firstName || "Not added"}</p>
              </div>

              <div>
                <p className="mb-1 text-xs sm:text-sm text-muted-foreground">Last Name</p>
                <p className="text-sm sm:text-base font-medium">{lastName || "Not added"}</p>
              </div>

              <div>
                <p className="mb-1 text-xs sm:text-sm text-muted-foreground">Email</p>
                <p className="break-all text-sm sm:text-base font-medium">{userDetails.email || "Not added"}</p>
              </div>

              <div>
                <p className="mb-1 text-xs sm:text-sm text-muted-foreground">Contact Number</p>
                {!editMode ? (
                  <p className="text-sm sm:text-base font-medium">{profile.contactNumber || "Not added"}</p>
                ) : (
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm sm:text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                  />
                )}
              </div>

              <div>
                <p className="mb-1 text-xs sm:text-sm text-muted-foreground">Gender</p>
                {!editMode ? (
                  <p className="text-sm sm:text-base font-medium">{profile.gender || "Not added"}</p>
                ) : (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm sm:text-base text-foreground outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                )}
              </div>

              <div>
                <p className="mb-1 text-xs sm:text-sm text-muted-foreground">Date of Birth</p>
                {!editMode ? (
                  <p className="text-sm sm:text-base font-medium">
                    {profile.dateOfBirth
                      ? new Date(profile.dateOfBirth).toLocaleDateString()
                      : "Not added"}
                  </p>
                ) : (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm sm:text-base text-foreground outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {editMode && (
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="rounded-lg border border-border bg-transparent px-5 py-2 text-sm sm:text-base font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="rounded-lg bg-brand px-5 py-2 text-sm sm:text-base font-medium text-white transition-colors hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../../StoreContext/StoreContext";
import { VscChevronLeft } from "react-icons/vsc";
import { editCourseDetails } from "../../../../services/operations/courseAPI";

const PublishCourse = () => {
  const { token, course, setStep, setEditCourse, setCourse } = useContext(StoreContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);

  // If the course is already published (during an edit), pre-check the box
  useEffect(() => {
    if (course?.status === "Published") {
      setPublish(true);
    }
  }, [course]);

  const goBack = () => {
    setStep(2);
  };

  const goToCourses = () => {
    // Reset the stepper state and navigate to the My Courses dashboard
    setStep(1);
    setEditCourse(false);
    setCourse(null);
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async (e) => {
    e.preventDefault();

    // Prevent unnecessary API calls if the status hasn't actually changed
    if (
      (course?.status === "Published" && publish) ||
      (course?.status === "Draft" && !publish)
    ) {
      goToCourses();
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = publish ? "Published" : "Draft";
    formData.append("status", courseStatus);

    try {
      const result = await editCourseDetails(formData, token);
      if (result) {
        goToCourses();
      }
    } catch (error) {
      console.error("Error publishing course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md border border-border bg-card p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-white mb-6">Publish Settings</h2>
      
      <form onSubmit={handleCoursePublish}>
        {/* Checkbox */}
        <div className="my-6 mb-8 flex items-center gap-x-3">
          <input
            type="checkbox"
            id="public"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
            className="h-5 w-5 rounded border-border bg-muted accent-brand focus:ring-2 focus:ring-brand"
          />
          <label htmlFor="public" className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-white">
            Make this course public
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-x-3">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-muted px-6 py-2.5 font-semibold text-white transition-all hover:bg-muted/80"
          >
            <VscChevronLeft /> Back
          </button>
          <button
            disabled={loading}
            type="submit"
            className="rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand/90"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
import React, { useState, useContext } from "react";
import { StoreContext } from "../../../../../StoreContext/StoreContext";
import { VscAdd, VscChevronRight, VscChevronLeft } from "react-icons/vsc";
import NestedView from "./NestedView"; 
import { createSection, updateSection } from "../../../../../services/operations/courseAPI";

const CourseBuilderForm = () => {
  const { token, course, setCourse, setStep } = useContext(StoreContext);
  
  const [sectionName, setSectionName] = useState("");
  const [editSectionName, setEditSectionName] = useState(null); 
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (editSectionName) {
        result = await updateSection({
          sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token);
      } else {
        result = await createSection({
          sectionName,
          courseId: course._id,
        }, token);
      }

      if (result) {
        setCourse(result); // Update global state with new section
        setEditSectionName(null);
        setSectionName("");
      }
    } catch (error) {
      console.error("Error saving section:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setSectionName("");
  };

  const goNext = () => {
    if (course?.courseContent?.length === 0) {
      alert("Please add at least one section to your course.");
      return;
    }
    if (course?.courseContent?.some((section) => section.subSection.length === 0)) {
      alert("Please add at least one lecture to every section before publishing.");
      return;
    }
    setStep(3);
  };

  return (
    <div className="space-y-8 rounded-md border border-border bg-card p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-white">Course Builder</h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-white" htmlFor="sectionName">
            Section Name <sup className="text-red-500">*</sup>
          </label>
          <input
            id="sectionName"
            name="sectionName"
            placeholder="Add a section to build your course"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
          />
        </div>
        
        <div className="flex items-end gap-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-x-2 rounded-md bg-brand border border-brand px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-transparent hover:text-brand"
          >
            {editSectionName ? "Edit Section Name" : "Create Section"}
            <VscAdd className="text-lg" />
          </button>
          
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-muted-foreground underline hover:text-white"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={setEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3 mt-10">
        <button
          onClick={() => setStep(1)}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-muted px-6 py-2.5 font-semibold text-white transition-all hover:bg-muted/80"
        >
          <VscChevronLeft /> Back
        </button>
        <button
          onClick={goNext}
          disabled={loading}
          className="flex items-center gap-x-2 rounded-md bg-brand px-6 py-2.5 font-semibold text-white transition-all hover:bg-brand/90"
        >
          Next <VscChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
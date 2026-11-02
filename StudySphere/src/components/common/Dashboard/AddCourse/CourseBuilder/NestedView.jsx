import React, { useState, useContext } from "react";
import { StoreContext } from "../../../../../StoreContext/StoreContext";
import { VscEdit, VscTrash, VscTriangleDown, VscAdd } from "react-icons/vsc";
import { BiVideo } from "react-icons/bi";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseAPI";
import SubSectionModal from "./SubSectionModal"; // <-- 1. Import the modal

const NestedView = ({ handleChangeEditSectionName }) => {
  const { token, course, setCourse } = useContext(StoreContext);

  // 2. MODAL STATES
  const [addSubSection, setAddSubSection] = useState(null);   // Holds sectionId when adding
  const [viewSubSection, setViewSubSection] = useState(null); // Holds lecture object when viewing
  const [editSubSection, setEditSubSection] = useState(null); // Holds lecture object when editing

  // Section Delete Handler
  const handleDeleteSection = async (sectionId) => {
    if (window.confirm("Are you sure you want to delete this section? All lectures inside will be deleted.")) {
      const result = await deleteSection({
        sectionId: sectionId,
        courseId: course._id
      }, token);

      if (result) {
        setCourse(result);
      }
    }
  };

  // Subsection Delete Handler
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    if (window.confirm("Delete this lecture?")) {
      const success = await deleteSubSection({ subSectionId, sectionId }, token);
      if (success) {
        const updatedCourseContent = course.courseContent.map((section) => 
          section._id === sectionId 
            ? { ...section, subSection: section.subSection.filter(sub => sub._id !== subSectionId) }
            : section
        );
        setCourse({ ...course, courseContent: updatedCourseContent });
      }
    }
  };

  return (
    <>
      <div className="rounded-lg bg-muted/25 border border-border p-5 mt-6">
        {course?.courseContent?.map((section) => (
          <div 
            key={section._id} 
            className="mb-4 flex flex-col border-b border-border pb-4 last:border-b-0 last:pb-0 last:mb-0"
          >
            
            {/* ================= SECTION HEADER ================= */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-x-3">
                <VscTriangleDown className="text-muted-foreground" />
                <p className="font-semibold text-white">{section.sectionName}</p>
              </div>
              
              <div className="flex items-center gap-x-3">
                {/* Edit Section Name */}
                <button 
                  onClick={() => handleChangeEditSectionName(section._id, section.sectionName)} 
                  className="text-muted-foreground hover:text-white transition-colors"
                  title="Edit Section Name"
                >
                  <VscEdit className="text-lg" />
                </button>

                {/* Delete Section */}
                <button 
                  onClick={() => handleDeleteSection(section._id)} 
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                  title="Delete Section"
                >
                  <VscTrash className="text-lg" />
                </button>

                <div className="h-5 w-[1px] bg-border mx-2"></div>

                {/* 3. TRIGGER ADD LECTURE MODAL */}
                <button 
                  onClick={() => setAddSubSection(section._id)} 
                  className="flex items-center gap-x-1 text-brand text-sm font-medium hover:text-brand/80 transition-colors"
                >
                  <VscAdd /> Add Lecture
                </button>
              </div>
            </div>

            {/* ================= SUBSECTIONS (Lectures) ================= */}
            <div className="flex flex-col gap-y-2 pl-8 pt-2">
              {section.subSection?.map((data) => (
                <div 
                  key={data._id} 
                  onClick={() => setViewSubSection(data)} // Click row to view
                  className="flex cursor-pointer items-center justify-between border-b border-border/40 py-2 last:border-b-0 hover:bg-muted/10 px-2 rounded"
                >
                  <div className="flex items-center gap-x-3">
                    <BiVideo className="text-brand text-lg" />
                    <p className="text-sm font-medium text-muted-foreground">{data.title}</p>
                  </div>

                  <div className="flex items-center gap-x-3" onClick={(e) => e.stopPropagation()}>
                    {/* Edit Lecture */}
                    <button 
                      onClick={() => setEditSubSection({ ...data, sectionId: section._id })} 
                      className="text-muted-foreground hover:text-white transition-colors"
                      title="Edit Lecture"
                    >
                      <VscEdit className="text-base" />
                    </button>

                    {/* Delete Lecture */}
                    <button 
                      onClick={() => handleDeleteSubSection(data._id, section._id)} 
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                      title="Delete Lecture"
                    >
                      <VscTrash className="text-base" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* ================= RENDER MODAL ================= */}
      {addSubSection ? (
        <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />
      ) : viewSubSection ? (
        <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />
      ) : editSubSection ? (
        <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
      ) : null}
    </>
  );
};

export default NestedView;
import React, { useState, useEffect, useContext } from "react";
import { VscClose} from "react-icons/vsc";
import { VscCloudUpload } from "react-icons/vsc";
import { StoreContext } from "../../../../../StoreContext/StoreContext";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseAPI";

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {
  const { token, course, setCourse } = useContext(StoreContext);
  
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeDuration: "",
  });

  useEffect(() => {
    if (view || edit) {
      setFormData({
        title: modalData.title,
        description: modalData.description,
        timeDuration: modalData.timeDuration,
      });
      setPreviewSource(modalData.videoUrl);
    }
  }, [view, edit, modalData]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewSource(URL.createObjectURL(file));
    }
  };

  const updateCourseState = (updatedSection) => {
    const updatedCourseContent = course.courseContent.map((section) => 
      section._id === updatedSection._id ? updatedSection : section
    );
    setCourse({ ...course, courseContent: updatedCourseContent });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (view) return;
    setLoading(true);

    const finalData = new FormData();
    finalData.append("title", formData.title);
    finalData.append("description", formData.description);
    finalData.append("timeDuration", formData.timeDuration);
    if (videoFile) finalData.append("videoFile", videoFile);

    try {
      if (edit) {
        finalData.append("subSectionId", modalData._id);
        const result = await updateSubSection(finalData, token);
        if (result) {
          // Manually patch the subsection in state
          const updatedCourseContent = course.courseContent.map((section) => {
            if (section._id === modalData.sectionId) {
              return {
                ...section,
                subSection: section.subSection.map((sub) => sub._id === result._id ? result : sub)
              };
            }
            return section;
          });
          setCourse({ ...course, courseContent: updatedCourseContent });
          setModalData(null);
        }
      } else {
        // modalData holds the sectionId when adding
        finalData.append("sectionId", modalData); 
        const result = await createSubSection(finalData, token);
        if (result) {
          updateCourseState(result);
          setModalData(null);
        }
      }
    } catch (error) {
      console.error("Error saving subsection:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-black/50 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-border bg-card shadow-lg">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-muted px-5 py-4">
          <p className="text-xl font-semibold text-white">
            {view ? "Viewing" : add ? "Adding" : "Editing"} Lecture
          </p>
          <button onClick={() => !loading && setModalData(null)}>
            <VscClose className="text-2xl text-muted-foreground hover:text-white" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="space-y-6 px-8 py-6">
          
          {/* Video Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-white">
              Lecture Video <sup className="text-red-500">*</sup>
            </label>
            {previewSource ? (
              <div className="flex flex-col">
                <video src={previewSource} controls className="h-[250px] w-full rounded-md object-cover border border-border"></video>
                {!view && (
                  <button type="button" onClick={() => { setPreviewSource(""); setVideoFile(null); }} className="mt-2 text-sm text-muted-foreground underline hover:text-red-500">
                    Cancel / Re-upload
                  </button>
                )}
              </div>
            ) : (
              <div className="relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dotted border-border bg-muted">
                <div className="grid aspect-square w-14 place-items-center rounded-full bg-secondary/20">
                  <VscCloudUpload className="text-2xl text-secondary" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Drag & drop video or click to Browse</p>
                <input
                  type="file"
                  accept="video/mp4, video/webm, video/ogg"
                  onChange={handleFileChange}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  required={add} // Only require a new file if we are creating a new lecture
                />
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-white" htmlFor="title">Lecture Title <sup className="text-red-500">*</sup></label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleOnChange}
              readOnly={view}
              required
              className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-white" htmlFor="timeDuration">Duration (e.g. 10:30) <sup className="text-red-500">*</sup></label>
            <input
              id="timeDuration"
              name="timeDuration"
              value={formData.timeDuration}
              onChange={handleOnChange}
              readOnly={view}
              required
              className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-white" htmlFor="description">Lecture Description <sup className="text-red-500">*</sup></label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleOnChange}
              readOnly={view}
              required
              rows="3"
              className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
            />
          </div>

          {!view && (
            <div className="flex justify-end">
              <button disabled={loading} type="submit" className="rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand/90">
                {loading ? "Uploading..." : edit ? "Save Changes" : "Save Lecture"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
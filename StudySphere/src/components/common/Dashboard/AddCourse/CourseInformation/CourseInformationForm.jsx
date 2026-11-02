import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../../../../StoreContext/StoreContext";
//import { VscUpload } from "react-icons/vsc";
import { VscCloudUpload } from "react-icons/vsc";
// Import your API functions
import { fetchCourseCategories, addCourseDetails, editCourseDetails } from "../../../../../services/operations/courseAPI";

const CourseInformationForm = () => {
  const { token, step, setStep, course, setCourse, editCourse } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // Form State
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    price: "",
    category: "",
    whatYouWillLearn: "",
  });

  // Specialized State for Tags and Image
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [previewSource, setPreviewSource] = useState("");

  // ==========================================================
  // INITIALIZATION & DRAFT RESUMING
  // ==========================================================
  useEffect(() => {
    // Fetch real categories from the database
    const getCategories = async () => {
      setLoading(true);
      const result = await fetchCourseCategories();
      if (result) {
        setCategories(result);
      }
      setLoading(false);
    };
    getCategories();

    // If editing a draft, pre-fill the form
    if (editCourse && course) {
      setFormData({
        courseName: course.courseName || "",
        courseDescription: course.courseDescription || "",
        price: course.price || "",
        category: course.category?._id || course.category || "",
        whatYouWillLearn: course.whatYouWillLearn || "",
      });
      setTags(course.tags || []);
      setPreviewSource(course.thumbnail || "");
    }
  }, [editCourse, course]);

  // ==========================================================
  // INPUT HANDLERS
  // ==========================================================
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailImage(file);
      // Create a local URL to preview the image before uploading
      const previewUrl = URL.createObjectURL(file);
      setPreviewSource(previewUrl);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleanTag = tagInput.trim().toLowerCase();
      if (cleanTag && !tags.includes(cleanTag)) {
        setTags([...tags, cleanTag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // ==========================================================
  // SUBMISSION LOGIC
  // ==========================================================
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Construct FormData to handle the file payload
    const finalData = new FormData();
    finalData.append("courseName", formData.courseName);
    finalData.append("courseDescription", formData.courseDescription);
    finalData.append("price", formData.price);
    finalData.append("category", formData.category);
    finalData.append("whatYouWillLearn", formData.whatYouWillLearn);
    
    // Arrays must be stringified when sent via FormData
    finalData.append("tags", JSON.stringify(tags));

    if (thumbnailImage) {
      finalData.append("thumbnail", thumbnailImage);
    }

    try {
      if (editCourse) {
        // Appending courseId is required so the backend knows which course to update
        finalData.append("courseId", course._id);
        const result = await editCourseDetails(finalData, token);
        
        if (result) { 
          setCourse(result); 
          setStep(2); // Move to Course Builder
        }
      } else {
        const result = await addCourseDetails(finalData, token);
        
        if (result) { 
          setCourse(result); 
          setStep(2); // Move to Course Builder
        }
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitForm} className="space-y-6 rounded-md border border-border bg-card p-6 shadow-sm">
      
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-white" htmlFor="courseName">
          Course Title <sup className="text-red-500">*</sup>
        </label>
        <input
          id="courseName"
          name="courseName"
          placeholder="Enter Course Title"
          value={formData.courseName}
          onChange={handleOnChange}
          required
          className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
        />
      </div>

      {/* Course Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-white" htmlFor="courseDescription">
          Course Description <sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="courseDescription"
          name="courseDescription"
          placeholder="Enter Course Description"
          value={formData.courseDescription}
          onChange={handleOnChange}
          required
          rows="4"
          className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
        />
      </div>

      {/* Price & Category Row */}
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex w-full flex-col space-y-2">
          <label className="text-sm font-medium text-white" htmlFor="price">
            Price (₹) <sup className="text-red-500">*</sup>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleOnChange}
            required
            className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
          />
        </div>

        <div className="flex w-full flex-col space-y-2">
          <label className="text-sm font-medium text-white" htmlFor="category">
            Category <sup className="text-red-500">*</sup>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleOnChange}
            required
            className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
          >
            <option value="" disabled>Choose a Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tags Input (Custom) */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-white" htmlFor="tags">
          Tags <sup className="text-red-500">*</sup>
        </label>
        
        {/* Render selected tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center gap-1 rounded-full bg-brand/20 px-3 py-1 text-xs text-brand border border-brand/30">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(index)} className="font-bold hover:text-white">×</button>
            </span>
          ))}
        </div>

        <input
          id="tags"
          type="text"
          placeholder="Press Enter or Comma to add tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
        />
      </div>

      {/* Thumbnail Upload */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-white">
          Course Thumbnail <sup className="text-red-500">*</sup>
        </label>
        <div className="relative flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dotted border-border bg-muted">
          {previewSource ? (
            <div className="flex w-full flex-col p-4">
              <img src={previewSource} alt="Preview" className="h-[250px] w-full rounded-md object-cover" />
              <button
                type="button"
                onClick={() => { setPreviewSource(""); setThumbnailImage(null); }}
                className="mt-3 text-muted-foreground hover:text-red-500"
              >
                Cancel / Re-upload
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center p-6 text-center">
              <div className="grid aspect-square w-14 place-items-center rounded-full bg-secondary/20">
                <VscCloudUpload className="text-2xl text-secondary" />
              </div>
              <p className="mt-2 max-w-[200px] text-sm text-muted-foreground">
                Drag and drop an image, or click to <span className="font-semibold text-brand">Browse</span>
              </p>
              <ul className="mt-6 flex list-disc justify-between space-x-12 text-center text-xs text-muted-foreground">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            required={!editCourse}
          />
        </div>
      </div>

      {/* What You Will Learn */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-white" htmlFor="whatYouWillLearn">
          Benefits of the course <sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="whatYouWillLearn"
          name="whatYouWillLearn"
          placeholder="Enter benefits of the course"
          value={formData.whatYouWillLearn}
          onChange={handleOnChange}
          required
          rows="5"
          className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground outline-none focus:border-brand"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-muted px-6 py-2.5 font-semibold text-white transition-all hover:bg-muted/80"
          >
            Continue Without Saving
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-x-2 rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand/90"
        >
          {loading ? "Saving..." : editCourse ? "Save Changes" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default CourseInformationForm;
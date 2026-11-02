import React, { useContext } from "react";
import { VscCheck } from "react-icons/vsc";
import { StoreContext } from "../../../../StoreContext/StoreContext";

// Placeholders for your three forms
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";

const RenderSteps = () => {
  const { step } = useContext(StoreContext);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <>
      {/* STEPPER UI */}
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center">
              <button
                className={`grid aspect-square w-[34px] place-items-center rounded-full border text-[15px] transition-all duration-200
                  ${
                    step === item.id
                      ? "border-brand bg-brand-btn-bg text-brand" // Active step
                      : step > item.id
                      ? "border-brand bg-brand text-white" // Completed step
                      : "border-border bg-muted text-muted-foreground" // Upcoming step
                  }`}
              >
                {step > item.id ? <VscCheck className="font-bold" /> : item.id}
              </button>
            </div>
            
            {/* Dotted Line between steps */}
            {item.id !== steps.length && (
              <div
                className={`h-[calc(34px/2)] w-[33%] border-b-2 border-dashed ${
                  step > item.id ? "border-brand" : "border-border"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between text-center">
        {steps.map((item) => (
          <div className="flex min-w-[130px] flex-col items-center gap-y-2" key={item.id}>
            <p className={`text-sm ${step >= item.id ? "text-white" : "text-muted-foreground"}`}>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* FORM RENDERING LOGIC */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
import React from "react";

const SkelotonPost = () => {
  return (
    <div className="w-[100vw] h-[100vw] max-w-[475px] max-h-[475px] mx-auto">
      <div className=" flex items-center">
        <div className="w-[2.5rem] h-[2.5rem] m-3 rounded-full bg-btn_light dark:bg-btn_dark opacity-70 overflow-hidden">
          <div className="loading-bar"></div>
        </div>
        <div className=" flex flex-col gap-1">
          <div className="w-28 h-3 bg-btn_light dark:bg-btn_dark opacity-70 overflow-hidden">
            <div className="loading-bar"></div>
          </div>
          <div className="w-20 h-3 bg-btn_light dark:bg-btn_dark opacity-70 overflow-hidden">
            <div className="loading-bar"></div>
          </div>
        </div>
      </div>
      <div className="w-[100vw] h-[100vw] max-w-[475px] max-h-[475px] object-cover mx-auto bg-btn_light dark:bg-btn_dark opacity-70 overflow-hidden">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default SkelotonPost;

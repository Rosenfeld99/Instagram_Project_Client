import React from "react";

const SkelotonFollowItem = () => {
  return (
    <div className="flex items-center gap-5">
      <div className="rounded-full w-[50px] h-[50px] bg-btn_light dark:bg-btn_dark overflow-hidden">
        <div className="loading-bar "></div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="w-28 h-4 bg-btn_light dark:bg-btn_dark rounded overflow-hidden">
          <div className="loading-bar "></div>
        </div>
        <div className="w-14 h-4 bg-btn_light dark:bg-btn_dark rounded overflow-hidden">
          <div className="loading-bar "></div>
        </div>
      </div>
    </div>
  );
};

export default SkelotonFollowItem;

import React from "react";

const EmptyGallery = ({ iconType, titleType, content, btnAdd,titleInfo }) => {
  return (
    <div className=" relative flex items-center justify-center flex-col gap-5 text-center px-10 pb-[100px]">
      {titleInfo && (
        <div className=" dark:text-border_color text-sm py-1">
          <p>{titleInfo}</p>
          {/* Only you can see what you've saved */}
        </div>
      )}
      <div
        className={` border-[1.5px] rounded-full p-3 text-4xl text-txt_light border-txt_light dark:text-btn_dark dark:border-btn_dark ${
          true ? "mt-10" : ""
        }`}
      >
        {iconType}
      </div>
      <div className=" text-4xl font-[900]">
        <p>{titleType}</p>
      </div>
      <div>
        <p className=" text-sm font-[500]">{content}</p>
      </div>
      {btnAdd && (
        <div className=" text-btn_follow font-semibold hover:text-opacity-50">
          {btnAdd}
        </div>
      )}
    </div>
  );
};

export default EmptyGallery;

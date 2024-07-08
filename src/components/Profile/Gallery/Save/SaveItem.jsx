import React from "react";

const SaveItem = ({ save }) => {
  return (
    <div className="flex">
      <div className="relative w-full pt-[100%]">
        <img
          src={save}
          className="w-full h-full object-cover absolute top-0 left-0"
          alt="Tailwind CSS Carousel component"
        />
      </div>
    </div>
  );
};

export default SaveItem;
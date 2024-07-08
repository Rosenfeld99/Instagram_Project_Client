import React from "react";

const SubminBtn = ({consdition}) => {
  return (
    <div>
      <button
        className={` bg-btn_follow text-white font-semibold py-2 px-3.5 rounded-md ${
          consdition ? "opacity-50" : null
        } `}
      >
        Submit
      </button>
    </div>
  );
};

export default SubminBtn;

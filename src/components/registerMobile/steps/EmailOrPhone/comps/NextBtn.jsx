import React from "react";

const NextBtn = ({ onNext, condition }) => {
  return (
    <div
      onClick={() => {
        onNext();
      }}
      className={`bg-btn_follow text-white w-full text-center p-2.5 rounded-md ${condition}
    `}
    >
      <button>Next</button>
    </div>
  );
};

export default NextBtn;

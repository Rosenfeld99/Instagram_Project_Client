import React from "react";
import { ImFacebook2 } from "react-icons/im";

const ContinueFacebook = () => {
  return (
    <div className=" flex items-center bg-btn_follow text-white font-semibold p-1.5 rounded-lg gap-2 w-full justify-center">
      <ImFacebook2 />
      <button type="button">
        Continue with Facebook
      </button>
    </div>
  );
};

export default ContinueFacebook;

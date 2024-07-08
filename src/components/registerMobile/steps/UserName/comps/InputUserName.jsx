import React from "react";
import { PiArrowClockwiseBold } from "react-icons/pi";

const InputUserName = ({userName,setUserName}) => {
  return (
    <div className=" bg-btn_light w-full flex items-center rounded border border-category_bio justify-between">
      <div className=" relative w-full">
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          type="text"
          placeholder="UserName"
          // defaultValue={"default userName"}
          className=" bg-transparent p-1 w-full mt-3 text-[12px] outline-none"
        />
        {userName !== "" && (
          <p className=" absolute top-1 left-1 text-[11px] text-txt_all_small">
            UserName
          </p>
        )}
      </div>
      <button
        onClick={() => {
          setUserName("");
        }}
        className=" text-btn_follow text-2xl p-1.5 rotate-45 active:bg-btn_follow active:rounded-full active:text-white"
      >
        <PiArrowClockwiseBold />
      </button>
    </div>
  );
};

export default InputUserName;

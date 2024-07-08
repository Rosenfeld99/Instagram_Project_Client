import React from "react";

const BioInput = ({ register, onInputChange, userPersonale, formData }) => {
  return (
    <div className=" flex flex-col gap-3">
      <label>
        <p className=" text-xl font-semibold">Bio</p>
      </label>
      <textarea
        {...register("bio")}
        className=" resize-none px-2 py-1.5 rounded-sm bg-bgk_light dark:bg-bgk_dark border-[2px] border-[#ccc] dark:border-btn_dark "
        type="text"
        placeholder="Enter bio"
        onChange={onInputChange}
        defaultValue={userPersonale?.bio}
      />
      <p className="text-[11px] font-semibold text-txt_all_small">
        {" "}
        <span
          className={`${formData.bio.length >= 150 ? " text-red-500" : null}`}
        >
          {formData.bio.length} / 150
        </span>
      </p>
    </div>
  );
};

export default BioInput;

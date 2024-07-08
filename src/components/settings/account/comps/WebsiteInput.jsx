import React from "react";

const WebsiteInput = ({register,onInputChange,userPersonale,isWebsiteValid}) => {
  return (
    <div className=" flex flex-col gap-3">
      <label>
        <p className=" text-xl font-semibold">Website</p>
      </label>
      <input
        {...register("website")}
        className=" px-2 py-1.5 rounded-sm bg-btn_light dark:bg-btn_dark border-[2px] border-[#ccc] dark:border-btn_dark"
        type="text"
        placeholder="Website"
        defaultValue={userPersonale?.website}
        onChange={onInputChange}
      />
      <p className="text-[11px] font-semibold text-txt_all_small">
        Editing your links is only available on mobile. Visit the Instagram app
        and edit your profile to change the websites in your bio.
      </p>
    </div>
  );
};

export default WebsiteInput;

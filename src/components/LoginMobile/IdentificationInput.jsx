import React from "react";

const IdentificationInput = ({setIdentification,identification}) => {
  return (
    <div className=" flex items-center w-full bg-btn_light border border-border_color p-2 rounded relative">
      <input
        type="text"
        value={identification}
        placeholder="Phone number, userName, or email"
        className=" bg-transparent w-full outline-none placeholder:text-txt_title text-black"
        onChange={(e) => setIdentification(e.target.value)}
      />
      {identification !== "" ? (
        <p className=" absolute top-[1px] text-[10px] left-2 text-txt_title">
          Phone number, userName, or email
        </p>
      ) : null}
    </div>
  );
};

export default IdentificationInput;

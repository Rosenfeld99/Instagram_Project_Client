import React, { useState } from "react";

const PasswordInput = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className=" flex items-center w-full bg-btn_light border border-border_color p-2 rounded relative text-black">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        placeholder="Password"
        className=" bg-transparent w-full outline-none placeholder:text-txt_title"
        onChange={(e) => setPassword(e.target.value)}
      />
      {password !== "" ? (
        <p className=" absolute top-[1px] text-[10px] left-2 text-txt_title">
          Password
        </p>
      ) : null}

      <button
        className=" font-semibold outline-none"
        onClick={toggleShowPassword}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default PasswordInput;

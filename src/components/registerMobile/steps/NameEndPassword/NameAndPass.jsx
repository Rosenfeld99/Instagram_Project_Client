import React, { useState } from "react";
import PasswordInput from "./comps/PasswordInput";
import NextBtn from "../EmailOrPhone/comps/NextBtn";
import { useNavigate } from "react-router-dom";

const NameAndPass = ({ userSignUp, setUserSignUp }) => {
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const nav = useNavigate();

  const updateUserSignUp = { ...userSignUp };
  const onNext = () => {
    if (fullName === "" || password.length < 6) return;
    (updateUserSignUp.password = password),
      (updateUserSignUp.fullname = fullName),
      setUserSignUp(updateUserSignUp);
    console.log(userSignUp);
    // must be compite this step end go to next step
    nav("/accounts/signup/birthday/");
  };

  return (
    <div className=" flex items-center flex-col p-5 gap-5 bg-white text-black min-h-screen">
      <div className=" font-[500]">
        <p>Enter name and password</p>
      </div>
      <div className=" flex items-center justify-center flex-col gap-4 w-full px-3">
        <div>
          <p className=" text-txt_title">
            Add your name so friends can find you.
          </p>
        </div>
        <div className="flex items-center justify-center flex-col gap-2 w-full relative">
          <input
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            type="text"
            value={fullName}
            placeholder="Full Name"
            className=" w-full bg-btn_light border border-border_color p-2 rounded placeholder:text-txt_title"
          />
          {fullName !== "" ? (
            <p className=" absolute top-[1px] text-[10px] left-2 text-txt_title">
              Full Name
            </p>
          ) : null}
          {/* input password */}
          <PasswordInput password={password} setPassword={setPassword} />
        </div>
        <div className=" w-full">
          <NextBtn
            condition={
              fullName === "" || password.length < 6 ? "opacity-70" : null
            }
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default NameAndPass;

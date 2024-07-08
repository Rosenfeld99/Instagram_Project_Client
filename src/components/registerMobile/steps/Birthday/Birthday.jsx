import React, { useState } from "react";
import NextBtn from "../EmailOrPhone/comps/NextBtn";
import SelectList from "./comps/SelectList";
import { useNavigate } from "react-router-dom";

const Birthday = ({ userSignUp, setUserSignUp }) => {
  const [birthday, setBirthday] = useState({
    month: "",
    day: "",
    year: "",
  });

  const nav = useNavigate();

  const condition =
    birthday.month === "" || birthday.day === "" || birthday.year === "";

  const updateUserSignUp = { ...userSignUp };
  const onNext = () => {
    if (condition) {
      console.log(condition);
      return;
    }
    // TODO key of birthday equal to birthday state
    updateUserSignUp.birthday = birthday;
    setUserSignUp(updateUserSignUp);
    console.log(userSignUp);
    nav("/accounts/signup/username/");
  };
  return (
    <div className=" flex items-center flex-col text-center p-10 gap-2 bg-white text-black min-h-screen">
      <div>
        <img className=" w-[150px]" src="/src/assets/birthday_img.png" alt="" />
      </div>
      <div>
        <p className=" font-semibold">Add Your Birthday</p>
      </div>
      <div className=" flex items-center justify-center flex-col gap-2">
        <div className=" text-center text-[13.5px]">
          <p>
            This won't be a part of your public profile.
            <br />
            <span className=" text-btn_follow">
              Why do i need to provide my birthday?
            </span>
          </p>
        </div>
        {/* select list */}
        <SelectList birthday={birthday} setBirthday={setBirthday} />

        <div className=" text-[12px] text-txt_all_small">
          <p>You need to enter the date you were born</p>
        </div>
        <div className=" text-[12px] text-txt_all_small">
          <p>
            Use your own birthday, even if this account is for a business, a
            pet, or something else
          </p>
        </div>
        <div className=" w-full">
          <NextBtn
            condition={condition ? " opacity-50" : null}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Birthday;

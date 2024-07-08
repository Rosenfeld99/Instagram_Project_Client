import React from "react";

const SelectOption = ({setIsValid,nav,path}) => {
  return (
    <div className=" flex items-center border-b w-full">
      <p
        onClick={() => {
          nav("/accounts/signup/phone"), setIsValid(true);
        }}
        className={
          path === "/accounts/signup/phone"
            ? " font-[700] border-b p-3 border-black w-[50%] text-center"
            : " w-[50%] text-center"
        }
      >
        PHONE
      </p>
      <p
        onClick={() => {
          nav("/accounts/signup/email"), setIsValid(true);
        }}
        className={
          path === "/accounts/signup/email"
            ? " font-[700] border-b p-3 border-black w-[50%] text-center"
            : " w-[50%] text-center"
        }
      >
        EMAIL
      </p>
    </div>
  );
};

export default SelectOption;

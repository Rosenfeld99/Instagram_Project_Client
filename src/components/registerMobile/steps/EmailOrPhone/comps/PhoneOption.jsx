import React from "react";

const PhoneOption = ({setPhone,setIsValid,phone,isValid}) => {
  return (
    <div className=" w-full flex flex-col">
      <input
        onChange={(e) => {
          setPhone(e.target.value), setIsValid(true);
        }}
        className={` w-full rounded-md bg-bgk_account_light p-2.5 border ${
          !isValid ? "border border-red-500" : ""
        }`}
        placeholder="Phone number"
        type="text"
        value={phone}
      />
      {!isValid ? (
        <span className=" text-[13px] ml-2 text-red-500">
          Looks like your phone number may be incorrect. Please try entering
          your full number, including the country code.{" "}
        </span>
      ) : null}
    </div>
  );
};

export default PhoneOption;

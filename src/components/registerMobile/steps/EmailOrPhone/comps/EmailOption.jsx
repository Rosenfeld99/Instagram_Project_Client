import React from "react";
import { arr_addressEmail } from "../../../func/fanc";

const EmailOption = ({setEmail,setIsValid,isValid,email}) => {
  return (
    <div className=" w-full flex flex-col">
      <input
        onChange={(e) => {
          setEmail(e.target.value), setIsValid(true);
        }}
        value={email}
        className={`w-full rounded-md bg-bgk_account_light p-2.5 border ${
          !isValid ? "border border-red-500" : ""
        }
            `}
        placeholder="Email Address"
        type="text"
      />
      {!isValid ? (
        <span className=" text-[13px] ml-2 text-red-500">
          Please enter a valid email address.
        </span>
      ) : null}
      <div className=" flex items-center overflow-auto gap-2 pt-3">
        {arr_addressEmail?.map((adress, i) => (
          <button
            key={i}
            onClick={() => {
              setEmail(adress);
            }}
            className=" bg-btn_light px-3 py-1.5 rounded-md font-[500] text-sm"
          >
            {adress}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmailOption;

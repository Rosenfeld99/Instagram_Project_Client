import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import NavTopMobile from "../../../../utils/NavTopMobile";
import { useNavigate } from "react-router-dom";

const CreateStyle = ({selectedFileName}) => {
  const [open, setOpen] = useState(true);
  console.log(selectedFileName);
  const nav = useNavigate();
  const cenetr1 = <p className=" text-[16px] font-semibold">Profile Photo</p>;
  const right = <p className=" text-[16px] font-semibold">Save</p>;
  return (
    <div className=" absolute top-0 left-0 bg-bgk_light dark:bg-bgk_dark w-full">
      <NavTopMobile
        left={
          <GrClose
            onClick={() => {
              nav(-1);
            }}
          />
        }
        cenetr1={cenetr1}
        right={right}
      />
    </div>
  );
};

export default CreateStyle;

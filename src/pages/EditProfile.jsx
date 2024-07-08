import React from "react";
import NavTopMobile from "../utils/NavTopMobile";
import { CgChevronLeft } from "react-icons/cg";
import FormEditProfile from "../components/settings/account/FormEditProfile";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const title = <p className=" font-semibold">Edit profile</p>;
  const nav = useNavigate();
  return (
    <div>
      <NavTopMobile
        left={
          <CgChevronLeft
            className=" cursor-pointer"
            onClick={() => {
              nav(-1);
            }}
          />
        }
        cenetr1={title}
      />
      <FormEditProfile />
    </div>
  );
};

export default EditProfile;

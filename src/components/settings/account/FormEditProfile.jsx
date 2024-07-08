import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "../../../hooks/useUser";
import GenderInput from "./comps/GenderInput";
import BioInput from "./comps/BioInput";
import WebsiteInput from "./comps/WebsiteInput";
import SubminBtn from "./comps/SubminBtn";
import UpDateImageProfile from "./comps/UpDateImageProfile";

const FormEditProfile = () => {
  const { clearErrors, register, reset, handleSubmit } = useForm();
  const { userPersonale, upDateUserPersonale } = useUser();
  const [consdition, setCondition] = useState(true);
  const [formData, setFormData] = useState({
    website: userPersonale.website || "",
    bio: "",
    gender: userPersonale?.gender || "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
    if (
      formData.website !== userPersonale.website ||
      formData.bio !== userPersonale.bio ||
      formData.gender !== userPersonale.gender
    ) {
      setCondition(false);
    } else setCondition(true);
    if (formData.bio.length > 150) {
      setCondition(true);
    }
  };

  // console.log(userPersonale);
  const onSub = (bodyData) => {
    // TODO validate for uri website
    if (consdition || formData.bio.length >= 150) {
      setCondition(true);
      console.log("this is same value or loocking for validate form");
      // return --> breake funcation to send some value or defrent value
      return;
    }
    bodyData.category = "";
    bodyData.gender = formData.gender;
    console.log(bodyData);
    upDateUserPersonale(bodyData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSub)}
      className=" p-5 flex flex-col gap-5 pt-14 pb-20 overflow-hidden"
    >
      <h1 className=" px-5 text-2xl font-semibold pb-7 pt-1">Edit profile</h1>
      {/* Image Profile Input end show */}
      <UpDateImageProfile />
      {/* Website input */}
      <WebsiteInput
        register={register}
        onInputChange={onInputChange}
        userPersonale={userPersonale}
      />
      {/* Bio text-area */}
      <BioInput
        formData={formData}
        register={register}
        onInputChange={onInputChange}
        userPersonale={userPersonale}
      />
      {/* Gender input */}
      <GenderInput
        upDateUserPersonale={upDateUserPersonale}
        setFormData={setFormData}
        formData={formData}
        register={register}
        onInputChange={onInputChange}
        userPersonale={userPersonale}
      />
      {/* Submit BTN */}
      <SubminBtn consdition={consdition} />
    </form>
  );
};

export default FormEditProfile;

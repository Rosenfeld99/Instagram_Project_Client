import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPhone } from "../../func/fanc";
import SelectOption from "./comps/SelectOption";
import EmailOption from "./comps/EmailOption";
import PhoneOption from "./comps/PhoneOption";
import NextBtn from "./comps/NextBtn";
import ModalError from "../../comps/ModalError";
import axios from "axios";
import { USER_ROUTE } from "../../../../constant/url";

const EmailOrPhone = ({ path, userSignUp, setUserSignUp }) => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [open, setOpen] = useState(false);

  const updateUserSignUp = { ...userSignUp };
  const onNext = () => {
    if (path === "/accounts/signup/phone") {
      setIsValid(isValidPhone(phone));
      if (phone === "" || !isValidPhone(phone)) {
        return;
      }
    } else {
      if (email[0] === "@") {
        setIsValid(false);
        return;
      }
      setIsValid(isValidEmail(email));
    }
    // Check validateion
    if (!isValid || open) return;
    // Build parameters
    else checkAdetification();
  };

  const checkAdetification = async () => {
    try {
      let resp
     if (path === "/accounts/signup/phone") {
      resp = await axios.get(
        USER_ROUTE + `check-parameter/phone/` + phone
      );
     }else{
      resp = await axios.get(
        USER_ROUTE + `check-parameter/email/` + email
      );
     }
      if (resp.data.exists) {
        setOpen(true);
      } else {
        if (path === "/accounts/signup/phone") {
          updateUserSignUp.phone = phone;
          updateUserSignUp.adentification = phone;
        } else {
          updateUserSignUp.email = email;
          updateUserSignUp.adentification = email;
        }

        setUserSignUp(updateUserSignUp);
        console.log(userSignUp);
        // must be compite this step end go to next step
        nav("/accounts/signup/name/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex items-center flex-col gap-7 pt-20 px-10 bg-white text-black min-h-screen ">
      {/* select options Email or Phone */}
      <SelectOption nav={nav} path={path} setIsValid={setIsValid} />

      {path === "/accounts/signup/phone" ? (
        // Phone option
        <PhoneOption
          isValid={isValid}
          phone={phone}
          setIsValid={setIsValid}
          setPhone={setPhone}
        />
      ) : (
        // Email option
        <EmailOption
          email={email}
          isValid={isValid}
          setEmail={setEmail}
          setIsValid={setIsValid}
        />
      )}
      {/* Next step BTN */}
      <NextBtn
        email={email}
        onNext={onNext}
        path={path}
        phone={phone}
        nav={nav}
        condition={`${
          path === "/accounts/signup/email" && email === "" ? "opacity-70" : ""
        }
      ${path === "/accounts/signup/phone" && phone === "" ? "opacity-70" : ""}`}
      />
      {/* if userName allredy is system ? pop modal error to try another userName */}
      {open && <ModalError open={open} setOpen={setOpen} propertyName={path === "/accounts/signup/phone" ? "phone number" : "email"}/>}
    </div>
  );
};

export default EmailOrPhone;

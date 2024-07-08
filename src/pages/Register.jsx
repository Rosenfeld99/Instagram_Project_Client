import React, { useEffect, useState } from "react";
import NavTopMobile from "../utils/NavTopMobile";
import { CgChevronLeft } from "react-icons/cg";

import EmailOrPhone from "../components/registerMobile/steps/EmailOrPhone/EmailOrPhone";
import { useLocation, useNavigate } from "react-router-dom";
import NameAndPass from "../components/registerMobile/steps/NameEndPassword/NameAndPass";
import Birthday from "../components/registerMobile/steps/Birthday/Birthday";
import UserName from "../components/registerMobile/steps/UserName/UserName";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const nav = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const title = <p className=" font-[500]"> Register</p>;
  const [userSignUp, setUserSignUp] = useState({});
  console.log(userSignUp);
  const {status,handelResetStatus} = useAuth()
  useEffect(()=>{
    handelResetStatus()
  },[status])
  
  // TODO confirme to refresh if user try to refresh show moad confirem if confirem sens user tp promo page
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
      {/* render step choose email or phone */}
      {path === "/accounts/signup/phone" && (
        <EmailOrPhone
          userSignUp={userSignUp}
          setUserSignUp={setUserSignUp}
          path={path}
        />
      )}
      {path === "/accounts/signup/email" && (
        <EmailOrPhone
          path={path}
          userSignUp={userSignUp}
          setUserSignUp={setUserSignUp}
        />
      )}

      {/* render step choose name aed pass */}
      {path === "/accounts/signup/name/" && (
        <NameAndPass
          userSignUp={userSignUp}
          setUserSignUp={setUserSignUp}
          path={path}
        />
      )}

      {/* render step choose birthday */}
      {path === "/accounts/signup/birthday/" && (
        <Birthday
          userSignUp={userSignUp}
          setUserSignUp={setUserSignUp}
          path={path}
        />
      )}

      {/* render step choose birthday */}
      {path === "/accounts/signup/username/" && (
        <UserName
          userSignUp={userSignUp}
          setUserSignUp={setUserSignUp}
          path={path}
        />
      )}
    </div>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import PasswordInput from "../components/registerMobile/steps/NameEndPassword/comps/PasswordInput";
import IdentificationInput from "../components/LoginMobile/IdentificationInput";
import ContinueFacebook from "../components/LoginMobile/ContinueFacebook";
import ToSignup from "../components/LoginMobile/ToSignup";
import LoginBtnEndErr from "../components/LoginMobile/LoginBtnEndErr";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../constant/url";

const Login = () => {
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");
  const condition = identification === "" || password.length < 6;
  const { error, loading, signIn, status, handelResetStatus } = useAuth();
  const nav = useNavigate();
  const onLogin = () => {
    if (condition) return;
    const bodyData = {
      adentification: identification,
      password,
    };
    console.log(bodyData);
    handelResetStatus();
    signIn(bodyData);
  };

  useEffect(() => {
    if (!loading && !error && status && localStorage[TOKEN_KEY]) {
      nav("/");
      handelResetStatus()
    }
  }, [loading, error, status, localStorage[TOKEN_KEY]]);

  return (
    <div
      className={`flex items-center flex-col justify-center gap-7 py-20 px-15 bg-white min-h-screen ${
        error ? "p-10" : "p-20"
      } `}
    >
      <div className=" w-52">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
          alt="instagram logo"
        />
      </div>
      {/* continue with facebook */}
      <ContinueFacebook />
      <div className=" relative items-center flex gap-2.5 w-full flex-col border-t border-border_color border-[1.5px]">
        <p className=" absolute top-[-12.5px] text-txt_all_small bg-white px-5 font-semibold">
          OR
        </p>
      </div>
      <div className=" w-full flex items-center justify-center flex-col gap-1.5 text-[12px]">
        {/* input idetification */}
        <IdentificationInput
          identification={identification}
          setIdentification={setIdentification}
        />

        {/* input password */}
        <PasswordInput password={password} setPassword={setPassword} />
      </div>
      <div className=" text-center flex flex-col gap-5 w-full">
        <p className=" text-end text-btn_follow text-sm">Forget password?</p>
        {/* Btn login end if have error on login ? show error : login */}
        <LoginBtnEndErr condition={condition} onLogin={onLogin} />

        {/* if have an account go to sigenup */}
        <ToSignup />
      </div>
    </div>
  );
};

export default Login;

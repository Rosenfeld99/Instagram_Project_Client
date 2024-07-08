import React from "react";
import useAuth from "../../hooks/useAuth";
import LoadingBtn from "../registerMobile/comps/LoadingBtn";

const LoginBtnEndErr = ({onLogin,condition}) => {
  const {error,loading} = useAuth()
  return (
    <div className=" relative">
      {loading && <LoadingBtn/>}
      <button
        onClick={onLogin}
        className={` bg-btn_follow w-full p-1.5 text-white font-semibold rounded-lg ${
          condition ? " opacity-50" : null
        }`}
      >
        Log in
      </button>
      {error && (
        <div className=" text-red-600 text-sm">
          <p>
            Sorry, your password was incorrect. Please double-check your
            password.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginBtnEndErr;

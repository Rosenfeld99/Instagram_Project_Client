import React from "react";
import { Link } from "react-router-dom";

const ToSignup = () => {
  return (
    <p className=" text-txt_all_small text-sm w-full">
      Don't have an account?{" "}
      <Link
        to={"/accounts/signup/phone"}
        className=" text-btn_follow font-semibold"
      >
        Sign up
      </Link>
    </p>
  );
};

export default ToSignup;

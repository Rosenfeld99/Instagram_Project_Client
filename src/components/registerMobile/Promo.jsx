import React from "react";
import { Link } from "react-router-dom";

const Promo = () => {
  return (
    <div className=" flex items-center flex-col justify-center h-screen gap-6 p-10 bg-white text-black">
      <div className=" w-44">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
          alt=""
        />
      </div>
      <p className=" text-2xl font-[400] text-center">
        Sign up to see <span className=" text-txt_promo">photos</span> and{" "}
        <span className=" text-txt_promo">videos</span> from your friends.
      </p>
      <div className="items-center flex gap-2.5">
        <Link to={"/login"}>
          <p className=" text-btn_follow font-semibold">Log in</p>
        </Link>
        <p>or</p>
        <Link to={"/accounts/signup/phone"}>
          <p className=" text-btn_follow font-semibold">Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default Promo;

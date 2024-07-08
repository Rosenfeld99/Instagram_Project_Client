import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className=" flex items-center justify-center flex-col gap-10 font-semibold pt-20 bg-bgk_light dark:bg-bgk_dark text-txt_light dark:to-txt_dark">
      <p className=" text-2xl">Sorry, this page isn't available.</p>
      <p className=" text-center px-9">
        The link you followed may be broken, or the page may have been removed.
        <Link to={'/'} className=" cursor-pointer text-btn_follow">Go back</Link> to Instagram.
      </p>
    </div>
  );
};

export default Page404;

import React from "react";
import { IoIosSettings } from "react-icons/io";
import SquareImage from "../components/Profile/Home/ShowSuggest/Card/comps/SquareImage";
import UserProfile from "../components/Profile/UserProfile";
import ContactInfo from "./ContactInfo";

const HeaderMobile = ({
  userName,
  icon,
  btn1,
  btn2,
  btn3,
  btn4,
  profileImage,
  data

}) => {
  // console.log(profileImage);
  return (
    <div className=" flex items-center w-full px-5 py-7 pt-12">
      <div>
        <SquareImage
          src={profileImage}
          alt={userName}
          rounded="rounded-full"
          size="w-[80px] h-[80px] md:w-[150px] md:h-[150px]"
        />
      </div>
      <div className=" pl-5 grid gap-3 xl:gap-5 w-full max-w-[310px] xl:w-full xl:flex xl:items-center">
        <div className=" flex items-center gap-3 text-[1.5rem]">
          {userName}
          {/* <span className=" xl:hidden">{icon}</span> */}
        </div>
        <div className=" flex gap-3 w-full xl:h-9">
          {btn1 && (
            <button
              type="button"
              className={
                btn1 !== "Follow"
                  ? " dark:bg-btn_dark bg-btn_light block rounded-md w-full xl:w-28 text-nowrap"
                  : " bg-btn_follow block rounded-md w-full"
              }
            >
              {btn1}
            </button>
          )}
          {btn2 && (
            <button
              type="button"
              className=" dark:bg-btn_dark bg-btn_light block p-1 rounded-md w-full xl:w-28 text-nowrap"
            >
              {btn2}
            </button>
          )}
          {btn3 && (
            <button
              type="button"
              className=" dark:bg-btn_dark bg-btn_light block px-2 rounded-md w-fit xl:w-28 text-nowrap"
            >
              {btn3}
            </button>
          )}
        </div>
        <div>
          {btn4 && (
            <button
              type="button"
              className=" dark:bg-btn_dark bg-btn_light xl:h-9 p-1 flex items-center justify-center xl:p-2 rounded-md w-full xl:w-28 text-nowrap"
            >
              {btn4}
            </button>
          )}
        </div>
        <div className=" hidden xl:flex items-center gap-3 text-[1.5rem]">
          {icon}
        </div>
        
        <div className="hidden md:flex md:flex-col xl:absolute xl:top-40">
          <UserProfile user={data?.user} />
          <ContactInfo
            title={"some title"}
            category={"E-commerce"}
            decription={data?.user?.bio}
            link={"https://translate.google.com"}
          />
        </div>
      </div>
      
    </div>

  );
};

export default HeaderMobile;

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = ({ user }) => {
  const nav = useNavigate();
  const { userName } = useParams();
  return (
    <div className=" flex items-center justify-around md:justify-start md:gap-10 border-t-2 border-b-2 md:border-t-0 md:border-b-0 dark:border-t-[1.5px] dark:border-b-[1.5px] md:dark:border-b-0 md:dark:border-t-0  py-2.5 dark:border-btn_dark border-btn_light">
      <div onClick={()=>nav(`/${userName}/`)} className=" flex items-center flex-col md:flex-row md:gap-3">
        <p className=" font-bold">{user?.grid?.length}</p>
        <p className="dark:text-category_bio text-txt_title">posts</p>
      </div>
      <div
        onClick={() => nav(`/${user?.username}/followers`)}
        className=" flex items-center flex-col md:flex-row md:gap-3"
      >
        <p className=" font-bold">{user?.followers}</p>
        <p className="dark:text-category_bio text-txt_title">followers</p>
      </div>
      <div
        className=" flex items-center flex-col md:flex-row md:gap-3"
        onClick={() => nav(`/${user?.username}/following`)}
      >
        <p className=" font-bold">{user?.following}</p>
        <p className="dark:text-category_bio text-txt_title">following</p>
      </div>
    </div>
  );
};

export default UserProfile;

import React from "react";
import {
  BiBookmark,
  BiGrid,
  BiMoviePlay,
  BiSquareRounded,
  BiUserPin,
} from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GridList from "../Gallery/Grid/GridList";
import FeedList from "../Gallery/Feed/FeedList";
import ReelList from "../Gallery/Reel/ReelList";
import SaveList from "../Gallery/Save/SaveList";

const NavGalleryMobile = ({ userName }) => {
  const navGallery = [
    { name: "grid", icon: <BiGrid />, path: `/${userName}/` },
    { name: "feed", icon: <BiSquareRounded />, path: `/${userName}/feed/` },
    { name: "reels", icon: <BiMoviePlay />, path: `/${userName}/reels/` },
    { name: "saved", icon: <BiBookmark />, path: `/${userName}/saved/` },
    { name: "tagged", icon: <BiUserPin />, path: `/${userName}/tagged/` },
  ];
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  return (
    <div>
      <div className=" flex items-center justify-around md:justify-center md:gap-10 text-[1.7rem] my-4 md:border-t-2 dark:border-btn_dark border-btn_light">
        {navGallery.map((item, i) => (
          <div
            key={i}
            className={` md:flex md:items-center md:gap-2 md:py-4 ${currentPath === item.path && "md:border-t-2 border-btn_dark dark:border-btn_light"} ${currentPath === item.path ? " text-btn_follow" : " dark:text-category_bio text-txt_title"}`}
            onClick={() => {
              nav(item?.path);
            }}
          >
            {item?.icon}
            <span className=" text-sm hidden md:flex">{item?.name}</span>
          </div>
        ))}
      </div>
      {currentPath === `/${userName}/` && <GridList />}
      {currentPath === `/${userName}/feed/` && <FeedList />}
      {currentPath === `/${userName}/reels/` && <ReelList />}
      {currentPath === `/${userName}/saved/` && <SaveList />}
      {/* TODO tagged lost end empty Gallery if ont resoult in tagged */}
    </div>
  );
};

export default NavGalleryMobile;

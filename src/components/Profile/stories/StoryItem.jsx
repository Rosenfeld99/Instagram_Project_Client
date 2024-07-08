import React from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_PROFILE } from "../../../constant/url";

const StoryItem = ({ item, path, imgUrl, name }) => {
  // console.log(item);
  const nav = useNavigate();
  return (
    <div
      onClick={() =>
        nav(`/stories/${item?.username}/${item?.storyActive[0]?._id}/`)
      }
      className=" flex items-center flex-col gap-1.5 min-w-max relative mx-4"
    >
      <img
        className={`${
          path === "/"
            ? "z-30 border-[2px] dark:border-bgk_dark border-bgk_light object-cover rounded-full w-[4rem] h-[4rem]"
            : " border-[1px] p-0.5 object-cover rounded-full w-[4rem] h-[4rem]"
        }`}
        src={item?.profileImage != "" ? imgUrl : DEFAULT_IMAGE_PROFILE}
        alt=""
      />
      {path === "/" ? (
        <div className="p-[3px] gradiant absolute rounded-full w-[4.4rem] h-[4.4rem] top-[-3px] z-20"></div>
      ) : null}
      <p>
        {name?.substring(0, 8)}
        {name?.length > 10 ? "..." : null}
      </p>
    </div>
  );
};

export default StoryItem;

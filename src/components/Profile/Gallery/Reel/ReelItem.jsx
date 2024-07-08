import React from "react";
import { BiMoviePlay } from "react-icons/bi";

const ReelItem = ({reel}) => {
  return (
    <div className="flex">
      <div className="relative w-full pt-[140%]">
        <img
          src={reel}
          className="w-full h-[100%] object-cover absolute top-0 left-0 z-30"
          alt="Tailwind CSS Carousel component"
        />
        <div className=" text-white z-30 absolute top-0 right-0 text-[1.5rem] pr-[10%] pt-[7%]">

        <BiMoviePlay/>
        </div>
      </div>
    </div>
  );
};

export default ReelItem;

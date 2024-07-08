import React from "react";
import SquareImage from "../../Home/ShowSuggest/Card/comps/SquareImage";
import { DEFAULT_IMAGE_PROFILE } from "../../../../constant/url";
import { AiOutlineHeart } from "react-icons/ai";

const CardComment = ({ showMsg, setShowMsg, btnMore, item }) => {
  console.log(item);
  return (
    <div className=" flex py-5 mx-2 gap-3">
      <div>
        <SquareImage
          src={
            item?.profileImage === ""
              ? DEFAULT_IMAGE_PROFILE
              : item?.profileImage
          }
          alt={item?.username}
          rounded="rounded-full"
          size="w-[2.5rem] h-[2.5rem]"
        />
      </div>
      <div className=" text-sm flex items-center justify-between w-full">
        <div className="">
          <div className=" flex items-center">
            <div className=" font-semibold">{item?.username} </div>
            <div className=" text-category_bio pl-3">time</div>
          </div>

          <div
            onClick={() => {
              setShowMsg(true);
            }}
            className=" font-[400]"
          >
            {!showMsg ? item?.comment?.substring(0, 100) : item?.comment}
            {!showMsg && item?.comment?.length > 100 ? btnMore : null}
          </div>
        </div>
        <div>
          <AiOutlineHeart />
        </div>
      </div>
    </div>
  );
};

export default CardComment;

import React, { useState } from "react";
import LoadingBtn from "../../../registerMobile/comps/LoadingBtn";
import SquareImage from "../../Home/ShowSuggest/Card/comps/SquareImage";
import { DEFAULT_IMAGE_PROFILE, USER_ROUTE } from "../../../../constant/url";
import { apiMethod } from "../../../../services/services";
import useUser from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const FollowerItem = ({ item }) => {
  const { userPersonale, handelUpdateStateUserPersonale } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const nav = useNavigate();

  const handleRemoveClick = async (event) => {
    event.stopPropagation();
    console.log(item);
    setLoading(true);
    try {
      const _url = USER_ROUTE + "/followers/removedFollower/" + item._id;
      const data = await apiMethod(_url, "PATCH", {});
      if (data?.followers) {
        console.log("remove this followers");
        setIsRemove(true);
      }
      // handelUpdateStateUserPersonale(data?.user);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-between w-full">
      <div
        onClick={() => nav(`/${item?.username}/`)}
        className=" flex items-center gap-5"
      >
        <div>
          <SquareImage
            src={
              item?.profileImage ? item?.profileImage : DEFAULT_IMAGE_PROFILE
            }
            alt={"some alt"}
            rounded="rounded-full"
            size="w-[50px] h-[50px]"
          />
        </div>
        <div className=" text-sm">
          <p className=" font-semibold">{item?.username}</p>
          <p>{item?.fullname}</p>
        </div>
      </div>
      <div>
        <button
          onClick={handleRemoveClick}
          className={`relative bg-btn_light dark:bg-btn_dark font-semibold w-20 rounded-lg p-1.5 mt-2 dark:text-txt_dark text-txt_light h-8 text-sm ${
            isRemove ? " opacity-50" : null
          }`}
        >
          {loading ? (
            <div className=" absolute top-0 left-[35%]">
              <LoadingBtn />
            </div>
          ) : (
            "Remove"
          )}
        </button>
      </div>
    </div>
  );
};

export default FollowerItem;

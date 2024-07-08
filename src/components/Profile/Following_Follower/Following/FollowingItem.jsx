import React, { useState } from "react";
import LoadingBtn from "../../../registerMobile/comps/LoadingBtn";
import SquareImage from "../../Home/ShowSuggest/Card/comps/SquareImage";
import { DEFAULT_IMAGE_PROFILE, USER_ROUTE } from "../../../../constant/url";
import { apiMethod } from "../../../../services/services";
import useUser from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const FollowingItem = ({ item }) => {
  const { userPersonale, handelUpdateStateUserPersonale } = useUser();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleFollowClick = async (event) => {
    event.stopPropagation();
    console.log(item?._id);
    setLoading(true);
    try {
      const _url = USER_ROUTE + "toggelFollow/" + item._id;
      const dataToggelFoolow = await apiMethod(_url, "PATCH", {});
      if (dataToggelFoolow?.user?.following?.includes(item._id)) {
        console.log("add new follow");
      } else console.log("remove this follow");
      handelUpdateStateUserPersonale(dataToggelFoolow?.user);
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
        {userPersonale?.following?.includes(item?._id) ? (
          <button
            onClick={(event) => handleFollowClick(event, item?._id)}
            className=" relative bg-btn_light dark:bg-btn_dark font-semibold w-28 rounded-lg p-1.5 mt-2 dark:text-txt_dark text-txt_light h-8 px-5 text-sm"
          >
            {loading ? (
              <div className=" absolute top-0 left-[40%]">
                <LoadingBtn />
              </div>
            ) : (
              "Following"
            )}
          </button>
        ) : (
          <button
            onClick={(event) => handleFollowClick(event, item?._id)}
            className=" relative bg-btn_follow font-semibold rounded-lg p-1.5 w-20 mt-2 text-txt_dark dark:to-txt_light h-8 px-5 text-sm"
          >
            {loading ? (
              <div className=" absolute top-0 left-[35%]">
                <LoadingBtn />
              </div>
            ) : (
              "Follow"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FollowingItem;

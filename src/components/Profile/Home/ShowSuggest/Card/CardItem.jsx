import React, { useState } from "react";
import SquareImage from "./comps/SquareImage";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_PROFILE, USER_ROUTE } from "../../../../../constant/url";
import { apiMethod } from "../../../../../services/services";
import useUser from "../../../../../hooks/useUser";
import LoadingBtn from "../../../../registerMobile/comps/LoadingBtn";
import { PiCamera } from "react-icons/pi";
const CardItem = ({ item }) => {
  const { handelUpdateStateUserPersonale, userPersonale } = useUser();
  const [renderImages, setRenderImages] = useState(
    item?.posts[0]?.images[0]?.url ||
      item?.posts[1]?.images[1]?.url ||
      item?.posts[2]?.images[2]?.url
  );
  console.log(renderImages);
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleFollowClick = async (event) => {
    event.stopPropagation(); // מונע את ההפניה המקורית של הלחיצה
    console.log(item);
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
    <div
      onClick={() => nav(`/${item?.username}/`)}
      className=" relative max-h-[500px] flex items-center justify-center flex-col gap-10 bg-bgk_light dark:bg-bgk_dark shadow-xl py-5 rounded-3xl w-fit"
    >
      <p className=" absolute top-5 right-2 text-category_bio text-2xl">
        <IoIosClose />
      </p>
      <div className=" flex items-center justify-center flex-col gap-2 min-w-[255px]">
        <SquareImage
          alt={"some image"}
          rounded={" rounded-full"}
          size={" w-[85px] h-[85px]"}
          src={
            item?.profileImage === ""
              ? DEFAULT_IMAGE_PROFILE
              : item?.profileImage
          }
        />
        <p>{item?.username}</p>
        <p className="text-md font-semibold text-category_bio">
          {item?.fullname}
        </p>
        <div className=" flex items-center justify-center w-full min-w-[255px] min-h-[85px] gap-0.5">
          {renderImages ? (
            <>
              {item?.posts[0]?.images[0]?.url && (
                <SquareImage
                  alt={"some image"}
                  size={" w-[85px] h-[85px]"}
                  src={item?.posts[0]?.images[0]?.url}
                />
              )}
              {item?.posts[1]?.images[0]?.url && (
                <SquareImage
                  alt={"some image"}
                  size={" w-[85px] h-[85px]"}
                  src={item?.posts[1]?.images[0]?.url}
                />
              )}
              {item?.posts[2]?.images[0]?.url && (
                <SquareImage
                  alt={"some image"}
                  size={" w-[85px] h-[85px]"}
                  src={item?.posts[2]?.images[0]?.url}
                />
              )}
            </>
          ) : (
            <div className=" flex items-center justify-center px-4 gap-4">
              <div className=" text-2xl border rounded-full p-2 text-category_bio dark:text-btn_dark border-category_bio dark:border-btn_dark">
                <PiCamera />
              </div>
              <div className=" text-xs">
                <div>
                  <p className=" font-semibold">No Posts Yet</p>
                </div>
                <div>
                  <p className="dark:text-category_bio">
                    When {item?.username} posts you'll see their photos end videos here
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" w-full text-center px-5">
        <p className=" text-sm text-category_bio">פופולרי</p>
        {!userPersonale?.following?.includes(item?._id) ? (
          <button
            onClick={handleFollowClick}
            className=" relative bg-btn_follow font-semibold w-full rounded-lg p-1.5 mt-2 text-txt_dark dark:to-txt_light h-8"
          >
            {loading ? <LoadingBtn /> : "Follow"}
          </button>
        ) : (
          <button
            onClick={handleFollowClick}
            className=" relative bg-btn_light dark:bg-btn_dark font-semibold w-full rounded-lg p-1.5 mt-2 dark:text-txt_dark text-txt_light h-8"
          >
            {loading ? <LoadingBtn /> : "Following"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardItem;

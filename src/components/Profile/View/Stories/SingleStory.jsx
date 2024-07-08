import React, { useEffect, useState } from "react";
import SquareImage from "../../Home/ShowSuggest/Card/comps/SquareImage";
import { BiDotsHorizontalRounded, BiVolumeMute } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { DEFAULT_IMAGE_PROFILE, USER_ROUTE } from "../../../../constant/url";
import { apiGet } from "../../../../services/services";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SingleStory = () => {
  const { userName, storyId } = useParams();
  const [singleStory, setSingleStory] = useState(null);
  const [steps, setSteps] = useState(1);
  const [timeDifference, setTimeDifference] = useState(null); // time Difference
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timeStory, setTimeStory] = useState(true);
  const location = useLocation();
  const path = location.pathname;

  const getStories = async () => {
    try {
      setLoading(true);
      const _url = USER_ROUTE + "singleStoy/" + userName + "/" + storyId;
      const { data } = await apiGet(_url);
      setSingleStory(data);
      console.log(singleStory);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (path === "/") return;
    getStories();
    // setTimeout(() => {
    //   if (singleStory?.otherIds?.length === 1) {
    //     console.log("log");
    //     nav(-1);
    //   }
    //   handelSteps("R");
    // }, 5000);
  }, [storyId, steps]);

  useEffect(() => {
    if (singleStory?.single) {
      const storyDate = new Date(singleStory?.single?.created); // date of story
      const currentDate = new Date(); // current date

      const timeDifference = Math.floor(
        (currentDate - storyDate) / (1000 * 60 * 60) // miliseconds for houres
      );
      setTimeDifference(timeDifference);
    }
  }, [singleStory, storyId]);

  console.log(singleStory);

  const handelSteps = (side) => {
    if (side === "L" && steps === 0) return;
    if (side === "R" && steps === singleStory?.otherIds?.length === 1) {
      nav("/");
      return;
    }
    if (side === "L") {
      setSteps(steps - 1);
      setTimeStory(false);
      setTimeout(() => {
        setTimeStory(true);
      }, 100);
      // nav(`/stories/${userName}/${singleStory.otherIds[steps]}`);
      nav(-1);
    }
    if (side === "R") {
      setSteps(steps + 1);
      nav(`/stories/${userName}/${singleStory?.otherIds[steps]}`);
      setTimeStory(false);
      setTimeout(() => {
        setTimeStory(true);
      }, 100);
    }
    console.log(steps);
  };

  return (
    <div className=" bg-[#111111] absolute z-50 w-full min-h-screen text-white">
      <div className=" flex items-center w-full px-4 gap-1">
        <div className="  relative pt-6 w-full overflow-hidden">
          <div
            className={` bg-white h-1 border-[#ffffff] w-full absolute ${
              timeStory ? "setTime-story" : null
            }`}
          ></div>
          <div className=" border-2 border-[#656464]"></div>
        </div>
      </div>
      <div className=" flex items-center justify-between p-4">
        <div className=" flex items-center gap-3">
          <SquareImage
            src={
              singleStory?.single?.profileImage
                ? singleStory?.single?.profileImage
                : DEFAULT_IMAGE_PROFILE
            }
            alt={userName}
            rounded="rounded-full"
            size="w-[2.5rem] h-[2.5rem]"
          />
          <p className=" font-semibold text-sm">{userName}</p>
          {timeDifference > 1 ? (
            <p className=" text-[#848383]">{timeDifference + "h"}</p>
          ) : (
            <p className=" text-[#848383]">now</p>
          )}
        </div>
        <div className=" flex items-center gap-3">
          <div className=" text-3xl">
            <BiDotsHorizontalRounded />
          </div>
          <div className=" text-xl">
            <BiVolumeMute />
          </div>
          <div className=" text-3xl">
            <MdClose onClick={() => nav("/")} />
          </div>
        </div>
      </div>
      {!loading && (
        <div className=" w-full min-h-max">
          <img
            className="w-full min-h-[70vh] max-h-screen object-cover"
            src={singleStory?.single?.url}
            alt=""
          />
        </div>
      )}
      <div className=" flex absolute top-[50%] justify-between w-full text-4xl">
        <div
          className=" bg-red-500 p-3 rounded"
          onClick={() => handelSteps("L")}
        >
          L
        </div>
        <div
          className=" bg-red-500 p-3 rounded"
          onClick={() => handelSteps("R")}
        >
          R
        </div>
      </div>
      <div className=" w-full h-20"></div>
    </div>
  );
};

export default SingleStory;

import React, { useEffect, useState } from "react";
import { CgChevronLeft } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiMethod } from "../services/services";
import { USER_ROUTE } from "../constant/url";
import NavTopMobile from "../utils/NavTopMobile";
import FollowingItem from "../components/Profile/Following_Follower/Following/FollowingItem";
import SkelotonFollowList from "../components/animation/Skelotons/Follow/SkelotonFollowList";
import useUser from "../hooks/useUser";

const Notifications = () => {
  const {
    usersSuggestedAccounts,
    getSuggested,
    userPersonale,
    handelUpdateStateUserPersonale,
  } = useUser();
  const [dataList, setDataList] = useState(null);
  const [loadin, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    getNotificationsList();
    getSuggested();
    resetNotifications();
  }, []);

  const resetNotifications = async () => {
    try {
      const _url = USER_ROUTE + "resetNotifications";
      const data = await apiMethod(_url, "PATCH", {});
      if (data?.user) {
        console.log("reset ");
        handelUpdateStateUserPersonale(data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotificationsList = async () => {
    try {
      const _url = USER_ROUTE + "getNotificationList/";
      const { data } = await apiGet(_url);
      console.log(data);
      setDataList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const center = (
    <p className=" font-semibold absolute left-[50%] translate-x-[-50%]">
      Notifications
    </p>
  );
  return (
    <div>
      <div>
        <NavTopMobile
          left={<CgChevronLeft onClick={() => nav(-1)} />}
          cenetr1={center}
        />
      </div>
      <div className="pt-14 flex items-center justify-center flex-col gap-5 p-5">
        {dataList?.newFollowers?.length > 0 ? (
          <div className=" w-full flex flex-col gap-5 pb-5">
            <div className="font-semibold">
              <p>New followers</p>
            </div>
            {dataList?.newFollowers?.length > 0 ? (
              <div className=" flex items-center justify-center flex-col w-full gap-5">
                {dataList?.newFollowers?.map((item) => (
                  <FollowingItem item={item} key={item?._id} />
                ))}
              </div>
            ) : (
              <div className=" flex flex-col gap-5">
                {Array.from({ length: 5 }, (_, index) => (
                  <SkelotonFollowList key={index} />
                ))}
              </div>
            )}
          </div>
        ) : null}
        {dataList?.newLiked?.length > 0 ? (
          <div className=" w-full flex flex-col gap-5 pb-5">
            <div className="font-semibold">
              <p>New likes</p>
            </div>
            {dataList?.newLiked?.length > 0 ? (
              <div className=" flex items-center justify-center flex-col w-full gap-5">
                {dataList?.newLiked?.map((item) => (
                  <FollowingItem item={item} key={item?._id} />
                ))}
              </div>
            ) : (
              <div className=" flex flex-col gap-5">
                {Array.from({ length: 5 }, (_, index) => (
                  <SkelotonFollowList key={index} />
                ))}
              </div>
            )}
          </div>
        ) : null}
        {dataList?.newComment?.length > 0 ? (
          <div className=" w-full flex flex-col gap-5 pb-5">
            <div className="font-semibold">
              <p>New comments</p>
            </div>
            {dataList?.newComment?.length > 0 ? (
              <div className=" flex items-center justify-center flex-col w-full gap-5">
                {dataList?.newComment?.map((item) => (
                  <FollowingItem item={item} key={item?._id} />
                ))}
              </div>
            ) : (
              <div className=" flex flex-col gap-5">
                {Array.from({ length: 5 }, (_, index) => (
                  <SkelotonFollowList key={index} />
                ))}
              </div>
            )}
          </div>
        ) : null}
        {usersSuggestedAccounts?.length > 0 && (
          <div className=" w-full flex flex-col gap-5 pb-20">
            <div className="font-semibold">
              <p>Suggested for you</p>
            </div>
            <div className=" flex items-center justify-center flex-col w-full gap-5">
              {usersSuggestedAccounts?.map((item) => (
                <FollowingItem item={item} key={item?._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

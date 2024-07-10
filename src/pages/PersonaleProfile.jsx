import React, { useEffect, useState } from "react";
import DarkModeToggle from "../components/settings/theme/DarkModeToggle";
import UserProfile from "../components/Profile/UserProfile";
import StoryList from "../components/Profile/stories/StoryList";
import ContactInfo from "../utils/ContactInfo";
import { IoIosArrowDown, IoIosSettings } from "react-icons/io";
import HeaderMobile from "../utils/HeaderMobile";
import NavTopMobile from "../utils/NavTopMobile";
import { LuUserPlus } from "react-icons/lu";
import NavGalleryMobile from "../components/Profile/Gallery/NavGalleryMobile";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { DEFAULT_IMAGE_PROFILE, USER_ROUTE } from "../constant/url";
import { BsThreeDots } from "react-icons/bs";
import LoadingBtn from "../components/registerMobile/comps/LoadingBtn";
import { apiMethod } from "../services/services";

const PersonaleProfile = () => {
  const nav = useNavigate();
  const { userName } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const {
    getByUserName,
    userTest,
    handelResetStatus,
    status,
    userPersonale,
    getInfoUserPersonale,
    handelUpdateStateUserPersonale
  } = useUser();

  useEffect(() => {
    getByUserName(userName);
    setData(userTest);
    if (!userPersonale) {
      getInfoUserPersonale();
    }
  }, [status]);

  useEffect(() => {
    handelResetStatus();
  }, []);

  const handleFollowClick = async (event) => {
    event.stopPropagation();
    console.log(userTest?.user._id);
    setLoading(true);
    try {
      const _url = USER_ROUTE + "toggelFollow/" + userTest?.user._id;
      const dataToggelFoolow = await apiMethod(_url, "PATCH", {});
      if (dataToggelFoolow?.user?.following?.includes(userTest?.user._id)) {
        console.log("add new follow");
      } else console.log("remove this follow");
      handelUpdateStateUserPersonale(dataToggelFoolow?.user);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const btnPersonaleProfile = (
    <p
      className=" cursor-pointer"
      onClick={() => {
        nav("/accounts/edit");
      }}
    >
      Edit profile
    </p>
  );

  const btnAnother = (
    <div>
      {userPersonale?.following?.includes(userTest?.user._id) ? (
        <button
          onClick={(event) => handleFollowClick(event, userTest?.user._id)}
          className=" relative bg-btn_light dark:bg-btn_dark font-semibold w-full rounded-lg p-2 dark:text-txt_dark text-txt_light h-8 text-sm"
        >
          {loading ? (
            <div className=" absolute top-0 left-[45%]">
              <LoadingBtn />
            </div>
          ) : (
            "Following"
          )}
        </button>
      ) : (
        <button
          onClick={(event) => handleFollowClick(event, userTest?.user._id)}
          className=" relative bg-btn_follow font-semibold text-txt_dark p-2 rounded-lg dark:to-txt_light h-8 text-sm w-full"
        >
          {loading ? (
            <div className=" absolute top-0 left-[45%]">
              <LoadingBtn />
            </div>
          ) : (
            "Follow"
          )}
        </button>
      )}
    </div>
  );
  return (
    <div className="md:pl-24 xl:pl-60 2xl:pl-64 w-full max-w-[1150px] mx-auto md:px-5">
      <NavTopMobile
        left={
          <IoIosSettings
            onClick={() => {
              nav("/accounts/settings");
            }}
          />
        }
        cenetr1={data?.user?.username}
        cenetr2={<IoIosArrowDown />}
        right={<LuUserPlus />}
      />
      {userName === userPersonale?.username ? (
        <HeaderMobile
          data={data}
          profileImage={
            data?.user?.profileImage === ""
              ? DEFAULT_IMAGE_PROFILE
              : data?.user?.profileImage
          }
          btn1={btnPersonaleProfile}
          btn2={"View Archive"}
          btn4={"Ad tools"}
          userName={data?.user?.username}
          icon={<IoIosSettings />}
        />
      ) : (
        <HeaderMobile
          data={data}
          profileImage={
            data?.user?.profileImage === ""
              ? DEFAULT_IMAGE_PROFILE
              : data?.user?.profileImage
          }
          btn1={btnAnother}
          // btn2={"View Archive"}
          userName={data?.user?.username}
          icon={<BsThreeDots />}
        />
      )}
      <div className="md:hidden">
        <ContactInfo
          title={"some title"}
          category={"E-commerce"}
          decription={data?.user?.bio}
          link={"https://translate.google.com"}
        />
      </div>
      <div className="py-8 xl:mt-20">
        <StoryList list={data?.user?.highlights} />
      </div>
      <div className="md:hidden">
        <UserProfile user={data?.user} />
      </div>
      <NavGalleryMobile userName={userName} />
      {/* Home
      <DarkModeToggle /> */}
    </div>
  );
};

export default PersonaleProfile;

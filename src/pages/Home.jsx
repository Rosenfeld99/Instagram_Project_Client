import React, { useEffect, useRef, useState } from "react";
import DarkModeToggle from "../components/settings/theme/DarkModeToggle";
import NavTopMobile from "../utils/NavTopMobile";
import { LOGOINSTAGRAM, MODE } from "../constant/url";
import { IoIosArrowDown } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import FeedAccounts from "../components/Profile/Home/ShowFeed/FeedAccounts";
import SuggestedAccounts from "../components/Profile/Home/ShowSuggest/SuggestedAccounts";
import ModalCreate from "../components/Profile/Home/comps/ModalCreate";
import Create from "../components/Profile/Create/Create";
import { useNavigate } from "react-router-dom";
import { BiPlus, BiSolidUser } from "react-icons/bi";
import useUser from "../hooks/useUser";
import { FaComment } from "react-icons/fa";
const Home = () => {
  const { userPersonale, getInfoUserPersonale } = useUser();
  const modalRef = useRef(null); // Reference to the modal element
  const [open, setOpen] = useState(false);
  const fileRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [value, setValue] = useState("");
  const nav = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    getInfoUserPersonale();
  }, []);

  useEffect(() => {
    if (
      userPersonale?.notifications?.countNewLiked > 0 ||
      userPersonale?.notifications?.countNewFollowers > 0 ||
      userPersonale?.notifications?.countNewComments > 0
    ) {
      setTimeout(() => {
        setShowNotifications(true);
        setTimeout(() => {
          setShowNotifications(false);
        }, 3000);
      }, 3000);
    }
  }, [userPersonale]);

  const logo = (
    <div className=" flex items-center">
      <img
        className="white-image max-w-[200px] w-[18vw] min-w-[100px]"
        src={LOGOINSTAGRAM}
        alt="logo"
      />
      <IoIosArrowDown className=" w-5" />
    </div>
  );
  console.log(userPersonale.notification);
  console.log(value);

  const icons = (
    <div className=" flex items-center gap-5">
      <div className=" relative" ref={modalRef}>
        <div>
          <BiPlus
            className=" border-2 rounded-lg border-txt_light dark:border-txt_dark h-[24px] w-[24px]"
            onClick={() => setOpen(!open)}
          />
        </div>
        {open && (
          <ModalCreate
            setValue={setValue}
            modalRef={modalRef}
            fileRef={fileRef}
            open={open}
            setOpen={setOpen}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setShowPreview={setShowPreview}
            showPreview={showPreview}
            value={value}
          />
        )}
      </div>
      <div className=" relative">
        <AiOutlineHeart
          onClick={() => {
            nav("/notifications/");
          }}
          className="text-[28px]"
        />
        {userPersonale?.notifications?.countNewLiked > 0 ||
        userPersonale?.notifications?.countNewFollowers > 0 ||
        userPersonale?.notifications?.countNewComments > 0 ? (
          <div>
            <div className=" absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-[1.5px] border-txt_dark dark:border-txt_light"></div>
            {showNotifications && (
              <div className=" absolute top-8 left-[50%] translate-x-[-50%]">
                <div className=" w-5 h-5 rotate-45 bg-red-500 rounded-r-full rounded-b-full"></div>
                <div
                  className={`bg-red-500 top-0 absolute translate-x-[-50%] left-[50%] rounded text-lg p-1 text-white flex gap-2 ${""}`}
                >
                  {userPersonale?.notifications?.countNewLiked > 0 && (
                    <div className=" text-sm text-center">
                      <AiFillHeart className="text-lg" />
                      {userPersonale?.notifications?.countNewLiked}
                    </div>
                  )}
                  {userPersonale?.notifications?.countNewFollowers > 0 && (
                    <div className=" text-sm text-center">
                      <BiSolidUser className="text-lg" />
                      {userPersonale?.notifications?.countNewFollowers}
                    </div>
                  )}
                  {userPersonale?.notifications?.countNewComments > 0 && (
                    <div className=" text-sm text-center">
                      <FaComment className="text-lg" />
                      {userPersonale?.notifications?.countNewComments}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
  return (
    <div className="md:pl-20 xl:pl-56 2xl:pl-64">
      {showPreview && (
        <Create
          value={value}
          fileRef={fileRef}
          selectedImage={selectedImage}
          setShowPreview={setShowPreview}
          showPreview={showPreview}
          typeValue={value}
        />
      )}
      {/* top nav */}
      {!showPreview && (
        <div>
          <div>
            <NavTopMobile left={logo} right={icons} />
          </div>
          {userPersonale?.following.length > 3 ? (
            <FeedAccounts
              fileRef={fileRef}
              setValue={setValue}
              setSelectedImage={setSelectedImage}
              setShowPreview={setShowPreview}
            />
          ) : (
            <SuggestedAccounts />
          )}
          Home
          <DarkModeToggle />
        </div>
      )}
    </div>
  );
};

export default Home;

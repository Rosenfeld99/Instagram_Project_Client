import React, { useEffect, useState, useRef } from "react";
import StoryItem from "./StoryItem";
import { BsPlusCircleFill, BsPlusLg } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { DEFAULT_IMAGE_PROFILE } from "../../../constant/url";
import ModalName from "../Create/Highlight/ModalName";
import ModalSelect from "../Create/Highlight/ModalSelect";
import { RiArrowLeftSLine,RiArrowRightSLine } from "react-icons/ri";

const StoryList = ({
  list,
  setValue,
  fileRef,
  setSelectedImage,
  setShowPreview,
}) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalSelect, setModalSelect] = useState(false);
  const [newHightlight, setNewHightlight] = useState({});
  const location = useLocation();
  const path = location.pathname;
  const { userPersonale, getInfoUserPersonale } = useUser();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    if (!userPersonale) {
      getInfoUserPersonale();
    }
  }, [userPersonale]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial state
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [list]);

  const handleFileChange = () => {
    const file = fileRef.current.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setShowPreview(true);
      // setOpen(false);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center">
      {showLeftArrow && (
        <button
          className="absolute left-0 z-10 bg-gray-400 text-txt_dark dark:text-txt_light p-1 hidden md:block rounded-full shadow-md"
          onClick={scrollLeft}
        >
          <RiArrowLeftSLine size={24} />
        </button>
      )}
      <div
        ref={scrollRef}
        className="story-container flex justify-start px-0 overflow-x-auto pt-2"
      >
        <div className="flex items-center flex-col min-w-max">
          {path === "/" ? (
            <>
              {!userPersonale?.storyActive?.length > 0 ? (
                <div
                  className="px-3"
                  onClick={() => {
                    fileRef.current.click();
                    setValue("story");
                  }}
                >
                  <input
                    ref={fileRef}
                    onChange={handleFileChange}
                    type="file"
                    className="hidden"
                  />
                  <div className="relative">
                    <img
                      className="rounded-full w-[4rem] h-[4rem] object-cover border-[0.5px]"
                      src={
                        userPersonale?.profileImage === ""
                          ? DEFAULT_IMAGE_PROFILE
                          : userPersonale?.profileImage
                      }
                      alt=""
                    />
                    <div className="text-btn_follow absolute bottom-1 right-0 bg-white rounded-full text-xl">
                      <BsPlusCircleFill />
                    </div>
                  </div>
                  <p className="pt-1.5">Your story</p>
                </div>
              ) : (
                <div
                  onClick={() =>
                    nav(
                      `/stories/${userPersonale?.username}/${userPersonale?.storyActive[0]?._id}/`
                    )
                  }
                  className="flex items-center flex-col gap-1.5 min-w-max relative mx-4"
                >
                  <img
                    className={`${
                      path === "/"
                        ? "z-30 border-[2px] dark:border-bgk_dark border-bgk_light object-cover rounded-full w-[4rem] h-[4rem]"
                        : "border-[1px] p-0.5 object-cover rounded-full w-[4rem] h-[4rem]"
                    }`}
                    src={
                      userPersonale?.profileImage === ""
                        ? DEFAULT_IMAGE_PROFILE
                        : userPersonale?.profileImage
                    }
                    alt=""
                  />
                  {path === "/" ? (
                    <div className="p-[3px] gradiant absolute rounded-full w-[4.4rem] h-[4.4rem] top-[-3px] z-20"></div>
                  ) : null}
                  <p>Your story</p>
                </div>
              )}
            </>
          ) : null}
        </div>
        {list?.map((item, i) => (
          <StoryItem
            key={i}
            item={item}
            path={path}
            imgUrl={path === "/" ? item?.profileImage : item?.url}
            name={path === "/" ? item?.username : item?.name}
          />
        ))}
        {path !== "/" ? (
          <div>
            <div
              onClick={() => setOpen(true)}
              className="w-[4rem] h-[4rem] border min-w-max min-h-max p-3 rounded-full mx-4 mb-4 bg-[#fafafa] text-border_color border-border_color"
            >
              <BsPlusLg className="text-4xl" />
            </div>
            {open ? (
              <ModalName
                open={open}
                setOpen={setOpen}
                newHightlight={newHightlight}
                setNewHightlight={setNewHightlight}
                setModalSelect={setModalSelect}
              />
            ) : null}
            {modalSelect ? (
              <ModalSelect
                modalSelect={modalSelect}
                setModalSelect={setModalSelect}
                newHightlight={newHightlight}
                setNewHightlight={setNewHightlight}
                setOpen={setOpen}
              />
            ) : null}
          </div>
        ) : null}
      </div>
      {showRightArrow && (
        <button
          className="absolute right-0  hidden md:block z-10 bg-gray-400 text-txt_dark dark:text-txt_light p-1 rounded-full shadow-md"
          onClick={scrollRight}
        >
          <RiArrowRightSLine size={24} />
        </button>
      )}
    </div>
  );
};

export default StoryList;

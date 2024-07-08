import { GoHome, GoHomeFill } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import { BiMoviePlay, BiPlus, BiSearch } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { DEFAULT_IMAGE_PROFILE, LOGOINSTAGRAM, TOKEN_KEY } from "../../constant/url";
import SquareImage from "../Profile/Home/ShowSuggest/Card/comps/SquareImage";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

const NavDesktop = () => {
  const nav = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  const { userPersonale, handelResetStatus } = useUser();

  const styleItemsNavbar = "cursor-pointer text-[28px] w-full xl:pr-16 2xl:pr-20 flex items-center gap-4 hover:bg-bgk_hover_light hover:dark:bg-bgk_hover_dark p-2 rounded-md"

  return (
    <div>
      {localStorage[TOKEN_KEY] ? (
        <div className=" hidden md:block h-full fixed overflow-hidden border-r-[1.5px] border-btn_light dark:border-btn_dark bottom-0 z-40 dark:bg-bgk_dark bg-bgk_light">
          <div className=" flex flex-col items-center justify-between w-full h-full px-3 ">
            <div className=" flex items-center xl:items-start flex-col w-full flex-1 h-full gap-5 py-2">

              <div
                className={`${styleItemsNavbar} mt-8 mb-4`}
                onClick={() => {
                  nav("/");
                }}
              >
                {<FaInstagram className=" xl:hidden" />}
                <img
                  className=" hidden xl:flex white-image w-[110px]"
                  src={LOGOINSTAGRAM}
                  alt="logo"
                />
              </div>
              <div
                className={`${styleItemsNavbar}`}
                onClick={() => {
                  nav("/");
                }}
              >
                {path === "/" ? <GoHomeFill /> : <GoHome />}
                <span className="hidden xl:flex text-[17px]">Home</span>
              </div>
              <div className={`${styleItemsNavbar}`}>
                <BiSearch />
                <span className="hidden xl:flex text-[17px]">Seach</span>
              </div>
              <div className={`${styleItemsNavbar}`}>
                <MdOutlineExplore />
                <span className="hidden xl:flex text-[17px]">Explore</span>
              </div>
              <div className={`${styleItemsNavbar}`}>
                <BiMoviePlay />
                <span className="hidden xl:flex text-[17px]">Reels</span>
              </div>
              <div className={`${styleItemsNavbar}`}>
                <RiMessengerLine />
                <span className="hidden xl:flex text-[17px]">Messages</span>
              </div>
              <div className={`${styleItemsNavbar}`}>
                <AiOutlineHeart />
                <span className="hidden xl:flex text-[17px]">Notifications</span>
              </div>
              <div className={`${styleItemsNavbar}`}>
                <BiPlus
                  className=" border-2 rounded-lg border-txt_light dark:border-txt_dark h-[24px] w-[24px]" />
                <span className="hidden xl:flex text-[17px]">Create</span>
              </div>
              <div
                onClick={() => {
                  handelResetStatus();
                  nav(`/${userPersonale?.username}/`);
                }}
                className={`${styleItemsNavbar}`}
              >
                <SquareImage
                  anotherStyle={
                    "border-2 dark:border-white border-stone-950"
                  }
                  src={
                    userPersonale?.profileImage === ""
                      ? DEFAULT_IMAGE_PROFILE
                      : userPersonale?.profileImage
                  }
                  alt={userPersonale?.username}
                  rounded="rounded-full"
                  size="w-[30px] h-[30px]"
                />
                <span className="hidden xl:flex text-[17px]">Profile</span>

              </div>
            </div>
            <div className={`${styleItemsNavbar} mt-8 mb-6 px-3`}>
              <FiMenu />
              <span className="hidden xl:flex text-[17px]">More</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavDesktop;

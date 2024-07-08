import { GoHome, GoHomeFill } from "react-icons/go";
import { FaRegCompass } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { BiMoviePlay, BiSearch } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { DEFAULT_IMAGE_PROFILE, TOKEN_KEY } from "../../constant/url";
import SquareImage from "../Profile/Home/ShowSuggest/Card/comps/SquareImage";

const NavMobile = () => {
  const nav = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  const { userPersonale, handelResetStatus } = useUser();

  return (
    <div>
      {localStorage[TOKEN_KEY] ? (
        <div className=" md:hidden fixed w-full overflow-hidden border-t-[1.5px] border-btn_light dark:border-btn_dark bottom-0 z-40 dark:bg-bgk_dark bg-bgk_light">
          <div className=" flex items-center justify-between px-6 sm:px-10 py-2">
            <div
              className="cursor-pointer text-[28px]"
              onClick={() => {
                nav("/");
              }}
            >
              {path === "/" ? <GoHomeFill /> : <GoHome />}
            </div>
            <div className="cursor-pointer text-[28px]">
              {/* <FaRegCompass /> */}
              <BiSearch/>
            </div>
            <div className="cursor-pointer text-[28px]">
              <BiMoviePlay />
            </div>
            {/* <div className="cursor-pointer text-[32px]">
              <FiPlusSquare />
            </div> */}
            <div className="cursor-pointer text-[28px]">
              <RiMessengerLine />
            </div>

            <div
              onClick={() => {
                handelResetStatus();
                nav(`/${userPersonale?.username}/`);
              }}
            >
              <SquareImage
                anotherStyle={
                  "border-2 dark:border-white border-stone-950 cursor-pointer"
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
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavMobile;

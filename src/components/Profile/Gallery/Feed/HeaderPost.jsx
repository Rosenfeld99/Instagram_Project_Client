import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import useUser from "../../../../hooks/useUser";
import SquareImage from "../../Home/ShowSuggest/Card/comps/SquareImage";
import { DEFAULT_IMAGE_PROFILE } from "../../../../constant/url";
import { useLocation, useParams } from "react-router-dom";

const HeaderPost = ({ setOpen, open, post }) => {
  const { userTest, getByUserName } = useUser();
  const { userName } = useParams();
  const location = useLocation();
  const path = location.pathname;
  // console.log(path.substring(1) === `${userName}/feed/`);
  const [isPersonalProfile, setIsPersonalProfile] = useState(false);
  useEffect(() => {
    if (path.substring(1) === `${userName}/feed/`) {
      setIsPersonalProfile(true);
    }
    if (isPersonalProfile) {
      getByUserName(userName);
    }
  }, [isPersonalProfile]);
  // console.log(post);

  return (
    <div className=" relative flex items-center justify-between mx-auto px-4 py-2 max-w-[475px] max-h-[475px]">
      <div className=" flex items-center gap-3">
        <SquareImage
          src={
            isPersonalProfile
              ? userTest?.user?.profileImage
              : post?.profileImage === ""
              ? DEFAULT_IMAGE_PROFILE
              : post?.profileImage
          }
          alt={post?.username}
          rounded="rounded-full"
          size="w-[2.5rem] h-[2.5rem]"
        />
        <p className=" font-semibold text-sm">
          {isPersonalProfile ? userName : post?.username}
        </p>
      </div>
      <div className=" text-[1.5rem]">
        <FiMoreHorizontal onClick={() => setOpen(!open)} />
      </div>
    </div>
  );
};

export default HeaderPost;

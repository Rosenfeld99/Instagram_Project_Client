import React from "react";
import GridItem from "./GridItem";
import useUser from "../../../../hooks/useUser";
import EmptyGallery from "../comps/EmptyGallery";
import { PiCamera } from "react-icons/pi";
import LoadingBtn from "../../../registerMobile/comps/LoadingBtn";

const GridList = () => {
  const { userPersonale, userTest, loading } = useUser();
  // console.log(userPersonale?.posts);
  return (
    <div>
      {/* {loading ? (
        <div className=" relative mt-10"><LoadingBtn/></div>
      ) : ( */}
      <>
        {" "}
        <div className=" grid grid-cols-3 grid-rows-2 mb-11 gap-1">
          {userTest?.user?.grid?.map((item, i) => (
            <GridItem item={item} key={i} postId={item?._id} />
          ))}
        </div>
        <div>
          {userTest?.user?.posts?.length === 0 && (
            <EmptyGallery
              iconType={<PiCamera />}
              titleType={"Share Photos"}
              content={
                "When you share photos, they will appear on your profile."
              }
              btnAdd={"Share your first photo"}
            />
          )}
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default GridList;

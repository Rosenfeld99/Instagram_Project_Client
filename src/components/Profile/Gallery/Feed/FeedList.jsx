import React from "react";
import FeedItem from "./FeedItem";
import { BiSquareRounded } from "react-icons/bi";
import EmptyGallery from "../comps/EmptyGallery";
import useUser from "../../../../hooks/useUser";

const FeedList = () => {
  const { userTest } = useUser();
  console.log(userTest);

  return (
    <div>
      {userTest?.user?.grid?.length > 0 ? (
        <div className="  mb-11 max-w-[935px] mx-auto border-t border-btn_light dark:border-btn_dark">
          {userTest?.user?.grid?.map((post, i) => (
            <FeedItem post={post} key={i} />
          ))}
        </div>
      ) : (
        <>
          {userTest?.user?.grid?.length === 0 && (
            <EmptyGallery
              iconType={<BiSquareRounded />}
              titleType={"Feed"}
              content={
                "When you share photos, end can scroll them, they will appear on your profile."
              }
              btnAdd={"Share your first photo"}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FeedList;

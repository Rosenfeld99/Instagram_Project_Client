import React from "react";
// import { users } from "../../../../db/data";
import ReelItem from "./ReelItem";
import { users } from "../../../../../db/data";

const ReelList = () => {
  const reels = users[0]?.reels;
  console.log(reels);
  return (
    <div className=" grid grid-cols-3 grid-rows-2 mb-11 gap-0.5">
      {reels?.map((reel, i) => (
        <ReelItem reel={reel?.images[0]?.url} key={i} />
      ))}
    </div>
  );
};

export default ReelList;

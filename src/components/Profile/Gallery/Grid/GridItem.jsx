import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const GridItem = ({ item, postId }) => {
  // console.log(postId);
  // console.log(post);
  const nav = useNavigate();
  const { userName } = useParams();
  console.log(userName);
  const handelGetPost = () => {
    console.log(item);
    nav(`/p/${userName}/${postId}`);
  };
  return (
    <div className="flex" onClick={handelGetPost}>
      {/* <div className="relative w-full pt-[100%]"> */}
        <img
          src={item?.images[0]?.url}
          className=" aspect-square object-cover top-0 left-0"
          alt="grid image"
        />
      {/* </div> */}
    </div>
  );
};

export default GridItem;

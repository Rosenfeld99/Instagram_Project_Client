import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_PROFILE, USER_ROUTE } from "../../../../constant/url";
import { apiMethod } from "../../../../services/services";
import useUser from "../../../../hooks/useUser";

const FooterPost = ({ post, updateItemFeed }) => {
  const { handelUpdateSinglePost, handelUpdateGridItem } = useUser();
  const [showMsg, setShowMsg] = useState(false);
  const nav = useNavigate();
  // console.log(post?.threeUserLiked[0]?.username);
  const location = useLocation();
  const path = location.pathname;
  const desc = post?.description;

  const toggelLiked = async () => {
    try {
      const _url = USER_ROUTE + `toggeliked/${post?._id}/${post?.username}`;
      // console.log(_url);
      const data = await apiMethod(_url, "PATCH", {});
      if (data?.singlePost) {
        handelUpdateSinglePost(data.singlePost);
        console.log(data.singlePost);
        if (path === "/") {
          // handelUpdateGridItem(data.singlePost)
          updateItemFeed(data.singlePost);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 border-b mb-5 border-btn_light dark:border-btn_dark max-w-[475px] max-h-[475px] mx-auto">
      <div className=" flex items-center justify-between text-[1.5rem]">
        <div className=" flex items-center gap-5">
          {post.isCurrentLiked ? (
            <AiFillHeart
              className="text-[1.7rem] text-red-500"
              onClick={toggelLiked}
            />
          ) : (
            <AiOutlineHeart className="text-[1.7rem]" onClick={toggelLiked} />
          )}{" "}
          <FaRegComment
            onClick={() => nav(`/p/${post?._id}/${post?.username}/comments/`)}
          />
          <FiSend />
        </div>
        <div className=" ">
          <BiBookmark />
        </div>
      </div>
      {post.likes > 0 ? (
        <div>
          {post.likes > 9 ? "likes" : "like"} {post.likes}
        </div>
      ) : null}
      {post.likes > 0 ? (
        <div className="dark:avatar-group -space-x-2 flex py-4">
          {post?.threeUserLiked?.map((item) => (
            <div className="avatar" key={item?._id}>
              <div className="w-8">
                <img
                  className=" rounded-full dark:border-0 border-white border-2"
                  src={
                    item?.profileImage
                      ? item?.profileImage
                      : DEFAULT_IMAGE_PROFILE
                  }
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {post.likes > 0 ? (
        <div className=" text-[0.9rem]">
          Liked By <b>{post?.threeUserLiked[0]?.username}</b>{" "}
          {post?.likes > 2 ? `end ${post.likes - 1} others` : null}
        </div>
      ) : null}
      <div
        className=" text-[0.9rem] pt-1"
        onClick={() => {
          setShowMsg(true);
        }}
      >
        {!showMsg ? desc?.substring(0, 30) : desc}
        {!showMsg && desc?.length > 30 ? "..." : null}
      </div>
    </div>
  );
};

export default FooterPost;

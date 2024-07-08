import React, { useEffect, useState } from "react";
import NavTopMobile from "../../../../utils/NavTopMobile";
import { CgChevronLeft } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import SquareImage from "../../Home/ShowSuggest/Card/comps/SquareImage";
import { DEFAULT_IMAGE_PROFILE, USER_ROUTE } from "../../../../constant/url";
import useUser from "../../../../hooks/useUser";
import { apiGet, apiMethod } from "../../../../services/services";
import CardComment from "./CardComment";
import LoadingBtn from "../../../registerMobile/comps/LoadingBtn";

const CommentsPage = () => {
  const { userName } = useParams();
  const { userPersonale, singlePost, status, handelGetSinglePost } = useUser();
  console.log(singlePost);

  const [showMsg, setShowMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [commentList, setCommentList] = useState();

  useEffect(() => {
    if (!commentList) {
      getCommentList();
    }
  }, [commentList]);
  useEffect(() => {
    const ids = {
      postId: postId,
      userName: userName,
    };
    handelGetSinglePost(ids);
  }, [status]);
  const btnMore = <p className=" py-3 text-category_bio">...more</p>;

  const nav = useNavigate();
  const { postId } = useParams();
  // console.log(postId);
  const center = (
    <p className=" font-semibold absolute left-[50%] translate-x-[-50%]">
      Commnets
    </p>
  );

  console.log(singlePost);

  const handelAddComment = async () => {
    setLoading(true);
    try {
      const bodyData = { comment: inputValue };
      console.log(bodyData);
      const _url =
        USER_ROUTE + `addCommentPost/${postId}/${singlePost?.username}`;
      const data = await apiMethod(_url, "PATCH", bodyData);
      if (data?.singlePost) {
        console.log(data);
        getCommentList();
        setInputValue("");
        setLoading(false);
      }
      console.log(_url);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentList = async () => {
    try {
      const _url = USER_ROUTE + `commentList/${postId}/${userName}`;
      const { data } = await apiGet(_url);
      setCommentList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavTopMobile
        left={<CgChevronLeft onClick={() => nav(-1)} />}
        cenetr1={center}
      />
      <div className=" pt-12 flex py-7 mx-5 gap-3 border-b-2">
        <div>
          <SquareImage
            src={
              singlePost?.profileImage === ""
                ? DEFAULT_IMAGE_PROFILE
                : singlePost?.profileImage
            }
            alt={singlePost?.username}
            rounded="rounded-full"
            size="w-[2.5rem] h-[2.5rem]"
          />
        </div>
        <div className=" text-sm">
          <div className="">
            <div className=" font-semibold">
              {singlePost?.username}{" "}
              <span
                onClick={() => {
                  setShowMsg(true);
                }}
                className=" font-[400] pl-3"
              >
                {!showMsg
                  ? singlePost?.description?.substring(0, 100)
                  : singlePost?.description}
                {!showMsg && singlePost?.description?.length > 100
                  ? btnMore
                  : null}
              </span>
            </div>
          </div>
          <div className=" text-category_bio">time</div>
        </div>
      </div>
      {commentList?.map((item) => (
        <CardComment
          key={item?._id}
          item={item}
          btnMore={btnMore}
          setShowMsg={setShowMsg}
          showMsg={showMsg}
        />
      ))}
      <div className=" flex items-center absolute bottom-0 w-full p-3 gap-2 border-t dark:border-btn_dark pb-16">
        <div>
          <SquareImage
            src={
              userPersonale?.profileImage === ""
                ? DEFAULT_IMAGE_PROFILE
                : userPersonale?.profileImage
            }
            alt={userPersonale?.username}
            rounded="rounded-full"
            size="w-[2.5rem] h-[2.5rem]"
          />
        </div>
        <div className=" w-full relative">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
            placeholder=" Add a comment..."
            className=" w-full p-2 px-3 rounded-full border bg-transparent outline-none dark:border-btn_dark placeholder:dark:text-btn_dark"
          />
          {inputValue !== "" && !loading && (
            <div
              onClick={handelAddComment}
              className=" absolute top-[50%] translate-y-[-50%] right-4 font-semibold text-btn_follow"
            >
              Post
            </div>
          )}
          {loading && (
            <div className="  absolute top-1 right-8 font-semibold text-btn_follow">
              <LoadingBtn />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;

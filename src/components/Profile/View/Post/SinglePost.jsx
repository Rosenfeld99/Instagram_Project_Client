import React, { useEffect } from "react";
import NavTopMobile from "../../../../utils/NavTopMobile";
import { CgChevronLeft } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import FeedItem from "../../Gallery/Feed/FeedItem";
import SkelotonPost from "../../../animation/Skelotons/Post/SkelotonPost";
import useUser from "../../../../hooks/useUser";

const SinglePost = () => {
  const { handelGetSinglePost, singlePost, status, loading } = useUser();
  const nav = useNavigate();
  const { postId, userName } = useParams();
  const center = (
    <p className=" font-semibold absolute left-[50%] translate-x-[-50%]">
      Post
    </p>
  );

  // console.log(postId);
  useEffect(() => {
    const ids = {
      postId: postId,
      userName: userName,
    };
    handelGetSinglePost(ids);
  }, [status]);
  console.log(singlePost);
  return (
    <div >
      <NavTopMobile
        left={<CgChevronLeft onClick={() => nav(-1)} />}
        cenetr1={center}
      />
      <div className=" absolute top-10 w-full mx-auto">
        {loading ? <SkelotonPost /> : <FeedItem post={singlePost} />}
      </div>
    </div>
  );
};

export default SinglePost;

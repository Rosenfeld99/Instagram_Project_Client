import React, { useState } from "react";
import HeaderPost from "./HeaderPost";
import FooterPost from "./FooterPost";
import PostOptionModal from "./comps/postOptionModal";

const FeedItem = ({ post, updateItemFeed }) => {
  // console.log(post);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length
    );
  };
  return (
    <div>
      <HeaderPost open={open} setOpen={setOpen} post={post} />
      <div className="flex">
        <div className="relative w-full ">
          <div className="carousel w-full">
            {post?.images?.map((value, i) => (
              <div
                id="slide1"
                key={i}
                className={`carousel-item relative mx-auto max-w-[475px] max-h-[475px] bg-btn_light dark:bg-btn_dark ${
                  i === currentIndex ? "block" : "hidden"
                }`}
              >
                <img
                  src={value.url}
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
            {post?.images?.length > 1 && (
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
                <button
                  onClick={goToPrev}
                  className="btn-circle bg-[#ccc] h-8 w-8 text-black font-extrabold text-lg"
                >
                  ❮
                </button>
                <button
                  onClick={goToNext}
                  className="btn-circle bg-[#ccc] h-8 w-8 text-black font-extrabold text-lg"
                >
                  ❯
                </button>
              </div>
            )}
            {post?.images?.length > 1 && (
              <div className="flex justify-center w-full py-2 gap-2 absolute bottom-3">
                {post?.images?.map((val, index) => (
                  <p
                    key={index}
                    className={`rounded-full bg-[#414040] w-3 h-3 ${
                      index === currentIndex
                        ? " bg-[#cbc9c9d7] transform"
                        : null
                    }`}
                  ></p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterPost post={post} updateItemFeed={updateItemFeed} />
      {open && (
        <PostOptionModal open={open} setOpen={setOpen} postId={post?._id} />
      )}
    </div>
  );
};

export default FeedItem;

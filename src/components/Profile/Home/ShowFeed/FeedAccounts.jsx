import React, { useEffect, useState } from "react";
import StoryList from "../../stories/StoryList";
import { users } from "../../../../../db/data";
import { USER_ROUTE } from "../../../../constant/url";
import { apiGet } from "../../../../services/services";
import FeedItem from "../../Gallery/Feed/FeedItem";
import { BiSquareRounded } from "react-icons/bi";
import EmptyGallery from "../../Gallery/comps/EmptyGallery";
import SkelotonPost from "../../../animation/Skelotons/Post/SkelotonPost";

const FeedAccounts = ({
  setValue,
  fileRef,
  setSelectedImage,
  setShowPreview,
}) => {
  // TODO scroll loading
  const [dataFeed, setDataFeed] = useState();
  const [storiesList, setStoriesList] = useState();
  const [hasMoreData, setHasMoreData] = useState(true);
  const [intLoading, setInitLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const getFeed = async () => {
    try {
      setLoadingBtn(true);
      const _url = USER_ROUTE + `getFeedUser?page=${page}`;
      const { data } = await apiGet(_url);
      console.log(data);
      if (data.feed.length > 0) {
        setDataFeed(dataFeed ? [...dataFeed, ...data.feed] : data.feed);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingBtn(false);
    setInitLoading(false);
  };
  // console.log(page);
  console.log(dataFeed);

  const getStoriesList = async () => {
    try {
      const _url = USER_ROUTE + "getStoriesList/";
      const { data } = await apiGet(_url);
      setStoriesList(data.storiesList);
      console.log(data);
      if (data.storiesList.length > 0) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemFeed = (updatedItem) => {
    setDataFeed((prevDataFeed) => {
      return prevDataFeed.map((item) => {
        if (item._id === updatedItem._id) {
          return { ...item, ...updatedItem };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    // if (hasMoreData) {
    getFeed();
    // }
  }, [page, hasMoreData]);

  useEffect(() => {
    getStoriesList();
  }, []);
  return (
    <>
      {!intLoading ? (
        <div>
          {/* stories list */}
          <div className="pt-14">
            <StoryList
              list={storiesList}
              fileRef={fileRef}
              setValue={setValue}
              setSelectedImage={setSelectedImage}
              setShowPreview={setShowPreview}
            />
          </div>
          {/* <FeedList /> */}
          <div>
            {dataFeed?.length > 0 ? (
              <div className="  mb-11 max-w-[935px] mx-auto border-t border-btn_light dark:border-btn_dark">
                {dataFeed?.map((post, i) => (
                  <FeedItem
                    post={post}
                    key={i}
                    updateItemFeed={updateItemFeed}
                  />
                ))}
              </div>
            ) : (
              <>
                {dataFeed?.length === 0 && (
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
            {hasMoreData && (
              <div className="mb-10 flex items-center justify-center mx-auto">
                {loadingBtn ? (
                  <div className="w-7">
                    <img src="https://i.gifer.com/ZKZg.gif" alt="" />
                  </div>
                ) : (
                  <button
                    className="p-2 px-4 rounded border"
                    onClick={() => setPage(page + 1)}
                  >
                    more...
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className=" pt-14">
          <SkelotonPost />
        </div>
      )}
    </>
  );
};

export default FeedAccounts;

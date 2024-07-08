import React, { useEffect, useState } from "react";
import NavTopMobile from "../../../../utils/NavTopMobile";
import { CgChevronLeft } from "react-icons/cg";
import useUser from "../../../../hooks/useUser";
import { apiGet } from "../../../../services/services";
import { LOADING_GIF, USER_ROUTE } from "../../../../constant/url";
import FollowingItem from "./FollowingItem";
import { BiSearch } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";
import SkelotonFollowList from "../../../animation/Skelotons/Follow/SkelotonFollowList";
import { useNavigate, useParams } from "react-router-dom";

const FollowingList = () => {
  const { usersSuggestedAccounts, getSuggested } = useUser();
  const [dataList, setDataList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loadin, setLoading] = useState(false);
  const { userName } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    console.log(userName);
    getFollowList();
    getSuggested();
    // console.log(usersSuggestedAccounts);
  }, []);

  const getFollowList = async () => {
    try {
      const _url = USER_ROUTE + "following/" + userName;
      const { data } = await apiGet(_url);
      console.log(data);
      setDataList(data.following);
      setFilterData(data.following);
    } catch (error) {
      console.log(error);
    }
  };

  const filterFollowing = (search) => {
    setLoading(true);
    // console.log(search);
    setInputValue(search);
    setTimeout(() => {
      const lowerInputValue = search?.toLowerCase(); // Use the provided 'search' parameter instead of 'inputValue'
      const filteredList = filterData.filter((item) => {
        const lowerItemName = item.username?.toLowerCase(); // Replace 'name' with the actual property containing the character to match
        return lowerItemName?.includes(lowerInputValue);
      });
      setFilterData(filteredList);
      if (search === "") {
        setFilterData(dataList);
      }
      setLoading(false);
    }, 1000);
  };

  const center = <p className=" font-semibold">Following</p>;
  return (
    <div>
      <div>
        <NavTopMobile
          left={<CgChevronLeft onClick={() => nav(-1)} />}
          cenetr1={center}
        />
      </div>
      <div className="pt-14 flex items-center justify-center flex-col gap-5 p-5">
        {dataList?.length > 0 && (
          <>
            <div className="w-full relative text-[#a6a6a6]">
              <div className=" absolute top-[50%] translate-y-[-50%] px-3 text-xl">
                <BiSearch />
              </div>
              <input
                value={inputValue}
                onChange={(e) => filterFollowing(e.target.value)}
                className="p-1 rounded-lg w-full pl-10 outline-none bg-btn_light text-txt_light dark:bg-btn_dark dark:text-txt_dark"
                type="text"
                placeholder="Sreach"
              />
              {inputValue !== "" && (
                <div
                  onClick={() => {
                    setInputValue("");
                    filterFollowing("");
                  }}
                  className=" absolute top-[50%] translate-y-[-50%] right-0 px-3 text-xl"
                >
                  {loadin ? (
                    <img
                      className=" w-5 bg-[#0000000b] rounded-full"
                      src={LOADING_GIF}
                      alt=""
                    />
                  ) : (
                    <IoMdCloseCircle />
                  )}
                </div>
              )}
            </div>
            <div className=" w-full">
              {filterData?.length > 0 ? (
                <div className=" flex items-center justify-center flex-col gap-5">
                  {filterData?.map((item) => (
                    <FollowingItem item={item} key={item?._id} />
                    // <SkelotonFollowList />
                  ))}
                </div>
              ) : (
                <div>
                  {inputValue === "" ? (
                    <div className=" flex flex-col gap-5">
                      {Array.from({ length: 50 }, (_, index) => (
                        <SkelotonFollowList key={index} />
                      ))}
                    </div>
                  ) : (
                    <div className=" text-center">No results found.</div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        {inputValue === "" && (
          <>
            {usersSuggestedAccounts?.length > 0 && (
              <div className=" w-full flex flex-col gap-5 pb-20">
                <div className="font-semibold">
                  <p>Suggested for you</p>
                </div>
                <div className=" flex items-center justify-center flex-col w-full gap-5">
                  {usersSuggestedAccounts?.map((item) => (
                    <FollowingItem item={item} key={item?._id} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowingList;

import React, { useEffect, useRef, useState } from "react";
import MyModal from "../../../../utils/MyModal";
import { VscClose } from "react-icons/vsc";
import { BsChevronLeft } from "react-icons/bs";
import { BiCheck, BiCircle } from "react-icons/bi";
import SquareImage from "../../Home/ShowSuggest/Card/comps/SquareImage";
import { USER_ROUTE } from "../../../../constant/url";
import { apiGet, apiMethod } from "../../../../services/services";

const ModalSelect = ({
  setOpen,
  newHightlight,
  setNewHightlight,
  modalSelect,
  setModalSelect,
}) => {
  // console.log("setNewHightlight prop:", setNewHightlight);
  const modalRef = useRef(null);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [dataList, setDataList] = useState({});
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handelCheckbox = (item) => {
    setNewHightlight({
      ...newHightlight,
      url: item.url,
      alt: item.alt,
      id: item._id,
    });
  };
  console.log(newHightlight);

  useEffect(() => {
    getStoriesArchives();
  }, [page, hasMoreData]);

  const getStoriesArchives = async () => {
    try {
      if (dataList && parseInt(dataList?.currentPage) === dataList.totalPages) {
        setHasMoreData(false);
        return;
      }

      setLoadingBtn(true);
      const _url = USER_ROUTE + `getStoriesArchives?page=${page}`;
      console.log(_url);
      const { data } = await apiGet(_url);

      if (data?.storiesList.length > 0) {
        setDataList((prevDataList) => {
          return {
            ...prevDataList,
            storiesList: prevDataList.storiesList
              ? [...prevDataList.storiesList, ...data.storiesList]
              : data.storiesList,
          };
        });
      } else {
        setHasMoreData(false);
      }

      setLoadingBtn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handelDone = async () => {
    try {
      setLoadingConfirm(true);
      const _url = USER_ROUTE + "AddHightlight";
      const data = await apiMethod(_url, "POST", newHightlight);
      if (data) {
        console.log("rquest success full" + data.highlights);
        setLoadingConfirm(false);
        setModalSelect(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Background overlay */}
      {modalSelect && <div className="fixed inset-0 z-40"></div>}
      <MyModal open={modalSelect} setOpen={setModalSelect} modalRef={modalRef}>
        <div className="z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-xl">
          <div>
            <div className="bg-bgk_light rounded-xl" ref={modalRef}>
              <div>
                <div className="text-center font-semibold flex items-center justify-between border-b border-border_color p-3">
                  <div className="  text-xl cursor-pointer">
                    <BsChevronLeft
                      onClick={() => {
                        setOpen(true);
                        setModalSelect(false);
                      }}
                    />
                  </div>
                  <h2 className="text-md">Stories</h2>
                  <div className=" text-3xl cursor-pointer">
                    <VscClose onClick={() => setModalSelect(false)} />
                  </div>
                </div>
                <div className="leading-6 h-[600px] overflow-y-scroll">
                  {loadingConfirm && (
                    <div className=" left-0 w-full h-[600px] bg-black opacity-50 z-30 absolute flex items-center justify-center overflow-hidden">
                      <img
                        className="w-20"
                        src="https://i.gifer.com/ZKZg.gif"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-3 grid-rows-2 gap-0.5 overflow-y-auto relative">
                    {dataList?.storiesList?.length > 0 &&
                      dataList?.storiesList?.map((item) => (
                        <div
                          key={item?._id}
                          className=" relative"
                          onClick={() => handelCheckbox(item)}
                        >
                          <SquareImage
                            src={item?.url}
                            alt={item?.alt}
                            size="w-[full] h-[15rem]"
                          />
                          {/* checkBox for select image */}
                          <div
                            className={` absolute top-0 left-0 w-full h-full ${
                              item?._id === newHightlight?.id
                                ? "bg-[#b0b0b084] "
                                : null
                            }`}
                          >
                            <div className=" absolute bottom-0 right-0 text-white text-2xl p-3">
                              {item?._id === newHightlight?.id ? (
                                <BiCheck className=" bg-btn_follow rounded-full border-2" />
                              ) : (
                                <BiCircle />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    {/* end gllaery */}
                  </div>
                  {hasMoreData && (
                    <div className="my-10 flex items-center justify-center mx-auto">
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
              <button
                type="button"
                className={`p-4 w-full outline-none px-3 text-sm border-t-[1.5px] border-border_color font-[700]`}
                onClick={handelDone}
                ref={modalRef}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </MyModal>
    </>
  );
};

export default ModalSelect;

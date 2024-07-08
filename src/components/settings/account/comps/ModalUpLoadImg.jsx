import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import MyModal from "../../../../utils/MyModal";

const ModalUpLoadImg = ({ open, setOpen, fileRef }) => {
  const modalRef = useRef();
  const { remodedCurrentImage } = useUser();
  const nav = useNavigate();

  return (
    <>
      {/* Background overlay */}
      {open && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}
      <MyModal open={open} setOpen={setOpen} modalRef={modalRef}>
        <div className=" z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-sm ">
          <div className="bg-bgk_light dark:bg-[#262627] text-txt_light dark:text-txt_dark m-10 rounded-2xl " ref={modalRef}>
            <div className="  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:mt-0 text-xl font-semibold leading-6">
                  Change Profile Photo
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-3 w-full outline-none px-3 text-sm text-btn_follow border-t-[1px] border-border_color dark:border-btn_dark pt-3 font-[700]"
              onClick={() => {
                fileRef.current.click();
              }}
              ref={modalRef}
            >
              Upload Photo
            </button>
            <button
              type="button"
              className="mt-3 w-full outline-none px-3 text-sm text-red-500 border-t-[1px] border-border_color dark:border-btn_dark pt-3 font-[700]"
              onClick={() => {
                remodedCurrentImage();
                setOpen(false);
              }}
              ref={modalRef}
            >
              Remove Current Photo
            </button>
            <button
              type="button"
              className="mt-3 w-full outline-none px-3 text-sm border-t-[1px] border-border_color dark:border-btn_dark py-3"
              onClick={() => setOpen(false)}
              ref={modalRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </MyModal>
    </>
  );
};

export default ModalUpLoadImg;

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import MyModal from "../../../utils/MyModal";

const LogOutModal = ({ open, setOpen }) => {
  const { handelLogOut } = useUser();
  const nav = useNavigate();
  const modalRef = useRef(); // Create a new ref for this component

  return (
    <MyModal open={open} setOpen={setOpen} modalRef={modalRef}>
      <div className="mx-14">
        <div
          ref={modalRef}
          className="bg-bgk_light dark:bg-[#262627] rounded-2xl text-txt_light dark:text-txt_dark"
        >
          <div className="absolute top-[50%] z-50 translate-y-[-50%] left-[50%] translate-x-[-50%]">
            <div
              ref={modalRef}
              className="bg-bgk_light dark:bg-[#262627] rounded-2xl text-txt_light dark:text-txt_dark"
            >
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left text-lg font-semibold leading-6 ">
                    Log out?
                    <div className="mt-2">
                      <p className="text-sm dark:text-category_bio px-6 text-txt_title font-[400]">
                        Are you sure you want to log out of your account?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="mt-3 w-full outline-none px-3 text-sm text-btn_follow border-t-[1px] border-border_color dark:border-btn_dark pt-3 font-[700]"
                onClick={() => {
                  handelLogOut();
                  nav("/");
                  setOpen(false);
                }}
              >
                Log out
              </button>
              <button
                type="button"
                className="mt-3 w-full outline-none px-3 text-sm border-t-[1px] border-border_color dark:border-btn_dark py-3"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>{" "}
        </div>
      </div>
    </MyModal>
  );
};

export default LogOutModal;

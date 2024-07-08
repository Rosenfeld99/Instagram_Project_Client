import React, { useRef } from "react";
import MyModal from "../../../utils/MyModal";

const ModalError = ({ open, setOpen, propertyName }) => {
  const modalRef = useRef(null);

  return (
    <>
      {/* Background overlay */}
      {open && <div className="fixed inset-0 z-40"></div>}
      <MyModal open={open} setOpen={setOpen} modalRef={modalRef}>
        <div className="z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-sm ">
          <div>
            <div className="bg-bgk_light m-10 rounded-2xl" ref={modalRef}>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 p-5 text-center sm:mt-0 text-xl font-semibold leading-6">
                  Error
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 px-6">
                      This {propertyName} isn't availabel please try another.
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="pt-3 w-full outline-none px-3 text-sm text-btn_follow border-t-[1.5px] border-border_color py-3 font-[700]"
                onClick={() => setOpen(false)}
                ref={modalRef}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </MyModal>
    </>
  );
};

export default ModalError;

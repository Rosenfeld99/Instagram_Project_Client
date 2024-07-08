import React, { useRef, useState } from "react";
import MyModal from "../../../../utils/MyModal";
import { VscClose } from "react-icons/vsc";
import ModalSelect from "./ModalSelect";
const ModalName = ({
  open,
  setOpen,
  newHightlight,
  setNewHightlight,
  setModalSelect,
}) => {
  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const onclickNext = () => {
    if (inputValue === "") return;
    setNewHightlight({ name: inputValue });
    console.log("name " + newHightlight.name);
    setModalSelect(true);
    setOpen(false);
  };

  return (
    <>
      {/* Background overlay */}
      {open && <div className="fixed inset-0 z-40 "></div>}
      <MyModal open={open} setOpen={setOpen} modalRef={modalRef}>
        <div className="z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[22rem]">
          <div>
            <div className="bg-bgk_light m-10 rounded-xl" ref={modalRef}>
              <div>
                <div className="text-center font-semibold leading-6">
                  <div className=" relative">
                    <h2 className="text-md border-b p-3 border-border_color">
                      New Highlight
                    </h2>
                    <div className=" absolute right-0 top-0 text-2xl p-3 cursor-pointer">
                      <VscClose onClick={() => setOpen(false)} />
                    </div>
                  </div>
                  <div className="p-5 w-full">
                    <input
                      onChange={(e) => setInputValue(e.target.value)}
                      value={inputValue}
                      type="text"
                      placeholder=" Hightlight Name"
                      className=" p-2 rounded outline-none border w-full bg-[#fafafa] text-black placeholder:text-border_color placeholder: font-[400]"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={`p-4 w-full outline-none px-3 text-sm border-t-[1.5px] border-border_color font-[700] ${
                  inputValue === "" ? " text-[#00000075]" : "text-btn_follow"
                }`}
                onClick={onclickNext}
                ref={modalRef}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </MyModal>
    </>
  );
};

export default ModalName;

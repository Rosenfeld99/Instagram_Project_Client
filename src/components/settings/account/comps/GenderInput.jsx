import React, { useRef, useState } from "react";
import MyModal from "../../../../utils/MyModal";
import NavTopMobile from "../../../../utils/NavTopMobile";
import { CgChevronLeft } from "react-icons/cg";
import { MdOutlineCircle } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";

const GenderInput = ({
  upDateUserPersonale,
  userPersonale,
  formData,
  setFormData,
}) => {
  const [open, setOpen] = useState(false); // Initialize the modal as closed
  const modalRef = useRef();

  const option = [
    { name: "Custom", icon: <MdOutlineCircle />, color: "text-border_color" },
    { name: "Female", icon: <MdOutlineCircle />, color: "text-border_color" },
    { name: "Male", icon: <MdOutlineCircle />, color: "text-border_color" },
    {
      name: "Prefer not to say",
      icon: <MdOutlineCircle />,
      color: "text-border_color",
    },
  ];

  const handelDoneGender = () => {
    const bodyData = {
      website: userPersonale?.website,
      gender: formData?.gender,
      bio: userPersonale?.bio,
      catrgory: userPersonale?.catrgory,
    };
    console.log(bodyData);
    upDateUserPersonale(bodyData);
    setOpen(false);
  };

  // console.log(formData?.gender == option[2]?.name);

  const handelCloseOpen = () => {
    setOpen(false);
  };

  const cenetr1 = <p className=" text-[16px] font-semibold py-1">Gender</p>;
  const right = (
    <p
      onClick={handelDoneGender}
      className=" text-[16px] font-semibold text-btn_follow"
    >
      Done
    </p>
  );
  const left = <CgChevronLeft onClick={handelCloseOpen} />;
  return (
    <div>
      <div className=" flex flex-col gap-3">
        <label>
          <p className=" text-xl font-semibold">Gender</p>
        </label>
        <div className=" w-full z-30 relative">
          <p
            onClick={() => {
              setOpen(true);
            }}
            className=" px-2 py-1.5 rounded-sm bg-bgk_light dark:bg-bgk_dark border-[2px] border-[#ccc] dark:border-btn_dark w-full text-txt_all_small"
          >
            {userPersonale?.gender === "" ? "Prefer not to say" : userPersonale?.gender}
          </p>
        </div>
        <p className="text-[11px] font-semibold text-txt_all_small">
          This won’t be part of your public profile.
        </p>
      </div>
      {open && (
        <MyModal open={open} setOpen={setOpen} modalRef={modalRef}>
          <div className=" dark:bg-[#1717177a] w-full absolute top-0 left-0 flex items-center justify-center min-h-screen flex-col z-40">
            <div
              ref={modalRef}
              className=" bg-bgk_light w-full dark:bg-bgk_dark"
            >
              <div className=" ">
                <NavTopMobile left={left} cenetr1={cenetr1} right={right} />
              </div>
              <div className=" pt-14 px-5 pb-3 text-md font-semibold">
                {option?.map((item, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      setFormData({
                        gender: item.name,
                        bio: formData.bio,
                        website: formData.website,
                      })
                    }
                    className=" flex items-center gap-3"
                  >
                    <p
                      className={
                        formData?.gender === item.name
                          ? " text-btn_follow"
                          : item.color
                      }
                    >
                      {formData?.gender === item.name ? (
                        <FaDotCircle />
                      ) : (
                        item.icon
                      )}
                    </p>
                    <p> {item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MyModal>
      )}
    </div>
  );
};

export default GenderInput;

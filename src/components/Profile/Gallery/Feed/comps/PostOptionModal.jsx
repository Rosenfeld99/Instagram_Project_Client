import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyModal from "../../../../../utils/MyModal";
import { USER_ROUTE } from "../../../../../constant/url";
import { apiMethod } from "../../../../../services/services";
import useUser from "../../../../../hooks/useUser";

const PostOptionModal = ({ open, setOpen, postId }) => {
  const { handelUpdateStateUserPersonale, handelRemodevPost, getByUserName } =
    useUser();
  const { userName } = useParams();
  const nav = useNavigate();
  const modalRef = useRef(); // Create a new ref for this component

  const handelDelete = () => {
    handelRemodevPost(postId);
    // nav(-1);
  };

  const optionModal = [
    {
      name: "Delete",
      nav: -1,
      style: "text-red-500 font-[700]",
      action: () => remoedPost(),
    },
    { name: "Edid", nav: 1, style: "border-t-[1px]", action: "" },
    { name: "Copy link", nav: 1, style: "border-t-[1px]", action: "" },
    {
      name: "About your account",
      nav: 1,
      style: "border-t-[1px]",
      action: "",
    },
    { name: "Cancel", nav: 1, style: "border-t-[1px]", action: "" },
  ];
  return (
    <MyModal open={open} setOpen={setOpen} modalRef={modalRef}>
      <div className="mx-14">
        <div className="absolute top-[50%] z-50 translate-y-[-50%] left-[50%] translate-x-[-50%] w-full max-w-[250px]">
          <div
            ref={modalRef}
            className="bg-bgk_light dark:bg-[#262627] rounded-2xl text-txt_light dark:text-txt_dark overflow-hidden"
          >
            {optionModal?.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`p-4 w-full outline-none px-3 text-sm cursor-pointer border-border_color dark:border-btn_dark ${item?.style}`}
                onClick={() => {
                  item.name === "Delete" && handelDelete();
                }}
              >
                {item?.name}
              </button>
            ))}
          </div>
        </div>{" "}
      </div>
    </MyModal>
  );
};

export default PostOptionModal;

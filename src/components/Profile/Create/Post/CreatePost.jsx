import React, { useEffect, useRef, useState } from "react";
import { BiGrid } from "react-icons/bi";
import NavTopMobile from "../../../../utils/NavTopMobile";
import SquareImage from "../../Home/ShowSuggest/Card/comps/SquareImage";
import { MdClose } from "react-icons/md";
import { API_URL, DEFAULT_IMAGE_PROFILE } from "../../../../constant/url";
import { apiMethod } from "../../../../services/services";
import useUser from "../../../../hooks/useUser";

const CreatePost = ({
  setShowPreview,
  showPreview,
  selectedImage,
  fileRef,
}) => {
  const {
    handelUpdateStateUserPersonale,
    userPersonale,
    getInfoUserPersonale,
  } = useUser();
  const [loadin, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleCancel = () => {
    setShowPreview(false);
  };

  useEffect(() => {
    if (!userPersonale?._id) {
      getInfoUserPersonale();
    }
  }, [userPersonale]);

  const handleSave = async () => {
    try {
      // validate descroption
      if (descriptionValue.length >= 1000) {
        return;
      }
      const myFile = fileRef;
      // console.log(myFile);
      if (myFile) {
        // if select file
        setLoading(true);
        const reader = new FileReader();
        // replace to string 64 bites to can send in the body request
        reader.readAsDataURL(myFile);
        reader.addEventListener("loadend", async () => {
          const fileUrl = API_URL + "uploads/createPost";
          // const fileUrl = API_URL + "posts/createPostFrom1";
          // console.log(fileUrl);
          const dataFile = await apiMethod(fileUrl, "POST", {
            images: [{ url: reader.result, alt: "some txt" }],
            description: descriptionValue,
            userId: userPersonale?._id,
          });
          console.log(dataFile);
          if (dataFile.user) {
            console.log(dataFile.user);
            handelUpdateStateUserPersonale(dataFile.user);
            console.log("Post added success full");
            setLoading(false);
            handleCancel();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cenetr1 = (
    <p className=" text-[16px] font-semibold py-1">New Photo Post</p>
  );
  const right = (
    <p
      onClick={handleSave}
      className=" text-[16px] font-semibold text-btn_follow"
    >
      Share
    </p>
  );
  const left = <MdClose onClick={handleCancel} />;

  return (
    <div>
      {loadin && (
        <div className=" min-h-screen w-full absolute z-50 bg-black opacity-60 flex items-center justify-center top-0 text-white">
          <img src="https://i.gifer.com/ZKZg.gif" className=" w-20" alt="" />
        </div>
      )}
      {showPreview && (
        <div>
          <div className=" absolute bg-bgk_light dark:bg-bgk_dark w-full h-screen z-40 text-txt_light dark:text-txt_dark ">
            <div className="">
              <NavTopMobile left={left} cenetr1={cenetr1} right={right} />
            </div>
            <div className=" flex items-center justify-center gap-20 flex-col py-[60px] w-full ">
              <div className=" flex items-center w-full gap-5 relative">
                <div className=" absolute top-0 flex items-center w-full px-3">
                  <div className=" absolute top-0">
                    <SquareImage
                      anotherStyle={
                        "border-2 dark:border-white border-stone-950 cursor-pointer"
                      }
                      src={
                        userPersonale?.profileImage === ""
                          ? DEFAULT_IMAGE_PROFILE
                          : userPersonale?.profileImage
                      }
                      alt={userPersonale?.username}
                      rounded="rounded-full"
                      size="w-[35px] h-[35px]"
                    />
                  </div>
                  <div className=" ml-12 w-full">
                    <textarea
                      onChange={(e) => setDescriptionValue(e.target.value)}
                      placeholder="Enter description post"
                      type="text"
                      className=" w-full bg-bgk_light dark:bg-bgk_dark text-txt_light dark:text-txt_dark resize-none outline-none"
                    />
                    <div
                      className={` absolute bottom-[-15px] text-sm ${
                        descriptionValue.length >= 1000 ? "text-red-500" : null
                      }`}
                    >
                      {descriptionValue.length} / 1000
                      {descriptionValue.length >= 1000 && (
                        <span className="pl-2">Max 1000 characters</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <SquareImage
                  src={selectedImage}
                  alt={"selected image profile"}
                  size={" w-full h-full"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;

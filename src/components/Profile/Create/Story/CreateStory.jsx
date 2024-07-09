import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { API_URL } from "../../../../constant/url";
import { apiMethod } from "../../../../services/services";
import useUser from "../../../../hooks/useUser";
import { LiaDownloadSolid } from "react-icons/lia";
import { PiStickerLight, PiTextAaBold } from "react-icons/pi";
import { IoMdBrush } from "react-icons/io";
import { BsPlusCircleDotted } from "react-icons/bs";

const CreateStory = ({
  setShowPreview,
  showPreview,
  selectedImage,
  fileRef,
}) => {
  const { handelUpdateStateUserPersonale, userPersonale } = useUser();
  const [loadin, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleCancel = () => {
    setShowPreview(false);
  };

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
          const fileUrl = API_URL + "uploads/createStory";
          // console.log(fileUrl);
          const bodyData = {
            url: reader.result,
            alt: "some txt",
            created: Date.now(),
          };
          console.log(bodyData);
          const dataFile = await apiMethod(fileUrl, "POST", bodyData);
          console.log(dataFile);
          if (dataFile.user) {
            console.log(dataFile.user);
            handelUpdateStateUserPersonale(dataFile.user);
            console.log("Story added success full");
            setLoading(false);
          }
        });
        handleCancel();
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
    <div >
      {showPreview && (
        <div className=" absolute top-0 left-0 h-screen w-full max-w-[700px] z-40">
          <div className=" flex justify-between text-white bg-gradient-to-b from-[#000000a9] to-transparent text-3xl absolute top-0 left-0 w-full p-3">
            <div>
              <MdClose onClick={handleCancel} />
            </div>
            <div className=" flex items-center gap-5">
              <div>
                <LiaDownloadSolid />
              </div>
              <div>
                <PiStickerLight />
              </div>
              <div>
                <IoMdBrush />
              </div>
              <div>
                <PiTextAaBold />
              </div>
            </div>
          </div>
          <img src={selectedImage} className=" h-screen w-full object-cover" alt="" />
          <div
            onClick={handleSave}
            className=" absolute text-white bottom-8 left-[50%] translate-x-[-50%] flex items-center gap-3 text-md font-semibold"
          >
            <div className=" text-2xl">
              <BsPlusCircleDotted />
            </div>
            <div>
              <p>Add to your story</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStory;

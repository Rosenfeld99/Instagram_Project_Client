import React, { useRef, useState } from "react";
import { API_URL, DEFAULT_IMAGE_PROFILE } from "../../../../constant/url";
import { apiMethod } from "../../../../services/services";
import SquareImage from "../../../Profile/Home/ShowSuggest/Card/comps/SquareImage";
import { MdClose } from "react-icons/md";
import useUser from "../../../../hooks/useUser";
import NavTopMobile from "../../../../utils/NavTopMobile";
import ModalUpLoadImg from "./ModalUpLoadImg";

const UpdateImageProfile = () => {
  const { userPersonale, getInfoUserPersonale,handelUpdateStateUserPersonale } = useUser();
  const fileRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loadin, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileChange = () => {
    const file = fileRef.current.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setShowPreview(true);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setShowPreview(false);
  };

  const handleConfirm = () => {
    setShowPreview(false);
  };

  const handleSave = async () => {
    try {
      const myFile = fileRef.current.files[0];
      console.log(myFile);
      if (myFile) {
        // if select file
        setLoading(true);
        const reader = new FileReader();
        // replace to string 64 bites to can send in the body request
        reader.readAsDataURL(myFile);
        reader.addEventListener("loadend", async () => {
          const fileUrl = API_URL + "uploads/profileImage";
          console.log(fileUrl);
          const dataFile = await apiMethod(fileUrl, "POST", {
            myFile: reader.result,
          });
          if (dataFile.user) {
            // console.log(dataFile.user);
            handelUpdateStateUserPersonale(dataFile.user);
            console.log("user updated success full");
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
    <p className=" text-[16px] font-semibold py-1">Profile Photo</p>
  );
  const right = (
    <p
      onClick={handleSave}
      className=" text-[16px] font-semibold text-btn_follow"
    >
      Save
    </p>
  );
  const left = <MdClose onClick={handleCancel} />;

  return (
    <div>
      <input
        ref={fileRef}
        onChange={handleFileChange}
        type="file"
        className="hidden"
      />
      <div className="flex items-center gap-5 relative">
        <SquareImage
          src={
            userPersonale?.profileImage === ""
              ? DEFAULT_IMAGE_PROFILE
              : userPersonale?.profileImage
          }
          alt={userPersonale?.username}
          rounded="rounded-full"
          size="w-[60px] h-[60px]"
        />
        {loadin && (
          <div className=" p-3.5 absolute left-0 top-0 rounded-full w-[60px] h-[60px] bg-[#6463639d]">
            <img
              className="w-20"
              src="https://i.stack.imgur.com/vT8DJ.gif"
              alt=""
            />
          </div>
        )}
        <div className="font-semibold relative">
          <p>{userPersonale?.username}</p>
          <p
            onClick={() => {
              userPersonale?.profileImage === ""
                ? fileRef.current.click()
                : setOpen(true);
            }}
            className="text-btn_follow"
          >
            Change profile photo
          </p>
        </div>
      </div>
      {showPreview && (
        <div>
          <div className=" absolute top-0 left-0 bg-bgk_light dark:bg-bgk_dark w-full h-screen z-40 text-txt_light dark:text-txt_dark">
            <div className=" z-50">
              <NavTopMobile left={left} cenetr1={cenetr1} right={right} />
            </div>
            <div className=" my-[50%]">
              <SquareImage
                src={selectedImage}
                alt={"selected image profile"}
                size={" w-full h-full"}
              />
            </div>
          </div>
          <div className="mt-5">
            <img
              src={selectedImage}
              alt="Selected profile"
              className="w-40 h-40"
            />
            <div className="flex gap-3 mt-3">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleConfirm}>Save</button>
            </div>
          </div>
        </div>
      )}
      {open && (
        <ModalUpLoadImg open={open} setOpen={setOpen} fileRef={fileRef} />
      )}
    </div>
  );
};

export default UpdateImageProfile;

import { BiGrid } from "react-icons/bi";
import { BsPlusCircleDotted } from "react-icons/bs";
import ModalBtn from "../../../../utils/ModalBtn";

const ModalCreate = ({
  setOpen,
  open,
  modalRef,
  fileRef,
  showPreview,
  setShowPreview,
  selectedImage,
  setSelectedImage,
  setValue,
  value
}) => {
  const handleFileChange = () => {
    const file = fileRef.current.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setShowPreview(true);
      setOpen(false);
    }
  };

  console.log(value);

  return (
    <ModalBtn modalRef={modalRef} open={open} setOpen={setOpen}>
      <div className=" absolute top-10 right-[-35px] text-sm font-[400] w-[100px] z-40">
        <ul className=" flex items-center justify-center flex-col bg-bgk_light dark:bg-bgk_dark text-txt_light dark:text-txt_dark p-3 gap-3 rounded-lg shadow-lg">
          <div
            className=" flex items-center justify-between w-full"
            onClick={() => {
              fileRef.current.click();
              //    setOpen(true);
              setValue("post");
            }}
          >
            <input
              ref={fileRef}
              onChange={handleFileChange}
              type="file"
              className="hidden"
            />
            Post <BiGrid className=" text-lg" />
          </div>
          <div
            className=" flex items-center justify-between w-full"
            onClick={() => {
              fileRef.current.click();

              setValue("story");
            }}
          >
            Story <BsPlusCircleDotted className=" text-lg" />
          </div>
        </ul>
      </div>
    </ModalBtn>
  );
};

export default ModalCreate;

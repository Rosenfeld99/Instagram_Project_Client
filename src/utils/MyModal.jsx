import React, { useEffect } from "react";

const MyModal = ({ children, modalRef, open, setOpen }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, modalRef, setOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {open && <div className="fixed inset-0 bg-black opacity-60 z-40"></div>}
      <div className="bg-bgk_light dark:bg-[#262627] rounded-2xl text-txt_light dark:text-txt_dark">
        {children}
      </div>
    </div>
  );
};

export default MyModal;

import React, { useEffect } from "react";

const ModalBtn = ({ children, modalRef, open, setOpen }) => {
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

  return <>{children}</>;
};

export default ModalBtn;

import React from "react";

const SquareImage = ({ src, alt, size, rounded, anotherStyle }) => {
  return (
    <div
      className={`flex justify-center items-center ${size} overflow-hidden ${rounded} ${anotherStyle}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover bg-slate-400"
      />
    </div>
  );
};

export default SquareImage;

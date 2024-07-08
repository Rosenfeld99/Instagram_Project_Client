import React from "react";

const LoadingPage = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center flex-col">
      <div>
        <img
          className=" w-24"
          src="https://cdn.freebiesupply.com/images/large/2x/instagram-logo-gradient-transparent.png"
          alt=""
        />
      </div>
      <div className=" text-center absolute bottom-7 ">
        <p className=" text-txt_title">Aother</p>
        <p className="text-lg font-semibold bg-gradient-to-r text-transparent bg-clip-text from-[#e0a119] via-[#ff00c3] to-[#9500ff]">
          Eli Rosenfeld
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;

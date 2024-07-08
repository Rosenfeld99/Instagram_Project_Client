import React from "react";
import NextBtn from "../../EmailOrPhone/comps/NextBtn";
import useAuth from "../../../../../hooks/useAuth";
import LoadingBtn from "../../../comps/LoadingBtn";

const BottomContent = ({ onNext, condition }) => {
  const { loading } = useAuth();

  return (
    <div className=" flex items-center justify-center flex-col w-full gap-3">
      <div>
        <p className=" text-[12px] px-6">
          People who use our service may have uploaded your contact information
          to Instagram. Learn More
        </p>
      </div>
      <div>
        <p className=" text-[12px] px-6">
          By signing up, you agree to our Terms , Privacy Policy and Cookies
          Policy .
        </p>
      </div>
      <div className=" w-full relative">
        {loading && (
          <LoadingBtn/>
        )}
        <NextBtn condition={condition ? "opacity-50" : null} onNext={onNext} />
      </div>
    </div>
  );
};

export default BottomContent;

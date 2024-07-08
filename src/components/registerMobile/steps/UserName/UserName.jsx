import { useEffect, useState } from "react";
import ModalError from "../../comps/ModalError";
import BottomContent from "./comps/BottomContent";
import { useNavigate } from "react-router-dom";
import { USER_ROUTE } from "../../../../constant/url";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import InputUserName from "./comps/InputUserName";

const UserName = ({ userSignUp, setUserSignUp }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const condition = userName === "";
  const { loading, error, status, signUp, handelResetStatus } = useAuth();
  const [isExists, setIsExists] = useState(true);
  const updateUserSignUp = { ...userSignUp };

  const onNext = async () => {
    if (condition) {
      return;
    }

    try {
      // Check if the username exists in the backend
      const response = await axios.get(
        USER_ROUTE + "check-parameter/username/" + userName
      );

      if (response.data.exists) {
        setOpen(true); // Username exists, show error modal
      } else {
        // Username is available, proceed to the next step
        updateUserSignUp.username = userName;
        setUserSignUp(updateUserSignUp);
        console.log(userSignUp);
        setIsExists(response.data.exists);
      }
    } catch (error) {
      console.log("Error checking username:", error);
    }
  };

  // Define a function to handle signUp and await its execution
  const handleSignUp = async () => {
    try {
      await signUp(userSignUp);
      // The signUp request has completed successfully
    } catch (error) {
      // Handle any errors that occur during signUp
      console.log("Error signing up:", error);
    }
  };

  // By useEffect watch end render if userName is no in exists
  useEffect(() => {
    if (!isExists) {
      handleSignUp();
    }
  }, [isExists]);

  useEffect(() => {
    if (!error && !loading && status) {
      nav("/login");
      handelResetStatus();
    }
  }, [error, loading, status]);
  return (
    <div className=" flex items-center pt-20 flex-col p-9 text-center gap-10 w-full min-h-screen bg-white text-black">
      <div className="flex items-center justify-center flex-col text-center gap-3">
        <div>
          <p className=" font-semibold">Create username</p>
        </div>
        <div>
          <p className=" text-txt_all_small">
            Pick a username for your account. You can always change it later.
          </p>
        </div>
        {/* input userName */}
        <InputUserName setUserName={setUserName} userName={userName} />
      </div>
      {/* bottom content end Next btm to finish steps */}
      <BottomContent condition={condition} onNext={onNext} />

      {/* if userName allredy is system ? pop modal error to try another userName */}
      {open && (
        <ModalError open={open} setOpen={setOpen} propertyName={"username"} />
      )}
    </div>
  );
};

export default UserName;

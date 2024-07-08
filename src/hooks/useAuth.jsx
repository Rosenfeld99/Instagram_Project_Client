import { useDispatch, useSelector } from "react-redux";
import {
  resetAuth,
  resetStatus,
  signInRequest,
  signUpRequest,
} from "../redux/fetrued/authSlice";

const useAuth = () => {
  const { user, loading, error, status, auth } = useSelector(
    (store) => store.authReducer
  );
  const dispatch = useDispatch();
  const signUp = (_bodyData) => {
    dispatch(signUpRequest(_bodyData));
  };
  const signIn = (_bodyData) => {
    dispatch(signInRequest(_bodyData));
  };
  const handelResetStatus = () => {
    dispatch(resetStatus());
  };
  const handelResetAuth = () => {
    dispatch(resetAuth());
  };
  return {
    user,
    loading,
    error,
    status,
    auth,
    signIn,
    signUp,
    handelResetStatus,
    handelResetAuth,
  };
};

export default useAuth;

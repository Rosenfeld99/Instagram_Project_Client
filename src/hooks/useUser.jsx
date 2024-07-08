import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserInfo,
  getSinglePost,
  getSuggestedAccounts,
  getUserByuserName,
  getUserFeed,
  getUserPersinale,
  logOut,
  remodevImageProfile,
  remodevPost,
  resetStatus,
  upDateFeedGrid,
  upDateSinglePost,
  upDateStateUserPersonale,
} from "../redux/fetrued/userSlice";

const useUser = () => {
  const {
    loading,
    error,
    userPersonale,
    userTest,
    usersSuggestedAccounts,
    status,
    singlePost,
    userFeed,
  } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();

  const getInfoUserPersonale = (_url) => {
    dispatch(getUserPersinale(_url));
  };
  const getByUserName = (userName) => {
    dispatch(getUserByuserName(userName));
  };
  const upDateUserPersonale = (bodyData) => {
    dispatch(editUserInfo(bodyData));
  };
  const getSuggested = () => {
    dispatch(getSuggestedAccounts());
  };
  const handelLogOut = () => {
    dispatch(logOut());
  };
  const handelResetStatus = () => {
    dispatch(resetStatus());
  };
  const remodedCurrentImage = () => {
    dispatch(remodevImageProfile());
  };
  const handelUpdateStateUserPersonale = (userData) => {
    dispatch(upDateStateUserPersonale(userData));
  };
  const handelRemodevPost = (postId) => {
    dispatch(remodevPost(postId));
  };
  const handelGetSinglePost = (ids) => {
    dispatch(getSinglePost(ids));
  };
  const handelUpdateSinglePost = (single) => {
    dispatch(upDateSinglePost(single));
  };
  const handelFeed = (page) => {
    dispatch(getUserFeed(page));
  };
  const handelUpdateGridItem = (gridItem) => {
    dispatch(upDateFeedGrid(gridItem));
  };

  return {
    loading,
    error,
    status,
    userTest,
    userPersonale,
    usersSuggestedAccounts,
    singlePost,
    userFeed,
    getInfoUserPersonale,
    getSuggested,
    getByUserName,
    handelLogOut,
    handelResetStatus,
    upDateUserPersonale,
    remodedCurrentImage,
    handelUpdateStateUserPersonale,
    handelRemodevPost,
    handelGetSinglePost,
    handelUpdateSinglePost,
    handelFeed,
    handelUpdateGridItem,
  };
};

export default useUser;

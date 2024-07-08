import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "../pages/Home";
import NavMobile from "../components/Menus/NavMobile";
import PersonaleProfile from "../pages/PersonaleProfile";
import EditProfile from "../pages/EditProfile";
import SettingsPage from "../components/settings/SettingsPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Promo from "../components/registerMobile/Promo";
import Page404 from "../pages/Page404";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { TOKEN_KEY } from "../constant/url";
import LoadingPage from "../pages/LoadingPage";
import CreateStyle from "../components/settings/account/comps/CreateStyle";
import FollowingList from "../components/Profile/Following_Follower/Following/FollowingList";
import FollowerList from "../components/Profile/Following_Follower/Follower/FollowerList";
import Notifications from "../pages/Notifications";
import SinglePost from "../components/Profile/View/Post/SinglePost";
import CommentsPage from "../components/Profile/View/Post/CommentsPage";
import SingleStory from "../components/Profile/View/Stories/SingleStory";
import NavDesktop from "../components/Menus/NavDesktop";

const AppRoust = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Added state for loading
  const { getInfoUserPersonale, userPersonale, getByUserName, getSuggested } =
    useUser();
  const { userName } = useParams();

  useEffect(() => {
    // Simulating a loading delay for demonstration purposes
    if (localStorage[TOKEN_KEY]) {
      getInfoUserPersonale();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed
  }, [auth, localStorage[TOKEN_KEY]]);

  if (isLoading) {
    return <LoadingPage />; // Show loading page while waiting
  }
  return (
    <BrowserRouter>
      {/* Mobile nav */}
      <NavMobile />
      {/* Desktop nav */}
      <NavDesktop />
      <Routes>
        <Route index element={userPersonale ? <Home /> : <Promo />} />
        {userPersonale?._id && (
          <>
            {/* Personale Profile /  Following A User Profile / Not Following A Profile*/}
            <Route path={"/:userName/"} element={<PersonaleProfile />} />
            <Route path={"/:userName/feed/"} element={<PersonaleProfile />} />
            <Route path={"/:userName/reels/"} element={<PersonaleProfile />} />
            <Route path={"/:userName/saved/"} element={<PersonaleProfile />} />
            <Route path={"/:userName/tagged/"} element={<PersonaleProfile />} />
            <Route path={"/:userName/tagged/"} element={<PersonaleProfile />} />
            {/* Following */}
            <Route path={"/:userName/following/"} element={<FollowingList />} />
            {/* Followers */}
            <Route path={"/:userName/followers/"} element={<FollowerList />} />
            {/* Notifications */}
            <Route path={"/notifications/"} element={<Notifications />} />
            {/* View single post */}
            <Route path={"/p/:userName/:postId/"} element={<SinglePost />} />
            <Route path={"/p/:postId/:userName/comments/"} element={<CommentsPage />} />
            {/* View single story */}
            <Route path={"/stories/:userName/:storyId/"} element={<SingleStory />} />
            {/* Accounts */}
            <Route path="/accounts/settings/" element={<SettingsPage />} />
            <Route path="/accounts/edit/" element={<EditProfile />} />
            <Route path="create/style/" element={<CreateStyle />} />
          </>
        )}

        {/* login end register */}
        <Route path="login" element={<Login />} />
        <Route path="/accounts/signup/:parametr" element={<Register />} />

        {/* page not found */}
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoust;

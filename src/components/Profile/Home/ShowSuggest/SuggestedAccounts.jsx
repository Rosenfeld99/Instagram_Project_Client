import React from "react";
import CardList from "./Card/CardList";
import DarkModeToggle from "../../../settings/theme/DarkModeToggle";

const SuggestedAccounts = () => {
  return (
    <div className=" pt-20 min-h-screen dark:bg-bgk_suggested_dark bg-bgk_suggested_light gap-28 flex flex-col">
      <div className="text-center flex items-center flex-col gap-2">
        <p className=" text-2xl font-bold">Welcome to Instagram</p>
        <p className=" text-category_bio">
          When you follow people, you'll see the photos and videos they post
          here.
          <DarkModeToggle />
        </p>
      </div>
      <div className=" flex items-center justify-center">
        <CardList />
      </div>
    </div>
  );
};

export default SuggestedAccounts;

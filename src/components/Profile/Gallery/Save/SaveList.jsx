import React from "react";
import SaveItem from "./SaveItem";
import { users } from "../../../../../db/data";
import EmptyGallery from "../comps/EmptyGallery";
import { CiBookmark } from "react-icons/ci";

const SaveList = () => {
  const saved = users[0]?.saved;
  console.log(saved);
  return (
    <div>
      {false ? (
        <div className=" grid grid-cols-3 grid-rows-2 mb-11 gap-1">
          {saved?.map((save, i) => (
            <SaveItem save={save?.images[0]?.url} key={i} />
          ))}
        </div>
      ) : (
        <EmptyGallery
          iconType={<CiBookmark />}
          titleType={"Save"}
          content={"Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved."}
          titleInfo={"Only you can see what you've saved"}
        />
      )}
    </div>
  );
};

export default SaveList;

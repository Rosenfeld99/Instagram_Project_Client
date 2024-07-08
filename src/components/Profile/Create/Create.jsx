import React from "react";
import CreatePost from "./Post/CreatePost";
import CreateStory from "./Story/CreateStory";

const Create = ({
  selectedImage,
  setShowPreview,
  showPreview,
  fileRef,
  typeValue,
}) => {
  console.log(fileRef?.current?.files[0]);
  console.log(typeValue);
  return (
    <div>
      {showPreview && (
        <div>
          {typeValue === "post" ? (
            <CreatePost
              selectedImage={selectedImage}
              setShowPreview={setShowPreview}
              showPreview={showPreview}
              fileRef={fileRef?.current?.files[0]}
            />
          ) : (
            <CreateStory
              selectedImage={selectedImage}
              setShowPreview={setShowPreview}
              showPreview={showPreview}
              fileRef={fileRef?.current?.files[0]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Create;

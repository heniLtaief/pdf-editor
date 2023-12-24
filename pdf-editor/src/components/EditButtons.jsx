import React from "react";

const EditButtons = ({ handleTextButtonClick, handleImageButtonClick }) => {
  return (
    <>
      <button
        onClick={handleTextButtonClick}
        className="h-8 w-24 rounded-lg bg-[#5569F7] text-white"
      >
        Text
      </button>
      <button
        onClick={handleImageButtonClick}
        className="h-8 w-24 rounded-lg bg-[#5569F7] text-white"
      >
        Image
      </button>
    </>
  );
};

export default EditButtons;

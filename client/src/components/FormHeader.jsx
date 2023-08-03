import React, { useEffect, useState } from "react";
import { blockStyle, formInputStyle, imageButtonStyle } from "../custom.js";

export default function FormHeader({formHeader, headerChange}) {

  const [headTitle, setHeadTitle]= useState(formHeader.headTitle || "");
  const [headImage, setHeadImage]= useState(formHeader.headImage || "");

  useEffect(() => {
    headerChange({ headTitle, headImage });
  }, [headTitle,headImage]);




  return (
    <div className={blockStyle}>
      <div className="flex h-24 items-center">
        <div id="form-title" className="flex-auto w-3/4 text-center mx-5">
          <input
            type="text"
            className={formInputStyle}
            placeholder="Enter Form Title"
            value={headTitle}
            onChange={(e)=> setHeadTitle(e.target.value)}
          ></input>
        </div>
        <div id="header image" className="flex-auto w-1/4 mx-5">
          <input
            type="file"
            className={imageButtonStyle}
            onChange={(e)=> setHeadImage(e.target.value)}
            accept=".jpg, .jpeg, .png"
          />
        </div>
      </div>
    </div>
  );
}

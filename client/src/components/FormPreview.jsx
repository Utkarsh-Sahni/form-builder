
import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import CategorizePreview from "../preview/CategorizePreview";
import ClozePreview from "../preview/ClozePreview";
import ComprehensionPreview from "../preview/ComprehensionPreview";

export default function FormPreview({ formData }) {
  const categorizeData =  formData[0].questionData;
  const clozeData = formData[1].questionData|| {};
  const comprehensionData = formData[2].questionData || {};

  return (
    <div>
      <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-md">
      
        <CategorizePreview  categorizeData={categorizeData}/>
        {/* Cloze Question */}
        <ClozePreview clozeData={clozeData}/>

        {/* Comprehension Question */}
        <ComprehensionPreview comprehensionData={comprehensionData}/>
      </div>
      <div className="w-fit mx-auto my-5">
        <Link to="/">
          <button
            className="bg-green-500 p-2 rounded-full text-white hover:bg-green-700"
          >
            Edit Form
          </button>
        </Link>
      </div>
    </div>
  );
}

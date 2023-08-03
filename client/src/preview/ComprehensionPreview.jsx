import { getStepContentUtilityClass } from "@mui/material";
import React, { useState } from "react";

export default function ComprehensionPreview({ comprehensionData }) {
  const { question3, image3, mcqs } =
    Object.keys(comprehensionData).length === 0 &&
    comprehensionData.constructor === Object
      ? { question3: "", image3: "", mcqs: [] }
      : comprehensionData;

      const [selectedAnswers, setSelectedAnswers]= useState(Array(mcqs.length));

        const handleAnswer =(answer,index1) => {
            const answers=[...selectedAnswers];
            answers[index1]=answer;
            setSelectedAnswers(answers);
        }
        // console.log("mcq ans",selectedAnswers);

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-md my-2">
      {question3 && (
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
            Question 3: Comprehension
            </h3>
            {image3 && (
              <img
                src={image3}
                alt="Comprehension"
                className="w-full rounded-lg mb-4"
              />
            )}
            <p>{question3}</p>
          </div>
          <div className="mt-10">
            <h4 className="font-medium">Answer the following question fron the passage:</h4>
            {mcqs.map((mcq, index1) => (
              <div key={index1} className="border border-gray-200 p-3 rounded-md mt-5">
                <p className="mb-2">Question 3.{index1+1}:</p>
                <p className="mb-5">{mcq.question}</p>
                {mcq.options.map((option, index2) => (
                  <div className="flex items-center my-3 ml-10" key={index2}>
                    <input
                      className="mx-1"
                      type="radio"
                      onClick={() => handleAnswer(option,index1)}
                    />
                    <div className="flex-auto">
                      <label>{option}</label>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { blockStyle, formInputStyle, imageButtonStyle } from "../../custom";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";

export default function ClozeQuestion({ questionData, formChange }) {
  const [question2, setQuestion2] = useState(questionData.question2 || []);
  const [image2, setImage2] = useState(questionData.image2 || "");
  const [options, setOptions] = useState(questionData.options || []);

  let question ;
  useEffect(() => {
    formChange({ question2, image2, options });
  }, [question2, image2, options]);

  const handleQuestionChange = (e) => {
    question=e.target.value;
    const questionText = e.target.value;
    const words = questionText.split(' ');
    // Extracting words in [[]] and setting them as options
    const updatedOptions = [];
    const updatedWords=[];
    for (let word of words) {
      if (word.startsWith("[[") && word.endsWith("]]")) {
        updatedOptions.push(word.slice(2, -2));
        updatedWords.push("");
      }
      else {
        updatedWords.push(word);
      }
    }
    console.log("words", updatedWords);
    setOptions(updatedOptions);
    setQuestion2(updatedWords);

  };

  const handleImageChange = (e) => {
    setImage2(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  return (
    <div className={blockStyle}>
      <div className="p-5">
        <div className="mb-2">
          <label htmlFor="ques2">Question 2 : Cloze</label>
        </div>
        <div className="flex items-center">
          <div className="flex-auto w-3/4 mx-2">
            <textarea
              id="ques2"
              className={formInputStyle}
              rows={1}
              placeholder="Put the words in [[word]] to convert them into blanks"
              value={question} 
              onChange={(e) => handleQuestionChange(e)}
            ></textarea>
          </div>
          <div className="flex-auto w-1/4 mx-2">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              value={image2}
              onChange={(e) => handleImageChange(e)}
              className={imageButtonStyle}
            />
          </div>
        </div>

        {/* Set Answers  */}
        <div className="my-5 w-1/2 text-center">
          <label>Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center w-full my-2">
              <div className="flex-auto mx-2">
                <input
                  type="text"
                  className={formInputStyle}
                  value={option}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => handleOptionChange(e, index)}
                />
              </div>
  
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

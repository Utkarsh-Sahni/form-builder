import React, { useState, useEffect } from "react";
import { blockStyle, formInputStyle, imageButtonStyle } from "../../custom";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";

export default function ComprehensionQuestion({questionData, formChange }) {
  const [question3, setQuestion3] = useState(questionData.question3|| "");
  const [image3, setImage3] = useState(questionData.image3 || "");
  const [mcqs, setMcqs] = useState(questionData.mcqs|| [{ question: "", options: [""] }]);

  useEffect(() => {
    formChange({ question3, image3, mcqs });
  }, [question3, image3, mcqs]);

  const handleQuestionChange = (e) => {
    setQuestion3(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage3(e.target.value);
  };

  const handleMcqQuestionChange = (e, index) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[index].question = e.target.value;
    setMcqs(updatedMcqs);
  };

  const handleMcqOptionChange = (e, index1, index2) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[index1].options[index2] = e.target.value;
    setMcqs(updatedMcqs);
  };
  const addOption = (index1) => {
    const updatedMcqs = [...mcqs];
    const options = updatedMcqs[index1].options;
    updatedMcqs[index1] = { options: [...options, ""] };
    setMcqs(updatedMcqs);
  };

  const removeOption = (index1, index2) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[index1].options.splice(index2, 1);
    setMcqs(updatedMcqs);
  };

  const addMcq = () => {
    setMcqs([...mcqs, { question: "", options: [""] }]);
  };

  const removeMcq = (index1) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs.splice(index1, 1);
    setMcqs(updatedMcqs);
  };

  return (
    <div className={blockStyle}>
      <div className="p-5">
        <div className="mb-2">
          <label htmlFor="ques3">Question 3: Comprehension MCQs</label>
        </div>
        <div className="flex items-center">
          <div className="flex-auto w-3/4">
            <textarea
              id="ques3"
              value={question3}
              className={formInputStyle}
              rows={1}
              placeholder="Enter the Passage"
              onChange={(e) => handleQuestionChange(e)}
            ></textarea>
          </div>
          <div className="flex-auto w-1/4">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              value={image3}
              onChange={(e) => handleImageChange(e)}
              className={imageButtonStyle}
            />
          </div>
        </div>

        {/* Add MCQs  */}
        <div className="mt-10">
          Set MCQs
          <div className="border border-gray-1 p-3 rounded-md mt-5" >
            {mcqs.map((mcq, index1) => (
              <div key={index1} className="flex items-center">
                <div className="border-2 border-gray-100 rounded-md p-3 flex-auto mx-2">
                  <label>Question 3.{index1 + 1}</label>
                  <textarea
                    id="mcq1"
                    value={mcq.question}
                    className={formInputStyle}
                    placeholder="Question related to passage"
                    rows={1}
                    onChange={(e) => handleMcqQuestionChange(e, index1)}
                  ></textarea>
                  <div className="text-center w-2/3 my-5">
                    Options
                    {mcq.options.map((option, index2) => (
                      <div className="flex items-center my-3">
                        <input className="mx-1" type="radio" disabled />
                        <div className="flex-auto">
                          <input
                            value={option}
                            key={index2}
                            className={formInputStyle}
                            placeholder={`Option ${index2+1}`}
                            onChange={(e) =>
                              handleMcqOptionChange(e, index1, index2)
                            }
                          />
                        </div>
                        <div className="flex-auto mx-2">
                          <RemoveIcon
                            onClick={() => removeOption(index1, index2)}
                            color="error"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    ))}
                    <AddIcon
                      onClick={() => addOption(index1)}
                      color="primary"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <RemoveIcon
                  onClick={() => removeMcq(index1)}
                  color="error"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
            <div className="w-full text-center">
              <AddIcon
                onClick={addMcq}
                color="primary"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

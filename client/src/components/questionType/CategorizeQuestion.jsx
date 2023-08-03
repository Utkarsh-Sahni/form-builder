import React, { useEffect, useState } from "react";
import { blockStyle, formInputStyle, imageButtonStyle } from "../../custom";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";

export default function CategorizeQuestion({questionData, formChange }) {
  const [question1, setQuestion1] = useState(questionData.question1 || "");
  const [image1, setImage1] = useState(questionData.image1 ||"");
  const [categories, setCategories] = useState(questionData.categories || ["", ""]);
  const [answers, setAnswers] = useState(questionData.answers || ["", ""]);

  useEffect(() => {
    formChange({ question1, image1, categories, answers });
  }, [question1, image1, categories, answers]);

  const handleQuestionChange = (e) => {
    setQuestion1(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage1(e.target.value);
  };

  const handleCategoryChange = (index, e) => {
    const category = e.target.value;
    const updatedCategories = [...categories];
    updatedCategories[index] = category;
    setCategories(updatedCategories);
  };

  const addCategory = () => {
    setCategories([...categories, ""]);
  };

  const removeCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleAnswerChange = (index, e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const removeAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers.splice(index, 1);
    setAnswers(updatedAnswers);
  };

  const addAnswers = () => {
    setAnswers([...answers, ""]);
  };

  return (
    <div className={blockStyle}>
      <div className="p-5">
        <div className="my-2">
        <label htmlFor="ques1">Question 1: Categorize</label>
        </div>
        <div className="flex items-center">
          <div className="flex-auto w-3/4 mx-4">
            <textarea
              id="ques1"
              className={`${formInputStyle} h-auto`}
              rows={1}
              placeholder="Ex: Categorize the Following"
              value={question1}
              onChange={(e) => handleQuestionChange(e)}
            ></textarea>
          </div>
          <div className="flex-auto w-1/4">
            <input
              type="file"
              className={imageButtonStyle}
              value={image1}
              onChange={(e) => handleImageChange(e)}
              accept=".jpg, .jpeg, .png"
            />
          </div>
        </div>

        {/* Define Categories  */}
        <div className="my-5 w-1/2 text-center">
          <label>Categories</label>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center w-full my-2">
              <div className="flex-auto mx-2">
                <input
                  type="text"
                  className={formInputStyle}
                  value={category}
                  placeholder={`Category ${index + 1}`}
                  onChange={(e) => handleCategoryChange(index, e)}
                />
              </div>
              <div className="flex-auto mx-2">
                <RemoveIcon
                  onClick={() => removeCategory(index)}
                  color="error"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
          <AddIcon
            onClick={addCategory}
            color="primary"
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Define Answers  */}
        <div className=" my-5 w-1/2 text-center">
          <label> Set Answers </label>
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center w-full my-2">
              <div className="flex-auto mx-2">
                <input
                  value={answer}
                  className={formInputStyle}
                  placeholder={`Answer ${index + 1}`}
                  onChange={(e) => handleAnswerChange(index, e)}
                />
              </div>
              <div className="flex-auto mx-2">
                <RemoveIcon
                  onClick={() => removeAnswer(index)}
                  color="error"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
          <AddIcon
            onClick={addAnswers}
            color="primary"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

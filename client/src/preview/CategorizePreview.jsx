import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd";

export default function CategorizePreview({ categorizeData }) {
  const { question1, image1, categories, answers } =
    Object.keys(categorizeData).length === 0 &&
    categorizeData.constructor === Object
      ? { question1: "", image1: "", categories: [], answers: [] }
      : categorizeData;
      
  const [answerArea, setAnswerArea] = useState(answers);
  console.log(categorizeData);
  console.log(categories);
  const [categoriesWithAnswers, setCategoriesWithAnswers] = useState(
    categories.map((category) => ({ category, answers: [] }))
  );

  // Helper function to add an answer to a category
  const addAnswerToCategory = (answer, targetCategory) => {
    setCategoriesWithAnswers((prevCategories) => {
      // Remove the answer from the answer area
      const updatedAnswers = answerArea.filter((ans) => ans !== answer);
      setAnswerArea(updatedAnswers);

      // Add the answer to the target category
      const updatedCategories = prevCategories.map((categoryData) => {
        if (categoryData.category === targetCategory) {
          return {
            ...categoryData,
            answers: [...categoryData.answers, answer],
          };
        }
        return categoryData;
      });

      return updatedCategories;
    });
  };

  // Helper function to remove an answer from a category
  const removeAnswerFromCategory = (answer, sourceCategory) => {
    setCategoriesWithAnswers((prevCategories) => {
      return prevCategories.map((categoryData) => {
        if (categoryData.category === sourceCategory) {
          return {
            ...categoryData,
            answers: categoryData.answers.filter((ans) => ans !== answer),
          };
        }
        return categoryData;
      });
    });
  };

  const addToAnswers = (answer) => {
    // Check if the answer is not already present in the Answer Area
    const isAnswerAlreadyInAnswers = answerArea.includes(answer);
  
    // If the answer is not already in the Answer Area, add it
    if (!isAnswerAlreadyInAnswers) {
      setAnswerArea((prevAnswers) => [...prevAnswers, answer]);
    }
  };

  // Define the drag source (answers) and drop target (categories)
  const Answer = ({ answer , category}) => {
    const [{ isDragging }, drag] = useDrag({
      type: "ANSWER",
      item: { answer, sourceCategory : category },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={`px-4 py-2 border rounded-lg mb-2 ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        {answer}
      </div>
    );
  };

  const Category = ({ category }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: "ANSWER",
      drop: (item) => {
        removeAnswerFromCategory(item.answer, item.sourceCategory);
        addAnswerToCategory(item.answer, category);
        console.log(item)
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop}
        className={`border rounded-lg p-4 mb-4 min-h-12 ${
          canDrop && isOver ? "bg-green-100" : ""
        }`}
      >
        <h4 className="text-lg font-semibold mb-2">{category}</h4>
        {categoriesWithAnswers
          .find((c) => c.category === category)
          .answers.map((ans, index) => (
            <Answer key={index} answer={ans} category={category} />
          ))}
      </div>
    );
  };

  const AnswerArea = () => {
    const [, drop] = useDrop({
      accept: "ANSWER",
      drop: (item) => {
        addToAnswers(item.answer,);
        removeAnswerFromCategory(item.answer, item.sourceCategory);

      },
    });

    return (
      <div
        ref={drop}
        className="border rounded-lg p-4 mb-4 min-h-12 bg-gray-100"
      >
        <h4 className="text-lg font-semibold mb-2">Answer Area</h4>
        {answerArea.map((ans, index) => (
          <Answer key={index} answer={ans} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-md my-2">
      {/* Categorize Question */}
      {question1 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Question 1: Categorize</h3>
          {image1 && (
            <img
              src={image1}
              alt="Categorize Question"
              className="w-full rounded-lg mb-4"
            />
          )}
          <p className="mb-2">{question1}</p>

          <div className="flex">
            <div className="w-1/2">
              <AnswerArea />
            </div>

            <div className="w-1/2 ml-4">
              {categories.map((category, index) => (
                <Category key={index} category={category} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

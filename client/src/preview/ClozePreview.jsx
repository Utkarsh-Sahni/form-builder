import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd";


const OptionArea = ({ optionArea, onOptionDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "OPTION",
    drop: (item) => onOptionDrop(item.option),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`flex flex-wrap border p-4 rounded-lg shadow-md ${
        isOver && canDrop ? "bg-green-100" : ""
      }`}
    >
      {optionArea.map((option, index) => (
        <Option key={index} optionText={option} onOptionDrag={onOptionDrop} />
      ))}
    </div>
  );
};

const Blank = ({ index, blankText, onOptionDrop, onOptionDrag }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "OPTION",
    drop: (item) => onOptionDrop(item.option, index),
    canDrop: (item) => blankText === "",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: "OPTION",
    item: { option: blankText },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        onOptionDrag(index);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={(node) => drop(drag(node))}
      className={`border rounded-lg p-2 mb-2 ${
        isOver && canDrop ? "bg-green-100" : ""
      }`}
    >
      {blankText !== "" ? (
        blankText
      ) : (
        <span className="text-gray-400">[blank]</span>
      )}
    </div>
  );
};

// ... (rest of the code remains the same)

const Option = ({ optionText }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "OPTION",
    item: { option: optionText },
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
      {optionText}
    </div>
  );
};

export default function ClozePreview({ clozeData }) {
  const { question2, image2, options } =
    Object.keys(clozeData).length === 0 && clozeData.constructor === Object
      ? { question2:[], image2: "", options: [] }
      : clozeData;
  const [answers, setAnswers] = useState(question2 || []);
  const [optionArea, setOptionArea] = useState(options);

  console.log(answers);
  const handleOptionFill = (option, index) => {
      setOptionArea((prevOptions) => prevOptions.filter((opt) => opt !== option));
  
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = option;
      return updatedAnswers;
    });
  };
  const handleOptionUnFill = (option, index) => {
  
      setOptionArea((prevOptions) => [...prevOptions, option]);
  
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = option;
      return updatedAnswers;
    });
  };

  const removeOption = (index) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = "";
      return updatedAnswers;
    });
  };

  const handleOptionDrag = (index) => {
    setOptionArea((prevOptions) => {
      const updatedOptions = [...prevOptions];
      return updatedOptions;
    });

    removeOption(index);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-md my-2">
      {question2.length!==0 && (
        <div>
          <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-md">
            {/* Cloze Question */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Question 2: Cloze</h3>
              {image2 && (
                <img
                  src={image2}
                  alt="Cloze Question"
                  className="w-full rounded-lg mb-4"
                />
              )}
              <div className="flex items-center">
                {question2.map((word, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && word !== "" && <span>&nbsp;</span>}
                    {word === "" ? (
                      <Blank
                        index={index}
                        blankText={answers[index] || ""}
                        onOptionDrop={handleOptionFill}
                        onOptionDrag={handleOptionDrag}
                      />
                    ) : (
                      <span>{word}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4>Options:</h4>
            <OptionArea optionArea={optionArea} onOptionDrop={handleOptionUnFill} />

          </div>
        </div>
      )}
    </div>
  );
}

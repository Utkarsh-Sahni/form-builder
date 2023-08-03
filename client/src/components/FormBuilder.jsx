import React from "react";
import { useState } from "react";
import FormHeader from "./FormHeader";
import axios from "axios";
import CategorizeQuestion from "./questionType/CategorizeQuestion";
import ClozeQuestion from "./questionType/ClozeQuestion";
import ComprehensionQuestion from "./questionType/ComprehensionQuestion";
import FormPreview from "./FormPreview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default function FormBuilder() {

  const [formHeader, setFormHeader] = useState({});
  const [formQuestions, setFormQuestions] = useState([
    { questionData: {}, type: "categorize" },
    { questionData: {}, type: "cloze" },
    { questionData: {}, type: "comprehension" },
  ]);

  const handleFormHeaderSave = (updatedHeader) => {
    setFormHeader(updatedHeader);
  };

  const handleCategorizeQuestionSave = (questionData) => {
    const updatedFormQuestions = [...formQuestions];
    updatedFormQuestions[0] = { questionData, type: "categorize" };
    setFormQuestions(updatedFormQuestions);
  };

  const handleClozeQuestionSave = (questionData) => {
    const updatedFormQuestions = [...formQuestions];
    updatedFormQuestions[1] = { questionData, type: "cloze" };
    setFormQuestions(updatedFormQuestions);
  };

  const handleComprehensionQuestionSave = (questionData) => {
    const updatedFormQuestions = [...formQuestions];
    updatedFormQuestions[2] = { questionData, type: "comprehension" };
    setFormQuestions(updatedFormQuestions);
  };

  const handleSaveForm = async () => {
    try {
      const formData = {
        formHeader,
        categorizeQuestion: formQuestions[0].questionData,
        clozeQuestion: formQuestions[1].questionData,
        comprehensionQuestion: formQuestions[2].questionData,
      };

      // Call the API to save the form data
      const response = await axios.post("https://form-builder-production.up.railway.app/api/form/save-form", formData);
      console.log("Form Data Saved:", response.data);
      window.alert("Form submitted successfully");
      // Redirect to the form preview page after saving
        } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  console.log(formHeader);
  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <FormHeader
                  formHeader={formHeader}
                  headerChange={handleFormHeaderSave}
                />
                <CategorizeQuestion
                  questionData={formQuestions[0].questionData}
                  formChange={handleCategorizeQuestionSave}
                />
                <ClozeQuestion
                  questionData={formQuestions[1].questionData}
                  formChange={handleClozeQuestionSave}
                />
                <ComprehensionQuestion
                  questionData={formQuestions[2].questionData}
                  formChange={handleComprehensionQuestionSave}
                />
                <div className="w-fit mx-auto my-5">
                  <Link to="view">
                    <button className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-700">
                      Preview Form
                    </button>
                  </Link>
                </div>
                <div className="w-fit mx-auto my-5">
                  {/* Save Button */}
                  <button
                    className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-700"
                    onClick={handleSaveForm}
                  >
                    Save Form
                  </button>
                </div>
              </div>
            }
          />
          <Route
            exact
            path="view"
            element={
              <DndProvider backend={HTML5Backend}>
                <FormPreview formData={formQuestions} />
              </DndProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

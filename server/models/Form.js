import mongoose from "mongoose";

const formSchema= new mongoose.Schema({
    formHeader: {
        title: String,
        image: String,
      },
      categorizeQuestion: {
        question1: String,
        image1: String,
        categories: [String],
        answers: [String]
      },
      clozeQuestion: {
        question2: [String],
        image2: String,
        options: [String],
      },
      comprehensionQuestion: {
        question3: String,
        image3: String,
        mcqs: [
          {
            question: String,
            options: [String],
          },
        ],
      },
})

const Form = mongoose.model('Form',formSchema);

export default Form;    
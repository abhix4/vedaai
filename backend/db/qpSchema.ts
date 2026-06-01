import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },

  marks: {
    type: Number,
    required: true,
  },

  options: {
    type: [String],
    default: [],
  },

  answer: {
    type: String,
    default: "",
  },
});

const SectionSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  instructions: {
    type: String,
    default: "",
  },

  questions: {
    type: [QuestionSchema],
    default: [],
  },
});

const QuestionPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: String,
      trim: true

    },
    dueDate: {
      type: Date,
      required: true
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    sections: {
      type: [SectionSchema],
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

// QuestionPaperSchema.index({ subject: 1 });

// QuestionPaperSchema.index({ createdAt: -1 });

export const QuestionPaper = mongoose.model(
  "QuestionPaper",
  QuestionPaperSchema
);

// export default mongoose.model('QuestionPaper', QuestionPaperSchema)
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    answerText: {
      type: String,
      required: true,
    },

    aiFeedback: {
      type: String,
      default: "",
    },

    aiMarks: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["submitted", "evaluated"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
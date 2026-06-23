import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Subject",
  subjectSchema
);
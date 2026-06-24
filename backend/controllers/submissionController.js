import Submission from "../models/submission.model.js";
import Assignment from "../models/assignment.model.js";
import { generateEvaluation } from "../utils/gemini.js";
import { evaluateAnswerWithGemini } from "../utils/gemini.js";


export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, answerText, fileUrl } = req.body;

    if (!assignmentId) {
      return res.status(400).json({
        success: false,
        message: "Assignment ID required",
      });
    }

    const submission = await Submission.create({
      assignment: assignmentId,
      student: req.user._id,
      answerText,
      fileUrl,
    });

    res.status(201).json({
      success: true,
      message: "Assignment submitted successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await Submission.find({
      assignment: assignmentId,
    })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const evaluateSubmission = async (req, res) => {
  try {
    const { submissionId } = req.body;

    const submission = await Submission.findById(submissionId)
      .populate("assignment");

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    const aiResult = await generateEvaluation({
      question: submission.assignment.description,
      answer: submission.answerText,
      maxMarks: submission.assignment.maxMarks,
    });

    submission.aiEvaluation = aiResult;
    submission.status = "evaluated";

    await submission.save();

    return res.status(200).json({
      success: true,
      message: "AI evaluation completed",
      aiResult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createSubmission = async (req, res) => {
  try {
    const { assignmentId, answerText } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // 1. Save submission
    const submission = await Submission.create({
      studentId: req.user._id,
      assignmentId,
      answerText,
    });

    // 2. AI Evaluation
    const aiResult = await evaluateAnswerWithGemini(
      assignment.title + " - " + assignment.description,
      answerText
    );

    // 3. Update submission with AI result
    submission.aiFeedback = aiResult;
    submission.aiMarks = extractMarks(aiResult);
    submission.status = "evaluated";

    await submission.save();

    res.json({
      success: true,
      message: "Submission evaluated successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// helper function
const extractMarks = (text) => {
  const match = text.match(/(\d+)\s*\/\s*10/);
  return match ? Number(match[1]) : 0;
};

export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("studentId", "name email")
      .populate("assignmentId", "title description");

    res.json({
      success: true,
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
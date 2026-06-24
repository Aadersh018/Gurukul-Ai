import Assignment from "../models/assignment.model.js";
import User from "../models/user.model.js";


export const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, classId, dueDate, maxMarks } =
      req.body;

    if (!title || !description || !subject || !classId || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const assignment = await Assignment.create({
      title,
      description,
      subject,
      classId,
      faculty: req.user._id, // logged-in user
      dueDate,
      maxMarks: maxMarks || 100,
    });

    return res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("subject", "name")
      .populate("classId", "name section")
      .populate("faculty", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAssignmentsByFaculty = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      faculty: req.user._id,
    })
      .populate("subject", "name")
      .populate("classId", "name section")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAssignmentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const assignments = await Assignment.find({
      classId,
    })
      .populate("subject", "name")
      .populate("faculty", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

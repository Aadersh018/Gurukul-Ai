import Subject from "../models/subject.model.js";

export const createSubject = async (req, res) => {
  try {
    const { name, classId, faculty } = req.body;

    const subject = await Subject.create({
      name,
      classId,
      faculty,
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("faculty", "name email")
      .populate("classId", "name section");

    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


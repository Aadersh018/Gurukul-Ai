import Class from "../models/class.model.js";

export const createClass = async (req, res) => {
  try {
    const { name, section, classTeacher } = req.body;

    if (!name || !section) {
      return res.status(400).json({
        success: false,
        message: "Name and Section are required",
      });
    }

    const existingClass = await Class.findOne({
      name,
      section,
    });

    if (existingClass) {
      return res.status(400).json({
        success: false,
        message: "Class already exists",
      });
    }

    const newClass = await Class.create({
      name,
      section,
      classTeacher,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      class: newClass,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("classTeacher", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: classes.length,
      classes,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


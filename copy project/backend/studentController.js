import { Student } from "./studentModel.js";
import mongoose from "mongoose";
export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, student });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    const student = await Student.find();
    res.status(201).json(student);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteStudent = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });
    }

    Student.findByIdAndRemove(req.params.id).then((s) => {
      if (s) {
        return res.status(200).json({
          success: true,
          message: "Student Removed sucessfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Student does not exists",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    const { name, email, gender, country, state, dateOfBirth } = req.body;

    console.log(req.body);
    if (name) {
      student.name = name;
    }

    if (email) {
      student.email = email;
    }

    if (country) {
      student.country = country;
    }
    if (state) {
      student.state = state;
    }
    if (dateOfBirth) {
      student.dateOfBirth = dateOfBirth;
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

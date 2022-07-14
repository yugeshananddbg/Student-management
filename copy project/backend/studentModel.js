import mongoose from "mongoose";

const studentSchema = new mongoose.Schema([
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter Email"],
    },
    gender: {
      type: String,
      required: [true, "Please Enter gender"],
    },
    country: String,
    state: String,
    dateOfBirth: {
      type: Date,
      default: Date.now(),
      // required:[true,"Please enter Correct date"]
    },
  },
]);
export const Student = mongoose.model("Student", studentSchema);

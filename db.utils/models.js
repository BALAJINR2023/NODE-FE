import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  Name: {
    type: "string",
    required: true,
  },
  Course: {
    type: "string",
    required: true,
  },
  Batch: {
    type: "string",
    required: true,
  },
  students: {
    type: "array",
    required: true,
  },
});

// Model creation using schema
const teacherModel = new mongoose.model("teacher", teacherSchema, "teachers");
const userSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role: {
    type: "string",
    required: true,
  },
});

const userModel = new mongoose.model("user", userSchema, "users");
export {teacherModel,userModel};
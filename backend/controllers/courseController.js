const asyncHandler = require("express-async-handler");

const Course = require("../models/courseModel");

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();

  res.status(200).json(courses);
});

const setCourse = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const course = await Course.create({ text: req.body.text });

  res.status(200).json(course);
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCourse);
});

const deleteCourse = asyncHandler(async (req, res) => {
  const deletedGoal = await Course.findByIdAndDelete(req.params.id);

  if (!deletedGoal) {
    res.status(400);
    throw new Error("Course not found");
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCourses,
  setCourse,
  updateCourse,
  deleteCourse,
};

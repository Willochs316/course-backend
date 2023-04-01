const asyncHandler = require("express-async-handler");

const Course = require("../models/courseModel");
const User = require("../models/userModel");

// @desc Get courses
// @route GET /api/courses
// @access Private
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ user: req.user.id });

  res.status(200).json(courses);
});

// @desc Set course
// @route POST /api/courses
// @access Private
const setCourse = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const course = await Course.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(course);
});

// @desc Update course
// @route PUT /api/courses/:id
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  // Get the user before findByIdAndUpdate
  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the course user
  if (course.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
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

// @desc Delete course
// @route DELETE /api/courses/:id
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  // Get the user before findByIdAndUpdate
  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the course user
  if (course.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedCourse = await Course.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedCourse);
});

module.exports = {
  getCourses,
  setCourse,
  updateCourse,
  deleteCourse,
};

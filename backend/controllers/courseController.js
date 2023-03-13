const asyncHandler = require("express-async-handler");

const getCourses = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get courses",
  });
});

const setCourse = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({
    message: "Set courses",
  });
});

const updateCourse = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update course ${req.params.id}`,
  });
});

const deleteCourse = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete course ${req.params.id}`,
  });
});

module.exports = {
  getCourses,
  setCourse,
  updateCourse,
  deleteCourse,
};

const Teacher = require("../modules/teachers");

const getAllTeachers = async (req, res) => {
  res.json("testing use refreshtoken");
  // const teachers = await Teacher.find();
  // if (!teachers)
  //   return res.status(204).json({
  //     error: "No teachers found",
  //   });
  // res.json(teachers);
};

const createNewTeacher = async (req, res) => {
  const { name, subject } = req.body;

  if (!name) {
    return res.json({
      error: "Please enter your name",
    });
  }
  if (!subject) {
    return res.json({
      error: "Please enter the subject",
    });
  }

  try {
    const teacher = await Teacher.create({
      name,
      subject,
    });
    res.status(201).json(teacher);
  } catch (error) {
    console.error(error);
  }
};

const updateTeacher = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      error: "ID parameter is required",
    });
  }

  const teacher = await Teacher.findOne({ _id: req.body.id });

  if (!teacher) {
    return res.status(204).json({
      error: ` No teacher matches ID ${req.body.id}`,
    });
  }
  if (req.body?.name) {
    teacher.name = req.body.name;
  }
  if (req.body?.subject) {
    teacher.subject = req.body.subject;
  }

  const updatedTeacher = teacher.save();
  res.json(updatedTeacher);
};

const deleteTeacher = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      error: "Teacher ID is required",
    });
  }

  const teacher = await Teacher.findOne({ _id: req.body.id });
  if (!teacher) {
    return res.status(204).json({
      error: ` No teacher matches ID ${req.body.id}`,
    });
  }
  const result = await teacher.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getTeacher = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      error: "Teacher ID is required",
    });
  }
  const teacher = await Teacher.findOne({ _id: req.params.id });
  if (!teacher) {
    return res.status(204).json({
      error: ` No teacher matches ID ${req.params.id}`,
    });
  }
  res.json(teacher);
};

module.exports = {
  getAllTeachers,
  createNewTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacher,
};

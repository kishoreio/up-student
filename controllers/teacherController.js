const teacherModel = require('../models/teacherModel');

exports.createQuiz = async (req, res) => {
  try {
    const quizQuestion = await teacherModel.insertMany(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        quizQuestion,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quizData = await teacherModel.find();
    res.status(200).json({
      status: 'success',
      quizData,
    });
  } catch (err) {
    console.error(err);
  }
};

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  results: Object,
});

const teacherModel = mongoose.model('teacherModel', teacherSchema, 'questions');

module.exports = teacherModel;
